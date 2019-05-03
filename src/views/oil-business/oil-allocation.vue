<template>
    <div class="app-container oli-allocation">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top">
                <el-form-item label="油品调拨"/>
                <el-button type="primary" class="diao_btn" @click="oilShenqing">油品调拨申请</el-button>
            </div>
    
            <div class="items">
                <el-form-item label="调拨单号" label-width="100px">
                    <el-input
                        v-model="listQuery.orderNumber"
                        style="width:200px"
                        @input="getList"
						placeholder="请输入订单号"
                    />
                </el-form-item>
                <el-form-item label="业务类别" style="margin-right: 0px;" label-width="90px">
                    <el-select
                        v-model="listQuery.typeId"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in type"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="油品品号" style="margin-right: 0px;" label-width="90px">
                    <el-select
                        v-model="listQuery.applyOils"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in youlist"
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
                <div class="block">
                    <span>日期</span>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        unlink-panels
                        style="width:200px"
                        range-separator="-"
                        start-placeholder="开始"
                        end-placeholder="结束"
                        :picker-options="pickerOptions2"
                        @change="shijian"
                    ></el-date-picker>
                </div>
            </div>

            <el-table :data="list" fit highlight-current-row style="width: 100%;" >
                <el-table-column label="业务类别" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="调拨单号" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="油品品号" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.planCount}} 升</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待审批</span>
                        <span v-if="scope.row.status==1">未出库</span>
                        <span v-if="scope.row.status==2&&scope.row.orderTypeName==='调拨出库'">已出库</span>
                        <span v-if="scope.row.status==2&&scope.row.orderTypeName==='调拨入库'">未入库</span>
                        <span v-if="scope.row.status==6">已完成</span>
                        <span v-if="scope.row.status==-3">已作废</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    width="150"
                    class-name="small-padding"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-else: @click="daiShenpi(scope.row)">查看</el-button>
                        <el-button size="mini" type="primary"  v-if="scope.row.status==2&&scope.row.orderTypeName==='调拨入库'"  @click="wancheng(scope.row)">查看</el-button>
                        <el-button
                            size="mini"
                            type="info"
                            @click="ypDBche(scope.row)"
                            v-if="scope.row.status=='0'"
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

        <!--调拨申请弹框-->
        <el-dialog :visible.sync="Shenqing" style="width:60%;margin:10vh auto" title="油品调拨申请"  class="shenqing_tab" @open="qingShen">
            <el-form
                ref="dataForm1"
                :rules="rules"
                :model="temp"
                label-position="right"
                label-width="120px"
                style="line-height:60px;"
            >
                <el-form-item label="油品品号：" prop="applyOils">
                    <el-select v-model="temp.applyOils" clearable style="width:100%;" class="filter-item">
                        <el-option
                            v-for="item in youlist"
                            :key="item.id"
                            :label="item.oils_no_type"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="计划调拨数量：" class="shul" style="margin:20px 0;" prop="planCount">
                    <el-input placeholder="请输入数量" v-model.number="temp.planCount">
                        <template slot="append">升</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="计划调拨时间：" prop="planTime">
                    <el-date-picker
                        v-model="temp.planTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        :picker-options="pickerOptions3"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="调拨原因：" class="beizhu" style="margin-top:20px;" prop="allocateReason">
                    <el-input
                        type="textarea"
                        v-model="temp.allocateReason"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        placeholder="请输入内容"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Shenqing = false">取消</el-button>
                <el-button type="primary" @click="shenqingDB">确认</el-button>
            </div>
        </el-dialog>

        <!--待审批弹框-->
        <el-dialog :visible.sync="daiShen" title="油品调拨" class="daipi_tab">
            <el-form label-position="left" label-width="110px">
                <div class="left">
                      <el-form-item
                        label="调拨单号："
                    >{{ypDBDetail.orderNumber}}</el-form-item>
                    <el-form-item
                        label="出库加油站："
                        v-if="ypDBDetail.outOilsStationNameChu"
                    >{{ypDBDetail.outOilsStationName}}</el-form-item>
                    <el-form-item
                        label="入库加油站："
                        v-if="ypDBDetail.oilsStationNameRu"
                    >{{ypDBDetail.oilsStationName}}</el-form-item>
                    <el-form-item
                        label="申请油站："
                        v-else="ypDBDetail.oilsStationName"
                    >{{ypDBDetail.oilsStationName}}</el-form-item>
                     <el-form-item label="计划调拨数量：">{{ypDBDetail.planCount}}升</el-form-item>
                    <el-form-item label="申请人：">{{ypDBDetail.createrName}}</el-form-item>
                    
                     <el-form-item
                        label="审核人："
                        v-if="ypDBDetail.modifierName"
                    >{{ypDBDetail.modifierName}}</el-form-item>
                    <el-form-item label="调拨原因：" class="beizhu" >
                         {{ypDBDetail.allocateReason}}
                    </el-form-item>
                </div>
                <div class="right">
                    <el-form-item label="状态：" class="zhuangtai">
                        <span v-if="ypDBDetail.status==0">待审批</span>
                        <span v-if="ypDBDetail.status==1">未出库</span>
                        <span v-if="ypDBDetail.status==2&&ypDBDetail.orderTypeName=='调拨出库'">已出库</span>
                        <span v-if="ypDBDetail.status==6">已完成</span>
                        <span v-if="ypDBDetail.status==-3">已作废</span>
                        <span v-if="ypDBDetail.status==2&&ypDBDetail.orderTypeName=='调拨入库'" >未入库</span>
                    </el-form-item>
                     <el-form-item label="调拨油品：">{{ypDBDetail.oilsName}}</el-form-item>
                    <el-form-item
                        label="计划调拨时间："
                    >{{ypDBDetail.planTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item
                        label="申请时间："
                    >{{ypDBDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>

                      
                       
                    <el-form-item
                        label="审核时间："
                        v-if="ypDBDetail.modifyTime"
                    >{{ypDBDetail.modifyTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                   <el-form-item label="拒绝原因：" class="beizhu" v-if="!ypDBDetail.status==0">
                          <span>{{ypDBDetail.refuseReason}}</span>
                        <!-- <el-input
                            type="textarea"
                            :disabled="true"
                            :autosize="{ minRows: 3, maxRows: 8}"
                            v-model="ypDBDetail.refuseReason"
                        ></el-input> -->
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    oilList,
    oilDBshen,
    oilDBList,
    oilDBChex,
    oilDBDetail,
    oilDBRuKu
} from "@/api/oil";

import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            value1: "",
            value4: "",
            value6: "",
            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            form: {
                name: ""
            },
            ypDBDetail: {},
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                orderNumber: "",
                typeId: "",
                applyOils: "",
                status: "",
                beginAddTime: "",
                endAddTime: ""
            },
            type: [
                {
                    id: 1,
                    name: "调拨出库"
                },
                {
                    id: 2,
                    name: "调拨入库"
                }
            ],
            zhuangtai: [
                {
                    id: 0,
                    name: "待审核"
                },
                {
                    id: 1,
                    name: "未出库"
                },
                {
                    id: 2,
                    name: "已出库"
                },
                {
                    id: 2,
                    name: "未入库"
                },
                {
                    id: 6,
                    name: "已完成"
                },
                {
                    id: -3,
                    name: "已作废"
                }
            ],
            youlist: [],
            temp: {
                allocateReason: "",
                applyOils: "",
                planCount: "",
                planTime: ""
            },
            rules: {
                allocateReason: [
                    { required: true, message: "不能为空", trigger: "change" }
                ],
                applyOils: [
                    { required: true, message: "不能为空", trigger: "change" }
                ],
                planCount: [
                    { required: true, message: "不能为空" },
                    { type: "number", message: "必须为数字值" }
                ],
                planTime: [
                    { required: true, message: "不能为空", trigger: "change" }
                ]
            },
            Shenqing: false,
            daiShen: false,
            importanceOptions: [],

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
            pickerOptions3: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    created() {
        this.getList();
        this.getyoupin();
        console.log(this.youlist)
    },
    methods: {
        getList() {
            console.log(this.listQuery);
            if(this.listQuery.typeId=='1'){
               this. zhuangtai=[
                {
                    id: 0,
                    name: "待审核"
                },
                {
                    id: 1,
                    name: "未出库"
                },
                {
                    id: 2,
                    name: "已出库"
                },
                {
                    id: -3,
                    name: "已作废"
                },
                {
                    id: 6,
                    name: "已完成"
                },
            ]
            }
            if(this.listQuery.typeId=='2'){
                this. zhuangtai= [
                {
                    id: 2,
                    name: "未入库"
                },
                {
                    id: 6,
                    name: "已完成"
                }
            ]
            }
            oilDBList(this.listQuery).then(res => {
                console.log(res);
                if(res.data==null){
                    return
                }else{
                this.list = res.data.rows;
                this.total = res.data.total;
                }
                
            });
        },
        wancheng(){
                console.log(111)
                this.$router.push({
                    path:'oil-purcaseChakan',
                    name:'oil-ChakanDemo',
                     query: {
                        id: row.id
                    }
                })
        },
        getyoupin() {
			let data = {
                getOilsStationsOils: "1"
			};
            oilList(data).then(res => {
                console.log('油品品号');
                console.log(res);
                this.youlist = res.data;
            });
        },
        oilShenqing() {
            this.Shenqing = true;
        },
        qingShen() {},
        shijian() {
            if (this.value6) {
                console.log(this.value6);
                this.listQuery.beginAddTime = this.value6[0];
                this.listQuery.endAddTime = this.value6[1];
            } else {
                this.listQuery.beginAddTime = "";
                this.listQuery.endAddTime = "";
            }
            this.getList();
        },
        shenqingDB() {
            this.$refs["dataForm1"].validate(valid => {
                if (valid) {
                    oilDBshen(this.temp)
                        .then(res => {
                            this.$notify({
                                title: "成功",
                                message: "执行成功",
                                type: "success",
                                duration: 1000
                            });
                            this.getList();
                            this.Shenqing = false;
                            this.$refs["dataForm1"].resetFields();
                        })
                        .catch(res => {
                            this.$notify.error({
                                message: "执行失败，请重试",
                                duration: 2000
                            });
                        });
                }
            });
        },
        daiShenpi(row) {
            console.log(row)
            if (row.orderTypeName=='调拨入库') {
                var a = 1
            }
            if (row.orderTypeName=='调拨出库') {
                var a = 2
            }
            if (row.status==2||row.status==6) {
                console.log('跳')
                this.$router.push({
                    path:'/oil-business/oil-allocation-see',
                    query:{
                        id:row.id,
                        a
                    }
                })
            }
            let data = {
                id: row.id,
                orderTypeName:row.orderTypeName
            };
            if (row.orderTypeName == "调拨出库") {
                oilDBDetail(data).then(res => {
                    console.log(res);
                    this.ypDBDetail = res.data;
                });
                this.ypDBDetail["orderTypeName"]=row.orderTypeName
                this.daiShen = true;
                console.log(this.ypDBDetail)
            } else {
                this.ypDBDetail = {};
                oilDBRuKu(data).then(res => {
                    console.log(res);
                    this.ypDBDetail = res.data;
                    this.ypDBDetail.outOilsStationNameChu =
                        res.data.outOilsStationName;
                    this.ypDBDetail.oilsStationNameRu =
                        res.data.oilsStationName;
                    // this.ypDBDetail["orderTypeName"] = row.orderTypeName;
                    this.daiShen = true;
                });
            }
        },
        ypDBche(row) {
            this.$confirm("此操作将撤销此订单, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        id: row.id
                    };
                    oilDBChex(data)
                        .then(res => {
                            this.$notify({
                                title: "成功",
                                message: "执行成功",
                                type: "success",
                                duration: 1000
                            });
                            this.getList();
                        })
                        .catch(res => {
                            this.$notify.error({
                                message: "执行失败，请重试",
                                duration: 2000
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<style scoped>
@import url("./allocation.scss");
</style>
<style scoped>
.app-main .oli-allocation .dbriqi {
    padding-top: 0;
}
.block>span{
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
  
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 36px;
        width: 100px;
        font-weight: 700;
}
</style>

<style scoped>
.app-main .cans .daoguan_tab .el-form-item {
    margin-bottom: 0px;
}
.el-form-item--medium {
    margin-bottom: 0;
}
</style>
