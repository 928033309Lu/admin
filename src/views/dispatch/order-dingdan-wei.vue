<template>
  <div class="app-container oil-purchase-ord-get">
    <el-form label-position="left" label-width="70px" class="shangForm">
      <div class="top upzs">
        <i class="el-icon-arrow-left" @click="fanhuishang"/>
        <el-form-item label="收油详情" label-width="170px"/>
      </div>
      <div class="mian_ord">
      	<div class="shang">
      		<el-form-item label="所属营业日：" label-width="110px" style="margin-right: 100px;">
	          {{zhuxinxi.businessDay | parseTime('{y}-{m}-{d}')}}
	        </el-form-item>
	        <el-form-item label="所属班次：" label-width="95px" style="margin-right: 100px;">
	          	{{zhuxinxi.shiftId}}
	        </el-form-item>
	        <el-form-item label="订单审核时间：" label-width="130px">
	          	{{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
	        </el-form-item>
      	</div>
      	<div class="xinxi">
      		<ul class="dade">
      			<li>
      				<div class="title" > <span class="span"></span>油品单信息</div>
      				<div class="neirong">
      					<ul class="limiande">
      						<li><div>油品 : <span>{{youguige.oilsSpecName}}</span></div><div>出库密度 : <span>{{zhuxinxi.primaryDensity}}kg/m³</span></div></li>
      						<li><div>油仓号 : <span>{{zhuxinxi.billType}}</span></div><div>出库重量 : <span>{{zhuxinxi.primaryWeight}}kg</span></div></li>
      						<li><div>采购单号 : <span>{{youchuku.orderNumber}}</span></div><div>出库体积 : <span>{{youchuku.switchLitre}}升</span></div></li>
      					</ul>
      				</div>
      			</li>
      			
      			<li>
      				<div class="title"><span class="span"></span>罐车测量信息</div>
      				<div class="neirong">
      					<ul class="limiande">
      						<li><div>实测温度 : <span>{{guanchexinxi.measuringTemperature}}℃</span></div><div>实测密度 : <span>{{guanchexinxi.measuringDensity}}kg/m³</span></div></li>
      						<li><div>实测标密度 : <span>{{guanchexinxi.standardDensity}}kg/m³</span></div>
									<div>
												是否有水 :
												<span v-if="guanchexinxi.isHaveWater==0">否</span>
												<span v-if="guanchexinxi.isHaveWater==1">是</span>
									</div>
									</li>
      					</ul>
      				</div>
      			</li>
      		</ul>
      		<div class="guan" v-for="item in tableData3">
      			<div class="title">
      				<div><span class="span"></span>实收信息</div>
	      			<div>开始时间：{{item[0]["kaishi"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
	      			<div>结束时间：{{item[0]["jieshu"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
      			</div>
      			<el-table :data="item" style="width: 100%" :span-method="arraySpanMethod">
    					<el-table-column prop="date" :label="item[0]['guanhao']" min-width="150" align="center"></el-table-column>
    					<el-table-column label="液位仪" align="center">
								<el-table-column prop="yougao" label="油高mm" min-width="120" align="center"></el-table-column>
								<el-table-column prop="shuigao" label="水高mm" min-width="120" align="center"></el-table-column>
								<el-table-column prop="wendu" label="温度℃" min-width="120" align="center"></el-table-column>
								<el-table-column prop="midu" label="密度kg/m³" min-width="120" align="center"></el-table-column>
								<el-table-column prop="youtiji" label="油体积L" min-width="120" align="center"></el-table-column>
								<el-table-column label="手工" align="center">
		    						<el-table-column prop="bztiji" label="标准体积L" align="center"></el-table-column>
		    					</el-table-column>
							</el-table-column>
    					<el-table-column prop="bztijiL" label="标准体积L" width="150" align="center"></el-table-column>
    					<el-table-column prop="zhongliang" label="重量kg" width="150" align="center"></el-table-column>
							
    				</el-table>
      		</div> 		
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
    	zhuxinxi:{},
	    youchuku:{},
	    youyunshu:{},
	    youshouyou:{},
	    youguige:{},
	    youbuzhou:[],
	    guanchexinxi:{},
	    
  		tableData3:[],
      idid:'',
    }
  },
  created() {
  	this.idid=this.$route.query.id;
	  this.getList();
  },
  methods: {
     	
      getList() {
      	let data={
      		id:this.idid
      	}
      	oilDingXiu(data).then(res=>{
		  		console.log(res)
		  		this.zhuxinxi=res.data.oilsPurchaseApplyInfo;
		  		this.youbuzhou=res.data.oilsOrderLogInfoList;
		  		if(res.data.oilsPurchaseApplyInfo.status==5||res.data.oilsPurchaseApplyInfo.status==6){
		  			this.youchuku=res.data.oilsPurchaseOutputInfo;
			  		this.youyunshu=res.data.oilsPurchaseTransportInfo;
			  		this.youguige=res.data.oilsPurchaseApplySupplierInfo;
		  		}
		  		
		  		if(res.data.oilsPurchaseApplyInfo.status==6){
		  			this.guanchexinxi=res.data.oilCarMeasureInfo;
		  			this.youshouyou=res.data.oilsOrderRecordInfo;
		  			this.youguanshuju=res.data.oilsFlowInfos;
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
	    
	    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
	    	
        if (rowIndex === 2) {
        	
          if (columnIndex === 1) {
            return [1, 2];
          } else if (columnIndex === 2) {
            return [0, 0];
          }
          
          if (columnIndex === 4) {
            return [1, 2];
          } else if (columnIndex === 5) {
            return [0, 0];
          }
          
          if (columnIndex === 7) {
            return [1, 2];
          } else if (columnIndex === 8) {
            return [0, 0];
          }
          
        }
        
      },
      
      fanhuishang(){
	    	window.history.go(-1)
	    }
  }
}
</script>

<style scoped>
	@import url("../oil-business/oil-purchase-ord-get.scss");

</style>
