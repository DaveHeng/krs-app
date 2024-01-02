<template>
	<div class="layout">
		<div class="left mr22px">
			<LeftMenu />
		</div>
		<div class="right">
			<Header />
			<div class="app-container">
				<AppMain />
			</div>
		</div>
		<commandNotify />
	</div>
</template>

<script setup>
import LeftMenu from './components/LeftMenu.vue'
import AppMain from './components/AppMain.vue'
import Header from './components/Header.vue'
import commandNotify from './components/Command/container.vue'
import { useAppConfig } from '@/store/modules/app'
import { useSignalr } from '@/utils/hooks/useSignalr'
useSignalr()
const { appState } = useAppConfig()

const leftWidth = computed(() => `${appState.menuWidth}px`)
</script>

<style lang="less" scoped>
.layout {
	width: 100vw;
	height: 100vh;
	display: flex;
	background-image: url('../assets/images/bg-img.png');
	background-size: 100% 40%;
	background-repeat: no-repeat;
	background-position: top;
	box-sizing: border-box;
	background-color: #f7fafc;
	padding: 0 22px 34px;
	.left {
		width: v-bind(leftWidth);
		border-radius: 20px;
		padding-top: 34px;
		box-sizing: border-box;
	}

	.right {
		width: calc(100% - v-bind(leftWidth) - 22px);
		transition: all 0.3s;
		overflow-y: hidden;
		overflow-x: auto;
		padding-top: 66px;
		box-sizing: border-box;
		position: relative;

		.app-container {
			min-width: 878px;
			height: 100%;
		}
	}
}
</style>
