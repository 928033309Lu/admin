
<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>油枪检测统计报表</h3>
      <div class="dao">
        <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="exportTable">{{ $t('excel.export') }}</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
        <!-- <el-button type="primary" @click="chaxun">查询</el-button> -->
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>加油站</span>
          <el-select v-model="station" clearable placeholder="请选择">
            <el-option
              v-for="item in companyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
          type="daterange"
          clearable
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </div>

      <div class="biao" id="test">
        <div class="table">
          <el-table
            :data="tableData[0]"
            :span-method="arraySpanMethod"
            style="width: 100%">
            <el-table-column label="加油站" align="center">
            	<template slot-scope="scope">
            		<span>合计</span>
            	</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="oilsName"
              label="油品号">
            </el-table-column>
            <el-table-column
              label="自用油"
              align="center"
              prop="volumeSelf">
              <!-- <template slot-scope="scope">
                
              </template> -->
            </el-table-column><el-table-column
              label="检测（回罐）"
              align="center"
              prop="volumeTestY">
            </el-table-column><el-table-column
              label="检测（不回罐）"
              align="center"
              prop="volumeTsetN">
            </el-table-column><el-table-column
              label="合计"
              align="center"
              prop="sum">
            </el-table-column>
          </el-table>
          <div class="tn">
            <el-table v-for="(item, index) in tableData" :key="index" v-show="index>0" :data="item" :span-method="arraySpanMethod"
             style="width: 100%">
              <el-table-column
                label="加油站"
                align="center"
                prop="stationName">
              </el-table-column>
              <el-table-column
                align="center"
                prop="oilsName"
                label="油品号">
              </el-table-column>
              <el-table-column
                label="自用油"
                align="center"
                prop="volumeSelf">
                <!-- <template slot-scope="scope">
                  
                </template> -->
              </el-table-column><el-table-column
                label="检测（回罐）"
                align="center"
                prop="volumeTestY">
              </el-table-column><el-table-column
                label="检测（不回罐）"
                align="center"
                prop="volumeTsetN">
              </el-table-column><el-table-column
                label="合计"
                align="center"
                prop="sum">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import {
		youGunTestCompany
	} from "@/api/youpinbaobiao";
	import {
		parseTime
	} from '@/utils'
	import {
		StationList
  } from "@/api/youpinbaobiao";
  import { handleDownload } from '@/utils'

export default {
  data() {
    return {
      station:'',//公司
      stationOptions:[{}],//油站选择
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
			youGunTestCompany(data)
				.then(response => {
					console.log(response.data)
					this.tableData = response.data;
					this.listLoading = false
		
				})
			var a = {}
			StationList(a)
				.then(response => {
					// console.log(response.data)
					this.stationOptions = response.data
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
            rowspan: 1000000,
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
      var tHeaders = ['加油站','油品品号',  '自用油', '检测（回罐）', '检测（不回罐）', '合计'];
      var filterVals = ['stationName','oilsName',  'volumeSelf', 'volumeTestY', 'volumeTsetN', 'sum'];
      var name = '油枪检测统计报表'
      for (let i = 0; i < this.tableData.length; i++) {
        handleDownload(this.tableData[i],tHeaders,filterVals,name)
      }
      
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
.tn .el-table__header-wrapper{
  display: none;
}
.tn .el-table{
  margin-top: 10px;
}
.box{
  padding-top: 10px;
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