<template>
	<div class="h66px flex items-center justify-between box-border header-continer">
		<CommonBreadcrumb />
		<div class="flex items-center">
			<div class="mr25px">
				<CommonConnectTag />
			</div>
			<NotifyInfo />
			<a-divider type="vertical" class="mr25px" style="height: 16px; background-color: #c3ccce" />
			<Info />
		</div>
	</div>
</template>

<script setup>
import Info from './Info.vue'
import NotifyInfo from './NotifyInfo.vue'
import { useRouter } from 'vue-router'
import { useAppConfig } from '@/store/modules/app'
import CommonConnectTag from '@/components/common/CommonConnectTag.vue'
const { appState } = useAppConfig()
const router = useRouter()
const leftWidth = computed(() => `${appState.menuWidth}px`)
</script>

<style lang="less" scoped>
.header-continer {
	position: fixed;
	top: 0;
	right: 0;
	width: calc(100% - v-bind(leftWidth) - 44px);
	padding-right: 22px;
	box-sizing: border-box;
}
</style>
