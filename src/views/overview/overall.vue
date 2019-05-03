<template>
    <div class="warp">
        <div class="header">
            <h3>
                <span></span>历史趋势
            </h3>
            <div class="xuan">
                <div class="box">
                    <span>时间</span>
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        @change="xuanzheChange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <!-- <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker> -->
                </div>
                <div class="box">
                    <span>公司</span>
                    <el-select v-model="company" clearable @change="change" placeholder="请选择">
                        <el-option
                            v-for="item in companyOptions"
                            :key="item.id"
                            :label="item.company_name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="box">
                    <span>加油站</span>
                    <el-select v-model="gasStation" clearable @change="xuanzheChange" placeholder="请选择">
                        <el-option
                            v-for="item in stationOptions"
                            :key="item.id"
                            :label="item.fullName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="overall">
                <div class="duibi">
                    <el-date-picker
                        v-show="duibiShow"
                        v-model="duibiDate"
                        @change="duibiChange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" @click="duibiShow = !duibiShow">对比时间</el-button>
                </div>
                
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="营业金额" name="first">
                        <div id="businessAmount" :style="{width: '100%', height: '420px'}"></div>
                    </el-tab-pane>
                    <el-tab-pane label="交易笔数" name="second">
                        <div id="transactionNumber" :style="{height: '420px'}"></div>
                    </el-tab-pane>
                    <el-tab-pane label="会员数" name="third">
                        <div id="membershipNumber" :style="{width: '100%', height: '420px'}"></div>
                    </el-tab-pane>
                    <el-tab-pane label="油品数量" name="fourth">
                        <div id="oilQuantity" :style="{width: '100%', height: '420px'}"></div>
                    </el-tab-pane>
                    <el-tab-pane label="油品数量（年）" name="Fifth">
                        <div id="oilQuantityYear" :style="{width: '100%', height: '420px'}"></div>
                    </el-tab-pane>
                    <!-- <el-tab-pane>
                        <el-button slot="label" type="primary">对比时间</el-button>
                    </el-tab-pane>-->
                </el-tabs>
                <div class="footer">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div id="myChart" :style="{width: '100%', height: '420px'}"></div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div id="oilChart" :style="{width: '100%', height: '420px'}"></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import { getCompanyByWhere } from "@/api/youpinbaobiao";
import { StationList } from "@/api/youpinbaobiao";
import { zhengtiqushi} from "@/api/youpinbaobiao";

export default {
    name: "overviewsDemo",
    data() {
        return {
            activeName: "first",
            date: [], //日期
            company: "", //公司
            companyOptions: [],
            gasStation: "", //加油站
            stationOptions: [],
            duibiDate:[],//对比时间
            duibiShow:false,//控制对比时间显示
            businessAmountLineData:{
                dateData:[],
                sumData:[]
            },//营业金额
            duibibusinessAmountLineData:{
                dateData:[],
                sumData:[]
            },//营业金额 对比
            transactionNumberData:{
                dateData:[],
                sumData:[]
            },//交易笔数
            duibitransactionNumberData:{
                dateData:[],
                sumData:[]
            },//交易笔数 对比
            membershipNumberData:{
                dateData:[],
                sumData:[]
            },//会员数
            duibimembershipNumberData:{
                dateData:[],
                sumData:[]
            },//会员数 对比
            oilQuantityData:{
                dateData:[],
                sumData:[]
            },//油品数量
            duibioilQuantityData:{
                dateData:[],
                sumData:[]
            },//油品数量 对比
            oilQuantityYearData:{
                dateData:[],
                sumData:[]
            },//油品数量（年）
            duibioilQuantityYearData:{
                dateData:[],
                sumData:[]
            },//油品数量（年） 对比
            piePay:[{
                alipay:0,//支付宝
                card:0,//银联卡
                cash:0,//现金
                member:0,//会员卡
                oldMember:0,//老会员
                wechat:0,//微信
            }],
            pieOil:[],
            pieOilName:[],
            color:["#307aff","#51b440","#fe8534","#FAD24C","#2BC940","#FF5B5C","#FC8531","#F98ABF"]
        };
    },
    mounted() {
        this.get()
    },
    methods: {
        get(){
            var a = {};
            getCompanyByWhere(a).then(response => {
                // console.log(response.data)
                this.companyOptions = response.data;
            });
            this.xuanzheChange()
        },
        xuanzheChange() {
            var data = {
                startTime:this.date[0] ? this.date[0] : null ,
                endTime:this.date[1] ? this.date[0] : null ,
                companyId:this.company,
                stationId:this.gasStation
                // startTime : new Date(new Date-7*24*3600*1000),//一周前
                // startTime : new Date(new Date(new Date().toLocaleDateString()).getTime()), // 当天0点
                // endTime : new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)// 当天23:59
                // endTime : new Date(new Date-5*4*7*24*3600*1000)
            }
            console.log(data)
            zhengtiqushi(data).then(res=>{
                console.log('整体趋势')
                console.log(res.data)
                this.businessAmountLineData = {
                    dateData:[],
                    sumData:[]
                }
                
                for (let i = 0; i < res.data.chartBusinessAmount.length; i++) {
                    this.businessAmountLineData.dateData.push(res.data.chartBusinessAmount[i].createTime)                        
                    this.businessAmountLineData.sumData.push(res.data.chartBusinessAmount[i].sum)
                }
                this.transactionNumberData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartBusinessCount.length; i++) {
                    this.transactionNumberData.dateData.push(res.data.chartBusinessCount[i].createTime)                        
                    this.transactionNumberData.sumData.push(res.data.chartBusinessCount[i].count)
                }
                this.membershipNumberData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartMember.length; i++) {
                    this.membershipNumberData.dateData.push(res.data.chartMember[i].days)                        
                    this.membershipNumberData.sumData.push(res.data.chartMember[i].sum)
                }
                
                this.oilQuantityData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartOilAmountByDay.length; i++) {
                    this.oilQuantityData.dateData.push(res.data.chartOilAmountByDay[i].createTime)                        
                    this.oilQuantityData.sumData.push(res.data.chartOilAmountByDay[i].sum)
                }
                
                this.oilQuantityYearData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartOilAmountByMonths.length; i++) {
                    this.oilQuantityYearData.dateData.push(res.data.chartOilAmountByMonths[i].createTime)                        
                    this.oilQuantityYearData.sumData.push(res.data.chartOilAmountByMonths[i].sum)
                }
                this.piePay = res.data.piePay
                this.pieOil = []
                this.pieOilName = []
                for (let i = 0; i < res.data.pieOil.length; i++) {
                    this.pieOil.push({
                        value: res.data.pieOil[i].sum,
                        name: res.data.pieOil[i].oils_name,
                        itemStyle: { color: this.color[i] }
                    })
                    this.pieOilName.push(res.data.pieOil[i].oils_name)
                }
                console.log(this.pieOil)
                this.businessAmountLine();
                this.transactionNumberLine();
                this.membershipNumberLine();
                this.oilQuantityLine();
                this.oilQuantityYearLine();
                this.drawCircle();
                this.oilCircle();
            })
        },
        duibiChange() {
            var data = {
                startTime:this.duibiDate[0],
                endTime:this.duibiDate[1],
                companyId:this.company,
                stationId:this.gasStation
            }
            console.log(data)
            zhengtiqushi(data).then(res=>{
                console.log('整体趋势')
                console.log(res.data)
                this.duibibusinessAmountLineData = {
                    dateData:[],
                    sumData:[]
                }
                
                for (let i = 0; i < res.data.chartBusinessAmount.length; i++) {
                    this.duibibusinessAmountLineData.dateData.push(res.data.chartBusinessAmount[i].createTime)                        
                    this.duibibusinessAmountLineData.sumData.push(res.data.chartBusinessAmount[i].sum)
                }
                this.duibitransactionNumberData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartBusinessCount.length; i++) {
                    this.duibitransactionNumberData.dateData.push(res.data.chartBusinessCount[i].createTime)                        
                    this.duibitransactionNumberData.sumData.push(res.data.chartBusinessCount[i].count)
                }
                this.duibimembershipNumberData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartMember.length; i++) {
                    this.duibimembershipNumberData.dateData.push(res.data.chartMember[i].days)                        
                    this.duibimembershipNumberData.sumData.push(res.data.chartMember[i].sum)
                }
                
                this.duibioilQuantityData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartOilAmountByDay.length; i++) {
                    this.duibioilQuantityData.dateData.push(res.data.chartOilAmountByDay[i].createTime)                        
                    this.duibioilQuantityData.sumData.push(res.data.chartOilAmountByDay[i].sum)
                }
                
                this.duibioilQuantityYearData = {
                    dateData:[],
                    sumData:[]
                }
                for (let i = 0; i < res.data.chartOilAmountByMonths.length; i++) {
                    this.duibioilQuantityYearData.dateData.push(res.data.chartOilAmountByMonths[i].createTime)                        
                    this.duibioilQuantityYearData.sumData.push(res.data.chartOilAmountByMonths[i].sum)
                }
                // console.log(this.pieOil)
                this.businessAmountLine();
                this.transactionNumberLine();
                this.membershipNumberLine();
                this.oilQuantityLine();
                this.oilQuantityYearLine();
            })
        },
        change() {
            var data = {
                companyId: this.company
            };
            StationList(data).then(response => {
                console.log(response.data);
                this.stationOptions = response.data;
            });
        },
        //营业金额折线图
        businessAmountLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(
                document.getElementById("businessAmount")
            );
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "left",
                    data: ["选择时间", "对比时间"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: this.businessAmountLineData.dateData
                },
                yAxis: {
                    type: "value",
                    splitLine: { show: false } //去除网格线
                    // splitArea:{show : true},//保留网格区域
                },
                series: [
                    {
                        name: "选择时间",
                        type: "line",
                        stack: "总量",
                        itemStyle: { color: "#FF7173" },
                        data: this.businessAmountLineData.sumData
                    },
                    {
                        name: "对比时间",
                        type: "line",
                        stack: "总量1",
                        itemStyle: { color: "#5C8BFF" },
                        data: this.duibibusinessAmountLineData.sumData
                    }
                ]
            });
        },
        //交易笔数折线图
        transactionNumberLine() {
            var transactionNumber = document.getElementById(
                "transactionNumber"
            );
            transactionNumber.style.width =
                document.querySelector(".overall").offsetWidth + "px";
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(transactionNumber);
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "left",
                    data: ["选择时间", "对比时间"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: this.transactionNumberData.dateData
                },
                yAxis: {
                    type: "value",
                    splitLine: { show: false } //去除网格线
                    // splitArea:{show : true},//保留网格区域
                },
                series: [
                    {
                        name: "选择时间",
                        type: "line",
                        stack: "总量",
                        data: this.transactionNumberData.sumData
                    },
                    {
                        name: "对比时间",
                        type: "line",
                        stack: "总量1",
                        data: this.duibitransactionNumberData.sumData
                    }
                ]
            });
        },
        //会员数折线图
        membershipNumberLine() {
            var membershipNumber = document.getElementById("membershipNumber");
            membershipNumber.style.width =
                document.querySelector(".overall").offsetWidth + "px";
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(membershipNumber);
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "left",
                    data: ["选择时间", "对比时间"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: this.membershipNumberData.dateData
                },
                yAxis: {
                    type: "value",
                    splitLine: { show: false } //去除网格线
                    // splitArea:{show : true},//保留网格区域
                },
                series: [
                    {
                        name: "选择时间",
                        type: "line",
                        stack: "总量",
                        data: this.membershipNumberData.sumData
                    },
                    {
                        name: "对比时间",
                        type: "line",
                        stack: "总量1",
                        data: this.duibimembershipNumberData.sumData
                    }
                ]
            });
        },
        //油品数量折线图
        oilQuantityLine() {
            var oilQuantity = document.getElementById("oilQuantity");
            oilQuantity.style.width =
                document.querySelector(".overall").offsetWidth + "px";
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(oilQuantity);
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "left",
                    data: ["选择时间", "对比时间"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: this.oilQuantityData.dateData
                },
                yAxis: {
                    type: "value",
                    splitLine: { show: false } //去除网格线
                    // splitArea:{show : true},//保留网格区域
                },
                series: [
                    {
                        name: "选择时间",
                        type: "line",
                        stack: "总量",
                        data: this.oilQuantityData.sumData
                    },
                    {
                        name: "对比时间",
                        type: "line",
                        stack: "总量1",
                        data: this.duibioilQuantityData.sumData
                    }
                ]
            });
        },
        //油品数量（年）折线图
        oilQuantityYearLine() {
            var oilQuantityYear = document.getElementById("oilQuantityYear");
            oilQuantityYear.style.width =
                document.querySelector(".overall").offsetWidth + "px";
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(oilQuantityYear);
            // 绘制图表
            myChart.setOption({
                title: {},
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "left",
                    data: ["选择时间", "对比时间"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: this.oilQuantityYearData.dateData
                },
                yAxis: {
                    type: "value",
                    splitLine: { show: false } //去除网格线
                    // splitArea:{show : true},//保留网格区域
                },
                series: [
                    {
                        name: "选择时间",
                        type: "line",
                        stack: "总量",
                        data: this.oilQuantityYearData.sumData
                    },
                    {
                        name: "对比时间",
                        type: "line",
                        stack: "总量1",
                        data: this.duibioilQuantityYearData.sumData
                    }
                ]
            });
        },
        drawCircle() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "支付方式统计"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
                },
                legend: {
                    icon: "circle",
                    orient: "vertical",
                    bottom: "bottom",
                    data: [
                        "支付宝",
                        "微信",
                        "会员卡",
                        "银行卡",
                        "现金",
                        "老会员"
                    ],
                    "textStyle": {
                    "fontSize": 14
                    }
                },
                series: [
                    {
                        name: "支付方式统计",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        label: {
                            normal: {
                                position: "inner",
                                formatter: "{d}%"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: this.piePay[0].alipay,
                                name: "支付宝",
                                itemStyle: { color: "#307aff" }
                            },
                            {
                                value: this.piePay[0].wechat,
                                name: "微信",
                                itemStyle: { color: "#2BC940" }
                            },
                            {
                                value: this.piePay[0].member,
                                name: "会员卡",
                                itemStyle: { color: "#FAD24C" }
                            },
                            {
                                value: this.piePay[0].card,
                                name: "银行卡",
                                itemStyle: { color: "#FF5B5C" }
                            },
                            {
                                value: this.piePay[0].cash,
                                name: "现金",
                                itemStyle: { color: "#FC8531" }
                            },
                            {
                                value: this.piePay[0].oldMember,
                                name: "老会员",
                                itemStyle: { color: "#F98ABF" }
                            }
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
        oilCircle() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("oilChart"));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "油品统计"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}万升 ({d}%)"
                },
                legend: {
                    icon: "circle",
                    orient: "vertical",
                    bottom: "bottom",
                    data: this.pieOilName,
                    "textStyle": {
                    "fontSize": 14
                    }
                },
                series: [
                    {
                        name: "油品统计",
                        type: "pie",
                        radius: "55%",
                        center: ["45%", "60%"],
                        label: {
                            normal: {
                                position: "inner",
                                formatter: "{d}%"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:this.pieOil,
                        //  [
                        //     {
                        //         value: 335,
                        //         name: "92#汽油",
                        //         itemStyle: { color: "#307aff" }
                        //     },
                        //     {
                        //         value: 310,
                        //         name: "95#汽油",
                        //         itemStyle: { color: "#51b440" }
                        //     },
                        //     {
                        //         value: 234,
                        //         name: "98#汽油",
                        //         itemStyle: { color: "#fe8534" }
                        //     },
                        //     {
                        //         value: 234,
                        //         name: "0#柴油",
                        //         itemStyle: { color: "#FAD24C" }
                        //     }
                        // ],
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
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
}
.main {
    min-height: calc(100vh - 181px);
    background-color: #fff;
    width: 100%;
    height: 100%;
}
.header {
    background-color: #fff;
    height: 60px;
    padding-left: 20px;
    padding-right: 20px;
    // border-bottom: 1px solid #f6f7fb;
    position: relative;
    box-shadow: 0 0 10px 0 #dcdfe6;
}
.header h3 {
    display: inline-block;
    width: 100px;
    line-height: 60px;
    margin: 0;
}
.header h3 span {
    display: inline-block;
    width: 3px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 10px;
}
.footer {
    padding: 2% 3%;
}
.bg-purple {
    border: 1px solid #f6f7fb;
}
.el-tab-pane {
    position: relative;
}
.el-tab-pane .el-button {
    position: absolute;
    right: 3%;
    top: -198px;
}
.xuan {
    // float: right;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    position: absolute;
    // width: 56%;
    top: 0;
    right: 0;
}
.xuan .box {
    display: inline-block;
    margin-left: 20px;
}
.box span {
    margin-right: 10px;
}
.el-date-editor,
.el-select {
    width: 200px;
}
.duibi{
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 15px;
    right: 20px;
    z-index: 200;
}
.bg-purple {
    border: 1px solid #dcdfe6;
}
</style>
<style scoped>
.overall{
    position: relative;
}
.overall button{
    margin-left: 20px;
}
.overall .el-tabs__nav-scroll {
    padding-left: 25px;
}
.overall .el-tabs__nav-wrap {
    padding: 0 2%;
}
.overall .el-tabs__content {
    padding: 15px 3%;
    overflow: visible;
}
.overall .el-tabs__nav {
    height: 60px;
    line-height: 60px;
}
#tab-5 {
    float: right;
    margin-top: 12px;
}
.el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    z-index: 1;
}
.grid-content{
    padding: 20px;
}
</style>