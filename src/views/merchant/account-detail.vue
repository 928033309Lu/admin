<template>
  <div class="app-container account-detail">
    <el-form label-position="right" label-width="105px" class="shangForm" :model="xiangqing">
      <div class="top upzs">

        <router-link to="merchant-account">
          <i class="el-icon-arrow-left"/>
        </router-link>
        <el-form-item label="商户详情"/>
      </div>
      <div class="up">
        <div class="left">
          <el-form-item label="平台账号">{{xiangqing.platform}}</el-form-item>
          <el-form-item label="商户名称" >{{xiangqing.company_name}}</el-form-item>
          <el-form-item label="法人" >{{xiangqing.corporation}}</el-form-item>
          <el-form-item label="法人身份证" class="pic">
            <img src="../../../build/logo.png" class="tupian">
            <img src="../../../build/logo.png" class="tupian">
          </el-form-item>
          <el-form-item label="营业执照" class="pic">
            <img src="../../../build/logo.png" class="tupian">
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="座机" >{{xiangqing.telephone}}</el-form-item>
          <el-form-item label="手机" >{{xiangqing.phone}}</el-form-item>
          <el-form-item label="商户KEY" >{{xiangqing.company_num}}</el-form-item>
          <el-form-item label="公司邮箱" >{{xiangqing.emial}}</el-form-item>

        </div>
      </div>
    </el-form>

    <el-form ref="form" :model="form" label-width="110px">
      <div class="top upzs qufen">
        <el-form-item label="授权账户" style="margin-bottom: 0;padding: 10px 0;"/>
      </div>

      <el-table v-loading="listLoading" :key="tableKey" :data="list" fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
        <el-table-column label="账号" prop="id" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" min-width="90px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" min-width="100" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>备注</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="150" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">
              停用
            </el-button>

            <el-button size="mini" type="danger" @click="">
              冻结
            </el-button>

            <el-button size="mini" type="danger" @click="">
              重设密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-form>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { xiangqing } from '@/api/shanghu'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {

  components: { Pagination },
  data() {
    return {
      list: null,
      tableKey: 0,
      listLoading: true,
	    total: 0,
	    library_id:'',
      form: {
        name: ''
      },
      huoqu:{
      	companyID:''
      },
      xiangqing:{
      	
      },
      listQuery: {
	        page: 1,
	        limit: 20,
	        importance: undefined,
	        title: undefined,
	        type: undefined,
	        sort: '+id'
	    },
	    dialogFormVisible: false
    }
  },
  created() {
	    this.getList();
	    this.getplat();
  },
  methods: {
     	onSubmit() {
       	  console.log('submit!')
      },
      //账户列表页
      getList() {
      	this.listLoading = true
	      fetchList(this.listQuery).then(response => {
	        this.list = response.data.items
	        this.total = response.data.total
	        setTimeout(() => {
	          this.listLoading = false
	        }, 1 * 1000)
	      })
	    },
	    //商户详情
	    getplat(){
	    	this.huoqu.companyID = this.$route.params.dataObj;
	    	console.log(this.huoqu);
	    	xiangqing(this.huoqu).then(response => {
	        console.log(response);
	        this.xiangqing=response.data;
	        console.log(this.xiangqing);
	      })
	    	
	    },
	    handleAdd() {
	      this.dialogFormVisible = true
	    },
	    sortChange(data) {
	      
	    },
  }
}
</script>

<style scoped>
	@import url("./account-detail.scss");

</style>
