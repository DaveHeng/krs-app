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
		state.refresh = refresh
		state.refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
	}
	return {
		state,
		setAlarmData
	}
})
