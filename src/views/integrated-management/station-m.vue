<template>
	<div class="warp">
		<div class="main">
			<el-tabs>
			<el-tab-pane label="油站管理">
				<el-table
					v-loading="listLoading"
					:data="tableData"
					stripe
					style="width: 100%">
					<el-table-column
					label="油站简称"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.shortName }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="油站名称"
					min-width="150"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.fullName }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="油罐数量"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.canNum }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="油枪数量"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.gunNum }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="营业状态"
					align="center"
					>
					<template slot-scope="scope">
						<span v-show="scope.row.openStatus ==1">营业中</span>
						<span v-show="scope.row.openStatus ==0">暂停营业</span>
					</template>
					</el-table-column>
					<el-table-column
					label="创建时间"
					prop="createTime"
					:formatter="formatDate"
					align="center"
					>
					</el-table-column>
					<el-table-column label="操作" align="center" min-width="160px">
					<template slot-scope="scope">
						<el-button
						size="mini"
						type="primary"
						@click="administrationEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button
						size="mini"
						type="primary"
						@click="chakanEdit(scope.$index, scope.row)">查看</el-button>
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
			</el-tab-pane>
			<el-tab-pane label="油站申请">
				<div class="btn">
					<!-- @click="applicationVisible = true" -->
					<a href="#/integrated/stationApplication-m" ><el-button style="margin-right:235px;background:#409EFF;color:#fff;border:none;">油站申请</el-button></a>
				</div>
				<!-- <el-form ref="form" :model="form" label-width="53px">
					<div class="items">
						<el-form-item label="状态" label-width="53px">
						  <el-select v-model="listQuerySq.status" style="min-width: 100px" class="filter-item" @change="xuanzezt">
							<el-option v-for="item in zhuangtai" :key="item.name" :label="item.name" :value="item.id"/>
						  </el-select>
						</el-form-item>
					</div>
				</el-form> -->
				<el-table
					:data="applyData"
					v-loading="shenqingLoading"
					stripe
					style="width: 100%">
					<el-table-column
					label="油站名称"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.shortName }}</span>
					</template>
					</el-table-column>
					<!-- <el-table-column
					label="油罐数量"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.canNum }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="油枪数量"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.gunNum }}</span>
					</template>
					</el-table-column> -->
					
					<el-table-column
					label="状态"
					align="center"
					>
					<template slot-scope="scope">
						<span v-if="scope.row.status==0">待审核</span>
						<span v-if="scope.row.status==-2">审核失败</span>
						<span v-if="scope.row.status==-1">退回</span>
					</template>
					</el-table-column>
					<el-table-column
					label="申请时间"
					prop="createTime"
					:formatter="formatDate"
					align="center"
					>
					</el-table-column>
					<el-table-column
					label="备注"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.remark }}</span>
					</template>
					</el-table-column>
					<el-table-column label="操作" align="center" min-width="160px">
					<template slot-scope="scope">
						<el-button
						size="mini"
						type="primary"
						v-show="scope.row.status==-1"
						@click="application(scope.$index, scope.row)">编辑</el-button>
						<el-button
						size="mini"
						type="primary"
						v-show="scope.row.status==0"
						@click="chehui(scope.$index, scope.row)">撤回</el-button>
						<el-button
						size="mini"
						type="primary"
						v-show="scope.row.status==-2"
						@click="chongxinshenqing(scope.$index, scope.row)">重新申请</el-button>
						<el-button
						size="mini"
						type="primary"
						@click="shenqingSee(scope.$index, scope.row)">查看</el-button>
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
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 油站管理信息编辑框 -->
		<el-dialog :visible.sync="administrationVisible" width='90%' title="油站信息">
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
								<el-input v-model="stationInfo.shortName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>油站位置：</span>
								<div class="dizhi">
									<!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
									<el-select @change="shengChange" v-model="stationInfo.provinceId" clearable placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in sheng"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="stationInfo.cityId" @change="shiChange" clearable placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in shi"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="stationInfo.regoinId" clearable placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in xian"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="box">
								<span class="zuo">坐标：</span>
								<el-input v-model="stationInfo.longitude" style="width:150px" placeholder="请输入内容"></el-input>
								<span>-</span>
								<el-input v-model="stationInfo.latitude" style="width:150px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>营业状态：</span>
								<el-select v-model="stationInfo.openStatus" clearable placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="box">
								<span>法人身份证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="idCardFront">
										<img v-if="stationInfo.idCardFront" :src="stationInfo.idCardFront" class="avatar">
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
										:on-success="idCardBack">
										<img v-if="stationInfo.idCardBack" :src="stationInfo.idCardBack" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>法人姓名</span>
								<el-input v-model="stationInfo.corporationName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>身份证号</span>
								<el-input v-model="stationInfo.idCardNo" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>成品油零售经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="reprocessOilLicense">
										<img v-if="stationInfo.reprocessOilLicense" :src="stationInfo.reprocessOilLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
                    				unlink-panels
									v-model="stationInfo.reprocessOiEnd"
									type="date"
									placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content bg-purple-light">
							<div class="box">
								<span>油站编码：</span>
								<span>{{stationInfo.stationCode}}</span>
							</div>
							<div class="box">
								<span>油站电话：</span>
								<el-input v-model="stationInfo.telphone" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>详细地址：</span>
								<el-input v-model="stationInfo.address" style="width:200px" placeholder="请输入内容"></el-input>
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
                                <!-- <el-time-picker
									is-range
									style="width: 330px;"
									v-model="businessHours"
									range-separator="至"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
									placeholder="选择时间范围">
                                </el-time-picker>-->
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
									unlink-panels
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <div class="box">
					<p>油枪油罐对应关系</p>
					<el-table
					:data="relationshipData"
					stripe
					style="width: 100%">
						<el-table-column
							prop="oilGunNumber"
							label="油枪号"
							align="center">
						</el-table-column>
						<el-table-column
							prop="oilNumber"
							label="油品号"
							align="center">
						</el-table-column>
						<el-table-column
							prop="tankNumber"
							align="center"
							label="油罐号">
						</el-table-column>
					</el-table>
                </div>-->
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
										clearable
                                        v-model="seeStationInfo.provinceId"
                                        placeholder="请选择"
                                        style="width:120px"
                                    >
                                        <el-option
                                            v-for="item in sheng"
                                            :key="item.id"
                                            :label="item.district"
                                            :value="item.id.toString()"
                                        ></el-option>
                                    </el-select>
                                    <el-select
										clearable
                                        v-model="seeStationInfo.cityId"
                                        @change="shiChange"
                                        placeholder="请选择"
                                        style="width:120px"
                                    >
                                        <el-option
                                            v-for="item in shi"
                                            :key="item.id"
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
                                            :key="item.id"
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
									unlink-panels
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
                                <span>油站编码：</span>
                                <span>{{seeStationInfo.stationCode}}</span>
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
									placeholder="任意时间点">
								</el-time-picker>
							</div>
							<div class="radio">
								<span>是否开设便利店：</span>
								<el-radio v-model="seeStationInfo.haveStore" :label="1" >是</el-radio>
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
										:on-success="businessLicense">
										<img v-if="seeStationInfo.businessLicense" :src="seeStationInfo.businessLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>统一社会信息代码</span>
								<el-input v-model="seeStationInfo.socialCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>危险化学品经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="dangerChemistryLicense">
										<img v-if="seeStationInfo.dangerChemistryLicense" :src="seeStationInfo.dangerChemistryLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>许可证编号</span>
								<el-input v-model="seeStationInfo.chemistryCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
									v-model="seeStationInfo.chemistryEnd"
									type="date"
									unlink-panels
									placeholder="选择日期">
								</el-date-picker>
							</div>
							
						</div>
					</el-col>
				</el-row>
				<div class="box">
					<p>油枪油罐对应关系</p>
					<el-table
					:data="this.seeStationInfo.relationshipData"
					stripe
					style="width: 100%">
						<el-table-column
							prop="oil_gun_no"
							label="油枪号"
							align="center">
						</el-table-column>
						<el-table-column
							prop="oils_name"
							label="油品号"
							align="center">
						</el-table-column>
						<el-table-column
							prop="oilcan_no"
							align="center"
							label="油罐号">
						</el-table-column>
						<el-table-column
							prop="oils_price"
							align="center"
							label="单价">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button   @click="chakanVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		<!-- 油站申请信息添加框 -->
		<el-dialog :visible.sync="applicationVisible" width='90%' title="油站申请">
			<div class="header">
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<div class="box">
								<span>油站全称：</span>
								<el-input v-model="shenqing.fullName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>	
							<div class="box">
								<span>油站简称：</span>
								<el-input v-model="shenqing.shortName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>油站位置：</span>
								<div class="dizhi">
									<!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
									<el-select @change="shengChange" clearable  v-model="shenqing.provinceId" placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in sheng"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="shenqing.cityId" clearable @change="shiChange" placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in shi"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="shenqing.regoinId" clearable placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in xian"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="box">
								<span class="zuo">坐标：</span>
								<el-input v-model="shenqing.longitude" style="width:150px" placeholder="请输入内容"></el-input>
								<span>-</span>
								<el-input v-model="shenqing.latitude" style="width:150px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>营业状态：</span>
								<el-select v-model="shenqing.openStatus" clearable placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="box">
								<span>法人身份证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="shenqingidCardFront">
										<img v-if="shenqing.idCardFront" :src="shenqing.idCardFront" class="avatar">
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
										:on-success="shenqingidCardBack">
										<img v-if="shenqing.idCardBack" :src="shenqing.idCardBack" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>法人姓名</span>
								<el-input v-model="shenqing.corporationName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>身份证号</span>
								<el-input v-model="shenqing.idCardNo" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>成品油零售经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="shenqingreprocessOilLicense">
										<img v-if="shenqing.reprocessOilLicense" :src="shenqing.reprocessOilLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
									v-model="shenqing.reprocessOiEnd"
									type="date"
									unlink-panels
									:picker-options="pickerOptions"
									placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content bg-purple-light">
							
							<div class="box">
								<span>油站电话：</span>
								<el-input v-model="shenqing.telphone" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>详细地址：</span>
								<el-input v-model="shenqing.address" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>营业时间：</span>
								<el-time-picker
									style="width:150px"
									v-model="shenqing.openTime"
									:picker-options="{
									selectableRange: '00:00:00 - 23:59:59'
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
									placeholder="任意时间点">
								</el-time-picker>
							</div>
							<div class="radio">
								<span>是否开设便利店：</span>
								<el-radio v-model="shenqing.haveStore" :label="1" >是</el-radio>
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
										:on-success="shenqingbusinessLicense">
										<img v-if="shenqing.businessLicense" :src="shenqing.businessLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>统一社会信息代码</span>
								<el-input v-model="shenqing.socialCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>危险化学品经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="shenqingdangerChemistryLicense">
										<img v-if="shenqing.dangerChemistryLicense" :src="shenqing.dangerChemistryLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>许可证编号</span>
								<el-input v-model="shenqing.chemistryCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
									v-model="shenqing.chemistryEnd"
									type="date"
									unlink-panels
									:picker-options="pickerOptions"
									placeholder="选择日期">
								</el-date-picker>
							</div>
							<div class="box" v-show="seeStationInfo.status==-1">
								<span>拒绝原因</span>
								<el-input
									type="textarea"
									:autosize="{ minRows: 5, maxRows: 5}"
									placeholder="请输入内容"
									v-model="seeStationInfo.remark">
								</el-input>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button   @click="insertOilsStation">提交</el-button>
			</div>
		</el-dialog>
		<!-- 油站申请信息查看框 -->
		<el-dialog :visible.sync="shenqingSeeVisible" width='90%' title="油站信息">
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
								<el-input v-model="seeStationInfo.shortName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>油站位置：</span>
								<div class="dizhi">
									<!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
									<el-select @change="shengChange" clearable v-model="seeStationInfo.provinceId" placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in sheng"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="seeStationInfo.cityId" clearable @change="shiChange" placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in shi"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="seeStationInfo.regoinId" clearable placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in xian"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="box">
								<span class="zuo">坐标：</span>
								<el-input v-model="seeStationInfo.longitude" style="width:150px" placeholder="请输入内容"></el-input>
								<span>-</span>
								<el-input v-model="seeStationInfo.latitude" style="width:150px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>营业状态：</span>
								<el-select v-model="seeStationInfo.openStatus" clearable placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="box">
								<span>法人身份证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="idCardFront">
										<img v-if="seeStationInfo.idCardFront" :src="seeStationInfo.idCardFront" class="avatar">
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
										:on-success="idCardBack">
										<img v-if="seeStationInfo.idCardBack" :src="seeStationInfo.idCardBack" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>法人姓名</span>
								<el-input v-model="seeStationInfo.corporationName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>身份证号</span>
								<el-input v-model="seeStationInfo.idCardNo" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>成品油零售经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="reprocessOilLicense">
										<img v-if="seeStationInfo.reprocessOilLicense" :src="seeStationInfo.reprocessOilLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
									v-model="seeStationInfo.reprocessOiEnd"
									type="date"
									clearable
									:picker-options="pickerOptions"
									placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content bg-purple-light">
							<div class="box">
								<span>状态：</span>
								<span v-show="seeStationInfo.status==0">待审核</span>
								<span v-show="seeStationInfo.status==-1">退回</span>
							</div>
							<div class="box">
								<span>油站电话：</span>
								<el-input v-model="seeStationInfo.telphone" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>详细地址：</span>
								<el-input v-model="seeStationInfo.address" style="width:200px" placeholder="请输入内容"></el-input>
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
									placeholder="任意时间点">
								</el-time-picker>
							</div>
							<div class="radio">
								<span>是否开设便利店：</span>
								<el-radio v-model="seeStationInfo.haveStore" :label="1" >是</el-radio>
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
										:on-success="businessLicense">
										<img v-if="seeStationInfo.businessLicense" :src="seeStationInfo.businessLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>统一社会信息代码</span>
								<el-input v-model="seeStationInfo.socialCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>危险化学品经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="dangerChemistryLicense">
										<img v-if="seeStationInfo.dangerChemistryLicense" :src="seeStationInfo.dangerChemistryLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>许可证编号</span>
								<el-input v-model="seeStationInfo.chemistryCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
									v-model="seeStationInfo.chemistryEnd"
									type="date"
									clearable
									:picker-options="pickerOptions"
									placeholder="选择日期">
								</el-date-picker>
							</div>
							<div class="box" v-show="seeStationInfo.status==-1">
								<span>拒绝原因</span>
								<el-input
									type="textarea"
									:autosize="{ minRows: 5, maxRows: 5}"
									placeholder="请输入内容"
									v-model="remark">
								</el-input>
							</div>
						</div>
					</el-col>
				</el-row>
				
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button   @click="shenqingSeeVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		<!-- 油站申请信息编辑框 -->
		<el-dialog :visible.sync="shenqingbianjiVisible" width='90%' title="油站信息">
			<div class="header">
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<div class="box">
								<span>油站全称：</span>
								<el-input v-model="seeStationInfo.fullName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>	
							<div class="box">
								<span>油站简称：</span>
								<el-input v-model="seeStationInfo.shortName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>油站位置：</span>
								<div class="dizhi">
									<!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
									<el-select @change="shengChange" clearable v-model="seeStationInfo.provinceId" placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in sheng"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="seeStationInfo.cityId" clearable @change="shiChange" placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in shi"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
									<el-select v-model="seeStationInfo.regoinId" clearable placeholder="请选择" style="width:120px">
										<el-option
										v-for="item in xian"
										:key="item.id.toString()"
										:label="item.district"
										:value="item.id.toString()">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="box">
								<span class="zuo">坐标：</span>
								<el-input v-model="seeStationInfo.longitude" style="width:150px" placeholder="请输入内容"></el-input>
								<span>-</span>
								<el-input v-model="seeStationInfo.latitude" style="width:150px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>营业状态：</span>
								<el-select v-model="seeStationInfo.openStatus" clearable placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div class="box">
								<span>法人身份证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="idCardFront">
										<img v-if="seeStationInfo.idCardFront" :src="seeStationInfo.idCardFront" class="avatar">
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
										:on-success="idCardBack">
										<img v-if="seeStationInfo.idCardBack" :src="seeStationInfo.idCardBack" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon">反面</i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>法人姓名</span>
								<el-input v-model="seeStationInfo.corporationName" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>身份证号</span>
								<el-input v-model="seeStationInfo.idCardNo" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>成品油零售经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="reprocessOilLicense">
										<img v-if="seeStationInfo.reprocessOilLicense" :src="seeStationInfo.reprocessOilLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
									v-model="seeStationInfo.reprocessOiEnd"
									type="date"
									clearable
									:picker-options="pickerOptions"
									placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content bg-purple-light">
							<div class="box">
								<span>状态：</span>
								<span v-show="seeStationInfo.status==0">待审核</span>
								<span v-show="seeStationInfo.status==-1">退回</span>
							</div>
							<div class="box">
								<span>油站电话：</span>
								<el-input v-model="seeStationInfo.telphone" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>详细地址：</span>
								<el-input v-model="seeStationInfo.address" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>营业时间：</span>
								<el-time-picker
									style="width:150px"
									v-model="seeStationInfo.openTime"
									:picker-options="{
									selectableRange: '00:00:00 - 23:59:59'
									}"
                                    placeholder="任意时间点"
									clearable
                                ></el-time-picker>
                                <span>-</span>
                                <el-time-picker
                                    style="width:150px"
                                    v-model="seeStationInfo.closeTime"
                                    :picker-options="{
									selectableRange: '00:00:00 - 23:00:00'
									}"
									placeholder="任意时间点"
									clearable
									>
								</el-time-picker>
							</div>
							<div class="radio">
								<span>是否开设便利店：</span>
								<el-radio v-model="seeStationInfo.haveStore" :label="1" >是</el-radio>
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
										:on-success="businessLicense">
										<img v-if="seeStationInfo.businessLicense" :src="seeStationInfo.businessLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>统一社会信息代码</span>
								<el-input v-model="seeStationInfo.socialCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>危险化学品经营许可证</span>
								<div class="up">
									<el-upload
										class="avatar-uploader"
										action="https://httpbin.org/post"
										:show-file-list="false"
										:on-success="dangerChemistryLicense">
										<img v-if="seeStationInfo.dangerChemistryLicense" :src="seeStationInfo.dangerChemistryLicense" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</div>
							<div class="box">
								<span>许可证编号</span>
								<el-input v-model="seeStationInfo.chemistryCode" style="width:200px" placeholder="请输入内容"></el-input>
							</div>
							<div class="box">
								<span>有效期至</span>
								<el-date-picker
                   					 clearable
									v-model="seeStationInfo.chemistryEnd"
									type="date"
									:picker-options="pickerOptions"
									placeholder="选择日期">
								</el-date-picker>
							</div>
							<div class="box" v-show="seeStationInfo.status==-1">
								<span>拒绝原因</span>
								<el-input
									type="textarea"
									:disabled="true"
									:autosize="{ minRows: 5, maxRows: 5}"
									placeholder="请输入内容"
									v-model="remark">
								</el-input>
							</div>
						</div>
					</el-col>
				</el-row>
				
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insert">提交</el-button>
			</div>
		</el-dialog>
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
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";

export default {
    name: "stationDemos",
    components: { VDistpicker, Pagination },
    data() {
			return {
				administrationVisible:false,//控制油站管理弹出框显示与隐藏
				applicationVisible:false,//控制油站申请编辑弹出框显示与隐藏
				//油站管理临时数据
				tableData:[],
				//油站申请临时数据
				applyData:[],
				options: [{
					value: 1,
					label: '营业中'
				},{
					value: 0,
					label: '暂停营业'
				}],
				oilStationFullName:'北京石油有限公司北京一号加油站',//油站全称
				oilStationAbbreviation:'北京一号加油站',//油站简称
				longitude:'经度 20',//经度
				latitude:'纬度 20',//纬度
				businessStatus:'1',//营业状态
				openStore:'',//是否开设便利店
				openToilet:'',//是否开放卫生间
				oilStationCode:'UA01',//油站编码
				oilStationTelephone:'15012334566',//油站电话
				detailedAddress:'XX路XX号',//详细地址
				businessHours:[new Date(2018, 9, 10, 8, 0),new Date(2018, 9, 10, 18, 0)],//营业时间 开始-结束
				carWashing:'',//是否没有洗车服务
				maintenance:'',//是否没有维修服务
				//油枪油罐对应关系临时表格
				relationshipData:[],
				imageUrl: '',//上传地址
				stationInfo:{},//编辑油站信息
				diqu:[],//地区表
				sheng:[],//省列表
				shi:[],//市列表
				xian:[],//县列表
				chakanVisible:false,
				seeStationInfo:{},
				total: 0,
				totalSq: 0,
				listQuery: {
					pageNum: 1,
					pageSize: 10,
					status: 1
				},
				listQuerySq: {
					pageNum: 1,
					pageSize: 10,
					statusList: [0,-1]
				},
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
				shenqing:{
					fullName:'',
					shortName:'',
					provinceId:'',
					cityId:'',
					regoinId:'',
					longitude:'',
					latitude:'',
					openStatus:'',
					idCardFront:'',
					idCardBack:'',
					corporationName:'',
					idCardNo:'',
					reprocessOilLicense:'',
					reprocessOiEnd:'',
					telphone:'',
					address:'',
					openTime:new Date(0, 0, 0, 0, 0, 0),
					closeTime:new Date(0, 0, 0, 23, 59, 59),
					haveStore:'',
					haveCarWash:'',
					haveWashroom:'',
					haveReapirTruck:'',
					businessLicense:'',
					socialCode:'',
					dangerChemistryLicense:'',
					chemistryCode:'',
					chemistryEnd:'',
				},
				shenqingSeeVisible:false,
				listLoading: true,
				shenqingLoading:true,
				shenqingbianjiVisible:false,
				remark:'',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7
					}
				},
			}
		},
		created() {
			this.getList()
		},
    methods: {
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
            //获取油站管理列表
            oilsStationCompany(this.listQuery).then(response => {
                console.log(response.data);
				this.tableData = response.data.rows;
				this.total = response.data.total;
                this.listLoading = false;
            });
            var data1 = {
                status: 0
            };
            //获取油站申请列表
            this.applyData = []
            oilsStationCompany(this.listQuerySq).then(response => {
				this.applyData = response.data.rows;
				this.totalSq = response.data.total;
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
		// 选择状态（申请）
		xuanzezt() {
			oilsStationCompany(this.listQuerySq).then(response => {
				console.log(response.data);
				this.applyData = response.data.rows;
				this.totalSq = response.data.total;
				this.shenqingLoading = false;
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
			this.$router.push({
				name:'stationSetSM',
				query:{
					id:row.id
				}
			})
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
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.administrationVisible = false;
            });
        },
        application(index, row) {
			this.$router.push({
				name:'stationSetAM',
				query:{
					id:row.id
				}
			})
            this.shenqingbianjiVisible = true;
            var data = {
                id: row.id
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
                    this.$message.error(response.data.message);
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
                	this.$message.error(response.data.message);
                }
            });
        },
        chehui(index, row) {
            var data = {
                id: row.id,
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
                id: row.id,
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
                	this.$message.error(response.data.message);
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
				name:'stationSeeSM',
				query:{
					id:row.id
				}
			})
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
        shenqingSee(index, row) {
			this.$router.push({
				name:'stationSeeAM',
				query:{
					id:row.id
				}
			})
            this.shenqingSeeVisible = true;
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
		},
    }
};
</script>

<style scoped>
.warp {
    background-color: #fff;
    padding-bottom: 20px;
}
.el-tabs__content{
    position: relative;
}
._applyBtn{
    position: absolute;
    top: 2px;
    right: 50px;
    z-index: 10;
    border: none;
    outline: none;
    background: none;
}
.el-icon-plus{
    color: blue;
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
</style>
<style >
.el-tabs__nav-scroll {
    padding: 15px 0 0 40px;
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