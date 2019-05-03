<template>
    <div class="app-container supplier">
        <el-form ref="form" :model="form" label-width="130px">
            <div class="top">
                <el-form-item label="供应商管理" style="margin-bottom: 0;"/>
                <el-button type="primary" @click="orderAdd()">添加商品供应商户</el-button>
            </div>

            <el-table :key="tableKey" :data="list" fit highlight-current-row class="list">
                <el-table-column label="供应商类型" style="margin-bottom:20px;" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.supplierType==1">油品</span>
                        <span v-if="scope.row.supplierType==2">商品</span>
                    </template>
                </el-table-column>
                <el-table-column label="供应商编号" min-width="90px" align="center">
                    <template slot-scope="scope">
                        <span class="link-type">{{ scope.row.supplierNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="供应商简称" min-width="90" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.supplierShort }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="公司全称" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.supplierName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="法人" min-width="80" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.legalPerson }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="邮箱" min-width="110" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.email }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="60" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">停用</span>
                        <span v-if="scope.row.status==1">启用</span>
                    </template>
                </el-table-column>
                <el-table-column label="电话" min-width="105" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.phone }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    min-width="150"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="info"
                            size="mini"
                            v-if="scope.row.belongTypeid!=1"
                            @click="supplierW(scope.row.id)"
                        >修改</el-button>

                        <el-button type="primary" size="mini" @click="chakanTk(scope.row.id)">查看</el-button>

                        <el-button
                            v-if="scope.row.status==1&&scope.row.belongTypeid!=1"
                            size="mini"
                            type="danger"
                            @click="zhuangtai(0,scope.row.id,scope.row.supplierType,scope.row.supplierName)"
                        >停用</el-button>
                        <el-button
                            v-if="scope.row.status==0&&scope.row.belongTypeid!=1"
                            size="mini"
                            type="primary"
                            @click="zhuangtai(1,scope.row.id,scope.row.supplierType,scope.row.supplierName)"
                        >启用</el-button>
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

        <!--油品供应商添加-->
        <el-dialog :visible.sync="dialogFormVisible" title="油品供应商添加" class="oilTianjia">
            <el-form
                ref="oilForm"
                :rules="rules"
                :model="oiltemp"
                label-position="right"
                label-width="135px"
            >
                <div class="up">
                    <div class="left">
                        <el-form-item label="公司名称" prop="supplierName">
                            <el-input v-model="oiltemp.supplierName"/>
                        </el-form-item>
                        <el-form-item label="营业注册号" prop="registrationNum">
                            <el-input v-model="oiltemp.registrationNum"/>
                        </el-form-item>
                        <el-form-item label="法人" prop="legalPerson">
                            <el-input v-model="oiltemp.legalPerson"/>
                        </el-form-item>
                        <el-form-item label="经营范围" prop="businessScope">
                            <el-input
                                :autosize="{ minRows: 4, maxRows: 6}"
                                v-model="oiltemp.businessScope"
                                type="textarea"
                                placeholder="请输入内容"
                            />
                        </el-form-item>

                        <el-form-item label="营业执照有效期" prop="licenceValidity">
                            <el-date-picker
                                v-model="oiltemp.licenceValidity"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="公司简称" prop="supplierShort">
                            <el-input v-model="oiltemp.supplierShort"/>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="oiltemp.phone"/>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="oiltemp.email"/>
                        </el-form-item>
                        <el-form-item label="营业执照" prop="email">
                            <el-upload
                                class="avatar-uploader"
                                action="https://httpbin.org/post"
                                :show-file-list="false"
                                :on-success="addhandleAvatarSuccess"
                            >
                                <img
                                    v-if="oiltemp.licenceImg"
                                    :src="oiltemp.licenceImg"
                                    class="avatar"
                                >
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="quxiao(1)">取消</el-button>
                <el-button type="primary" @click="oilTianjia(1)">添加</el-button>
            </div>
        </el-dialog>

        <!--商品供应商添加-->
        <el-dialog :visible.sync="orderFormVisible" title="商品供应商添加" class="oilTianjia">
            <el-form
                ref="oilForm"
                :rules="rules"
                :model="oiltemp"
                label-position="right"
                label-width="135px"
            >
                <div class="up">
                    <div class="left">
                        <el-form-item label="公司名称" prop="supplierName">
                            <el-input v-model="oiltemp.supplierName"/>
                        </el-form-item>
                        <el-form-item label="营业注册号" prop="registrationNum">
                            <el-input v-model="oiltemp.registrationNum"/>
                        </el-form-item>
                        <el-form-item label="法人" prop="legalPerson">
                            <el-input v-model="oiltemp.legalPerson"/>
                        </el-form-item>
                        <el-form-item label="经营范围" prop="businessScope">
                            <el-input
                                :autosize="{ minRows: 4, maxRows: 6}"
                                v-model="oiltemp.businessScope"
                                type="textarea"
                                placeholder="请输入内容"
                            />
                        </el-form-item>

                        <el-form-item label="营业执照有效期" prop="licenceValidity">
                            <el-date-picker
                                v-model="oiltemp.licenceValidity"
                                type="date"
                                placeholder="选择日期"
                                :pickerOptions="pickerOptions0"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="公司简称" prop="supplierShort">
                            <el-input v-model="oiltemp.supplierShort"/>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="oiltemp.phone"/>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="oiltemp.email"/>
                        </el-form-item>
						<el-form-item label="地址" prop="address">
						  <el-input v-model="oiltemp.address" placeholder="请输入内容"/>
						</el-form-item>
                        <el-form-item label="营业执照" prop="email">
                            <el-upload
                                class="avatar-uploader"
                                action="https://httpbin.org/post"
                                :show-file-list="false"
                                :on-success="addhandleAvatarSuccess"
                            >
                                <img
                                    v-if="oiltemp.licenceImg"
                                    :src="oiltemp.licenceImg"
                                    class="avatar"
                                >
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="quxiao(2)">取消</el-button>
                <el-button type="primary" @click="oilTianjia(2)">添加</el-button>
            </div>
        </el-dialog>

        <!--供应商修改-->
        <el-dialog
            :visible.sync="supplierFormVisible"
            title="供应商信息修改"
            style="width:80%;margin:0 auto"
            class="supplierForm oilTianjia"
        >
            <el-form
                ref="upForm"
                :rules="rules"
                :model="conten"
                label-position="right"
                label-width="125px"
            >
                <div class="up">
                    <div class="left">
                        <el-form-item label="公司名称" prop="supplierName">
                            <el-input v-model="conten.supplierName"/>
                        </el-form-item>
                        <el-form-item label="营业注册号" prop="registrationNum">
                            <el-input v-model="conten.registrationNum"/>
                        </el-form-item>
                        <el-form-item label="法人" prop="legalPerson">
                            <el-input v-model="conten.legalPerson"/>
                        </el-form-item>
                        <el-form-item label="经营范围" prop="businessScope">
                            <el-input
                                :autosize="{ minRows: 4, maxRows: 6}"
                                v-model="conten.businessScope"
                                type="textarea"
                                placeholder="请输入内容"
                            />
                        </el-form-item>
                        <el-form-item label="营业执照有效期" prop="licenceValidity">
                            <el-date-picker
                                v-model="conten.licenceValidity"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="公司简称" prop="supplierShort">
                            <el-input v-model="conten.supplierShort"/>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="conten.phone"/>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="conten.email"/>
                        </el-form-item>
						<el-form-item label="地址" prop="address">
						  <el-input v-model="conten.address"/>
						</el-form-item>
                        <el-form-item label="营业执照">
                            <el-upload
                                class="avatar-uploader"
                                action="https://httpbin.org/post"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <img
                                    v-if="conten.licenceImg"
                                    :src="conten.licenceImg"
                                    class="avatar"
                                >
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="supplierFormVisible = false">取消</el-button>
                <el-button type="primary" @click="gengxinshanghu(conten.id)">确认</el-button>
            </div>
        </el-dialog>

        <!--查看弹窗-->
        <el-dialog :visible.sync="chakan" :title="(conten.supplierType == 1 ? '油品' : (conten.supplierType == 2 ? '商品' : '')) + '供应商'">
            <el-form label-position="right" label-width="125px">
                <div class="up">
                    <div class="left">
                        <el-form-item label="供应商编号">{{conten.supplierNo}}</el-form-item>
                        <el-form-item label="公司名称">{{conten.supplierName}}</el-form-item>
                        <el-form-item label="营业注册号">{{conten.registrationNum}}</el-form-item>
                        <el-form-item label="法人">{{conten.legalPerson}}</el-form-item>
                        <el-form-item label="经营范围">
                            <el-input
                                :autosize="{ minRows: 4, maxRows: 6}"
                                v-model="conten.businessScope"
                                type="textarea"
                                placeholder="请输入内容"
                                :disabled="true"
                            />
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="公司简称">{{conten.supplierShort}}</el-form-item>
                        <el-form-item label="营业执照有效期">{{conten.licenceValidity}}</el-form-item>
                        <el-form-item label="联系电话">{{conten.phone}}</el-form-item>
                        <el-form-item label="邮箱">{{conten.email}}</el-form-item>
						<el-form-item label="地址">{{conten.address}}</el-form-item>
                        <el-form-item label="营业执照" prop="title">
                            <img :src="conten.licenceImg" style="width: 80%;height: auto;">
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { SupplierList } from "@/api/shangpin";
import { oilTj, gengxin, chakan, gengxinxinxi } from "@/api/diaodu";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";

export default {
    components: { Pagination },
    data() {
        return {
            jingyingfanwei: "",
            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            form: {
                name: ""
            },
            //页数条数
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                isManage: 1
            },
            //油品供应商添加数据
            oiltemp: {
                supplierName: "",
                registrationNum: "",
                legalPerson: "",
                businessScope: "",
                licenceValidity: "",
                supplierShort: "",
                phone: "",
                email: "",
				address: "",
                status: 1,
                licenceImg: "",
                supplierType: 1
            },
            //油品供应商添加验证
            rules: {
                supplierName: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                registrationNum: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                legalPerson: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                businessScope: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                licenceValidity: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                supplierShort: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "不能为空", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
				address: [
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ message: '请输入地址', trigger: ['blur', 'change'] },
				]
            },
            conten: {},
            temp: {
                id: undefined,
                importance: 1,
                remark: "",
                timestamp: new Date(),
                title: "",
                type: "",
                status: "published"
            },
            dialogFormVisible: false,
            orderFormVisible: false,
            supplierFormVisible: false,
            chakan: false,

            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        //获取供应商列表
        getList() {
            SupplierList(this.listQuery).then(response => {
                console.log(response);
                this.list = response.data.rows;
                this.total = response.data.total;
            });
        },
        //油品商和商品商添加
        oilTianjia(idid) {
            console.log(idid);
            // 1是油品商 2是商品
            if (idid == 1) {
                this.oiltemp.supplierType = 1;
            } else if (idid == 2) {
                this.oiltemp.supplierType = 2;
            }
            this.$refs["oilForm"].validate(valid => {
                if (valid) {
                    oilTj(this.oiltemp).then(() => {
                        this.list.unshift(this.oiltemp);
                        this.getList();
                        if (idid == 1) {
                            this.dialogFormVisible = false;
                        } else if (idid == 2) {
                            this.orderFormVisible = false;
                        }
                        //				    this.$refs['oilForm'].resetFields();
                        this.qingkongForm();
                        this.$notify({
                            title: "成功",
                            message: "创建成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }
            });
        },
        //重置添加Form表单
        qingkongForm() {
            this.oiltemp = {
                supplierName: "",
                registrationNum: "",
                legalPerson: "",
                businessScope: "",
                licenceValidity: "",
                supplierShort: "",
                phone: "",
                email: "",
				address: "",
                status: 1,
                licenceImg: "",
                supplierType: 1
            };
        },
        //关闭弹框清空Form表单
        quxiao(idid) {
            if (idid == 1) {
                this.dialogFormVisible = false;
            } else if (idid == 2) {
                this.orderFormVisible = false;
            }
            this.qingkongForm();
            this.$refs["oilForm"].resetFields();
        },
        //停用启用更改供应商状态
        zhuangtai(status, idid, type, name) {
            console.log(status, idid);
            let data = {
                id: idid,
                status: status,
                supplierType: type,
                supplierName: name
            };
            gengxin(data).then(() => {
                this.getList();
            });
        },
        handleAdd() {
            this.dialogFormVisible = true;
        },
        orderAdd() {
            this.orderFormVisible = true;
        },
        //获取要修改供应商信息
        supplierW(idid) {
            let data = {
                id: idid
            };
            chakan(data).then(response => {
                let date = new Date(response.data.licenceValidity);
                let date_value =
                    date.getFullYear() +
                    "-" +
                    this.formatTen(date.getMonth() + 1) +
                    "-" +
                    this.formatTen(date.getDate());
                response.data.licenceValidity = date_value;
                this.conten = response.data;
            });
            this.supplierFormVisible = true;
        },
        //查看商户信息
        chakanTk(idid) {
            let data = {
                id: idid
            };
            console.log(data);
            chakan(data).then(response => {
                let date = new Date(response.data.licenceValidity);
                let date_value =
                    date.getFullYear() +
                    "-" +
                    this.formatTen(date.getMonth() + 1) +
                    "-" +
                    this.formatTen(date.getDate());
                response.data.licenceValidity = date_value;
                this.conten = response.data;
            });
            this.chakan = true;
        },
        formatTen(num) {
            return num > 9 ? num + "" : "0" + num;
        },
        //商户信息更新
        gengxinshanghu(idid) {
            console.log(this.conten);
            this.$refs["upForm"].validate(valid => {
                if (valid) {
                    gengxinxinxi(this.conten).then(() => {
                        this.supplierFormVisible = false;
                        this.$notify({
                            title: "成功",
                            message: "修改成功",
                            type: "success",
                            duration: 2000
                        });
                        this.getList();
                    });
                }
            });
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
                    that.oiltemp.licenceImg = tupian;
                })
                .catch(function(error) {});
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
                    that.conten.licenceImg = tupian;
                })
                .catch(function(error) {});
        }
    }
};
</script>
<style type="text/css" scoped>
@import url("./supplier.scss");
</style>
