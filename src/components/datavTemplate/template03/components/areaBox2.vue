<template>
	<div class="area-box">
		<div v-if="title" class="title">{{ title }}</div>
		<slot></slot>
		<div v-if="disviable" class="back" @click="onBack">返回</div>
	</div>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core'
const emit = defineEmits(['back'])
const props = defineProps({
	height: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	disviable: {
		type: Boolean,
		default: false
	}
})

const height = computed(() => {
	return props.height
})

function onBack() {
	emit('back')
}
</script>

<style lang="less" scoped>
.area-box {
	width: 100%;
	height: calc(v-bind(height));
	// height: calc((100% - 50px) / 3);
	position: relative;
	background: rgba(10, 26, 52, 0.6);
	border-radius: 0px 0px 0px 0px;
	opacity: 1;
	border: 1px solid #000000;
	padding: 12px 14px;
	box-sizing: border-box;
	position: relative;

	.title {
		height: 36px;
		background: linear-gradient(
			90deg,
			#002d49 0%,
			rgba(31, 63, 70, 0.4041) 37%,
			rgba(167, 165, 165, 0) 100%
		);
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		line-height: 36px;
		font-size: 18px;
		font-family: Source Han Sans, Source Han Sans;
		font-weight: 700;
		color: #a8d6ff;
		text-indent: 16px;
		position: relative;
		cursor: default;

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 5px;
			transform: translateY(-50%);
			background-color: RGBA(3, 251, 255, 1);
			width: 3px;
			height: 30px;
		}
	}

	.back {
		position: absolute;
		top: 10px;
		right: 20px;
		width: 68px;
		height: 34px;
		background: rgba(10, 26, 52, 0.6);
		box-shadow: inset 0px 0px 5px 1px rgba(3, 251, 255, 0.6513);
		border-radius: 4px 4px 4px 4px;
		opacity: 1;
		border: 1px solid rgba(89, 175, 249, 0.7049);
		text-align: center;
		line-height: 34px;
		font-family: Source Han Sans, Source Han Sans;
		font-weight: 400;
		color: #01c2ff;
		cursor: pointer;
	}
}
</style>
