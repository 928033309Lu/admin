<style scoped>
		.el-button--mini, .el-button--mini.is-round{
			padding: 0;
			font-size: 14px;
		}
		.el-button--mini{
			padding: 0 !important;
			font-size: 14px!important
		}
</style>
<template>
	<div class="warp commodityadd">
		<div class="header">
			<h3><el-button circle  @click="prev"> <i class="el-icon-arrow-left"></i></el-button>商品添加</h3>
			<div class="btn">
				
				<el-button type="primary" size="mini">
					<upload-excel-component  :daoru='this.sup' :on-success="handleSuccess" :before-upload="beforeUpload"/>
				</el-button>
				<el-button type="primary"    @click='xiazai()'>下载模板</el-button>
			</div>
		</div>
		<div class="main">
			<div class="table">

				<el-table ref="multipleTable" id='out-table' :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<!--<el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>-->
					<el-table-column type="selection" width="50">
					</el-table-column>
					<el-table-column label="商品大类" align="center">
						<template slot-scope="scope">
							<span v-for="item in typeOptions" v-if="item.id==scope.row.typeId">{{item.goodsType}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="商品条码" min-width="120" align="center" show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.barCode }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="商品名称" min-width="130" align="center" show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.goodsName }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="单位" min-width="60" align="center">
						<template slot-scope="scope">
							{{ scope.row.unit }}
						</template>
					</el-table-column>
					<el-table-column prop="name" min-width="90" label="品牌" align="center">
						<template slot-scope="scope">
							{{ scope.row.brand }}
						</template>
					</el-table-column>
					<el-table-column prop="name" label="规格" align="center">
						<template slot-scope="scope">
							{{ scope.row.specAmount }}{{scope.row.specUnit}}
						</template>
					</el-table-column>
					<el-table-column prop="name" min-width="70" label="保质期" align="center">
						<template slot-scope="scope">
							{{ scope.row.expirationDay }}天
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center">
						<template slot-scope="scope">
							<el-button @click="del(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column align="center" min-width="70" :render-header="renderHeader">
						<template slot="header" slot-scope="scope">

						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="btn">
				<el-button type="primary" @click="shangchuan">保存</el-button>
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
										<el-input v-model="addData.specAmount" type="text" placeholder="请输入" style="width: 90px;"></el-input>
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
										<el-input v-model="addData.expirationDay" type="number" placeholder="请输入保质天数" style="width: 150px;"></el-input>
										<el-input :disabled="true" placeholder="天" style="width: 50px;"></el-input>
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
		</div>
	</div>
</template>

<script>
	import { orderAdd,orderLei } from '@/api/diaodu'
	import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination'
	import UploadExcelComponent from '@/views/dispatch/UploadExcel/index.vue'
	export default {
		name: "dispatchcommodityaddDemo",
		components: { UploadExcelComponent },
		data() {
			return {
				//商品管理列表临时数据
				tableData: [],
				tableHeader: [],
				sup:'1324',
				//商品大类
				typeOptions: [],
				dalei:'',
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
			};
		},
		created() {
			this.orderlei();

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
			orderlei(){
				orderLei({}).then(res=>{
					console.log(res);
					this.typeOptions=res.data;
				})
			},
			addCommodity() {
				var str=''
				var str1=''
				this.tableData.map((item)=>{
						console.log(item)
						str=item.goodsName
					  str1=item.barCode
				})
				let v=/^([1-9][0-9]*){1,3}$/;
			  if(this.addData.goodsName==str){   //判斷商品名稱和條碼重複時提示信息
									this.addVisible = true;
										this.$notify.error({
										title: '错误',
										message: '商品已存在'
									});
									return	
						}
						else if(this.addData.barCode==str1){   //判斷商品名稱和條碼重複時提示信息
									this.addVisible = true;
										this.$notify.error({
										title: '错误',
										message: '商品条码已存在'
									});
									return	
						}else	if(this.addData.goodsName==""||this.addData.typeId==""||this.addData.unit==""||this.addData.brand==""||this.addData.specAmount==""||this.addData.specUnit==""||this.addData.expirationDay==""||this.addData.barCode==""){
					
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
					this.addVisible = false;
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
		
　　formatJson(filterVal, jsonData) {
     return jsonData.map(v => filterVal.map(j => v[j]))
  
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
						goodsList:this.tableData
					}
					console.log(data)
					orderAdd(data).then(res => {
						console.log(res)
								if(!res.data.addBarRes){
									var  chongfu=''
										if(res.data.noTypeList.length>0&&res.data.existsList.length>0){
								
										var chong=''
											chongfu+=res.data.noTypeList.length+'个类别不存在'+','+res.data.existsList.length+'个商品已存在，不能重复添加'
												this.$alert(chongfu, '提示', {
					              confirmButtonText: '确定',
								   	});
								
									}else	if(res.data.existsList.length>0){
													res.data.existsList.map((item)=>{
													chongfu+=item.goodsName+","
											})
											chongfu+='已有，不能重复添加'
												this.$alert(chongfu, '提示', {
					              confirmButtonText: '确定',
								   	});
									}else	if(res.data.noTypeList.length>0){
													res.data.noTypeList.map((item)=>{
													chongfu+=item.goodsName+","
											})
											chongfu+='类别不存在'
												this.$alert(chongfu, '提示', {
					              confirmButtonText: '确定',
								   	});
									}
									else if(res.data.successList.length>0){
							this.$notify({
				              title: '成功',
				              message: '创建成功',
				              type: 'success',
				              duration: 2000
				            })
						}
						}else{
							this.$alert(res.data.addBarRes, '提示', {
					          confirmButtonText: '确定',
									});
									return
						}
					
						this.tableData=[];
					}).catch(res=>{
			    		console.log(res.response.data.error)
			    		this.$notify.error({
				          title:res.response.data.error,
				        });
			    	})
				}
				
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleAvatarSuccess(res, file) {
				this.editData.commodityImag = URL.createObjectURL(file.raw);
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
					xiazai(){   //下载模板
						this.downloadLoading = true
						import('@/vendor/Export2Excel').then(excel => {

							const tHeader =  ['商品大类', '商品条码','商品名称' ,'单位', '品牌','规格', '保质期']
							const filterVal = ['商品大类', '商品条码','商品名称', '单位', '品牌','规格', '保质期']
							excel.export_json_to_excel({
								header: tHeader,
								data:'',
								filename: '商品添加模板',
								autoWidth: this.autoWidth,
								bookType: this.bookType
							})
						})
　　},
		    handleSuccess({ results, header }) {
		      this.tableData = results
		      this.tableHeader = header
		      //改变读取模板后的对象键名
		      this.tableData = JSON.parse(JSON.stringify( this.tableData).replace(/保质期/g,"expirationDay").replace(/单位/g,"unit").replace(/品牌/g,"brand").replace(/商品名称/g,"goodsName").replace(/商品大类/g,"typeId").replace(/商品条码/g,"barCode").replace(/规格/g,"specAmount"));
		      this.tableData.forEach((item)=>{
						console.dir(item)
		      	this.typeOptions.forEach((v)=>{
		      		if(item.typeId==v.goodsType){
		      			item.typeId=v.id;
		      		}
		      	})
		      })
		      
		      /*let data = {
				goodsList: this.tableData
			  }*/
		      
		      console.log(this.tableData);
		    }
		}
	};
</script>


<style scoped>
	@import url("./commodityadd.scss");
</style>