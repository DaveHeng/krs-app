<template>
	<div class="left" ref="areaDom">
		<img src="../../material/list-top-left.png" class="border-img border-img1" />
		<img src="../../material/list-top-right.png" class="border-img border-img2" />
		<img src="../../material/list-bot-left.png" class="border-img border-img3" />
		<img src="../../material/list-bot-right.png" class="border-img border-img4" />
		<div class="title">{{ title }}</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { useResizeObserver } from '@vueuse/core'

const props = defineProps({
	title: {
		type: String,
		default: ''
	}
})
const areaDom = ref(null)
const state = reactive({
	width: 0,
	height: 0
})

onMounted(() => {
	console.log(areaDom.value)
	useResizeObserver(areaDom.value, entries => {
		const { width, height } = entries[0].contentRect
		console.log(593 / width, 946 / height)
		state.width = width
		state.height = height
	})
})
</script>

<style lang="less" scoped>
.left {
	width: 30.93%;
	height: 100%;
	// background: url('../../../assets/images/datav-left.svg') no-repeat center;
	background-size: 100% 100%;
	position: relative;
	padding: 24px 26px;
	box-sizing: border-box;

	.title {
		font-size: 18px;
		font-family: Source Han Sans, Source Han Sans;
		font-weight: 400;
		color: #a8d6ff;
		line-height: 34px;
		position: absolute;
		top: -15px;
		left: 50%;
		transform: translateX(-50%);
		cursor: default;
	}

	.border-img {
		position: absolute;
		width: 105px;
		height: 105px;

		&.border-img1 {
			top: 0;
			left: 0;
		}
		&.border-img2 {
			top: 0;
			right: 0;
		}
		&.border-img3 {
			bottom: 0;
			left: 0;
		}
		&.border-img4 {
			bottom: 0;
			right: 0;
		}
	}

	.content {
		position: relative;
		z-index: 2;
		height: 100%;
		width: 100%;
		background: #0f2b3f;
		border-radius: 12px 12px 12px 12px;
		padding: 18px;
		box-sizing: border-box;
	}
}
</style>
