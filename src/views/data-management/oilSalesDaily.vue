<template>
<div class="warp">
  <div class="header">
    <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>油品销售日报</h3>
    <div class="btn">
        <el-button type="primary" @click="exportTable">导出</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
    </div>
  </div>
  <div class="main" id="test">
    <div class="top">
        <div class="block">
            <p>油站：{{information.stationName}}</p>
            <p>开班时间：{{information.createDate}}</p>
        </div>
        <div class="block">
            <p>营业日：{{information.businessDate}}</p>
            <p>结班时间：{{information.modifyDate}}</p>
        </div>
        <div class="block">
            <p>班结编号：{{information.id}}</p>
        </div>
    </div>
    <div class="footer">
        <div class="table">
        <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%">
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
            <el-table-column label="升数" prop="memberCount" align="center"></el-table-column>
            <el-table-column label="金额" prop="memberAmount" align="center"></el-table-column>
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
    
    <!-- <div class="top">
        <p>站经理：</p>
        <p>核算：</p>
        <p>当班班长：</p>
    </div> -->
  </div>
</div>
</template>
<script>
import { reportList } from "@/api/youpinbaobiao";
import { detail } from "@/api/shuju";
import { handleDownload } from '@/utils'

export default {
  name: 'oilSalesDailyDemo',
  data() {
    return {
      businessDay:'',//营业日
      stationName:'',//加油站
      openingHours:'',//开班时间
      classTime:'',//结班时间
      classNumber:'',//班结编号
      //总营业额临时数据
      tableData:[],
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
      //
      spanArr:[],
      spanArr1:[],
      xiaojiArr:[],
      information:null,//基本信息
    }
  },
  mounted() {
    this.get();
  },
  methods:{
    get(){
        var id = this.$route.query.id;
        var data = {
          shiftId:id
        }
        detail({id}).then(response => {
          console.log(response.data);
          this.information = response.data
        });
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
                    sumAmount:(this.chaisumAmount+this.sumAmount).toFixed(2),
                    sumCount:(this.chaisumCount+this.sumCount).toFixed(2),
                    cashAmount:(this.chaicashAmount+this.cashAmount).toFixed(2),
                    cashCount:(this.chaicashCount+this.cashCount).toFixed(2),
                    wechatAmount:(this.chaiwechatAmount+this.wechatAmount).toFixed(2),
                    wechatCount:(this.chaiwechatCount+this.wechatCount).toFixed(2),
                    alipayAmount:(this.chaialipayAmount+this.alipayAmount).toFixed(2),
                    alipayCount:(this.chaialipayCount+this.alipayCount).toFixed(2),
                    cardAmount:(this.chaicardAmount+this.cardAmount).toFixed(2),
                    cardCount:(this.chaicardCount+this.cardCount).toFixed(2),
                    memberAmount:(this.chaimemberAmount+this.memberAmount).toFixed(2),
                    memberCount:(this.chaimemberCount+this.memberCount).toFixed(2),
                    oldMemberAmount:(this.chaioldMemberAmount+this.oldMemberAmount).toFixed(2),
                    oldMemberCount:(this.chaioldMemberCount+this.oldMemberCount).toFixed(2),
                    discountElec:(this.chaidiscountElec+this.discountElec).toFixed(2),
                    discountMem:(this.chaidiscountMem+this.discountMem).toFixed(2),
                    discountPro:(this.chaidiscountPro+this.discountPro).toFixed(2),
                    tests:(this.chaitests+this.tests).toFixed(2),
                })
            }
            
            
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
            console.log(this.tableData)
            // console.log('spanArr')
            // console.log(this.spanArr)
            // console.log(this.xiaojiArr)
        });
    },
    //打印
    dayin(){
        let wpt = document.getElementById('test');
        let newContent = wpt.innerHTML;
        let oldContent = document.body.innerHTML;
        
        document.body.innerHTML = newContent;
        // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
        document.body.style = "transform:scale(0.8,0.8);margin-left: -150px;"
        
        // console.log(parseInt(document.querySelector('.el-table__header').style.width))
        document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+37+'px'
        
        // document.querySelector('.table').style = "border:0;"
        window.print();
        window.location.reload()
        // document.body.innerHTML = oldContent;
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },
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
    // 表格合并行与列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        for(let i=0;i<this.turnoverData.length;i++){
            var topClass = this.turnoverData[i].topClass
            var topNumber = this.turnoverData[i].topNumber
            var leftNumber = this.turnoverData[i].leftNumber
            var leftPrice = this.turnoverData[i].leftPrice
            if (columnIndex === 0) {
                if (rowIndex  === i) {
                    return {
                        rowspan: topClass,
                        colspan: 1
                    };
                }
            }
            if (columnIndex === 1) {
                if (rowIndex  === i) {
                    return {
                        rowspan: topNumber,
                        colspan: leftNumber
                    };
                }
            }
            if (columnIndex === 2) {
                if (rowIndex  === i) {
                    return {
                        rowspan: 1,
                        colspan: leftPrice
                    };
                }
            }
        }
    },
    //合计自定义算法前三项不参与合计 
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        
        columns.forEach((column, index) => {
            // console.log(column)
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          var n = 0
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                  if(n==2){
                    n++
                    return prev;
                  }else if(n==4){
                    n++
                    return prev;
                  }else if(n==7){
                    n++
                    return prev;
                  }else{
                    n++
                    return prev + curr;
                  }
                
              } else {
                n++
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = '';
          }
          if (index === 1) {
            sums[index] = '';
            return;
          }
          if (index === 2) {
            sums[index] = '';
            return;
          }
        });

        return sums;
	},
	//导出
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
		var tHeaders = ['油品分类',  '油品号', '单价', '合计升数','合计金额','现金升数','现金金额','微信升数','微信金额','支付宝升数','支付宝金额','银行卡升数','银行卡金额','会员升数','会员金额','老会员升数','老会员金额','电子券','会员卡','促销','检测用油(升)'];
		var filterVals = [ 'oilsTypeName',  'oilsName', 'price', 'sumCount','sumAmount','cashCount','cashAmount','wechatCount','wechatAmount','alipayCount','alipayAmount','cardCount','cardAmount','memberCount','memberAmount','oldMemberCount','oldMemberAmount','discountElec','discountMem','discountPro','tests'];
		var name = '油品销售报表'
		handleDownload(this.tableData,tHeaders,filterVals,name)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
//   padding: 20px;
}
.main{
  min-height: calc(100vh - 180px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  height: 60px;
  padding-left: 1%;
  padding-right: 1%;
  
}   
.header h3{
  line-height: 60px;
  margin: 0;
  float: left;
  width: 200px;
}
.header .btn {
  float: right;
  height: 60px;
  line-height: 60px;
}
.header .btn .el-button{
  margin-left: 10px;
}
.top{
  display: flex;
  justify-content: space-between;
  padding: 0 1%;
  border-bottom: 1px solid #EDEDED;
  font-size: 14px;
}
.footer{
  padding: 1%;
}
p{
  font-size: 14px;
}
.table{
  border: 1px solid #EDEDED;
}
.top:nth-last-of-type(1){
  border: 0;
    
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