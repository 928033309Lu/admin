<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>资金缴存记录</h3>
      <div class="dao">
        <el-button type="primary" @click="exportTable">导出</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
        <el-button type="primary" @click="chaxun">查询</el-button>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>公司</span>
          <el-select @change="change" clearable v-model="company" placeholder="请选择">
            <el-option
              v-for="item in companyOptions"
              :key="item.id"
              :label="item.company_name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="box">
          <span>加油站</span>
          <el-select v-model="station" @change="chaxun" clearable placeholder="请选择">
            <el-option
              v-for="item in stationOptions"
              :key="item.id"
              :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="date">
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
            @change="chaxun"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
          
        </div>
      </div>
      
      <div class="biao" id="test">
        <div class="table" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="company_name"
               align="center"
              label="公司"
              >
            </el-table-column>
            <el-table-column
              prop="short_name"
              label="油站"
              align="center"
             >
            </el-table-column>
            <el-table-column
              prop="amount_deposited"
              label="缴存金额"
              align="center">
            </el-table-column>
            <el-table-column label="缴存时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.deposit_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作人员" prop="username" align="center">
            </el-table-column>
             <el-table-column label="操作时间" align="center">
               <template slot-scope="scope">
                <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
              </template>
            </el-table-column>
             <el-table-column label="操作" align="center">
               <template slot-scope="scope">
                <el-button type="primary" @click="ticket(scope.row)">查看小票</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="seeVisible" width='50%' title="查看小票">
      <div class="edit">
        <img :src="img" alt="">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button   @click="seeVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { parseTime } from '@/utils'
	import { youpinlist } from "@/api/youpinbaobiao";
	import { getCompanyByWhere } from "@/api/youpinbaobiao";
  import { StationList } from "@/api/youpinbaobiao";
  import { depositList } from "@/api/youpinbaobiao";
  import { ticketList } from "@/api/youpinbaobiao";
  import { handleDownload } from '@/utils'

export default {
  data() {
    return {
      company:'',//公司
      companyOptions:[{}],//公司选择
      station:'',//公司
      stationOptions:[{}],//油站选择
      date:'',//日期
      kucun:'',
      num:0,
      tableData:[],
      img:'',
      seeVisible:false,
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
		    showType:this.fangshixuanze,
		  }
		  console.log(data)
		  depositList(data)
		    .then(response => {
          console.log(response.data)
          if (this.fangshixuanze==1) {
            this.list = response.data
          }else{
		        this.tableData = response.data
          }
		      // this.tableData = response.data
		      this.listLoading = false
		      
		    })
		  var a = {}
		  youpinlist(a)
		    .then(response => {
		      // console.log(response.data)
		      this.oilsList = response.data
		    })
		  getCompanyByWhere(a)
		    .then(response => {
		      // console.log(response.data)
		      this.companyOptions = response.data
		    })
    },
    change(){
		  var data = {
		    companyId:this.company
		  }
		  StationList(data)
		    .then(response => {
		      console.log(response.data)
		      this.stationOptions = response.data
		    })
    },
    ticket(row){
      this.seeVisible = true
      var data = {
		    id:row.id
		  }
		  ticketList(data)
		    .then(response => {
          console.log(response.data)
          this.img = response.data.img
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
		  this.listLoading = true
			if(this.date==null){
				this.date=[]
			}
		  var data = {
		    companyId:this.company,
		    stationId:this.station,
		    startTime:this.date[0],
        endTime:this.date[1],
		  }
		  depositList(data)
		    .then(response => {
		      console.log(response.data)
		      this.tableData = response.data
		      this.listLoading = false
		    })
		},
    formatDate(row, column) { 
      const now = new Date(row[column.property])
      console.log(now)
      if(now != "Invalid Date"){
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds()>10 ? now.getSeconds() :'0'+now.getSeconds(); 
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
      }else{
        return ''
      }
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
    dayin(){
      let wpt = document.getElementById('test');
      let newContent = wpt.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      // document.body.style = "transform:scale(0.8,0.8); margin-left: 0px;"
      document.body.style = "margin: 0 auto;"
      document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+3+'px'
      // document.body.style.width = '1113px'
      // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
      
      // document.querySelector('.el-table__header').style = "margin: 0 auto;"
      // document.querySelector('.el-table__body').style = "margin: 0 auto;"
      window.print();
      window.location.reload()
      // document.body.innerHTML = oldContent;
    },
    //导出
    exportTable(){
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].deposit_time = parseTime(this.tableData[i].deposit_time)
        this.tableData[i].create_time = parseTime(this.tableData[i].create_time)
      }
      var name = '资金缴存记录'
      var tHeaders1 = ['公司', '油站', '缴存金额', '缴存时间', '操作人员', '操作时间'];
      var filterVals1 = ['company_name', 'short_name', 'amount_deposited', 'deposit_time', 'username', 'create_time'];
      handleDownload(this.tableData,tHeaders1,filterVals1,name)
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
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
// .date{
//   margin-top: 10px;
//   padding:0 10px;
//   display: flex;
// }
.date>.el-button{
  margin-right: 20px;
  font-size: 14px;
  color: black;
}
.date span{
  line-height: 36px;
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
// .box{
//   width: 50%;
// }
.box span{
  width: 64px;
}
.box .el-input{
  width: 30%;
  margin-left: 1%;
}
.dialog-footer,.edit{
  text-align: center;
}
.edit img{
  width: 60%;
}
.dao{
  float: right;
  line-height: 60px;
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