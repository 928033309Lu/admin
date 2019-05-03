<template>
  <div class="app-container oil-purchase-ord">
    <el-form label-position="left" label-width="70px" class="shangForm">
      <div class="top upzs">
          <i @click="left"  class="el-icon-arrow-left"/>
        <el-form-item label="油品采购订单" label-width="170px"/>
      </div>
      <div class="mian_ord">
      	<div class="shang" style="padding:10px 0;">
      		<el-form-item label="订单号：" label-width="80px"  style="width:50%;">
	          {{zhuxinxi.orderNumber}}
	        </el-form-item>
	        <el-form-item label="订单状态：" label-width="100px" style="margin-left:2%;">
	          	<span v-if="zhuxinxi.status==0">未审批</span>
	          	<span v-if="zhuxinxi.status==1">准备配送</span>
	          	<span v-if="zhuxinxi.status==5">配送中</span>
	          	<span v-if="zhuxinxi.status==6">已完成</span>
	        </el-form-item>
      	</div>
      	<div class="xinxi">
      		<ul class="dade">
      			<li  v-if="zhuxinxi.status>0">
      				<div class="title">订单申请信息</div>
      				<div class="neirong">
      					<ul class="limiande">
      						<li><div>加油站 : <span>{{zhuxinxi.oilsStationName}}</span></div><div>所属公司 : <span>{{zhuxinxi.companyName}}</span></div></li>
      						<li><div>油品品类 : <span>{{zhuxinxi.oilsName}}</span></div><div>油品规格 : <span>{{youguige.oilsSpecName}}</span></div></li>
      						<li><div>申请数量 : <span>{{zhuxinxi.purchaseAmount}}吨</span></div><div>申请到达时间 : <span>{{zhuxinxi.planArriveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div></li>
      					</ul>
      				</div>
      			</li>
      			
      			<li v-if="zhuxinxi.status>=5">
      				<div class="title">油品出库信息</div>
      				<div class="neirong">
      					<ul class="limiande">
      						<li><div>出库单号 : <span>{{youchuku.outOrderNum}}</span></div> <div>出库油库 : <span>{{youchuku.supplierName}}</span></div> </li>
      						<li><div>出库重量 : <span>{{youchuku.primaryWeight}}吨</span></div><div>出库升数 : <span>{{youchuku.switchLitre}}升</span></div></li>
      						<li><div>出库密度 : <span>{{youchuku.primaryDensity}}KG/m³</span></div></li>
      					</ul>
      				</div>
      			</li>
      			
      			<li v-if="zhuxinxi.status>=5">
      				<div class="title">油品运输信息</div>
      				<div class="neirong">
      					<ul class="limiande">
      						<li ><div>承运商 : <span>{{youyunshu.forwardingAgentsName}}</span></div><div>运距 : <span>{{youyunshu.haulDistance}}KM</span></div></li>
      						<li v-if="kehu"><div>司机姓名 : <span>{{youyunshu.driverName}}</span></div><div>车牌号 : <span>{{youyunshu.carNo}}</span></div></li>
      						<li v-if="kehu"><div>司机电话 : <span>{{youyunshu.driverPhone}}</span></div><div>罐车仓号 : <span>{{youyunshu.tankTruckNo}}</span></div></li>
      						<li v-if="kehu"><div>计划最早到达时间 : <span>{{youyunshu.planEarliestTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div><div>计划最晚到达时间 : <span>{{youyunshu.planLatestTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div></li>
      					</ul>
      				</div>
      			</li>
      			
      			<li v-if="zhuxinxi.status==6">
      				<div class="title">油品收油信息<div class="xiangq"  @click="yiwancheng">查看详情</div></div>
      				<div class="neirong">
      					<ul class="limiande">
      						<li><div>营业日 : <span>{{zhuxinxi.businessDay | parseTime('{y}-{m}-{d}')}}</span></div><div>班结编号 : <span>{{zhuxinxi.shiftId}}</span></div></li>
      						<li><div>实收体积 : <span>{{youshouyou.actualVolume}}升</span></div><div>实收数量 : <span>{{youshouyou.actualWeight}}KG</span></div></li>
      						<li><div>溢耗 : <span>{{youshouyou.lossVolume}} (升)</span></div><div>溢耗 : <span>{{youshouyou.lossWeight}} (公斤)</span></div></li>
      						<li><div>收油审核时间 : <span>{{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></div></li>
      					</ul>
      				</div>
      			</li>
      		</ul>
      	</div>
      	<div class="buzhou">
      		<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;padding-bottom: 15px;">订单跟踪：</div>
      		<el-steps direction="vertical" :active="10" space="60px">
				    <el-step v-for="(item,index) in youbuzhou" :key="index" icon="el-icon-success" :title="item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :description="item.remark" ></el-step>
				  </el-steps>
      	</div>
      </div>
      
    </el-form>

  </div>
</template>

<script>
import { oilDingXiu } from '@/api/shuju'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {

  components: { Pagination },
  data() {
    return {
  		idid:'',
  		dingdan:{},
  		chuku:{},
  		yunshu:{},
  		shouyou:{},
  		zhuizong:[],
  		tableData3:[],
  		zhuxinxi:{},
	    youchuku:{},
	    youyunshu:{},
	    youshouyou:{},
	    youguige:{},
	    youbuzhou:[],
			guanchexinxi:{},
			kehu:true
    }
  },
  created() {
		this.idid=this.$route.query.id;
		console.log(this.idid)
		this.getList();
		
  },
  methods: {
      left(){
            window.history.go(-1)
      },
      getList() {
      	let data={
      		id:this.idid
      	}
      	oilDingXiu(data).then(res=>{
		  		console.log(res)
		  		this.zhuxinxi=res.data.oilsPurchaseApplyInfo;
					this.youbuzhou=res.data.oilsOrderLogInfoList; 
					this.youguige=res.data.oilsPurchaseApplySupplierInfo;  //油规格 
		  		if(res.data.oilsPurchaseApplyInfo.status==5||res.data.oilsPurchaseApplyInfo.status==6){
		  			this.youchuku=res.data.oilsPurchaseOutputInfo;        //油出库
			  		this.youyunshu=res.data.oilsPurchaseTransportInfo;     //油运输
						this.youguige=res.data.oilsPurchaseApplySupplierInfo;  //油规格
						if(this.youyunshu.forwardingAgentsName=='客户自提'){
							this.kehu=false
						}else{
							true
						}
		  		}		
		  		if(res.data.oilsPurchaseApplyInfo.status==6){
		  			this.guanchexinxi=res.data.oilCarMeasureInfo;
						this.youshouyou=res.data.oilsOrderRecordInfo;
						this.youguanshuju=res.data.oilsFlowInfos;
						this.youbuzhou=res.data.oilsOrderLogInfoList; 						
			  		console.log(this.youguanshuju)	
						this.tableData3=[];
			  		this.youguanshuju[0].forEach(item=>{
			  			let data=[{
					      date: '卸前数据',
					      guanhao:"",
					      yougao:"",
					      shuigao: "",
								wendu: "",
					      midu: "",
					      youtiji: "",
					      bztiji: "",
					      bztijiL: "",
					      zhongliang: "",
					      kaishi:'',
					    	jieshu:''
					    }, {
					      date: '卸后数据',
					      yougao: "",
					      shuigao:"",
					      wendu: "",
					      midu: "",
					      youtiji: "",
					      bztiji: "",
					      bztijiL: "",
					      zhongliang: ""
					    }, {
					      date: '收油体积',
					      yougao: "",
					      wendu: "收油重量",
					      midu: "",
					      bztiji: "期间加油",
					      bztijiL: ""
					    }]
			  			data[0].guanhao=eval(item.oilcanNo)+"号罐";
			  			data[0].yougao=item.frontOilHigh;
			  			data[0].shuigao=item.frontWaterHigh;
			  			data[0].wendu=item.frontTemperature;
			  			data[0].midu=item.frontDensity;
			  			data[0].youtiji=item.frontOilVolume;
						data[0].bztiji=item.frontManualVolume;
			  			data[0].bztijiL=item.frontStandardVolume;
			  			data[0].zhongliang=item.frontWeight;
						
						data[0].kaishi=item.createTime;
						data[0].jieshu=item.modifyTime;
			  			
			  			data[1].yougao=item.afterOilHigh;
			  			data[1].shuigao=item.afterWaterHigh;
			  			data[1].wendu=item.afterTemperature;
			  			data[1].midu=item.afterDensity;
			  			data[1].youtiji=item.afterOilVolume;
						  data[1].bztiji=item.afterManualVolume;
			  			data[1].bztijiL=item.afterStandardVolume;
			  			data[1].zhongliang=item.afterWeight;
			  			
			  			data[2].yougao=item.actualVolume;
			  			data[2].midu=item.afterWeight;
						  data[2].bztijiL=item.periodOilVolume;	  			
	//		  			tab.push(data)
			  			this.tableData3.push(data);
	//		  			console.log(data[0].guanhao)
			  		})
		  		}
		  		console.log(this.tableData3)
		  	})
	    },
	    
                
                yiwancheng(){	
                    this.$router.push({
                    path: 'oil-dingdan-wei', 
                    name: 'dingdanDetail',
                    query: { 
                        id: this.idid, 
                    }
                })
	    },
	    
  }
}
</script>

<style scoped>
	@import url("../oil-business/oil-purchase-ord.scss");	
</style>
