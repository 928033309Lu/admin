<template>
    <div class="app-container newly">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="新增客户分析" name="first" :lazy="true">
                <div class="biao">
                    <el-date-picker
                        v-model="shijian"
                        type="daterange"
                        @change="getList"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                    <el-row style="background:#fff;padding-top: 20px;margin-bottom: -30px;">
                        <h5>会员新增数量</h5>
                        <line-chartx :show-index="showIndex" :chart-data="lineChartDatax1"/>
                    </el-row>
                </div>
                <!-- <div id="arrivalConsumption" :style="{width: '100%', height: '420px',padding:'20px'}"></div> -->
                <div class="biaoge" id="biaoge1">
                    <el-table
                        :key="tableKey"
                        :data="list"
                        :header-cell-style="{background:'#f5f9fc'}"
                        style="width: 100%;border-bottom: 0;">
                        <!-- <el-table-column label="会员类别" align="center" min-width="80">
                          <template slot-scope="scope">
                            <span v-show="scope.row.memberType==1">个人</span>
                            <span v-show="scope.row.memberType==2">车队</span>
                          </template>
                        </el-table-column>-->
                        <el-table-column label="会员号" align="center" min-width="170px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.memberNo }}</span>
                                <!-- <span>HY45456545</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="会员名称" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.username }}</span>
                                <!--scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}'-->
                            </template>
                        </el-table-column>
                        <el-table-column label="性别" min-width="50px" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.sex">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="电话号码" min-width="120px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="会员等级" min-width="80px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.levelName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="余额" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.amout }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="积分" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.currentPoint }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号" min-width="110px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="开卡日期" min-width="110px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="最后消费时间" min-width="110px" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.lastConsumeTime">{{ scope.row.lastConsumeTime | parseTime('{y}-{m}-{d}')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80px">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="chakanTK(scope.row.id)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination :autoScroll="false" v-show="total>0" :total="total" :page.sync="listQuery1.pageNum" :limit.sync="listQuery1.pageSize" @pagination="getTableList" />
                </div>
            </el-tab-pane>
            <!--智能召回-->
            <el-tab-pane label="智能召回" name="second" :lazy="true">
                <div class="biao">
                    <!-- <el-date-picker
                        v-model="shijian2"
                        type="daterange"
                        @change="getList2"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker> -->
                    <el-row style="background:#fff;padding-top: 20px;margin-bottom: -30px;">
                        <h5>会员至今几天未到店</h5>
                        <line-chartx :show-index="showIndex" :chart-data="lineChartDatax"/>
                    </el-row>
                </div>
                <div class="biaoge" id="biaoge2">
                    <div class="btn_box" style="padding: 20px 30px;">
                        <el-button type="primary" @click="duanxinTk()">发短信</el-button>
                        <el-button type="primary" @click="weChatGroup()">发优惠券</el-button>
                        <el-button type="primary" @click="sxhuiyuanTk()">筛选</el-button>
                    </div>
                    <el-table
                        :key="tableKey"
                        :data="list2"
                        @selection-change="selectionZhList"
                        :header-cell-style="{background:'#f5f9fc'}"
                        style="width: 100%;border-bottom: 0;">
                        <!-- <el-table-column label="会员类别" align="center" min-width="80">
                          <template slot-scope="scope">
                            <span v-show="scope.row.memberType==1">个人</span>
                            <span v-show="scope.row.memberType==2">车队</span>
                          </template>
                        </el-table-column>-->
                        <el-table-column type="selection" width="30" align="center"></el-table-column>
                        <el-table-column label="会员号" align="center" min-width="170px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.memberNo }}</span>
                                <!-- <span>HY45456545</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="会员名称" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.username }}</span>
                                <!--scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}'-->
                            </template>
                        </el-table-column>
                        <el-table-column label="性别" min-width="50px" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.sex">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="电话号码" min-width="120px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="会员等级" min-width="80px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.levelName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="余额" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.amout }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="积分" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.currentPoint }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号" min-width="110px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="开卡日期" min-width="110px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="最后消费时间" min-width="110px" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.lastConsumeTime">{{ scope.row.lastConsumeTime | parseTime('{y}-{m}-{d}')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80px">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="chakanTK(scope.row.id)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination :autoScroll="false" v-show="total2>0" :total="total2" :page.sync="listQuery2.pageNum" :limit.sync="listQuery2.pageSize" @pagination="getTableList2" />
                </div>
            </el-tab-pane>
        </el-tabs>

        <!--详情弹框-->
        <el-dialog :visible.sync="chakan" title="详情" class="chakan_tk" width="900px">
            <el-form ref="dataForm" label-position="left" label-width="90px" v-if="ckMainDate">
                <el-form-item label="账户信息" class="qing"></el-form-item>
                <div class="hezi">
                    <el-form-item label="会员号：">{{ ckMainDate.tbMember.memberNo }}</el-form-item>
                    <el-form-item label="状态：">
                        {{ ckMainDate.tbMember.isDel == 0 ? '启用' : '冻结' }}
                        <div class="isDelBtn">
                            <span @click="editIsDel(ckMainDate.tbMember.isDel == 0 ? 1 : 0)"></span>
                            <el-switch v-model="ckMainDate.tbMember.isDel" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1"> </el-switch>
                        </div>
                    </el-form-item>
                    <el-form-item label="会员等级：">{{ ckMainDate.tbMember.levelName }}</el-form-item>
                    <el-form-item label="余额：">{{ ckMainDate.tbMember.amout }}</el-form-item>
                    <el-form-item label="手机号：">{{ ckMainDate.tbMember.phone }}</el-form-item>
                    <el-form-item label="积分：">{{ ckMainDate.tbMember.currentPoint }}</el-form-item>
                </div>
                
                <br><el-form-item label="客户档案"></el-form-item>
                <div class="hezi">
                    <el-form-item label="姓名：">{{ ckMainDate.tbMember.username }}</el-form-item>
                    <el-form-item label="性别：">{{ ckMainDate.tbMember.sex == 1 ? '男' : '女' }}</el-form-item>
                    <el-form-item label="证件类型：">身份证</el-form-item>
                    <el-form-item label="证件号码：">{{ ckMainDate.tbMember.documentNo }}</el-form-item>
                    <el-form-item label="所在省份：">
                        <span v-for="item in _district" v-if="item.id == ckMainDate.tbMember.province">
                            {{item.district}}
                        </span>
                    </el-form-item>
                    <el-form-item label="所在地区：">
                        <span v-for="item in _district" v-if="item.id == ckMainDate.tbMember.city">
                            {{item.district}}
                        </span>
                    </el-form-item>
                    <el-form-item label="出生日期：">{{ ckMainDate.tbMember.birthday | parseTime('{y}-{m}-{d}') }}</el-form-item>
                    <el-form-item label="开卡时间：">{{ ckMainDate.tbMember.createTime | parseTime('{y}-{m}-{d}') }}</el-form-item>
                    <el-form-item label="详细地址：">{{ ckMainDate.tbMember.address }}</el-form-item>
                </div>

                <br><el-form-item label="其他信息"></el-form-item>
                <div class="qita">
                    <div class="left">
                        <p>所属油站</p>
                        <div class="neirong">
                            <ul>
                                <li v-if="ckMainDate.tbOilsStationList">
                                    {{ ckMainDate.tbOilsStationList.full_name }}
                                </li>
                            </ul>
                            <!-- <ul>
                                <li v-for="item in ckMainDate.tbOilsStationList">{{ item }}</li>
                            </ul> -->
                        </div>
                    </div>
                    <div class="right">
                        <p>标签</p>
                        <div class="neirong">
                            <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)"
                                style="margin-right: 10px;margin-bottom: 10px;"
                            >{{tag}}</el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                            ></el-input>
                            <el-button
                                v-else
                                class="button-new-tag"
                                size="small"
                                @click="showInput"
                            >+ New Tag</el-button>
                        </div>
                    </div>
                </div>
                <p class>消费次数：一年消费xxxxx次以上</p>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="chakan = false">取消</el-button>
                <el-button type="primary" @click="submit">确认</el-button>
            </div>
        </el-dialog>

        <!--短信发送弹框-->
        <el-dialog :visible.sync="duanxin" :title="isYh ? '发送优惠券' : '短信发送'" class="duanxin_tk" width="800px">
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <div class="yhBox" v-if="isYh">
                            <h5>选择优惠券</h5>
                            <el-select
                                v-model="couponId"
                                clearable
                                style="width:100%"
                                class="filter-item"
                                placeholder="请选择优惠券">
                                <el-option
                                    v-for="item in sendingData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </div>
                        <h5>短信编辑</h5>
                        <div class="edit">
                            <div class="btn">
                                <div class="left">
                                    <el-button type="primary" @click="templateVisible=true">选择模板</el-button>
                                </div>
                                <div class="right">
                                    <span>发送人数{{Num}}人</span>
                                    <!-- <el-button type="primary" @click="empty">清空会员</el-button> -->
                                </div>
                            </div>
                            <div class="centent">
                                <el-input
                                    type="textarea"
                                    :rows="8"
                                    :change="chg()"
                                    placeholder="请编辑短信内容"
                                    maxlength = '58'
                                    v-model="messageContent[0].templateContent">
                                </el-input>
                                <span class="wordsNum">当前还可以输入{{inpNum}}个字，按一条计费</span>
                            </div>
                            <div class="timing">
                                <el-checkbox v-model="checked">定时发送</el-checkbox>
                                <!-- <el-date-picker
                                    v-model="sendDate"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <el-time-picker
                                    v-model="sendTime"
                                    :picker-options="{
                                    selectableRange: '00:00:00 - 24:00:00'
                                    }"
                                    placeholder="选择时间">
                                </el-time-picker> -->
                                <el-date-picker
                                    v-model="sendDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <div class="preview">
                            <h5>短信预览</h5>
                            <div class="information">
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-arrow-left"></i>
                                        <span>538</span>
                                    </div>
                                    <div class="center">
                                        <svg-icon class="svr_sec" icon-class="yonghu"/>
                                        <p>1069180701800788</p>
                                    </div>
                                    <div class="right">
                                        <svg-icon class="svr_sec" icon-class="gantanhao"/>
                                    </div>
                                </div>
                                <div class="duan">
                                    <p>短信/彩信</p>
                                    <p>今天 上午9：19</p>
                                </div>
                                <div class="box">
                                    【三统石油】{{messageContent[0].templateContent}},【退订回复T】
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="btn">
                <el-button type="primary" @click="send">发送</el-button>
            </div>

            
        </el-dialog>

        <!-- 信息模板 -->
        <el-dialog :visible.sync="templateVisible" width='600px' title="短信模板">
            <div class="table">
                <el-table
                    ref="multipleTable"
                    stripe
                    :data="templateData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="标题"
                    min-width="120">
                    <template slot-scope="scope">{{ scope.row.templateName }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="templateContent"
                    label="内容"
                    min-width="120">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="templateVisible = false">取消</el-button>
                <el-button type="primary" @click="ent">确认</el-button>
            </div>
        </el-dialog>

        <!-- 筛选框 -->
        <el-dialog :visible.sync="screenVisible" title="筛选" width="800px">
            <div class="sai">
                <div class="shu">
                    <div class="block">
                        <div class="left">
                            <el-input
                                style="width: 273px;"
                                v-model="screen.condition"
                                placeholder="会员号/手机号/会员名称"
                            ></el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>生日月份</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 180px;"
                                multiple
                                clearable
                                v-model="screen.sendMonthArr"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in monthOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                     <div class="block">
                        <div class="left">
                          <span>所属油站</span>
                        </div>
                        <div class="right">
                          <el-select
                            style="width: 180px;"
                            multiple
                            clearable
                            v-model="screen.belongOils"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in stationOptions"
                              :key="item.id"
                              :label="item.shortName"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>会员等级</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 180px;"
                                multiple
                                clearable
                                v-model="screen.memberLevelArr"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in levelOptions"
                                    :key="item.id"
                                    :label="item.levelName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="shu">
                    <!-- <div class="block">
                        <div class="left">
                            <span>会员注册时间</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                style="width: 170px;"
                                v-model="screen.registeredStart"
                                type="date"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                            <span>-</span>
                            <el-date-picker
                                v-model="screen.registeredEnd"
                                style="width: 170px;"
                                type="date"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </div>
                    </div>-->
                    <div class="block">
                        <span class="demonstration">会员注册时间</span>
                        <el-date-picker
                            v-model="newDate"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                    </div>
                    <div class="block">
                        <span class="demonstration">最后消费时间</span>
                        <el-date-picker
                            v-model="newDate2"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                    </div>
                    <!-- <div class="block">
                        <div class="left">
                            <span>最后消费时间</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                v-model="screen.consumptionTimeStart"
                                type="date"
                                style="width: 170px;"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                            <span>-</span>
                            <el-date-picker
                                v-model="screen.consumptionTimeEnd"
                                type="date"
                                style="width: 170px;"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </div>
                    </div>-->
                    <div class="block">
                        <div class="left">
                            <span>账户余额</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 90px;"
                                v-model="screen.amoutIndex"
                                placeholder="请选择"
                                clearable
                            >
                                <el-option
                                    v-for="item in amoutIndexOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <el-input
                                style="width: 135px;"
                                v-model="screen.amout"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>积分数量</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 90px;"
                                v-model="screen.currentPointIndex"
                                placeholder="请选择"
                                clearable
                            >
                                <el-option
                                    v-for="item in amoutIndexOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <el-input
                                style="width: 135px;"
                                v-model="screen.currentPoint"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="anniu">
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </div>
            </div>
        </el-dialog>

        <!--会员筛选弹框-->
        <el-dialog :visible.sync="sxhuiyuan" title="筛选会员" class="sxhuiyuan_tk">
            <el-form ref="dataForm" label-position="left" label-width="80px" class="fenzuoyou">
                <div class="left">
                    <el-form-item label label-width="0">
                        <el-input placeholder="会员号/手机号/会员名称"></el-input>
                    </el-form-item>
                    <el-form-item label="生日月份">
                        <el-select
                            v-model="listQuery.importance"
                            clearable
                            style="width:100%"
                            class="filter-item"
                        >
                            <el-option
                                v-for="item in importanceOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属油站">
                        <el-select
                            v-model="listQuery.importance"
                            clearable
                            style="width:100%"
                            class="filter-item"
                        >
                            <el-option
                                v-for="item in importanceOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员等级">
                        <el-select
                            v-model="listQuery.importance"
                            clearable
                            style="width:100%"
                            class="filter-item"
                        >
                            <el-option
                                v-for="item in importanceOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="right">
                    <el-form-item label="会员注册时间" label-width="110px">
                        <!-- <el-date-picker
                            v-model="zhuceshijian"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>-->
                        <el-date-picker
                            v-model="zhuceshijian"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="最后消费时间" label-width="110px">
                        <!-- <el-date-picker
                            v-model="xiaofeishijian"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>-->
                        <el-date-picker
                            v-model="xiaofeishijian"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="账户余额" label-width="110px" class="daxiaodeng">
                        <el-select v-model="listQuery.importance" clearable class="filter-item">
                            <el-option
                                v-for="item in importanceOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                        <el-input placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item label="积分数量" label-width="110px" class="daxiaodeng">
                        <el-select v-model="listQuery.importance" clearable class="filter-item">
                            <el-option
                                v-for="item in importanceOptions"
                                :key="item"
                                :label="item"
                                :value="item"
                            />
                        </el-select>
                        <el-input placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sxhuiyuan = false">取消</el-button>
                <el-button type="primary" @click>重置</el-button>
                <el-button type="primary" @click>确认</el-button>
            </div>
        </el-dialog>

        <!-- 短信群发框 -->
        <el-dialog title="短信群发" :visible.sync="weChatVisible" width="420px">
            <div class="weChat">
               <div class="box">
                   <span>优惠券</span>
                   <el-select v-model="weChatSend.type" placeholder="请选择" style="width: 300px;">
                        <el-option
                        style="width: 300px;"
                        v-for="item in sendingData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                   <!-- <el-input v-model="weChatSend.type" placeholder="请输入内容" ></el-input> -->
               </div>
                <div class="box">
                   <span>主题</span>
                   <el-input v-model="weChatSend.title" placeholder="请输入内容" style="width: 300px;"></el-input>
               </div>
               <div class="box">
                   <span style="vertical-align: top;">内容</span>
                   <el-input
                    type="textarea"
                    style="width: 300px;"
                    :autosize="{ minRows: 3, maxRows: 8}"
                    placeholder="请输入内容"
                    :rows="5"
                    v-model="weChatSend.content">
                    </el-input>
               </div>
               <div class="box">
                   <span>发送时间</span>
                    <el-date-picker
                        style="width: 300px;"
                      v-model="weChatSend.date"
                      type="datetime"
                      :picker-options="pickerOptions1"
                      placeholder="选择时间">
                    </el-date-picker>
               </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">发送</el-button> -->
                <el-button @click="weChatVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary" @click="sendYhq">发送</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import echarts from "echarts";
import LineChart from "./components/LineChart";
import LineChartx from "./zhaohui_chart/LineChart";
import { chacheguan } from "@/api/cheduiguanli";
import { selectMemberById } from "@/api/huiyuanguanli";
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { district,delMember } from "@/api/shuju.js";
import { getxinmo } from '@/api/duanxinfasong'
import { sendduan } from '@/api/duanxinfasong'
import { getYhList, sendYh, getyouhuilist } from "@/api/youhuiquan";
import { StationList } from "@/api/youpinbaobiao";
import { queryAllMemberLevel } from "@/api/huiyuanguanli";

import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle,
    userList,
    getMissedShopList,
} from "@/api/article";
export default {
    name: "newly",
    components: {
        LineChart,
        LineChartx,
        Pagination
    },
    data() {
        return {
            //标签用的
            dynamicTags: [],
            inputVisible: false,
            inputValue: "",
            //标签结束
            pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
            //定时发送
            dingshishijian: "",
            dschecked: "",
            //定时发送结束
            duanxin_input: "",
            zhuceshijian: "",
            xiaofeishijian: "",
            list: null,
            list2: null,
            tableKey: 0,
            shijian: "",
            shijian2: "",
            shijian_zhaohui: "",
            activeName: "first",
            //客户分析数据
            lineChartData: {
                actualData: [
                    21,
                    31,
                    25,
                    35,
                    45,
                    50,
                    29,
                    30,
                    28,
                    20,
                    21,
                    30,
                    20,
                    39,
                    41,
                    25,
                    24,
                    21,
                    31,
                    25,
                    35,
                    45,
                    50,
                    29,
                    30,
                    28,
                    20,
                    21,
                    30,
                    20,
                    40
                ] //油品
            },
            //客户分析数据结束

            //弹框下拉框和分页用的
            listQuery1: {
                pageNum: 1,
                pageSize: 10,
                isDel: 0,
                status: 1
            },
            listQuery2: {
                pageNum: 1,
                pageSize: 10,
                isDel: 0,
                status: 1
            },
            total:0,
            total2:0,
            ckMainDate:'',
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            importanceOptions: [1, 2, 3],
            //弹框下拉框和分页用的结束

            //智能召回数据
            lineChartDatax: {
                x:[],
                y:[],
                z:[],
                n:[],
            },
            lineChartDatax1: {
                x:[],
                y:[],
                z:[],
                n:[],
            },
            //智能召回结束
            chakan: false,
            duanxin: false,
            sxhuiyuan: false,
            _district: [],
            num:58,//输入框输入限制字数总数
            inpNum:58,//还可以输入限制字数
            Num:0,//人数
            messageContent:[{
                title:'',//标题
                templateContent:'',//内容
            }],//短信内容
            checked:false,
            sendDate:'',//定时发送日期
            templateVisible:false,//控制信息模板选择显示与隐藏
            templateData:[],
            multipleSelection:[],
            memberSelection:[],
            isYh:false,
            sendingData:[],
            couponId:'',
            screenVisible: false, //控制筛选框的显示与隐藏
            showIndex:'1',
            screen: {
                sendMonthArr: [],
                belongOils: [],
                memberLevelArr: [],
                condition: "",
                registeredStart: "",
                registeredEnd: "",
                consumptionTimeStart: "",
                consumptionTimeEnd: "",
                amoutIndex: "",
                amout: "",
                currentPointIndex: "",
                currentPoint: ""
            },
            weChatVisible:false,//控制微信群发弹出框显示与隐藏
            weChatSend:{
                type:'',
                title:'',
                content:'',
                date:'',
            },
            newDate: "", //会员注册时间筛选
            newDate2: "", //最后消费时间筛选
            monthOptions: [
                {
                    value: "1",
                    label: "1月"
                },
                {
                    value: "2",
                    label: "2月"
                },
                {
                    value: "3",
                    label: "3月"
                },
                {
                    value: "4",
                    label: "4月"
                },
                {
                    value: "5",
                    label: "5月"
                },
                {
                    value: "6",
                    label: "6月"
                },
                {
                    value: "7",
                    label: "7月"
                },
                {
                    value: "8",
                    label: "8月"
                },
                {
                    value: "9",
                    label: "9月"
                },
                {
                    value: "10",
                    label: "10月"
                },
                {
                    value: "11",
                    label: "11月"
                },
                {
                    value: "12",
                    label: "12月"
                }
            ],
            stationOptions: [], //油站列表
            levelOptions: [], //会员等级列表
            amoutIndexOptions: [
                {
                    value: 0,
                    label: "大于"
                },
                {
                    value: 1,
                    label: "小于"
                },
                {
                    value: 2,
                    label: "等于"
                },
                {
                    value: 3,
                    label: "大于等于"
                },
                {
                    value: 4,
                    label: "小于等于"
                }
            ],
        };
    },
    created() {
        this.getList();
        this.getList2();
        this.getTableList();
        this.getTableList2();
        district({}).then(res => {
            //地区列表
            // console.log(res.data);
            this._district = res.data;
        });

        getxinmo({}).then(response => {
            this.templateData = response.data.tbSmsTemplateList
        })

        getyouhuilist({}).then(response => {
            this.sendingData = response.data.list
        })
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            this.showIndex = tab.index
        },
        ent(){
            this.templateVisible = false
            if(this.multipleSelection.length){
                this.messageContent = this.multipleSelection
            }
        },
        reset() {
            this.xiaofeishijian='';
            this.zhuceshijian='';
            this.screen = {
                sendMonthArr: [],
                belongOils: [],
                memberLevelArr: [],
                condition: "",
                registeredStart: "",
                registeredEnd: "",
                consumptionTimeStart: "",
                consumptionTimeEnd: "",
                amoutIndex: "",
                amout: "",
                currentPointIndex: "",
                currentPoint: "",
            };
        },
        // 群发优惠券
        weChatGroup(){
            if(this.memberSelection.length){
                this.weChatVisible=true
                this.weChatSend = {
                    type:'',
                    title:'',
                    content:'',
                    date:'',
                }
            }else{
                this.$message.error('请选择会员')
            }
        },
        sendYhq(){
            if(!this.weChatSend.type){
                this.$message.error('请选择优惠券')
            }else if(!this.weChatSend.title){
                this.$message.error('请输入主题')
            }else if(!this.weChatSend.content){
                this.$message.error('请输入内容')
            }else if(!this.weChatSend.date){
                this.$message.error('请选择时间')
            }else{
                var couponMemberList =[]
                for(var i=0;i<this.memberSelection.length;i++){
                    couponMemberList.push({
                        member_id:this.memberSelection[i].id,
                        member_no:this.memberSelection[i].phone
                    })
                }
                var data ={
                    "couponMemberList":couponMemberList,
                    "couponId":this.weChatSend.type,
                    "sendType":2,
                    "title":this.weChatSend.title,
                    "text":this.weChatSend.content,
                    "sendNum":couponMemberList.length,
                    sendTime:this.weChatSend.date
                }
                sendYh(data).then(response => {
                    this.weChatVisible = false
                })
            }
        },
        query() {
            this.screen.pageNum = this.listQuery2.pageNum;
            this.screen.pageSize = this.listQuery2.pageSize;
            this.listQuery2.pageNum = 1
            chacheguan(this.screen).then(response => {
                this.total2 = response.data.memberList.total;
                this.list2 = response.data.memberList.rows;
                this.screenVisible = false
            });
        },
        getList() {
            if(this.shijian){
                this.listQuery.startTime = this.shijian[0]
                this.listQuery.endTime = this.shijian[1]
            }else{
                this.listQuery.startTime = ''
                this.listQuery.endTime = ''
            }
            userList(this.listQuery).then(response => {
                let x = [],y = [],z = [], n = []

                response.data.chart.forEach((item)=>{
                    x.push(this.dateTime(new Date(item.day)))
                    y.push(item.webNew)
                })
                n = ['会员人数']

                this.lineChartDatax1 = { x, y, z, n }
            });

            var a = {};
            StationList(a).then(response => {
                // console.log('油站')
                // console.log(response.data)
                this.stationOptions = response.data;
            });
            var b = {};
            queryAllMemberLevel(b).then(response => {
                console.log("会员等级");
                // console.log(response.data);
                this.levelOptions = response.data.list;
                // this.tbMember
            });



        },
        getList2() {
            if(this.shijian2){
                this.listQuery.startTime = this.shijian2[0]
                this.listQuery.endTime = this.shijian2[1]
            }else{
                this.listQuery.startTime = ''
                this.listQuery.endTime = ''
            }
            getMissedShopList(this.listQuery).then(response => {
                let x = [
                    '0-30天',
                    '30-60天',
                    '60-120天',
                    '120-300天',
                    '300-1000天',
                ],y = [],z = [], n = []

                let obj = response.data.list;
                obj.sort(function (a, b) {
                　　return a.sort - b.sort;
                });
                obj.forEach((item)=>{
                    y.push(item.count)
                })
                n = ['会员人数']

                this.lineChartDatax = { x, y, z, n }
            });

            var a = {};
            StationList(a).then(response => {
                // console.log('油站')
                // console.log(response.data)
                this.stationOptions = response.data;
            });
            var b = {};
            queryAllMemberLevel(b).then(response => {
                console.log("会员等级");
                // console.log(response.data);
                this.levelOptions = response.data.list;
                // this.tbMember
            });



        },
        dateTime(value,division,time) {
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
        },
        getTableList(){
            chacheguan(this.listQuery1).then(response => {
                this.total = response.data.memberList.total;
                this.list = response.data.memberList.rows;
            });
        },
        getTableList2(){
            chacheguan(this.listQuery2).then(response => {
                this.total2 = response.data.memberList.total;
                this.list2 = response.data.memberList.rows;
            });
        },
        arrivalConsumptionLine(x,y,z) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(
                document.getElementById("arrivalConsumption")
            );
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "趋势图"
                },
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "10%",
                    data: ["新用户", "老用户"]
                },
                grid: {
                    left: "0%",
                    right: "6%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    axisTick: {
                        show: false
                    },
                    name: "（日期）",
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: x
                },
                yAxis: [
                    {
                        name: "人数",
                        type: "value",
                        splitLine: { show: false }, //去除网格线
                        axisTick: {
                            show: false
                        }
                        // splitArea:{show : true},//保留网格区域
                    }
                ],
                series: [
                    {
                        name: "新用户",
                        type: "bar",
                        stack: "总量",
                        itemStyle: { color: "#FF7173" },
                        data: y
                    },
                ]
            });
        },
        chakanTK(id) {
            this.chakan = true;
            selectMemberById({id:id}).then(response => {
                this.ckMainDate = response.data
                this.dynamicTags = response.data.tbMember.tag.split(',')
            });
        },
        editIsDel(val){
            delMember({id:this.ckMainDate.tbMember.id,isDel:val}).then(res => {
                this.$message(res.data.message);
                this.chakanTK(this.ckMainDate.tbMember.id)
            }); 
        },
        duanxinTk() {
            this.duanxin = true;
            this.isYh = false;
        },
        sxhuiyuanTk() {
            this.screenVisible = true;
        },
        //标签用的
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        submit(){

        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
        //标签结束
        fayouhuijuan() {
            this.duanxin = true;
            this.isYh = true;
        },
        chg(){
            if (this.messageContent[0].templateContent) {
                this.inpNum = this.num-this.messageContent[0].templateContent.length;
            } else {
                this.inpNum=58
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        selectionZhList(val) {
            this.memberSelection = val;
            this.Num = this.memberSelection.length
        },
        send(){
            // console.log(this.birthdayMonth.join(''))
            // console.log(this.memberSelection,)
            if(this.memberSelection.length==0){
                this.$message.error('请选择会员');
                return;
            }
            if(this.messageContent[0].templateContent==''||this.messageContent[0].templateContent==null){
                this.$message.error('请添加短信内容');
                return;
            }
            var tbMembers=[]
            for(var i=0;i<this.memberSelection.length;i++){
                tbMembers.push({
                    id:this.memberSelection[i].id,
                    phone:this.memberSelection[i].phone
                })
            }
            if(this.checked){
                var isTiming = 1
            }else{
                var isTiming = 0
            }
            var data = {
                "tbMembers": tbMembers,
                "sendTime": this.sendDate,
                "content": this.messageContent[0].templateContent,
                "isTiming": isTiming
            }
            if(this.isYh){
                if(!this.couponId){
                    this.$message.error('请选择优惠券');
                }else{
                    var data1 = {
                        "couponMemberList": tbMembers,
                        "sendTime": this.sendDate,
                        "content": this.messageContent[0].templateContent,
                        "isTiming": isTiming
                    }
                  data1.couponId = this.couponId
                  sendYh(data1).then(response => {
                      console.log(response.data)
                      this.$message({
                          message: '发送成功',
                          type: 'success'
                      });
                      this.duanxin = false
                  })

                }
            }else{
                sendduan(data).then(response => {
                    console.log(response.data)
                    this.$message({
                        message: '发送成功',
                        type: 'success'
                    });
                    this.duanxin = false
                })
            }
        },
    },
    watch:{
        chakan:function(val){
            if(!val){
                this.ckMainDate = ''
            }
        },
        newDate: function(val, old) {
            this.screen.registeredStart = val ? val[0] : null;
            this.screen.registeredEnd = val ? val[1] : null;
        },
        newDate2: function(val, old) {
            this.screen.consumptionTimeStart = val ? val[0] : null;
            this.screen.consumptionTimeEnd = val ? val[1] : null;
        }
    }
};
</script>

<style scoped>
@import url("./newly.scss");
    .isDelBtn{position: relative;display: inline-block;width: 40px;height: 20px;line-height: 0;cursor: pointer;}
    .isDelBtn span{display: block;width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 1;}
    .yhBox{margin-bottom: 20px;}
    .yhBox h5{margin-bottom: 10px;}
    .demonstration{display: inline-block;width: 91px;}
    .app-container >>> .el-tabs__item{height: 60px;line-height: 60px;}
    .app-container >>> .el-tabs{padding: 0px;margin-top: -20px;}
    .app-container >>> .el-tabs__nav-scroll{padding: 0 20px;}
    .app-container >>> .el-tabs__content{padding: 0 20px;}
    #biaoge1{margin-top: 60px;}
    .duanxin_tk .left{width: auto !important;}
    .duanxin_tk .right{width: auto !important;}
</style>


<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
    background-color: #F6F7FB;
    // padding: 20px;
}
.main{
    min-height: calc(100vh - 120px);
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
h5{
    margin: 0;
}
.notice{
    margin: 10px 0 20px;
    background-color: #F5F9FC;
    padding: 1%;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
}
.notice p{
    font-size: 14px;
}
.edit .btn{
    margin: 20px 0;
    overflow: hidden;
}
.btn .left{
    float: left;
}
.btn .right{
    float: right;
    font-size: 14px;
}
.btn .right .el-button{
    margin-left: 20px;
}
.centent{
    position: relative;
}
.centent .wordsNum{
    position: absolute;
    right: 10px;
    bottom: 7px;
    font-size: 14px;
    color: grey;
}
.timing{
    margin: 20px 0;
}
.information{
    width: 250px;
    height: 360px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    margin-top: 20px;
}
.information .top{
    display: flex;
    justify-content: space-between;
    background-color: #F9F9F9;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
}
.top .left,.top .right{
    line-height: 37px;
}
.top .left span{
    font-size: 12px;
    display: inline-block;
    line-height: 14px;
    border-radius: 7px;
    padding: 0 4px;
    background-color: #065FF1;
}
.left i{
    color: #065FF1;
    font-weight: 700;
}
.right .svr_sec{
    color: #065FF1;
}
.center{
    text-align: center;
}
.top p{
    margin: 0;
    font-size: 12px;
}
.duan{
    margin: 20px 0;
}
.duan p{
    margin: 0;
    text-align: center;
    font-size: 14px;
    color: grey;
}
.preview .box{
    position: relative;
    margin-left: 15px;
    width: 175px;
    min-height: 85px;
    border: 2px solid #e4e7ed;
    background-color: #E6E5EA;
    padding: 5px;
    font-size: 14px;
    border-radius: 10px;
}
.preview .box:before{
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-right: 10px solid #e4e7ed;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    bottom: 0;
    left: -8px;
}
.btn{
    text-align: center;
    margin: 20px 0;
}
.dialog-footer .el-button:nth-of-type(2){
    margin-left: 200px;
}
.dialog-footer{
    text-align: center;
}
.table{
    border: 1px solid #e4e7ed;
}
.send .top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.send p{
    font-size: 16px;
    line-height: 36px;
}
.zuo{
    width: 240px;
}
.zhong{
    width: 180px;
}
.you{
    width: 280px;
}
.nei{
    min-height: 100px;
    padding: 10px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
}
.ipt{
    margin-bottom: 10px;
}
.ipt span{
    line-height: 36px
}
.ipt .left,.ipt .right{
    display: inline-block;
}
.ipt .left{
    vertical-align: top;
}
.sai{
    display: flex;
    justify-content: space-between;
}
.sai .shu .block{
    line-height: 36px;
}
.shu .left,.right{
    display: inline-block;
}
.shu .block{
    margin-bottom: 10px;
    padding-top: 15px;
}
.shu .left{
    width: 90px;
    line-height: 36px;
}
.an{
    text-align: right;
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
.meassage .el-tabs__nav-wrap{
    padding: 0 2%;
}
.meassage .el-tabs__content{
    padding: 2%;
}
.meassage .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.meassage .el-textarea__inner{
    resize:none;
}
.meassage .el-dialog__header{
    text-align: center;
    background-color: #5B8DFF;
    color:#fff;
}
.meassage .el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #fff;
}
.meassage .el-dialog__headerbtn .el-dialog__close{
    color: #fff;
}

.weChat .box{
    margin-bottom: 20px;
}

.weChat .box>span{display: inline-block;width: 70px;}

</style>