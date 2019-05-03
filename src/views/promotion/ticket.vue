<template>
<div class="warp">
  <el-tabs type="border-card">
    <el-tab-pane label="电子优惠券">
        <a href="#/promotion/newTicket">
            <el-button>新增优惠券</el-button>
        </a>
        <div class="biao">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                label="标题"
                align='center'>
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}新人代金券</span>
                </template>
                </el-table-column>
                <el-table-column
                label="优惠券类型"
                align='center'>
                <template slot-scope="scope">
                    <span v-if="scope.row.discountCouponType==1">代金券</span>
                    <span v-if="scope.row.discountCouponType==2">折扣券</span>
                </template>
                </el-table-column>
                <el-table-column
                label="券面金额"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.discountCouponValue }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="折扣比例"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.couponDiscount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="发放数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>1000</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="使用数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>1000</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="最低消费"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.minimumConsumption }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="有效期"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.periodOfValidity }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="状态"
                align='center'>
                    <template slot-scope="scope">
                        <span>生效中</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="160" align='center'>
                <template slot-scope="scope">
                     <el-button
                     v-if="scope.row.state=='生效中' "
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">停用</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                   
                </template>
                
                </el-table-column>
                
            </el-table>
        </div>
    </el-tab-pane>
    <el-tab-pane label="群发优惠券">
        <div class="qun">
            <div class="sou">
                <el-input v-model="input"  placeholder="会员号/手机号/会员名称" suffix-icon="el-icon-search"></el-input>
            </div>
            <div class="btn">
                <el-button>短信群发</el-button>
                <el-button @click="weChatGroup">微信群发</el-button>
            </div>
            <div class="mian">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <div class="inp">
                            <span>生日月份</span>
                            <select name="yuefen" id="yue" v-model="month">
                                <option value="全部">全部</option>
                                <option value="1月">1月</option>
                                <option value="2月">2月</option>
                                <option value="3月">3月</option>
                                <option value="4月">4月</option>
                                <option value="5月">5月</option>
                                <option value="6月">6月</option>
                                <option value="7月">7月</option>
                                <option value="8月">8月</option>
                                <option value="9月">9月</option>
                                <option value="10月">10月</option>
                                <option value="11月">11月</option>
                                <option value="12月">12月</option>
                            </select>
                            多选
                        </div>
                        <div class="inp">
                            <span> 账户余额</span>
                            <select name="yu" id="yu" v-model="limit">
                                <option value="请选择">请选择</option>
                                <option value="大于">大于</option>
                                <option value="等于">等于</option>
                                <option value="小于">小于</option>
                                <option value="大于等于">大于等于</option>
                                <option value="小于等于">小于等于</option>
                            </select>
                            <el-input v-model="balance" placeholder="单行输入" style="width: 190px;"></el-input>
                        </div>
                        <div class="inp">
                            <span>注册时间</span>
                             <select name="zu" id="zu" v-model="registrationTime">
                                <option value="2018-12-10">2018-12-10</option>
                             </select>
                        </div>
                        <div class="inp">
                            <span>最后消费时间</span>
                             <select name="zui" id="zui" v-model="lastConsumptionTime">
                                 <option value="2018-12-10">2018-12-10</option>
                             </select>
                             <select name="zhi" id="zhi" v-model="lastLimit">
                                 <option value="之前">之前</option>
                                 <option value="之后">之后</option>
                             </select>
                        </div>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">
                        <div class="inp">
                            <span>会员等级</span>
                            <select name="lv" id="lv" v-model="membershipLevel">
                                <option value="普通">普通</option>
                                <option value="黄金">黄金</option>
                            </select>
                            多选
                        </div>
                        <div class="inp">
                            <span>积分数量</span>
                             <select name="ji" id="ji" v-model="integralLimit">
                                <option value="请选择">请选择</option>
                                <option value="大于">大于</option>
                                <option value="等于">等于</option>
                                <option value="小于">小于</option>
                                <option value="大于等于">大于等于</option>
                                <option value="小于等于">小于等于</option>
                            </select>
                            <el-input v-model="integralQuantity" placeholder="单行输入" style="width: 190px;"></el-input>
                        </div>
                        <div class="inp">
                            <span>所属加油站</span>
                            <select name="jia" id="jia" v-model="gasStation">
                                <option value="北京公司">北京公司</option>
                                <option value="北京1号加油站">北京1号加油站</option>
                                <option value="北京2号加油站">北京2号加油站</option>
                                <option value="北京3号加油站">北京3号加油站</option>
                                <option value="天津公司">天津公司</option>
                            </select>
                            多选
                        </div>
                    </div></el-col>
                </el-row>
                <div class="bun">
                    <el-button style=" margin-right: 100px;" @click="reset">重置</el-button>
                    <el-button>查询</el-button>
                </div>
                <div class="text">
                    <p>温馨提示：1、只有认证公众号才能使用（其他类型公众号请不要使用第三方群发，否则微信可能会封号）</p>
                    <p>2、由于群发任务cedilla完成需要较长时间，送达成功人数和送达失败人数统计需要一段时间，群发状态的失败成功状态也需要时间</p>
                    <p>3、审核人未通过发送的群发消息或群发消息已经发送则不允许编辑图文</p>
                    <p>4、用户每月只能接收4条群发消息，多于4条的群发消息将对该用户发送失败</p>
                    <p>5、用户设置拒收或用户接收已超4条会被自动过滤掉不会被发送，所以发送成功人士数+发送失败人数不一定和你选择的总人数一致</p>
                </div>
            </div>
            <el-table
                ref="multipleTable"
                :data="tableData3"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="会员号"
                width="120">
                <template slot-scope="scope">{{ scope.row.memberId }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="会员名称"
                width="120">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="wechat"
                label="微信号"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="wechatVip"
                label="微信会员"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="stationName"
                label="加油站名称"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </el-tab-pane>
    <el-tab-pane label="发送记录">
        <div class="biao">
            <el-table
                :data="sendingData"
                border
                style="width: 100%">
                <el-table-column
                label="发送途径"
                align='center'>
                <template slot-scope="scope">
                    <span>{{ scope.row.way }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="发送内容"
                align='center'>
                <template slot-scope="scope">
                    <span>{{ scope.row.content }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="发送数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.quantity }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="使用数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.useAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="发送时间"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作人"
                min-width="80"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.operator }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="170" align='center'>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="fasong(scope.$index, scope.row)">查看</el-button>
                   
                </template>
                
                </el-table-column>
                
            </el-table>
        </div>
       
    </el-tab-pane>
  
</el-tabs>
<!-- 电子优惠券查看框 -->
    <!-- <el-dialog :title="ssss" :visible.sync="weChatVisible">
        <div class="header">
           
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="weChatVisible = false">关闭</el-button>
        </div>
    </el-dialog> -->
<!-- 微信群发框 -->
    <el-dialog :title="ssss" :visible.sync="weChatVisible">
        <div class="weChat">
            <h3>微信群发</h3>
           <div class="box">
               <span>优惠券</span>
               <el-input v-model="weChatSend.type" placeholder="请输入内容" style="width: 200px;"></el-input>
           </div>
            <div class="box">
               <span>主题</span>
               <el-input v-model="weChatSend.title" placeholder="请输入内容" style="width: 200px;"></el-input>
           </div>
           <div class="box">
               <span>内容</span>
               <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="请输入内容"
                :rows="5"
                v-model="weChatSend.content">
                </el-input>
           </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">发送</el-button>
            <el-button @click="weChatVisible = false">{{ $t('table.cancel') }}</el-button>
        </div>
    </el-dialog>
 <!-- 发送记录查看框 -->
    <el-dialog :title="ssss" :visible.sync="dialogFormVisible">
        <div class="header">
            <h3>查看</h3>
            <div class="box">
                <div class="left">
                    <p><span>发送途径:</span><span>{{detailsSend.way}}</span></p>
                    <p><span>优惠券名称:</span><span></span></p>
                </div>
                <div class="right">
                    <p><span>发送时间：</span><span>{{detailsSend.date}}</span></p>
                    <p><span>操作人:</span><span>{{detailsSend.operator}}</span></p>
                </div>
            </div>
            <p>发送内容</p>
            <div class="neirong">
                <div class="rong">
                    <p>{{detailsSend.content}}</p>
                </div>
            </div>
            <div class="box">
                <div class="left">
                    <p><span>发送数量:</span><span>{{detailsSend.quantity}}</span></p>
                </div>
                <div class="right">
                    <p><span>使用数量：</span><span>{{detailsSend.useAmount}}</span></p>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
// import icons from './requireIcons'
import clipboard from "@/utils/clipboard";

export default {
  name: "Ticket",
  data() {
    return {
      //电子优惠券临时表格数据
      tableData: [
        {
          title: "新人代金券",
          type: "代金券",
          amount: "20",
          discount: ".",
          quantity: "100",
          useAmount: "20",
          minimumConsumption: "200元",
          validityTerm: "30天",
          state: "生效中"
        },
        {
        couponDiscount: 0,
        createTime: "Nov 21, 2018 3:05:33 PM",
        discountCouponType: 0,
        discountCouponValue: 0,
        getTime: "Nov 21, 2018 2:53:52 PM",
        id: "4028801b67350c05016735169b400004",
        instructions: "string",
        minimumConsumption: 0,
        periodOfValidity: 0,
        startTime: "Nov 21, 2018 2:53:52 PM",
        }
      ],
      //发送记录临时表格记录
      sendingData: [
        {
          way: "短信",
          content: "生日快乐~",
          quantity: "1000",
          useAmount: "20",
          date: "2018-11-01",
          operator: "老二"
        },
        {
          way: "微信",
          content: "生日快乐~",
          quantity: "1000",
          useAmount: "20",
          date: "2018-11-01",
          operator: "老二"
        }
      ],
      //群发优惠券临时表格数据
      tableData3: [
        {
          memberId: "HJ880890",
          name: "张三",
          phone: "18810386688",
          wechat: "asdf",
          wechatVip: "是",
          stationName: "北京一号加油站"
        },
          {
          memberId: "HJ880890",
          name: "张三",
          phone: "18810386688",
          wechat: "asdf",
          wechatVip: "是",
          stationName: "北京一号加油站"
        },
          {
          memberId: "HJ880890",
          name: "张三",
          phone: "18810386688",
          wechat: "asdf",
          wechatVip: "是",
          stationName: "北京一号加油站"
        },
          {
          memberId: "HJ880890",
          name: "张三",
          phone: "18810386688",
          wechat: "asdf",
          wechatVip: "是",
          stationName: "北京一号加油站"
        },
      ],
      month:'全部',//生日月份
      balance:'',//账户余额
      limit:'请选择',//账户余额限制大于  小于。。。
      registrationTime:'2018-12-10',//注册时间
      lastConsumptionTime:'2018-12-10',//最后消费时间
      lastLimit:'之前',//最后消费时间限制  之前  之后
      membershipLevel:'普通',//会员等级
      integralQuantity:'请选择',//积分数量
      integralLimit:'请选择',//积分限制
      gasStation:'北京公司',//所属加油站
      multipleSelection: [],
      dialogFormVisible:false,//控制发送记录查看弹出框
      detailsSend :'',

      weChatVisible:false,//控制微信群发弹出框显示与隐藏
      weChatSend:{
          type:'新人优惠券',
          title:'生日快乐',
          content:'内容',
      }
    };
  },
  created(){
     this.getcoupons()
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //重置按钮事件
    reset(){
        this.month='全部';
        this.balance='';
        this.limit='请选择'
        this.registrationTime='2018-12-10'
        this.lastConsumptionTime='2018-12-10'
        this.lastLimit='之前'
        this.membershipLevel='普通'
        this.integralQuantity='请选择'
        this.integralLimit='请选择'
        this.gasStation='北京公司'
        
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 微信群发
    weChatGroup(){
        this.weChatVisible=true

    },
    //获取电子优惠券列表数据
    getcoupons(){
        var that = this;
        this.$http 
        .post('http://192.168.0.155:8080/marketing-electronic/get-electronic-coupons-all',{},
        {
            headers:{
				'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
			}
        })
        .then(function(res){
            console.log('提交成功')
            console.log(res.body.list)
            that.tableData=res.body.list
        })
        .catch(function(err){
            console.log('提交失败')
            console.log(err)
        })
    },
    fasong(num,data){
        this.dialogFormVisible=true
        this.detailsSend=data
    }
  },
  
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.biao {
  text-align: center;
  margin-top: 20px;
}
.biao table {
  text-align: center;
}
.el-input {
  width: 70%;
}
.ipt {
  text-align: center;
  margin-bottom: 10px;
}
.bg-purple {
  padding-top: 50px;
}
.bg-purple-light {
  padding-top: 100px;
}
select {
  width: 70%;
  border-radius: 8px;
  padding-left: 10px;
}
.ipt p {
  font-size: 12px;
  margin-bottom: 30px;
}

.riqi {
  display: inline-block;
}
.left,
.right {
  display: inline-block;
}
.left {
  width: 14%;
  text-align: right;
  vertical-align: top;
}
.right {
  width: 70%;
  text-align: left;
}
.el-checkbox-group {
  display: inline-block;
}
.youpin {
  width: 41%;
}
.el-checkbox {
  margin-right: 30px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.sou {
  display: inline-block;
  width: 320px;
}
.qun {
  padding: 50px;
}
.btn {
  float: right;
}
.inp {
  margin-bottom: 10px;
}
.inp select {
  width: 160px;
  height: 36px;
}
.bun {
  margin-top: 20px;
  text-align: center;
}
.text {
  margin-top: 50px;
  padding: 10px 20px;
  background-color: #c2ddfc;
}
.mian{
    margin-bottom: 20px;
}
.dialog-footer{
    text-align: center;
}
.header h3{
    text-align: center;
}
.header .left{
    float: left;
    width: 45%;
    text-align: left;
}
.header .right{
    float: right;
    width: 45%;
}
.box{
    overflow: hidden;
}
.neirong{
    padding: 0 30px;
}
.rong{
    border: 1px solid #999;
    padding: 0 10px;
    min-height: 270px;
}
.weChat .box{
    margin-bottom: 20px;
}
</style>
