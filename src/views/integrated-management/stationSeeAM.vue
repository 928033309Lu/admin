<template>
    <div class>
        <!-- （商户）油站管理-油站申请-查看 -->
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>油站管理-查看
            </h3>
        </div> 
        <div class="main">
            <div class="header">
                <div class="oils">
                    <div class="oil-top">
                        <span></span>
                        <p>身份证/护照</p>
                    </div>
                    <div class="icon">   
                        <i class="el-icon-warning" style="color:#5b8dff;"></i>
                        <span>法人身份证</span>
                    </div> 
                        <div class="oils-box">   
                            <div class="up">
                                <img
                                    v-if="seeStationInfo.idCardFront"
                                    :src="seeStationInfo.idCardFront"
                                    class="avatar"
                                >
                            </div>
                            <div class="up">
                                <img
                                    v-if="seeStationInfo.idCardBack"
                                    :src="seeStationInfo.idCardBack"
                                    class="avatar"
                                >
                            </div>
                                <div class="oil ">
                                    <div class="boxs">
                                        <span>法人姓名：{{seeStationInfo.corporationName}}</span>
                                    </div>
                                    <div class="boxs">
                                        <span>身份证号：{{seeStationInfo.idCardNo}}</span>
                                    </div>
                                </div>
                                <div class="boxs">
                                    <span>有效期至：{{seeStationInfo.chemistryEnd | dateTime }}</span>
                                </div>   
                        </div>  
                    </div> 
                    <div class="oils">
                         <div class="oil-top">
                            <span></span>
                            <p>营业执照</p>
                         </div>
                        <div class="icon">   
                            <i class="el-icon-warning" style="color:#5b8dff;"></i>
                            <span>营业执照</span>
                        </div> 
                        <div class="oils-box">   
                            <div class="up">
                                <img
                                v-if="seeStationInfo.businessLicense"
                                :src="seeStationInfo.businessLicense"
                                class="avatar"
                                >
                            </div>
                            <div class="oil ">
                                    <div class="boxs">
                                    <span>统一社会信息代码：{{seeStationInfo.socialCode}}</span>
                                </div> 
                                <div class="boxs">
                                    <span>有效期至：{{seeStationInfo.reprocessOiEnd | dateTime }}</span>                                        
                                </div>
                            </div>
                        </div>     
                    </div>
                     <div class="oils">
                        <div class="oil-top">
                            <span></span>
                            <p>油站信息</p>
                        </div> 
                        <div class="oils-section">
                            <div class="left">
                                <div class="box">
                                    <span>油站全称：{{seeStationInfo.fullName}}</span>
                                </div> 
                                <div class="box">
                                    <span>油站简称：{{seeStationInfo.shortName}}</span>
                                </div>
                                <div class="box">
                                    <span>营业时间：</span>
                                    <span>{{seeStationInfo.openTime | dateTime('-',true)}}</span>
                                    <span>-</span>
                                    <span>{{seeStationInfo.closeTime | dateTime('-',true)}}</span>
                                </div>
                                <div class="box">                                         
                                    <span>油站位置：</span>
                                    <span v-for="item in diqu" v-if="seeStationInfo.provinceId == item.id">{{ item.district }}</span>
                                    <span>-</span>
                                    <span v-for="item in diqu" v-if="seeStationInfo.cityId == item.id">{{ item.district }}</span>
                                    <span>-</span>
                                    <span v-for="item in diqu" v-if="seeStationInfo.regoinId == item.id">{{ item.district }}</span>                                                                                                                                                      
                                </div>
                                    <div class="box">
                                         <span>坐标：</span>
                                         <span>{{seeStationInfo.longitude}}</span>
                                         <span>-</span>
                                         <span>{{seeStationInfo.latitude}}</span>
                                    </div>
                            </div>
                            <div class="left">                                       
                                <div class="box">
                                    <span>营业状态：</span>
                                    <span v-for="item in options" v-if="item.value == seeStationInfo.openStatus">{{ item.label }}</span>
                                </div>
                                <div class="box">
                                    <span>油站电话：{{seeStationInfo.telphone}}</span>
                                </div>
                                <div class="box">
                                    <span>详细地址：{{seeStationInfo.address}}</span>
                                </div>
                                    <div class="box">
                                        <div class="radio">
                                            <div class="isn">
                                                <span>便利店：</span>
                                                <span>{{ seeStationInfo.haveStore ? '是' : '否' }}</span>
                                            </div>
                                            <div class="isn">
                                                <span>洗车服务：</span>
                                                <span>{{seeStationInfo.haveCarWash ? '是' : '否' }}</span>
                                            </div>
                                        </div>
                                        <div class="radio">
                                            <div class="isn">
                                                <span>卫生间：</span>
                                                <span>{{ seeStationInfo.haveWashroom ? '是' : '否' }}</span>
                                            </div>
                                            <div class="isn">
                                                <span>汽车维护服务：</span>
                                                <span>{{ seeStationInfo.haveReapirTruck ? '是' : '否' }}</span>
                                            </div>
                                        </div>
                                    </div>                                       
                                </div>
                            </div>                              
                        </div> 
                        <div class="oils">
                            <div class="oil-top">
                                    <span></span>
                                    <p>油品信息</p>
                            </div>
                            <div class="oils-section">                                       
                                <div class="left">      
                                    <div class="icon">   
                                        <i class="el-icon-warning" style="color:#5b8dff;"></i>
                                        <span>成油品零售经营许可证</span>
                                    </div> 
                                    <div class="oils-box">    
                                        <div class="up">
                                            <img
                                                v-if="seeStationInfo.reprocessOilLicense"
                                                :src="seeStationInfo.reprocessOilLicense"
                                                class="avatar"
                                            >                                           
                                        </div>
                                        <div class="oils-box ">
                                            <div class="box">
                                                <span>成油品零售经营许可证：{{seeStationInfo.socialCode}}</span>
                                                     
                                            </div> 
                                            <div class="box">
                                                <span>有效期至：{{seeStationInfo.reprocessOiEnd | dateTime }}</span>      
                                            </div>
                                        </div>
                                    </div>                              
                                </div>
                                <div class="right">
                                    <div class="icon">   
                                        <i class="el-icon-warning" style="color:#5b8dff;"></i>
                                        <span>危险化学品经营许可证编号</span>
                                    </div> 
                                    <div class="oils-box">    
                                        <div class="up">
                                            <img
                                                v-if="seeStationInfo.dangerChemistryLicense"
                                                :src="seeStationInfo.dangerChemistryLicense"
                                                class="avatar"
                                            >
                                        </div>
                                    <div class="oils-box">
                                            <div class="box">
                                            <span>危险化学品经营许可证编号:{{seeStationInfo.dangerChemistryLicense}}</span>
                                                    
                                        </div> 
                                        <div class="box">
                                            <span>有效期至：{{seeStationInfo.chemistryEnd | dateTime }}</span>                                                     
                                        </div>
                                    </div>
                                    </div>                              
                                </div>
                            </div>
                        </div>
                        <div class="oils">
                            <div class="oil-top">
                                <span></span>
                                <p>油枪油罐对应关系</p>
                            </div>
                            <el-table :data="this.seeStationInfo.relationshipData" stripe style="width: 100%">
                                <el-table-column prop="oil_gun_no" label="油枪号" align="center"></el-table-column>
                                <el-table-column prop="oils_name" label="油品号" align="center"></el-table-column>
                                <el-table-column prop="oilcan_no" align="center" label="油罐号"></el-table-column>
                                <el-table-column prop="oils_price" align="center" label="单价"></el-table-column>
                            </el-table>
                        </div>
                </div>
            </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="prev">取消</el-button>
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
        this.getInfo();
    },
    methods: {
        prev() {
            this.$router.go(-1);
        },
        getInfo() {
            let data = {
                id: this.id
            };
            districtList({}).then(response => {
                console.log("地区列表");
                console.log(response.data);
                this.diqu = response.data;
                for (let i = 0; i < this.diqu.length; i++) {
                    if (this.diqu[i].level == 1) {
                        this.sheng.push(this.diqu[i]);
                    }
                }
            });
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
            // this.$router.push({
            //     name: "stationSee",
            //     id: this.id
            // });
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

<style scoped>
@import url("./stationSetSM.scss");
.header {
    background-color: #fff;
    padding-left: 1%;
}
.header h3 {
    line-height: 60px;
    margin: 0;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
  // padding: 2%;
    color: #606266;
}
.main{
  // min-height: calc(100vh - 214px);
  width: 100%;
  height: 100%;
  
}
.warp>.header{
  background-color: #fff;
  height: 60px;
  padding-left: 1%;
}   
.header h3{
  line-height: 60px;
  margin: 0;
}
.oil-top p{
     margin: 0;
    //  padding: 0;
     padding: 10px 0 0 15px;
}
.oil-top{
    padding-bottom: 10px;
}
.header .box{
    margin-bottom: 20px;
}
.header .radio{
    // margin-bottom: 20px;
    width: 100%; 
}
.radio{
    display: flex;
    width: 100%;
}
.radio .isn{
    width: 20%;
}
.bg-purple-light{
    margin-left: 20px;
}
.dialog-footer{
    text-align: center;
}
.dialog-footer .el-button:nth-of-type(2){
    margin-left: 200px;
}
.up{
    display: inline-block;
    vertical-align: middle;
}
.btn{
    margin-bottom: 15px;
    text-align: right;
}
span{
    line-height: 36px;
}
.dialog-footer{
    background-color: #fff;
    padding: 20px 0;
}
</style>
<style >
.el-tabs__nav-scroll{
    padding: 0 40px;
}
.app-main .notop{
    padding-top: 0;
}
.app-container .el-form .items{
    padding-left: 40px;
}
.el-dialog__header{
    text-align: center;
    background-color: #5B8DFF;
    color:#fff;
}
.avatar {
    width: 315px;
    height: 178px;
    display: block;
}
</style>