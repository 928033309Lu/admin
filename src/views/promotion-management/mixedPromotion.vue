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
              <el-select v-model="promotionType" clearable  placeholder="请选择" style="width: 280px;">
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
              <el-input v-model="station" placeholder="单行输入" style="width: 200px;"></el-input>
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
                      clearable
                      style=" width: 145px;"
                      placeholder="选择日期">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                      v-model="endDate"
                      style=" width: 145px;"
                      type="date"
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
                    <el-radio v-model="radio" label="1">每天</el-radio>
                    <el-radio v-model="radio" label="2">周循环</el-radio>
                  </div>
                </div>
                <div class="inp">
                  <div class="left">

                  </div>
                  <div class="right">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="周一"></el-checkbox>
                      <el-checkbox label="周二"></el-checkbox>
                      <el-checkbox label="周三"></el-checkbox>
                      <el-checkbox label="周四"></el-checkbox>
                      <el-checkbox label="周五"></el-checkbox>
                      <el-checkbox label="周六"></el-checkbox>
                      <el-checkbox label="周日"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="inp">
                  <div class="left">
                    <el-checkbox v-model="checked">按时间段</el-checkbox>
                  </div>
                  <div class="right">
                    <el-time-picker
                      v-model="startTime"
                      :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                      }"
                      style="width: 145px;"
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
                    <el-input v-model="totalTimes" :disabled="frequency!=1" size="mini" type="number" placeholder="0" style="width: 100px;"></el-input>
                    <el-radio v-model="frequency" label="2" style="margin-left: 20px;">总/次</el-radio>
                    <el-input v-model="dayTimes" :disabled="frequency!=2" size="mini" type="number" placeholder="0" style="width: 100px;"></el-input>
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
             <el-input v-model="scope.row.quantity" type="number" placeholder="0" style="width: 100px;"></el-input> {{scope.row.giftGoods[0].company}}
            </template>
          </el-table-column>
          <el-table-column label="规则说明" min-width="305" align="center" >
            <template slot-scope="scope">
              <span class="shuoming" v-for="(item, index) in options" :key="index" v-show="scope.row.oils==item.id"> {{item.oils_name}} 加油满{{ scope.row.amount }}元，赠送 {{scope.row.quantity}}{{scope.row.giftGoods[0].company}} {{scope.row.giftGoods[0].commodityName}}</span> 
             <!-- <span class="shuoming" v-if="scope.row.oils=='1'">92号 汽油 加油满{{ scope.row.amount }}元，赠送 {{scope.row.quantity}}{{scope.row.giftGoods[0].company}} {{scope.row.giftGoods[0].commodityName}}</span>
             <span class="shuoming" v-if="scope.row.oils=='2'">95号 汽油 加油满{{ scope.row.amount }}元，赠送 {{scope.row.quantity}}{{scope.row.giftGoods[0].company}} {{scope.row.giftGoods[0].commodityName}}</span>
             <span class="shuoming" v-if="scope.row.oils=='3'">98号 汽油 加油满{{ scope.row.amount }}元，赠送 {{scope.row.quantity}}{{scope.row.giftGoods[0].company}} {{scope.row.giftGoods[0].commodityName}}</span>
             <span class="shuoming" v-if="scope.row.oils=='4'">0号 柴油 加油满{{ scope.row.amount }}元，赠送 {{scope.row.quantity}}{{scope.row.giftGoods[0].company}} {{scope.row.giftGoods[0].commodityName}}</span> -->
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
  <el-dialog :visible.sync="giftGoodsVisible" width="80%">
    <div class="big">
      <div class="leibie">
          <span>商品类型：</span>
          <el-select v-model="xuanType" clearable placeholder="请选择">
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
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      </div>
    </div>
    <el-table
        ref="filterTable"
        @selection-change="handleSelectionChange"
        :data="commodityData.filter(data => !search || data.goodsName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="goodsTypeName"
        label="商品类型"
        sortable
        width="150"
        >
        </el-table-column>
        <el-table-column
        prop="goodsName"
        label="商品名称"
        sortable
        width="150">
        </el-table-column>
        <el-table-column
        prop="barCode"
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
        prop="company"
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
        prop="guaranteePeriod"
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
    <!-- <div class="big">
      <div class="leibie">
          <span>商品类型：</span>
          <select name="lei" id="lei" >
              <option v-for="(item, index) in commodityType" :key="index" value="item">{{item}}</option>
          </select>
      </div>
      <div class="sou">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      </div>
    </div>
    <el-table
        ref="filterTable"
        @selection-change="handleSelectionChange"
        :data="commodityData.filter(data => !search || data.commodityName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="commodityType"
        label="商品类型"
        sortable
        width="150"
        >
        </el-table-column>
        <el-table-column
        prop="commodityName"
        label="商品名称"
        sortable
        min-width="150">
        </el-table-column>
        <el-table-column
        prop="brand"
        label="品牌"
        min-width="150">
        </el-table-column>
        <el-table-column
        prop="stock"
        label="库存"
        sortable
        min-width="100">
        </el-table-column>
        <el-table-column
        prop="company"
        label="单位"
        min-width="150">
        </el-table-column>
        <el-table-column
        prop="unitPrice"
        label="单价"
        sortable
        min-width="150">
        </el-table-column>
        <el-table-column
        prop="specifications"
        label="规格"
        sortable
        min-width="150">
        </el-table-column>
        <el-table-column
        prop="guaranteePeriod"
        label="保质期"
        sortable
        min-width="150">
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
    </el-table> -->
    <!-- <el-button slot="reference" v-if="scope.row.commodityName==''||scope.row.commodityName==null">+</el-button> -->
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
      reason:'原因：竞争对手xx加油站汽油降价xx元/升，为保住加油站销量，特申请此促销活动。\n 促销方式：92号汽油 加满200元，每升优惠0.2元  加油300元，每升优惠0.3元',//促销原因
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
      ruleData: [{
        oils:'1',//油品
        amount:'200',//促销金额
        //赠送商品
        giftGoods:[{
          goodsName:'',//赠送商品名
          company:'',//单位
        }],
        quantity:1, //赠送数量
        giftAmount:'10',//赠送商品金额
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元'//说明
      }],
      //商品列表
      commodityData:[{
        commodityType: '包装饮料',//商品类型
        commodityName: '哇哈哈 150ml',//商品名字
        brand: '哇哈哈',//品牌
        stock: '1000',//库存
        company:'瓶',//单位
        unitPrice:'3.00',//单价
        specifications:'150ml',//规格
        guaranteePeriod:'60天',//保质期
        barCode:'69700000000000',//条码
        volume:'20',//促销数量
        amount:'1.00',//优惠金额
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元'//规则说明
      },{
        commodityType: '包装饮料',//商品类型
        commodityName: '哇哈哈 150ml',//商品名字
        brand: '哇哈哈',//品牌
        stock: '1000',//库存
        company:'瓶',//单位
        unitPrice:'3.00',//单价
        specifications:'150ml',//规格
        guaranteePeriod:'60天',//保质期
        barCode:'69700000000000',//条码
        volume:'20',//促销数量
        amount:'1.00',//优惠金额
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元'//规则说明
      },{
        commodityType: '包装饮料',//商品类型
        commodityName: '哇哈哈 150ml',//商品名字
        brand: '哇哈哈',//品牌
        stock: '1000',//库存
        company:'瓶',//单位
        unitPrice:'3.00',//单价
        specifications:'150ml',//规格
        guaranteePeriod:'60天',//保质期
        barCode:'69700000000000',//条码
        volume:'20',//促销数量
        amount:'1.00',//优惠金额
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元'//规则说明
      }],
      search:'',//关键字查询,
      commodityType:['全部','包装饮料','面包'],//商品类型
      multipleSelection: [],//添加的商品列表暂存器
      giftGoodsVisible:false,//赠品添加框控制显示与隐藏
      num:'',//第几行要添加商品
      oils:[],
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
          this.commodityData = response.data.list
        })
      getGoodsTypeList(data)
        .then(response => {
          console.log(response.data)
          this.shangtypeOptions = response.data.list
        })
      getOilsList(data)
        .then(response => {
          console.log(response.data)
          this.options = response.data.list
          for(let i = 0; i<this.options.length;i++){
            this.oils.push({
              id:this.options[i].id,
              oils_name:this.options[i].oils_name,
            })
          }
        })
    },
    //添加行
    add(){
      var obj = {
        oils:'92号汽油',//油品
        amount:'200',//促销金额
        giftGoods:[{
          goodsName:'',//赠送商品名
          company:'',//单位
        }],//赠送商品
        quantity:1, //赠送数量
        giftAmount:'10',//赠送商品金额
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元'//说明
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
    //添加赠品商品
    addgiftGoods(){
      this.giftGoodsVisible=false
      if(this.multipleSelection.length>0){
        this.ruleData[this.num].giftGoods[0].id = JSON.parse(JSON.stringify(this.multipleSelection[0])).id;
        this.ruleData[this.num].giftGoods[0].goodsName = JSON.parse(JSON.stringify(this.multipleSelection[0])).goodsName;
        this.multipleSelection=[]
      }
    },
    //筛选
    handleFilter() {
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },
    tijiao(){
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
       if(this.promotionType==13){
        for(let i=0;i<this.ruleData.length;i++){
          typeList.push({
            goodsId:this.ruleData[i].oils,
            givingId:this.ruleData[i].giftGoods[0].goodsName,
            minimumCharge:this.ruleData[i].amount,
            givingNum:this.ruleData[i].quantity
          })
        }
      }else if(this.promotionType==14){
        for(let i=0;i<this.ruleData.length;i++){
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
    addcu(data)
      .then(response => {
        console.log("成功")
        this.$message({
          message: '提交成功',
          type: 'success'
        });
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
              style: 'margin-left: 5px;',
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