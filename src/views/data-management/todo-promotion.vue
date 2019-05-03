<template>
  <div class="warp">
    <div class="header">
      <h3>
        <el-button circle @click="prev">
          <i class="el-icon-arrow-left"></i>
        </el-button>促销申请
      </h3>
    </div>
    <div class="main">
      <div class="top">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
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
                    <!-- @change="changeType" -->
                  <el-select
                    v-model="promotionType"
                    clearable
                    
                    placeholder="请选择"
                    style="width: 280px;"
                  >
                    <el-option
                      v-for="item in typeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <!-- <div class="inp">
              <div class="left">
                <span>促销油站</span>
              </div>
              <div class="right">
                <span>{{station}}</span>
                <el-input v-model="station" placeholder="单行输入" style="width: 200px;"></el-input>
              </div>
              </div>-->
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
                      v-model="reason"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
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
                          placeholder="选择日期"
                        ></el-date-picker>
                        <span>-</span>
                        <el-date-picker
                          v-model="endDate"
                          style=" width: 145px;"
                          type="date"
                          :picker-options="pickerOptions"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </div>
                      <!-- <el-input v-model="startDate" type="datetime-local" style="width: 200px;"></el-input>
                      <el-input v-model="endDate" type="datetime-local" style="width: 200px;"></el-input>-->
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
                      <div class="left"></div>
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
                          placeholder="请选择"
                        ></el-time-picker>
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
                          placeholder="请选择"
                        ></el-time-picker>
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
                      <el-input
                        v-model="totalTimes"
                        :disabled="frequency!=1"
                        size="mini"
                        :min="1"
                        type="number"
                        placeholder="0"
                        style="width: 100px;"
                      ></el-input>
                      <el-radio v-model="frequency" label="2" style="margin-left: 20px;">总/次</el-radio>
                      <el-input
                        v-model="dayTimes"
                        :disabled="frequency!=2"
                        size="mini"
                        :min="1"
                        type="number"
                        placeholder="0"
                        style="width: 100px;"
                      ></el-input>
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
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <div class="left">
          <p>促销规则</p>
        </div>
        <div class="right">
          <div class="gui">
            <!-- 油品满升数，单价立减 -->
            <el-table v-show="promotionType=='1'" :data="ruleData" stripe style="width: 100%">
              <el-table-column label="油品" align="center" width="180">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.oilsId"
                    clearable
                    placeholder="请选择"
                    style="width: 150px;"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.oils_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="促销数量" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.oilsNum"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>升
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.discountAmount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="规则说明" min-width="265" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-for="(item, index) in oils"
                    :key="index"
                    v-show="scope.row.oilsId==item.id"
                  >{{item.oils_name}} 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>
                  <!-- <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>
                    <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>
                  <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.oilsNum }}升，单价立减{{scope.row.discountAmount}}元</span>-->
                </template>
              </el-table-column>
              <!-- <el-table-column
                    label="操作"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                    </template>
              </el-table-column>-->
              <!-- <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 油品满升数，单价百分比优惠 -->
            <el-table v-show="promotionType=='2'" :data="ruleData" stripe style="width: 100%">
              <el-table-column label="油品" align="center" width="180">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.oilsId"
                    clearable
                    placeholder="请选择"
                    style="width: 150px;"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.oils_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="促销数量" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.oilsNum"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>升
                </template>
              </el-table-column>
              <el-table-column label="优惠折扣" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.discount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>%
                </template>
              </el-table-column>
              <el-table-column label="规则说明" min-width="265" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-for="(item, index) in oils"
                    :key="index"
                    v-show="scope.row.oilsId==item.id"
                  >{{item.oils_name}} 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>
                  <!-- <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 汽油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>         
                    <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>
                    <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>
                  <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.oilsNum }}升，单价优惠{{scope.row.discount}}%</span>-->
                </template>
              </el-table-column>
              <!-- <el-table-column
                    label="操作"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                    </template>
              </el-table-column>-->
              <!-- <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 油品满金额，总价立减 -->
            <el-table v-show="promotionType=='3'" :data="ruleData" stripe style="width: 100%">
              <el-table-column label="油品" align="center" width="180">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.oilsId"
                    clearable
                    placeholder="请选择"
                    style="width: 150px;"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.oils_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="促销金额" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.promotionalAmount"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.discountAmount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="规则说明" min-width="265" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-for="(item, index) in oils"
                    :key="index"
                    v-show="scope.row.oilsId==item.id"
                  >{{item.oils_name}} 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>
                  <!-- <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>         
                    <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>
                    <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>
                  <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.promotionalAmount }}元，总价立减{{scope.row.discountAmount}}元</span>-->
                </template>
              </el-table-column>
              <!-- <el-table-column
                    label="操作"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                    </template>
              </el-table-column>-->
              <!-- <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 油品满金额，总价百分比优惠 -->
            <el-table v-show="promotionType=='4'" :data="ruleData" stripe style="width: 100%">
              <el-table-column label="油品" align="center" width="180">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.oilsId"
                    clearable
                    placeholder="请选择"
                    style="width: 150px;"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.oils_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="促销金额" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.promotionalAmount"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="优惠折扣" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.discount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>%
                </template>
              </el-table-column>
              <el-table-column label="规则说明" min-width="265" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-for="(item, index) in oils"
                    :key="index"
                    v-show="scope.row.oilsId==item.id"
                  >{{item.oils_name}} 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>
                  <!-- <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>         
                    <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>
                    <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 汽油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>
                  <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 柴油 加油满{{ scope.row.promotionalAmount }}元，总价优惠{{scope.row.discount}}%</span>-->
                </template>
              </el-table-column>
              <!-- <el-table-column
                    label="操作"
                    min-width="80"
                    align="center">
                    <template slot-scope="scope">
                        <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                    </template>
              </el-table-column>-->
              <!-- <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品满数量，单价立减 -->
            <el-table :data="ruleData" v-show="promotionType==6" stripe style="width: 100%">
              <el-table-column label="商品" align="center" width="240">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.commodity.goodsName"
                    placeholder="请选择商品"
                    style="width: 150px;"
                  ></el-input>
                  <el-button
                    v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null"
                    @click="addcommodity(scope.$index, scope.row)"
                  >+</el-button>
                </template>
              </el-table-column>
              <el-table-column label="促销数量" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.volume"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>个
                  <!-- {{scope.row.company}} -->
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.amount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-show="scope.row.amount!=''"
                  >{{ scope.row.commodity.goodsName }} 购买{{scope.row.volume}}个以上，单价立减{{scope.row.amount}}元</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品满一定数量，限定数量内的商品总价立减 -->
            <el-table :data="ruleData" v-show="promotionType==12" stripe style="width: 100%">
              <el-table-column label="商品" align="center" width="240">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.commodity.goodsName"
                    placeholder="请选择商品"
                    style="width: 150px;"
                  ></el-input>
                  <el-button
                    v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null"
                    @click="addcommodity(scope.$index, scope.row)"
                  >+</el-button>
                </template>
              </el-table-column>
              <el-table-column label="促销数量" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.volume"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>
                  {{scope.row.company}}
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.amount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305px" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.commodity.goodsName"
                  >{{ scope.row.commodity.goodsName }} 购买达到{{scope.row.volume}}个，总价立减{{scope.row.amount}}元</span>
                  <!-- {{scope.row.company}} -->
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品单价立减 -->
            <el-table :data="ruleData" v-show="promotionType==11" stripe style="width: 100%">
              <el-table-column label="商品" align="center" width="240">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.commodity.goodsName"
                    placeholder="请选择商品"
                    style="width: 150px;"
                  ></el-input>
                  <el-button
                    v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null"
                    @click="addcommodity(scope.$index, scope.row)"
                  >+</el-button>
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.amount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.commodity.goodsName"
                  >{{ scope.row.commodity.goodsName }} 单价立减{{scope.row.amount}}元</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品卖赠促销 -->
            <el-table :data="ruleData" v-show="promotionType==10" stripe style="width: 100%">
              <el-table-column label="商品" align="center" width="240">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.commodity.goodsName"
                    placeholder="请选择商品"
                    style="width: 150px;"
                  ></el-input>
                  <el-button
                    v-show="scope.row.commodity.goodsName==''||scope.row.commodity.goodsName==null"
                    @click="addcommodity(scope.$index, scope.row)"
                  >+</el-button>
                </template>
              </el-table-column>
              <el-table-column label="促销数量" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.volume"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>
                  {{scope.row.company}}
                </template>
              </el-table-column>
              <el-table-column label="赠送商品" align="center" width="240">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.giftGoods[0].goodsName"
                    placeholder="请选择商品"
                    style="width: 150px;"
                  ></el-input>
                  <el-button
                    v-show="scope.row.giftGoods[0].goodsName==''"
                    @click="btn(scope.$index)"
                  >+</el-button>
                </template>
              </el-table-column>
              <el-table-column label="赠送数量" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.donationQuantity"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>
                  {{scope.row.giftGoods[0].company}}
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.volume!=''"
                  >购买 {{ scope.row.commodity.goodsName }} 满{{scope.row.volume}}{{scope.row.company}}，赠送{{scope.row.donationQuantity}}{{scope.row.giftGoods[0].company}}{{scope.row.giftGoods[0].goodsName}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品订单满金额，总价立减 -->
            <el-table :data="ruleData" v-show="promotionType==5" stripe style="width: 100%">
              <el-table-column label="促销金额" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.promotionalAmount"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.amount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.promotionalAmount"
                  >订单满{{scope.row.promotionalAmount}}元，商品总价立减{{scope.row.amount}}元</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品订单满金额，总价百分比优惠 -->
            <el-table :data="ruleData" v-show="promotionType==9" stripe style="width: 100%">
              <el-table-column label="促销金额" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.promotionalAmount"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="优惠折扣" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.discount"
                    type="number"
                    placeholder="0.0"
                    step="0.1"
                    style="width: 100px;"
                  ></el-input>%
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.promotionalAmount"
                  >订单满{{scope.row.promotionalAmount}}元，商品总价优惠{{scope.row.discount}}%</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 商品订单满金额，赠送指定商品 -->
            <el-table :data="ruleData" v-show="promotionType==8" stripe style="width: 100%">
              <el-table-column label="促销金额" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.promotionalAmount"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>元
                </template>
              </el-table-column>
              <el-table-column label="赠送商品" align="center" width="240">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.giftGoods[0].goodsName"
                    placeholder="请选择商品"
                    style="width: 150px;"
                  ></el-input>
                  <el-button
                    v-show="scope.row.giftGoods[0].goodsName==''"
                    @click="btn(scope.$index)"
                  >+</el-button>
                </template>
              </el-table-column>
              <el-table-column label="赠送数量" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.donationQuantity"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>
                  {{scope.row.giftGoods[0].company}}
                </template>
              </el-table-column>
              <el-table-column label="说明" min-width="305" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.promotionalAmount"
                  >订单满{{scope.row.promotionalAmount}}元，赠送{{scope.row.donationQuantity}} 个 {{scope.row.giftGoods[0].goodsName}}</span>
                  <!-- {{scope.row.giftGoods[0].company}} -->
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 最低价免费 -->
            <el-table :data="ruleData" v-show="promotionType==7" stripe style="width: 100%">
              <el-table-column label="商品组" align="center">
                <el-table-column label="商品" align="left">
                  <template slot-scope="scope">
                    <!-- <div class="zu" v-for="(item, index) in scope.row.commodityGroup" :key="index">
                      <span>{{item.goodsName}}</span>
                      <el-button class="jian" @click="delGroup(index)" circle>-</el-button>
                    </div> -->
                    <!-- <el-button circle @click="shows=true">+</el-button> -->
                    <p v-for="(item, index) in scope.row.goodsNameList" :key="index">{{item}}</p>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="促销数量" align="center" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.volume"
                    type="number"
                    placeholder="0"
                    style="width: 100px;"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="说明" align="center">
                <template slot-scope="scope">
                  <span
                    class="shuoming"
                    v-if="scope.row.volume"
                  >购买商品组内任意商品达到{{scope.row.volume}}个，本次组合商品中最低价商品免费1个</span>
                  <!-- {{scope.row.company}} -->
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="70" align="center">
                <template slot-scope="scope">
                  <el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column align="right" width="80" :render-header="renderHeader">
                <template slot="header" slot-scope="scope"></template>
              </el-table-column> -->
            </el-table>
            <!-- 油品满金额，赠送指定数量的便利店商品 -->
            <el-table :data="ruleData" v-show="promotionType==13" stripe style="width: 100%">
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
                <!-- <el-table-column
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
                </el-table-column> -->
            </el-table>
            <!-- 油品满金额，赠送指定金额任意商品 -->
            <el-table :data="ruleData" v-show="promotionType==14" stripe style="width: 100%">
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
                <!-- <el-table-column
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
                </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
      <div class="but">
        <el-button type="primary" v-show="status==0" @click="ent">确认</el-button>
        <el-button type="primary" v-show="status==0" @click="jujueVisible = true">拒绝</el-button>
        <el-button type="primary" @click="prev">关闭</el-button>
        <!-- <el-button type="primary" @click="tijiao">提交</el-button> -->
      </div>
        <!-- 拒绝弹窗 -->
        <el-dialog :visible.sync="jujueVisible" title="拒绝原因" width="50%">
            <div class="jujue">
                <el-input v-model="refuseRemark" placeholder="请输入内容"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="jujue">确认</el-button>
                <el-button type="primary" @click="jujueVisible = false">关闭</el-button>
            </div>
        </el-dialog> 
    </div>
  </div>
</template>

<script>
import { getyoulist } from "@/api/cuxiaoguanli";
import { addcu } from "@/api/cuxiaoguanli";
import { getOilsList } from "@/api/cuxiaoguanli";
import { getUserInfo } from "@/api/cheduiguanli";
import { getOilsStationInfo } from "@/api/cheduiguanli";
import { seexiang } from "@/api/cuxiaoguanli";
import { getGoodsList } from "@/api/cuxiaoguanli";
import { shenpi } from "@/api/cuxiaoguanli";

export default {
  data() {
    return {
      promotionName: "", //促销名称
      promotionType: 1, //促销类型
      startDate: "", //开始日期
      endDate: "", //结束日期
      radio: "", //每天/周循环
      checkList: [], //周1-7
      checked: false, //按时间段是否选中
      startTime: "", //开始时间
      endTime: "", //结束时间
      reason: "", //促销原因
      mode: [], //促销支付方式
      tbOilsPromotionSupportPaymentList: [],
      frequency: "", //促销次数限制0无限制1有限
      totalTimes: "", //总/次
      dayTimes: "", //天/次
      //油品选择
      options: [
        {
            value: "1",
            label: "92号 汽油"
        },
        {
            value: "2",
            label: "95号 汽油"
        },
        {
            value: "3",
            label: "98号 汽油"
        },
        {
            value: "4",
            label: "0号 柴油"
        }
      ],
      //促销类型选择
      typeOptions: [
        {
            value: 1,
            label: "油品满升数，单价立减"
        },
        {
            value: 2,
            label: "油品满升数，单价百分比优惠"
        },
        {
            value: 3,
            label: "油品满金额，总价立减"
        },
        {
            value: 4,
            label: "油品满金额，总价百分比优惠"
        },
        {
            value: 6,
            label: "商品满数量，单价立减"
        },
        {
            value: 12,
            label: "商品满数量，限定内商品总价立减"
        },
        {
            value: 11,
            label: "商品单价立减"
        },
        {
            value: 10,
            label: "商品卖赠促销"
        },
        {
            value: 5,
            label: "商品订单满金额，总价立减"
        },
        {
            value: 9,
            label: "商品订单满金额，总价百分比优惠"
        },
        {
            value: 8,
            label: "商品订单满金额，赠送指定商品"
        },
        {
            value: 7,
            label: "最低价免费"
        },
        {
            value: 13,
            label: '油品满金额，赠送指定数量商品'
        }, 
        {
            value: 14,
            label: '油品满金额，赠送指定金额商品'
        },
      ],
      //规则说明临时表格数据
      ruleData: [],
      station: "", //加油站
      oils: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      isDisabled: true,
      timeDisabled: true,
      commodityData:[], //商品列表
      jujueVisible:false, //拒绝弹框
      refuseRemark:null, //拒绝原因
      status:null, //促销状态
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      var data = {};
      // getyoulist(data)
      //   .then(response => {
      //     console.log('油站列表')
      //     console.log(response.data)
      //   })
      
      getGoodsList(data)
        .then(response => {
          console.log('商品')
          console.log(response.data)
          this.commodityData = response.data
          getOilsList(data).then(response => {
            console.log('油品');
            console.log(response.data);
            this.options = response.data;
            for (let i = 0; i < this.options.length; i++) {
                this.oils.push({
                    id: this.options[i].id,
                    oils_name: this.options[i].oils_name
                });
            }
            seexiang({id:this.$route.query.id}).then(response => {
                console.log("详情");
                console.log(response.data);
                this.status = response.data.detail.status
                this.promotionType = response.data.detail.promotionType
                this.promotionName = response.data.detail.name
                this.reason = response.data.detail.instruction
                this.startDate = new Date(response.data.detail.startDate) 
                this.endDate = new Date(response.data.detail.endDate) 
                this.checkList = []
                for (let i = 0; i < response.data.detail.daysWeeks.length; i++) {
                    if (response.data.detail.daysWeeks[i]=='每天') {
                        this.radio = '1'
                    }else{
                        this.radio = '2'
                        this.isDisabled = false
                        this.checkList.push(response.data.detail.daysWeeks[i])
                    }
                }
                if (response.data.detail.startTime&&response.data.detail.endTime) {
                    this.checked = true;
                    this.timeDisabled = false
                    this.startTime = response.data.detail.startTime
                    this.endTime = response.data.detail.endTime
                }
                if (response.data.detail.promotionTimes==0) {
                    this.frequency = '0'
                }else if (response.data.detail.promotionTimes==1) {
                    this.frequency = '1'
                    this.totalTimes = response.data.detail.num
                }else if (response.data.detail.promotionTimes==2) {
                    this.frequency = '2'
                    this.dayTimes = response.data.detail.num
                }
                this.mode = []
                for (let i = 0; i < response.data.detail.payTypes.length; i++) {
                    this.mode.push(response.data.detail.payTypes[i])
                }
                this.ruleData = []
                for (let i = 0; i < response.data.detail.typeList.length; i++) {
                    var givingNum = null;
                    var goodsId = null;
                    var minimumCharge = null;
                    var discount = null;
                    var goodsNameList = null;
                    var givingName = null;
                    var goodsName = null;
                    var oilsId = null;
                    if(response.data.detail.typeList[i].givingNum){
                        givingNum = response.data.detail.typeList[i].givingNum
                    }
                    if(response.data.detail.typeList[i].goodsId){
                        oilsId = response.data.detail.typeList[i].goodsId
                        this.commodityData.forEach(t => {
                            if (t.id==response.data.detail.typeList[i].goodsId) {
                                givingName = t.goodsName 
                            }
                        })
                    }
                    if(response.data.detail.typeList[i].minimumCharge){
                        minimumCharge = response.data.detail.typeList[i].minimumCharge
                    }
                    if(response.data.detail.typeList[i].discount){
                        discount = response.data.detail.typeList[i].discount
                    }
                    if(response.data.detail.typeList[i].discount){
                        discount = response.data.detail.typeList[i].discount
                    }
                    if(response.data.detail.typeList[i].goodsNameList){
                        goodsNameList = response.data.detail.typeList[i].goodsNameList
                    }
                    if(response.data.detail.typeList[i].givingName){
                        givingName = response.data.detail.typeList[i].givingName
                    }
                    if(response.data.detail.typeList[i].goodsName){
                        goodsName = response.data.detail.typeList[i].goodsName
                    }
                    this.ruleData.push({
                        oilsId:oilsId,
                        oilsNum:minimumCharge,
                        discountAmount:discount,
                        promotionalAmount:minimumCharge,
                        amount:discount,
                        volume:discount || minimumCharge,
                        donationQuantity:givingNum,
                        discount:discount,
                        goodsNameList:goodsNameList,
                        quantity: givingNum,
                        giftAmount:discount,
                        commodity:{
                            goodsName:goodsName,
                        },
                        giftGoods:[{
                            goodsName:givingName,
                        }],
                    })
                }
                console.log(this.ruleData)
            });
        });
    })
      getUserInfo(data).then(response => {
        // console.log('信息')
        // console.log(response.data.belong_id)
        var id = response.data.belong_id;
        var data = {
          id: id
        };
        getOilsStationInfo(data).then(response => {
          console.log("油站");
          console.log(response.data);
          // stationInfo
          this.station = response.data.stationInfo.shortName;
        });
      });
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },
    //确认审核
    ent(){
      var data = {
        id:this.$route.query.id,
        applyResult:1
      }
      shenpi(data)
        .then(response => {
          console.log(response.data)
          this.$message({
            message: '审批成功',
            type: 'success'
          });
          this.prev()
        })
    },
    //拒绝审核
    jujue(){
      var data = {
        id:this.$route.query.id,
        applyResult:-1,
        refuseRemark:this.refuseRemark
      }
      shenpi(data)
        .then(response => {
          console.log(response.data)
          this.$message({
            message: '拒绝成功',
            type: 'success'
          });
          this.jujueVisible = false
          this.prev()
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
    // 自定义表达头+
    renderHeader(h, { column, $index }){
        // var that=this
        // return h('span', [
        //     h('span', column.label),
        //     h('el-button',
        //         {
        //             style: 'margin-left: 5px;',
        //             on: {
        //                 click: that.add
        //             }
        //     },['+']),
        // ]);
    },
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.inp {
  margin-bottom: 20px;
}
.left,
.right {
  display: inline-block;
}
.inp .left {
  // width: 115px;
  text-align: right;
}
.t {
  // width: 115px;
  vertical-align: top;
  text-align: right;
  line-height: 36px;
}
.inp .right {
  padding-left: 10px;
}
.shijian {
  vertical-align: top;
  line-height: 36px;
}
.date .inp .left {
  width: 115px;
  text-align: left;
  padding-left: 30px;
}
.text p {
  margin: 0;
  line-height: 36px;
  color: #606266;
  font-size: inherit;
}
.kuang {
  width: 200px;
  border: 1px solid gray;
  padding: 5px;
}
.kuang .el-checkbox {
  margin-left: 0;
  margin-right: 25px;
}
.footer {
  padding: 10px 0;
}
.but {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.but button + button {
  margin-left: 100px;
}
.gui {
  border: 1px solid #e4e8f4;
  border-bottom: 0;
}
select {
  width: 110px;
  padding: 2px;
  border-radius: 8px;
}
#zhan {
  width: 200px;
}
.ipt .wu {
  text-align: left;
  padding-left: 30px;
}
.zhifu {
  margin-left: 30px;
}
.zi button {
  border: 0;
}
.footer .right {
  width: 90%;
  padding-left: 10px;
}
.footer .left {
  text-align: right;
  vertical-align: top;
  padding-left: 1.5%;
}
.footer .left p {
  margin: 0;
  line-height: 36px;
}
.warp {
  background-color: #f6f7fb;
  // padding: 2%;
}
.main {
  min-height: calc(100vh - 214px);
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding-top: 30px;
}
.header {
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  height: 60px;
  padding-left: 1%;
}
.header h3 {
  line-height: 60px;
  margin: 0;
}
.bg-purple {
  padding-left: 3%;
}
.bg-purple-light .inp .right {
  padding-left: 0;
  line-height: 36px;
}
</style>
<style>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
  background-color: #f5f9fc;
}
h3 .el-button--medium.is-circle {
  border: 0;
}
.el-checkbox + .el-checkbox {
  margin-left: 6px;
}
.date .left .el-checkbox {
  margin: 0;
}
.date .el-checkbox__label,
.zhifu .el-checkbox__label {
  padding-left: 5px;
}
</style>
 