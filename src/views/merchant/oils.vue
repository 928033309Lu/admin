<template>
    <div class="app-container notop">
        <el-tabs v-model="activeName">
            <el-tab-pane label="油站管理" name="first">
                <el-form ref="form" :model="form" label-width="53px">
                    <div class="items">
                        <el-form-item label="公司">
                            <el-select
                                @change="shangchange"
                                v-model="listQuery.companyId"
                                clearable
                                style="min-width: 200px"
                                class="filter-item"
                            >
                                <el-option
                                    v-for="item in shanghuList"
                                    :key="item.id"
                                    :label="item.company_name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-table
                        v-loading="listLoading"
                        :key="tableKey"
                        :data="list"
                        fit
                        highlight-current-row
                        style="width: 100%;"
                    >
                        <!-- <el-table-column label="油站编码" align="center" min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.stationCode }}</span>
              </template>
                        </el-table-column>-->
                        <el-table-column label="油站名称" min-width="120" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.shortName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="所属公司" min-width="120" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.companyShortName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="油罐数量" min-width="100" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.canNum }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="油枪数量" min-width="100" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.gunNum }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="营业状态" min-width="100" align="center">
                            <template slot-scope="scope">
                                <span v-show="scope.row.openStatus ==1">营业中</span>
                                <span v-show="scope.row.openStatus ==0">暂停营业</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" min-width="130" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="150"
                            class-name="small-padding fixed-width"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    type="info"
                                    size="mini"
                                    @click="administrationEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="chakanEdit(scope.$index, scope.row)"
                                >查看</el-button>
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
            </el-tab-pane>

            <el-tab-pane label="油站申请" name="second">
                <el-form ref="form" :model="form" label-width="53px">
					<div class="items">
					    <el-form-item label="公司" label-width="53px">
					        <el-select
					            @change="shangchangeSq"
					            v-model="listQuerySq.companyId"
					            clearable
					            style="min-width: 200px"
					            class="filter-item"
					        >
					            <el-option
					                v-for="item in shanghuList"
					                :key="item.id"
					                :label="item.company_name"
					                :value="item.id"
					            />
					        </el-select>
					    </el-form-item>
					</div>
                    <el-table
                        v-loading="listLoadingSq"
                        :key="tableKey"
                        :data="shenqinglist"
                        fit
                        highlight-current-row
                        style="width: 100%;"
                    >
                        <el-table-column label="油站名称" align="center" min-width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.shortName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="所属公司" align="center" min-width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.companyShortName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" min-width="100" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status==0">待审核</span>
                                <span v-if="scope.row.status==-2">审核失败</span>
								<span v-if="scope.row.status==-1">退回</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="申请时间" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.remark }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="150">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="shenqingchakanEdit(scope.$index, scope.row)"
                                >查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination
                        v-show="totalSq>0"
                        :total="totalSq"
                        :page.sync="listQuerySq.pageNum"
                        :limit.sync="listQuerySq.pageSize"
                        @pagination="getList"
                    />
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <!-- 油站管理信息编辑框 -->
        <el-dialog :visible.sync="administrationVisible" width="90%" title="油站信息">
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
                                        clearable
                                        v-model="stationInfo.provinceId"
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
                                        v-model="stationInfo.cityId"
                                        @change="shiChange"
                                        clearable
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
        </el-dialog>
        <!-- 油站管理信息查看框 -->
        <el-dialog :visible.sync="chakanVisible" width="90%" title="油站信息">
            <div class="header">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="box">
                                <span>油站全称：</span>
                                <span>{{seeStationInfo.fullName}}</span>
                            </div>
                            <div class="box">
                                <span>油站简称：</span>
                                <el-input
                                    v-model="seeStationInfo.shortName"
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
                                        v-model="seeStationInfo.provinceId"
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
                                        v-model="seeStationInfo.cityId"
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
                                        v-model="seeStationInfo.regoinId"
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
                                    v-model="seeStationInfo.longitude"
                                    style="width:150px"
                                    placeholder="请输入内容"
                                ></el-input>
                                <span>-</span>
                                <el-input
                                    v-model="seeStationInfo.latitude"
                                    style="width:150px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>营业状态：</span>
                                <el-select v-model="seeStationInfo.openStatus" clearable placeholder="请选择">
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
                                            v-if="seeStationInfo.idCardFront"
                                            :src="seeStationInfo.idCardFront"
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
                                            v-if="seeStationInfo.idCardBack"
                                            :src="seeStationInfo.idCardBack"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>法人姓名</span>
                                <el-input
                                    v-model="seeStationInfo.corporationName"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>身份证号</span>
                                <el-input
                                    v-model="seeStationInfo.idCardNo"
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
                                            v-if="seeStationInfo.reprocessOilLicense"
                                            :src="seeStationInfo.reprocessOilLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>有效期至</span>
                                <el-date-picker
                                    v-model="seeStationInfo.reprocessOiEnd"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-light">
                            <div class="box">
                                <span>所属公司：</span>
                                <span>{{seeStationInfo.companyName}}</span>
                            </div>
                            <div class="box">
                                <span>油站电话：</span>
                                <el-input
                                    v-model="seeStationInfo.telphone"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>详细地址：</span>
                                <el-input
                                    v-model="seeStationInfo.address"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>营业时间：</span>
                                <el-time-picker
                                    style="width:150px"
                                    v-model="seeStationInfo.openTime"
                                    :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
                                    placeholder="任意时间点"
                                ></el-time-picker>
                                <span>-</span>
                                <el-time-picker
                                    style="width:150px"
                                    v-model="seeStationInfo.closeTime"
                                    :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
                                    placeholder="任意时间点"
                                ></el-time-picker>
                            </div>
                            <div class="radio">
                                <span>是否开设便利店：</span>
                                <el-radio v-model="seeStationInfo.haveStore" :label="1">是</el-radio>
                                <el-radio v-model="seeStationInfo.haveStore" :label="0">否</el-radio>
                                <span>是否没有洗车服务：</span>
                                <el-radio v-model="seeStationInfo.haveCarWash" :label="1">是</el-radio>
                                <el-radio v-model="seeStationInfo.haveCarWash" :label="0">否</el-radio>
                            </div>
                            <div class="radio">
                                <span>是否开放卫生间：</span>
                                <el-radio v-model="seeStationInfo.haveWashroom" :label="1">是</el-radio>
                                <el-radio v-model="seeStationInfo.haveWashroom" :label="0">否</el-radio>
                                <span>是否没有维修服务：</span>
                                <el-radio v-model="seeStationInfo.haveReapirTruck" :label="1">是</el-radio>
                                <el-radio v-model="seeStationInfo.haveReapirTruck" :label="0">否</el-radio>
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
                                            v-if="seeStationInfo.businessLicense"
                                            :src="seeStationInfo.businessLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>统一社会信息代码</span>
                                <el-input
                                    v-model="seeStationInfo.socialCode"
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
                                            v-if="seeStationInfo.dangerChemistryLicense"
                                            :src="seeStationInfo.dangerChemistryLicense"
                                            class="avatar"
                                        >
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="box">
                                <span>许可证编号</span>
                                <el-input
                                    v-model="seeStationInfo.chemistryCode"
                                    style="width:200px"
                                    placeholder="请输入内容"
                                ></el-input>
                            </div>
                            <div class="box">
                                <span>有效期至</span>
                                <el-date-picker
                                    v-model="seeStationInfo.chemistryEnd"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="box">
                    <p>油枪油罐对应关系</p>
                    <el-table
                        :data="this.seeStationInfo.relationshipData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="oil_gun_no" label="油枪号" align="center"></el-table-column>
                        <el-table-column prop="oils_name" label="油品号" align="center"></el-table-column>
                        <el-table-column prop="oilcan_no" align="center" label="油罐号"></el-table-column>
                        <el-table-column prop="oils_price" align="center" label="单价"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="chakanVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 油站申请信息查看框 -->
        <el-dialog :visible.sync="shenqingSeeVisible" width="90%" title="油站信息">
            <div class="header">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="box">
                                <span>油站全称：</span>
                                <el-input
                                    v-model="stationInfo.fullName"
                                    style="width:200px"
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
                                <span>油站位置：</span>
                                <div class="dizhi">
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
            <div slot="footer" class="dialog-footer san">
                <el-button
                    type="primary"
                    v-show="stationInfo.status==0"
                    @click="jujueVisible = true"
                >退回</el-button>
                <el-button type="primary" v-show="stationInfo.status==0" @click="shenheEnt">确认</el-button>
                <el-button type="primary" @click="shenqingSeeVisible = false">关闭</el-button>
            </div>
        </el-dialog>
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
import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
} from "@/api/article";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { oilsStation } from "@/api/shanghuguanli";
import { getOilsStationInfo } from "@/api/shanghuguanli";
import { districtList } from "@/api/shanghuguanli";
import { updateOilsStationInfo } from "@/api/shanghuguanli";
import { insertOilsStationInfo } from "@/api/shanghuguanli";
import { check } from "@/api/shanghuguanli";
import { shanghuList } from "@/api/shanghu";
import axios from "axios";

export default {
    components: { Pagination },
    data() {
        return {
            administrationVisible: false, //控制油站管理弹出框显示与隐藏
            applicationVisible: false, //控制油站申请编辑弹出框显示与隐藏
            chakanVisible: false,
            stationInfo: {}, //编辑油站信息
            diqu: [], //地区表
            sheng: [], //省列表
            shi: [], //市列表
            xian: [], //县列表
            seeStationInfo: {},
            activeName: "first",
            value1: true,
            value2: true,
            list: null,
            tableKey: 0,
            listLoading: true,
			listLoadingSq: true,
            total: 0,
			totalSq: 0,
            form: {
                name: ""
            },
            /* listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: "+id"
            }, */
			listQuery: {
				pageNum: 1,
				pageSize: 10,
				companyId: "",
				status: 1
			},
			listQuerySq: {
				pageNum: 1,
				pageSize: 10,
				companyId: "",
				status: 0
			},
            textMap: {
                update: "Edit",
                create: "Create"
            },
            temp: {
                id: undefined,
                importance: 1,
                remark: "",
                timestamp: new Date(),
                title: "",
                type: "",
                status: "published"
            },
            dialogStatus: "",
            dialogFormVisible: false,
            shenqinglist: [],
            shenqingSeeVisible: false,
            jujueVisible: false,
            jujue: "",
            shanghuList: [],
			zhuangtai: [{
				id: 0,
				name: '待审核'
			},{
				id: -2,
				name: '审核失败'
			},{
				id: -1,
				name: '退回'
			}],
            options: [
                {
                    value: 1,
                    label: "营业中"
                },
                {
                    value: 0,
                    label: "暂停营业"
                }
            ]
        };
    },
    created() {
		this.getShanghu();
        this.getList();
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        getList() {
            this.listLoading = true;
            oilsStation(this.listQuery).then(response => {
                console.log(response.data);
                this.list = response.data.rows;
				this.total = response.data.total;
                this.listLoading = false;
            });
			this.listLoadingSq = true;
            oilsStation(this.listQuerySq).then(response => {
                console.log(response.data);
                this.shenqinglist = response.data.rows;
				this.totalSq = response.data.total;
                this.listLoadingSq = false;
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
		getShanghu() {
			//商户列表
			shanghuList({}).then(res => {
			    console.log(res);
			    this.shanghuList = res.data;
			});
		},
        //公司变化
        shangchange() {
            oilsStation(this.listQuery).then(response => {
                console.log(response.data);
                this.list = response.data.rows;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
		// 公司变化（申请）
		shangchangeSq() {
			oilsStation(this.listQuerySq).then(response => {
			    console.log(response.data);
			    this.shenqinglist = response.data.rows;
			    this.totalSq = response.data.total;
			    this.listLoadingSq = false;
			});
		},
		// 选择状态（申请）
		xuanzezt() {
			oilsStation(this.listQuerySq).then(response => {
				console.log(response.data);
				this.shenqinglist = response.data.rows;
				this.totalSq = response.data.total;
				this.listLoadingSq = false;
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
        //油站管理编辑
        administrationEdit(index, row) {
            this.$router.push({
                name: "merchantSetOS",
                query: {
                    id: row.id
                }
            });
            var data = {
                id: row.id
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
                this.getList();
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.administrationVisible = false;
            });
        },
        chakanEdit(index, row) {
            this.$router.push({
                name: "merchantSeeOS",
                query: {
                    id: row.id
                }
            });
            this.chakanVisible = true;
            var data = {
                id: row.id
            };
            getOilsStationInfo(data).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.seeStationInfo = response.data.stationInfo;
                this.seeStationInfo.relationshipData = response.data.oilGunList;
            });
        },
        shenqingchakanEdit(index, row) {
            this.$router.push({
                name: "merchantSeeAS",
                query: {
                    id: row.id
                }
            });
            this.shenqingSeeVisible = true;
            var data = {
                id: row.id
            };
            getOilsStationInfo(data).then(response => {
                console.log(response.data);
                console.log(response.data.stationInfo);
                this.stationInfo = response.data.stationInfo;
                this.stationInfo.relationshipData = response.data.oilGunList;
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
                this.getList();
                this.jujueVisible = false;
                this.shenqingSeeVisible = false;
                // else{
                // 	this.$message.error('通过申请失败');
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
                    this.getList();
                    this.shenqingSeeVisible = false;
                } else {
                    this.$message.error("通过申请失败");
                }
            });
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
        // fetchList(this.listQuery).then(response => {
        //   this.total = response.data.total
        //   const items = response.data.items

        //   this.list = items.map(v => {
        //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        //     v.originalTitle = v.title //  will be used when user click the cancel botton
        //     return v
        //   })

        // setTimeout(() => {

        // }, 1 * 1000)
        // })
        // },
        handleUpdate(row) {
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        confirmEdit(row) {
            row.edit = false;
            row.originalTitle = row.title;
            this.$message({
                message: "The title has been edited",
                type: "success"
            });
        }
    }
};
</script>
<style scoped>
.warp {
    background-color: #fff;
    padding-bottom: 20px;
}
.header .box {
    margin-bottom: 20px;
}
.header .radio {
    margin-bottom: 20px;
}
.header .dizhi {
    display: inline-block;
}
.header .box > span:nth-of-type(1) {
    margin-right: 6px;
    vertical-align: middle;
}

.bg-purple-light {
    margin-left: 20px;
}
.dialog-footer {
    text-align: center;
}
.dialog-footer .el-button:nth-of-type(2) {
    margin-left: 200px;
}
.up {
    display: inline-block;
    vertical-align: middle;
}
.btn {
    margin-bottom: 15px;
    text-align: right;
}
span {
    line-height: 36px;
}
.box > span:nth-of-type(1) {
    display: inline-block;
    width: 115px;
}
.san .el-button + .el-button {
    margin-left: 100px;
}
</style>
<style scoped>
.el-tabs__nav-scroll {
    padding: 0 40px;
}
.app-main .notop {
    padding-top: 0;
}
.app-container .el-form .items {
    padding-left: 40px;
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
.el-radio + .el-radio {
    margin-left: 10px;
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
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
    background-color: #f5f9fc;
}
.dizhi .distpicker-address-wrapper select {
    background-color: #f5f9fc;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
</style>
<style scoped>
@import url("./oils.scss");
</style>
