<template>
	<a-form :model="state" layout="inline" class="form">
		<slot name="before"></slot>
		<a-form-item label="IP地址：" v-if="layout.includes('ip')">
			<IpInput @changeIp="onChangeIp" />
		</a-form-item>
		<a-form-item label="安装位置：" v-if="layout.includes('location')">
			<a-input
				allowClear
				v-model:value="state.location"
				class="w-180-important"
				placeholder="请输入安装位置"
			/>
		</a-form-item>
		<a-form-item v-if="layout.includes('mapName')" label="地图名称：">
			<a-input
				class="w-180-important"
				v-model:value="state.mapName"
				placeholder="请输入地图名称"
				allowClear
			/>
		</a-form-item>
		<a-form-item v-if="layout.includes('mapStatus')" label="地图状态：">
			<a-select
				v-model:value="state.mapStatus"
				allowClear
				class="w-180-important"
				placeholder="请选择地图状态"
			>
				<a-select-option :value="1">使用</a-select-option>
				<a-select-option :value="0">禁用</a-select-option>
			</a-select>
		</a-form-item>
		<a-form-item label="选择时间：" v-if="layout.includes('time')">
			<a-range-picker v-model:value="state.time" allowClear format="YYYY-MM-DD" />
		</a-form-item>

		<!-- 时间限制 -->

		<a-form-item label="选择时间：" v-if="layout.includes('limitTime')">
			<a-range-picker
				v-model:value="state.time"
				:disabledDate="disabledDate"
				@calendarChange="onCalendarChange"
				@openChange="onOpenChange"
				allowClear
				format="YYYY-MM-DD"
			/>
		</a-form-item>
		<a-form-item v-if="layout.includes('dictCode')" label="字典码：">
			<a-input
				v-model:value="state.dictCode"
				placeholder="请输入字典码"
				allowClear
				class="w-180-important"
			/>
		</a-form-item>
		<a-form-item v-if="layout.includes('dictName')" label="中文：">
			<a-input
				placeholder="请输入中文名称"
				v-model:value="state.dictName"
				allowClear
				class="w-180-important"
			/>
		</a-form-item>
		<a-form-item>
			<a-button type="primary" @click="handleSearch">
				<SearchOutlined />
				查询
			</a-button>
		</a-form-item>
		<slot name="after"></slot>
	</a-form>
</template>

<script setup>
import dayjs from 'dayjs'
import IpInput from './IpInput.vue'
const emit = defineEmits(['search'])
const props = defineProps({
	layout: {
		type: Array,
		default: () => []
	}
})

const state = reactive({
	dictCode: '',
	dictName: '',
	time: [],
	ip: '',
	location: ''
})

const limitTime = ref()

function handleSearch() {
	const query = {}
	for (let key in state) {
		if (state[key]?.toString().length > 0) {
			query[key] = typeof state[key] === 'string' ? state[key].trim() : state[key]
		}
	}
	/* if (query?.ipStr && !validateIP(query.ipStr)) {
		message.error('请输入正确的IP地址')
		return
	} */
	if (query?.time?.length) {
		query.startTime = dayjs(query.time[0]).format('YYYY-MM-DD')
		query.endTime = dayjs(query.time[1]).format('YYYY-MM-DD')
		delete query.time
	}
	emit('search', query)
}

function onChangeCollieryId(val) {
	state.pointSelects = []
	state.pointSelect = ''
	// if (!val) {
	// 	state.pointSelect = ''
	// }
	emit('changeCollieryId', val)
}

function onChangeIp(val) {
	state.ip = val
}

const disabledDate = current => {
	if (!limitTime.value || limitTime.value.length === 0) {
		return false
	}
	const tooLate = limitTime.value[0] && current.diff(limitTime.value[0], 'days') > 31
	const tooEarly = limitTime.value[1] && limitTime.value[1].diff(current, 'days') > 31
	return tooEarly || tooLate
}

function onCalendarChange(val) {
	limitTime.value = val
}

function onOpenChange(open) {
	if (open) limitTime.val = []
}
</script>

<style lang="less" scoped>
.form {
	::v-deep(.ant-form-item) {
		margin-bottom: 9px !important;
	}
}
</style>
