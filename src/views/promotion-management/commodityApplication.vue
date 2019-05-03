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
              <el-select v-model="promotionType" clearable placeholder="请选择" style="width: 280px;">
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
              <el-input v-model="station" placeholder="单行输入" style="width: 200px;"></el-input>
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
                    <span>-</span>
                    <el-time-picker
                      v-model="endTime"
                      :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                      }"
                      style="width: 145px;"
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
             <span class="shuoming" v-if="scope.row.commodityName">{{ scope.row.commodityName }} 购买达到{{scope.row.volume}}{{scope.row.company}}，总价立减{{scope.row.amount}}元</span>
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
             <span class="shuoming" v-if="scope.row.commodityName">{{ scope.row.commodityName }}  单价立减{{scope.row.amount}}元</span>
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
             <span class="shuoming" v-if="scope.row.promotionalAmount">订单满{{scope.row.promotionalAmount}}元，立减{{scope.row.amount}}元</span>
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
             <span class="shuoming" v-if="scope.row.promotionalAmount">订单满{{scope.row.promotionalAmount}}元，优惠{{scope.row.discount}}%</span>
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
             <span class="shuoming" v-if="scope.row.promotionalAmount">订单满{{scope.row.promotionalAmount}}元，赠送{{scope.row.donationQuantity}}{{scope.row.giftGoods[0].company}}{{scope.row.giftGoods[0].commodityName}}</span>
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
             <span class="shuoming" v-if="scope.row.volume">购买商品组内任意商品达到{{scope.row.volume}}{{scope.row.company}}，那么本次组合商品中最低价商品免费</span>
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
  <!-- 商品添加框 -->
  <el-dialog :visible.sync="dialogFormVisible" title="选择商品" width="80%">
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
          <el-select v-model="xuanType"  clearable placeholder="请选择">
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
      reason:'原因：竞争对手xx加油站汽油降价xx元/升，为保住加油站销量，特申请此促销活动。\n 促销方式：92号汽油 加满200元，每升优惠0.2元  加油300元，每升优惠0.3元',//促销原因
      mode:['会员卡'],//促销支付方式
      frequency:'',//促销次数限制1、无限制2、天/次3、总/次
      totalTimes:'',//总/次
      dayTimes:'',//天/次
      //规则说明临时表格数据
      ruleData: [{
        commodity:{
          goodsName:''
        },//商品
        barCode:'',//条码
        volume:'',//促销数量
        amount:'',//优惠金额
        //赠送商品
        giftGoods:[{
          goodsName:'',//赠送商品名
          company:'',//单位
        }],
        donationQuantity:'',//赠送数量
        company:'',//单位
        promotionalAmount:'',//促销金额
        discount:'',//优惠折扣
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元',//规则说明
        commodityGroup:[],//商品组
      }],
      search:'',//关键字查询,
      commodityType:['全部','包装饮料','面包'],//商品类型
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
        indexs:'',
        station:"",
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
          commodityName:'',//赠送商品名
          company:'',//单位
        }],//赠送商品
        donationQuantity:'',//赠送数量
        promotionalAmount:'',//促销金额
        discount:'',//优惠折扣
        ruleDescription:'92号 车用汽油 加油满20升单价立减0.5元',//规则说明
        commodityGroup:[],//商品组
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
      if(this.multipleSelection.length>0){
        // this.$forceUpdate();
        // vm.$set(this.ruleData[this.num].giftGoods,0,JSON.parse(JSON.stringify(this.multipleSelection[0]))) //这样就能被vue监控到，更新视图    
        this.ruleData[this.num].giftGoods[0].id = JSON.parse(JSON.stringify(this.multipleSelection[0])).id;
        this.ruleData[this.num].giftGoods[0].goodsName = JSON.parse(JSON.stringify(this.multipleSelection[0])).goodsName;
        
        console.log(this.ruleData[this.num].giftGoods[0])
        this.multipleSelection=[]
      }
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
                style: 'margin-left: 5px;',
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
       if(this.promotionType==5){
        for(let i=0;i<this.ruleData.length;i++){
          typeList.push({
            minimumCharge:this.ruleData[i].promotionalAmount,
            discount:this.ruleData[i].amount
          })
        }
       }else if(this.promotionType==6||this.promotionType==12){
         for(let i=0;i<this.ruleData.length;i++){
          typeList.push({
            goodsId:this.ruleData[i].id,
            minimumCharge:this.ruleData[i].volume,
            discount:this.ruleData[i].amount
          })
        }
       }else if(this.promotionType==11){
         for(let i=0;i<this.ruleData.length;i++){
          typeList.push({
            goodsId:this.ruleData[i].id,
            discount:this.ruleData[i].amount
          })
        }
       }else if(this.promotionType==10){
         for(let i=0;i<this.ruleData.length;i++){
          typeList.push({
            goodsId:this.ruleData[i].id,
            discount:this.ruleData[i].volume,
            givingId:this.ruleData[i].giftGoods[0].id,
            givingNum:this.ruleData[i].donationQuantity
          })
        }
       }else if(this.promotionType==9){
         for(let i=0;i<this.ruleData.length;i++){
          typeList.push({
            minimumCharge:this.ruleData[i].promotionalAmount,
            discount:this.ruleData[i].discount
          })
        }
       }else if(this.promotionType==8){
         for(let i=0;i<this.ruleData.length;i++){
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
    
    addcommodity(index,row){
      this.dialogFormVisible=true
      this.indexs = index
    },
    entcommodity(){
      this.dialogFormVisible = false;
      this.ruleData[this.indexs].commodity = JSON.parse(JSON.stringify(this.multipleSelection[0]));
      console.log(this.ruleData)

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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