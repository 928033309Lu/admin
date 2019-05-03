<template>
    <div class="warp">
        <div class="top">
            <div class="box">
                <span>加油站</span>
                <el-select v-model="station" @change="sanduanChange" clearable placeholder="请选择">
                    <el-option
                        v-for="item in stationOptions"
                        :key="item.id"
                        :label="item.fullName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div> 
        </div>
         <div class="capital">
            <el-row :gutter="10">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <div class="grid-content bg-purple">
                        <div class="xiaoshou">
                            <h3>{{payMoment.sum_amount}}</h3>
                            <span></span>
                            <span>销售收入（日）</span>
                        </div>
                        <div class="shu"></div>
                        <div class="chongzhi">
                            <h3>{{payMoment.recharge}}</h3>
                            <span></span>
                            <span>充值金额（日）</span>
                        </div>

                    </div>
                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
                    <div class="grid-content bg-purple-light">
                        <div class="chendian">
                            <h3>{{payMoment.idle_amount}}</h3>
                            <span></span>
                            <span>沉淀资金（总）</span>
                        </div>
                        <div class="shu"></div>
                        <div class="zongshu">
                            <h3>{{payMoment.members}}</h3>
                            <span></span>
                            <span>会员总数（总）</span>
                        </div>
                        <div class="shu"></div>
                        <div class="leiji">
                            <h3>{{payMonth.sum_amount}}</h3>
                            <span></span>
                            <span>累计收入（月）</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- <div class="left">
                <div class="xiaoshou">
                    <h3>2083895</h3>
                    <span></span>
                    <span>销售收入（日）</span>
                </div>
                <div class="shu"></div>
                <div class="chongzhi">
                    <h3>4598700</h3>
                    <span></span>
                    <span>充值金额（日）</span>
                </div>
            </div>
            <div class="right">
                <div class="chendian">
                    <h3>2083895</h3>
                    <span></span>
                    <span>沉淀资金（总）</span>
                </div>
                <div class="shu"></div>
                <div class="zongshu">
                    <h3>87632</h3>
                    <span></span>
                    <span>会员总数（总）</span>
                </div>
                <div class="shu"></div>
                <div class="leiji">
                    <h3>2083895</h3>
                    <span></span>
                    <span>累计收入（月）</span>
                </div>
            </div>-->
        </div>
        <div class="income">
            <div class="items">
                <img src="@/images/zhifubao.jpg" alt>
                <div class="zfb">
                    <h3>￥{{payMoment.alipay_amount}}</h3>
                    <span>支付宝收入</span>
                    <span>{{payMoment.alipay_count}} 笔/日</span>
                </div>
            </div>
            <div class="shu"></div>
            <div class="items">
                <img src="@/images/weixin.jpg" alt>
                <div class="zfb">
                    <h3>￥{{payMoment.wechat_amount}}</h3>
                    <span>微信收入</span>
                    <span>{{payMoment.wechat_count}} 笔/日</span>
                </div>
            </div>

            <div class="shu"></div>
            <div class="items">
                <img src="@/images/xianjin.jpg" alt>
                <div class="zfb">
                    <h3>￥{{payMoment.cash_amount}}</h3>
                    <span>现金收入</span>
                    <span>{{payMoment.cash_count}} 笔/日</span>
                </div>
            </div>
            <div class="shu"></div>
            <div class="items">
                <img src="@/images/yinhangka.jpg" alt>
                <div class="zfb">
                    <h3>￥{{payMoment.card_amount}}</h3>
                    <span>银行卡收入</span>
                    <span>{{payMoment.card_count}} 笔/日</span>
                </div>
            </div>
            <div class="shu"></div>
            <div class="items">
                <img src="@/images/xinhuiyuan.png" alt>
                <div class="zfb">
                    <h3>￥{{payMoment.member_amount}}</h3>
                    <span>会员收入</span>
                    <span>{{payMoment.member_count}} 笔/日</span>
                </div>
            </div>
        </div>
        <div class="topbang">
            <div class="youpin">
                <div class="title">
                    <span></span>
                    <h3>油品TOP5</h3>
                </div>
                <ul>
                    <li v-for="(item,index) in oilTop" :key="item.oils_name">
                        <span v-if="index==3">4</span>
                         <span v-else-if="index==4">5</span>
                         <span v-else></span>
                        <span>{{item.oils_name}}</span>
                        <span>{{item.sum}}</span>
                    </li>     
                </ul>
            </div>
            <div class="shangpin">
                <div class="title">
                    <span></span>
                    <h3>商品TOP5</h3>
                </div>
                <ul>
                    <li v-for="(item,index) in goodsTop" :key="item.goods_name">
                        <span v-if="index==3">4</span>
                         <span v-else-if="index==4">5</span>
                         <span v-else></span>
                        <span>{{item.goods_name}}</span>
                        <span>{{item.sum}}</span>
                    </li>     
                    
                </ul>
            </div>
            <div class="shanghu">
                <div class="title">
                    <span></span>
                    <h3>油站TOP5</h3>
                </div>
                <ul>
                   <li v-for="(item,index) in stationTop" :key="item.station_name">
                        <span v-if="index==3">4</span>
                         <span v-else-if="index==4">5</span>
                         <span v-else></span>
                        <span>{{item.station_name}}</span>
                        <span>{{item.sum}}</span>
                    </li>     
                </ul>
            </div>
        </div>

        <div class="biao">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="收银金额" name="first">
                    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                        <line-chart
                            :chart-data="lineChartData"
                            :chart-title="['非油品', '油品']"
                            :style="{width: '100%', height: '420px'}"
                        />
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="油品数量" name="second">
                    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                        <line-chart
                            v-if="tabShow[1]"
                            :chart-data="youpinshuliangData"
                            :chart-title="['汽油', '柴油']"
                            :style="{width: '100%', height: '420px'}"
                        />
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="充值金额" name="third">
                    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                        <line-chart
                            v-if="tabShow[2]"
                            :chart-data="chongzhijineData"
                            :chart-title="['充值金额']"
                            :style="{width: '100%', height: '420px'}"
                        />
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="会员总数" name="fourth">
                    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                        <line-chart
                            v-if="tabShow[3]"
                            :chart-data="huiyuanshuliangData"
                            :chart-title="['会员数量']"
                            :style="{width: '100%', height: '420px'}"
                        />
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="yichang">
            <div class="header">
                <h3>
                    <span></span>异常信息
                </h3>
            </div>
            <div class="table">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="companyName" label="时间" align="center"></el-table-column>
                    <el-table-column prop="orderNo" label="异常类型" align="center"></el-table-column>
                    <el-table-column label="异常信息" prop="fullName" align="center"></el-table-column>
                    <el-table-column label="状态" prop="username" align="center"></el-table-column>
                    <el-table-column label="操作" prop="member" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click="see(scope.$index, scope.row)"
                                type="primary"
                                size="small"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from "./components/LineChart";
import {sanduangailan} from "@/api/youpinbaobiao";
import { StationList } from "@/api/youpinbaobiao";
export default {
    name: "Realtime",
    components: {
        LineChart
    },
    data() {
        return {
            company: "", //公司
            region: "", //地区
            station: "", //加油站
            stationOptions:[],
            tabShow: [false, false, false],
            oilTop:[],
            goodsTop:[],
            stationTop:[],
            payMoment:'',
            payMonth:'',
            stationOptions:[],
            lineChartData: {
                expectedData: [], //非油品
                actualData: [], //油品
                x: []
            },
            diqu: [],
            sheng: [],
            shengId: "",
            activeName: "first",
            youpinshuliangData: {
                expectedData: [], //非油品
                actualData: [] //油品
            },
            chongzhijineData: {
                expectedData: [], //非油品
                actualData: [] //油品
            },
            huiyuanshuliangData: {
                expectedData: [], //非油品
                actualData: [] //油品
            },
           
        };
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            var data = {};
            StationList(data).then(response => {
                console.log('油站');
                console.log(response.data);
                this.stationOptions = response.data;
            });
            this.sanduanChange()
        },
        sanduanChange(){
            var data = {
                stationId:this.station,
            }
            sanduangailan(data).then(res=>{
                this.oilTop=res.data.oilTop;
                this.goodsTop=res.data.goodsTop;
                this.stationTop=res.data.stationTop;
                this.payMoment=res.data.payMoment[0]
                this.payMonth=res.data.payMonth[0]
            })

            var data1 = {
                stationId:this.station,
                startTime:new Date(new Date().getTime() - 24*60*60*1000),
                endTime:new Date()
                // startTime : new Date(new Date(new Date().toLocaleDateString()).getTime()), // 当天0点
                // endTime : new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)// 当天23:59
            }

            sanduangailan(data1).then(res=>{
                this.lineChartData = {
                    expectedData: [], //非油品
                    actualData: [], //油品
                    x:[],
                };
                for (let i = 0; i < res.data.list1.length; i++) {
                    this.lineChartData.actualData.push(res.data.list1[i].income)
                    this.lineChartData.x.push(this.dateTime(res.data.list1[i].createTime,'',true))
                }
                console.log(this.lineChartData)
                for (let i = 0; i < res.data.list2.length; i++) {
                    this.lineChartData.expectedData.push(res.data.list2[i].income)
                }
                this.youpinshuliangData = {
                    expectedData: [], 
                    actualData: [],
                    x: []
                };
                for (let i = 0; i < res.data.list1.length; i++) {
                    this.youpinshuliangData.actualData.push(res.data.list1[i].salesCount)
                    this.youpinshuliangData.x.push(this.dateTime(res.data.list1[i].createTime,'',true))
                }
                for (let i = 0; i < res.data.list2.length; i++) {
                    this.youpinshuliangData.expectedData.push(res.data.list2[i].salesCount)
                }
                this.chongzhijineData = {
                    expectedData: [], //非油品
                    x:[]
                };
                for (let i = 0; i < res.data.list.length; i++) {
                    this.chongzhijineData.expectedData.push(res.data.list[i].recharge)
                    this.chongzhijineData.x.push(this.dateTime(res.data.list[i].createTime,'',true))
                }
                this.huiyuanshuliangData = {
                    expectedData: [], //非油品
                    x:[]
                };
                for (let i = 0; i < res.data.list.length; i++) {
                    this.huiyuanshuliangData.expectedData.push(res.data.list[i].members)
                    this.huiyuanshuliangData.x.push(this.dateTime(res.data.list[i].createTime,'',true))
                }
            })
        },
        handleClick(tab, event) {
            this.tabShow[tab.index] = true;
        },
        dateTime(value,division,time) {
          if(value){
              division = division || '-';
              var datetime = new Date(value);
              function g(val){
                  val < 10 && (val = '0' + val)
                  return val;
              }
              return !time ? datetime.getFullYear() + division + g((datetime.getMonth()+1)) + division + g(datetime.getDate()) :
              g(datetime.getHours()) + ':' + g(datetime.getMinutes())
               // + ':' + g(datetime.getSeconds())
          }
        },
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    // padding: 20px 40px;
    background-color: #f6f7fb;
}
.warp > div {
    box-shadow: 0px 2px 2px #ccc;
}
.top {
    min-width: 870px;
    height: 80px;
    margin: 0 auto;
    background-color: #fff;
    padding-left: 40px;
    line-height: 80px;
    font-size: 14px;
    margin-bottom: 20px;
    box-sizing: border-box;
}
.top {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
}
.top input {
    width: 15%;
    height: 35px;
    border: 1px solid #ededed;
    border-radius: 5px;
    margin-left: 1%;
    margin-right: 5%;
}
.top select {
    width: 15%;
    height: 35px;
    border-radius: 5px;
    margin-left: 1%;
    margin-right: 5%;
}
.capital {
    min-width: 870px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
.capital .el-row {
    width: 101%;
    height: 120px;
}
.capital .el-row .grid-content {
    display: flex;
    justify-content: space-between;
    padding: 30px 15%;
}

.capital .el-row .bg-purple-light {
    padding: 30px 12%;
}
.capital .grid-content {
    text-align: center;
    background-color: #fff;
    padding: 35px 20px;
}
.capital .left {
    width: 328px;
    height: 120px;
    background-color: #fff;
    padding: 35px 20px;
}
.capital .right {
    width: 533px;
    height: 120px;
    background-color: #fff;
    padding: 35px 60px;
}
h3 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 27px;
    color: #333338;
}

.xiaoshou,
.chongzhi,
.chendian,
.zongshu,
.leiji {
    display: inline-block;
    vertical-align: top;
}
.capital span:nth-of-type(1) {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #307aff;
}
.chongzhi span:nth-of-type(1) {
    background-color: #f88abf;
}
.chendian span:nth-of-type(1) {
    background-color: #cb91de;
}
.zongshu span:nth-of-type(1) {
    background-color: #f8c51c;
}
.leiji span:nth-of-type(1) {
    background-color: #fe8533;
}
.capital span {
    vertical-align: sub;
    font-size: 12px;
    color: #acb0c6;
}
.shu {
    display: inline-block;
    width: 2px;
    // height: 55px;
    background-color: #ededed;
    margin: 0 10px;
}
.right .shu {
    margin: 0px 18px;
}
.income {
    width: 100%;
    // height: 130px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 36px 5%;
}

.zfb {
    display: inline-block;
    vertical-align: middle;
}
.income .shu {
    vertical-align: middle;
    margin: 0 0.5%;
}
.income img {
    vertical-align: middle;
    width: 55px;
}
.zfb h3 {
    font-size: 30px;
    color: #535c73;
    text-align: left;
}
.zfb span {
    text-align: left;
    font-size: 12px;
    color: #acb0c6;
}
.zfb span:nth-of-type(1) {
    margin-right: 1px;
    margin-left: 3px;
}
.topbang {
    display: flex;
    justify-content: space-between;
    min-width: 870px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
}
.title {
    display: flex;
    align-items: center;
    background-color: #eaf1ff;
    height: 60px;
    padding-left: 20px;
}
.title span {
    display: inline-block;
    width: 4px;
    height: 25px;
    background-color: #2d7aff;
    vertical-align: middle;
    margin-right: 10px;
}
.title h3 {
    font-size: 23px;
    color: #535c73;
    display: inline-block;
    line-height: 60px;
    vertical-align: middle;
    margin: 0;
}
.shangpin,
.youpin,
.shanghu {
    width: 490px;
    border: 1px solid #ededed;
}
.topbang ul {
    padding: 15px 40px 0 20px;
}
.topbang ul li {
    list-style: none;
    margin-bottom: 22px;
}
.topbang ul li span {
    color: #535c73;
    font-size: 15px;
    vertical-align: middle;
}
.topbang ul li span:nth-of-type(1) {
    display: inline-block;
    width: 20px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    color: #acb0c6;
    font-size: 18px;
    margin-right: 20px;
}
.topbang ul li:nth-of-type(1) span {
    color: #2f7aff;
    font-weight: 800;
}
.topbang ul li:nth-of-type(1) span:nth-of-type(1) {
    background-image: url(../../images/yi.gif);
}
.topbang ul li:nth-of-type(2) span:nth-of-type(1) {
    background-image: url(../../images/er.gif);
}
.topbang ul li:nth-of-type(3) span:nth-of-type(1) {
    background-image: url(../../images/san.gif);
}
.topbang ul li span:nth-of-type(3) {
    float: right;
    margin-top: 5px;
}


.header {
    background-color: #fff;
    height: 60px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f6f7fb;
    position: relative;
}
.header h3 {
    display: inline-block;
    width: 300px;
    line-height: 60px;
    margin: 0;
    font-size: 18px;
}
.header h3 span {
    display: inline-block;
    width: 4px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 10px;
}
</style>
