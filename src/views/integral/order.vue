<style scoped>
    .el-table th>.cell{
        text-align: center;
    }
</style>
<template>
    <div class="warp">
        <div class="header">
            <h3>
                <span></span>订单管理
            </h3>
        </div>
        <div class="main">
            <div class="cha">
                <span>商品类型</span>
                <el-select v-model="type" clearable @change="cha" placeholder="请选择">
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.id"
                        :label="item.goodsType"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <span style="margin-left: 20px;">状态</span>
                <el-select v-model="status" clearable @change="cha" placeholder="请选择">
                    <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <!-- <el-button style="margin-left: 20px;" @click="cha()" type="primary" size="small">查询</el-button> -->
            </div>
            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%;text-align: center"
                :default-sort="{prop: 'date', order: 'descending'}"
            >
                <el-table-column prop="orderNum" label="订单编号" min-width="100" sortable></el-table-column>
                <el-table-column prop="typeName" label="商品类型" min-width="100" sortable>
                    <template slot-scope="scope">
                        <span v-if="scope.row.typeName==1">实体商品</span>
                        <span v-if="scope.row.typeName==2">虚拟商品</span>
                    </template>
                </el-table-column>
                <el-table-column prop="goodsName" label="兑换商品"></el-table-column>
                <el-table-column prop="amount" label="兑换数量" min-width="100" sortable></el-table-column>
                <el-table-column prop="username" label="会员姓名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="consumptionPoints" label="消费积分" min-width="100" sortable></el-table-column>
                <el-table-column
                    prop="createTimeStr"
                    label="兑换时间"
                    min-width="150"
                    align="center"
                    sortable
                ></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待发货</span>
                        <span v-if="scope.row.status==1">已发货</span>
                        <span v-if="scope.row.status==-1">废弃</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button
                            @click="see(scope.$index, scope.row)"
                            type="primary"
                            size="small"
                        >查看</el-button>
                        <el-button
                            @click="fa(scope.$index, scope.row)"
                            v-if="scope.row.status==0&&scope.row.typeName==1"
                            type="danger"
                            size="small"
                        >发货</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-show="total>0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="limit"
                @pagination="get"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
            <!-- 查看框 -->
            <el-dialog :visible.sync="seeVisible" width="50%" title="查看">
                <div class="see">
                    <div class="top">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <p>订单编号：{{seeData.orderNum}}</p>
                                    <p>兑换时间：{{seeData.createTimeStr}}</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light">
                                    <p v-show="seeData.status==0">状态：待发货</p>
                                    <p v-show="seeData.status==1">状态：已发货</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="middle">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <p>
                                        商品类别：
                                        <span v-show="seeData.typeName==1">实体商品</span>
                                        <span v-show="seeData.typeName==2">虚拟商品</span>
                                    </p>
                                    <p>商品名称：{{seeData.goodsName}}</p>
                                    <p>兑换数量：{{seeData.amount}}</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light">
                                    <p>会员编号：{{seeData.memberNo}}</p>
                                    <p>会员姓名：{{seeData.username}}</p>
                                    <p>消费积分：{{seeData.consumptionPoints}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="middle">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <p v-show="seeData.exchangeType==1">兑换方式：线下寄出</p>
                                    <p v-show="seeData.exchangeType==2">兑换方式：系统自动</p>
                                    <p>收货人：{{seeData.receivingName}}</p>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light">
                                    <!-- <p>寄送信息：{{seeData.memberNumber}}</p> -->
                                    <p>地址：{{seeData.receivingAddress}}</p>
                                    <p>电话：{{seeData.receivingPhone}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="footer" v-show="seeData.status==1">
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <p>物流：{{seeData.logisticsName}}</p>
                                    
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light">
                                    <!-- <p>寄送信息：{{seeData.memberNumber}}</p> -->
                                    <p>单号：{{seeData.logisticsNum}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="seeVisible = false;seeData={}">关闭</el-button>
                    <el-button type="primary" v-show="seeData.status==0" @click="faVisible=true">发货</el-button>
                </div>
            </el-dialog>
            <!-- 发货框 -->
            <el-dialog :visible.sync="faVisible" width="50%" title="发货">
                <div class="see">
                    <div class="box">
                        <div class="left">
                            <span>物流公司</span>
                        </div>
                        <div class="right">
                            <el-select v-model="logisticsName" placeholder="请选择">
                                <el-option
                                    v-for="item in logisticsOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>单号</span>
                        </div>
                        <div class="right">
                            <el-input
                                style="width: 200px;"
                                v-model="logisticsNum"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="faVisible = false">取消</el-button>
                    <el-button type="primary" @click="send">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getdinglist } from "@/api/jifenshangcheng";
import { fahuo } from "@/api/jifenshangcheng";
import { chaxiang } from "@/api/jifenshangcheng";
import { getshangtype } from "@/api/jifenshangcheng";
import { wuliu } from "@/api/jifenshangcheng";

export default {
    name: "integralorderDemo",
    data() {
        return {
            //商品管理列表临时数据
            tableData: [],
            seeVisible: false, //控制查看弹出框显示与隐藏
            faVisible: false, //控制发送弹出框显示与隐藏
            seeData: "", //查看数据暂存
            status: "", //状态
            type: "", //商品类型
            typeOptions: [
                {
                    id: 1,
                    goodsType: "实体商品"
                },
                {
                    id: 2,
                    goodsType: "虚拟商品"
                }
            ],
            statusOptions: [
                {
                    value: 0,
                    label: "待发货"
                },
                {
                    value: 1,
                    label: "已发货"
                },
                {
                    value: -1,
                    label: "废弃"
                }
            ],
            sendData: "", //发送数据
            logisticsNum: "", //物流单号
            logisticsName: "", //物流公司
            logisticsOptions: [
                // {
                //     value: "顺丰速运",
                //     label: "顺丰速运"
                // },
            ],
            //分页
            total: 0,
            page: 1,
            limit: 10,
            currentPage: 1,
            loading: true
        };
    },
    mounted() {
        this.get();
        // this.gettype()
    },
    methods: {
        get() {
            this.loading = true;
            var data = {
                goodsTypeId: this.type,
                status: this.status,
                pageNum: this.page,
                pageSize: this.limit
            };
            getdinglist(data).then(response => {
                this.total = response.data.total;
                this.tableData = response.data.rows;
                this.loading = false;
            });
            wuliu({}).then(response => {
                console.log(response.data)
                this.logisticsOptions = response.data
            });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.limit = val;
            this.get();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val;
            this.get();
        },
        // gettype(){
        //   var data ={}
        //   getshangtype(data)
        //     .then(response => {
        //       console.log(response.data)
        //       this.typeOptions = response.data.list
        //     })
        // },
        fa(index, row) {
            this.faVisible = true;
            this.seeData = row;
        },
        send() {
            if (this.logisticsName == "" || this.logisticsName == null) {
                this.$message.error("请选择物流公司");
                return;
            }
            if (this.logisticsNum == "" || this.logisticsNum == null) {
                this.$message.error("请填写物流单号");
                return;
            }
            var data = {
                id: this.seeData.id,
                dictionariesId: this.logisticsName,
                logisticsNum: this.logisticsNum
            };
            fahuo(data).then(response => {
                console.log(response);
                console.log(response.data);
                this.faVisible = false;
                this.get();
                this.$message({
                    message: "发货成功",
                    type: "success"
                });
            });
        },
        //编辑
        see(index, row) {
            this.seeVisible = true;
            var data = {
                id: row.id
            };
            chaxiang(data).then(response => {
                console.log(response);
                console.log(response.data);
                this.seeData = response.data;
            });
            // this.seeData=row;
        },
        cha() {
            this.loading = true;
            var data = {
                goodsTypeId: this.type,
                status: this.status,
                pageNum: this.page,
                pageSize: this.limit
            };
            console.log(data);
            getdinglist(data).then(response => {
                console.log(response.data);
                console.log(response.data.rows);
                this.total = response.data.total;
                this.tableData = response.data.rows;
                this.loading = false;
            });
        }

        // formatter(row, column) {
        //   return row.address;
        // },
    }
};
</script>

<style scoped>
@import url("./order.scss");
</style>