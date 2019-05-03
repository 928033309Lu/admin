<template>
	<div class="warp">
		<!-- <div class="top">
			<div class="box">
				<span>公司</span>
				<el-select v-model="company" placeholder="请选择">
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
				<el-select v-model="company" placeholder="请选择">
					<el-option
					v-for="item in companyOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>-->
		<!-- <div class="capital"> -->
		<!-- <el-row :gutter="10">
				<el-col :xs="10" :sm="10" :md="9" :lg="9" :xl="9"><div class="grid-content bg-purple">
					<div class="xiaoshou">
						<h3>2083895</h3>
						<span></span>
						<span>销售收入（日）</span>
					</div>
					<div class="shu"></div>
					<div class="chongzhi">
						<h3>4598700</h3>
						<span></span>
						<span>充值金额（日）</span>
					</div>
				</div></el-col>
				<el-col :xs="14" :sm="14" :md="15" :lg="15" :xl="15"><div class="grid-content bg-purple-light">
					<div class="chendian">
						<h3>2083895</h3>
						<span></span>
						<span>沉淀资金（总）</span>
					</div>
					<div class="shu"></div>
					<div class="zongshu">
						<h3>87632</h3>
						<span></span>
						<span>会员总数（总）</span>
					</div>
					<div class="shu"></div>
					<div class="leiji">
						<h3>2083895</h3>
						<span></span>
						<span>累计收入（月）</span>
					</div>
				</div></el-col>
				
		</el-row>-->
		<!-- <div class="left">
				<div class="xiaoshou">
					<h3>2083895</h3>
					<span></span>
					<span>销售收入（日）</span>
				</div>
				<div class="shu"></div>
				<div class="chongzhi">
					<h3>4598700</h3>
					<span></span>
					<span>充值金额（日）</span>
				</div>
			</div>
			<div class="right">
				<div class="chendian">
					<h3>2083895</h3>
					<span></span>
					<span>沉淀资金（总）</span>
				</div>
				<div class="shu"></div>
				<div class="zongshu">
					<h3>87632</h3>
					<span></span>
					<span>会员总数（总）</span>
				</div>
				<div class="shu"></div>
				<div class="leiji">
					<h3>2083895</h3>
					<span></span>
					<span>累计收入（月）</span>
				</div>
		</div>-->
		<!-- </div> -->
		<div class="hezi">
			<div class="zuo">
				<div class="items">
					<img src="@/images/dangri.png" alt>
					<div class="zfb">
						<h3>￥{{(payMoment.sum_amount||0)}}</h3>
						<span>当日收入合计</span>
					</div>
				</div>
				<div class="items">
					<img src="@/images/dangyue.png" alt>
					<div class="zfb">
						<h3>￥{{(payMonth.sum_amount||0)}}</h3>
						<span>当月收入合计</span>
					</div>
				</div>
			</div>
			<div class="you">
				<div class="income">
					<div class="items">
						<p>支付宝当日收入{{(payMoment.alipay_count||0)}}笔/日</p>
						<img src="@/images/zhifubao.jpg" alt>
						<div class="zfb">
							<h3 style="color:#1bade9">￥{{(payMoment.alipay_amount||0)}}</h3>
						</div>
						<p>当月总收入￥{{(payMonth.alipay_amount||0)}}</p>
					</div>
					<div class="shu"></div>
					<div class="items">
						<p>微信当日收入{{(payMoment.wechat_count||0)}}笔/日</p>
						<img src="@/images/weixin.jpg" alt>
						<div class="zfb">
							<h3 style="color:#52b540">￥{{(payMoment.wechat_amount||0)}}</h3>
						</div>
						<p>当月总收入￥{{(payMonth.wechat_amount||0)}}</p>
					</div>
					<div class="shu"></div>
					<div class="items">
						<p>现金当日收入{{(payMoment.cash_count||0)}}笔/日</p>
						<img src="@/images/xianjin.jpg" alt>
						<div class="zfb">
							<h3 style="color:#f9c61b">￥{{(payMoment.cash_amount||0)}}</h3>
						</div>
						<p>当月总收入￥{{(payMonth.cash_amount||0)}}</p>
					</div>
				</div>
				<div class="income">
					<div class="items">
						<p>银行卡当日收入{{(payMoment.card_count||0)}}笔/日</p>
						<img src="@/images/yinhangka.jpg" alt>
						<div class="zfb">
							<h3 style="color:#fd8433">￥{{(payMoment.card_amount||0)}}</h3>
						</div>
						<p>当月总收入￥{{(payMonth.card_amount||0)}}</p>
					</div>

					<div class="shu"></div>
					<div class="items">
						<p>新会员当日收入{{(payMoment.member_count||0)}}笔/日</p>
						<img src="@/images/xinhuiyuan.png" alt>
						<div class="zfb">
							<h3 style="color:#ff98d3">￥{{(payMoment.member_amount||0)}}</h3>
						</div>
						<p>当月总收入￥{{(payMonth.member_amount||0)}}</p>
					</div>
					<div class="shu"></div>
					<div class="items">
						<p>老会员当日收入{{(payMoment.old_member_count||0)}}笔/日</p>
						<img src="@/images/laohuiyuan.png" alt>
						<div class="zfb">
							<h3 style="color:#cc5ee1">￥{{(payMoment.old_member_amount||0)}}</h3>
						</div>
						<p>当月总收入￥{{(payMonth.old_member_amount||0)}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="topbang">
			<div class="youpin">
				<div class="title">
					<span></span>
					<h3>油品TOP5</h3>
				</div>
				<ul>
					<li v-for="(item,index) in oilTop" :key="item.oils_name">
						<span v-if="index==3">4</span>
						<span v-else-if="index==4">5</span>
						<span v-else></span>
						<span>{{item.oils_name}}</span>
						<span>{{item.sum}}</span>
					</li>
				</ul>
			</div>
			<div class="shangpin">
				<div class="title">
					<span></span>
					<h3>商品TOP5</h3>
				</div>
				<ul>
					<li v-for="(item,index) in goodsTop" :key="item.goods_name">
						<span v-if="index==3">4</span>
						 <span v-else-if="index==4">5</span>
						 <span v-else></span>
						<span>{{item.goods_name}}</span>
						<span>{{item.sum}}</span>
					</li> 
				</ul>
			</div>
			<div class="shangpin">
				<el-row :gutter="20">
					<el-col :span="24">
						<div class="grid-content bg-purple">
							<h3 class="_flag">优惠策略</h3>
							<div class="table">
								<el-table :data="tableData" style="width: 100%">
									<el-table-column prop="name" label="名称" width="180"></el-table-column>
									<el-table-column prop="remark" label="内容"></el-table-column>
								</el-table>
							</div>
						</div>
					</el-col>
					<el-col :span="24">
						<div class="grid-content bg-purple">
							<h3 class="_flag">售油量</h3>
							<div class="table">
								<el-table :data="tableData1" style="width: 100%">
									<el-table-column prop="title" label="油品" width="180"></el-table-column>
									<el-table-column prop="content" label="销量"></el-table-column>
								</el-table>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- <div class="shanghu">
				<div class="title">
					<span></span>
					<h3>商户TOP5</h3>
				</div>
				<ul>
					<li>
						<span></span>
						<span>北京公司</span>
						<span>38290元</span>
					</li>
					<li>
						<span></span>
						<span>天津公司</span>
						<span>38290元</span>
					</li>
					<li>
						<span></span>
						<span>河北公司</span>
						<span>38290元</span>
					</li>
					<li>
						<span>4</span>
						<span>河南公司</span>
						<span>38290元</span>
					</li>
					<li>
						<span>5</span>
						<span>上海公司</span>
						<span>38290元</span>
					</li>
				</ul>
			</div>-->
		</div>
		<div class="biao">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="收银金额" name="first">
					<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
						<line-chart
							:chart-data="lineChartData"
							:chart-title="['非油品', '油品']"
							:style="{width: '100%', height: '420px'}"
						/>
					</el-row>
				</el-tab-pane>

				<el-tab-pane label="油品数量" name="second">
					<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
						<line-chart
							v-if="tabShow[1]"
							:chart-data="youpinshuliangData"
							:chart-title="['汽油', '柴油']"
							:style="{width: '100%', height: '420px'}"
						/>
					</el-row>
				</el-tab-pane>

				<el-tab-pane label="充值金额" name="third">
					<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
						<line-chart
							v-if="tabShow[2]"
							:chart-data="chongzhijineData"
							:chart-title="['充值金额']"
							:style="{width: '100%', height: '420px'}"
						/>
					</el-row>
				</el-tab-pane>

				<el-tab-pane label="会员总数" name="fourth">
					<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
						<line-chart
							v-if="tabShow[3]"
							:chart-data="huiyuanshuliangData"
							:chart-title="['会员数量']"
							:style="{width: '100%', height: '420px'}"
						/>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</div>

		<div class="yichang">
			<div class="header">
				<h3>
					<span></span>异常信息
				</h3>
			</div>
			<div class="table">
				<el-table :data="tableDataList" style="width: 100%">
					<el-table-column prop="companyName" label="时间" align="center"></el-table-column>
					<el-table-column prop="orderNo" label="异常类型" align="center"></el-table-column>
					<el-table-column label="异常信息" prop="fullName" align="center"></el-table-column>
					<el-table-column label="状态" prop="username" align="center"></el-table-column>
					<el-table-column label="操作" prop="member" align="center">
						<template slot-scope="scope">
							<el-button
								@click="see(scope.$index, scope.row)"
								type="primary"
								size="small"
							>查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from "./components/LineChart";
import { sanduangailan} from "@/api/youpinbaobiao";
export default {
	name: "Realtime",
	components: {
		LineChart
	},
	data() {
		return {
			company: "", //公司
			region: "", //地区
			station: "", //加油站
			tabShow: [false, false, false],
			lineChartData: {
				expectedData: [], //非油品
				actualData: [], //油品
				x:[]
			},
			tableData: [],
			tableDataList: [],
			tableData1: [
				{
					title: "汽油销量",
					content: "0"
				},
				{
					title: "柴油销量",
					content: "0"
				}
			],
			activeName: "first",
			oilTop:[],
			goodsTop:[],
			payMoment:'',
			payMonth:'',
			youpinshuliangData: {
				expectedData: [], //非油品
				actualData: [] //油品
			},
			chongzhijineData: {
				expectedData: [], //非油品
				actualData: [] //油品
			},
			huiyuanshuliangData: {
				expectedData: [], //非油品
				actualData: [] //油品
			},
		};
	},
	mounted() {
		this.get();
	},
	methods: {
		get() {
			var data = {
				// startTime : new Date(new Date(new Date().toLocaleDateString()).getTime()), // 当天0点
				// endTime : new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)// 当天23:59
			};
			// StationList(data).then(response => {
			//     console.log(response.data);
			//     this.stationOptions = response.data;
			// });

			sanduangailan(data).then(res=>{
				console.log(res.data)
				this.oilTop=res.data.oilTop;
				this.goodsTop=res.data.goodsTop;
				this.stationTop=res.data.stationTop;
				this.payMoment=res.data.payMoment[0]
				this.payMonth=res.data.payMonth[0]
				this.tableData = res.data.promotions
				this.tableData1[0].content = res.data.salesCount1[0].sales_count || 0
				this.tableData1[1].content = res.data.salesCount2[0].sales_count || 0
				
			})

			var data1 = {
				// startTime:new Date(new Date().getTime() - 24*60*60*1000),
				// endTime:new Date()
			}

			sanduangailan(data1).then(res=>{
				this.lineChartData = {
					expectedData: [], //非油品
					actualData: [],
					x:[]
				};
				for (let i = 0; i < res.data.list1.length; i++) {
					this.lineChartData.actualData.push(res.data.list1[i].income)
					this.lineChartData.x.push(this.dateTime(res.data.list1[i].createTime,'',true))
				}
				for (let i = 0; i < res.data.list2.length; i++) {
					this.lineChartData.expectedData.push(res.data.list2[i].income)
				}
				this.youpinshuliangData = {
					expectedData: [], 
					actualData: [] ,
					x:[]
				};
				for (let i = 0; i < res.data.list1.length; i++) {
					this.youpinshuliangData.actualData.push(res.data.list1[i].salesCount)
					this.youpinshuliangData.x.push(this.dateTime(res.data.list1[i].createTime,'',true))
				}
				for (let i = 0; i < res.data.list2.length; i++) {
					this.youpinshuliangData.expectedData.push(res.data.list2[i].salesCount)
				}
				this.chongzhijineData = {
					expectedData: [],
					x:[]
				};
				for (let i = 0; i < res.data.list.length; i++) {
					this.chongzhijineData.expectedData.push(res.data.list[i].recharge)
					this.chongzhijineData.x.push(this.dateTime(res.data.list[i].createTime,'',true))
				}
				this.huiyuanshuliangData = {
					expectedData: [],
					x:[]
				};
				for (let i = 0; i < res.data.list.length; i++) {
					this.huiyuanshuliangData.expectedData.push(res.data.list[i].members)
					this.huiyuanshuliangData.x.push(this.dateTime(res.data.list[i].createTime,'',true))
				}
			})
			
		},
		dateTime(value,division,time) {
		  if(value){
			  division = division || '-';
			  var datetime = new Date(value);
			  function g(val){
				  val < 10 && (val = '0' + val)
				  return val;
			  }
			  return !time ? datetime.getFullYear() + division + g((datetime.getMonth()+1)) + division + g(datetime.getDate()) :
			  g(datetime.getHours()) + ':' + g(datetime.getMinutes())
			   // + ':' + g(datetime.getSeconds())
		  }
		},
		//选项卡切换的钩子
		handleClick(tab, event) {
			this.tabShow[tab.index] = true;
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
	// padding: 20px 40px;
	background-color: #f6f7fb;
}
.warp > div {
	box-shadow: 0px 2px 2px #ccc;
}
.hezi {
	display: flex;
}
.zuo {
	width: 22%;
	height: 160px;
	min-width: 260px;
}
.top .box:nth-of-type(2) {
	margin-left: 30px;
}
.zuo .items {
	padding: 36px 0;
	text-align: center;
	background-color: #fff;
}
.zuo .items span {
	color: #333;
}
.you {
	width: 76%;
	margin-left: 2%;
}
.top {
	min-width: 870px;
	height: 80px;
	margin: 0 auto;
	background-color: #fff;
	padding-left: 40px;
	line-height: 80px;
	font-size: 20px;
	margin-bottom: 20px;
	box-sizing: border-box;
}
.top {
	padding: 0 10px;
	display: flex;
}
.top input {
	width: 15%;
	height: 35px;
	border: 1px solid #ededed;
	border-radius: 5px;
	margin-left: 1%;
	margin-right: 5%;
}
.top select {
	width: 15%;
	height: 35px;
	border-radius: 5px;
	margin-left: 1%;
	margin-right: 5%;
}
.capital {
	min-width: 870px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.capital .el-row {
	width: 101%;
	height: 120px;
}
.capital .el-row .grid-content {
	display: flex;
	justify-content: space-between;
	padding: 30px 15%;
}

.capital .el-row .bg-purple-light {
	padding: 30px 12%;
}
.capital .grid-content {
	text-align: center;
	background-color: #fff;
	padding: 35px 20px;
}
.capital .left {
	width: 328px;
	height: 120px;
	background-color: #fff;
	padding: 35px 20px;
}
.capital .right {
	width: 533px;
	height: 120px;
	background-color: #fff;
	padding: 35px 60px;
}
h3 {
	margin: 0;
	margin-bottom: 8px;
	// font-size: 27px;
	color: #333338;
}

.xiaoshou,
.chongzhi,
.chendian,
.zongshu,
.leiji {
	display: inline-block;
	vertical-align: top;
}
.capital span:nth-of-type(1) {
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: #307aff;
}
.chongzhi span:nth-of-type(1) {
	background-color: #f88abf;
}
.chendian span:nth-of-type(1) {
	background-color: #cb91de;
}
.zongshu span:nth-of-type(1) {
	background-color: #f8c51c;
}
.leiji span:nth-of-type(1) {
	background-color: #fe8533;
}
.capital span {
	vertical-align: middle;
	font-size: 12px;
	color: #acb0c6;
}
.shu {
	display: inline-block;
	width: 2px;
	height: 90px;
	background-color: #ededed;
	margin: 0 10px;
}
.right .shu {
	margin: 0px 18px;
}
.income {
	width: 100%;
	height: 130px;
	margin: 0 auto;
	background-color: #fff;
	text-align: center;
	display: flex;
	justify-content: space-between;
	padding: 27px 10%;
}

.zfb {
	display: inline-block;
	vertical-align: middle;
}
.income .shu {
	vertical-align: middle;
	margin: 0 0.5%;
}
.items img {
	vertical-align: top;
	width: 46px;
}
.income img {
	vertical-align: top;
	width: 36px;
}
.items p {
	margin: 5px 0;
	font-size: 12px;
	text-align: left;
}
.items p:nth-of-type(1) {
	color: #b7bac3;
}
.zfb h3 {
	font-size: 27px;
}
.zfb span {
	font-size: 12px;
	color: #acb0c6;
}
.zfb span:nth-of-type(1) {
	margin-right: 1px;
}
.topbang {
	display: flex;
	justify-content: space-between;
	min-width: 870px;
	margin: 20px auto;
	padding: 20px;
	background-color: #fff;
}
.title {
	display: flex;
	align-items: center;
	background-color: #eaf1ff;
	height: 60px;
	padding-left: 20px;
}
.title span {
	display: inline-block;
	width: 4px;
	height: 25px;
	background-color: #2d7aff;
	vertical-align: middle;
	margin-right: 10px;
}
.title h3 {
	font-size: 23px;
	color: #535c73;
	display: inline-block;
	line-height: 60px;
	vertical-align: middle;
	margin: 0;
}
.shangpin,
.youpin,
.shanghu {
	width: 490px;
	border: 1px solid #ededed;
}
.topbang ul {
	padding: 15px 40px 0 20px;
}
.topbang ul li {
	list-style: none;
	margin-bottom: 22px;
}
.topbang ul li span {
	color: #535c73;
	font-size: 15px;
	vertical-align: middle;
}
.topbang ul li span:nth-of-type(1) {
	display: inline-block;
	width: 20px;
	height: 26px;
	text-align: center;
	line-height: 26px;
	color: #acb0c6;
	font-size: 18px;
	margin-right: 20px;
}
.topbang ul li:nth-of-type(1) span {
	color: #2f7aff;
	font-weight: 800;
}
.topbang ul li:nth-of-type(1) span:nth-of-type(1) {
	background-image: url(../../images/yi.gif);
}
.topbang ul li:nth-of-type(2) span:nth-of-type(1) {
	background-image: url(../../images/er.gif);
}
.topbang ul li:nth-of-type(3) span:nth-of-type(1) {
	background-image: url(../../images/san.gif);
}
.topbang ul li span:nth-of-type(3) {
	float: right;
	margin-top: 5px;
}
.bg-purple,
.bg-purple-light {
	background-color: #fff;
	padding: 10px;
}
.h {
	height: 225px;
}
.table {
	border: 1px solid #ededed;
}
.table p span {
	float: right;
}
.shang {
	border: 1px solid #ededed;
	text-align: center;
	padding: 10px;
}

.header {
	background-color: #fff;
	height: 60px;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #f6f7fb;
	position: relative;
}
.header h3 {
	display: inline-block;
	width: 300px;
	line-height: 60px;
	margin: 0;
	font-size: 18px;
}
.header h3 span {
	display: inline-block;
	width: 4px;
	height: 25px;
	vertical-align: middle;
	background-color: #5b8dff;
	margin-right: 10px;
}
</style>
