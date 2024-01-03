<template>
	<div class="area-box">
		<div class="title">{{ title }}</div>
		<slot></slot>
		<img class="icon-box icon-box1" src="../../material/datav-top-left-border.png" alt="" />
		<img
			class="icon-box icon-box2"
			src="../../material/datav-top-right-border.png"
			alt=""
		/>
		<img
			class="icon-box icon-box3"
			src="../../material/datav-bottom-left-border.png"
			alt=""
		/>
		<img
			class="icon-box icon-box4"
			src="../../material/datav-bottom-right-border.png"
			alt=""
		/>
	</div>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core'
const props = defineProps({
	height: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	}
})

const height = computed(() => {
	return props.height
})
</script>

<style lang="less" scoped>
.area-box {
	width: 100%;
	height: calc(v-bind(height));
	// height: calc((100% - 50px) / 3);
	position: relative;
	background: #00000a;
	box-shadow: inset 0px 0px 87px 0px rgba(1, 194, 255, 0.4);
	border-radius: 5px;
	opacity: 1;
	border: 1px solid #0e9cff;
	margin-bottom: 10px;
	padding: 20px 26px;
	box-sizing: border-box;

	.title {
		font-size: 18px;
		font-family: Source Han Sans, Source Han Sans;
		font-weight: 700;
		color: #a8d6ff;
		line-height: 20px;
	}

	.icon-box {
		position: absolute;
		width: 12px;
		height: 8px;

		&.icon-box1 {
			top: 1px;
			left: 1px;
		}
		&.icon-box2 {
			top: 1px;
			right: 1px;
		}
		&.icon-box3 {
			bottom: 1px;
			left: 1px;
		}
		&.icon-box4 {
			bottom: 1px;
			right: 1px;
		}
	}
}
</style>
