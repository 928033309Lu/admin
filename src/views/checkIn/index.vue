<template>
  <div class="warp">
    <el-dialog
      class="errorDialog"
      v-if="tianjia.status == -1"
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div style="text-align: center;">
        <h4><i class="el-icon-warning" style="font-size: 30px;color:#ff9900;"></i>审核失败</h4>
        <span>{{ tianjia.remark }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="header">
      <h3> 
        <div>商户申请</div>
        <div><el-button type="primary" @click="logout">退出登录</el-button></div> 
      </h3>
    </div>
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="tianjia"
      label-position="right"
      label-width="150px"
    >
    <div class="shang">
      
            <h3>
                <span class="shu"></span>基本信息<span class="tishi">基本信息将用于入住后的重要通知，如油站用户添加、重要消息通知等</span>
            </h3>
      <div class="up">
        <div class="left">
          <el-form-item label="公司名称" prop="company_name" label-width="90px">
            <el-input  v-if="status!=0" v-model="tianjia.company_name"/>
              <el-input v-if="status==0" v-model="tianjia.company_name" disabled/>
          </el-form-item>
          <el-form-item label="公司简称" prop="short_name" label-width="90px">
            <el-input v-if="status!=0"  v-model="tianjia.short_name"/>
              <el-input v-if="status==0"  v-model="tianjia.short_name" disabled/>
          </el-form-item>
          <!-- <el-form-item label="公司地址" prop="short_name" label-width="90px">
            <el-input v-if="status!=0"  v-model="tianjia.short_name"/>
              <el-input v-if="status==0"  v-model="tianjia.short_name" disabled/>
          </el-form-item> -->
          <el-form-item label="公司电话" prop="telephone" label-width="90px">
            <el-input v-if="status!=0" v-model="tianjia.telephone"/>
             <el-input v-if="status==0" v-model="tianjia.telephone" disabled/>
          </el-form-item>
        </div>
        <div class="right">
          <!-- <el-form-item label="平台账号" prop="platform">
            <el-input v-model="tianjia.platform"/>
          </el-form-item>
          <el-form-item label="公司邮箱" prop="emial">
            <el-input v-model="tianjia.emial"/>
          </el-form-item> -->
             <el-form-item label="法人" prop="corporation">
            <el-input v-if="status!=0"  v-model="tianjia.corporation"/>
               <el-input v-if="status==0"  v-model="tianjia.corporation" disabled/>
          </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
            <el-input  v-if="status!=0" v-model="tianjia.idCard"/>
             <el-input  v-else-if="status==0" v-model="tianjia.idCard" disabled/>
             <el-input  v-else v-model="tianjia.idCard" />
          </el-form-item>
          <!-- <el-form-item label="手机" prop="phone">
            <el-input v-model="tianjia.phone" maxlength="11"/>
          </el-form-item> -->
          <!-- <el-form-item label="座机" prop="telephone2">
            <el-input v-model="tianjia.telephone2"/>
          </el-form-item> -->
          <el-form-item label="统一社会信用代码" prop="social_code">
            <el-input  v-if="status!=0"  v-model="tianjia.social_code"/>
             <el-input  v-if="status==0"  v-model="tianjia.social_code" disabled/>
          </el-form-item>
     
         
        </div>
      </div>
      </div>
         <div class="xia">
             <h3>
                <span class="shu"></span>相关证件
            </h3>
            <div class="box1">
              <p><span class="bitian">*</span>法人身份证<span class="tishi">法人身份信息是商户入住审核的必备条件</span></p>
                <el-form-item label-width="0">
              <el-upload
                class="avatar-uploader"
                action="https://httpbin.org/post"
                :show-file-list="false"
                v-if="status!=0" 
                :before-upload="()=>{loading1 = true;tianjia.id_front_img = ''}"
                :on-success="idFrontImg">
                <img   v-if="tianjia.id_front_img" :src="tianjia.id_front_img" class="avatar">
                <i v-loading="loading1" v-else class="el-icon-plus avatar-uploader-icon">身份证照片面</i>
                <el-button v-if="tianjia.id_front_img" class="submit" size="small" type="primary">重新上传</el-button>
              </el-upload>
              <img   v-if="status==0"  :src="tianjia.id_front_img" class="avatar">
         
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
          <el-form-item label-width="0" style="margin-left: 30px">
            <el-upload
              class="avatar-uploader"
              action="https://httpbin.org/post"
              :show-file-list="false"
              v-if="status!=0"
              :before-upload="()=>{loading2 = true;tianjia.id_back_img = ''}"
              :on-success="idBackImg">
              <img v-if="tianjia.id_back_img" :src="tianjia.id_back_img" class="avatar">
              <i v-loading="loading2" v-else class="el-icon-plus avatar-uploader-icon">身份证国徽面</i>
              <el-button v-if="tianjia.id_back_img" class="submit" size="small" type="primary">重新上传</el-button>
            </el-upload>
            <img v-if="status==0" :src="tianjia.id_back_img" class="avatar">
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
          <div class="box">
              <p><span class="bitian">*</span>营业执照<span class="tishi">请提供《营业执照》且经营范围包含油品业务</span></p>
               <el-form-item label-width="0">
            <el-upload
              class="avatar-uploader"
              action="https://httpbin.org/post"
              :show-file-list="false"
              v-if="status!=0"
              :before-upload="()=>{loading3 = true;tianjia.license_imgr = ''}"
              :on-success="addhandleAvatarSuccess">
              <img v-if="tianjia.license_imgr" :src="tianjia.license_imgr" class="avatar">
              <i v-loading="loading3" v-else class="el-icon-plus avatar-uploader-icon">营业执照</i>
              <el-button v-if="tianjia.license_imgr" class="submit" size="small" type="primary">重新上传</el-button>
            </el-upload>
             <img v-if="status==0" :src="tianjia.license_imgr" class="avatar">
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
                    
            </div>
            <p> <el-form-item label="原因" v-if="status==-1" prop="remark" label-width="50px">
                <span>{{yuanyin.remark}}</span>
            <!-- <el-input v-model="yuanyin.remark"/> -->
          </el-form-item></p>
    </div>
   
    </el-form>
 
    <div slot="footer" class="dialog-footer a">
      <el-button type="primary" v-if="status==0">资质审核中</el-button>
        <el-button type="primary" v-else-if="status==-1" @click="retijiao">重新提交</el-button>
      <el-button type="primary" v-else @click="tijiao">提交审核</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { settled } from '@/api/zhuce'
import { getCompany,chongxintijiao } from '@/api/zhuce'
import validTools from '@/utils/validTools';
import { scrollTo } from '@/utils/scrollTo'
export default {
  data() {
    var idCardRules =  (rule, value, callback) => {
      validTools('idCard', value, callback)
    };
    var credit =  (rule, value, callback) => {
      validTools('credit', value, callback)
    };
    return {
      yuanyin:{},
      tianjia: {
        company_name: "",
        telephone: "",
        corporation: "",
        platform: "",
        emial: "",
        phone: "",
        telephone2: "",
        id_back_img: "",
        id_front_img: "",
        license_imgr: "",
        short_name:'',
        social_code:'',
        idCard:'',
      },
      loading1:false,
      loading2:false,
      loading3:false,
      centerDialogVisible:true,
      idc:"",
      status:null,
      rules: {
        company_name: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        telephone: [{ required: true, message: "不能为空", trigger: "blur" }],
        corporation: [{ required: true, message: "不能为空", trigger: "blur" }],
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        emial: [{ required: true, message: "不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "不能为空", trigger: "blur" }],
        // telephone2: [{ required: true, message: "不能为空", trigger: "blur" }],
        idCard: [{ required: true, message: "不能为空", trigger: "blur" },{ validator: idCardRules, trigger: 'blur' }],
        // short_name: [{ required: true, message: "不能为空", trigger: "blur" }],
        social_code: [{ required: true, message: "不能为空", trigger: "blur" },{ validator: credit, trigger: 'blur' }],
      }
    };
  },
  mounted() {
    this.get()
  },
  methods: {
    get(){
      var data = {}
      getCompany(data)
				.then(response => {
          console.log(response.data)
          // console.log(response.data.checkStatus.status)
          if(response.data.checkStatus.status==0){
            this.status = response.data.checkStatus.status
            this.tianjia = response.data.companyInfo
            this.tianjia.idCard=response.data.id_card
            // console.log(this.tianjia)
          }
           if(response.data.checkStatus.status==-1){
            this.status = response.data.checkStatus.status
            this.tianjia = response.data.companyInfo
            this.yuanyin=response.data.checkStatus
            this.tianjia.idCard=response.data.id_card
            // console.log(this.tianjia)
          }
				})
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    tijiao(){
      this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            delete this.tianjia.create_time
            var data = this.tianjia
            if(this.status==-1){
              this.tianjia.status = 0
            }
            settled(data)
              .then(response => {
                console.log(response.data)
                if(response.data.message){
                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  });
                  this.status = 0
                  this.get()
                }
              })
          }else{
            scrollTo(0,500)
        }
      })
      
    },
    retijiao(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          delete this.tianjia.create_time
          var data = this.tianjia
          if(this.status==-1){
            this.tianjia.status = 0
          }
           chongxintijiao(data)
            .then(response => {
              console.log(response.data)
              if(response.data){
                this.$message({
                  message: response.data,
                  type: 'success'
                });
                this.status = 0
                this.get()
              }
            })
        }else{
          scrollTo(0,500)
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
};
</script>

<style scoped>
	@import url("./index.scss");
</style>
