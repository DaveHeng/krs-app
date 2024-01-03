<template>
	<div class="datav-container" id="visual">
		<Template03 leftTitle="统计数据" rightBottitle="1" rightMidtitle="2" rightToptitle="3">
			<template #left>
				<div class="c-#fff">222</div>
			</template>
			<template #mid>
				<div class="c-#fff">222</div>
			</template>
			<template #right01> <div class="c-#fff">222</div></template>
			<template #right02><div class="c-#fff">222</div></template>
			<template #right03><div class="c-#fff">222</div></template>
		</Template03>
	</div>
</template>

<script setup>
import autofit from 'autofit.js'
import Template03 from '../../components/datavTemplate/template03/index.vue'
onMounted(() => {
	autofit.init({
		dh: 1080,
		dw: 1920,
		el: '#visual',
		resize: true,
		ignore: []
	})
})
onBeforeUnmount(() => {
	autofit.off('#visual')
})
</script>

<style lang="less" scoped>
.datav-container {
	position: fixed;
	top: 0;
	left: 0;
}
</style>
