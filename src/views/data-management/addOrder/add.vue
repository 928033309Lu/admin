<template>
	<div class="shangpinAdd">
		<el-form label-width="100px">
			<div class="sou">
				<el-form-item label="商品类型" label-width="70px">
		          <el-select v-model="splistQuery.goodsTypeId" clearable style="min-width: 200px" class="filter-item" @change="orderSelect">
		            <el-option v-for="item in typeOptions" :key="item.goodsType" :label="item.goodsType" :value="item.id"/>
		          </el-select>
		        </el-form-item>
		        <div class="you">
		        	<el-input v-model="splistQuery.goodsNameFuzzy" @input="mingchengS" placeholder="商品名称查找"/>
		        	<el-button type="primary" @click="mingchengS()">搜索</el-button>
		        </div>
			</div>
		</el-form>
		<div class="tianjiade">
			<el-table :data="list1" fit ref="moviesTable" class="xuan" @select-all="handleSelectionChange" @select="onTableSelect">
				<el-table-column type="selection" align="center" min-width="50" :selectable='checkboxInit'>
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
		        <!--<el-table-column label="规格" align="center" min-width="80">
		          <template slot-scope="scope">
		            <span>{{scope.row.specAmount }}</span>
		          </template>
		        </el-table-column>-->
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
    	<pagination v-show="total1>0" :total="total1" :page.sync="splistQuery.pageNum" :limit.sync="splistQuery.pageSize" @pagination="fenyele"/> <!--:page-sizes='[2, 3, 10]'-->
    	<div slot="footer" class="dialog-footer">
	        <el-button @click="shangpintj">取消</el-button>
	        <el-button type="primary" @click="shangyeT">添加</el-button>
	    </div>
	</div>
</template>

<script>
	import { orderCaigou,shangSPList,orderLei,orderShen,orderShenList,orderShenCan,orderShenShen,SupplierList,diaoboList } from '@/api/shangpin'
	import { orderSee } from '@/api/diaodu'
	import { supplierJinjia } from '@/api/gongyingshang'
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination'
	export default {
		props:{
			message: {
		      type: Array,
		      default() {
		        return []
		      }
		    }
		},
		
		components: {
			Pagination
		},
		name: "dispatchcommodityDemo",
		data() {
			return {
				//商品管理列表临时数据
				tableData: [],
				multipleSelection: [],
				splistQuery: {
			        pageNum: 1,
			        pageSize: 10,
			        goodsTypeId:'',
			        goodsNameFuzzy:''
				},
//				父级传来的值
				msg:[],
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
				rows:''
			};
		},
		created() {
			this.orderlei();
		},
		methods: {
			childMethod(){
				let that=this;
				this.msg = this.message;
				that.getList();
			},
			getList() {
				this.msg = this.message;
				shangSPList(this.splistQuery).then(res => {
					console.log(res)
					res.data.rows.forEach((item)=>{
						this.msg.forEach((v)=>{
							if(item.id==v.oilsGoodsId){
								item["jinyong"]=1
							}
						})
					})
					// console.log('msg')
					// console.log(this.msg)
					this.list1 = res.data.rows
					console.log(this.list1)
					this.total1 = res.data.total
				})
			},
			//商品进价维护商品删除
			maintainDel(index, row) {
				this.maintainData.splice(index, 1);
			},
			
			//分页时执行
		    fenyele(){
					this.msg=this.message
					
		    	shangSPList(this.splistQuery).then(res=>{
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    		let arr=[];
			    	console.log(this.selectData);
			    	if(this.selectData.length>0){
			    		this.selectData.forEach((items,index)=>{
			    			this.list1.forEach((is,v)=>{
			    				if(items.id==is.id){
			    					arr.push(v);
			    				}
			    			})
			    		})
						}
						// console.log('msg')
						// console.log(this.msg)
						// console.log('list1')
						// console.log(this.list1)
			    	this.list1.forEach((item)=>{
			    		this.msg.forEach((v)=>{
								if(item.id==v.oilsGoodsId){
									console.log('jinyong')
									item["jinyong"]=1
								}
							})
			    	})
			    	// console.log('arr')
			    	// console.log(arr)
			    	setTimeout(()=>{
			    		this.toggleSelection(arr);
			    	},100)
			    	
			    	
		    	}).catch(res=>{
		    		
		    	})
		    },
		    toggleSelection(rows){
		    	if(rows){
		    		rows.forEach(row=>{
		    			this.$refs.moviesTable.toggleRowSelection(this.list1[row],true)
		    		})
		    		
		    		
		    	}else{
		    		this.$refs.moviesTable.clearSelection();
		    	}
		    },
		    //所有商品列表
		    spgetList(){
		    	shangSPList(this.splistQuery).then(res=>{
		    		console.log(res)
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    	}).catch(res=>{
		    		
		    	})
		    },
			
			handleSelectionChange (selection) {
				if(selection.length<=0){
					//全选取消的数据记录
					let quanxuan=[];
					console.log(this.selectData)
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
				
				console.log(this.selectData)
				this.yixuanList=this.selectData;
			},
			
			onTableSelect(rows, row) {
				this.rows=rows
				console.log(this.rows)
				console.log(row)
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
				console.log(this.selectData)
			},
			
			
			
			//添加到上一页
		    shangyeT(){
					console.log(111)
		    	this.caigoudeList=this.yixuanList;
		    	this.$emit('shangpinData',this.caigoudeList,this.rows)
		    	// console.log(this.caigoudeList);
		    	//采购添加商品后右边已选
			    this.yixuanList=[];
			    //采购申请时选完以后到上一页需要渲染的
			    this.caigoudeList=[];
			    //记忆商品申请添加时每个分页的选中数据
			    this.selectData=[];
			    this.splistQuery={
			        pageNum: 1,
			        pageSize: 10,
			        goodsTypeId:'',
			        goodsNameFuzzy:''
				};
			    this.getList();
		    },
			//商品搜索名称
		    mingchengS(){
		    	this.splistQuery.pageNum=1;
		    	shangSPList(this.splistQuery).then(res=>{
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    		let arr=[];
			    	console.log(this.selectData);
			    	if(this.selectData.length>0){
			    		this.selectData.forEach((items,index)=>{
			    			this.list1.forEach((is,v)=>{
			    				if(items.id==is.id){
			    					arr.push(v);
			    				}
			    			})
			    		})
			    	}
			    	console.log(arr)
			    	setTimeout(()=>{
			    		this.toggleSelection(arr);
			    	},100)
		    	}).catch(res=>{
		    		
		    	})
		    },
			orderSelect(){
		    	this.splistQuery.pageNum=1;
		    	this.spgetList();
		    	shangSPList(this.splistQuery).then(res=>{
		    		this.list1=res.data.rows;
		    		this.total1=res.data.total;
		    		let arr=[];
			    	console.log(this.selectData);
			    	if(this.selectData.length>0){
			    		this.selectData.forEach((items,index)=>{
			    			this.list1.forEach((is,v)=>{
			    				if(items.id==is.id){
			    					arr.push(v);
			    				}
			    			})
			    		})
			    	}
			    	console.log(arr)
			    	setTimeout(()=>{
			    		this.toggleSelection(arr);
			    	},100)
		    	}).catch(res=>{
		    		
		    	})
		    },
		    //所有商品类别
	    	orderlei(){
				orderLei({}).then(res=>{
					console.log(res)
					this.typeOptions=res.data;
					console.log(this.typeOptions);
					this.getList();
				})
			},
			shangpintj(){
				this.$emit('shangpinT',false);
				//采购添加商品后右边已选
			    this.yixuanList=[];
			    //采购申请时选完以后到上一页需要渲染的
			    this.caigoudeList=[];
			    //记忆商品申请添加时每个分页的选中数据
			    this.selectData=[];
			    this.splistQuery={
			        pageNum: 1,
			        pageSize: 10,
			        goodsTypeId:'',
			        goodsNameFuzzy:''
				},
			    this.getList();
			},
			
			checkboxInit(row,index){
				
			
				console.log(row)
				if (row.jinyong==1) {//你需要判断的条件
			        return 0;//不可勾选
			      }else{
			        return 1;//可勾选
			      }
			},
			
		},
		/*watch:{
        	opinionData:{
			    handler(newValue,oldValue){
			      console.log("----------------------------")
			    },
			    deep:true
			}
		},*/
		
		
	};
</script>

<style scoped>
	@import url("./add.scss");
</style>