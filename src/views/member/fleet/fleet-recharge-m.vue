<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>车队充值</h3>
        <div class="btn"><el-button type="primary" @click="query">查询</el-button></div>
    </div> 
    <div class="main">
      <div class="footer">
        <div class="jilu">
           <div class="hui">
            <span>主卡卡号/手机号</span>
            <el-input v-model="membership" placeholder="手机号/主卡号/公司名称" style="width:150px;margin-left: 5px;"></el-input>
          </div>
          <div class="hui">
            <span>充值单号</span>
            <el-input v-model="rechargeNum" placeholder="充值单号" style="width:150px;margin-left: 5px;"></el-input>
          </div>
          <div class="chong">
            <span>充值方式</span>
            <el-select v-model="rechargeMode" placeholder="请选择" clearable style="width:150px;margin-left: 5px;">
              <el-option
                v-for="item in rechargeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="di">
            <span>充值地点</span>
            <el-select v-model="rechargePlace" placeholder="请选择"  clearable style="width:150px;margin-left: 5px;">
              <el-option
                v-for="item in rechargePlaceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="zhuang">
            <span>状态</span>
            <el-select v-model="state" placeholder="请选择" clearable style="width:150px;margin-left: 5px;">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>  
          </div>
        </div>
      
        <div class="biao">
          <div class="table">
            <el-table
              :data="tableData"
              stripe
              style="width: 100%">
              <el-table-column
                label="充值单号"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.rechargeNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="主卡号"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.mcardNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="公司名称"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="充值金额"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.rechargeAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="充值方式"
                align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.rechargeType == '1'">微信</span>
                  <span v-show="scope.row.rechargeType == '2'">支付宝</span>
                  <span v-show="scope.row.rechargeType == '3'">银联卡</span>
                  <span v-show="scope.row.rechargeType == '4'">电汇充值</span>
                </template>
              </el-table-column>
              <el-table-column
                label="充值地点"
                min-width="120"
                align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.rechargeType != '1'">{{scope.row.shortName}}</span>
                  <span v-show="scope.row.rechargeType == '1'">微信公众平台</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作人员"
                min-width="100"
                align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.rechargeType != '1'">{{scope.row.creater}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="充值时间"
                min-width="100"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.rechargeTimeStr }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.status == 0">待审核</span>
                  <span v-show="scope.row.status == 1">已完成</span>
                  <span v-show="scope.row.status == -1">退回</span>
                  <span v-show="scope.row.status == -2">已作废</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="80">
                <template slot-scope="scope">
                  <div v-if="scope.row.status==-1">
                    <el-button type="primary" @click="returnSee(scope.$index, scope.row)">查看</el-button>
                  </div>
                  <div v-if="scope.row.status==0">
                    <el-button type="primary" @click="dai(scope.$index, scope.row)">查看</el-button>
                  </div>
                  <div v-if="scope.row.status!=-1&&scope.row.status!=0">
                    <el-button type="primary" v-if="scope.row.rechargeMode=='银联卡'"  @click="cardSee(scope.$index, scope.row)">查看</el-button>
                    <el-button type="primary" v-if="scope.row.rechargeMode!='银联卡'"  @click="weiSee(scope.$index, scope.row)">查看</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              v-show="total>0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-size="limit"
              @pagination="query"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div> 
        </div>
        <!-- 退回充值记录 -->
        <el-dialog :visible.sync="returnVisible" title="交易记录" width="80%">
          <div class="screen">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="box">
                    <div class="left">
                      <span>主卡卡号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardNo}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeTimeStr}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值金额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeAmount}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值金额：</span>                   
                    </div>
                    <div class="right">
                      <el-input v-model="seeData.rechargeAmount" placeholder="" style="width:100px;"></el-input>元
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值地点：</span>                   
                    </div>
                    <div class="right">
                      <span v-if="seeData.rechargeType=='1'">微信公众平台</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值方式：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.rechargeType==1">微信</span>
                      <span v-show="seeData.rechargeType==2">支付宝</span>
                      <span v-show="seeData.rechargeType==3">银联卡</span>
                      <span v-show="seeData.rechargeType == '4'">电汇充值</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>操作人员：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.rechargeType != '1'">{{seeData.creater}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值单号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeNum}}</span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="box">
                    <div class="left">
                      <span>状态：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.status==0">待审核</span>
                      <span v-show="seeData.status==1">已完成</span>
                      <span v-show="seeData.status==2">已审核</span>
                      <span v-show="seeData.status==-1">退回</span>
                      <span v-show="seeData.status==-2">已作废</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>公司名称：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.name}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>核对时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.modifieTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>核对人：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.checkPeople}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>POS流水号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.receiptNum}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>POS流水号：</span>                   
                    </div>
                    <div class="right">
                      <el-input v-model="seeData.memberId" placeholder="" style="width:100px;"></el-input>元
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>备注：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.remark}}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary">已作废</el-button>
            <el-button type="primary" @click="returnVisible = false">关闭</el-button>
            <el-button  type="primary">重新提交</el-button>
          </div>
        </el-dialog> 
        <!-- 银联卡充值记录 -->
        <el-dialog :visible.sync="cardVisible" title="交易记录" width="80%">
          <div class="screen">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="box">
                    <div class="left">
                      <span>主卡卡号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardNo}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeTimeStr}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值金额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeAmount}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>账户余额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardAmount}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值地点：</span>                   
                    </div>
                    <div class="right">
                      <span v-if="seeData.rechargeType=='1'">微信公众平台</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值方式：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.rechargeType==1">微信</span>
                      <span v-show="seeData.rechargeType==2">支付宝</span>
                      <span v-show="seeData.rechargeType==3">银联卡</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>操作人员：</span>                   
                    </div>
                    <div class="right">
                      <span>无</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>银行回执单号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.receiptNum}}</span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="box">
                    <div class="left">
                      <span>状态：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.status==0">待审核</span>
                      <span v-show="seeData.status==1">已完成</span>
                      <span v-show="seeData.status==2">已审核</span>
                      <span v-show="seeData.status==-1">退回</span>
                      <span v-show="seeData.status==-2">已作废</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>公司名称：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.name}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>核对时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.modifieTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>主卡余额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardAmount}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>银行回执单照片</span>                   
                    </div>
                    <div class="right">
                      
                    </div>
                  </div>
                  <div class="box">
                    <img src="../../../images/huizhi.jpg" alt="">
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cardVisible = false">取消</el-button>
            <el-button  type="primary">确认</el-button>
          </div>
        </el-dialog> 
        <!-- 微信/支付宝充值记录 -->
        <el-dialog :visible.sync="weiVisible" title="交易记录" width="80%">
          <div class="screen">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="box">
                    <div class="left">
                      <span>主卡卡号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardNo}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeTimeStr}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值金额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeAmount}}</span>
                    </div>
                  </div>
                  
                  <div class="box">
                    <div class="left">
                      <span>充值地点：</span>                   
                    </div>
                    <div class="right">
                      <span v-if="seeData.rechargeType=='1'">微信公众平台</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>状态：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.status==0">待审核</span>
                      <span v-show="seeData.status==1">已完成</span>
                      <span v-show="seeData.status==2">已审核</span>
                      <span v-show="seeData.status==-1">退回</span>
                      <span v-show="seeData.status==-2">已作废</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>公司名称：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.name}}</span>
                    </div>
                  </div>
                  
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="box">
                    <div class="left">
                      <span>充值方式：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.rechargeType==1">微信</span>
                      <span v-show="seeData.rechargeType==2">支付宝</span>
                      <span v-show="seeData.rechargeType==3">银联卡</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>操作人员：</span>                   
                    </div>
                    <div class="right">
                      <span>无</span>
                    </div>
                  </div>
                  <!-- <div class="box">
                    <div class="left">
                      <span>充值流水号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeNum}}</span>
                    </div>
                  </div> -->
                  <div class="box">
                    <div class="left">
                      <span>账户余额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.accountAmount}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值单号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeNum}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>主卡余额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardAmount}}</span>
                    </div>
                  </div>
                  
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="weiVisible = false">关闭</el-button>
            <!-- <el-button  type="primary">确认</el-button> -->
          </div>
        </el-dialog> 
        <!-- 待审核充值记录 -->
        <el-dialog :visible.sync="daiVisible" title="交易记录" width="80%">
          <div class="screen">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="box">
                    <div class="left">
                      <span>主卡卡号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.mcardNo}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeTimeStr}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值金额：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeAmount}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值地点：</span>                   
                    </div>
                    <div class="right">
                      <span v-if="seeData.rechargeType=='1'">微信公众平台</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值单号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeNum}}</span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <div class="box">
                    <div class="left">
                      <span>状态：</span>                   
                    </div>
                    <div class="right">
                      <span v-show="seeData.status==0">待审核</span>
                      <span v-show="seeData.status==1">已完成</span>
                      <span v-show="seeData.status==2">已审核</span>
                      <span v-show="seeData.status==-1">退回</span>
                      <span v-show="seeData.status==-2">已作废</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>充值方式：</span>                   
                    </div>
                    <div class="right">
                      <span v-if="seeData.rechargeType=='1'">微信</span>
                      <span v-if="seeData.rechargeType=='2'">支付宝</span>
                      <span v-if="seeData.rechargeType=='3'">银联卡</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>公司名称：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.name}}</span>
                    </div>
                  </div>
                  <!-- <div class="box">
                    <div class="left">
                      <span>核对时间：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.rechargeDate}}</span>
                    </div>
                  </div> -->
                  <!-- <div class="box">
                    <div class="left">
                      <span>核对人：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.checkPeople}}</span>
                    </div>
                  </div> -->
                  <div class="box">
                    <div class="left">
                      <span>POS流水号：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.receiptNum}}</span>
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>操作人员：</span>                   
                    </div>
                    <div class="right">
                      <span>无</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tuiVisible = true">退回</el-button>
            <el-button type="primary" @click="daiVisible = false">关闭</el-button>
           
          </div>
        </el-dialog> 
        <!-- 待审核退回弹窗 -->
        <el-dialog :visible.sync="tuiVisible" title="交易记录" width="50%">
          <div class="screen tuihui">
            <el-input v-model="remark" placeholder="请输入退回原因" style="width:357px;"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="tuiVisible = false">取消</el-button>
            <el-button  type="primary" @click="tuiH">确认</el-button>
          </div>
        </el-dialog> 
      </div>
    </div>
  </div>
</template>

<script>
import { jiaocha } from '@/api/cheduiguanli'

export default {
  data() {
    return {
      search:'',//搜索
      membershipNumber:'',//会员号
      contacts:'',//联系人
      unitName:'',//单位名称
      mobileNumber:'',//手机号
      membershipLevel:'',//会员等级
      integral:'',//积分
      accountBalance:'',//账户余额
      membership:'',//会员号/会员名称
      rechargeMode:'',//充值方式
      rechargeOptions:[{
        value: '',
        label: '全部'
      },{
        value: '1',
        label: '微信'
      }, {
        value: '2',
        label: '支付宝'
      }, {
        value: '3',
        label: '银联卡'
      }, {
        value: '4',
        label: '电汇充值'
      },],
      rechargePlace:'',//充值地点
      state:'',//状态
      tableData:[],
      //查看数据
      seeData:{

      },
      returnVisible:false,//控制退回查看框显示与隐藏
      cardVisible:false,//控制银联卡充值交易记录查看框显示与隐藏
      weiVisible:false,//控制微信/支付宝充值交易记录查看框显示与隐藏
      daiVisible:false,//控制待审核交易记录查看框显示与隐藏
      tuiVisible:false,//控制待审核退回弹窗框显示与隐藏
      remark:'',//退回原因
      rechargePlaceOptions:[ {
        
      },],
      stateOptions:[{
        value: '',
        label: '全部'
      },{
        value: '0',
        label: '待审核'
      },{
        value: '1',
        label: '已完成'
      },{
        value: '-1',
        label: '退回'
      },{
        value: '-2',
        label: '作废'
      }],//
      rechargeNum:'',//充值单号
      //分页
      total: 0,
      page: 1,
      limit: 10,
      currentPage: 1,
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    // get(){
    //   this.$http
    //     .post('http://192.168.0.129:8080/motorcade/queryMotorcadeForRechargeList',
    //     {
          
    //     },
    //     {
    //       headers:{
    //         'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
    //       }
    //     })
    //     .then(function(res){
    //       console.log('提交成功')
    //       console.log(res.body)
    //       console.log(res.body.tbMotorcadeRechargeList)
    //       this.tableData = res.body.tbMotorcadeRechargeList
    //     })
    //     .catch(function(err){
    //       console.log('提交失败')
    //       console.log(err)
    //       // this.$message.error('获取失败');
    //     })
    // },
    query(){
      var data = {
        "mcardNo":this.membership,
        "status":this.state,
        "rechargeNum": this.rechargeNum,
        "rechargeType": this.rechargeMode,
        "pageNum": this.page,
        "pageSize": this.limit
      }
      jiaocha(data)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.tbMotorcadeRechargeList.rows
          this.total = response.data.tbMotorcadeRechargeList.total
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.query();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.query();
    },
    returnSee(index,row){
      this.returnVisible = true
      this.seeData = row
    },
    cardSee(index,row){
      this.cardVisible = true
      this.seeData = row
    },
    weiSee(index,row){
      this.weiVisible = true
      this.seeData = row
    },
    dai(index,row){
      this.daiVisible = true
      this.seeData = row
    },
    queren(){
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/updateMotorcadeReChargeById',
      //   {
      //     "id":this.seeData.id,
      //     "status":1
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     this.daiVisible = false
      //     this.get()
      //     this.$message({
      //       message: '入账成功',
      //       type: 'success'
      //     });
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     this.$message.error('入账失败');
      //   })
    },
    tuiH(){
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/updateMotorcadeReChargeById',
      //   {
      //     "id":this.seeData.id,
      //     "status":-1,
      //     "remark":this.remark
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     this.daiVisible = false
      //     this.tuiVisible = false
      //     this.get()
      //     this.$message({
      //       message: '退回成功',
      //       type: 'success'
      //     });
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     this.$message.error('退回失败');
      //   })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
}
.main{
  min-height: calc(100vh - 181px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
  display: flex;
  justify-content: space-between;
}
.header h3{
  display: inline-block;
  width: 100px;
  line-height: 60px;
  margin: 0;
}
.header h3 span{
	display: inline-block;
	width: 3px;
	height: 25px;
	vertical-align: middle;
	background-color: #5B8DFF;
	margin-right: 5px;
}
.sou{
  display: inline-block;
  margin-left: 50px;
  line-height: 60px;
}
.sou .el-button{
  margin-left: 10px;
}
.top{
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  line-height: 36px;
  background-color: #fff;
  color: #606266;
}
// .chong{
//   display: flex;
//   align-items: center;
// }
.jilu{
  color: #606266;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}
.biao{
  padding: 10px;
}
.table{
  border:1px solid #ebeef5;
  // border-bottom: 0;
}
.box{
  margin-bottom: 20px;
}
.box .left,.box .right{
  display: inline-block;
}
.box .left{
  width: 100px;
  text-align: left;
  line-height: 36px;
}
.dialog-footer{
  text-align: center;
}
.dialog-footer .el-button+.el-button{
  margin-left: 200px;
}
.tuihui{
  text-align: center;
}
.btn{
  text-align: right;
  padding: 10px;
}
.el-pagination{
  text-align: center;
  margin: 20px 0;
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
.el-dialog__header{
	text-align: center;
	background-color: #5B8DFF;
	color:#fff;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #fff;
}
.el-dialog__headerbtn .el-dialog__close{
	color: #fff;
}
</style>
