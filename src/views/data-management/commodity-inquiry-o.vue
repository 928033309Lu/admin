<template>
  <div class="app-container inquiry">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="商品查询"/>
      </div>
      <div class="items">
        <el-form-item label="类别" label-width="100px">
          <el-select v-model="listQuery.goodsTypeId" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in shangpinLei" :key="item.id" :label="item.goodsType" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" label-width="100px" class="kucun">
					<div class="kucunSe">
						<el-select v-model="listQuery.repSetSearch" clearable style="min-width: 100px" class="filter-item" @change="kucunde">
							<el-option v-for="item in yewu" :key="item.id" :label="item.name" :value="item.id"/>
						</el-select>
						<el-input v-model="listQuery.repertory" style="min-width: 30px;margin-left: 10px;" @input="kucunde"></el-input>
					</div>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="listQuery.goodsNameFuzzy" placeholder="请输入内容" style="min-width: 100px;" @input="tianjianyong"></el-input>
        </el-form-item>
        <el-form-item label="商品条码" label-width="100px">
          <el-input v-model="listQuery.barCode" placeholder="请输入内容" style="min-width: 100px" @input="tianjianyong"></el-input>
        </el-form-item>
      </div>
      <el-table :data="list" fit highlight-current-row style="width: 100%;" class="sangpinList">
        <el-table-column label="商品类别" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.goodsName }}</span>
          </template>
        </el-table-column>
				<el-table-column label="单价" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.repertory }}</span>
          </template>
        </el-table-column>
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
            <el-button size="mini" type="success" @click="spbj(scope.row.goodsId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    
    
		<!--商品信息-->    
    <el-dialog :visible.sync="xinxide" title="商品信息" class="caigousq_tab caigoudb_tab" @open="qingtian">
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
		        <el-form-item label="零售价：">
		          	{{shangpinDetal.price}}
		        </el-form-item>
		        <el-form-item label="库存：">
		          	{{shangpinDetal.repertory}}
		        </el-form-item>
					</div>	 
					
	        <el-form-item label="商品条码：" style="padding-top: 30px;">
	          <div style="min-width: 40%;float: left;padding: 0 10px;">
	          	<span v-for="item in shangpinDeList" style="width: 100%;display: flex;margin-bottom: 10px;">
	          		<el-input v-model="item.name" placeholder="请输入内容" style="min-width: 100px;"></el-input>
	          	</span>
	          	<span v-if="disBock" style="width: 100%;display: flex;">
	          		<el-input v-model="disBock_input" placeholder="请输入内容" style="min-width: 100px;" @input="shuruBock" @blur="zengjiaBock"></el-input>
	          	</span>	          	
	          	<i class="el-icon-circle-plus" style="color: #409EFF;cursor: pointer;" @click="zengBock"></i>
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
import { zhanSPList,orderLei,zhanSPDetail,jituanSPBock } from '@/api/shangpin'
	
import { priceList,priceUp,priceO } from '@/api/shuju'

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
	    	id:"dy",
	    	name:'大于'
	    },{
	    	id:"xy",
	    	name:'小于'
	    },{
	    	id:"dydy",
	    	name:'大于等于'
	    },{
	    	id:"xydy",
	    	name:'小于等于'
	    }],
	    
	    beizhu:'',
      form: {
        name: ''
      },
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	        repSetSearch:'',
	        repertory:'',
	        goodsTypeId:'',
	        goodsNameFuzzy:'',
			barCode:''
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
	    this.shangFenlei();
  },
  methods: {
      getList() {
      	console.log(this.listQuery)
	  		zhanSPList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
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
	    	zhanSPList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
	    handleSelectionChange(){
	    	
	    },
	    
	    spbj(idid){
	    	let data={
	    		goodsId:idid
	    	}
//	    	console.log(data)
	    	zhanSPDetail(data).then(res=>{
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
	    		goodsId:this.shangpinDetal.goodsId,
	    		barCodeList:arr
	    	}
	    	jituanSPBock(data).then(res=>{
	    		this.$notify({
	          title: '成功',
	          type: 'success'
	        });
	    	})
	    },
	    qingtian(){
	    	this.disBock=false;
	    	this.disBock_input="";
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
	    		goodsId:this.shangpinDetal.goodsId,
	    		barCodeList:arr
	    	}
	    	console.log(data)
	    	jituanSPBock(data).then(res=>{
	    		this.$notify({
	          title: '成功',
	          type: 'success'
	        });
	        
	        
	        let data2={
	        	goodsId:this.shangpinDetal.goodsId
	        }
	        
	        zhanSPDetail(data2).then(res=>{
	        	console.log(res)
		    		this.shangpinDeList=[];
		    		res.data.goodsBarList.forEach((item)=>{
		    			let data5={
		    				name:item
		    			}
		    			this.shangpinDeList.push(data5);
		    		})
	    		})
	        
	        this.disBock=false;
	        this.disBock_input='';
	    	}).catch(res=>{
	    			console.log(res.response.data.error)
		    		this.$notify.error({
		          title:res.response.data.error,
		        });
	    	})
	    },
	    
	    kucunde(){
	    	if(!this.listQuery.repertory){
	    		this.$notify.error({
	          title: '请输入要查询的库存',
	        });
	    	}else{
	    		
	    		let v=/^([1-9][0-9]*){1,3}$/;
	    		if(!v.test(this.listQuery.repertory)){
	    			this.$notify.error({
		          title: '请输入正整数',
		        });
	    		}else{
	    			this.tianjianyong();
	    		}
	    	}
	    }
  		
  }
  
}
</script>

<style scoped>
	@import url("./inquiry.scss");
</style>
