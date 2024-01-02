import { defineStore } from 'pinia'
export const CONNECTED = 'Connected' // 已连接
export const DISCONNECTED = 'Disconnected' // 断开连接
export const CONNECTING = 'Connecting' // 连接中
const mapDesc = {
	[CONNECTED]: '已连接',
	[DISCONNECTED]: '断开连接',
	[CONNECTING]: '正在连接中...'
}
const mapPrefix = {
	connectHub: '数据推送'
}
export const useConnect = defineStore('connect', () => {
	const state = reactive({
		connectHub: {
			status: DISCONNECTED,
			desc: mapDesc[DISCONNECTED],
			prefix: mapPrefix.connectHub
		}
	})

	function setConnectStatus(key, status, desc) {
		state[key].status = status
		state[key].desc = `${desc || mapDesc[status]}`
	}

	return {
		setConnectStatus,
		connectState: state
	}
})
