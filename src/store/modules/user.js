import { defineStore } from 'pinia'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'

export const useUserInfo = defineStore('user', () => {
	const [getItem, setItem, removeAll] = useLocalStorage()
	const state = reactive({
		token: getItem('token') ?? '1',
		roleId: getItem('roleId') ?? '',
		pageConfig: getItem('pageConfig') ?? {}
	})

	const login = () => {
		const {
			token,
			routes: data,
			permissions,
			fromUrl: sourceUrl,
			username
		} = JSON.parse(localStorage.getItem('cw_web'))
		setItem('token', token)
		setItem('sourceUrl', sourceUrl)
		setItem('sourceData', data)
		setItem('permissions', permissions)
		setItem('user', username)
		state.token = token
	}

	const resetToken = () => {
		const url = getItem('sourceUrl') || ''
		removeAll()
		window.location.replace(`http://${url}/#/login`)
	}

	function getPageConfig() {
		return new Promise((resolve, reject) => {
			if (getItem('pageConfig')) {
				resolve()
			} else {
				fetch('config/index.json')
					.then(res => {
						return res.json()
					})
					.then(data => {
						setItem('pageConfig', data)
						state.pageConfig = data
						resolve()
					})
					.catch(err => {
						reject(err)
					})
			}
		})
	}

	return {
		state,
		login,
		resetToken,
		getPageConfig
	}
})
