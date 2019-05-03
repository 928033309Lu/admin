<template>
    <div class>
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>查看详情
            </h3>
        </div>
        <div class="main">
            <div class="header">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="box">
                                <span>油站全称：</span>
                                <el-input
                                    v-model="shenqing.fullName"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>油站简称：</span>
                                <el-input
                                    v-model="shenqing.shortName"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>油站位置：</span>
                                <div class="dizhi">
                                    <!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
                                    <el-select
                                        @change="shengChange"
                                        clearable
                                        v-model="shenqing.provinceId"
                                        placeholder="请选择"
                                        style="width:120px"
                                    >
                                        <el-option
                                            v-for="item in sheng"
                                            :key="item.id.toString()"
                                            :label="item.district"
                                            :value="item.id.toString()"
                                        ></el-option>
                                    </el-select>
                                    <el-select
                                        clearable
                                        v-model="shenqing.cityId"
                                        @change="shiChange"
                                        placeholder="请选择"
                                        style="width:120px"
                                    >
                                        <el-option
                                            v-for="item in shi"
                                            :key="item.id.toString()"
                                            :label="item.district"
                                            :value="item.id.toString()"
                                        ></el-option>
                                    </el-select>
                                    <el-select
                                        clearable
                                        v-model="shenqing.regoinId"
                                        placeholder="请选择"
                                        style="width:120px"
                                    >
                                        <el-option
                                            v-for="item in xian"
                                            :key="item.id.toString()"
                                            :label="item.district"
                                            :value="item.id.toString()"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="box">
                                <span class="zuo">坐标：</span>
                                <el-input
                                    v-model="shenqing.longitude"
                                    style="width:150px"
                                    placeholder="请输入内容"
                                ></el-input>
                                <span>-</span>
                                <el-input
                                    v-model="shenqing.latitude"
                                    style="width:150px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>营业状态：</span>
                                <el-select v-model="shenqing.openStatus" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div class="box">
                                <span>法人身份证</span>
                                <div class="up">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://httpbin.org/post"
                                        :show-file-list="false"
                                        :on-success="shenqingidCardFront"
                                    >
                                        <img
                                            v-if="shenqing.idCardFront"
                                            :src="shenqing.idCardFront"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon">正面</i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span></span>
                                <div class="up">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://httpbin.org/post"
                                        :show-file-list="false"
                                        :on-success="shenqingidCardBack"
                                    >
                                        <img
                                            v-if="shenqing.idCardBack"
                                            :src="shenqing.idCardBack"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>法人姓名</span>
                                <el-input
                                    v-model="shenqing.corporationName"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>身份证号</span>
                                <el-input
                                    v-model="shenqing.idCardNo"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>成品油零售经营许可证</span>
                                <div class="up">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://httpbin.org/post"
                                        :show-file-list="false"
                                        :on-success="shenqingreprocessOilLicense"
                                    >
                                        <img
                                            v-if="shenqing.reprocessOilLicense"
                                            :src="shenqing.reprocessOilLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>有效期至</span>
                                <el-date-picker
                                    v-model="shenqing.reprocessOiEnd"
                                    type="date"
                                    placeholder="选择日期"
                                    clearable
                                ></el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <div class="box">
                                <span>油站电话：</span>
                                <el-input
                                    v-model="shenqing.telphone"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>详细地址：</span>
                                <el-input
                                    v-model="shenqing.address"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>营业时间：</span>
                                <el-time-picker
                                     clearable
                                    style="width:150px"
                                    v-model="shenqing.openTime"
                                    :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
                                    placeholder="任意时间点"
                                ></el-time-picker>
                                <span>-</span>
                                <el-time-picker
                                    style="width:150px"
                                    v-model="shenqing.closeTime"
                                    :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
                                    placeholder="任意时间点"
                                    clearable
                                ></el-time-picker>
                            </div>
                            <div class="radio">
                                <span>是否开设便利店：</span>
                                <el-radio v-model="shenqing.haveStore" :label="1">是</el-radio>
                                <el-radio v-model="shenqing.haveStore" :label="0">否</el-radio>
                                <span>是否没有洗车服务：</span>
                                <el-radio v-model="shenqing.haveCarWash" :label="1">是</el-radio>
                                <el-radio v-model="shenqing.haveCarWash" :label="0">否</el-radio>
                            </div>
                            <div class="radio">
                                <span>是否开放卫生间：</span>
                                <el-radio v-model="shenqing.haveWashroom" :label="1">是</el-radio>
                                <el-radio v-model="shenqing.haveWashroom" :label="0">否</el-radio>
                                <span>是否没有维修服务：</span>
                                <el-radio v-model="shenqing.haveReapirTruck" :label="1">是</el-radio>
                                <el-radio v-model="shenqing.haveReapirTruck" :label="0">否</el-radio>
                            </div>
                            <div class="box">
                                <span>营业执照</span>
                                <div class="up">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://httpbin.org/post"
                                        :show-file-list="false"
                                        :on-success="shenqingbusinessLicense"
                                    >
                                        <img
                                            v-if="shenqing.businessLicense"
                                            :src="shenqing.businessLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>统一社会信息代码</span>
                                <el-input
                                    v-model="shenqing.socialCode"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>危险化学品经营许可证</span>
                                <div class="up">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://httpbin.org/post"
                                        :show-file-list="false"
                                        :on-success="shenqingdangerChemistryLicense"
                                    >
                                        <img
                                            v-if="shenqing.dangerChemistryLicense"
                                            :src="shenqing.dangerChemistryLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>许可证编号</span>
                                <el-input
                                    v-model="shenqing.chemistryCode"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>有效期至</span>
                                <el-date-picker
                                    v-model="shenqing.chemistryEnd"
                                    type="date"
                                   clearable
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </div>
                            <div class="box" v-show="seeStationInfo.status==-1">
                                <span>拒绝原因</span>
                                <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 5, maxRows: 5}"
                                    placeholder="请输入内容"
                                    v-model="seeStationInfo.remark"
                                ></el-input>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="insertOilsStation">提交</el-button>
            </div>
        </div>
    </div>
</template>


<script>
import { oilsStationCompany } from "@/api/shanghuguanli";
import { getOilsStationInfo } from "@/api/shanghuguanli";
import { districtList } from "@/api/shanghuguanli";
import { updateOilsStationInfo } from "@/api/shanghuguanli";
import { insertOilsStationInfo } from "@/api/shanghuguanli";
import { check } from "@/api/shanghuguanli";
import VDistpicker from "v-distpicker";
import axios from "axios";
export default {
    name: "",
    data: () => ({
        //油站管理临时数据
        tableData: [],
        //油站申请临时数据
        applyData: [],
        options: [
            {
                value: 0,
                label: "营业中"
            },
            {
                value: 1,
                label: "暂停营业"
            }
        ],
        oilStationFullName: "北京石油有限公司北京一号加油站", //油站全称
        oilStationAbbreviation: "北京一号加油站", //油站简称
        longitude: "经度 20", //经度
        latitude: "纬度 20", //纬度
        businessStatus: "1", //营业状态
        openStore: "", //是否开设便利店
        openToilet: "", //是否开放卫生间
        oilStationCode: "UA01", //油站编码
        oilStationTelephone: "15012334566", //油站电话
        detailedAddress: "XX路XX号", //详细地址
        businessHours: [
            new Date(2018, 9, 10, 8, 0),
            new Date(2018, 9, 10, 18, 0)
        ], //营业时间 开始-结束
        carWashing: "", //是否没有洗车服务
        maintenance: "", //是否没有维修服务
        //油枪油罐对应关系临时表格
        relationshipData: [],
        imageUrl: "", //上传地址
        stationInfo: {}, //编辑油站信息
        diqu: [], //地区表
        sheng: [], //省列表
        shi: [], //市列表
        xian: [], //县列表
        chakanVisible: false,
        seeStationInfo: {},
        shenqing: {
            fullName: "",
            shortName: "",
            provinceId: "",
            cityId: "",
            regoinId: "",
            longitude: "",
            latitude: "",
            openStatus: "",
            idCardFront: "",
            idCardBack: "",
            corporationName: "",
            idCardNo: "",
            reprocessOilLicense: "",
            reprocessOiEnd: "",
            telphone: "",
            address: "",
            openTime: "",
            closeTime: "",
            haveStore: "",
            haveCarWash: "",
            haveWashroom: "",
            haveReapirTruck: "",
            businessLicense: "",
            socialCode: "",
            dangerChemistryLicense: "",
            chemistryCode: "",
            chemistryEnd: ""
        },
        shenqingSeeVisible: false,
        listLoading: true,
        shenqingLoading: true,
        shenqingbianjiVisible: false,
        remark: "",
        id: ""
    }),
    created() {
        this.id = this.$route.query.id;
    },
    methods: {
        prev() {
            this.$router.go(-1);
        },
        formatDate(row, column) {
            const now = new Date(row[column.property]);
            if (now != "Invalid Date") {
                var year =
                    now.getFullYear() > 10
                        ? now.getFullYear()
                        : "0" + now.getFullYear();
                var month =
                    now.getMonth() + 1 > 10
                        ? now.getMonth() + 1
                        : "0" + (now.getMonth() + 1);
                var date =
                    now.getDate() > 10 ? now.getDate() : "0" + now.getDate();
                var hour =
                    now.getHours() > 10 ? now.getHours() : "0" + now.getHours();
                var minute =
                    now.getMinutes() > 10
                        ? now.getMinutes()
                        : "0" + now.getMinutes();
                var second =
                    now.getSeconds() > 10
                        ? now.getSeconds()
                        : "0" + now.getSeconds();
                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    date +
                    " " +
                    hour +
                    ":" +
                    minute +
                    ":" +
                    second
                );
            } else {
                return row[column.property];
            }
        },
        getList() {
            this.listLoading = true;
            this.shenqingLoading = true;
            var data = {
                status: 1
            };
            //获取油站管理列表
            oilsStationCompany(data).then(response => {
                console.log(response.data);
                this.tableData = response.data;
                this.listLoading = false;
            });
            var data1 = {
                status: 0
            };
            //获取油站申请列表
            oilsStationCompany(data1).then(response => {
                console.log("申请列表");
                console.log(response.data);
                this.applyData = response.data;
                this.shenqingLoading = false;
            });
            var a = {};
            districtList(a).then(response => {
                console.log("地区列表");
                console.log(response.data);
                this.diqu = response.data;
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.diqu[i].level == 1) {
                        this.sheng.push(this.diqu[i]);
                    }
                }
            });
        },
        //省的值发生变化时
        shengChange() {
            console.log(this.stationInfo.provinceId);
            this.shi = [];
            if (this.applicationVisible) {
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.shenqing.provinceId == this.diqu[i].pid) {
                        this.shi.push(this.diqu[i]);
                    }
                }
            } else {
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.stationInfo.provinceId == this.diqu[i].pid) {
                        this.shi.push(this.diqu[i]);
                    }
                }
            }
        },
        //市的值发生变化时
        shiChange() {
            this.xian = [];
            if (this.applicationVisible) {
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.shenqing.cityId == this.diqu[i].pid) {
                        this.xian.push(this.diqu[i]);
                    }
                }
            } else {
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.stationInfo.cityId == this.diqu[i].pid) {
                        this.xian.push(this.diqu[i]);
                    }
                }
            }
        },
        //油站管理编辑
        administrationEdit(index, row) {
            var data = {
                id: this.id
            };

            getOilsStationInfo(data).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.stationInfo = response.data.stationInfo;
                this.stationInfo.openTime = new Date(
                    response.data.stationInfo.openTime
                );
                this.stationInfo.closeTime = new Date(
                    response.data.stationInfo.closeTime
                );
                this.stationInfo.reprocessOiEnd = new Date(
                    response.data.stationInfo.reprocessOiEnd
                );
                this.stationInfo.chemistryEnd = new Date(
                    response.data.stationInfo.chemistryEnd
                );
                this.stationInfo.provinceId;
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.stationInfo.provinceId == this.diqu[i].pid) {
                        this.shi.push(this.diqu[i]);
                    }
                }
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.stationInfo.cityId == this.diqu[i].pid) {
                        this.xian.push(this.diqu[i]);
                    }
                }
            });
            this.administrationVisible = true;
        },

        updateOilsStation() {
            var data = this.stationInfo;
            console.log(data);
            updateOilsStationInfo(data).then(response => {
                console.log("修改成功");
                console.log(response.data);
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.administrationVisible = false;
            });
        },
        application(index, row) {
            this.shenqingbianjiVisible = true;
            var data = {
                id: this.id
            };
            getOilsStationInfo(data).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.seeStationInfo = response.data.stationInfo;
                this.seeStationInfo.relationshipData = response.data.oilGunList;
                this.seeStationInfo.openTime = new Date(
                    response.data.stationInfo.openTime
                );
                this.seeStationInfo.closeTime = new Date(
                    response.data.stationInfo.closeTime
                );
                this.seeStationInfo.reprocessOiEnd = new Date(
                    response.data.stationInfo.reprocessOiEnd
                );
                this.seeStationInfo.chemistryEnd = new Date(
                    response.data.stationInfo.chemistryEnd
                );
                this.remark = response.data.remark;
            });
        },
        //油站申请确认
        insertOilsStation() {
            var data = this.shenqing;
            console.log(this.shenqing);
            console.log(data);
            for (let i = 0; i < this.diqu.list; i++) {
                if (data.provinceId == this.diqu[i].id) {
                    data.provinceName = this.diqu[i].district;
                }
            }
            for (let i = 0; i < this.diqu.list; i++) {
                if (data.cityId == this.diqu[i].id) {
                    data.cityName = this.diqu[i].district;
                }
            }
            for (let i = 0; i < this.diqu.list; i++) {
                if (data.cityId == this.diqu[i].id) {
                    data.regoinName = this.diqu[i].district;
                }
            }
            insertOilsStationInfo(data).then(response => {
                console.log("申请成功");
                console.log(response.data);
                if (response.data.message == "ok") {
                    this.$message({
                        message: "申请成功",
                        type: "success"
                    });
                    this.applicationVisible = false;
                    this.getList();
                } else {
                    this.$message.error("申请失败");
                }
            });
        },
        //油站重新申请确认
        insert() {
            this.shenqingbianjiVisible = false;
            var data = this.seeStationInfo;
            for (let i = 0; i < this.diqu.list; i++) {
                if (data.provinceId == this.diqu[i].id) {
                    data.provinceName = this.diqu[i].district;
                }
            }
            for (let i = 0; i < this.diqu.list; i++) {
                if (data.cityId == this.diqu[i].id) {
                    data.cityName = this.diqu[i].district;
                }
            }
            for (let i = 0; i < this.diqu.list; i++) {
                if (data.cityId == this.diqu[i].id) {
                    data.regoinName = this.diqu[i].district;
                }
            }
            data.status = 0;
            data.remark = "";
            console.log(data);
            check(data).then(response => {
                console.log("申请成功");
                console.log(response.data);
                if (response.data.message) {
                    this.$message({
                        message: "重新申请成功",
                        type: "success"
                    });
                    this.shenqingbianjiVisible = false;
                    this.getList();
                } else {
                    this.$message.error("重新申请失败");
                }
            });
        },
        chehui(index, row) {
            var data = {
                id: this.id,
                status: -2
            };
            check(data).then(response => {
                console.log(response.data);
                if (response.data.message) {
                    this.$message({
                        message: "撤回成功",
                        type: "success"
                    });
                    this.getList();
                } else {
                    this.$message.error("撤回失败");
                }
            });
        },
        chongxinshenqing(index, row) {
            var data = {
                id: this.id,
                status: 0
            };
            check(data).then(response => {
                console.log(response.data);
                if (response.data.message) {
                    this.$message({
                        message: "重新申请成功",
                        type: "success"
                    });
                    this.getList();
                } else {
                    this.$message.error("重新申请失败");
                }
            });
        },
        //地址三级联动选择数据处理
        //   onSelected(data) {
        // 	console.log(data)
        // 	console.log(data.province + ' | ' + data.city + ' | ' + data.area)
        //   },
        chakanEdit(index, row) {
            this.$router.push({
                name: "stationSee",
                id: this.id
            });
            this.chakanVisible = true;
            var data = {
                id: this.id
            };
            getOilsStationInfo(data).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.seeStationInfo = response.data.stationInfo;
                this.seeStationInfo.relationshipData = response.data.oilGunList;
            });
        },
        shenqingSee(index, row) {
            this.shenqingSeeVisible = true;
            var data = {
                id: this.id
            };
            getOilsStationInfo(data).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.seeStationInfo = response.data.stationInfo;
                this.seeStationInfo.relationshipData = response.data.oilGunList;
            });
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        //   handleAvatarSuccess(res, file) {
        // 	this.imageUrl = URL.createObjectURL(file.raw);
        // var reads= new FileReader();
        // reads.readAsDataURL(file.raw);
        // reads.onload=function (e) {
        // 	console.log(reads.readAsDataURL(this.result))
        // document.getElementById('tou').src=this.result;
        // };

        //   },
        //油站管理编辑身份证正面
        idCardFront(res, file) {
            // this.stationInfo.idCardFront = URL.createObjectURL(file.raw);
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
                    that.stationInfo.idCardFront = tupian;
                })
                .catch(function(error) {});
        },
        //油站申请身份证正面
        shenqingidCardFront(res, file) {
            // this.shenqing.idCardFront = URL.createObjectURL(file.raw);
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
                    that.shenqing.idCardFront = tupian;
                })
                .catch(function(error) {});
        },
        //油站管理编辑身份证反面
        idCardBack(res, file) {
            // this.stationInfo.idCardBack = URL.createObjectURL(file.raw);
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
                    that.stationInfo.idCardBack = tupian;
                })
                .catch(function(error) {});
        },
        //油站申请身份证反面
        shenqingidCardBack(res, file) {
            // this.shenqing.idCardBack = URL.createObjectURL(file.raw);
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
                    that.shenqing.idCardBack = tupian;
                })
                .catch(function(error) {});
        },
        //油站管理编辑成品油零售经营许可证
        reprocessOilLicense(res, file) {
            // this.stationInfo.reprocessOilLicense = URL.createObjectURL(file.raw);
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
                    that.stationInfo.reprocessOilLicense = tupian;
                })
                .catch(function(error) {});
        },
        //油站申请成品油零售经营许可证
        shenqingreprocessOilLicense(res, file) {
            // this.shenqing.reprocessOilLicense = URL.createObjectURL(file.raw);
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
                    that.shenqing.reprocessOilLicense = tupian;
                })
                .catch(function(error) {});
        },
        //油站管理编辑营业执照
        businessLicense(res, file) {
            // this.stationInfo.businessLicense = URL.createObjectURL(file.raw);
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
                    that.stationInfo.businessLicense = tupian;
                })
                .catch(function(error) {});
        },
        //油站申请营业执照
        shenqingbusinessLicense(res, file) {
            // this.shenqing.businessLicense = URL.createObjectURL(file.raw);
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
                    that.shenqing.businessLicense = tupian;
                })
                .catch(function(error) {});
        },
        //油站管理编辑危险化学品经营许可证
        dangerChemistryLicense(res, file) {
            // this.stationInfo.dangerChemistryLicense = URL.createObjectURL(file.raw);
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
                    that.stationInfo.dangerChemistryLicense = tupian;
                })
                .catch(function(error) {});
        },
        //油站申请危险化学品经营许可证
        shenqingdangerChemistryLicense(res, file) {
            // this.shenqing.dangerChemistryLicense = URL.createObjectURL(file.raw);
            // console.log(this.shenqing.dangerChemistryLicense)
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
                    that.shenqing.dangerChemistryLicense = tupian;
                })
                .catch(function(error) {});
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
}
.main {
    background-color: #fff;
    width: 100%;
    padding: 30px;
}
.header {
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f6f7fb;
}
.header .box {
    line-height: 60px;
}
.header h3 {
    display: inline-block;
    line-height: 60px;
    margin: 0;
    margin-right: 10px;
}
.header h3 span {
    display: inline-block;
    width: 3px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 5px;
}
.top {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.date {
    padding: 0 10px;
}
.date > .el-button {
    margin-right: 20px;
    font-size: 14px;
    line-height: 36px;
    color: black;
}
.date > .el-button:focus {
    color: #409eff;
}
.xuan span {
    font-size: 14px;
    line-height: 36px;
}
.date,
.xuan {
    margin-bottom: 10px;
}
.xuan .el-select:nth-of-type(1) {
    margin-right: 20px;
}
p {
    font-size: 14px;
}
.biao {
    padding: 10px 20px;
    text-align: center;
}
.table {
    border: 1px solid #ededed;
    border-bottom: 0;
    margin-top: 10px;
}
.dao {
    display: inline-block;
}
.dbox {
    display: flex;
    justify-content: space-between;
}
.dbox .box {
    width: 25%;
}
.box {
    margin: 0 10px;
}
.box > span {
    width: auto;
}
.dbox .el-input {
    width: 80%;
}
.riqi {
    margin-top: 20px;
}
.leixing {
    margin-top: 20px;
}
.leixing .el-input {
    width: 90%;
    margin-left: 20px;
}
.zhuti {
    margin-top: 20px;
}
.zhuti .el-input {
    width: 90%;
    margin-left: 50px;
}
.neirong {
    margin-top: 20px;
}
.neirong span {
    vertical-align: top;
}
.neirong .el-textarea {
    width: 90%;
    margin-left: 50px;
}
.anniu {
    margin-top: 20px;
}
.anniu .el-button {
    margin-left: 20%;
}
.el-radio-group {
    margin-left: 50px;
}
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
</style>