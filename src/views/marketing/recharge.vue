<template>
	<div class="warp">
        <div class="main recharge">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane>
                    <el-button slot="label" circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>
                </el-tab-pane>
                <el-tab-pane label="充值送券" name="first">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="box">
                                    <div class="left">
                                        <span>充值送券</span>
                                    </div>
                                    <div class="right">
                                        <el-switch
                                          v-model="couponSwitch"
                                          active-color="#13ce66">
                                        </el-switch>   
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
                                        <span>赠送礼品</span>
                                    </div>
                                    <div class="right">
                                        <div class="switch">
                                            <el-switch
                                              v-model="giftSwitch"
                                              active-color="#13ce66">
                                            </el-switch> 
                                        </div>
                                        <el-checkbox v-show="giftSwitch" v-model="couponChecked">优惠券</el-checkbox>
                                        <el-select v-show="giftSwitch" v-model="coupon" placeholder="请选择" style="margin-right: 20px;">
                                            <el-option
                                            v-for="item in couponOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <div class="in" v-show="giftSwitch">
                                            <el-checkbox v-model="integralChecked">积分</el-checkbox>
                                            <el-input v-model="integral" placeholder="请输入内容" style="width: 200px;margin-left: 13px;"></el-input>
                                            <!-- <el-select v-model="integral" placeholder="请选择" style="margin-left: 13px;">
                                                <el-option
                                                v-for="item in integralOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option> -->
                                            <!-- </el-select>  -->
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="box">
                                    <div class="left">
                                        <span>活动说明</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            type="textarea"
                                            :rows="5"
                                            placeholder="请输入内容"
                                            v-model="rules"
                                            style="width: 380px;height: 115px;">
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="table">
                        <p>充值送券明细</p>
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                            label="充值金额"
                            align="left"
                            min-width="80">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.amount" placeholder="请输入内容" style="width: 200px;">></el-input>
                                <!-- <span style="margin-left: 10px">{{ scope.row.rechargeAmount }}</span> -->
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="礼品" align="left">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.activityCouponId" placeholder="请选择" style="margin-right: 20px;">
                                    <el-option
                                    v-for="item in couponOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="150">
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
                    </div>
                </el-tab-pane>
                <el-tab-pane label="充值记录" name="second">
                    <div class="top">
                        <div class="search">
                            <el-input
                                placeholder="请输入会员号"
                                suffix-icon="el-icon-search"
                                v-model="search">
                            </el-input>
                        </div>
                        <div class="date">
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
                        </div>
                        <div class="type">
                            <el-select v-model="type" placeholder="请选择" style="width: 120px;">
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </div>
                        <div class="btn">
                            <el-button>查询</el-button>
                            <el-button>清空</el-button>
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
                            label="充值金额">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.rechargeAmount }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="充值时间">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.rechargeTime }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="礼品">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.gift }}</span>
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
                <el-tab-pane label="充值统计" name="third">
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
                                <span >{{ scope.row.time }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="充值次数" align="center">
                            <template slot-scope="scope">
                                <span >{{ scope.row.rechargeNum }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="充值金额" align="center">
                            <template slot-scope="scope">
                                <span >{{ scope.row.rechargeAmount }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="送出优惠券数量" align="center">
                            <template slot-scope="scope">
                                <span >{{ scope.row.couponReceiveSum }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="优惠券使用数量" align="center">
                            <template slot-scope="scope">
                                <span >{{ scope.row.couponReceiveSum }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="tongjiSee(scope.$index, scope.row)">查看</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- <div class="btn">
                        <el-button type="primary">确定</el-button>
                        <el-button>取消</el-button>
                    </div> -->
                </el-tab-pane>
            </el-tabs>
            <!-- 充值统计查看框 -->
            <el-dialog title="充值统计查看" width="50%" :visible.sync="tongjiVisible">
                <div class="header">
                    <div class="tongjiSee">
                        <div>
                            <p>时间：{{}}</p>
                        </div>
                        <div class="biao">
                            <div class="table">
                                <el-table
                                    :data="tongjiSeeData"
                                    :span-method="arraySpanMethod"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        prop="name"
                                        align="center"
                                        label="公司">
                                    </el-table-column>
                                    <el-table-column
                                        prop="name1"
                                        align="center"
                                        label="加油站">
                                    </el-table-column>
                                    <el-table-column
                                        prop="num"
                                        align="center"
                                        label="优惠券使用数量">
                                    </el-table-column>
                                    <el-table-column
                                        prop="amount2"
                                        align="center"
                                        label="优惠金额">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tongjiVisible = false">关闭</el-button>
                </div>
            </el-dialog>
        </div>
	</div>
</template>

<script>
import { getshezhi } from '@/api/marketing'
import { baocun } from '@/api/marketing'
import { quanlist } from '@/api/marketing'
import { selectSignStatistics } from '@/api/marketing'

export default {
    name: "marketingrechargeDemo",
    data() {
      return {
        activeName: 'first',
        couponSwitch:true,//充值送券开关
        startTime:'',//开始时间
        endTime:'',//结束时间
        giftSwitch:true,//赠送礼品开关
        couponChecked: false,//优惠券是否勾选
        //优惠券选择数据
        couponOptions:[{
          value: '满100减10元',
          label: '满100减10元'
        }],
        coupon:'1',//优惠券
        integralChecked:false,//积分是否被选中
        //积分选择数据
        integralOptions:[{
          value: '10',
          label: '10'
        }],
        integral:'10',//积分
        rules:'',//活动说明
        //连续签到礼品临时数据
        tableData: [{
          amount: '',//充值金额
          activityCouponId:'',//礼品
        }],
        search:'',//搜索
        recordDate:'',//充值记录开始日期-结束日期
        recordStartDate:'',//签到记录开始日期
        recordEndDate:'',//签到记录结束日期
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
        //礼品选择数据
        giftOptions:[{
          value: '10元优惠券',
          label: '10元优惠券'
        },{
          value: '20元优惠券',
          label: '20元优惠券'
        },],
        statisticsDate:'',//充值统计开始日期-结束日期
        statisticsStartDate:new Date(),//统计记录开始日期
        statisticsEndDate:new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),//签到记录结束日期
        //签到记录临时表格数据
        recordData: [],
        //充值统计表格临时数据
        statisticsData: [],
        tongjiVisible:false,//充值统计查看
        tongjiSeeData:[], //统计查看表格数据
        spanArr:[],
        spanArr1:[],
        xiaojiArr:[],
      };
    },
    created(){
        this.get()
    },
    methods: {
     get(){
         var a = {}
         quanlist(a)
            .then(response => {
                console.log(response.data.list)
                this.couponOptions = response.data.list
            })
         var data ={
            "activityType":2
        }
        getshezhi(data)
            .then(response => {
                console.log(response.data)
                this.tableData = response.data.tbGiveCouponListList
                this.rules = response.data.newTbActivity.description
                this.endTime = response.data.newTbActivity.timeEnd
                this.startTime = response.data.newTbActivity.timeStart
                if(response.data.newTbActivity.isOpen==1){
                    this.couponSwitch = true
                }else{
                    this.couponSwitch = false
                }
                if(response.data.tbGiftList.length==0){
                    this.giftSwitch = false
                }else{
                    this.giftSwitch = true
                    if(response.data.tbGiftList[0].giftType==2){
                        this.couponChecked=true 
                        this.coupon=response.data.tbGiftList[0].giftTypeId
                    }
                    if(response.data.tbGiftList[0].giftType==1){
                        this.integralChecked=true
                        this.integral=response.data.tbGiftList[0].giftNumber
                    }
                    if(response.data.tbGiftList[1].giftType==2){
                        this.couponChecked=true
                        this.coupon=response.data.tbGiftList[1].giftTypeId
                    }
                    if(response.data.tbGiftList[1].giftType==1){
                        this.integralChecked=true
                        this.integral=response.data.tbGiftList[1].giftNumber
                    }
                }
            })
        var b = {
            type:3,
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
        //     .post('http://192.168.0.129:8080/marketing-electronic/selectNewActivity',
        //     {
        //         "activityType":2
        //     },
        //     {
        //         headers:{
        //             'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
        //         }
        //     })
        //     .then(function(res){
        //         console.log('提交成功')
        //         console.log(res.body)
        //         this.tableData = res.body.tbGiveCouponListList
        //         this.rules = res.body.newTbActivity.description
        //         this.endTime = res.body.newTbActivity.timeEnd
        //         this.startTime = res.body.newTbActivity.timeStart
        //         if(res.body.newTbActivity.isOpen==1){
        //             this.couponSwitch = true
        //         }else{
        //             this.couponSwitch = false
        //         }
        //         if(res.body.tbGiftList.length==0){
        //             this.giftSwitch = false
        //         }else{
        //             this.giftSwitch = true
        //             if(res.body.tbGiftList[0].giftType==2){
        //                 this.couponChecked=true 
        //                 this.coupon=res.body.tbGiftList[0].giftTypeId
        //             }
        //             if(res.body.tbGiftList[0].giftType==1){
        //                 this.integralChecked=true
        //                 this.integral=res.body.tbGiftList[0].giftNumber
        //             }
        //             if(res.body.tbGiftList[1].giftType==2){
        //                 this.couponChecked=true
        //                 this.coupon=res.body.tbGiftList[1].giftTypeId
        //             }
        //             if(res.body.tbGiftList[1].giftType==1){
        //                 this.integralChecked=true
        //                 this.integral=res.body.tbGiftList[1].giftNumber
        //             }
        //         }
        //     })
        //     .catch(function(err){
        //         console.log('提交失败')
        //         console.log(err)
        //         // this.$message.error('获取失败');
        //     })
     },
     chaxun(){
         var b = {
            type:3,
            startTime:this.statisticsStartDate,
            endTime:this.statisticsEndDate
        }
        selectSignStatistics(b)
            .then(response => {
                console.log('充值统计')
                console.log(response.data)
                this.statisticsData = []
                this.statisticsData.push(response.data) 
            })
    },
     add(){
      var obj = {
          amount: '',//充值金额
          activityCouponId:'',//礼品
        }
      this.tableData.push(obj)
     },  
     del(index,row){
        this.tableData.splice(index, 1); 
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
      baocun(){
          if(this.couponSwitch){
            var isOpen = 1
          }else{
            var isOpen = 0
          }
          if(this.giftSwitch){
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
          if(this.newSwitch){
           var isOneGift = 1
          }else{
            var isOneGift = 0
          }
          var tableData = []
          var that = this
        for(var i=0; i<this.tableData.length;i++ ){
            tableData.push({
                amount:that.tableData[i].amount,
                activityCouponId:that.tableData[i].activityCouponId,
            })
        }
        var data ={
            "activityType":2,
            "description": this.rules,
            "isOpen": isOpen,
            "tbGiftArr": tbGiftArr,
            "tbActivityCouponLists": tableData,
            "timeEnd": new Date(this.endTime),
            "timeStart":new Date(this.startTime),
        }
        baocun(data)
            .then(response => {
                console.log(response.data)
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            })
        //   this.$http
        //     .post('http://192.168.0.129:8080/marketing-electronic/setActivity',
        //     {
        //         "activityType":2,
        //         "description": this.rules,
        //         "isOpen": isOpen,
        //         "tbGiftArr": tbGiftArr,
        //         "tbActivityCouponLists": tableData,
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
        //   统计查看
        tongjiSee(){
            this.tongjiVisible = true
            var tongjiSeeData = [
            [{
                name:'公司',
                name1:'油站1',
                num:1
            },{
                name:'公司',
                name1:'油站2',
                num:1
            },{
                name:'公司',
                name1:'油站3',
                num:1
            },{
                name:'公司',
                name1:'油站4',
                num:1
            }],
            [{
                name:'公司1',
                name1:'油站1',
                num:1
            },{
                name:'公司1',
                name1:'油站2',
                num:1
            },{
                name:'公司1',
                name1:'油站3',
                num:1
            }]]
            console.log(tongjiSeeData)
            this.tongjiSeeData= []
            var hejinum = 0
            this.spanArr = []
            for (let i = 0; i < tongjiSeeData.length; i++) {
                var xiaojinum = 0
                for (let j = 0; j < tongjiSeeData[i].length; j++) {
                    // console.log('j'+j)
                    // console.log(tongjiSeeData[i][j])
                    xiaojinum+=tongjiSeeData[i][j].num
                    hejinum+=tongjiSeeData[i][j].num
                    this.tongjiSeeData.push(tongjiSeeData[i][j])
                }
                this.tongjiSeeData.push({
                    name:tongjiSeeData[i][0].name,
                    name1:'小计',
                    num:xiaojinum
                })
            }
            this.tongjiSeeData.push({
                name:'合计',
                name1:'',
                num:hejinum
            })
            console.log(this.tongjiSeeData)
            let contactDot = 0;
            this.tongjiSeeData.forEach( (item,index) => {
                if(index===0){
                    this.spanArr.push(1)
                    // this.spanArr1.push(1)
                }else{
                    if(item.name === this.tongjiSeeData[index-1].name){
                        this.spanArr[contactDot] += 1;
                        this.spanArr.push(0)
                    }else{
                        contactDot = index
                        this.spanArr.push(1)
                    }
                }
            })
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if(columnIndex ===0){
                if(rowIndex==this.tongjiSeeData.length-1){
                    return {
                        rowspan:1,
                        colspan:2
                    }
                }
                if(this.spanArr[rowIndex]){
                    return {
                        rowspan:this.spanArr[rowIndex],
                        colspan:1
                    }
                }else{
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }else if(columnIndex ===1){
                if(rowIndex==this.tongjiSeeData.length-1){
                    return {
                        rowspan:0,
                        colspan:0
                    }
                }
            }
            
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
.box{
    margin-bottom: 15px;
}
.in{
    display: inline-block;
}
.btn{
    margin-top: 50px;
    text-align: center;
    margin-bottom: 20px;
}
.top{
    display: flex;
    justify-content:space-between;
    margin-bottom: 20px;
}
.top .btn{
    margin-top: 0;
    display: flex;
    justify-content: space-around;
    width: 18%;
}
.recharge .btn button:nth-of-type(2){
    margin-left: 200px;
}
.recharge .top .btn button:nth-of-type(2){
    margin-left: 0;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-right: 0;
}
.dialog-footer{
    text-align: center;
}
</style>
<style scoped>
.recharge .el-tabs__nav-wrap{
    padding: 0 2%;
}
.recharge .el-tabs__content{
    padding: 15px 3%;
}
.recharge .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.recharge .el-input--medium .el-input__inner,
.recharge .el-switch{
    margin: 10px 0;
}
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}

.recharge .el-switch{
    padding-top: 17px;
}
.recharge .el-table {
    border: 1px solid #dcdfe6;
    border-bottom: 0;
}
.recharge .top .el-input--medium .el-input__inner{
    margin:  0;
}
.recharge .el-button--medium.is-circle{
  border: 0;
}
.recharge .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-right: 0;
}
</style>