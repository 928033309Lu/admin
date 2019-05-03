<template>
  <div class="warp">
    <div class="header">
        <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>车队统计</h3>
    </div>
    <div class="main">
        <div class="top">
            <div class="box">
                主卡卡号：{{mainCardNumber}}
            </div>
            <div class="box">
                开户地点：{{placeOpening}}
            </div>
            <div class="box">
                单位名称：{{unitName}}
            </div>
        </div>
        <div class="you">
            <div class="date">
                <span>时间</span>
                <el-date-picker
                    v-model="year"
                    @change="cag"
                    type="year"
                    placeholder="选择年">
                </el-date-picker>
            </div>
            <div id="trend" :style="{width: '100%', height: '420px'}"></div>
        </div>
        <div class="tu">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="header">
                            <h3>消费地区分布图</h3>
                        </div>
                        <div id="region" :style="{width: '100%', height: '420px'}"></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="header">
                            <h3>消费类型分布图</h3>
                        </div>
                        <div id="type" :style="{width: '100%', height: '420px'}"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { tongjixiang } from '@/api/cheduiguanli'

export default {
  data() {
    return {
      mainCardNumber:'345678987456',//主卡卡号
      placeOpening:'北京一号加油站',//开户地点
      unitName:'北京哇哈哈有限公司',//单位名称
      year:'',//年
      data2:[],
      data3:[],
      data4:[],
      localAmout:'',
      FieldAmout:'',
      oilsAmout:'',
      commodityAmout:'',
    }
  },
  mounted() {
    this.get()
    this.trendLine();
    this.regionLine();
    this.typeLine();
  },
  methods: {
    get(){
      var id = this.$route.query.id
      var data ={
        "id": id,
      }
      tongjixiang(data)
        .then(response => {
          console.log(response.data)
          this.mainCardNumber=response.data.tbMotorcadeOilsInfo.cardNo
          this.placeOpening=response.data.tbMotorcadeOilsInfo.fullName
          this.unitName=response.data.tbMotorcadeOilsInfo.name
          this.data2 = response.data.series[0].data2
          this.data3 = response.data.series[1].data3
          this.data4 = response.data.series[2].data4
          this.localAmout = response.data.series[3].localAmout
          this.FieldAmout =response.data.series[4].FieldAmout
          this.oilsAmout = response.data.series[5].oilsAmout
          this.commodityAmout = response.data.series[6].commodityAmout
          this.trendLine();
          this.regionLine();
          this.typeLine();
        })
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/queryMotorcadeOils',
      //   {
      //     "id": id,
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     this.mainCardNumber=res.body.tbMotorcadeOilsInfo.cardNo
      //     this.placeOpening=res.body.tbMotorcadeOilsInfo.fullName
      //     this.unitName=res.body.tbMotorcadeOilsInfo.name
      //     this.data2 = res.body.series[0].data2
      //     this.data3 = res.body.series[1].data3
      //     this.data4 = res.body.series[2].data4
      //     this.localAmout = res.body.series[3].localAmout
      //     this.FieldAmout = res.body.series[4].FieldAmout
      //     this.oilsAmout = res.body.series[5].oilsAmout
      //     this.commodityAmout = res.body.series[6].commodityAmout
      //     this.trendLine();
      //     this.regionLine();
      //     this.typeLine();
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     // this.$message.error('获取失败');
      //   })
    },
    //油品月销售走势图
    trendLine() {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("trend"));
      // 绘制图表
      myChart.setOption({
              title: {
                text: '油品月销售走势图',
              },
              tooltip: {
                trigger: 'axis',
                feature:false,
              },
              legend: {
                icon: "circle",
                top:'top',
                right:'5%',
                data:['合计','汽油','柴油']
              },
              grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
              },
              // toolbox: {
              //     feature: {
              //         saveAsImage: {}
              //     }
              // },
              xAxis: {
                  type: 'category',
                  splitLine:{
                      show: false//去除网格线
                  },
                  axisTick: {
                    show: false
                  },
                //   name: '（日期）',
                  // splitArea : {show : true},//保留网格区域
                  boundaryGap: true,
                  data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              },
              yAxis:[
                {
                //   name: '人数',
                  type: 'value',
                  splitLine:{show: false},//去除网格线
                  axisTick: {
                    show: false
                  },
                  // splitArea:{show : true},//保留网格区域
              }],
              series: [
                  // {
                  //     name:'约定消费金额',
                  //     type:'line',
                  //     stack: '总量1',
                  //     itemStyle: {color: '#000'},
                  //     data:[200,200,200,200,200,200,200,200,200,200,200,200,]
                  // },
                  {
                      name:'合计',
                      type:'line',
                      stack: '总量2',
                      itemStyle: {color: '#F3AA4C'},
                      data:that.data2
                  },
                  {
                      name:'汽油',
                      type:'line',
                      stack: '总量3',
                      itemStyle: {color: '#FD7569'},
                      data:that.data3
                  },
                  {
                      name:'柴油',
                      type:'line',
                      stack: '总量4',
                      itemStyle: {color: '#5383F2'},
                      data:that.data4
                  },
              ]
      },true);
    },
    //消费地区分布图
    regionLine() {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("region"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          bottom: "center",
          right:"5%",
          data: ["本地消费", "外地消费",]
        },
        series: [
          {
            name: "销售地区分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
                normal: {
                  position: 'inner',
                  formatter:'{d}%'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
              { value: that.localAmout, name: "本地消费", itemStyle: {color: '#5A8CFF'}},
              { value: that.FieldAmout, name: "外地消费", itemStyle: {color: '#FDF35E'}},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },true);
    },
    //消费类型分布图
    typeLine() {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("type"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          bottom: "center",
          right:"5%",
          data: ["油品消费", "商品消费",]
        },
        series: [
          {
            name: "销售类型分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
                normal: {
                  position: 'inner',
                  formatter:'{d}%'
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
              { value: that.oilsAmout, name: "油品消费", itemStyle: {color: '#5A8CFF'}},
              { value: that.commodityAmout, name: "商品消费", itemStyle: {color: '#76E46B'}},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },true);
    },
    cag(){
      var id = this.$route.query.id
      var data ={
        "id": id,
        "year":this.year.getFullYear()
      }
      tongjixiang(data)
        .then(response => {
          console.log(response.data)
          this.mainCardNumber=response.data.tbMotorcadeOilsInfo.cardNo
          this.placeOpening=response.data.tbMotorcadeOilsInfo.fullName
          this.unitName=response.data.tbMotorcadeOilsInfo.name
          this.data2 = response.data.series[0].data2
          this.data3 = response.data.series[1].data3
          this.data4 = response.data.series[2].data4
          this.localAmout = response.data.series[3].localAmout
          this.FieldAmout =response.data.series[4].FieldAmout
          this.oilsAmout = response.data.series[5].oilsAmout
          this.commodityAmout = response.data.series[6].commodityAmout
          this.trendLine();
          this.regionLine();
          this.typeLine();
        })
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/queryMotorcadeOils',
      //   {
      //     "id": id,
      //     "year":this.year.getFullYear()
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     this.mainCardNumber=res.body.tbMotorcadeOilsInfo.cardNo
      //     this.placeOpening=res.body.tbMotorcadeOilsInfo.fullName
      //     this.unitName=res.body.tbMotorcadeOilsInfo.name
      //     this.data2 = res.body.series[0].data2
      //     this.data3 = res.body.series[1].data3
      //     this.data4 = res.body.series[2].data4
      //     this.localAmout = res.body.series[3].localAmout
      //     this.FieldAmout = res.body.series[4].FieldAmout
      //     this.oilsAmout = res.body.series[5].oilsAmout
      //     this.commodityAmout = res.body.series[6].commodityAmout
      //     this.trendLine();
      //     this.regionLine();
      //     this.typeLine();
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     // this.$message.error('获取失败');
      //   })
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
  padding: 2%;
}
.main{
  min-height: calc(100vh - 181px);
//   background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
}   
.header h3{
  line-height: 60px;
  margin: 0;
}
.top{
    display: flex;
    justify-content: space-between;
    color: #606266;
    border-bottom: 1px solid #F6F7FB;
    padding: 20px;
    background-color: #fff;
}
.you{
    background-color: #fff;
}
.date{
    padding: 20px;
}
.tu{
    margin-top: 20px;
}
.bg-purple{
    background-color: #fff;
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
h3 .el-button--medium.is-circle{
  border: 0;
}
</style>