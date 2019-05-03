<template>
  <div class="app-container order-wei">
    <el-form label-position="left" label-width="120px" class="shangForm">
      <div class="top upzs qufenx">

        <router-link to="dispatch-order">
          <i class="el-icon-arrow-left"/>
        </router-link>
        <el-form-item label="油品采购订单" label-width="170px"/>
      </div>
      <div class="danhao">
      	<el-form-item label="订单号：" label-width="70px">
       	  {{con.orderNumber}}
        </el-form-item>
        <el-form-item label="订单状态：" label-width="90px">
        	<span v-if="con.status==1">待审批</span>
			<span v-if="con.status==5">配送中</span>
			<span v-if="con.status==6">已完成</span>
        </el-form-item>
      </div>
      <div class="xinxi">
      	<el-form-item label="订单申请信息：" label-width="110px" class="tou"></el-form-item>
      	<div class="biao">
      		<ul>
      			<div class="beijing">
      				<li>加油站: {{con.oilsStationName}}</li>
      				<li>所属公司: {{con.companyName}}</li>
      			</div>
						 <div class="beijing">
      				<li>
      					<el-form-item label="油库：" label-width="82px" class="pinhao">
				          <el-select v-model="temp.supplierId" clearable style="width:200px;" class="filter-item">
				            <el-option v-for="item in youkuxinxi" :key="item.supplierId" :label="item.supplierName" :value="item.supplierId"/>
				          </el-select>
			       		</el-form-item>
      				</li>
      			</div>
      			<div>
      				<li>油品品类: {{con.oilsName}}</li>
	      			<li>
	      				<el-form-item label="油品规格：" label-width="82px" class="pinhao">
				          <el-select v-model="temp.oilsSpecId" clearable style="width:200px;" class="filter-item">
				            <el-option v-for="item in ypinhao" :key="item.oilsSpecId"  :label="item.specName" :value="item.oilsSpecId"/>
				          </el-select>
			       		</el-form-item>
	      			</li>
      			</div>
      			
		        <div class="beijing">
      				<li>申请数量: {{con.purchaseAmount}}吨</li>
      				<li>申请到达时间: {{con.planArriveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</li>
      			</div>
      		</ul>
      	</div>
      </div>
      <div class="xinxi">
      	<el-form-item label="油品出库信息：" label-width="110px" class="tou"></el-form-item>
      	<div class="biao">
      		<ul>
      			<div class="beijing">
      				<li>
      					<el-form-item label="出库单号：" label-width="82px" class="pinhao">
      						<el-input v-model="temp.oilsPurchaseOutput.outOrderNum" style="width:200px;"  placeholder="请输入内容"
								maxlength="32"/>
      					</el-form-item>
      				</li>
      				<li>
      					<el-form-item label="出库重量：" label-width="82px" class="pinhao">
      						<el-input v-model="temp.oilsPurchaseOutput.primaryWeight" style="width:200px;"  placeholder="请输入内容" @input="huansuan"
								maxlength="20"/> 吨
      					</el-form-item>
      				</li>
      				
      			</div>
      			<div>
      				<li>
      					<el-form-item label="出库密度：" label-width="82px" class="pinhao">
      						<el-input v-model="temp.oilsPurchaseOutput.primaryDensity" style="width:200px;" min='601.6' max="1163.5" placeholder="请输入内容" @input="huansuan(temp.oilsPurchaseOutput.primaryDensity)"
								maxlength="6"/> kg/m³
      					</el-form-item>
      				</li>
      				<li>出库升数: {{zhuanshengshu}} 升</li>
      			</div>
      			
		       
      		</ul>
      	</div>
      </div>
      
      <div class="xinxi">
      	<el-form-item label="油品运输信息：" label-width="110px" class="tou"></el-form-item>
      	<div class="biao">
      		<ul>
      			<div class="beijing">
      				<li>
      					<el-form-item label="承运商：" label-width="82px" class="pinhao">
				          <el-select v-model="temp.oilsPurchaseTransport.forwardingAgentsId" clearable @change='kehuziti' style="width:200px;" class="filter-item">
				            <el-option v-for="item in chengyun" :key="item.id" :label="item.name" :value="item.id"/>
				          </el-select>
			       		</el-form-item>
      				</li>
      				<li>运距: {{temp.oilsPurchaseTransport.haulDistance}} KM</li>
      			</div>
      			<div>
      				<li v-if='kehu'>
      					<el-form-item label="车牌号：" label-width="82px" class="pinhao">
      						<el-input v-model="temp.oilsPurchaseTransport.carNo" style="width:200px;" placeholder="请输入内容"
								maxlength="20"/>
      					</el-form-item>
      				</li>
      				<li v-if='kehu'>
      					<el-form-item label="司机姓名：" label-width="138px" class="pinhao">
      						<el-input v-model="temp.oilsPurchaseTransport.driverName" style="width:230px;" placeholder="请输入内容"
								maxlength="20"/>
      					</el-form-item>
      				</li>
      			</div>
      			
		        <div class="beijing">
      				<li v-if='kehu'>
      					<el-form-item label="司机电话：" label-width="82px" class="pinhao">
      						<el-input v-model="temp.oilsPurchaseTransport.driverPhone"  style="width:200px;" placeholder="请输入内容"
								maxlength="20"/>
      					</el-form-item>
      				</li>
      				<li v-if='kehu'>
      					<el-form-item label="计划最早到达时间：" label-width="138px" class="pinhao">
	      					<el-date-picker
							      v-model="temp.oilsPurchaseTransport.planEarliestTime"
							      type="datetime"
							      placeholder="选择日期时间"
							      style="width:230px;"
							      >
							    </el-date-picker>
						    </el-form-item>
      				</li>
      			</div>
      			
      			<div>
      				<li v-if='kehu'>
      					<el-form-item label="罐车仓号：" label-width="82px" class="pinhao">
      						<el-select v-model="temp.oilsPurchaseTransport.tankTruckNo" clearable style="width:200px;" class="filter-item">
				            <el-option v-for="item in guanche" :key="item.id" :value="item.id"/>
				          </el-select>
      					</el-form-item>
      				</li>
      				<li v-if='kehu'>
      					<el-form-item label="计划最晚到达时间：" label-width="138px" class="pinhao">
	      					<el-date-picker
							  v-model="temp.oilsPurchaseTransport.planLatestTime"
							  type="datetime"
							  placeholder="选择日期时间"
							  style="width:230px;"
							  >
							</el-date-picker>
						</el-form-item>
      				</li>
      			</div>
      		</ul>
      	</div>
      </div>
      
      <div class="footerss" style="text-align: center;padding: 30px 0;">
      	<el-button type="primary" @click="tuihui" v-if="con.status==1">订单退回</el-button>
      	<el-button type="primary" @click="qrchuku" v-if="con.status==1">确认出库</el-button>
      	<el-button type="primary" @click="xiugaiDing" v-if="con.status==5">修改</el-button>
	      <router-link to="dispatch-order" style="margin-left: 10px;">
	      	<el-button type="primary">
		          	关闭
	      	</el-button>
	      </router-link>
      </div>
    </el-form>
		
		
		
  </div>
</template>

<script>
import { transport } from '@/api/diaodu'
import { getOilSupplierAndOilsListByStation,oilJiChuku,oilDingXiu,oilDingXiuGai } from '@/api/shuju'

import { parseTime } from '@/utils'

export default {

  components: {  },
  data() {
    return {
			kehu:true,
	  	idid:'',
	  	value1:'',
	  	orderLists:[],
	  	zhuanshengshu:'',
	  	temp:{
	  		id:'',
	  		oilsSpecId:'',//油品规格id
	  		supplierId:'',//油库id
	  		applyOil:'',//油品id
	  		oilsPrice:'',//油品进价
	  		oilsPurchaseOutput:{
	  			outOrderNum:'',//出库单号
	  			primaryWeight:'',//重量
	  			primaryDensity:'',//密度
	  		},
	  		oilsPurchaseTransport:{
	  			forwardingAgentsId:'',//承运商
	  			haulDistance:'',//运距
	  			carNo:'',//车牌号
	  			driverName:'',//司机名
	  			driverPhone:'',//司机电话
	  			planEarliestTime:'',//计划最早
	  			planLatestTime:'',//计划最晚
	  			tankTruckNo:''//罐车仓号
	  		},
	  		applyResult:null,//1确认 -1退回 操作
	  		remark:'',//退回原因
	  	},
	  	con:{},
	  	con2:{},
	  	chengyun:[{
	  		id:"402881f068506a650168506a65920001",
	  		name:'三统石油'
	  	},{
	  		id:"402881f068506a650168506a65920002",
	  		name:'客户自提'
	  	}],
	  	youkuxinxi:[],
	  	ypinhao:[],
	  	guanche:[{
	  		id:1
	  	},{
	  		id:2
	  	}],
	  	
	  	//----------------------------------------------可以编辑的
	
    }
  },
  created() {
  	this.idid=this.$route.query.id;
		this.temp.id=this.idid;
		console.log(this.temp)
  	this.get();
  },
  methods: {
	    get(){
	     	let data={
	     		id:this.idid
	     	}
	     	transport(data).then(res=>{
	     		console.log(res)
	     		this.con=res.data.oilsPurchaseApplyInfo;
	     		this.temp.applyOil=this.con.applyOil;
	     		this.con2=res.data.oilsPurchaseApplySupplierInfo;
	     		this.temp.supplierId=res.data.oilsPurchaseApplySupplierInfo.supplierId;
	     		this.getYouku();
	     		this.kehuziti();
	     		this.huansuan();
	     	})
			},
			kehuziti(){
				 		 		if(this.temp.oilsPurchaseTransport.forwardingAgentsId=='402881f068506a650168506a65920002'){
												this.kehu=false
									}else{
										   this.kehu=true
									}
						 console.log(this.temp.oilsPurchaseTransport.forwardingAgentsId)
			},
	    getYouku(){
	    	let data={
	    		id:this.idid
	    	}
	     	getOilSupplierAndOilsListByStation(data).then(res=>{
	     		console.log(res)
					this.youkuxinxi=res.data.supplierList;
					this.youkuxinxi.forEach((item)=>{
						if(this.temp.supplierId==item.supplierId){
							this.temp.oilsPurchaseTransport.haulDistance=item.haulDistance;
							this.ypinhao=item.supplierOilsMaintainList;
							this.temp.oilsSpecId=this.con2.oilsSpecId;
							item.supplierOilsMaintainList.forEach((v)=>{
								if(this.temp.oilsSpecId==v.oilsSpecId){
									this.temp.oilsPrice=v.purchasingPrice;
								}
							})
						}
					})
					
					this.xiugaide();
					this.kehuziti();
					this.huansuan();
			 	})
	    },
	    qrchuku(){
	    	this.temp.applyResult=1;
				console.log(this.temp)
				if( this.temp.oilsPurchaseOutput.outOrderNum==''||this.temp.oilsPurchaseOutput.primaryWeight==''|| this.temp.oilsPurchaseOutput.primaryDensity==''){
						this.$notify({
							title: '错误',
							message: '内容不能为空',
					});
				}else{
						oilJiChuku(this.temp).then(res=>{
					if(res){
							this.$notify({
							title: '成功',
							message: '执行成功',
							type: 'success',
							duration: 1000
					});
					window.history.go(-1)
					}
	    		
	    	})
				}
	    	
	    	
	    },
	    huansuan(value){
	    	if(this.temp.oilsPurchaseOutput.primaryDensity!=""&&this.temp.oilsPurchaseOutput.primaryWeight!=""){
	    		this.zhuanshengshu=(this.temp.oilsPurchaseOutput.primaryWeight/(this.temp.oilsPurchaseOutput.primaryDensity-0-1.1))*1000000;
	    		this.zhuanshengshu=Number(this.zhuanshengshu.toString().match(/^\d+(?:\.\d{0,2})?/))
				}
				if(value>1163.5||value<601.6){
					this.$message({
            type: 'warning',
            message: '输入范围为：601.6—1163.5'
          });
				}
	    },
	    tuihui(){  	
	    	this.$prompt('请输入退回原因', '提示', {
          confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
          inputErrorMessage: "请输入原因"
        }).then(({ value }) => {
          let data={
		    		id:this.temp.id,
		    		remark:value,
						applyResult:-1,
						remark:value
		    	}
		    	oilJiChuku(data).then(res=>{
		    		this.$notify({
		          title: '成功',
		          message: '执行成功',
		          type: 'success',
		          duration: 1000
		        });
		        this.$router.push({
		            path: 'dispatch-order', 
		            name: 'dispatchorderDemo'
		        })
		    	})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
	    },
	    
	    
	    
	   	xiugaide(){
	   		console.log("--------------------------------------")
	   		if(this.con.status==5){
	   			let data={
		   			id:this.idid
		   		}
		   		oilDingXiu(data).then(res=>{
		   			console.log(res)
		   			this.con=res.data.oilsPurchaseApplyInfo;
	     			this.temp.applyOil=this.con.applyOil;
	     			this.con2=res.data.oilsPurchaseApplySupplierInfo;
	     			this.temp.supplierId=res.data.oilsPurchaseApplySupplierInfo.supplierId;
	     			this.temp.oilsPurchaseOutput=res.data.oilsPurchaseOutputInfo;
	     			this.temp.oilsPurchaseTransport=res.data.oilsPurchaseTransportInfo;

	     			this.kehuziti();
	     			this.huansuan();
		   		})
	   		}
	   	},
	   	
	   	
	   	xiugaiDing(){
	   		console.log(this.temp)
	   		this.temp.oilsPurchaseOutput.createTime=new Date(dateH(this.temp.oilsPurchaseOutput.createTime));
	   		this.temp.oilsPurchaseTransport.planEarliestTime=new Date(dateH(this.temp.oilsPurchaseTransport.planEarliestTime));
	   		this.temp.oilsPurchaseTransport.planLatestTime=new Date(dateH(this.temp.oilsPurchaseTransport.planLatestTime));
	   		this.temp.oilsPurchaseTransport.createTime=new Date(dateH(this.temp.oilsPurchaseTransport.createTime));
	   		if(this.temp.oilsPurchaseTransport.modifyTime){
	   			this.temp.oilsPurchaseTransport.modifyTime=new Date(dateH(this.temp.oilsPurchaseTransport.modifyTime));
	   		}
	   		if(this.temp.oilsPurchaseOutput.modifyTime){
	   			this.temp.oilsPurchaseOutput.modifyTime=new Date(dateH(this.temp.oilsPurchaseOutput.modifyTime));
	   		}
	   		oilDingXiuGai(this.temp).then(res=>{
	   			this.$notify({
	          title: '成功',
	          message: '执行成功',
	          type: 'success',
	          duration: 1000
					});
					window.history.go(-1)
	   		})
	   	},
  }
}
</script>

<style scoped>
	@import url("./order-wei.scss");

</style>
