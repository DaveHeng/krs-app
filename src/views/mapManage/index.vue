<template>
	<div>
		<CommonConditionContainer>
			<div class="flex items-center">
				<CommonCondition
					v-if="state.mode === 'check'"
					:layout="['mapName', 'mapStatus']"
					@search="onSearch"
				>
					<a-form-item>
						<a-config-provider :theme="{ token: { colorPrimary: '#52C41A' } }">
							<a-button type="primary" @click="handleAdd">
								<PlusCircleOutlined />
								新增
							</a-button>
						</a-config-provider>
					</a-form-item>
					<!-- 	<a-form-item>
						<a-button type="primary" ghost @click="onChangeMode('edit')">
							<BatchEditIcon />
							批量操作
						</a-button>
					</a-form-item> -->
				</CommonCondition>
				<a-row v-else class="mb9px">
					<a-space>
						<a-button class="batch-operation-btn" @click="handleRemove">
							<DeleteOutlined />
							批量删除
						</a-button>
						<a-button type="primary" ghost @click="onChangeMode('check')">
							<CancelIcon />
							取消操作
						</a-button>
					</a-space>
				</a-row>
			</div>
		</CommonConditionContainer>
		<CommonContentContainer>
			<template #content="{ height }">
				<MapUpload
					:listHeight="height"
					:isShowDelete="true"
					:isShowEdit="true"
					ref="mapUpload"
					:mode="state.mode"
					:isBatch="state.mode === 'edit'"
				/>
			</template>
		</CommonContentContainer>
	</div>
</template>

<script setup>
import { CancelIcon, BatchEditIcon } from '@/components/icons/index.js'
import { MapUpload } from 'mapsetting'
import 'mapsetting/dist/entry.css'
const mapUpload = ref(null)
const querySearch = ref({})
const state = reactive({
	mode: 'check',
	multiple: false
})

function onChangeMode(mode) {
	state.mode = mode
	state.selectList = []
	mapUpload.value.resetSelectedRowKeys()
}

function handleRemove() {
	mapUpload.value.onRemove()
}

function handleAdd() {
	console.log(mapUpload.value)
	mapUpload.value.add()
}
function onSearch(query) {
	querySearch.value = query
	if (query.mapName) {
		querySearch.mapDescribe = query.mapName
		delete querySearch.mapName
	}

	if (query.mapStatus) {
		querySearch.isLoad = query.mapStatus
		delete querySearch.mapStatus
	}
	mapUpload.value.getList(query)
}
</script>

<style lang="less" scoped></style>
