<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>车队统计</h3>
        <div class="right" style="float:right;margin-top:10px">
              <el-button type="primary" @click="query">查询</el-button>
            </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <div class="shang">
            <div class="left">
              <span>卡号/手机号</span>
            </div>
            <div class="right">
              <el-input v-model="search" placeholder="卡号/手机号"></el-input>
            </div>
          </div>
          <div class="xia">
            <div class="left">
              <span>开卡时间</span>
            </div>
            <div class="right">
              <el-date-picker
                v-model="cardOpeningTime"
                :picker-options="pickerOptions2"
                type="daterange"
                style="width: 230px;"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        
          <!-- <div class="shang" style="opacity:0">
            <div class="left">
              <span>所属公司</span>
            </div>
            <div class="right">
             
            </div>
          </div> -->
          <div class="xia">
            <div class="left">
              <span>最近消费时间</span>
            </div>
            <div class="right">
              <el-date-picker
                v-model="recentConsumptionTime"
                :picker-options="pickerOptions2"
                type="daterange"
                style="width: 230px;"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <!-- <div class="box">
          <div class="shang" style="opacity:0">
            <div class="left">
              <span>所属油站</span>
            </div>
            <div class="right">
          
            </div>
          </div>
          <div class="btn">
            <div class="left">

            </div>
            
          </div>
        </div> -->
      </div>
      <div class="biao">
        <div class="table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              label="主卡卡号"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cardNo }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="公司名称"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="所属公司"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.affiliatedCompany }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="所属油站"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.oilStation }}</span>
              </template>
            </el-table-column> -->
            <el-table-column
              label="开卡时间"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTimeStr }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="约定消费金额"
              min-width="120"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.totalAmout }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="上月消费金额"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.consumeAmount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="上次消费时间"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.consumeTimeStr }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="优惠折扣"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <p v-for="(item, index) in scope.row.TbMotorcadeDiscountArr" :key="index">{{item.showStr}}<span v-if="index>=1">，</span></p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="80">
              <template slot-scope="scope">
                <el-button type="primary" @click="see(scope.$index, scope.row)">查看</el-button>
              </template>
              
            </el-table-column>
          </el-table>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { tongjicha } from '@/api/cheduiguanli'

export default {
  data() {
    return {
      search:'',//搜索
      cardOpeningTime:[],//开卡时间
      affiliatedCompany:'',//所属公司
      recentConsumptionTime:[],//最近消费时间
      oilStation:'',//所属油站
      //表格临时数据
      // tableData:[{
      //   cardNo:'3456778899',//会员编号
      //   name:'北京哇哈哈有限公司',//单位名称
      //   affiliatedCompany:'北京石油公司',//所属公司
      //   oilStation:'北京一号加油站',//所属油站
      //   createTimeStr:'2018-09-12',//开卡时间
      //   totalAmout:'50000.00',//约定消费金额
      //   consumeAmount:'48000.00',//上月消费金额
      //   consumeTimeStr:'2018-09-12',//上次消费时间
      //   TbMotorcadeDiscountArr:[{
      //     showStr:"汽油1.00元/升"
      //   }],//优惠折扣
      // }],
       tableData:[],
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
  methods: {
    see(index,row){
      this.$router.push({
        path:'/member/fleet/fleet-statistics-see',
        query:{
          id:row.id
        }
      })
    },
    query(){
      var data ={
        "cardNo": this.search,
        "createTimeStart": this.cardOpeningTime[0]||null,
        "createTimeEnd": this.cardOpeningTime[1]||null,
        "platform": this.affiliatedCompany,
        "consumeTimeStart": this.recentConsumptionTime[0]||null,
        "consumeTimeEnd": this.recentConsumptionTime[1]||null,
        "belongStation": this.oilStation
      }
      tongjicha(data)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.tbMotorcadeList
        })
      // this.$http
			// 		.post('http://192.168.0.129:8080/motorcade/queryMotorcadeStatistics',
			// 		{
      //       "cardNo": this.search,
      //       "createTimeStart": this.cardOpeningTime[0]||null,
      //       "createTimeEnd": this.cardOpeningTime[1]||null,
      //       "platform": this.affiliatedCompany,
      //       "consumeTimeStart": this.recentConsumptionTime[0]||null,
      //       "consumeTimeEnd": this.recentConsumptionTime[1]||null,
      //       "belongStation": this.oilStation
			// 		},
			// 		{
			// 			headers:{
			// 				'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
			// 			}
			// 		})
			// 		.then(function(res){
			// 			console.log('提交成功')
      //       console.log(res.body)
      //       console.log(res.body.tbMotorcadeList)
      //       this.tableData=res.body.tbMotorcadeList
			// 		})
			// 		.catch(function(err){
			// 			console.log('提交失败')
			// 			console.log(err)
			// 			// this.$message.error('获取失败');
			// 		})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
  // padding: 2%;
}
.main{
  min-height: calc(100vh - 181px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header{
  background-color: #fff;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
}
.header h3{
  display: inline-block;
  width: 100px;
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
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  line-height: 36px;
  color: #606266;
  border-bottom: 1px solid #F6F7FB;
}
.box .shang{
  margin-bottom: 10px;
}
.box .left,.right{
  display: inline-block;
}
.box .left{
  width: 100px;
}
.box .right{
  width: 230px;
}
.biao{
  padding: 10px;
}
.table{
  border:1px solid #ebeef5;
  border-bottom: 0;
}
.btn {
  text-align: center;
}
.box{
  display: flex;
  justify-content: space-around;
}
.xia{
  margin-left: 30px;
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
.el-dialog__header{
	text-align: center;
	background-color: #5B8DFF;
	color:#fff;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #fff;
}
.el-dialog__headerbtn .el-dialog__close{
	color: #fff;
}

</style>
