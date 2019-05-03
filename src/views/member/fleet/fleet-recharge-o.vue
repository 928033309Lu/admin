<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>车队充值</h3>
      <div class="sou">
        <el-input v-model="search" clearable placeholder="手机号/主卡号/公司名称" style="width:200px;"></el-input>
        <el-button type="primary"  @click="seh">搜索</el-button>
      </div>
      
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <div class="shang">
            <span>主卡卡号：{{membershipNumber}}</span>
          </div>
          <div class="xia">
            <span>管理员：{{contacts}}</span>
          </div>
        </div>
        <div class="box">
          <div class="shang">
            <span>公司名称：{{unitName}}</span>
          </div>
          <div class="xia">
            <span>手机号：{{mobileNumber}}</span>
          </div>
        </div>
        <div class="box">
          <div class="shang">
            <!-- <span>会员等级：{{membershipLevel}}</span> -->
            <span>账户余额：{{accountBalance}}元</span>
          </div>
          <div class="xia">
            <!-- <span>积分：{{integral}}分</span> -->
            <span>主卡余额：{{cardAmount}}元</span>
          </div>
        </div>
        <div class="box">
          <div class="shang">
            <!-- <span>账户余额：{{accountBalance}}元</span> -->
            <!-- <span>管理员身份证号：{{documentNo}}</span> -->
          </div>
          <div class="xia chong">
            <el-button type="primary" @click="chongZhi">充值</el-button>
          </div>
        </div>
        <!-- <div class="box chong">
          
        </div> -->
      </div>
      <div class="footer">
        <div class="header">
          <h3><span></span>交易记录</h3>
            <div class="btn"><el-button type="primary" @click="query">查询</el-button></div>
        </div> 
        <div class="jilu">
          <div class="dan">
            <span>充值单号</span>
            <el-input v-model="rechargeNum" placeholder="" style="width:150px;margin-left: 5px;"></el-input>
          </div>
          <div class="hui">
            <span>主卡号/手机号</span>
            <el-input v-model="membership" placeholder="手机/会员号/主卡卡号" style="width:150px;margin-left: 5px;"></el-input>
          </div>
          <div class="chong">
            <span>充值方式</span>
            <el-select v-model="rechargeMode"   placeholder="请选择"   clearable style="width:150px;margin-left: 5px;">
              <el-option
                v-for="item in rechargeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="di">
            <span>充值地点</span>
            <el-select v-model="rechargePlace" placeholder="请选择" style="width:150px;margin-left: 5px;">
              <el-option
                v-for="item in rechargeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div> -->
          <div class="zhuang">
            <span>状态</span>
            <el-select v-model="state"   placeholder="请选择" clearable style="width:150px;margin-left: 5px;">
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
                label="主卡卡号"
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
                  <span v-show="scope.row.rechargeType==1">微信</span>
                  <span v-show="scope.row.rechargeType==2">支付宝</span>
                  <span v-show="scope.row.rechargeType==3">银联卡</span>
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
                  <!-- <span v-show="scope.row.status == 2">已审核</span> -->
                  <span v-show="scope.row.status == -1">退回</span>
                  <span v-show="scope.row.status == -2">已作废</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="80">
                <template slot-scope="scope">
                  <div v-if="scope.row.status==-1">
                    <el-button type="primary" @click="returnSee(scope.$index, scope.row)">查看</el-button>
                  </div>
                  <div v-if="scope.row.status!=-1">
                    <el-button type="primary" v-if="scope.row.rechargeType==3"  @click="cardSee(scope.$index, scope.row)">查看</el-button>
                    <el-button type="primary" v-if="scope.row.rechargeType!=3"  @click="weiSee(scope.$index, scope.row)">查看</el-button>
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
                    </div>
                  </div>
                  <div class="box">
                    <div class="left">
                      <span>操作人员：</span>                   
                    </div>
                    <div class="right">
                      <span>{{seeData.operator}}</span>
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
        <!-- 充值 -->
        <el-dialog :visible.sync="chognzhiVisible" title="充值" width="80%">
          <div class="chongzhi">
            <div class="box">
              <div class="left">
                <span>单位名称</span>
              </div>
              <div class="right">
                <span>{{unitName}}</span>
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span>充值金额</span>
              </div>
              <div class="right">
                <el-radio v-model="chongzhiType" label="1" border>￥5000</el-radio>
                <el-radio v-model="chongzhiType" label="2" border>￥10000</el-radio>
                <el-radio v-model="chongzhiType" label="3" border>
                  其他
                  <el-input v-model="chongzhijine" placeholder="" style="width:100px;margin-left: 5px;"></el-input>
                </el-radio>
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span>支付方式</span>
              </div>
              <div class="right">
                <el-radio v-model="zhifuType" label="3" border>
                  <img src="@/images/yinhangka.jpg" alt="">
                  银联卡
                </el-radio>
                <el-radio v-model="zhifuType" label="2" border>
                  <img src="@/images/zhifubao.jpg" alt="">
                  支付宝
                </el-radio>
                <el-radio v-model="zhifuType" label="1" border>
                  <img src="@/images/weixin.jpg" alt="">
                  微信
                </el-radio>
              </div>
            </div>
            <div class="box" v-show="zhifuType=='3'">
              <div class="left">
                <span>POS流水号</span>
              </div>
              <div class="right">
                <el-input v-model="rechargeNum" placeholder="" style="width:200px;"></el-input>
              </div>
            </div>
            <div class="box">
              <div class="left">
                <span>订单金额</span>
              </div>
              <div class="right">
                <span class="ding">
                  <span v-if="chongzhiType=='1'">5000</span>
                  <span v-else-if="chongzhiType=='2'">10000</span>
                  <span v-else>{{chongzhijine}}</span>
                </span>元
              </div>
            </div>
            <div class="wei" v-show="erweimaShow&&zhifuType==1">
              <img :src="erweimaSrc" alt="">
            </div>
            <!-- <div class="wei" v-show="zhifuType=='1'">
              <p>扫码支付</p>
              <img src="@/images/chognzhierweima.jpg" alt="">
              <p>使用<span class="red">微信</span>APP扫码完成支付</p>
            </div> -->
            <!-- <div class="zhi" v-show="zhifuType=='2'">
              <p>扫码支付</p>
              <img src="@/images/chognzhierweima.jpg" alt="">
              <p>使用<span class="red">支付宝</span>APP扫码完成支付</p>
            </div> -->
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="chognzhiVisible = false">取消</el-button>
            <el-button  type="primary" @click="recharge">确认</el-button>
          </div>
        </el-dialog> 
      </div>
    </div>
  </div>
</template>

<script>
import { shousuo } from '@/api/cheduiguanli'
import { jiaocha } from '@/api/cheduiguanli'
import { chongzhi } from '@/api/cheduiguanli'

export default {
  data() {
    return {
      search:'',//搜索
      membershipNumber:'',//会员号
      contacts:'',//联系人
      unitName:'',//单位名称
      mobileNumber:'',//手机号
      membershipLevel:'',//会员等级
      cardAmount:'',//主卡余额
      integral:'',//积分
      accountBalance:'',//账户余额
      membership:'',//会员号/会员名称
      rechargeMode:'',//充值方式
      documentNo:'',//管理员身份证号
      rechargeNum:'',//充值单号
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
      state:"",//状态
      tableData:[],
      //查看数据
      seeData:{

      },
      returnVisible:false,//控制退回查看框显示与隐藏
      cardVisible:false,//控制银联卡充值交易记录查看框显示与隐藏
      weiVisible:false,//控制微信/支付宝充值交易记录查看框显示与隐藏
      chognzhiVisible:false,//控制充值框显示与隐藏
      chongzhijine:'0',//充值金额
      chongzhiType:'',//充值类型
      zhifuType:'',//支付类型
      dingdanjine:'',//订单金额
      rechargeNum:'',//充值单号
      memberId:'',//管理员id
      motorcadeId:'',//车队id
      mcardId :"",//主卡id
      erweimaSrc:'',//微信二维码
      erweimaShow:false,
      rechargePlaceOptions:[ {
        
      },],
      stateOptions:[ {
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
      //分页
      total: 0,
      page: 1,
      limit: 10,
      currentPage: 1,
      rechargeNum1:'',//查询充值单号
    }
  },
  mounted(){
    this.query()
  },
  methods: {
    seh(){
      // if(this.search==''){
      //   return
      // }
      var data = {
        "condition":this.search,
      }
      console.log('传参')
      console.log(data)
      shousuo(data)
        .then(response => {
          console.log(response.data)
          // if(response.data=="{}"){
          //   this.$message({
          //     message: '未搜索到相关车队',
          //     type: 'warning'
          //   });
          // }
          if (response.data.tbMotorcadeInfo) {
            this.membershipNumber=response.data.tbMotorcadeInfo.cardNo
            this.contacts=response.data.tbMotorcadeInfo.username
            this.cardAmount=response.data.tbMotorcadeInfo.cardAmount
            // this.contacts=response.data.tbMotorcadeInfo.username
            this.mobileNumber=response.data.tbMotorcadeInfo.phone
            this.accountBalance=response.data.tbMotorcadeInfo.totalAmount
            this.documentNo=response.data.tbMotorcadeInfo.documentNo
            this.memberId=response.data.tbMotorcadeInfo.memberId
            this.motorcadeId=response.data.tbMotorcadeInfo.id
            this.unitName=response.data.tbMotorcadeInfo.name
            this.mcardId = response.data.tbMotorcadeInfo.mcardId
          }else{
            this.$message({
              message: '未搜索到相关车队',
              type: 'warning'
            });
          }
          
        })
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/queryMotorcadeForRecharge',
      //   {
      //     "cardNo":this.search
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     console.log(res.body.tbMotorcadeInfo)
      //     this.membershipNumber=res.body.tbMotorcadeInfo.cardNo
      //     this.contacts=res.body.tbMotorcadeInfo.username
      //     this.cardAmount=res.body.tbMotorcadeInfo.cardAmount
      //     // this.contacts=res.body.tbMotorcadeInfo.username
      //     this.mobileNumber=res.body.tbMotorcadeInfo.phone
      //     this.accountBalance=res.body.tbMotorcadeInfo.totalAmount
      //     this.documentNo=res.body.tbMotorcadeInfo.documentNo
      //     this.memberId=res.body.tbMotorcadeInfo.memberId
      //     this.motorcadeId=res.body.tbMotorcadeInfo.id
      //     this.unitName=res.body.tbMotorcadeInfo.name
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     this.$message.error('获取失败');
      //   })
    },
    chongZhi(){
      if (this.motorcadeId!=''&&this.mcardId!='') {
        this.chognzhiVisible = true
      }else{
        this.$message({
          message: '请先选择一个正确的车队',
          type: 'warning'
        });
      }
    },
    query(){
      var data = {
          "mcardNo":this.membership,
          "status":this.state,
          "rechargeNum": this.rechargeNum1,
          "rechargeType": this.rechargeMode,
          "pageNum": this.page,
          "pageSize": this.limit
        }
        jiaocha(data)
          .then(response => {
            console.log(response.data)
            this.total = response.data.tbMotorcadeRechargeList.total;
            this.tableData = response.data.tbMotorcadeRechargeList.rows
          })
      
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/queryMotorcadeForRechargeList',
      //   {
      //     "mcardNo":this.membership,
      //     "status":this.state,
      //     "rechargeNum": this.rechargeNum,
      //     "rechargeType": this.rechargeMode
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     console.log(res.body.tbMotorcadeRechargeList)
      //     this.tableData = res.body.tbMotorcadeRechargeList
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     this.$message.error('获取失败');
      //   })
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
    recharge(){
      if(this.chongzhiType=='1'){
        var rechargeAmount = 5000
      }else if(this.chongzhiType=='2'){
        var rechargeAmount = 10000
      }else{
        var rechargeAmount = Number(this.chongzhijine) 
      }
      var data = {
          "rechargeType": Number(this.zhifuType),
          "rechargeAmount": rechargeAmount,
          "motorcadeId": this.motorcadeId,
          "mcardId ": this.mcardId,
        }
      chongzhi(data)
        .then(response => {
          console.log(response.data)
          if(response.data&&this.zhifuType==2){
            console.log(response.data.data);
            var div=document.createElement('divform');
            div.innerHTML=response.data.data;
            console.log("1");
            document.querySelector('.wei').appendChild(div);
            console.log(document);
            // console.log(document.forms);
            document.forms[0].acceptCharset='GBK';
            console.log("3");
            //document.forms[0].submit();
            document.forms['punchout_form'].submit();
            console.log("4");
				  }else if(response.data&&this.zhifuType==1){
            console.log(response.data)
            this.erweimaSrc = response.data
            this.erweimaShow = true
          }
        })
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/insertMotorcadeForRecharge',
      //   {
      //     "receiptNum": this.rechargeNum,
      //     "rechargeType": Number(this.zhifuType),
      //     "rechargeAmount": rechargeAmount,
      //     "motorcadeAdminId": this.memberId,
      //     "motorcadeId": this.motorcadeId,
      //     "mcardNo": this.membershipNumber,
      //     "accountAmount": this.accountBalance,
      //     "beforeMcardAmount": this.cardAmount,
      //     "status": 0,
      //     "rechargeTime": new Date(),
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     console.log(res.body)
      //     this.$message({
      //     message: '请等待核对',
      //     type: 'success'
      //   });
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     this.$message.error('充值失败');
      //   })
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
}
.main{
  min-height: calc(100vh - 181px);
  // background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
  
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
.chong{
  display: flex;
  align-items: center;
}
.jilu{
  color: #606266;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  
}
.footer{
  background-color: #fff;
  margin-top: 20px;
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
.right img{
  width: 20px;
  vertical-align: middle;
}
.ding{
  color: red;
  font-size: 18px
}
.chongzhi{
  position: relative;
  margin-bottom: 135px;
}
.wei,.zhi{
  width: 220px;
  height: 220px;
  text-align: center;
  position: absolute;
  bottom: -100px;
  left: 540px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.wei img{
  width: 100%;
}
.red{
  color: red;
}
.btn{
  float: right;
  padding: 10px;
  display: inline-block;
    
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
.chongzhi .el-radio--medium.is-bordered{
  padding: 0 20px 0 10px; 
  height: 54px;
  line-height: 54px;
}
.chongzhi .el-input--medium .el-input__inner{
  /* height: 24px; */
}
</style>
