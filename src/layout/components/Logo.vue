<template>
	<div class="box-border w100% logo-box pt24px" ref="el">
		<div
			v-for="item in state.pageConfig?.info"
			class="mb10px w100% h100% flex justify-center fs-18 b-b b-#E0E1E2 box-border fw500 box-border"
		>
			<img :src="item.logo" :alt="item.title || ''" class="w36px h36px b-rd-10px" :title="item.title || ''" />
			<div v-if="!appState.collapsed" class="lh-36px ml8px text-truncate">{{ item.title || '' }}</div>
		</div>
	</div>
</template>

<script setup>
import { useUserInfo } from '@/store/modules/user.js'
import { useAppConfig } from '@/store/modules/app'
const { appState } = useAppConfig()
const { state } = useUserInfo()
const el = ref(null)

defineExpose({
	el
})
</script>
<style lang="less" scoped>
.logo-box {
	div {
		&:nth-last-child(1) {
			margin-bottom: 0;
		}
	}
}
</style>
