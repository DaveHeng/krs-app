import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router/index'
// import { userGetUserInfo } from '@/store/user'
// import { usePermission } from '@/store/modules/permission' // 远程登录模式
import { usePermission } from '@/store/modules/permissionLocal' // 本地登录模式
import { useUserInfo } from '@/store/modules/user.js'

const whiteList = ['/login', '/login-free', '/404']

const model = 'local' // 当前模式分为，本地登录模式和远程登录模式 local | online

// 权限拦截
router.beforeEach(async (to, from, next) => {
	NProgress.start() // 页面虚拟进度条
	const { login, state: userInfoState, resetToken, getPageConfig } = useUserInfo()
	const { query, path } = to
	const { state: permissionState, setUsePermission } = usePermission()
	// 获取外部配置
	await getPageConfig()
	if (to.meta) {
		if (to.meta?.title && typeof to.meta?.title === 'function') {
			const desc = to.meta.title(to.query?.type)
			document.title = desc
		} else {
			document.title =
				`${userInfoState.pageConfig.info[0].title}-${to.meta.title}` ??
				userInfoState.pageConfig.info[0].title
		}
	}

	if (!whiteList.includes(path)) {
		if (userInfoState.token) {
			const hasAuth = permissionState.routesFlat.length > 0
			if (hasAuth) {
				next()
			} else {
			 model === 'online' ? login() : ''
				try {
					setUsePermission()
					permissionState.routesFlat.forEach(item => {
						router.addRoute(item)
					})
					console.log(router.getRoutes(), to)
					next({ ...to, replace: true })
				} catch (error) {
					resetToken()
				}
			}
		} else {
			resetToken()
		}
	} else {
		next()
	}
	NProgress.done()
})
