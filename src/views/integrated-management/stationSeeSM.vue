<template>
    <div class>
        <!-- （商户）油站管理-油站管理-查看 -->
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
                                            <span>危险化学品经营许可证编号:{{seeStationInfo.chemistryCode}}</span>
                                                    
                                        </div> 
                                        <div class="box">
                                            <span>有效期至：{{seeStationInfo.chemistryEnd | dateTime }}</span>                                                     
                                        </div>
                                    </div>
                                    </div>                              
                                </div>
                            </div>
                        </div>
                        <div class="oils thColorDark">
                            <div class="oil-top">
                                <span></span>
                                <p>油枪油罐对应关系</p>
                            </div>
                            <el-table :data="yuoqiangPriceList" style="width: 100%">
                                <el-table-column prop="oilGunNo" label="油枪号" align="center"></el-table-column>
                                <el-table-column prop="oilsName" label="油品号" align="center"></el-table-column>
                                <el-table-column prop="oilcanNo" align="center" label="油罐号"></el-table-column>
                                <el-table-column align="center" label="单价">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.oilsPrice}} / 升</span>
                                    </template>
                                </el-table-column>
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
import { getOilsStationInfo } from "@/api/shanghuguanli";
import { districtList } from "@/api/shanghuguanli";
import { yuoqiangPrice } from '@/api/shuju'
import axios from "axios";
export default {
    name: "",
    data: () => ({
        id: "",
        stationInfo: {}, //编辑油站信息
        seeStationInfo: [],
        sheng: [], //省列表
        shi: [], //市列表
        xian: [], //县列表
        diqu: [],
        options: [
            {
                value: 1,
                label: "营业中"
            },
            {
                value: 0,
                label: "暂停营业"
            }
        ],
        yuoqiangPriceList:[]
    }),
    created() {
        this.id = this.$route.query.id;
        this.getInfo();
    },
    methods: {
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

            yuoqiangPrice({stationId:this.id}).then(res=>{
                this.yuoqiangPriceList = res.data;
            })
        },
        prev() {
            this.$router.go(-1);
        },
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