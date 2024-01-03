<template>
	<div class="wrap">
		<headerBox />
		<div class="mid">
			<slot name="mid"></slot>
		</div>
		<leftBox>
			<area-box :height="'(100% - 20px) / 3'">
				<slot name="left01"></slot>
			</area-box>
			<area-box :height="'(100% - 20px) / 3'">
				<slot name="left02"></slot>
			</area-box>
			<area-box :height="'(100% - 20px) / 3'">
				<slot name="left03"></slot>
			</area-box>
		</leftBox>
		<rightBox>
			<area-box :height="'33.33%'">
				<slot name="right01"></slot>
			</area-box>
			<area-box :height="'66.67%'">
				<slot name="right02"></slot>
			</area-box>
		</rightBox>
	</div>
</template>

<script setup>
import headerBox from './components/headerBox.vue'
import leftBox from './components/leftBox.vue'
import rightBox from './components/right.vue'
import areaBox from './components/areaBox.vue'
</script>

<style lang="less" scoped>
.wrap {
	position: relative;
	background-image: url(../material/template-02-bg.webp);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
	width: 100%;
	height: 100%;

	.mid {
		width: calc(100% - 38.54%);
		height: calc(100% - 8.333%);
		padding-bottom: 10px;
		box-sizing: border-box;
		margin-left: 19.27%;
		position: relative;
	}
}
</style>
