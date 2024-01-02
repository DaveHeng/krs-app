<template>
	<div class="view-container">
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
.view-container {
	// height: calc(100% - 66px);
	height: 100%;
	box-sizing: border-box;
}
</style>
