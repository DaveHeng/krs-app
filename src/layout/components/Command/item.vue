<template>
	<div>
		<div v-if="list.length > 0" class="command-container">
			<div v-for="item of list" :key="item.id" class="command-item" @click="goPage">
				<div class="command-right">
					<div class="command-title">
						<div>{{ item.installPosition }}({{ item.ipAdress }})</div>
						<div class="time">{{ item.updatedTime }}</div>
					</div>
					<div class="command-content">
						{{ item.optionDescribe }}
					</div>
				</div>
			</div>
		</div>
		<a-empty v-else />
	</div>
</template>

<script setup>
const props = defineProps({
	list: {
		type: Array,
		default: () => []
	}
})

function goPage() {}
</script>

<style lang="less" scoped>
.command-container {
	width: 100%;
	height: calc(100% - 62px);
	overflow: auto;
}
.command-item {
	display: flex;
	height: 50px;
	align-items: center;
	padding-left: 10px;
	box-sizing: border-box;
	cursor: pointer;

	&:nth-child(even) {
		background-color: #f0f0f0;
	}
	&:nth-child(odd) {
		background: #fff;
	}

	.command-right {
		margin-left: 11px;
		flex: 1;
		.command-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 11px;
			box-sizing: border-box;
			font-size: 14px;
			font-family: Microsoft YaHei-Bold, Microsoft YaHei;
			font-weight: 700;
			color: #3d3d3d;
			line-height: 22px;

			.time {
				color: #3d3d3d;
				font-size: 12px;
				font-weight: normal;
			}
		}

		.command-content {
			font-size: 14px;
			font-family: Microsoft YaHei-Light, Microsoft YaHei;
			font-weight: 290;
			color: #3d3d3d;
			line-height: 22px;
		}
	}
}
</style>
