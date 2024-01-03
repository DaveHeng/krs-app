<template>
	<div class="header-box">
		<div class="time w260px">
			<a-space>
				<span class="text-18px ml--5px">
					{{ clipDate }}
				</span>
				<span class="text-24px font-semibold ml-5px">
					{{ clipTime }}
				</span></a-space
			>
		</div>
		<div class="header-light"></div>
		<div class="name">
			<img
				v-for="item of userPageState.pageConfig?.info"
				class="w46px h46px mr18px"
				:src="item.logo"
			/>
			{{ userPageState.pageConfig?.visualPageTitle }}
		</div>
		<div class="system w260px">
			<div class="shadow-lg shadow-cyan-500/50 p5 mt12px w130px systemText" @click="handleGoback">
				<SystemIcon class="ml-8px" />
				<span class="ml-8px text-#6a9fbe">进入操作系统</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useUserInfo } from '@/store/modules/user.js'
import SystemIcon from './SystemIcon.vue'
import { usePermission } from '@/store/modules/permission'
const { state: userPageState } = useUserInfo()

const { state: permissionState } = usePermission()

const clipDate = ref('')
const clipTime = ref('')

onMounted(() => {
	getTime()
})

function getTime() {
	clipDate.value = dayjs().format('YYYY-MM-DD')
	clipTime.value = dayjs().format('HH:mm:ss')
	setTimeout(() => {
		getTime()
	}, 1000)
}

function handleGoback() {
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
	height: 8.333%;
	background: url(../../material/template-02.svg) no-repeat center;
	background-size: contain;
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
		white-space: nowrap;
	}
	.header-light {
		width: 100%;
		height: 100%;
		position: relative;
		mask-image: linear-gradient(160deg, orange 80%, transparent 80%); // 增加遮罩蒙版
		mix-blend-mode: overlay; // 增加颜色混合模式
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			top: 0;
			width: 126px;
			height: 95%;
			display: block;
			position: absolute;
			background-image: linear-gradient(
				126deg,
				transparent 30%,
				#51d1fc 48%,
				#e4f9ff 50%,
				#f9f9f9 52%,
				transparent 70%
			); // 反光元素
			animation: scanning 5s infinite linear;
			opacity: 0.7;
		}
		@keyframes scanning {
			0% {
				left: -20px;
				opacity: 0;
			}
			10% {
				opacity: 0.7;
			}
			70% {
				opacity: 0.7;
			}
			80% {
				left: 90%;
				opacity: 0;
			}
			100% {
				right: 0px;
				opacity: 0;
			}
		}
	}
	.name {
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 32px;
		font-family: HarmonyOS Sans SC-Medium, HarmonyOS Sans SC;
		font-weight: 600;
		// color: #129bff;
		letter-spacing: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: rainbow 5s alternate infinite forwards;
	}
	@keyframes rainbow {
		0% {
			color: #dfdc29;
		}
		100% {
			color: #8fefed;
		}
	}

	.system {
		.systemText {
			position: relative;
			cursor: pointer;
			border: 1px solid #448681;
			border-radius: 2px;

			&::before,
			&::after {
				content: '';
				position: absolute;
				width: 10px;
				height: 20px;
				transition: 0.3s ease-in-out;
			}

			&::before {
				top: -5px;
				left: -5px;
				border-top: 1px solid #54bae9;
				border-left: 1px solid #20b4ad;
			}

			&::after {
				right: -5px;
				bottom: -5px;
				border-bottom: 1px solid #54bae9;
				border-right: 1px solid #20b4ad;
			}

			&:hover::before,
			&:hover::after {
				width: calc(100% + 2px);
				height: calc(100% + 2px);
			}
		}
	}
}
</style>
