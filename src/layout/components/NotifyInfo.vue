<template>
	<a-popover placement="bottomRight">
		<template #title>
			<div class="flex justify-between">
				<!-- <a-badge
					:count="list.length"
					:offset="[-20, 0]"
					:overflowCount="99"
					:style="{ zIndex: 99 }"
				>
					<a-radio-group v-model:value="state.radio">
						<a-radio-button value="a">告警列表</a-radio-button>
					</a-radio-group>
				</a-badge> -->
				<span class="flex">
					<NotifyIconRed
						v-if="list.length !== 0"
						:style="{ color: '#F00F00', fontSize: '26px' }"
						class="animate__animated animate__tada animate__infinite infinite"
					/>
					<p class="ml-10px fs-16 leading-10px c-#606060 font-normal cursor-default">告警列表</p>
				</span>
				<a-Button class="c-#5da9ef" type="link" @click="onGoPage"> 查看更多 </a-Button>
			</div>
		</template>
		<template #content>
			<div class="max-h-270px overflow-auto">
				<div v-for="item of list" :key="item.id" class="w324px overflow-auto">
					<div class="notify-item">
						<div class="name">【{{ item.installPosition }}】</div>
						<div class="alarm-desc">
							{{ dict[1000]?.find(e => e.code === item.alarmType)?.nameCn }}：
							{{ item.alarmDiscribe }}
						</div>
						<a-button type="primary" danger @click="onGoPage"> 查看 </a-button>
					</div>
				</div>
				<a-empty
					v-if="list.length === 0"
					:image="Empty.PRESENTED_IMAGE_SIMPLE"
					:style="{ margin: '40px auto', width: '310px', height: '100px' }"
				/>
			</div>
		</template>
		<div class="mr20px">
			<span class="flex cursor-pointer">
				<a-badge :count="list.length" class="mr15px">
					<NotifyIcon class="mb1px" :style="{ color: '#fdff00', fontSize: '28px' }" />
				</a-badge>
			</span>
		</div>
	</a-popover>
</template>

<script setup>
import { useAlarmData } from '@/store/modules/alarmData'
import { useDict } from '@/utils/hooks/useDict'
import { NotifyIcon, NotifyIconRed } from '@/components/Icons/index'
import { useRouter } from 'vue-router'
import { Empty } from 'ant-design-vue'
// const [dict] = useDict([1000])
const { state: alarmData } = useAlarmData()
const router = useRouter()

const list = computed(() => {
	return alarmData.list.filter(e => e.alarmEndTime <= 0 && e.alarmStatus === 2001) || []
})

// 跳转
function onGoPage() {
	router.push('/data-search/alarmData')
}
</script>

<style lang="less" scoped>
.nofity {
	width: 32px;
	height: 32px;
	border-radius: 10px;
	transition: all 0.3s;
	margin-right: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background: rgba(0, 0, 0, 0.15);
	}
}

.notify-item {
	width: 310px;
	margin: 0 auto 9px;
	padding: 4px 22px 4px 6px;
	box-sizing: border-box;
	font-size: 14px;
	font-family: Microsoft YaHei-Light, Microsoft YaHei;
	color: #3d3d3d;
	line-height: 22px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	&:hover {
		background: #f7f7f7;
	}
	.title {
		margin-bottom: 8px;
	}

	.name {
		white-space: nowrap;
	}

	.alarm-desc {
		white-space: nowrap;
		width: 100px;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>
