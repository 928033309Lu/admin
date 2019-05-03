<template>
  <div class="warp publicWarp">
    <div class="header contentHead">
        <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>交易记录</h3>
    </div>
    <div class="main">
        <div class="top">
            <div class="contentTitle">
                <h3>车队充值</h3>
            </div> 
            <div class="xinxi">
                <div class="box">
                    <div class="shang">
                        <b>主卡号：</b>{{xinxi.mcardNo}}
                    </div>
                    <div class="zhong">
                        <b>管理员手机号：</b>{{xinxi.adminPhone}}
                    </div>
                </div>
                <div class="box">
                    <div class="shang">
                        <b>主卡余额：</b>{{xinxi.mcardAmount}}元
                    </div>
                    <div class="zhong">
                        <b>账户余额：</b>{{xinxi.totalAmount}}元
                    </div>
                    <div class="xia">
                        
                    </div>
                </div>
                <div class="box">
                    <div class="shang">
                        <b>子卡数量：</b>{{xinxi.cradNum}}
                    </div>
                    <div class="zhong">
                        <b>积分：</b>{{xinxi.totalPoint || 0}}分
                    </div>
                </div>
                <div class="box">
                    <div class="shang">
                        <b>公司名称：</b>{{xinxi.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="contentTitle">
                <h3>交易记录</h3>
            </div> 
            <div class="cha">
                <div class="left">
                    <span>交易类型</span>
                    <el-select v-model="type" clearable  placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="margin-left: 20px;">卡号</span>
                    <el-input v-model="kahao" style="width: 200px;" placeholder="请输入卡号查询"></el-input>
                </div>
                <div class="right">
                    <div class="btn">
                        <el-button type="primary" @click="cha">查询</el-button>
                    </div>
                </div>
            </div>
            <div class="biao thColorDark">
                <div class="table">
                    <el-table
                        :data="tableData"
                        v-loading="loading"
                        style="width: 100%">
                        <el-table-column
                        label="交易类型"
                        min-width="90"
                        align="center">
                        <template slot-scope="scope">
                            <span v-show="scope.row.tradeType==0">收回</span>
                            <span v-show="scope.row.tradeType==1">分配</span>
                            <span v-show="scope.row.tradeType==2">消费</span>
                            <span v-show="scope.row.tradeType==3">充值</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="卡号"
                        min-width="170"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.mcardNo }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="交易时间"
                        min-width="160"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTimeStr }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="交易流水号"
                        min-width="170"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tradeNo }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="支付方式"
                        min-width="90"
                        align="center">
                        <template slot-scope="scope">
                            <span v-show="scope.row.payType ==1">微信</span>
                            <span v-show="scope.row.payType ==2">支付宝</span>
                            <span v-show="scope.row.payType ==3">银联卡</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="交易金额"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tradeAmount }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="交易地点"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tradeAddress }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="余额"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.cardAmount }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" min-width="80">
                        <template slot-scope="scope">
                            <el-button type="primary" v-show="scope.row.tradeType==2" @click="getxiao(scope.$index, scope.row)">详情</el-button>
                            <el-button type="primary" v-show="scope.row.tradeType!=2&&scope.row.tradeType!=3" @click="getxiang(scope.$index, scope.row)">详情</el-button>
                            <span v-show="scope.row.tradeType==3"></span>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        v-show="total>0"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="limit"
                        @pagination="get"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div> 
            </div>
        </div>
        <!-- 消费详情 -->
        <el-dialog :visible.sync="xiaoxiangVisible" title="详情" width="80%">
          <div class="xiang">
            <div class="zhanghu">
                <div class="box">
                    <div class="block">
                        <div class="left">
                        交易流水号：
                    </div>
                    <div class="right">
                        {{xiaoxiangqing.orderNo}}
                    </div>
                    </div>
                    <div class="block">
                        <div class="left">
                        会员名称：
                        </div>
                        <div class="right">
                            {{xiaoxiangqing.username}}
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                        支付方式：
                        </div>
                        <div class="right">
                            <span v-show="xiaoxiangqing.payType==1">微信</span>
                            <span v-show="xiaoxiangqing.payType==2">支付宝</span>
                            <span v-show="xiaoxiangqing.payType==3">银联卡</span>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="block">
                        <div class="left">
                        交易时间：
                    </div>
                    <div class="right">
                        {{xiaoxiangqing.createTimeStr}}
                    </div>
                    </div>
                    <div class="block">
                        <div class="left">
                        会员编号:
                        </div>
                        <div class="right">
                            {{xiaoxiangqing.memberNo}}
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                        支付金额:
                        </div>
                        <div class="right">
                           {{xiaoxiangqing.actuallyPayAmount}}
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="block">
                        <div class="left">
                        交易地点：
                    </div>
                    <div class="right">
                        {{xiaoxiangqing.fullName}}
                    </div>
                    </div>
                    <div class="block">
                        <div class="left">
                        会员等级:
                        </div>
                        <div class="right">
                            {{xiaoxiangqing.levelName}}
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                        余额:
                        </div>
                        <div class="right">
                            {{xiaoxiangqing.memberBalance}}元
                        </div>
                    </div>
                </div>
            </div>
            <div class="table">
                <el-table
                    :data="xiaoxiangqing.tbOrderDetailList"
                    stripe
                    :summary-method="getSummaries"
                    show-summary
                    style="width: 100%">
                    <el-table-column
                    label="品名"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.goodsId}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="单价"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.storagePrice }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="数量"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsNum }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="小计"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.tradeNo }}</span>
                    </template>
                    </el-table-column>
                </el-table>
            </div> 
            <div class="shi">
                <div class="box">
                    <div class="block">
                        电子券：{{xiaoxiangqing.couponName}}
                    </div>
                    <div class="block">
                        <span v-show="xiaoxiangqing.payType==1">微信</span>
                        <span v-show="xiaoxiangqing.payType==2">支付宝</span>
                        <span v-show="xiaoxiangqing.payType==3">银联卡</span>
                    </div>
                    <div class="block">
                        实收
                    </div>
                </div>
                <div class="box">
                    <div class="block">
                       {{xiaoxiangqing.couponDiscount}} 
                    </div>
                    <div class="block">
                        
                    </div>
                    <div class="block">
                        {{xiaoxiangqing.actuallyPayAmount}}元
                    </div>
                </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="xiaoxiangVisible = false">关闭</el-button>
          </div>
        </el-dialog> 
        <!-- 详情 -->
        <el-dialog :visible.sync="xiangVisible" title="详情" width="80%">
          <div class="xiang qing">
            <div class="box">
                <div class="block">
                    <div class="left">
                        交易类型：
                    </div>
                    <div class="right">
                        <span v-show="xiangqing.tradeType==0">资金收回</span>
                        <span v-show="xiangqing.tradeType==1">资金分配</span>
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        订单流水号：
                    </div>
                    <div class="right">
                        {{xiangqing.tradeNo}}
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        单位名称：
                    </div>
                    <div class="right">
                        {{xiangqing.name}}
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        子卡员号：
                    </div>
                    <div class="right">
                        {{xiangqing.cardNo}}
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        子卡余额：
                    </div>
                    <div class="right">
                        {{xiangqing.cardAmount}}
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="block">
                    <div class="left">
                       操作时间：
                    </div>
                    <div class="right">
                        {{xiangqing.createTimeStr}}
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        <span v-show="xiangqing.tradeType==0">收回金额：</span>
                        <span v-show="xiangqing.tradeType==1">分配金额：</span>
                    </div>
                    <div class="right">
                        {{xiangqing.tradeAmount}}
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        主卡员号：
                    </div>
                    <div class="right">
                        {{xiangqing.mcardNo}}
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        主卡余额：
                    </div>
                    <div class="right">
                        {{xiangqing.mcurrentAmount}}
                    </div>
                </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="xiangVisible = false">关闭</el-button>
          </div>
        </el-dialog> 
    </div>
  </div>
</template>

<script>
    import echarts from "echarts";
    import { getjiaolu } from '@/api/cheduiguanli'
    import { getjiaoxiang } from '@/api/cheduiguanli'

export default {
  data() {
    return {
        memberId:'3456789987654',//会员号
        name:'张三',//姓名
        masterCardBalance:'5000',//主卡余额
        membershipLevel:'砖石',//会员等级
        membershipType:'车队',//会员类型
        integral:'300',//积分
        phoneNumber:'12345667899',//手机号
        //表格临时数据
        tableData:[],
        xinxi:'',
        xiaoxiangVisible:false,
        xiangVisible:false,
        xiangqing:'',
        xiaoxiangqing:'',
        xiangData:[{

        }],
        type:-1,
        kahao:'',
        options:[{
            value: -1,
            label: '全部'
        },{
            value: 0,
            label: '收回'
        },{
            value: 1,
            label: '分配'
        },{
            value: 2,
            label: '消费'
        },{
            value: 3,
            label: '充值'
        },],
        //分页
		total: 0,
		page: 1,
		limit: 10,
		currentPage:1,
		loading:true,
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get(){
        var id = this.$route.query.id
        this.loading = true
        var data ={
            "id": id,
            "pageNum":this.page,
            "tradeType":-1,
            "pageSize":this.limit,
        } 
        getjiaolu(data)
            .then(response => {
                console.log(response.data)
                console.log(response.data.tbMotorcadeDistributeList.rows)
                this.xinxi = response.data.newTbMotorcade
                this.loading = false
                this.tableData = response.data.tbMotorcadeDistributeList.rows
            })
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.limit = val
        this.get()
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.get()
    },
    cha(){
        var id = this.$route.query.id
        console.log(id)
        var data ={
            "id": id,
            "mcardNo":this.kahao,
            "tradeType":this.type,
            "pageNum":1,
            "pageSize":10,
        } 
        console.log(data)
        getjiaolu(data)
            .then(response => {
                console.log(response.data)
                console.log(response.data.tbMotorcadeDistributeList.rows)
                this.xinxi = response.data.newTbMotorcade
                this.tableData = response.data.tbMotorcadeDistributeList.rows
            })
    },
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1) {
            sums[index] = '';
            return;
          }
          if (index === 2) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
    },
    getxiao(index,row){
        this.xiaoxiangVisible = true
        var data ={
            "orderNo": row.tradeNo,
            "payType": row.tradeType
        } 
        getjiaoxiang(data)
            .then(response => {
                console.log(response.data)
                console.log(response.data.tbOrderToNew)
                this.xiaoxiangqing = response.data.tbOrderToNew
            })
    },
    getxiang(index,row){
        this.xiangVisible=true
        var data ={
            "orderNo": row.tradeNo,
            "payType": row.tradeType
        } 
        getjiaoxiang(data)
            .then(response => {
                console.log(response.data)
                console.log(response.data.tbMotorcadeDistributeNew)
                this.xiangqing = response.data.tbMotorcadeDistributeNew
            })
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
  padding: 2%;
}
.main{
  min-height: calc(100vh - 181px);
  background-color: #fff;
  width: 100%;
  height: 100%;
  color: #606266;
}
.header{
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
}   
.header h3{
  line-height: 60px;
  margin: 0;
}
.header h3 span{
	display: inline-block;
	width: 3px;
	height: 25px;
	vertical-align: middle;
	background-color: #5B8DFF;
    margin-left: 5px;
    margin-right: 5px;
}
.top .header{
    border: 0;
}
.footer .header{
    border: 0;
}
.xinxi{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    line-height: 36px;
}
.top{
    border-bottom: 1px solid #F6F7FB;
}
.biao{
  padding: 10px 20px;
}
.table{
  border:1px solid #ebeef5;
  border-bottom: 0;
}
.zhanghu{
    display: flex;
    justify-content: space-between ;
    line-height: 36px;
}
.shi{
    border:1px solid #ebeef5;
    border-top: 0;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between ;
    line-height: 36px;
}
.dialog-footer{
  text-align: center;
}
.qing{
    display: flex;
    justify-content: space-between ;
    line-height: 36px;
}
.cha{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between ;
    
}
.block{
    display: flex;
}
.el-button+.el-button{
    margin: 0;
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,

h3 .el-button--medium.is-circle{
  border: 0;
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
  margin: 20px 0;
}
</style>


<style scoped>
    .xinxi{padding: 0 40px;display: block;overflow: hidden;}
    .xinxi .box{float: left;margin-right: 160px;}
    .xinxi .box>div{line-height: 54px;font-size: 14px;}
    .top{border-bottom: 1px solid #ededed;padding-bottom: 20px;}
    .cha{padding: 10px 40px;}
    .cha span{margin-right: 16px;}
    .cha .el-select{margin-right: 20px;}
    .biao{padding: 15px 40px;padding-bottom: 30px;}

</style>

