import dayjs from 'dayjs'
import { defineStore } from 'pinia'
export const useOnlineData = defineStore('onlineData', () => {
	const state = reactive({
		list: [],
		count: 0,
		info: {},
		refreshTime: '',
		refresh: () => {}
	})

	function setOnlineData(list, info, refresh) {
		state.list = list
		state.count++
		state.info = info
		state.refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
	}
	function setRefresh(key, refresh) {
		state.refresh = key
			? arg => {
					refresh(key, arg)
			  }
			: refresh
	}
	return {
		state,
		setOnlineData,
		setRefresh
	}
})
