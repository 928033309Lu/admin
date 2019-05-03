<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>油品采购统计</h3>
      <div class="dao">
        <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">{{ $t('excel.export') }}</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
        <el-button type="primary" @click="chaxun">查询</el-button>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>品号</span>
          <el-select v-model="oilsId" clearable placeholder="请选择">
            <el-option
              v-for="item in oilsList"
              :key="item.id"
              :label="item.oils_name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="date box">
          <span>时间：</span>
          <!-- <el-button type="text" @click="jintian">今天</el-button>
          <el-button type="text" @click="qitian">7天</el-button>
          <el-button type="text" @click="shisitian">14天</el-button>
          <el-button type="text" @click="sanshi">30天</el-button>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker> -->
          <el-date-picker
            v-model="date"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
          
        </div>
      </div>
      
      <div class="biao" id="test">
        <!-- show-summary -->
        <div class="table">
          <el-table
            v-loading="listLoading"
            :summary-method="getSummaries"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              align="center"
              min-width="150"
              label="营业日">
              <template slot-scope="scope">
                <span>{{ scope.row.businessDay}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="shifts"
              align="center"
              label="班次">
            </el-table-column>
            <el-table-column
              min-width="150"
              align="center"
              label="收油时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="oilsName"
              label="油品品号">
            </el-table-column>
            <el-table-column
              prop="oilOddNo"
              label="油品单号">
            </el-table-column>
            <el-table-column
              prop="primaryDensity"
              label="原发密度">
            </el-table-column>
            <el-table-column
              prop="primaryWeight"
              label="原发公斤">
            </el-table-column>
            <el-table-column
              prop="primaryVolume"
              label="转换原发体积">
            </el-table-column>
            <el-table-column
              prop="actualVolume"
              label="实收体积（V20）">
            </el-table-column>
            <el-table-column
              prop="actualWeight"
              label="实收公斤">
            </el-table-column>
            <el-table-column
              prop="consumptionWeight"
              label="益耗">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-pagination
        v-show="total>0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="limit"
        @pagination="get"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { youtonglist } from "@/api/youpinbaobiao";
import { parseTime } from '@/utils'
import { youpinlist } from "@/api/youpinbaobiao";

export default {
  data() {
    return {
      company:'',//公司
      companyOptions:[{}],//公司选择
      station:'',//公司
      stationOptions:[{}],//油站选择
      product:'',//品号
      productOptions:'',//品号选择
      date:[],//日期
      tableData:[],//表格数据
      //分页
      total: 0,
      page: 1,
      limit: 10,
      currentPage:1,
      listLoading:true,
      downloadLoading:false,
      oilsId:'',//油品id
      oilsList:[],//油品列表
      // time:[],//查询的时间段
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
    }
  },
  mounted(){
    this.get()
  },
  methods:{
    get(){
      this.listLoading = true
      var data = {
        pageNum:this.page,
        pageSize:this.limit
      }
      console.log(data)
      
      youtonglist(data)
        .then(response => {
          console.log(response.data)
          this.total = response.data.total
          this.tableData = response.data.rows
          this.listLoading = false
          
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].businessDay = this.formatDateTime(this.tableData[i].businessDay)
            this.tableData[i].createTime = this.formatDateTime(this.tableData[i].createTime)
          }
        })
        var a = {}
        youpinlist(a)
          .then(response => {
            console.log(response.data)
            this.oilsList = response.data
          })
    },
    //今天
    jintian(){
      this.date = [new Date(new Date(new Date().toLocaleDateString()).getTime()),new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1) ]
    },
    qitian(){
      this.date = [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7) ,new Date()]
    },
    shisitian(){
      this.date = [new Date(new Date().getTime() - 3600 * 1000 * 24 * 14) ,new Date()]
    },
    sanshi(){
      this.date = [new Date(new Date().getTime() - 3600 * 1000 * 24 * 30) ,new Date()]
    },
    chaxun(){
      console.log(this.date)
      // if (this.date==''||this.date==null) {
        
      // }else{
      //   this.time = this.date
      // }
      this.listLoading = true
			if(this.date==null){
				this.date=[]
			}
      var data = {
        pageNum:this.page,
        pageSize:this.limit,
        oilsId:this.oilsId,
        startTime:this.date[0]||"",
        endTime:this.date[1]||""
      }
      console.log(data)
      youtonglist(data)
        .then(response => {
          console.log(response.data)
          this.total = response.data.total
          this.tableData = response.data.rows
          this.listLoading = false
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].businessDay = this.formatDateTime(this.tableData[i].businessDay)
            this.tableData[i].createTime = this.formatDateTime(this.tableData[i].createTime)
          }
          this.tableData.businessDay
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val
      this.get()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.get()
    },
    // formatDate(row, column) { 
    //   console.log(column)
    //   const now = new Date(row[column.property])
    //   if(now != "Invalid Date"){
    //     var year=now.getFullYear()>10 ? now.getFullYear() :'0'+now.getFullYear(); 
    //     var month=(now.getMonth()+1)>10 ?(now.getMonth()+1) :'0'+(now.getMonth()+1); 
    //     var date=now.getDate()>10 ? now.getDate() :'0'+now.getDate(); 
    //     var hour=now.getHours()>10 ? now.getHours() :'0'+now.getHours(); 
    //     var minute=now.getMinutes()>10 ? now.getMinutes() :'0'+now.getMinutes(); 
    //     var second=now.getSeconds()>10 ? now.getSeconds() :'0'+now.getSeconds(); 
    //     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    //   }else{
    //     return row[column.property]
    //   }
    // },
    formatDateTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    // 表格合并行与列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex  === 0) {
          return {
            rowspan: this.tableData.length,
            colspan: 1
          };
        }else{
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
        if (index < 6) {
          sums[index] = '';
          return;
        }
      });
      
      return sums;
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['营业日', '班次', '收油时间','油品品号', '油品单号', '原发密度', '原发公斤', '转换原发体积', '实收体积（V20）','实收公斤','益耗']
        const filterVal = ['businessDay', 'shifts', 'createTime', 'oilsName', 'oilOddNo','primaryDensity', 'primaryWeight', 'primaryVolume', 'actualVolume','actualWeight','consumptionWeight']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '油品采购统计报表'+this.formatDateTime(new Date()),
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
}
.main{
  min-height: calc(100vh - 191px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
}
.header h3{
  display: inline-block;
  width: 500px;
  line-height: 60px;
  margin: 0;
}
.header h3 span{
	display: inline-block;
	width: 3px;
	height: 25px;
	vertical-align: middle;
	background-color: #5B8DFF;
	margin-right: 10px;
}
.top{
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
}
.date{
  padding:0 20px;
}
.date>.el-button{
  margin-right: 20px;
  font-size: 14px;
  line-height: 36px;
  color: black;
}
.dao{
  float: right;
  line-height: 60px;
}
.date>.el-button:focus{
  color: #409EFF;
}
.xuan span{
  font-size: 14px;
  line-height: 36px;
}
.date,.xuan{
  margin-bottom: 10px;
}
.xuan .el-select:nth-of-type(1){
  margin-right: 20px;
}
p{
  font-size: 14px;
}
.biao{
  padding: 10px 20px;
  text-align: center;
}
.table{
  border: 1px solid #EDEDED;
  border-bottom:0; 
}

</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
h3 .el-button--medium.is-circle{
  border: 0;
}
.el-pagination{
  text-align: center;
}
/* .el-table_1_column_1,
.el-table_1_column_2,
.el-table__footer .el-table_1_column_1,
.el-table__footer .el-table_1_column_2,
.el-table__footer .el-table_1_column_3,
.el-table thead.is-group th{
    background-color: #F5F9FC;
}
.el-table__footer-wrapper tbody td, 
.el-table__header-wrapper tbody td{
    background-color: #fff;
} */
</style>