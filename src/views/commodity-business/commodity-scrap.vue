<template>
  <div class="app-container scrap">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="商品报废"/>
 <el-button type="primary" class="tui_btn" @click="Shenqing=true;returnedCountSumNumber = 0">商品报废申请</el-button>
      </div>
      <div class="items">
        <el-form-item label="报废单号" label-width="90px">
          <el-input v-model="listQuery.orderNumber" style="width:250px" @input="zhuangtaiX"/>
        </el-form-item>
        <el-form-item label="状态" style="margin-right: 20px;margin-left: 20px;" label-width="90px">
          <el-select v-model="status" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in zhuangtai" :key="item.name" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </div>
     

      <el-table :data="list" fit style="width: 100%;">
        <el-table-column label="商品报废单号" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span><!--| parseTime('{y}-{m}-{d} {h}:{i}') -->
          </template>
        </el-table-column>
        <el-table-column label="报废数量" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.returnedCountTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报废申请时间" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报废审核时间" min-width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.merchantAuditTime">{{ scope.row.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">待审批</span>
            <span v-if="scope.row.status==6">已完成</span>
            <span v-if="scope.row.status==-3">已作废</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="baofeiDetail(scope.row.id)">查看</el-button>
            <el-button size="mini" type="danger" @click="chexiao(scope.row.id)" v-if="scope.row.status==0">撤销</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="pages" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-form>
    <!--商品报废申请-->
    <el-dialog :visible.sync="Shenqing" title="商品报废申请" class="shenqing_tab"  @open="reset" width="900px">
      <el-form label-width="120px">
      		<div class="btn_box" style="padding-bottom: 20px;">
      			<el-button type="primary" @click="shangpintj=true">添加商品</el-button>
      			<el-button type="danger" @click="shanchuD()">删除商品</el-button>
      		</div>
					<el-table :data="xuanzeShangpin" style="width: 100%;" @select-all="handleSelectionChange" @select="handleSelectionChange">
						<el-table-column type="selection" min-width="70" align="center" >
						</el-table-column>
		        <el-table-column label="序号" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span v-if="xuanzeShangpin.length !== scope.$index+1">{{scope.$index+1}}</span>
		            <span v-else>{{scope.row.lastName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="150">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="库存" min-width="80" align="center">
		          <template slot-scope="scope">
		            <span>{{scope.row.repertory}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="报废数量" align="center" min-width="120">
		          <template slot-scope="scope">
		            <span v-if="xuanzeShangpin.length !== scope.$index+1"><el-input @change="returnedCountSum" type="number" v-model="scope.row.returnedCount" style="width:80px;"/></span>
					<span v-else>{{ scope.row.returnedCount }}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="单位" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span v-if="xuanzeShangpin.length !== scope.$index+1">{{ scope.row.unit }}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="报废原因" align="center" min-width="160">
		          <template slot-scope="scope">
		            <span v-if="xuanzeShangpin.length !== scope.$index+1"><el-input v-model="scope.row.reason" style="width:150px;"/></span>
		          </template>
		        </el-table-column>
		        
		      </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Shenqing = false">取消</el-button>
        <el-button type="primary" @click="chuku()">提交</el-button>
      </div>
    </el-dialog>
    
		<!--调拨添加组件-->
    	<el-dialog :visible.sync="shangpintj" title="商品添加" class="shenqingtj_tab" width="1100px">
    		<add-order
    		    v-if="shangpintj"
    		    :initInfo="xuanzeShangpin"
    		    :config="{
    		        typeList:'orderLei',
    		        goodsList:'diaoboList'
    		    }"
    		    @shangpinData="getData"
    		    @shangpinT="guaT"
    		/>
		</el-dialog>
		
		<!--商品报废通用弹框-->
    <el-dialog :visible.sync="baofeidekuang" title="商品报废" class="caigousq_tab caigoudb_tab" width="900px">
      <el-form label-width="80" label-position="left">
					<div class="shanga">
						<div class="shanga" style="width: 100%;">
							<el-form-item label="报废单号：">
				         		{{baoFDetail.orderNumber}}
					        </el-form-item>
					        <el-form-item label="状态：" v-if="baoFDetail.status==0">
					          	待审批
					        </el-form-item>
					        <el-form-item label="状态：" v-if="baoFDetail.status==6">
					          	已完成
					        </el-form-item>
					        <el-form-item label="状态：" v-if="baoFDetail.status==-3">
					          	已作废
					        </el-form-item>
					        <el-form-item label="加油站：">
					          {{baoFDetail.oilsStationName}}
					        </el-form-item>
					        <el-form-item label="拒绝原因：" v-if="baoFDetail.status==-3">
					        	<span >{{baoFDetail.merchantRefuseReason}}</span>
					        </el-form-item>
						</div>
		        
						<el-form-item label="申请人：">
							{{baoFDetail.createrName}}
		        </el-form-item>
						<el-form-item label="申请时间：" style="width:300px;">
		        	<span v-if="baoFDetail.createTime">{{baoFDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        	<span v-else></span>
		        </el-form-item>
						<el-form-item label="营业日：" v-if="baoFDetail.status==6">
							{{baoFDetail.businessDay | parseTime('{y}-{m}-{d}')}}
		        </el-form-item>
		        <el-form-item label="班次："   v-if="baoFDetail.status==6">
							{{baoFDetail.shiftId}}
		        </el-form-item>
						<!-- <div class="shanga" >						 -->
		        <el-form-item label="审核人：" v-if="baoFDetail.merchantAuditorName">
		        	{{baoFDetail.merchantAuditorName}}
		        </el-form-item>
		        
		        <el-form-item label="审核时间：" v-if="baoFDetail.merchantAuditTime">
		        	<span v-if="baoFDetail.merchantAuditTime">{{baoFDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        	<span v-else></span>
		        </el-form-item>
						
					<!-- </div>	    	 -->
					</div>	
					<el-table :data="baoFList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" >
						<el-table-column label="序号" align="center" min-width="55">
		          <template slot-scope="scope">
		            <span v-if="baoFList.length !== scope.$index+1">{{scope.$index+1}}</span>
		            <span v-else>{{scope.row.lastName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="报废数量" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.returnedCount}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="单位" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsUnit}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="报废原因" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.reason}}</span>
		          </template>
		        </el-table-column>  
		      </el-table>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baofeidekuang=false">关闭</el-button>
      </div>
    </el-dialog>
		
  </div>
</template>

<script>
import { returnedList,returnedShen,returnedDetail,returnedChex } from '@/api/shangpin'

import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addOrder from './addOrder/add'

export default {

  components: { Pagination,addOrder },
  data() {
    return {
      	value6: '',
      	list: null,
      	tableKey: 0,
      	listLoading: true,
	    total: 0,
      form: {
        name: ''
      },
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	        statusList:[0,6,-3],
	        typeId:2,
	        orderNumber:'',
	    },
	    status:'',
	    pages:1,
	    zhuangtai:[{
	    	id:"0",
	    	name:"待审批"
	    },{
	    	id:6,
	    	name:"已完成"
	    },{
	    	id:-3,
	    	name:"已作废"
	    }],
	    baofeidekuang:false,
	    //------------------------------------------报废申请
	    Shenqing:false,
	    shangpintj:false,
	    xuanzeShangpin:[],
	    clickData:'',
	    daitijiao:[],
	    //---------------------各种详情
	    baoFDetail:{},
	    baoFList:[],
	    returnedCountSumNumber:0,
	    seeReturnedCountSumNumber:0,
	    
    }
  },
  created() {
	    this.getList()
  },
  methods: {
      getList() {
	      returnedList(this.listQuery).then(response => {
//	        console.log(response)
	        this.list=response.data.rows;
	        this.total=response.data.total;
	      })
	    },
	    zhuangtaiX(){
	    	console.log(this.status);
	    	if(this.status==[]||this.status==""){
	    		this.listQuery.statusList=["0","6","-3"];
	    	}else{
	    		this.listQuery.statusList=[];
	    		this.listQuery.statusList.push(this.status);
	    	}
	    	this.listQuery.pageNum=1;
	    	console.log(this.listQuery);
	    	
	    	this.getList();
	    },
	    //-----------------------------------------------------------------------报废申请
	    //添加后删除商品
	    shanchuD(){
				if(this.daitijiao.length>0){
	    		this.xuanzeShangpin.forEach((item,index)=>{
	    			this.daitijiao.forEach((is,i)=>{
	    				if(item.id==is.id){
	    					this.xuanzeShangpin.splice(index,1)
	    				}
	    			})
	    		})
	    		let leg = this.xuanzeShangpin.length
	    		for (let i = leg - 1; i >= 0; i--) {
				    for (let j = 0; j < this.daitijiao.length; j++) {
				        if (this.xuanzeShangpin[i]) {
				            if (this.xuanzeShangpin[i].id == this.daitijiao[j].id) {
//				                rightData.push(leftData[i])
				                this.xuanzeShangpin.splice(i, 1)
				                continue; //结束当前本轮循环，开始新的一轮循环
				            }
				        }
				    }
					}
	    	}else{
	    		
	    	}
	    	this.returnedCountSum()
			},
			//选择框事件
			handleSelectionChange (selection, row) {
	    	this.daitijiao=selection;
	    	console.log(selection)
	    	console.log(row)
			},
			//添加商品组件传过来的值
			getData(val){
        this.xuanzeShangpin=val
        
        this.xuanzeShangpin.forEach((item)=>{
        	// item["returnedCount"]='';
        	item["reason"]='';
        	delete item["lastBuyDate"];
        	delete item["indate"];
        })
        
        this.shangpintj=false
        this.returnedCountSum();
	    },
	    //传完值之后关闭弹框
	    guaT(val){
	    	this.shangpintj=false
	    },
	    returnedCountSum(){
	    	this.returnedCountSumNumber = 0;
	    	this.xuanzeShangpin.forEach((item,index)=>{
	    		if(item.lastName){
	    			this.xuanzeShangpin.splice(index,1)
	    		}else{
	    			if(Number(item.returnedCount) > 0){
	    				this.returnedCountSumNumber += Number(item.returnedCount);
	    			}
	    		}
	    	})
	    	this.xuanzeShangpin.push({
	    		lastName:'合计',
	    		returnedCount:this.returnedCountSumNumber
	    	})
	    },
	    //最后提交申请
	    chuku(){
	    	this.xuanzeShangpin.forEach((item)=>{
	    		delete item['createTime'];
	    	})
	    	
	    	let arr=[];
	    	if(this.daitijiao.length>0){
	    		this.xuanzeShangpin.forEach((item)=>{
	    			this.daitijiao.forEach((is)=>{
	    				if(item.id==is.id){
	    					arr.push(item);
	    				}
	    			})
	    		})
	    	}else{
	    		arr=this.xuanzeShangpin;
	    	}
	    	console.log(arr)

	    		arr = [...arr]
	    		arr.splice(arr.length - 1,1)
				
				let flage=1;
				let v=/^([1-9][0-9]*){1,3}$/;
				for (var i=0;i<arr.length;i++) {
					if(arr[i].returnedCount>arr[i].repertory){
		        flage=-1;
		        break;
					}else if(!arr[i].returnedCount){
						flage=-2;
		        break;
					}else if(!arr[i].reason){
						flage=-3;
		        break;
					}else if(!v.test(arr[i].returnedCount)){
						console.log(arr[i].returnedCount)
						flage=-4;
		        break;
					}else{
						flage=1
					}
				}
				
				if(flage==1){
					let data={
		    		goodsList:arr,
		    		typeId:2
		    	}
		    	console.log(data)
		    	returnedShen(data).then(res=>{
		    		this.Shenqing=false;
		    		this.xuanzeShangpin=[];
		    		this.getList()
		    	})
				}else if(flage==-1){
					this.$notify({
	          title: '警告',
	          message: '报废数量不能大于库存',
	          type: 'warning'
	        });
				}else if(flage==-2){
					this.$notify({
	          title: '警告',
	          message: '请检查商品报废数量已填',
	          type: 'warning'
	        });
				}else if(flage==-3){
					this.$notify({
	          title: '警告',
	          message: '请检查商品报废原因已填',
	          type: 'warning'
	        });
				}else if(flage==-4){
					this.$notify({
	          title: '警告',
	          message: '报废数量应大于零',
	          type: 'warning'
	        });
				}
				
	    },
	    
	    //---------------------------------------------------------------报废撤销
	    chexiao(idid){
	    	let data={
	    		id:idid
	    	}
	    	this.$confirm('此操作将撤销此条操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          returnedChex(data).then(res=>{
		    		this.$notify({
		          title: '确定',
		          message: '撤销成功',
		          type: 'success'
		        });
		    		this.getList();
		    	})
          
          
        }).catch(() => {
          this.$notify.info({
		          title: '消息',
		          message: '已取消',
		        });        
        });
	    	
	    },
	    
	    //------------------------各种详情
	    baofeiDetail(idid){
	    	let data={
	    		id:idid,
	    		typeId:2
	    	}
	    	returnedDetail(data).then(res=>{
	    		console.log(res)
	    		this.baoFDetail=res.data.goodsReturnedInfo;
	    		this.baoFList=res.data.goodsList;
	    		this.baofeidekuang=true
	    		this.seeReturnedCountSumNumber = 0;
	    		this.baoFList.forEach((item)=>{
	    			this.seeReturnedCountSumNumber += Number(item.returnedCount);
	    		})
	    		this.baoFList.push({
	    			lastName:'合计',
	    			returnedCount:this.seeReturnedCountSumNumber
	    		})

	    	})
	    	
	    },
	    reset(){
  			this.xuanzeShangpin=[];
  		}
  }
}
</script>

<style scoped>
	@import url("./scrap.scss");

</style>
