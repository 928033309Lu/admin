<template>
    <div class="warp">
        <!-- (集团)营销管理-短信发送-添加会员 -->
        <div class="header">
            <h3>
                <span class="el-icon-arrow-left" @click="prev"></span>添加会员
            </h3>
        </div>
        <div class="sai">
            <div class="shu">
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
                                :label="item.fullName"
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
                <div class="block">
                    <div class="left">
                        <el-input
                            style="width: 300px;"
                            v-model="screen.condition"
                            placeholder="会员号/手机号/会员名称"
                        ></el-input>
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        <span>会员注册时间</span>
                    </div>
                    <div class="right">
                        <!-- <el-date-picker
                            style="width: 170px;"
                            v-model="screen.registeredStart"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                        <span>-</span>
                        <el-date-picker
                            v-model="screen.registeredEnd"
                            style="width: 170px;"
                            type="datetime"
                            placeholder="选择日期时间"
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
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        <span>最后消费时间</span>
                    </div>
                    <div class="right">
                        <el-date-picker
                            v-model="xiaofeishijian"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                        <!-- <el-date-picker
                            v-model="screen.consumptionTimeStart"
                            type="datetime"
                            style="width: 170px;"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                        <span>-</span>
                        <el-date-picker
                            v-model="screen.consumptionTimeEnd"
                            type="datetime"
                            style="width: 170px;"
                            placeholder="选择日期时间"
                        ></el-date-picker>-->
                    </div>
                </div>
            </div>
            <div class="shu">
                <div class="block">
                    <div class="an">
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button type="primary" @click="reset">重置</el-button>
                    </div>
                </div>
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
                        <el-input style="width: 200px;" v-model="screen.amout" placeholder="请输入内容"></el-input>
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
                            style="width: 200px;"
                            v-model="screen.currentPoint"
                            placeholder="请输入内容"
                        ></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="table">
            <el-table
                ref="memberTable"
                stripe
                :data="memberData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="会员号" min-width="120">
                    <template slot-scope="scope">{{ scope.row.memberNo }}</template>
                </el-table-column>
                <el-table-column prop="username" label="会员名称"></el-table-column>
                <el-table-column prop="birthday" label="生日">
                    <template slot-scope="scope">
                        <span v-show="scope.row.birthday">
                            {{ scope.row.birthday | parseTime('{y}-{m}-{d}')}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="memberLevel" label="会员等级"></el-table-column>
                <el-table-column prop="amout" label="账户余额"></el-table-column>
                <el-table-column prop="currentPoint" label="积分"></el-table-column>
                <el-table-column prop="stationId" label="所属油站"></el-table-column>
                <el-table-column label="注册时间">
                    <template slot-scope="scope">
                        <span v-show="scope.row.createTime">
                            {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column min-width="100" label="最后消费时间">
                    <template slot-scope="scope">
                        <span v-show="scope.row.templateContent">
                            {{ scope.row.templateContent | parseTime('{y}-{m}-{d} {h}:{i}')}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-show="total>0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="limit"
                @pagination="query"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <div class="anniu">
                <el-button @click="templateVisible = false">取消</el-button>
                <el-button type="primary" @click="shaiEnt">确认</el-button>
            </div>
        </div>
    </div>
</template>


<script>
import { queryMember } from "@/api/huiyuanguanli";
import { queryAllMemberLevel } from '@/api/huiyuanguanli'
import { StationList } from '@/api/youpinbaobiao'
import { parseTime } from "@/utils";

export default {
    name: "",
    data: () => ({
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
            currentPoint: "",
            pageNum:1,
            pageSize:10,
        },
        zhuceshijian: "",
        xiaofeishijian: "",
        pickerOptions2: {
            shortcuts: [
                {
                    text: "最近一周",
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "最近一个月",
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit("pick", [start, end]);
                    }
                },
                {
                    text: "最近三个月",
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit("pick", [start, end]);
                    }
                }
            ]
        },
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
        stationOptions: [],
        levelOptions: [],
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
        memberData: [], //会员表格
        Num: 58,
        memberSelection:[],
        //分页
        total: 0,
        page: 1,
        limit: 10,
        currentPage: 1
    }),
    created() {
        this.query();
    },
    watch: {
        zhuceshijian: function(val, old) {
            this.screen.registeredStart = val[0] ? val[0] : null;
            this.screen.registeredEnd = val[1] ? val[1] : null;
        },
        xiaofeishijian: function(val, old) {
            this.screen.consumptionTimeStart = val[0] ? val[0] : null;
            this.screen.consumptionTimeEnd = val[1] ? val[1] : null;
        }
    },
    methods: {
        query() {
            this.screen.pageNum = this.page
            this.screen.pageSize = this.limit
            queryMember(this.screen).then(response => {
                // console.log(1111111111);
                console.log( response.data);
                this.total = response.data.memberList.total;
                this.memberData = response.data.memberList.rows;
                // console.log( this.memberData,);
            });
            var a = {};
            StationList(a).then(response => {
                // console.log('油站')
                // console.log(response.data)
                this.stationOptions = response.data;
            });
            var b = {};
            queryAllMemberLevel(b).then(response => {
                // console.log('会员等级')
                // console.log(response.data)
                this.levelOptions = response.data.list;
            });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.limit = val;
            this.query();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.page = val;
            this.query();
        },
        reset() {
            this.screen = {
                sendMonthArr: [],
                belongOils: "",
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
            };
        },
        handChange(val) {
            this.memberSelection = val;
            console.log(this.memberSelection)
        },
        shaiEnt() {
            // this.Num = this.memberSelection.length;
            var memberSelection = []
            for (let i = 0; i < this.memberSelection.length; i++) {
                memberSelection.push({
                    id:this.memberSelection[i].id,
                    phone:this.memberSelection[i].phone
                })
            }
            var screen = {
                sendMonthArr:this.screen.sendMonthArr,
                belongOils:this.screen.belongOils,
                memberLevelArr:this.screen.memberLevelArr,
                condition:this.screen.condition,
                registeredStart:this.screen.registeredStart,
                registeredEnd:this.screen.registeredEnd,
                consumptionTimeStart:this.screen.consumptionTimeStart,
                consumptionTimeEnd:this.screen.consumptionTimeEnd,
                amoutIndex:this.screen.amoutIndex,
                amout:this.screen.amout,
                currentPointIndex:this.screen.currentPointIndex,
                currentPoint:this.screen.currentPoint,
            }
            if(this.$route.query.id==1){
                this.$router.push({
                    path:'/marketing/marketing-account',
                    query:{
                        memberSelection:memberSelection,
                        screen:this.screen
                    }
                })
            }else{
                this.$router.push({
                    path:'/marketing/marketing-account-m',
                    query:{
                        memberSelection:memberSelection,
                        screen:screen
                    }
                })
            }
        },
        prev() {
            this.$router.go(-1);
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
}
.header h3 {
    display: inline-block;
    width: 500px;
    line-height: 60px;
    margin: 0;
}
.header h3 span {
    display: inline-block;
    width: 30px;
    height: 25px;
    vertical-align: middle;
    background-color: none;
    margin-right: 5px;
    cursor: pointer;
}
.warp {
    background-color: #f6f7fb;
    padding: 20px;
}
.main {
    min-height: calc(100vh - 120px);
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
h5 {
    margin: 0;
}
.notice {
    margin: 10px 0 20px;
    background-color: #f5f9fc;
    padding: 1%;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
}
.notice p {
    font-size: 14px;
}
.edit .btn {
    margin: 20px 0;
    overflow: hidden;
}
.btn .left {
    float: left;
}
.btn .right {
    float: right;
    font-size: 14px;
}
.btn .right .el-button {
    margin-left: 20px;
}
.centent {
    position: relative;
}
.centent .wordsNum {
    position: absolute;
    right: 10px;
    bottom: 7px;
    font-size: 14px;
    color: grey;
}
.timing {
    margin: 20px 0;
}
.information {
    width: 250px;
    height: 360px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    margin-top: 20px;
}
.information .top {
    display: flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    border-bottom: 1px solid #e4e7ed;
    padding: 0 5px;
}
.top .left,
.top .right {
    line-height: 37px;
}
.top .left span {
    font-size: 12px;
    display: inline-block;
    line-height: 14px;
    border-radius: 7px;
    padding: 0 4px;
    background-color: #065ff1;
}
.left i {
    color: #065ff1;
    font-weight: 700;
}
.right .svr_sec {
    color: #065ff1;
}
.center {
    text-align: center;
}
.top p {
    margin: 0;
    font-size: 12px;
}
.duan {
    margin: 20px 0;
}
.duan p {
    margin: 0;
    text-align: center;
    font-size: 14px;
    color: grey;
}
.box {
    position: relative;
    margin-left: 15px;
    width: 175px;
    min-height: 85px;
    border: 2px solid #e4e7ed;
    background-color: #e6e5ea;
    padding: 5px;
    font-size: 14px;
    border-radius: 10px;
}
.box:before {
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
.btn {
    text-align: center;
    margin: 20px 0;
}
.dialog-footer .el-button:nth-of-type(2) {
    margin-left: 200px;
}
.dialog-footer {
    text-align: center;
}
.table {
    border: 1px solid #e4e7ed;
}
.send .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.send p {
    font-size: 16px;
    line-height: 36px;
}
.zuo {
    width: 240px;
}
.zhong {
    width: 180px;
}
.you {
    width: 280px;
}
.nei {
    min-height: 100px;
    padding: 10px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
}
.ipt {
    margin-bottom: 10px;
}
.ipt span {
    line-height: 36px;
}
.ipt .left,
.ipt .right {
    display: inline-block;
}
.ipt .left {
    vertical-align: top;
}
.sai {
    display: flex;
    justify-content: space-between;
}
.sai .shu .block {
    line-height: 36px;
}
.shu .left,
.right {
    display: inline-block;
}
.shu .block {
    margin-bottom: 10px;
}
.shu .left {
    line-height: 60px;
}
.an {
    text-align: right;
}
.el-icon-arrow-left {
    margin-right: 10px;
}
.sai {
    background: #fff;
    padding: 20px;
}
.warp {
    background-color: #fff;
}
.main {
    min-height: calc(100vh - 191px);
    background-color: #fff;
    width: 100%;
    height: 100%;
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
    // border-bottom: 0;
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
// .anniu .el-button {
//     margin-left: 20%;
// }
.el-radio-group {
    margin-left: 50px;
}
.el-pagination{
    text-align: center;
    margin: 20px 0;
}
</style>
