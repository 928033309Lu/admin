<template>
    <div class="warp">
        <div class="header">
            <h3>
                <span></span>异业合作
                <el-button @click="add">+</el-button>
            </h3>
        </div>
        <div class="main">
            <el-table :data="tableData" row-key="id" stripe v-loading="loading" style="width: 100%">
                <el-table-column prop="num" label="活动编号" align="center" sortable width="180"></el-table-column>
                <el-table-column label="活动图片">
                    <template slot-scope="scope">
                        <img v-bind:src="scope.row.img" alt>
                    </template>
                </el-table-column>
                <el-table-column label="排序" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.idx}}
                            <span @click="shang(scope.$index, scope.row)">
                                <svg-icon icon-class="shang" v-show="scope.$index!=0"/>
                            </span>
                            <span @click="xia(scope.$index, scope.row)">
                                <svg-icon
                                    icon-class="xia"
                                    v-show="scope.$index!=tableData.length-1"
                                />
                            </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="活动名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="url" label="连接"></el-table-column>
                <el-table-column prop="createTimeStr" sortable min-width="180px" label="起止时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.activityStartTime | parseTime('{y}-{m}-{d}')}}</span>
                        <span>-</span>
                        <span>{{scope.row.activityEndTime | parseTime('{y}-{m}-{d}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column sortable label="状态">
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==1">已生效</span>
                        <span v-show="scope.row.status==0">未生效</span>
                        <span v-show="scope.row.status==-1">已停止</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="220">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            v-show="scope.row.status!=-1"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            v-show="scope.row.status==-1"
                            @click="see(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            v-show="scope.row.status==1"
                            type="danger"
                            @click="xiajia(scope.$index, scope.row)"
                        >停止</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="shangjia(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="right" width="80" :render-header="renderHeader">
                    <template slot="header" slot-scope="scope"></template>
                </el-table-column> -->
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
            <!-- 商品管理编辑框 -->
            <el-dialog :visible.sync="editVisible" width="50%" title="活动修改">
                <div class="edit">
                    <div class="box">
                        <div class="left">
                            <span>活动名称：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="editData.name"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>原价：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="editData.price"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>特惠价：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="editData.discountPrice"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>奖励金：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="editData.bonus"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>连接：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="editData.url"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>活动起止时间：</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                v-model="editData.activityStartTime"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                            <span>-</span>
                            <el-date-picker
                                v-model="editData.activityEndTime"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>商品图片：</span>
                        </div>
                        <div class="right">
                            <el-upload
                                class="avatar-uploader"
                                action="https://httpbin.org/post"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <img v-if="editData.img" :src="editData.img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="ent">确认</el-button>
                </div>
            </el-dialog>
            <!-- 商品添加框 -->
            <el-dialog :visible.sync="addVisible" width="40%" title="活动添加">
                <div class="edit">
                    <div class="box">
                        <div class="left">
                            <span>活动名称：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="addData.name"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>原价：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="addData.price"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>特惠价：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="addData.discountPrice"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>奖励金：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="addData.bonus"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>连接：</span>
                        </div>
                        <div class="right">
                            <el-input
                                v-model="addData.url"
                                style="width:200px;"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>活动起止时间：</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                v-model="addData.activityStartTime"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                            <span>-</span>
                            <el-date-picker
                                v-model="addData.activityEndTime"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>商品图片：</span>
                        </div>
                        <div class="right">
                            <el-upload
                                class="avatar-uploader"
                                action="https://httpbin.org/post"
                                :show-file-list="false"
                                :on-success="addhandleAvatarSuccess"
                            >
                                <img v-if="addData.img" :src="addData.img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addCancel">取消</el-button>
                    <el-button type="primary" @click="addEnt">确认</el-button>
                </div>
            </el-dialog>
            <!-- 商品查看框 -->
            <el-dialog :visible.sync="seeVisible" width="50%" title="活动查看">
                <div class="edit">
                    <div class="box">
                        <div class="left">
                            <span>活动名称：</span>
                        </div>
                        <div class="right">
                            <span>{{editData.name}}</span>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>原价：</span>
                        </div>
                        <div class="right">
                            <span>{{editData.price}}</span>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>特惠价：</span>
                        </div>
                        <div class="right">
                            <span>{{editData.discountPrice}}</span>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>奖励金：</span>
                        </div>
                        <div class="right">
                            <span>{{editData.bonus}}</span>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>连接：</span>
                        </div>
                        <div class="right">
                            <span>{{editData.url}}</span>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>活动起止时间：</span>
                        </div>
                        <div class="right">
                            <!-- <span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
                            <span>{{editData.activityStartTime | parseTime('{y}-{m}-{d}')}}</span>
                            
                            <span>-</span>
                            <span>{{editData.activityEndTime | parseTime('{y}-{m}-{d}')}}</span>
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">
                            <span>商品图片：</span>
                        </div>
                        <div class="right">
                            <img :src="editData.img" class="el-icon-plus avatar-uploader-icon" alt>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="seeVisible=false">关闭</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getlist } from "@/api/yiyehezuo";
import { addyiye } from "@/api/yiyehezuo";
import { bianji } from "@/api/yiyehezuo";
import { paixu } from "@/api/yiyehezuo";
import { paixushang } from "@/api/jifenshangcheng";
import { parseTime } from "@/utils";
import axios from "axios";
import Sortable from 'sortablejs'

export default {
    name: "cooperationsDemo",
    data() {
        return {
            //异业合作表格临时数据
            tableData: [],
            editVisible: false, //控制编辑框的显示与隐藏
            editData: "", //编辑数据暂存
            index: "", //编辑的数据号
            obj: "", //编辑前原数据暂存
            addVisible: false, //控制添加框的显示与隐藏
            addData: {
                name: "", //活动名称
                img: "", //商品图片
                price: "", //原价
                discountPrice: "", //特惠价：
                url: "", //连接
                bonus: "", //奖励金
                activityStartTime: "", //开始时间
                activityEndTime: "" //结束时间
            }, //添加临时数据
            //分页
            total: 0,
            page: 1,
            limit: 10,
            currentPage: 1,
            loading: true,
            seeVisible: false, //控制查看框的显示与隐藏
            //活动时间不能选择今天之前的时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        };
    },
    mounted() {
        this.get();
        this.rowDrop()
    },
    methods: {
        get() {
            this.loading = true;
            var data = {
                pageNum: this.page,
                pageSize: this.limit
            };
            getlist(data).then(response => {
                // console.log(response.data);
                // console.log(response.data.rows);
                this.total = response.data.total;
                this.tableData = response.data.rows;
                this.loading = false;
            });
        },
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            const _this = this
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                const currRow = _this.tableData.splice(oldIndex, 1)[0]
                _this.tableData.splice(newIndex, 0, currRow)
                // console.log(_this.tableData[newIndex])
                // console.log(_this.tableData[oldIndex])
                var data = {
                    "idOne": _this.tableData[newIndex].id,
                    "idTwo": _this.tableData[oldIndex].id,
                    "idxOne": _this.tableData[newIndex].idx,
                    "idxTwo": _this.tableData[oldIndex].idx
                }
                paixu(data)
                    .then(response => {
                        // console.log(response.data)
                        _this.get()
                    })
                }
            })
        },
        see(index, row) {
            this.seeVisible = true;
            // this.editVisible = true
            this.index = index;
            this.obj = JSON.parse(JSON.stringify(row));
            this.editData = row;
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
        chg() {
            console.log(111);
        },
        // 自定义表达头+
        renderHeader(h, { column, $index }) {
            var that = this;
            return h("span", [
                h("span", column.label),
                h(
                    "el-button",
                    {
                        style: "margin-left: 5px;",
                        on: {
                            click: that.add
                        }
                    },
                    ["+"]
                )
            ]);
        },
        //上传图片
        handleAvatarSuccess(res, file) {
            // this.editData.img = URL.createObjectURL(file.raw);
            var images = "http://shiy.wsuns.com/upload/upload/";
            var tupian = "";
            var file = file.raw;
            var formData = new FormData();
            formData.append("imgUpload", file);
            var that = this;
            axios
                .post(
                    "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",
                    formData
                )
                .then(function(response) {
                    tupian = images + response.data.imgPath;
                    that.editData.img = tupian;
                })
                .catch(function(error) {});
            this.$forceUpdate();
        },
        addhandleAvatarSuccess(res, file) {
            // this.addData.img = URL.createObjectURL(file.raw);
            var images = "http://shiy.wsuns.com/upload/upload/";
            var tupian = "";
            var file = file.raw;
            var formData = new FormData();
            formData.append("imgUpload", file);
            var that = this;
            axios
                .post(
                    "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",
                    formData
                )
                .then(function(response) {
                    tupian = images + response.data.imgPath;
                    that.addData.img = tupian;
                })
                .catch(function(error) {});
        },
        shangjia(index, row) {
            this.$confirm("此操作将删除该活动, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var data = {
                        id: row.id,
                        isDel: 1
                    };
                    bianji(data).then(response => {
                        console.log(response.data);
                        this.get();
                        this.$message({
                            message: "删除成功",
                            type: "success"
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
        xiajia(index, row) {
            this.$confirm("此操作将停止该活动, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var data = {
                        id: row.id,
                        status: -1
                    };
                    bianji(data).then(response => {
                        console.log(response.data);
                        this.get();
                        this.$message({
                            message: "停止成功",
                            type: "success"
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消停止"
                    });
                });
        },
        shang(index, row) {
            var data = {
                idOne: row.id,
                idTwo: this.tableData[index - 1].id,
                idxOne: row.idx,
                idxTwo: this.tableData[index - 1].idx
            };
            paixu(data).then(response => {
                console.log(response.data);
                this.get();
            });
        },
        xia(index, row) {
            var data = {
                idOne: row.id,
                idTwo: this.tableData[index + 1].id,
                idxOne: row.idx,
                idxTwo: this.tableData[index + 1].idx
            };
            console.log(data);
            paixu(data).then(response => {
                console.log(response.data);
                this.get();
            });
        },
        ent() {
            var data = {
                id: this.editData.id,
                name: this.editData.name,
                price: this.editData.price,
                discountPrice: this.editData.discountPrice,
                bonus: this.editData.bonus,
                url: this.editData.url,
                activityStartTime: new Date(this.editData.activityStartTime),
                activityEndTime: new Date(this.editData.activityEndTime),
                img: this.editData.img
            };
            console.log(data);
            bianji(data).then(response => {
                console.log(response.data);
                this.get();
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
            });
            this.editVisible = false;
        },
        cancel() {
            this.editVisible = false;
            this.editData.commodityName = this.obj.commodityName;
            this.editData.connect = this.obj.connect;
            this.editData.commodityPictures = this.obj.commodityPictures;
            this.tableData[this.index] = this.editData;
            this.index = "";
        },
        add() {
            this.addVisible = true;
            this.addData = {
                name: "", //活动名称
                img: "", //商品图片
                price: "", //原价
                discountPrice: "", //特惠价：
                url: "", //连接
                bonus: "", //奖励金
                activityStartTime: "", //开始时间
                activityEndTime: "" //结束时间
            }; //添加临时数据
        },
        addEnt() {
            var data = this.addData;
            addyiye(data).then(response => {
                console.log(response.data);
                this.get();
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
            });
            this.addVisible = false;
        },
        addCancel() {
            this.addVisible = false;
            this.addData = "";
        },
        handleEdit(index, row) {
            this.editVisible = true;
            this.index = index;
            this.obj = JSON.parse(JSON.stringify(row));
            this.editData = row;
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
    //   padding: 20px;
}
.main {
    min-height: calc(100vh - 180px);
    background-color: #fff;
    width: 100%;
    height: 100%;
}
.header {
    background-color: #fff;
    height: 60px;
    padding: 0 1%;
    border-bottom: 1px solid #f6f7fb;
}
.header h3 {
    line-height: 60px;
    margin: 0;
}
.header h3 span {
    display: inline-block;
    width: 3px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 1%;
}
.dialog-footer {
    text-align: center;
}
.dialog-footer .el-button + .el-button {
    margin-left: 100px;
}
.box {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}
.left {
    width: 100px;
    text-align: left;
    line-height: 36px;
}
.right span {
    line-height: 36px;
}
.svg-icon {
    cursor: pointer;
}
.svg-icon{
    display: none;
}
h3 .el-button{
  float: right;
  border: 0;
  line-height: 36px;
  font-size: 28px;
  color: #5B8DFF;
  background-color: #fff; 
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
    background-color: #f5f9fc;
}
.el-dialog__header {
    text-align: center;
    background-color: #5b8dff;
    color: #fff;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #fff;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}
.avatar {
    width: 200px;
    height: 200px;
    display: block;
}
.cell img {
    width: 64px;
}
.el-dialog__body {
    padding: 30px 50px;
}
.el-pagination {
    text-align: center;
    margin: 20px 0;
}
</style>