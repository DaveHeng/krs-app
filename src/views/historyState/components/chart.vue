<template>
	<div class="w100% relative chart-container">
		<div class="w100% h100%-60" id="chart"></div>
		<!-- 	<div class="legend">
			<div v-for="item of dict[9000] || []" :key="item.code" class="legend-item">
				<div class="box" :style="{ background: COLORMAP[item.code].chartColor }"></div>
				{{ item.nameCn }}
			</div>
		</div> -->
	</div>
</template>

<script setup>
import * as echarts from 'echarts'
import { useResizeObserver } from '@vueuse/core'
// import { COLORMAP } from '@/components/static/index'
import dayjs from 'dayjs'
const props = defineProps({
	scrollHeight: {
		type: Number,
		default: 0
	},
	renderCount: {
		type: Number,
		default: 0
	},
	list: {
		type: Array,
		default: () => []
	},
	groupType: {
		type: String,
		default: ''
	},
	dictItemMap: {
		type: Object,
		default: () => ({})
	},
	dict: {
		type: Object,
		default: () => ({
			9000: []
		})
	}
})

const chart = shallowRef(null)

const height = computed(() => `${props.scrollHeight}px`)

onMounted(() => {
	initChart()

	useResizeObserver(document.body, entries => {
		setTimeout(() => {
			chart.value && chart.value.resize()
		}, 100)
	})
	useResizeObserver(document.getElementById('chart'), entries => {
		setTimeout(() => {
			chart.value && chart.value.resize()
		}, 100)
	})
})

watch(
	() => props.renderCount,
	() => {
		chart.value && setOption()
	}
)

function initChart() {
	chart.value = echarts.init(document.getElementById('chart'))
	setOption()
}

function setOption() {
	chart.value.showLoading({
		text: 'Loading...',
		color: '#666',
		textColor: '#666',
		fontSize: 20,
		maskColor: 'rgba(255, 255, 255, 0)'
	})
	console.log('渲染')
	const options = {
		title: {
			show: true,
			text: '堆叠图历史数据',
			textAlign: 'center',
			top: '10',
			left: 'center',
			align: 'right',
			textStyle: {
				color: 'rgba(0,0,0,0.6)',
				fontSize: 24
			}
		},
		toolbox: {
			right: '10%',
			feature: {
				saveAsImage: {
					name: '下载',
					title: '保存为图片'
				}
			}
		},
		tooltip: {
			formatter: params => {
				console.log(params)
				const stateName = '设备状态：'
				const reg = 'YYYY-MM-DD HH:mm:ss'
				return `<div style="margin-bottom: 10px">${params.data.name}</div>起始时间：${dayjs
					.unix(params.value[1])
					.format(reg)}<br/> 结束时间：${dayjs.unix(params.value[2]).format(reg)}<br/>${stateName}${
					params.data.stateDesc
				}`
			}
		},
		grid: {
			top: 50,
			right: 100,
			left: 150,
			bottom: 80
		},
		dataZoom: [
			{
				type: 'slider',
				filterMode: 'weakFilter',
				xAxisIndex: 0,
				showDataShadow: false,
				labelFormatter: '',
				height: 15
				// top: 400,
			},
			{
				type: 'slider',
				realtime: true,
				yAxisIndex: 0,
				filterMode: 'empty',
				right: 30,
				showDataShadow: false,
				labelFormatter: '',
				width: 15
			}
		],
		xAxis: {
			type: 'time',
			axisLabel: {
				formatter: (val, index) => {
					return `${
						props.groupType == 'device'
							? dayjs.unix(val).format('HH:mm')
							: dayjs.unix(val).format('YYYY-MM-DD')
					}`
				},
				rich: {
					specialStyle: {
						color: '#000',
						fontWeight: 'bold'
					}
				}
			}
		},
		yAxis: {
			min: 0,
			data: props.list.map(item => item[0].name)
			/* axisLine: {
					show: false,
					lineStyle: {
						color: '#333'
					}
				},
				axisTick: {
					show: false
				} */
		},
		series: [
			{
				type: 'custom',
				renderItem,
				itemStyle: {
					opacity: 0.8
				},
				encode: {
					x: [1, 2],
					y: 3
				},
				data: getSeries()
			}
		]
	}
	chart.value.setOption(options, true)
	chart.value.hideLoading()
}

function getSeries() {
	const data = []
	props.list.forEach((item, index) => {
		item.forEach((child, childrenIndex) => {
			let duration = child.timeEnd - child.timeStart
			data.push({
				name: child.name,
				state: child.state,
				stateDesc: props.dictItemMap[child.state],
				value: [index, child.timeStart, child.timeEnd, duration], // 名称， 起始时间， 终止时间，持续时间
				/* itemStyle: {
					color: child.state < 9000 ? `red` : COLORMAP[child.state].chartColor
				}, */
				itemStyle: {
					color: `red`
				}
			})
		})
	})
	console.log(data)
	return data
}

function renderItem(params, api) {
	var categoryIndex = api.value(0)
	var start = api.coord([api.value(1), categoryIndex])
	var end = api.coord([api.value(2), categoryIndex])
	var height = api.size([0, 1])[1] * 0.5
	var rectShape = echarts.graphic.clipRectByRect(
		{
			x: start[0],
			y: start[1] - height / 2,
			width: end[0] - start[0],
			height: height
		},
		{
			x: params.coordSys.x,
			y: params.coordSys.y,
			width: params.coordSys.width,
			height: params.coordSys.height
		}
	)

	return (
		rectShape && {
			type: 'rect',
			shape: rectShape,
			style: api.style()
		}
	)
}
onBeforeUnmount(() => {
	if (!chart.value) {
		return
	}
	chart.value.dispose()
	chart.value = null
})
</script>

<style lang="less" scoped>
.chart-container {
	width: 100%;
	height: v-bind(height);
	padding: 10px;
	box-sizing: border-box;
}
.legend {
	width: 100%;
	position: absolute;
	height: 60px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;

	.legend-item {
		display: flex;
		align-items: center;
		margin-right: 10px;
		cursor: pointer;
		.box {
			width: 10px;
			height: 10px;
			margin-right: 5px;
			color: #000;
			font-size: 12px;
		}
	}
}
</style>
