<template>
    <div class="warp">
        <div class="header">
            <h3>
                <span></span>班次管理
            </h3>
        </div>
        <div class="main">
            <div class="table">
                <button class="addBtn el-icon-plus" @click="flightsShow = true"></button>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column label="班次">
                        <template slot-scope="scope">{{ scope.row.shifts }}</template>
                    </el-table-column>
                    <el-table-column label="班长" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-for="item in staffList" v-if="scope.row.monitor == item.id">{{ item.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收银员" min-width="150">
                        <template slot-scope="scope">
                            <span v-for="item1 in scope.row.cashier && scope.row.cashier.split(',')">
                                <span v-for="item in staffList" v-if="item1 == item.id">{{ item.name }}</span>、
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="加油员" align="center" min-width="150">
                        <template slot-scope="scope">
                            <span v-for="item1 in scope.row.refuelingMan && scope.row.refuelingMan.split(',')">
                                <span v-for="item in staffList" v-if="item1 == item.id">{{ item.name }}</span>、
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="160" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="edit(scope.row)">修改</el-button>
                            <el-button
                                type="danger"
                                size="small"
                                @click="del(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <span v-for="(item, index) in color" :key="index"><span v-show="index>0">丶</span>{{item}}</span> -->
                <!-- <pagination :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" /> -->
            </div>
            <div class="lower">
                <el-row :gutter="20">
                    <el-col :span="15">
                        <div class="grid-content bg-purple">
                            <div class="header">
                                <h3>
                                    <span></span>排班管理
                                </h3>
                            </div>
                            <div class="scheduling">
                                <div class="date">
                                    <!-- <el-date-picker
                                        v-model="schedulingDate"
                                        type="date"
                                        placeholder="选择日期"
                                    ></el-date-picker> -->
                                    <ele-calendar
                                        :render-content="renderContent"
                                        border
                                        @pick="pickClick"
                                        @date-change="getDateList"
                                        :data="datedef"
                                        :prop="prop"
                                    ></ele-calendar>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div class="grid-content bg-purple">
                            <div class="header">
                                <h3>
                                    <span></span>销售分布
                                </h3>
                            </div>
                            <div class="sale">
                                <el-date-picker
                                    v-model="schedulingDate"
                                    @change="StaffShifts"
                                    type="month"
                                    placeholder="选择日期"
                                ></el-date-picker>
                                <div id="myChart" :style="{width: '400px', height: '380px'}"></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <el-dialog :title="!isEdit ? '设置班次' : '修改班次'" :visible.sync="flightsShow" width="400px">
            <el-form ref="flightsForm" :rules="rules" :model="formData" label-position="right" label-width="100px">
                <el-form-item label="班次" prop="shifts">
                    <el-select v-model="formData.shifts" clearable placeholder="请选择">
                        <el-option
                            v-for="item in flightsList"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班长" prop="monitor">
                    <el-select v-model="formData.monitor" clearable placeholder="请选择">
                        <el-option
                            v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收银员" prop="cashier">
                    <el-select v-model="formData.cashier" clearable  multiple collapse-tags placeholder="请选择">
                        <el-option
                            v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="加油员" prop="refuelingMan">
                    <el-select v-model="formData.refuelingMan" multiple collapse-tags clearable placeholder="请选择">
                        <el-option
                            v-for="item in staffList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提成比例" prop="commissionRatio">
                    <el-input-number v-model="formData.commissionRatio" :min="0" :max="100" :controls="false"></el-input-number> %
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="flightsShow = false">取消</el-button>
                <el-button type="primary" @click="flightsAdd">添加</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="!isDateEdit ? '添加班次' : '修改班次'" :visible.sync="dateShow" width="400px">
            <el-form ref="dateForm" :rules="dateRules" :model="dateData" label-position="right" label-width="100px">
                <el-form-item label="班次1" prop="first">
                    <el-select v-model="dateData.first" clearable placeholder="请选择">
                        <el-option
                            v-for="item in tableData"
                            :key="item.id"
                            :label="item.shifts"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班次2" prop="last">
                    <el-select v-model="dateData.last" clearable placeholder="请选择">
                        <el-option
                            v-for="item in tableData"
                            :key="item.id"
                            :label="item.shifts"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dateShow = false">取消</el-button>
                <el-button type="primary" @click="dateAdd">{{ !isDateEdit ? '添加' : '修改' }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
// import $ from 'jquery'
import echarts from "echarts";
import eleCalendar from "ele-calendar";
import "ele-calendar/dist/vue-calendar.css";
import { flightAdd, flightsDel, getFlightsList, flightsEdit, getStaffList, addShift, editShift, getStaffShifts } from "@/api/flights";
import Pagination from '@/components/Pagination'
import { ygList } from '@/api/zhanghu'

export default {
    name: "schedulingDemo",
    components: {
        eleCalendar,
        Pagination
    },
    props: {},
    data() {
        return {
            flightsShow: false,
            isEdit:false,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            total:0,
            flightsList: [ '一班', '二班', '三班' ],
            staffList:[],
            formData:{
                shifts:'',
                monitor:'',
                cashier:[],
                refuelingMan:[],
                commissionRatio:'',
            },
            rules: {
                shifts: [
                    { required: true, message: '请选择班次', trigger: 'change' }
                ],
                monitor: [
                    { required: true, message: '请选择班长', trigger: 'change' }
                ],
                cashier: [
                    { required: true, message: '请选择收银员', trigger: 'change' }
                ],
                refuelingMan: [
                    { required: true, message: '请选择加油员', trigger: 'change' }
                ],
                commissionRatio: [
                    { required: true, message: '请填写提成比例', trigger: 'blur' }
                ]
            },
            isDateEdit:false,
            dateShow:false,
            dateRules:{
                first: [
                    { required: true, message: '请选择班次', trigger: 'change' }
                ],
                last: [
                    { required: true, message: '请选择班次', trigger: 'change' }
                ],
            },
            dateData:{
                first:'',
                last:'',
                id1:'',
                id2:'',
            },
            //商品管理列表临时数据
            tableData: [],
            schedulingDate: new Date(), //排班日期
            defaultValue: "2018-11-08", //默认展示某月
            datedef: [],
            clickDate: '',
            prop: "date", //对应日期字段名
            drawLineData:[],//销售分布饼图数据
            color:["#307aff","#51b440","#fe8534","#FAD24C","#2BC940","#FF5B5C","#FC8531","#F98ABF"],
        };
    },
    mounted() {
        this.drawLine();

        this.getList();

        ygList({ pageNum: 1, pageSize: 9999, }).then(res=>{
            this.staffList = res.data.data.rows
        })

        this.getDateList(new Date())
        this.StaffShifts()
    },
    methods: {
        getList(){
            getFlightsList({}).then(response => {
                this.tableData = response.data
            });
        },
        transDate(n) {
            var date = new Date(n);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return (Y + M + D)
        },
        mapLoction(arr) {
            let newArr = [];
            arr.forEach(function (oldData, i) {
                let index = -1;
                let createTime = oldData.dates.substring(0, 10);
                let alreadyExists = newArr.some(function (newData, j) {
                    if (oldData.dates.substring(0, 10) === newData.dates.substring(0, 10)) {
                        index = j;
                        return true;
                    }
                });
                if (!alreadyExists) {
                    newArr.push({
                        dates: oldData.dates,
                        res: [oldData]
                    });
                } else {
                    newArr[index].res.push(oldData);
                }
            });
            return newArr;
        },
        StaffShifts(){
            var data = {
                dates:this.schedulingDate
            }
            getStaffShifts(data).then(res=>{
                // console.log('销售分布')
                // console.log(res.data)
                this.drawLineData = []
                if (res.data!=null) {
                    if (res.data.length==0) {
                        this.$message({
                            message: '暂无数据',
                            type: 'warning'
                        });
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.drawLineData.push({
                            value: res.data[i].shiftsNum,
                            name: res.data[i].shiftsName,
                            itemStyle: { color: this.color[i] }
                        },)
                    }
                }else{
                    this.$message({
                        message: '暂无数据',
                        type: 'warning'
                    });
                }
                
                this.drawLine();
            })
        },
        getDateList(res){
            getStaffList({
                dates:res,
            }).then(response => {
                let data = []
                this.mapLoction(response.data).forEach((item,index)=>{
                    let content = ['','']
                    let value = ['','']
                    item.res.forEach(item2 => {
                        if(item2.sequence == 1){
                            content[0] = item2.shiftStaffId
                            value[0] = item2.id
                        }else if(item2.sequence == 2){
                            content[1] = item2.shiftStaffId
                            value[1] = item2.id
                        }
                    })
                    data.push({
                        date:this.transDate(item.dates),
                        content:content,
                        value:value,
                    })
                })
                this.datedef = data
            });
        },
        edit(row){
            let res = {...row}
            res.cashier =  res.cashier && res.cashier.split(',')
            res.refuelingMan = res.refuelingMan && res.refuelingMan.split(',')
            this.formData = res
            this.flightsShow = true
            this.isEdit = true
        },
        flightsAdd(){
            this.$refs.flightsForm.validate((valid) => {
                if (valid) {
                    this.formData.cashier = this.formData.cashier.join(',')
                    this.formData.refuelingMan = this.formData.refuelingMan.join(',')
                    if(this.isEdit){
                        flightsEdit(this.formData).then(response => {
                            this.getList()
                            this.flightsShow = false
                        });
                    }else{
                        flightAdd(this.formData).then(response => {
                            this.getList()
                            this.flightsShow = false
                        });
                    }
                }
            });
        },
        dateAdd(){
            this.$refs.dateForm.validate((valid) => {
                if (valid) {
                    if(this.isDateEdit){
                        editShift({
                            id:this.dateData.id1,
                            dates:this.clickDate,
                            shiftStaffId:this.dateData.first,
                            sequence:1,
                            // stationId:'402881f967a5a1a60167a5a291ae0001',
                        }).then(response => {
                            this.getDateList(this.clickDate)
                            this.dateShow = false
                        });
                        editShift({
                            id:this.dateData.id2,
                            dates:this.clickDate,
                            shiftStaffId:this.dateData.last,
                            sequence:2,
                            // stationId:'402881f967a5a1a60167a5a291ae0001',
                        }).then(response => {
                            this.getDateList(this.clickDate)
                            this.dateShow = false
                        });
                    }else{
                        addShift({
                            dates:this.clickDate,
                            shiftStaffId:this.dateData.first,
                            sequence:1,
                            // stationId:'402881f967a5a1a60167a5a291ae0001',
                        }).then(response => {
                            this.getDateList(this.clickDate)
                            this.dateShow = false
                        });
                        addShift({
                            dates:this.clickDate,
                            shiftStaffId:this.dateData.last,
                            sequence:2,
                            // stationId:'402881f967a5a1a60167a5a291ae0001',
                        }).then(response => {
                            this.getDateList(this.clickDate)
                            this.dateShow = false
                        });
                    }
                }
            });
        },
        del(index, row) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                flightsDel({id:row.id}).then(response => {
                    this.$message(response.data.message);
                    this.getList()
                });
                // mwDel(data).then(response => {
                //     this.$notify({
                //         message: '删除成功',
                //         type: 'success',
                //         duration:1500
                //     });
                //     this.getList();
                // })
                
            })
        },
        pickClick(data, event, row, dome){
            console.log(data, event, row, dome)
            this.dateShow = true
            this.isDateEdit = (row.value && true)
            this.clickDate = data;
            if(row.value){
               this.dateData = {
                   first:row.value.content[0],
                   last:row.value.content[1],
                   id1:row.value.value[0],
                   id2:row.value.value[1],
               } 
            }
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    icon: "circle",
                    orient: "vertical",
                    bottom: "bottom",
                    data: ["一班", "二班", "三班"]
                },
                series: [
                    {
                        name: "销售分布",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        label: {
                            normal: {
                                position: "inner",
                                formatter: "{d}%"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.drawLineData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            });
        },
        add() {
            this.addVisible = true;
            this.addData = {
                commodityName: "", //商品名称
                commodityType: "", //商品大类
                company: "", //单位
                brand: "", //品牌
                commodityValue: "", //零售价
                specifications: "", //规格
                qualityGuaranteePeriod: "", //保质期
                stock: "", //库存
                commodityNumber: "" //商品条码
            };
        },
        addCommodity() {
            this.tableData.push(this.addData);
            this.addVisible = false;
        },
        
        //查看
        see(index, row) {
            this.managementVisible = true;
            this.seeData = row;
        },
        //返回上一页
        prev() {
            this.$router.go(-1);
        },
        // 自定义表达头+
        renderHeader(h, { column, $index }) {
            var that = this;
            return h("span", [
                h("span", column.label),
                h(
                    "el-button",
                    {
                        style: "margin-left: 5px;",
                        on: {
                            click: that.add
                        }
                    },
                    ["+"]
                )
            ]);
        },
        renderContent(h,parmas) {  //设置lunarcalendar=true,parmas返回值包含农历
            const loop = data =>{
                let defvalue = data.defvalue.value
                let bcList = [];
                if(defvalue){
                    bcList = [...defvalue.content]
                    this.tableData.forEach(item => {
                        if(bcList[0] == item.id){
                            bcList[0] = item.shifts
                        }
                        if(bcList[1] == item.id){
                            bcList[1] = item.shifts
                        }
                    })
                }
                return (
                    defvalue ? 
                    <div>
                        <div class="ri">{data.defvalue.text}</div>
                        <p style="padding-left: 10px;margin-top: -6px;">
                            {bcList[0]}
                        </p>
                        <p style="padding-left: 10px;">
                            {bcList[1]}
                        </p>
                    </div>
                    : <div>{data.defvalue.text}</div>
                );
            }
            return <div style="min-height:66px;">{loop(parmas)}</div>;
        },
        
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    watch:{
        flightsShow:function(val){
            if(!val){
                this.formData = {
                    shifts:'',
                    monitor:'',
                    cashier:[],
                    refuelingMan:[],
                    commissionRatio:'',
                }
                this.isEdit = false
                this.$refs.flightsForm.resetFields();
            }
        },
        dateShow:function(val){
            if(!val){
                this.dateData = {
                    first:'',
                    last:'',
                    id1:'',
                    id2:'',
                }
                this.isDateEdit = false
                this.$refs.dateForm.resetFields();
            }
        },
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
    // padding: 20px;
}
.table{
    position: relative;
}
.addBtn{
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 50px;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    z-index: 10;
}
.el-icon-plus{
    color:rgb(35, 133, 254);
    font-weight: 800;
}
.main {
    min-height: calc(100vh - 120px);
    //   background-color: #fff;
    width: 100%;
    height: 100%;
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
.header .btn {
    float: right;
    height: 60px;
    line-height: 60px;
}
.lower {
    margin-top: 20px;
}
.table {
    background-color: #fff;
}
.bg-purple {
    background-color: #fff;
}
.scheduling,
.sale {
    padding-left: 15px;
    padding-right: 15px;
}
.date,
.sale {
    margin: 10px 0;
    min-height: 505px;
}
#myChart {
    margin: 0 auto;
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
.el-input-number.is-without-controls .el-input__inner{text-align: left;}
.el-date-picker-calendar__header {
    /*display: none;*/
}
.el-picker-panel-calendar {
    margin-top: 10px;
}
.available p {
    margin: 0;
    line-height: 18px;
    text-align: left;
    padding-left: 5px;
}
.available p span {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: red;
    margin-right: 5px;
}
.available p span.yi {
    background-color: #307aff;
}
.available p span.er {
    background-color: #51b440;
}
.available p span.san {
    background-color: #fe8534;
}
.ri {
    text-align: right;
    padding-right: 10px;
}
.prev-month p {
    margin: 0;
    line-height: 18px;
    text-align: left;
    padding-left: 5px;
}
.next-month p {
    margin: 0;
    line-height: 18px;
    text-align: left;
    padding-left: 5px;
}
</style>
