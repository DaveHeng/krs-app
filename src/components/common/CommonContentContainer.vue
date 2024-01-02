<template>
	<div class="list-container" :style="{ height: `${listHeight}px` }">
		<slot name="content" :height="contentHeight"></slot>
	</div>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core'
import _ from 'lodash'
const props = defineProps({
	hasPagination: {
		type: Boolean,
		default: true
	}
})
const height = computed(() => (props.hasPagination ? 122 : 55))
const contentHeight = ref(0)
const listHeight = ref(0)
onMounted(() => {
	const conditionBox = document.getElementById('condition-box')
	calcHeight()
	const resizeHandler = _.debounce(calcHeight, 0)
	useResizeObserver(conditionBox, entries => {
		resizeHandler()
	})
	useResizeObserver(document.body, entries => {
		resizeHandler()
	})
})

function calcHeight() {
	const el = document.getElementById('condition-box')
	//  body高度 - 条件高度 -  - 面包屑高度 - paddingBottom
	const conditionHeight = el.getBoundingClientRect().height + 15 + 66 + 34
	const doc = document.body.clientHeight
	listHeight.value = doc - conditionHeight
	// （分页高度/表头）
	contentHeight.value = listHeight.value - height.value
	console.log(contentHeight.value, height.value)
}
</script>

<style lang="less" scoped>
.list-container {
	width: 100%;
	background-color: #fff;
	box-shadow: 0px 5px 14px 0px rgba(0, 0, 0, 0.05);
	border-radius: 5px 5px 20px 20px;
	overflow: hidden;
}
</style>
