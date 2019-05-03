<template>
  <div class="app-container price-mt">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="价格管理"/>
				  <div style="float: right;margin-left: auto;">
		    	<el-button type="primary" class="tui_btn1" @click="ypjiageCha=true">油站油价查询</el-button>
		    </div>
      </div>
			
      <div class="items">
      	<el-form-item label="公司" label-width="90px">
          <el-select v-model="listQuery.companyId" clearable style="min-width: 100px" class="filter-item" @change="selyouzhan">
            <el-option v-for="item in shanghudeList" :key="item.id" :label="item.company_name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="加油站" label-width="90px">
          <el-select v-model="listQuery.stationId" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in youzhan" :key="item.id" :label="item.shortName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="变价类型" style="margin-right: 20px;margin-left: 20px;" label-width="90px">
          <el-select v-model="listQuery.changeType" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in yewu" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" style="margin-right: 20px;margin-left: 20px;" label-width="60px">
          <el-select v-model="listQuery.status" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in zhuangtai" :key="item.name" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        
        
        
      </div>
      <div class="dbriqi">
        <div class="qiri">时间:</div>
        <el-date-picker
		      v-model="value6"
		      type="daterange"
		      unlink-panels
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      :picker-options="pickerOptions2"
		      @change="shijian"
		      >
		    </el-date-picker>
		  
      </div>

      <el-table :data="list" fit highlight-current-row style="width: 100%;">
        <el-table-column label="变价类型" align="center" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.changeType==1">油品变价</span>
            <span v-if="scope.row.changeType==2">商品变价</span>
          </template>
        </el-table-column>
        <el-table-column label="变价单号" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.changeOrderNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.publishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生效时间" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.efficientTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="变价数量" min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.changeNums }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未生效</span>
            <span v-if="scope.row.status==1">已生效</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="success" @click="spbj(scope.row.id)" v-if="scope.row.status==0&&scope.row.changeType==2||scope.row.status==1&&scope.row.changeType==2">查看</el-button> -->
            <el-button size="mini" type="success" @click="spbj(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    
    
		<!--商品变价查看详情-->    
    <el-dialog :visible.sync="bianjiade" title="商品变价单" class="caigousq_tab caigoudb_tab">
      <el-form label-width="80" label-position="left">
					<div class="shanga">
						<el-form-item label="退货单号：">
		          {{shangpinDetal.changeOrderNum}}
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinDetal.status==0">
		          	未生效
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinDetal.status==1">
		          	已生效
		        </el-form-item>
		        <el-form-item label="发布时间：">
		          	<span v-if="shangpinDetal.efficientTime">{{shangpinDetal.efficientTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        </el-form-item>
		        <el-form-item label="发布人：">
		          	{{shangpinDetal.publishPeopleName}}
		        </el-form-item>
		        <el-form-item label="生效时间：">
		          	<span v-if="shangpinDetal.publishTime">{{shangpinDetal.publishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        </el-form-item>
					</div>	    
					<div style="margin-bottom: 20px;font-size: 14px; color: #606266;font-weight: 700;">
						变价油站：
						<span v-for="item in oilsGoodsChangePriceStationList" style="margin-right: 10px;">{{item.oilsStationName}}</span>
					</div>
					<el-table :data="shangpinDeList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" >
						<el-table-column label="序号" align="center" min-width="55">
		          <template slot-scope="scope">
		            <span>{{scope.$index+1}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <!-- <el-table-column label="原单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.originalPrice}}</span>
		          </template>
		        </el-table-column> -->
		        <el-table-column label="新单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.newPrice}} 元</span>
		          </template>
		        </el-table-column>
		        
		        
		      </el-table>
      
      	</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bianjiade=false">关闭</el-button>
      </div>
    </el-dialog>
		<!-- 油品变价查看详情 -->
    <el-dialog :visible.sync="youpinbianjia" title="油品变价单" class="caigousq_tab caigoudb_tab">
      <el-form label-width="80" label-position="left">
					<div class="shanga">
						<el-form-item label="退货单号：">
		          {{youpinDetal.changeOrderNum}}
		        </el-form-item>
		        <el-form-item label="状态：" v-if="youpinDetal.status==0">
		          	未生效
		        </el-form-item>
		        <el-form-item label="状态：" v-if="youpinDetal.status==1">
		          	已生效
		        </el-form-item>
		        <el-form-item label="发布时间：">
		          	<span v-if="youpinDetal.efficientTime">{{youpinDetal.efficientTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        </el-form-item>
		        <el-form-item label="发布人：">
		          	{{youpinDetal.publishPeopleName}}
		        </el-form-item>
		        <el-form-item label="生效时间：">
		          	<span v-if="youpinDetal.publishTime">{{youpinDetal.publishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        </el-form-item>
					</div>	    
					<div style="margin-bottom: 20px;font-size: 14px; color: #606266;font-weight: 700;">
						变价油站：
						<span v-for="(item,index) in oilsGoodsChangePriceStationList2" :key="index" style="margin-right: 10px;">{{item.oilsStationName}}</span>
					</div>
					<el-table :data="youpinDeList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" >
						<el-table-column label="序号" align="center" min-width="55">
		          <template slot-scope="scope">
		            <span>{{scope.$index+1}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="油品品号" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.oilsName}}</span>
		          </template>
		        </el-table-column>
		        <!-- <el-table-column label="原单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.originalPrice}}</span>
		          </template>
		        </el-table-column> -->
		        <el-table-column label="新单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.newPrice}} 元/升</span>
		          </template>
		        </el-table-column>
		        
		        
		      </el-table>
      
      	</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="youpinbianjia=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--油站油价查询-->
    <el-dialog :visible.sync="ypjiageCha" title="油站油价查询" class="shenqing_tab">
      <el-form label-width="120px">
      		<div class="btn_box">
      			<el-form-item label="公司" label-width="60px">
		          <el-select v-model="ypcom" placeholder="请选择" style="width: 200px" @change="chayouzhan">
						    <el-option
						      v-for="item in shanghudeList"
						      :key="item.id"
						      :label="item.company_name"
						      :value="item.id">
						    </el-option>
						  </el-select>
		        </el-form-item>
      			<el-form-item label="加油站" label-width="60px">
		          <el-select v-model="ypstation" placeholder="请选择" style="width: 200px" @change="chayouqiang">
						    <el-option
						      v-for="item in supOilstation"
						      :key="item.id"
						      :label="item.shortName"
						      :value="item.id">
						    </el-option>
						  </el-select>
		        </el-form-item>
      		</div>
					<el-table :data="youqiang" style="width: 100%;" @select-all="handleSelectionChange" @select="handleSelectionChange">
		        <el-table-column label="油枪号" align="center" min-width="120">
		          <template slot-scope="scope">
		            <span>{{scope.row.oilGunNo}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="油罐号" align="center" min-width="120">
		          <template slot-scope="scope">
		            <span>{{scope.row.oilcanNo}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="油品" align="left" min-width="120">
		          <template slot-scope="scope">
		            <span>{{scope.row.oilsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="价格" align="left" min-width="120">
		          <template slot-scope="scope">
		            <span>{{scope.row.oilsPrice}}元/升</span>
		          </template>
		        </el-table-column>
		      </el-table>
		      <div slot="footer" class="dialog-footer">
		        <el-button @click="ypjiageCha = false">关闭</el-button>
		      </div>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
import { priceList,priceUp,priceO,comYouzhanList,yuoqiangPrice } from '@/api/shuju'
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
	        status:'',
	        changeType:'',
	        companyId:''
	    },
	    jiageUp:false,
	    xuanzeShangpin:[],
	    data:{
	    	stationIdList:[],
	    	ogList:[],
	    	changeType:2,
	    	efficientTime:'',
	    },
	    
	    shanghudeList:[],
	    
	    //商品添加组建
	    shangpintj:false,
	    
	    //商品变价的
	    bianjiade:false,
	    shangpinDetal:{},
	    shangpinDeList:[],
			oilsGoodsChangePriceStationList:[],
			
			// 油品变价的
			youpinbianjia:false,
	    youpinDetal:{},
	    youpinDeList:[],
			oilsGoodsChangePriceStationList2:[],
	    
	    
	    ypjiageCha:false,
	    supOilstation:[],
	    youqiang:[],
	    ypstation:'',
	    ypcom:''
    }
  },
  created() {
	    this.getList();
	    this.shanghude();
  },
  methods: {
      getList() {
      	console.log(this.listQuery)
	  		priceList(this.listQuery).then(res=>{
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
			selyouzhan(val) {
					this.youzhan=[];
			    this.listQuery.stationId = "";
					if (val) {
						let data = {
								companyId: val
						};
						console.log(data);
						comYouzhanList(data).then(res => {
								console.log(res);
								this.youzhan = res.data;
						});
					}
			    console.log(this.listQuery);
			    this.tianjianyong();
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
	    	priceList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
	    handleSelectionChange(){
	    	
	    },
	    
	    spbj(idid){
	    	let data={
	    		id:idid
	    	}
	    	console.log(data)
	    	priceO(data).then(res=>{
					console.log('11111111111111111111111')
					console.log(res.data)
	    		if(res.data.oilsGoodsChangePriceInfo.changeType==1){
						this.youpinDetal=res.data.oilsGoodsChangePriceInfo;
	    			this.youpinDeList=res.data.oilsGoodsList;
	    			this.oilsGoodsChangePriceStationList2=res.data.oilsGoodsChangePriceStationList;
						this.youpinbianjia=true;
	    		}else if(res.data.oilsGoodsChangePriceInfo.changeType==2){
	    			console.log(res)
	    			this.shangpinDetal=res.data.oilsGoodsChangePriceInfo;
	    			this.shangpinDeList=res.data.oilsGoodsList;
	    			this.oilsGoodsChangePriceStationList=res.data.oilsGoodsChangePriceStationList;
	    			this.bianjiade=true;
	    		}
	    	})
	    },
	    
  		chayouzhan(val){
  			this.ypstation='';
	    	let data={
	    		companyId:val
	    	}
	    	comYouzhanList(data).then(res=>{
	    		console.log(res)
	    		this.supOilstation=res.data;
	    	})
	    },
	    
	    chayouqiang(val){
	    	let data={
	    		stationId:val
	    	}
	    	
	    	yuoqiangPrice(data).then(res=>{
	    		console.log(res)
	    		this.youqiang=res.data;
	    	})
	    }
  }
  
}
</script>

<style scoped>
	@import url("./price-m.scss");

</style>
