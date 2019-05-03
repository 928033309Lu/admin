<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>商品进销存报表</h3>
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
          <el-select @change="change" v-model="company" clearable style="width:140px" placeholder="请选择">
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
          <el-select v-model="station" clearable style="width:140px" placeholder="请选择">
            <el-option
              v-for="item in stationOptions"
              :key="item.id"
              :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="box">
          <span>展示方式</span>
          <el-select v-model="fangshixuanze" @change="fenLeiChange" clearable style="width:140px" placeholder="请选择" >
            <el-option
              v-for="item in fangshi"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入内容" v-model="searchKey" v-show="fangshixuanze==2" ></el-input>
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
            style="width:300px"
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
        <div class="table" v-show="fangshixuanze!=2" >
           <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
              prop="bigTypeName"
               align="center"
              label="商品大类"
              >
            </el-table-column>
            <el-table-column
              prop="goodsInitialCount"
              label="期初数量"
              align="center"
             >
            </el-table-column>
            <el-table-column
              label="商品入库"
              align="center">
               <el-table-column
                prop="enterhousePurchase"
                align="center"
                label="采购"
                >
              </el-table-column>
               <el-table-column
                prop="enterhouseAllocation"
                align="center"
                label="调拨"
                >
              </el-table-column>
              <el-table-column
                prop="enterhouseOnway"
                align="center"
                label="在途"
                >
              </el-table-column>
            </el-table-column>
            <el-table-column label="商品出库" align="center">
              <el-table-column
                prop="outrhouseAllocation"
                align="center"
                label="调拨"
                >
              </el-table-column>
              <el-table-column
                prop="outrhouseRefunds"
                align="center"
                label="退货"
                >
              </el-table-column>
              <el-table-column
                prop="outrhouseAbandon"
                align="center"
                label="报废"
                >
              </el-table-column>
            </el-table-column>
            <el-table-column label="销售" prop="sales" align="center">
            </el-table-column>
             <el-table-column label="销售退货" prop="salesRefunds" align="center">
            </el-table-column>
             <el-table-column label="期末数量" prop="goodsFinalCount" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="table2" v-show="fangshixuanze==2" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="bigTypeName"
               align="center"
              label="商品大类"
              >
            </el-table-column>
            <!-- <el-table-column
              prop="barCode"
              label="商品条码"
              align="center"
             >
            </el-table-column> -->
            <el-table-column
              prop="goodsName"
              label="商品名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsInitialCount"
              label="期初数量"
              align="center">
            </el-table-column>
            <el-table-column label="商品入库" align="center">
              <el-table-column
                prop="enterhousePurchase"
                align="center"
                label="采购"
                >
              </el-table-column>
              <el-table-column
                prop="enterhouseAllocation"
                align="center"
                label="调拨"
                >
              </el-table-column>
              <el-table-column
                prop="enterhouseOnway"
                align="center"
                label="在途"
                >
              </el-table-column>
            </el-table-column>
            <el-table-column label="商品出库" align="center">
              <el-table-column
                prop="outrhouseAllocation"
                align="center"
                label="调拨"
                >
              </el-table-column>
              <el-table-column
                prop="outrhouseRefunds"
                align="center"
                label="退货"
                >
              </el-table-column>
              <el-table-column
                prop="outrhouseAbandon"
                align="center"
                label="报废"
                >
              </el-table-column>
            </el-table-column>
            <el-table-column label="销售" prop="sales" align="center">
            </el-table-column>
             <el-table-column label="销售退货" prop="salesRefunds" align="center">
            </el-table-column>
             <el-table-column label="期末数量" prop="goodsFinalCount" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import { parseTime } from '@/utils'
	import { youpinlist } from "@/api/youpinbaobiao";
	import { getCompanyByWhere } from "@/api/youpinbaobiao";
  import { StationList } from "@/api/youpinbaobiao";
  import { storageList } from "@/api/youpinbaobiao";
  import { handleDownload } from '@/utils'

export default {
  data() {
    return {
      company:'',//公司
      companyOptions:[{}],//公司选择
      station:'',//公司
      stationOptions:[{}],//油站选择
      fangshi:[
          {
          value: 1,
          label: '大类'
        },
         {
          value: 2,
          label: '商品'
        }
      ]
      ,//品号
      fangshixuanze:1,//品号选择
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
      date:'',//日期
      tableData:[],//表格数据
      searchKey:'',//搜索关键字
      listSub:[],//
      list:[],//
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
		  storageList(data)
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
    fenLeiChange(){
      this.searchKey = ''
      var data = {
		    showType:this.fangshixuanze,
		  }
		  console.log(data)
		  storageList(data)
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
		    oilsId:this.oilsId,
		    startTime:this.date[0],
        endTime:this.date[1],
        showType:this.fangshixuanze,
        searchKey:this.searchKey
		  }
		  storageList(data)
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
      // document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+3+'px'
      document.body.style.width = '1113px'
      // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
      
      // document.querySelector('.el-table__header').style = "margin: 0 auto;"
      // document.querySelector('.el-table__body').style = "margin: 0 auto;"
      window.print();
      window.location.reload()
      // document.body.innerHTML = oldContent;
    },
    //导出
    exportTable(){
      if(this.fangshixuanze==1){
        var name = '商品进销存报表'
        var tHeaders1 = ['商品大类', '期初数量', '商品入库-采购', '商品入库-调拨', '商品入库-在途','商品出库-调拨','商品出库-退货','商品出库-报废','销售','销售退货','期末数量'];
        var filterVals1 = ['bigTypeName', 'goodsInitialCount', 'enterhousePurchase', 'enterhouseAllocation', 'enterhouseOnway','outrhouseAllocation','outrhouseRefunds','outrhouseAbandon','sales','salesRefunds','goodsFinalCount'];
        handleDownload(this.list,tHeaders1,filterVals1,name)
      }else{
        var name = '商品进销存报表'
        var tHeaders1 = ['商品大类','商品名称', '期初数量', '商品入库-采购', '商品入库-调拨', '商品入库-在途','商品出库-调拨','商品出库-退货','商品出库-报废','销售','销售退货','期末数量'];
        var filterVals1 = ['bigTypeName','goodsName', 'goodsInitialCount', 'enterhousePurchase', 'enterhouseAllocation', 'enterhouseOnway','outrhouseAllocation','outrhouseRefunds','outrhouseAbandon','sales','salesRefunds','goodsFinalCount'];
        handleDownload(this.tableData,tHeaders1,filterVals1,name)
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
.top{
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.date{
  padding:0 10px;
}
.date>.el-button{
  margin-right: 20px;
  font-size: 14px;
  line-height: 36px;
  color: black;
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
//   display: flex;
//   line-height: 36px;
// }
.box span{
  width: 64px;
}
.box .el-input{
  width: 30%;
  margin-left: 1%;
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
.el-table_1_column_1,
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
}
</style>