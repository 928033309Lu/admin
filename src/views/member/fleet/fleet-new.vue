<template>
  <div class="warp">
    <div class="header">
        <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>新增车队卡</h3>
    </div>
    <div class="main">
        <div class="footer">
            <div class="header">
                <h3><span></span>公司档案信息</h3>
            </div> 
            <div class="dangan">
                <div class="box">
                    <div class="block">
                        <div class="left">
                            <span>公司名称</span>
                        </div>
                        <div class="right">
                            <el-input v-model="unitName" placeholder="请输入内容" clearable style="width: 200px;"></el-input>
                            <!-- <el-select v-model="industry" placeholder="请选择" style="width: 200px;">
                                <el-option
                                v-for="item in industryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>证件类型</span>
                        </div>
                        <div class="right">
                            <!-- <el-input v-model="paperType" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                            <el-select v-model="paperType" placeholder="请选择" clearable style="width: 200px;">
                                <el-option
                                v-for="item in paperTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    
                    <div class="block">
                        <div class="left">
                            <span>所在省份</span>
                        </div>
                        <div class="right">
                            <!-- <el-input v-model="provinces" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                            <el-select @change="shengChange" v-model="provinces" clearable placeholder="请选择" style="width:200px">
                                <el-option
                                v-for="(item,index) in sheng"
                                :key="index"
                                :label="item.district"
                                :value="item.id.toString()">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>所在地区</span>
                        </div>
                        <div class="right">
                            <!-- <el-input v-model="region" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                            <el-select v-model="region" placeholder="请选择"  clearable style="width:200px">
                                <el-option
                                v-for="(item,index) in shi"
                                :key="index"
                                :label="item.district"
                                :value="item.id.toString()">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="block">
                        <div class="left">
                            <span>公司法人</span>
                        </div>
                        <div class="right">
                            <el-input v-model="legalPerson" placeholder="请输入内容" style="width: 200px;"></el-input>
                        </div>
                    </div>
                    
                    <div class="block">
                        <div class="left">
                            <span>证件号码</span>
                        </div>
                        <div class="right">
                            <el-input v-model="IdentificationNumber" placeholder="请输入内容" style="width: 200px;"></el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>公司电话</span>
                        </div>
                        <div class="right">
                            <el-input v-model="workTelephone" placeholder="请输入内容" style="width: 200px;"></el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>详细地址</span>
                        </div>
                        <div class="right">
                            <el-input v-model="address" placeholder="请输入内容" style="width: 200px;"></el-input>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="block">
                        <div class="left">
                            <span>所属行业</span>
                        </div>
                        <div class="right">
                            <!-- <el-input v-model="industry" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                            <el-select v-model="industry" placeholder="请选择" clearable style="width: 200px;">
                                <el-option
                                v-for="item in industryOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="block">
                        <div class="right">
                            <el-upload
                                class="avatar-uploader"
                                action="https://httpbin.org/post"
                                :on-change="shang"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div v-if="(!imageUrl)" class="el-upload__tip" slot="tip">点击上传营业执照</div>
                            </el-upload>
                        </div>
                    </div>
                    <!-- <div class="block">
                        <div class="left">
                            <span>联系人姓名</span>
                        </div>
                        <div class="right">
                            <el-input v-model="contactName" placeholder="请输入内容" style="width: 200px;"></el-input>
                        </div>
                    </div> -->
                    <!-- <div class="block">
                        <div class="left">
                            <span>联系人生日</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                style="width: 200px;"
                                v-model="contactLifeDay"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div> -->
                </div>        
            </div>
        </div>
        <div class="footer">
            <div class="header">
                <h3><span></span>车队管理员信息 <el-input v-model="phone" placeholder="手机号/会员号" style="width: 200px;margin-left: 20px;"></el-input> <el-button  type="primary" @click="cha">查询</el-button></h3>
            </div> 
            <div class="guanli">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                             <div class="box">
                                <div class="block">
                                    <div class="left">
                                        <span>姓名：</span>
                                    </div>
                                    <div class="right">
                                        {{guanli.username}}
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="left">
                                        <span>手机号：</span>
                                    </div>
                                    <div class="right">
                                        {{guanli.phone}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <div class="box">
                                <div class="block">
                                    <div class="left">
                                        <span>会员号：</span>
                                    </div>
                                    <div class="right">
                                        {{guanli.memberNo}}
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="left">
                                        <span>身份证号：</span>
                                    </div>
                                    <div class="right">
                                        {{guanli.documentNo}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="footer">
            <div class="header">
                <h3><span></span>折扣限制规则</h3>
            </div> 
            <div class="qita">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="block">
                                <div class="left">
                                    <span>是否启用积分</span>
                                </div>
                                <div class="right">
                                    <el-radio v-model="isIntegral" label="1">是</el-radio>
                                    <el-radio v-model="isIntegral" label="0">否</el-radio>
                                </div>
                            </div>
                            <div class="block">
                                <div class="left">
                                    <span>限制油站</span>
                                </div>
                                <div class="right">
                                    <el-radio v-model="stationRestrict" label="1">是</el-radio>
                                    <el-radio  label="0">否</el-radio>
                                </div>
                            </div>
                            <div class="block">
                                <span>定点油站</span>
                            </div>
                            <div class="block">
                                <div class="zhan">
                                    <div class="tag">
                                        <!-- closable -->
                                        <el-tag
                                            :key="tag"
                                            v-for="tag in youzhanList"
                                            :disable-transitions="false"
                                            @close="youzhanClose(tag)">
                                            {{tag}}
                                        </el-tag>
                                        <el-input
                                            class="input-new-tag"
                                            v-if="youzhanVisible"
                                            v-model="youzhanValue"
                                            ref="saveTagInput"
                                            size="small"
                                            @keyup.enter.native="youzhanConfirm"
                                            @blur="youzhanConfirm"
                                            >
                                        </el-input>
                                        <i class="el-icon-plus"  v-show="youzhanjia"></i>
                                        <!-- @click='yzVisible=true' -->
                                        <div class="tianjia" v-show="youzhanaddVisible"  slot="reference">
                                            <i class="el-icon-plus"></i>
                                            <span>添加</span>
                                        </div>
                                    </div>
                                    <el-popover
                                        placement="right"
                                        style="height: 310px;overflow: hidden;"
                                        trigger="click"
                                        v-model="yzVisible">
                                        <el-checkbox :indeterminate="youzhanisIndeterminate" v-model="youzhanAll" @change="youzhanAllChange">所有</el-checkbox>
                                        <el-checkbox-group v-model="youzhanList" @change="youzhanCitiesChange">
                                            <el-checkbox v-for="(city,index) in youzhan" :label="city" :key="index">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                        <div class="btn">
                                            <el-button @click="youzhanent">确认</el-button>
                                        </div>
                                        <!-- <el-button slot="reference">click 激活</el-button> -->
                                    </el-popover>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <div class="block">
                                <div class="left">
                                    <span>约定消费金额</span>
                                </div>
                                <div class="right">
                                    <el-input v-model="amountAgreed" placeholder="请输入内容" style="width: 100px;"></el-input>元
                                </div>
                            </div>
                            <div class="block">
                                <div class="left">
                                    <span>消费折扣</span>
                                </div>
                                <div class="right">
                                    <el-radio v-model="isDiscount" label="1">是</el-radio>
                                    <el-radio v-model="isDiscount" label="0">否</el-radio>
                                </div>
                            </div>
                            <div class="block">
                                <span>折扣金额</span>
                            </div>
                            <div class="block">
                                <div class="tian">
                                    <div class="tag">
                                        <el-tag
                                            :key="tag"
                                            v-for="(tag, index) in zhekouList"
                                            closable
                                            :disable-transitions="false"
                                            @close="zhekouClose(tag)">
                                            {{tag}} 
                                            <el-input v-model="jia[index]" placeholder="" style="width: 80px;"></el-input>元/升
                                        </el-tag>
                                        <el-input
                                            class="input-new-tag"
                                            v-if="zhekouVisible"
                                            v-model="zhekouValue"
                                            ref="saveTagInput"
                                            size="small"
                                            @keyup.enter.native="zhekouConfirm"
                                            @blur="zhekouConfirm"
                                            >
                                        </el-input>
                                        <i class="el-icon-plus" @click='zkVisible=true' v-show="zhekoujia"></i>
                                        <div class="tianjia" v-show="zhekouaddVisible&&isDiscount==1" @click='zkVisible=true' slot="reference">
                                            <i class="el-icon-plus"></i>
                                            <span>添加</span>
                                        </div>
                                        <div class="tianjia" v-show="zhekouaddVisible&&isDiscount==0"  slot="reference">
                                            <i class="el-icon-plus"></i>
                                            <span>添加</span>
                                        </div>
                                    </div>
                                    <el-popover
                                        placement="top"
                                        style="height: 310px;overflow: hidden;"
                                        trigger="click"
                                        v-model="zkVisible">
                                        <el-checkbox :indeterminate="zhekouisIndeterminate" v-model="zhekouAll" @change="zhekouAllChange">所有</el-checkbox>
                                            <el-checkbox-group v-model="zhekouList" @change="zhekouCitiesChange">
                                            <el-checkbox v-for="(city,index) in zhekou" :label="city" :key="index">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                        <div class="btn">
                                            <el-button @click="zhekouent">确认</el-button>
                                        </div>
                                    </el-popover>
                                </div>
                                
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="btn">
            <el-button type="primary" @click="prev">取消</el-button>
            <el-button type="primary" @click="queren">确认</el-button>
        </div>
    </div>
  </div>
</template>

<script>
    import { chacheguan } from '@/api/cheduiguanli'
    import { getyouzhan } from '@/api/cheduiguanli'
    import { getyoupin } from '@/api/cheduiguanli'
    import { addka } from '@/api/cheduiguanli'
    import { districtList } from '@/api/shanghuguanli'
    import { getUserInfo } from '@/api/cheduiguanli'
    import { getOilsStationInfo } from '@/api/cheduiguanli'
    import { vocationList } from '@/api/cheduiguanli'
    import axios from "axios";

const cityOptions = [
  "92号汽油",
  "95号汽油",
  "98号汽油",
  "0号柴油",
  "-10号柴油",
  "-20号柴油",
  "-35号柴油"
];
const shangpinOptions = [
  "日用品",
  "饮料",
  "包装饮料",
];
const youzhanOptions = [
  "北京一号加油站",
  "北京二号加油站",
];
export default {
  data() {
    return {
        memberId:'',//会员号
        name:'',//姓名
        masterCardBalance:'',//主卡余额
        membershipLevel:'',//会员等级
        membershipType:'',//会员类型
        integral:'',//积分
        phoneNumber:'',//手机号
        openingPlace:'',//开户地点
        unitName:'',//单位名称
        stateSwitch:false,//状态开关
        //表格临时数据
        tableData:[],
        industry:'',//所属行业
        industryOptions:[],
        documentType:'',//证件类型
        IdentificationNumber:'',//证件号码
        workTelephone:'',//单位电话
        provinces:'',//所在省份
        region:'',//所在地区
        address:'',//详细地址
        contactTelephone:'',//联系人电话
        contactName:'',//联系人姓名
        contactLifeDay:'',//联系人生日
        isIntegral:'0',//是否启用积分
        isCommodity:'0',//是否限制商品
        amountAgreed:'',//约定消费金额
        isOlis:'0',//是否限制油品
        isDiscount:'0',//是否有消费折扣
        //油品
        youpinList: [],
        checkAll: false,
        cities: cityOptions,
        isIndeterminate: true,
        dialogFormVisible:false,//油品添加框是否隐藏
        youpinaddVisible:true,//油品添加按钮是否隐藏
        inputVisible: false,
        inputValue: '',
        youpinjia:false,//商品小添加图标是否显示
        //商品
        shangpinList: [],
        shangpin: shangpinOptions,
        shangpinAll: false,
        shangpinisIndeterminate: true,
        spVisible:false,//商品添加框是否隐藏
        shangpinaddVisible:true,//商品添加按钮是否隐藏
        shangpinVisible: false,//inputVisible
        shangpinValue: '',//inputValue
        shangpinjia:false,//商品小添加图标是否显示
        //油站
        isStation:'',//是否限制油站
        youzhanList: [],
        youzhan: [],
        youzhanxinxi: [],
        youzhanAll: false,
        youzhanisIndeterminate: true,
        yzVisible:false,//油站添加框是否隐藏
        youzhanaddVisible:true,//油站添加按钮是否隐藏
        youzhanVisible: false,//inputVisible
        youzhanValue: '',//inputValue
        youzhanjia:false,//油站小添加图标是否显示
        //折扣金额
        zhekouList: [],
        zhekou: [],
        zhekouxinxi: [],
        zhekouAll: false,
        zhekouisIndeterminate: true,
        zkVisible:false,//折扣添加框是否隐藏
        zhekouaddVisible:true,//折扣添加按钮是否隐藏
        zhekouVisible: false,//inputVisible
        zhekouValue: '',//inputValue
        zhekoujia:false,//折扣小添加图标是否显示
        jia:[],//价格元/升
        imageUrl: "" ,//上传地址
        //管理员信息
        guanli:{
            username:'',
            phone:'',
            memberNo:'',
            documentNo:'',//身份证号
        },
        phone:'',//查询会员条件
        legalPerson:'',//公司法人
        paperType:'',//证件类型
        stationRestrict:'1',//是否限制油站
        diqu:[],//地区表
		sheng:[],//省列表
		shi:[],//市列表
        xian:[],//县列表
        paperTypeOptions:[{
            value: '1',
            label: '营业执照'
        },{
            value: '1',
            label: '法人身份证'
        },],
        youzhanid:'',
    }
  },
  mounted() {
    this.get()
  },
  methods: {
      get(){
        var a = {}
        // getyouzhan(a)
        //     .then(response => {
        //         console.log(response.data)
        //         this.youzhanxinxi = response.data
        //         for(let i=0 ;i<response.data.length;i++){
        //             this.youzhan.push(response.data[i].shortName)
        //         }
        //     })
        getyoupin(a)
            .then(response => {
                console.log(response.data)
                this.zhekouxinxi = response.data
                for(let i=0 ;i<response.data.length;i++){
                    this.zhekou.push(response.data[i].oils_name)
                }
            })
		districtList(a)
            .then(response => {
			//   console.log('地区列表')
			//   console.log(response.data)
			  this.diqu = response.data
			  for(let i=0;i<this.diqu.length;i++){
				  if(this.diqu[i].level==1){
					this.sheng.push(this.diqu[i])
				  }
			  }
            })
        vocationList(a)
            .then(response => {
			  console.log('所属行业列表')
              console.log(response.data)
              this.industryOptions = response.data
            })
        getUserInfo(a)
            .then(response => {
			  console.log('信息')
              console.log(response.data.belong_id)
              var id = response.data.belong_id
              var data = {
                id:id,
              }
                getOilsStationInfo(data)
                    .then(response => {
                        console.log('油站')
                        console.log(response.data)
                        // stationInfo
                        this.youzhanList=[]
                        this.youzhanList.push(response.data.stationInfo.fullName)
                        this.youzhanid = response.data.stationInfo.id
                    }) 
            })    
    },
    //省的值发生变化时
    shengChange(){
        this.shi = []
        for (let i = 0; i < this.diqu.length; i++) {
            if (this.provinces==this.diqu[i].pid) {
                this.shi.push(this.diqu[i])
            }
        }
        
        // if(this.applicationVisible){
        //     for (let i = 0; i < this.diqu.length; i++) {
        //         if (this.provinces==this.diqu[i].pid) {
        //             this.shi.push(this.diqu[i])
        //         }
        //     }
        // }else{
        //     for (let i = 0; i < this.diqu.length; i++) {
        //         if (this.provinces==this.diqu[i].pid) {
        //             this.shi.push(this.diqu[i])
        //         }
        //     }	
        // }
    },
    queren(){
        if(this.unitName==null||this.unitName==''){
            this.$message({
                message: '公司名称不能为空',
                type: 'warning'
            });
            return
        }
        if(this.paperType==null||this.paperType==''){
            this.$message({
                message: '请选择证件类型',
                type: 'warning'
            });
            return
        }
        if(this.provinces==null||this.provinces==''){
            this.$message({
                message: '请选择所在省份',
                type: 'warning'
            });
            return
        }
        if(this.region==null||this.region==''){
            this.$message({
                message: '请选择所在地区',
                type: 'warning'
            });
            return
        }
        if(this.legalPerson==null||this.legalPerson==''){
            this.$message({
                message: '公司法人不能为空',
                type: 'warning'
            });
            return
        }
        if(this.IdentificationNumber==null||this.IdentificationNumber==''){
            this.$message({
                message: '证件号码不能为空',
                type: 'warning'
            });
            return
        }
        if(this.workTelephone==null||this.workTelephone==''){
            this.$message({
                message: '公司电话不能为空',
                type: 'warning'
            });
            return
        }
        if(this.address==null||this.address==''){
            this.$message({
                message: '详细地址不能为空',
                type: 'warning'
            });
            return
        }
        if(this.industry==null||this.industry==''){
            this.$message({
                message: '请选择所属行业',
                type: 'warning'
            });
            return
        }
        if(this.industry==null||this.industry==''){
            this.$message({
                message: '请上传营业执照',
                type: 'warning'
            });
            return
        }
        if(this.guanli.id==undefined){
            this.$message({
                message: '请选择车队管理员',
                type: 'warning'
            });
            return
        }
        var tbMotorcadeStationArr = [{
            stationId:this.youzhanid
        }]
        var tbMotorcadeDiscountArr = []
        // console.log(this.youzhanxinxi)
        // console.log(this.youzhanxinxi[this.youzhan.indexOf(this.youzhanList[i])].id)
        
        // return
        // for(var i = 0;i<this.youzhanList.length;i++){
        //     tbMotorcadeStationArr.push({
        //         stationId: this.youzhanxinxi[this.youzhan.indexOf(this.youzhanList[i])].id  
        //     })
        // }
        for(var i = 0;i<this.zhekouList.length;i++){
            tbMotorcadeDiscountArr.push({
                "goodsAmount": this.jia[i],
                "goodsId": this.zhekouxinxi[this.zhekou.indexOf(this.zhekouList[i])].id  ,
                "type": 1
            })
        }
        
        var data = {
            "name": this.unitName,
            "vocationId": this.industry,
            "provinceId": this.provinces,
            "cityId": this.region,
            "legalPerson": this.legalPerson,
            "paperNo": this.IdentificationNumber,
            "phone": this.workTelephone,
            "address": this.address,
            "consumeAmount": this.amountAgreed,
            "paperType": this.paperType,
            "memberId": this.guanli.id,
            "pointType": Number(this.isIntegral),
            "stationRestrict": Number(this.stationRestrict),
            "isHaveDiscount": Number(this.isDiscount),
            "tbMotorcadeStationArr": tbMotorcadeStationArr,
            "tbMotorcadeDiscountArr": tbMotorcadeDiscountArr,
        }
        console.log(data)
        // return
        addka(data)
            .then(response => {
                console.log(response.data)
                // if(response.data=={}){
                    
                // }
                if (response.data.msg) {
                    this.$message({
                        message: response.data.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.prev()
                }
            })
    },
    cha(){
        var data = {
            "condition":this.phone
        }
        chacheguan(data)
            .then(response => {
                console.log(response.data)
                if(response.data.memberList.rows.length==0){
                    this.$message.error('请先注册个人会员');
                    this.guanli=''
                }else{
                    if(response.data.memberList.rows[0].status==1){
                        this.guanli = response.data.memberList.rows[0]
                    }else{
                        this.$message.error('该会员不是个人会员');
                        this.guanli = ''
                    }
                }
                
                
            })

        // this.$http
        //     .post('http://192.168.0.129:8080/member/queryMember',
        //     {
        //     "phone":this.phone
        //     },
        //     {
        //     headers:{
        //         'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
        //     }
        //     })
        //     .then(function(res){
        //     console.log('提交成功')
        //     console.log(res.body)
        //     console.log(res.body.memberList)
        //     this.guanli = res.body.memberList[0]
            
        //     //   this.$message({
        //     //     message: '入账成功',
        //     //     type: 'success'
        //     //   });
        //     })
        //     .catch(function(err){
        //     console.log('提交失败')
        //     console.log(err)
        //     this.$message.error('查询失败');
        //     })
    },
    shang(file, fileList) {
      console.log(file)
      console.log(fileList)
       
    },
    handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
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
          that.imageUrl = tupian
        })
        .catch(function(error) {

        })
    },
    handleCheckAllChange(val) {
      var c= JSON.parse(JSON.stringify(cityOptions))
      this.youpinList = val ? c : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    AllChange(val) {
      var a=JSON.parse(JSON.stringify(shangpinOptions))
      this.shangpinList = val ? a : [];
      this.shangpinisIndeterminate = false;
    },
    CitiesChange(value) {
      let checkedCount = value.length;
      this.shangpinAll = checkedCount === this.shangpin.length;
      this.shangpinisIndeterminate =
        checkedCount > 0 && checkedCount < this.shangpin.length;
    },
    youzhanAllChange(val) {
      var a=JSON.parse(JSON.stringify(this.youzhan))
      this.youzhanList = val ? a : [];
      this.youzhanisIndeterminate = false;
    },
    youzhanCitiesChange(value) {
      let checkedCount = value.length;
      this.youzhanAll = checkedCount === this.youzhan.length;
      this.youzhanisIndeterminate =
        checkedCount > 0 && checkedCount < this.youzhan.length;
    },
    zhekouAllChange(val) {
      var a=JSON.parse(JSON.stringify(this.zhekou))
      this.zhekouList = val ? a : [];
      this.zhekouisIndeterminate = false;
    },
    zhekouCitiesChange(value) {
        console.log(this.zhekouList)
      let checkedCount = value.length;
      this.zhekouAll = checkedCount === this.zhekou.length;
      this.zhekouisIndeterminate =
        checkedCount > 0 && checkedCount < this.zhekou.length;
    },
    //油品添加确认按钮事件、
    ent(){
        this.dialogFormVisible=false
        if(this.youpinList.length>0){
            this.youpinaddVisible=false
            this.youpinjia=true
        }
    },
    //商品添加确认按钮事件、
    shangpinent(){
        this.spVisible=false
        if(this.shangpinList.length>0){
            this.shangpinaddVisible=false
            this.shangpinjia=true
        }
    },
    //油站添加确认按钮事件、
    youzhanent(){
        this.yzVisible=false
        if(this.youzhanList.length>0){
            this.youzhanaddVisible=false
            this.youzhanjia=true
        }
    },
    //折扣添加确认按钮事件、
    zhekouent(){
        this.zkVisible=false
        if(this.zhekouList.length>0){
            this.zhekouaddVisible=false
            this.zhekoujia=true
        }
    },
    handleClose(tag) {
        var n=this.youpinList.indexOf(tag)
        this.youpinList.splice(n, 1);
        // this.cities.splice(n, 0, tag);
    },
    Close(tag) {
        this.shangpinList.splice(this.shangpinList.indexOf(tag), 1);
    },
    youzhanClose(tag) {
        this.youzhanList.splice(this.youzhanList.indexOf(tag), 1);
    },
    zhekouClose(tag) {
        this.zhekouList.splice(this.zhekouList.indexOf(tag), 1);
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    shangpinshowInput() {
        this.shangpinVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    youzhanshowInput() {
        this.youzhanVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    zhekoushowInput() {
        this.zhekouVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
            this.youpinList.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    Confirm() {
        let inputValue = this.shangpinValue;
        if (inputValue) {
            this.shangpinList.push(inputValue);
        }
        this.shangpinVisible = false;
        this.shangpinList = '';
    },
    youzhanConfirm() {
        let inputValue = this.youzhanValue;
        if (inputValue) {
            this.youzhanList.push(inputValue);
        }
        this.youzhanVisible = false;
        this.youzhanList = '';
    },
    zhekouConfirm() {
        let inputValue = this.youzhanValue;
        if (inputValue) {
            this.zhekouList.push(inputValue);
        }
        this.zhekouVisible = false;
        this.zhekouList = '';
    },
    //返回上一页
    prev(){
      this.$router.go(-1)
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp{
  background-color: #F6F7FB;
//   padding: 2%;
}
.main{
  min-height: calc(100vh - 181px);
  background-color: #fff;
  width: 100%;
  height: 100%;
  color: #606266;
}
.header{
  background-color: #fff;
  border-bottom: 1px solid #EDEDED;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #F6F7FB;
}   
.header h3{
  line-height: 60px;
  margin: 0;
}
.header h3 span{
	display: inline-block;
	width: 3px;
	height: 25px;
	vertical-align: middle;
	background-color: #5B8DFF;
    margin-left: 5px;
    margin-right: 5px;
}
.top .header{
    border: 0;
}
.footer .header{
    border: 0;
}
.xinxi{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    line-height: 36px;
}
.top,.footer{
    border-bottom: 1px solid #F6F7FB;
    padding-bottom: 20px;
}
.biao{
  padding: 10px 20px;
}
.table{
  border:1px solid #ebeef5;
  border-bottom: 0;
}
.dangan{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}
.guanli{
    padding: 0 20px;
}
.qita{
    padding: 0 20px;
}
.block{
    display: flex;
    line-height: 36px;
    margin-bottom: 10px;
}
.block .left{
    width: 100px;
}
.tag{
    max-width: 360px;
    height: 140px;
    border :1px solid #E4E8F4;
    border-radius: 5px;
    position: relative;
    overflow: auto;
    padding: 10px;
}
.tianjia{
    display: inline-block;
    color: #ABB0C4;
    position: absolute;
    top: calc(50% - 20px);
    right: calc(50% - 26px);
    cursor:pointer;
}
.el-icon-plus{
    cursor:pointer;
}
.main .btn{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.shang,.zhan,.tian{
    position: relative;
    width: 100%;
}
.dangan .block{
    margin-bottom: 45px;
}
.el-upload__tip{
    position: absolute;
    top: 110px;
    left: 107px;
}
.box .block:last-child{
    margin-bottom: 0;
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
h3 .el-button--medium.is-circle{
  border: 0;
}
.block .el-popover{
    width: 200px;
    top: -250px;
    height: 250px;
    overflow: auto;
}
.block .el-popover .el-checkbox{
    margin-left: 30px;
}
.block .tag .el-input--medium .el-input__inner{
    height: 24px;
}
.avatar-uploader{
    position: relative;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}
.avatar {
    width: 300px;
    height: 200px;
    display: block;
}

</style>