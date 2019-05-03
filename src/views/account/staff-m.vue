<template>
  <div class="app-container account_staff">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="员工管理"/>

      </div>
      <div class="items">
        <el-form-item label="员工姓名" class="yggl">
          <el-input placeholder="名称" v-model="listQuery.name" style="width: 220px;" @input="getList"/>
        </el-form-item>
        <el-form-item label="在职状态" class="yggl" style="margin-right: 20px;margin-left: 20px;">
          <el-select v-model="listQuery.status" clearable style="min-width: 200px" class="filter-item" @change="getList">
            <el-option v-for="item in zaizhi" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="tianjiaTk()">员工添加</el-button>
      </div>

      <el-table :key="tableKey" :data="list" fit style="width: 100%;">
        <el-table-column label="员工编号" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.employee_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" min-width="70" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex==1">男</span>
            <span v-if="scope.row.sex==0">女</span>
          </template>
        </el-table-column>
        <el-table-column label="员工岗位" min-width="100" align="center">
          <template slot-scope="scope">
            <span v-for="item in GWlist" v-if="scope.row.position==item.id">{{item.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属油站" min-width="100" align="center">
          <template slot-scope="scope">
          	<span v-for="item in YZlist" v-if="scope.row.station_id == item.id && zhanjingli(scope.row.position)">{{item.shortName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="在职状态" align="center" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">在职</span>
            <span v-if="scope.row.status==0">离职</span>
          </template>
        </el-table-column>
       <el-table-column label="账号状态" align="center" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.is_freeze==0">启用</span>
            <span v-if="scope.row.is_freeze==1">冻结</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="420">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button size="mini" type="success" @click="cakanYg(scope.row.id)">查看
            </el-button>
            <el-button size="mini" type="danger" @click="chongshe(scope.row.id,scope.row.phone)">重设密码
            </el-button>
            <el-button v-if="scope.row.is_freeze==0" size="mini" type="danger" @click="dongjie(scope.row.id,scope.row.is_freeze,scope.row)">冻结
            </el-button>
            <el-button v-if="scope.row.is_freeze==1" size="mini" type="danger" :disabled="scope.row.status==0" @click="dongjie(scope.row.id,scope.row.is_freeze,scope.row)">解冻
            </el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    <!--员工添加弹框-->
    <el-dialog :visible.sync="yuangongtianjia" title="员工添加" class="ygtj_tab" @open="qingtianjia">
      <el-form ref="dataForm" :rules="rules" :model="addData" label-position="left" label-width="80px">
				<div class="left">
					<el-form-item label="员工姓名" prop="name">
	          <el-input  v-model="addData.name"/>
	        </el-form-item>
	        <el-form-item label="岗位" prop="position">
	          <el-select v-model="addData.position" clearable class="filter-item" @change="zhanjingli">
	            <el-option v-for="item in GWlist" :key="item.id" :label="item.name" :value="item.id"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="入职时间" prop="entryTime">
	          <el-date-picker
				      v-model="addData.entryTime"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
	        </el-form-item>

			    <el-form-item label="在职状态" prop="status">
	          <el-select v-model="addData.status" clearable class="filter-item" @change="gaiqiyong2">
	            <el-option v-for="item in zaizhi" :key="item.id" :label="item.name" :value="item.id"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="是否启用">
	          <el-switch
						  v-model="addData.is_freeze"
						  active-text="是"
  						inactive-text="否"
  						:active-value="0"
    					:inactive-value="1"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  @change="switch_on"
						  :disabled="disable=='关闭'?true:false"
						  >
						</el-switch>
	        </el-form-item>
				</div>
				<div class="right">
					<el-form-item label="性别" prop="sex">
	          <el-select v-model="addData.sex" clearable  class="filter-item">
	            <el-option v-for="item in xingbie" :key="item.id" :label="item.name" :value="item.id"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="所属油站" v-if="suoshu">
	          <el-select v-model="addData.station_id" clearable class="filter-item">
	            <el-option v-for="item in YZlist" :key="item.id" :label="item.shortName" :value="item.id" v-show="item.status == 1"/>
	          </el-select>
	        </el-form-item>

	        <el-form-item label="身份证号" prop="idCard">
	          <el-input  v-model="addData.idCard" maxlength="18"/>
	        </el-form-item>
	        <el-form-item label="生日">
	          <el-date-picker disabled
				      v-model="addData.birthday"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
	        </el-form-item>
	        <el-form-item label="手机" prop="phone">
	          <el-input v-model.number="addData.phone" maxlength="11"/>
	        </el-form-item>
	        <el-form-item label="账号" v-if="switch_ons">
	        	<span>{{addData.phone}}</span>
	        </el-form-item>

				</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yuangongtianjia = false">取消</el-button>
        <el-button type="primary" @click="tianjiaYg()">确认</el-button>
      </div>
    </el-dialog>


    <!--员工修改弹框-->
    <el-dialog :visible.sync="yuangongxiugai" title="员工信息修改" class="ygtj_tab">
      <el-form ref="dataForm2" :rules="rules" :model="ygXiang" label-position="left" label-width="80px">
				<div class="left">
					<el-form-item label="员工姓名" prop="name">
	          <el-input  v-model="ygXiang.name"/>
	        </el-form-item>
	        <el-form-item label="岗位" prop="position">
	          <el-select v-model="ygXiang.position" clearable class="filter-item" @change="zhanjingli">
	            <el-option v-for="item in GWlist" :key="item.id" :label="item.name" :value="item.id"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="入职时间" prop="entryTime">
	          <el-date-picker
				      v-model="ygXiang.entryTime"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
	        </el-form-item>

			    <el-form-item label="在职状态" prop="status">
	          <el-select v-model="ygXiang.status" clearable class="filter-item"  @change="gaiqiyong2">
	            <el-option v-for="item in zaizhi" :key="item.id" :label="item.name" :value="item.id"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="是否启用">
	          <el-switch
						  v-model="ygXiang.is_freeze"
						  active-text="是"
  						inactive-text="否"
  						:active-value="0"
    					:inactive-value="1"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  @change="switch_on"
						  :disabled="disable2=='关闭'?true:false"
						  >
						</el-switch>
	        </el-form-item>
				</div>
				<div class="right">
					<el-form-item label="性别" prop="sex">
	          <el-select v-model="ygXiang.sex" clearable  class="filter-item">
	            <el-option v-for="item in xingbie" :key="item.id" :label="item.name" :value="item.id"/>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="所属油站" v-if="suoshu">
	          <el-select v-model="ygXiang.station_id" clearable class="filter-item">
	            <el-option v-for="item in YZlist" :key="item.id" :label="item.shortName" :value="item.id" v-show="item.status==1"/>
	          </el-select>
	        </el-form-item>

	        <el-form-item label="身份证号" prop="idCard">
	          <el-input  v-model="ygXiang.idCard" maxlength="18"/>
	        </el-form-item>
	        <el-form-item label="生日">
	          <el-date-picker disabled
				      v-model="ygXiang.birthday"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
	        </el-form-item>
	        <el-form-item label="手机" prop="phone">
	          <el-input v-model.number="ygXiang.phone" maxlength="11"/>
	        </el-form-item>
	        <el-form-item label="账号" v-if="ygXiang.is_freeze==0">
	        	<span>{{ygXiang.phone}}</span>
	        </el-form-item>
				</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yuangongxiugai = false">取消</el-button>
        <el-button type="primary" @click="xiugaiYg()">确认</el-button>
      </div>
    </el-dialog>


    <!--员工查看详情-->
    <el-dialog :visible.sync="yuangongChakan" title="员工信息修改" class="ygtj_tab">
      <el-form ref="dataForm2" :rules="rules" :model="ygChaXiang" label-position="left" label-width="80px">
				<div class="left">
					<el-form-item label="员工编号">
	          {{ygChaXiang.employee_id}}
	        </el-form-item>
					<el-form-item label="员工姓名">
	          {{ygChaXiang.name}}
	        </el-form-item>
	        <el-form-item label="身份证号">
	          {{ygChaXiang.idCard}}
	        </el-form-item>
	        <el-form-item label="电话">
	          {{ygChaXiang.phone}}
	        </el-form-item>
				</div>
				<div class="right">
					<el-form-item label="岗位">
            <span v-for="item in GWlist" v-if="ygChaXiang.position==item.id">{{item.name}}</span>
	        </el-form-item>
	        <el-form-item label="性别">
	        	<span v-for="item in xingbie" v-if="ygChaXiang.sex==item.id">{{item.name}}</span>
	        </el-form-item>

	        <el-form-item label="生日">
	          <span v-if="ygChaXiang.birthday">{{ygChaXiang.birthday|parseTime('{y}-{m}-{d}')}}</span>
	        </el-form-item>

	        <el-form-item label="入职时间">
	        	<span v-if="ygChaXiang.entryTime">{{ygChaXiang.entryTime|parseTime('{y}-{m}-{d}')}}</span>
	        </el-form-item>

			    <el-form-item label="在职状态">
			    	<span v-for="item in zaizhi" v-if="ygChaXiang.status==item.id">{{item.name}}</span>
	        </el-form-item>

				</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yuangongChakan = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { ygList,ygAdd,ygUp,ygDetail,ygFree,ygPwd,mwList,userDel,getByPhone } from '@/api/zhanghu'
import { youzhanList } from '@/api/shuju'

import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import validTools from '@/utils/validTools';
import { shanghuList } from "@/api/shanghu";

export default {

  components: { Pagination },
  	data() {
		var phoneRules =  (rule, value, callback) => {
			if(validTools('mobile', value, callback, '', true)){
                getByPhone({phone:value}).then(response => {
                    console.log(response.data)
                    if(response.data &&this.ygXiangId!=response.data.id){
                        let belong_name = '';
                        let company_name = '';
                        this.YZlist.forEach(item => {
                            if(item.id == response.data.belong_id){
                                belong_name = item.shortName
                            }
                        })
                        this.suppli.forEach(item => {
                            if(item.id == response.data.companyId){
                                company_name = item.short_name
                            }
                        })
                        callback(new Error('账号在 ”'+ company_name +'-'+ belong_name +'” 存在'))
                    }else{
                        callback()
                    }
                })
            }
		};
		var idCardRules =  (rule, value, callback) => {
			if(validTools('idCard', value, callback)){
				// console.log(this.addData.idCard)
				var idCard = this.addData.idCard;
                var idCard2 = this.ygXiang.idCard;
                var birthday = "";
                var birthday2 = "";
                if (idCard != null && idCard != "") {
                    if (idCard.length == 15) {
                        birthday = "19" + idCard.substr(6, 6);
                    } else if (idCard.length == 18) {
                        birthday = idCard.substr(6, 8);
                    }
                    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
                    this.addData.birthday = new Date(birthday);
                }
                if (idCard2 != null && idCard2 != "") {
                    if (idCard2.length == 15) {
                        birthday2 = "19" + idCard2.substr(6, 6);
                    } else if (idCard2.length == 18) {
                        birthday2 = idCard2.substr(6, 8);
                    }
                    birthday2 = birthday2.replace(/(.{4})(.{2})/, "$1-$2-");
                    this.ygXiang.birthday = new Date(birthday2);
                }
			}
		};
    	return {
	  	list: null,
	  	tableKey: 0,
	  	listLoading: true,
	  	ruzhiTime:'',
	  	shengriTime:'',
	    total: 0,
	    suoshu:false,
      form: {
        name: ''
      },
      switch_ons:false,
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	        status:'',
	        name:''
	    },
	    importanceOptions:[1,2,3],
	    zaizhi:[{
	    	id:1,
	    	name:"在职"
	    },{
	    	id:0,
	    	name:"离职"
	    }],
	    xingbie:[{
	    	id:"1",
	    	name:"男"
	    },{
	    	id:"0",
	    	name:"女"
	    }],
	    ygtianjia: {
	    	importance: undefined,
	    	name:''
	    },
	    rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        position: [{ required: true, message: '不能为空', trigger: 'change' }],
        entryTime: [{ required: true, message: '不能为空', trigger: 'change' }],
        status: [{ required: true, message: '不能为空', trigger: 'change' }],
        sex: [{ required: true, message: '不能为空', trigger: 'change' }],
        idCard: [{ required: true, message: '不能为空', trigger: 'blur' },
								{ validator: idCardRules, trigger: 'blur' }],
        birthday: [{ required: true, message: '不能为空', trigger: 'change' }],
        phone: [{ required: true, message: '不能为空'},
      					{ type: 'number', message: '必须为数字值'},
								{ validator: phoneRules, trigger: 'blur' }],
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
      },
	    dialogStatus: '',
	    yuangongtianjia: false,
	    addData:{
	    	name: "",
			  position: "",
			  entryTime: "",
			  status: 1,
			  sex: "",
			  idCard: "",
			  birthday: "",
			  phone: "",
			  station_id: "",
			},
			yuangongxiugai:false,
			ygXiang:'',
			ygXiangId:'',
			yuangongChakan:false,
			ygChaXiang:'',
			GWlist:[],
			YZlist:[],
			suppli: [],
			qingtianjiadata:1,
			disable:"",
			disable2:'',
    }
  },
  created() {
	    this.getList()
	    this.getGWList()
	    this.youzhanLie()
  },
  methods: {
	  	sortChange(data) {

	    },
	    youzhanLie(){
	    	youzhanList({}).then(response => {
	    		console.log(response.data)
      		this.YZlist=response.data
	      })
	    },
	    switch_on(val){
	    	if(val==0){
	    		this.switch_ons=true;
	    	}else{
	    		this.switch_ons=false;
	    	}
	    },
	    getGWList(){
	    	mwList({}).then(response => {
	    		console.log(response)
	      		this.GWlist=response.data
		    })
		    shanghuList({}).then(res => {
                console.log(res);
                this.suppli = res.data;
            });
	    },
	  	getList() {
	  	ygList(this.listQuery).then(res=>{
	  	  	console.log(res)
	  	  	this.list=res.data.data.rows;
	  	  	this.total=res.data.data.total;
	  	  })
	    },
	    tianjiaTk(){
	    	this.yuangongtianjia = true
	    	this.suoshu = false
	    },
	    tianjiaYg(){
	    	console.log(this.addData)
	    	this.$refs['dataForm'].validate((valid) => {
	        if (valid) {
	        	ygAdd(this.addData).then(res=>{
			    		this.yuangongtianjia = false
			    		this.$refs["dataForm"].resetFields();
			    		this.addData={
					    	name: "",
							  position: "",
							  entryTime: "",
							  status: "",
							  sex: "",
							  idCard: "",
							  birthday: "",
							  phone: "",
							  station_id: "",
							  is_freeze:"",
							}
			    		this.getList();
			    	}).catch(res => {
				    		console.log(res.response)
				    		this.$notify.error({
				          title: '错误',
				          message: res.response.data.error,
				          duration: 2000
				        });
			      })
	        }
	      })

	    },
	    dongjie(idid,is_freeze,row){
	    	this.zhanjingli('')
	    	console.log(idid,is_freeze,row)
	    	if(is_freeze==0){
	    		is_freeze=1;
	    	}else if(is_freeze==1){
	    		is_freeze=0;
	    	}
	    	let data={
	    		id:idid,
	    		is_freeze:is_freeze
	    	}
	    	console.log(data)
	    	ygFree(data).then(res=>{
	    		this.getList();
	    	})
	    },
	    del(id){
	    	this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
                userDel({id:id}).then(response => {
                    this.$notify({
                        message: '删除成功',
                        type: 'success',
                        duration:1500
                    });
                    this.getList();
                })

            })
         //    .catch(() => {
	        //   this.$notify.info({
		       //    message: '已取消删除',
		       //    duration:2000
		       //  });
	        // });
	    },
	    handleUpdate(row){
	    	let data={
	    		id:row.id
	    	}
	    	ygDetail(data).then(res=>{
	    		console.log(res)
	    		this.yuangongxiugai=true;
	    		this.ygXiang=res.data;
	    		this.ygXiang.phone=Number(res.data.phone)
	    		this.zhanjingli(this.ygXiang.position)
	    		if(this.ygXiang.status==0){
	    			this.disable2="关闭"
	    			this.ygXiang.is_freeze=1
	    		}else{
	    			this.disable2="开启"
	    			this.ygXiang.is_freeze=0
	    		}

	    		this.ygXiangId=res.data.id
	    	})

	    },
	    chongshe(idid,phone){

	    	this.$confirm('此操作重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        	let data={
		    		id:idid,
		    		phone:phone
		    	}
		    	ygPwd(data).then(res=>{
		    		this.$message({
	            type: 'success',
	            message: '重置成功!'
	          });
		    	})

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });

	    },
	    xiugaiYg(idid){
	    	this.$refs['dataForm2'].validate((valid) => {
	        if (valid) {
	        	this.ygXiang.entryTime=new Date(this.ygXiang.entryTime);
			    	this.ygXiang.birthday=new Date(this.ygXiang.birthday);
			    	let station_id=this.ygXiang.station_id;
			    	let data={
			    		id:this.ygXiangId,
			    		name: this.ygXiang.name,
						  position: this.ygXiang.position,
						  status:this.ygXiang.status,
						  sex: this.ygXiang.sex,
						  idCard: this.ygXiang.idCard,
						  phone: this.ygXiang.phone,
						  station_id: this.ygXiang.station_id,
						  entryTime:this.ygXiang.entryTime,
						  birthday:this.ygXiang.birthday,
						  is_freeze:this.ygXiang.is_freeze
			    	}
			    	console.log(data)
			    	ygUp(data).then(res=>{
			    		console.log("chheng")
			    		this.yuangongxiugai=false;
			    		this.$refs["dataForm2"].resetFields();
			    		this.getList();
			    	}).catch(res => {
				    		console.log(res.response)
				    		this.$notify.error({
				          title: '错误',
				          message: res.response.data.error,
				          duration: 2000
				        });
			      })
	        }
	     })

	    },
	    cakanYg(idid){
	    	let data={
	    		id:idid
	    	}
	    	console.log(data)
	    	ygDetail(data).then(res=>{
	    		console.log(res)
	    		this.yuangongChakan=true;
	    		this.ygChaXiang=res.data;
	    	})
	    },
	    zhanjingli(val){
	    	this.addData.belong_id = ''
	    	this.GWlist.forEach((item,index)=>{
	    		if(!val){
	    			this.suoshu = false
	    		}else if(val == item.id){
		    		this.suoshu = item.name == "站经理"
	    		}
	    	})
	    	return this.suoshu
	    },
	    qingtianjia(){
	    	if(this.qingtianjiadata==1){
	    		this.qingtianjiadata++;
	    	}else{
	    		this.$refs["dataForm"].resetFields();
	    	}
	    },
	    gaiqiyong(val){
	    	console.log(val)
	    	if(val==0){
	    		this.addData.is_freeze=1;
	    		this.disable="关闭";
	    	}else{
	    		this.disable="开启";
	    	}
	    },

	    gaiqiyong2(val){
	    	console.log(val)
	    	if(val==0){
	    		this.ygXiang.is_freeze=1;
	    		this.disable2="关闭";
	    	}else{
	    		this.disable2="开启";
	    	}
	    }
  }
}
</script>
<style scoped>
 	@import url("./staff.scss");
</style>
