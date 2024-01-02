<template>
	<div class="w100vw h100vh flex items-center justify-center bg-#fff">
		<a-result status="404" title="404" sub-title="对不起, 没有找到该页面.">
			<template #extra>
				<a-button type="primary" @click="goHome">返回首页</a-button>
			</template>
		</a-result>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
	router.replace('/')
}
</script>
