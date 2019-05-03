<template>
    <div :class="className" :id="id" :style="{height:'290px',width:'700px'}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getOilsStationOils } from "@/api/oil";
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

            let colorList = [
                '137,189,27',
                '219,50,51',
                '89,196,251',
                '228,186,87',
                '137,89,27',
                '219,0,51',
                '89,96,251',
                '228,86,87',
            ];

            getOilsStationOils({}).then((res)=>{
                let arr = res.data;
                let x = [];
                let y = [];
                let z = [];
                let info = [];
                let arrLength = 0;

                for (let key in arr){
                    arr[key].forEach((item, i) => {
                        if(y.length <= arrLength){
                            x.push([])
                            y.push([])
                        }
                        x[arrLength].push(item.dateStr)
                        y[arrLength].push(item.sumCount)
                    })
                    z.push(key)
                    info.push({
                        name: z[arrLength],
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb('+ colorList[arrLength] +')',
                                borderColor: 'rgba('+ colorList[arrLength] +',0.3)',
                                borderWidth: 12
                            }
                        },
                        data: y[arrLength]
                    })

                    arrLength ++;
                }

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
                        data: z,
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
                        data: x[0]
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
                    series: info
                })


                



            })


            
        
            function getDay(day){  
             var today = new Date();  
                 
             var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
    
             today.setTime(targetday_milliseconds); //注意，这行是关键代码
                 
             var tYear = today.getFullYear();  
             var tMonth = today.getMonth();  
             var tDate = today.getDate();  
             tMonth = doHandleMonth(tMonth + 1);  
             tDate = doHandleMonth(tDate);  
             return tMonth+"-"+tDate;  
            }  
            function doHandleMonth(month){  
             var m = month;  
             if(month.toString().length == 1){  
                    m = "0" + month;  
             }  
             return m;  
            }

            
        }
    }
}
</script>
