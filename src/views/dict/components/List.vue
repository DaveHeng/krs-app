<template>
	<a-table
		:loading="loading"
		:columns="columns"
		childrenColumnName="childrens"
		:expandedRowKeys="expandedRowKeys"
		:dataSource="list"
		:scroll="{
			scrollToFirstRowOnChange: true,
			y: `${scrollHeight}px`,
			x: 'max-content'
		}"
		rowKey="code"
		:pagination="false"
		@expand="onExpand"
	>
		<template #bodyCell="{ column, record, index }">
			<template v-if="column.key === 'code'">
				<div v-html="findItem(record.code, code)"></div>
			</template>
			<template v-if="column.key === 'icon'">
				
			</template>
			<template v-if="column.key === 'isAbandon'">
				<div>
					{{ record.isAbandon ? '是' : '否' }}
				</div>
			</template>
			<template v-if="column.key === 'nameCn'">
				<div v-html="findItem(record.nameCn, nameCn)"></div>
			</template>
			<template v-if="column.key === 'operate'">
				<a-space>
					<!-- 新增 -->
					<a-config-provider
						v-if="record.parentCode === 0"
						:theme="{ token: { colorPrimary: '#52C41A' } }"
					>
						<a-tooltip v-if="btnMap['Dict:A']" title="新增">
							<a-button
								type="primary"
								@click="() => onAddItem(record.code)"
								size="small"
								shape="circle"
							>
								<PlusCircleOutlined />
							</a-button>
						</a-tooltip>
					</a-config-provider>
					<!-- 编辑 -->
					<a-config-provider :theme="{ token: { colorPrimary: '#F5A623' } }">
						<a-tooltip v-if="btnMap['Dict:E']" title="编辑">
							<a-button
								type="primary"
								@click="() => onUpdateItem(record)"
								size="small"
								shape="circle"
							>
								<FormOutlined />
							</a-button>
						</a-tooltip>
					</a-config-provider>
					<!-- 删除 -->
					<a-tooltip v-if="btnMap['Dict:D']" title="删除">
						<a-button danger @click="() => onConfirm(record)" size="small" shape="circle">
							<DeleteOutlined />
						</a-button>
					</a-tooltip>
				</a-space>
			</template>
		</template>
	</a-table>
</template>

<script setup>
import { message, modal } from '@/components/feedBackContext.js'
import { deleteDictItem } from '@/api/dict'
import { usePermission } from '@/store/modules/permission'
const {
	state: { permissionBtns: btnMap }
} = usePermission()
const props = defineProps({
	// 传入的数据
	scrollHeight: {
		type: Number,
		default: 0
	},
	loading: {
		type: Boolean,
		default: false
	},
	list: {
		type: Array,
		default: () => []
	},
	code: {
		type: String,
		default: undefined
	},
	nameCn: {
		type: String,
		default: undefined
	},
	onAddItem: {
		type: Function,
		default: () => parentCode => {}
	},
	onUpdateItem: {
		type: Function,
		default: () => item => {}
	},
	onUpdate: {
		type: Function,
		default: () => () => {}
	}
})

const expandedRowKeys = ref([])
const columns = [
	{
		title: '字典英文名',
		dataIndex: 'nameEn',
		key: 'nameEn',
		width: 300
	},
	{
		title: 'ICON',
		dataIndex: 'icon',
		key: 'icon',
		align: 'center',
		width: 80
	},
	{
		title: '字典码',
		dataIndex: 'code',
		key: 'code',
		align: 'center',
		width: 100
	},
	{
		title: '是否弃用',
		dataIndex: 'isAbandon',
		key: 'isAbandon',
		align: 'center',
		width: 100
	},
	{
		title: '父级编码',
		dataIndex: 'parentCode',
		width: 150,
		key: 'parentCode',
		align: 'center'
	},
	{
		title: '中文',
		dataIndex: 'nameCn',
		width: 200,
		key: 'nameCn',
		align: 'center'
	},
	{
		title: '字典值',
		dataIndex: 'cValue',
		key: 'cValue',
		width: 100,
		align: 'center'
	},
	{
		title: '描述',
		dataIndex: 'describe',
		key: 'describe',
		align: 'center',
		width: 200
	},
	{
		title: '操作',
		dataIndex: 'operate',
		key: 'operate',
		width: 150,
		fixed: 'right',
		align: 'center'
	}
]

// 查找展开的行的样式
function findItem(source, target) {
	const temp = source.toString()
	const index = temp.indexOf(target)
	if (index > -1) {
		const before = temp.slice(0, index)
		const after = temp.slice(index + target.length)
		return `<div>${before}<span style=color:red;>${target}</span>${after}<div>`
	} else {
		return `<div>${source}</div>`
	}
}

watch(
	() => props.code,
	() => {
		console.log('变化', props.code)
		expandedRowKeys.value = findExpandedRowKeys(props.code, props.nameCn, props.list)

		console.log(expandedRowKeys.value)
	}
)

watch(
	() => props.nameCn,
	() => {
		expandedRowKeys.value = findExpandedRowKeys(props.code, props.nameCn, props.list)
	}
)
// 递归查找展开行
function findExpandedRowKeys(code, nameCn, list) {
	const result = []
	list.forEach(item => {
		console.log(item.nameCn.includes(nameCn))
		if (item.code.toString().includes(code) || item.nameCn.includes(nameCn)) {
			result.push(!item.parentCode ? item.code : item.parentCode)
		} else {
			if (item.childrens && item.childrens.length > 0) {
				const temp = findExpandedRowKeys(code, nameCn, item.childrens)
				if (temp.length > 0) {
					result.push(item.code, ...temp)
				}
			}
		}
	})

	return [...new Set(result)]
}

// 展开行
function onExpand(expanded, record) {
	if (expanded) {
		expandedRowKeys.value = [...expandedRowKeys.value, record.code]
	} else {
		const index = expandedRowKeys.value.indexOf(record.code)
		expandedRowKeys.value = [
			...expandedRowKeys.value.slice(0, index),
			...expandedRowKeys.value.slice(index + 1)
		]
	}
}
// 删除
function onConfirm(record) {
	modal.confirm({
		title: '提示',
		content: '确定删除该字典吗？',
		// okButtonProps: { icon: okIcon },
		// cancelButtonProps: { icon: cancelIcon },
		onOk: () => {
			deleteDictItem([record.id]).then(() => {
				message.success('删除成功')
				props.onUpdate()
			})
		}
	})
}
</script>

<style lang="less" scoped></style>
