<template>
    <div class="app-container oil-business">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom: 10px;">
                <el-form-item label="商品业务"/>
            </div>
            <div class="items">
                <el-form-item label="公司" label-width="90px">
                    <el-select
                        v-model="listQuery.companyId"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="selyouzhan"
                    >
                        <el-option
                            v-for="item in suppli"
                            :key="item.id"
                            :label="item.short_name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="加油站" label-width="90px">
                    <el-select
                        v-model="listQuery.stationId"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in supOilstation"
                            :key="item.id"
                            :label="item.shortName"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                

                <el-form-item label="业务类型" label-width="90px">
                    <el-select
                        v-model="listQuery.typeId"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in yewu"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="业务单号" label-width="90px">
                    <el-input
                        v-model="listQuery.orderNumber"
                        placeholder="请输入内容"
                        @input="zhuangtaiX"
                        style="min-width: 200px"
                    ></el-input>
                </el-form-item>
                <!--<el-form-item label="供应商" label-width="90px">
          <el-select v-model="listQuery.supplierId" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in gongyingshang" :key="item.id" :label="item.supplierName" :value="item.id"/>
          </el-select>
                </el-form-item>-->
                <el-form-item label="状态" label-width="90px">
                    <el-select
                        v-model="status"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in zhuangtai"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div class="dbriqi">
                <div class="qiri">时间</div>
                <el-date-picker
                    v-model="value6"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                    @change="shijian"
                ></el-date-picker>
            </div>

            <el-table :data="list" fit highlight-current-row style="width: 100%;">
                <el-table-column label="业务类型" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.typeName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="业务单号" min-width="130" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.orderNumber }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="营业日" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.businessDay"
                        >{{ scope.row.businessDay | parseTime('{y}-{m}-{d}') }}</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="公司" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.companyName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="加油站" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.stationName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="90" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==6&&scope.row.typeId!=2">已完成</span>
                        <span v-if="scope.row.status==3&&scope.row.typeId==2">已完成</span>
                        <!--采购的-->
                        <span v-if="scope.row.status==5&&scope.row.typeId==1">收货中</span>
                        <!--调拨的-->
                        <span v-if="scope.row.status==1&&scope.row.typeId==2">已出库</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" min-width="150" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    width="140"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <!--采购的-->
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeId==1"
                            @click="cgDetail(scope.row,scope.row.typeId)"
                        >查看</el-button>
                        <!--调拨的-->
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeId==2"
                            @click="dbDetail(scope.row,scope.row.typeId)"
                        >查看</el-button>
                        <!--退货的-->
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeId==3"
                            @click="thDetail(scope.row,scope.row.typeId)"
                        >查看</el-button>
                        <!--报废的-->
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeId==4"
                            @click="bfDetail(scope.row,scope.row.typeId)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
            />
        </el-form>

        <!--商品弹框-->
        <el-dialog :visible.sync="shangpintank" :title="tkBiaoti" class="shangpintank_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div v-if="zcDetail.typeIDID==1&&zcDetail.orderType==2">
                    <div class="shanga">
                        <el-form-item label="业务单号：">{{zcDetail.orderNumber}}</el-form-item>
                        <el-form-item label="状态：" v-if="zcDetail.status==5">待收货</el-form-item>
                        <el-form-item label="状态：" v-if="zcDetail.status==6">已完成</el-form-item>
                        
                        <el-form-item label="加油站：">{{zcDetail.oilsStationShortName}}</el-form-item>
                        <el-form-item label="订单类型：" v-if="zcDetail.orderType==1">系统订单</el-form-item>
                        <el-form-item label="订单类型：" v-if="zcDetail.orderType==2">无单收货</el-form-item>

                        <el-form-item label="供应商：" v-if="zcList.length">{{zcList[0][0].supplierShortName}}</el-form-item>

                        <el-form-item label="公司：">
                          {{zcDetail.companyName}}
                        </el-form-item>
                        <el-form-item label="加油站：">
                          {{zcDetail.oilsStationShortName}}
                        </el-form-item>


                        <el-form-item  v-if="zcList.length"
                            label="收货时间："
                        >{{zcList[0][0].auditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item
                            label="营业日："
                        >{{zcDetail.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item label="班次：">{{zcDetail.shiftId}}</el-form-item>
                    </div>
                    <el-table v-if="zcList.length" :data="zcList[0]" style="width: 100%;">
                        <el-table-column label="序号" align="center" min-width="70">
                            <template slot-scope="scope">
                                <span v-if="zcList[0].length !== scope.$index+1">{{scope.$index+1}}</span>
                        <span v-else>{{scope.row.lastName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品名称" align="center" min-width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收货数量" align="center" min-width="90">
                            <template slot-scope="scope">
                                <span>{{scope.row.receiveCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" min-width="70">
                            <template slot-scope="scope">
                                <span>{{scope.row.unit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="生产日期" align="center" min-width="70">
                            <template slot-scope="scope">
                                <span
                                    v-if="scope.row.productionDate"
                                >{{scope.row.productionDate | parseTime('{y}-{m}-{d}')}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div v-if="zcDetail.typeIDID==1&&zcDetail.orderType==1">
                    <div class="shanga" style="border-bottom: 1px solid #E4E4E4;">
                        <el-form-item label="业务单号：">
                            {{zcDetail.orderNumber}}
                        </el-form-item>
                        
                        <el-form-item label="状态：" v-if="zcDetail.status==5">待收货</el-form-item>
                        <el-form-item label="状态：" v-if="zcDetail.status==6">已完成</el-form-item>
                        <el-form-item label="订单类型：" v-if="zcDetail.orderType==1">系统订单</el-form-item>
                        <el-form-item label="订单类型：" v-if="zcDetail.orderType==2">无单收货</el-form-item>
                        <el-form-item label="加油站：">{{zcDetail.oilsStationShortName}}</el-form-item>
                    </div>
                    <ul style="margin: 0;padding: 0;">
                        <li v-for="(item,index) in zcList" :style="zcList.length != index+1 ? 'border-bottom: 10px solid #eee; padding-bottom: 40px;margin-bottom: 30px;' : ''">
                            <div class="shanga">
                                <el-form-item label="供应商：">{{item[0].supplierShortName}}</el-form-item>
                                <el-form-item label="状态：" v-if="item[0].status==1">未收货</el-form-item>
                                <el-form-item label="状态：" v-if="item[0].status==2">收货中</el-form-item>
                                <el-form-item label="状态：" v-if="item[0].status==3">已完成</el-form-item>
                                <el-form-item label="采购子订单：">{{item[0].orderNumber}}</el-form-item>
                                <el-form-item
                                    label="收货时间："
                                >{{item[0].receiveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                                <el-form-item
                                    label="营业日："
                                >{{zcDetail.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                                <el-form-item
                                    label="班次："
                                >{{zcDetail.shiftId}}</el-form-item>
                            </div>
                            <el-table :data="item" style="width: 100%;">
                                <el-table-column label="序号" align="center" min-width="70">
                                    <template slot-scope="scope">
                                        <span v-if="item.length !== scope.$index+1">{{scope.$index+1}}</span>
                                <span v-else>{{scope.row.lastName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品名称" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.goodsName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="订单数量" align="center" min-width="90">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.orderCount}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="收货数量" align="center" min-width="90">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.receiveCount}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="单位" align="center" min-width="70">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.unit}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="生产日期" align="center" min-width="70">
                                    <template slot-scope="scope">
                                        <span
                                            v-if="scope.row.productionDate"
                                        >{{scope.row.productionDate | parseTime('{y}-{m}-{d}')}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </li>
                    </ul>
                </div>

                <div v-if="sdbDetail.typeIDID==2">
                    <div class="shanga">
                        <el-form-item style="min-width:50%" label="业务单号：">{{sdbDetail.orderNumber}}</el-form-item>
                        <el-form-item label="状态：" v-if="sdbDetail.status==1">已出库</el-form-item>
                        <el-form-item label="状态：" v-if="sdbDetail.status==3">已完成</el-form-item>
                        <el-form-item label="出库加油站：">{{sdbDetail.oilsNameOut}}</el-form-item>
                        <el-form-item label="入库加油站：">{{sdbDetail.oilsNameIn}}</el-form-item>
                        <el-form-item
                            label="营业日："
                        >{{sdbDetail.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item label="班次：">{{sdbDetail.shiftId}}</el-form-item>
                        <el-form-item
                            label="出库审核时间："
                            v-if="sdbDetail.auditTime"
                        >{{sdbDetail.auditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item
                            label="收货审核时间："
                            v-if="sdbDetail.receiveTime"
                        >{{sdbDetail.receiveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item label="订单类型：" v-if="zcDetail.orderType==1">系统订单</el-form-item>
                        <el-form-item label="订单类型：" v-if="zcDetail.orderType==2">无单收货</el-form-item>

                        
                    </div>
                    <el-table :data="sdbList" style="width: 100%;">
                        <el-table-column label="序号" align="center" min-width="55">
                          <template slot-scope="scope">
                                <span v-if="sdbList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="商品名称" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="调拨数量" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.orderCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.unit}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div v-if="sthDetail.typeIDID==3">
                    <div class="shanga">
                        <el-form-item label="退货单号：">
                            {{sthDetail.orderNumber}}
                        </el-form-item>
                        <el-form-item label="状态：" v-if="sthDetail.status==6">已完成</el-form-item>
                        <div class="shanga" style="width: 100%;">
                            <el-form-item label="供应商：" v-if="sthList.length">{{sthList[0].supplierShortName}}</el-form-item>
                        </div>
                        <el-form-item label="公司：">{{sthDetail.companyName}}</el-form-item>
                        <el-form-item label="加油站：">{{sthDetail.oilsStationName}}</el-form-item>
                        <el-form-item
                            label="营业日："
                            v-if="sthDetail.businessDay"
                        >{{sthDetail.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item label="班次：" v-if="sthDetail.shiftId">{{sthDetail.shiftId}}</el-form-item>
                        <el-form-item label="申请人：">
                            {{sthDetail.createrName}}
                        </el-form-item>
                        <el-form-item
                            label="申请时间："
                            v-if="sthDetail.createTime"
                        >{{sthDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item
                            label="审核人："
                            v-if="sthDetail.merchantAuditorName"
                        >{{sthDetail.merchantAuditorName}}</el-form-item>
                        <el-form-item
                            label="审核时间："
                            v-if="sthDetail.merchantAuditTime"
                        >{{sthDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    </div>
                    <el-table :data="sthList" style="width: 100%;">
                        <el-table-column label="序号" align="center" min-width="70">
                          <template slot-scope="scope">
                            <span v-if="sthList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="商品名称" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="退货数量" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.returnedCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsUnit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="退货原因" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.reason}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div v-if="sbfDetail.typeIDID==4">
                    <div class="shanga">
                        <el-form-item label="业务单号：">
                            {{sbfDetail.orderNumber}}
                        </el-form-item>
                        <el-form-item label="状态：" v-if="sbfDetail.status==6">
                            已完成
                        </el-form-item>
                        <el-form-item label="公司：">{{sbfDetail.companyName}}</el-form-item>
                        <el-form-item label="加油站：">
                            {{sbfDetail.oilsStationName}}
                        </el-form-item>
                        <el-form-item label="申请人：">
                            {{sbfDetail.createrName}}
                        </el-form-item>
                        <el-form-item label="申请时间：" v-if="sbfDetail.createTime">
                          {{sbfDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                        </el-form-item>
                        <el-form-item label="营业日：" v-if="sbfDetail.businessDay">
                            {{sbfDetail.businessDay | parseTime('{y}-{m}-{d}')}}
                        </el-form-item>
                        <el-form-item label="班次：" v-if="sbfDetail.shiftId">
                            {{sbfDetail.shiftId}}
                        </el-form-item>
                        <el-form-item label="审核人：" v-if="sbfDetail.merchantAuditorName">
                          {{sbfDetail.merchantAuditorName}}
                        </el-form-item>
                        <el-form-item label="审核时间：" v-if="sbfDetail.merchantAuditTime">
                          {{sbfDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                        </el-form-item>
                        
                        
                
                    </div>  
                    <el-table :data="sbfList" style="width: 100%;">
                        <el-table-column label="序号" align="center" min-width="70">
                          <template slot-scope="scope">
                            <span v-if="sbfList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="商品名称" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="报废数量" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.returnedCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsUnit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="报废原因" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.reason}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="shangpintank = false" type="primary">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { comYouzhanList, youzhanList } from "@/api/shuju";
import { oilsBusList, oilList } from "@/api/oil";
import { shanghuList } from "@/api/shanghu";
import {
    SupplierList,
    businessOrderList,
    orderShenShen,
    diaoboDetail,
    returnedDetail
} from "@/api/shangpin";

import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 0
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
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
                        text: "最近14天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 14
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
                    }
                ]
            },

            list: null,
            total: 0,
            value6: "",
            youzhan: [],
            zhuangtai: [
                {
                    id: [5],
                    name: "收货中"
                },
                {
                    id: [1],
                    name: "已出库"
                },
                {
                    id: [6],
                    name: "已完成"
                }
            ],
            yewu: [
                {
                    id: 1,
                    name: "商品采购"
                },
                {
                    id: 2,
                    name: "商品调拨"
                },
                {
                    id: 3,
                    name: "商品退货"
                },
                {
                    id: 4,
                    name: "商品报废"
                }
            ],
            status: "",
            form: {
                name: ""
            },

            listQuery: {
                pageNum: 1,
                pageSize: 10,
                companyId: "",
                stationId: "",
                typeId: "",
                orderNumber: "",
                supplierId: "",
                statusList: [],

                cgStatusList: [5, 6],
                dbStatusList: [1, 3],
                thStatusList: [6],
                bfStatusList: [6],

                beginTime: "",
                endTime: ""
            },

            supOilstation: [],
            suppli: [],
            gongyingshang: [],
            tkBiaoti: "",

            shangpintank: false,
            zcDetail: {},
            zcList: {},

            sdbDetail: {},
            sdbList: {},

            sthDetail: {},
            sthlist: {},

            sbfDetail: {},
            sbfList: {}
        };
    },
    created() {
        this.getshanghu();
        this.getList();
    },
    methods: {
        getList() {
            businessOrderList(this.listQuery).then(res => {
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });
        },
        getshanghu() {
            shanghuList({}).then(res => {
                console.log(res);
                this.suppli = res.data;
            });
            SupplierList({}).then(res => {
                console.log(res);
                this.gongyingshang = res.data;
            });
        },
        selyouzhan(val) {
			this.supOilstation=[];
            this.listQuery.stationId = "";
			if (val) {
				let data = {
					companyId: val
				};
				console.log(data);
				comYouzhanList(data).then(res => {
					console.log(res);
					this.supOilstation = res.data;
				});
				SupplierList(data).then(res => {
					console.log(res);
					this.gongyingshang = res.data;
				});
			}
            console.log(this.listQuery);
            this.getList();
        },
        shijian() {
            if (this.value6) {
                console.log(this.value6);
                this.listQuery.beginTime = this.value6[0];
                this.listQuery.endTime = this.value6[1];
            } else {
                this.listQuery.beginTime = "";
                this.listQuery.endTime = "";
            }
            this.getList();
        },
        zhuangtaiX() {
            if (this.status == "") {
                this.listQuery.cgStatusList = [5, 6];
                this.listQuery.dbStatusList = [1, 3];
                this.listQuery.thStatusList = [6];
                this.listQuery.bfStatusList = [6];
                this.listQuery.statusList = [];
                //					this.listQuery.typeId="";
            } else {
                console.log(this.status);
                if (this.status[0] == 1) {
                    this.listQuery.typeId = 2;
                    this.listQuery.statusList = this.status;
                } else if (this.status[0] == 5) {
                    this.listQuery.typeId = 1;
                    this.listQuery.statusList = this.status;
                } else if (this.status[0] == 6) {
                    //	    			this.listQuery.typeId="";
                    this.listQuery.statusList = [3, 6];
                }

                /*delete this.listQuery["cgStatusList"]
	    		delete this.listQuery["dbStatusList"]
	    		delete this.listQuery["dgStatusList"]
	    		delete this.listQuery["hhStatusList"]*/
            }
            console.log(this.listQuery);
            this.getList();
        },

        cgDetail(row, typeId) {
            this.tkBiaoti = "商品采购";
            this.chongzhi();
            let data = {
                id: row.id,
                isShowMerchantOrder: '1'
            };
            orderShenShen(data).then(res => {
                console.log(res);
                if (res.data.goodsPurchaseApplyInfo.orderType == 1) {
                    this.zcDetail = res.data.goodsPurchaseApplyInfo;
                    this.zcDetail["typeIDID"] = typeId;
                    this.zcList = res.data.goodsList;
                } else {
                    this.zcDetail = res.data.goodsPurchaseApplyInfo;
                    this.zcDetail["typeIDID"] = typeId;
                    this.zcList = res.data.goodsList;
                }
                this.shouHuoSum();
                this.shangpintank = true;
            });
        },
        shouHuoSum(){
            this.zcList.forEach((item)=>{
                let sum = 0;
                let sum1 = 0;

                item.forEach((item1,index)=>{
                    let sum2 = item1.receiveCount || 0;
                    if(item1.lastName){
                        item.splice(index,1)
                    }else{
                        sum += Number(item1.orderCount);
                        sum1 += Number(sum2);
                    }
                    
                })
                item.push({
                    lastName:'合计',
                    orderCount:sum,
                    receiveCount:sum1,
                })
            })
        },

        dbDetail(row, typeId) {
            this.tkBiaoti = "商品调拨";
            this.chongzhi();
            let data = {
                id: row.id
            };
            diaoboDetail(data).then(res => {
                console.log(res);
                this.sdbDetail = res.data.goodsAllocateApplyInfo;
                this.sdbDetail["typeIDID"] = typeId;
                this.sdbList = res.data.goodsList;

                let sum = 0;
                this.sdbList.forEach((item)=>{
                    sum += Number(item.orderCount);
                })
                this.sdbList.push({
                    lastName:'合计',
                    orderCount:sum
                })
                
                this.shangpintank = true;
            });
        },
        thDetail(row, typeIds) {
            this.tkBiaoti = "商品退货";
            this.chongzhi();
            let data = {
                id: row.id,
                typeId: 1
            };
            returnedDetail(data).then(res => {
                console.log(res);
                this.sthDetail = res.data.goodsReturnedInfo;
                this.sthDetail["typeIDID"] = typeIds;
                this.sthList = res.data.goodsList;

                let sum = 0;
                this.sthList.forEach((item)=>{
                    sum += Number(item.returnedCount);
                })
                this.sthList.push({
                    lastName:'合计',
                    returnedCount:sum
                })

                this.shangpintank = true;
            });
        },
        bfDetail(row, typeIds) {
            this.tkBiaoti = "商品报废";
            this.chongzhi();
            let data = {
                id: row.id,
                typeId: 2
            };
            returnedDetail(data).then(res => {
                console.log(res);
                this.sbfDetail = res.data.goodsReturnedInfo;
                this.sbfDetail["typeIDID"] = typeIds;
                this.sbfList = res.data.goodsList;

                let sum = 0;
                this.sbfList.forEach((item)=>{
                    sum += Number(item.returnedCount);
                })
                this.sbfList.push({
                    lastName:'合计',
                    returnedCount:sum
                })

                this.shangpintank = true;
            });
        },
        chongzhi() {
            this.zcDetail["typeIDID"] = "";
            this.sdbDetail["typeIDID"] = "";
            this.sthDetail["typeIDID"] = "";
            this.sbfDetail["typeIDID"] = "";
        }
    }
};
</script>

<style scoped>
@import url("./oil-business.scss");
</style>