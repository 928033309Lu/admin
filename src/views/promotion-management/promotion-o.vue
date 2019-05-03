<template>
    <div class="warp">
        <div class="header" style="display:flex;justify-content:  space-between;">
            <h3>
                <span></span>促销管理
            </h3>
            <div class="shenqing">
                <a href="#/promotions/oilApplication-o">
                    <el-button type="primary">油品促销申请</el-button>
                </a>
                <a href="#/promotions/commodityApplication-o">
                    <el-button type="primary">商品促销申请</el-button>
                </a>
                <a href="#/promotions/mixedPromotion-o">
                    <el-button type="primary">油商互动申请</el-button>
                </a>
            </div>
        </div>
        <div class="main">
            <div class="top">
                <div class="cu">
                    <div class="inp">
                        <span>促销单号</span>
                        <el-input v-model="chaxun.activityNo" @input="getlist" placeholder style="width: 190px;"></el-input>
                    </div>
                    <div class="inp">
                        <span>促销类型</span>
                        <el-select v-model="chaxun.activityType" clearable @change="getlist" placeholder="请选择">
                            <el-option
                                v-for="item in promotionTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="inp">
                        <span>状态</span>
                        <el-select v-model="chaxun.status"  clearable @change="getlist" placeholder="请选择">
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="biao">
                <div class="table">
                    <el-table :data="managementTable" stripe style="width: 100%">
                        <el-table-column label="促销类型" align="center">
                            <template slot-scope="scope">
                                <span v-show="scope.row.activityType == 1">油品促销</span>
                                <span v-show="scope.row.activityType == 2">商品促销</span>
                                <span v-show="scope.row.activityType == 3">油商互动</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销单号" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.activityNo }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="主题" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status==0">待审批</span>
                                <span v-if="scope.row.status==1">未生效</span>
                                <span v-if="scope.row.status==2">已生效</span>
                                <span v-if="scope.row.status==-2">已失效</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="开始时间" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.startDateTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="结算时间" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.endDateTime }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建者" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.userName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" min-width="220">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    v-if="scope.row.status==0"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >撤回</el-button>
                                <el-button
                                    size="mini"
                                    v-if="scope.row.status==3||scope.row.status==2"
                                    type="primary"
                                    @click="stop(scope.$index, scope.row)"
                                >停止</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="see(scope.$index, scope.row)"
                                >查看</el-button>
                                <el-button
                                    size="mini"
                                    v-if="scope.row.status==3||scope.row.status==2"
                                    type="primary"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >统计</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
					<pagination
					    v-show="total>0"
					    :total="total"
					    :page.sync="chaxun.pageNum"
					    :limit.sync="chaxun.pageSize"
					    @pagination="getlist"
					/>
					<!--layout="prev, pager, next, jumper"-->
                </div>
            </div>
        </div>
        <!-- 查看框 -->
        <el-dialog :visible.sync="dialogFormVisible" title="查看" width="80%">
            <div class="chakan">
                <div class="box">
                    <span>促销单号：</span>
                    <span>{{seeData.activityNo}}</span>
                </div>
                <div class="box">
                    <span>促销主题：</span>
                    <span>{{seeData.name}}</span>
                </div>
                <div class="box">
                    <span>促销类型：</span>
                    <span v-show="seeData.activityType==1">油品促销</span>
                    <span v-show="seeData.activityType==2">商品促销</span>
                    <span v-show="seeData.activityType==3">油商互动</span>
                </div>
                <div class="box">
                    <span>创建者：</span>
                    <span>{{seeData.userName}}</span>
                </div>
                <div class="box">
                    <span>促销原因：</span>
                    <span>{{seeData.instruction}}</span>
                </div>
                <div class="box">
                    <span>状态：</span>
                    <span v-show="seeData.status==0">待审批</span>
                    <span v-show="seeData.status==1">未生效</span>
                    <span v-show="seeData.status==2">已生效</span>
                    <span v-show="seeData.status==-1">已失效</span>
                </div>
                <div class="box">
                    <span>促销时间：</span>
                    <p>
                        <span>日期：{{seeData.startDateTime}} —— {{seeData.endDateTime}}</span>
                    </p>
                    <p>
                        <span>
                            周期：
                            <span v-if="seeData.daysWeeks[0]=='每天'">每天</span>
                            <span v-if="seeData.daysWeeks[0]!='每天'">
                                周循环：
                                <span
                                    v-for="(item, index) in seeData.daysWeeks"
                                    :key="index"
                                >{{item}} ,</span>
                            </span>
                        </span>
                    </p>
                    <p>
                        <span>时间段：{{seeData.star}} —— {{seeData.end}}</span>
                    </p>
                </div>
                <div class="box">
                    <span>促销次数：</span>
                    <span v-if="seeData.promotionTimes==0">无限次</span>
                    <span v-if="seeData.promotionTimes==1">{{seeData.num}}天/次</span>
                    <span v-if="seeData.promotionTimes==2">{{seeData.num}}总/次</span>
                </div>
                <div class="box">
                    <span>支付方式：</span>
                    <span v-for="(item, index) in seeData.payTypes" :key="index">{{item}},</span>
                </div>
                <div class="box">
                    <span>促销油站：</span>
                    <span>{{seeData.activityNo}}</span>
                </div>
            </div>
            <div class="biao">
                <div class="table">
                    <!-- 油品满升数，单价立减 -->
                    <el-table
                        v-show="seeData.promotionType==1"
                        :data="seeData.typeList"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="油品" align="center" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销数量" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}升</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠金额" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="规则说明" min-width="265" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{scope.row.goodsName}} 加油满{{ scope.row.minimumCharge }}升，单价立减{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 油品满升数，单价百分比优惠 -->
                    <el-table
                        v-show="seeData.promotionType==2"
                        :data="seeData.typeList"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="油品" align="center" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销数量" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 升
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠折扣" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> %
                            </template>
                        </el-table-column>
                        <el-table-column label="规则说明" min-width="265" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{scope.row.goodsName}} 加油满{{ scope.row.minimumCharge }}升，单价优惠{{scope.row.discount}}%</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 油品满金额，总价立减 -->
                    <el-table
                        v-show="seeData.promotionType=='3'"
                        :data="seeData.typeList"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="油品" align="center" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销金额" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠金额" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="规则说明" min-width="265" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{scope.row.goodsName}} 加油满{{ scope.row.minimumCharge }}元，总价立减{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    @click="del(scope.$index, scope.row)"
                                    type="danger"
                                    size="small"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
            align="right"
            width="80"
            :render-header="renderHeader">
            <template slot="header" slot-scope="scope">
              
            </template>
                        </el-table-column>-->
                    </el-table>
                    <!-- 油品满金额，总价百分比优惠 -->
                    <el-table
                        v-show="seeData.promotionType=='4'"
                        :data="seeData.typeList"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="油品" align="center" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销金额" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠折扣" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> %
                            </template>
                        </el-table-column>
                        <el-table-column label="规则说明" min-width="265" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{scope.row.goodsName}} 加油满{{ scope.row.minimumCharge }}元，总价优惠{{scope.row.discount}}%</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 商品满数量，单价立减 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==6"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="商品" align="center" width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销数量" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠金额" min-width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{ scope.row.goodsName }} 购买{{scope.row.minimumCharge}}个以上，单价立减{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 商品满一定数量，限定数量内的商品总价立减 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==12"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="商品" align="center" width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销数量" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠金额" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305px" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{ scope.row.goodsName }} 购买达到{{scope.row.minimumCharge}}个，总价立减{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 商品单价立减 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==11"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="商品" align="center" width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠金额" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span>元
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{ scope.row.goodsName }} 单价立减{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 商品卖赠促销 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==10"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="商品" align="center" width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销数量" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送商品" align="center" width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.givingName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送数量" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.givingNum}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >购买 {{ scope.row.goodsName }} 满{{scope.row.discount}}，赠送{{scope.row.givingNum}}个{{scope.row.givingName}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 商品订单满金额，总价立减 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==5"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="促销金额" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span>元
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠金额" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >订单满{{scope.row.minimumCharge}}元，立减{{scope.row.discount}}元</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 商品订单满金额，总价百分比优惠 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==9"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="促销金额" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="优惠折扣" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> %
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >订单满{{scope.row.minimumCharge}}元，优惠{{scope.row.discount}}%</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="70" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    @click="del(scope.$index, scope.row)"
                                    type="danger"
                                    size="small"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            align="right"
                            width="80"
                            :render-header="renderHeader">
                            <template slot="header" slot-scope="scope">
                            
                            </template>
                        </el-table-column>-->
                    </el-table>
                    <!-- 商品订单满金额，赠送指定商品 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==8"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="促销金额" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送商品" align="center" width="240">
                            <template slot-scope="scope">
                                <span>{{scope.row.givingName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送数量" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >订单满{{scope.row.minimumCharge}}元，赠送{{scope.row.discount}}个{{scope.row.givingName}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 最低价免费 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==7"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="商品组" align="center">
                            <el-table-column label="商品" align="left">
                                <template slot-scope="scope">
                                    <p
                                        v-for="(item, index) in scope.row.goodsNameList"
                                        :key="index"
                                    >{{item}}</p>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="促销数量" align="center" width="150">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="说明" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >购买商品组内任意商品达到{{scope.row.minimumCharge}}个，那么本次组合商品中最低价商品免费</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 油品满金额，赠送指定数量的便利店商品 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==13"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="油品" width="180" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销金额" width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送商品" width="240" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.givingName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送数量" width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.givingNum}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="规则说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{ scope.row.goodsName }} 加油满{{ scope.row.minimumCharge }}元，赠送 {{scope.row.givingNum}}个 {{scope.row.givingName}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 油品满金额，赠送指定金额任意商品 -->
                    <el-table
                        :data="seeData.typeList"
                        v-show="seeData.promotionType==14"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column label="油品" width="180" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="促销金额" width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.minimumCharge}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="赠送商品金额" width="150" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.discount}}</span> 元
                            </template>
                        </el-table-column>
                        <el-table-column label="规则说明" min-width="305" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="shuoming"
                                >{{scope.row.goodsName}} 加油满{{ scope.row.minimumCharge }}元，赠送 {{scope.row.discount}}元便利店商品</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="xia">
                <div class="block">
                    <p>申请人：{{seeData.userName}}</p>
                    <p>申核人：{{seeData.auditName}}</p>
                </div>
                <div class="block">
                    <p>申请时间：{{seeData.shenqing}}</p>
                    <p>申核时间：{{seeData.shenhe}}</p>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="modify">{{ $t('table.confirm') }}</el-button>
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>-->
            </div>
        </el-dialog>
        <!-- 统计 -->
        <el-dialog :visible.sync="tongVisible" title="促销统计" width="50%">
          <div class="tong">
              <div class="ji">
                <div class="box">
                    <p>促销单号:{{result.activity_no}}</p>
                    <p>促销开始时间：{{result.start_date}}</p>
                    <p>促销交易笔数：{{result.count}}</p>
                    <p>促销优惠金额：{{result.promotion_price}}</p>
                </div>
                <div class="box">
                    <p>促销主题：{{result.name}}</p>
                    <p>促销结束时间：{{result.end_date}}</p>
                    <p>赠送商品价值：{{result.given_total_price}}</p>
                </div>
              </div>
              <div class="biao">
                  <div class="table">
                    <el-table
                        :data="tongTableData"
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            label="交易时间">
                            <template slot-scope="scope">
                                <span >{{scope.row.sale_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="order_pay_no"
                            align="center"
                            label="交易流水号">
                        </el-table-column>
                        <el-table-column
                            prop="goods_name"
                            align="center"
                            label="商品">
                        </el-table-column>
                        <el-table-column
                            prop="total_price"
                            align="center"
                            label="订单金额">
                        </el-table-column>
                        <el-table-column
                            prop="pay_amount"
                            align="center"
                            label="实付金额">
                        </el-table-column>
                        <el-table-column
                            prop="promotion_price"
                            align="center"
                            label="优惠金额">
                        </el-table-column>
                        <el-table-column
                            prop="given_total_price"
                            align="center"
                            label="赠送商品价值">
                        </el-table-column>
                        <el-table-column
                            prop="given_goods_name"
                            align="center"
                            label="备注">
                        </el-table-column>
                    </el-table>
                    <pagination
					    v-show="tongji.total>0"
					    :total="tongji.total"
					    :page.sync="tongji.pageNum"
					    :limit.sync="tongji.pageSize"
					    @pagination="handleDelete"
					/>
                  </div>
              </div>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="xiangVisible = false">关闭</el-button>
          </div> -->
        </el-dialog> 
    </div>
</template>

<script>
// import icons from './requireIcons'
// import clipboard from '@/utils/clipboard'
import { getculist } from "@/api/cuxiaoguanli";
import { getyoulist } from "@/api/cuxiaoguanli";
import { addcu } from "@/api/cuxiaoguanli";
import { getcuyoulist } from "@/api/cuxiaoguanli";
import { stopcu } from "@/api/cuxiaoguanli";
import { seexiang } from "@/api/cuxiaoguanli";
import { chexiao } from "@/api/cuxiaoguanli";
import Pagination from "@/components/Pagination";
import { statistics } from "@/api/cuxiaoguanli";

export default {
	components: { Pagination },
    // name: 'Promotion',
    data() {
        return {
            dialogFormVisible: false, //控制查看框隐藏与显示
            //促销类型选择
            promotionTypeOptions: [
                {
                    value: null,
                    label: "全部"
                },
                {
                    value: "1",
                    label: "油品促销"
                },
                {
                    value: "2",
                    label: "商品促销"
                },
                {
                    value: "3",
                    label: "油商互动"
                }
            ],
            //状态选择
            stateOptions: [
                {
                    value: null,
                    label: "全部"
                },
                {
                    value: "0",
                    label: "待审批"
                },
                {
                    value: "2",
                    label: "生效中"
                },
                {
                    value: "1",
                    label: "未生效"
                },
                {
                    value: "-2",
                    label: "已失效"
                }
            ],
            seeData: {
                daysWeeks: []
            }, //查看信息
            //促销管理表格临时数据
            managementTable: [],
            //查询
			total: 0,
            chaxun:{
                pageNum: 1,
                pageSize: 10,
                activityType: '',//促销类型
                status: '',//状态
                activityNo: ''//促销单号
            },
            tongVisible:false,//统计框
            tongTableData:[],// 统计表格数据
            tongji:{
                total:0,
                pageNum:1,
                pageSize:10,
                id:''
            }, //促销统计
            result:'',//统计详情
        };
    },
    created() {
        this.getlist();
    },
    methods: {
    //获取
    getlist(){
      getculist(this.chaxun)
        .then(response => {
          console.log(response.data)
          this.managementTable=response.data.rows;
		  this.total = response.data.total;
          // for(let i=0;i<this.managementTable.length;i++){
          //   var a = getdate(this.managementTable[i].startDate)
          //   console.log(a)
          // }
        })
    },
    stop(index,row){
        this.$confirm('是否要停止该促销?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var data = {
                id:row.id,
                status:-1
            }
            stopcu(data)
                .then(response => {
                console.log(response.data)
                this.$message({
                    message: response.data.success,
                    type: 'success'
                });
                this.getlist()
                })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停止'
          });          
        });
      // var data ={
      //   activityId:row.id
      // }
      // console.log(data)
      // getcuyoulist(data)
      //   .then(response => {
      //     console.log('油站列表')
      //     console.log(response.data)
      //   })
    },
    //查看
    see(index, row) {
      this.dialogFormVisible = true
      // console.log(row.id)
      // console.log(index, row);
      var data ={
        id:row.id
      } 
      seexiang(data)
        .then(response => {
        //   console.log(response.data.detail)
          this.seeData = response.data.detail
          function getdate(a) {
            var now = new Date(a),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
            // return  now.toTimeString().substr(0, 8);
          }
          if(this.seeData.startTime){
            this.seeData.star =  new Date(this.seeData.startTime ).toTimeString().substr(0, 8);
          }else{
            this.seeData.star=''
          }
          if(this.seeData.endTime){
            this.seeData.end =  new Date(this.seeData.endTime ).toTimeString().substr(0, 8);
          }else{
            this.seeData.end=''
          }
          if(this.seeData.modifyTime){
            this.seeData.shenhe = getdate(this.seeData.modifyTime)
          }else{
            this.seeData.shenhe=''
          }
          if(this.seeData.createTime){
            this.seeData.shenqing = getdate(this.seeData.createTime)
          }else{
            this.seeData.shenqing=''
          }
        })
    },
    //修改
    modify(){
      var that = this;
      console.log(that.seeData.tbOilsPromotionTimeList[0].startTime)
      this.dialogFormVisible=false
      
    },
    // 撤回
    handleEdit(index, row) {
    //   console.log(index, row);
    this.$confirm('是否要撤回该促销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
            id:row.id,
        }
        chexiao(data)
            .then(response => {
            console.log(response.data)
            this.$message({
                message: '撤销成功',
                type: 'success'
            });
            this.getlist()
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤回'
        });          
      });

    },
    //统计
    handleDelete(index, row) {
        console.log( row);
        this.tongji.id = row.id
        statistics(this.tongji)
            .then(response => {
                console.log('统计')
                console.log(response.data)
                this.tongji.total = response.data.list.total
                this.tongTableData = response.data.list.rows
                this.result = response.data.result
            })
        this.tongVisible = true
    }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top {
    padding: 10px 20px;
}
// h3{
//   padding-left: 3.5%;
// }

.cu {
    display: flex;
    justify-content: flex-start;
}
.cu > .inp {
    margin-right: 35px;
}
.ipt {
    width: 250px;
}
.shenqing {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
}
.shenqing a + a {
    margin-left: 10px;
}
.biao {
    padding: 10px 20px;
    text-align: center;
}
.dialog-footer {
    text-align: center;
}
.box {
    margin-bottom: 20px;
}
.warp {
    background-color: #f6f7fb;
    // padding: 2%;
}
.main {
    min-height: calc(100vh - 181px);
    background-color: #fff;
    width: 100%;
    height: 100%;
}
.header {
    background-color: #fff;
    // height: 60px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f6f7fb;
}
.header h3 {
    display: inline-block;
    width: 100px;
    line-height: 60px;
    margin: 0;
}
.header h3 span {
    display: inline-block;
    width: 3px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 5px;
}
.table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
}
.ji{
    display: flex;
    justify-content: space-between;
}
.tong .biao{
    padding: 0;
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
    background-color: #f5f9fc;
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
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
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
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}
.avatar {
    width: 200px;
    height: 200px;
    display: block;
}
.box > span:nth-of-type(1) {
    display: inline-block;
    width: 100px;
}
.xia .block {
    display: flex;
    justify-content: space-between;
}
</style>