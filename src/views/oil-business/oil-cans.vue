<template>
    <div class="app-container cans">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom: 10px;">
                <el-form-item label="油品倒罐"/>
                <el-button type="primary" class="diao_btn" @click="chuangjian">倒罐订单创建</el-button>
            </div>
            <div class="items">
                <el-form-item label="倒罐单号">
                    <el-input
                        v-model="listQuery.orderNumber"
                        style="width: 200px;"
                        @input="sousuode"
                        placeholder="请输入订单号"
                    />
                </el-form-item>
                <el-form-item label="油品品号" label-width="90px">
                    <el-select
                        v-model="listQuery.oilsNo"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="sousuode"
                    >
                        <el-option
                            v-for="item in ypPinhao"
                            :key="item.id"
                            :label="item.oils_no_type"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="90px">
                    <el-select
                        v-model="listQuery.status"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="sousuode"
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
            <!-- <div class="dbriqi">
        <div class="qiri">日期:</div>
        <el-date-picker
		      v-model="value6"
		      type="daterange"
		      align="right"
		      unlink-panels
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      :picker-options="pickerOptions2"
		      @change="shijian"
		      >
		    </el-date-picker>
          
       
            </div>-->
            <el-table :data="list" fit highlight-current-row style="width: 100%;">
                <el-table-column label="倒罐单号" align="center" min-width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="油品品号" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="倒出油罐" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.outOilcanNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="倒入油罐" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.intoOilcanNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsLitre}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">未倒罐</span>
                        <span v-if="scope.row.status==1">倒罐中</span>
                        <span v-if="scope.row.status==6">已完成</span>
                        <span v-if="scope.row.status==-3">已作废</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="150" class-name="small-padding">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==6||scope.row.status==0||scope.row.status==1||scope.row.status==-3"
                            @click="chakan(scope.row)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="upStatus(scope.row)"
                            v-if="scope.row.status!=6"
                        >编辑</el-button>
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

        <!--创建油罐弹框-->
        <el-dialog :visible.sync="chuangjiantk" title="油品倒罐" class="daoguan_tab" @open="qingkong">
            <el-form ref="dataForm" class="clearfix" label-position="left" label-width="70px">
                <div class="left">
                    <div class="box">
                        <span>倒出罐号：</span>
                        <el-select
                            v-model="temp.outPotNo"
                            style="width: 200px"
                            class="filter-item"
                            @change="huoquOil"
                            clearable
                        >
                            <el-option
                                v-for="item in youguanhao"
                                :key="item.id"
                                :label="item.oilcanNo"
                                :value="item.id"
                            />
                        </el-select>
                    </div>
                    <div class="box">
                        <span>倒入罐号：</span>
                        <el-select
                            v-model="temp.intoPotNo"
                            style="width: 200px"
                            class="filter-item"
                            @change="huoquOil2"
                            clearable
                        >
                            <el-option
                                v-for="item in youguanhao2"
                                :key="item.id"
                                :label="item.oilcanNo"
                                :value="item.id"
                            />
                        </el-select>
                    </div>
                </div>
                <div class="right">
                    <div class="box"  >
                        <span>倒出油品号：</span>
                        <div class="youping">{{daochudeyou}}</div>
                        <!-- <el-input v-model="daochudeyou" placeholder="请输入内容"
                                :value="daochudeyou"
                                 @change="huoquOil"
                                >
                        </el-input> -->


                        <!-- <el-select
                            v-model="temp.outPotNo"
                            style
                            class="filter-item"
                            @change="huoquOil"
                        >
                            <el-option
                                v-for="item in youguanhao"
                                :key="item.id"
                                :label="item.oilsName"
                                :value="item.id"
                            />
                            
                        </el-select> --> 
                    </div>
                    <div class="box">
                        <span>倒入油品号：</span><br>

                        <div class="youping">{{daorudeyou}}</div>
                        <!-- <el-select
                            v-model="temp.intoPotNo"
                            style
                            class="filter-item"
                            @change="huoquOil2(item.id)"
                        >
                            <el-option
                                v-for="item in youguanhao2"
                                :key="item.id"
                                :label="item.oilsName"
                                :value="item.id"
                            />
                        </el-select> -->
                    </div>
                </div>
            </el-form>
            <div slot class="fotBtn">
                <el-button @click="chuangjiantk = false">取消</el-button>
                <el-button type="primary" @click="conmif=='确认'?chuangjianDG():xiugaiDG()">{{conmif}}</el-button>
                <el-button type="primary" @click="zuofeide" v-if="conmif=='修改'">作废</el-button>
            </div>
        </el-dialog>

        <!--未倒罐和作废查看倒罐详情-->
        <el-dialog :visible.sync="weidaotk" title="油品倒罐" class="daoguan_tab" @open="qingkong">
            <el-form ref="dataForm" label-position="left" label-width="70px">
                <div class="zouyou">
                    <el-form-item label="倒罐单号：" label-width="90px">{{weiDetail.orderNumber}}</el-form-item>
                    <el-form-item label="状态：" label-width="60px">
                        <span v-if="weiDetail.status==0">未倒罐</span>
                        <span v-if="weiDetail.status==1">倒罐中</span>
                        <span v-if="weiDetail.status==6">已完成</span>
                        <span v-if="weiDetail.status==-3">已作废</span>
                    </el-form-item>

                    <el-form-item label="倒出罐号：" label-width="90px">{{weiDetail.outOilcanNo}}</el-form-item>

                    <el-form-item label="油品品号：" label-width="90px">{{weiDetail.oilsName}}</el-form-item>

                    <el-form-item label="倒入罐号：" label-width="90px">{{weiDetail.intoOilcanNo}}</el-form-item>

                    <el-form-item label="油品品号：" label-width="90px">{{weiDetail.oilsName}}</el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="weidaotk = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    oilDGList,
    oilGuanhao,
    oilDGAdd,
    oilDGDetail,
    oilList,
    oilDGUpdata,
    oilDGDelete
} from "@/api/oil";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            value6: "",
            daochudeyou: "",
            daorudeyou: "",
            daochudeyouId: "",
            ypPinhao: [],
            temp: {
                outPotNo: "",
                intoPotNo: ""
            },
            weidaotk: false,
            zhuangtai: [
                {
                    id: 0,
                    name: "未倒罐"
                },
                {
                    id: 1,
                    name: "倒罐中"
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
            form: {
                name: ""
            },
            weiDetail: {},
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                orderNumber: "",
                status: "",
                oilsNo: ""
            },
            chuangjiantk: false,
            youguanhao: [],
            youguanhao2: [],
            conmif: "",
            dingdanId: ""
        };
    },
    created() {
        this.getList();
        // console.log(this.youguanhao)
    },
    methods: {
        getList() {
            oilDGList(this.listQuery).then(res => {
                this.list = res.data.rows;
                this.total = res.data.total;
            });

            oilGuanhao({}).then(res => {
            	// console.log(res)
                this.youguanhao = res.data;
                this.youguanhao2 = res.data;
            });

            oilList({}).then(res => {
                this.ypPinhao = res.data;
            });
        },
        huoquOil(val) {
            console.log(val);
            this.youguanhao.forEach(item => {
                console.log(item)
                if (val == item.id) {
                    this.daochudeyou = item.oilsName;
                    this.daochudeyouId = item.oilsId;
                }
            });
        },
        huoquOil2(val) {
            this.youguanhao.forEach(item => {
                if (val == item.id) {
                    this.daorudeyou = item.oilsName;
                }
            });
        },
        chuangjian() {
            this.conmif = "确认";
            this.chuangjiantk = true;
        },
        shijian() {
            if (this.value6) {
                this.listQuery.beginAddTime = this.value6[0];
                this.listQuery.endAddTime = this.value6[1];
            } else {
                this.listQuery.beginAddTime = "";
                this.listQuery.endAddTime = "";
            }
            this.getList();
        },
        sousuode() {
            this.getList();
        },
        chuangjianDG() {
            if (this.temp.outPotNo == "" || this.temp.intoPotNo == "") {
                this.$notify.error({
                    message: "罐号不能为空",
                    duration: 1000
                });
            } else if (this.temp.outPotNo == this.temp.intoPotNo) {
                this.$notify.error({
                    message: "罐号不能相同",
                    duration: 1000
                });
            } else if (this.daochudeyou != this.daorudeyou) {
                this.$notify.error({
                    message: "倒罐需要相同油品",
                    duration: 1000
                });
            } else {
                this.temp["oilsNo"] = this.daochudeyouId;
                console.log(this.temp);
                oilDGAdd(this.temp).then(res => {
                    this.$notify({
                        title: "成功",
                        message: "执行成功",
                        type: "success",
                        duration: 1000
                    });
                    this.getList();
                    this.chuangjiantk = false;
                });
            }
        },
        upStatus(row) {
            this.conmif = "修改";
            let data = {
                id: row.id
            };
            oilDGDetail(data).then(res => {
                // console.log(res);
                this.dingdanId = res.data.id;
                this.temp["oilsNo"] = res.data.oilsNo;
                this.temp["outPotNo"] = res.data.outPotNo;
                this.temp["intoPotNo"] = res.data.intoPotNo;
                this.daochudeyou = res.data.oilsName;
                this.daorudeyou = res.data.oilsName;
            });
            this.chuangjiantk = true;
        },
        xiugaiDG() {
            if (this.temp.outPotNo == "" || this.temp.intoPotNo == "") {
                this.$notify.error({
                    message: "罐号不能为空",
                    duration: 1000
                });
            } else if (this.temp.outPotNo == this.temp.intoPotNo) {
                this.$notify.error({
                    message: "罐号不能相同",
                    duration: 1000
                });
            } else if (this.daochudeyou != this.daorudeyou) {
                this.$notify.error({
                    message: "倒罐需要相同油品",
                    duration: 1000
                });
            } else {
                if (this.daochudeyouId != "") {
                    this.temp["oilsNo"] = this.daochudeyouId;
                }
                this.temp["id"] = this.dingdanId;
                console.log(this.temp);
                oilDGUpdata(this.temp).then(res => {
                    this.$notify({
                        title: "成功",
                        message: "执行成功",
                        type: "success",
                        duration: 1000
                    });
                    this.getList();
                    this.chuangjiantk = false;
                });
            }
        },
        qingkong() {
            this.temp = {
                outPotNo: "",
                intoPotNo: ""
            };
            this.daochudeyou = "";
            this.daorudeyou = "";
            this.daochudeyouId = "";
        },
        chakan(row) {
            let data = {
                id: row.id
            };
            oilDGDetail(data).then(res => {
                // console.log(res);
                this.weiDetail = res.data;
            });
            this.weidaotk = true;
        },
        zuofeide() {
            this.$confirm("此操作将撤销该订单, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        id: this.dingdanId
                    };
                    oilDGDelete(data)
                        .then(res => {
                            this.$notify({
                                title: "成功",
                                message: "执行成功",
                                type: "success",
                                duration: 1000
                            });
                            this.getList();
                            this.chuangjiantk = false;
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
        }
    }
};
</script>

<style scoped>
@import url("./cans.scss");
</style>
<style scoped>
.left {
    float: left;
    margin-left: 30px;
    width: 45%;
}
.right {
    float: right;
    width: 45%;
}
.box > span {
    line-height: 50px;
    font-weight: 700;
}
.youping{
    width:200px;
    height:36px;
    line-height:36px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
    padding-left:15px;
    background:#f6f7fb;
}
.fotBtn {
    margin-top: 30px;
    text-align: center;
}
.block > span {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 36px;
    width: 100px;
    font-weight: 700;
}
.daoguan_tab {
    width: 65%;
    margin: 13vh auto;
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
