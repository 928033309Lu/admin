<template>
    <div class="app-container oli-purchase" style="padding:3px 0">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom:8px">
                <el-form-item label="油品采购"/>
                <el-button type="primary" class="caigou_btn" @click="caigouTk()">采购申请</el-button>
            </div>

            <div class="liud">
                <div class="left">
                    <ul>
                        <li class="guan1" v-for="item in guanhaoList">
                            <div class="yuan">
                                <div class="neiyuan"></div>
                                <div class="neiyuan2" :style="item.top"></div>
                                <div class="kucun">库存：{{item.oilVolume}}吨</div>
                            </div>
                            <p>{{item.oilcanNo}}号罐 - {{item.oilsName}}</p>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <oilzhe></oilzhe>
                </div>
            </div>
            <div class="top down">
                <span class="_flag _authorize"></span>
            </div>
                <div class="items">
                <el-form-item label="采购单号" label-width="100px">
                    <el-input
                        v-model="listQuery.orderNumber"
                        style="width:200px"
                        @input="getList"
						placeholder="请输入订单号"
                    />
                </el-form-item>
                <el-form-item label="油品品号" style="margin-right: 0px;" label-width="90px">
                    <el-select
                        v-model="listQuery.applyOil"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in ypPinhao"
                            :key="item.id"
                            :label="item.oils_no_type"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" style="margin-right:0px;" label-width="100px">
                    <el-select
                        v-model="listQuery.status"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in zhuangtai"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <el-table
                :key="tableKey"
                :data="list"
                fit
                highlight-current-row
                style="width: 100%;"
                :header-cell-style="{background:'#f5f7fa'}"
            >
                <el-table-column label="采购单号" align="center" min-width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="油品品号" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请数量" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.purchaseAmount}}吨</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待审批</span>
                        <span v-if="scope.row.status==1">准备配送</span>
                        <span v-if="scope.row.status==5">配送中</span>
                        <span v-if="scope.row.status==6">已完成</span>
                        <span v-if="scope.row.status==-3">已作废</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    width="150"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="daishenpi(scope.row)"
                            v-if="scope.row.status==0||scope.row.status==-3"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==5||scope.row.status==6||scope.row.status==1"
                            @click="yiwancheng(scope.row)"
                        >
                            <!--<router-link to="oil-dingdan">-->
                            查看
                            <!--</router-link>-->
                        </el-button>
                        <el-button
                            size="mini"
                            type="info"
                            @click="chexiao(scope.row)"
                            v-if="scope.row.status==0"
                        >撤销</el-button>
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
        <!--油品采购申请弹框-->
        <el-dialog
            :visible.sync="dialogFormVisible"
            title="油品采购申请"
            class="ypcg_tk"
            @open="qingShen"
        >
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="right"
                label-width="120px"
            >
                <div class="upper" style="display: flex;justify-content: space-between;">
                    <div class="left" >
                        <el-form-item label="油品品号：" prop="applyOil">
                            <el-select
                                v-model="temp.applyOil"
                                style="width:300px"
                                class="filter-item"
                                @change="getRongl"
                                clearable
                            >
                                <el-option
                                    v-for="item in orderLists"
                                    :key="item.id"
                                    :label="item.oils_no_type"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请数量：" class="shul" style="margin:20px 0 20px 0;" prop="purchaseAmount">
                            <el-input
                                placeholder="请输入数量"
                                style="width: 300px;"
                                v-model.number="temp.purchaseAmount"
                            >
                                <template slot="append">吨</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="申请到达时间：" style="margin-bottom:20px;" prop="planArriveTime">
                            <el-date-picker
                                v-model="temp.planArriveTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                :pickerOptions="pickerOptions0"
                                style="width: 300px;"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                </div>
                <div class="tishi">
                    <el-table
                        :data="rongliangbiao"
                        style="width: 100%;"
                        :header-cell-style="{background:'#f5f7fa'}"
                    >
                        <el-table-column label="库存量" align="center" min-width="120">
                            <template slot-scope="scope">
                                <span> {{scope.row.oilVolumeSum}} 升</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="罐容量" align="center" min-width="120">
                            <template slot-scope="scope">
                                <span> {{scope.row.maxWarnCapSum}} 升</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="昨日销量" align="center" min-width="120">
                            <template slot-scope="scope">
                                <span> {{scope.row.oneDaySumCount}} 升</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="近十日销量" align="center" min-width="120">
                            <template slot-scope="scope">
                                <span> {{scope.row.lastDaysAvgCount}} 升</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div
                    class="jianyi"
                    style="text-align: left;color: #307AFF;line-height: 80px;"
                >建议采购数量：
				<span> {{ obj.suggestPurchaseCountLitre }} </span>
				升 ≈ 
				<span> {{ obj.suggestPurchaseCountWeight }} </span>
				吨
				</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="querensenqing">确认</el-button>
            </div>
        </el-dialog>

        <!--油品采购申请待审批弹框-->
        <el-dialog :visible.sync="ypcgWeishen" title="油品采购" class="ypcg_xinxi">
            <el-form label-position="right" label-width="120px">
                <div class="upper">
                    <el-form-item label="采购单号：">{{ypcgWeishenDetail.orderNumber}}</el-form-item>
                    <el-form-item label="状态：">
                        <span v-if="ypcgWeishenDetail.status==0">待审批</span>
                        <span v-if="ypcgWeishenDetail.status==1">准备配送</span>
                        <span v-if="ypcgWeishenDetail.status==-3">已作废</span>
                    </el-form-item>
                    <el-form-item label="油品品号：">{{ypcgWeishenDetail.oilsName}}</el-form-item>
                    <el-form-item label="采购数量：">{{ypcgWeishenDetail.purchaseAmount}}吨</el-form-item>
                    <el-form-item label="申请人：">{{ypcgWeishenDetail.createrName}}</el-form-item>
                    <el-form-item label="申请时间：">{{ypcgWeishenDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item label="审批人："  v-if="ypcgWeishenDetail.status==-3">{{ypcgWeishenDetail.merchantName}}</el-form-item>
                    <el-form-item label="审批时间："  v-if="ypcgWeishenDetail.status==-3">{{ypcgWeishenDetail.merchantAuditTime}}</el-form-item>
                    <el-form-item label="拒绝原因：" v-if="ypcgWeishenDetail.merchantRefuseReason">{{ypcgWeishenDetail.merchantRefuseReason}}</el-form-item>
                    <el-form-item
                        label="申请计划到达时间："
                        label-width="150px"
                    >{{ypcgWeishenDetail.planArriveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ypcgWeishen = false">关闭</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
import oilzhe from "./youpinzhexiantu";
import {
    oilList,
    oilCaigou,
    oilCaigouList,
    oilCaigouDetail,
    oilShangChex,
    oilYGList,
    oilxiaoliang
} from "@/api/oil";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination, oilzhe },
    data() {
        return {
            value4: "",
            value6: "",
            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            form: {
                name: ""
            },
              zhuangtai: [   
                        {
                            id: 0,
                            name: "待审批"
                        },
                        {
                            id: 1,
                            name: "准备配送"
                        },
                        {
                            id: 5,
                            name: "配送中"
                        },
                        {
                            id: -3,
                            name: "已作废"
                        },
                        {
                            id: 6,
                            name: "已完成"
                        },
            ],
            temp: {
                applyOil: "",
                purchaseAmount: "",
                planArriveTime: ""
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            rules: {
                applyOil: [
                    { required: true, message: "不能为空", trigger: "change" }
                ],
                purchaseAmount: [
                    { required: true, message: "不能为空" },
                    { type: "number", message: "必须为数字值" }
                ],
                planArriveTime: [
                    { required: true, message: "不能为空", trigger: "change" }
                ]
            },
            tableData: [
                {
                    krongliang: 1000,
                    grongliang: 1000,
                    zxiao: 1000,
                    qxiao: 1000
                }
            ],
            orderLists: [],
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                applyOil: "",
                status:'',
                orderNumber:''
                
            },
            ypPinhao: [],
            dialogStatus: "",
            dialogFormVisible: false,
            flsge: 0,
            ypcgWeishen: false,
            ypcgWeishenDetail: {},
            guanhaoList: [],
            rongliangbiao: [],
            obj:{
                oneDaySumCount:'0',
                lastDaysAvgCount:'0',
                oilVolumeSum:'0',
                maxWarnCapSum:'0',
				maxMaxWarnCap:'0',
				minMaxWarnCap:'0',
				density:'0',
				suggestPurchaseCountLitre:'0',	// 建议采购数量（升）
				suggestPurchaseCountWeight:'0'	// 建议采购数量（吨）
            },
        };
    },
    created() {
        this.getList();
        this.gbList();
    },
    methods: {
        getList() {
            oilCaigouList(this.listQuery).then(res => {
                console.log(this.listQuery)
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });
            oilList({}).then(res => {
                console.log(res);
                this.ypPinhao = res.data;
                // this.dialogFormVisible = true;
            });
        },
         sousuode() {
            this.getList();
        },
        gbList() {
            let data = {
                orderByCol: "A.oilcan_no",
                orderByType: "asc"
            };
            oilYGList(data).then(res => {
                console.log(res);
                this.guanhaoList = res.data.oilcanList;
                this.guanhaoList.forEach(item => {
                    item["top"] =
                        "top:" +
                        (-(item.oilVolume / item.totalCap) * 100).toFixed(2) +
                        "%";
                });
                console.log(this.guanhaoList);
            });
        },

        caigouTk() {
            oilList({}).then(res => {
                console.log(res);
                this.orderLists = res.data;
                this.dialogFormVisible = true;
            });
        },
        querensenqing() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    oilCaigou(this.temp)
                        .then(res => {
                            console.log(res);
                            this.$message({
                                type: "success",
                                message: res.data.success,
                                duration: 1000
                            });
                            this.getList();
                            this.dialogFormVisible = false;
                        })
                        .catch(res => {
                            console.log(res.response);
                            this.$notify.error({
                                title: "错误",
                                message: res.response.data.error,
                                duration: 1000
                            });
                        });
                }
            });
        },
        qingShen() {
            if (this.flsge == 1) {
                this.temp = {
                    applyOil: "",
                    purchaseAmount: "",
                    planArriveTime: ""
                };
                this.$refs["dataForm"].resetFields();
            }
            this.flsge = 1;
        },
        daishenpi(row) {
            let data = {
                id: row.id
            };
            oilCaigouDetail(data)
                .then(res => {
                    console.log(res);
                    this.ypcgWeishenDetail = res.data;
                    this.ypcgWeishen = true;
                })
                .catch(res => {
                    console.log(res.response);
                    this.$notify.error({
                        title: "错误",
                        message: res.response.data.error,
                        duration: 1000
                    });
                });
        },
        chexiao(row) {
            this.$confirm("此操作将撤销该订单, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        id: row.id
                    };
                    oilShangChex(data)
                        .then(res => {
                            this.$message({
                                type: "success",
                                message: "执行成功",
                                duration: 1000
                            });
                            this.getList();
                        })
                        .catch(res => {
                            console.log(res.response);
                            this.$notify.error({
                                title: "错误",
                                message: res.response.data.error,
                                duration: 1000
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        yiwancheng(row) {
            this.$router.push({
                path: "oil-dingdan",
                name: "oildingdanDemo",
                query: {
                    id: row.id
                }
            });
        },
        getRongl(val) {
            let data = {
                oilsId: val
            };

            this.rongliangbiao = [];
            oilxiaoliang(data).then(res=>{
                 console.log(res.data)
				 if (res.data.oneDaySumCount) {
					 this.obj.oneDaySumCount = res.data.oneDaySumCount.toFixed(2);
				 } else {
					 this.obj.oneDaySumCount = 0;
				 }
				 if (res.data.lastDaysAvgCount) {
					 this.obj.lastDaysAvgCount = res.data.lastDaysAvgCount.toFixed(2);
				 } else {
					 this.obj.lastDaysAvgCount = 0;
				 }
            });
            oilYGList(data).then(res => {
				console.log(res);
				if (res.data != null && res.data.oilVolumeSum) {
					this.obj.oilVolumeSum = res.data.oilVolumeSum.toFixed(2);
				} else {
					this.obj.oilVolumeSum = 0;
				}
				if (res.data != null && res.data.maxWarnCapSum) {
					this.obj.maxWarnCapSum = res.data.maxWarnCapSum.toFixed(2);
				} else {
					this.obj.maxWarnCapSum = 0;
				}
				if (res.data != null && res.data.maxMaxWarnCap) {
					this.obj.maxMaxWarnCap = res.data.maxMaxWarnCap.toFixed(2);
				} else {
					this.obj.maxMaxWarnCap = 0;
				}
				if (res.data != null && res.data.minMaxWarnCap) {
					this.obj.minMaxWarnCap = res.data.minMaxWarnCap.toFixed(2);
				} else {
					this.obj.minMaxWarnCap = 0;
				}
				if (res.data != null && res.data.density) {
					this.obj.density = res.data.density.toFixed(2);
				} else {
					this.obj.density = 0;
				}
				console.log(this.obj);
				// 计算建议采购数量(升)
				this.obj.suggestPurchaseCountLitre = (this.obj.maxWarnCapSum - this.obj.oilVolumeSum) * 1 + (this.obj.lastDaysAvgCount) * 1;
				if (this.obj.maxWarnCapSum > 0 && this.obj.oilVolumeSum > 0 && this.obj.lastDaysAvgCount > 0 && this.obj.suggestPurchaseCountLitre > 0) {
					this.obj.suggestPurchaseCountLitre = this.obj.suggestPurchaseCountLitre.toFixed(2);
				} else {
					this.obj.suggestPurchaseCountLitre = 0;
				}
				// 计算建议采购数量(吨)
				this.obj.suggestPurchaseCountWeight = this.obj.suggestPurchaseCountLitre / 1000000 * (this.obj.density - 1.1);
				if (this.obj.suggestPurchaseCountLitre > 0 && this.obj.density > 0 && this.obj.suggestPurchaseCountWeight > 0) {
					this.obj.suggestPurchaseCountWeight = this.obj.suggestPurchaseCountWeight.toFixed(2);
				} else {
					this.obj.suggestPurchaseCountWeight = 0;
				}
            });
            this.rongliangbiao.push(this.obj);
        }
    }
};
</script>

<style scoped>
@import url("./purchase.scss");
.el-dialog .el-dialog__header span.el-dialog__title{
    border-left:0px solid #fff;
}
</style>
