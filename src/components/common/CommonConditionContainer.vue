<template>
	<div class="condition-container" id="condition-box">
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
.condition-container {
	width: 100%;
	min-height: 54px;
	background: linear-gradient(137deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 100%);
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.02);
	border-radius: 5px;
	border: 2px solid #ffffff;
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	padding: 9px 80px 0 15px;
	box-sizing: border-box;
}
</style>
