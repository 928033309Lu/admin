<template>
    <div class="warp publicWarp">
        <div class="header publicHead">
                <h3>交易记录</h3>
        </div>
        <div class="main publicMain">
            <div class="publicScreen">
                <el-form ref="form" label-width="100px">
                    <el-row>
                        <!-- <el-col :span="6">
                            <el-form-item label="公司" label-width="80px">
                                <el-select @change="change" clearable v-model="company" placeholder="请选择">
                                    <el-option
                                        v-for="item in companyOptions"
                                        :key="item.id"
                                        :label="item.company_name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="6">
                            <el-form-item label="油枪号">
                                <el-select clearable @change="chaxun" v-model="oilgun" placeholder="请选择">
                                    <el-option
                                        v-for="item in oilgunOptions"
                                        :key="item.id"
                                        :label="item.oilGunNo"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="支付方式">
                                <el-select v-model="zhifufangshi" @change="chaxun" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in zhifufangshiOptions"
                                        :key="item.value"
                                        :label="item.lable"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="商品类型">
                                <el-select v-model="shangpinType" @change="chaxun" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.lable"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    
                        <el-col :span="6">
                            <el-form-item label="油站" label-width="80px">
                                <el-select clearable @change="stationChange" v-model="station" placeholder="请选择">
                                    <el-option
                                        v-for="item in stationOptions"
                                        :key="item.id"
                                        :label="item.shortName"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="收银机">
                                <el-select v-model="deviceId" @change="chaxun" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in youqiangOptions"
                                        :key="item.id"
                                        :label="item.device_name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交易类型">
                                <el-select v-model="jiaoyi" @change="chaxun" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in jiaoyiOptions"
                                        :key="item.value"
                                        :label="item.lable"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交易流水号">
                                <el-input
                                    v-model="jiaoyiliushuihao"
                                    placeholder="请输入内容"
                                    @change="chaxun"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    
                        <el-col :span="6">
                            <el-form-item label="日期" label-width="80px">
                                <el-date-picker
                                    v-model="date"
                                    type="daterange"
                                    unlink-panels
                                    range-separator="-"
                                    start-placeholder="开始"
                                    end-placeholder="结束"
                                    :picker-options="pickerOptions2"
                                    @change="chaxun"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="金额">
                                <el-row style="max-width: 200px">
                                    <el-col :span="11">
                                        <el-input v-model="jineqian" placeholder></el-input>
                                    </el-col>
                                    <el-col :span="2" style="text-align: center;">-</el-col>
                                    <el-col :span="11">
                                        <el-input v-model="jinehou" @change="chaxun" placeholder></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
          
            <div class="biao publicTable thColorDark">
                <div class="table">
                    <el-table :data="tableData" min-width="90"  align="center"  style="width: 100%">
                        <el-table-column align="center" label="交易时间">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                                <!-- <span>2019-01-02 10:00:00</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderNo" label="交易流水号" align="center"></el-table-column>
                        <el-table-column label="加油站" prop="fullName" align="center"></el-table-column>
                        <el-table-column label="商品类型" align="center">
                            <template slot-scope="scope">
                                <span v-show="scope.row.orderGoodsType==1">油品</span>
                                <span v-show="scope.row.orderGoodsType==2">商品</span>
                                <span v-show="scope.row.orderGoodsType==3">混合</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="交易类型" prop="orderGoodsType" align="center">
                            <template slot-scope="scope">
                                <span v-show="scope.row.type== 1">消费</span>
                                <span v-show="scope.row.type== (1 << 2)">油品撤销</span>
                                <span v-show="scope.row.type== (1 << 4)">商品退货</span>
                                <span v-show="scope.row.type== (1 << 12)">人工补录</span>
                                <span v-show="(scope.row.type&(1 << 6))== (1 << 6)">油枪检测</span>
                                <span v-show="(scope.row.type&(1 << 8))== (1 << 8)">油枪检测</span>
                                <span v-show="(scope.row.type&(1 << 10))== (1 << 10)">油枪检测</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="金额" prop="totalPrice" align="center"></el-table-column>
                        <!-- <el-table-column label="顾客类型" prop="member" align="center">
                        </el-table-column>-->
                        <el-table-column label="优惠" prop="couponCount" align="center">
                            <template slot-scope="scope">
                                <span v-show="scope.row.couponCount==0">无</span>
                                <span v-show="scope.row.couponCount>0">有</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收银员" prop="username" align="center"></el-table-column>
                        <el-table-column label="操作" prop="member" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    @click="see(scope.$index, scope.row)"
                                    type="primary"
                                    size="small"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        v-show="total>0"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="limit"
                        @pagination="chaxun"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
                <!-- 消费详情 -->
                <el-dialog :visible.sync="xiaofeiVisible" width="900px" class="publicDialog" title="交易详情">
                    <div class="edit">
                        <div class="top">
                          <div class="box">
                              <div class="block">
                                  <span><b>交易流水号：</b>{{seeData.detail.order_no}}</span>
                              </div>
                              <div class="block">
                                  <span><b>加油时间：</b>{{seeData.detail.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                              </div>
                              <div class="block">
                                  <span><b>交易时间：</b>{{seeData.detail.cash_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                              </div>
                              <div class="block">
                                  <span><b>车主类型：个人</b></span>
                              </div>
                              <div class="block">
                                  <span><b>营业日：</b>{{seeData.detail.shift_date}}</span>
                              </div>
                          </div>
                          <div class="box">
                              <div class="block">
                                  <span><b>所属公司：</b>{{seeData.detail.company_name}}</span>
                              </div>
                              <!-- <div class="block">
                                  <span><b>加油站编号：</b>{{}}</span>
                              </div> -->
                              
                              <div class="block">
                                  <span><b>会员名称：</b>{{seeData.detail.username}}</span>
                              </div>
                              <div class="block">
                                  <span><b>会员等级：</b>{{seeData.detail.level_name}}</span>
                              </div>
                              
                              <div class="block">
                                  <span><b>会员积分：</b>{{seeData.detail.current_point}}</span>
                              </div>
                              <div class="block">
                                  <span><b>会员编号：</b>{{seeData.detail.member_no}}</span>
                              </div>
                          </div>
                          <div class="box">
                              <div class="block">
                                  <span><b>加油站名称：</b>{{seeData.detail.full_name}}</span>
                              </div>
                              <div class="block">
                                  <span><b>收银机：</b>{{seeData.detail.device_name}}</span>
                              </div>
                              <div class="block">
                                  <span><b>收银员：</b>{{seeData.detail.casher}}</span>
                              </div>
                              <div class="block">
                                  <span><b>油枪号：</b>{{seeData.detail.oil_gun_no}}</span>
                              </div>
                              
                          </div>
                      </div>
                        <div class="biao thColorDark">
                            <div class="table">
                                <!-- xiaofeitableData -->
                                <el-table :data="seeData.goods" style="width: 100%">
                                    <el-table-column align="center" label="品号">
                                        <template slot-scope="scope">
                                            <span v-show="scope.row.goods_name">{{scope.row.goods_name}}</span>
                                            <span v-show="scope.row.oils_name">{{scope.row.oils_name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="单价" align="center"></el-table-column>
                                    <el-table-column prop="goods_num" label="数量" align="center"></el-table-column>
                                    <el-table-column prop="wechat" label="小计" align="center">
                                        <template slot-scope="scope">
                                            <!-- <span v-show="scope.row.price">{{(scope.row.goods_num*scope.row.price)}}</span> -->
                                            <span v-show="scope.row.heji">{{(scope.row.heji)}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="top">
                            <div class="box">
                                <!-- <div class="block" v-if="seeData.promotionsAndPayType[0].name">
                                    <span>电子券：{{seeData.promotionsAndPayType[0].name}}</span>
                                </div> -->
                                <div class="block" v-for="(item, index) in seeData.promotionsAndPayType" :key="index">
                                    <p v-show="item.name">电子券：{{item.name}}</p>
                                    <span v-show="item.pay_type==1">现金</span>
                                    <span v-show="item.pay_type==2">微信</span>
                                    <span v-show="item.pay_type==3">支付宝</span>
                                    <span v-show="item.pay_type==4">银联卡</span>
                                    <span v-show="item.pay_type==5">会员卡</span>
                                    <span v-show="item.pay_type==6">老会员卡</span>
                                    <span v-show="item.pay_type==7">车队会员</span>
                                </div>
                                <!-- <div class="block">
                                    <span>现金</span>
                                </div> -->
                                <div class="block">
                                    <span>实收：{{shishou}}元</span>
                                </div>
                            </div>
                            <div class="box">
                                <!-- <div class="block" v-if="seeData.promotionsAndPayType[0].name">
                                    <span>-{{seeData.promotionsAndPayType[0].coupon_discount}}</span>
                                </div> -->
                                <div class="block" v-for="(item, index) in seeData.promotionsAndPayType" :key="index">
                                    <p v-show="item.name">-{{item.coupon_discount}}</p>
                                    <span>-{{item.pay_amount}}</span>

                                </div>
                                <!-- <div class="block">
                                    <span>{{}}</span>
                                </div>
                                <div class="block">
                                    <span>{{}}</span>
                                </div> -->
                                <div class="block">
                                    <span>积分累加：{{point}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="xiaofeiVisible = false">取消</el-button> -->
                    </div>
                </el-dialog>
                <!-- 消费详情 （商品退货）-->
                <el-dialog :visible.sync="tuihuoVisible" width="900px" class="publicDialog" title="交易详情">
                    <div class="edit">
                        <div class="top">
                            <div class="box">
                                <div class="block">
                                    <span>所属公司：{{seeData.detail.company_name}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>退货流水号：{{seeData.detail.order_no}}</span>
                                    <span></span>
                                    <!-- <span>{{more[moreIndx].companyName}}</span> -->
                                </div>
                                <div class="block">
                                    <span>原交易流水号：{{seeData.detail.parent_order_no}}</span>
                                    <span></span>
                                    <!-- <span>{{more[moreIndex].deviceId}}</span> -->
                                </div>
                                
                                <div class="block">
                                    <span>营业日：{{ seeData.detail.shift_date }}</span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="block">
                                    <span>加油站名称：{{seeData.detail.full_name}}</span>
                                </div>
                                <!-- <div class="block">
                                    <span>加油站编号：</span>
                                    <span></span>
                                </div> -->
                                
                                <div class="block">
                                    <span>收银员：{{seeData.detail.casher}}</span>
                                </div>
                                <div class="block">
                                    <span>收银机：{{seeData.detail.device_name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="biao">
                            <div class="table">
                                <el-table :data="seeData.goods" style="width: 100%">
                                    <el-table-column align="center" label="品名">
                                        <template slot-scope="scope">
                                            <span v-show="scope.row.goods_name">{{scope.row.goods_name}}</span>
                                            <span v-show="scope.row.oils_name">{{scope.row.oils_name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="单价" align="center"></el-table-column>
                                    <el-table-column prop="goods_num" label="退货数量" align="center"></el-table-column>
                                    <el-table-column prop="heji" label="退款金额" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="top">
                            <div class="box">
                                <div class="block">
                                    <span>现金：</span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="block">
                                    <span>- {{(seeData.detail.total_price||0)}} 元</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="tuihuoVisible = false">取消</el-button> -->
                    </div>
                </el-dialog>
                <!-- 消费详情 （油品撤销）-->
                <el-dialog :visible.sync="chexiaoVisible" width="900px" class="publicDialog" title="交易详情">
                    <div class="edit">
                        <div class="top">
                            <div class="box">
                                <div class="block">
                                    <span>所属公司：{{seeData.detail.company_name}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>撤销流水号：{{seeData.detail.order_no}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>原交易流水号：{{seeData.detail.parent_order_no}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>操作时间：{{seeData.detail.create_time | parseTime('{y}-{m}-{d}')}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>营业日：{{ seeData.detail.shift_date }}</span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="block">
                                    <span>加油站名称：{{seeData.detail.full_name}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>操作时间：{{seeData.detail.create_time | parseTime('{y}-{m}-{d}')}}</span>
                                </div>
                                <!-- <div class="block">
                                    <span>加油站编号：</span>
                                    <span></span>
                                </div> -->
                                <div class="block">
                                    <span>收银员：{{seeData.detail.casher}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>收银机：{{seeData.detail.device_name}}</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div class="biao">
                            <div class="table">
                                <el-table :data="seeData.goods" style="width: 100%">
                                    <el-table-column align="center" label="品名">
                                        <template slot-scope="scope">
                                            <span v-show="scope.row.goods_name">{{scope.row.goods_name}}</span>
                                            <span v-show="scope.row.oils_name">{{scope.row.oils_name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="单价" align="center"></el-table-column>
                                    <el-table-column prop="goods_num" label="撤销数量" align="center"></el-table-column>
                                    <el-table-column prop="heji" label="撤销金额" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="top">
                            <div class="box">
                                <div class="block">
                                    <span>现金：</span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="block">
                                    <span>- {{(seeData.detail.total_price||0)}} 元</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="chexiaoVisible = false">取消</el-button> -->
                    </div>
                </el-dialog>
                <!-- 消费详情 （油枪检测）-->
                <el-dialog :visible.sync="jianceVisible" width="900px" class="publicDialog" title="交易详情">
                    <div class="edit">
                        <div class="top">
                            <div class="box">
                                <div class="block">
                                    <span>所属公司：{{seeData.detail.company_name}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>交易流水号：{{seeData.detail.order_no}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>操作时间：{{seeData.detail.create_time | parseTime('{y}-{m}-{d}')}}</span>
                                    <span></span>
                                </div>
                                
                                <div class="block">
                                    <span>营业日：{{seeData.detail.shift_date}}</span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="box">
                                <div class="block">
                                    <span>加油站名称：{{seeData.detail.full_name}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>收银员：{{seeData.detail.casher}}</span>
                                    <span></span>
                                </div>
                                <!-- <div class="block">
                                    <span>加油站编号：</span>
                                    <span></span>
                                </div> -->
                                <div class="block">
                                    <span>收银机：{{seeData.detail.device_name}}</span>
                                    <span></span>
                                </div>
                                <div class="block">
                                    <span>枪号：{{seeData.detail.oil_gun_no}}</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div class="biao">
                            <div class="table">
                                <el-table :data="seeData.goods" style="width: 100%">
                                    <el-table-column align="center" label="品名">
                                        <template slot-scope="scope">
                                            <span v-show="scope.row.goods_name">{{scope.row.goods_name}}</span>
                                            <span v-show="scope.row.oils_name">{{scope.row.oils_name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="单价" align="center"></el-table-column>
                                    <el-table-column prop="goods_num" label="数量" align="center"></el-table-column>
                                    <el-table-column label="金额" align="center">
                                        <template slot-scope="scope">
                                            <!-- <span v-show="scope.row.price">{{scope.row.heji}}</span> -->
                                            <span v-show="scope.row.heji">{{scope.row.heji}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <!-- <div class="top">
              <div class="box">
                <div class="block">
                  <span>现金：</span>
                </div>
              </div>
                        </div>-->
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="jianceVisible = false">取消</el-button> -->
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import { parseTime } from "@/utils";
import { youpinlist } from "@/api/youpinbaobiao";
import { getCompanyByWhere } from "@/api/youpinbaobiao";
import { StationList } from "@/api/youpinbaobiao";
import { orderList } from "@/api/shuju";
import { getOilgunList } from "@/api/shuju";
import { getDeviceListByStation } from "@/api/shuju";
import { detail, orderDetail } from "@/api/shuju";
import { getUserInfo } from '@/api/cheduiguanli'
import { getCompanyDetail } from '@/api/zhuce'


export default {
    data() {
        return {
            company: "", //公司
            companyOptions: [], //公司选择
            station: "", //公司
            stationOptions: [], //油站选择
            date: "", //日期
            kucun: "",
            num: 0,
            tableData: [],
            value2: "",
            xiaofeiVisible: false,
            xiaofeitableData: [],
            tuihuoVisible: false,
            chexiaoVisible: false,
            jianceVisible: false,
            jiaoyi: "",
            jiaoyiOptions: [
                {
                    value: 1,
                    lable: "消费"
                },
                {
                    value: (1 << 4),
                    lable: "商品退货"
                },
                {
                    value: (1 << 2),
                    lable: "油品撤销"
                },
                {
                    value:  (1 << 6),
                    lable: "自用油"
                },
                {
                    value: (1 << 10),
                    lable: "油枪检测（不回罐）"
                },
                {
                    value: (1 << 8),
                    lable: "油枪检测（回罐）"
                }
            ], //交易类型选择
            gukeleixing: "",
            gukeleixingOptions: [
                {
                    value: "1",
                    lable: "散客"
                },
                {
                    value: "2",
                    lable: "会员"
                }
            ], //顾客类型选择
            jiaoyiliushuihao: "",
            jineqian: "",
            jinehou: "",
            startTime: "",
            endTime: "",
            youqiang: "",
            youqiangOptions: [],
            shangpinType: [],
            options: [
                {
                    value: "1",
                    lable: "油品"
                },
                {
                    value: "2",
                    lable: "商品"
                },
                {
                    value: "3",
                    lable: "混合"
                }
            ],
            zhifufangshi: "",
            zhifufangshiOptions: [
                {
                    value: "1",
                    lable: "现金"
                },
                {
                    value: "2",
                    lable: "微信"
                },
                {
                    value: "3",
                    lable: "支付宝"
                },
                {
                    value: "4",
                    lable: "银联卡  "
                },
                {
                    value: "5",
                    lable: "会员"
                },
                {
                    value: "6",
                    lable: "老会员"
                },
                {
                    value: "7",
                    lable: "车队会员"
                }
            ],
            oilgun: "",
            oilgunOptions: [],
            deviceId:'',//收银机
            // options:[{
            //   value: '1',
            //   label: '油品',
            //   children: [{
            //     value: '92',
            //     label: '92号汽油',
            //   },{
            //     value: '93',
            //     label: '93号汽油',
            //   },{
            //     value: '95',
            //     label: '95号柴油',
            //   },]
            // },{
            //   value: '2',
            //   label: '商品',
            //   children: [{
            //     value: '1',
            //     label: '哇哈哈',
            //   },{
            //     value: '2',
            //     label: '矿泉水',
            //   },]
            // },{
            //   value:'3',
            //   label:'混合'
            // }],
            value: "",
            //分页
            total: 0,
            page: 1,
            limit: 10,
            currentPage: 1,
            more: [], //交易详情
            moreIndx: 0, //交易详情下标
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            seeData:{
                detail:{},
                promotionsAndPayType:[{
                    name:false
                }],
                
            },
            shishou:0,
            point:'',
            companyName:'',
        };
    },
    created() {
        this.get();
    },
    methods: {
        get() {
            this.listLoading = true;
            var data = {
                pageNum: this.page,
                pageSize: this.limit
            };
            console.log(data);
            orderList(data).then(response => {
                console.log(response.data);
                this.more = response.data.rows;
                this.total = response.data.total;
                this.tableData = response.data.rows;
                this.listLoading = false;
            });
            var a = {};
            youpinlist(a).then(response => {
                // console.log(response.data)
                this.oilsList = response.data;
            });
            getCompanyByWhere(a).then(response => {
                // console.log(response.data)
                this.companyOptions = response.data;
            });
            getUserInfo(a)
                .then(response => {
                console.log('信息')
                console.log(response.data)
                var id = response.data.companyId
                var data = {
                    id:id,
                }
                getCompanyDetail(data)
                    .then(response => {
                        console.log('商户')
                        console.log(response.data)
                        this.companyName = response.data.companyInfo.company_name
                        var data = {
                            companyId: response.data.companyInfo.id
                        };
                        StationList(data).then(response => {
                            console.log(response.data);
                            this.stationOptions = response.data;
                        });
                        // stationInfo
                        // this.youzhanList=[]
                        // this.youzhanList.push(response.data.stationInfo.fullName)
                        // this.youzhanid = response.data.stationInfo.id
                    }) 
            })  
        },
        change() {
            var data = {
                companyId: this.company
            };
            StationList(data).then(response => {
                console.log(response.data);
                this.stationOptions = response.data;
            });
        },
        stationChange() {
            var data = {
                companyId: this.company,
                stationId: this.station
            };
            getDeviceListByStation(data).then(response => {
                console.log('收银机');
                console.log(response.data);
                this.youqiangOptions = response.data;
            });
            getOilgunList(data).then(response => {
                console.log('油枪号');
                console.log(response.data);
                this.oilgunOptions = response.data;
            });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.limit = val;
            this.chaxun();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val;
            this.chaxun();
        },
        see(index, row) {
            // console.log(row)
            var data = {
                id:row.id
            }
            orderDetail(data).then(response => {
                console.log('详情');
                console.log(response.data);
                this.seeData=response.data;
                var  heji = 0;
                this.shishou = 0
                for (let i = 0; i < this.seeData.promotionsAndPayType.length; i++) {
                    this.shishou +=this.seeData.promotionsAndPayType[i].pay_amount
                }
                this.shishou = this.shishou.toFixed(2)
                for (let i = 0; i < this.seeData.goods.length; i++) {
                    this.seeData.goods[i].heji = (this.seeData.goods[i].price*this.seeData.goods[i].goods_num).toFixed(2)
                    heji += (this.seeData.goods[i].price*this.seeData.goods[i].goods_num)
                    
                }
                if(this.seeData.goods.length){
                    this.seeData.goods.push({
                        goods_name:'合计',
                        heji:heji.toFixed(2)
                    })
                }
                this.point = response.data.point ? response.data.point.point : 0
                // console.log(this.seeData.promotionsAndPayType[0].name)
                // this.seeData.promotionsAndPayType[0]
                // if(!(this.seeData.promotionsAndPayType[0].name)){
                //     console.log(this.seeData.promotionsAndPayType[0].name)
                //     this.seeData.promotionsAndPayType[0].name = false
                // }
                if(row.type== 1){
                    //消费
                    this.xiaofeiVisible = true
                }else if(row.type== (1 << 2)){
                    //油品撤销
                    this.chexiaoVisible = true
                }else if(row.type== (1 << 4)){
                    //商品退货
                    this.tuihuoVisible = true
                }else if(row.type== (1 << 12)){
                    //人工补录
                    this.xiaofeiVisible = true
                }else if(row.type&(1 << 6)== (1 << 6)){
                    //油枪检测
                    this.jianceVisible = true
                }else if(row.type&(1 << 8)== (1 << 8)){
                    //油枪检测
                    this.jianceVisible = true
                }else if(row.type&(1 << 10)== (1 << 10)){
                    //油枪检测
                    this.jianceVisible = true
                }
            });
            // this.xiaofeiVisible = true
            
            // this.tuihuoVisible = true;
            this.moreIndx = index;
        },
        handleChange(value) {
            console.log(value);
            // console.log(this.shangpinType);
        },
        chaxun() {
            this.listLoading = true;
            if (this.date == null) {
                this.date = [];
            }
            var data = {
                pageNum: this.page,
                pageSize: this.limit,
                companyId: this.company,
                stationId: this.station,
                maxOrderAmount: this.jinehou ? this.jinehou : null,
                minOrderAmount: this.jineqian ? this.jineqian : null,
                startTime: this.date[0] ? this.date[0] : null,
                endTime: this.date[1] ? this.date[1] : null,
                oilGunId:this.oilgun,
                deviceId:this.deviceId,
                payType:this.zhifufangshi,
                type:this.jiaoyi,
                orderGoodsType:this.shangpinType,
                orderNo:this.jiaoyiliushuihao
            };
            console.log('查询')
            console.log(data)
            orderList(data).then(response => {
                console.log(response.data);
                this.total = response.data.total;
                this.tableData = response.data.rows;
                this.listLoading = false;
            });
        },
        formatDate(row, column) {
            const now = new Date(row[column.property]);
            console.log(now);
            if (now != "Invalid Date") {
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hour = now.getHours();
                var minute = now.getMinutes();
                var second =
                    now.getSeconds() > 10
                        ? now.getSeconds()
                        : "0" + now.getSeconds();
                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    date +
                    " " +
                    hour +
                    ":" +
                    minute +
                    ":" +
                    second
                );
            } else {
                return "";
            }
        },
        // 表格合并行与列
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === 0) {
                    return {
                        rowspan: this.tableData.length,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
};
</script>
<style scoped>
@import url("./transaction-record.scss");
</style>
<style scoped>
.edit {
    padding: 0 20px;
}
.edit > .biao {
    padding: 10px 0;
}

</style>
