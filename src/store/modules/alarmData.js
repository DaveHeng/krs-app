import dayjs from 'dayjs'
import { defineStore } from 'pinia'
export const useAlarmData = defineStore('alarmData', () => {
	const state = reactive({
		list: [],
		count: 0,
		refreshTime: '',
		refresh: () => {}
	})

	function setAlarmData(list, refresh) {
		state.list = list
		state.count++
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
		setAlarmData,
		setRefresh
	}
})
