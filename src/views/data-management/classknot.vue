<template>
    <div class="warp">
        <div class="header">
            <h3>
                <span></span>班结查询
            </h3>
            <div class="date">
                <span>时间</span>
                <el-date-picker
                    v-model="date"
                    @change="chaxun"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2"
                ></el-date-picker>
                <!-- <span>公司</span>
                <el-select v-model="company" placeholder="请选择">
                    <el-option
                        v-for="item in companyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <span>加油站</span>
                <el-select v-model="station" placeholder="请选择">
                    <el-option
                        v-for="item in stationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select> -->
            </div>
        </div>
        <div class="  main  biao publicTable">
            <div class="thColorDark">
                <div class="table ">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                >
                    <el-table-column prop="id" label="班结编号"  min-width="130"  align="center"></el-table-column>
                    <el-table-column prop="businessDate" label="营业日" min-width="90"  align="center"></el-table-column>
                    <el-table-column prop="companyName" label="公司" min-width="100"   align="center"></el-table-column>
                    <el-table-column prop="stationName" label="加油站" min-width="90"  align="center"></el-table-column>
                    <el-table-column prop="createDate" label="开班时间" min-width="130" align="center"></el-table-column>
                    <el-table-column prop="modifyDate" label="结班时间" min-width="130" align="center"></el-table-column>
                    <el-table-column prop="businessAmount" label="营业金额" min-width="60"  align="center"></el-table-column>
                    <el-table-column prop="state" label="状态" min-width="60" align="center">
                        <template slot-scope="scope">
                            <span v-show="scope.row.status==1">营业中</span>
                            <span v-show="scope.row.status==0">已审核</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="modifyName" label="班结人员" min-width="80" align="center"></el-table-column>
                    <el-table-column label="操作"  align="center">
                        <template slot-scope="scope">
                            <el-button @click="tiaozhuan(scope.row)" type="primary" size="small"  >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
				<pagination
				    v-show="total>0"
				    :total="total"
				    :page.sync="listQuery.pageNum"
				    :limit.sync="listQuery.pageSize"
				    @pagination="getList"
				/>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getShiftUserLists } from "@/api/shuju";
import Pagination from "@/components/Pagination";

export default {
    name: "knotDemo",
	components: { Pagination },
    data() {
        return {
            date: "", //开始日期-结束日期
			listQuery: {
			    pageNum: 1,
			    pageSize: 10,
			    startDate: "",
			    endDate: ""
			},
			total: 0,
            pickerOptions2: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近14天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
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
                }]
            },
            //公司临时选项
            companyOptions: [],
            company: "", //公司
            //加油站临时选项
            stationOptions: [],
            station: "", //加油站
            //表格临时数据
            tableData: []
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList(){
            getShiftUserLists(this.listQuery).then(response => {
                console.log(response.data);
                this.tableData = response.data.rows;
				this.total = response.data.total;
            });
        },
        chaxun(){
			if (this.date != null) {
				this.listQuery.startDate = this.date[0];
				this.listQuery.endDate = this.date[1];
			} else {
				this.listQuery.startDate = "";
				this.listQuery.endDate = "";
			}
            this.getList();
        },
        tiaozhuan(row) {
            this.$router.push({
                path:'/management/management-classknotdetails',
                query:{
                    id:row.id
                }
            })
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
    // padding: 0 1%;
}
.header {
    background-color: #fff !important;
    height: 60px;
    padding: 0 40px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 10px 10px -2px #dcdfe6;
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
    height: 20px;
    vertical-align: sub;
    background-color: #5b8dff;
    margin-right: 8%;
}
.top .header{
    border: 0;
}
.footer .header{
    border: 0;
}
.xinxi{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    line-height: 36px;
}
.top{
    border-bottom: 1px solid #F6F7FB;
}
.biao{
  padding: 10px 20px;
}
.table{
  border:1px solid #ebeef5;
  border-bottom: 0;
}
.date .el-button {
    margin-right: 20px;
    font-size: 14px;
    line-height: 36px;
    color: black;
}
.date .el-button:focus {
    color: #409eff;
}
.xuan span {
    font-size: 14px;
    line-height: 60px;
}
.date{
    float: right;
    line-height: 60px;
}
.xuan {
    margin: 0 0 30px 10px;
    padding-top: 20px;
}
.xuan .el-select:nth-of-type(1) {
    margin-right: 20px;
}

.date span {
    margin-left:50px;
    margin-right:12px;
}
.date span:nth-of-type(1){
    margin-left:0px;
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
</style>
