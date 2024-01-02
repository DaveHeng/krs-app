<template>
	<a-table
		:row-selection="
			mode === 'check'
				? undefined
				: {
						selectedRowKeys,
						fixed: 'left',
						type: 'checkbox',
						...rowSelection
				  }
		"
		:data-source="dataSource"
		:columns="columnComputer"
		:loading="loading"
		rowKey="id"
		:scroll="{
			scrollToFirstRowOnChange: true,
			y: `${scrollHeight}px`,
			x: 'max-content'
		}"
		:pagination="{
			current: limitQuery.pageIndex,
			pageSize: limitQuery.pageSize,
			total: limitQuery.total,
			position: ['bottomCenter'],
			showTotal: total => `共 ${limitQuery.total} 条`,
			showQuickJumper: true,
			showSizeChanger: true
		}"
		@change="
			e =>
				onUpdateList({
					pageIndex: e.current,
					pageSize: e.pageSize
				})
		"
	>
		<template #bodyCell="{ column, record, index }">
			<template v-if="column.key === 'index'">
				<div>{{ limitQuery.pageSize * (limitQuery.pageIndex - 1) + index + 1 }}</div>
			</template>
			<template v-if="column.key === 'operate'">
				<a-tooltip title="删除" shape="circel" @click="onDelete(record.id)">
					<a-button type="primary">
						<DeleteOutlined />
						删除
					</a-button>
				</a-tooltip>
			</template>
			<template v-if="['压差', '温度'].includes(column.key)">
				<div>{{ record[column.key] || '-' }}</div>
			</template>
		</template>
	</a-table>
</template>
<script setup>
import dayjs from 'dayjs'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { usePermission } from '@/store/modules/permission'
import { message } from '@/components/feedBackContext.js'
const {
	state: { permissionBtns: btnMap }
} = usePermission()
const props = defineProps({
	limitQuery: {
		type: Object,
		default: () => ({})
	},
	dataSource: {
		type: Array,
		default: () => []
	},
	loading: {
		type: Boolean,
		default: false
	},
	mode: {
		type: String,
		default: 'check'
	},
	selectedList: {
		type: Array,
		default: () => []
	},
	onSelectChange: {
		type: Function,
		default: keys => {}
	},
	onOpenDialog: {
		type: Function,
		default: () => {}
	},
	onUpdateList: {
		type: Function,
		default: () => {}
	},
	scrollHeight: {
		type: Number,
		default: 0
	},
	onDelete: {
		type: Function,
		default: () => {}
	}
})
const selectedRowKeys = computed({
	get: () => props.selectedList,
	set: val => {
		return val
	}
})

const columns = [
	{
		dataIndex: 'index',
		key: 'index',
		title: '序号',
		width: 80,
		align: 'center'
	}
]

function getOperateBar() {
	return [!!btnMap['History Data:D']].includes(true)
		? [
				{
					title: '操作',
					dataIndex: 'operate',
					key: 'operate',
					fixed: 'right',
					align: 'center',
					width: 150
				}
		  ]
		: []
}

const columnComputer = computed(() => {
	return [...columns, ...getOperateBar()]
})

const rowSelection = {
	onChange: keys => {
		props.onSelectChange(keys)
	}
	/* getCheckboxProps: record => {
		return {
			disabled: record.alarmStatus === 2003
		}
	} */
}
</script>
