<template>
	<div v-if="state.list.length > 0" class="command-wrap">
		<a-tabs v-model:activeKey="state.activeKey">
			<a-tab-pane key="all">
				<template #tab>
					<a-badge :count="state.list.length" :show-zero="false">全部</a-badge>
				</template>
				<div class="scroll-box">
					<commandItem :list="state.list" />
				</div>
			</a-tab-pane>
			<a-tab-pane key="6005">
				<template #tab>
					<a-badge
						:count="state.list.filter(item => item.executionStatus === 6005).length"
						:show-zero="false"
						>等待发送</a-badge
					>
				</template>
				<div class="scroll-box">
					<commandItem :list="state.list.filter(item => item.executionStatus === 6005)" />
				</div>
			</a-tab-pane>
			<a-tab-pane key="6004">
				<template #tab>
					<a-badge
						:count="state.list.filter(item => item.executionStatus === 6004).length"
						:show-zero="false"
						>取消发送</a-badge
					>
				</template>
				<div class="scroll-box">
					<commandItem :list="state.list.filter(item => item.executionStatus === 6004)" />
				</div>
			</a-tab-pane>
			<a-tab-pane key="6006">
				<template #tab>
					<a-badge
						:count="state.list.filter(item => item.executionStatus === 6006).length"
						:show-zero="false"
						>等待反馈</a-badge
					>
				</template>
				<div class="scroll-box">
					<commandItem :list="state.list.filter(item => item.executionStatus === 6006)" />
				</div>
			</a-tab-pane>
			<a-tab-pane key="6002">
				<template #tab>
					<a-badge
						:count="state.list.filter(item => item.executionStatus === 6002).length"
						:show-zero="false"
						>执行成功</a-badge
					>
				</template>
				<div class="scroll-box">
					<commandItem :list="state.list.filter(item => item.executionStatus === 6002)" />
				</div>
			</a-tab-pane>
			<a-tab-pane key="6003">
				<template #tab>
					<a-badge
						:count="state.list.filter(item => item.executionStatus === 6003).length"
						:show-zero="false"
						>执行失败</a-badge
					>
				</template>
				<div class="scroll-box">
					<commandItem :list="state.list.filter(item => item.executionStatus === 6003)" />
				</div>
			</a-tab-pane>
		</a-tabs>
		<div class="bottom" @click="updateList">当前标为已读</div>
	</div>
</template>

<script setup>
import { useCommandData } from '@/store/modules/commandData'
import commandItem from './item.vue'

const { state: commandData } = useCommandData()

const state = reactive({
	activeKey: 'all',
	list: [],
	isShow: false
})
watch(
	() => commandData.count,
	() => {
		state.isShow = commandData.list.length > 0
		state.list = commandData.list
	}
)
function updateList() {
	if (state.activeKey === 'all') {
		state.list = []
	} else {
		state.list = state.list.filter(item => item.executionStatus !== Number(state.activeKey))
	}
}
</script>

<style lang="less" scoped>
.command-wrap {
	width: 524px;
	height: 343px;
	background: #ffffff;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
	border-radius: 5px 5px 5px 5px;
	position: absolute;
	z-index: 100;
	right: 15px;
	bottom: 15px;
	box-sizing: border-box;
	padding: 0 12px 40px;

	.bottom {
		position: absolute;
		bottom: 0;
		right: 10px;
		line-height: 40px;
		cursor: pointer;
		color: #3d3d3d;
		font-size: 12px;
		color: #1890ff;
	}

	.scroll-box {
		width: 100%;
		height: 257px;
		overflow: auto;
	}
}
</style>
