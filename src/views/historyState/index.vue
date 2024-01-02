<template>
	<CommonConditionContainer>
		<div class="flex items-center" v-if="state.mode === 'check'">
			<CommonCondition :layout="['time']" @search="onSearch"> </CommonCondition>
		</div>
	</CommonConditionContainer>
	<CommonContentContainer>
		<template #content="{ height }">
			<Chart :scrollHeight="height + 122" />
		</template>
	</CommonContentContainer>
</template>

<script setup>
import { usePage } from '@/utils/hooks/usePage'
import { message } from '@/components/feedBackContext.js'
import { usePermission } from '@/store/modules/permission'
import Chart from './components/chart.vue'

const {
	state: { permissionBtns: btnMap }
} = usePermission()
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
	immediate: false
})

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
