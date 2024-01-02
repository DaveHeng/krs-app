<template>
	<div class="header">
		<div class="box">
			<div class="icon">
				<!-- <img :src="DeviceTotalIcon" class="w100% h100%" /> -->
			</div>
			<div class="right">
				<div class="title">设备总数</div>
				<div class="number">
					{{ info.totalCount || 0 }}
					<span>个</span>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="icon">
				<!-- <img :src="DeviceNormalIcon" class="w100% h100%" /> -->
			</div>
			<div class="right">
				<div class="title">正常</div>
				<div class="number">
					{{ info.nomalCount || 0 }}
					<span>个</span>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="icon">
				<!-- <img :src="DeviceUnkonwIcon" class="w100% h100%" /> -->
			</div>
			<div class="right">
				<div class="title">未知</div>
				<div class="number">
					{{ info.unknowCount || 0 }}
					<span>个</span>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="icon">
				<!-- <img :src="DeviceBreakIcon" class="w100% h100%" /> -->
			</div>
			<div class="right">
				<div class="title">断开</div>
				<div class="number">
					{{ info.disconnectCount || 0 }}
					<span>个</span>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="icon">
				<!-- <img :src="DeviceWarnIcon" class="w100% h100%" /> -->
			</div>
			<div class="right">
				<div class="title">告警</div>
				<div class="number">
					{{ info.alarmCount || 0 }}
					<span>个</span>
				</div>
			</div>
		</div>
		<div class="box">
			<div class="icon">
				<!-- <img :src="DeviceFaultIcon" class="w100% h100%" /> -->
			</div>
			<div class="right">
				<div class="title">故障</div>
				<div class="number">
					{{ info.faultCount || 0 }}
					<span>个</span>
				</div>
			</div>
		</div>
		<div class="time-box">
			<!-- <div class="time-title">数据刷新时间</div> -->
			<div class="time" :style="{ fontSize: '16px' }">
				{{ refreshTime.slice(0, 10) }}
			</div>
			<div class="time" :style="{ fontSize: '22px' }">
				{{ refreshTime.slice(11) }}
			</div>
		</div>
	</div>
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
	info: {
		type: Object,
		default: () => ({})
	},
	refreshTime: {
		type: String,
		default: ''
	}
})
</script>

<style lang="less" scoped>
.header {
	width: 100%;
	display: flex;
	align-items: center;
	// border-bottom: 1px solid #f2f3f5;
	padding: 0 9px;
	box-sizing: border-box;
	.box {
		width: calc(16.666% + 40px);
		height: 96px;
		padding-left: 20px;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		// justify-content: center;
		&:nth-of-type(1) {
			color: #3182ce;
		}
		&:nth-of-type(2) {
			color: #15a30e;
		}
		&:nth-of-type(3) {
			color: #808080;
		}
		&:nth-of-type(4) {
			color: #0a46d9;
		}
		&:nth-of-type(5) {
			color: #cc0000;
		}
		&:nth-of-type(6) {
			color: #edb208;
		}
		&::after {
			content: '';
			position: absolute;
			right: 0;
			top: 20px;
			width: 1px;
			height: 60px;
			background-color: #f2f3f5;
		}
		.icon {
			width: 54px;
			height: 54px;
			margin-right: 12px;
			// box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
		}

		.right {
			min-width: 60px;
			.title {
				font-size: 12px;
				line-height: 20px;
				letter-spacing: 5px;
				margin-bottom: 8px;
				white-space: nowrap;
			}

			.number {
				font-size: 20px;
				font-family: Nunito Sans-SemiBold, Nunito Sans;
				font-weight: 600;
				line-height: 28px;

				span {
					font-size: 12px;
					font-family: Microsoft YaHei-Light, Microsoft YaHei;
					font-weight: 290;
					color: #4e5969;
					line-height: 20px;
					margin-left: 13px;
				}
			}
		}
	}

	.time-box {
		width: calc(16.666% + 80px);
		text-align: center;

		.time-title {
			font-size: 12px;
			font-family: Microsoft YaHei-Light, Microsoft YaHei;
			font-weight: 290;
			color: #1d2129;
			line-height: 20px;
			margin-bottom: 7px;
		}

		.time {
			font-family: Nunito Sans-SemiBold, Nunito Sans;
			font-weight: 600;
			color: #51cbff;
			line-height: 28px;
			white-space: nowrap;
		}
	}
}

@media (min-width: 1499px) {
	.box {
		.icon {
			width: 54px;
			height: 54px;
		}
	}
}
@media (max-width: 1499px) {
	.box {
		.icon {
			width: 30px !important;
			height: 30px !important;
		}
	}
}
</style>
