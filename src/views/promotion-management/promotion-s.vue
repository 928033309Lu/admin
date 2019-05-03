<template>
    <div class="warp">
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>查看详情
            </h3>
        </div>
        <div class="block">
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
                                >购买 {{ scope.row.commodity.goodsName }} 满{{scope.row.discount}}，赠送{{scope.row.givingNum}}个{{scope.row.givingName}}</span>
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
        </div>
    </div>
</template>

<script>

import { seexiang } from "@/api/cuxiaoguanli";

export default {
    name: "OilApplicationDemo",
    data() {
        return {
            seeData: {
                daysWeeks: []
            }, //查看信息
            dialogFormVisible: true
        };
    },
    created() {
        var data = {
            id: this.$route.query.id
        };
        seexiang(data).then(response => {
            console.log(response.data.detail);
            this.seeData = response.data.detail;
            function getdate(a) {
                var now = new Date(a),
                    y = now.getFullYear(),
                    m = now.getMonth() + 1,
                    d = now.getDate();
                return (
                    y +
                    "-" +
                    (m < 10 ? "0" + m : m) +
                    "-" +
                    (d < 10 ? "0" + d : d) +
                    " " +
                    now.toTimeString().substr(0, 8)
                );
                // return  now.toTimeString().substr(0, 8);
            }
            if (this.seeData.startTime) {
                this.seeData.star = new Date(this.seeData.startTime)
                    .toTimeString()
                    .substr(0, 8);
            } else {
                this.seeData.star = "";
            }
            if (this.seeData.endTime) {
                this.seeData.end = new Date(this.seeData.endTime)
                    .toTimeString()
                    .substr(0, 8);
            } else {
                this.seeData.end = "";
            }
            if (this.seeData.modifyTime) {
                this.seeData.shenhe = getdate(this.seeData.modifyTime);
            } else {
                this.seeData.shenhe = "";
            }
            if (this.seeData.createTime) {
                this.seeData.shenqing = getdate(this.seeData.createTime);
            } else {
                this.seeData.shenqing = "";
            }
        });
    },
    mounted() {},
    methods: {
        prev() {
            this.$router.go(-1);
        }
    }
};
</script>
<style scoped>
.header {
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    height: 60px;
    padding-left: 1%;
}
.header h3 {
    line-height: 60px;
    margin: 0;
}
.block > .chakan,
.block > .biao,
.block > .xia,
.block > .footer {
    font-size: 16px;
    line-height: 40px;
    background-color: #fff;
    padding: 30px;
    width: 100%;
    margin: 20px auto;
}
</style>
 