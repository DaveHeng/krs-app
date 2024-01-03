<template>
	<div class="area-box">
		<slot></slot>
	</div>
</template>

<script setup>
const props = defineProps({
	height: {
		type: String,
		default: ''
	}
})

const height = computed(() => {
	return `${props.height}`
})
</script>

<style lang="less" scoped>
.area-box {
	width: 100%;
	height: calc(v-bind(height));
	background: rgba(43, 120, 235, 0.1);
	box-shadow: 6px 9px 21px 5px rgba(0, 0, 0, 0.04);
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
