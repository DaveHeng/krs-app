<template>
	<div class="header-box">
		<div class="time"><img class="time-tag" src="../../material/time-tag.png" />{{ clipDate }}</div>
		<div class="name">
			<img class="w-690px h-84px" src="../../material/datav-title.png" />
		</div>
		<div class="system" @click="goOnline">
			<img class="w-118px h-44px cursor-pointer" src="../../material/system-btn.png" />
		</div>
	</div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { usePermission } from '@/store/modules/permission'
const router = useRouter()
const { state: permissionState } = usePermission()
onMounted(() => {
	getTime()
})

const clipDate = ref(null)

function getTime() {
	clipDate.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
	setTimeout(() => {
		getTime()
	}, 1000)
}

function handleGoback() {
	window.history.go(-1)
}

function goOnline() {
	const path = permissionState.routesFlat[0].children[1].path
	router.replace(path || '/online-monitoring')
}

onBeforeUnmount(() => {
	clearTimeout()
})
</script>

<style lang="less" scoped>
.header-box {
	width: 100%;
	height: 7.78%;
	background: url(../../material/datav-header.svg) no-repeat center;
	background-size: 100% 100%;
	display: flex;
	justify-content: space-between;
	// align-items: center;
	position: relative;
	padding: 0 120px;
	box-sizing: border-box;
	.time {
		font-size: 20px;
		color: #fff;
		line-height: 60px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 155px;
		display: flex;
		align-items: center;
		.time-tag {
			width: 24px;
			height: 24px;
			margin-right: 10px;
		}
	}
	.name {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.system {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 155px;
	}
}
</style>
