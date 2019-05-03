<template>
	<div class="warp commodityadd">
		<div class="header">
			<h3><el-button circle @click="prev"> <i class="el-icon-arrow-left"></i></el-button>商品添加申请</h3>
			<div class="btn">
				<!--<el-button type="primary">
					<upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
				</el-button>-->
			</div>
		</div>
		<div class="main">
			<!--审核状态-->
			<div class="shenhe">
				<!--<div class="shenhede" style="line-height: 60px;font-weight: bold;font-size: 15px;">商品添加审核</div>-->
				<el-table ref="multipleTable" :data="sData" tooltip-effect="dark" style="width: 100%">
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
					<el-table-column label="商品名称" min-width="180" align="center">
						<template slot-scope="scope">
							{{ scope.row.goodsName }}
						</template>
					</el-table-column>
					<el-table-column label="单位" min-width="70" align="center">
						<template slot-scope="scope">
							{{ scope.row.unit }}
						</template>
					</el-table-column>
					<!--<el-table-column prop="name" label="品牌">
						<template slot-scope="scope">
							{{ scope.row.brand }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="规格">
						<template slot-scope="scope">
							{{ scope.row.specAmount }}{{ scope.row.specUnit }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="保质期">
						<template slot-scope="scope">
							{{ scope.row.expirationDay }}天
						</template>
					</el-table-column>-->
					<el-table-column prop="name" label="状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status==0">待审批</span>
							<span v-if="scope.row.status==1">已通过</span>
							<span v-if="scope.row.status==-1">拒绝</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
							<el-button type="primary" size="small" @click="shenOrderDetail(scope.row.id)" v-if="scope.row.status==-1||scope.row.status==1||scope.row.status==0">查看</el-button>
							<el-button type="danger" size="small" @click="chexiao(scope.row.id)" v-if="scope.row.status==0">撤销</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="备注" min-width="100" align="center">
						<template slot-scope="scope">
							{{ scope.row.remark }}
						</template>
					</el-table-column>
					<el-table-column align="center" min-width="70" :render-header="renderHeader">
						<template slot="header" slot-scope="scope">

						</template>
					</el-table-column>
				</el-table>
				<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
				
			</div>
			
			
			<!-- 商品添加框 -->
			<el-dialog :visible.sync="addVisible" width="60%" title="商品信息">
				<div class="see">
					<el-row>
						<el-col :span="12">
							<div class="grid-content bg-purple">
								<div class="box">
									<div class="left">
										<span>商品大类：</span>
									</div>
									<div class="right">
										<el-select v-model="addData.typeId" placeholder="请选择" style="width: 200px;">
											<el-option v-for="item in typeOptions" :key="item.goodsType" :label="item.goodsType" :value="item.id"></el-option>
										</el-select>
									</div>
								</div>
								<div class="box">
									<div class="left">
										<span>商品名称：</span>
									</div>
									<div class="right">
										<el-input v-model="addData.goodsName" placeholder="请输入名称" style="width: 200px;"></el-input>
									</div>
								</div>
								<div class="box">
									<div class="left">
										<span>品牌：</span>
									</div>
									<div class="right">
										<el-input v-model="addData.brand" placeholder="请输入品牌" style="width: 200px;"></el-input>
									</div>
								</div>
								<div class="box">
									<div class="left">
										<span>单位：</span>
									</div>
									<div class="right">
										<el-select v-model="addData.unit" placeholder="请选择" style="width: 200px;">
											<el-option v-for="item in companyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</div>
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content bg-purple-light">
								<div class="box">
									<div class="left">
										<span>规格：</span>
									</div>
									<div class="right">
										<el-input v-model="addData.specAmount" placeholder="请输入" style="width: 90px;"></el-input>
										<!--<el-input v-model="addData.specUnit" placeholder="单位" style="width: 70px;"></el-input>-->
										<el-select v-model="addData.specUnit" placeholder="单位" style="width: 110px;">
											<el-option v-for="item in am" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</div>
								</div>
								<div class="box">
									<div class="left">
										<span>保质期：</span>
									</div>
									<div class="right">
										<el-input v-model="addData.expirationDay" placeholder="请输入保质天数" style="width: 150px;"></el-input>
										<el-input placeholder="天" style="width: 50px;" :disabled="true"></el-input>
									</div>
								</div>
								<div class="box">
									<div class="left">
										<span>商品条码</span>
									</div>
									<div class="right">
										<el-input v-model="addData.barCode" placeholder="请输入商品条码" style="width: 200px;"></el-input>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="addVisible = false">取消</el-button>
					<el-button type="primary" @click="addCommodity">确认</el-button>
				</div>
			</el-dialog>
		
		
		
		
			<!--商品信息-->    
		    <el-dialog :visible.sync="xinxide" title="商品申请信息" class="caigousq_tab">
		      <el-form label-width="80" label-position="left">
		      	
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
		        <el-button type="primary" @click="xinxide=false">关闭</el-button>
		      </div>
		    </el-dialog>
		</div>
	</div>
</template>

<script>
	import { orderLei,orderMAdd,orderShenhe,orderCX } from '@/api/diaodu'
	import { orderShenDetail } from '@/api/shangpin'
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination'
	import UploadExcelComponent from '@/views/dispatch/UploadExcel/index.vue'
	export default {
		name: "dispatchcommodityaddDemo",
		components: { UploadExcelComponent,Pagination },
		data() {
			return {
				//商品管理列表
				tableData: [],
				tableHeader: [],
				//商品大类
				typeOptions: [],
				dalei:'',
				
				xinxide:false,
				xinxiDetail:{},
				//单位
				companyOptions: [{
					value: "包",
					label: "包"
				},{
					value: "杯",
					label: "杯"
				},{
					value: "袋",
					label: "袋"
				},{
					value: "付",
					label: "付"
				},{
					value: "副",
					label: "副"
				},{
					value: "个",
					label: "个"
				},{
					value: "罐",
					label: "罐"
				},{
					value: "盒",
					label: "盒"
				},{
					value: "具",
					label: "具"
				},{
					value: "块",
					label: "块"
				},{
					value: "瓶",
					label: "瓶"
				},{
					value: "提",
					label: "提"
				},{
					value: "条",
					label: "条"
				},{
					value: "桶",
					label: "桶"
				},{
					value: "箱",
					label: "箱"
				},{
					value: "油",
					label: "油"
				},{
					value: "支",
					label: "支"
				},{
					value: "组",
					label: "组"
				}],
				am:[{
					value: "毫升(ML)",
					label: "毫升(ML)"
				},{
					value: "升(L)",
					label: "升(L)"
				},{
					value: "千克(KG)",
					label: "千克(KG)"
				},{
					value: "克(G)",
					label: "克(G)"
				},{
					value: "厘米(CM)",
					label: "厘米(CM)"
				},{
					value: "毫米(MM)",
					label: "毫米(MM)"
				}],
				addVisible: false, //控制商品添加框显示与隐藏
				addData: "", //商品添加数据暂存
				multipleSelection: [],
				
				//页数条数
				listQuery: {
					pageNum: 0,
					pageSize: 10
				},
				total: 0,
				
				//商品申请列表
				sData: [],
			};
		},
		created() {
			this.orderlei();
			this.getList();
		},
		methods: {
			add() {
				this.addVisible = true;
				this.addData = {
					goodsName: "", //商品名称
					typeId: "", //商品大类
					unit: "", //单位
					brand: "", //品牌
					specAmount: "", //规格
					specUnit:"",//规格单位
					expirationDay: "", //保质期
					barCode: "" //商品条码
				};
			},
			chexiao(idid){
				let data={
					id:idid
				}
				
				this.$confirm('此操作将撤销此订单, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          
		         	orderCX(data).then(res=>{
				        this.$message({
				            type: 'success',
				            message: '撤销成功!'
				        });
				        this.getList();
					})
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
				
				
				
				
			},
			orderlei(){
				orderLei({}).then(res=>{
					console.log(res)
					this.typeOptions=res.data;
				})
			},
			//商品添加审核列表
			getList(){
				orderShenhe(this.listQuery).then(res=>{
		    		console.log(res)
		    		this.sData=res.data.rows;
		    		this.total=res.data.total;
		    	})
			},
			addCommodity() {
				
				let v=/^([1-9][0-9]*){1,3}$/;
				if(this.addData.goodsName==""||this.addData.typeId==""||this.addData.unit==""||this.addData.brand==""||this.addData.specAmount==""||this.addData.specUnit==""||this.addData.expirationDay==""||this.addData.barCode==""){
					
					this.$notify.error({
			          title: '错误',
			          message: '请填写完整商品信息'
			        });
			        
				}else if(!v.test(this.addData.expirationDay)){
					
					this.$notify.error({
			          title: '错误',
			          message: '保质天数应为正整数'
			        });
					
				}else if(this.addData.barCode.length<6){
					
					this.$notify.error({
			          title: '错误',
			          message: '条码不小于六位'
			        });
					
				}else{
					console.log(this.addData);
					this.tableData.push(this.addData);
					this.shangchuan();
					// this.addVisible = false;
				}
				
			},
			del(index, row) {
				this.tableData.splice(index, 1);
			},
			//查看
			see(index, row) {
				this.managementVisible = true;
				this.seeData = row;
			},
			//返回上一页
			prev() {
				this.$router.go(-1);
			},
			// 自定义表达头+
			renderHeader(h, {
				column,
				$index
			}) {
				var that = this;
				return h("span", [
					h("span", column.label),
					h(
						"el-button", {
							style: "margin-left: 5px;",
							on: {
								click: that.add
							}
						}, ["+"]
					)
				]);
			},
			shangchuan() {
				console.log(this.tableData.length)
				if(this.tableData.length<=0){
					this.$notify.error({
			          title: '错误',
			          message: '请先添加商品',
			          duration: 1000
			        });
				}else{
					let data = {
						goodsList: this.tableData
					}
					orderMAdd(data).then(res => {
						console.log(res)
						if(res.data.existsList.length>0){
							var chongfu='';
							for(var i=0;i<res.data.existsList.length;i++){
								chongfu+=res.data.existsList[i].goodsName+','
							}
							chongfu+="已有,不用添加"
							this.$alert(chongfu, '提示', {
					          confirmButtonText: '确定',
					        });
						}else if(res.data.addBarRes){
							this.$alert(res.data.addBarRes, '提示', {
					          confirmButtonText: '确定',
					        });
						}else{
							this.$notify({
				              title: '成功',
				              message: '创建成功',
				              type: 'success',
				              duration: 2000
				            })
							this.addVisible = false;
							
						}
						this.getList();
						this.tableData=[];
					}).catch(res=>{
						console.log(res.response.data.error)
			    		this.$notify.error({
				          title:res.response.data.error,
				        });
					})
				}
				
			},
			
			
			shenOrderDetail(idid){
		    	let data={
		    		id:idid
		    	}
		    	orderShenDetail(data).then(res=>{
		    		console.log(res)
		    		this.xinxiDetail=res.data;
		    		this.xinxide=true;
		    		
		    	})
		    },
			
			beforeUpload(file) {
			      const isLt1M = file.size / 1024 / 1024 < 1
			
			      if (isLt1M) {
			        return true
			      }
			      this.$message({
			        message: '请传入1M以内的Excel表',
			        type: 'warning'
			      })
			      return false
		    },
		    handleSuccess({ results, header }) {
		      this.tableData = results
		      this.tableHeader = header
		      //改变读取模板后的对象键名
		      this.tableData = JSON.parse(JSON.stringify( this.tableData).replace(/保质期/g,"expirationDay").replace(/单位/g,"unit").replace(/品牌/g,"brand").replace(/商品名称/g,"goodsName").replace(/商品大类/g,"typeId").replace(/商品条码/g,"barCode").replace(/规格/g,"specAmount"));
		      
		      console.log(this.tableData)
		      console.log(this.typeOptions)
		      this.tableData.forEach((item)=>{
		      	this.typeOptions.forEach((v)=>{
		      		if(item.typeId==v.goodsType){
		      			item.typeId=v.id;
		      		}
		      	})
		      })
		      
		      /*let data = {
				goodsList: this.tableData
			  }*/
		      
//		      console.log(this.tableData);
		    }
		}
	};
</script>

<style scoped>
	@import url("./commodityadd.scss");
</style>