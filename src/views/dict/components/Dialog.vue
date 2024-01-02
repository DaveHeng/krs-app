<template>
	<a-modal
		:open="open"
		width="480px"
		@ok="onSubmitForm"
		:bodyStyle="{ paddingLeft: '50px' }"
		@cancel="onCancel"
		:confirmLoading="confirmLoading"
	>
		<template #title>
			<div v-if="operationType === 'add'">
				<DialogAddIcon />
				<span class="ml10px">新增</span>
			</div>
			<div v-else>
				<DialogEditIcon />
				<span class="ml10px">编辑</span>
			</div>
		</template>
		<a-form ref="form" :labelCol="{ span: 5 }" :model="formState">
			<a-form-item label="父级名称：">
				<div>{{ parentName }}</div>
			</a-form-item>
			<a-form-item
				label="英文名称："
				name="nameEn"
				:rules="[{ required: true, message: '请输入英文名称' }]"
			>
				<a-input
					placeholder="请输入英文名称"
					class="w250px"
					v-model:value="formState.nameEn"
				/>
			</a-form-item>
			<a-form-item
				label="中文名称："
				name="nameCn"
				:rules="[{ required: true, message: '请输入中文名称' }]"
			>
				<a-input
					placeholder="请输入中文名称"
					class="w250px"
					v-model:value="formState.nameCn"
				/>
			</a-form-item>
			<a-form-item
				label="字典码："
				name="code"
				:rules="[{ required: true, message: '请输入字典码' }]"
			>
				<a-input-number
					placeholder="请输入字典码"
					class="w250px"
					v-model:value="formState.code"
				/>
			</a-form-item>
			<a-form-item
				label="字典值："
				name="cValue"
				:rules="[{ required: true, message: '请输入字典值' }]"
			>
				<a-input
					placeholder="请输入字典值"
					class="w250px"
					v-model:value="formState.cValue"
				/>
			</a-form-item>
			<a-form-item
				label="是否废弃："
				name="isAbandon"
				:rules="[{ required: true }]"
			>
				<a-switch
					v-model:checked="formState.isAbandon"
					checked-children="是"
					un-checked-children="否"
				/>
			</a-form-item>
			<a-form-item label="描述：" name="describe">
				<a-textarea
					placeholder="请输入描述"
					class="w250px"
					v-model:value="formState.describe"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup>
import { message } from '@/components/feedBackContext.js'
import { addDictItem, updateDictItem } from '@/api/dict'
import {
	// CancelIcon,
	// ConfirmIcon,
	DialogAddIcon,
	DialogEditIcon
} from '@/components/Icons/index'
// const confirmIcon = h(ConfirmIcon)
// const cancelIcon = h(CancelIcon)
const props = defineProps({
	info: {
		type: Object,
		default: () => ({})
	},
	disvisible: {
		type: Boolean,
		default: false
	},
	onCloseDialog: {
		type: Function,
		default: () => () => {}
	},
	operationType: {
		type: String,
		default: ''
	},
	onUpdate: {
		type: Function,
		default: () => () => {}
	},
	parentName: {
		type: String,
		default: ''
	}
})
const confirmLoading = ref(false)
const form = ref(null)
const formState = reactive({
	nameEn: '',
	nameCn: '',
	code: '',
	cValue: '',
	describe: '',
	isAbandon: false
})

const open = computed({
	get: () => props.disvisible,
	set: val => props.onCloseDialog()
})

watch(
	() => props.disvisible,
	val => {
		if (val && props.operationType === 'edit') {
			setTimeout(() => {
				for (let key in formState) {
					formState[key] = props.info[key]
				}
			}, 200)
		}
	}
)

// 提交按钮
async function onSubmitForm() {
	try {
		await form.value.validateFields()
		onFinish(formState)
	} catch (error) {}
}

// 取消按钮
function onCancel() {
	form.value.resetFields()
	props.onCloseDialog()
}
// 提交表单
async function onFinish(values) {
	try {
		confirmLoading.value = true
		if (props.operationType === 'add') {
			await addDictItem({ ...values, parentCode: props.info?.parentCode })
		} else {
			await updateDictItem({
				...values,
				parentCode: props.info?.parentCode,
				id: props.info?.id
			})
		}
		message.success('操作成功')
		onCancel()
		props.onUpdate()
	} catch (error) {}
	setTimeout(() => (confirmLoading.value = false))
}
</script>

<style lang="less" scoped></style>
