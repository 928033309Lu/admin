<template>
    <div class="warp todo">
        <!-- 油站的  油品业务-油品采购-查看 -->
        <div class="header">
            <h3>
                <span class="el-icon-arrow-left" @click="prev"></span>油品采购-查看
            </h3>
        </div>
        <el-form label-width="110" label-position="left">
            <div class="mian_ord">
                <div class="shang">
                    <el-form-item
                        label="所属营业日："
                    >{{zhuxinxi.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item label="所属班次：">{{zhuxinxi.shiftId}}</el-form-item>
                    <el-form-item
                        label="订单审核时间："
                    >{{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item label="状态：">已完成</el-form-item>
                </div>
                <div class="xinxi">
                    <ul class="dade">
                        <li>
                            <div
                                class="title"
                                style="width: 100%;font-weight: bold;color: red;font-size: 15px;"
                            >油品单信息：</div>
                            <div class="neirong">
                                <ul class="limiande">
                                    <li>
                                        <div>
                                            加油站 :
                                            <span>{{zhuxinxi.oilsStationName}}</span>
                                        </div>
                                        <div>
                                            油库 :
                                            <span>{{youchuku.supplierName}}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            油品 :
                                            <span>{{youguige.oilsSpecName}}</span>
                                        </div>
                                        <div>配送订单号 :
                                            <br>
                                            <span>{{youchuku.orderNumber}}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            油仓号 :
                                            <span>{{zhuxinxi.billType}}</span>
                                        </div>
                                        <div>
                                            转换体积 :
                                            <span>{{youchuku.switchLitre}}升</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            原发密度 :
                                            <span>{{zhuxinxi.primaryDensity}}kg/m³</span>
                                        </div>
                                        <div>
                                            原发重量 :
                                            <span>{{zhuxinxi.primaryWeight}}kg</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            出库单号 :
                                            <span>{{youchuku.outOrderNum}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <div
                                class="title"
                                style="width: 100%;font-weight: bold;color: red;font-size: 15px;"
                            >罐车测量信息：</div>
                            <div class="neirong">
                                <ul class="limiande">
                                    <li>
                                        <div>
                                            实测温度 :
                                            <span>{{guanchexinxi.measuringTemperature}}℃</span>
                                        </div>
                                        <div>
                                            实测密度 :
                                            <span>{{guanchexinxi.measuringDensity}}kg/m³</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            实测标密度 :
                                            <span>{{guanchexinxi.standardDensity}}kg/m³</span>
                                        </div>
                                        <div>
                                            是否有水 :
                                            <span v-if="guanchexinxi.isHaveWater==0">否</span>
                                            <span v-if="guanchexinxi.isHaveWater==1">是</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <div class="shang guan">
                        <div class="title" style="width: 100%;">
                            <div
                                style="width: 100%;font-weight: bold;color: red;font-size: 15px;"
                            >实收信息：</div>
                        </div>
                        <el-form-item
                            label="订单审核时间："
                        >{{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item label="状态：">已完成</el-form-item>
                    </div>

                    <div class="guan" v-for="item in tableData3">
                        <div class="title">
                            <div
                                style="width: 100%;font-weight: bold;color: red;font-size: 15px;"
                            >实收详情：</div>
                            <div>开始时间：{{item[0]["kaishi"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
                            <div>结束时间：{{item[0]["jieshu"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
                        </div>
                        <div>
                            <el-table
                                :data="item"
                                fit
                                style="width: 100%"
                                :span-method="arraySpanMethod"
                            >
                                <el-table-column
                                    prop="date"
                                    :label="item[0]['guanhao']"
                                    align="center"
                                ></el-table-column>
                                <el-table-column label="液位仪" align="center">
                                    <el-table-column prop="yougao" label="油高mm" align="center"></el-table-column>
                                    <el-table-column prop="shuigao" label="水高mm" align="center"></el-table-column>
                                    <el-table-column prop="wendu" label="温度℃" align="center"></el-table-column>
                                    <el-table-column prop="midu" label="密度kg/m³" align="center"></el-table-column>
                                    <el-table-column prop="youtiji" label="油体积L" align="center"></el-table-column>
                                </el-table-column>
                                <el-table-column label="手工" align="center">
                                    <el-table-column prop="bztiji" label="标准体积L" align="center"></el-table-column>
                                </el-table-column>
                                <el-table-column prop="bztijiL" label="标准体积L" align="center"></el-table-column>
                                <el-table-column prop="zhongliang" label="重量kg" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>


<script>
import { oilDingXiu } from "@/api/shuju";
export default {
    name: "",
    data: () => ({
        zhuxinxi: [],
        id: "",
        youshouyou: {},
        youguanshuju: {},
        youchuku: {},
        youguige: {},
        guanchexinxi: {},
        tableData3: {}
    }),
    created() {
        this.id = this.$route.query.id;
        this.getInfo();
    },
    methods: {
        getInfo() {
            oilDingXiu({ id: this.id }).then(res => {
                console.log(res);
                this.zhuxinxi = res.data.oilsPurchaseApplyInfo;
                this.youbuzhou = res.data.oilsOrderLogInfoList;
                if (
                    res.data.oilsPurchaseApplyInfo.status == 5 ||
                    res.data.oilsPurchaseApplyInfo.status == 6
                ) {
                    this.youchuku = res.data.oilsPurchaseOutputInfo;
                    this.youyunshu = res.data.oilsPurchaseTransportInfo;
                    this.youguige = res.data.oilsPurchaseApplySupplierInfo;
                }

                if (res.data.oilsPurchaseApplyInfo.status == 6) {
                    this.guanchexinxi = res.data.oilCarMeasureInfo;
                    this.youshouyou = res.data.oilsOrderRecordInfo;
                    this.youguanshuju = res.data.oilsFlowInfos;
                    console.log(this.youguanshuju);

                    this.tableData3 = [];
                    this.youguanshuju[0].forEach(item => {
                        let data = [
                            {
                                date: "卸前数据",
                                guanhao: "",
                                yougao: "",
                                shuigao: "",
                                wendu: "",
                                midu: "",
                                youtiji: "",
                                bztiji: "",
                                bztijiL: "",
                                zhongliang: "",
                                kaishi: "",
                                jieshu: ""
                            },
                            {
                                date: "卸后数据",
                                yougao: "",
                                shuigao: "",
                                wendu: "",
                                midu: "",
                                youtiji: "",
                                bztiji: "",
                                bztijiL: "",
                                zhongliang: ""
                            },
                            {
                                date: "收油体积",
                                yougao: "",
                                wendu: "收油重量",
                                midu: "",
                                bztiji: "期间加油",
                                bztijiL: ""
                            }
                        ];
                        data[0].guanhao = eval(item.oilcanNo) + "号罐";
                        data[0].yougao = item.frontOilHigh;
                        data[0].shuigao = item.frontWaterHigh;
                        data[0].wendu = item.frontTemperature;
                        data[0].midu = item.frontDensity;
                        data[0].youtiji = item.frontOilVolume;
                        data[0].bztiji = item.frontManualVolume;
                        data[0].bztijiL = item.frontStandardVolume;
                        data[0].zhongliang = item.frontWeight;

                        data[0].kaishi = item.createTime;
                        data[0].jieshu = item.modifyTime;

                        data[1].yougao = item.afterOilHigh;
                        data[1].shuigao = item.afterWaterHigh;
                        data[1].wendu = item.afterTemperature;
                        data[1].midu = item.afterDensity;
                        data[1].youtiji = item.afterOilVolume;
                        data[1].bztiji = item.afterManualVolume;
                        data[1].bztijiL = item.afterStandardVolume;
                        data[1].zhongliang = item.afterWeight;

                        data[2].yougao = item.actualVolume;
                        data[2].midu = item.afterWeight;
                        data[2].bztijiL = item.periodOilVolume;

                        this.tableData3.push(data);
                    });
                }

                console.log(this.tableData3);
            });
        },
        prev(){
            this.$router.go(-1)
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
}
.main {
    min-height: calc(100vh - 191px);
    background-color: #fff;
    width: 100%;
    height: 100%;
}
.mian_ord{
    background: #fff;
    padding: 20px;
}
.header {
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f6f7fb;
}
.header h3 {
    display: inline-block;
    width: 500px;
    line-height: 60px;
    margin: 0;
}
.header h3 span {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    background-color: none;
    margin-right: 5px;
    cursor: pointer;
}
.top {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.date {
    padding: 0 10px;
}
.date > .el-button {
    margin-right: 20px;
    font-size: 14px;
    line-height: 36px;
    color: black;
}
.date > .el-button:focus {
    color: #409eff;
}
.xuan span {
    font-size: 14px;
    line-height: 36px;
}
.date,
.xuan {
    margin-bottom: 10px;
}
.xuan .el-select:nth-of-type(1) {
    margin-right: 20px;
}
p {
    font-size: 14px;
}
.biao {
    padding: 10px 20px;
    text-align: center;
}
.table {
    border: 1px solid #ededed;
    border-bottom: 0;
    margin-top: 10px;
}
.dao {
    display: inline-block;
}
.dbox {
    display: flex;
    justify-content: space-between;
}
.dbox .box {
    width: 25%;
}
.dbox .el-input {
    width: 80%;
}
.riqi {
    margin-top: 20px;
}
.leixing {
    margin-top: 20px;
}
.leixing .el-input {
    width: 90%;
    margin-left: 20px;
}
.zhuti {
    margin-top: 20px;
}
.zhuti .el-input {
    width: 90%;
    margin-left: 50px;
}
.neirong {
    margin-top: 20px;
}
.neirong span {
    vertical-align: top;
}
.neirong .el-textarea {
    width: 90%;
    margin-left: 50px;
}
.anniu {
    margin-top: 20px;
}
.anniu .el-button {
    margin-left: 20%;
}
.el-radio-group {
    margin-left: 50px;
}
</style>
<style scoped>
	@import url("../dispatch/todo.scss");
</style>
