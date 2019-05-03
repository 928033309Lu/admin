<template>
  <div class="app-container price-mt">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="价格管理"/>
				<div style="float: right;margin-left: auto;">
		    	<el-button type="primary" class="tui_btn1" @click="ypjiageCha=true">油站油价查询</el-button>
		    	<el-button type="primary" class="tui_btn1" @click="ypjiageUp=true">油品变价</el-button>
		    	<el-button type="primary" class="tui_btn1" @click="jiageUp=true">商品变价</el-button>
		    </div>
      </div>
      <div class="items">
        <el-form-item label="加油站" label-width="90px">
          <el-select v-model="listQuery.stationId" clearable style="min-width: 100px" class="filter-item" @change="tianjianyong">
            <el-option v-for="item in youzhan" :key="item.id" :label="item.name" :value="item.id"/>
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
        <el-form-item label="时间" label-width="200px">
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
        </el-form-item>
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
            <el-button size="mini" type="success" @click="spbj(scope.row.id)" v-if="scope.row.status==0||scope.row.status==1">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    
    <!--商品价格发布-->
    <el-dialog :visible.sync="jiageUp" title="商品价格发布" class="shenqing_tab">
      <el-form label-width="120px">
      		<div class="btn_box">
      			<el-form-item label="加油站" label-width="60px">
		          <el-select v-model="value5" multiple placeholder="请选择" style="min-width: 200px">
						    <el-option
						      v-for="item in youzhan"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
		        </el-form-item>
		        <el-form-item label="生效时间" label-width="80px">
          		<el-date-picker
					      v-model="value3"
					      type="datetime"
					      placeholder="选择日期时间"
					      default-time="12:00:00"
					      :pickerOptions="pickerOptions0"
					      >
					    </el-date-picker>
        		</el-form-item>
      		</div>
      		<div class="btn_box2" style="padding-bottom: 20px;">
      			<el-button type="primary" @click="shangpintj=true">添加商品</el-button>
      			<el-button type="danger" @click="shanchuD()">删除商品</el-button>
      		</div>
					<el-table :data="xuanzeShangpin" style="width: 100%;" @select-all="handleSelectionChange" @select="handleSelectionChange">
						<el-table-column type="selection" min-width="70" align="center" >
						</el-table-column>
		        <el-table-column label="序号" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.$index+1}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="条码" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.barCode}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="150">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <!--<el-table-column label="原价格" min-width="80" align="center">
		          <template slot-scope="scope">
		            <span>{{scope.row.originalPrice}}</span>
		          </template>
		        </el-table-column>-->
		        <el-table-column label="新价格" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span style="display: flex;line-height: 36px;"><el-input v-model="scope.row.newPrice" placeholder="请输入" style="width: 100px;"></el-input>&nbsp;元</span>
		          </template>
		        </el-table-column>
		      </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="jiageUp = false">取消</el-button>
        <el-button type="primary" @click="tijiao()">提交</el-button>
      </div>
    </el-dialog>
    
    <!--添加商品组件-->
    <el-dialog :visible.sync="shangpintj" title="商品添加" class="shenqingtj_tab">
    	<add-order @shangpinData="getData" @shangpinT="guaT"   :message="xuanzeShangpin" ref="add1"/>
		</el-dialog>
    
		<!--商品变价-->    
    <el-dialog :visible.sync="bianjiade" title="变价详情" class="caigousq_tab caigoudb_tab">
      <el-form label-width="80" label-position="left">
					<div class="shanga">
						<el-form-item label="变价单号：">
		          {{shangpinDetal.changeOrderNum}}
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinDetal.status==0">
		          	未生效
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinDetal.status==1">
		          	已生效
		        </el-form-item>
		        <el-form-item label="发布时间：">
		          	<span v-if="shangpinDetal.publishTime">{{shangpinDetal.publishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        </el-form-item>
		        <el-form-item label="发布人：">
		          	{{shangpinDetal.publishPeopleName}}
		        </el-form-item>
		        <el-form-item label="生效时间：">
		          	<span v-if="shangpinDetal.efficientTime">{{shangpinDetal.efficientTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
		        </el-form-item>
					</div>	    
					<div style="margin-bottom: 20px;font-size: 14px; color: #606266;font-weight: 700;">
						变价油站：
						<span v-for="item in oilsGoodsChangePriceStationList" style="margin-right: 10px;">{{item.oilsStationName}}</span>
					</div>
					<el-table :data="shangpinDeList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" v-if="shangpinDetal.changeType==2">
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
		        <!--<el-table-column label="原单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.originalPrice}}元/升</span>
		          </template>
		        </el-table-column>-->
		        <el-table-column label="新单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.newPrice}} 元</span>
		          </template>
		        </el-table-column>
		        
		      </el-table>
		      
		      <el-table :data="shangpinDeList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" v-if="shangpinDetal.changeType==1">
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
		        <el-table-column label="新单价" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.newPrice}} 元/升</span>
		          </template>
		        </el-table-column>
		        
		        
		      </el-table>
      
      	</el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bianjiade=false">关闭</el-button>
      </div>
    </el-dialog>
    
    
    <!--油品价格发布-->
    <el-dialog :visible.sync="ypjiageUp" title="油品价格发布" class="shenqing_tab">
      <el-form label-width="120px">
      		<div class="btn_box">
      			<el-form-item label="加油站" label-width="60px">
		          <el-select v-model="ypstation" multiple placeholder="请选择" style="min-width: 200px">
						    <el-option
						      v-for="item in youzhan"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						  </el-select>
		        </el-form-item>
		        <el-form-item label="生效时间" label-width="80px">
          		<el-date-picker
					      v-model="ypshijian"
					      type="datetime"
					      placeholder="选择日期时间"
					      default-time="12:00:00"
					      :pickerOptions="pickerOptions0"
					      >
					    </el-date-picker>
        		</el-form-item>
      		</div>
      		<div class="btn_box2" style="padding-bottom: 20px;">
      			<el-button type="primary" @click="youpintj=true">添加油品</el-button>
      			<el-button type="danger" @click="ypshanchuD()">删除商品</el-button>
      		</div>
					<el-table :data="xuanzeOil" style="width: 100%;" @select-all="handleSelectionChange" @select="handleSelectionChange">
						<el-table-column type="selection" min-width="70" align="center" >
						</el-table-column>
		        <el-table-column label="序号" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.$index+1}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="油品品号" align="center" min-width="150">
		          <template slot-scope="scope">
		            <span>{{scope.row.oils_no_type}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="新价格" align="left" min-width="90">
		          <template slot-scope="scope">
		            <span style="display: flex;line-height: 36px;"><el-input v-model="scope.row.newPrice" placeholder="请输入" style="width: 100px;"></el-input>&nbsp;元/升</span>
		          </template>
		        </el-table-column>
		      </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ypjiageUp = false">取消</el-button>
        <el-button type="primary" @click="yptijiao()">提交</el-button>
      </div>
    </el-dialog>
    
    
    <!--添加商品组件-->
    <el-dialog :visible.sync="youpintj" title="油品添加" class="shenqingtj_tab tj2">
    	<add-oil @oilData="getDataOil" @shangpinT="guaTOil" :message="xuanzeOil" ref="add2"/>
		</el-dialog>
    
    <!--油站油价查询-->
    <el-dialog :visible.sync="ypjiageCha" title="油站油价查询" class="shenqing_tab">
      <el-form label-width="120px">
      		<div class="btn_box">
      			<el-form-item label="加油站" label-width="60px">
		          <el-select v-model="ypstations" placeholder="请选择" style="width: 200px" @change="chayouqiang">
						    <el-option
						      v-for="item in youzhan"
						      :key="item.id"
						      :label="item.name"
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
import { youzhanList,priceList,priceUp,priceO,yuoqiangPrice } from '@/api/shuju'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addOrder from './addOrder/add'
import addOil from './addOil/add'
export default {

  components: { Pagination,addOrder,addOil },
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
	    pickerOptions0: {
	      disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
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
	        changeType:''
	    },
	    jiageUp:false,
	    xuanzeShangpin:[],
	    data:{
	    	stationIdList:[],
	    	ogList:[],
	    	changeType:2,
	    	efficientTime:'',
	    },
	    
	    //商品添加组建
	    shangpintj:false,
	    
	    //商品变价的
	    bianjiade:false,
	    shangpinDetal:{},
	    shangpinDeList:[],
	    oilsGoodsChangePriceStationList:[],
	    
	    daitijiao:[],
	    
	    //油品变价的
	    ypjiageUp:false,
	    ypstation:'',
	    xuanzeOil:[],
	    youpintj:false,
	    ypshijian:'',
	    bianjiadeyp:false,
	    
	    //查询
	    ypjiageCha:false,
	    youqiang:[],
	    ypstations:'',
    }
  },
  created() {
	    this.getList()
  },
  methods: {
      getList() {
      	this.youzhanlist();
      	console.log(this.listQuery)
	  		priceList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
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
	    	priceList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
	    youzhanlist(){
	    	youzhanList({}).then(res=>{
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
	    handleSelectionChange(selection,row){
	    	this.daitijiao=selection;
	    },
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
	    		
	    		this.$refs.add1.childMethod(); 
	    	}else{
	    		
	    	}
	    	
	    	
	    	
	    },
	    tijiao(){
	    	if(this.xuanzeShangpin==[]){
	    		this.$notify({
	          title: '警告',
	          message: '请选择商品',
	          type: 'warning'
	        });
	    	}else{
	    		let flag=1;
		    	this.xuanzeShangpin.forEach((item)=>{
		    		if(item.newPrice<0){
		    			flag=-1
		    		}else if(item.newPrice==''){
		    			flag=-2
		    		}else if(!twoXiaoshu(item.newPrice)){
		    			flag=-3
		    		}
		    	})
		    	if(flag==-1){
		    		this.$notify({
		          title: '警告',
		          message: '价格不能小于0',
		          type: 'warning'
		        });
		    	}else if(flag==-2){
		    		this.$notify({
		          title: '警告',
		          message: '价格不能为空',
		          type: 'warning'
		        });
		    	}else if(flag==-3){
		    		this.$notify({
		          title: '警告',
		          message: '价格请输入整数+两位小数以内',
		          type: 'warning'
		        });
		    	}else if(flag==1){
		    		if(this.value5.length<=0){
		    			this.$notify({
			          title: '警告',
			          message: '请选择油站',
			          type: 'warning'
			        });
		    		}else if(this.value3==''){
		    			this.$notify({
			          title: '警告',
			          message: '请选择生效时间',
			          type: 'warning'
			        });
		    		}else if(this.xuanzeShangpin==[]){
		    			this.$notify({
			          title: '警告',
			          message: '请选择商品',
			          type: 'warning'
			        });
		    		}else{
		    			let data={
				    		stationIdList:this.value5,
					    	ogList:this.xuanzeShangpin,
					    	changeType:2,
					    	efficientTime:this.value3,
				    	}
				    	console.log(data)
				    	priceUp(data).then(()=>{
				    		this.$notify({
				          title: '成功',
				          type: 'success'
				        });
				        this.getList();
				        this.xuanzeShangpin=[];
				        this.jiageUp=false;
				    	}).catch(res => {
				    		console.log(res.response)
				    		this.$notify.error({
				          title: '错误',
				          message: res.response.data.error,
				        });
				      })
		    		}
		    	}
	    	}
	    },
	    
	    //添加商品组件传过来的值
			getData(val){
	        val.forEach((item)=>{
	        	item["newPrice"]='';
	        	item["oilsGoodsId"]=item.id;
	        	delete item["createTime"];
	        	this.xuanzeShangpin.unshift(item)
	        })
	        
	        
	        this.shangpintj=false
	        console.log(this.xuanzeShangpin)
	    },
	    //传完值之后关闭弹框
	    guaT(val){
	    	this.shangpintj=false
	    },
	    
	    spbj(idid){
	    	let data={
	    		id:idid
	    	}
	    	console.log(data)
	    	priceO(data).then(res=>{
	    		if(res.data.oilsGoodsChangePriceInfo.changeType==1){
	    			console.log(res)
	    			this.shangpinDetal=res.data.oilsGoodsChangePriceInfo;
	    			this.shangpinDeList=res.data.oilsGoodsList;
	    			this.oilsGoodsChangePriceStationList=res.data.oilsGoodsChangePriceStationList;
	    			this.bianjiade=true;
	    		}else if(res.data.oilsGoodsChangePriceInfo.changeType==2){
	    			console.log(res)
	    			this.shangpinDetal=res.data.oilsGoodsChangePriceInfo;
	    			this.shangpinDeList=res.data.oilsGoodsList;
	    			this.oilsGoodsChangePriceStationList=res.data.oilsGoodsChangePriceStationList;
	    			this.bianjiade=true;
	    		}
	    	}).catch(res => {
	    		console.log(res.response)
	    		this.$notify.error({
	          title: '错误',
	          message: res.response.data.error,
	        });
	      })
	    },
	    
	    
  		getDataOil(val){
  			
  			val.forEach((item)=>{
	        	item["newPrice"]='';
//	        	item["oilsGoodsId"]=item.id;
	        	delete item["createTime"];
	        	delete item["modify_time"];
	        	
	        	this.xuanzeOil.unshift(item)
	        })
  			this.youpintj=false
  		},
  		//传完值之后关闭弹框
	    guaTOil(val){
	    	this.youpintj=false
	    },
	    
	    ypshanchuD (){
	    	if(this.daitijiao.length>0){
	    		this.xuanzeOil.forEach((item,index)=>{
	    			this.daitijiao.forEach((is,i)=>{
	    				if(item.id==is.id){
	    					this.xuanzeOil.splice(index,1)
	    				}
	    			})
	    		})
	    		let leg = this.xuanzeOil.length
	    		for (let i = leg - 1; i >= 0; i--) {
				    for (let j = 0; j < this.daitijiao.length; j++) {
				        if (this.xuanzeOil[i]) {
				            if (this.xuanzeOil[i].id == this.daitijiao[j].id) {
//				                rightData.push(leftData[i])
				                this.xuanzeOil.splice(i, 1)
				                continue; //结束当前本轮循环，开始新的一轮循环
				            }
				        }
				    }
					}
	    		
	    		this.$refs.add2.childMethod(); 
	    	}else{
	    		
	    	}
	    },
	    
	    yptijiao(){
	    	if(this.xuanzeOil==[]){
	    		this.$notify({
	          title: '警告',
	          message: '请选择商品',
	          type: 'warning'
	        });
	    	}else{
	    		let flag=1;
		    	this.xuanzeOil.forEach((item)=>{
		    		if(item.newPrice<0){
		    			flag=-1
		    		}else if(item.newPrice==''){
		    			flag=-2
		    		}else if(!twoXiaoshu(item.newPrice)){
		    			flag=-3
		    		}
		    	})
		    	if(flag==-1){
		    		this.$notify({
		          title: '警告',
		          message: '价格不能小于0',
		          type: 'warning'
		        });
		    	}else if(flag==-2){
		    		this.$notify({
		          title: '警告',
		          message: '价格不能为空',
		          type: 'warning'
		        });
		    	}else if(flag==-3){
		    		this.$notify({
		          title: '警告',
		          message: '价格请输入整数+两位小数以内',
		          type: 'warning'
		        });
		    	}else if(flag==1){
		    		if(this.ypstation.length<=0){
		    			this.$notify({
			          title: '警告',
			          message: '请选择油站',
			          type: 'warning'
			        });
		    		}else if(this.ypshijian==''){
		    			this.$notify({
			          title: '警告',
			          message: '请选择生效时间',
			          type: 'warning'
			        });
		    		}else if(this.xuanzeOil==[]){
		    			this.$notify({
			          title: '警告',
			          message: '请选择商品',
			          type: 'warning'
			        });
		    		}else{
		    			let ogList=[];
		    			this.xuanzeOil.forEach(item=>{
		    				let datax={
		    					oilsGoodsId:item.id,
		    					newPrice:item.newPrice,
		    				}
		    				ogList.push(datax)
		    			})
		    			
		    			
		    			let data={
				    		stationIdList:this.ypstation,
					    	ogList:ogList,
					    	changeType:1,
					    	efficientTime:this.ypshijian,
				    	}
				    	console.log(data)
				    	priceUp(data).then(()=>{
				    		this.$notify({
				          title: '成功',
				          type: 'success'
				        });
				        this.getList();
				        this.xuanzeOil=[];
				        this.ypjiageUp=false;
				    	}).catch(res => {
				    		console.log(res.response)
				    		this.$notify.error({
				          title: '错误',
				          message: res.response.data.error,
				        });
				      })
		    		}
		    	}
	    	}
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
