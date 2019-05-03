<template>
  <div class="app-container inquiry">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="商品查询"/>
      </div>
      <div class="items">
        <!--<el-form-item label="加油站" label-width="90px">
          <el-select v-model="listQuery.stationId" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in youzhan" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>-->
        <el-form-item label="类别" label-width="70px">
          <el-select v-model="listQuery.goodsTypeId" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in shangpinLei" :key="item.id" :label="item.goodsType" :value="item.id"/>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="库存" label-width="70px" class="kucun">
          <el-select v-model="listQuery.changeType" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in yewu" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
          <el-input v-model="listQuery.status" style="min-width: 30px;margin-left: 10px;"></el-input>
        </el-form-item>-->
        <el-form-item label="商品名称" label-width="90px">
          <el-input v-model="listQuery.goodsNameFuzzy" placeholder="请输入内容" style="min-width: 100px;" @input="tianjianyong"></el-input>
        </el-form-item>
        <el-form-item label="商品条码" label-width="90px">
          <el-input v-model="listQuery.barCode" placeholder="请输入内容" style="min-width: 100px" @input="tianjianyong"></el-input>
        </el-form-item>
        
      </div>

      <el-table :data="list" fit highlight-current-row style="width: 100%;" class="sangpinList">
        <el-table-column label="商品类别" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsName }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="库存" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.efficientTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="单位" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center" min-width="130">
          <template slot-scope="scope">
          	<span>{{ scope.row.specValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保质期" align="center" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.expirationDay }} 天
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="70" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="spbj(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    
    
		<!--商品信息-->    
    <el-dialog :visible.sync="xinxide" title="商品信息" class="caigousq_tab caigoudb_tab">
      <el-form label-width="80" label-position="left">
					
					<el-form-item label="商品大类：">
	          {{shangpinDetal.goodsTypeName}}
	        </el-form-item>
	        <el-form-item label="商品名称：">
	          {{shangpinDetal.goodsName}}
	        </el-form-item>
		      <div class="shanga">
		        <el-form-item label="品牌：">
		          	{{shangpinDetal.brand}}
		        </el-form-item>
		        <el-form-item label="单位：">
		          	{{shangpinDetal.unit}}
		        </el-form-item>
		        <el-form-item label="规格：">
		          	{{shangpinDetal.specValue}}
		        </el-form-item>
		        <el-form-item label="保质期：">
		          	{{shangpinDetal.expirationDay}} 天
		        </el-form-item>
		        <!--<el-form-item label="库存：">
		          	{{shangpinDetal.goodsName}}
		        </el-form-item>-->
					</div>	 
					
					<el-table :data="shoujiakucun" fit style="width: 100%;" :header-cell-style="{background:'#F5F9FC'}" class="shanghuxiangqingtab">
		        <el-table-column label="油站名称" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.oilsStationName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="零售单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.price}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="库存" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.repertory}}</span>
		          </template>
		        </el-table-column>
		      </el-table>
					
					
					
					<el-form-item label="供应商价格：">
	          <div style="min-width: 40%;float: left;border: 1px solid #e6e9ee;padding: 0 30px;">
	          	<span v-for="item in shangpinGoodsPriceMaintainList" style="width: 100%;display: block;">{{item.supplierName}}：{{item.price}}元</span>
	          </div>
	        </el-form-item>
	        <el-form-item label="商品条码：">
	          <div style="min-width: 40%;float: left;padding: 0 10px;">
	          	<span v-for="item in shangpinDeList" style="width: 100%;display: flex;margin-bottom: 10px;">
	          		<el-input v-model="item.name" placeholder="请输入内容" style="min-width: 100px;" :disabled="true"></el-input>
	          	</span>
	          	
	          	
	          	
	          	<!--<span v-if="disBock" style="width: 100%;display: flex;">
	          		<el-input v-model="disBock_input" placeholder="请输入内容" style="min-width: 100px;" @input="shuruBock" @blur="zengjiaBock"></el-input>
	          	</span>
	          	
	          	
	          	<i class="el-icon-circle-plus" style="color: #409EFF;cursor: pointer;" @click="zengBock"></i>-->
	          </div>
	        </el-form-item>
					
      	</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="xinxide=false">关闭</el-button>
      </div>
    </el-dialog>
    
    
  </div>
</template>

<script>
import { shangSPList,orderLei,shangSPDetail,jituanSPBock } from '@/api/shangpin'
	
import { youzhanList,priceList,priceUp,priceO } from '@/api/shuju'

import { shanghuList } from '@/api/shanghu'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addOrder from './addOrder/add'
export default {

  components: { Pagination,addOrder },
  data() {
    return {
    	pickerOptions2: {
	      shortcuts: [{
	        text: '今天',
	        onClick(picker) {
	        	const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
	          picker.$emit('pick', [start, end]);
	        }
        }, {
	        text: '最近一周',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	          picker.$emit('pick', [start, end]);
	        }
	      },{
	        text: '最近14天',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
	          picker.$emit('pick', [start, end]);
	        }
	      }, {
	        text: '最近一个月',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	          picker.$emit('pick', [start, end]);
	        }
	      }]
	    },
      
      list: null,
	    total: 0,
	    value6: '',
	    youzhan:[],
	    value5:[],
	    value3:"",
	    zhuangtai:[{
	    	id:0,
	    	name:'未生效'
	    },{
	    	id:1,
	    	name:'已生效'
	    }],
	    yewu:[{
	    	id:1,
	    	name:'油品变价'
	    },{
	    	id:2,
	    	name:'商品变价'
	    }],
	    
	    beizhu:'',
      form: {
        name: ''
      },
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	        stationId:'',
	        companyId:'',
	        goodsTypeId:'',
	        goodsNameFuzzy:'',
	        barCode:'',
	    },
	    jiageUp:false,
	    xuanzeShangpin:[],
	    data:{
	    	stationIdList:[],
	    	ogList:[],
	    	changeType:2,
	    	efficientTime:'',
	    },
	    
	    shangpinLei:[],
	    
	    shanghudeList:[],
	    
	    disBock:false,
	    
	    disBock_input:'',
	    
	    shoujiakucun:[],
	    //商品添加组建
	    shangpintj:false,
	    
	    //商品信息的
	    xinxide:false,
	    shangpinDetal:{},
	    shangpinDeList:[],
	    shangpinGoodsPriceMaintainList:[],
    }
  },
  created() {
	    this.getList();
	    this.shanghude();
	    this.youzhanlist();
	    this.shangFenlei();
  },
  methods: {
      getList() {
      	console.log(this.listQuery)
	  		shangSPList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
	    shanghude(){
	    	shanghuList({}).then(res=>{
	    		console.log(res)
	    		this.shanghudeList=res.data;
	    	})
	    },
	    shangFenlei(){
	    	orderLei({}).then(res=>{
	    		this.shangpinLei=res.data;
	    	})
	    },
	    shijian(){
	    	if(this.value6){
	    		console.log(this.value6)
		    	this.listQuery.effBeginTime=this.value6[0];
		    	this.listQuery.effEndTime=this.value6[1];
	    	}else{
	    		this.listQuery.effBeginTime='';
	    		this.listQuery.effEndTime='';
	    	}
	    	this.tianjianyong();
	    },
	    tianjianyong(){
	    	console.log(this.listQuery)
	    	this.listQuery.pageNum=1;
	    	shangSPList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
	    youzhanlist(){
	    	let data={
	    		companyId:this.listQuery.companyId
	    	}
	    	youzhanList(data).then(res=>{
	    		console.log(res)
	    		this.youzhan=[];
	    		res.data.forEach((item)=>{
	    			var data={
		    			id:item.id,
		    			name:item.shortName
		    		}
	    			this.youzhan.push(data);
	    		})
	    	})
	    },
	    handleSelectionChange(){
	    	
	    },
	    
	    spbj(idid){
	    	let data={
	    		goodsId:idid
	    	}
//	    	console.log(data)
	    	shangSPDetail(data).then(res=>{
	    		console.log(res)
	    		this.shangpinDeList=[];
	    		res.data.goodsBarList.forEach((item)=>{
	    			let data={
	    				name:item
	    			}
	    			this.shangpinDeList.push(data);
	    		})
	    		
	    		this.shoujiakucun=res.data.oilsStationGoodsList;
	    		this.shangpinDetal=res.data.goodsInfo;
	    		this.shangpinGoodsPriceMaintainList=res.data.goodsPriceMaintainList;
	    		this.xinxide=true;
	    	})
	    },
	    //更新条码
	    gengxinBock(){
	    	let arr=[];
	    	this.shangpinDeList.forEach((item)=>{
	    		arr.push(item.name)
	    	})
	    	let data={
	    		goodsId:this.shangpinDetal.id,
	    		barCodeList:arr
	    	}
	    	jituanSPBock(data).then(res=>{
	    		this.$notify({
	          title: '成功',
	          type: 'success'
	        });
	    	})
	    },
	    
	    zengBock(){
	    	this.disBock=true;
	    },
	    shuruBock(){
	    	if(!this.disBock_input){
	    		this.disBock=false;
	    	}
	    },
	    zengjiaBock(){
	    	let arr=[];
	    	this.shangpinDeList.forEach((item)=>{
	    		arr.push(item.name)
	    	})
	    	
	    	let str=this.disBock_input.replace(/\s+/g,"");
	    	
	    	arr.push(str);
	    	
	    	let data={
	    		goodsId:this.shangpinDetal.id,
	    		barCodeList:arr
	    	}
	    	
	    	jituanSPBock(data).then(res=>{
	    		this.$notify({
	          title: '成功',
	          type: 'success'
	        });
	        
	        shangSPDetail(data).then(res=>{
		    		this.shangpinDeList=[];
		    		res.data.goodsBarList.forEach((item)=>{
		    			let data={
		    				name:item
		    			}
		    			this.shangpinDeList.push(data);
		    		})
	    		})
	        
	        this.disBock=false;
	        this.disBock_input='';
	    	})
	    }
  		
  }
  
}
</script>

<style scoped>
	@import url("./inquiry.scss");
</style>
