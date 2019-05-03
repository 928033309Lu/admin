<template>
    <div class="warp">
        <div class="header">
            <h3>
                <span></span>商品管理
                <el-button @click="add">+</el-button>
            </h3>
        </div>
        <div class="main">
            <el-table :data="tableData" row-key="id" stripe v-loading="loading" style="width: 100%">
                <el-table-column label="商品编号" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.num }}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="85px" align="center" label="商品图片">
                    <template slot-scope="scope">
                        <img v-bind:src=" scope.row.img " alt>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="排序" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{ scope.row.idx }}
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
                </el-table-column> -->
                <el-table-column label="商品名称" min-width="105">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品类型">
                    <template slot-scope="scope">
                        <span v-show="scope.row.type==1">实体商品</span>
                        <span v-show="scope.row.type==2">虚拟商品</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品价值">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsPrice }}</span>元
                    </template>
                </el-table-column>
                <el-table-column label="兑换积分">
                    <template slot-scope="scope">
                        <span>{{ scope.row.creditsExchange }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="库存">
                    <template slot-scope="scope">
                        <span>{{ scope.row.inventory }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动类型">
                    <template slot-scope="scope">
                        <span v-show="scope.row.activityType==1">精品</span>
                        <span v-show="scope.row.activityType==0">普通</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==1">上架中</span>
                        <span v-show="scope.row.status==0">下架中</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="310">
                    <template slot-scope="scope">
                        <el-button
                            @click="edit(scope.$index, scope.row)"
                            type="primary"
                            size="small"
                        >编辑</el-button>
                        <el-button
                            @click="xiajia(scope.$index, scope.row)"
                            type="primary"
                            v-show="scope.row.status==1"
                            size="small"
                        >下架</el-button>
                        <el-button
                            @click="shangjia(scope.$index, scope.row)"
                            type="primary"
                            v-show="scope.row.status==0"
                            size="small"
                        >上架</el-button>
                        <el-button
                            @click="del(scope.$index, scope.row)"
                            type="primary"
                            size="small"
                        >删除</el-button>
                        <el-button
                            @click="copyUrl(scope.$index, scope.row)"
                            type="primary"
                            size="small"
                            data-clipboard-action="copy"
                            class="cobyOrderSn" 
                            :data-clipboard-text='text+scope.row.id'
                        >复制链接</el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column
					align="right"
					width="80"
					:render-header="renderHeader">
					<template slot="header" slot-scope="scope">
						
					</template>
                </el-table-column>-->
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
            <el-dialog :visible.sync="managementVisible" width="50%" title="商品修改">
                <div class="edit">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="box">
                                    <div class="left">
                                        <span>商品名称</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="editData.name"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                                <!-- <div class="box">
                                    <div class="left">
                                        <span>商品编号</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="editData.num"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div> -->
                                <div class="box">
                                    <div class="left">
                                        <span>商品类型</span>
                                    </div>
                                    <div class="right">
                                        <el-select v-model="editData.type" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in typeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="box" v-show="editData.type==2">
                                    <div class="left">
                                        <span>电子券</span>
                                    </div>
                                    <div class="right">
                                        <!-- <el-input v-model="editData.idx" placeholder="" style="width: 200px;"></el-input> -->
                                        <el-select
                                            v-model="editData.discountCouponId"
                                            placeholder="请选择"
                                            clearable
                                        >
                                            <el-option
                                                v-for="item in quanOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>活动类型</span>
                                    </div>
                                    <div class="right">
                                        <el-select v-model="editData.activityType"  clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in huodongType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <!-- <div class="box">
									<div class="left">
										<span>排序</span>
									</div>
									<div class="right">
										<el-input v-model="editData.idx" placeholder="" style="width: 200px;"></el-input>
									</div>
                                </div>-->
                                
                                <div class="box">
                                    <div class="left">
                                        <span>商品描述</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            type="textarea"
                                            :rows="8"
                                            placeholder="请输入内容"
                                            v-model="editData.description"
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="box">
                                    <div class="left">
                                        <span>商品价值</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="editData.goodsPrice"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>元
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>兑换积分</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="editData.creditsExchange"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>库存数量</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="editData.inventory"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>商品图片</span>
                                    </div>
                                    <div class="right">
                                        <el-upload
                                            class="avatar-uploader"
                                            action="https://httpbin.org/post"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                        >
                                            <img
                                                v-if="editData.img"
                                                :src="editData.img"
                                                class="avatar"
                                            >
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="managementVisible = false">取消</el-button>
                    <el-button type="primary" @click="editent">确认</el-button>
                </div>
            </el-dialog>
            <!-- 商品管理添加框 -->
            <el-dialog :visible.sync="addVisible" width="60%" title="商品添加">
                <div class="edit">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <!-- <div class="box">
                                    <div class="left">
                                        <span>商品编号</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="addData.num"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div> -->
                                <div class="box">
                                    <div class="left">
                                        <span>商品名称</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="addData.name"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>商品类型</span>
                                    </div>
                                    <div class="right">
                                        <el-select v-model="addData.type" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in typeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="box" v-show="addData.type==2">
                                    <div class="left">
                                        <span>电子券</span>
                                    </div>
                                    <div class="right">
                                        <!-- <el-input v-model="editData.idx" placeholder="" style="width: 200px;"></el-input> -->
                                        <el-select
                                            clearable
                                            v-model="editData.discountCouponId"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in quanOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>活动类型</span>
                                    </div>
                                    <div class="right">
                                        <el-select  clearable v-model="addData.activityType" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in huodongType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <!-- <div class="box">
									<div class="left">
										<span>排序</span>
									</div>
									<div class="right">
										<el-input v-model="addData.idx" placeholder="" style="width: 200px;"></el-input>
									</div>
                                </div>-->
                                
                                <div class="box">
                                    <div class="left">
                                        <span>商品描述</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            type="textarea"
                                            :rows="8"
                                            placeholder="请输入内容"
                                            v-model="addData.description"
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="box">
                                    <div class="left">
                                        <span>商品价值</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="addData.goodsPrice"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>元
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>兑换积分</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="addData.creditsExchange"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>库存数量</span>
                                    </div>
                                    <div class="right">
                                        <el-input
                                            v-model="addData.inventory"
                                            placeholder
                                            style="width: 200px;"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>商品图片</span>
                                    </div>
                                    <div class="right">
                                        <el-upload
                                            class="avatar-uploader"
                                            action="https://httpbin.org/post"
                                            :show-file-list="false"
                                            :on-success="addhandleAvatarSuccess"
                                        >
                                            <img
                                                v-if="addData.img"
                                                :src="addData.img"
                                                class="avatar"
                                            >
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取消</el-button>
                    <el-button type="primary" @click="addent">确认</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getshanglist } from "@/api/jifenshangcheng";
import { addshang } from "@/api/jifenshangcheng";
import { bianjishang } from "@/api/jifenshangcheng";
import { paixushang } from "@/api/jifenshangcheng";
import { deleteWechatGoods } from "@/api/jifenshangcheng";
import { quanlist } from "@/api/marketing";
import axios from "axios";
import Sortable from 'sortablejs'

export default {
    name: "marketingsignDemo",
    data() {
        return {
            //商品管理列表临时数据
            tableData: [],
            typeOptions: [
                {
                    value: 1,
                    label: "实体商品"
                },
                {
                    value: 2,
                    label: "虚拟商品"
                }
            ],
            quanOptions: [],
            quan: "",
            managementVisible: false, //控制商品管理编辑弹出框显示与隐藏
            addVisible: false, //控制商品管理编辑弹出框显示与隐藏
            editData: "", //编辑商品数据
            addData: "", //编辑商品数据
            imageUrl: "", //上传地址
            //分页
            total: 0,
            page: 1,
            limit: 10,
            currentPage: 1,
            loading: true,
            huodongType:[{
                value: 0,
                label: "普通"
            },{
                value: 1,
                label: "精品"
            },],
            text:"http://shiy.wsuns.com/wx/shoppingMall/physical_commodity.html?id=",
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
            getshanglist(data).then(response => {
                console.log(response.data);
                this.total = response.data.total;
                this.tableData = response.data.rows;
                this.loading = false;
            });
            var a = {};
            quanlist(data).then(response => {
                console.log(response.data);
                this.quanOptions = response.data.list;
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.get();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.get();
        },
        add() {
            this.addVisible = true;
            this.addData = {
                num: "", //商品编号
                img: "", //商品图片
                name: "", //商品名称
                type: 1, //商品类型
                goodsPrice: "", //商品价值
                description: "", //商品描述
                creditsExchange: "", //兑换积分
                inventory: "" ,//库存
                activityType:1,//活动类型
            };
        },
        addent() {
            if (this.addData.name == "" || this.addData.name == null) {
                this.$message({
                    message: "请输入商品名称",
                    type: "warning"
                });
                return;
            }
            if (
                this.addData.goodsPrice == "" ||
                this.addData.goodsPrice == null
            ) {
                this.$message({
                    message: "请输入商品价值",
                    type: "warning"
                });
                return;
            }
            if (
                this.addData.creditsExchange == "" ||
                this.addData.creditsExchange == null
            ) {
                this.$message({
                    message: "请输入兑换积分",
                    type: "warning"
                });
                return;
            }
            if (
                this.addData.inventory == "" ||
                this.addData.inventory == null
            ) {
                this.$message({
                    message: "请输入库存数量",
                    type: "warning"
                });
                return;
            }
            if (this.addData.img == "" || this.addData.img == null) {
                this.$message({
                    message: "请上传商品图片",
                    type: "warning"
                });
                return;
            }
            this.addVisible = false;

            this.addData.type = this.addData.type ? this.addData.type : null;
            this.addData.discountCouponId = this.addData.discountCouponId
                ? this.addData.type
                : null;
            this.addData.description = this.addData.description
                ? this.addData.type
                : null;

            var data = this.addData;
            console.log(data);
            addshang(data).then(response => {
                console.log(response);
                console.log(response.data);
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
                this.get();
                // this.tableData.push(response.data)
            });
        },
        del(index, row) {
            // this.tableData.splice(index, 1);
            var data = {
                id: row.id
            };
            deleteWechatGoods(data).then(response => {
                console.log(response.data);
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
                this.get();
            });
        },
        //行拖拽
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
                paixushang(data)
                    .then(response => {
                        console.log(response.data)
                        _this.get()
                    })
                }
            })
        },
        //复制链接
        // http://shiy.wsuns.com/wx/shoppingMall/physical_commodity.html
        copyUrl(index,row){
            var text = "http://shiy.wsuns.com/wx/shoppingMall/physical_commodity.html?"+row.id;
            let _this = this;
            var copynum = 0;
            var clipboard = new this.clipboard(".cobyOrderSn");
            clipboard.on('success', function (e) {
                _this.$message({
                    message: "复制成功",
                    type: "success"
                });
                copynum++;
                if(copynum >= 1){
                    clipboard.destroy();
                    clipboard = new _this.clipboard(".cobyOrderSn");
                };
            });
            clipboard.on('error', function (e) {
                _this.$message.error('复制失败');
                console.log(e)
            });
            
        },
        //编辑
        edit(index, row) {
            this.managementVisible = true;
            this.editData = JSON.parse(JSON.stringify(row));
        },
        editent() {
            this.managementVisible = false;
            var data = this.editData;
            delete data.modifier;
            delete data.modifieTime;
            console.log(data);
            bianjishang(data).then(response => {
                console.log(response);
                console.log(response.data);
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.get();
            });
        },
        shangjia(index, row) {
            var data = {
                id: row.id,
                status: 1
            };
            bianjishang(data).then(response => {
                console.log(response);
                console.log(response.data);
                this.$message({
                    message: "上架成功",
                    type: "success"
                });
                this.get();
            });
        },
        xiajia(index, row) {
            var data = {
                id: row.id,
                status: 0
            };
            bianjishang(data).then(response => {
                console.log(response);
                console.log(response.data);
                this.$message({
                    message: "下架成功",
                    type: "success"
                });
                this.get();
            });
        },
        shang(index, row) {
            var data = {
                idOne: row.id,
                idTwo: this.tableData[index - 1].id,
                idxOne: row.idx,
                idxTwo: this.tableData[index - 1].idx
            };
            paixushang(data).then(response => {
                console.log(response.data);
                this.$message({
                    message: "排序上调成功",
                    type: "success"
                });
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
            paixushang(data).then(response => {
                console.log(response.data);
                this.$message({
                    message: "排序下调成功",
                    type: "success"
                });
                this.get();
            });
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
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
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
        }
    }
};
</script>

<style scoped>
@import url("./commodity.scss");
</style>
<style scoped>
  .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: auto;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>