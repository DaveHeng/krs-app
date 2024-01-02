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
		state.refresh = refresh
		state.refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
	}
	return {
		state,
		setOnlineData
	}
})
