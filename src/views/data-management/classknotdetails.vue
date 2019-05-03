<template>
    <div class="warp classkontdetails">
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>班结详情
            </h3>
            <div class="btn">
                <el-button type="primary" @click="youpin(1)">油品销售报表</el-button>
                <el-button type="primary" @click="youpin(2)">商品进销存报表</el-button>
                <el-button type="primary" @click="youpin(3)">商品销售报表</el-button>
                <el-button type="primary" @click="yichang">异常支付</el-button>
            </div>
        </div>
        <div class="main">
            <div class="top">
                <div class="block">
                    <p>油站：{{information.stationName}}</p>
                    <p>营业日：{{information.businessDate}}</p>
                </div>
                <div class="block">
                    <p>所属公司：{{information.companyName}}</p>
                    <p>开班时间：{{information.createDate}}</p>
                </div>
                <div class="block">
                    <p>班结编号：{{information.id}}</p>
                    <p>结班时间：{{information.modifyDate}}</p>
                </div>
                <div class="block">
                    <p>状态：
                        <span v-show="information.status==1">营业中</span>
                        <span v-show="information.status==0">已班结</span>
                        <!-- {{information.status}} -->
                    </p>
                </div>
            </div>
            <div class="footer">
                <p class="_flag">总营业额</p>
                <div class="table">
                    <el-table :data="turnoverData" row-class-name="white-row" style="width: 100%">
                        <el-table-column label="实收金额" align="center">
                            <el-table-column prop="heji" align="center" label="合计"></el-table-column>
                            <el-table-column prop="cashPrice" align="center" label="现金"></el-table-column>
                            <el-table-column prop="weChatPrice" align="center" label="微信"></el-table-column>
                            <el-table-column prop="aliPayPrice" align="center" label="支付宝"></el-table-column>
                            <el-table-column prop="unionPayPrice" align="center" label="银联卡"></el-table-column>
                            <el-table-column prop="memberCardPrice" align="center" label="会员"></el-table-column>
                            <el-table-column prop="oldMemberCardPrice" align="center" label="老会员"></el-table-column>
                        </el-table-column>
                        <el-table-column label="折扣" align="center">
                            <el-table-column prop="couponPrice" align="center" label="电子券"></el-table-column>
                            <el-table-column prop="memberDiscountPrice" align="center" label="会员卡"></el-table-column>
                            <el-table-column prop="promotionPrice" align="center" label="促销"></el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <p class="_flag">收银机营业额</p>
                <div class="table">
                    <el-table :data="cashierData" row-class-name="white-row" style="width: 100%;text-align: center;">
                        <!-- <el-table-column prop="cashierNumber" align="center" label="收银编号" width="130"></el-table-column> -->
                        <el-table-column prop="userName" align="center" label="收银员"></el-table-column>
                        <el-table-column prop="deviceName" align="center" label="收银机"></el-table-column>
                        <!-- <el-table-column prop="startTime" align="center" label="开始时间"></el-table-column> -->
                        <!-- <el-table-column prop="endTime" align="center" label="结束时间"></el-table-column> -->
                        <el-table-column prop="cashAmount" align="center" label="收银金额"></el-table-column>
                        <!-- <el-table-column prop="state" align="center" label="状态"></el-table-column> -->
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="cashierSee(scope.row)" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <p class="_flag">油罐读数</p>
                <div class="table">
                    <el-table
                        :data="oiltankData"
                        show-summary
                        :summary-method="getSummaries"
                        row-class-name="white-row"
                        style="width: 100%"
                    >
                        <el-table-column prop="oilcanNo" align="center" label="油罐号"></el-table-column>
                        <el-table-column prop="beginVolume" align="center" label="开班体积"></el-table-column>
                        <el-table-column label="液位仪" align="center">
                            <el-table-column prop="waterHigh" align="center" label="水高"></el-table-column>
                            <el-table-column prop="oilHigh" align="center" label="油高"></el-table-column>
                            <el-table-column prop="temperature" align="center" label="温度"></el-table-column>
                            <el-table-column prop="endVolume" align="center" label="结班体积（VT）"></el-table-column>
                        </el-table-column>
                        <el-table-column label="手工" align="center">
                            <el-table-column
                                prop="handEndVolume"
                                align="center"
                                label="结班体积（V20）"
                                class-name="r-cell"
                            ></el-table-column>
                        </el-table-column>
                        <el-table-column prop="standardVolume" align="center" label="结班标准体积"></el-table-column>
                        <el-table-column prop="applyVolume" align="center" label="收油量"></el-table-column>
                        <el-table-column prop="outputVolume" align="center" label="出油量"></el-table-column>
                        <el-table-column prop="settlementVolume" align="center" label="销售量"></el-table-column>
                        <el-table-column prop="rechargeVolume" align="center" label="回灌量"></el-table-column>
                        <el-table-column prop="differenceVolume" align="center" label="差异"></el-table-column>
                    </el-table>
                </div>
                <p class="_flag">油枪读数</p>
                <div class="table">
                    <el-table
                        :data="oilGunPumpsData"
                        show-summary
                        border
                        :summary-method="Summaries"
                        row-class-name="white-row"
                        style="width: 100%"
                    >
                        <el-table-column prop="oilgunNo" align="center" label="油枪号"></el-table-column>
                        <el-table-column prop="oilcanNo" align="center" label="油罐号"></el-table-column>
                        <el-table-column prop="beginPumpCode" align="center" label="开班泵码"></el-table-column>
                        <el-table-column prop="endPumpCode" align="center" label="结班泵码"></el-table-column>
                        <el-table-column prop="outputAmount" align="center" label="枪出量"></el-table-column>
                        <el-table-column prop="settlementAmount" align="center" label="销售量"></el-table-column>
                        <el-table-column prop="differenceAmount" align="center" label="差异"></el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 异常支付交易 -->
            <el-dialog :visible.sync="yichangShow" width="50%" title="异常支付交易">
                <div class="edit">
                    <el-table
                        :data="yichangData"
                        style="width: 100%"
                    >
                        <el-table-column prop="name" align="center" label="交易流水号"></el-table-column>
                        <el-table-column prop="name" align="center" label="订单号"></el-table-column>
                        <el-table-column prop="name" align="center" label="收银机"></el-table-column>
                        <el-table-column prop="name" align="center" label="交易时间"></el-table-column>
                        <el-table-column prop="name" align="center" label="支付方式"></el-table-column>
                        <el-table-column prop="name" align="center" label="金额"></el-table-column>
                    </el-table>
                </div>
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="yichangShow = false">取消</el-button>
                </div> -->
            </el-dialog>
            <!-- 收银员报表 -->
            <el-dialog :visible.sync="shouShow" width="50%" title="收银员报表">
                <div class="edit">
                    <div class="top">
                        <div class="box">
                            <div class="block">营业日：{{information.businessDate}}</div>
                            <div class="block">收银员：{{cashierSeeData.userName}}</div>
                        </div>
                        <div class="box">
                            <div class="block">班结编号：{{id}}</div>
                            <div class="block">收银机：{{cashierSeeData.deviceName}}</div>
                        </div>
                        <!-- <div class="box">
                            <div class="block">收银编号：{{}}</div>
                            <div class="block">时间：{{}}</div>
                        </div> -->
                        <!-- <div class="box">
                            <div class="block">状态：{{}}</div>
                        </div> -->
                    </div>
                    <div class="biao">
                        <div class="table">
                            <el-table
                                :data="tableData3"
                                style="width: 100%">
                                <el-table-column label="实收金额" align="center">
                                    <el-table-column
                                        prop="heji"
                                        align="center"
                                        label="合计">
                                    </el-table-column>
                                    <el-table-column
                                        prop="cashPrice"
                                        align="center"
                                        label="现金">
                                    </el-table-column>
                                    <el-table-column
                                        prop="weChatPrice"
                                        align="center"
                                        label="微信">
                                    </el-table-column>
                                    <el-table-column
                                        prop="aliPayPrice"
                                        align="center"
                                        label="支付宝">
                                    </el-table-column>
                                    <el-table-column
                                        prop="unionPayPrice"
                                        align="center"
                                        label="银联卡">
                                    </el-table-column>
                                    <el-table-column
                                        prop="memberCardPrice"
                                        label="会员"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        prop="oldMemberCardPrice"
                                        label="老会员"
                                        align="center">
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="折扣" align="center">
                                    <el-table-column
                                        prop="discountPrice"
                                        label="电子券"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        prop="memberDiscountPrice"
                                        label="会员卡"
                                        align="center">
                                    </el-table-column>
                                    <el-table-column
                                        prop="promotionPrice"
                                        label="促销"
                                        align="center">
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="shouShow = false">取消</el-button>
                </div> -->
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getShiftUserLists } from "@/api/shuju";
import { detail } from "@/api/shuju";
import { cashierDetail } from "@/api/shuju";

export default {
    name: "knotdetailsDemo",
    data() {
        return {
            businessDay: "", //营业日
            stationName: "", //加油站
            company: "", //公司
            openingHours: "", //开班时间
            classTime: "", //结班时间
            state: "", //状态
            classNumber: "", //班结编号
            information:'', //基本信息
            //总营业额数据
            turnoverData: [],
            //收银机营业额数据
            cashierData: [],
            //油罐读数表格数据
            oiltankData: [],
            yichangShow:false, //控制异常支付弹框的显示与隐藏
            yichangData:[], //异常支付表格数据
            shouShow:false, //控制收银查看弹框的显示与隐藏
            tableData3:[], //收银查看表格数据
            id:'', //传入的班结id
            oilGunPumpsData:[], //油枪读数表格数据
            cashierSeeData:[], //收银机营业额详情
        };
    },
    mounted() {
        this.get();
    },
    methods: {
        get(){
            this.id = this.$route.query.id;
            var data = {
                id:this.id
            }
            detail(data).then(response => {
                console.log(response.data);
                this.information = response.data;
                this.turnoverData = [];
                this.turnoverData.push(response.data.statisticsOrderTo);
                // oilCanPumps 油罐读数
                this.oiltankData = response.data.statisticsOrderTo.oilCanPumps;
                // oilGunPumps 油枪读数
                this.oilGunPumpsData = response.data.statisticsOrderTo.oilGunPumps;
                this.cashierData = response.data.statisticsOrderTo.cashierTurnovers;
                let heji = (response.data.statisticsOrderTo.cashPrice+response.data.statisticsOrderTo.weChatPrice+response.data.statisticsOrderTo.aliPayPrice+response.data.statisticsOrderTo.unionPayPrice+response.data.statisticsOrderTo.memberCardPrice+response.data.statisticsOrderTo.oldMemberCardPrice).toFixed(2);
                this.turnoverData[0].heji = heji;
            });
        },
        //返回上一页
        prev() {
            this.$router.go(-1);
        },
        //前6位不参与合计
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "总计";
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += "";
                } else {
                    sums[index] = "";
                }
                if (index === 1) {
                    sums[index] = "";
                    return;
                }
                if (index === 2) {
                    sums[index] = "";
                    return;
                }
                if (index === 3) {
                    sums[index] = "";
                    return;
                }
                if (index === 4) {
                    sums[index] = "";
                    return;
                }
                if (index === 5) {
                    sums[index] = "";
                    return;
                }
            });
            return sums;
        },
        //前2位不参与合计
        Summaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "总计";
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += "";
                } else {
                    sums[index] = "";
                }
                if (index === 1) {
                    sums[index] = "";
                    return;
                }
            });
            return sums;
        },
        youpin(n) {
            if(n==1){
                this.$router.push({
                    path:"/management/management-oilSalesDaily",
                    query:{
                        id:this.id
                    } 
                });
            }else if(n==2){
                this.$router.push({
                    path:"/management/management-pands",
                    query:{
                        id:this.id
                    } 
                });
            }else if(n==3){
                this.$router.push({
                    path:"/management/management-orderSalesDaily",
                    query:{
                        id:this.id
                    } 
                });
            }
        },
        yichang(){
            this.yichangShow = true;
        },
        cashierSee(row){
            this.shouShow = true;
            this.cashierSeeData = row;
            var data = {
                shiftUserId:row.shiftUserId,
                deviceId:row.deviceId,
                userId:row.userId
            }
            // console.log(data)
            cashierDetail(data).then(response => {
                console.log(response.data);
                this.tableData3 = [];
                let heji = (response.data.cashPrice+response.data.weChatPrice+response.data.aliPayPrice+response.data.unionPayPrice+response.data.memberCardPrice+response.data.oldMemberCardPrice).toFixed(2);
                this.tableData3.push(response.data);
                this.tableData3[0].heji = heji;
            });
        },
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
    // padding: 20px;
}

.main {
    min-height: calc(100vh - 180px);
    background-color: #fff;
    width: 100%;
    height: 100%;
}
.header {
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    height: 60px;
    padding-left: 1%;
    padding-right: 1%;
}
.header h3 {
    line-height: 60px;
    margin: 0;
    float: left;
    width: 200px;
}
.header .btn {
    float: right;
    height: 60px;
    line-height: 60px;
}
.header .btn .el-button {
    margin-left: 10px;
}
.top {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    border-bottom: 1px solid #ededed;
    font-size: 14px;
}
.footer {
    padding: 0 40px;
}
p {
    font-size: 14px;
}
.table {
    border: 1px solid #ededed;
}
.edit .top .box .block{
    line-height: 36px;
}
.top .block p{
    line-height: 36px;
}
._flag{
    margin-top: 36px;
}

</style>
<style >
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th ,
.el-table thead.is-group th{
    background-color: #f5f9fc;
}
h3 .el-button--medium.is-circle {
    border: 0;
}
.el-table .cell,
.el-table th div {
    padding: 0;
}
.r-cell > div {
    color: #fb858b;
}
.classkontdetails .table .el-table__body .white-row{
    background-color: #fff;
}
.classkontdetails .el-table__footer-wrapper tbody td{
    background-color: #fff;
}
</style>