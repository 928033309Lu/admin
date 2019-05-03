<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>关键指标</h3>
        
    </div>
    <div class="main">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="gender" :style="{width: '100%', height: '420px'}"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple old">
            <!-- <div id="newOldGender" :style="{width: '100%', height: '420px'}"></div> -->
            <div class="new">
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
              <div class="ren"><span>{{baifenbi}}%</span></div>
            </div>
            <div class="di">
              <p>
                <span></span>
                <span>新用户</span>
              </p>
              <p>
                <span></span>
                <span>老用户</span>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="age" :style="{width: '100%', height: '420px'}"></div>
            <!-- <div class="age">
              <h3>年龄分布 </h3>
            </div> -->
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="education" :style="{width: '100%', height: '420px'}"></div>
          </div>
        </el-col>
      </el-row>
      <div class="fen">
        <h3>TOP10职业分布</h3>
        <div class="bu">
          <div class="box">
            <div class="dian">
              <p>电子网络</p>
              <p>{{top1}}%</p>
            </div>
          </div>
          <div class="box">
            <div class="guan">
              <p>官员翻译</p>
              <p>1.01%</p>
            </div>
            <div class="jiao">
              <p>教育科研</p>
              <p>4.71%</p>
            </div>
          </div>
          <div class="box">
            <div class="yi">
              <p>医疗生化</p>
              <p>1.68%</p>
            </div>
            <div class="ke">
              <p>销售客服</p>
              <p>3.03%</p>
            </div>
          </div>
          <div class="box">
            <div class="wu">
              <p>物流采购</p>
              <p>1.01%</p>
            </div>
            <div class="xing">
              <p>行政高管</p>
              <p>2.36%</p>
            </div>
          </div>
          <div class="box">
            <div class="jin">
              <p>金融保险</p>
              <p>4.38%</p>
            </div>
            <div class="mei">
              <p>媒体艺术</p>
              <p>3.07%</p>
            </div>
          </div>
          <div class="box">
            <div class="fu">
              <p>服务业</p>
              <p>1.01%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ratio } from '@/api/yonghufenxi';

export default {
  name: 'portraitDemo',
  data() {
    return {
      newOld: 0.64 ,
      baifenbi:'64%',
      memberSexRatio:{},//性别比例
      memberAgeRatio:[],//年龄分布
      memberTeachRatio:[],//学历分布
      top1:'',
    }
    
  },
  mounted() {
    this.genderLine();
    // this.newOldGenderLine();
    this.educationLine();
    this.ageLine();
    this.old();
    this.get()
  },
  methods: {
    get(){
      var data = {

      }
      ratio(data)
        .then(response => {
          console.log(response.data)
          this.memberSexRatio = response.data.memberSexRatio[0]
          this.genderLine();
          this.newOld = response.data.memberNewRatio[0].new/(response.data.memberNewRatio[0].new+response.data.memberNewRatio[0].old)
          this.baifenbi = (this.newOld*100).toFixed(2);
          this.old();
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].total-response.data.memberAgeRatio[0].age17-response.data.memberAgeRatio[0].age24-response.data.memberAgeRatio[0].age29-response.data.memberAgeRatio[0].age34-response.data.memberAgeRatio[0].age39-response.data.memberAgeRatio[0].age40)
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].age17)
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].age24)
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].age29)
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].age34)
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].age39)
          this.memberAgeRatio.push(response.data.memberAgeRatio[0].age40)
          this.ageLine();
          this.memberTeachRatio.push(response.data.memberTeachRatio[0].total-response.data.memberTeachRatio[0].JuniorCollege-response.data.memberTeachRatio[0].bachelor-response.data.memberTeachRatio[0].doctor-response.data.memberTeachRatio[0].highSchool-response.data.memberTeachRatio[0].master)
          this.memberTeachRatio.push(response.data.memberTeachRatio[0].highSchool)
          this.memberTeachRatio.push(response.data.memberTeachRatio[0].JuniorCollege)
          this.memberTeachRatio.push(response.data.memberTeachRatio[0].bachelor)
          this.memberTeachRatio.push(response.data.memberTeachRatio[0].master)
          this.memberTeachRatio.push(response.data.memberTeachRatio[0].doctor)
          this.educationLine();
          this.top1 = (response.data.memberProfessionRatio[0].个体工商业者/response.data.memberProfessionRatio[0].total).toFixed(2);
          
        })
    },
    old(){
      var n = document.querySelectorAll('.ren')
      var newOld = this.newOld*100
      console.log(newOld)
      var sapn =  document.querySelectorAll('.ren span')
      for (let i = 0; i < sapn.length; i++) {
        sapn[i].style.display="none"
      }
      for (let i = 0; i < n.length; i++) {
        n[i].style.backgroundImage="url(./src/images/lanren.jpg)"
        n[i].style.backgroundSize=""
      }
      if(newOld<=10){
        n[0].style.backgroundImage="url(./src/images/jupai.png)"
        n[0].style.position="relative"
        n[0].style.backgroundSize="58px 115px"
        sapn[0].style.display="block"
      }else if(newOld<=20){
        n[1].style.backgroundImage="url(./src/images/jupai.png)"
        n[1].style.position="relative"
        n[1].style.backgroundSize="58px 115px"
        sapn[1].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=30){
        n[2].style.backgroundImage="url(./src/images/jupai.png)"
        n[2].style.position="relative"
        n[2].style.backgroundSize="58px 115px"
        sapn[2].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=40){
        n[3].style.backgroundImage="url(./src/images/jupai.png)"
        n[3].style.position="relative"
        n[3].style.backgroundSize="58px 115px"
        sapn[3].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=50){
        n[4].style.backgroundImage="url(./src/images/jupai.png)"
        n[4].style.position="relative"
        n[4].style.backgroundSize="58px 115px"
        sapn[4].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[3].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=60){
        n[5].style.backgroundImage="url(./src/images/jupai.png)"
        n[5].style.position="relative"
        n[5].style.backgroundSize="58px 115px"
        sapn[5].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[3].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[4].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=70){
        n[6].style.backgroundImage="url(./src/images/jupai.png)"
        n[6].style.position="relative"
        n[6].style.backgroundSize="58px 115px"
        sapn[6].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[3].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[4].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[5].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=80){
        n[7].style.backgroundImage="url(./src/images/jupai.png)"
        n[7].style.position="relative"
        n[7].style.backgroundSize="58px 115px"
        sapn[7].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[3].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[4].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[5].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[6].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=90){
        n[8].style.backgroundImage="url(./src/images/jupai.png)"
        n[8].style.position="relative"
        n[8].style.backgroundSize="58px 115px"
        sapn[8].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[3].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[4].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[5].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[6].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[7].style.backgroundImage="url(./src/images/lvren.jpg)"
      }else if(newOld<=100){
        n[9].style.backgroundImage="url(./src/images/jupai.png)"
        n[9].style.position="relative"
        n[9].style.backgroundSize="58px 115px"
        sapn[9].style.display="block"
        n[0].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[1].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[2].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[3].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[4].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[5].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[6].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[7].style.backgroundImage="url(./src/images/lvren.jpg)"
        n[8].style.backgroundImage="url(./src/images/lvren.jpg)"
      }
    },
    genderLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("gender"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '性别比例',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data:['未知','男','女']
        },
        series: [
        {
          name:'性别比例',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:this.memberSexRatio.total-this.memberSexRatio.male-this.memberSexRatio.female, name:'未知',itemStyle: {color: '#5D9CEB'}},
            {value:this.memberSexRatio.male, name:'男',itemStyle: {color: '#62C87F'}},
            {value:this.memberSexRatio.female, name:'女',itemStyle: {color: '#F15755'}},
          ]
          }]
      });
    },
    newOldGenderLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("newOldGender"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '新用户比例',
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          icon: "circle",
          orient: "vertical",
          right: "right",
          top:'center',
          data: ["新用户", "老用户",]
        },
        series: [
          {
            name: "销售分布",
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
              { value: 335, name: "新用户", itemStyle: {color: '#8DC057'}},
              { value: 310, name: "老用户", itemStyle: {color: '#45D2DC'}},
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
      });
    },
    educationLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("education"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '学历分布',
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          bottom:'2%',
          data: ['未知','高中','大专','本科','硕士','博士']
        },
        grid: {
          left: '3%',
          right: '4%',
          top:'35%',
          bottom: '35%',
          containLabel: true
        },
        xAxis:  {
          type: 'value',
          show:false
        },
        yAxis: {
          type: 'category',
          data: ['学历分布'],
          // height:'400px',
          show:false
        },
        series: [
          {
            name: '未知',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {color: '#06A4AD'},
            data: [this.memberTeachRatio[0]]
          },
          {
            name: '大专',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {color: '#95E8EC'},
            data: [this.memberTeachRatio[2]]
          },
          {
            name: '高中',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {color: '#63DEE5'},
            data: [this.memberTeachRatio[1]]
          },
          {
            name: '本科',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {color: '#8CC253'},
            data: [this.memberTeachRatio[3]]
          },
          {
            name: '硕士',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {color: '#38D2DE'},
            data: [this.memberTeachRatio[4]]
          },
          {
            name: '博士',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {color: '#1BBDC8'},
            data: [this.memberTeachRatio[5]]
          }
        ]
      });
    },
    ageLine() {
      var weatherIcons = {
        'weizhi': './src/images/weizhi.jpg',
        'Tue': './src/images/0-17.jpg',
        'Wed': './src/images/18-24.jpg',
        'Thu': './src/images/25-29.jpg',
        'Fri': './src/images/30-34.jpg',
        'Sat': './src/images/35-39.jpg',
        'Sun': './src/images/40.jpg',
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("age"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '年龄分布',
        },
        color: ['#3BD2DD'],
        tooltip : {
          show:false,
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis : [
            {
              type : 'category',
              data : ['weizhi', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisLabel: {
                interval: 0,
                formatter: function (value) {
                  // return '{' + value + '| }\n{value|' + value + '}';
                  return '{' + value + '| }';
                },
                rich: {
                    value: {
                      lineHeight: 30,
                      align: 'center'
                    },
                    weizhi: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.weizhi
                      }
                    },
                    Tue: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.Tue
                      }
                    },
                    Wed: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.Wed
                      }
                    },
                    Thu: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.Thu
                      }
                    },
                    Fri: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.Fri
                      }
                    },
                    Sat: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.Sat
                      }
                    },
                    Sun: {
                      height: 50,
                      align: 'center',
                      backgroundColor: {
                        image: weatherIcons.Sun
                      }
                    },
                }
              },
              axisLine:{
                show:false,          
              }, 
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            }
        ],
        yAxis : [
          {
            show:false,
            type : 'value'
          }
        ],
        series : [
            {
              name:'年龄分布',
              type:'bar',
              barWidth: '60%',
              data:this.memberAgeRatio
            }
        ]
    });
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bg-purple{
  padding: 13px;
}
.warp{
  background-color: #F6F7FB;
}
.main{
  min-height: calc(100vh - 181px);
  // background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
}
.header h3{
    display: inline-block;
    width: 100px;
    line-height: 60px;
    margin: 0;
}
.header h3 span{
  display: inline-block;
  width: 3px;
  height: 25px;
  vertical-align: middle;
  background-color: #5B8DFF;
  margin-right: 5px;
}
.bg-purple{
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 20px;
}
.fen{
  background-color: #fff;
  padding: 10px;
}
.bu{
  display: flex;
  flex-wrap: nowrap;
  padding: 10px;
}
.bu .box{
  width: 20%;
  align-items:center;
  // margin: 0 2%;
}
.bu .box div{
  // background-color: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // margin: 5px auto;

}
.bu div p{
  text-align: center;
  vertical-align: middle;
  color: #fff;
  margin: 5px 0;
  font-size: 12px;
}
.dian{
  width: 180px;
  height: 180px;
  background-color: #5D9CEB;
}
.guan{
  width: 80px;
  height: 80px;
  background-color: #F47BC2;
}
.jiao{
  width: 170px;
  height: 170px;
  background-color: #62C87F;
}
.yi{
  width: 90px;
  height: 90px;
  background-color: #6ED5E6;
}
.ke{
  width: 150px;
  height: 150px;
  background-color: #6F53B7;
  margin-left: 30px;
}
.wu{
  width: 80px;
  height: 80px;
  background-color: #DCB187;
}
.xing{
  width: 130px;
  height: 130px;
  background-color: #FFCE57;
  margin-left: 30px;
}
.jin{
  width: 160px;
  height: 160px;
  background-color: #F15755;
}
.mei{
  width: 155px;
  height: 155px;
  background-color: #FC8640;
  margin-left: 50px;
}
.fu{
  width: 80px;
  height: 80px;
  background-color: #647B9B;
  margin-left: -13px;
}
.old{
  display: flex;
  align-items:center;
  justify-content:center;
  height: 430px;
}
.new{
  height: 115px;
  margin: 0 auto;
  display: flex;
}
.ren{
  width: 58px;
  height: 115px;
  background: url(../../images/lanren.jpg) no-repeat;
  // background-size: 58px 115px;
}
.ren+.ren{
  margin-left: -21px;
}
.ren span{
  display: none;
  position: absolute;
  top: 9px;
  left: 13px;
  color: #fff;
  font-size: 12px;
}
.di{
  position: absolute;
  bottom: 5px;
}
.di span{
  color: #939393;
}
.di p{
  float: left;
}
.di span:nth-of-type(2n-1){
  display: inline-block;
  width: 13px;
  height: 13px;
}

.di span:nth-of-type(1){
  background-color: #90BF59;
}
.di p:nth-of-type(2) span:nth-of-type(1){
  background-color: #44D2DC;
}
</style>
