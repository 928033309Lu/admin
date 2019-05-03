<template>
  <div class="app-container account_post">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" id="gwgl_tab">
        <el-form-item label="岗位管理" style="margin-top:0;"/>
        <el-button type="primary" @click="gangweiTj()">岗位添加</el-button>
      </div>
      <el-table :key="tableKey" :data="list" fit highlight-current-row style="width: 100%;">
        <el-table-column label="序号" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ list.length - scope.$index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岗位名称" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售数据" min-width="130" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_sales_data" disabled active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="gwXiugai(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="gwShan(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    <!--岗位添加弹框-->
    <el-dialog :visible.sync="gangweitianjia" title="岗位添加" class="gwgl_tab" >
      <el-form ref="gwtianjiaForm" :rules="rules" :model="gwtianjiaform" label-position="left" label-width="80px">
				<div class="left">
					<el-form-item label="岗位名称" prop="name" style="padding-bottom: 20px;">
	          <el-input v-model="gwtianjiaform.name" style="width:250px"/>
	        </el-form-item>
	        <h2 style="font-size:15px">微信公众号</h2>
	        <div style="margin-left: 60px;">
		        <el-form-item label="销售数据">
		          <el-switch
							  v-model="gwtianjiaform.is_sales_data"
							  active-color="#13ce66"
							  inactive-color="#cccccc"
							  active-value="1"
	    					inactive-value="0">
							</el-switch>
		        </el-form-item>
	        </div>
	        
	        
				</div>
				<div class="right">
					<el-form-item label="菜单"></el-form-item>
					<div class="shu">
						<el-tree
						  :data="treeList"
						  show-checkbox
						  node-key="name"
						  ref="tree"
						  :props="defaultProps">
						</el-tree>
					</div>
					
				</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gangweitianjia = false">取消</el-button>
        <el-button type="primary" @click="tijiaogangwei()">确认</el-button>
      </div>
    </el-dialog>
    
    
    <!--岗位修改弹框-->
    <el-dialog :visible.sync="gangweixiugai" title="岗位修改" class="gwgl_tab">
      <el-form ref="gwxiugaiForm" :rules="rules" :model="Detail" label-position="left" label-width="80px">
				<div class="left">
					<el-form-item label="岗位名称" prop="name" style="padding-bottom: 20px;">
	          <el-input v-model="Detail.name" style="width:250px"/>
	        </el-form-item>
	        <h2 style="font-size:15px">微信公众号</h2>
	        <div style="margin-left: 60px;">
		        <el-form-item label="销售数据" label-width="180px">
		          <el-switch
							  v-model="Detail.is_sales_data"
							  active-color="#13ce66"
							  inactive-color="#cccccc"
							  :active-value="1"
	    					:inactive-value="0">
							</el-switch>
		        </el-form-item>
	        </div>
	        
	        
				</div>
				<div class="right">
					<el-form-item label="菜单"></el-form-item>
					<div class="shu">
						<el-tree
						  :data="treeList"
						  show-checkbox
						  node-key="name"
						  ref="tree"
						  :props="defaultProps">
						</el-tree>
					</div>
					
				</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gangweixiugai = false">取消</el-button>
        <el-button type="primary" @click="xiugaiQ()">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { mwList,mwAdd,mwUp,quanxian,mwDetail,mwDel } from '@/api/zhanghu'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {

  components: { Pagination },
  data() {
    return {
    	listShan:false,
    	value1:"1",
	  	list: null,
	  	tableKey: 0,
	    total: 0,
      form: {
        name: ''
      },
      gwtianjiaform:{
      	name:'',
      	is_sales_data:0,
      	is_permit_check:0,
		  	is_permit_login:0,
		  	is_admin:1,
		  	is_backlog:0,
		  	//权限用的，获取选中的权限,要传的数组
				auth:[]
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	       	orderByCol:'',
	       	orderByType:''
	    },
	    importanceOptions:[1,2,3],
	    temp: {
	        importance: "",
	        title: '',
	    },
	    //按照岗位查询的传值
	    gangwei: {
	    	
	    },
	    //权限树形菜单列表
	    treeList: [],
	    defaultProps: {
	      children: 'children',
	      label: 'label'
	    },
			//权限用的，获取树形菜单中的最后一级的值
			treeLast:[],
			
			//岗位添加弹框
	    gangweitianjia: false,
	    //岗位修改弹框
	    gangweixiugai:false,
	    
	    //修改详情
	    Detail:{},
	    xiugaiId:'',
    }
  },
  created() {
	    this.getList()
	    this.quanxianList()
  },
  methods: {
  	 //岗位列表接口
      getList() {
      	mwList(this.listQuery).then(response => {
      		console.log(response)
      		this.list=response.data
	      })
	    },
	    
	    //岗位新增接口
	    gangweiTj(){
	    	this.gangweitianjia = true
	    },
	    tijiaogangwei(){
	    	this.digui(this.treeList)
	    	let shuzu=this.$refs.tree.getCheckedKeys();
	    	/*this.gwtianjiaform.auth=[];
	    	for (var s in this.treeLast) {  
          for (var x in shuzu) {           
              if (this.treeLast[s] == shuzu[x]) {  
              	this.gwtianjiaform.auth.push(this.treeLast[s]);
              	this.gwtianjiaform.auth=[...new Set(this.gwtianjiaform.auth)];
              }
          }
		    }*/
	    	this.gwtianjiaform.auth=shuzu;
	    	console.log(this.gwtianjiaform)
	    	this.$refs['gwtianjiaForm'].validate((valid) => {
	    		if(valid){
	    			console.log(this.gwtianjiaform.auth);
	          this.gwtianjiaform.auth=this.gwtianjiaform.auth.toString();
	          
	    			mwAdd(this.gwtianjiaform).then(response => {
      				if(response.data.message == '操作成功！'){
	    					this.$notify({
	    					  title: '成功',
	    					  message: '创建成功',
	    					  type: 'success',
	    					  duration: 2000
	    					})
	    					this.gangweitianjia = false
	    					this.getList();
	    				}else{
	    					this.$notify({
	    					  title: '失败',
	    					  message: response.data.message,
	    					  type: 'error',
	    					  duration: 2000
	    					})
	    					this.loading1 = false
	    				}
	    			})
	    		}
	    	})
	    },
      digui(lists){
      	let that=this
      	lists.forEach((item, index) => {
					if(item['children']){
						that.digui(item['children']);
					}else{
						this.treeLast.push(item["name"]);
					}
				});
      },
      //岗位权限接口
      quanxianList(){
      	quanxian().then(response => {
      		console.log(response)
	        this.treeList = response.data
	      })
      },
      //岗位修改详情接口
      gwXiugai(xId){
      	this.gangweixiugai = true
      	let data={
      		id:xId.id
      	}
      	this.xiugaiId=xId.id;
      	console.log(data);
      	mwDetail(data).then(res => {
      		console.log(res)
      		this.Detail=res.data
      		let str=res.data.auth.split(',');
      		console.log(str)
      		console.log(this.treeList)
      		this.$refs.tree.setCheckedKeys(str);
	      })
      },
      
      
      //确认修改
      xiugaiQ(){
      	this.digui(this.treeList);
	    	let shuzu=this.$refs.tree.getCheckedKeys();
	    	console.log(11111111111111)
	    	console.log(shuzu)
	    	let auths=[];
	    	// for (var s in this.treeLast) {  
	     //      for (var x in shuzu) {           
	     //          if (this.treeLast[s] == shuzu[x]) {  
	     //          	auths.push(this.treeLast[s]);
	     //          	auths=[...new Set(auths)];
	     //          }
	     //      }
		    // };
		    // console.log(auths)
		    this.$refs['gwxiugaiForm'].validate((valid) => {
	    		if(valid){
	          auths=shuzu.toString();
	          let data={
	          	id:this.xiugaiId,
	          	name:this.Detail.name,
	          	auth:auths,
	          	is_admin:1,
	          	is_permit_check:this.Detail.is_permit_check,
	          	is_permit_login:this.Detail.is_permit_login,
	          	is_sales_data:this.Detail.is_sales_data,
	          	is_backlog:this.Detail.is_backlog
	          }
	          console.log(data)
	    			mwUp(data).then(response => {
			            if(response.data.message == '操作成功！'){
							this.$notify({
							  title: '成功',
							  message: '修改成功',
							  type: 'success',
							  duration: 2000
							})
							this.gangweixiugai = false
							this.getList();
						}else{
							this.$notify({
							  title: '失败',
							  message: response.data.message,
							  type: 'error',
							  duration: 2000
							})
							this.loading1 = false
						}
	      			})
	    		}
	    	})
		    
      },
      
      //岗位查看接口
      gwChakan(){
      	quanxian().then(response => {
      		
	      })
      },
      //岗位删除接口
      gwShan(xId){
      	this.open2(xId);
      },
      open2(idid) {
      	let data={
      		id:idid.id
      	}
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	mwDel(data).then(response => {
      			this.$notify({
		          message: '删除成功',
		          type: 'success',
		          duration:1500
		        });
		        this.getList();
	      	})
          
        }).catch(() => {
          this.$notify.info({
	          message: '已取消删除',
	          duration:2000
	        });
        });
      },
	    sortChange(data) {
	      
	    },
	    
  }
}
</script>

<style scoped>
	@import url("./post.scss");
</style>
