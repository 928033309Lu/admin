<template>
  <div class="warp commodityaudit">
    <div class="header">
      <h3><el-button circle @click="prev"> <i class="el-icon-arrow-left"></i></el-button>商品审核</h3>
		<el-form style="margin:10px;">
				<el-form-item label="状态" label-width="80px" >
          <el-select v-model="status" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in zhuangtai" :key="item.name" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
		</el-form>
			<!-- <template>
				<el-select v-model="status" placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="item.name" 
						:label="item.name" 
						:value="item.name"
						@click.native="zhuangtaiX(item)">
					</el-option>
				</el-select>
    </template> -->
    </div>
    <div class="main">
        <div class="table">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column label="申请时间" min-width="150" align="center">
							<template slot-scope="scope">
								{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
							</template>
						</el-table-column>
						<el-table-column label="商品大类" align="center">
							<template slot-scope="scope">
								{{ scope.row.goodsTypeName }}
							</template>
						</el-table-column>
						<el-table-column label="商品条码" min-width="120" align="center">
							<template slot-scope="scope">
								{{ scope.row.barCode }}
							</template>
						</el-table-column>
						<el-table-column label="商品名称" min-width="160" align="center">
							<template slot-scope="scope">
								{{ scope.row.goodsName }}
							</template>
						</el-table-column>
						<el-table-column label="单位" min-width="70" align="center">
							<template slot-scope="scope">
								{{ scope.row.unit }}
							</template>
						</el-table-column>
						<el-table-column label="状态" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.status==0">待审批</span>
								<span v-if="scope.row.status==1">已通过</span>
								<span v-if="scope.row.status==-1">拒绝</span>
							</template>
						</el-table-column>
						<el-table-column label="申请商户">
							<template slot-scope="scope">
								{{ scope.row.companyName }}
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="80" align="center">
							<template slot-scope="scope">
								<el-button type="primary" size="small" @click="shenOrderDetail(scope.row.id)">查看</el-button>
								<!--<el-button type="primary" size="small" @click="tongguo(scope.row.id)" v-if="scope.row.status==0">通过</el-button>
								<el-button type="danger" size="small" @click="jujue(scope.row.id)" v-if="scope.row.status==0">拒绝</el-button>-->
							</template>
						</el-table-column>
						<el-table-column label="备注" align="center">
							<template slot-scope="scope">
								{{ scope.row.remark }}
							</template>
						</el-table-column>
					</el-table>
					<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
						
        </div>
        <!--<div class="btn">
            <el-button type="primary">保存</el-button>
        </div>-->
      <!-- 拒绝弹框 -->
      <el-dialog :visible.sync="refuseVisible" width="600px;margin-top:25%" title="拒绝原因">
        <div class="refuse">
            <el-input v-model="reasonsRefusal" placeholder="请输入拒绝原因" style="width: 350px;"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="jujuele">确认</el-button>
        </div>
      </el-dialog>
      
      <!--商品信息-->    
	    <el-dialog :visible.sync="xinxide" title="商品申请信息" class="caigousq_tab" width="700px">
	      <el-form label-width="80" label-position="left" style="padding: 0 20px;">
	      	
						<el-form-item label="申请时间：">
		          {{xinxiDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		        </el-form-item>
		        
		        <el-form-item label="状态：">
		          <span v-if="xinxiDetail.status==0">待审批</span>
		          <span v-if="xinxiDetail.status==1">已通过</span>
		          <span v-if="xinxiDetail.status==-1">已作废</span>
		        </el-form-item>
		        
		        <el-form-item label="商品大类：">
		          {{xinxiDetail.goodsTypeName}}
		        </el-form-item>
		        
		        <el-form-item label="商品条码：">
		          {{xinxiDetail.barCode}}
		        </el-form-item>
		        
		        <el-form-item label="商品名称：">
		          {{xinxiDetail.goodsName}}
		        </el-form-item>
		        
		        <el-form-item label="品牌：">
		          {{xinxiDetail.brand}}
		        </el-form-item>
		        
		        <el-form-item label="单位：">
		          {{xinxiDetail.unit}}
		        </el-form-item>
		        
		        <el-form-item label="申请商户：">
		          {{xinxiDetail.companyName}}
		        </el-form-item>
						
						<el-form-item label="规格：">
		          {{xinxiDetail.specAmount}} {{xinxiDetail.specUnit}}
		        </el-form-item>
		        
		        <el-form-item label="保质期：">
		          {{xinxiDetail.expirationDay}} 天
		        </el-form-item>
		        
	      	</el-form>
	      <div slot="footer" class="dialog-footer">
	        <!--<el-button @click="xinxide=false">关闭</el-button>-->
        	<el-button type="danger" @click="jujue(xinxiDetail.id)" v-if="xinxiDetail.status==0" style="margin-left: 50px;">拒绝</el-button>
        	<el-button type="primary" @click="tongguo(xinxiDetail.id)" v-if="xinxiDetail.status==0" style="margin-left: 50px;">通过</el-button>
					
	      </div>
	    </el-dialog>
      
    </div>
  </div>
</template>

<script>
	import { orderShenhe,orderTJ } from '@/api/diaodu'
	import { orderShenDetail } from '@/api/shangpin'
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination'
export default {
	components: {
			Pagination
		},
  name: "dispatchcommodityauditDemo",
  data() {
    return {
      //商品管理列表临时数据
      tableData: [],
      multipleSelection: [],
      reasonsRefusal:'',//拒绝原因
      refuseVisible:false, //控制拒绝框显示与隐藏
      jujueid:'',
      //页数条数
			listQuery: {
				pageNum: 0,
				pageSize: 10,
				statusList:[0,1,-1],
			},
			total: 0,
			xinxide:false,
			xinxiDetail:{},
			 zhuangtai:[{
	    	id:["0"],
	    	name:'待审批'
	    },{
	    	id:["1"],
	    	name:'已通过'
	    },{
	    	id:["-1"],
	    	name:'拒绝'
			}],
			status:[],
    };
  },
  created() {
		this.getList();
	},
  methods: {
  	//返回上一页
    prev() {
      this.$router.go(-1);
		},
    getList(){
    	orderShenhe(this.listQuery).then(res=>{
    		console.log(res)
    		this.tableData=res.data.rows;
    		this.total=res.data.total;
    	})
    },
    jujue(idid){
    	this.refuseVisible=true;
    	this.jujueid=idid;
    },
    quxiao(){
    	this.refuseVisible = false;
    	this.reasonsRefusal='';
    },
    jujuele(){
    	let data={
    		id:this.jujueid,
    		status:-1,
    		remark:this.reasonsRefusal
    	}
    	orderTJ(data).then(res=>{
    		this.refuseVisible=false;
			this.xinxide=false;
    		this.getList();
    	})
    },
    tongguo(idid){
    	let data={
    		id:idid,
    		status:1,
    	}
    	console.log(data)
    	orderTJ(data).then(res=>{
    		this.xinxide=false;
			this.getList();
    	})
    },
    shenOrderDetail(idid){
    	let data={
    		id:idid
    	}
    	console.log(data)
    	orderShenDetail(data).then(res=>{
    		console.log(res)
    		this.xinxiDetail=res.data;
    		this.xinxide=true;
    		
    	})
		},
		tianjianyong(){
	    	this.listQuery.page=0;
	    	daibanList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.tableData=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
		zhuangtaiX(){
				// var list=this.tableData.filter((k)=>{
				// 		if(item.status==k.status){
				// 				return k
				// 		}
				// })
				// this.tableData=list
				
				if(this.status==[]||this.status==""){
	    		this.listQuery.statusList=[0, 1,-1];
	    	}else{
	    		this.listQuery.statusList=this.status;
	    	}
	    	
	    	this.getList();

		// console.log(this.baocun1)				
		// 	 console.log(item.status)
		// 	   if(item.status=='1'){
		// 			 this.baocun1 = [...this.tableData]
		// 			 	var list=this.baocun1.filter((items)=>{
		// 				 console.log(items.status)
		// 				if(item.status==items.status){
		// 					return  items
		// 				}	
		//      console.log(list)
		// 		})
		// 		 }
		// 		  if(item.status=='0'){
		// 				this.baocun2 = [...this.tableData]
		// 			 var list=this.baocun2.filter((items)=>{
		// 				 console.log(items.status)
		// 			if(item.status==items.status){
		// 				return  items
		// 			}	
		// 		})
		// 		 }
		// 		  if(item.status=='-1'){
		// 				this.baocun3 = [...this.tableData]
		// 			 var list=this.baocun3.filter((items)=>{
		// 				 console.log(items.status)
		// 			if(item.status==items.status){
		// 				return  items
		// 			}	
		// 		})
		// 		 }
		// 	 this.tableData=list
		// 	 this.getList()
				}
				
  }
};
</script>

<style scoped>
@import url("./commodityaudit.scss");

.el-form-item{margin-bottom: 10px;}
</style>