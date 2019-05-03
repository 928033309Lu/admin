<template>
  <div class="warp">
      <!-- stockTank -->
    <div class="header">
      <h3>
        <el-button circle @click="prev">
          <i class="el-icon-arrow-left"></i>
        </el-button>油罐库存监控
      </h3>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>公司</span>
          <el-select v-model="company" clearable placeholder="请选择">
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
          <el-select v-model="station" clearable placeholder="请选择">
            <el-option
              v-for="item in stationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="box">
          <span>状态</span>
          <el-select v-model="state" clearable placeholder="请选择">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="date">
        <span>时间：</span>
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
      <div class="biao" >
        <div class="table" >
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="amount2"
              align="center"
              label="公司"
              >
            </el-table-column>
            <el-table-column
              prop="amount2"
              align="center"
              label="加油站"
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
              label="异常内容"
              align="center">
            </el-table-column>
            <el-table-column label="异常时间" align="center" >
            </el-table-column>
            <el-table-column label="状态" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" >
              <template slot-scope="scope" >
                <el-button
                size="mini"
                type="primary"
                @click="handle(scope.$index, scope.row)">处理</el-button>
                <el-button
                size="mini"
                type="primary"
                @click="see(scope.$index, scope.row)">查看</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>  
    <!-- 油罐库存监控查看 -->
    <el-dialog :visible.sync="youkuSeeVisible" width='50%' title="查看">
      <div class="see">
        <div class="top">
          <div class="box">
            <div class="block">
              油站：{{}}
            </div>
            <div class="block">
              公司：{{}}
            </div>
          </div>
          <div class="box">
            <div class="block">
              状态：{{}}
            </div>
            <div class="block">
              油罐号：{{}}
            </div>
          </div>
          <div class="box">
            <div class="block">
              异常时间：{{}}
            </div>
          </div>
        </div>
        <div class="xia">
          <div class="top">
            <p>11111111</p>
          </div>
        </div>
        <div class="cu">
          <p>处理内容：</p>
          <div class="xia">
            <div class="top">
              <p>1111</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button   @click="addVisible = false">取消</el-button>
        <el-button type="primary"  @click="addent">确认</el-button>
      </div> -->
    </el-dialog>
    <!-- 油罐库存监控处理 -->
    <el-dialog :visible.sync="handleVisible" width='50%' title="异常处理">
      <div class="see">
        <p>异常原因与处理：</p>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入内容"
            v-model="textarea2">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button   @click="addVisible = false">取消</el-button> -->
        <el-button type="primary"  @click="handleEnt">确认</el-button>
      </div>
    </el-dialog>
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
      state:'',//状态
      stateOptions:[{
        value:1,
        label:'未处理'
      }],//状态 选择
      youkuSeeVisible:false,
      handleVisible:false,
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
    get(){

    },
    see(index,row){
        this.youkuSeeVisible = true
      console.log('异常')
    },
    handle(){
        this.handleVisible = true
    },
    handleEnt(){
        this.handleVisible = false
    },
    //返回上一页
    prev() {
        this.$router.go(-1);
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
  padding: 10px 20px;
  display: flex;

}
.date{
  margin-top: 10px;
  padding:0 20px;
  display: flex;
}
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
  width: 50%;
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
.see .top{
  display: flex;
  justify-content: space-between;
}
.top .block{
  line-height: 36px;
}
.see .xia{
  border:1px solid #EDEDED;
}
.dialog-footer{
    text-align: center;
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