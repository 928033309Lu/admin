<template>
	<div class="warp">
        <div class="main new">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane>
                    <el-button slot="label" circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>
                </el-tab-pane>
                <el-tab-pane label="新人有礼" name="first">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="box">
                                    <div class="left">
                                        <span>新人有礼</span>
                                    </div>
                                    <div class="right">
                                        <el-switch
                                          v-model="newSwitch"
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
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <div class="in" v-show="giftSwitch">
                                            <el-checkbox v-model="integralChecked">积分</el-checkbox>
                                            <el-select v-model="integral" placeholder="请选择" style="margin-left: 13px;">
                                                <el-option
                                                v-for="item in integralOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select> 
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
                    <div class="btn">
                        <el-button type="primary" @click="add">保存</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="领取记录" name="second">
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
                            <!-- <el-date-picker
                                v-model="date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker> -->
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
                            align="center"
                            label="会员卡号">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.cardNumber }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="会员名">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.cardName }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="注册时间">
                            <template slot-scope="scope">
                                 <span style="margin-left: 10px">{{ scope.row.registrationTime }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
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
                            <el-table-column
                            label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="tongjiSee(scope.$index, scope.row)">查看</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 电子优惠券查看框 -->
                    <el-dialog title="电子优惠券查看" :visible.sync="tongjiVisible">
                        <div class="header">
                            <div class="tongjiSee">
                                <div>
                                    <p>时间：{{}}</p>
                                </div>
                                <div class="biao">
                                    <div class="table">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="tongjiVisible = false">关闭</el-button>
                        </div>
                    </el-dialog>
                    <!-- <div class="btn">
                        <el-button type="primary">确定</el-button>
                        <el-button>取消</el-button>
                    </div> -->
                </el-tab-pane>
            </el-tabs>
        </div>
	</div>
</template>

<script>
import { getxinren } from '@/api/marketing'
import { xinrenbaocun } from '@/api/marketing'
import { selectSignStatistics } from '@/api/marketing'

export default {
    name: "marketingnewMannersDemo",
    data() {
      return {
        activeName: 'first',
        newSwitch:true,//新人有礼开关
        startTime:'',//开始时间
        endTime:'',//结束时间
        giftSwitch:true,//赠送礼品开关
        couponChecked: false,//优惠券是否勾选
        //优惠券选择数据
        couponOptions:[{
          value: '满100减10元',
          label: '满100减10元'
        }],
        coupon:'满100减10元',//优惠券
        integralChecked:false,//积分是否被选中
        //积分选择数据
        integralOptions:[{
          value: '10',
          label: '10'
        }],
        integral:'10',//积分
        rules:'',//活动说明
        search:'',//搜索
        date:'',//开始日期-结束日期
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
        //领取记录临时数据
        recordData: [{
          cardNumber:'HA88999',//会员卡号
          cardName:'哈侯',//会员名
          registrationTime:'2018-07-09 14:22',//注册时间
          gift:'5积分',//礼品
        },{
          cardNumber:'HA88999',//会员卡号
          cardName:'哈侯',//会员名
          registrationTime:'2018-07-09 14:22',//注册时间
          gift:'10元券',//礼品
        }],
        recordStartDate:'',
        recordEndDate:'',
        statisticsStartDate:new Date(),//签到记录开始日期
        statisticsEndDate:new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),//签到记录结束日期
        //签到记录临时表格数据
        statisticsData: [],
        tongjiVisible:false
      };
    },
    created(){
        this.get()
    },
    methods: {
      //返回上一页
      prev(){
        this.$router.go(-1)
      },
      get(){
          var data ={
            "activityType":1
          }
          getxinren(data)
            .then(response => {
                console.log(response.data)
                this.rules =response.data.newTbActivity.description
                this.endTime =response.data.newTbActivity.timeEnd
                this.startTime =response.data.newTbActivity.timeStart
                if(response.data.tbGiftList.length==0){
                    this.giftSwitch = false
                }else{
                    this.giftSwitch = true
                    if(response.data.tbGiftList[0].giftType==2){
                        this.couponChecked=true
                        this.coupon=response.data.tbGiftList[0].giftTypeId
                    }else if(response.data.tbGiftList[0].giftType==1){
                        this.integralChecked=true
                        this.integral=response.data.tbGiftList[0].giftNumber
                    }
                    if(response.data.tbGiftList[1].giftType==2){
                        this.couponChecked=true
                        this.coupon=response.data.tbGiftList[1].giftTypeId
                    }else if(response.data.tbGiftList[1].giftType==1){
                        this.integralChecked=true
                        this.integral=response.data.tbGiftList[1].giftNumber
                    }
                }
                if(response.data.newTbActivity.isOpen==1){
                    this.newSwitch = true
                }else{
                    this.newSwitch = false
                }
            })
        var b = {
            type:2,
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
      },
      chaxun(){
         var b = {
            type:2,
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
        console.log(tbGiftArr)
        var data={
            "activityType":1,
            "description": this.rules,
            "isOpen": isOneGift,
            "tbGiftArr": tbGiftArr,
            "timeEnd": new Date(this.endTime),
            "timeStart": new Date(this.startTime)
        }
        xinrenbaocun(data)
            .then(response => {
                console.log(response.data)
            })
      },
      tongjiSee(index,row){
        this.tongjiVisible = true;
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
    margin: 0;
    display: flex;
    justify-content: space-around;
    width: 18%;
}
</style>
<style scoped>
.new .el-tabs__nav-wrap{
    padding: 0 3%;
}
.new .el-tabs__content{
    padding: 15px 2%;
}
.new .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.new .el-input--medium .el-input__inner,
.new .el-switch{
    margin: 10px 0;
}
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
.new .btn button:nth-of-type(2){
    margin-left: 200px;
}
.new .el-switch{
    padding-top: 17px;
}
.new .el-table {
    border: 1px solid #dcdfe6;
    border-bottom: 0;
}
.new .top .btn button:nth-of-type(2){
    margin-left: 20px;
}
.new .top .el-input--medium .el-input__inner{
    margin:  0;
}
.new .el-button--medium.is-circle{
  border: 0;
}
.new .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-right: 0;
}
</style>