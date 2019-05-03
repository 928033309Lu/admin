<template>
    <div class="warp">
        <div class="header">
            <div class="top">
                <h3>
                    <span></span>日志记录
                </h3>
                <div class="box">
                    <span>加油站</span>
                    <el-select
                        @change="changeScreen"
                        v-model="listQuery.stationId"
                        clearable
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
                <div class="box">
                    <span>状态</span>
                    <el-select v-model="listQuery.status"  clearable @change="changeScreen" placeholder="请选择">
                        <el-option
                            v-for="item in zhuangtai"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="box">
                    <!-- <el-button type="primary" @click="isEdit = false;jiluVisible = true">日志录入+</el-button> -->
                </div>
            </div>
        </div>
        <div class="main">
            <div class="date">
                <span>时间：</span>
                <!-- <el-button type="text" @click="jintian">今天</el-button>
                <el-button type="text" @click="qitian">7天</el-button>
                <el-button type="text" @click="shisitian">14天</el-button>
                <el-button type="text" @click="sanshi">30天</el-button> -->
                <!-- <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>-->
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                ></el-date-picker>
                <div class="dao">
                    <!-- <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">{{ $t('excel.export') }}</el-button> -->
                    <el-button type="primary" @click="getList">查询</el-button>
                </div>
            </div>
            <div class="biao">
                <div class="table">
                    <el-table :data="tableData1" style="width: 100%" v-loading="tableLoading">
                        <el-table-column label="日期" align="center" min-width="110">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="companyName" label="油站" align="center"></el-table-column>
                        <el-table-column label="星期" align="center">
                            <template slot-scope="scope">
                                <span>{{ getDateDay(scope.row.createTime) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="天气" align="center" width="200">
                            <template slot-scope="scope">
                                <span v-for="(item,index) in weatherList" v-if="scope.row.weather == index + 1">{{ item }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" align="center">
                            <template slot-scope="scope">
                                <span v-show="scope.row.status==0">草稿</span>
                                <span v-show="scope.row.status==1">已提交</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="right" width="200">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="see(scope.row.id)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <pagination
                    :total="total"
                    :page.sync="listQuery.pageNum"
                    :limit.sync="listQuery.pageSize"
                    @pagination="getList"
                />
            </div>

            <el-dialog :visible.sync="jiluVisible" title="查看日志" width="1080px">
                <el-form ref="addForm" :model="addFormData" label-width="110px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="加油站" prop="shortName">{{ addFormData.stationName }}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="录入人" prop="creater">{{ addFormData.creater }}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="录入日期"
                                prop="createTime"
                            >{{ addFormData.createTime | dateTime }}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="天气" prop="weather">
                                <span
                                    v-for="(item,index) in weatherList"
                                    :key="index"
                                    v-if="addFormData.weather == index + 1"
                                >{{ item }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="星期" prop="day">{{ addFormData.day }}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="安全及设备运行" prop="safetyOperation">
                        <el-input
                            type="textarea"
                            :autosize="true"
                            readonly
                            placeholder
                            v-model="addFormData.safetyOperation"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="现场服务" prop="onsiteService">
                        <el-input
                            type="textarea"
                            :autosize="true"
                            readonly
                            placeholder
                            v-model="addFormData.onsiteService"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="站姿站貌" prop="standAppearance">
                        <el-input
                            type="textarea"
                            :autosize="true"
                            readonly
                            placeholder
                            v-model="addFormData.standAppearance"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="员工状况" prop="staffStatus">
                        <el-input
                            type="textarea"
                            :autosize="true"
                            readonly
                            placeholder
                            v-model="addFormData.staffStatus"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="其他事项" prop="extras">
                        <el-input
                            type="textarea"
                            :autosize="true"
                            readonly
                            placeholder
                            v-model="addFormData.extras"
                        ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="">
                        <el-button type="primary" @click="addItem(1);">保存</el-button>
                        <el-button type="primary" @click="addItem(2);">提交</el-button>
                        <el-button type="primary" @click="jiluVisible = false">关闭</el-button>
                    </el-form-item>-->
                </el-form>
            </el-dialog>

            <!-- <el-dialog :visible.sync="jiluVisible" title="日志录入" width="90%">
                <div class="dbox">
                    <div class="box">
                        <span>加油站</span>
                        <el-select @change="change" v-model="station" placeholder="请选择">
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
                        <el-select
                            v-model="zhuangtaixuanze"
                            @change="fenLeiChange"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in zhuangtai"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="dbox">
                    <div class="box">
                        <span>录入日期</span>
                        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                    <div class="box">
                        <span>天气</span>
                        <el-input placeholder="请输入内容"></el-input>
                    </div>
                    <div class="box">
                        <span>星期</span>
                        <el-input placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div class="neirong">
                    <span>安全及设备运行</span>

                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
                </div>

                <div class="neirong">
                    <span>现场服务</span>

                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
                </div>

                <div class="neirong">
                    <span>站姿站貌</span>

                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
                </div>
                <div class="neirong">
                    <span>员工状况</span>

                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
                </div>
                <div class="neirong">
                    <span>其他事项</span>

                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
                </div>

                <div class="anniu">
                    <el-button type="primary" @click="jiluVisible = false">保存</el-button>
                    <el-button type="primary" @click="jiluVisible = false">提交</el-button>
                    <el-button type="primary" @click="jiluVisible = false">关闭</el-button>
                </div>
            </el-dialog>-->
        </div>
    </div>
</template>
<script>
import { youStorageGrouplist } from "@/api/youpinbaobiao";
import { parseTime } from "@/utils";
import { youpinlist } from "@/api/youpinbaobiao";
import { getCompanyByWhere } from "@/api/youpinbaobiao";
import { StationList } from "@/api/youpinbaobiao";
import { report } from "@/api/youpinbaobiao";
import { getLogList, addLog, getLogById, setLog } from "@/api/meeting";
import Pagination from "@/components/Pagination";
import { getUserInfo } from "@/api/cheduiguanli";
export default {
    components: { Pagination },
    data() {
        return {
            tableLoading: false,
            company: "", //公司
            companyOptions: [{}], //公司选择
            station: "", //公司
            stationOptions: [{}], //油站选择
            oilsId: "", //油品id
            oilsList: [], //油品列表
            date: "", //日期
            leixing: "", //类型
            jiluVisible: false,
            radio: "",
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            leixingOptions: [
                {
                    value: "",
                    label: "全部"
                },
                {
                    value: 1,
                    label: "会议"
                },
                {
                    value: 2,
                    label: "活动"
                },
                {
                    value: 3,
                    label: "培训"
                },
                {
                    value: 4,
                    label: "日常学习"
                },
                {
                    value: 5,
                    label: "预案演练"
                }
            ],
            belong_id: "",
            total: 0,
            isEdit: false,
            weatherList: ["晴", "多云", "阴", "雾", "雨", "雪"],
            addFormData: {
                createTime: "",
                weather: "",
                day: ""
            },
            rules: {
                creater: [
                    { required: true, message: "请输入录入人", trigger: "blur" }
                ],
                weather: [
                    { required: true, message: "请选择天气", trigger: "change" }
                ]
                // safetyOperation: [
                //     { required: true, message: '请输入内容', trigger: 'blur' },
                // ],
                // onsiteService: [
                //     { required: true, message: '请输入内容', trigger: 'blur' },
                // ],
                // standAppearance: [
                //     { required: true, message: '请输入内容', trigger: 'blur' },
                // ],
                // staffStatus: [
                //     { required: true, message: '请输入内容', trigger: 'blur' },
                // ],
                // extras: [
                //     { required: true, message: '请输入内容', trigger: 'blur' },
                // ],
            },
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                status: "",
                name: "",
                type: "",
                stationId: ""
            },
            tableData1: [], //表格数据
            zhuangtai: [
                {
                    value: null,
                    label: "全部"
                },
                {
                    value: 0,
                    label: "草稿"
                },
                {
                    value: 1,
                    label: "已提交"
                }
            ], //品号
            zhuangtaixuanze: "", //品号选择
            listSub: [], //
            list: [], //
            searchKey: "" //搜索关键字
        };
    },
    mounted() {
        this.get();
        this.getList();
    },
    filters: {
        dateTime: function(value, division) {
            if (value) {
                division = division || "-";
                var datetime = new Date(value);
                function g(val) {
                    val < 10 && (val = "0" + val);
                    return val;
                }
                return (
                    datetime.getFullYear() +
                    division +
                    g(datetime.getMonth() + 1) +
                    division +
                    g(datetime.getDate())
                );
                // + ' ' + g(datetime.getHours()) + ':' + g(datetime.getMinutes())
            }
        }
    },
    methods: {
        getDateDay(val){
            let dayText = ["日", "一", "二", "三", "四", "五", "六"];
            return dayText[new Date(val).getDay()];
        },
        get() {
            this.listLoading = true;
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
            var a = {};
            youpinlist(a).then(response => {
                // console.log(response.data)
                this.oilsList = response.data;
            });
            getCompanyByWhere(a).then(response => {
                // console.log(response.data)
                this.companyOptions = response.data;
            });

            StationList(data).then(response => {
                console.log(response.data);
                this.stationOptions = response.data;
            });

            getUserInfo(data).then(response => {
                this.belong_id = response.data.belong_id;
            });
        },
        getList() {
            this.tableLoading = true;
            if (this.date) {
                this.listQuery.startTime = this.date[0];
                this.listQuery.endTime = this.date[1];
            } else {
                this.listQuery.startTime = "";
                this.listQuery.endTime = "";
            }
            getLogList(this.listQuery).then(res => {
                console.log(res);
                this.tableData1 = res.data.rows;
                this.total = res.data.total;
                this.tableLoading = false;
            });
        },
        changeScreen() {
            this.getList();
        },
        addItem(status) {
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    if (this.isEdit) {
                        this.jiluVisible = false;
                        this.addFormData.status = status;
                        this.addFormData.createTime = new Date(
                            this.addFormData.createTime
                        );
                        this.addFormData.create_time = this.addFormData.createTime;
                        delete this.addFormData.createTime;
                        delete this.addFormData.short_name;
                        setLog(this.addFormData)
                            .then(res => {
                                this.$notify({ message: res.data.message });
                                this.getList();
                            })
                            .catch(res => {
                                console.log(res.response);
                                this.$notify.error({
                                    title: "错误",
                                    message: res.response.data.error,
                                    duration: 2000
                                });
                            });
                    } else {
                        this.jiluVisible = false;
                        this.addFormData.status = status;
                        addLog(this.addFormData)
                            .then(res => {
                                this.getList();
                            })
                            .catch(res => {
                                console.log(res.response);
                                this.$notify.error({
                                    title: "错误",
                                    message: res.response.data.error,
                                    duration: 2000
                                });
                            });
                    }
                }
            });
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
        //今天
        jintian() {
            this.date = [
                new Date(new Date(new Date().toLocaleDateString()).getTime()),
                new Date(
                    new Date(new Date().toLocaleDateString()).getTime() +
                        24 * 60 * 60 * 1000 -
                        1
                )
            ];
        },
        qitian() {
            this.date = [
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
                new Date()
            ];
        },
        shisitian() {
            this.date = [
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 14),
                new Date()
            ];
        },
        sanshi() {
            this.date = [
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
                new Date()
            ];
        },
        chaxun() {
            this.listLoading = true;
            if (this.date == null) {
                this.date = [];
            }
            var data = {
                companyId: this.company,
                stationId: this.station,
                oilsId: this.oilsId,
                startTime: this.date[0],
                endTime: this.date[1],
                showType: this.fangshixuanze,
                searchKey: this.searchKey
            };
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
        formatDate(row, column) {
            const now = new Date(row[column.property]);
            console.log(now);
            if (now != "Invalid Date") {
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hour = now.getHours();
                var minute = now.getMinutes();
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
                return "";
            }
        },
        // 表格合并行与列
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === 0) {
                    return {
                        rowspan: this.tableData.length,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        see(id) {
            // this.$router.push({
            //     name:'journalSee'
            // })
            this.jiluVisible = true;
            getLogById({ id: id }).then(res => {
                if (res.data) {
                    this.addFormData = res.data;
                }
            });
        },
        edit(id) {
            this.isEdit = true;
            this.jiluVisible = true;
            getLogById({ id: id }).then(res => {
                if (res.data) {
                    this.addFormData = res.data;
                }
            });
        }
    },
    watch: {
        jiluVisible: function(val) {
            if (val && !this.isEdit) {
                this.addFormData.createTime = new Date();
            } else {
                this.$refs["addForm"].resetFields();
                this.addFormData = {
                    name: "",
                    modifier: "",
                    createTime: "",
                    status: "",
                    type: "",
                    attendees: "",
                    content: ""
                };
            }
        },
        "addFormData.createTime": function(val) {
            let dayText = ["日", "一", "二", "三", "四", "五", "六"];
            this.addFormData.day = dayText[new Date(val).getDay()];
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header .box {
    line-height: 60px;
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
    margin-top: 10px;
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
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
    background-color: #f5f9fc;
}
h3 .el-button--medium.is-circle {
    border: 0;
}
.el-table_1_column_1,
.el-table_1_column_2,
.el-table__footer .el-table_1_column_1,
.el-table__footer .el-table_1_column_2,
.el-table__footer .el-table_1_column_3,
.el-table thead.is-group th {
    background-color: #f5f9fc;
}
.el-table__footer-wrapper tbody td,
.el-table__header-wrapper tbody td {
    background-color: #fff;
}
</style>