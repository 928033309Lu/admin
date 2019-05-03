<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>油品体积检验报表</h3>
      <div class="dao">
        <el-button type="primary" @click="exportTable">导出</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
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
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="biao" id="test" v-loading="listLoading">
        <div class="table">
          <el-table
            :data="tableData2"
            style="width: 100%">
            <el-table-column
              label="油罐"
              prop="oilCanNo"
              align="center"
              >
              <!-- <template slot-scope="scope">
                <span>合计</span>
              </template> -->
            </el-table-column>
            <el-table-column label="油罐读数" align="center">
              <el-table-column
                prop="initialStorage"
                label="期初库存"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="finalStorage"
                label="期末库存"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="addVolume"
                label="收油体积"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="reduceVolume"
                label="出油体积"
                align="center"
                min-width="110">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="posVolume"
              label="POS结算体积"
              align="center">
            </el-table-column>
            <el-table-column
              prop="consumeVolume"
              label="POS结算体积与油罐出油体积差异"
              align="center">
            </el-table-column>
          </el-table>  
          <div class="tb">
            <el-table
              :data="tableData1"
              style="width: 100%">
              <el-table-column
                label="油枪号"
                prop="oilGunNo"
                align="center"
                >
                <!-- <template slot-scope="scope">
                  <span>合计</span>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="oilCanNo"
                label="油罐号"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="openingPumpCode"
                label="开班泵码"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="closingPumpCode"
                label="结班泵码"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="gunReduce"
                label="枪出量"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="sales"
                label="销售量"
                align="center">
              </el-table-column>
              <el-table-column
                prop="tests"
                label="检测油"
                align="center">
              </el-table-column>
              <el-table-column
                prop="consumeVolume"
                label="差异"
                align="center">
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
		youCalibrationGun
	} from "@/api/youpinbaobiao";
	import {
		youCalibrationCan
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
      tableData1:[],//表格数据1
      tableData2:[],//表格数据2
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
			youCalibrationGun(data)
				.then(response => {
					console.log(response.data)
					this.tableData1 = response.data;
					this.listLoading = false
		
				})
				youCalibrationCan(data)
					.then(response => {
						console.log(response.data)
						this.tableData2 = response.data;
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
      var tHeaders = ['油罐','油罐读数-期初库存', '油罐读数-期末库存', '油罐读数-收油体积', '油罐读数-出油体积', 'POS结算体积','POS结算体积与油罐出油体积差异'];
      var filterVals = ['oilCanNo','initialStorage', 'finalStorage', 'addVolume', 'reduceVolume', 'posVolume','consumeVolume'];
      var name = '油品体积检验报表'
      handleDownload(this.tableData2,tHeaders,filterVals,name)

      var tHeaders1 = ['油枪号','油罐号', '开班泵码', '结班泵码', '枪出量', '销售量','检测油','差异'];
      var filterVals1 = ['oilGunNo','oilCanNo', 'openingPumpCode', 'closingPumpCode', 'gunReduce', 'sales','tests','consumeVolume'];
      handleDownload(this.tableData1,tHeaders1,filterVals1,name)
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
.tn .is-group{
  display: none;
}
.tb .el-table{
  margin-top: 10px;
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