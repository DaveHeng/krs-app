<template>
	<CommonConditionContainer>
		<div class="w100% flex items-center justify-between mb9px relative">
			<Tab :current-tab="state.currentTab" @change-tab="changeTab" />
			<span v-if="state.currentTab === 0">
				<a-button type="primary" :loading="state.loading" class="justify-end" @click="onRefresh">
					<template #icon><ReloadOutlined /> </template>
					刷新</a-button
				>
			</span>
		</div>
	</CommonConditionContainer>
	<CommonContentContainer :hasPagination="false">
		<template #content="{ height }">
			<div v-if="state.currentTab === 0">
				<Info
					:info="realData.info"
					:refreshTime="realData.refreshTime"
				/>
				<List
					:data-source="realData.list"
					:scroll-height="height - 150"
					:loading="state.loading"
					:count="realData.count"
				/>
			</div>
			<div v-if="state.currentTab === 1" class="map-bg">
				<div class="w100%" :style="{ height: `${height + 55}px` }"></div>
			</div>
		</template>
	</CommonContentContainer>
</template>

<script setup>
import Tab from './components/tab.vue'
import Info from './components/info.vue'
import List from './components/list.vue'
import { useDict } from '@/utils/hooks/useDict'
import { useOnlineData } from '@/store/modules/onlineData'

// const [dict, dictItemMap] = useDict([1300, 1000, 1850, 1880])
const { state: realData } = useOnlineData()
const state = reactive({
	currentTab: 0,
	loading: false
})

// 刷新
async function onRefresh() {
	try {
		state.loading = true
		await realData.refresh()
		setTimeout(() => {
			state.loading = false
		}, 500)
	} catch (error) {}
}

function changeTab(index) {
	state.currentTab = index
}
</script>
<style scoped="less">
/* .map-bg {
	background: url('../../assets/images/map-bg.png') no-repeat center;
	background-size: 100% 100%;
} */
</style>
