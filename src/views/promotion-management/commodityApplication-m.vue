<template>
<div class="warp">
  <div class="header">
    <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>商品促销申请</h3>
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
              </el-select>
              <div class="text">
                <!-- <p v-show="promotionType=='1'">买指定便利店商品达到一定数量及以上，单价扣减指定金额</p>
                <p v-show="promotionType=='2'">买指定便利店商品达到一定数量，商品总价扣减指定金额</p>
                <p v-show="promotionType=='3'">买指定便利店商品达到一定数量，单价扣减指定金额</p>
                <p v-show="promotionType=='4'">买指定便利店商品达到一定数量及以上，商品总价扣减指定金额</p>
                <p v-show="promotionType=='5'">买指定便利店商品整单交易达到一定金额，总价扣减指定金额</p>
                <p v-show="promotionType=='6'">买指定便利店商品整单交易达到一定金额，总价享受百分比折扣</p>
                <p v-show="promotionType=='7'">买指定便利店商品达到一定数量及以上，赠送指定的便利店促销商品</p>
                <p v-show="promotionType=='8'">购买商品组内任意商品达到指定数量，那么本次购买的组合商品中最低价的一个商品免费</p> -->
              </div>
            </div>
          </div>
           <div class="inp">
            <div class="left">
              <span>促销油站</span>
            </div>
            <div class="right">
              <el-select v-model="station" multiple clearable placeholder="请选择" style="width: 280px;">
                <el-option
                  v-for="item in stationOptions"
                  :key="item.id"
                  :label="item.shortName"
                  :value="item.id">
                </el-option>
              </el-select>
              <!-- <span>{{station}}</span> -->
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
                    <span>-</span>
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
        <!-- 商品满数量，单价立减 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==6"
          stripe
          style="width: 100%">
          <el-table-column
            label="商品"
            align="center"
            width="240">
            <template slot-scope="scope">
                <el-input v-model="scope.row.commodity.goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
                <el-button v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null" @click="addcommodity(scope.$index, scope.row)">+</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="促销数量"
            min-width="150"
            align="center">
            <template slot-scope="scope">
             <el-input v-model="scope.row.volume" type="number" placeholder="0" style="width: 100px;"></el-input> 个
             <!-- {{scope.row.company}} -->
            </template>
          </el-table-column>
           <el-table-column
            label="优惠金额"
            min-width="150"
            align="center">
            <template slot-scope="scope">
             <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-show="scope.row.amount!=''">{{ scope.row.commodity.goodsName }} 购买{{scope.row.volume}}个以上，单价立减{{scope.row.amount}}元</span>
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
        <!-- 商品满一定数量，限定数量内的商品总价立减 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==12"
          stripe
          style="width: 100%">
          <el-table-column
            label="商品"
            align="center"
            width="240">
            <template slot-scope="scope">
               <el-input v-model="scope.row.commodity.goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
                <el-button v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null" @click="addcommodity(scope.$index, scope.row)">+</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="促销数量"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.volume" type="number" placeholder="0" style="width: 100px;"></el-input> {{scope.row.company}}
            </template>
          </el-table-column>
           <el-table-column
            label="优惠金额"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305px" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-if="scope.row.commodity.goodsName">{{ scope.row.commodity.goodsName }} 购买达到{{scope.row.volume}}个，总价立减{{scope.row.amount}}元</span>
             <!-- {{scope.row.company}} -->
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
        <!-- 商品单价立减 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==11"
          stripe
          style="width: 100%">
          <el-table-column
            label="商品"
            align="center"
            width="240">
            <template slot-scope="scope">
               <el-input v-model="scope.row.commodity.goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
                <el-button v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null" @click="addcommodity(scope.$index, scope.row)">+</el-button>
            </template>
          </el-table-column>
           <el-table-column
            label="优惠金额"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305" align="center" >
            <template slot-scope="scope">
              <span class="shuoming" v-show="scope.row.commodity.goodsName">{{ scope.row.commodity.goodsName }}  单价立减{{scope.row.amount}}元</span>
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
        <!-- 商品卖赠促销 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==10"
          stripe
          style="width: 100%">
          <el-table-column
            label="商品"
            align="center"
            width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.commodity.goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
                <el-button v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null" @click="addcommodity(scope.$index, scope.row)">+</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="促销数量"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.volume" type="number" placeholder="0" style="width: 100px;"></el-input> {{scope.row.company}}
            </template>
          </el-table-column>
          <el-table-column
            label="赠送商品"
            align="center"
            width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.giftGoods[0].goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
              <el-button v-show="scope.row.giftGoods[0].goodsName==''" @click="btn(scope.$index)">+</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="赠送数量"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.donationQuantity" type="number" placeholder="0" style="width: 100px;"></el-input> {{scope.row.giftGoods[0].company}}
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-if="scope.row.volume!=''">购买 {{ scope.row.commodity.goodsName }}   满{{scope.row.volume}}{{scope.row.company}}，赠送{{scope.row.donationQuantity}}{{scope.row.giftGoods[0].company}}{{scope.row.giftGoods[0].goodsName}}</span>
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
        <!-- 商品订单满金额，总价立减 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==5"
          stripe
          style="width: 100%">
          <el-table-column
            label="促销金额"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.promotionalAmount" type="number" placeholder="0" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
           <el-table-column
            label="优惠金额"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-if="scope.row.promotionalAmount">订单满{{scope.row.promotionalAmount}}元，商品总价立减{{scope.row.amount}}元</span>
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
        <!-- 商品订单满金额，总价百分比优惠 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==9"
          stripe
          style="width: 100%">
          <el-table-column
            label="促销金额"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.promotionalAmount" type="number" placeholder="0" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
           <el-table-column
            label="优惠折扣"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.discount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> %
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-if="scope.row.promotionalAmount">订单满{{scope.row.promotionalAmount}}元，商品总价优惠{{scope.row.discount}}%</span>
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
        <!-- 商品订单满金额，赠送指定商品 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==8"
          stripe
          style="width: 100%">
          <el-table-column
            label="促销金额"
            align="center"
            width="150">
            <template slot-scope="scope">
             <el-input v-model="scope.row.promotionalAmount" type="number" placeholder="0" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
          <el-table-column
            label="赠送商品"
            align="center"
            width="240">
            <template slot-scope="scope">
              <el-input v-model="scope.row.giftGoods[0].goodsName" placeholder="请选择商品" style="width: 150px;"></el-input>
              <el-button v-show="scope.row.giftGoods[0].goodsName==''" @click="btn(scope.$index)">+</el-button>
            </template>
          </el-table-column><el-table-column
            label="赠送数量"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.donationQuantity" type="number" placeholder="0" style="width: 100px;"></el-input> {{scope.row.giftGoods[0].company}}
            </template>
          </el-table-column>
          <el-table-column label="说明" min-width="305" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-if="scope.row.promotionalAmount">订单满{{scope.row.promotionalAmount}}元，赠送{{scope.row.donationQuantity}} 个 {{scope.row.giftGoods[0].goodsName}}</span>
             <!-- {{scope.row.giftGoods[0].company}} -->
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
        <!-- 最低价免费 -->
        <el-table
          :data="ruleData"
          v-show="promotionType==7"
          stripe
          style="width: 100%">
          <el-table-column
            label="商品组"
            align="center">
            <el-table-column
            label="商品"
            align="left">
            <template slot-scope="scope">
              <div class="zu" v-for="(item, index) in scope.row.commodityGroup" :key="index">
                <span>{{item.goodsName}}</span>
                <el-button class="jian" @click="delGroup(index)" circle>-</el-button>
              </div>
              <el-button circle @click="shows=true">+</el-button>
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column
            label="促销数量"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.volume" type="number" placeholder="0" style="width: 100px;"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="说明" align="center" >
            <template slot-scope="scope">
             <span class="shuoming" v-if="scope.row.volume">购买商品组内任意商品达到{{scope.row.volume}}个，本次组合商品中最低价商品免费1个</span>
             <!-- {{scope.row.company}} -->
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
      <el-button type="primary" :disabled="disabledButton" @click="tijiao">提交</el-button>
    </div>
  </div>
  <!-- 商品添加框 -->
  <el-dialog :visible.sync="dialogFormVisible" title="选择商品" width="80%">
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
        <el-input v-model="search" @change="screenChange" placeholder="输入关键字搜索"/>
      </div>
    </div>
    <!-- .filter(data => !search || data.goodsName.toLowerCase().includes(search.toLowerCase())) -->
    <el-table
        ref="filterTable"
        highlight-current-row
        @current-change="singleHandleSelectionChange"
        :data="commodityData"
        height="400"
        style="width: 100%">
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
          <template  slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
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
    <!-- <el-button slot="reference" v-if="scope.row.commodityName==''||scope.row.commodityName==null">+</el-button> -->
    <div class="but">
        <el-button @click="entcommodity" slot="reference">确认添加</el-button>
    </div>
  </el-dialog> 
  <!-- 赠品添加框 -->
  <el-dialog :visible.sync="giftGoodsVisible" title="选择商品" width="80%">
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
          <el-input v-model="search" @change="screenChange" placeholder="输入关键字搜索"/>
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
    <!-- <el-button slot="reference" v-if="scope.row.commodityName==''||scope.row.commodityName==null">+</el-button> -->
    <div class="but">
        <el-button @click="addgiftGoods" slot="reference">确认添加</el-button>
    </div>
  </el-dialog> 
  <!-- 商品组添加商品 -->
  <el-dialog :visible.sync="shows" title="商品选择" width="80%">
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
        width="150">
        </el-table-column>
        <el-table-column
        prop="brand"
        label="品牌"
        width="150">
        </el-table-column>
        <el-table-column
        prop="stock"
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
        prop="unitPrice"
        label="单价"
        sortable
        width="150">
        </el-table-column>
        <el-table-column
        prop="specifications"
        label="规格"
        sortable
        width="150">
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
    </el-table> -->
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
          <el-input v-model="search" @change="screenChange" placeholder="输入关键字搜索"/>
      </div>
    </div>
    <!-- .filter(data => !search || data.goodsName.toLowerCase().includes(search.toLowerCase())) -->
    <el-table
        ref="filterTable"
        @selection-change="handleSelectionChange"
        height="400"
        :data="commodityData"
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
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
    <!-- <el-button slot="reference" v-if="scope.row.commodityName==''||scope.row.commodityName==null">+</el-button> -->
    <div class="but">
        <el-button @click="addGroup" slot="reference">确认添加</el-button>
    </div>
  </el-dialog> 
</div>
</template>

<script>
import { addcu } from "@/api/cuxiaoguanli";
import { getGoodsList } from "@/api/cuxiaoguanli";
import { getGoodsTypeList } from "@/api/cuxiaoguanli";
import { getUserInfo } from '@/api/cheduiguanli'
import { getOilsStationInfo } from '@/api/cheduiguanli'
import { getyoulist } from "@/api/cuxiaoguanli";

export default {
  name: 'CommodityApplication',
  data() {
    return {
      promotionName:'',//促销名称
      promotionType:5,//促销类型
      startDate:'',//开始日期
      endDate:'',//结束日期
      radio: '1',//每天/周循环
      checkList: [],//周1-7
      checked: false,//按时间段是否选中
      startTime:'',//开始时间
      endTime:'',//结束时间
      reason:'',//促销原因
      mode:[],//促销支付方式
      frequency:'',//促销次数限制1、无限制2、天/次3、总/次
      totalTimes:'',//总/次
      dayTimes:'',//天/次
      //规则说明临时表格数据
      ruleData: [],
      search:'',//关键字查询,
      commodityType:['全部','包装饮料','面包'],//商品类型
      //商品列表
      commodityData:[],
        multipleSelection: [],//添加的商品列表暂存器
        dialogFormVisible:false,//控制添加商品是否隐藏
        show:false,//控制添加商品是否隐藏
        shows:false,//控制商品组商品添加框隐藏与显示
        giftGoodsVisible:false,//赠品添加框控制显示与隐藏
        xuanType:'',//选中的商品类型
        num:'',//第几行要添加商品
        //促销类型选择
        typeOptions: [{
          value: 6,
          label: '商品满数量，单价立减'
        }, {
          value: 12,
          label: '商品满数量，限定内商品总价立减'
        }, {
          value: 11,
          label: '商品单价立减'
        }, {
          value: 10,
          label: '商品卖赠促销'
        }, {
          value: 5,
          label: '商品订单满金额，总价立减'
        }, {
          value: 9,
          label: '商品订单满金额，总价百分比优惠'
        }, {
          value: 8,
          label: '商品订单满金额，赠送指定商品'
        }, {
          value: 7,
          label: '最低价免费'
        }],
        shangtypeOptions:[
          {
            id: 6,
            goodsType: '饮料'
          }
        ],
        //油站选择
        stationOptions: [],
        station:[],//加油站
        indexs:'',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isDisabled:true,
        timeDisabled:true,
        disabledButton:false,
        filter:'',
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
      getUserInfo(data)
        .then(response => {
          console.log('信息')
          console.log(response.data)
          var id = response.data.companyId
          var a = {
            companyId:id,
          }
          getyoulist(a)
            .then(response => {
              console.log('油站列表')
              console.log(response.data)
              this.stationOptions = response.data
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
        commodity:{
          goodsName:''
        },//商品
        barCode:'',//条码
        volume:'',//促销数量
        amount:'',//优惠金额
        giftGoods:[{
          goodsName:'',//赠送商品名
          company:'',//单位
        }],//赠送商品
        donationQuantity:'',//赠送数量
        promotionalAmount:'',//促销金额
        discount:'',//优惠折扣
        ruleDescription:'',//规则说明
        commodityGroup:[],//商品组
      }
      this.ruleData.push(obj)
    },  
    //删除行
    del(index,row){
      this.ruleData.splice(index, 1); 
    },
    changeType(){
      this.ruleData=[]
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
            response.data.forEach(item => {
              item.checked = false
            })
            this.commodityData = response.data
          })
      },
    //添加商品
    addcommodity(){
      this.dialogFormVisible=false
      if(this.multipleSelection.length>0){
        this.ruleData=this.multipleSelection
        for(var i=0;i<this.ruleData.length;i++){
          this.ruleData[i].giftGoods=[{
            goodsName:'',//赠送商品名
          }]
        }
        this.multipleSelection=[]
      }
    },
    //添加赠品商品
    addgiftGoods(){
      this.giftGoodsVisible=false
      this.commodityData.forEach(item => {
        if (item.checked) {
          console.log(item)
          // this.ruleData[this.indexs].commodity = JSON.parse(JSON.stringify(item));
          this.ruleData[this.num].giftGoods[0].id = JSON.parse(JSON.stringify(item)).id;
          this.ruleData[this.num].giftGoods[0].goodsName = JSON.parse(JSON.stringify(item)).goodsName;
        }
      })
      // if(this.multipleSelection.length>0){
      //   // this.$forceUpdate();
      //   // vm.$set(this.ruleData[this.num].giftGoods,0,JSON.parse(JSON.stringify(this.multipleSelection[0]))) //这样就能被vue监控到，更新视图    
      //   this.ruleData[this.num].giftGoods[0].id = JSON.parse(JSON.stringify(this.multipleSelection[0])).id;
      //   this.ruleData[this.num].giftGoods[0].goodsName = JSON.parse(JSON.stringify(this.multipleSelection[0])).goodsName;
        
      //   console.log(this.ruleData[this.num].giftGoods[0])
      //   this.multipleSelection=[]
      // }
    },
    //商品组添加商品
    addGroup(){
      this.shows=false
      if(this.multipleSelection.length>0){
        for(var i=0;i<this.multipleSelection.length;i++){
          this.ruleData[0].commodityGroup.push(this.multipleSelection[i])
        }
        this.multipleSelection=[]
      }
    },
    //商品组删除商品
    delGroup(index){
      console.log(index)
      this.ruleData[0].commodityGroup.splice(index, 1); 
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
    //返回上一页
    prev(){
      this.$router.go(-1)
    },
    //筛选
    handleFilter() {
      
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
      if (this.station.length==0) {
        this.$message({
          message: '请选择促销油站',
          type: 'warning'
        });
        return
      }else{
        var stationList = []
        for (let i = 0; i < this.station.length; i++) {
          stationList.push({
            stationId:this.station[i]
          })
        }
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
      // console.log(document.querySelectorAll('.shuoming')[0].innerHTML)
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
       if(this.promotionType==5){
        for(let i=0;i<this.ruleData.length;i++){
          if (this.ruleData[i].promotionalAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].amount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠金额',
              type: 'warning'
            });
            return
          }
          typeList.push({
            minimumCharge:this.ruleData[i].promotionalAmount,
            discount:this.ruleData[i].amount
          })
        }
       }else if(this.promotionType==6||this.promotionType==12){
         for(let i=0;i<this.ruleData.length;i++){
           if (this.ruleData[i].commodity.id==''||this.ruleData[i].commodity.id==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销商品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].volume<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销数量',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].amount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠金额',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.ruleData[i].commodity.id,
            minimumCharge:this.ruleData[i].volume,
            discount:this.ruleData[i].amount
          })
        }
       }else if(this.promotionType==11){
         for(let i=0;i<this.ruleData.length;i++){
           if (this.ruleData[i].commodity.id==''||this.ruleData[i].commodity.id==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销商品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].amount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠金额',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.ruleData[i].commodity.id,
            discount:this.ruleData[i].amount
          })
        }
       }else if(this.promotionType==10){
         console.log(this.ruleData)
         for(let i=0;i<this.ruleData.length;i++){
           if (this.ruleData[i].commodity.id==''||this.ruleData[i].commodity.id==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择促销商品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].giftGoods[0].id==''||this.ruleData[i].giftGoods[0].id==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择赠送商品',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].volume<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销数量',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].donationQuantity<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的赠送数量',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.ruleData[i].commodity.id,
            discount:this.ruleData[i].volume,
            givingId:this.ruleData[i].giftGoods[0].id,
            givingNum:this.ruleData[i].donationQuantity
          })
        }
       }else if(this.promotionType==9){
         for(let i=0;i<this.ruleData.length;i++){
           if (this.ruleData[i].promotionalAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].discount<=0||this.ruleData[i].discount>100) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的优惠折扣',
              type: 'warning'
            });
            return
          }
          typeList.push({
            minimumCharge:this.ruleData[i].promotionalAmount,
            discount:this.ruleData[i].discount
          })
        }
       }else if(this.promotionType==8){
         for(let i=0;i<this.ruleData.length;i++){
           if (this.ruleData[i].promotionalAmount<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销金额',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].donationQuantity<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的赠送数量',
              type: 'warning'
            });
            return
          }
          if (this.ruleData[i].giftGoods[0].id==''||this.ruleData[i].giftGoods[0].id==null) {
            this.$message({
              message: '第'+(i+1)+'条规则，请选择赠送商品',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:this.ruleData[i].commodityGroup[0].id,
            minimumCharge:this.ruleData[i].promotionalAmount,
            discount:this.ruleData[i].discount
          })
        }
       }else if(this.promotionType==7){
         for(let i=0;i<this.ruleData.length;i++){
           var goodsId = ''
           for (let j = 0; j < this.ruleData[i].commodityGroup.length; j++) {
             goodsId+=this.ruleData[i].commodityGroup[j].id+','
           }
           if(goodsId!=''){
            goodsId = goodsId.substring(0,goodsId.length-1)
           }else{
            this.$message({
              message: '第'+(i+1)+'条规则，请选择商品',
              type: 'warning'
            });
            return
           }
          if (this.ruleData[i].volume<=0) {
            this.$message({
              message: '第'+(i+1)+'条规则，请输入正确的促销数量',
              type: 'warning'
            });
            return
          }
          typeList.push({
            goodsId:goodsId,
            minimumCharge:this.ruleData[i].volume,
          })
        }
       }
       var data = {
         name:this.promotionName,
         activityType:2,
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
         typeList:typeList,
         stationList:stationList
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
    
    addcommodity(index,row){
      this.dialogFormVisible=true
      this.indexs = index
    },
    entcommodity(){
      this.dialogFormVisible = false;
      this.commodityData.forEach(item => {
        if (item.checked) {
          this.ruleData[this.indexs].commodity = JSON.parse(JSON.stringify(item));
        }
      })
      // this.ruleData[this.indexs].commodity = JSON.parse(JSON.stringify(this.multipleSelection[0]));
      console.log(this.ruleData)

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
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
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
.big{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
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