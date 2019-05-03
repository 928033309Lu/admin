<template>
  <div class="app-container account">
    <el-form ref="form" :model="form" label-width="110px">
      <div class="top">
        <el-form-item label="商户管理" style="margin-bottom: 0;"/>
        <el-button type="primary" >
          <router-link to="account-examine">
            商户审核
          </router-link>
        </el-button>
      </div>
      <div class="seachs">
        <el-input v-model="wheress" ref="sousuo" style="width: 240px;"/>
        <el-button type="primary" icon="el-icon-search" @click="where()">搜索</el-button>
      </div>

      <el-table v-loading="listLoading" :key="tableKey" :data="list" fit highlight-current-row style="width: 100%;border-top: 30px solid #f6f7fb;" @sort-change="sortChange">
        <!-- <el-table-column label="平台账户" prop="id" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.platform }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="公司名称" min-width="90px" align="center">
          <template slot-scope="scope" >
            <span>{{ scope.row.company_name }}</span> <!--scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}'-->
          </template>
        </el-table-column>
        <el-table-column label="公司简称" min-width="100" sortable="custom" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.short_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="油站数量" min-width="100" sortable="custom" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.station_num }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="运营中" min-width="90" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="法人" min-width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.corporation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司电话" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.telephone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time  | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <!--<router-link :to="{path:'merchant-accountdetail', query:{id:scope.row.id}}">-->
              <el-button type="primary" size="mini" @click="xiangqingye(scope.row)">查看</el-button>
            <!--</router-link>-->
            <!-- <el-button size="mini" type="info" @click="xiugaiVisible=true;tianjia=scope.row">修改
            </el-button> -->
            <el-button size="mini" type="info" @click="xiugaiye(scope.row)">修改
            </el-button>
            <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">冻结 -->
            <!-- </el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>

    <el-dialog :visible.sync="dialogFormVisible" title="添加商户">
      <el-form ref="dataForm" :rules="rules" :model="tianjia" label-position="right" label-width="110px">
        <div class="up">
          <div class="left">
            <el-form-item label="公司名称" prop="company_name">
              <el-input v-model="tianjia.company_name"/>
            </el-form-item>
            <el-form-item label="座机" prop="telephone">
              <el-input v-model="tianjia.telephone"/>
            </el-form-item>
            <el-form-item label="法人" prop="corporation">
              <el-input v-model="tianjia.corporation"/>
            </el-form-item>
            <el-form-item label="法人身份证" prop="id_front_img">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"/>
                <div class="el-upload__text">上传头像面，<em>点击上传</em></div>
              </el-upload>
            </el-form-item>

            <el-form-item label="营业执照" prop="license_imgr">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"/>
                <div class="el-upload__text"><em>点击上传</em></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="平台账号" prop="platform">
              <el-input v-model="tianjia.platform"/>
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="公司邮箱" prop="emial">
              <el-input v-model="tianjia.emial"/>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="tianjia.phone" maxlength="11"/>
            </el-form-item>
            <el-form-item label="座机" prop="telephone2">
              <el-input v-model="tianjia.telephone2"/>
            </el-form-item>
            <el-form-item label="" prop="id_back_img">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"/>
                <div class="el-upload__text">上传国徽面，<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
          </div>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="seeVisible" title="商户详情" width="60%">
        <div class="screen">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="tianjia"
            label-position="right"
            label-width="110px"
            >
            <div class="up">
                <div class="left">
                <el-form-item label="公司名称" prop="company_name">
                    <el-input v-model="tianjia.company_name"/>
                </el-form-item>
                <el-form-item label="公司简称" prop="short_name">
                    <el-input v-model="tianjia.short_name"/>
                </el-form-item>
                <el-form-item label="座机" prop="telephone">
                    <el-input v-model="tianjia.telephone"/>
                </el-form-item>
                <el-form-item label="法人" prop="corporation">
                    <el-input v-model="tianjia.corporation"/>
                </el-form-item>
                
                <el-form-item label="法人身份证">
                    <img :src="tianjia.id_front_img" class="avatar">
                    <!-- <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="idFrontImg">
                    <img v-if="tianjia.id_front_img" :src="tianjia.id_front_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传头像面</i>
                    </el-upload> -->
                    <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">上传头像面，
                        <em>点击上传</em>
                    </div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item>
                    <img :src="tianjia.id_back_img" class="avatar">
                    <!-- <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="idBackImg">
                    <img v-if="tianjia.id_back_img" :src="tianjia.id_back_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传国徽面</i>
                    </el-upload> -->
                    <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">上传国徽面，
                        <em>点击上传</em>
                    </div>
                    </el-upload> -->
                </el-form-item>
                
                </div>
                <div class="right">
                <el-form-item label="平台账号" prop="platform">
                    <el-input v-model="tianjia.platform"/>
                </el-form-item>
                <el-form-item label="公司邮箱" prop="emial">
                    <el-input v-model="tianjia.emial"/>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="tianjia.phone" maxlength="11"/>
                </el-form-item>
                <el-form-item label="座机" prop="telephone2">
                    <el-input v-model="tianjia.telephone2"/>
                </el-form-item>
                <el-form-item label="统一社会信用码" prop="social_code">
                    <el-input v-model="tianjia.social_code"/>
                </el-form-item>
                <el-form-item label="营业执照" >
                     <img :src="tianjia.license_imgr" class="avatar">
                    <!-- <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="addhandleAvatarSuccess">
                    <img v-if="tianjia.license_imgr" :src="tianjia.license_imgr" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">营业执照</i>
                    </el-upload> -->
                    <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">营业执照，
                        <em>点击上传</em>
                    </div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="登陆账户">
                    <el-input v-model="tianjia.phone"/>
                </el-form-item>
                <el-form-item label="原因" v-if="tianjia.status==-1">
                    <el-input v-model="tianjia.remark"/>
                </el-form-item>
                </div>
            </div>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button  type="primary" @click="seeVisible=false">关闭</el-button>
        </div>
    </el-dialog> 
    <el-dialog :visible.sync="xiugaiVisible" title="商户修改" width="90%">
        <div class="screen">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="tianjia"
            label-position="right"
            label-width="110px"
            >
            <div class="up">
                <div class="left">
                <el-form-item label="公司名称" prop="company_name">
                    <el-input v-model="tianjia.company_name"/>
                </el-form-item>
                <el-form-item label="公司简称" prop="short_name">
                    <el-input v-model="tianjia.short_name"/>
                </el-form-item>
                <el-form-item label="座机" prop="telephone">
                    <el-input v-model="tianjia.telephone"/>
                </el-form-item>
                <el-form-item label="法人" prop="corporation">
                    <el-input v-model="tianjia.corporation"/>
                </el-form-item>
                
                <el-form-item label="法人身份证">
                    <!-- <img :src="tianjia.id_front_img" class="avatar"> -->
                    <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="idFrontImg">
                    <img v-if="tianjia.id_front_img" :src="tianjia.id_front_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传头像面</i>
                    </el-upload>
                    <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">上传头像面，
                        <em>点击上传</em>
                    </div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item>
                    <!-- <img :src="tianjia.id_back_img" class="avatar"> -->
                    <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="idBackImg">
                    <img v-if="tianjia.id_back_img" :src="tianjia.id_back_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">上传国徽面</i>
                    </el-upload>
                    <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">上传国徽面，
                        <em>点击上传</em>
                    </div>
                    </el-upload> -->
                </el-form-item>
                
                </div>
                <div class="right">
                <el-form-item label="平台账号" prop="platform">
                    <el-input v-model="tianjia.platform"/>
                </el-form-item>
                <el-form-item label="公司邮箱" prop="emial">
                    <el-input v-model="tianjia.emial"/>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="tianjia.phone" maxlength="11"/>
                </el-form-item>
                <el-form-item label="座机" prop="telephone2">
                    <el-input v-model="tianjia.telephone2"/>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="social_code">
                    <el-input v-model="tianjia.social_code"/>
                </el-form-item>
                <el-form-item label="营业执照" >
                     <!-- <img :src="tianjia.license_imgr" class="avatar"> -->
                    <el-upload
                    class="avatar-uploader"
                    action="https://httpbin.org/post"
                    :show-file-list="false"
                    :on-success="addhandleAvatarSuccess">
                    <img v-if="tianjia.license_imgr" :src="tianjia.license_imgr" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">营业执照</i>
                    </el-upload>
                    <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">营业执照，
                        <em>点击上传</em>
                    </div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="登陆账户">
                    <el-input v-model="tianjia.phone"/>
                </el-form-item>
                <el-form-item label="原因" v-if="tianjia.status==-1">
                    <el-input v-model="tianjia.remark"/>
                </el-form-item>
                </div>
            </div>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button  type="primary" @click="baocun">保存</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
//import { shanghuList, fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { shanghuList, createArticle, del, wheres  } from '@/api/shanghu'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { updateCompanyById } from '@/api/shanghuguanli'
import axios from "axios";

export default {

  components: { Pagination },
  data() {
    return {
      list: null,
      wheress:'',
      tableKey: 0,
      listLoading: true,
	    total: 0,
      form: {
        name: ''
      },
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
					status: 1
	    },
	    tianjia: {
	        company_name:'',
	        telephone:'',
	        corporation:'',
	        platform:'',
	        emial:'',
	        phone:'',
	        telephone2:'',
	        id_back_img:'',
	        id_front_img:'',
	        license_imgr:''
	    },
	    rules: {
        company_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        telephone: [{ required: true, message: '不能为空', trigger: 'blur' }],
        corporation: [{ required: true, message: '不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        emial: [{ required: true, message: '不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '不能为空', trigger: 'blur' }],
        telephone2: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      seeVisible:false,
      xiugaiVisible:false,
    }
  },
  created() {
	    this.getList();
  },
  methods: {
 		onSubmit() {
   	  console.log('submit!');
  	},
  	//商户列表
  	getList() {
      this.listLoading = true;
	      shanghuList(this.listQuery).then(response => {
	      	console.log(response);
	        this.list = response.data.rows;
					this.total = response.data.total;
	        setTimeout(() => {
	          this.listLoading = false
	        }, 1 * 300)
	      })
	    },
	    handleAdd() {
        // this.dialogFormVisible = true
        
	    },
	    sortChange(data) {
	      
	    },
	    //添加商户
	    createData() {
	      this.$refs['dataForm'].validate((valid) => {
	        if (valid) {
	          createArticle(this.tianjia).then(() => {
	          	this.list.unshift(this.tianjia)
	          	this.$refs['dataForm'].resetFields();
	            this.dialogFormVisible = false
	            this.$notify({
	              title: '成功',
	              message: '创建成功',
	              type: 'success',
	              duration: 2000
	            })
	          })
	        }
	      })
	    },
	    del(id){
	    	del(id).then(response => {
	      	console.log(response);
	      })
	    },
	    where(){
        // account-examine
	    	// if(this.wheress){
          var data = {
            company_name:this.wheress,
            status:1
          }
          wheres(data)
            .then(res => {
              console.log(res.data)
              this.list = res.data
            })
	    	// }
      //       else{
	    	// 	this.$message.error('搜索内容不能为空');
	    	// }
	    },
	    xiangqingye(row) {
        // console.log(id)
        this.$router.push({
          name:'accountSee',
          query:{
            id:row.id,
          }
        })
        // this.seeVisible = true
        // this.tianjia = row

        // this.$router.push({
        //     path: 'merchant-accountdetail', 
        //     name: 'merchantaccdetailDemo',
        //     params: { 
        //       name: 'name', 
        //       dataObj: id
        //     }
            
        // })
      },
      xiugaiye(row){
        this.$router.push({
          name:'accountSet',
          query:{
            id:row.id,
          }
        })
      },
      baocun(){
        var data = this.tianjia
        data.create_time = new Date(this.tianjia.create_time)
        if (data.register_date) {
          data.register_date = new Date(this.tianjia.register_date)
        }
        console.log(data)
        updateCompanyById(data)
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    this.$message.error('修改失败');
                }else{
                  this.xiugaiVisible=false
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  });
                }
            })
      },
      //营业执照
    addhandleAvatarSuccess(res, file) {
      // URL.createObjectURL(file.raw);
      var images="http://shiy.wsuns.com/upload/upload/"
      var tupian=''
      var file =  file.raw;
      var formData = new FormData();
      formData.append("imgUpload",file);
      var that = this
      axios
        .post(
          "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",formData
        )
        .then(function(response) {
          tupian=images+response.data.imgPath
          that.tianjia.license_imgr = tupian
        })
        .catch(function(error) {

        })
    },
    //身份证正面
    idFrontImg(res, file) {
      // URL.createObjectURL(file.raw);
      var images="http://shiy.wsuns.com/upload/upload/"
      var tupian=''
      var file =  file.raw;
      var formData = new FormData();
      formData.append("imgUpload",file);
      var that = this
      axios
        .post(
          "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",formData
        )
        .then(function(response) {
          tupian=images+response.data.imgPath
          that.tianjia.id_front_img = tupian
        })
        .catch(function(error) {

        })
    },
    //身份证反面
    idBackImg(res, file) {
      // URL.createObjectURL(file.raw);
      var images="http://shiy.wsuns.com/upload/upload/"
      var tupian=''
      var file =  file.raw;
      var formData = new FormData();
      formData.append("imgUpload",file);
      var that = this
      axios
        .post(
          "http://shiy.wsuns.com/upload/jquery/cross/iframeupload",formData
        )
        .then(function(response) {
          tupian=images+response.data.imgPath
          that.tianjia.id_back_img = tupian
        })
        .catch(function(error) {

        })
    },
  }
}
</script>
<style type="text/css" scoped>
	@import url("./account.scss");
</style>
