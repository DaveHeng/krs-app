<template>
	<a-table
		bordered
		:columns="columns"
		:data-source="list"
		:scroll="{
			scrollToFirstRowOnChange: true,
			y: `${scrollHeight}px`,
			x: 'max-content'
		}"
		:pagination="false"
	>
		<template #bodyCell="{ column, record, index }">
			<template v-if="column.key === 'index'">
				<div>{{ index + 1 }}</div>
			</template>
			<template v-if="column.key === 'connectState'">
				<!-- <div>{{ dictItemMap[record.connectState] || '-' }}</div> -->
				<!-- <ConnectTypeTag :code="record.connectState" /> -->
			</template>
		</template>
	</a-table>
</template>

<script setup>
// import StatusTag from '@/components/common/StatusTag.vue'
// import { LocationIcon } from '@/components/Icons/index'
// import { COLORMAP } from '../../../components/static'
import dayjs from 'dayjs'
import { useVirtualList } from '@/utils/hooks/useVirtualList'
const { virtualState, resetVirtualHandler } = useVirtualList()

const emit = defineEmits(['update'])
// const { tableState } = useTableConfig()
const tableKey = 'onlineTableConfig'
const props = defineProps({
	limitQuery: {
		type: Object,
		default: () => ({})
	},
	scrollHeight: {
		type: Number,
		default: 0
	},
	loading: {
		type: Boolean,
		default: false
	},
	dataSource: {
		type: Array,
		default: () => []
	},
	count: {
		type: Number,
		default: 0
	},
	dictItemMap: {
		type: Object,
		default: () => ({})
	},
	dict: {
		type: Object,
		default: () => ({})
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

watch(
	() => props.count,
	(count, prevCount) => {
		resetVirtualHandler(props.dataSource.length)
	},
	{ immediate: true }
)

const list = computed(() => {
	return props.dataSource.slice(virtualState.startCount, virtualState.endCount)
})
</script>
<style lang="less" scoped>
.up {
	animation: up 1s ease-out;
}

.down {
	animation: down 1s ease-out;
}
:deep(.ant-table-tbody) tr {
	position: relative;
}

@keyframes up {
	0% {
		background-color: transparent;
	}

	50% {
		background-color: #fd4040;
	}

	100% {
		background-color: transparent;
	}
}

@keyframes down {
	0% {
		background-color: transparent;
	}

	50% {
		background-color: #1eb955;
	}

	100% {
		background-color: transparent;
	}
}

.tag {
	top: 0;
	// transform: translateY(-50%);
	// background: #1eb955;
}
::v-deep(.ant-table-row) {
	height: 66px !important;
	overflow-anchor: none;
}
::v-deep(.ant-table-tbody) {
	overflow-anchor: none;
}

::v-deep(.ant-table-body) {
	overflow-anchor: none;
}
.installPosition {
	width: 120px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
}
</style>
