<template>
    <div class="warp todo">
        <!-- 集团的 订单管理-商品采购-查看  -->
        <div class="header">
            <h3>
                <span class="el-icon-arrow-left" @click="prev"></span>商品采购-查看
            </h3>
        </div>
        <el-form label-width="80" label-position="left">
            <div class='xinxi' style="border-bottom: 1px solid #e4e4e4;">
                <div>
                    <el-form-item label="采购单号：" >{{shangpinCaigouck.goodsPurchaseApplyInfo.orderNumber}}</el-form-item>
                    <el-form-item
                    label="状态："
                    v-if="shangpinCaigouck.goodsPurchaseApplyInfo.status==1"
                >待审批</el-form-item>
                <el-form-item
                    label="状态："
                    v-if="shangpinCaigouck.goodsPurchaseApplyInfo.status==5"
                >配送中</el-form-item>
                <el-form-item
                    label="状态："
                    v-if="shangpinCaigouck.goodsPurchaseApplyInfo.status==6"
                >已完成</el-form-item>
                </div>
                <div>
                     <el-form-item label="公司：">{{shangpinCaigouck.goodsPurchaseApplyInfo.companyName}}</el-form-item>
                <el-form-item
                    label="加油站："
                >{{shangpinCaigouck.goodsPurchaseApplyInfo.oilsStationShortName}}</el-form-item>
                </div>
                
                <div>
                    <el-form-item label="申请人：">{{shangpinCaigouck.goodsPurchaseApplyInfo.createrName}}</el-form-item>
                    <el-form-item
                    label="申请时间："
                >{{ shangpinCaigouck.goodsPurchaseApplyInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                </div>
            </div>
            <ul style="padding: 0;">
                    <li v-for="item in shangpinCaigouck.goodsList">
                        <div class="xinxi">
                            <div>
                                <el-form-item
                                    label="采购子订单号 :"
                                    label-width="110px"
                                >{{item[0].orderNumber}}</el-form-item>
                                <el-form-item
                                    label="收货时间 :"
                                    label-width="80px"
                                    v-if="item[0].receiveTime"
                                >{{item[0].receiveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                            </div>
                            <div>
                                <el-form-item label="供应商 :">{{item[0].supplierShortName}}</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==0"
                                >待审批</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==1"
                                >未收货</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==2"
                                >收货中</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==3"
                                >已完成</el-form-item>
                            </div>
                            
                            <div>
                                <el-form-item
                                    label="营业日 :"
                                    label-width="80px"
                                    v-if="shangpinCaigouck.goodsPurchaseApplyInfo.businessDay"
                                >{{ shangpinCaigouck.goodsPurchaseApplyInfo.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                                <el-form-item
                                    label="班次 :"
                                    label-width="70px"
                                    v-if="shangpinCaigouck.goodsPurchaseApplyInfo.shiftId"
                                >{{ shangpinCaigouck.goodsPurchaseApplyInfo.shiftId }}</el-form-item>
                            </div>
                        </div>
                        <el-table
                            :data="item"
                            style="width: 100%;"
                            :header-cell-style="{background:'#f5f7fa'}"
                        >
                            <el-table-column label="序号" align="center" min-width="70">
                                <template slot-scope="scope">
                                    <span v-if="item.length !== scope.$index+1">{{scope.$index+1}}</span>
                                    <span v-else>{{scope.row.lastName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="商品名称" align="center" min-width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.goodsName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订货数量" align="center" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.orderCount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="收货数量" align="center" min-width="100">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status!=2">{{ scope.row.receiveCount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" align="center" min-width="90">
                                <template slot-scope="scope">
                                    <span>{{scope.row.unit}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="生产日期" align="center" min-width="90">
                                <template slot-scope="scope">
                                    <span
                                        v-if="scope.row.status!=2 && scope.row.auditTime"
                                    >{{scope.row.auditTime | parseTime('{y}-{m}-{d}')}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </li>
                </ul>               

            <el-steps direction="vertical" space="70px" style="margin-top: 30px;" :active="10">
                <!--:active="1" -->
                <el-step
                    v-for="(item,index) in rizhide"
                    :key="index"
                    icon="el-icon-success"
                    :title="item.createTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}')"
                    :description="item.remark"
                ></el-step>
            </el-steps>
        </el-form>
    </div>
</template>


<script>
import { yewuDetail } from "@/api/shuju";
import { orderRiList } from '@/api/shangpin'
export default {
    name: "",
    data: () => ({
        id: "",
        orderNumber:'',
        supplierName:'',
        shangpinCaigouck: {
            goodsList: [],
            goodsPurchaseApplyInfo: {
                companyId: "",
                createTime: "",
                creater: "",
                id: "",
                oilsStationShortName: "",
                orderNumber: "",
                orderType: "",
                stationId: "",
                status: ""
            }
        },
        goodsckList: [],
        jujuede: "",
        rizhide: []
    }),
    created() {
        this.id = this.$route.query.id;
        this.orderNumber=this.$route.query.orderNumber;
        this.supplierName=this.$route.query.supplierName;

        this.getInfo();
    },
    methods: {
        getInfo() {
            yewuDetail({ id: this.id }).then(res => {
                let arr = [];
                this.shangpinCaigouck = res.data;
                this.shouHuoSum();
            });
            let datab = {
                orderId: this.id,
                orderNumber: this.orderNumber,
                supplierName:this.supplierName

            };
            orderRiList(datab).then(res => {
                console.log(res);
                this.rizhide = res.data;
            });
        },
        shouHuoSum(){
            this.shangpinCaigouck.goodsList.forEach((item)=>{
                let sum = 0;
                let sum1 = 0;

                item.forEach((item1,index)=>{
                    let sum2 = item1.receiveCount || 0;
                    if(item1.lastName){
                        item.splice(index,1)
                    }else{
                        sum += Number(item1.orderCount);
                        sum1 += Number(sum2);
                    }
                    
                })
                item.push({
                    lastName:'合计',
                    orderCount:sum,
                    receiveCount:sum1,
                })
            })
        },
        jujue(selection, row) {
            this.jujude = selection;
        },
        prev(){
            this.$router.go(-1)
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form{
    padding: 30px;
    background: #fff;
}
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
 .xinxi>div{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.xinxi>div .el-form-item{
    width: 50%;
}
</style>
<style scoped>
	@import url("./todo.scss");
</style>

