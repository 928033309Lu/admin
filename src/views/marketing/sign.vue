<template>
	<div class="warp">
        <div class="main sign">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane>
                    <el-button slot="label" circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>
                </el-tab-pane>
                <el-tab-pane label="签到设置" name="first">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="box">
                                    <div class="left">
                                        <span>签到有礼</span>
                                    </div>
                                    <div class="right">
                                        <el-switch
                                          v-model="isOpen"
                                          active-color="#13ce66">
                                        </el-switch>   
                                    </div>  
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>会员等级</span>
                                    </div>
                                    <div class="right" style="width: 360px;">
                                        <el-select v-model="membershipLevel" placeholder="请选择">
                                            <el-option
                                                v-for="item in membershipLevelOptions"
                                                :key="item.id"
                                                :label="item.levelName"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>    
                                    </div>  
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>活动时间</span>
                                    </div>
                                    <div class="right">
                                        <el-date-picker
                                        v-model="startTime"
                                        style="width: 205px;"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                        </el-date-picker>
                                        <span>-</span>
                                        <el-date-picker
                                        v-model="endTime"
                                        style="width: 205px;"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>每日签到礼品</span>
                                    </div>
                                    <div class="right">
                                        <div class="switch">
                                            <el-switch
                                              v-model="dayGiftSwitch"
                                              active-color="#13ce66">
                                            </el-switch> 
                                        </div> 
                                        <el-checkbox v-model="couponChecked" v-show="dayGiftSwitch">优惠券</el-checkbox>
                                        <el-select v-model="coupon" v-show="dayGiftSwitch" placeholder="请选择" style="margin-right: 20px;">
                                            <el-option
                                            v-for="item in couponOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <div class="in" v-show="dayGiftSwitch">
                                            <el-checkbox v-model="integralChecked">积分</el-checkbox>
                                             <el-input v-model="integral" placeholder="请输入内容" style="width: 200px;margin-left: 13px;"></el-input>
                                            <!-- <el-select v-model="integral" placeholder="请选择" style="margin-left: 13px;">
                                                <el-option
                                                v-for="item in integralOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>  -->
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <p>活动规则</p>
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入内容"
                                    v-model="rules"
                                    style="width: 380px;height: 115px;">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="table">
                        <div class="box">
                            <div class="left">
                                <span>连续签到礼品</span>
                            </div>
                            <div class="right">
                                <div class="switch">
                                    <el-switch
                                        v-model="giftSwitch"
                                        active-color="#13ce66">
                                    </el-switch> 
                                </div>  
                            </div>  
                        </div>
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            label="天数"
                            width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.continuousDays" placeholder="请输入内容" style="width: 80px;">></el-input>天
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="礼品">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.isGiveCoupon">优惠券</el-checkbox>
                                <el-select v-model="scope.row.electronicCouponId" placeholder="请选择" style="margin-right: 20px;">
                                    <el-option
                                    v-for="item in couponOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-checkbox v-model="scope.row.isGiveIntegral">积分</el-checkbox>
                                <el-input v-model="scope.row.integral" placeholder="请输入内容" style="width: 200px;margin-left: 13px;"></el-input>
                                <!-- <el-select v-model="scope.row.integral" placeholder="请选择" style="margin-left: 13px;">
                                    <el-option
                                    v-for="item in integralOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>  -->
                                <!-- <el-select v-model="scope.row.gift.coupon" placeholder="请选择" style="margin-right: 20px;">
                                    <el-option
                                    v-for="item in couponOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <span>积分</span>
                                <el-select v-model="scope.row.gift.integral" placeholder="请选择">
                                    <el-option
                                    v-for="item in integralOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>  -->
                            </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="100">
                                <template slot-scope="scope">
                                    <!-- <el-button @click="del(scope.$index, scope.row)" type="primary" size="small">修改</el-button> -->
                                    <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="right"
                                width="80"
                                :render-header="renderHeader">
                                <template slot="header" slot-scope="scope">
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="btn">
                        <el-button type="primary" @click="baocun">保存</el-button>
                        <el-button type="primary" @click="get">还原</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="签到记录" name="second">
                    <div class="top">
                        <div class="search">
                            <el-input
                                placeholder="请输入会员号"
                                suffix-icon="el-icon-search"
                                v-model="search">
                            </el-input>
                        </div>
                        <div class="date" style="margin-left:70px">
                            <span>选择时间</span>
                            <el-date-picker
                                style="width: 140px;"
                                v-model="recordStartDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                v-model="recordEndDate"
                                style="width: 140px;"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <!-- <el-date-picker
                                v-model="recordDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker> -->
                        </div>
                        <div class="type" style="margin-left:70px">
                            <el-select v-model="type" placeholder="请选择" style="width: 120px;">
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </div>
                        <div class="btn" style="margin-left:70px">
                            <el-button>查询</el-button>
                        </div>
                    </div>
                    <div class="table">
                        <el-table
                            :data="recordData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            label="会员卡号">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.cardNumber }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="会员名">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.cardName }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="签到时间">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.signTime }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="连续签到天数">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.consecutiveDays }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="礼品">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.gift }}</span>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="签到统计" name="third">
                    <div class="top">
                        <div class="date">
                            <span>选择时间</span>
                            <el-date-picker
                                style="width: 140px;"
                                v-model="statisticsStartDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span>至</span>
                            <el-date-picker
                                v-model="statisticsEndDate"
                                style="width: 140px;"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="btn">
                            <el-button @click="chaxun">查询</el-button>
                        </div>
                    </div>
                    <div class="table">
                        <el-table
                            :data="statisticsData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            label="签到时间" align="center" width="190px">
                            <template slot-scope="scope">
                                <!--scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}'-->
                                <span style="margin-left: 10px">{{ scope.row.time }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="签到人数" >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.signMemberCount }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="送出积分">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.pointSum }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="送出优惠券数量">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.couponReceiveSum }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="优惠券使用数量">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.couponReceiveSum }}</span>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="btn">
                        <el-button type="primary">确定</el-button>
                        <el-button>取消</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
	</div>
</template>

<script>
import { getshezhi } from '@/api/marketing'
import { baocun } from '@/api/marketing'
import { quanlist } from '@/api/marketing'
import { queryAllMemberLevel } from '@/api/marketing'
import { selectSignStatistics } from '@/api/marketing'

export default {
    name: "marketingsignDemo",
    data() {
      return {
        activeName: 'first',
        //会员等级选择数据
        membershipLevelOptions:[{
          value: '1',
          label: '金'
        }, {
          value: '2',
          label: '银'
        }, {
          value: '3',
          label: '铜'
        }],
        membershipLevel:'1',//会员等级
        startTime:'',//开始时间
        endTime:'',//结束时间
        couponChecked: false,//优惠券是否勾选
        //优惠券选择数据
        couponOptions:[{
        }],
        coupon:'',//优惠券
        integralChecked:false,//积分是否被选中
        //积分选择数据
        integralOptions:[{
          value: "10",
          label: '10'
        }],
        integral:"10",//积分
        rules:'',//促销规则
        //连续签到礼品临时数据
        tableData:[{
          continuousDays: '7',
          isGiveCoupon: false,
          electronicCouponId:'',
          isGiveIntegral:false,
          integral:'10',
        }],
        search:'',//搜索
        recordDate:'',//签到记录开始日期-结束日期
        recordStartDate:'',//签到记录开始日期
        recordEndDate:'' ,//签到记录结束日期
        type:'0',//礼品类型
        //礼品类型选择数据
        typeOptions:[{
          value: '0',
          label: '不限'
        },{
          value: '1',
          label: '优惠券'
        },{
          value: '2',
          label: '积分'
        },],
        statisticsDate:'',//签到统计开始日期-结束日期
        statisticsStartDate:new Date(),//签到记录开始日期
        statisticsEndDate:new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),//签到记录结束日期
        //签到记录临时表格数据
        recordData: [],
        dayGiftSwitch:true,//每日签到礼品开关
        giftSwitch:true,//连续签到礼品开关
        isOpen:true,//签到有礼开关
        statisticsData:[],//签到统计
      };
    },
    mounted(){
        this.get()
    },
    methods: {
        get(){
            var a={}
            quanlist(a)
                .then(response => {
                    // console.log('优惠券列表')
                    // console.log(response.data)
                    this.couponOptions =  response.data.list
                })
            queryAllMemberLevel(a)
                .then(response => {
                    console.log('会员列表')
                    console.log(response.data)
                    this.membershipLevelOptions =  response.data.list
                })
            var data = {
                "activityType":3,
                "memberLevelId":'1',
            }
            getshezhi(data)
                .then(response => {
                    console.log(response.data)
                    this.tableData = JSON.parse(JSON.stringify(response.data.TbSignGiftActiveList))
                    if(response.data.TbSignGiftActiveList.length==0){
                        this.giftSwitch=false
                    }else{
                        this.giftSwitch=true
                    }
                    this.rules = response.data.tbActivityType3Info.description
                    this.endTime = response.data.tbActivityType3Info.timeEnd
                    this.startTime = response.data.tbActivityType3Info.timeStart
                    
                    if(response.data.tbActivityType3Info.isOpen==1){
                        this.couponSwitch = true
                    }else{
                        this.couponSwitch = false
                    }
                    if(response.data.tbGiftList3.length==0){
                        this.dayGiftSwitch = false
                    }
                    else if(response.data.tbGiftList3.length==1){
                        this.dayGiftSwitch = true
                        if(response.data.tbGiftList3[0].giftType==2){
                            this.couponChecked=true 
                            this.coupon=response.data.tbGiftList3[0].giftTypeId
                        }
                        if(response.data.tbGiftList3[0].giftType==1){
                            this.integralChecked=true
                            this.integral=response.data.tbGiftList3[0].giftNumber
                        }
                    }
                    else {
                        this.dayGiftSwitch = true
                        if(response.data.tbGiftList3[0].giftType==2){
                            this.couponChecked=true 
                            this.coupon=response.data.tbGiftList3[0].giftTypeId
                        }
                        if(response.data.tbGiftList3[0].giftType==1){
                            this.integralChecked=true
                            this.integral=response.data.tbGiftList3[0].giftNumber
                        }
                        if(response.data.tbGiftList3[1].giftType==2){
                            this.couponChecked=true
                            this.coupon=response.data.tbGiftList3[1].giftTypeId
                        }
                        if(response.data.tbGiftList3[1].giftType==1){
                            this.integralChecked=true
                            this.integral=response.data.tbGiftList3[1].giftNumber
                        }
                    }
                    for(var j = 0;j<response.data.TbSignGiftActiveList.length;j++){
                        if(response.data.TbSignGiftActiveList[j].isGiveCoupon==1){
                            this.tableData[j].isGiveCoupon=true
                        }else{
                            this.tableData[j].isGiveCoupon=false
                        }
                        if(response.data.TbSignGiftActiveList[j].isGiveIntegral==1){
                            this.tableData[j].isGiveIntegral=true
                        }else{
                            this.tableData[j].isGiveIntegral=false
                        }
                    }
                })
            var b = {
                type:4,
                startTime:this.statisticsStartDate,
                endTime:this.statisticsEndDate
            }
            // console.log(b)
            selectSignStatistics(b)
                .then(response => {
                    console.log('签到统计')
                    console.log(response.data)
                    this.statisticsData.push(response.data) 
                })
            // this.$http
            // .post('http://192.168.0.129:8080/marketing-electronic/selectNewActivity',
            // {
            //     "activityType":3,
            //     "memberLevelId":'1',
            // },
            // {
            //     headers:{
            //         'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            //     }
            // })
            // .then(function(res){
            //     console.log('提交成功')
            //     console.log(res.body)
            //     this.tableData = JSON.parse(JSON.stringify(res.body.TbSignGiftActiveList))
            //     if(res.body.TbSignGiftActiveList.length==0){
            //         this.giftSwitch=false
            //     }else{
            //         this.giftSwitch=true
            //     }
            //     this.rules = res.body.tbActivityType3Info.description
            //     this.endTime = res.body.tbActivityType3Info.timeEnd
            //     this.startTime = res.body.tbActivityType3Info.timeStart
                
            //     if(res.body.tbActivityType3Info.isOpen==1){
            //         this.couponSwitch = true
            //     }else{
            //         this.couponSwitch = false
            //     }
            //     if(res.body.tbGiftList3.length==0){
            //         this.dayGiftSwitch = false
            //     }
            //     else if(res.body.tbGiftList3.length==1){
            //         this.dayGiftSwitch = true
            //         if(res.body.tbGiftList3[0].giftType==2){
            //             this.couponChecked=true 
            //             this.coupon=res.body.tbGiftList3[0].giftTypeId
            //         }
            //         if(res.body.tbGiftList3[0].giftType==1){
            //             this.integralChecked=true
            //             this.integral=res.body.tbGiftList3[0].giftNumber
            //         }
            //     }
            //     else {
            //         this.dayGiftSwitch = true
            //         if(res.body.tbGiftList3[0].giftType==2){
            //             this.couponChecked=true 
            //             this.coupon=res.body.tbGiftList3[0].giftTypeId
            //         }
            //         if(res.body.tbGiftList3[0].giftType==1){
            //             this.integralChecked=true
            //             this.integral=res.body.tbGiftList3[0].giftNumber
            //         }
            //         if(res.body.tbGiftList3[1].giftType==2){
            //             this.couponChecked=true
            //             this.coupon=res.body.tbGiftList3[1].giftTypeId
            //         }
            //         if(res.body.tbGiftList3[1].giftType==1){
            //             this.integralChecked=true
            //             this.integral=res.body.tbGiftList3[1].giftNumber
            //         }
            //     }
            //     for(var j = 0;res.body.TbSignGiftActiveList.length;j++){
            //         if(res.body.TbSignGiftActiveList[j].isGiveCoupon==1){
            //             this.tableData[j].isGiveCoupon=true
            //         }else{
            //             this.tableData[j].isGiveCoupon=false
            //         }
            //         if(res.body.TbSignGiftActiveList[j].isGiveIntegral==1){
            //             this.tableData[j].isGiveIntegral=true
            //         }else{
            //             this.tableData[j].isGiveIntegral=false
            //         }
            //     }
                
            // })
            // .catch(function(err){
            //     console.log('提交失败')
            //     console.log(err)
            //     // this.tableData=[{
            //     //     continuousDays: '7',
            //     //     isGiveCoupon: false,
            //     //     electronicCouponId:'满100减10元',
            //     //     isGiveIntegral:false,
            //     //     integral:'10',
            //     // }]
            //     // this.$message.error('获取失败');
            // })
    },
    chaxun(){
         var b = {
            type:4,
            startTime:this.statisticsStartDate,
            endTime:this.statisticsEndDate
        }
        selectSignStatistics(b)
            .then(response => {
                console.log('签到统计')
                console.log(response.data)
                this.statisticsData = []
                this.statisticsData.push(response.data) 
            })
    },
    add(){
      var obj = {
          continuousDays: '7',
          isGiveCoupon: false,
          electronicCouponId:'',
          isGiveIntegral:false,
          integral:10,
        }
      this.tableData.push(obj)
    },  
    del(index,row){
      this.tableData.splice(index, 1); 
    },
    baocun(){
          if(this.isOpen){
            var isOpen = 1
          }else{
            var isOpen = 0
          }

          if(this.dayGiftSwitch){
            var tbGiftArr = []
            if(this.couponChecked){
                tbGiftArr.push({
                    giftType:2,
                    giftTypeId:this.coupon
                })
            }
            if(this.integralChecked){
                tbGiftArr.push({
                    giftType:1,
                    giftNumber:this.integral
                })
            }
          }else{
            var tbGiftArr = []
          }

          var tableData = []
          var that = this
        
        if(this.giftSwitch){
            for(var i=0; i<this.tableData.length;i++ ){
                if(that.tableData[i].isGiveCoupon){
                    var igc = 1
                }else{
                    var igc = 0
                }
                if(that.tableData[i].isGiveIntegral){
                    var igi = 1
                }else{
                    var igi = 0
                }
                tableData.push({
                    continuousDays:that.tableData[i].continuousDays,
                    electronicCouponId:that.tableData[i].electronicCouponId,
                    integral:that.tableData[i].integral,
                    isGiveCoupon:igc,
                    isGiveIntegral:igi,
                })
            }
        }else{
            tableData=[]
        }
        // var s = {
        //         "activityType":3,
        //         "memberLevelId":this.membershipLevel,
        //         "description": this.rules,
        //         "isOpen": isOpen,
        //         "tbGiftArr": tbGiftArr,
        //         "tbSignGiftActive": tableData,
        //         "timeEnd": new Date(this.endTime),
        //         "timeStart":new Date(this.startTime),
        //     }
        // console.log(tableData)
        // console.log(s)
        var data ={
            "activityType":3,
            "memberLevelId":this.membershipLevel,
            "description": this.rules,
            "isOpen": isOpen,
            "tbGiftArr": tbGiftArr,
            "tbSignGiftActive": tableData,
            "timeEnd": new Date(this.endTime),
            "timeStart":new Date(this.startTime),
        }
        console.log(data)
        baocun(data)
            .then(response => {
                console.log(response.data)
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            })
        // this.$http
        //     .post('http://192.168.0.129:8080/marketing-electronic/setActivity',
        //     {
        //         "activityType":3,
        //         "memberLevelId":this.membershipLevel,
        //         "description": this.rules,
        //         "isOpen": isOpen,
        //         "tbGiftArr": tbGiftArr,
        //         "tbSignGiftActive": tableData,
        //         "timeEnd": new Date(this.endTime),
        //         "timeStart":new Date(this.startTime),
        //     },
        //     {
        //         headers:{
        //             'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
        //         }
        //     })
        //     .then(function(res){
        //         console.log('提交成功')
        //         console.log(res.body)
        //         this.$message({
        //             message: '添加成功',
        //             type: 'success'
        //         });
        //     })
        //     .catch(function(err){
        //         console.log('提交失败')
        //         console.log(err)
        //         this.$message.error('添加失败');
        //     })
      },
        // 自定义表达头+
     renderHeader(h, { column, $index }){
        var that=this
        return h('span', [
            h('span', column.label),
            h('el-button',
                {
                    style: 'margin-left: 5px;',
                    on: {
                        click: that.add
                    }
            },['+']),
        ]);
      },
      //返回上一页
      prev(){
        this.$router.go(-1)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
    background-color: #F6F7FB;
    // padding: 20px;
}
.main{
    min-height: calc(100vh - 120px);
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
 .left, .right{
    display: inline-block;
}
.box .left{
    width: 115px;
    vertical-align: top;
    padding-top: 11px;
    line-height: 36px;
}
.box .right{
    line-height: 36px;
}
.box{
    margin-bottom: 15px;
}
.in{
    display: inline-block;
}
.btn{
    margin-top: 50px;
    margin-bottom: 20px;
    text-align: center;
}
.top{
    display: flex;
    margin-bottom: 20px;
}
.top .btn{
    margin-top: 0;
}
.sign .el-switch {
    padding-top: 17px;
}
.top .date{
    margin-left: 20px;
}

</style>
<style scoped>
.sign .el-tabs__nav-wrap{
    padding: 0 3%;
}
.sign .el-tabs__content{
    padding: 2%;
}
.sign .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.sign .el-input--medium .el-input__inner{
    margin: 10px 0;
}
.sign .top .el-input--medium .el-input__inner{
    margin:  0;
}
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
.sign .btn button:nth-of-type(2){
    margin-left: 200px;
}
.sign .el-table {
    border: 1px solid #dcdfe6;
    border-bottom: 0;
}
.sign .el-button--medium.is-circle{
  border: 0;
}
.sign .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-right: 0;
}

</style>