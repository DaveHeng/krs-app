import { useEventListener, useResizeObserver } from '@vueuse/core'
import _ from 'lodash'
// 不适用表格动态高度
export function useVirtualList() {
	const state = reactive({
		viewHeight: 0, // 视口大小
		itemHeight: 57, // 每一项的高度
		startCount: 0, // 开始索引
		endCount: 0, // 结束索引
		transfromY: 0, // 偏移量
		offsetY: 0, // 缓存高度
		total: 0, // 总条数
		scrollDom: null, //滚动dom
		contentDom: null // 内容dom
	})

	onMounted(() => {
		getElement()
		nextTick(() => init())
	})
	// 获取元素，监听事件
	function getElement() {
		state.scrollDom = document.querySelector('.ant-table-body')
		console.log('state.scrollDom', state.scrollDom)
		state.contentDom = document.querySelector('.ant-table-tbody')
		const scrollHandle = _.debounce(onScroll)
		useEventListener(state.scrollDom, 'scroll', evt => {
			onScroll()
		})
		useResizeObserver(state.scrollDom, () => {
			init()
		})
	}

	function setStartIndex() {
		const { scrollTop } = state.scrollDom
		const count = Math.floor(scrollTop / state.itemHeight)
		const limit = Math.ceil(state.viewHeight / state.itemHeight)
		const storeage = limit > 10 ? 10 : Math.ceil(limit / 2)
		return scrollTop < state.itemHeight ? 0 : count > storeage ? count - storeage : 0
	}

	function getStartIndex() {
		state.startCount = setStartIndex()
	}

	function getEndIndex() {
		const { scrollTop } = state.scrollDom
		const count = Math.ceil((2 * state.viewHeight) / state.itemHeight)
		const startCount = setStartIndex()
		state.endCount = scrollTop < state.itemHeight ? count : Math.min(startCount + count, state.total)
	}

	function getTotal(len) {
		state.total = len
	}
	// 展示窗口
	function setViewHeight() {
		state.viewHeight = parseInt(state.scrollDom.style.maxHeight)
		console.log(state.scrollDom.style.maxHeight)
	}

	function initTransfromY() {
		// const r = state.contentDom.getElementsByClassName('ant-table-row')
		// Array.from(r).forEach(el => console.log(el, el.offsetHeight))
		const count = state.endCount - state.startCount
		state.transfromY = Math.ceil(state.total * state.itemHeight - count * state.itemHeight)
		console.log('state.transfromY', state.transfromY)
	}
	// 内容窗口
	function setContentHeight() {
		if (state.total < Math.ceil((2 * state.viewHeight) / state.itemHeight)) return
		state.contentDom.style.height = `${state.total * state.itemHeight}px`
	}

	function setTransformValue(val) {
		const { scrollTop } = state.scrollDom
		state.contentDom.style.transform = `translate3d(0, -${state.transfromY - scrollTop + state.offsetY}px, 0)`
	}

	function onScroll() {
		if (state.total < Math.ceil((2 * state.viewHeight) / state.itemHeight)) return

		const { scrollTop, clientHeight } = state.scrollDom
		const count = Math.floor(scrollTop / state.itemHeight) // 当前滚动条滚动的条数
		const limit = Math.ceil(state.viewHeight / state.itemHeight) // 一屏渲染的条数
		const storeage = limit > 10 ? 10 : Math.ceil(limit / 2)
		// 小于缓存加载
		if (count > limit && count - state.startCount < storeage) {
			updateTransfrom()
		} else if (count < limit) {
			// 第一屏幕重置平移
			getStartIndex()
			if (count === 0) {
				getEndIndex()
				state.offsetY = 0
				setTransformValue()
			}
		}
		// 小于一屏加载
		if (state.endCount - count < limit) {
			updateTransfrom()
		}

		function updateTransfrom() {
			getStartIndex()
			getEndIndex()
			if (state.endCount === state.total) {
				state.contentDom.style.transform = `translate3d(0, 0, 0)`
			} else {
				state.offsetY = state.itemHeight * storeage
				setTransformValue()
			}
		}

		if (scrollTop + state.viewHeight >= state.itemHeight * state.total) {
			state.contentDom.style.transform = `translate3d(0, 0, 0)`
		}
	}
	// 初始化
	function init() {
		setViewHeight()
		getStartIndex()
		getEndIndex()
		setContentHeight()
		initTransfromY()
		setTransformValue()
	}
	// 数据改变重新计算高度
	function resetVirtualHandler(len) {
		getTotal(len)
		if (state.scrollDom) {
			init()
		}
	}

	return {
		virtualState: state,
		resetVirtualHandler
	}
}
