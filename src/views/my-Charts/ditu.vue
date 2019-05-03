<template>
  <div :class="className" :id="id" :style="{height:'290px',width:'700px'}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          top: 20,
          text: '油品销量走势图',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#6a95fe'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['92号汽油', '95号汽油', '98号汽油','0号柴油'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },
        grid: {
          top: 70,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: ['一', '二', '三', '四', '五', '六', '七(昨日)     ']
        }],
        yAxis: [{
          type: 'value',
//        name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
          	show: false
            /*lineStyle: {
              color: '#57617B'
            }*/
          }
        }],
        series: [{
          name: '92号汽油',
          type: 'line',
//        smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
         /* areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },*/
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
        }, {
          name: '95号汽油',
          type: 'line',
//        smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
         /* areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },*/
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: [120, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
        },{
          name: '98号汽油',
          type: 'line',
//        smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          /*areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(89, 196, 251, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(89, 196, 251, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },*/
          itemStyle: {
            normal: {
              color: 'rgba(89,196,251)',
              borderColor: 'rgba(89,196,251,0.2)',
              borderWidth: 12
            }
          },
          data: [130, 151, 85, 52, 42, 75, 21, 75, 96, 56, 35, 158]
        },{
          name: '0号柴油',
          type: 'line',
//        smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
/*          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(228, 186, 87, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(228, 186, 87, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },*/
          itemStyle: {
            normal: {
              color: 'rgba(228,186,87)',
              borderColor: 'rgba(228,186,87,0.2)',
              borderWidth: 12
            }
          },
          data: [154, 134, 178, 187, 85, 65, 72, 45, 125, 126, 152, 111]
        }]
      })
    }
  }
}
</script>
