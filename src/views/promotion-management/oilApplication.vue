<template>
<div class="warp">
  <div class="header">
    <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>油品促销申请</h3>
  </div>
  <div class="main">
      <div class="top">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <div class="inp">
              <div class="left">
                <span>促销名称</span>
              </div>
              <div class="right">
                <el-input v-model="promotionName" placeholder="单行输入" style="width: 280px;"></el-input>
              </div>
            </div>
            <div class="inp">
              <div class="left t">
                <span>促销类型</span>
              </div>
              <div class="right">
                <el-select v-model="promotionType"  clearable @change="changeType" placeholder="请选择" style="width: 280px;">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                  <!-- <el-option value="油品满升数，单价立减">油品满升数，单价立减</el-option>
                  <el-option value="油品满升数，单价百分比优惠">油品满升数，单价百分比优惠</el-option>
                  <el-option value="油品满金额，总价立减">油品满金额，总价立减</el-option>
                  <el-option value="油品满金额，总价百分比优惠">油品满金额，总价百分比优惠</el-option> -->
                </el-select>
                <div class="text">
                  <!-- <p v-show="promotionType=='1'">买指定油品达到一定升数，单价扣减折扣金额</p>
                  <p v-show="promotionType=='2'">买指定油品达到一定升数，单价扣减百分比折扣</p>
                  <p v-show="promotionType=='3'">买指定油品达到一定金额，总价扣减折扣金额</p>
                  <p v-show="promotionType=='4'">买指定油品达到一定金额，总价扣减百分比折扣</p> -->
                </div>
              </div>
            </div>
            <div class="inp">
              <div class="left">
                <span>促销油站</span>
              </div>
              <div class="right">
                <span>{{station}}</span>
                <!-- <el-input v-model="station" placeholder="单行输入" style="width: 200px;"></el-input> -->
              </div>
            </div>
            <div class="inp">
              <div class="left t">
              <span>促销原因</span>
            </div>
            <div class="right wen">
              <div class="text">
                <el-input
                  type="textarea"
                  style="width: 380px;height: 120px;"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="reason">
                </el-input>
              </div>
            </div>
            </div>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
              <div class="inp">
              <div class="left shijian">
                <span>促销时间</span>
              </div>
              <div class="right">
                <div class="date">
                  <div class="inp">
                    <div class="left">
                      <span>日期</span>
                    </div>
                    <div class="right">
                      <el-date-picker
                        v-model="startDate"
                        type="date"
                        style=" width: 145px;"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                      </el-date-picker>
                      <span>-</span>
                      <el-date-picker
                        v-model="endDate"
                        style=" width: 145px;"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <!-- <el-input v-model="startDate" type="datetime-local" style="width: 200px;"></el-input>
                    <el-input v-model="endDate" type="datetime-local" style="width: 200px;"></el-input> -->
                  </div>
                  <div class="inp">
                    <div class="left">
                      <span>周期</span>
                    </div>
                    <div class="right">
                      <el-radio v-model="radio" label="1"  @change="isDisabled=true">每天</el-radio>
                      <el-radio v-model="radio" label="2" @change="isDisabled=false">周循环</el-radio>
                    </div>
                  </div>
                  <div class="inp">
                    <div class="left">

                    </div>
                    <div class="right">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox label="周一" :disabled="isDisabled"></el-checkbox>
                        <el-checkbox label="周二" :disabled="isDisabled"></el-checkbox>
                        <el-checkbox label="周三" :disabled="isDisabled"></el-checkbox>
                        <el-checkbox label="周四" :disabled="isDisabled"></el-checkbox>
                        <el-checkbox label="周五" :disabled="isDisabled"></el-checkbox>
                        <el-checkbox label="周六" :disabled="isDisabled"></el-checkbox>
                        <el-checkbox label="周日" :disabled="isDisabled"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                    
                  </div>
                  <div class="inp">
                    <div class="left">
                      <el-checkbox v-model="checked"  @change="timeChecked">按时间段</el-checkbox>
                    </div>
                    <div class="right">
                      <el-time-picker
                        v-model="startTime"
                        :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                        style="width: 145px;"
                        :disabled="timeDisabled"
                        placeholder="请选择">
                      </el-time-picker>
                      <!-- <el-input v-model="startTime" placeholder="单行输入" type="time" step="01" style="width: 145px;"></el-input> -->
                      <span>-</span>
                      <!-- <el-input v-model="endTime" placeholder="单行输入" type="time" step="01" style="width: 145px;"></el-input> -->
                      <el-time-picker
                        v-model="endTime"
                        :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                        style="width: 145px;"
                        :disabled="timeDisabled"
                        placeholder="请选择">
                      </el-time-picker>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="inp">
              <div class="left t">
                <span>促销次数</span>
              </div>
              <div class="right">
                  <div class="ipt">
                    <div class="left wu">
                      <el-radio v-model="frequency" label="0">无限制</el-radio>
                    </div>
                    <div class="right">
                      <el-radio v-model="frequency" label="1" style="margin-left: 20px;">天/次</el-radio>
                      <el-input v-model="totalTimes" :disabled="frequency!=1" size="mini" :min="1" type="number" placeholder="0" style="width: 100px;"></el-input>
                      <el-radio v-model="frequency" label="2" style="margin-left: 20px;">总/次</el-radio>
                      <el-input v-model="dayTimes" :disabled="frequency!=2" size="mini" :min="1" type="number" placeholder="0" style="width: 100px;"></el-input>
                    </div>
                    
                  </div>
              </div>
            </div>
            <div class="inp">
              <div class="left t">
                <span>支付方式</span>
              </div>
              <div class="right zhifu">
                  <el-checkbox-group v-model="mode">
                    <el-checkbox label="现金"></el-checkbox>
                    <el-checkbox label="微信"></el-checkbox>
                    <el-checkbox label="支付宝"></el-checkbox>
                    <el-checkbox label="银联卡"></el-checkbox>
                    <el-checkbox label="会员卡"></el-checkbox>
                  </el-checkbox-group>
              </div>
            </div>  
            </div></el-col>
        </el-row>
      </div>
      <div class="footer">
        <div class="left">
          <p>促销规则</p>
        </div>
        <div class="right">
          <div class="gui">
          <!-- 油品满升数，单价立减 -->
          <el-table
            v-show="promotionType=='1'"
            :data="tbOilPromotionRulesList"
            stripe
            style="width: 100%">
            <el-table-column
              label="油品"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="scope.row.oilsId" clearable placeholder="请选择" style="width: 150px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.oils_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="促销数量"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.oilsNum" type="number" placeholder="0" style="width: 100px;"></el-input> 升
              </template>
            </el-table-column>
            <el-table-column
              label="优惠金额"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.discountAmount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column 
            label="规则说明" 
            min-width="265"
            align="center" >
              <template slot-scope="scope">
              <span class="shuoming" v-for="(item, index) in oils" :key="index" v-show="scope.row.oilsId==item.id">{{item.oils_name}} 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>         
              <!-- <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>
              <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>
              <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
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
          <!-- 油品满升数，单价百分比优惠 -->
          <el-table
            v-show="promotionType=='2'"
            :data="tbOilPromotionRulesList"
            stripe
            style="width: 100%">
            <el-table-column
              label="油品"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="scope.row.oilsId"  clearable placeholder="请选择" style="width: 150px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.oils_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="促销数量"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.oilsNum" type="number" placeholder="0" style="width: 100px;"></el-input> 升
              </template>
            </el-table-column>
            <el-table-column
              label="优惠折扣"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.discount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> %
              </template>
            </el-table-column>
            <el-table-column label="规则说明" min-width="265" align="center" >
              <template slot-scope="scope">
                <span class="shuoming" v-for="(item, index) in oils" :key="index" v-show="scope.row.oilsId==item.id">{{item.oils_name}} 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>
              <!-- <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 汽油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>         
              <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>
              <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>
              <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
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
          <!-- 油品满金额，总价立减 -->
          <el-table
            v-show="promotionType=='3'"
            :data="tbOilPromotionRulesList"
            stripe
            style="width: 100%">
            <el-table-column
              label="油品"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="scope.row.oilsId" clearable placeholder="请选择" style="width: 150px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.oils_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="促销金额"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.promotionalAmount" type="number" placeholder="0" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column
              label="优惠金额"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.discountAmount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column 
             label="规则说明"
             min-width="265"
             align="center" >
              <template slot-scope="scope">
                <span class="shuoming" v-for="(item, index) in oils" :key="index" v-show="scope.row.oilsId==item.id">{{item.oils_name}} 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>
              <!-- <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>         
              <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>
              <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>
              <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
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
          <!-- 油品满金额，总价百分比优惠 -->
          <el-table
            v-show="promotionType=='4'"
            :data="tbOilPromotionRulesList"
            stripe
            style="width: 100%">
            <el-table-column
              label="油品"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="scope.row.oilsId"  clearable placeholder="请选择" style="width: 150px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.oils_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="促销金额"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.promotionalAmount" type="number" placeholder="0" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column
              label="优惠折扣"
              min-width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.discount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> %
              </template>
            </el-table-column>
            <el-table-column label="规则说明" min-width="265" align="center" >
              <template slot-scope="scope">
                <span class="shuoming" v-for="(item, index) in oils" :key="index" v-show="scope.row.oilsId==item.id">{{item.oils_name}} 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>
              <!-- <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>         
              <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>
              <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>
              <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="80"
              align="center">
              <template slot-scope="scope">
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
        </div>
        
      </div>
      <div class="but">
        <el-button @click="prev">取消</el-button>
        <el-button type="primary" @click="tijiao">提交</el-button>
      </div>
  </div>
</div>
</template>

<script>
import { getyoulist } from "@/api/cuxiaoguanli";
import { addcu } from "@/api/cuxiaoguanli";
import { getOilsList } from "@/api/cuxiaoguanli";
import { getUserInfo } from '@/api/cheduiguanli'
import { getOilsStationInfo } from '@/api/cheduiguanli'

export default {
  name: 'OilApplicationDemo',
  data() {
    return {
      promotionName:'',//促销名称
      promotionType:'1',//促销类型
      startDate:'',//开始日期
      endDate:'',//结束日期
      radio: '1',//每天/周循环
      checkList: [],//周1-7
      checked: false,//按时间段是否选中
      startTime:'',//开始时间
      endTime:'',//结束时间
      reason:'原因：竞争对手xx加油站汽油降价xx元/升，为保住加油站销量，特申请此促销活动。\n 促销方式：92号汽油 加满200元，每升优惠0.2元  加油300元，每升优惠0.3元',//促销原因
      mode:[],//促销支付方式
      tbOilsPromotionSupportPaymentList:[],
      frequency:'',//促销次数限制0无限制1有限
      totalTimes:'',//总/次
      dayTimes:'',//天/次
      //油品选择
      options: [{
          value: '1',
          label: '92号 汽油'
        }, {
          value: '2',
          label: '95号 汽油'
        }, {
          value: '3',
          label: '98号 汽油'
        }, {
          value: '4',
          label: '0号 柴油'
        }],
        //促销类型选择
        typeOptions: [{
          value: '1',
          label: '油品满升数，单价立减'
        }, {
          value: '2',
          label: '油品满升数，单价百分比优惠'
        }, {
          value: '3',
          label: '油品满金额，总价立减'
        }, {
          value: '4',
          label: '油品满金额，总价百分比优惠'
        }],
      //规则说明临时表格数据
      tbOilPromotionRulesList: [{
        oilsId:'',//油品
        oilsNum:'20',//促销数量
        discountAmount:'0.5',//优惠金额
        discount:10,//优惠折扣%
        promotionalAmount:'200',//促销金额
        promotionOilsDescription:'92号 车用汽油 加油满20升单价立减0.5元',//规则说明
      },{
        oilsId:'',//油品
        oilsNum:'20',//促销数量
        discountAmount:'0.5',//优惠金额
        discount:10,//优惠折扣%
        promotionalAmount:'200',//促销金额
        promotionOilsDescription:'92号 车用汽油 加油满20升单价立减0.5元',//规则说明
      }],
      station:'',//加油站
      tbOilsPromotionTimeList: [{//油品促销时间集合【该数组给一个子集】
          "circulationType": 1,// 循环类型 1 单次  2 周循环,
          "endTime": "2018-11-23T01:55:55.541Z",//结束时间
          "friday": 0,//星期五 未选中0  选中1
          "monday": 0,//星期一 未选中0  选中1,
          "saturday": 0,//星期六 未选中0  选中1
          "settingEndTime": "string",//设置某天的结束时间【HH：mm：ss】
          "settingStartTime": "string",//设置某天开始时间【HH：mm：ss】
          "startTime": "2018-11-23T01:55:55.541Z",//开始时间
          "sunday": 0,//星期日 未选中0  选中1
          "thursday": 0,//星期四 未选中0  选中1
          "tuesday": 0,//星期二 未选中0  选中1
          "wednesday": 0,//星期三 未选中0  选中1
          "whetherToSetTheTimePeriod": 0//是否设置时间段  0 未设置  1设置
        }],
        oils:[],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isDisabled:true,
        timeDisabled:true,
    }
  },
  mounted(){
    this.get()
  },
  methods: {
    get(){
      var data = {
        
      }
      // getyoulist(data)
      //   .then(response => {
      //     console.log('油站列表')
      //     console.log(response.data)
      //   })
      getOilsList(data)
        .then(response => {
          console.log(response.data)
          this.options = response.data
          for(let i = 0; i<this.options.length;i++){
            this.oils.push({
              id:this.options[i].id,
              oils_name:this.options[i].oils_name,
            })
          }
        })
      getUserInfo(data)
        .then(response => {
          console.log('信息')
          console.log(response.data.belong_id)
          var id = response.data.belong_id
          var data = {
            id:id,
          }
          getOilsStationInfo(data)
            .then(response => {
              console.log('油站')
              console.log(response.data)
              // stationInfo
              this.station = response.data.stationInfo.shortName
            }) 
        }) 
    },
    //时间段是否选中
    timeChecked(){
      if(this.checked){
        this.timeDisabled = false
      }else{
        this.timeDisabled = true
      }
    },
    che(index,row){
      
      // console.log(o)
      // this.oils_name = oils_name

    },
    add(){
      var obj = {
        oilsId:'',//油品
        oilsNum:'',//促销数量
        discountAmount:'',//优惠金额
        discount:'',//优惠折扣%
        promotionalAmount:'',//促销金额
        promotionOilsDescription:'',//规则说明
      }
      this.tbOilPromotionRulesList.push(obj)
    },  
    del(index,row){
      this.tbOilPromotionRulesList.splice(index, 1); 
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
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
    changeType(){
      this.tbOilPromotionRulesList=[]
    },
    tijiao(){
      if(this.promotionName==null||this.promotionName==''){
        this.$message({
          message: '请输入促销名称',
          type: 'warning'
        });
        return
      }
      if(this.promotionType==null||this.promotionType==''){
        this.$message({
          message: '请选择促销类型',
          type: 'warning'
        });
        return
      }
      if(this.reason==null||this.reason==''){
        this.$message({
          message: '请输入促销原因',
          type: 'warning'
        });
        return
      }
      if(this.startDate==null||this.startDate==''){
        this.$message({
          message: '请选择促销开始时间',
          type: 'warning'
        });
        return
      }
      if(this.endDate==null||this.endDate==''){
        this.$message({
          message: '请选择促销结束时间',
          type: 'warning'
        });
        return
      }
      if(this.radio==2){
        if (this.checkList.length==0||this.checkList==null) {
          this.$message({
            message: '请选择周循环日期',
            type: 'warning'
          });
        return
        }
      }
      if(this.checked){
        if(this.startTime==null||this.startTime==''){
          this.$message({
            message: '请选择促销时间段开始时间',
            type: 'warning'
          });
          return
        }
        if(this.endTime==null||this.endTime==''){
          this.$message({
            message: '请选择促销时间段结束时间',
            type: 'warning'
          });
          return
        }
      }
      if(this.mode.length==0||this.mode==null){
        this.$message({
          message: '请选择支付方式',
          type: 'warning'
        });
        return
      }
      if(this.frequency==1){
        if (this.totalTimes<1) {
          this.$message({
            message: '促销次数必须大于等于1',
            type: 'warning'
          });
        return
        }
      }
      if(this.frequency==2){
        if (this.dayTimes<1) {
          this.$message({
            message: '促销次数必须大于等于1',
            type: 'warning'
          });
          return
        }
      }
       var that = this;
       if(this.frequency==0){
         var num = null
       }else if(this.frequency==1){
         var num = Number(this.totalTimes) 
       }else if(this.frequency==2){
         var num = Number(this.dayTimes) 
       }
       if(this.radio=='1'){
         var daysWeekList =[]
       }else if(this.radio=='2'){
         var daysWeekList =this.checkList
       }
       var typeList =[]
       if (this.tbOilPromotionRulesList.length==0) {
        this.$message({
          message: '请添加促销规则',
          type: 'warning'
        });
        return
      }
       if(this.promotionType==1){
         for(let i=0;i<this.tbOilPromotionRulesList.length;i++){
          if (this.tbOilPromotionRulesList[i].oilsId==''||this.tbOilPromotionRulesList[i].oilsId==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销油品',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].oilsNum<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销数量',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].discountAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠金额',
              type: 'warning'
            });
            return
          }
          typeList.push({
              goodsId:this.tbOilPromotionRulesList[i].oilsId,
              minimumCharge:this.tbOilPromotionRulesList[i].oilsNum,
              discount:this.tbOilPromotionRulesList[i].discountAmount
          })
        }
       }else if(this.promotionType==2){
         for(let i=0;i<this.tbOilPromotionRulesList.length;i++){
           if (this.tbOilPromotionRulesList[i].oilsId==''||this.tbOilPromotionRulesList[i].oilsId==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销油品',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].oilsNum<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销数量',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].discount<0||this.tbOilPromotionRulesList[i].discount>100) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠折扣',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.tbOilPromotionRulesList[i].oilsId,
            minimumCharge:this.tbOilPromotionRulesList[i].oilsNum,
            discount:this.tbOilPromotionRulesList[i].discount
          })
        }
       }else if(this.promotionType==3){
         for(let i=0;i<this.tbOilPromotionRulesList.length;i++){
           if (this.tbOilPromotionRulesList[i].oilsId==''||this.tbOilPromotionRulesList[i].oilsId==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销油品',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].promotionalAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].discountAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠金额',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.tbOilPromotionRulesList[i].oilsId,
            minimumCharge:this.tbOilPromotionRulesList[i].promotionalAmount,
            discount:this.tbOilPromotionRulesList[i].discountAmount
          })
        }
       }else if(this.promotionType==4){
         for(let i=0;i<this.tbOilPromotionRulesList.length;i++){
           if (this.tbOilPromotionRulesList[i].oilsId==''||this.tbOilPromotionRulesList[i].oilsId==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销油品',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].promotionalAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.tbOilPromotionRulesList[i].discount<0||this.tbOilPromotionRulesList[i].discount>100) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠折扣',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.tbOilPromotionRulesList[i].oilsId,
            minimumCharge:this.tbOilPromotionRulesList[i].promotionalAmount,
            discount:this.tbOilPromotionRulesList[i].discount
          })
        }
       }
       var data = {
         name:this.promotionName,
         activityType:1,
         belongType:3,
         promotionType:this.promotionType,
         payTypeList:this.mode,
         startDate:this.startDate,
         endDate:this.endDate,
         instruction:this.reason,
         promotionTimes:this.frequency,
         num:num,
         startTime:this.startTime,
         endTime:this.endTime,
         daysWeekList:daysWeekList,
         typeList:typeList
       }
        console.log(data)
        addcu(data)
          .then(response => {
            console.log(response.data)
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.prev()
          })
      
    }  
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.inp{
  margin-bottom: 20px;
}
 .left,.right{
  display: inline-block;

}
.inp .left{
  // width: 115px;
  text-align: right;
}
.t{
  // width: 115px;
  vertical-align: top;
  text-align: right;
  line-height: 36px;
}
.inp .right{
  padding-left: 10px;
}
.shijian{
  vertical-align: top;
  line-height: 36px;
}
.date .inp .left{
  width: 115px;
  text-align: left;
  padding-left: 30px;
}
.text p{
  margin: 0;
  line-height: 36px;
  color: #606266;
  font-size: inherit;
}
.kuang{
  width: 200px;
  border: 1px solid gray;
  padding: 5px;
}
.kuang .el-checkbox{
  margin-left: 0;
  margin-right: 25px;
}
.footer{
  padding: 10px 0;
}
.but{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.but button+button{
  margin-left: 100px;
}
.gui{
  border:1px solid #E4E8F4;
  border-bottom: 0;
}
select{
  width: 110px;
  padding: 2px;
  border-radius: 8px;
  
}
#zhan{
  width: 200px;
}
.ipt .wu{
  text-align: left;
  padding-left: 30px;
}
.zhifu{
  margin-left: 30px;
}
.zi button{
  border: 0;
}
.footer .right{
  width: 90%;
  padding-left: 10px;
}
.footer .left{
  text-align: right;
  vertical-align: top;
  padding-left: 1.5%;
}
.footer .left p{
  margin: 0;
  line-height: 36px;
}
.warp{
  background-color: #F6F7FB;
  // padding: 2%;
}
.main{
  min-height: calc(100vh - 214px);
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding-top: 30px;
}
.header{
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  height: 60px;
  padding-left: 1%;
}   
.header h3{
  line-height: 60px;
  margin: 0;
}
.bg-purple{
  padding-left: 3%;
}
.bg-purple-light .inp .right{
  padding-left: 0;
  line-height: 36px;
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
.el-checkbox+.el-checkbox{
  margin-left: 6px;
}
.date .left .el-checkbox{
  margin: 0;
}
.date .el-checkbox__label ,.zhifu .el-checkbox__label{
  padding-left: 5px;
}
</style>
 