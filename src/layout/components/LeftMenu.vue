<template>
	<div class="bg-#fff b-rd-20px w-100% h-100% pr-16px pl-16px box-border shadow-xl relative">
		<Logo ref="logoDom" />
		<p
			class="m-b5px h-1"
			style="background: linear-gradient(to right,rgb(255, 255, 255) 2%, rgba(4, 128, 218, 0.5) 50%, rgb(255, 255, 255) 99%);}"
		></p>
		<div class="w100% nav-container" v-if="state.menuList.length > 0">
			<a-menu
				v-model:openKeys="openKeys"
				v-model:selectedKeys="selectedKeys"
				style="width: 100%"
				mode="inline"
				:items="state.menuList"
				@click="handleClick"
				:inline-collapsed="appState.collapsed"
			></a-menu>
		</div>
		<a-tooltip :title="!appState.collapsed ? '' : '数据可视化平台'" placement="right">
			<div
				@click="goVisualShow"
				class="text-white bg-#3182CE h22px leading-22px p10px rounded-12px text-center cursor-pointer mx-auto tracking-2px font-semibold flex justify-center items-center border-box"
				:class="!appState.collapsed ? 'w200px' : 'w22px'"
			>
				<ScreenIcon :style="{ color: '#fff', fontSize: '15px' }" />
				<div class="ml-5" v-if="!appState.collapsed">数据可视化平台</div>
			</div>
		</a-tooltip>
		<div class="collapsed-btn" @click="setCollapsed">
			<MenuUnfoldOutlined v-if="appState.collapsed" />
			<MenuFoldOutlined v-else />
		</div>
	</div>
</template>

<script setup>
import Logo from './Logo.vue'
import { usePermission } from '@/store/modules/permission'
import { findRouterChain } from './helper'
import { useRoute, useRouter } from 'vue-router'
import { ScreenIcon } from '@/components/icons/index'
import { useAppConfig } from '@/store/modules/app'
import { useResizeObserver } from '@vueuse/core'
const route = useRoute()
const router = useRouter()
const { state } = usePermission()
const { appState, setCollapsed } = useAppConfig()
const openKeys = ref([])
const selectedKeys = ref([])
const logoDom = ref(null)
console.log(state.menuList)
const logoHeight = ref('60px')
onMounted(() => {
	useResizeObserver(logoDom.value, entries => {
		const entry = entries[0]
		const { height } = entry.contentRect
		console.log(height, 'height')
		logoHeight.value = `${height + 24}px` // padding
	})
})

watch(
	() => route.name,
	val => {
		const currentRouter = findRouterChain(state.routesSource, val)
    console.log(currentRouter, state.routesSource, val)
		if (currentRouter.length) {
			openKeys.value = currentRouter
			selectedKeys.value = [...currentRouter]
		}
	},
	{ immediate: true }
)

function handleClick(e) {
	const { routesFlat } = state
	console.log(routesFlat, 'routesFlat')
	const route = routesFlat[0]?.children?.find(item => item.name === e?.key)
	console.log(route)
	router.push(route.fullPath)
}

function goVisualShow() {
	router.push({
		path: '/datav'
	})
}
</script>

<style lang="less" scoped>
.nav-container {
	width: 100%;
	height: calc(100% - 105px - v-bind(logoHeight));
	overflow: auto;
	ul {
		border-inline-end: none !important;
	}
}

.collapsed-btn {
	position: absolute;
	top: 50%;
	right: -15px;
	font-size: 16px;
	transform: translateY(-50%);
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 20%;
	background: #edf6fa;
	cursor: pointer;
	transition: all 0.3s;
	color: #505050;
}
</style>
