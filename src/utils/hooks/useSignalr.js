import * as signalR from '@microsoft/signalr'
import { useConnect, CONNECTED, DISCONNECTED, CONNECTING } from '@/store/modules/connect'
import { useOnlineData } from '@/store/modules/onlineData'
import { useAlarmData } from '@/store/modules/alarmData'
import { useCommandData } from '@/store/modules/commandData'
import { useUserInfo } from '@/store/modules/user.js'

export const signalRType = {
	connectHub: 'ConnectHub'
}

export function useSignalr(key = 'ConnectHub') {
	const connectKey = findHubKey(key)
	const { setConnectStatus } = useConnect()
	const { state: onlineData, setOnlineData } = useOnlineData()
	const { state: alarmData, setAlarmData } = useAlarmData()
	const { state: commandData, setCommandData } = useCommandData()

	const connection = new signalR.HubConnectionBuilder()
		.withUrl(
			`${import.meta.env.VITE_APP_BASE_API}_base/${key}` /* {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		} */
		)
		.withAutomaticReconnect()
		.configureLogging(signalR.LogLevel.Information)
		.build()

	// 初始化连接
	function initConnect() {
		startConnect()
		listenData()
		reConnection()
		disConnection()
	}

	/**
	 * 创建连接
	 *
	 */
	async function startConnect() {
		try {
			setConnectStatus(connectKey, CONNECTING)
			await connection.start()
			setConnectStatus(connectKey, CONNECTED)
		} catch (err) {
			console.log(err)
			// setTimeout(startConnect, 5000)
		}
	}

	/**
	 * 重新连接
	 *
	 */
	function reConnection() {
		connection.onreconnected(() => {
			console.log('重新连接', connection.state)
			if (connection.state === CONNECTED) {
				setConnectStatus(connectKey, CONNECTING)
			} else {
				setConnectStatus(connectKey, CONNECTING, '断开连接，正在重新连接...')
			}
		})
	}

	/**
	 * 断开连接
	 *
	 */
	function disConnection() {
		connection.onclose(() => {
			setConnectStatus(connectKey, DISCONNECTED, '断开连接，请刷新浏览器重试')
		})
	}

	/**
	 * 监听数据
	 *
	 */

	function listenData() {
		connection.on('OnlineHub', data => {
			const res = JSON.parse(data)
			const list = res.isAll
				? res.mergeViews
				: filterList(res.mergeViews, onlineData.list, ['ipAdress', 'deviceCode'])
			setOnlineData(list, onlineData.info, sendMessage)
		})
		connection.on('AlarmHub', data => {
			const res = JSON.parse(data)
			const list = res
			setAlarmData(list, sendMessage)
		})
		connection.on('CommandHub', data => {
			const res = JSON.parse(data)
			const list = res.isAll
				? res.list
				: filterList(res.list, commandData.list, ['ipAdress', 'deviceCode'])
			setCommandData(list, sendMessage)
		})
	}

	/**
	 * 发送数据
	 *
	 * @param {*} id
	 */
	async function sendMessage(arg) {
		try {
			await connection.send('SendData', [arg])
		} catch (error) {
			console.log(error, '发送数据失败')
		}
	}

	/**
	 * 关闭连接
	 *
	 */
	async function closeConnection() {
		try {
			removeListener(connection)
			await connection.stop()
		} catch (error) {}
	}

	/**
	 * 停止接受数据
	 *
	 */
	function removeListener(connection) {
		connection.off('ReceiveData')
	}

	onBeforeUnmount(() => {
		console.log('卸载')
		closeConnection()
	})

	// initConnect()
}

function findHubKey(val) {
	for (let key in signalRType) {
		if (signalRType[key] === val) {
			return key
		}
	}
}

function filterList(source, target, keys = 'id', handle) {
	const temp = Array.isArray(keys) ? keys : [keys]
	source.forEach(item => {
		item.geoId = item?.geoID || ''
		const index = target.findIndex(e => {
			const result = []
			temp.forEach(key => {
				result.push(e[key] === item[key])
			})
			return !result.includes(false)
		})
		if (index > -1) {
			handle && handle(item, target[index])
			target[index] = item
		} else {
			target.push(item)
		}
	})
	return target
}

// 监听数据变化
function listenUpsData(newData, oldData) {
	// 1升, -1降, 0不变
	CHANGE_KEYS.forEach(key => {
		const k = key
		const newK = `${k.toString()}Change`
		const value = newData[k] > oldData[k] ? 1 : newData[k] < oldData[k] ? -1 : 0
		newData[newK] = value
	})
}
