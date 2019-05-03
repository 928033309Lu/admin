<template>
    <div class>
        <div class="header">
            <h3>
                    <i class="el-icon-arrow-left" @click="prev"></i>编辑
            </h3>
        </div>
        <div class="main">
            <div class="screen">
                <el-form
                    ref="dataForm"
                    :rules="rules"
                    :model="tianjia"
                    label-position="right"
                    label-width="150px"
                >
                    <div class="up">
                        <div class="left">
                            <el-form-item label="公司名称" prop="company_name">
                                <el-input v-model="tianjia.company_name"/>
                            </el-form-item>
                            <el-form-item label="公司简称" prop="short_name">
                                <el-input v-model="tianjia.short_name"/>
                            </el-form-item>
                            <el-form-item label="公司电话" prop="telephone">
                                <el-input v-model="tianjia.telephone"/>
                            </el-form-item>
                             
                            <el-form-item label="登陆账户">
                                <el-input v-model="tianjia.phone"/>
                            </el-form-item>

                           
                            <!-- <el-form-item> -->
                                <!-- <img :src="tianjia.id_back_img" class="avatar"> -->
         
                                <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">上传国徽面，
                        <em>点击上传</em>
                    </div>
                                </el-upload>-->
                            <!-- </el-form-item> -->
                        </div>
                        <div class="right">
                            <!-- <el-form-item label="平台账号" prop="platform">
                                <el-input v-model="tianjia.platform"/>
                            </el-form-item> -->
                            <!-- <el-form-item label="公司邮箱" prop="emial">
                                <el-input v-model="tianjia.emial"/>
                            </el-form-item>
                            <el-form-item label="手机" prop="phone">
                                <el-input v-model="tianjia.phone" maxlength="11"/>
                            </el-form-item>
                            <el-form-item label="座机" prop="telephone2">
                                <el-input v-model="tianjia.telephone2"/>
                            </el-form-item> -->
                             <el-form-item label="法人" prop="corporation">
                                <el-input v-model="tianjia.corporation"/>
                            </el-form-item>
                             <el-form-item label="身份证号" prop="idCard">
                                <el-input v-model="tianjia.idCard"/>
                            </el-form-item>
                            <el-form-item label="统一社会信用代码" prop="social_code">
                                <el-input v-model="tianjia.social_code"/>
                            </el-form-item>
                         
                            <el-form-item label="原因" v-if="tianjia.status==-1">
                                <el-input v-model="tianjia.remark"/>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="down">
                         <el-form-item label="法人身份证" st>
                                <!-- <img :src="tianjia.id_front_img" class="avatar"> -->
                                <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="idFrontImg">
                    <img v-if="tianjia.id_front_img" :src="tianjia.id_front_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传头像面</i>
                                </el-upload>
                                                       <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="idBackImg">
                    <img v-if="tianjia.id_back_img" :src="tianjia.id_back_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传国徽面</i>
                                </el-upload>
                                <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">上传头像面，
                        <em>点击上传</em>
                    </div>
                                </el-upload>-->
                            </el-form-item>
                             <el-form-item label="营业执照">
                                <!-- <img :src="tianjia.license_imgr" class="avatar"> -->
                                <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="addhandleAvatarSuccess">
                    <img v-if="tianjia.license_imgr" :src="tianjia.license_imgr" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">营业执照</i>
                                </el-upload>
                                <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">营业执照，
                        <em>点击上传</em>
                    </div>
                                </el-upload>-->
                            </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="baocun">保存</el-button>
            </div>
        </div>
    </div>
</template>


<script>
import { oilsStationCompany,shenhexiangqing} from "@/api/shanghuguanli";
import { getOilsStationInfo } from "@/api/shanghuguanli";
import { districtList } from "@/api/shanghuguanli";
import { updateOilsStationInfo } from "@/api/shanghuguanli";
import { insertOilsStationInfo } from "@/api/shanghuguanli";
import { check } from "@/api/shanghuguanli";
import VDistpicker from "v-distpicker";
import { updateCompanyById } from '@/api/shanghuguanli'
import axios from "axios";
export default {
    name: "",
    data: () => ({
        list: null,
        wheress: "",
        huoqu: {
            page: 1,
            limit: 10
        },
        tableKey: 0,
        listLoading: true,
        total: 0,
        form: {
            name: ""
        },
        listQuery: {
            page: 1,
            limit: 20,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: "+id"
        },
        tianjia: {
            company_name: "",
            telephone: "",
            corporation: "",
            platform: "",
            emial: "",
            phone: "",
            telephone2: "",
            id_back_img: "",
            id_front_img: "",
            license_imgr: ""
        },
        rules: {
            company_name: [
                { required: true, message: "不能为空", trigger: "blur" }
            ],
            telephone: [
                { required: true, message: "不能为空", trigger: "blur" }
            ],
            idCard: [
                { required: true, message: "不能为空", trigger: "blur" }
            ],
            corporation: [
                { required: true, message: "不能为空", trigger: "blur" }
            ],
            title: [{ required: true, message: "不能为空", trigger: "blur" }],
            emial: [{ required: true, message: "不能为空", trigger: "blur" }],
            phone: [{ required: true, message: "不能为空", trigger: "blur" }],
            social_code: [
                { required: true, message: "不能为空", trigger: "blur" }
            ]
        },
        dialogFormVisible: false,
        seeVisible: false,
        xiugaiVisible: false
    }),
    created() {
          var qid={
            id: this.$route.query.id
        }
        shenhexiangqing(qid).then(res=>{
            console.log(res)
            this.tianjia=res.data.companyInfo
            this.tianjia.idCard=res.data.id_card
        })
    },
    methods: {
        prev() {
            this.$router.go(-1);
        },
        onSubmit() {
            console.log("submit!");
        },
        //商户列表
        getList() {
            this.listLoading = true;
            this.huoqu.status = 1;
            shanghuList(this.huoqu).then(response => {
                console.log(response);
                this.list = response.data;
                setTimeout(() => {
                    this.listLoading = false;
                }, 1 * 1000);
            });
        },
        handleAdd() {
            // this.dialogFormVisible = true
        },
        sortChange(data) {},
        //添加商户
        createData() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    createArticle(this.tianjia).then(() => {
                        this.list.unshift(this.tianjia);
                        this.$refs["dataForm"].resetFields();
                        this.dialogFormVisible = false;
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
        del(id) {
            del(id).then(response => {
                console.log(response);
            });
        },
        where() {
            // account-examine
            if (this.wheress) {
                var data = {
                    company_name: this.wheress,
                    status: 1
                };
                wheres(data).then(res => {
                    console.log(res.data);
                    this.list = res.data;
                });
            } else {
                this.$message.error("搜索内容不能为空");
            }
        },
        baocun() {
            var data = this.tianjia;
            data.create_time = new Date(this.tianjia.create_time);
            if (data.register_date) {
                data.register_date = new Date(this.tianjia.register_date);
            }
            console.log(data);
            updateCompanyById(data).then(response => {
                console.log(response.data);
                if (response.data.error) {
                    this.$message.error("修改失败");
                } else {
                    this.xiugaiVisible = false;
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                    this.$router.go(-1)
                }
            });
        },
        //营业执照
        addhandleAvatarSuccess(res, file) {
            // URL.createObjectURL(file.raw);
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
                    that.tianjia.license_imgr = tupian;
                })
                .catch(function(error) {});
        },
        //身份证正面
        idFrontImg(res, file) {
            // URL.createObjectURL(file.raw);
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
                    that.tianjia.id_front_img = tupian;
                })
                .catch(function(error) {});
        },
        //身份证反面
        idBackImg(res, file) {
            // URL.createObjectURL(file.raw);
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
                    that.tianjia.id_back_img = tupian;
                })
                .catch(function(error) {});
        }
    }
};
</script>

<style type="text/css" scoped>
@import url("./account.scss");
</style>
<style scoped>
.header {
    background-color: #fff;
    padding-left: 1%;
}
.header h3 {
    line-height: 60px;
    margin: 0;
}
.el-input__inner {
    width: 40%;
}
.main {
    background-color: #fff;
    padding: 10px;
}
.el-input__inner,
.el-input {
    width: 300px;
}
.up{overflow: hidden;}
.up .left{float: left;}
.up .right{float: left;margin-left: 30px;}
.avatar{max-width: 300px;max-height: 160px;}
.dialog-footer{padding-left: 400px;}
.avatar {
    max-width: 300px;
    max-height: 160px;
    width: 300px;
    height: auto;
    text-align: center;
}
.avatar-uploader{
 display: inline-block;
}
</style>
