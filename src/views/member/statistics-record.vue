<template>
  <div class="warp">
    <div class="header">
        <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>交易记录</h3>
    </div>
    <div class="main">
        <div class="top">
            <div class="header">
                <h3><span></span>账户信息</h3>
            </div> 
            <div class="xinxi">
                <div class="box">
                    <div class="shang">
                        会员号：{{tbMember.memberNo}}
                    </div>
                    <div class="zhong">
                        手机号：{{tbMember.phone}}
                    </div>
                </div>
                <div class="box">
                    <div class="shang">
                        姓名：{{tbMember.username}}
                    </div>
                    <div class="zhong">
                        余额：{{tbMember.amout}}元
                    </div>

                </div>
                <div class="box">
                    <div class="shang">
                        会员等级：{{tbMember.levelName}}
                    </div>
                    <div class="zhong">
                        积分：{{tbMember.currentPoint}}
                    </div>
                </div>
                  <div class="box">
                    <div class="shang">
                        状态:
                        <span v-show="tbMember.status==1">冻结</span>
                        <span v-show="tbMember.status==0">启用</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="header">
                <h3><span></span>交易记录</h3>
            </div> 
            <div class="cha">
                <div class="left">
                    <span>交易类型</span>
                    <el-select v-model="kahao" clearable placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="margin-left: 20px;">交易方式</span>
                       <el-select v-model="type" clearable placeholder="请选择">
                        <el-option
                        v-for="item in fangshioptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="right">
                    <div class="btn">
                        <el-button type="primary" @click="cha">查询</el-button>
                    </div>
                </div>
            </div>
            <div class="biao">
                <div class="table">
                    <el-table
                        :data="tableData"
                        stripe
                        v-loading="loading"
                        style="width: 100%">
                        <el-table-column
                        label="交易类型"
                        align="center">
                        <template slot-scope="scope">
                            <span v-show="scope.row.tradeType==1">消费</span>
                            <span v-show="scope.row.tradeType==2">充值</span>
                        </template>
                        </el-table-column>
                        <!-- <el-table-column
                        label="卡号"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.cardNo}}</span>
                        </template>
                        </el-table-column> -->
                        <el-table-column
                        label="交易时间"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTimeStr }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="交易流水号"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.tradeNo }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="支付方式"
                        align="center">
                        <template slot-scope="scope">
                            <p v-if="scope.row.tradeType==2">
                                <span>微信</span>
                            </p>
                            <p v-else>
                                <span v-show="scope.row.payType ==2">微信</span>
                                <span v-show="scope.row.payType ==1">现金</span>
                                <span v-show="scope.row.payType ==3">支付宝</span>
                                <span v-show="scope.row.payType ==4">银联卡</span>
                                <span v-show="scope.row.payType ==5">会员卡</span>
                                <span v-show="scope.row.payType ==6">老会员卡</span>
                                <span v-show="scope.row.payType ==7">车队会员</span>
                            </p>
                            
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="交易金额"
                        min-width="120"
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
                        <template slot-scope="scope" >
                            <!-- <p v-show="scope.row.tradeType=="> -->
                                <!-- <el-button type="primary" v-show="scope.row.tradeType==1" @click="getxiao(scope.$index, scope.row)">详情</el-button> -->
                                <!-- <el-button type="primary" v-show="scope.row.tradeType!=2&&scope.row.tradeType!=3" @click="getxiang(scope.$index, scope.row)">详情</el-button> -->
                                <!-- <span v-show="scope.row.tradeType==3"></span> -->
                            <!-- </p> -->
                            
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-pagination
                        v-show="total>0"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="limit"
                        @pagination="get"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination> -->
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
    import { selectOrderPayAndRecharge } from '@/api/huiyuanguanli'
    import { selectMemberById } from "@/api/huiyuanguanli";
    import { queryTbMotorcadeTransactionDetails } from "@/api/huiyuanguanli";

export default {
  data() {
    return {
        memberId:'',//会员号
        name:'',//姓名
        masterCardBalance:'',//主卡余额
        membershipLevel:'',//会员等级
        membershipType:'',//会员类型
        integral:'',//积分
        phoneNumber:'',//手机号
        //表格临时数据
        tableData:[],
        xinxi:'',
        xiaoxiangVisible:false,
        xiangVisible:false,
        xiangqing:'',
        xiaoxiangqing:'',
        xiangData:[{

        }],
        type:'',
        kahao:'',
        options:[{
            value: 1,
            label: '消费'
        },{
            value: 2,
            label: '充值'
        },],
         fangshioptions:[{
            value: 1,
            label: '现金'
        },{
            value: 2,
            label: '微信'
        },{
            value: 3,
            label: '支付宝'
        },{
            value: 4,
            label: '银联卡'
        },{
            value: 5,
            label: '会员卡'
        },{
            value: 6,
            label: '老会员卡'
        },{
            value: 7,
            label: '车队会员'
        },],
        //分页
		total: 0,
		page: 1,
		limit: 10,
		currentPage:1,
        loading:true,
        tbMember:{},//会员详情
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
            "memberId": id,
        } 
        selectOrderPayAndRecharge(data)
            .then(response => {
                console.log(response.data)
                console.log(response.data)
                this.tableData = response.data
                this.loading = false
            })
        var a = {
            id:id
        }
        selectMemberById(a)
            .then(response => {
                console.log(response.data);
                this.tbMember = response.data.tbMember
            });
      },
    // get(){
    //     var id = this.$route.query.id
    //     this.loading = true
    //     var data ={
    //         "id": id,
    //         "pageNum":this.page,
    //         "tradeType":-1,
    //         "pageSize":this.limit,
    //     } 
    //     getjiaolu(data)
    //         .then(response => {
    //             console.log(response.data)
    //             console.log(response.data.tbMotorcadeDistributeList.rows)
    //             this.xinxi = response.data.newTbMotorcade
    //             this.loading = false
    //             this.tableData = response.data.tbMotorcadeDistributeList.rows
    //         })
    // },
    // handleSizeChange(val) {
    //     console.log(`每页 ${val} 条`);
    //     this.limit = val
    //     this.get()
    // },
    // handleCurrentChange(val) {
    //     console.log(`当前页: ${val}`);
    //     this.page = val
    //     this.get()
    // },
    cha(){
        var id = this.$route.query.id
        console.log(id)
        var data ={
            "memberId": id,
            "payType":this.type,
            "tradeType":this.kahao,
        } 
        console.log(data)
        selectOrderPayAndRecharge(data)
            .then(response => {
                console.log(response.data)
                // console.log(response.data)
                this.tableData = response.data
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
        } 
        queryTbMotorcadeTransactionDetails(data)
            .then(response => {
                console.log(response.data)
                console.log(response.data)
                this.xiaoxiangqing = response.data.tbOrderToNew
            })
    },
    getxiang(index,row){
        this.xiangVisible=true
        var data ={
            "orderNo": row.tradeNo,
        } 
    queryTbMotorcadeTransactionDetails(data)
        .then(response => {
            console.log(response.data)
            console.log(response.data)
            // this.xiangqing = response.data.tbMotorcadeDistributeNew
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
.el-table th{
  background-color: #F5F9FC;
}
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