import { defineStore } from 'pinia'
import { pathToRegexp } from 'path-to-regexp'
import path from 'path-browserify'
import { asyncRouterList } from '@/router/index'
import * as AntIcon from '@/components/icons/index.js'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
// console.log(AntIcon)
const hiddenMenuList = ['datav']
const modules = import.meta.glob('../../views/**/*.vue')
export const usePermission = defineStore('permission', () => {
	const [getItem] = useLocalStorage()
	const state = reactive({
		routesFlat: [], // 全部异步路由一维数组
		routesSource: [], // 路由树,
		menuList: [], // 菜单树
		permissionBtns: {} //按钮
	})

	const setUsePermission = () => {
		const sourceData = getItem('sourceData')
		const permissions = getItem('permissions')
		const { result, flat, btns } = transformList(sourceData, permissions)
		if (flat.length > 0) {
			state.routesFlat = asyncRouterList
			state.routesFlat[0].redirect = flat[0].fullPath
			console.log(state.routesFlat, 'state.routesFlat')
			state.routesFlat[0].children = flat
			state.routesSource = result
			state.permissionBtns = btns
			state.menuList = getMenuList(result)
			console.log(state.menuList)
		}

		console.log(state, 'staate')
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
		if (permissionList.includes(item.id)) {
			let temp = null
			if (['M', 'C'].includes(item.type)) {
				temp = createRoute(item, prefix, level)
				result.push(temp)
				flat.push({ ...temp })
			}

			if (item.type === 'F') {
				btns[item.permissionKeys] = item.name
			}

			if (item.children && item.children.length > 0) {
				const {
					result: a,
					flat: b,
					btns: c
				} = transformList(item.children, permissionList, temp.path, level + 1)
				if (['M'].includes(item.type)) {
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
	const url = path.join(prefix, item.routePath)
	let temp = {
		path: url,
		fullPath: url,
		pathReg: pathToRegexp(url),
		name: item.permissionKeys,
		meta: {
			title: item.name,
			icon: item.icon
		},
		level
	}
	if (item.type === 'M') {
		temp.redirect = item.commPath
	} else if (item.type === 'C') {
		temp.component = modules[`../../${item.commPath}.vue`]
	}
	return temp
}

// 获取导航栏
function getMenuList(list) {
	const result = []
	list.forEach(item => {
		const icon = item?.meta?.icon ? h(AntIcon[item?.meta?.icon]) : null
		const temp = getMenuItem(item?.meta?.title || '', item.name, icon)
		if (item.children && item.children.length > 0) {
			const childTemp = getMenuList(item.children).filter(e => !hiddenMenuList.includes(e.key))
			console.log(childTemp)
			if (childTemp.length > 0) {
				temp && (temp.children = [...childTemp])
			}
		}
		result.push(temp)
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
