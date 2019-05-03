
<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>油枪检测统计报表</h3>
      <div class="dao">
        <el-button type="primary" @click="exportTable">导出</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
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
              :value="item.id">
            </el-option>
          </el-select>
        </div>
         <div class="date">
        <span>时间：</span>
        <!-- <el-button type="text">今天</el-button>
        <el-button type="text">7天</el-button>
        <el-button type="text">14天</el-button>
        <el-button type="text">30天</el-button> -->
        <el-date-picker
          v-model="date"
          clearable
          :picker-options="pickerOptions2"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </div>
     
      <div class="biao" id="test">
        <div class="table">
          <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="加油油枪号"
            align="center"
            prop="oilGunNo">
          </el-table-column>
          <el-table-column
            align="center"
            prop="oilsName"
            label="油品号">
          </el-table-column>
          <el-table-column
            label="升数"
            align="center"
            prop="sum">
          </el-table-column><el-table-column
            label="类型--检测类型1.自用油2.检测（回罐）3.检测（不回罐）"
            align="center"
            prop="testType">
          </el-table-column><el-table-column
            label="时间"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column><el-table-column
            label="备注"
            align="center"
            prop="remarks">
          </el-table-column>
        </el-table>
        </div>
      </div>
			
    </div>
  </div>
</template>
<script>
		import {
		youGunTestStation
	} from "@/api/youpinbaobiao";
	import {
		parseTime
	} from '@/utils'
	import {
		youpinlist
  } from "@/api/youpinbaobiao";
  import { handleDownload } from '@/utils'

export default {
  data() {
    return {
     oilsId: '', //油品id
     oilsList: [], //油品列表
      date:'',//日期
      tableData:[],//表格数据
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
        product:'',//
    }
  },
	mounted() {
		this.get()
	},
  methods:{
		get() {
			this.listLoading = true
			var data = {
			}
			youGunTestStation(data)
				.then(response => {
					console.log(response.data)
					this.tableData = response.data;
					this.listLoading = false
		
				})
			var a = {}
			youpinlist(a)
				.then(response => {
          console.log('油品')
					console.log(response.data)
					this.oilsList = response.data
				})
    },
    chaxun(){
      
      var data = {
        oilsId:this.oilsId,
        startTime:this.date[0],
        endTime:this.date[1]
			}
			youGunTestStation(data)
				.then(response => {
					console.log(response.data)
					this.tableData = response.data;
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
            rowspan: 1000,
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
      document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+3+'px'
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
        this.tableData[i].createTime = parseTime(this.tableData[i].createTime)
        // this.tableData[i].lastTimePurchase = parseTime(this.tableData[i].lastTimePurchase)
      }
      var tHeaders = ['加油油枪号','油品品号', '升数', '类型--检测类型1.自用油2.检测（回罐）3.检测（不回罐）', '时间', '备注'];
      var filterVals = ['oilGunNo','oilsName', 'sum', 'testType', 'createTime', 'remarks'];
      var name = '油枪检测统计报表'
      handleDownload(this.tableData,tHeaders,filterVals,name)
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
	margin-right: 5px;
}
.top{
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.date{
  padding:0 10px;
}
.date .el-button{
  margin-right: 20px;
  font-size: 14px;
  line-height: 36px;
  color: black;
}
.date .el-button:focus{
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