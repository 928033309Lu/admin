<template>
    <div class>
        <!-- (集团)商户管理-油站管理-油站申请-编辑 -->
        <div class="header">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <div class="box">
                            <span>油站全称：</span>
                            <span>{{stationInfo.fullName}}</span>
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
                            <span>油站位置：</span>
                            <div class="dizhi">
                                <!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
                                <el-select
                                    @change="shengChange"
                                    v-model="stationInfo.provinceId"
                                    placeholder="请选择"
                                    clearable
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
                                    v-model="stationInfo.cityId"
                                    @change="shiChange"
                                    placeholder="请选择"
                                    style="width:120px"
                                    clearable
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
                        </div>
                        <div class="box">
                            <span class="zuo">坐标：</span>
                            <el-input
                                v-model="stationInfo.longitude"
                                style="width:150px"
                                placeholder="请输入内容"
                            ></el-input>
                            <span>-</span>
                            <el-input
                                v-model="stationInfo.latitude"
                                style="width:150px"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                        <div class="box">
                            <span>营业状态：</span>
                            <el-select v-model="stationInfo.openStatus" clearable placeholder="请选择">
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
                                    :on-success="idCardFront"
                                >
                                    <img
                                        v-if="stationInfo.idCardFront"
                                        :src="stationInfo.idCardFront"
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
                                    :on-success="idCardBack"
                                >
                                    <img
                                        v-if="stationInfo.idCardBack"
                                        :src="stationInfo.idCardBack"
                                        class="avatar"
                                    >
                                    <i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="box">
                            <span>法人姓名</span>
                            <el-input
                                v-model="stationInfo.corporationName"
                                style="width:200px"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                        <div class="box">
                            <span>身份证号</span>
                            <el-input
                                v-model="stationInfo.idCardNo"
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
                                    :on-success="reprocessOilLicense"
                                >
                                    <img
                                        v-if="stationInfo.reprocessOilLicense"
                                        :src="stationInfo.reprocessOilLicense"
                                        class="avatar"
                                    >
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="box">
                            <span>有效期至</span>
                            <el-date-picker
                                v-model="stationInfo.reprocessOiEnd"
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
                            <span>所属公司：</span>
                            <span>{{stationInfo.companyName}}</span>
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
                            <span>营业时间：</span>
                            <el-time-picker
                                style="width:150px"
                                v-model="stationInfo.openTime"
                                :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
                                placeholder="任意时间点"
                            ></el-time-picker>
                            <span>-</span>
                            <el-time-picker
                                style="width:150px"
                                v-model="stationInfo.closeTime"
                                :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
                                placeholder="任意时间点"
                            ></el-time-picker>
                        </div>
                        <div class="radio">
                            <span>是否开设便利店：</span>
                            <el-radio v-model="stationInfo.haveStore" :label="1">是</el-radio>
                            <el-radio v-model="stationInfo.haveStore" :label="0">否</el-radio>
                            <span>是否没有洗车服务：</span>
                            <el-radio v-model="stationInfo.haveCarWash" :label="1">是</el-radio>
                            <el-radio v-model="stationInfo.haveCarWash" :label="0">否</el-radio>
                        </div>
                        <div class="radio">
                            <span>是否开放卫生间：</span>
                            <el-radio v-model="stationInfo.haveWashroom" :label="1">是</el-radio>
                            <el-radio v-model="stationInfo.haveWashroom" :label="0">否</el-radio>
                            <span>是否没有维修服务：</span>
                            <el-radio v-model="stationInfo.haveReapirTruck" :label="1">是</el-radio>
                            <el-radio v-model="stationInfo.haveReapirTruck" :label="0">否</el-radio>
                        </div>
                        <div class="box">
                            <span>营业执照</span>
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
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="box">
                            <span>统一社会信息代码</span>
                            <el-input
                                v-model="stationInfo.socialCode"
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
                                    :on-success="dangerChemistryLicense"
                                >
                                    <img
                                        v-if="stationInfo.dangerChemistryLicense"
                                        :src="stationInfo.dangerChemistryLicense"
                                        class="avatar"
                                    >
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="box">
                            <span>许可证编号</span>
                            <el-input
                                v-model="stationInfo.chemistryCode"
                                style="width:200px"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                        <div class="box">
                            <span>有效期至</span>
                            <el-date-picker
                                v-model="stationInfo.chemistryEnd"
                                type="date"
                                placeholder="选择日期"
                                clearable
                            ></el-date-picker>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="administrationVisible = false">取消</el-button>
            <el-button type="primary" @click="updateOilsStation">确认</el-button>
        </div>
    </div>
</template>


<script>
export default {
    name: "",
    data: () => ({})
};
</script>

<style scoped>
</style>