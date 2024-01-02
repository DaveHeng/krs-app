import { createRouter, createWebHashHistory } from 'vue-router'

const constantRouterMap = [
	{
		path: '/404',
		name: '404',
		hidden: true,
		component: () => import('@/views/notFound/index.vue')
	}
]

export const asyncRouterList = [
  {
		path: '/',
		component: () => import('@/layout/index.vue'),
		name: 'Main',
    children: []
	},
	{
		path: '/:catchAll(.*)',
		name: 'Error',
		hidden: true,
		meta: {
			title: '页面不存在'
		},
		redirect: '/404'
	}
]

function createRouterFactory(){
  return createRouter({
		history: createWebHashHistory(),
		routes: [...constantRouterMap],
		scrollBehavior: () => ({ top: 0 })

  })
}

export default createRouterFactory()
