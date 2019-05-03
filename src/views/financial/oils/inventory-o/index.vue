<template>
    <div class="warp inventory">
        <div class="header">
            <h3>
                <span></span>油品进销存报表
            </h3>
            <div class="dao">
                <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="exportTable">{{ $t('excel.export') }}</el-button>
                <el-button type="primary" @click="dayin">打印</el-button>
                <el-button type="primary" @click="chaxun">查询</el-button>
            </div>
        </div>
        <div class="main">
            <div class="top">
                <div class="box">
                    <span>品号</span>
                    <el-select v-model="oilsId"  clearable placeholder="请选择">
                        <el-option
                            v-for="item in oilsList"
                            :key="item.id"
                            :label="item.oils_name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="date">
                    <span>时间：</span>
                    <!-- <el-button type="text" @click="jintian">今天</el-button>
                    <el-button type="text" @click="qitian">7天</el-button>
                    <el-button type="text" @click="shisitian">14天</el-button>
                    <el-button type="text" @click="sanshi">30天</el-button>
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>-->
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2"
                    ></el-date-picker>
                </div>
            </div>
            <div class="biao" id="test">
                <div class="table">
                    <el-table
                        v-loading="listLoading"
                        :summary-method="getSummaries"
                        :data="tableData"
                        style="width: 100%"
                    >
                        <el-table-column prop="oilsName" label="油品品号"></el-table-column>
                        <el-table-column label="油品期初" align="center">
                            <el-table-column
                                prop="initialInventory"
                                label="库存（V20）"
                                align="center"
                                min-width="110"
                            ></el-table-column>
                        </el-table-column>
                        <el-table-column label="油品入库" align="center">
                            <el-table-column label="采购" align="center">
                                <el-table-column
                                    prop="enterhousePurchaseActual"
                                    align="center"
                                    min-width="110"
                                    label="实收（20）"
                                ></el-table-column>
                                <el-table-column
                                    prop="enterhousePurchaseConsume"
                                    align="center"
                                    label="损益"
                                ></el-table-column>
                            </el-table-column>
                            <el-table-column label="调拨">
                                <el-table-column
                                    prop="enterhouseAllocationActual"
                                    align="center"
                                    min-width="110"
                                    label="实收（20）"
                                ></el-table-column>
                            </el-table-column>
                            <el-table-column label="倒罐" align="center">
                                <el-table-column
                                    prop="enterhouseInvertActual"
                                    align="center"
                                    min-width="110"
                                    label="实收（20）"
                                ></el-table-column>
                                <el-table-column
                                    prop="enterhouseInvertConsume"
                                    label="损益"
                                    align="center"
                                    min-width="110"
                                ></el-table-column>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="sales" label="油品销售" align="center"></el-table-column>
                        <el-table-column prop="tests" label="检测油" align="center"></el-table-column>
                        <el-table-column label="油品出库" align="center">
                            <el-table-column label="倒罐" align="center">
                                <el-table-column
                                    prop="outhouseInvertActual"
                                    min-width="110"
                                    label="出库（V20）"
                                    align="center"
                                ></el-table-column>
                            </el-table-column>
                            <el-table-column label="调拨" align="center">
                                <el-table-column
                                    prop="outhouseAllocationActual"
                                    label="出库（V20）"
                                    min-width="110"
                                    align="center"
                                ></el-table-column>
                                <el-table-column
                                    prop="outhouseAllocationConsume"
                                    label="损益"
                                    align="center"
                                ></el-table-column>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="油品期末库存" align="center">
                            <el-table-column
                                prop="finalInventory"
                                align="center"
                                min-width="110"
                                label="库存（V20）"
                            ></el-table-column>
                        </el-table-column>
                        <el-table-column prop="salesConsume" label="销售损益" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { youStorageStationlist } from "@/api/youpinbaobiao";
import { parseTime } from "@/utils";
import { youpinlist } from "@/api/youpinbaobiao";
import { handleDownload } from '@/utils'
    
export default {
    data() {
        return {
            product: "", //品号
            productOptions: "", //品号选择
            date: [], //日期
            listLoading: false,
            tableData: [[]], //表格数据
            oilsId: "", //油品id
            oilsList: [], //油品列表
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
            }
        };
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            this.listLoading = true;
            var data = {};
            console.log(data);
            youStorageStationlist(data).then(response => {
                console.log(response.data);
                this.tableData = response.data;
                this.listLoading = false;
            });
            var a = {};
            youpinlist(a).then(response => {
                console.log(response.data);
                this.oilsList = response.data;
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
        dayin(){
            let wpt = document.getElementById('test');
            let newContent = wpt.innerHTML;
            let oldContent = document.body.innerHTML;
            
            document.body.innerHTML = newContent;
            // document.body.style = "transform:scale(0.8,0.8); margin-left: 0px;"
            document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+4+'px'
            // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
            
            // document.querySelector('.el-table__header').style = "margin: 0 auto;"
            // document.querySelector('.el-table__body').style = "margin: 0 auto;"
            window.print();
            window.location.reload()
            // document.body.innerHTML = oldContent;
        },
        //导出
        exportTable(){
            var tHeaders = ['油品品号',  '油品期初-库存（V20）', '油品入库-采购-实收（20）', '油品入库-采购-损益', '油品入库-调拨-实收（20）', '油品入库-倒罐-实收（20）', '油品入库-倒罐-损益', '油品销售', '检测油', '油品出库-倒罐-出库（V20）','油品出库-调拨-出库（V20）',  '油品出库-调拨-损益', '油品期末库存-库存（V20）','销售损益'];
            var filterVals = ['oilsName',  'initialInventory', 'enterhousePurchaseActual', 'enterhousePurchaseConsume', 'enterhouseAllocationActual', 'enterhouseInvertActual','enterhouseInvertConsume','sales','tests', 'outhouseInvertActual','outhouseAllocationActual', 'outhouseAllocationConsume', 'finalInventory','salesConsume'];
            var name = '油品进销存报表'
            handleDownload(this.tableData,tHeaders,filterVals,name)
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
    margin-right: 10px;
}

.top {
    width:100%;
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
}
.dao {
    float: right;
    line-height: 60px;
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
.inventory .el-table__body td{
  background-color: #fff;
}
/* .el-table_1_column_1,
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
} */
</style>
