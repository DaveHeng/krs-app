
import request from '@/utils/request'

// 获取字典数
export function getDictTree() {
	return request({
		url: '/sys-dic/tree',
		method: 'get'
	})
}

// 获取字典信息
export function getDictInfo(data) {
	return request({
		url: `/sys-dic/query-by-parent-codes`,
		method: 'post',
		data
	})
}

// 获取字典列表
export function getDictList(data) {
	return request({
		url: '/sys-dic/page',
		method: 'post',
		data
	})
}

// 添加字典项
export function addDictItem(data) {
	return request({
		url: '/sys-dic',
		method: 'post',
		data
	})
}

// 修改字典项
export function updateDictItem(data) {
	return request({
		url: '/sys-dic/edit',
		method: 'post',
		data
	})
}

// 逻辑删除字典项
export function deleteDictItem(data) {
	return request({
		url: '/sys-dic/logic-delete',
		method: 'DELETE',
		data
	})
}

// 物理删除字典项
export function removeDictItem(data) {
	return request({
		url: '/sys-dic/physics-delete',
		method: 'DELETE',
		data
	})
}

