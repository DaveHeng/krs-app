import { message, modal } from '@/components/feedBackContext.js'
/**
 *
 *
 * @export
 * @param {*} { get, add, edit, del, transformFn, immediate, hasPageNation }
 * @return {*} {
		limitQuery, // 分页
		state, // 页面状态
		updateList, // 更新方法
		onSearch, // 搜索
		onSelectChange, // 选择
		onConfirm, // 弹窗确认
		onDelete, // 删除
		onOpenAddDialog, // 打开新增弹窗
		onOpenEditDialog, // 打开编辑弹窗
		onCloseDialog, // 关闭弹窗
    onChangeMode // 切换模式
	}
 */
export function usePage({
	get,
	add,
	edit,
	del,
	transformFn,
	immediate = true,
	pageSize = 20,
	hasPageNation = true
}) {
	const querySearch = ref({})
	const limitQuery = reactive({
		pageIndex: 1,
		pageSize: pageSize,
		total: 0
	})
	const state = reactive({
		loading: false,
		list: [],
		disvisible: false,
		operationType: 'add',
		currentItem: {},
		selectIds: [],
		confirmLoading: false,
		mode: 'check'
	})

	async function getList() {
		try {
			state.loading = true
			const { pageIndex, pageSize } = limitQuery
			const params = { ...querySearch.value }
			if (hasPageNation) {
				params.pageIndex = pageIndex
				params.pageSize = pageSize
			}
			const data = await get(params)
			limitQuery.total = data.totalCount || 0
			if (transformFn) {
				state.list = transformFn(data.items || [], data)
			} else {
				state.list = data.items || []
			}
			state.loading = false
		} catch (error) {
			state.loading = false
		}
	}

	function onSearch(params, fn) {
		console.log(params, fn)
		if (fn) {
			fn(params)
		}
		querySearch.value = params
		updateList({
			pageSize: limitQuery.pageSize
		})
	}

	function updateList(query) {
		limitQuery.pageIndex = query?.pageIndex || 1
		limitQuery.pageSize = query?.pageSize || pageSize
		getList()
	}

	function onSelectChange(keys, key = 'id') {
		const temp = state.selectIds.filter(item => {
			return !state.list.some(e => e[key] === item)
		})
		state.selectIds = [...new Set([...temp, ...keys])]
		console.log(state.selectIds)
	}

	// 增改
	async function onConfirm(params, fn) {
		console.log(params)
		// if (!add || !edit) return
		try {
			state.confirmLoading = true
			state.operationType === 'add'
				? await add(params)
				: await edit({ ...params, id: state.currentItem.id })
			message.success({
				content: '操作成功',
				duration: 2,
				onClose: () => {
					state.confirmLoading = false
					fn && fn()
					onCloseDialog()
					getList()
				}
			})
		} catch (error) {
			console.log(error)
			state.confirmLoading = false
		}
	}

	function onDelete(id) {
		const ids = Array.isArray(id) ? id : [id]
		if (!del) return
		modal.confirm({
			title: '提示',
			content: '确定删除吗？',
			onOk: async () => {
				try {
					await del(ids)
					message.success({
						content: '删除成功',
						duration: 1,
						onClose: () => {
							getList()
							onChangeMode('check')
						}
					})
				} catch (error) {}
			}
		})
	}

	function onOpenAddDialog() {
		console.log('add')
		state.operationType = 'add'
		state.disvisible = true
	}

	function onOpenEditDialog(item) {
		state.operationType = 'edit'
		state.currentItem = item
		state.disvisible = true
	}

	function onCloseDialog(fn) {
		state.disvisible = false
		fn && fn()
	}

	function onChangeMode(type) {
		state.mode = type
		state.selectIds = []
	}

	immediate && getList(transformFn)

	return {
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
	}
}
