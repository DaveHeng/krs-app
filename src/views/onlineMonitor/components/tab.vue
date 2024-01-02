<template>
	<div class="flex items-center">
		<div
			v-for="(item, index) in tabs"
			:key="index"
			:class="index === currentTab ? 'active tab' : 'tab'"
			@click="
				() => {
					changeTab(index)
				}
			"
		>
			<div class="w24px h24px mr8px">
				<IconOutput
					:icon-name="item.icon"
					:style="{ color: '#333', fontWeight: '500', fontSize: '24px' }"
				/>
			</div>
			<div class="fs-14 c-#2D3748 ml20px">{{ item.name }}</div>
		</div>
	</div>
</template>

<script setup>
import IconOutput from '@/components/icons/IconOutput.vue'
const emit = defineEmits(['changeTab'])
const props = defineProps({
	currentTab: {
		type: Number,
		default: 0
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const tabs = [
	{
		name: '列表',
		icon: 'TabListIcon'
	},
	{
		name: '地图',
		icon: 'LocationWhiteIcon'
	}
]

function changeTab(index) {
	emit('changeTab', index)
}
</script>

<style lang="less" scoped>
.tab {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: 135px;
	height: 22px;
}

.active {
	background: rgba(255, 255, 255, 0.65);
	box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.06);
	border-radius: 8px;
	height: 40px;
}
</style>
