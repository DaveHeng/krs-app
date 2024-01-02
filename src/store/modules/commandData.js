import dayjs from 'dayjs'
import { defineStore } from 'pinia'
export const useCommandData = defineStore('commandData', () => {
	const state = reactive({
		list: [],
		count: 0,
		refreshTime: '',
		refresh: () => {}
	})

	function setCommandData(list, refresh) {
		state.list = list
		state.count++
		state.refresh = refresh
		state.refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
	}
	return {
		state,
		setCommandData
	}
})
