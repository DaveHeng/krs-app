<template>
	<div class="flex items-center cursor-default">
		<a-dropdown placement="bottom">
			<template #overlay>
				<a-menu>
					<a-menu-item>
						<div @click="logout">退出登录</div>
					</a-menu-item>
				</a-menu>
			</template>
			<div class="flex items-center">
				<a-avatar style="background-color: rgb(54, 155, 238)">
					<template #icon>
						<UserOutlined />
					</template>
				</a-avatar>
				<div class="ml10px mr15px fs-14 c-#fff">{{ name }}</div>
			</div>
		</a-dropdown>
	</div>
</template>

<script setup>
import { modal } from '@/components/feedBackContext.js'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
const [getItem, setItem, removeAll] = useLocalStorage()
const name = computed(() => getItem('user'))

function logout() {
	const url = getItem('sourceUrl')
	modal.confirm({
		title: '温馨提示',
		content: '是否退出登录',
		onOk: () => {
			removeAll()
			window.location.replace(`http://${url}/#/login`)
		}
	})
}
</script>

<style lang="less" scoped></style>
