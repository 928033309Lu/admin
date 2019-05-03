<template>
	<div :class="className" :style="{height:height,width:width}"/>
</template>
<script>

import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils'

export default {
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '350px'
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		chartData: {
			type: Object,
			required: true
		},
		showIndex:{
			type: String,
		},
	},
	data() {
		return {
			chart: null,
			sidebarElm: null
		}
	},
	watch: {
		chartData: {
			deep: true,
			handler(val) {
				this.setOptions(val)
			}
		},
		showIndex() {
			this.__resizeHandler()
		}
	},
	mounted() {
		this.initChart()
		if (this.autoResize) {
			this.__resizeHandler = debounce(() => {
				if (this.chart) {
					this.chart.resize()
				}
			}, 100)
			window.addEventListener('resize', this.__resizeHandler)
		}
		// 监听侧边栏的变化
		this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
		this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		if (this.autoResize) {
			window.removeEventListener('resize', this.__resizeHandler)
		}

		this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

		this.chart.dispose()
		this.chart = null
	},
	methods: {
		sidebarResizeHandler(e) {
			if (e.propertyName === 'width') {
				this.__resizeHandler()
			}
		},
		setOptions({ x, y, z, n } = {}) {

			let line = []
			line.push({
				name: n[0], itemStyle: {
					normal: {
						color: '#3888fa',
						lineStyle: {
							color: '#3888fa',
							width: 2
						},
						areaStyle: {
							color: '#f3f8ff'
						}
					}
				},
				smooth: true,
				type: 'bar',
				data: y,
				animationDuration: 2800,
				animationEasing: 'cubicInOut'
			})
			if(n.length > 1){
				line.push({
					name: n[1],
					smooth: true,
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#FF005A',
							lineStyle: {
								color: '#FF005A',
								width: 2
							}
						}
					},
					data: z,
					animationDuration: 2800,
					animationEasing: 'quadraticOut'
				})
			}


			this.chart.setOption({
				xAxis: {
					data: x,
					// boundaryGap: false,
					axisTick: {
						show: false
					}
				},
				grid: {
					left: 10,
					right: 10,
					bottom: 20,
					top: 30,
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					padding: [5, 10]
				},
				yAxis: {
					axisTick: {
						show: false
					}
				},
				legend: {
					data: n
				},
				series: line
			})
		},
		initChart() {
			this.chart = echarts.init(this.$el, 'macarons')
			this.setOptions(this.chartData)
		}
	}

}
</script>
