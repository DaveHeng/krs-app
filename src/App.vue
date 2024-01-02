<template>
	<a-config-provider
		:locale="zhCN"
		:theme="{
			token: { colorPrimary: appState.themeColor }
		}"
	>
		<a-spin :spinning="loading">
			<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
			<messageContext />
			<modalContext />
		</a-spin>
	</a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import feedBackContext from '@/components/feedBackContext.js'
import { useAppConfig } from '@/store/modules/app'

const [messageContext, modalContext] = feedBackContext()
const loading = ref(true)
const { appState } = useAppConfig()

onMounted(() => {
	loading.value = false
})
</script>
