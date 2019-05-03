<template>
<div class="warp">
  <div class="header">
    <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>油品商品混合促销申请</h3>
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
              <el-select v-model="promotionType" @change="changeType" clearable placeholder="请选择" style="width: 280px;">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                <!-- <el-option value="油品满金额，赠送指定数量的便利店商品">油品满金额，赠送指定数量的便利店商品</el-option>
                <el-option value="油品满金额，赠送指定金额任意商品">油品满金额，赠送指定金额任意商品</el-option> -->
              </el-select>
              <div class="text">
                <!-- <p v-if="promotionType=='1'">买油品达到一定金额，赠送指定数量的便利店商品</p>
                <p v-if="promotionType=='2'">买油品达到一定金额，赠送指定金额内的任意便利店商品</p> -->
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
              <!-- <select name="zhan" id="zhan" v-model="station">
                <option value="北京一号加油站">北京一号加油站</option>
              </select> -->
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
                      clearable
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
                    <el-radio v-model="radio" label="1" @change="isDisabled=true">每天</el-radio>
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
                    <el-checkbox v-model="checked" @change="timeChecked">按时间段</el-checkbox>
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
                    <!-- <el-input v-model="startTime" placeholder="单行输入" type="time" step="01" style="width: 145px;"></el-input>
                    <span>-</span>
                    <el-input v-model="endTime" placeholder="单行输入" type="time" step="01" style="width: 145px;"></el-input> -->
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
                    <el-radio v-model="frequency" label="1">天/次</el-radio>
                    <el-input v-model="totalTimes" :disabled="frequency!=1" size="mini"  :min="1" type="number" placeholder="0" style="width: 100px;"></el-input>
                    <el-radio v-model="frequency" label="2" style="margin-left: 20px;">总/次</el-radio>
                    <el-input v-model="dayTimes" :disabled="frequency!=2" size="mini"  :min="1" type="number" placeholder="0" style="width: 100px;"></el-input>
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
          <!-- 油品满金额，赠送指定数量的便利店商品 -->
          <el-table
            :data="ruleData"
            v-show="promotionType==13"
            stripe
            style="width: 100%">
            <el-table-column
              label="油品"
              width="180"
              align="center">
              <template slot-scope="scope">
              <el-select v-model="scope.row.oils" clearable placeholder="请选择" style="width: 150px;">
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
              width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column
              label="赠送商品"
              width="240"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.giftGoods[0].goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
              <el-button v-show="scope.row.giftGoods[0].goodsName==''" @click="btn(scope.$index)">+</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="赠送数量"
              width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.quantity" type="number" placeholder="0" style="width: 100px;"></el-input> {{scope.row.giftGoods[0].unit}}
              </template>
            </el-table-column>
            <el-table-column label="规则说明" min-width="305" align="center" >
              <template slot-scope="scope">
                <span class="shuoming" v-for="(item, index) in options" :key="index" v-show="scope.row.oils==item.id"> {{item.oils_name}} 加油满{{ scope.row.amount }}元，赠送 {{scope.row.quantity}}{{scope.row.giftGoods[0].unit}} {{scope.row.giftGoods[0].goodsName}}</span> 
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="70"
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
          <!-- 油品满金额，赠送指定金额任意商品 -->
          <el-table
            :data="ruleData"
            v-show="promotionType==14"
            stripe
            style="width: 100%">
            <el-table-column
              label="油品"
              width="180"
              align="center">
              <template slot-scope="scope">
              <el-select v-model="scope.row.oils"  clearable placeholder="请选择" style="width: 150px;">
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
              width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="1" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column
              label="赠送商品金额"
              width="150"
              align="center">
              <template slot-scope="scope">
              <el-input v-model="scope.row.giftAmount" type="number" placeholder="0" step="1" style="width: 100px;"></el-input> 元
              </template>
            </el-table-column>
            <el-table-column label="规则说明" min-width="305" align="center" >
              <template slot-scope="scope">
                <span class="shuoming" v-for="(item, index) in oils" :key="index" v-show="scope.row.oils==item.id"> {{item.oils_name}} 加油满{{ scope.row.amount }}元，赠送 {{scope.row.giftAmount}}元便利店商品</span> 
              <!-- <span class="shuoming" v-if="scope.row.oils=='4'">{{item.oils_name}} 加油满{{ scope.row.amount }}元，赠送 {{scope.row.giftAmount}}元便利店商品</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="70"
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
  <!-- 赠品添加框 -->
  <el-dialog :visible.sync="giftGoodsVisible" title="商品添加" width="80%">
    <div class="big">
      <div class="leibie">
          <span>商品类型：</span>
          <el-select v-model="xuanType" clearable @change="xuanTypeChange" placeholder="请选择">
            <el-option
              v-for="item in shangtypeOptions"
              :key="item.id"
              :label="item.goodsType"
              :value="item.id">
            </el-option>
          </el-select>
          <!-- <select name="lei" id="lei" >
              <option v-for="(item, index) in commodityType" :key="index" value="item">{{item}}</option>
          </select> -->
      </div>
      <div class="sou">
          <el-input v-model="search"  @change="screenChange" size="mini" placeholder="输入关键字搜索"/>
      </div>
    </div>
    <!-- .filter(data => !search || data.goodsName.toLowerCase().includes(search.toLowerCase())) -->
    <!-- @selection-change="handleSelectionChange" -->
    <el-table
        ref="filterTable"
        highlight-current-row
        @current-change="singleHandleSelectionChange"
        height="400"
        :data="commodityData"
        style="width: 100%">
        <!-- <el-table-column
        type="selection"
        width="55">
        </el-table-column> -->
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox> 
          </template>
        </el-table-column>
        <el-table-column
        prop="goodsTypeName"
        label="商品类型"
        sortable
        min-width="150"
        >
        </el-table-column>
        <el-table-column
        prop="goodsName"
        label="商品名称"
        sortable
        min-width="150">
        </el-table-column>
        <el-table-column
        prop="brand"
        label="品牌"
        width="150">
        </el-table-column>
        <el-table-column
        prop="repertory"
        label="库存"
        sortable
        width="100">
        </el-table-column>
        <el-table-column
        prop="unit"
        label="单位"
        width="150">
        </el-table-column>
        <el-table-column
        prop="price "
        label="单价"
        sortable
        width="150">
        </el-table-column>
        <el-table-column
        label="规格"
        sortable
        width="150">
        <template  slot-scope="scope">
            <span>{{scope.row.specAmount}}{{scope.row.specUnit}}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="expirationDay"
        label="保质期"
        sortable
        width="150">
        </el-table-column>
        <el-table-column
        align="right" v-if="0">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope" >
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="but">
        <el-button @click="addgiftGoods" slot="reference">确认添加</el-button>
    </div>
  </el-dialog> 
</div>
</template>

<script>
import { addcu } from "@/api/cuxiaoguanli";
import { getGoodsList } from "@/api/cuxiaoguanli";
import { getGoodsTypeList } from "@/api/cuxiaoguanli";
import { getOilsList } from "@/api/cuxiaoguanli";
import { getUserInfo } from '@/api/cheduiguanli'
import { getOilsStationInfo } from '@/api/cheduiguanli'

export default {
  name: 'MixedPromotion',
  data() {
    return {
      promotionName:'',//促销名称
      promotionType:13,//促销类型
      startDate:'',//开始日期
      endDate:'',//结束日期
      radio: '1',//每天/周循环
      checkList: [],//周1-7
      checked: false,//按时间段是否选中
      startTime:'',//开始时间
      endTime:'',//结束时间
      reason:'',//促销原因
      mode:[''],//促销支付方式
      frequency:'',//促销次数限制1、无限制2、天/次3、总/次
      totalTimes:'',//总/次
      dayTimes:'',//天/次
      //油品选择
      options: [],
        //促销类型选择
        typeOptions: [{
          value: 13,
          label: '油品满金额，赠送指定数量商品'
        }, {
          value: 14,
          label: '油品满金额，赠送指定金额商品'
        },],
      //规则说明临时表格数据
      ruleData: [],
      //商品列表
      commodityData:[],
      search:'',//关键字查询,
      commodityType:['全部','包装饮料','面包'],//商品类型
      multipleSelection: [],//添加的商品列表暂存器
      giftGoodsVisible:false,//赠品添加框控制显示与隐藏
      num:'',//第几行要添加商品
      oils:[],
      station:'',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      isDisabled:true,
      timeDisabled:true,
      disabledButton:false,
      xuanType:'',
      shangtypeOptions:'',
      searchCommodityData:[],//全部商品数据
    }
  },
  mounted(){
    this.get()
  },
  methods: {
    get(){
      var data ={}
      getGoodsList(data)
        .then(response => {
          console.log(response.data)
          response.data.forEach(item => {
            item.checked = false
          })
          this.commodityData = response.data
          this.searchCommodityData = JSON.parse(JSON.stringify(response.data))
        })
      getGoodsTypeList(data)
        .then(response => {
          console.log(response.data)
          this.shangtypeOptions = response.data
        })
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
    //添加行
    add(){
      var obj = {
        oils:'',//油品
        amount:'',//促销金额
        giftGoods:[{
          goodsName:'',//赠送商品名
          company:'',//单位
        }],//赠送商品
        quantity:'', //赠送数量
        giftAmount:'',//赠送商品金额
        ruleDescription:''//说明
      }
      this.ruleData.push(obj)
    },  
    //删除行
    del(index,row){
      this.ruleData.splice(index, 1); 
    },
    //添加商品按钮
    btn(index){
      this.giftGoodsVisible=true
      this.num=index
    },
    //商品筛选
    xuanTypeChange(){
      var data = {
        typeId:this.xuanType,
      }
      getGoodsList(data)
        .then(response => {
          console.log('商品')
          console.log(response.data)
          this.commodityData = response.data
          this.searchCommodityData = JSON.parse(JSON.stringify(response.data))
        })
    },
    //商品关键字搜索
    screenChange(){
      if (this.search==''||this.search==null) {
        this.commodityData = JSON.parse(JSON.stringify(this.searchCommodityData));
      }else{
        this.commodityData = [];
        this.searchCommodityData.forEach(item => {
          if (item.goodsName.indexOf(this.search)!=-1) {
            this.commodityData.push(item)
          }
        })
      }
    },
    //添加赠品商品
    addgiftGoods(){
      this.giftGoodsVisible=false
      this.commodityData.forEach(item => {
        if (item.checked) {
          console.log(item)
          this.ruleData[this.num].giftGoods[0].id = JSON.parse(JSON.stringify(item)).id;
          this.ruleData[this.num].giftGoods[0].goodsName = JSON.parse(JSON.stringify(item)).goodsName;
          this.ruleData[this.num].giftGoods[0].unit = JSON.parse(JSON.stringify(item)).unit;
        }
      })
      // if(this.multipleSelection.length>0){
      //   this.ruleData[this.num].giftGoods[0].id = JSON.parse(JSON.stringify(this.multipleSelection[0])).id;
      //   this.ruleData[this.num].giftGoods[0].goodsName = JSON.parse(JSON.stringify(this.multipleSelection[0])).goodsName;
      //   this.ruleData[this.num].giftGoods[0].unit = JSON.parse(JSON.stringify(this.multipleSelection[0])).unit;
      //   this.multipleSelection=[]
      // }
    },
    //筛选
    handleFilter() {
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //单选
    singleHandleSelectionChange (row) {
      this.commodityData.forEach(item => {
        // 排他,每次选择时把其他选项都清除
        if (item.id !== row.id) {
          item.checked = false
        }
      })
      console.log(row)
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },
    changeType(){
      this.ruleData=[]
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
       if (this.ruleData.length==0) {
        this.$message({
          message: '请添加促销规则',
          type: 'warning'
        });
        return
      }
       if(this.promotionType==13){
        for(let i=0;i<this.ruleData.length;i++){
          if (this.ruleData.ruleData[i].oils==''||this.ruleData.ruleData[i].oils==null) {
            this.$message({
              message: '请选择促销油品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData.ruleData[i].giftGoods[0].goodsName==''||this.ruleData.ruleData[i].giftGoods[0].goodsName==null) {
            this.$message({
              message: '请选择赠送商品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData.ruleData[i].amount<=0) {
            this.$message({
              message: '请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.ruleData.ruleData[i].quantity<=0) {
            this.$message({
              message: '请输入正确的赠送数量',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.ruleData[i].oils,
            givingId:this.ruleData[i].giftGoods[0].goodsName,
            minimumCharge:this.ruleData[i].amount,
            givingNum:this.ruleData[i].quantity
          })
        }
      }else if(this.promotionType==14){
        for(let i=0;i<this.ruleData.length;i++){
          if (this.ruleData.ruleData[i].oils==''||this.ruleData.ruleData[i].oils==null) {
            this.$message({
              message: '请选择促销油品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData.ruleData[i].amount<=0) {
            this.$message({
              message: '请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.ruleData.ruleData[i].giftAmount<=0) {
            this.$message({
              message: '请输入正确的赠送商品金额',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.ruleData[i].oils,
            minimumCharge:this.ruleData[i].amount,
            discount:this.ruleData[i].giftAmount
          })
        }
      } 
      var data = {
        name:this.promotionName,
        activityType:3,
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
    this.disabledButton=true
    addcu(data)
      .then(response => {
        console.log("成功")
        this.$message({
          message: '提交成功',
          type: 'success'
        });
        this.disabledButton=false
        this.prev()
        console.log(response.data)
      })
    },
    //自定义表头+
    renderHeader(h, { column, $index }){
        var that=this
        return h('span', [
        h('span', column.label),
        h('el-button',
            {
              style: 'margin-left: 5px; border:0;background-color:#F5F9FC;font-size: 25px;padding: 0;color:#5B8DFF;"',
              on: {
                click: that.add
              }
            },['+']
          ),
        ]);
      },  
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
  text-align: right;
}
.t{
 vertical-align: top;
 line-height: 36px;
}
.inp .right{
  padding-left: 10px;
}
.shijian{
  vertical-align: top;
  line-height: 36px;
}
.text p{
  margin-top: 0;
  line-height: 36px;
  color: #606266;
  font-size: inherit;
  width: 380px;
}
.wen{
  width: 70%;
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
.sou{
  width: 300px;
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
.date .inp .left{
  width: 115px;
  text-align: left;
  padding-left: 30px;
}
.t{
  // width: 115px;
  vertical-align: top;
  text-align: right;
  line-height: 36px;
}
.zu{
  margin-bottom: 5px;
  overflow: hidden;
}
.jian{
  float: right;
}
.footer .right{
  width: 90%;
  padding-left: 10px;
}
.footer .left{
  // width: 115px;
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
    min-height: calc(100vh - 181px);
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
.big{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.sou{
   width: 300px;
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