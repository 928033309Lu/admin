<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>商品销售报表</h3>
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
          <el-input placeholder="请输入内容" v-model="searchKey" v-show="fangshixuanze==2" style="width: 100px;"></el-input>
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
      <div id="test">
        <div class="biao" v-show="fangshixuanze==2">
          <div class="table">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="bigTypeName"
                label="商品大类"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="商品名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="goodsCount"
                label="数量"
                align="center">
              </el-table-column>
              <el-table-column label="实收金额" align="center">
                <el-table-column
                  prop="sum"
                  align="center"
                  label="合计"
                  >
                </el-table-column>
                <el-table-column
                  prop="cash"
                  align="center"
                  label="现金"
                  >
                </el-table-column>
                <el-table-column
                  prop="wechat"
                  align="center"
                  label="微信"
                  >
                </el-table-column>
                <el-table-column
                  prop="alipay"
                  align="center"
                  label="支付宝"
                  >
                </el-table-column>
                <el-table-column
                  prop="card"
                  align="center"
                  label="银联卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="member"
                  align="center"
                  label="会员卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="oldMember"
                  align="center"
                  label="老会员"
                  >
                </el-table-column>
              </el-table-column>
              <el-table-column label="折扣" align="center">
                <el-table-column
                  prop="discountElec"
                  align="center"
                  label="电子券"
                  >
                </el-table-column>
                <el-table-column
                  prop="discountMember"
                  align="center"
                  label="会员卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="discountPro"
                  align="center"
                  label="促销"
                  >
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="biao" v-show="fangshixuanze==1">
          <div class="table">
            <el-table
              :data="listSub"
              style="width: 100%">
              <el-table-column
                prop="companyName"
                label="公司"
                align="center">
              </el-table-column>
              <el-table-column label="实收金额" align="center">
                <el-table-column
                  prop="sum"
                  align="center"
                  label="合计"
                  >
                </el-table-column>
                <el-table-column
                  prop="cash"
                  align="center"
                  label="现金"
                  >
                </el-table-column>
                <el-table-column
                  prop="wechat"
                  align="center"
                  label="微信"
                  >
                </el-table-column>
                <el-table-column
                  prop="alipay"
                  align="center"
                  label="支付宝"
                  >
                </el-table-column>
                <el-table-column
                  prop="card"
                  align="center"
                  label="银联卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="member"
                  align="center"
                  label="会员卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="oldMember"
                  align="center"
                  label="老会员"
                  >
                </el-table-column>
              </el-table-column>
              <el-table-column label="折扣" align="center">
                <el-table-column
                  prop="discountElec"
                  align="center"
                  label="电子券"
                  >
                </el-table-column>
                <el-table-column
                  prop="discountMember"
                  align="center"
                  label="会员卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="discountPro"
                  align="center"
                  label="促销"
                  >
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div class="table">
            <el-table
              :data="list"
              style="width: 100%">
              <el-table-column
                prop="bigTypeName"
                label="商品大类"
                align="center"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="bigTypeCount"
                label="数量"
                align="center">
              </el-table-column>
              <el-table-column label="实收金额" align="center">
                <el-table-column
                  prop="sum"
                  align="center"
                  label="合计"
                  >
                </el-table-column>
                <el-table-column
                  prop="cash"
                  align="center"
                  label="现金"
                  >
                </el-table-column>
                <el-table-column
                  prop="wechat"
                  align="center"
                  label="微信"
                  >
                </el-table-column>
                <el-table-column
                  prop="alipay"
                  align="center"
                  label="支付宝"
                  >
                </el-table-column>
                <el-table-column
                  prop="card"
                  align="center"
                  label="银联卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="member"
                  align="center"
                  label="会员卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="oldMember"
                  align="center"
                  label="老会员"
                  >
                </el-table-column>
              </el-table-column>
              <el-table-column label="折扣" align="center">
                <el-table-column
                  prop="discountElec"
                  align="center"
                  label="电子券"
                  >
                </el-table-column>
                <el-table-column
                  prop="discountMember"
                  align="center"
                  label="会员卡"
                  >
                </el-table-column>
                <el-table-column
                  prop="discountPro"
                  align="center"
                  label="促销"
                  >
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
  import { youStorageGrouplist } from "@/api/youpinbaobiao";
	import { parseTime } from '@/utils'
	import { youpinlist } from "@/api/youpinbaobiao";
	import { getCompanyByWhere } from "@/api/youpinbaobiao";
  import { StationList } from "@/api/youpinbaobiao";
  import { report } from "@/api/youpinbaobiao";
  import { handleDownload } from '@/utils'

export default {
  data() {
    return {
      company:'',//公司
      companyOptions:[{}],//公司选择
      station:'',//公司
      stationOptions:[{}],//油站选择
      oilsId:'',//油品id
      oilsList:[],//油品列表
      date:'',//日期
      tableData:[{
        amount2:'合计',
        date:"Sat Jan 12 2019 13:50:03 GMT+0800"
      },{
        amount2:'合计'
      },{
        amount2:'合计'
      }],//表格数据
      fangshi:[
          {
          value: 1,
          label: '大类'
        },
         {
          value: 2,
          label: '商品'
        }
      ],//品号
      fangshixuanze:1,//品号选择
      listSub:[],//
      list:[],//
      searchKey:'',//搜索关键字
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
		  report(data)
		    .then(response => {
          console.log(response.data)
          if (this.fangshixuanze==1) {
            this.list = response.data.list
            this.listSub = response.data.listSub
          }else{
		        this.tableData = response.data.list
          }
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
		  report(data)
		    .then(response => {
          console.log(response.data)
          if (this.fangshixuanze==1) {
            this.list = response.data.list
            this.listSub = response.data.listSub
          }else{
            this.tableData = response.data.list
          }
		      
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
		  report(data)
		    .then(response => {
          console.log(response.data)
          if (this.fangshixuanze==1) {
            this.list = response.data.list
            this.listSub = response.data.listSub
          }else{
		        this.tableData = response.data.list
          }
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
        var tHeaders = ['公司', '实收金额-合计', '实收金额-现金', '实收金额-微信','实收金额-支付宝','实收金额-银联卡','实收金额-会员卡','实收金额-老会员','折扣-电子券','折扣-会员卡','折扣-促销'];
        var filterVals = ['companyName','sum', 'cash', 'wechat','alipay','card','member','oldMember','discountElec','discountMember','discountPro'];
        var name = '商品销售报表'
        handleDownload(this.listSub,tHeaders,filterVals,name)

        var tHeaders1 = ['商品大类', '数量', '实收金额-合计', '实收金额-现金', '实收金额-微信','实收金额-支付宝','实收金额-银联卡','实收金额-会员卡','实收金额-老会员','折扣-电子券','折扣-会员卡','折扣-促销'];
        var filterVals1 = ['bigTypeName', 'bigTypeCount', 'sum', 'cash', 'wechat','alipay','card','member','oldMember','discountElec','discountMember','discountPro'];
        handleDownload(this.list,tHeaders1,filterVals1,name)
      }else{
        var name = '商品销售报表'
        var tHeaders1 = ['商品大类','商品名称', '数量', '实收金额-合计', '实收金额-现金', '实收金额-微信','实收金额-支付宝','实收金额-银联卡','实收金额-会员卡','实收金额-老会员','折扣-电子券','折扣-会员卡','折扣-促销'];
        var filterVals1 = ['bigTypeName','goodsName', 'goodsCount', 'sum', 'cash', 'wechat','alipay','card','member','oldMember','discountElec','discountMember','discountPro'];
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
  margin-top: 10px;
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