<template>
<div class="warp">
  <el-tabs type="border-card">
    <el-tab-pane label="电子优惠券">
        <!-- <a href="#/marketing/marketing-newTicket">
            <el-button>新增优惠券</el-button>
        </a> -->
        <div class="biao">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                label="标题"
                align='center'>
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="优惠券类型"
                min-width="90"
                align='center'>
                <template slot-scope="scope">
                    <span v-if="scope.row.couponType==1">代金券</span>
                    <span v-if="scope.row.couponType==2">折扣券</span>
                </template>
                </el-table-column>
                <el-table-column
                label="券面金额"
                align='center'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.couponType==1">{{ scope.row.couponDiscount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="折扣比例"
                align='center'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.couponType==2">{{ scope.row.couponDiscount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="发放数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.sendNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="使用数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.useNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="最低消费"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.minimumCharge }}</span>
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
                        <span v-show="scope.row.status==1">生效中</span>
                        <span v-show="scope.row.status==0">停用</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" min-width="160" align='center'>
                <template slot-scope="scope">
                    <el-button
                    v-show="scope.row.status==1 "
                    size="mini"
                    type="danger"
                    @click="stop(scope.$index, scope.row)">停止</el-button>
                    <el-button
                    size="mini"
                    @click="seeTicket(scope.$index, scope.row)">查看</el-button>
                     <el-button
                    v-show="scope.row.status==0"
                    size="mini"
                    type="danger"
                    @click="deleteTicket(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
                <el-table-column align="right" width="80" :render-header="renderHeader">
                    <template slot="header" slot-scope="scope"></template>
                </el-table-column>
            </el-table>
        </div>
    </el-tab-pane>
    <el-tab-pane label="群发优惠券">
        <div class="qun">
            <div class="sou">
                <el-input v-model="input"  placeholder="会员号/手机号/会员名称" suffix-icon="el-icon-search" style="width: 210px;"></el-input>
            </div>
            <div class="btn">
                <el-button @click="weChatGroup(2)">短信群发</el-button>
                <el-button @click="weChatGroup(1)">微信群发</el-button>
            </div>
            <div class="mian">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <div class="inp">
                            <span>生日月份</span>
                            <el-select v-model="month" placeholder="请选择">
                                <el-option
                                v-for="item in monthOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="inp">
                            <span> 账户余额</span>
                            <el-select v-model="limit" placeholder="请选择">
                                <el-option
                                v-for="item in limitOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="balance" placeholder="单行输入" style="width: 150px;"></el-input>
                        </div>
                        <div class="inp">
                            <span>注册时间</span>
                            <el-date-picker
                                v-model="registrationTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <!-- <el-select v-model="registrationTime" placeholder="请选择">
                                <el-option
                                v-for="item in registrationTimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                        <div class="inp">
                            <span>最后消费时间</span>
                            <el-select v-model="lastConsumptionTime" placeholder="请选择">
                                <el-option
                                v-for="item in lastConsumptionTimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                             <el-select v-model="lastLimit" placeholder="请选择">
                                <el-option
                                v-for="item in lastLimitOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light">
                        <div class="inp">
                            <span>会员等级</span>
                            <el-select v-model="membershipLevel" placeholder="请选择">
                                <el-option
                                v-for="item in membershipLevelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="inp">
                            <span>积分数量</span>
                            <el-select v-model="integralLimit" placeholder="请选择">
                                <el-option
                                    v-for="item in limitOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="integralQuantity" placeholder="单行输入" style="width: 150px;"></el-input>
                        </div>
                        <div class="inp">
                            <span>所属加油站</span>
                            <el-select v-model="gasStation" placeholder="请选择">
                                <el-option
                                v-for="item in gasStationOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
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
            <div class="biao">
                <div class="table">
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        stripe
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
                        <template slot-scope="scope">{{ scope.row.memberNo }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        label="会员名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="birthday"
                        label="生日"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="memberLevel"
                        label="会员等级"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="amout"
                        label="账户余额"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="stationId"
                        label="积分"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="stationName"
                        label="所属油站"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="templateContent"
                        label="注册时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="最后消费时间"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            
        </div>
    </el-tab-pane>
    <el-tab-pane label="发送记录">
        <div class="biao">
            <el-table
                :data="sendingData"
                stripe
                style="width: 100%">
                <el-table-column
                label="发送途径"
                align='center'>
                <template slot-scope="scope">
                    <span v-show="scope.row.sendType==1">微信</span>
                    <span v-show="scope.row.sendType==2">短信</span>
                </template>
                </el-table-column>
                <el-table-column
                label="发送内容"
                align='center'>
                <template slot-scope="scope">
                    <span>{{ scope.row.text }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="发送数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.sendNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="使用数量"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.useNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="发送时间"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.sendDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作人"
                min-width="80"
                align='center'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.userName  }}</span>
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
<el-dialog title="查看" :visible.sync="ticketVisible">
    <div class="header">
        <div class="ticketSee">
            <div class="top">
                <div class="box">
                    <div class="block">
                        <span>标题：{{result.name}}</span>
                    </div>
                    <div class="block">
                        <span>优惠券类型：</span>
                        <span v-show="result.coupon_type==1">代金券</span>
                        <span v-show="result.coupon_type==2">折扣券</span>
                    </div>
                    <div class="block">
                        <span>有效期：{{result.period_of_validity}}</span>
                    </div>
                    <div class="block">
                        <span>开始时间：{{result.start_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </div>
                </div>
                <div class="box">
                    <div class="block">
                        <span>状态：</span>
                        <span v-show="result.status==1">生效中</span>
                        <span v-show="result.status==0">已停止</span>
                    </div>
                    <div class="block">
                        <span v-show="result.coupon_type==1">券面金额：{{result.coupon_discount}}元</span>
                        <span v-show="result.coupon_type==2">优惠折扣：{{result.coupon_discount}}%</span>
                    </div>
                    <div class="block">
                        <span>最低消费：{{result.minimum_charge}}元</span>
                    </div>
                </div>
            </div>
            <div>
                <p>应用范围：</p>
                <p>{{result.goods_name}}</p>
            </div>
            <div>
                <p>使用说明：{{result.instruction}}</p>
            </div>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button @click="ticketVisible = false">关闭</el-button>
    </div>
</el-dialog>
<!-- 微信群发框 -->
    <el-dialog :title="qfType == 2 ? '短信群发' : '微信群发'" :visible.sync="weChatVisible">
        <div class="weChat">
           <div class="box">
               <span>优惠券</span>
               <el-select v-model="weChatSend.type" placeholder="请选择" style="width: 300px;">
                    <el-option
                    style="width: 300px;"
                    v-for="item in tableData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
               <!-- <el-input v-model="weChatSend.type" placeholder="请输入内容" ></el-input> -->
           </div>
            <div class="box">
               <span>主题</span>
               <el-input v-model="weChatSend.title" placeholder="请输入内容" style="width: 300px;"></el-input>
           </div>
           <div class="box">
               <span style="vertical-align: top;">内容</span>
               <el-input
                type="textarea"
                style="width: 300px;"
                :autosize="{ minRows: 3, maxRows: 8}"
                placeholder="请输入内容"
                :rows="5"
                v-model="weChatSend.content">
                </el-input>
           </div>
           <div class="box">
               <span>发送时间</span>
                <el-date-picker
                    style="width: 300px;"
                  v-model="weChatSend.date"
                  type="datetime"
                  :picker-options="pickerOptions1"
                  placeholder="选择时间">
                </el-date-picker>
           </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">发送</el-button> -->
            <el-button @click="weChatVisible = false">{{ $t('table.cancel') }}</el-button>
            <el-button type="primary" @click="send">发送</el-button>
        </div>
    </el-dialog>
 <!-- 发送记录查看框 -->
    <el-dialog title="查看" :visible.sync="dialogFormVisible">
        <div class="header send">
            <!-- <h3>查看</h3> -->
            <div class="box">
                <div class="left">
                    <p>
                        <span>发送途径:</span>
                        <span v-show="detailsSend.sendType==1">微信</span>
                        <span v-show="detailsSend.sendType==2">短信</span>
                    </p>
                    <p><span>优惠券名称:</span><span>{{detailsSend.title}}</span></p>
                </div>
                <div class="right">
                    <p><span>发送时间:</span><span>{{detailsSend.sendDate}}</span></p>
                    <p><span>操作人:</span><span>{{detailsSend.userName }}</span></p>
                </div>
            </div>
            <p><span>发送内容</span></p>
            <div class="neirong">
                <div class="rong">
                    <p>{{detailsSend.text}}</p>
                </div>
            </div>
            <div class="box">
                <div class="left">
                    <p><span>发送数量:</span><span>{{detailsSend.sendNum}}</span></p>
                </div>
                <div class="right">
                    <p><span>使用数量：</span><span>{{detailsSend.useNum}}</span></p>
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
import { getyouhuilist } from "@/api/youhuiquan";
import { sendList } from "@/api/youhuiquan";
import { queryMember } from "@/api/youhuiquan";
import { weifa, sendYh, couponDetail, couponUpdate, couponDelete } from "@/api/youhuiquan";
import { parseTime } from "@/utils";


export default {
  name: "Ticket",
  data() {
    return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
          },
          minTime:new Date()
        },
      //电子优惠券临时表格数据
      tableData: [
        
      ],
      //发送记录临时表格记录
      sendingData: [
        
      ],
      //群发优惠券临时表格数据
      tableData3: [
        
      ],
      month:'',//生日月份
      balance:'',//账户余额
      limit:'',//账户余额限制大于  小于。。。
      registrationTime:'',//注册时间
      lastConsumptionTime:'',//最后消费时间
      lastLimit:'',//最后消费时间限制  之前  之后
      membershipLevel:'',//会员等级
      integralQuantity:'',//积分数量
      integralLimit:'',//积分限制
      gasStation:'',//所属加油站
      multipleSelection: [],
      dialogFormVisible:false,//控制发送记录查看弹出框
      detailsSend :'',

      weChatVisible:false,//控制微信群发弹出框显示与隐藏
      weChatSend:{
          type:'',
          title:'',
          content:'',
          date:'',
      },
      qfType:'',
      //月份选择数据
      monthOptions:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '一月'
        }, {
          value: '2',
          label: '二月'
        }, {
          value: '3',
          label: '三月'
        }, {
          value: '4',
          label: '四月'
        }, {
          value: '5',
          label: '五月'
        }, {
          value: '6',
          label: '六月'
        }, {
          value: '7',
          label: '七月'
        }, {
          value: '8',
          label: '八月'
        }, {
          value: '9',
          label: '九月'
        }, {
          value: '10',
          label: '十月'
        }, {
          value: '11',
          label: '十一月'
        }, {
          value: '12',
          label: '十二月'
        },],
        //限制选择数据
    limitOptions:[{
        value: '0',
        label: '请选择'
    },{
        value: '1',
        label: '大于'
    },{
        value: '2',
        label: '等于'
    },{
        value: '3',
        label: '小于'
    },{
        value: '4',
        label: '大于等于'
    },{
        value: '5',
        label: '小于等于'
    },],
    registrationTimeOptions:[{
        value: '2018-12-10',
        label: '2018-12-10'
    },],
    lastConsumptionTimeOptions:[{
        value: '2018-12-10',
        label: '2018-12-10'
    }],
    lastLimitOptions:[{
        value: '1',
        label: '之前'
    },{
        value: '2',
        label: '之后'
    },],
    membershipLevelOptions:[{
        value: '1',
        label: '普通'
    },{
        value: '2',
        label: '黄金'
    },],
    gasStationOptions:[],
    input:'',
    ticketVisible:false,//电子优惠券查看框
    result:'',//电子优惠券查看
    };
  },
  mounted(){
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
    weChatGroup(val){
        if(this.multipleSelection.length){
            this.qfType = val
            this.weChatVisible=true
            this.weChatSend = {
                type:'',
                title:'',
                content:'',
                date:'',
            }
        }else{
            this.$message.error('请选择会员')
        }
    },
    //获取电子优惠券列表数据
    getcoupons(){
        var data = {}
        getyouhuilist(data)
            .then(response => {
                console.log(response.data)
                this.tableData = response.data.list
            })
        // sendList(data)
        //     .then(response => {
        //         console.log(response.data)
        //         this.sendingData = response.data.list
        //     })
        queryMember(data)
            .then(response => {
                console.log(response.data)
                this.tableData3 = response.data.memberList.rows
            })
    },
    send(){
        if(!this.weChatSend.type){
            this.$message.error('请选择优惠券')
        }else if(!this.weChatSend.title){
            this.$message.error('请输入主题')
        }else if(!this.weChatSend.content){
            this.$message.error('请输入内容')
        }else if(!this.weChatSend.date){
            this.$message.error('请选择时间')
        }else{
            var couponMemberList =[]
            for(var i=0;i<this.multipleSelection.length;i++){
                couponMemberList.push({
                    member_id:this.multipleSelection[i].id,
                    member_no:this.qfType == 2 ? this.multipleSelection[i].phone : this.multipleSelection[i].openId
                })
            }
            var data ={
                "couponMemberList":couponMemberList,
                "couponId":this.weChatSend.type,
                "sendType":this.qfType,
                "title":this.weChatSend.title,
                "text":this.weChatSend.content,
                "sendNum":couponMemberList.length,
                sendTime:this.weChatSend.date
            }
            sendYh(data).then(response => {
                this.weChatVisible = false
            })
        }
    },
    fasong(num,data){
        this.dialogFormVisible=true
        this.detailsSend=data
    },
    // 自定义表达头+
    renderHeader(h, { column, $index }) {
      var that = this;
      return h("span", [
        h("span", column.label),
        h(
          "el-button",
          {
            style: "margin-left: 5px; border:0;background-color:#F5F9FC;font-size: 25px;padding: 0;color:#5B8DFF;",
            on: {
              click: that.tiao
            }
          },
          ["+"]
        )
      ]);
    },
    tiao(){
        // #/marketing/marketing-newTicket
        this.$router.push('/marketing/marketing-newTicket')
    },
    //优惠券查看
    seeTicket(index,row){
        this.ticketVisible = true;
        couponDetail({id:row.id})
            .then(response => {
                console.log(response.data)
                this.result = response.data.result
            })

    },
    // 优惠券停止
    stop(index, row){
        this.$confirm('是否要停止该优惠券?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: false
        }).then(() => {
            var data = {id:row.id,status:0}
            console.log(data)
            couponUpdate(data)
                .then(response =>{
                    console.log(response.data)
                    this.$message({
                        type: 'success',
                        message: '停止成功!'
                    });
                    this.getcoupons() 
                })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消停止'
            });
        });
    },
    // 优惠券删除
    deleteTicket(index,row){
        this.$confirm('是否要删除该优惠券?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: false
        }).then(() => {
            couponDelete({id:row.id})
                .then(response =>{
                    console.log(response.data)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getcoupons() 
                })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }
  }
  
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.biao {
  text-align: center;
  margin-top: 20px;
  border: 1px solid #e4e7ed;
  border-bottom: 0;
}
.biao table {
  text-align: center;
}
.el-input {
  width: 150px;
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
  padding: 1%;
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
.el-select{
    width: 150px;
}
.qun .inp span:nth-of-type(1){
    display: inline-block;
    width: 110px;
}
.weChat .box span:nth-of-type(1){
    display: inline-block;
    width: 80px;
    // text-align: right;
    margin-right: 10px;
    line-height: 36px;
}
.send p span:nth-of-type(1){
    width: 90px;
    margin-right: 10px;
    text-align: right;
    display: inline-block;
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
.el-table th{
    text-align: center;
}
</style>