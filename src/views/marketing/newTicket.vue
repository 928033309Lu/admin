<template>
    <div class="warp newTicket">
        <div class="header">
            <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>电子优惠券</h3>
        </div>
        <div class="main">
            <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="ipt">
                        <div class="left">
                            <span>标题</span>
                        </div>
                        <div class="right">
                            <el-input v-model="name" placeholder=""></el-input>
                        </div>
                    </div>
                    <div class="ipt">
                        <div class="left">
                            <span>优惠类型</span>
                        </div>
                        <div class="right">
                            <el-select v-model="discountCouponType" placeholder="请选择">
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                                <!-- <el-option value="代金券"> 代金券</el-option>
                                <el-option value="折扣券"> 折扣券</el-option> -->
                            </el-select>
                        </div>
                    </div>
                    <div class="ipt" v-show="discountCouponType==1">
                        <div class="left">
                            <span>券面金额</span>
                        </div>
                        <div class="right">
                            <el-input v-model="discountCouponValue" placeholder=""></el-input>
                            元
                            <!-- <el-select v-model="discountCouponValue" placeholder="请选择" style="width: 200px;">
                                <el-option
                                v-for="item in discountCouponValueOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                                <el-option value="100">100</el-option>
                            </el-select> -->
                            <!-- <el-input v-model="discountCouponValue" type='Number' placeholder="100" > </el-input> -->
                        </div>
                    </div>
                    <div class="ipt" v-show="discountCouponType==2">
                        <div class="left">
                            <span>折扣券折扣</span>
                        </div>
                        <div class="right">
                            <!-- <el-select v-model="couponDiscount" placeholder="请选择" style="width: 200px;">
                                <el-option
                                v-for="item in couponDiscountOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                            <el-input v-model="couponDiscount" type='Number' max="1.0" min="0.0" step="0.1" placeholder="" > </el-input> %
                        </div>
                    </div>
                    <div class="ipt">
                        <div class="left">
                            <span>有效期</span>
                        </div>
                        <div class="right">
                            <el-input v-model="periodOfValidity" placeholder=""></el-input> 天
                            <!-- <el-select v-model="periodOfValidity" placeholder="请选择" style="width: 200px;">
                                <el-option
                                v-for="item in periodOfValidityOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                        </div>
                        <!-- <el-input v-model="periodOfValidity" type='Number' placeholder="30" > </el-input>天 -->
                    </div>
                    <div class="ipt ri">
                        <div class="left">
                            <span>开始时间</span>
                            </div>
                            <div class="right">
                            <el-radio-group v-model="start">
                                <el-radio :label="1">指定日期</el-radio>
                                <!-- <el-date-picker
                                style="width: 200px;margin:10px;margin-left: 27px;margin-right: 13px;"
                                v-model="startDate"
                                type="datetime"
                                placeholder="选择日期时间">
                                </el-date-picker> -->
                                <!-- <span></span> -->
                                <el-date-picker
                                    v-model="startDate"
                                    type="date"
                                    style="width: 140px; margin:10px;"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <!-- <el-time-picker
                                    v-model="startTime"
                                    style="width: 140px;"
                                    :picker-options="{
                                    selectableRange: '00:00:00 - 23:59:59'
                                    }"
                                    placeholder="选择时间">
                                </el-time-picker> -->
                            </el-radio-group>
                        </div>
                        <div class="ling">
                            <div class="left"> </div>
                            <div class="right">
                                <el-radio-group v-model="start">
                                    <el-radio :label="2">领取日</el-radio>
                                    <!-- <el-date-picker
                                    style="width: 200px;margin:10px;margin-left: 41px;margin-right: 13px;"
                                    v-model="getDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                    </el-date-picker> -->
                                    <!-- <el-date-picker
                                        v-model="getDate"
                                        type="date"
                                        style="width: 140px;margin:10px;margin-left: 27px;margin-right: 13px;"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    <el-time-picker
                                        v-model="getTime"
                                        style="width: 140px;"
                                        :picker-options="{
                                        selectableRange: '00:00:00 - 23:59:59'
                                        }"
                                        placeholder="选择时间">
                                    </el-time-picker> -->
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="ipt">
                            <div class="left"> 
                            最低消费
                            </div>
                            <div class="right">
                            <el-input v-model="minimumConsumption" placeholder="" style="width: 200px;" > </el-input> 元
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <div class="inpt">
                    <div class="left">
                        <span>应用范围</span>
                    </div>
                    <div class="right">
                        <div class="youpin">
                            <div class="left">
                                <span>油品</span> 
                            </div>
                            <div class="right">
                                <div class="tag">
                                    <el-tag
                                        :key="tag.id"
                                        v-for="tag in youpinList"
                                        closable
                                        :disable-transitions="false"
                                        @close="handleClose(tag)">
                                        {{tag.oils_name}}
                                    </el-tag>
                                    <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                        >
                                    </el-input>
                                    <i class="el-icon-plus" @click='dialogFormVisible=true' v-show="youpinjia"></i>
                                    <div class="tianjia" v-show="youpinaddVisible" @click='dialogFormVisible=true' slot="reference">
                                        <i class="el-icon-plus"></i>
                                        <span>添加</span>
                                    </div>
                                </div>
                                <el-popover
                                    placement="right"
                                    style="height: 310px;overflow: hidden;"
                                    trigger="click"
                                    v-model="dialogFormVisible">
                                    <el-radio v-model="radio" v-for="city in cities" :label="city.id"  @change="handleCheckAllChange" :key="city.id">{{city.oils_name}}</el-radio>
                                    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所有</el-checkbox>
                                        <el-checkbox-group v-model="youpinList" @change="handleCheckedCitiesChange">
                                        <el-checkbox v-for="city in cities" :label="city" :key="city.id">{{city.oils_name}}</el-checkbox>
                                    </el-checkbox-group> -->
                                    <div class="btn">
                                        <el-button @click="ent">确认</el-button>
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                        <div class="youpin">
                            <div class="left">
                                <span>商品</span> 
                            </div>
                            <div class="right">
                                <div class="tag">
                                    <el-tag
                                        :key="tag"
                                        v-for="tag in shangpinList"
                                        closable
                                        :disable-transitions="false"
                                        @close="Close(tag)">
                                        {{tag.goodsType}}
                                    </el-tag>
                                    <el-input
                                        class="input-new-tag"
                                        v-if="shangpinVisible"
                                        v-model="shangpinValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="Confirm"
                                        @blur="Confirm"
                                        >
                                    </el-input>
                                    <i class="el-icon-plus" @click='spVisible=true' v-show="shangpinjia"></i>
                                    <div class="tianjia" v-show="shangpinaddVisible" @click='spVisible=true' slot="reference">
                                        <i class="el-icon-plus"></i>
                                        <span>添加</span>
                                    </div>
                                </div>
                                <el-popover
                                    placement="right"
                                    style="min-height: 310px;overflow: hidden;"
                                    trigger="click"
                                    v-model="spVisible">
                                    <el-radio v-model="radio1"  v-for="city in shangpin" :label="city.id"  :key="city.id" @change="AllChange">{{city.goodsType}}</el-radio>
                                    <!-- <el-checkbox :indeterminate="shangpinisIndeterminate" v-model="shangpinAll" @change="AllChange">所有</el-checkbox>
                                    <el-checkbox-group v-model="shangpinList" @change="CitiesChange">
                                        <el-checkbox v-for="city in shangpin" :label="city" :key="city.id">{{city.goodsType}}</el-checkbox>
                                    </el-checkbox-group> -->
                                    <div class="btn">
                                        <el-button @click="shangpinent">确认</el-button>
                                    </div>
                                    <!-- <el-button slot="reference">click 激活</el-button> -->
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ipt">
                    <div class="left"> 
                        <span>使用说明</span>
                    </div>
                    <div class="right">
                        <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="instructions">
                        </el-input>
                    </div>
                </div>
            </div></el-col>
        </el-row>
        <div class="btn">
            <el-button  v-on:click="prev">取消</el-button>
            <el-button type="primary" style=" margin-left: 200px;" v-on:click="tijiao">保存</el-button>
        </div>
        </div>
        
    </div>
    
</template>

<script>
// import icons from './requireIcons'
import clipboard from "@/utils/clipboard";
import { getOilsList } from "@/api/youhuiquan";
import { addyouhui } from "@/api/youhuiquan";
import { getGoodsList } from "@/api/youhuiquan";

const cityOptions = [
//   "92号汽油",
//   "95号汽油",
//   "98号汽油",
//   "0号柴油",
//   "-10号柴油",
//   "-20号柴油",
//   "-35号柴油"
];
const shangpinOptions = [
//   "日用品",
//   "饮料",
//   "日用品",
//   "饮料",
//   "日用品",
//   "饮料",
//   "日用品",
//   "饮料",
//   "日用品",
//   "饮料",
//   "日用品"
];
export default {
  name: "NewTicket",
  data() {
    return {
        start:2,//是否选中指定日期
        get:'',//是否选中领取日期
      textarea:
        "尊敬的用户，您获得[公司]优惠券（[券名]），券号为[券号]，有效期为[有效期]，使用和条件：需最低消费[最低消费]元。祝您愉快，详情咨询：[店面电话]",
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
      //新增数据
      name:'',
      discountCouponType:1,//优惠类型 1、代金券 2、折扣券
      discountCouponValue:'',//券面金额
      couponDiscount:'',//券面折扣
      periodOfValidity:'',//有效期
      startDate:'',//开始日期
      startTime:'',//开始时间点
      getTime:'',//领取时间点
      getDate:'',//领取日期
      minimumConsumption:'',//最低消费
      instructions:'',//使用说明
      typeOptions:[{
        value: 1,
        label: '代金券'
      },{
        value: 2,
        label: '折扣券'
      },],//
      periodOfValidityOptions:[{
        value: 30,
        label: '30天'
      },{
        value: 60,
        label: '60天'
      },],//
      couponDiscountOptions:[{
        value: 0.2,
        label: '0.2'
      },{
        value: 0.8,
        label: '0.8'
      },],//
     discountCouponValueOptions:[{
        value: 100,
        label: '100'
      },{
        value: 200,
        label: '200'
      },],//
      radio:'',
      radio1:'',
    };
  },
  mounted(){
    this.getlist()
  },
  methods: {
    getlist(){
        var data = {}
        getOilsList(data)
            .then(response => {
                console.log(response.data)
                this.cities = response.data
            })
        getGoodsList(data)
            .then(response => {
                console.log(response.data)
                this.shangpin = response.data
            })
    },
    handleCheckAllChange(val) {
        var c=JSON.parse(JSON.stringify(this.cities));
        console.log(val)
        c.forEach(v => {
            if (v.id==val) {
                this.youpinList = []
                this.youpinList.push(v)
            }
        });
        // this.youpinList = val ? val : [];
        this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    AllChange(val) {
        var a = JSON.parse(JSON.stringify(this.shangpin))
        console.log(val)
        a.forEach(v => {
            if (v.id==val) {
                this.shangpinList = []
                this.shangpinList.push(v)
            }
        });
        // this.shangpinList = val ? a : [];
        this.shangpinisIndeterminate = false;
    },
    CitiesChange(value) {
      let checkedCount = value.length;
      this.shangpinAll = checkedCount === this.shangpin.length;
      this.shangpinisIndeterminate =
        checkedCount > 0 && checkedCount < this.shangpin.length;
    },
   //返回上一页
    prev(){
      this.$router.go(-1)
    },
    //油品添加确认按钮事件、
    ent(){
        this.dialogFormVisible=false
        if(this.youpinList.length>0){
            this.youpinaddVisible=false
            this.youpinjia=true
            this.shangpinList=[]
            // console.log(this.youpinList)
        }
    },
    //商品添加确认按钮事件、
    shangpinent(){
        this.spVisible=false
        if(this.shangpinList.length>0){
            this.shangpinaddVisible=false
            this.shangpinjia=true
            this.youpinList=[]
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
            this.shangpinList.push(shangpinValue);
        }
        this.shangpinVisible = false;
        this.shangpinList = '';
    },
    tijiao(){
        if(this.name==null||this.name==''){
            this.$message({
                message: '标题不能为空',
                type: 'warning'
            });
            return
        }
        
        var that = this;
        // if(!(this.couponDiscount<1&&this.couponDiscount>0)){
        //     alert('请输入正确的折扣价')
        //     return
        // }
        var num
        var couponDiscount
        // this.discountCouponType =
        if(this.discountCouponType==1){
            if(this.discountCouponValue==null||this.discountCouponValue==''){
                this.$message({
                    message: '请输入券面金额',
                    type: 'warning'
                });
                return
            }else{
                num=1
                couponDiscount = that.discountCouponValue
            }
            
        }else if(this.discountCouponType==2){
            if(this.couponDiscount==null||this.couponDiscount==''){
                this.$message({
                    message: '请输入折扣比例',
                    type: 'warning'
                });
                return
            }else{
                num=2
                couponDiscount = that.couponDiscount
            }
        }
        if(this.periodOfValidity==null||this.periodOfValidity==''){
            this.$message({
                message: '请选择有效期',
                type: 'warning'
            });
            return
        }
        if(this.minimumConsumption==null||this.minimumConsumption==''){
            this.$message({
                message: '请输入最低消费',
                type: 'warning'
            });
            return
        }
        if(this.instructions==null||this.instructions==''){
            this.$message({
                message: '请输入使用说明',
                type: 'warning'
            });
            return
        }
        var shijian
        if(that.start==1){
            shijian = that.startDate
        }else{
            shijian = null
        }
        var couponGoodsList = []
        if(this.youpinList.length!=0){
            for(var i = 0; i<this.youpinList.length; i++){
                couponGoodsList.push({
                    type:this.youpinList[i].oils_type,
                    goodsId:this.youpinList[i].id
                })
            }
        }
        if(this.shangpinList.length!=0){
            for(var i = 0; i<this.shangpinList.length; i++){
                couponGoodsList.push({
                    type:2,
                    goodsId:this.shangpinList[i].id
                })
            }
        }
        var data = {
            'name':that.name,
            'couponType':num,
            'couponDiscount': Number(couponDiscount),
            'periodOfValidity': Number(that.periodOfValidity),
            'startTime':shijian,
            'minimumCharge': Number(that.minimumConsumption),
            'instruction':that.instructions,
            'couponGoodsList':couponGoodsList
        }
        console.log(data)
        addyouhui(data)
            .then(response => {
                console.log(response.data)
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.prev()
            })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.biao {
  text-align: center;
}
.biao table {
  text-align: center;
}
.el-input {
  width: 200px;
}
.ipt {
  margin-bottom: 20px;
}
.bg-purple {
  padding-top: 30px;
}
.bg-purple-light {
  padding-top: 30px;
}
.el-select{
  width: 200px;
}
.ipt p {
  font-size: 12px;
  margin-bottom: 30px;
}

.riqi {
  display: inline-block;
}
.left,
.right {
  display: inline-block;
}
.left {
  width: 110px;
  text-align: left;
  vertical-align: top;
  line-height: 36px;
}
.bg-purple-light .right {
  width: 70%;
  text-align: left;
}
.el-checkbox-group {
  display: inline-block;
}
.el-checkbox {
  margin: 0;
  display: block;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.warp{
    background-color: #F6F7FB;
    // padding: 20px ;
}
.main{
    min-height: calc(100vh - 180px);
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 0 2%;
}
.header{
    background-color: #fff;
    border-bottom: 1px solid #EDEDED;
    height: 60px;
    padding-left: 1%;
}   
.header h3{
    line-height: 60px;
    margin: 0;
}
.youpin .left{
    width: 80px;
    padding: 0;
}
.youpin .tag{
    max-width: 365px;
    height: 80px;
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
    top: calc(50% - 9px);
    right: calc(50% - 26px);
    cursor:pointer;
}
.el-icon-plus{
    cursor:pointer;
}
.youpin{
    margin-bottom: 20px;
}
.main .btn{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-radio{
    display: block;
    margin: 10px 0 0;
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
.newTicket .el-popover{
    height: 310px;
    overflow: auto;
}
</style>
