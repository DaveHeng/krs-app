<template>
	<div class="title-box">
		<img :src="icon" alt="" class="icon" />
		<div class="title">{{ title }}</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	icon: {
		type: String,
		default: ''
	}
})
</script>

<style lang="less" scoped>
.title-box {
	width: 100%;
	height: 38px;
	display: flex;
	align-items: center;
	margin-top: 7px;
	.icon {
		width: 20px;
		height: 20px;
		margin-right: 3px;
	}

	.title {
		flex: 1;
		text-indent: 12px;
		font-size: 16px;
		font-family: HarmonyOS Sans SC-Medium, HarmonyOS Sans SC;
		font-weight: 600;
		color: #ffffff;
		line-height: 42px;
		letter-spacing: 8px;
		background: url(../../material/template-02-lineIcon.png) no-repeat bottom;
		background-size: 100%;
	}
}
</style>
