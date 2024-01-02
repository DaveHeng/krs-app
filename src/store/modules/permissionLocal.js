import { defineStore } from 'pinia'
import path from 'path-browserify'
import { asyncRouterList } from '@/router/index'
import * as AntIcon from '@/components/icons/index.js'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
import { sourceData, permissions } from '@/router/static'
// import { useUserInfo } from './user'
// console.log(AntIcon)

const modules = import.meta.glob('../../views/**/index.vue')
export const usePermission = defineStore('permission', () => {
	// const { state: useInfo } = useUserInfo()
	const [getItem] = useLocalStorage()
	const state = reactive({
		routesFlat: [], // 全部异步路由一维数组
		routesSource: [], // 路由树,
		menuList: [], // 菜单树
		permissionBtns: {} //按钮
	})

	const setUsePermission = () => {
		const { result, flat, btns } = transformList(sourceData, permissions)
		if (flat.length > 0) {
			asyncRouterList[0].redirect = flat[0].fullPath
			asyncRouterList[0].children = flat
			state.routesFlat = asyncRouterList
			state.routesSource = result
			state.permissionBtns = btns
			state.menuList = getMenuList(result)
			console.log(state.menuList)
		}
	}

	return {
		state,
		setUsePermission
	}
})

function transformList(sourceData, permissionList, prefix = '/', level = 1) {
	const result = []
	const flat = []
	const btns = {}
	sourceData.forEach(item => {
		if (permissionList.includes(item.name)) {
			let temp = null
			if (['M', 'C', 'P'].includes(item.type)) {
				temp = createRoute(item, prefix, level)
				result.push(temp)
				flat.push({ ...temp })
			}

			if (item.type === 'B') {
				btns[item.name] = item.name
			}

			if (item.children && item.children.length > 0) {
				const {
					result: a,
					flat: b,
					btns: c
				} = transformList(item.children, permissionList, temp.path, level + 1)
				if (['C'].includes(item.type)) {
					temp.redirect = a[0].fullPath
					flat[flat.length - 1].redirect = a[0].fullPath
				}
				temp.children = a
				flat.push(...b)
				for (let k in c) {
					btns[k] = c[k]
				}
			}
		}
	})

	return {
		result,
		flat,
		btns
	}
}

function createRoute(item, prefix, level) {
	console.log(item.icon)
	const url = path.join(prefix, item.path)
	let temp = {
		path: url,
		fullPath: url,
		name: item.name,
		meta: {
			title: item.title,
			icon: !item.icon ? null : item.icon
		},
		type: item.type,
		level
	}
	if (['M', 'P'].includes(item.type)) {
		temp.component = modules[`../../views/${item.component}.vue`]
	}
	return temp
}

// 获取导航栏
function getMenuList(list) {
	const result = []
	list.forEach(item => {
		if (item.type !== 'P') {
			const icon = item?.meta?.icon ? h(AntIcon[item?.meta?.icon]) : null
			const temp = getMenuItem(item?.meta?.title || '', item.name, icon)
			if (item.children && item.children.length > 0) {
				const childTemp = getMenuList(item.children)
				if (childTemp.length > 0) {
					temp && (temp.children = [...childTemp])
				}
			}
			result.push(temp)
		}
	})

	return result
}

// 获取导航栏每一项
function getMenuItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type: type ?? null
	}
}
