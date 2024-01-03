<template>
	<a-modal
		:open="open"
		:title="operationType === 'add' ? '新增' : '编辑'"
		@ok="onFinish"
		:ok-button-props="{ loading: loading }"
		@cancel="onClose"
		width="480px"
	>
		<a-form :model="groupInfo" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" ref="formDom">
			<a-form-item
				label="描述："
				name="describe"
				:rules="{
					required: true,
					message: '请输入描述'
				}"
			>
				<a-textarea v-model:value="groupInfo.describe" placeholder="请输入描述" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup>
const emit = defineEmits(['update:disvisible', 'update'])
const props = defineProps({
	disvisible: {
		type: Boolean,
		default: false
	},
	info: {
		type: Object,
		default: () => ({})
	},
	operationType: {
		type: String,
		default: 'add'
	},
	loading: {
		type: Boolean,
		default: false
	},
	onCancel: {
		type: Function,
		default: () => () => {}
	},
	onConfirm: {
		type: Function,
		default: () => () => {}
	}
})

watch(
	() => props.disvisible,
	val => {
		if (val && props.operationType === 'edit') {
			setTimeout(() => {
				groupInfo.describe = props.info.describe
			})
		}
	}
)

const formDom = ref(null)

const groupInfo = reactive({
	describe: ''
})

const open = computed({
	get: () => props.disvisible,
	set: val => emit('update:disvisible', val)
})

function onClose() {
	formDom.value.resetFields()
	props.onCancel()
}

async function onFinish() {
	try {
		await formDom.value.validate()
		await props.onConfirm(groupInfo)
		onClose()
	} catch (error) {}
}
</script>
