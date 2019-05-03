<template>
    <div class="warp">
        <!-- (集团)商户管理-油站管理-油站管理-查看 -->
                 <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>油站申请-查看
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
                                    v-if="stationInfo.idCardFront"
                                    :src="stationInfo.idCardFront"
                                    class="avatar"
                                >
                            </div>
                            <div class="up">
                                <img
                                    v-if="stationInfo.idCardBack"
                                    :src="stationInfo.idCardBack"
                                    class="avatar"
                                >
                            </div>
                                <div class="oil ">
                                    <div class="boxs">
                                        <span>法人姓名：{{stationInfo.corporationName}}</span>
                                    </div>
                                    <div class="boxs">
                                        <span>身份证号：{{stationInfo.idCardNo}}</span>
                                    </div>
                                </div>
                                <div class="boxs">
                                    <span>有效期至：{{stationInfo.chemistryEnd | dateTime }}</span>
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
                                v-if="stationInfo.businessLicense"
                                :src="stationInfo.businessLicense"
                                class="avatar"
                                >
                            </div>
                            <div class="oil ">
                                    <div class="boxs">
                                    <span>统一社会信息代码：{{stationInfo.socialCode}}</span>
                                </div> 
                                <div class="boxs">
                                    <span>有效期至：{{stationInfo.reprocessOiEnd | dateTime }}</span>                                        
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
                                    <span>油站全称：{{stationInfo.fullName}}</span>
                                </div> 
                                <div class="box">
                                    <span>油站简称：{{stationInfo.shortName}}</span>
                                </div>
                                <div class="box">
                                    <span>营业时间：</span>
                                    <span>{{stationInfo.openTime | dateTime('-',true)}}</span>
                                    <span>-</span>
                                    <span>{{stationInfo.closeTime | dateTime('-',true)}}</span>
                                </div>
                                <div class="box">                                         
                                    <span>油站位置：</span>
                                    <span v-for="item in diqu" v-if="stationInfo.provinceId == item.id">{{ item.district }}</span>
                                    <span>-</span>
                                    <span v-for="item in diqu" v-if="stationInfo.cityId == item.id">{{ item.district }}</span>
                                    <span>-</span>
                                    <span v-for="item in diqu" v-if="stationInfo.regoinId == item.id">{{ item.district }}</span>                                                                                                                                                      
                                </div>
                                    <div class="box">
                                         <span>坐标：</span>
                                         <span>{{stationInfo.longitude}}</span>
                                         <span>-</span>
                                         <span>{{stationInfo.latitude}}</span>
                                    </div>
                            </div>
                            <div class="left">                                       
                                <div class="box">
                                    <span>营业状态：</span>
                                    <span v-for="item in options" v-if="item.value == stationInfo.openStatus">{{ item.label }}</span>
                                </div>
                                <div class="box">
                                    <span>油站电话：{{stationInfo.telphone}}</span>
                                </div>
                                <div class="box">
                                    <span>详细地址：{{stationInfo.address}}</span>
                                </div>
                                    <div class="box">
                                        <div class="radio">
                                            <div class="isn">
                                                <span>便利店：</span>
                                                <span>{{ stationInfo.haveStore ? '是' : '否' }}</span>
                                            </div>
                                            <div class="isn">
                                                <span>洗车服务：</span>
                                                <span>{{stationInfo.haveCarWash ? '是' : '否' }}</span>
                                            </div>
                                        </div>
                                        <div class="radio">
                                            <div class="isn">
                                                <span>卫生间：</span>
                                                <span>{{ stationInfo.haveWashroom ? '是' : '否' }}</span>
                                            </div>
                                            <div class="isn">
                                                <span>汽车维护服务：</span>
                                                <span>{{ stationInfo.haveReapirTruck ? '是' : '否' }}</span>
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
                                                v-if="stationInfo.reprocessOilLicense"
                                                :src="stationInfo.reprocessOilLicense"
                                                class="avatar"
                                            >                                           
                                        </div>
                                        <div class="oils-box ">
                                            <div class="box">
                                                <span>成油品零售经营许可证：</span>
                                                     
                                            </div> 
                                            <div class="box">
                                                <span>有效期至：{{stationInfo.chemistryEnd | dateTime }}</span>      
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
                                                v-if="stationInfo.dangerChemistryLicense"
                                                :src="stationInfo.dangerChemistryLicense"
                                                class="avatar"
                                            >
                                        </div>
                                    <div class="oils-box">
                                            <div class="box">
                                            <span>危险化学品经营许可证编号:{{stationInfo.chemistryCode}}</span>
                                                    
                                        </div> 
                                        <div class="box">
                                            <span>有效期至：{{stationInfo.chemistryEnd | dateTime }}</span>                                                     
                                        </div>
                                    </div>
                                    </div>                              
                                </div>
                            </div>
                        </div>
                        <!-- <div class="oils">
                            <div class="oil-top">
                                <span></span>
                                <p>油枪油罐对应关系</p>
                            </div>
                            <el-table :data="this.stationInfo.relationshipData" stripe style="width: 100%">
                                <el-table-column prop="oil_gun_no" label="油枪号" align="center"></el-table-column>
                                <el-table-column prop="oils_name" label="油品号" align="center"></el-table-column>
                                <el-table-column prop="oilcan_no" align="center" label="油罐号"></el-table-column>
                                <el-table-column prop="oils_price" align="center" label="单价"></el-table-column>
                            </el-table>
                        </div> -->
                </div>
            </div>            
            <div slot="footer" class="dialog-footer san">
                <el-button
                    type="primary"
                    v-show="stationInfo.status==0"
                    @click="jujueVisible = true"
                >退回</el-button>
                <el-button type="primary" v-show="stationInfo.status==0" @click="shenheEnt">确认</el-button>
            </div>
        <!-- 油站申请信息拒绝框 -->
        <el-dialog :visible.sync="jujueVisible" width="50%" title="退回原因">
            <div class="header">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 5}"
                    placeholder="请输入内容"
                    v-model="jujue"
                ></el-input>
            </div>
            <div slot="footer" class="dialog-footer san">
                <el-button type="primary" @click="jujueVisible = false;jujue='';">取消</el-button>
                <el-button type="primary" @click="jujueEnt">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { getOilsStationInfo } from "@/api/shanghuguanli";
import { check } from "@/api/shanghuguanli";
import { districtList } from "@/api/shanghuguanli";
import axios from "axios";
export default {
    name: "",
    data: () => ({
        stationInfo: {}, //编辑油站信息
        id: "",
        diqu: [], //地区表
        sheng: [], //省列表
        shi: [], //市列表
        xian: [], //县列表
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
        jujueVisible: false,
        jujue: "",

    }),
    created() {
        this.id = this.$route.query.id;
        this.getInfo();
    },
    filters: {
        dateTime: function (value,division,time) {
            if(value){
                division = division || '-';
                var datetime = new Date(value);
                function g(val){
                    val < 10 && (val = '0' + val)
                    return val;
                }
                return !time ? datetime.getFullYear() + division + g((datetime.getMonth()+1)) + division + g(datetime.getDate()) :
                g(datetime.getHours()) + ':' + g(datetime.getMinutes()) + ':' + g(datetime.getSeconds())
            }
        }
    },
    methods: {
        prev(){
            this.$router.go(-1)
        },
        getInfo() {
            districtList({}).then(response => {
                console.log("地区列表");
                console.log(response.data);
                this.diqu = response.data;
            });
            getOilsStationInfo({ id: this.id }).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.stationInfo = response.data.stationInfo;
                this.stationInfo.relationshipData=response.data.oilGunList
                // this.stationInfo.openTime = new Date(
                //     response.data.stationInfo.openTime
                // );
                // this.stationInfo.closeTime = new Date(
                //     response.data.stationInfo.closeTime
                // );
                // this.stationInfo.reprocessOiEnd = new Date(
                //     response.data.stationInfo.reprocessOiEnd
                // );
                // this.stationInfo.chemistryEnd = new Date(
                //     response.data.stationInfo.chemistryEnd
                // );
                // this.stationInfo.provinceId;
                // for (let i = 0; i < this.diqu.length; i++) {
                //     if (this.stationInfo.provinceId == this.diqu[i].pid) {
                //         this.shi.push(this.diqu[i]);
                //     }
                // }
                // for (let i = 0; i < this.diqu.length; i++) {
                //     if (this.stationInfo.cityId == this.diqu[i].pid) {
                //         this.xian.push(this.diqu[i]);
                //     }
                // }
            });
        },
        shangchange() {
            console.log(this.shanghuId);
            var data = {
                status: 1,
                companyId: this.shanghuId
            };
            oilsStation(data).then(response => {
                console.log(response.data);
                this.list = response.data;
                this.listLoading = false;
            });
            var a = {
                status: 0,
                companyId: this.shanghuId
            };
            oilsStation(a).then(response => {
                console.log(response.data);
                this.shenqinglist = response.data;
                this.listLoading = false;
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
            console.log(this.shi);
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
        },
        updateOilsStation() {
            var data = this.stationInfo;
            console.log(data);
            updateOilsStationInfo(data).then(response => {
                console.log("修改成功");
                console.log(response.data);
                this.getList();
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.administrationVisible = false;
            });
        },
        jujueEnt() {
            var data = {
                id: this.stationInfo.id,
                status: -1,
                remark: this.jujue
            };
            console.log(data);
            check(data).then(response => {
                console.log(response.data);
                this.$message({
                    message: "拒绝成功",
                    type: "success"
                });
                this.prev()
                
                // else{
                //  this.$message.error('通过申请失败');
                // }
            });
        },
        shenheEnt() {
            var data = {
                id: this.stationInfo.id,
                status: 1
            };
            console.log(data);
            check(data).then(response => {
                console.log(response.data);
                if (!response.data.error) {
                    this.$message({
                        message: "通过申请",
                        type: "success"
                    });
                    this.prev()
                } else {
                    this.$message.error("通过申请失败");
                }
            });
        },
    }
};
</script>

<style scoped>
@import url("../integrated-management/stationSetSM.scss");
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