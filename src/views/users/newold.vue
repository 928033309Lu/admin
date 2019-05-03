<template>
    <div class="warp">
        <div class="main newold">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="到站消费" name="first">
                    <div class="date">
                        <!-- <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker> -->
                        <el-date-picker
                            v-model="shijian"
                            type="daterange"
                            @change="getList"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                    <div id="arrivalConsumption" :style="{width: '100%', height: '420px'}"></div>
                </el-tab-pane>
                <el-tab-pane label="网站登录" name="second">
                    <div class="date">
                        <!-- <el-date-picker
                            v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker> -->
                        <el-date-picker
                            v-model="shijian"
                            type="daterange"
                            @change="getList"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                    <div id="websiteLogin" :style="{width: '100%', height: '420px'}"></div>
                </el-tab-pane>
            </el-tabs>
            <div class="footer">
                <div class="header">
                    <h3>
                        <span></span>详细数据
                    </h3>
                </div>
                <div class="biao">
                    <div class="table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                                label="时间">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.date | dateTime }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="新用户数"
                                align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.newNum }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="新用户占比"
                                align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.newRate }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="老用户数"
                                align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.oldNum }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="老用户占比"
                                align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.oldRate }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div> 
                    <pagination
                        :total="total"
                        :page.sync="listQuery.pageNum"
                        :limit.sync="listQuery.pageSize"
                        :autoScroll="false"
                        @pagination="getList"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import { evolution } from "@/api/yonghufenxi";
import { parseTime } from "@/utils";
import { userList } from '@/api/article'
import Pagination from "@/components/Pagination";
export default {
    components:{ Pagination },
    data() {
        return {
            activeName: "first",
            shijian:'',//选择时间
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            tabIndex:0,
            total:0,
            //详细数据表格数据
            tableData: [],
            pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
            //分页
            total: 0,
            page: 1,
            limit: 10,
            currentPage: 1,
            loading: true,
            days: [],
            positionNew: [],
            positionOld: [],
            webNew: [],
            webOld: []
        };
    },
    mounted() {
        // this.get();
        this.getList()
    },
    methods: {
        get() {
            var data = {
                pageNum: this.page,
                pageSize: this.limit
            };
            evolution(data).then(response => {
                console.log(response.data);
                this.total = response.data.total;
                this.loading = false;
                this.tableData = response.data.list.rows;
                for (let i = 0; i < response.data.chart.length; i++) {
                    this.days.push(response.data.chart[i].day);
                    this.positionNew.push(response.data.chart[i].positionNew);
                    this.positionOld.push(response.data.chart[i].positionOld);
                    this.webNew.push(response.data.chart[i].webNew);
                    this.webOld.push(response.data.chart[i].webOld);
                }
                this.arrivalConsumptionLine();
                this.websiteLoginLine();
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.get();
        },
        getList(){
            if(this.shijian){
                this.listQuery.startTime = this.shijian[0]
                this.listQuery.endTime = this.shijian[1]
            }else{
                this.listQuery.startTime = ''
                this.listQuery.endTime = ''
            }
            userList(this.listQuery).then(response => {
                let x = []
                let y = []
                let z = []
                response.data.chart.forEach((item)=>{
                    x.push(item.day)
                    if(this.tabIndex){
                        y.push(item.webNew)
                        z.push(item.webOld)
                    }else{
                        y.push(item.positionNew)
                        z.push(item.positionOld)
                    }
                })

                !this.tabIndex && this.arrivalConsumptionLine(x,y,z);
                this.tabIndex && this.websiteLoginLine(x,y,z);

                this.tableData = response.data.list.rows
                this.total = response.data.list.total


                // this.list = response.data.list.rows
                // this.total = response.data.list.total


                // this.total = response.data.total
                // const items = response.data.items

                // this.list = items.map(v => {
                //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                //     v.originalTitle = v.title //  will be used when user click the cancel botton
                //     return v
                // })
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.get();
        },
        //到站消费折线图
        arrivalConsumptionLine(x,y,z) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(
                document.getElementById("arrivalConsumption")
            );
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "趋势图"
                },
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "10%",
                    data: ["新用户", "老用户"]
                },
                grid: {
                    left: "0%",
                    right: "6%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    axisTick: {
                        show: false
                    },
                    name: "（日期）",
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: x
                },
                yAxis: [
                    {
                        name: "人数",
                        type: "value",
                        splitLine: { show: false }, //去除网格线
                        axisTick: {
                            show: false
                        }
                        // splitArea:{show : true},//保留网格区域
                    }
                ],
                series: [
                    {
                        name: "新用户",
                        type: "line",
                        stack: "总量",
                        itemStyle: { color: "#FF7173" },
                        data: y
                    },
                    {
                        name: "老用户",
                        type: "line",
                        stack: "总量",
                        itemStyle: { color: "#5C8BFF" },
                        data: z
                    }
                ]
            });
        },
        //交易笔数折线图
        websiteLoginLine(x,y,z) {
            var websiteLogin = document.getElementById("websiteLogin");
            // websiteLogin.style.width =
            //     document.querySelector("#arrivalConsumption").offsetWidth +
            //     "px";
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(websiteLogin);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "趋势图"
                },
                tooltip: {
                    trigger: "axis",
                    feature: false
                },
                legend: {
                    icon: "circle",
                    top: "top",
                    left: "10%",
                    data: ["新用户", "老用户"]
                },
                grid: {
                    left: "3%",
                    right: "6%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: false //去除网格线
                    },
                    axisTick: {
                        show: false
                    },
                    name: "（日期）",
                    // splitArea : {show : true},//保留网格区域
                    boundaryGap: true,
                    data: x
                },
                yAxis: [
                    {
                        name: "人数",
                        type: "value",
                        splitLine: { show: false }, //去除网格线
                        axisTick: {
                            show: false
                        }
                        // splitArea:{show : true},//保留网格区域
                    }
                ],
                series: [
                    {
                        name: "新用户",
                        type: "line",
                        stack: "总量",
                        itemStyle: { color: "#FF7173" },
                        data: y
                    },
                    {
                        name: "老用户",
                        type: "line",
                        stack: "总量",
                        itemStyle: { color: "#5C8BFF" },
                        data: z
                    }
                ]
            });
        },
        handleClick(tab, event) {
            this.tabIndex = tab.index
            this.getList()
        },
        tableRowClassName({ row, rowIndex }) {
          console.log(111111111111111111111111111111111111)
            if (rowIndex === 1) {
                return "warning-row";
            } else if (rowIndex === 3) {
                return "success-row";
            }
            return "";
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
    padding: 20px;
}
.main {
    min-height: calc(100vh - 120px);
    // background-color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.date {
    position: relative;
}
.el-tabs {
    background-color: #fff;
}
.biao{
    position: relative;
    margin-bottom: 30px;
}
.biao .el-date-editor{
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 100;
}
.biao .el-date-editor .el-range-separator{
    padding: 0;
}
.el-table th, .el-table tr{
  background: #fff
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
.newold .el-tabs__nav-wrap {
    padding: 0 2%;
}
.newold .el-tabs__content {
    padding: 15px 3%;
    overflow: visible;
}
.newold .el-tabs__nav {
    height: 60px;
    line-height: 60px;
}
.newold .el-input--medium .el-input__inner {
    /* margin: 10px 0; */
}
.newold .top .el-input--medium .el-input__inner {
    margin: 0;
}
.newold .date .el-range-editor--medium.el-input__inner {
    position: absolute;
    right: 20px;
    top: -77px;
    z-index: 100;
}
.table {
    border: 1px solid #ebeef5;
    border-bottom: 0;
}
.biao {
    padding: 10px 20px;
}
.footer {
    background-color: #fff;
    margin-top: 20px;
}
.header {
    background-color: #fff;
    height: 60px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #f6f7fb;
}
.header h3 {
    line-height: 60px;
    margin: 0;
    float: left;
    width: 100px;
}
.header h3 span {
    display: inline-block;
    width: 3px;
    height: 25px;
    vertical-align: middle;
    background-color: #5b8dff;
    margin-right: 5%;
}
.el-pagination {
    text-align: center;
    margin-top: 10px;
}
.el-table__body tr:nth-of-type(odd){
  background: #fff
}
.el-table--striped .el-table__body tr.el-table__row--striped td{
  background: #fff
}
</style>
