<template>
	<div class="warp">
		<div class="main meassage">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="短信发送" name="first">
					<h5>发送通知</h5>
					<div class="notice">
						<h5>发送须知</h5>
						<p>1、根据通信部《通信短信息服务管理规定》要求，所有营销短信须在结尾加【退订回T】的退订机制，三统石油已在短信频道内预置【退订回T】，无需重复添加；</p>
						<p>2、短信发送时间：8：00-20：00，如有未收到的情况，请48小时内及时联系客服电话：18810386680/QQ：123456789；</p>
						<p>3、手动输入手机号码，请后面加半角‘；’，请勿重复</p>
						<p>4、支持txt文件上传手机号，格式为手机号；手机号；示列：18810386680；</p>
					</div>
					<el-row :gutter="20">
						<el-col :span="16">
							<div class="grid-content bg-purple">
								<h5>短信编辑</h5>
								<div class="edit">
									<div class="btn">
										<div class="left">
											<el-button type="primary" @click="templateVisible=true">选择模板</el-button>
										</div>
										<div class="right">
											<span>发送人数{{Num}}人</span>
											<el-button type="primary" @click="addMember">添加会员</el-button>
											<el-button type="primary" @click="empty">清空会员</el-button>
										</div>
									</div>
									<div class="centent">
										<el-input
											type="textarea"
											:rows="8"
											:change="chg()"
											placeholder="请编辑短信内容"
											maxlength = '58'
											v-model="messageContent[0].templateContent">
										</el-input>
										<span class="wordsNum">当前还可以输入{{inpNum}}个字，按一条计费</span>
									</div>
									<div class="timing">
										<el-checkbox v-model="checked">定时发送</el-checkbox>
										<!-- <el-date-picker
											v-model="sendDate"
											type="date"
											placeholder="选择日期">
										</el-date-picker>
										<el-time-picker
											v-model="sendTime"
											:picker-options="{
											selectableRange: '00:00:00 - 24:00:00'
											}"
											placeholder="选择时间">
										</el-time-picker> -->
										<el-date-picker
											v-model="sendDate"
											type="datetime"
											placeholder="选择日期时间">
										</el-date-picker>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<div class="preview">
									<h5>短信预览</h5>
									<div class="information">
										<div class="top">
											<div class="left">
												<i class="el-icon-arrow-left"></i>
												<span>538</span>
											</div>
											<div class="center">
												<svg-icon class="svr_sec" icon-class="yonghu"/>
												<p>1069180701800788</p>
											</div>
											<div class="right">
												<svg-icon class="svr_sec" icon-class="gantanhao"/>
											</div>
										</div>
										<div class="duan">
											<p>短信/彩信</p>
											<p>今天 上午9：19</p>
										</div>
										<div class="box">
											【三统石油】{{messageContent[0].templateContent}},【退订回复T】
										</div>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
					<div class="btn">
						<el-button type="primary" @click="send">发送</el-button>
					</div>

					<!-- 信息模板 -->
					<el-dialog :visible.sync="templateVisible" width='70%' title="短信模板">
						<div class="table">
							<el-table
								ref="multipleTable"
								stripe
								:data="templateData"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handleSelectionChange">
								<el-table-column
								type="selection"
								width="55">
								</el-table-column>
								<el-table-column
								label="标题"
								min-width="120">
								<template slot-scope="scope">{{ scope.row.templateName }}</template>
								</el-table-column>
								<el-table-column
								prop="templateContent"
								label="内容"
								min-width="120">
								</el-table-column>
							</el-table>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button @click="templateVisible = false">取消</el-button>
							<el-button type="primary" @click="ent">确认</el-button>
						</div>
					</el-dialog>
					<!-- 会员添加 -->
					<el-dialog :visible.sync="screenVisible" title="筛选" width="90%">
						<div class="sai">
							<div class="shu">
							<div class="block">
								<div class="left">
								<span>生日月份</span>
								</div>
								<div class="right">
								<el-select
									style="width: 180px;"
									multiple
									clearable
									v-model="screen.sendMonthArr"
									placeholder="请选择"
								>
									<el-option
									v-for="item in monthOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									></el-option>
								</el-select>
								</div>
							</div>
							<div class="block">
								<div class="left">
								<span>所属油站</span>
								</div>
								<div class="right">
								<el-select
									style="width: 180px;"
									multiple
									clearable
									v-model="screen.belongOils"
									placeholder="请选择"
								>
									<el-option
									v-for="item in stationOptions"
									:key="item.id"
									:label="item.fullName"
									:value="item.id"
									></el-option>
								</el-select>
								</div>
							</div>
							<div class="block">
								<div class="left">
								<span>会员等级</span>
								</div>
								<div class="right">
								<el-select
									style="width: 180px;"
									multiple
									clearable
									v-model="screen.memberLevelArr"
									placeholder="请选择"
								>
									<el-option
									v-for="item in levelOptions"
									:key="item.id"
									:label="item.levelName"
									:value="item.id"
									></el-option>
								</el-select>
								</div>
							</div>
							</div>
							<div class="shu">
							<div class="block">
								<div class="left">
								<el-input
									style="width: 300px;"
									v-model="screen.condition"
									placeholder="会员号/手机号/会员名称"
								></el-input>
								</div>
								
							</div>
							<div class="block">
								<div class="left">
								<span>会员注册时间</span>
								</div>
								<div class="right">
								<el-date-picker
									style="width: 170px;"
									v-model="screen.registeredStart"
									type="datetime"
									clearable
									placeholder="选择日期时间"
								></el-date-picker>
								<span>-</span>
								<el-date-picker
									v-model="screen.registeredEnd"
									style="width: 170px;"
									type="datetime"
									placeholder="选择日期时间"
									clearable
								></el-date-picker>
								</div>
							</div>
							<div class="block">
								<div class="left">
								<span>最后消费时间</span>
								</div>
								<div class="right">
								<el-date-picker
									v-model="screen.consumptionTimeStart"
									type="datetime"
									style="width: 170px;"
									placeholder="选择日期时间"
									clearable
								></el-date-picker>
								<span>-</span>
								<el-date-picker
									v-model="screen.consumptionTimeEnd"
									type="datetime"
									style="width: 170px;"
									placeholder="选择日期时间"
									clearable
								></el-date-picker>
								</div>
							</div>
							</div>
							<div class="shu">
							<div class="block">
								<div class="an">
									<el-button type="primary" @click="query">查询</el-button>
									<el-button type="primary" @click="reset">重置</el-button>
								</div>
							</div>
							<div class="block">
								<div class="left">
								<span>账户余额</span>
								</div>
								<div class="right">
								<el-select style="width: 90px;" v-model="screen.amoutIndex" placeholder="请选择">
									<el-option
									v-for="item in amoutIndexOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									></el-option>
								</el-select>
								<el-input style="width: 200px;" v-model="screen.amout" clearable placeholder="请输入内容"></el-input>
								</div>
							</div>
							<div class="block">
								<div class="left">
								<span>积分数量</span>
								</div>
								<div class="right">
								<el-select style="width: 90px;" v-model="screen.currentPointIndex" clearable placeholder="请选择">
									<el-option
									v-for="item in amoutIndexOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									></el-option>
								</el-select>
								<el-input style="width: 200px;" v-model="screen.currentPoint" placeholder="请输入内容"></el-input>
								</div>
							</div>
							</div>
						</div>
						<div class="table">
							<el-table
								ref="memberTable"
								stripe
								:data="memberData"
								tooltip-effect="dark"
								style="width: 100%"
								@selection-change="handChange">
								<el-table-column
								type="selection"
								width="55">
								</el-table-column>
								<el-table-column
								label="会员号"
								min-width="120">
								<template slot-scope="scope">{{ scope.row.memberNo }}</template>
								</el-table-column>
								<el-table-column
								prop="username"
								label="会员名称">
								</el-table-column>
								<el-table-column
								prop="birthday"
								label="生日">
								</el-table-column>
								<el-table-column
								prop="phone"
								label="手机号">
								</el-table-column>
								<el-table-column
								prop="memberLevel"
								label="会员等级">
								</el-table-column>
								<el-table-column
								prop="amout:"
								label="账户余额">
								</el-table-column>
								<el-table-column
								prop="currentPoint"
								label="积分">
								</el-table-column>
								<el-table-column
								prop="stationId"
								label="所属油站">
								</el-table-column>
								<el-table-column
								prop="templateContent"
								label="注册时间">
								</el-table-column>
								<el-table-column
								prop="createTime"
								min-width="100"
								label="最后消费时间">
								</el-table-column>
							</el-table>
						</div>
						<div slot="footer" class="dialog-footer">
							<div class="anniu">
								<el-button @click="templateVisible = false">取消</el-button>
								<el-button type="primary" @click="shaiEnt">确认</el-button>
							</div>
						</div>
					</el-dialog>
				</el-tab-pane>
				<el-tab-pane label="历史信息" name="second">
					<div class="table">
						<el-table
							:data="historicalData"
							stripe
							style="width: 100%">
							<el-table-column
							prop="sendTimeStr"
							label="发送时间"
							width="180">
							</el-table-column>
							<el-table-column
							prop="content"
							min-width="180"
							show-overflow-tooltip
							label="发送内容">
							</el-table-column>
							<el-table-column
							prop="targetPopulation"
							min-width="180"
							show-overflow-tooltip
							label="目标人群">
							</el-table-column>
							<el-table-column
							prop="number"
							label="发送数量">
							</el-table-column>
							<el-table-column
							prop="creater"
							label="操作人">
							</el-table-column>
							<el-table-column
							label="操作">
							<template slot-scope="scope">
								<el-button type="primary" size="medium" @click="see(scope.$index, scope.row)">查看</el-button>
							</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 发送详情 -->
					<el-dialog :visible.sync="sendVisible" width='70%' title="短信模板">
						<div class="send">
							<div class="top">
								<p style="width: 240px;">发送时间：{{seeSend.sendTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</p>
								<p style="width: 180px;">操作人：{{seeSend.creater}}</p>
								<p style="width: 280px;">发送数量：{{seeSend.number}}</p>
							</div>
							<p>目标人群</p>
							<div class="top">
								<div class="zuo">
									<p>生日月份：{{seeSend.sendMonth}}</p>
									<p>会员等级：{{seeSend.memberLevel}}</p>
									<p>所属加油站：{{seeSend.belongOils}}</p>
								</div>
								<div class="zhong">
									<p>账户余额：
										<span v-if="seeSend.balanceIndex=='0'">大于</span>
										<span v-if="seeSend.balanceIndex=='1'">小于</span>
										<span v-if="seeSend.balanceIndex=='2'">等于</span>
										<span v-if="seeSend.balanceIndex=='3'">大于等于</span>
										<span v-if="seeSend.balanceIndex=='4'">小于等于</span>
										{{seeSend.balance}}</p>
									<p>积分数量：
										<span v-if="seeSend.integralNumberIndex=='0'">大于</span>
										<span v-if="seeSend.integralNumberIndex=='1'">小于</span>
										<span v-if="seeSend.integralNumberIndex=='2'">等于</span>
										<span v-if="seeSend.integralNumberIndex=='3'">大于等于</span>
										<span v-if="seeSend.integralNumberIndex=='4'">小于等于</span>
										{{seeSend.integralNumber}}</p>
								</div>
								<div class="you">
									<p>最后消费时间：{{seeSend.registeredStartStr}}</p>
									<p>会员注册时间：{{seeSend.consumptionTimeStartStr}}</p>
								</div>
							</div>
							<p>发送内容</p>
							<div class="nei">
								{{seeSend.content}}
							</div>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button @click="sendVisible = false">关闭</el-button>
							<!-- <el-button type="primary">确认</el-button> -->
						</div>
					</el-dialog>
				</el-tab-pane>
				<el-tab-pane label="短信模板" name="third">
					<div class="table">
						<el-table
							:data="templateData"
							stripe
							style="width: 100%">
							<el-table-column
							prop="templateName"
							label="模板名称"
							align="center"
							width="200">
							</el-table-column>
							<el-table-column
							prop="templateContent"
							min-width="180"
							show-overflow-tooltip
							align="center"
							label="模板内容">
							</el-table-column>
							<el-table-column
							align="center"
							label="操作">
							<template slot-scope="scope">
								<el-button type="danger" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
							</template>
							</el-table-column>
							<el-table-column
							align="right"
							width="80"
							:render-header="renderHeader">
							<template slot="header" slot-scope="scope">
								
							</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- 添加短信 -->
					<el-dialog :visible.sync="addVisible" width='600px' title="添加短信">
						<div class="add">
							<div class="ipt">
								<div class="left">
									<span>标题</span>
								</div>
								<div class="right">
									<el-input v-model="addObj.templateName" placeholder="请输入内容" style="width: 200px;"></el-input>
								</div>
							</div>
							<div class="ipt">
								<div class="left">
									<span>内容</span>
								</div>
								<div class="right">
									<el-input
									style="width: 280px;"
									type="textarea"
									:rows="8"
									placeholder="请输入内容"
									v-model="addObj.templateContent">
									</el-input>
								</div>
							</div>
						</div>
						<div slot="footer" class="dialog-footer">
							<el-button @click="addVisible = false">取消</el-button>
							<el-button type="primary" @click="addEnt">确认</el-button>
						</div>
					</el-dialog>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import { getxinmo } from '@/api/duanxinfasong'
	import { getlishi } from '@/api/duanxinfasong'
	import { gethuiyuan } from '@/api/duanxinfasong'
	import { lishichakan } from '@/api/duanxinfasong'
	import { duanshan } from '@/api/duanxinfasong'
	import { addmoban } from '@/api/duanxinfasong'
	import { sendduan } from '@/api/duanxinfasong'
	import { queryMember } from "@/api/huiyuanguanli";
	import { queryAllMemberLevel } from '@/api/huiyuanguanli'
	import { StationList } from '@/api/youpinbaobiao'
	import { parseTime } from "@/utils";

	export default {
		name: "marketingmessageDemo",
		data() {
			return {
				activeName: 'first',
				num:58,//输入框输入限制字数总数
				inpNum:58,//还可以输入限制字数
				messageContent:[{
					title:'',//标题
					templateContent:'',//内容
				}],//短信内容
				checked: false,//定时发送是否选中
				sendDate:'',//定时发送日期
				sendTime:'',//定时发送时间
				previewContents:'',//短信预览内容
				templateVisible:false,//控制信息模板选择显示与隐藏
				//信息模板表格临时数据
				templateData:[],
				multipleSelection: [],
				//历史信息表格临时数据
				historicalData:[],
				sendVisible:false,//控制发送详情查看框显示与隐藏
				seeSend:'',//发送祥情数据
				//目标人群临时数据
				targetPopulation:{
					birthdayMonth:'',//生日月份
					membershipLevel:'',//会员等级
					affiliatedGasStation:'',//所属加油站
					accountBalance:'',//账户余额
					IntegralQuantity:'',//积分数量
					lastConsumptionTime:'',//最后消费时间
					membershipRegistrationTime:'',//会员注册时间
				},
				addVisible:false,//控制短信添加框显示与隐藏
				addObj:{
					templateName:'',//标题
					templateContent:'',//短信内容
				},
				birthdayMonth:[],//生日月份
				monthOptions:[{
					value: '1',
          			label: '1月'
				},{
					value: '2',
          			label: '2月'
				},{
					value: '3',
          			label: '3月'
				},{
					value: '4',
          			label: '4月'
				},{
					value: '5',
          			label: '5月'
				},{
					value: '6',
          			label: '6月'
				},{
					value: '7',
          			label: '7月'
				},{
					value: '8',
          			label: '8月'
				},{
					value: '9',
          			label: '9月'
				},{
					value: '10',
          			label: '10月'
				},{
					value: '11',
          			label: '11月'
				},{
					value: '12',
          			label: '12月'
				},],
				affiliatedGasStation:[],//所属加油站
				stationOptions:[],
				membershipLevel:[],//会员等级
				levelOptions:[],
				search:'',//搜索
				registeredStart: '',//注册时间1
				registeredEnd:'',//注册时间2
				consumptionTimeStart:'',//最后消费时间1
				consumptionTimeEnd:'',//最后消费时间2
				amout:'',//账户余额
				amoutIndex:0,//账户余额限制范围
				amoutIndexOptions:[{
					value: 0,
          			label: '大于',
				},{
					value: 1,
          			label: '小于',
				},{
					value: 2,
          			label: '等于',
				},{
					value: 3,
          			label: '大于等于',
				},{
					value: 4,
          			label: '小于等于',
				},],
				currentPoint:'',//积分数量
				currentPointIndex:0,//积分数量限制范围
				addMemberVisible:false,//会员添加
				memberTable:'',//选中的会员
				memberData:'',//会员表格
				memberSelection:[],
				Num:0,//人数
				screen: {
					sendMonthArr: "",
					belongOils: "",
					memberLevelArr: "",
					condition: "",
					registeredStart: "",
					registeredEnd: "",
					consumptionTimeStart: "",
					consumptionTimeEnd: "",
					amoutIndex: "",
					amout: "",
					currentPointIndex: "",
					currentPoint: ""
				},
				screenVisible:false,
				stationOptions: [], //油站列表
				levelOptions: [], //会员等级列表
				lishiSee:false,//历史信息查看 
			};
		},
		created(){
			this.get()
		},
		methods: {
			get(){
				// console.log(1111)
				// console.log(this.$route.query)
				this.memberSelection = this.$route.query.memberSelection ? this.$route.query.memberSelection : []
				this.Num = this.memberSelection.length 
				this.screen = this.$route.query.screen ? this.$route.query.screen : {}
				if (this.memberSelection.length!=0) {
					if (!(this.memberSelection[0].id)) {
						this.$message.error('请重新添加会员');
						this.memberSelection = [];
						this.Num = 0;
					}
				}
				// console.log(11111)
				// console.log(this.$route.query)
				// console.log(this.$route.query.screen)
				// console.log(this.Num)
				// console.log(this.memberSelection)
				var data ={}
				getxinmo(data)
					.then(response => {
						console.log(response.data)
						this.templateData = response.data.tbSmsTemplateList
					})
				getlishi(data)
					.then(response => {
						console.log('历史信息')
						console.log(response.data)
						this.historicalData = response.data.tbSmsTemplateList
					})
				var a = {};
				StationList(a).then(response => {
					// console.log('油站')
					// console.log(response.data)
					this.stationOptions = response.data;
				});
				var b = {};
				queryAllMemberLevel(b).then(response => {
					// console.log('会员等级')
					// console.log(response.data)
					this.levelOptions = response.data.list;
				});
			},
			
			query(){
				// if(this.membershipLevel.length==0){
				// 	var membershipLevel = null
				// }else{
				// 	var membershipLevel = this.membershipLevel
				// }
				// if(this.affiliatedGasStation.length==0){
				// 	var affiliatedGasStation = null
				// }else{
				// 	var affiliatedGasStation = this.affiliatedGasStation
				// }
				// if(this.birthdayMonth.length==0){
				// 	var birthdayMonth = null
				// }else{
				// 	var birthdayMonth = this.birthdayMonth
				// }
				// var data ={
				// 	"birthMonth": birthdayMonth,
				// 	"belongOils": affiliatedGasStation,
				// 	"memberLevelArr": membershipLevel,
				// 	"registeredStart":this.registeredStart,
				// 	"registeredEnd":this.registeredEnd,
				// 	"condition":this.search,
				// 	"consumptionTimeStart":this.consumptionTimeStart,
				// 	"consumptionTimeEnd":this.consumptionTimeEnd,
				// 	"amoutIndex":this.amoutIndex,
				// 	"amout":this.amout,
				// 	"currentPointIndex":this.currentPointIndex,
				// 	"currentPoint":this.currentPoint,
				// }
				queryMember(this.screen)
					.then(response => {
						console.log(response.data)
						this.memberData = response.data.memberList.rows
					})
			},
			reset(){
				this.screen = {
					sendMonthArr: [],
					belongOils: "",
					memberLevelArr:[],
					condition: "",
					registeredStart: "",
					registeredEnd: "",
					consumptionTimeStart: "",
					consumptionTimeEnd: "",
					amoutIndex: "",
					amout: "",
					currentPointIndex: "",
					currentPoint: ""
				};
			},
			chg(){
				if (this.messageContent[0].templateContent) {
					this.inpNum = this.num-this.messageContent[0].templateContent.length;
				} else {
					this.inpNum=58
				}
			},
			ent(){
				this.templateVisible = false
				this.messageContent=this.multipleSelection
			},
			see(index,row){
				this.sendVisible=true
				console.log(row.id)
				var data = {
					"id": row.id
				}
				lishichakan(data)
					.then(response => {
						console.log(response.data)
						this.seeSend = response.data.tbSmsPeople
					})
				// this.$http
				// 	.post('http://192.168.0.129:8080/sms/querySmsPeopleById',
				// 	{
				// 		"id": row.id
				// 	},
				// 	{
				// 		headers:{
				// 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
				// 		}
				// 	})
				// 	.then(function(res){
				// 		console.log('提交成功')
				// 		console.log("详情")
				// 		console.log(res.body)
				// 		console.log(res.body.tbSmsPeople)
				// 		this.seeSend = res.body.tbSmsPeople
				// 		this.seeSend.sendingTime = row.sendTimeStr
				// 	})
				// 	.catch(function(err){
				// 		console.log('提交失败')
				// 		console.log(err)
				// 		this.$message.error('详情获取失败');
				// 	})
				
			},
			shaiEnt(){
				this.Num =this.memberSelection.length
				this.screenVisible = false
			},
			add(){
				this.addVisible=true;
			},
			del(index,row){
				var data = {
					"id": row.id
				}
				duanshan(data)
					.then(response => {
						console.log(response.data)
						this.templateData.splice(index, 1); 
					})
				// this.$http
				// 	.post('http://192.168.0.129:8080/sms/deleteSmsTemplate',
				// 	{
				// 		"id": row.id,
				// 	},
				// 	{
				// 		headers:{
				// 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
				// 		}
				// 	})
				// 	.then(function(res){
				// 		console.log('提交成功')
				// 		console.log(res)
				// 		this.templateData.splice(index, 1); 
				// 		this.$message({
				// 			message: '删除成功',
				// 			type: 'success'
				// 		});
				// 	})
				// 	.catch(function(err){
				// 		console.log('提交失败')
				// 		console.log(err)
				// 		this.$message.error('删除失败');
				// 	})
			},
			addEnt(){
				this.addVisible=false
				var data = {
					"platform": "1",
					"templateContent": this.addObj.templateContent,
					"templateName": this.addObj.templateName
				}
				addmoban(data)
					.then(response => {
						console.log(response.data)
						this.templateData.push(response.data)
						this.$message({
							message: '添加成功',
							type: 'success'
						});
					})
				// this.$http
				// 	.post('http://192.168.0.129:8080/sms/addSmsTemplate',
				// 	{
				// 		"platform": "1",
				// 		"templateContent": this.addObj.templateContent,
				// 		"templateName": this.addObj.templateName
				// 	},
				// 	{
				// 		headers:{
				// 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
				// 		}
				// 	})
				// 	.then(function(res){
				// 		console.log('提交成功')
				// 		console.log(res)
				// 		this.templateData.push(res.body)
				// 		this.$message({
				// 			message: '添加成功',
				// 			type: 'success'
				// 		});
				// 	})
				// 	.catch(function(err){
				// 		console.log('提交失败')
				// 		console.log(err)
				// 		this.$message.error('添加失败');
				// 	})
			},
			send(){
				// console.log(this.birthdayMonth.join(''))
				// console.log(this.memberSelection,)
				if(this.memberSelection.length==0){
					this.$message.error('请添加会员');
					return;
				}
				if(this.messageContent[0].templateContent==''||this.messageContent[0].templateContent==null){
					this.$message.error('请添加短信内容');
					return;
				}
				var tbMembers=[]
				for(var i=0;i<this.memberSelection.length;i++){
					tbMembers.push({
						id:this.memberSelection[i].id,
						phone:this.memberSelection[i].phone
					})
				}
				if(this.checked){
					var isTiming = 1
				}else{
					var isTiming = 0
				}
				var data = {
					"sendMonth": this.screen.sendMonthArr.join(','),
					"belongOils": this.screen.belongOils.join(','),
					"memberLevel": this.screen.memberLevelArr.join(','),
					"registeredStart":this.screen.registeredStart,
					"registeredEnd":this.screen.registeredEnd,
					"consumptionTimeStart":this.screen.consumptionTimeStart,
					"consumptionTimeEnd":this.screen.consumptionTimeEnd,
					"balanceIndex":this.screen.amoutIndex,
					"balance":this.screen.amout,
					"integralNumberIndex":this.screen.currentPointIndex,
					"integralNumber":this.screen.currentPoint,
					"tbMembers": tbMembers,
					"sendTime": this.sendDate,
					"content": this.messageContent[0].templateContent,
					"isTiming": isTiming
				}
				console.log(data)
				sendduan(data)
					.then(response => {
						console.log(response.data)
						this.$message({
							message: '发送成功',
							type: 'success'
						});
					})
				// this.$http
				// 	.post('http://192.168.0.129:8080/sms/sendSms',
				// 	{
				// 		"sendMonth": this.birthdayMonth.join(''),
				// 		"belongOils": this.affiliatedGasStation.join(''),
				// 		"memberLevel": this.membershipLevel.join(''),
				// 		"registeredStart":this.registeredStart,
				// 		"registeredEnd":this.registeredEnd,
				// 		"consumptionTimeStart":this.consumptionTimeStart,
				// 		"consumptionTimeEnd":this.consumptionTimeEnd,
				// 		"balanceIndex":this.amoutIndex,
				// 		"balance":this.amout,
				// 		"integralNumberIndex":this.currentPointIndex,
				// 		"integralNumber":this.currentPoint,
				// 		"tbMembers": tbMembers,
				// 		"sendTime": this.sendDate,
				// 		"content": this.messageContent[0].templateContent,
				// 		"isTiming": isTiming
				// 	},
				// 	{
				// 		headers:{
				// 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
				// 		}
				// 	})
				// 	.then(function(res){
				// 		console.log('提交成功')
				// 		console.log(res.body)
				// 		// console.log(res.body)
				// 	})
				// 	.catch(function(err){
				// 		console.log('提交失败')
				// 		console.log(err)
				// 		this.$message.error('获取失败');
				// 	})
			},
			// 自定义表达头+
			renderHeader(h, { column, $index }){
			var that=this
			return h('span', [
				h('span', column.label),
				h('el-button',
				{
					style: "margin-left: 5px; border:0;background-color:#F5F9FC;font-size: 25px;padding: 0;color:#5B8DFF;",
					on: {
						click: that.add
					}
				},['+']),
			]);
			},
			empty(){
				// console.log(1)
				this.memberSelection = []
				this.Num = 0
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handChange(val) {
				this.memberSelection = val;
			},
			//切换标签页
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			addMember(){
				this.$router.push({
					name:'marketingAdd',
					query:{
						id:1,
					}
				})
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
    background-color: #F6F7FB;
    // padding: 20px;
}
.main{
    min-height: calc(100vh - 120px);
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
h5{
	margin: 0;
}
.notice{
	margin: 10px 0 20px;
	background-color: #F5F9FC;
	padding: 1%;
	border: 1px solid #e4e7ed;
	border-radius: 5px;
}
.notice p{
	font-size: 14px;
}
.edit .btn{
	margin: 20px 0;
	overflow: hidden;
}
.btn .left{
	float: left;
}
.btn .right{
	float: right;
	font-size: 14px;
}
.btn .right .el-button{
	margin-left: 20px;
}
.centent{
	position: relative;
}
.centent .wordsNum{
	position: absolute;
	right: 10px;
	bottom: 7px;
	font-size: 14px;
	color: grey;
}
.timing{
	margin: 20px 0;
}
.information{
	width: 250px;
	height: 360px;
	border: 1px solid #e4e7ed;
	border-radius: 5px;
	margin-top: 20px;
}
.information .top{
	display: flex;
	justify-content: space-between;
	background-color: #F9F9F9;
	border-bottom: 1px solid #e4e7ed;
	padding: 0 5px;
}
.top .left,.top .right{
	line-height: 37px;
}
.top .left span{
	font-size: 12px;
	display: inline-block;
	line-height: 14px;
    border-radius: 7px;
    padding: 0 4px;
	background-color: #065FF1;
}
.left i{
	color: #065FF1;
    font-weight: 700;
}
.right .svr_sec{
	color: #065FF1;
}
.center{
	text-align: center;
}
.top p{
	margin: 0;
	font-size: 12px;
}
.duan{
	margin: 20px 0;
}
.duan p{
	margin: 0;
	text-align: center;
	font-size: 14px;
    color: grey;
}
.box{
    position: relative;
	margin-left: 15px;
    width: 175px;
    min-height: 85px;
    border: 2px solid #e4e7ed;
    background-color: #E6E5EA;
	padding: 5px;
	font-size: 14px;
	border-radius: 10px;
}
.box:before{
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-right: 10px solid #e4e7ed;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
	bottom: 0;
    left: -8px;
}
.btn{
	text-align: center;
	margin: 20px 0;
}
.dialog-footer .el-button:nth-of-type(2){
	margin-left: 200px;
}
.dialog-footer{
	text-align: center;
}
.table{
	border: 1px solid #e4e7ed;
}
.send .top{
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}
.send p{
	font-size: 16px;
	line-height: 36px;
}
.zuo{
	width: 240px;
}
.zhong{
	width: 180px;
}
.you{
	width: 280px;
}
.nei{
	min-height: 100px;
	padding: 10px;
	border: 1px solid #e4e7ed;
	border-radius: 5px;
}
.ipt{
	margin-bottom: 10px;
}
.ipt span{
	line-height: 36px
}
.ipt .left,.ipt .right{
	display: inline-block;
}
.ipt .left{
	vertical-align: top;
}
.sai{
	display: flex;
	justify-content: space-between;
}
.sai .shu .block{
	line-height: 36px;
}
.shu .left,.right{
	display: inline-block;
}
.shu .block{
	margin-bottom: 10px;
}
.shu .left{
	width: 90px;
	line-height: 36px;
}
.an{
	text-align: right;
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
.meassage .el-tabs__nav-wrap{
    padding: 0 2%;
}
.meassage .el-tabs__content{
    padding: 2%;
}
.meassage .el-tabs__nav{
    height: 60px;
    line-height: 60px;
}
.meassage .el-textarea__inner{
	resize:none;
}
.meassage .el-dialog__header{
	text-align: center;
	background-color: #5B8DFF;
	color:#fff;
}
.meassage .el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #fff;
}
.meassage .el-dialog__headerbtn .el-dialog__close{
	color: #fff;
}
</style>