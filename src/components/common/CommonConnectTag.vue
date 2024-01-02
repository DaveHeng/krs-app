<template>
	<a-popover trigger="hover">
		<template #content>
			<div v-for="item in connectObj" class="flex mb5px items-center">
				<div v-if="item.status === CONNECTED" class="icon">
					<OnlineConnect class="mr6px" :style="{ fontSize: '24px', color: '#333' }" />
				</div>
				<div v-if="item.status === DISCONNECTED" class="icon">
					<Disconnected class="mr6px" :style="{ fontSize: '24px', color: '#333' }" />
				</div>
				<div v-if="item.status === CONNECTING" class="icon">
					<Connecting class="mr6px" :style="{ fontSize: '24px', color: '#333' }" />
				</div>
				<div>
					<div class="title">{{ item.prefix }}</div>
					<div class="desc fs-12 color-#999">{{ item.desc }}</div>
				</div>
			</div>
		</template>
		<!-- <div class="color-#fff">已连接{{ connectTotal.connectCount }} 未连接 {{ connectTotal.disConnectCount }}</div> -->
		<div class="color-#fff flex items-center">
			<Disconnected
				v-if="connectTotal.disConnectCount > 0"
				class="mr6px"
				:style="{ fontSize: '24px' }"
			/>
			<Connecting
				v-if="!connectTotal.disConnectCount && connectTotal.connectingCount > 0"
				class="mr6px"
				:style="{ fontSize: '24px' }"
			/>
			<OnlineConnect
				v-if="!connectTotal.disConnectCount && !connectTotal.connectingCount"
				class="mr6px"
				:style="{ fontSize: '24px' }"
			/>
			连接状态
		</div>
	</a-popover>
</template>

<script setup>
import { useConnect, CONNECTED, DISCONNECTED, CONNECTING } from '@/store/modules/connect'
import { OnlineConnect, Disconnected, Connecting } from '@/components/icons/index'
const { connectState } = useConnect()

const connectObj = computed(() => {
	const temp = {}
	for (let key in connectState) {
		if (!['mineHub', 'taskHub', 'warningHub', 'pointHub'].includes(key)) {
			temp[key] = connectState[key]
		}
	}
	return temp
})

const connectTotal = computed(() => {
	let [connectCount, disConnectCount, connectingCount] = [0, 0, 0]
	for (let key in connectObj.value) {
		connectObj.value[key].status === CONNECTED && connectCount++
		connectObj.value[key].status === DISCONNECTED && disConnectCount++
		connectObj.value[key].status === CONNECTING && connectingCount++
	}

	return {
		connectCount,
		disConnectCount,
		connectingCount
	}
})
</script>

<style lang="less" scoped>
.icon {
	margin-right: 8px;
}
</style>
