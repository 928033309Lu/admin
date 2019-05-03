<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>异常监控统计</h3>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>公司</span>
          <el-select v-model="value"  clearable placeholder="请选择">
            <el-option
              v-for="item in companyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="box">
          <span>加油站</span>
          <el-select v-model="station" clearable  placeholder="请选择">
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
          <el-button type="text">30天</el-button>
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
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
      </div>
      
      
      <div class="biao" >
       <div class="b">
          <h5><span></span>异常交易监控</h5>
        <div class="table" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="amount2"
              align="center"
              label="加油站"
              width="210"
              >
            </el-table-column>
            <el-table-column
              prop="province"
              label="异常支付方式"
              align="center"
              width="270"
             >
            </el-table-column>
            <el-table-column
              prop="province"
              label="异常金额"
              align="center">
            </el-table-column>
            <el-table-column label="操作时间" align="center" width="270">
            </el-table-column>
            <el-table-column label="操作" align="center" width="90" >
                
            </el-table-column>
             <el-table-column label="更多" align="center" :render-header="renderHeader" width="90">
             
            </el-table-column>
          </el-table>
        </div>
      </div>
    <div class="b">
          <h5><span></span>油罐库存监控</h5>
        <div class="table" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="amount2"
               align="center"
              label="加油站"
              width="210"
              >
            </el-table-column>
            <el-table-column
              prop="province"
              label="油罐号"
              align="center"
             >
            </el-table-column>
            <el-table-column
              prop="province"
              label="异常时间"
              align="center"
              width="270">
            </el-table-column>
            <el-table-column label="操作" align="center" width="90">
            
            </el-table-column>
            <el-table-column label="更多" align="center"  :render-header="renderHeader" width="90">
              
            </el-table-column>
          </el-table>
        </div>
      </div>
         <div class="b">
          <h5><span></span>设备异常监控</h5>
        <div class="table" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="amount2"
               align="center"
              label="加油站"
              width="210"
              >
            </el-table-column>
            <el-table-column
              prop="province"
              label="设备"
              align="center"
              
             >
            </el-table-column>
            <el-table-column
              prop="province"
              label="枪/罐号"
              align="center">
            </el-table-column>
            <el-table-column label="异常时间" align="center" width="270">
            </el-table-column>
            <el-table-column label="操作" align="center" width="90">
              
            </el-table-column>
             <el-table-column label="更多" align="center"  :render-header="renderHeader" width="90">
              
            </el-table-column>
          </el-table>
        </div>
      </div>
         <div class="b">
          <h5><span></span>操作异常监控</h5>
        <div class="table" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="amount2"
               align="center"
              label="加油站"
              width="210"
              >
            </el-table-column>
            <el-table-column
              prop="province"
              label="操作类型"
              align="center"
             >
            </el-table-column>
            <el-table-column
              prop="province"
              label="操作时间"
              align="center"
              width="270">
            </el-table-column>
            <el-table-column label="操作" align="center" width="90" >
            
            </el-table-column>
            <el-table-column label="更多" align="center"  :render-header="renderHeader" width="90">
              
            </el-table-column>
          </el-table>
        </div>
      </div>
      </div>
    </div>
  

  </div>
  
</template>
<script>
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
     tableData:[{}],
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
  methods:{
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
.b h5{
  display: inline-block;
  margin: 10px 0;
  margin-left: 5px;
}
.b h5 span{
	display: inline-block;
	width: 2px;
	height: 12px;
	background-color: #5B8DFF;
	margin-right: 5px;
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
.date .el-button{
  margin-right: 20px;
  font-size: 14px;
  color: black;
}
.date span{
  line-height: 36px;
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
.box{
  // width: 50%;
}
.box span{
  width: 64px;
}
.box .el-input{
  width: 30%;
  margin-left: 1%;
}
.b{
  width: 100%;
  text-align: left;
  border:1px solid #eee;
  margin-top: 20px;
}
.gengduo{
  color: #409EFF;
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