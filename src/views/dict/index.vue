<template>
	<div>
		<CommonConditionContainer>
			<div class="flex items-center">
				<CommonCondition :layout="['dictName', 'dictCode']" @search="onSearch">
					<template #after>
						<a-form-item v-if="btnMap['Dict:A']">
							<a-config-provider :theme="{ token: { colorPrimary: '#52C41A' } }">
								<a-button type="primary" @click="() => onAddItem(0)">
									<PlusCircleOutlined />
									新增
								</a-button>
							</a-config-provider>
						</a-form-item>
					</template>
				</CommonCondition>
			</div>
		</CommonConditionContainer>
		<CommonContentContainer :hasPagination="false">
			<template #content="{ height }">
				<TableList
					:scrollHeight="height"
					:loading="state.loading"
					:list="state.list"
					:code="querySearch?.code"
					:nameCn="querySearch?.nameCn"
					:onAddItem="onAddItem"
					:onUpdateItem="onUpdateItem"
					:onUpdate="onUpdate"
				/>
			</template>
		</CommonContentContainer>
		<DialogDict
			:disvisible="state.disvisible"
			:onCloseDialog="onCloseDialog"
			:operationType="state.operationType"
			:info="state.currentItem"
			:onUpdate="onUpdate"
			:parentName="state.parentName"
		/>
	</div>
</template>

<script setup>
import { getDictList, getDictTree } from '@/api/dict'
import TableList from './components/List.vue'
import DialogDict from './components/Dialog.vue'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
import { usePermission } from '@/store/modules/permission'
const {
	state: { permissionBtns: btnMap }
} = usePermission()
const [getItem, setItem] = useLocalStorage()
const querySearch = ref({})
const state = reactive({
	list: [],
	loading: false,
	disvisible: false,
	operationType: 'add',
	currentItem: {},
	parentName: '根节点'
})

// 获取数据
async function getList() {
	try {
		state.loading = true
		const data = await getDictTree()
		console.log(data)
		updateLocalDictData(JSON.parse(JSON.stringify(data)))
		transformData(data)
		state.list = data
	} catch (error) {
		console.log(error)
	}
	setTimeout(() => {
		state.loading = false
	})
}

function transformData(list) {
	list.forEach(item => {
		if (!item.childrens || !item.childrens.length) {
			delete item.childrens
		} else {
			transformData(item.childrens)
		}
	})
}

// 更新本地存在的字典数据
function updateLocalDictData(data) {
	data.forEach(item => {
		setItem(item.code.toString(), JSON.stringify(item.childrens))
	})
}

// 搜索
function onSearch(values) {
	querySearch.value = values
}

// 添加
function onAddItem(parentCode) {
	state.parentName =
		parentCode === 0
			? '根节点'
			: state.list.find(item => item.code === parentCode).nameCn || '根节点'
	state.operationType = 'add'
	state.currentItem = { ...state.currentItem, parentCode }
	openDialog()
}

// 编辑
function onUpdateItem(record) {
	state.parentName =
		record.parentCode === 0
			? '根节点'
			: state.list.find(item => item.code === record.parentCode).nameCn || '根节点'
	state.operationType = 'edit'
	state.currentItem = { ...record }
	openDialog()
}

// 打开弹窗
function openDialog() {
	state.disvisible = true
}
// 关闭弹窗
function onCloseDialog() {
	state.disvisible = false
}

// 更新列表
function onUpdate() {
	getList()
}

getList()
</script>

<style lang="less" scoped></style>
