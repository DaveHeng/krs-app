<template>
	<CommonConditionContainer>
		<div class="flex items-center" v-if="state.mode === 'check'">
			<CommonCondition
				:layout="['time']"
				@search="params => onSearch(params, normalizeQueryParams)"
			>
				<template #after>
					<a-form-item>
						<a-button @click="onChangeMode('edit')" type="primary" ghost
							><BatchEditIcon />批量操作</a-button
						></a-form-item
					>
				</template>
			</CommonCondition>
		</div>
		<div class="flex items-center mb9px" v-else>
			<a-space>
				<a-button class="batch-operation-btn" @click="onBatchHandle"
					><DeleteOutlined />批量删除</a-button
				>
				<a-button type="primary" ghost @click="onChangeMode('check')"
					><CancelIcon />取消操作</a-button
				>
			</a-space>
		</div>
	</CommonConditionContainer>
	<CommonContentContainer>
		<template #content="{ height }">
			<List
				:limitQuery="limitQuery"
				:scrollHeight="height"
				:loading="state.loading"
				:dataSource="state.list"
				:mode="state.mode"
				:selectedList="state.selectIds"
				:onSelectChange="onSelectChange"
				:onOpenDialog="onOpenEditDialog"
				:onUpdateList="updateList"
				:onDelete="onDelete"
			/>
		</template>
	</CommonContentContainer>
</template>

<script setup>
import { BatchEditIcon, CancelIcon } from '@/components/Icons'
import { usePage } from '@/utils/hooks/usePage'
import List from './components/List.vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { message } from '@/components/feedBackContext.js'

const {
	limitQuery,
	querySearch,
	state,
	updateList,
	onSearch,
	onSelectChange,
	onConfirm,
	onDelete,
	onOpenAddDialog,
	onOpenEditDialog,
	onCloseDialog,
	onChangeMode
} = usePage({
	transformFn: transformList,
	immediate: false
})

function transformList(list) {
	console.log(dictItemMap)
	if (!dictCount.value) return list
	const result = []
	list.forEach(item => {
		const temp = { ...item }
		for (let key in item.data) {
			temp[dictItemMap[key]] = item.data[key]
		}
		result.push(temp)
	})
	return result
}

function normalizeQueryParams(query) {
	if (query.alarmState) {
		query.isAlarm = query.alarmState
		delete query.alarmState
	}
	if (query.pointSelect) {
		query.pointId = query.pointSelect
		delete query.pointSelect
	}
}
function onBatchHandle() {
	if (!state.selectIds.length) {
		message.error('请选择要删除的数据')
		return
	} else {
		onDelete(state.selectIds)
	}
}
</script>

<style lang="less" scoped></style>
