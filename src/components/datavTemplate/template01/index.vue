<template>
	<div class="wrap">
		<div class="title-container">
			<div class="title-left">
				<div class="hour">{{ pageState.hour }}</div>
				<div class="year">
					{{ pageState.year }}
					<br />
					{{ pageState.day }}
				</div>
			</div>
			<div class="title">
				<div class="name">
					<img
						v-for="item of userPageState.pageConfig?.info"
						class="w46px h46px mr18px"
						:src="item.logo"
					/>
					{{ userPageState.pageConfig?.visualPageTitle }}
				</div>
			</div>
			<div class="title-right" @click="handleGoback">
				<img src="../material/template01-btn.svg" />
			</div>
		</div>
		<div class="chart-container">
			<div class="left">
				<div class="chart-box chart-box-top">
					<Border01 :style="{ width: '100%', height: '100%' }" />
					<slot name="leftTop"></slot>
				</div>
				<div class="chart-box chart-box-bot">
					<Border02 :style="{ width: '100.4%', height: '100%' }" />
					<slot name="leftBot"></slot>
				</div>
			</div>
			<div class="mid">
				<slot name="mid"></slot>
			</div>
			<div class="right">
				<div class="chart-box chart-box-top">
					<Border01 :style="{ width: '100%', height: '100%' }" />
					<slot name="rightTop"></slot>
				</div>
				<div class="chart-box chart-box-bot">
					<Border02 :style="{ width: '100.4%', height: '100%' }" />
					<slot name="rightBot"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import dayjs from 'dayjs'
import Border01 from './components/border01.vue'
import Border02 from './components/border02.vue'
import { useUserInfo } from '@/store/modules/user.js'
import { usePermission } from '@/store/modules/permission'
const { state: userPageState } = useUserInfo()
const { state: permissionState } = usePermission()

let timeing = null
const WEEK = ['日', '一', '二', '三', '四', '五', '六']
const props = defineProps({
	title: {
		type: String,
		default: 'template'
	}
})
const pageState = reactive({
	year: '',
	hour: '',
	day: '',
	loading: false
})
onMounted(() => {
	// pageState.loading = true
	timeing = setInterval(() => {
		pageState.year = dayjs(+new Date()).format('YYYY-MM-DD')
		pageState.hour = dayjs(+new Date()).format('HH:mm:ss')
		pageState.day = `星期${WEEK[dayjs().day()]}`
	}, 1000)
	/* setTimeout(() => {
		pageState.loading = false
	}, 1000) */
})

function handleGoback() {
	const path = permissionState.routesFlat[0].children[1].path
	router.replace(path || '/online-monitoring')
}

onBeforeMount(() => {
	if (timeing) clearInterval(timeing)
})
</script>

<style lang="less" scoped>
.wrap {
	background: linear-gradient(180deg, #27456f 0%, #93cdde 100%);
	width: 100%;
	height: 100%;
	.title-container {
		width: 100%;
		width: 100%;
		height: 102px;
		display: flex;
		align-items: center;
		.title-left {
			width: calc((100% - 1342px) / 2);
			color: #fff;
			height: 100%;
			display: flex;
			justify-content: center;
			.hour {
				width: 146px;
				font-size: 36px;
				font-family: Microsoft YaHei-Bold, Microsoft YaHei;
				font-weight: 700;
				color: #ffffff;
				line-height: 102px;
				height: 100%;
			}
			.year {
				font-size: 14px;
				font-family: Microsoft YaHei-Bold, Microsoft YaHei;
				font-weight: 700;
				color: #ffffff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				height: 102px;
				margin-left: 9px;
			}
		}
		.title {
			width: 1342px;
			margin: 0 auto;
			height: 100%;
			font-size: 36px;
			font-family: Source Han Sans CN-Bold, Source Han Sans CN;
			font-weight: 700;
			color: #ffffff;
			line-height: 102px;
			text-align: center;
			background: url('../material/template-01.png') no-repeat center;
			background-size: 100%;
			position: relative;
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
		}
		.title-right {
			width: calc((100% - 1342px) / 2);
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.header-light {
			position: relative;
			mask-image: linear-gradient(160deg, orange 80%, transparent 80%); // 增加遮罩蒙版
			// mix-blend-mode: overlay; // 增加颜色混合模式
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
				opacity: 0.3;
			}
			@keyframes scanning {
				0% {
					left: -20px;
					opacity: 0;
				}
				10% {
					opacity: 0.3;
				}
				70% {
					opacity: 0.3;
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
	}

	.chart-container {
		width: 100%;
		height: calc(100% - 102px);
		padding: 0 14px 14px;
		box-sizing: border-box;
		display: flex;
		.left {
			width: calc((100% - 28px) / 3);
			height: 100%;
		}
		.mid {
			margin: 0 14px;
			width: calc((100% - 28px) / 3);
			position: relative;
			// background-color: red;
			height: 100%;
		}
		.right {
			width: calc((100% - 28px) / 3);
			height: 100%;
		}
		.chart-box {
			width: 100%;
			height: calc((100% - 14px) / 2);
			position: relative;
			margin-bottom: 14px;
			&:nth-last-child(1) {
				margin-bottom: 0;
			}
		}

		.chart-box-top {
			/* background: url('../../../../assets/image/module01-top-bg.svg') no-repeat
				center;
			background-size: auto 100%; */
		}

		.chart-box-bot {
			/* background: url('../../../../assets/image/module01-bot-bg.png') no-repeat
				center;
			background-size: auto 100%; */
		}
	}
}
</style>
