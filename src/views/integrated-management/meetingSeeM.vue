<template>
    <div class>
        <div class="header">
            <h3>
                <el-button circle @click="prev">
                    <i class="el-icon-arrow-left"></i>
                </el-button>查看详情
            </h3>
        </div>
        <div class="main">
            <el-form ref="addForm" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="加油站" prop="shortName">
                            {{ infoData.short_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="录入人" prop="creater">
                            {{ infoData.creater }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="录入日期" prop="createTime">
                            {{ infoData.create_time | dateTime }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="类型" prop="type">
                    <span v-for="item in typeList" :key="item.value" v-if="infoData.type == item.value">{{ item.label }}</span>
                </el-form-item>
                <el-form-item label="主题" prop="name">
                    {{ infoData.name }}
                </el-form-item>
                <el-form-item label="参加人员" prop="attendees">
                    {{ infoData.attendees }}
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    {{ infoData.content }}
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getMeetingById } from "@/api/meeting";
export default {
    name: "",
    data: () => ({
        typeList:[
            {
                label:'会议',
                value:1
            },
            {
                label:'活动',
                value:2
            },
            {
                label:'培训',
                value:3
            },
            {
                label:'日常学习',
                value:4
            },
            {
                label:'预案演练',
                value:5
            },
            {
                label:'其他',
                value:6
            },
        ],
        infoData:{
            shortName:'',
            creater:'',
            type:'',
            name:'',
            attendees:'',
            create_time:'',
            content:'',
        }
    }),
    mounted(){
        let id = this.$route.params.id
        if(id){
            getMeetingById({id:id}).then(res => {
                if(res.data){
                    this.infoData = res.data
                }
            });
        }else{
            this.$router.back()
        }
    },
    filters: {
        dateTime: function (value,division) {
            if(value){
                division = division || '-';
                var datetime = new Date(value);
                function g(val){
                    val < 10 && (val = '0' + val)
                    return val;
                }
                return datetime.getFullYear() + division + g((datetime.getMonth()+1)) + division + g(datetime.getDate())
                 // + ' ' + g(datetime.getHours()) + ':' + g(datetime.getMinutes())
            }
        }
    },
    methods: {
        prev() {
            this.$router.go(-1);
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
</style>