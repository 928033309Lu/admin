<template>
  <div class="warp">
    <div class="header">
      <h3><span></span>车队查询</h3>
    </div>
    <div class="main" v-loading="loading">
      <div class="top">
        <div class="sou">
          <el-input v-model="input" placeholder="单位名称/主卡号/手机"></el-input>
          <el-button type="primary" @click="sou">搜索</el-button>
          <el-button type="primary" @click="screenVisible=true" style="display:none">筛选</el-button>
        </div>
        <div class="btn">
          <!-- <el-button type="primary">
            <router-link to="fleet-new">
		    			新增车队卡
		    		</router-link>
          </el-button> -->
          <!-- <el-button type="primary">
            <router-link to="fleet-recharge-o">
		    			车队充值
		    		</router-link>
          </el-button> -->
        </div>
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
              label="单位名称"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
             <el-table-column
              label="所属油站"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cardNo }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="账户余额"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.totalAmount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="主卡余额"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cardAmount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开卡日期"
              align="center">
              <template slot-scope="scope">
                <span v-show="scope.row.createTimeStr">{{ scope.row.createTimeStr | parseTime('{y}-{m}-{d}')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="上次消费日期"
              min-width="120"
              align="center">
              <template slot-scope="scope">
                <span v-show="scope.row.consumeTimeStr">{{ scope.row.consumeTimeStr| parseTime('{y}-{m}-{d}')}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="管理员姓名"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="管理员手机"
              min-width="100"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.adminPhone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="205">
              <template slot-scope="scope">
                <el-button type="primary"  @click="details(scope.$index, scope.row)">详情</el-button>
                <el-button type="primary"  @click="see(scope.$index, scope.row)">交易记录</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
						v-show="total>0"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="page"
						:page-size="limit"
						@pagination="sou"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
        </div> 
      </div>
      <el-dialog :visible.sync="screenVisible" title="筛选" width="80%">
        <div class="screen">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="box">
                  <div class="left">
                    <span>账户余额</span>                   
                  </div>
                  <div class="right">
                    <el-select v-model="accountBalanceRange" clearable placeholder="请选择" style="width:150px;">
                      <el-option
                        v-for="item in rangeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input style="margin-left:10px;width:150px;" v-model="accountBalance" placeholder="请输入"></el-input>
                  </div>
                </div>
                <div class="box">
                  <div class="left">
                    <span>注册时间</span>                   
                  </div>
                  <div class="right">
                    <el-date-picker
                      v-model="registrationTimeStart"
                      type="date"
                      style="width:150px;"
                      placeholder="选择日期">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                      v-model="registrationTimeEnd"
                      type="date"
                      style="width:150px;"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="box">
                  <div class="left">
                    <span>最后消费时间</span>                   
                  </div>
                  <div class="right">
                    <el-date-picker
                      v-model="lastTimeStart"
                      style="width:150px;"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                      v-model="lastTimeEnd"
                      style="width:150px;"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <div class="box">
                  <div class="left">
                    <span>积分数量</span>
                  </div>
                  <div class="right">
                    <el-select v-model="integraltBalanceRange" clearable placeholder="请选择" style="width:150px;">
                      <el-option
                        v-for="item in rangeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input style="margin-left:10px;width:150px;" v-model="integral" placeholder="请输入"></el-input>
                  </div>
                </div>
                <div class="box">
                  <div class="left">
                    <span>管理员生日月份</span>
                  </div>  
                  <div class="right">
                    <el-date-picker
                      v-model="birthdayMonth"
                      type="month"
                      style="width:150px;"
                      placeholder="选择月">
                    </el-date-picker>
                  </div>
                </div> 
              </div>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button  type="primary" @click="ent">确认</el-button>
        </div>
      </el-dialog>  
    </div>
  </div>
</template>

<script>
import { shoushai } from '@/api/cheduiguanli'

export default {
  data() {
    return {
      input: '',//搜索框
      //表格临时数据
      tableData:[],
      screenVisible:false,//控制筛选框显示与隐藏
      accountBalance:'',//账户余额
      accountBalanceRange:0,//余额范围
      rangeOptions:[{
        value: 0,
        label: '大于'
      }, {
        value: 1,
        label: '等于'
      }, {
        value: 2,
        label: '小于'
      }, {
        value: 3,
        label: '大于等于'
      }, {
        value: 4,
        label: '小于等于'
      }],
      registrationTimeStart:'',//筛选注册时间1
      registrationTimeEnd:'',//筛选注册时间2
      lastTimeStart:'',//筛选最后消费时间1
      lastTimeEnd:'',//筛选最后消费时间2
      integraltBalanceRange:0,//积分范围
      integral:'',//积分数量
      birthdayMonth:'',//管理员生日月份
      loading:false,//加载
      //分页
			total: 0,
			page: 1,
			limit: 10,
			currentPage:1,
			// loading:true,
    }
  },
  mounted(){
		this.sou()
	},
  methods: {
    sou(){
      // this.loading = true
      var data ={
          "condition": this.input,
          "pageNum": this.page,
          "pageSize": this.limit
        }
      shoushai(data)
        .then(response => {
            console.log(response.data)
            this.total = response.data.TbMotorcadeList.total;
            this.tableData = response.data.TbMotorcadeList.rows
            // this.loading = false
        })
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/queryTbMotorcade',
      //   {
      //     "condition": this.input,
      //     "pageNum":1,
      //     "pageSize":10,
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     console.log(res.body.TbMotorcadeList)
      //     this.tableData = res.body.TbMotorcadeList.rows
      //     this.loading = false
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     // this.$message.error('获取失败');
      //     this.loading = false
      //   })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.sou();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.sou();
    },
    cha(){
      var data ={
        "condition": this.input,
        "pageNum":1,
        "pageSize":10,
      }
    },
    ent(){
      
      if(this.birthdayMonth==''||this.birthdayMonth==null){
        var month = ''
      }else{
        var month = this.birthdayMonth.getMonth()+1
      }
      this.screenVisible = false
      var data ={
          "condition": this.input,
          "totalPoint": this.integral,
          "totalPointIndex": this.integraltBalanceRange,
          "totalAmount": Number(this.accountBalance),
          "totalAmountIndex": this.accountBalanceRange,
          "createTimeStart": this.registrationTimeStart,
          "createTimeEnd": this.registrationTimeEnd,
          "consumeTimeStart": this.lastTimeStart,
          "consumeTimeEnd": this.lastTimeEnd,
          "month": month,
          "privateIntegerPageNum":1,
          "privateIntegerPageSize":10,
        }
      shoushai(data)
        .then(response => {
          console.log(response.data)
          this.tableData = response.data.TbMotorcadeList.rows
        })
      // this.$http
      //   .post('http://192.168.0.129:8080/motorcade/queryTbMotorcade',
      //   {
      //     "condition": this.input,
      //     "totalPoint": this.integral,
      //     "totalPointIndex": this.integraltBalanceRange,
      //     "totalAmount": Number(this.accountBalance),
      //     "totalAmountIndex": this.accountBalanceRange,
      //     "createTimeStart": this.registrationTimeStart,
      //     "createTimeEnd": this.registrationTimeEnd,
      //     "consumeTimeStart": this.lastTimeStart,
      //     "consumeTimeEnd": this.lastTimeEnd,
      //     "month": month,
      //     "privateIntegerPageNum":1,
      //     "privateIntegerPageSize":10,
      //   },
      //   {
      //     headers:{
      //       'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
      //     }
      //   })
      //   .then(function(res){
      //     console.log('提交成功')
      //     console.log(res.body)
      //     console.log(res.body.TbMotorcadeList)
      //     this.tableData = res.body.TbMotorcadeList
      //   })
      //   .catch(function(err){
      //     console.log('提交失败')
      //     console.log(err)
      //     // this.$message.error('获取失败');
      //   })
    },
    reset() {
      this.registrationTimeStart=''
      this.registrationTimeEnd=''
      this.lastTimeStart=''
      this.lastTimeEnd=''
      this.integraltBalanceRange=0
      this.integral=''
      this.birthdayMonth=''
      this.accountBalance=''
      this.accountBalanceRange=0
    },
    see(index,row){
      this.$router.push({
        path:'/member/fleet/fleet-statistics-record',
        query:{
          id:row.id
        }
      })
    },
    details(index,row){
      this.$router.push({
        path:'/member/fleet/fleet-query-details',
        query:{
          id:row.id
        }
      })
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
  padding: 10px 20px;
}
.sou{
  display: flex;
}
.top .el-button{
  margin-left: 10px;
}
.biao{
  padding: 10px 20px;
}
.table{
  border:1px solid #ebeef5;
  // border-bottom: 0;
}
.box{
  margin-bottom: 20px;
}
.box .left,.box .right{
  display: inline-block;
}
.box .left{
  width: 100px;
  text-align: left;
  line-height: 36px;
}
.dialog-footer{
  text-align: center;
}
.dialog-footer .el-button{
  margin-left: 200px;
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
.el-pagination{
  text-align: center;
  margin: 10px 0;
}
</style>