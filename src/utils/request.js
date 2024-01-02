import axios from 'axios'
import { message, modal } from '@/components/feedBackContext.js'
import { useUserInfo } from '@/store/modules/user'

/**
 * 获取url
 *
 * @export
 * @param {string} [suffix='/api']
 * @return {*}
 */

let isShowMessage = true

const service = axios.create({
	timeout: 100000,
	baseURL: import.meta.env.VITE_APP_BASE_API
})

service.interceptors.request.use(
	async config => {
		const { state } = useUserInfo()
		if (state.token) {
			config.headers['Authorization'] = `Bearer ${state.token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		const { statusCode } = response.data
		const res = response.data

		if (response.status === 200) {
			const { responseType } = response.request
			if (responseType === 'blob') {
				return Promise.resolve(response)
			} else {
				if (!statusCode) {
					return res
				} else {
					if (statusCode !== 200) {
						if ([401, 402, 403].includes(statusCode)) {
							modal.confirm({
								title: '登录失效，请重新登录',
								content: '确认登出',
								okText: '重新登录',
								cancelText: '取消',
								onOk: () => {
									const { resetToken } = useUserInfo()
									resetToken()
								}
							})
						}

						errorHandle(res)

						return Promise.reject(res)
					} else {
						if (statusCode === '0') {
							return Promise.reject(res)
						} else {
							return res.data
						}
					}
				}
			}
		} else {
			return Promise.reject(response.data)
		}
	},
	error => {
		if (isShowMessage) {
			isShowMessage = false
			console.log(error)
			errorHandle(error)

			if ([401, 402, 403].includes(error.response.status)) {
				modal.confirm({
					title: '登录失效，请重新登录',
					content: '确认登出',
					okText: '重新登录',
					cancelText: '取消',
					onOk: () => {
						const { resetToken } = useUserInfo()
						resetToken()
					}
				})
			}
		}

		setTimeout(() => {
			isShowMessage = true
		}, 3000)
		return Promise.reject(error)
	}
)

function errorHandle(res) {
	console.log(res)
	const data = !res.errors
		? '请求错误'
		: typeof res.errors === 'string'
		? res.errors
		: JSON.stringify(res.errors)

	message.error({
		content: data
	})
}

const resolveExportMethod = res => {
	const link = document.createElement('a')
	let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
	link.style.display = 'none'
	link.href = URL.createObjectURL(res.data)
	let disposition = res.headers['content-disposition']
	console.log(res.headers)
	const temp = disposition.split(`filename*=UTF-8''`)
	let fileName = temp[1]
	// iso8859-1的字符转换成中文
	fileName = decodeURI(fileName)

	// 去掉双引号
	// fileName = fileName.replace(/\"/g, '')
	// console.log(fileName)

	link.download = fileName //下载后文件名
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
// 导出
export const postExportRequest = (url, data, fileName = '') => {
	console.log(url, data)
	return service({
		method: 'get',
		data,
		url: url,
		responseType: 'blob'
	})
		.then(res => {
			console.log(res)
			resolveExportMethod(res)
		})
		.catch(err => {
			console.log(err)
			errorHandle(err)
		})
}

export default service
