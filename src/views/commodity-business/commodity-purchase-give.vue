<template>
  <div class="app-container commodity-purchase-give">
	<el-form label-position="left" label-width="120px">
		<div class="top qufenx">
	        <i @click="prev" class="el-icon-arrow-left"/>
	        <el-form-item label="商品采购-收货" label-width="170px"/>
	        <el-button type="primary" class="dayin">打印</el-button>
     	</div>
     	<div class="dingdan">
     		<div class="dade">
	 				<el-form-item label="采购单号 :" label-width="80px">
	 					{{shuju.goodsPurchaseApplyInfo.orderNumber}}
	        </el-form-item>
	        <el-form-item label="订单申请时间 :" label-width="110px">
	        	<span v-if="shuju.goodsPurchaseApplyInfo.createTime">{{shuju.goodsPurchaseApplyInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
		        <span v-else></span>
	        </el-form-item>
     		</div>
     		<ul class="zidan">
     			<li class="item" v-for="(item,index) in shuju.goodsList">
     				<div class="xinxi">
     					<div class="liuge">
     							<el-form-item label="供应商 :" label-width="80px">
     								{{item[0].supplierShortName}}
					        </el-form-item>
					        <el-form-item label="状态 :" label-width="60px" v-if="item[0].status==1" >
					        	待审批
					        </el-form-item>
					        <el-form-item label="状态 :" label-width="60px" v-if="item[0].status==2" >
					        	待收货
					        </el-form-item>
					        <el-form-item label="状态 :" label-width="60px" v-else-if="item[0].status==3">
					        	已完成
					        </el-form-item>
					        <el-form-item label="状态 :" label-width="60px" v-else-if="item[0].status==-1">
					        	已作废
					        </el-form-item>
					        <el-form-item label="状态 :" label-width="60px" v-else-if="item[0].status==-2">
					        	已作废
					        </el-form-item>
					        <el-form-item label="状态 :" label-width="60px" v-else-if="item[0].status==-3">
					        	已作废
					        </el-form-item>
					        <el-form-item label="采购子订单号 :" label-width="120px">
					        	<div style="width:200px">
					        		{{item[0].orderNumber}}
					        	</div>
					        </el-form-item>
					        <el-form-item label="营业日 :" label-width="110px">
								<span v-if="shuju.goodsPurchaseApplyInfo.businessDay">{{shuju.goodsPurchaseApplyInfo.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
								<span v-else></span>
					        </el-form-item>
					        <el-form-item label="班次 :" label-width="60px">
								{{shuju.goodsPurchaseApplyInfo.shiftId }}
					        </el-form-item>
					        <el-form-item label="收货时间 :" label-width="110px" v-if="item[0].status==2">
					        </el-form-item>
					        <el-form-item label="收货时间 :" label-width="110px" v-else-if="item[0].status==3">
					        	<span v-if="item[0].auditTime">{{item[0].receiveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
		        				<span v-else></span>
					        </el-form-item>
					        <el-form-item label="收货时间 :" label-width="110px" v-else>
					        </el-form-item>
     					</div>
     					<el-button type="primary" class="queren" v-if="item[0].status == 2" @click="querenshouhuo(index)">确认收货</el-button>
     					<el-button type="primary" class="queren" v-if="item[0].status == 1" :disabled="item[0].status == 1" @click="querenshouhuo(index)">确认收货</el-button>
     				</div>
     				<el-table :data="arr[index]" fit ref="moviesTable">
				        <el-table-column label="序号" min-width="100" align="center" >
				          <template slot-scope="scope">
				            <span v-if="arr[index].length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
				          </template>
				        </el-table-column>
				        <el-table-column label="商品条码" min-width="130" align="center"  >
				          <template slot-scope="scope">
				            <!--<el-select v-model="scope.row.goodsBarCode" class="filter-item" @change="xuanzele(scope.row,scope,index)">
					            <el-option v-for="item in scope.row.goodsBarCodeList" :key="item" :value="item"/>
					          </el-select>-->
					          <div v-if="arr[index].length !== scope.$index+1">
			          	        <el-select   filterable allow-create default-first-option  clearable
			          						v-if="item[0].status==2"
			          					  v-model="scope.row.goodsBarCode"    @change="xuanzele(scope.row,scope,index)">
			          						<el-option v-for="item in scope.row.goodsBarCodeList"  :key="item" :label="item" :value="item">
			          							<!-- {{scope.row.lastBuyGoodsbar}} -->
			          						</el-option>
			          					</el-select>
			          					<span   v-if="item[0].status==3 " :label="item"  >{{scope.row.goodsBarCodeList[index]}}</span>
			          					<span   v-if="item[0].status==1 " :label="item"  >-</span>
					          </div>
					        
				          </template>
									
				        </el-table-column>
				        <el-table-column label="商品名称" min-width="100" align="center" >
				          <template slot-scope="scope">
				            <span>{{scope.row.goodsName}}</span>
				          </template>
				        </el-table-column>
				        <el-table-column label="订单数量" min-width="100" align="center" >
				          <template slot-scope="scope">
				            <span >{{scope.row.orderCount}}</span>
				          </template>
				        </el-table-column>
				        <el-table-column label="收货数量" min-width="100" align="center" >
				        	
				          <template slot-scope="scope">
				            <div v-if="arr[index].length !== scope.$index+1">
	            	            <span v-if="item[0].status==2"><el-input type="number" @change="shouHuoSum" v-model="scope.row.receiveGoodsNum" style="width:80px;"/></span>
	            	            <span v-if=" item[0].status==1"><el-input type="number" :disabled="true" v-model="scope.row.receiveGoodsNum" style="width:80px;"/></span>

	            							<span v-if="item[0].status==3" >{{scope.row.receiveGoodsNum}}</span>
				            </div>
				            <div v-else>{{scope.row.receiveGoodsNum}}</div>
				          </template>
								 
				        </el-table-column>
				        <el-table-column label="单位" min-width="100" align="center" >
				          <template slot-scope="scope">
				            <span>{{scope.row.unit}}</span>
				          </template>
				        </el-table-column>
				        <el-table-column label="生产日期" min-width="150" align="center">
				          <template slot-scope="scope" style="width: 200px;" v-if="arr[index].length !== scope.$index+1">
 								<el-date-picker
										  v-if="item[0].status==2"
								      v-model="scope.row.receProductionDate"
								      type="date"		
								      placeholder="选择日期"
											clearable
								      @change="shijian(scope.row,scope,index)"
								      @blur="shijian(scope.row,scope,index)"
								      :picker-options="pickerOptions0"
								      >
								    </el-date-picker>
											<!-- <span v-if="item[0].status==3">{{scope.row.productionDate==""?new Date(scope.row.productionDate).getFullYear() + '-' + (new Date(scope.row.productionDate).getMonth() + 1) + '-' + new Date(scope.row.productionDate).getDate() + ' ' + new Date(scope.row.productionDate).getHours() + ':' + new Date(scope.row.productionDate).getMinutes() + ':' + new Date(scope.row.productionDate).getSeconds(): "无数据"}}</span> -->
											<span v-if="item[0].status==3">{{scope.row.productionDate | parseTime('{y}-{m}-{d} ')}}</span>
											<span v-if="item[0].status==1">-</span>

 				          </template>
				        </el-table-column>
							
				    </el-table>
				    <!-- <div class="heji">合计 :</div> -->
     			</li>
     		</ul>
     	</div>
	</el-form>
  </div>
</template>

<script>
import { orderShenShen } from '@/api/shangpin'
import { orderShouhuo } from '@/api/shuju'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
			goodsBar:'',
			val:'',
	  	list: null,
			total: 0,
	    msg:{
	    	id:''
	    },
	    arr:[
				
			],
			row:'',
	    shuju:{
	    	goodsList: [],
			goodsPurchaseApplyInfo:{
				blocAuditTime: '',
				blocAuditor: '',
				blocRemark: '',
				companyId: '',
				createTime: '',
				creater: '',
				haveSupplier: '',
				id: '',
				oilsStationShortName: '',
				orderNumber: '',
				orderType: '',
				stationId: '',
				status: ''
			},
			last:''
	    },
      form: {
        name: ''
      },
      pickerOptions0: {
	      disabledDate(time) {
	        return time.getTime() > Date.now() - 8.64e6
	      }
	    },
    }
  },
  created() {
			this.getList()
			console.log(this.val)
	},
	 
  methods: {
  		prev() {
  			this.$router.go(-1);
  		},
      	getList() {
      		let idid = this.$route.query.id;
      		this.msg.id = idid
      		// console.log(idid);
      		orderShenShen(this.msg).then(res=>{
      			console.log(res)
      			this.shuju=res.data;
      			this.shouHuoSum();
      			res.data.goodsList.forEach((item)=>{
      				item.forEach((items)=>{
						if(items.lastBuyGoodsbar){
							items.goodsBarCode = items.lastBuyGoodsbar
						}
						console.log(items)
      					// items["goodsBarCode"]=null;
      					items["receiveGoodsNum"]=items.orderCount;
						items["receProductionDate"]='';
      				})
      			})
      			this.arr=res.data.goodsList
      			console.log(this.arr)
      		})
	    },
	    shouHuoSum(){
  			this.shuju.goodsList.forEach((item)=>{
  				let sum = 0;
  				let sum1 = 0;

  				item.forEach((item1,index)=>{
  					if(item1.lastName){
  					    item.splice(index,1)
  					}else{
  					    sum += Number(item1.orderCount);
  					    sum1 += Number(item1.receiveGoodsNum);
  					}
  				    
  				})
  				item.push({
  				    lastName:'合计',
  				    orderCount:sum,
  				    receiveGoodsNum:sum1,
  				})
  			})
	    },
	    querenshouhuo(index){
	    	// console.log(index)
	    	var receiveGoodsList=[];

	    	let tongguode = [...this.arr[index]]
	    	tongguode.splice(tongguode.length - 1,1)

	    	let isError = false;

	    	tongguode.forEach((item)=>{
				console.log(tongguode)
	    		let list={
    				id:item.id,
					goodsId:item.goodsId,
					goodsType:item.goodsType,
					goodsBarCode:item.goodsBarCode,
					receiveGoodsNum:item.receiveGoodsNum,
					receProductionDate:item.receProductionDate
				}
				if( 
					!item.receiveGoodsNum || 
					item.receiveGoodsNum < 0 || 
					item.receiveGoodsNum > item.orderCount || 
					!item.goodsBarCode || 
					!item.receProductionDate
				){
					isError = true;
				}else{
					receiveGoodsList.push(list);
				}
	    	})

	    	if(isError){
	    		this.$notify({
	    			title: '警告',
	    			message: '请将数据填写完整',
	    			type: 'warning'
	    		});
	    	}else{
		    	let data={
		    		orderId:this.shuju.goodsPurchaseApplyInfo.id,
		    		orderNumber:this.shuju.goodsPurchaseApplyInfo.orderNumber,
		    		receiveGoodsList:receiveGoodsList
		    	}
		    	orderShouhuo(data).then(res=>{
					this.prev()
		    	})
	    	}
	    	
	    },
	    xuanzele(row,rows,index){
				console.log(row)
				
				console.log(rows)
				this.$set(this.shuju.goodsList[index],rows.$index,this.shuju.goodsList[index][rows.$index],this.arr[index][rows.row]);
				console.log(this.arr[index])
				     this.row=row
	
	    },
	    shijian(row,rows,index){
				console.log(row)
				var date=new Date(row.receProductionDate)
						// this.date_value=;
						   
				this.$set(this.shuju.goodsList[index],rows.$index,this.shuju.goodsList[index][rows.$index]);
				console.log(rows)
	    }
	    
  }
}
</script>

<style scoped>
	@import url("./commodity-purchase-give.scss");
</style>
