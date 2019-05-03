<template>
  <div class="app-container supplier-weihu">
    <el-form label-position="left" label-width="120px" class="shangForm">
      <div class="top upzs qufenx">

        <router-link to="dispatch-supplier">
          <i class="el-icon-arrow-left"/>
        </router-link>
        <el-form-item label="油品供应商维护" label-width="170px"/>
      </div>
      <!--<div class="up">
        <div class="left">
          <el-form-item label="供应商编号" >
            {{conten.supplierNo}}
          </el-form-item>
          <el-form-item label="公司名称" >
            {{conten.supplierName}}
          </el-form-item>
          <el-form-item label="营业注册号" >
            {{conten.registrationNum}}
          </el-form-item>
          <el-form-item label="法人">
            {{conten.legalPerson}}
          </el-form-item>
          <el-form-item label="营业执照" prop="title" class="pic">
            {{conten.licenceImg}}
          </el-form-item>

        </div>-->
        <!--<div class="right">
          <el-form-item label="公司简称" >
            {{conten.supplierShort}}
          </el-form-item>
          <el-form-item label="营业执照有效期" >
            {{conten.licenceValidity | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
          </el-form-item>
          <el-form-item label="联系电话" >
            {{conten.phone}}
          </el-form-item>
          <el-form-item label="邮箱" >
            {{conten.email}}
          </el-form-item>
          <el-form-item label="经营范围" class="pic">
            {{conten.businessScope}}
          </el-form-item>
        </div>
      </div>-->
			<!-- 供应油品维护 -->
      <div class="weihu de">
        <el-form-item label="供应油品维护" >
          <el-table :data="supplierOils" fit style="width: 100%;border: 1px solid #e4e4e4;">
          	
          	<!--<el-table-column type="selection" width="80" align="center">
						</el-table-column>-->
          	
            <el-table-column label="油品品号" prop="id" align="center" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.oils_no_type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="油品规格" prop="id" align="center" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.specName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="进价" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.purchasingPrice}}</span>元/吨
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="upsupplierOils(scope.row,scope)">
                  	修改
                </el-button>

                <el-button size="mini" type="danger" @click="delsupplierOils(scope.row,scope)">
                  	删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="" width="50"/>
          </el-table>
          <i class="el-icon-plus" @click="oilAdd"/>

          <!--<pagination
            v-show="total>0"
            :total="total"
            :auto-scroll="false"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :page-sizes="[2, 5, 10, 20]"
            @pagination="getList" />-->

        </el-form-item>
      </div>
       <!-- 油站维护 -->
      <div class="weihu youzhan">
        <el-form-item label="油站维护" >
          <el-table :data="supplierStations" fit style="width: 100%;border: 1px solid #e4e4e4;">
          	<!--<el-table-column type="selection" width="80" align="center">
						</el-table-column>-->
            <el-table-column label="公司" align="center" min-width="80">
              <template slot-scope="scope">
                <span>{{scope.row.companyName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="油站" min-width="80" align="center">
              <template slot-scope="scope">
                <span >{{scope.row.oilsStationName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="运距" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.haulDistance}}KM</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="upsupplierStation(scope.row,scope)">
                  	修改
                </el-button>
                <el-button size="mini" type="danger" @click="delsupplierStation(scope.row,scope)">
                  	删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="" width="50"/>
          </el-table>
          <i class="el-icon-plus" @click="stationAdd"/>
          <!--<pagination
            v-show="total>0"
            :total="total"
            :auto-scroll="false"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :page-sizes="[2, 5, 10, 20]"
            @pagination="getList" />-->
        </el-form-item>
      </div>
      <!-------添加油站--------->
      <el-dialog :visible.sync="supplierFormVisible" title="供应油站" class="supplierForm">
	      <el-form :model="youzhanT" label-position="right" label-width="70px">  <!--:rules="rules"-->
	        <div class="up">
	          <div class="left">
	            <el-form-item label="公司" prop="supplierName">
	              <el-select v-model="youzhanT.companyId" placeholder="请选择" @change="selOilstation" style="width: 200px;" :disabled="confirm==='修改'?true:false">
							    <el-option
							      v-for="item in suppli"
							      :key="item.id"
							      :label="item.company_name"
							      :value="item.id">
							    </el-option>
							  </el-select>
	            </el-form-item>
	            <el-form-item label="油站" prop="registrationNum">
	              <el-select v-model="youzhanT.stationId" placeholder="请选择" @change="yunju" style="width: 200px;" :disabled="confirm==='修改'?true:false">
							    <el-option
							      v-for="item in supOilstation"
							      :key="item.id"
							      :label="item.shortName"
							      :value="item.id">
							    </el-option>
							  </el-select>
	            </el-form-item>
	            <el-form-item label="运距" prop="legalPerson">
	            	<span style="display: flex;width: 200px;justify-content: space-between;">
	            		<el-input v-model="youzhanT.haulDistance" style="width: 100px;"/>
	              	<el-input style="width: 90px;" disabled placeholder="KM"/>
	            	</span>
	              
	            </el-form-item>
	          </div>
	        </div>
	      </el-form>
	      <div slot="footer" class="dialog-footer" style="text-align:center;">
	        <el-button @click="supplierFormVisible = false">取消</el-button>
	        <el-button type="primary" @click="confirm==='添加'?supplierStationAdd():updateStationData()">{{confirm}}</el-button>
	      </div>
	    </el-dialog>
      
      <!-------添加油品--------->
      <el-dialog :visible.sync="supplierFormOil" title="供应油品" class="supplierForm">
	      <el-form :model="youzhanT" label-position="right" label-width="70px">  <!--:rules="rules"-->
	        <div class="up">
	          <div class="left">
	            <el-form-item label="油品品号" prop="supplierName">
	              <el-select v-model="oilChuan.oilsId" placeholder="请选择" @change="xY" :disabled="confirm==='修改'?true:false">
							    <el-option
							      v-for="item in oil"
							      :key="item.id"
							      :label="item.oils_no_type"
							      :value="item.id">
							    </el-option>
							  </el-select>
	            </el-form-item>
	            <el-form-item label="进价" prop="registrationNum">
	            	<div style="width: 130%;display: flex;">
	            		<el-input v-model="oilChuan.purchasingPrice" />
	              	<el-input placeholder="元/吨" :disabled="true" style="width: 130px;padding-left: 5px;"/>
	            	</div>
	            </el-form-item>
	          </div>
	          <div class="right">
	            <el-form-item label="油品规格" prop="legalPerson">
	              <el-select v-model="oilChuan.oilsSpecId" placeholder="请选择" >
							    <el-option
							      v-for="item in oilsSpecList"
							      :key="item.id"
							      :label="item.specName"
							      :value="item.id">
							    </el-option>
							  </el-select>
	            </el-form-item>
	          </div>
	        </div>
	      </el-form>
	      <div slot="footer" class="dialog-footer" style="text-align:center;">
	        <el-button @click="supplierFormOil = false">取消</el-button>
	        <el-button type="primary" @click="confirm==='添加'?supplierOilsAdd():updateData()">{{confirm}}</el-button>
	      </div>
	    </el-dialog>
      
      
      <!--<div class="foot-btn">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>-->
    </el-form>
		
		
		
		
  </div>
</template>

<script>
	import { chakan, supplierOil, supplierStation } from '@/api/diaodu'
	import { oilList } from '@/api/oil'
	import { shanghuList } from '@/api/shanghu'
	import { comYouzhanList } from '@/api/shuju'
	
	import { supplierWeihuOilAdd,supplierWeihuOilList,yunju,supplierWeihuOilDel,supplierWeihuOilDetail,supplierWeihuOilUp,supplierWeihuStationAdd,supplierWeihuStationList,supplierWeihuStationDetail,supplierWeihuStationUp,supplierWeihuStationDel } from '@/api/gongyingshang'
	
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {

  components: { Pagination },
  data() {
    return {
	  	jingyingfanwei: '',
	  	pagesize: 5,
	  	list: null,
	  	tableKey: 0,
	  	listLoading: true,
	  	
	    total: 0,
      form: {
        name: ''
      },
      listQuery: {
	        page: 1,
	        limit: 10,
	    },
	    pages:1,
	    dialogFormVisible: false,
	    
	    oil:{},
	    oilsSpecList:[],
	    oilChuan:{
	      oilsId:'',
	      oilsSpecId:'',
	      purchasingPrice:''
	    },
	    confirm:'',
	    
	    
	    conten:'',
	    supplierOils:[],
	    supplierStations:[],
	    supplierFormVisible:false,
	    
	    //----------------------------油站
	    youzhanT:{
	    	companyId:'',
	    	stationId:'',
	    	supplierId:this.$route.query.id,
	    	haulDistance:''
	    },
	    suppli:[],
	    supOilstation:[],
	    xiugaiStationId:'',
	    
	    //----------------------------油品
	    supplierFormOil:false,
	    oilyaogaiIndex:'',
	    
    }
  },
  created() {
	    this.getList()
	},
  methods: {
     	onSubmit() {
       	  console.log('submit!')
      },
      getList() {
      	//----------------供应商信息
	  	  let data = {
		    		id:this.$route.query.id
		    }
	  	  /*chakan(data).then(res=>{
  	  		console.log(res)
					this.conten = res.data
	    	})*/
	  	  
	  	  //----------------所有油品列表
	  	  oilList({}).then(res=>{
	    		console.log(res)
	    		this.oil=res.data;
	    	})
	  	  
	  	  //----------------所有公司列表
	  	  shanghuList({}).then(res=>{
	    		console.log(res)
	    		this.suppli=res.data
	    	})
	  	  
	  	  //----------------供应油品维护
	  	  let data2={
	  	  	supplierId:this.$route.query.id
	  	  }
	  	  console.log(data2)
	  	  supplierWeihuOilList(data2).then(res=>{
	  	  	console.log(res)
	  	  	this.supplierOils=res.data
	  	  })
	  	  
	  	  //----------------油站维护
	  	  supplierWeihuStationList(data2).then(res=>{
	  	  	console.log(res)
	  	  	this.supplierStations=res.data
	  	  })
	  	  
			},
			yunju(){
				console.log(111)
							let data ={ 
										stationId:this.youzhanT.stationId,
										supplierId:this.youzhanT.supplierId,
									  haulDistance:this.youzhanT.haulDistance										
										
								}
						yunju(data).then(res=>{
									 this.youzhanT.haulDistance=res.data.haulDistance.toFixed(2)
						})
						console.log(this.youzhanT.haulDistance)
			},
	    oilAdd(){
	    	this.confirm="添加";
				this.supplierFormOil=true;
				this.oilChuan={
							oilsId:'',
							oilsSpecId:'',
							purchasingPrice:''
				}
	    },
	    xY(val){
	    	this.oilChuan.oilsSpecId='';
	    	console.log(this.oil)
	    	this.oil.forEach((item)=>{
	    		if(item.id==val){
	    			this.oilsSpecList=item.oilsSpecList;
	    		}
	    	})
	    },
	    supplierOilsAdd(){
	    	this.oil.forEach((item)=>{
	    		if(item.id==this.oilChuan.oilsId){
	    			item.oilsSpecList.forEach((v)=>{
		    			if(v.id==this.oilChuan.oilsSpecId){
		    				let data={
		    					oilsId:this.oilChuan.oilsId,
					    		oilsSpecId:this.oilChuan.oilsSpecId,
					    		purchasingPrice:this.oilChuan.purchasingPrice,
					    		supplierId:this.$route.query.id
					    	}
		    				supplierWeihuOilAdd(data).then(res=>{
		    					this.getList();
		    				}).catch(res => {
									console.log(res);
										this.$notify({
												title: "失败",
												message: res.response.data.error,
												type: "error"
										});
								})
		    			}
		    		})
	    		}
	    		
	    	})
	    	this.supplierFormOil=false
	    },
	    upsupplierOils(row,spoc){
	    	console.log(row);
	    	this.confirm="修改";
	    	let data={
	    		id:row.id
	    	}
	    	supplierWeihuOilDetail(data).then(res=>{
	    		console.log(res)
	    		this.oilChuan['id']=row.id;
	    		this.oilChuan.oilsId=res.data.oilsId;
	    		this.xY(this.oilChuan.oilsId);
	    		this.oilChuan.oilsSpecId=res.data.oilsSpecId;
	    		this.oilChuan.purchasingPrice=res.data.purchasingPrice;
	    	})
	    	
	    	this.supplierFormOil=true;
	    },
	    updateData(){
	    	let data={
	    		id:this.oilChuan.id,
	    		oilsId:this.oilChuan.oilsId,
	    		oilsSpecId:this.oilChuan.oilsSpecId,
	    		purchasingPrice:this.oilChuan.purchasingPrice,
	    		supplierId:this.$route.query.id
	    	}
	    	supplierWeihuOilUp(data).then(res=>{
	    		console.log(res)
	    		this.getList();
	    		this.supplierFormOil=false;
	    	})
	    },
	    delsupplierOils(row,spoc){
	    	this.$confirm('此操作将删除该油品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
	    			ids:[row.id]
		    	}
          console.log(data)
		    	supplierWeihuOilDel(data).then(res=>{
		    		console.log(res)
		    		this.$message({
	            type: 'success',
	            message: res.data.success,
	            duration: 1000
	          });
	          this.getList();
		    	}).catch(res => {
		    		console.log(res.response)
		    		this.$notify.error({
		          title: '错误',
		          message: res.response.data.error
		        });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });          
        });
	    },
	    
	    //---------------------------------------------------油站
	    
	    stationAdd(){
	    	this.confirm="添加";
				this.supplierFormVisible=true
				this.youzhanT={
							companyId:'',
							stationId:'',
							supplierId:this.$route.query.id,
							haulDistance:''
	      }
	    },
	    selOilstation(val){
	    	let data={
	    		companyId:val
	    	}
	    	comYouzhanList(data).then(res=>{
	    		console.log(res)
	    		this.supOilstation=res.data;
	    	})
	    },
	    
	    supplierStationAdd(){
	    	console.log(this.youzhanT)
	    	supplierWeihuStationAdd(this.youzhanT).then(res=>{
	    		console.log(res)
	    		this.supplierFormVisible=false;
	    		this.getList();
	    	}).catch(res => {
					console.log(res);
						this.$notify({
								title: "失败",
								message: res.response.data.error,
								type: "error"
						});
				})
	    },
	    updateStationData(){
	    	
	    	let data={
	    		companyId:this.youzhanT.companyId,
	    		stationId:this.youzhanT.stationId,
	    		supplierId:this.youzhanT.supplierId,
	    		haulDistance:this.youzhanT.haulDistance,
	    		id:this.xiugaiStationId
	    	}
	    	supplierWeihuStationUp(data).then(res=>{
	    		this.supplierFormVisible=false;
	    		this.getList();
	    	})
	    },
	    upsupplierStation(row,scop){
	    	this.confirm="修改";
	    	this.xiugaiStationId=row.id;
	    	let data={
	    		id:row.id
	    	}
	    	console.log(data)
	    	supplierWeihuStationDetail(data).then(res=>{
	    		console.log(res)
	    		this.selOilstation(res.data.companyId);
	    		this.youzhanT.companyId=res.data.companyId;
	    		this.youzhanT.stationId=res.data.stationId;
	    		this.youzhanT.haulDistance=res.data.haulDistance;
	    	})
	    	this.supplierFormVisible=true
	    },
	    delsupplierStation(row,spec){
	    	this.$confirm('此操作将删除该油站运距信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
	    			ids:[row.id]
		    	}
          console.log(data)
		    	supplierWeihuStationDel(data).then(res=>{
		    		console.log(res)
		    		this.$message({
	            type: 'success',
	            message: res.data.success,
	            duration: 1000
	          });
	          this.getList();
		    	}).catch(res => {
		    		console.log(res.response)
		    		this.$notify.error({
		          title: '错误',
		          message: res.response.data.error
		        });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });          
        });
	    }
	    
  }
}
</script>

<style scoped>
	@import url("./supplier-weihu.scss");

</style>
