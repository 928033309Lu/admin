<template>
   <div class='oil-editor'>
       <!-- （商户）油站管理-油站管理-编辑 -->
      <el-form label-width="100px">
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>油站管理-编辑
            </h3>
           
        </div>
        <div class="main">
            <div class="header">
                   <div class="oils">
                         <div class="oil-top">
                            <span></span><el-form-item label="身份证/护照"/>
                         </div>
                        <div class="icon">   
                            <i class="el-icon-warning" style="color:#5b8dff;"></i>
                            <span>请上传法人身份证</span>
                        </div> 
                        <div class="oils-box">   
                            <div class="up">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://httpbin.org/post"
                                    :show-file-list="false"
                                    :on-success="idCardFront"
                                >
                                    <img
                                        v-if="stationInfo.idCardFront"
                                        :src="stationInfo.idCardFront"
                                        class="avatar"
                                    >
                                    
                                    <i v-else class="el-icon-plus avatar-uploader-icon">身份证照片面</i>
                                    <div class="button">
                                        <el-button>重新上传</el-button>
                                    </div>
                                </el-upload>
                                
                            </div>
                            <div class="up">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://httpbin.org/post"
                                    :show-file-list="false"
                                    :on-success="idCardBack"
                                >
                                    <img
                                        v-if="stationInfo.idCardBack"
                                        :src="stationInfo.idCardBack"
                                        class="avatar"
                                    >
                                    <i v-else class="el-icon-plus avatar-uploader-icon">身份证国徽面</i>
                                    <div class="button">
                                        <el-button>重新上传</el-button>
                                    </div>
                                </el-upload>
                                
                            </div>
                                <div class="oils-legal ">
                                    <div class="boxs">
                                        <span>法人姓名：</span>
                                        <el-input
                                            v-model="stationInfo.corporationName"
                                            style="width:220px"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </div>
                                    <div class="boxs">
                                        <span>身份证号：</span>
                                       <el-input
                                            v-model="stationInfo.idCardNo"
                                            style="width:220px"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </div>
                                </div>
                                <div class="boxs">
                                    <span>有效期至：</span>
                                    <el-date-picker
                                        v-model="stationInfo.reprocessOiEnd"
                                        type="date"
                                        unlink-panels
                                        :picker-options="pickerOptions"
                                        style="width:180px"
                                        placeholder="选择日期"
                                    ></el-date-picker>
                                </div>   
                        </div>  
                    </div>  
                     <div class="oils">
                         <div class="oil-top">
                            <span></span><el-form-item label="营业执照"/>
                         </div>
                        <div class="icon">   
                            <i class="el-icon-warning" style="color:#5b8dff;"></i>
                            <span>请上传营业执照</span>
                        </div> 
                        <div class="oils-box">   
                                <div class="up">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="https://httpbin.org/post"
                                        :show-file-list="false"
                                        :on-success="businessLicense"
                                    >
                                        <img
                                            v-if="stationInfo.businessLicense"
                                            :src="stationInfo.businessLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon">营业执照</i>
                                        <div class="button">
                                            <el-button>重新上传</el-button>
                                        </div>
                                    </el-upload>
                                    
                                </div>
                                <div class="oils-legal ">
                                     <div class="boxs">
                                        <span>统一社会信息代码：</span>
                                         <el-input
                                                v-model="stationInfo.socialCode"
                                                style="width:220px"
                                                placeholder="请输入内容"
                                            ></el-input>
                                    </div> 
                                    <div class="boxs">
                                        <span>有效期至：</span>
                                         <el-date-picker
                                                v-model="stationInfo.reprocessOiEnd"
                                                type="date"
                                                unlink-panels
                                                :picker-options="pickerOptions"
                                                style="width:220px"
                                                placeholder="选择日期"
                                            ></el-date-picker>
                                    </div>
                                </div>
                            </div>     
                        </div>
                                <div class="oils">
                                    <div class="oil-top">
                                        <span></span><el-form-item label="油站信息"/>
                                    </div> 
                                        <div class="oils-section">
                                            <div class="left">
                                                <div class="box">
                                                    <span>油站全称：</span>
                                                    <el-input
                                                            v-model="stationInfo.fullName"
                                                            style="width:220px"
                                                            placeholder="请输入内容"
                                                    ></el-input>
                                                </div> 
                                                <div class="box">
                                                    <span>油站简称：</span>
                                                    <el-input
                                                        v-model="stationInfo.shortName"
                                                        style="width:200px"
                                                        placeholder="请输入内容"
                                                    ></el-input>
                                                </div>
                                                <div class="box">
                                                    <span>营业时间：</span>
                                                <el-time-picker
                                                        unlink-panels
                                                        style="width:150px"
                                                        v-model="stationInfo.openTime"
                                                        :picker-options="{
                                                            selectableRange: '00:00:00 - 23:00:00'
                                                            }"
                                                        placeholder="任意时间点"
                                                    ></el-time-picker>
                                                    <span>-</span>
                                                    <el-time-picker
                                                        unlink-panels
                                                        style="width:150px"
                                                        v-model="stationInfo.closeTime"
                                                        :picker-options="{
                                                            selectableRange: '00:00:00 - 23:00:00'
                                                            }"
                                                        placeholder="任意时间点"
                                                    ></el-time-picker>
                                                </div>
                                                <div class="box">                                         
                                                        <span>油站位置：</span>
                                                        <el-select
                                                            @change="shengChange"
                                                            v-model="stationInfo.provinceId"
                                                            placeholder="请选择"
                                                            style="width:120px"
                                                            clearable
                                                        >
                                                            <el-option
                                                                v-for="item in sheng"
                                                                :key="item.id.toString()"
                                                                :label="item.district"
                                                                :value="item.id.toString()"
                                                            ></el-option>
                                                        </el-select>
                                                        <el-select
                                                            v-model="stationInfo.cityId"
                                                            @change="shiChange"
                                                            placeholder="请选择"
                                                            clearable
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
                                                            v-model="stationInfo.regoinId"
                                                            placeholder="请选择"
                                                            style="width:120px"
                                                            clearable
                                                        >
                                                            <el-option
                                                                v-for="item in xian"
                                                                :key="item.id.toString()"
                                                                :label="item.district"
                                                                :value="item.id.toString()"
                                                            ></el-option>
                                                        </el-select>                                                                                                                                                          
                                                    </div>
                                                    <div class="box">
                                                        <span>坐标：</span>
                                                        <el-input
                                                            type="number"
                                                            v-model="stationInfo.longitude"
                                                            style="width:150px"
                                                            placeholder="请输入内容"
                                                        ></el-input>
                                                        <span>-</span>
                                                        <el-input
                                                            type="number"
                                                            v-model="stationInfo.latitude"
                                                            style="width:150px"
                                                            placeholder="请输入内容"
                                                        ></el-input>
                                                    </div>
                                            </div>
                                            <div class="right">                                       
                                                <div class="box">
                                                    <span>营业状态：</span>
                                                    <el-select v-model="stationInfo.openStatus"  clearable style="width:180px" placeholder="请选择">
                                                        <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                        ></el-option>
                                                    </el-select>
                                                </div>
                                                <div class="box">
                                                    <span>油站电话：</span>
                                                    <el-input
                                                        v-model="stationInfo.telphone"
                                                        style="width:200px"
                                                        placeholder="请输入内容"
                                                    ></el-input>
                                                </div>
                                                <div class="box">
                                                    <span>详细地址：</span>
                                                    <el-input
                                                        v-model="stationInfo.address"
                                                        style="width:200px"
                                                        placeholder="请输入内容"
                                                    ></el-input>
                                                </div>
                                                    <div class="box">
                                                        <div class="radio">
                                                            <div class="isno">
                                                                <span>便利店：</span>
                                                                <el-radio v-model="stationInfo.haveStore" :label="1">有</el-radio>
                                                                <el-radio v-model="stationInfo.haveStore" :label="0">否</el-radio>
                                                            </div>
                                                            <div class="isno">
                                                                <span>洗车服务：</span>
                                                                <el-radio v-model="stationInfo.haveCarWash" :label="1">有</el-radio>
                                                                <el-radio v-model="stationInfo.haveCarWash" :label="0">否</el-radio>
                                                            </div>
                                                        </div>
                                                        <div class="radio">   
                                                            <div class="isno">
                                                                <span>卫生间：</span>
                                                                <el-radio v-model="stationInfo.haveWashroom" :label="1">有</el-radio>
                                                                <el-radio v-model="stationInfo.haveWashroom" :label="0">否</el-radio>
                                                            </div>
                                                            <div class="isno">
                                                                <span>汽车维护服务：</span>
                                                                <el-radio v-model="stationInfo.haveReapirTruck" :label="1">有</el-radio>
                                                                <el-radio v-model="stationInfo.haveReapirTruck" :label="0">否</el-radio>
                                                            </div>
                                                        </div>
                                                    </div>                                       
                                                </div>
                                    </div>                              
                                </div> 
                                <div class="oils">
                                    <div class="oil-top">
                                         <span></span><el-form-item label="油品信息"/>
                                    </div>
                                    <div class="oils-section">                                       
                                        <div class="left">      
                                            <div class="icon">   
                                                <i class="el-icon-warning" style="color:#5b8dff;"></i>
                                                <span>成油品零售经营许可证</span>
                                            </div> 
                                            <div class="oils-box">    
                                                <div class="up">
                                                    <el-upload
                                                        class="avatar-uploader"
                                                        action="https://httpbin.org/post"
                                                        :show-file-list="false"
                                                        :on-success="reprocessOilLicense"
                                                    >
                                                        <img
                                                            v-if="stationInfo.reprocessOilLicense"
                                                            :src="stationInfo.reprocessOilLicense"
                                                            class="avatar"
                                                        >
                                                        <i v-else class="el-icon-plus avatar-uploader-icon">成油品零售经营许可证</i>
                                                        <div class="button">
                                                            <el-button>重新上传</el-button>
                                                        </div>
                                                    </el-upload>
                                                    
                                                </div>
                                                <div class="oils-box ">
                                                    <div class="box">
                                                        <span>成油品零售经营许可证：</span>
                                                            <el-input
                                                                v-model="stationInfo.socialCode"
                                                                style="width:220px"
                                                                placeholder="请输入内容"
                                                            ></el-input>
                                                    </div> 
                                                    <div class="box">
                                                        <span>有效期至：</span>
                                                            <el-date-picker
                                                                v-model="stationInfo.reprocessOiEnd"
                                                                type="date"
                                                                :picker-options="pickerOptions"
                                                                style="width:220px"
                                                                placeholder="选择日期"
                                                                clearable
                                                        ></el-date-picker>
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
                                                    <el-upload
                                                        class="avatar-uploader"
                                                        action="https://httpbin.org/post"
                                                        :show-file-list="false"
                                                        :on-success="reprocessOilLicense"
                                                    >
                                                        <img
                                                            v-if="stationInfo.reprocessOilLicense"
                                                            :src="stationInfo.reprocessOilLicense"
                                                            class="avatar"
                                                        >
                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                        <div class="button">
                                                            <el-button>重新上传</el-button>
                                                        </div>
                                                    </el-upload>
                                                    
                                                </div>
                                                <div class="oils-box">
                                                        <div class="box">
                                                        <span>危险化学品经营许可证编号:</span>
                                                            <el-input
                                                                v-model="stationInfo.chemistryCode"
                                                                style="width:220px"
                                                                placeholder="请输入内容"
                                                            ></el-input>
                                                    </div> 
                                                    <div class="box">
                                                        <span>有效期至：</span>
                                                            <el-date-picker
                                                                v-model="stationInfo.chemistryCode"
                                                                type="date"
                                                                :picker-options="pickerOptions"
                                                                style="width:220px"
                                                                placeholder="选择日期"
                                                                clearable
                                                        ></el-date-picker>
                                                    </div>
                                                </div>
                                            </div>                              
                                        </div>
                                    </div>
                                </div>
                                <div class="shangchuan">
                                    <div class="zuo">
                                        <p>退回原因</p>
                                        <el-input
                                            type="textarea"
                                            style="width:315px"
                                            :disabled="true"
                                            :autosize="{ minRows: 5, maxRows: 5}"
                                            placeholder="请输入内容"
                                            v-model="remark">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="oils">
                                    <div class="oil-top" style="width：100%;">
                                        <span></span><el-form-item label="油枪油罐对应关系" label-width="150px"/>
                                    </div>
                                         <el-table                                           
                                            style="width: 100%;"
                                            :header-cell-style="{background:'#f5f7fa'}"
                                        >
                                            <el-table-column label="油枪号" align="center" min-width="120">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="油品号" align="center" min-width="120">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="油罐号" align="center" min-width="120">
                                                <template slot-scope="scope">
                                                    <span>{{ scope.row}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="单价" align="center" min-width="120">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row}}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                </div>
                             </div> 
                        </div>  
                 </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="prev">取消</el-button>
                <el-button type="primary" @click="updateOilsStation">确认</el-button>
                <el-button type="primary" v-if="stationInfo.status == -1" @click="insert">重新申请</el-button>
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
        id: "",
        pickerOptions: {
            disabledDate(time) {
                // return time.getTime() < Date.now() - 8.64e7
                return time.getTime() < Date.now()
            }
        },
    }),
    created() {
        this.id = this.$route.query.id;
        this.getList()
        this.administrationEdit()
        this.application()
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

                this.shengChange()
                this.shiChange()
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
                this.prev()
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
                    this.prev()
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
<style rel="stylesheet/scss" lang="scss" scoped>
@import url("./stationSetSM.scss");
.warp{
  background-color: #F6F7FB;
  // padding: 2%;
    color: #606266;
}
.main{
  min-height: calc(100vh - 214px);
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
.header .box{
    margin-bottom: 20px;
}
.header .radio{
    // margin-bottom: 20px;
    width: 100%;
}
.header .dizhi{
    display: inline-block;
}
.header .box>span:nth-of-type(1){
    margin-right: 6px;
    vertical-align: middle;
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
.box>span:nth-of-type(1){
    display: inline-block;
    width: 115px;
}
.top{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding:10px;
    padding-top: 30px;
}
.top .block .box{
    display: flex;;
}
.top .box .left{
    width: 85px;
    // text-align: right;
}
.zhong,.xia{
  background-color: #fff;
  padding:0 10px;
}
.zhong{
    margin-bottom: 20px;
}
.zhong .box{
    display: flex;
}
.zhong .box .left{
    width: 85px;
}
.radio{
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
}
.isno{
    flex-grow:1;
}
.xia .box{
    flex-wrap: wrap
}
.xia .box .left{
    width: 130px;
    margin-right: 12px;
}
.xia .block:nth-of-type(3) .left{
    width: 200px;
}
.xia .block:nth-of-type(2) .left{
    width: 80px;
}
.shangchuan{
    display: flex;
}
.shangchuan .you{
    margin-left: 200px;
}
.dialog-footer{
    background-color: #fff;
    padding: 20px 0;
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
.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #fff;
}
.el-radio+.el-radio {
    margin-left: 10px;
}
.avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
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
    width: 315px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 315px;
    height: 178px;
    display: block;
}
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
.dizhi .distpicker-address-wrapper select{
  background-color: #F5F9FC;
}
.el-dialog__headerbtn .el-dialog__close{
    color: #fff;
}
h3 .el-button--medium.is-circle{
  border: 0;
}
</style>