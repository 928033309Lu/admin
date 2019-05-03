<template>
  <div class="warp sales-m">
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
          <span>加油站</span>
          <el-select v-model="station" @change="change" clearable placeholder="请先选择公司">
            <el-option
              v-for="item in stationOptions"
              :key="item.id"
              :label="item.fullName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
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
            <el-table
                :data="tableData"
                :span-method="objectSpanMethod"
                row-class-name="white-row"
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="stationName"
                  label="加油站">
                  <!-- <template slot-scope="scope">
                    <span>合计</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  align="center"
                  label="油品分类">
                  <template slot-scope="scope">
                    <span v-show="scope.row.oilsType==0">汽油</span>
                    <span v-show="scope.row.oilsType==1">柴油</span>
                    <span v-show="scope.row.oilsType==3">合计</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="oilsName"
                    align="center"
                    label="油品号">
                </el-table-column>
                <!-- <el-table-column
                  prop="unitPrice"
                  align="center"
                  label="单价">
                </el-table-column> -->
                <el-table-column label="合计" align="center">
                    <el-table-column
                        prop="sumCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="sumAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="现金" align="center">
                    <el-table-column
                        prop="cashCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="cashAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="微信" align="center">
                    <el-table-column
                        prop="wechatCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="wechatAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="支付宝" align="center">
                    <el-table-column
                        prop="alipayCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="alipayAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="银行卡" align="center">
                    <el-table-column
                        prop="cardCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="cardAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="会员" align="center">
                    <el-table-column
                        prop="memberCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="memberAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="老会员" align="center">
                    <el-table-column
                        prop="oldMemberCount"
                        align="center"
                        label="升数">
                    </el-table-column>
                    <el-table-column
                        prop="oldMemberAmount"
                        align="center"
                        label="金额">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="折扣" align="center">
                    <el-table-column
                        prop="discountElec"
                        align="center"
                        label="电子券">
                    </el-table-column>
                    <el-table-column
                        prop="discountMem"
                        align="center"
                        label="会员卡">
                    </el-table-column>
                    <el-table-column
                        prop="discountPro"
                        align="center"
                        label="促销">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="tests"
                    align="center"
                    label="检测用油（升）">
                </el-table-column>
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
      spanArr2:[],
      xiaojiArr:[],
      hejiArr:[],
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.listLoading = true;
      var data = {};
      var a = {};
      
      getCompanyByWhere(a).then(response => {
        console.log(response.data);
        this.companyOptions = response.data;
      });
      StationList(data).then(response => {
        console.log(response.data);
        this.stationOptions = response.data;
      });
       this.chaxun()
    },
    change() {
      var data = {
        stationId: this.station
      };
      console.log(this.station)
      youpinlist(data).then(response => {
        console.log(response.data);
        this.oilsList = response.data;
      });
      this.chaxun()
    },
		chaxun(){
		  this.listLoading = true
			if(this.date==null){
				this.date=[]
			}
		  var data = {
		    stationId:this.station,
		    oilsId:this.oilsId,
		    startTime:this.date[0],
        endTime:this.date[1],
        dayType:this.radio
		  }
		  reportList(data).then(response => {
        console.log('列表');
        console.log(response.data);
        this.tableData = []
        this.xiaojiArr = []
        this.spanArr = []
        this.spanArr1 = []
        this.hejiArr = []
        var zong = 0
        for (let i = 0; i < response.data.list.length; i++) {
          var qiyou = 0
          var chaiyou = 0
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
          for (let j = 0; j < response.data.list[i].length; j++) {
            var a = response.data.list[i][j]
            this.hejiArr.push(0)
            this.xiaojiArr.push(0)
            zong++
            // console.log('oilsType'+i)
            // console.log(response.data.list[i][j].oilsType)
            if(response.data.list[i][j].oilsType==0){
              qiyou++
              this.sumAmount+=a.sumAmount
              this.sumCount+=a.sumCount
              this.cashAmount+=a.cashAmount
              this.cashCount+=a.cashCount
              this.wechatAmount+=a.wechatAmount
              this.wechatCount+=a.wechatCount
              this.alipayAmount+=a.alipayAmount
              this.alipayCount+=a.alipayCount
              this.cardAmount+=a.cardAmount
              this.cardCount+=a.cardCount
              this.memberAmount+=a.memberAmount
              this.memberCount+=a.memberCount
              this.oldMemberAmount+=a.oldMemberAmount
              this.oldMemberCount+=a.oldMemberCount
              this.discountMem+=a.discountMem
              this.discountPro+=a.discountPro
              this.discountElec+=a.discountElec
              this.tests+=a.tests
            }
            if(response.data.list[i][j].oilsType==1){
              chaiyou++
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
            }
            this.tableData.push(a)
          }
            // console.log('ssss'+i)
            // console.log(qiyou)
            // console.log(zong)
          // if(i!=0){
          //   qiyou=zong-qiyou
          // }
          if (qiyou) {
            qiyou=zong-chaiyou
            // if(i==1){
            //   qiyou+=1
            // }
            console.log('qiyou')
            console.log(qiyou)
            this.hejiArr.push(0)
            this.tableData.splice(qiyou, 0, {
              stationName:response.data.list[i][0].stationName,
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
            zong++
          }
          if(chaiyou){
            this.hejiArr.push(0)
            // chaiyouwei+=chaiyou+qiyou+qiyouwei
            this.tableData.splice(zong, 0, {
              stationName:response.data.list[i][0].stationName,
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
            zong++
          }
          if(qiyou||chaiyou){
            this.hejiArr.push(2)
            // qiyou += 1
            this.tableData.splice(zong+1, 0, {
              stationName:response.data.list[i][0].stationName,
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
            zong++
          }
        }
        console.log(this.tableData)
        let contactDot = 0;
        let contactDot1 = 0;
        let contactDot2 = 0;
        this.tableData.forEach( (item,index) => {
          if(index===0){
            this.spanArr.push(1)
            this.spanArr1.push(1)
            this.spanArr2.push(1)
          }else{
            if(item.stationName === this.tableData[index-1].stationName){
              this.spanArr[contactDot] += 1;
              this.spanArr.push(0)
            }else{
              contactDot = index
              this.spanArr.push(1)
            }
            if(item.oilsType === this.tableData[index-1].oilsType){
              this.spanArr1[contactDot1] += 1;
              this.spanArr1.push(0)
            }else{
              contactDot1 = index
              this.spanArr1.push(1)
            }
          }
        })
      }); 
    },
    //表格合并
    objectSpanMethod({row, column, rowIndex, columnIndex}){
      if(columnIndex ===0){
        // if (rowIndex==this.tableData.length-1){
        //   return {
        //     rowspan: 1,
        //     colspan: 3
        //   }
        // }
        
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
        // if (this.xiaojiArr[rowIndex]){
        //   return {
        //     rowspan: 1,
        //     colspan: 2
        //   }
        // }
        if (this.hejiArr[rowIndex]){
          return {
            rowspan: 1,
            colspan: 2
          }
        }
        // if (rowIndex==this.tableData.length-1){
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   }
        // }
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
        // if (rowIndex==this.tableData.length-1){
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   }
        // }
        if (this.hejiArr[rowIndex]){
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        // if (this.xiaojiArr[rowIndex]){
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   }
        // }
      }
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
          if (index === 3) {
            sums[index] = '';
            return;
          }
        });

        return sums;
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
  margin-left: 20px;
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
.table+.table{
  margin-top: 20px;
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
.sales-m .el-table__body td{
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