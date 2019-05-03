<template>
  <div class="warp sales-o">
    <div class="header">
      <h3>
        <span></span>油品销售报表
      </h3>
      <div class="dao">
        <el-button type="primary" style="margin-left: 5px;" @click="exportTable">导出</el-button>
        <el-button type="primary" style="margin-left: 5px;" @click="dayin">打印</el-button>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>品号</span>
          <el-select v-model="oilsId" @change="chaxun" clearable placeholder="请选择">
            <el-option
              v-for="item in oilsList"
              :key="item.id"
              :label="item.oils_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="box">
          <span>时间</span>
          <!-- <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker> -->
          <el-date-picker
            v-model="date"
            @change="chaxun"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div class="box">
          <el-radio v-model="radio" @change="chaxun" label="1">营业日</el-radio>
          <el-radio v-model="radio" @change="chaxun" label="2">自然日</el-radio>
        </div>
      </div>
      <div class="biao" id="test">
        <div class="table">
          <el-table :data="tableData" row-class-name="white-row" :span-method="objectSpanMethod" style="width: 100%">
            <el-table-column label="油品分类" align="center">
              <template slot-scope="scope">
                <span v-show="scope.row.oilsType==0">汽油</span>
                <span v-show="scope.row.oilsType==1">柴油</span>
                <span v-show="scope.row.oilsType==3">合计</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="oilsName" label="油品号">
              
            </el-table-column>
            <el-table-column align="center" prop="price" label="单价">
              
            </el-table-column>
            <el-table-column label="合计"  align="center">
              <el-table-column label="升数" prop="sumCount" align="center"></el-table-column>
              <el-table-column label="金额" prop="sumAmount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="现金" align="center">
              <el-table-column label="升数" prop="cashCount" align="center"></el-table-column>
              <el-table-column label="金额" prop="cashAmount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="微信" align="center">
              <el-table-column label="升数" prop="wechatCount" align="center"></el-table-column>
              <el-table-column label="金额" prop="wechatAmount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="支付宝" align="center">
              <el-table-column label="升数" prop="alipayCount" align="center"></el-table-column>
              <el-table-column label="金额" prop="alipayAmount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="银行卡" align="center">
              <el-table-column label="升数" prop="cardCount" align="center"></el-table-column>
              <el-table-column label="金额" prop="cardAmount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="会员" align="center">
              <el-table-column label="升数" prop="memberAmount" align="center"></el-table-column>
              <el-table-column label="金额" prop="memberCount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="老会员" align="center">
              <el-table-column label="升数" prop="oldMemberCount" align="center"></el-table-column>
              <el-table-column label="金额" prop="oldMemberAmount" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="折扣" align="center">
              <el-table-column label="电子券" prop="discountElec" align="center"></el-table-column>
              <el-table-column label="会员卡" prop="discountMem" align="center"></el-table-column>
              <el-table-column label="促销" prop="discountPro" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="检测用油(升)" prop="tests" align="center"></el-table-column>
            <!-- <el-table-column label="检测用油(升)" prop="oilsName" align="center">
              <el-table-column align="center" ></el-table-column>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { youGrouplist } from "@/api/youpinbaobiao";
import { parseTime } from "@/utils";
import { youpinlist } from "@/api/youpinbaobiao";
import { getCompanyByWhere } from "@/api/youpinbaobiao";
import { StationList } from "@/api/youpinbaobiao";
import { reportList } from "@/api/youpinbaobiao";
import { handleDownload } from '@/utils'

export default {
  data() {
    return {
      radio: "1", //单选
      company: "", //公司
      companyOptions: [{}], //公司选择
      station: "", //公司
      stationOptions: [{}], //油站选择
      oilsId: "", //油品id
      oilsList: [], //油品列表
      date: "", //日期
      tableData: [], //表格数据
      listLoading: true,
      downloadLoading: false,
      //表格合并
      qiyou:0,
      chaiyou:0,
      //合计
      sumAmount:0,
      sumCount:0,
      chaisumAmount:0,
      chaisumCount:0,
      //现金
      cashAmount:0,
      cashCount:0,
      chaicashAmount:0,
      chaicashCount:0,
      //微信
      wechatAmount:0,
      wechatCount:0,
      chaiwechatAmount:0,
      chaiwechatCount:0,
      //支付宝
      alipayAmount:0,
      alipayCount:0,
      chaialipayAmount:0,
      chaialipayCount:0,
      //银行卡
      cardAmount:0,
      cardCount:0,
      chaicardAmount:0,
      chaicardCount:0,
      //会员
      memberAmount:0,
      memberCount:0,
      chaimemberAmount:0,
      chaimemberCount:0,
      //老会员
      oldMemberAmount:0,
      oldMemberCount:0,
      chaioldMemberAmount:0,
      chaioldMemberCount:0,
      //折扣
      discountElec:0,
      discountMem:0,
      discountPro:0,
      chaidiscountElec:0,
      chaidiscountMem:0,
      chaidiscountPro:0,
      //老会员
      tests:0,
      chaitests:0,
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
        spanArr:[],
        spanArr1:[],
        xiaojiArr:[],
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    //表格合并
    objectSpanMethod({row, column, rowIndex, columnIndex}){
      if(columnIndex ===0){
        if (rowIndex==this.tableData.length-1){
          return {
            rowspan: 1,
            colspan: 3
          }
        }
        if(this.spanArr[rowIndex]){
          return {
            rowspan:this.spanArr[rowIndex],
            colspan:1
          }
        }else{
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }else if(columnIndex === 1){
        if (this.xiaojiArr[rowIndex]){
          return {
            rowspan: 1,
            colspan: 2
          }
        }
        if (rowIndex==this.tableData.length-1){
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if(this.spanArr1[rowIndex]){
          return {
            rowspan:this.spanArr1[rowIndex],
            colspan:1
          }
        }else{
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }else if(columnIndex === 2){
        if (rowIndex==this.tableData.length-1){
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (this.xiaojiArr[rowIndex]){
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    get() {
      this.listLoading = true;
      var data = {};
      var a = {};
      youpinlist(a).then(response => {
        // console.log(response.data);
        this.oilsList = response.data;
      });
      getCompanyByWhere(a).then(response => {
        // console.log(response.data);
        this.companyOptions = response.data;
      });
      this.chaxun()
    },
    change() {
      var data = {
        companyId: this.company
      };
      StationList(data).then(response => {
        console.log(response.data);
        this.stationOptions = response.data;
      });
    },
		chaxun(){
		  this.listLoading = true
			if(this.date==null){
				this.date=[]
			}
		  var data = {
		    oilsId:this.oilsId,
		    startTime:this.date[0],
        endTime:this.date[1],
        dayType:this.radio
		  }
		  console.log(data);
      reportList(data).then(response => {
        console.log('列表');
        console.log(response.data);
        this.tableData = []
        this.xiaojiArr = []
        this.spanArr = []
        this.spanArr1 = []
        this.chaisumAmount=0
        this.chaisumCount=0
        this.chaicashAmount=0
        this.chaicashCount=0
        this.chaiwechatAmount=0
        this.chaiwechatCount=0
        this.chaialipayAmount=0
        this.chaialipayCount=0
        this.chaicardAmount=0
        this.chaicardCount=0
        this.chaimemberAmount=0
        this.chaimemberCount=0
        this.chaioldMemberAmount=0
        this.chaioldMemberCount=0
        this.chaidiscountMem=0
        this.chaidiscountPro=0
        this.chaidiscountElec=0
        this.chaitests=0
        this.sumAmount=0
        this.sumCount=0
        this.cashAmount=0
        this.cashCount=0
        this.wechatAmount=0
        this.wechatCount=0
        this.alipayAmount=0
        this.alipayCount=0
        this.cardAmount=0
        this.cardCount=0
        this.memberAmount=0
        this.memberCount=0
        this.oldMemberAmount=0
        this.oldMemberCount=0
        this.discountMem=0
        this.discountPro=0
        this.discountElec=0
        this.tests=0
        var n = null
        for (let i = 0; i < response.data.柴油.length; i++) {
          var a = response.data.柴油[i]
          a.oilsType = 1
          this.xiaojiArr.push(0)
          this.chaisumAmount+=a.sumAmount
          this.chaisumCount+=a.sumCount
          this.chaicashAmount+=a.cashAmount
          this.chaicashCount+=a.cashCount
          this.chaiwechatAmount+=a.wechatAmount
          this.chaiwechatCount+=a.wechatCount
          this.chaialipayAmount+=a.alipayAmount
          this.chaialipayCount+=a.alipayCount
          this.chaicardAmount+=a.cardAmount
          this.chaicardCount+=a.cardCount
          this.chaimemberAmount+=a.memberAmount
          this.chaimemberCount+=a.memberCount
          this.chaioldMemberAmount+=a.oldMemberAmount
          this.chaioldMemberCount+=a.oldMemberCount
          this.chaidiscountMem+=a.discountMem
          this.chaidiscountPro+=a.discountPro
          this.chaidiscountElec+=a.discountElec
          this.chaitests+=a.tests
          this.tableData.push(a)
        }
        if (response.data.柴油.length) {
          this.xiaojiArr.push(2)
          this.xiaojiArr[response.data.柴油.length] = 2
          this.tableData.splice(response.data.柴油.length, 0, {
            oilsType:1,
            oilsName:'小计',
            sumAmount:this.chaisumAmount,
            sumCount:this.chaisumCount,
            cashAmount:this.chaicashAmount,
            cashCount:this.chaicashCount,
            wechatAmount:this.chaiwechatAmount,
            wechatCount:this.chaiwechatCount,
            alipayAmount:this.chaialipayAmount,
            alipayCount:this.chaialipayCount,
            cardAmount:this.chaicardAmount,
            cardCount:this.chaicardCount,
            memberAmount:this.chaimemberAmount,
            memberCount:this.chaimemberCount,
            oldMemberAmount:this.chaioldMemberAmount,
            oldMemberCount:this.chaioldMemberCount,
            discountMem:this.chaidiscountMem,
            discountPro:this.chaidiscountPro,
            discountElec:this.chaidiscountElec,
            tests:this.chaitests,
          }) 
        }
        for (let i = 0; i < response.data.汽油.length; i++) {
          var b = response.data.汽油[i]
          b.oilsType = 0
          this.sumAmount+=b.sumAmount
          this.sumCount+=b.sumCount
          this.cashAmount+=b.cashAmount
          this.cashCount+=b.cashCount
          this.wechatAmount+=b.wechatAmount
          this.wechatCount+=b.wechatCount
          this.alipayAmount+=b.alipayAmount
          this.alipayCount+=b.alipayCount
          this.cardAmount+=b.cardAmount
          this.cardCount+=b.cardCount
          this.memberAmount+=b.memberAmount
          this.memberCount+=b.memberCount
          this.oldMemberAmount+=b.oldMemberAmount
          this.oldMemberCount+=b.oldMemberCount
          this.discountMem+=b.discountMem
          this.discountPro+=b.discountPro
          this.discountElec+=b.discountElec
          this.tests+=b.tests
          this.tableData.push(b)
          this.xiaojiArr.push(0)
        }
        if (response.data.汽油.length) {
          this.xiaojiArr.push(2)
          this.tableData.splice(response.data.汽油.length+response.data.柴油.length+1, 0, {
            oilsName:'小计',
            oilsType:0,
            sumAmount:this.sumAmount,
            sumCount:this.sumCount,
            cashAmount:this.cashAmount,
            cashCount:this.cashCount,
            wechatAmount:this.wechatAmount,
            wechatCount:this.wechatCount,
            alipayAmount:this.alipayAmount,
            alipayCount:this.alipayCount,
            cardAmount:this.cardAmount,
            cardCount:this.cardCount,
            memberAmount:this.memberAmount,
            memberCount:this.memberCount,
            oldMemberAmount:this.oldMemberAmount,
            oldMemberCount:this.oldMemberCount,
            discountMem:this.discountMem,
            discountPro:this.discountPro,
            discountElec:this.discountElec,
            tests:this.tests,
          }) 
        }
        if (this.tableData.length) {
          this.tableData.push({
            oilsType:3,
            oilsName:'合计',
            sumAmount:this.chaisumAmount+this.sumAmount,
            sumCount:this.chaisumCount+this.sumCount,
            cashAmount:this.chaicashAmount+this.cashAmount,
            cashCount:this.chaicashCount+this.cashCount,
            wechatAmount:this.chaiwechatAmount+this.wechatAmount,
            wechatCount:this.chaiwechatCount+this.wechatCount,
            alipayAmount:this.chaialipayAmount+this.alipayAmount,
            alipayCount:this.chaialipayCount+this.alipayCount,
            cardAmount:this.chaicardAmount+this.cardAmount,
            cardCount:this.chaicardCount+this.cardCount,
            memberAmount:this.chaimemberAmount+this.memberAmount,
            memberCount:this.chaimemberCount+this.memberCount,
            oldMemberAmount:this.chaioldMemberAmount+this.oldMemberAmount,
            oldMemberCount:this.chaioldMemberCount+this.oldMemberCount,
            discountElec:this.chaidiscountElec+this.discountElec,
            discountMem:this.chaidiscountMem+this.discountMem,
            discountPro:this.chaidiscountPro+this.discountPro,
            tests:this.chaitests+this.tests,
          })
        }
        
        console.log(this.tableData)
        let contactDot = 0;
        let contactDot1 = 0;
        this.tableData.forEach( (item,index) => {
          if(index===0){
            this.spanArr.push(1)
            this.spanArr1.push(1)
          }else{
            if(item.oilsType === this.tableData[index-1].oilsType){
              this.spanArr[contactDot] += 1;
              this.spanArr.push(0)
            }else{
              contactDot = index
              this.spanArr.push(1)
            }
            if(item.oilsName === this.tableData[index-1].oilsName){
              this.spanArr1[contactDot1] += 1;
              this.spanArr1.push(0)
            }else{
              contactDot1 = index
              this.spanArr1.push(1)
            }
          }
        })
        console.log('spanArr')
        console.log(this.spanArr)
        console.log(this.xiaojiArr)
      });
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
    //导出表格
    exportTable(){
		for (let i = 0; i < this.tableData.length; i++) {
			if (this.tableData[i].oilsType == 0) {
				this.tableData[i].oilsTypeName = '汽油'
			}else if(this.tableData[i].oilsType == 1){
				this.tableData[i].oilsTypeName = '柴油'
			}else if(this.tableData[i].oilsType == 3){
				this.tableData[i].oilsTypeName = '合计'
			}
		}
		var tHeaders = ['油品分类',  '油品号', '合计升数','合计金额','现金升数','现金金额','微信升数','微信金额','支付宝升数','支付宝金额','银行卡升数','银行卡金额','会员升数','会员金额','老会员升数','老会员金额','电子券','会员卡','促销','检测用油(升)'];
		var filterVals = [ 'oilsTypeName',  'oilsName', 'sumCount','sumAmount','cashCount','cashAmount','wechatCount','wechatAmount','alipayCount','alipayAmount','cardCount','cardAmount','memberCount','memberAmount','oldMemberCount','oldMemberAmount','discountElec','discountMem','discountPro','tests'];
		var name = '油品销售报表'
		handleDownload(this.tableData,tHeaders,filterVals,name)
    },
    // printing
    dayin(){
      let wpt = document.getElementById('test');
      let newContent = wpt.innerHTML;
      let oldContent = document.body.innerHTML;
      
      document.body.innerHTML = newContent;
      document.body.style = "transform:scale(0.8,0.8); margin-left: -150px;"
      document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+'px'
      // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
      
      // document.querySelector('.el-table__header').style = "margin: 0 auto;"
      // document.querySelector('.el-table__body').style = "margin: 0 auto;"
      window.print();
      window.location.reload()
      // document.body.innerHTML = oldContent;
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
  background-color: #f6f7fb;
}
.main {
  min-height: calc(100vh - 191px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #f6f7fb;
}
.header h3 {
  display: inline-block;
  width: 500px;
  line-height: 60px;
  margin: 0;
}
.header h3 span {
  display: inline-block;
  width: 3px;
  height: 25px;
  vertical-align: middle;
  background-color: #5b8dff;
  margin-right: 10px;
}
.top {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  line-height: 36px;
}

.xuan span {
  font-size: 14px;
  line-height: 36px;
}
.date,
.xuan {
  margin-bottom: 10px;
}
.xuan .el-select:nth-of-type(1) {
  margin-right: 20px;
}
p {
  font-size: 14px;
}
.box {
  width: 25%;
  display: flex;
}
.box span {
  width: 65px;
}
.el-radio {
  line-height: 36px;
}
.box:nth-of-type(5) {
  padding: 0 2%;
}
.biao {
  width: 100%;
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
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
  background-color: #f5f9fc;
}
h3 .el-button--medium.is-circle {
  border: 0;
}
.sales-o .el-table__body td{
  background-color: #fff;
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