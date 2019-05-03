<template>
  <div class="warp">
    <div class="header">
        <h3><el-button circle>
            <router-link to="merchant-account">
                <i class="el-icon-arrow-left"></i>
            </router-link>
        </el-button>商户审核</h3>
    </div>
    <div class="main">
        <div class="biao">
            <div class="table">
                <el-table
					v-loading="loading"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                    prop="company_name"
                    label="公司名称" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="short_name"
                    label="公司简称" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="corporation"
                    label="法人" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="注册手机" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="telephone"
                    label="公司电话" align="center">
                    </el-table-column>
                    <el-table-column
                    label="申请时间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==0">待审核</span>
                        <span v-show="scope.row.status==-1">审核失败</span>
                    </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="get" />
        </div>
    </div>
    <el-dialog :visible.sync="seeVisible" title="商户申请" width="1080px">
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
                                <el-input v-model="tianjia.company_name" disabled/>
                            </el-form-item>
                            <el-form-item label="公司简称" prop="short_name">
                                <el-input v-model="tianjia.short_name" disabled/>
                            </el-form-item>
                            <el-form-item label="公司电话" prop="telephone">
                                <el-input v-model="tianjia.telephone" disabled/>
                            </el-form-item>
                                 <el-form-item label="登陆账户">
                                <el-input v-model="tianjia.phone" disabled/>
                            </el-form-item>
                        </div>
                        <div class="right">
                             <el-form-item label="法人" prop="corporation">
                                <el-input v-model="tianjia.corporation" disabled/>
                            </el-form-item>
                               <el-form-item label="身份证号" prop="corporation">
                                <el-input v-model="tianjia.idCard" disabled/>
                            </el-form-item>
                            <el-form-item label="统一社会信用代码" prop="social_code">
                                <el-input v-model="tianjia.social_code" disabled/>
                            </el-form-item>
                          
                        </div>
                    </div>
                    <div class="down">
                           <el-form-item label="法人身份证">
                                <img :src="tianjia.id_front_img" class="avatar">
                                  <img :src="tianjia.id_back_img" class="avatar">
                            </el-form-item>
                       <el-form-item label="营业执照">
                                <img :src="tianjia.license_imgr" class="avatar">
                            </el-form-item>
                    </div>  
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="jujueVisible=true">拒绝</el-button>
          <el-button  type="primary" @click="ent">确认</el-button>
          <el-button  type="primary" @click="seeVisible=false">关闭</el-button>
        </div>
    </el-dialog> 
    <el-dialog :visible.sync="jujueVisible" title="拒绝" width="50%">
        <div class="screen" style="text-align: center;">
            <el-input v-model="tianjia.remark"/>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button  type="primary" @click="jujueEnt" >确认</el-button>
        </div>
    </el-dialog> 
  </div>
</template>
<script>
    import { getCompanyByWhere,shenhexiangqing} from '@/api/shanghuguanli'
    import { updateCompanyById } from '@/api/shanghuguanli'
    import { parseTime } from '@/utils'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import axios from "axios";
// account-examine

export default {
  components: { Pagination },
  data() {
    return{
        tableData:[],
		loading:true,
        seeVisible:false,
        jujueVisible:false,
        tianjia:'',
		listQuery: {
			pageNum: 1,
			pageSize: 10,
			status: 0
		},
        rules: {
            company_name: [
            { required: true, message: "不能为空", trigger: "blur" }
            ],
            telephone: [{ required: true, message: "不能为空", trigger: "blur" }],
            corporation: [{ required: true, message: "不能为空", trigger: "blur" }],
            title: [{ required: true, message: "不能为空", trigger: "blur" }],
            emial: [{ required: true, message: "不能为空", trigger: "blur" }],
            phone: [{ required: true, message: "不能为空", trigger: "blur" }],
            telephone2: [{ required: true, message: "不能为空", trigger: "blur" }],
            // short_name: [{ required: true, message: "不能为空", trigger: "blur" }],
            social_code: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
    }
  },
  mounted() {
    this.get();
  },
  methods: {
    get(){
		this.loading = true;
        getCompanyByWhere(this.listQuery).then(response => {
			console.log(response.data)
			this.tableData = response.data.rows;
			this.total = response.data.total;
			setTimeout(() => {
				this.loading = false;
			}, 1*300);
		})
    },
    handleEdit(index,row){
        // this.seeVisible = true
        // var qid={
        //     id:row.id
        // }
        // shenhexiangqing(qid).then(res=>{
        //     console.log(res)
        //     this.tianjia=res.data.companyInfo
        //     this.tianjia.idCard=res.data.id_card
        // })    

        this.$router.push({
          name:'accountCheckSee',
          query:{
            id:row.id,
          }
        })
    },
    ent(){
        var data = this.tianjia
        data.create_time = new Date(this.tianjia.create_time)
        data.status=1
        console.log(data)
        updateCompanyById(data)
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    this.$message.error('审核失败');
                }else{
                    this.$message({
                        message: '审核成功',
                        type: 'success'
                    });
                    this.get()
                    this.seeVisible = false
                }
            })
    },
    jujueEnt(){
        var data = this.tianjia
        data.create_time = new Date(this.tianjia.create_time)
        if (data.register_date) {
            data.register_date = new Date(this.tianjia.register_date)
        }
        data.status = -1
        console.log(data)
        updateCompanyById(data)
            .then(response => {
                console.log(response.data)
                if (response.data.error) {
                    this.$message.error('拒绝失败');
                }else{
                    this.$message({
                        message: '拒绝成功',
                        type: 'success'
                    });
                    this.seeVisible = false
                    this.jujueVisible = false
                    this.get()
                }
            })
    },
  }
}
</script>

<style scoped>
    @import url("./account-examine.scss");
    .avatar {
    height: 160px;
    width: 300px;  
    text-align: center;
    display: inline-block;
}
</style>