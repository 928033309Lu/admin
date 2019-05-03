<template>
	<div class="app-container new_member">
	    <el-form label-position="left" label-width="80px" class="shangForm">
	      <div class="upzs">
	      	<router-link to="query">
	          <i class="el-icon-arrow-left"/>
	        </router-link>
	        <el-form-item label="新增会员" label-width="170px"/>
	      </div>
	      <div class="top">
	      	<el-form-item label="单位档案信息" label-width="170px"/>
	      </div>
	      <div class="dangan">
	      	<el-form-item label="单位名称">
	          <el-select v-model="listQuery.importance" clearable class="filter-item" placeholder="Please select">
	            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="证件类型">
	          <el-select v-model="listQuery.importance" clearable class="filter-item" placeholder="Please select">
	            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="联系人电话">
	          <el-input v-model="form.name" placeholder=""/>
	        </el-form-item>
	        
	        <el-form-item label="所属行业">
	          <el-select v-model="listQuery.importance"  clearable class="filter-item" placeholder="Please select">
	            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="证件号码">
	          <el-input v-model="form.name" placeholder=""/>
	        </el-form-item>
	        <el-form-item label="联系人姓名">
	          <el-input v-model="form.name" placeholder=""/>
	        </el-form-item>
	        
	        <el-form-item label="所在省份">
	          <el-select v-model="listQuery.importance"  clearable class="filter-item" placeholder="Please select">
	            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="单位电话">
	          <el-input v-model="form.name" placeholder=""/>
	        </el-form-item>
	        <el-form-item label="联系人生日">
	          <el-input v-model="form.name" placeholder=""/>
	        </el-form-item>
	        
	        <el-form-item label="所在地区">
	          <el-select v-model="listQuery.importance"  clearable class="filter-item" placeholder="Please select">
	            <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="详细地址">
	          <el-input v-model="form.name" placeholder=""/>
	        </el-form-item>
	      </div>
	      <div class="top">
	      	<el-form-item label="折扣限制规则" label-width="170px"/>
	      </div>
	      <div class="guize">
	      	<div class="left">
	      		<el-form-item label="是否启用积分" label-width="100px">
	      			<el-radio-group v-model="jifen">
			          <el-radio label="1">是</el-radio>
	  				  <el-radio label="2">否</el-radio>
	  				</el-radio-group>
		        </el-form-item>
		        <el-form-item label="限制商品" label-width="100px">
	      			<el-radio-group v-model="xianzhi">
			          <el-radio label="1">是</el-radio>
	  				  <el-radio label="2">否</el-radio>
	  				</el-radio-group>
		        </el-form-item>
		        <el-form-item label="可购商品" label-width="100px" class="shangxia">
	      			<div class="kuangk">
	      				
	      			</div>
		        </el-form-item>
		        <el-form-item label="限制油站" label-width="100px">
	      			<el-radio-group v-model="xzyz">
			          <el-radio label="1">是</el-radio>
	  				  <el-radio label="2">否</el-radio>
	  				</el-radio-group>
		        </el-form-item>
		        <el-form-item label="定点油站" label-width="100px" class="shangxia">
	      			<div class="kuangk">
	      				
	      			</div>
		        </el-form-item>
	      	</div>
	      	<div class="right">
	      		<el-form-item label="" label-width="0" class="yueding">
	      			约定月消费&nbsp;
	      			<el-input v-model="form.name" placeholder=""/>
	      			&nbsp;元
		        </el-form-item>
		        <el-form-item label="限制油品" label-width="100px">
	      			<el-radio-group v-model="xianzhiyp">
			          <el-radio label="1">是</el-radio>
	  				  <el-radio  label="2">否</el-radio>
	  				</el-radio-group>
		        </el-form-item>
		        <el-form-item label="可购油品" label-width="100px" class="shangxia">
	      			<div class="kuangk">
	      				
	      			</div>
		        </el-form-item>
		        <el-form-item label="消费折扣" label-width="100px">
	      			<el-radio-group v-model="xiaofeizhekou">
			          <el-radio label="1">是</el-radio>
	  				  <el-radio label="2">否</el-radio>
	  				</el-radio-group>
		        </el-form-item>
		        <el-form-item label="折扣金额" label-width="100px" class="shangxia">
	      			<div class="kuangk">
	      				
	      			</div>
		        </el-form-item>
		        <el-button type="primary">新增</el-button>
	      	</div>
	      </div>
	    </el-form>
	</div>
</template>

<script>
	import { fetchList} from '@/api/article'
	export default {
		data() {
		    return {
		    	//积分单选
		    	jifen:"2",
		    	//限制商品单选
		    	xianzhi:"2",
		    	//限制油站单选
		    	xzyz:"2",
		    	//限制油品单选
		    	xianzhiyp:"2",
		    	//消费折扣单选
		    	xiaofeizhekou:"2",
		    	
		    	
		    	
		  		list: null,
		      	tableKey: 0,
		      	listLoading: true,
			    total: 0,
			    form: {
			       name: ''
			    },
			    listQuery: {
			        importance: undefined,
			    },
			    importanceOptions: [1, 2, 3]
		    }
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
	      	  this.listLoading = true
		      	fetchList(this.listQuery).then(response => {
		        this.list = response.data.items
		        this.total = response.data.total
	
		      })
		    },
		}
	}
</script>

<style scoped>
	@import url("./new_member.scss");
</style>