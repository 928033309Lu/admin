<template>
    <div class="app-container allocation">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom: 0;">
                <el-form-item label="商品调拨"/>
                <el-button type="primary" class="tui_btn" @click="shenqing()">调拨出库申请</el-button>
            </div>
            <div class="items" style="margin-bottom:30px;">
                <el-form-item label="调拨单号" label-width="90px">
                    <el-input
                        v-model="listQuery.orderNumber"
                        style="min-width:200px;max-width: 260px;"
                        @input="danhaochaxun()"
                    />
                </el-form-item>
                <el-form-item
                    label="单据类型"
                    style="margin-right: 20px;margin-left: 20px;"
                    label-width="90px"
                >
                    <el-select
                        v-model="listQuery.typeId"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="danhaochaxun()"
                    >
                        <el-option
                            v-for="item in danju"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="状态"
                    style="margin-right: 20px;margin-left: 20px;"
                    label-width="50px"
                >
                    <el-select
                        v-model="listQuery.status"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="danhaochaxun()"
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

            <el-table :data="list" fit style="width: 100%" @sort-change="sortChange">
                <el-table-column label="单据类型" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="采购订单号" min-width="150" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="出库加油站" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsNameOut}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="调入加油站" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsNameIn}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="调拨数量" align="center" min-width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderCountTotal}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待审批</span>
                        <span v-if="scope.row.status==1">已出库</span>
                        <span v-if="scope.row.status==2">未入库</span>
                        <span v-if="scope.row.status==3">已完成</span>
                        <span v-if="scope.row.status==-3">已作废</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="left" width="150" class="small-padding">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="shouhuo(scope.row)"
                            v-if="scope.row.status==2"
                        >编辑</el-button>
                        <el-button size="mini" type="success" @click="dbchakanDetail(scope.row)">查看</el-button>
                        <el-button
                            size="mini"
                            type="info"
                            @click="chehuile(scope.row)"
                            v-if="scope.row.status==0"
                        >撤回</el-button>
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

        <!--调拨出库申请-->
        <el-dialog :visible.sync="Shenqing" title="调拨出库申请" class="shenqing_tab" @open="reset" width="900px">
            <el-form label-width="120px">
                <div class="btn_box" style="padding-bottom: 20px;">
                    <el-button type="primary" @click="shangpintj=true">添加商品</el-button>
                    <el-button type="danger" @click="shanchuD()">删除商品</el-button>
                </div>
                <el-table
                    :data="xuanzeShangpin"
                    style="width: 100%;"
                    @select-all="handleSelectionChange"
                    @select="handleSelectionChange"
                >
                    <el-table-column type="selection" min-width="70" align="center"></el-table-column>
                    <el-table-column label="序号" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span v-if="xuanzeShangpin.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存" min-width="80" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.repertory}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出库数量" align="center" min-width="120">
                        <template slot-scope="scope">

                            <span v-if="xuanzeShangpin.length !== scope.$index+1"><el-input @change="returnedCountSum" type="number" v-model="scope.row.orderCount" style="width:80px;"/></span>
                            <span v-else>{{ scope.row.orderCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label align="center" width="80"></el-table-column>
                </el-table>
                <el-form-item label="调拨原因" label-width="90px" class="yuanyin">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="yuanyin"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Shenqing = false">取消</el-button>
                <el-button type="primary" @click="chuku()">提交</el-button>
            </div>
        </el-dialog>

        <!--调拨添加组件-->
        <el-dialog :visible.sync="shangpintj" title="商品添加" class="shenqingtj_tab" width="1100px">
            <add-order
                v-if="shangpintj"
                :initInfo="xuanzeShangpin"
                :config="{
                    typeList:'orderLei',
                    goodsList:'diaoboList'
                }"
                @shangpinData="getData"
                @shangpinT="guaT"
            />
        </el-dialog>

        <!--商品调拨未入库-->
        <el-dialog :visible.sync="caigouweiru" title="商品调拨入库" class="caigousq_tab caigoudb_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item label="商品调拨单号：">{{dbRukuDetail.orderNumber}}</el-form-item>
                    <el-form-item label="状态：">待审批</el-form-item>
                    <el-form-item label="调出加油站：">{{dbRukuDetail.oilsNameOut}}</el-form-item>
                    <el-form-item label="调入加油站：">{{dbRukuDetail.oilsNameIn}}</el-form-item>
                </div>
                <el-table
                    :data="diaoruWeiruList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <!--@select="dbjujue"-->
                    <el-table-column label="序号" align="center" min-width="55">
                        <template slot-scope="scope">
                            <span v-if="diaoruWeiruList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品类别" align="center" min-width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.orderCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收货数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.orderCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column type="selection" label="" width="90" align="center">
                    </el-table-column>-->
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dbRukuShou()">确认收货</el-button>
                <!--<el-button type='danger' @click="dbjujueshenhe">拒绝</el-button>-->
                <!--<el-button type="primary" @click="dbquerenshenhe">确认</el-button>-->
            </div>
        </el-dialog>

        <!--商品调拨已出库-->
        <el-dialog :visible.sync="caigouyichu" title="商品调拨出库" class="caigousq_tab caigoudb_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item label="商品调拨单号：">{{dbyiwanDetailChu.orderNumber}}</el-form-item>
                    <el-form-item label="状态：" v-if="dbyiwanDetailChu.status==0">待审批</el-form-item>
                    <el-form-item label="状态：" v-if="dbyiwanDetailChu.status==1">已出库</el-form-item>
                    <el-form-item label="状态：" v-if="dbyiwanDetailChu.status==3">已完成</el-form-item>
                    <el-form-item label="状态：" v-if="dbyiwanDetailChu.status==-3">已作废</el-form-item>
                    
                    <el-form-item label="调入加油站：" v-if="!dbyiwanDetailChu.status==0">{{dbyiwanDetailChu.oilsNameIn}}</el-form-item>
                    <el-form-item label="出库加油站：" v-if="!dbyiwanDetailChu.status==0">{{dbyiwanDetailChu.oilsNameOut}}</el-form-item>
                    <el-form-item label="出库加油站："  v-if="!dbyiwanDetailChu.status==3" >{{dbyiwanDetailChu.oilsNameOut}}</el-form-item>
                    <el-form-item label="调拨原因：" v-if="dbyiwanDetailChu.allocateReason">
                            <span>{{dbyiwanDetailChu.allocateReason}}</span>
                    </el-form-item>
                    <el-form-item
                        label="营业日："
                        v-if="!(dbyiwanDetailChu.status==0 ||dbyiwanDetailChu.status==1 ||dbyiwanDetailChu.status==-3)"
                    >{{dbyiwanDetailChu.businessDay | parseTime('{y}-{m}-{d}')}}</el-form-item>
                    <el-form-item label="班次：" v-if="!(dbyiwanDetailChu.status==0 ||dbyiwanDetailChu.status==1 ||dbyiwanDetailChu.status==-3)">{{dbyiwanDetailChu.shiftId}}</el-form-item>
                </div>
                 <div class="shanga" >
                    <el-form-item label="申请人：">{{dbyiwanDetailChu.createrName}}</el-form-item>
                   
                    <el-form-item label="申请时间：">
                        <span
                            v-if="dbyiwanDetailChu.createTime"
                        >{{dbyiwanDetailChu.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </el-form-item> 
                    <el-form-item label="审核人：" v-if="dbyiwanDetailChu.auditorName">{{dbyiwanDetailChu.auditorName}}</el-form-item>
                    <el-form-item label="审核时间：" >
                        <span
                            v-if="dbyiwanDetailChu.auditTime"
                        >{{dbyiwanDetailChu.auditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </el-form-item>
                    
                     <el-form-item label="拒绝原因：" v-if="dbyiwanDetailChu.status==-3">
                            <span>{{dbyiwanDetailChu.refuseReason}}</span>
                    </el-form-item>
                </div>
                <el-table
                    :data="diaoyiwanListChu"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <!--@select="dbjujue"-->
                    <el-table-column label="序号" align="center" min-width="55">
                        <template slot-scope="scope">
                            <span v-if="diaoyiwanListChu.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品类别" align="center" min-width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出库数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.orderCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column type="selection" label="" width="90" align="center">
                    </el-table-column>-->
                </el-table>

               
            </el-form>
                    
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="caigouyichu=false">关闭</el-button>
                <!--<el-button type='danger' @click="dbjujueshenhe">拒绝</el-button>-->
                <!--<el-button type="primary" @click="dbquerenshenhe">确认</el-button>-->
            </div>
        </el-dialog>

        <!--商品调拨已入库-->
        <el-dialog :visible.sync="caigouyiru" title="商品调拨入库" class="caigousq_tab caigoudb_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item label="商品调拨单号：">{{dbyiwanDetail.orderNumber}}</el-form-item>
                    <el-form-item label="状态：" v-if="dbyiwanDetail.status==3">已完成</el-form-item>
                    <el-form-item label="状态：" v-if="dbyiwanDetail.status==1">未入库</el-form-item>
                    <el-form-item label="调出加油站：">{{dbyiwanDetail.oilsNameOut}}</el-form-item>
                    <el-form-item label="调入加油站：">{{dbyiwanDetail.oilsNameIn}}</el-form-item>
                    <el-form-item
                        label="营业日："
                    >{{dbyiwanDetail.businessDay | parseTime('{y}-{m}-{d}')}}</el-form-item>
                    <el-form-item label="班次：">{{dbyiwanDetail.shiftId}}</el-form-item>
                   
                        <el-form-item label="收货人：">{{dbyiwanDetail.receiver}}</el-form-item>
                        <el-form-item label="收货时间：">
                            <span
                                v-if="dbyiwanDetail.receiveTime"
                            >{{dbyiwanDetail.receiveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                            <span v-else></span>
                        </el-form-item>
                </div>
                <el-table
                    :data="diaoyiwanList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <!--@select="dbjujue"-->
                    <el-table-column label="序号" align="center" min-width="55">
                        <template slot-scope="scope">
                            <span v-if="diaoyiwanList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品类别" align="center" min-width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <!--<span><el-input v-model="scope.row.orderCount" style="width:80px;"/></span>-->
                            <span>{{scope.row.orderCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收货数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.orderCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column type="selection" label="" width="90" align="center">
                    </el-table-column>-->
                </el-table>

                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="caigouyiru=false">关闭</el-button>
                <!--<el-button type='danger' @click="dbjujueshenhe">拒绝</el-button>-->
                <!--<el-button type="primary" @click="dbquerenshenhe">确认</el-button>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
} from "@/api/article";
import {
    diaoboList,
    diaoboShen,
    diaoShenList,
    diaoboDetail,
    diaoboRuku,
    diaoboCheXiao
} from "@/api/shangpin";
import addOrder from "./addOrder/add";

import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination, addOrder },
    data() {
        return {
            value6: "",
            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            form: {
                name: ""
            },
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                status: "",
                typeId: "",
                orderNumber: ""
            },
            dialogStatus: "",
            dialogFormVisible: false,
            Shenqing: false,
            shangpintj: false,
            clickData: "",
            xuanzeShangpin: [],
            daitijiao: "",
            yuanyin: "",
            zhuangtai: [
                {
                    id: 0,
                    name: "待审批"
                },
                {
                    id: 1,
                    name: "已出库"
                },
                {
                    id: 3,
                    name: "已完成"
                },
                {
                    id: 2,
                    name: "未入库"
                },
                {
                    id: -3,
                    name: "已作废"
                }
            ],
            danju: [
                {
                    id: 1,
                    name: "调拨出库"
                },
                {
                    id: 2,
                    name: "调拨入库"
                }
            ],

            //----------------------------------------调拨的值开始
            //未入库弹框
            caigouweiru: false,
            //未入库详细信息
            dbRukuDetail: "",
            diaoruWeiruList: [],
            //已出库弹框
            caigouyichu: false,
            //入库查看查看查看
            dbyiwanDetail: "",
            diaoyiwanList: [],
            //出库查看查看查看
            dbyiwanDetailChu: "",
            diaoyiwanListChu: [],
            caigouyiru: false,

            //----------------------------------------调拨的值结束
        };
    },
    created() {
        this.getList();
    },
    methods: {
        sortChange(data) {},
        returnedCountSum(){
            let sum = 0;
            this.xuanzeShangpin.forEach((item,index)=>{
                if(item.lastName){
                    this.xuanzeShangpin.splice(index,1)
                }else{
                    if(Number(item.orderCount)>=0){
                        sum += Number(item.orderCount);
                    }
                }
            })
            this.xuanzeShangpin.push({
                lastName:'合计',
                orderCount:sum
            })
        },
        getData(val) {
            console.log(val);
            this.xuanzeShangpin = val;
            // this.xuanzeShangpin.forEach(item => {
            //     item["orderCount"] = "";
            // });
            this.shangpintj = false;
            console.log(this.xuanzeShangpin);
            this.returnedCountSum()
        },
        guaT(val) {
            this.shangpintj = false;
        },
        getList() {
            console.log(this.listQuery);
            diaoShenList(this.listQuery).then(res => {
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });
        },
        shenqing() {
            this.Shenqing = true;
        },
        chuku() {
            this.xuanzeShangpin.forEach(item => {
                delete item["createTime"];
            });
            //	    	console.log(this.xuanzeShangpin)
            let arr = [];
            if (this.daitijiao.length > 0) {
                this.xuanzeShangpin.forEach(item => {
                    this.daitijiao.forEach(is => {
                        if (item.id == is.id) {
                            arr.push(item);
                        }
                    });
                });
            } else {
                arr = this.xuanzeShangpin;
            }

            console.log(arr);

            arr = [...arr]
            arr.splice(arr.length - 1,1)

            let flage = 1;
            let v = /^([1-9][0-9]*){1,3}$/;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].orderCount > arr[i].repertory) {
                    flage = -2;
                    break;
                } else if (!v.test(arr[i].orderCount)) {
                    flage = -1;
                }
            }

            if (flage == 1) {
                let data = {
                    goodsList: arr,
                    allocateReason: this.yuanyin
                };
                console.log(data);
                diaoboShen(data).then(res => {
                    this.Shenqing = false;
                    this.xuanzeShangpin = [];
                    this.getList();
                });
            } else if (flage == -2) {
                this.$notify({
                    title: "警告",
                    message: "调拨数量不能大于库存",
                    type: "warning"
                });
            } else if (flage == -1) {
                this.$notify({
                    title: "警告",
                    message: "出库数量应大于零",
                    type: "warning"
                });
            }
        },
        handleSelectionChange(selection, row) {
            this.daitijiao = selection;
            console.log(selection);
            console.log(row);
        },
        shanchuD() {
            if (this.daitijiao.length > 0) {
                this.xuanzeShangpin.forEach((item, index) => {
                    this.daitijiao.forEach((is, i) => {
                        if (item.id == is.id) {
                            this.xuanzeShangpin.splice(index, 1);
                        }
                    });
                });
                let leg = this.xuanzeShangpin.length;
                for (let i = leg - 1; i >= 0; i--) {
                    for (let j = 0; j < this.daitijiao.length; j++) {
                        if (this.xuanzeShangpin[i]) {
                            if (
                                this.xuanzeShangpin[i].id ==
                                this.daitijiao[j].id
                            ) {
                                //				                rightData.push(leftData[i])
                                this.xuanzeShangpin.splice(i, 1);
                                continue; //结束当前本轮循环，开始新的一轮循环
                            }
                        }
                    }
                }
            } else {
            }
            this.returnedCountSum()
        },
        shouhuo(row) {
            if (row.orderId) {
                //入库的信息有orderId

                //出入库详情调用同一个接口
                let data = {
                    id: row.orderId
                };
                //dbRukuShou方法用的
                this.dbRukuShouId = row.id;
                this.dbRukuShouOrderId = row.orderId;

                console.log(data);
                diaoboDetail(data).then(res => {
                    console.log(res);
                    this.dbRukuDetail = res.data.goodsAllocateApplyInfo;
                    this.diaoruWeiruList = res.data.goodsList;

                    let sum = 0;
                    this.diaoruWeiruList.forEach((item)=>{
                        sum += Number(item.orderCount);
                    })
                    this.diaoruWeiruList.push({
                        lastName:'合计',
                        orderCount:sum
                    })

                    this.caigouweiru = true;
                });
            } else {
                //出库的信息没有orderId
            }
        },
        dbRukuShou() {
            let arr = [];
            console.log(this.diaoruWeiruList);
            this.diaoruWeiruList.forEach(item => {
                let dd = {
                    id: item.id,
                    receiveGoodsNum: item.orderCount
                };
                arr.push(dd);
            });

            arr = [...arr]
            arr.splice(arr.length - 1,1)

            let data = {
                id: this.dbRukuShouId,
                orderId: this.dbRukuShouOrderId,
                receiveGoodsList: arr
            };
            console.log(data);
            diaoboRuku(data).then(res => {
                this.caigouweiru = false;
                this.$notify({
                    title: "成功",
                    message: "已确认收货",
                    type: "success"
                });
                this.getList();
            });
        },
        dbchakanDetail(row) {
            console.log(row);
            if (row.orderId) {
                //入库的信息有orderId

                //出入库详情调用同一个接口
                let data = {
                    id: row.orderId
                };
                console.log(data);
                diaoboDetail(data).then(res => {
                    console.log(res);
                    this.dbyiwanDetail = res.data.goodsAllocateApplyInfo;
                    this.diaoyiwanList = res.data.goodsList;

                    let sum = 0;
                    this.diaoyiwanList.forEach((item)=>{
                        sum += Number(item.orderCount);
                    })
                    this.diaoyiwanList.push({
                        lastName:'合计',
                        orderCount:sum
                    })

                    this.caigouyiru = true;
                });
            } else {
                //出库的信息没有orderId

                let data = {
                    id: row.id
                };
                console.log(data);
                diaoboDetail(data).then(res => {
                    console.log(res);
                    this.dbyiwanDetailChu = res.data.goodsAllocateApplyInfo;
                    this.diaoyiwanListChu = res.data.goodsList;

                    let sum = 0;
                    this.diaoyiwanListChu.forEach((item)=>{
                        sum += Number(item.orderCount);
                    })
                    this.diaoyiwanListChu.push({
                        lastName:'合计',
                        orderCount:sum
                    })

                    this.caigouyichu = true;
                });
            }
        },
        danhaochaxun() {
            this.pages = 1;
            this.getList();
        },
        chehuile(row) {
            this.$confirm("此操作将撤回该订单, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        id: row.id
                    };
                    console.log(data);
                    diaoboCheXiao(data).then(res => {
                        this.$notify({
                            title: "成功",
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        reset() {
            this.xuanzeShangpin = [];
        }
    }
};
</script>

<style scoped>
@import url("./allocation.scss");
</style>
