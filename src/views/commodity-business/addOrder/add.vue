<template>
	<div class="shangpinAdd">
		<el-form label-width="100px">
			<div class="sou">
				<el-form-item label="商品类型" label-width="70px">
		          <el-select v-model="splistQuery.typeId" clearable style="min-width: 200px" class="filter-item" @change="orderSelect">
		            <el-option v-for="item in typeOptions" :key="item.goodsType" :label="item.goodsType" :value="item.id"/>
		          </el-select>
		        </el-form-item>
		        <div class="you">
		        	<el-input v-model="splistQuery.goodsName" @input="mingchengS" placeholder="商品名称查找"/>
		        	<el-button type="primary" @click="mingchengS()">搜索</el-button>
		        </div>
			</div>
		</el-form>
		<div class="tianjiade">
			<el-table :data="list1" fit ref="moviesTable" class="xuan" @select-all="handleSelectionChange" @select="onTableSelect">
				<el-table-column type="selection" align="center" min-width="50">
	        	</el-table-column>
		        <el-table-column label="商品类型" align="center" min-width="100">
		          <template slot-scope="scope">
		          	<span v-for="item in typeOptions" v-if="item.id==scope.row.typeId">{{item.goodsType}}</span>
				  </template>
		        </el-table-column>
		        <el-table-column label="商品名称" min-width="100" align="center" >
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="库存" min-width="80" align="center">
		          <template slot-scope="scope">
		            <span>{{scope.row.repertory}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="单位" align="center" min-width="50">
		          <template slot-scope="scope">
		            <span>{{scope.row.unit}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="规格" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.specAmount}} {{scope.row.specUnit}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="品牌" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.brand }}</span>
		          </template>
		        </el-table-column>
		    </el-table>
		    <div class="xuanle">
		     	<div class="yixuan">已经选择的商品</div>
		     	<ul>
		     		<li v-for="item in yixuanList">
		     			<div class="ming">{{ item.goodsName }}</div>
		     			<!--<span class="cha" @click="yixuanJ(item.id,item.pid,item.iid)">X</span>-->
		     		</li>
		     	</ul>
		    </div>
		</div>
    	<pagination v-show="total1>0" :total="total1" :page.sync="splistQuery.pageNum" :limit.sync="splistQuery.pageSize" @pagination="fenyele"/>
    	<div slot="footer" class="dialog-footer">
	        <el-button  @click="shangpintj">取消</el-button>
	        <el-button type="primary" @click="shangyeT">添加</el-button>
	    </div>
	</div>
</template>

<script>
	import { orderList, orderLei, diaoboList, suppOilList } from '@/api/shangpin'
	import Pagination from '@/components/Pagination'
	export default {
		components: {
			Pagination
		},
		name: "dispatchcommodityDemo",
		props:['initInfo','config'],
		data() {
			return {
				//商品管理列表临时数据
				tableData: [],
				multipleSelection: [],
				splistQuery: {
			        pageNum: 1,
			        pageSize: 10,
			        typeId:'',
			        goodsName:'',
			        isRepertory:1
				},
				list1: [],
				total1: 0,
				//采购添加商品后右边已选
			    yixuanList:[],
			    //采购申请时选完以后到上一页需要渲染的
			    caigoudeList:[],
			    //记忆商品申请添加时每个分页的选中数据
			    selectData:[],
			    //商品大类
				typeOptions: [],
			};
		},
		created() {
			this.orderlei();
			let initList = [...this.initInfo]
			initList.splice(initList.length - 1,1)
			this.yixuanList = initList
			this.selectData = initList
		},
		methods: {
			orderLei:orderLei,
			diaoboList:diaoboList,
			orderList:orderList,
			suppOilList:suppOilList,
			echoDisplay() {
				this.$nextTick(()=>{
					if(this.$refs.moviesTable){
						this.$refs.moviesTable.clearSelection();
						setTimeout(() => {
							this.list1.forEach((item,index) => {
								this.yixuanList.forEach((item1,index1) => {
									console.log(item1)
									if(item.id == item1.id){
										this.$refs.moviesTable.toggleRowSelection(item);
									}
								})
							})
						},100)
					}
				})
			},
			getList() {
				// console.log(this.splistQuery)
				// console.log(this.mess)
				this.splistQuery.supplierId = this.config.supplierId;
				this[this.config.goodsList](this.splistQuery).then(res => {
					// console.log(res)
					this.list1 = res.data.rows
					this.total1 = res.data.total
					this.echoDisplay()
				})
			},
			//商品进价维护商品删除
			maintainDel(index, row) {
				this.maintainData.splice(index, 1);
			},
			
			//分页时执行
		    fenyele(){
		    	this.spgetList();
		    	// console.log(this.splistQuery)
		    	this.splistQuery.supplierId = this.config.supplierId;
		    	this[this.config.goodsList](this.splistQuery).then(res=>{
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    		let arr=[];
			    	// console.log(this.selectData);
			    	if(this.selectData.length>0){
			    		this.selectData.forEach((items,index)=>{
			    			this.list1.forEach((is,v)=>{
			    				if(items.id==is.id){
			    					arr.push(is);
			    				}
			    			})
			    		})
			    	}
			    	// console.log(arr)
			    	// setTimeout(()=>{
			    	// 	this.toggleSelection(arr);
			    	// },100)
			    	this.echoDisplay();
		    	}).catch(res=>{
		    		
		    	})
		    },
		    toggleSelection(rows){
		    	// if(rows){
		    	// 	rows.forEach(row=>{
		    	// 		this.$refs.moviesTable.toggleRowSelection(this.list1[row],true)
		    	// 	})
		    	// }else{
		    	// 	this.$refs.moviesTable.clearSelection();
		    	// }
		    },
		    //所有商品列表
		    spgetList(){
		    	this.splistQuery.supplierId = this.config.supplierId;
		    	this[this.config.goodsList](this.splistQuery).then(res=>{
		    		// console.log(res)
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    	}).catch(res=>{
		    		
		    	})
		    },
			
			handleSelectionChange (selection) {
				if(selection.length<=0){
					//全选取消的数据记录
					let quanxuan=[];
					// console.log(this.selectData)
					this.selectData.forEach((item)=>{
						this.list1.forEach((is)=>{
							if(item.id==is.id){
								quanxuan.push(item)
							}
						})
					})
					let xinshuzu=[];
					
					for (var i = 0; i < this.selectData.length; i++) {
			          for (var j = 0; j < quanxuan.length; j++) {
			            if (this.selectData[i].id == quanxuan[j].id) {
			              this.selectData[i] = "";
			              break;
			            }
			          }
			        }
					
					for (var i = 0; i < this.selectData.length; i++) {
			          if (this.selectData[i] != "") {
			            xinshuzu.push(this.selectData[i])
			          }
			        }
					this.selectData=xinshuzu;
					
				}else{
					if(this.selectData.length<=0){
						selection.forEach((item)=>{
							this.selectData.push(item);
						})
					}else{
						
						var result = [];
						for(var i = 0; i < selection.length; i++){
							var obj = selection[i];
							var num = obj.id;
							var flag = false;
							for(var j = 0; j < this.selectData.length; j++){
								var aj = this.selectData[j];
								var n = aj.id;
								if(n == num){
									flag = true;
									break;
								}
							}
							if(!flag){
								result.push(obj);
							}
						}
						
						result.forEach((item)=>{
							this.selectData.push(item);
						})
					}
				}
				
				// console.log(this.selectData)
				this.yixuanList=this.selectData;
			},
			
			onTableSelect(rows, row) {
				// console.log(rows, row)
				//rows是选中的   row是点击的那个
				if(rows.length>0){
					if(this.selectData.length<=0){
						rows.forEach((item)=>{
							this.selectData.push(item);
						})
					}else{
						let selected = rows.length && rows.indexOf(row) !== -1
						if(selected){
							this.selectData.push(row);
							/*rows.forEach((item)=>{
								this.selectData.forEach((is)=>{
									if(item.id!=is.id){
										this.selectData.push(item);
									}
								})
							})*/
						}else{
							this.selectData.forEach((is,index)=>{
								if(is.id==row.id){
									this.selectData.splice(index,1);
								}
							})
						}
					}
				}else{
					this.selectData.forEach((is,index)=>{
						if(is.id==row.id){
							this.selectData.splice(index,1);
						}
					})
				}
				this.yixuanList=this.selectData;
				// console.log(this.selectData)
			},
			//添加到上一页
		    shangyeT(){
		    	this.caigoudeList=this.yixuanList;
		    	this.$emit('shangpinData',this.caigoudeList)
		    	//采购添加商品后右边已选
			    this.yixuanList=[];
			    //采购申请时选完以后到上一页需要渲染的
			    this.caigoudeList=[];
			    //记忆商品申请添加时每个分页的选中数据
			    this.selectData=[];
			    this.splistQuery={
			        pageNum: 1,
			        pageSize: 10,
			        typeId:'',
			        goodsName:'',
				},
			    this.getList();
		    },
			//商品搜索名称
		    mingchengS(){
					// console.log(this.mess)
		    	this.splistQuery.pageNum=1;
		    	this.splistQuery.supplierId = this.config.supplierId;
		    	this[this.config.goodsList](this.splistQuery).then(res=>{
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    		let arr=[];
			    	// console.log(this.selectData);
			    	if(this.selectData.length>0){
			    		this.selectData.forEach((items,index)=>{
			    			this.list1.forEach((is,v)=>{
			    				if(items.id==is.id){
			    					arr.push(v);
			    				}
			    			})
			    		})
			    	}
			    	// console.log(arr)
			    	setTimeout(()=>{
			    		this.toggleSelection(arr);
			    	},100)
			    	this.echoDisplay();
		    	}).catch(res=>{
		    		
		    	})
		    },
			orderSelect(){
		    	this.splistQuery.pageNum=1;
		    	this.spgetList();
		    	// console.log(this.splistQuery)
		    	this.splistQuery.supplierId = this.config.supplierId;
		    	this[this.config.goodsList](this.splistQuery).then(res=>{
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    		let arr=[];
			    	// console.log(this.selectData);
			    	if(this.selectData.length>0){
			    		this.selectData.forEach((items,index)=>{
			    			this.list1.forEach((is,v)=>{
			    				if(items.id==is.id){
			    					arr.push(v);
			    				}
			    			})
			    		})
			    	}
			    	// console.log(arr)
			    	setTimeout(()=>{
			    		this.toggleSelection(arr);
			    	},100)
			    	this.echoDisplay();
		    	}).catch(res=>{
		    		
		    	})
		    },
		    //所有商品类别
	    	orderlei(){
				this[this.config.typeList]({}).then(res=>{
					// console.log(res)
					this.typeOptions=res.data;
					// console.log(this.typeOptions);
					this.getList();
				})
			},
			shangpintj(){
				this.$emit('shangpinT',false)
				//采购添加商品后右边已选
			    this.yixuanList=[];
			    //采购申请时选完以后到上一页需要渲染的
			    this.caigoudeList=[];
			    //记忆商品申请添加时每个分页的选中数据
			    this.selectData=[];
			    this.splistQuery={
			        pageNum: 1,
			        pageSize: 10,
			        typeId:'',
			        goodsName:'',
				},
			    this.getList();
			},
			
		},
		
		
	};
</script>

<style scoped>
	@import url("./add.scss");
</style>