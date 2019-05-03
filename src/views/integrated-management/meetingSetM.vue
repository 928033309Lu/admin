<template>
    <div class>
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>编辑内容
            </h3>
        </div>
        <div class="main">
            <div class="dbox">
                <div class="box">
                    <span>加油站</span>
                    <el-select @change="change" clearable v-model="station" placeholder="请选择">
                        <el-option
                            v-for="item in stationOptions"
                            :key="item.id"
                            :label="item.station_name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="box">
                    <span>录入人</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
                <div class="box">
                    <span>状态</span>
                    <el-select v-model="zhuangtaixuanze" clearable @change="fenLeiChange" placeholder="请选择">
                        <el-option
                            v-for="item in zhuangtai"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="riqi">
                <span>录入日期</span>
                <el-date-picker v-model="date" type="date" clearable placeholder="选择日期"></el-date-picker>
            </div>
            <div class="leixing">
                <span>类型</span>
                <el-radio-group v-model="leixing">
                    <el-radio :label="1">会议</el-radio>
                    <el-radio :label="2">活动</el-radio>
                    <el-radio :label="3">培训</el-radio>
                    <el-radio :label="4">日常学习</el-radio>
                    <el-radio :label="5">预案演练</el-radio>
                    <el-radio :label="6">其他</el-radio>
                </el-radio-group>
            </div>
            <div class="zhuti">
                <span>主题</span>
                <el-input placeholder="主题"></el-input>
            </div>
            <div class="leixing">
                <span>参加人员</span>
                <el-input placeholder="参加人员"></el-input>
            </div>
            <div class="neirong">
                <span>内容</span>

                <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="neirong"></el-input>
            </div>
            <div class="anniu">
                <el-button type="primary" @click="jiluVisible = false">保存</el-button>
                <el-button type="primary" @click="jiluVisible = false">提交</el-button>
                <el-button type="primary" @click="jiluVisible = false">关闭</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "",
    data: () => ({
        station: "", //公司
        stationOptions: [{}], //油站选择
        date:'',
        leixing:'',
        neirong:'',
        zhuangtaixuanze: "", //品号选择
        zhuangtai: [
                {
                    value: 0,
                    label: "全部"
                },
                {
                    value: 1,
                    label: "草稿"
                },
                {
                    value: 2,
                    label: "已提交"
                }
            ], //品号
    }),
    methods: {
        prev() {
            this.$router.go(-1);
        },
        change() {
            var data = {
                companyId: this.company
            };
            StationList(data).then(response => {
                console.log(response.data);
                this.stationOptions = response.data;
            });
        },
        fenLeiChange() {
            this.searchKey = "";
            var data = {
                showType: this.fangshixuanze
            };
            console.log(data);
            report(data).then(response => {
                console.log(response.data);
                if (this.fangshixuanze == 1) {
                    this.list = response.data.list;
                    this.listSub = response.data.listSub;
                } else {
                    this.tableData = response.data.list;
                }

                this.listLoading = false;
            });
        },
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
    padding: 30px;
}
.header {
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #f6f7fb;
}
.header .box {
    line-height: 60px;
}
.header h3 {
    display: inline-block;
    line-height: 60px;
    margin: 0;
    margin-right: 10px;
}
.header h3 span {
    display: inline-block;
    width: 3px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 5px;
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
.box {
    margin: 0 10px;
}
.box > span {
    width: auto;
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