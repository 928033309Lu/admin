<template>
  <div class="warp">
    <div class="header">
        <h3><el-button circle @click="prev"><i class="el-icon-arrow-left"></i></el-button>车队卡</h3>
    </div>
    <div class="main">
        <div class="top">
            <div class="header">
                <h3><span></span>卡片信息</h3>
            </div> 
            <div class="xinxi">
                <div class="box">
                    <div class="shang">主卡卡号：{{xinxi.mcardNo}}</div>
                    <div class="xia">账户余额：{{xinxi.totalAmount}}</div>
                </div>
                <div class="box">
                    <div class="shang">子卡数量：{{tableData.length}}</div>
                    <div class="xia">主卡余额：{{xinxi.mcardAmount}}</div>
                </div>
                <div class="box">
                    <div class="shang">积分： {{xinxi.totalPoint||0}}</div>
                    <div class="xia">
                        状态：
                        <span v-show="xinxi.mcardStatus==1">冻结</span> 
                        <span v-show="xinxi.mcardStatus==0">启用</span>
                    </div>
                </div>
                <div class="box">
                    <div class="shang">开户地点：{{xinxi.shortName}}</div>
                </div>
            </div>
            <div class="biao">
                <div class="table">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        label="子卡卡号"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.cardNo }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="标注"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.remark }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="手机号"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.phone }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="余额"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.cardAmount }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        align="center">
                        <template slot-scope="scope">
                            <span v-show="scope.row.status==1">停用</span>
                            <span v-show="scope.row.status==0">启用</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="上次分配时间"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.distributeTimeStr }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="上次消费时间"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.consumeTimeStr }}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                </div> 
            </div>
        </div>
        <div class="footer">
            <div class="header">
                <h3><span></span>单位档案信息</h3>
            </div> 
            <div class="dangan">
                <div class="box">
                    <div class="block">
                        <div class="left">
                            <span>公司名称</span>
                        </div>
                        <div class="right">
                            {{xinxi.name}}
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
                            <span>所属行业</span>
                        </div>
                        <div class="right">
                            <span v-show="xinxi.vocationId==1">农、林、牧、渔业</span>
                            <span v-show="xinxi.vocationId==2">采矿业</span>
                            <span v-show="xinxi.vocationId==3">制造业</span>
                            <span v-show="xinxi.vocationId==4">电力、热力、燃气及水的生产和供应业</span>
                            <span v-show="xinxi.vocationId==5">环境和公共设施管理业</span>
                            <span v-show="xinxi.vocationId==6">建筑业</span>
                            <span v-show="xinxi.vocationId==7">交通运输、仓储业和邮政业</span>
                            <span v-show="xinxi.vocationId==8">信息传输、计算机服务和软件业</span>
                            <span v-show="xinxi.vocationId==9">批发和零售业</span>
                            <span v-show="xinxi.vocationId==10">住宿、餐饮业</span>
                            <span v-show="xinxi.vocationId==11">金融、保险业</span>
                            <span v-show="xinxi.vocationId==12">房地产业</span>
                            <span v-show="xinxi.vocationId==13">租赁和商务服务业</span>
                            <span v-show="xinxi.vocationId==14">科学研究、技术服务和地质勘查业</span>
                            <span v-show="xinxi.vocationId==15">水利、环境和公共设施管理业</span>
                            <span v-show="xinxi.vocationId==16">居民服务和其他服务业</span>
                            <span v-show="xinxi.vocationId==17">教育</span>
                            <span v-show="xinxi.vocationId==18">卫生、社会保障和社会服务业</span>
                            <span v-show="xinxi.vocationId==19">文化、体育、娱乐业</span>
                            <span v-show="xinxi.vocationId==20">综合（含投资类、主业不明显）</span>
                            <span v-show="xinxi.vocationId==21">其他</span>
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
                            <span>所在省份</span>
                        </div>
                        <div class="right">
                            <span>{{xinxi.provinceId}}</span>
                            <!-- <el-input v-model="provinces" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>详细地址</span>
                        </div>
                        <div class="right">
                            <span>{{xinxi.address}}</span>
                            <!-- <el-input v-model="address" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                        </div>
                    </div>
                </div>
                <div class="box">
                    <!-- <div class="block">
                        <div class="left">
                            <span>公司法人</span>
                        </div>
                        <div class="right">
                            <el-input v-model="contactTelephone" placeholder="请输入内容" style="width: 200px;"></el-input>
                        </div>
                    </div> -->
                    <div class="block">
                        <div class="left">
                            <span>证件类型</span>
                        </div>
                        <div class="right">
                            <span v-show="xinxi.paperType==1">营业执照</span>
                            <span v-show="xinxi.paperType==2">法人身份证</span>
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
                            <span>公司电话</span>
                        </div>
                        <div class="right">
                            <span>{{xinxi.companyPhone}}</span>
                            <!-- <el-input v-model="workTelephone" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>所在地区</span>
                        </div>
                        <div class="right">
                            <span>{{xinxi.cityId}}</span>
                            <!-- <el-input v-model="region" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                        </div>
                    </div>
                    
                </div>
                
                <div class="box">
                    <div class="block">
                        <div class="left">
                            <span>证件号码</span>
                        </div>
                        <div class="right">
                            <span>{{xinxi.paperNo}}</span>
                            <!-- <el-input v-model="IdentificationNumber" placeholder="请输入内容" style="width: 200px;"></el-input> -->
                        </div>
                    </div>
                    
                    <div class="block">
                        <img src="" alt="">
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
                <h3><span></span>车队管理员信息
                 <!-- <el-input v-model="phone" placeholder="请输入内容" style="width: 200px;margin-left: 20px;"></el-input> <el-button  type="primary" @click="cha">查询</el-button> -->
                </h3>
            </div> 
            <div class="guanli">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
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
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
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
                                    <el-radio v-model="isIntegral" label= '1'>是</el-radio>
                                    <el-radio v-model="isIntegral" label= '0'>否</el-radio>
                                </div>
                            </div>
                            <!-- <div class="block">
                                <div class="left">
                                    <span>限制商品</span>
                                </div>
                                <div class="right">
                                    <el-radio v-model="isIntegral" label="1">是</el-radio>
                                    <el-radio v-model="isIntegral" label="2">否</el-radio>
                                </div>
                            </div> -->
                            <!-- <div class="block">
                                <span>可购商品</span>
                            </div> -->
                            
                            <!-- <div class="block">
                                <div class="shang">
                                    <div class="tag">
                                        <el-tag
                                            :key="tag"
                                            v-for="tag in shangpinList"
                                            closable
                                            :disable-transitions="false"
                                            @close="Close(tag)">
                                            {{tag}}
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
                                        style="height: 310px;overflow: hidden;"
                                        trigger="click"
                                        v-model="spVisible">
                                        <el-checkbox :indeterminate="shangpinisIndeterminate" v-model="shangpinAll" @change="AllChange">所有</el-checkbox>
                                        <el-checkbox-group v-model="shangpinList" @change="CitiesChange">
                                            <el-checkbox v-for="city in shangpin" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                        <div class="btn">
                                            <el-button @click="shangpinent">确认</el-button>
                                        </div>
                                    </el-popover>
                                </div>
                            </div> -->
                            <div class="block">
                                <div class="left">
                                    <span>限制油站</span>
                                </div>
                                <div class="right" @click='yzVisible=false'>
                                    <el-radio v-model="isStation" label="1">是</el-radio>
                                    <el-radio v-model="isStation" label="0">否</el-radio>
                                </div>
                            </div>
                            <div class="block">
                                <span>定点油站</span>
                            </div>
                            <div class="block">
                                <div class="zhan">
                                    <div class="tag">
                                        <el-tag
                                            :key="tag"
                                            v-for="tag in youzhanList"
                                            closable
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
                                        <i class="el-icon-plus" @click='yzVisible=true' v-show="!youzhanaddVisible"></i>
                                        <div class="tianjia" v-show="youzhanaddVisible" @click='yzVisible=true' slot="reference">
                                            <i class="el-icon-plus"></i>
                                            <span>添加</span>
                                        </div>
                                    </div>
                                    <el-popover
                                        placement="right"
                                        style="height: 310px;overflow: hidden;"
                                        trigger="click"
                                        v-show="isStation==1"
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
                                    <el-input v-model="xinxi.consumeAmount" placeholder="" style="width: 100px;"></el-input>元
                                </div>
                            </div>
                            <!-- <div class="block">
                                <div class="left">
                                    <span>限制油品</span>
                                </div>
                                <div class="right">
                                    <el-radio v-model="isOlis" label="1">是</el-radio>
                                    <el-radio v-model="isOlis" label="2">否</el-radio>
                                </div>
                            </div> -->
                            <!-- <div class="block">
                                <span>可购油品</span>
                            </div> -->
                            <!-- <div class="block">
                                <div class="tian">
                                    <div class="tag">
                                        <el-tag
                                            :key="tag"
                                            v-for="tag in youpinList"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleClose(tag)">
                                            {{tag}}
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
                                        placement="top"
                                        style="height: 310px;overflow: hidden;"
                                        trigger="click"
                                        v-model="dialogFormVisible">
                                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所有</el-checkbox>
                                            <el-checkbox-group v-model="youpinList" @change="handleCheckedCitiesChange">
                                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                        <div class="btn">
                                            <el-button @click="ent">确认</el-button>
                                        </div>
                                    </el-popover>
                                </div>
                                
                            </div> -->
                            <div class="block">
                                <div class="left">
                                    <span>消费折扣</span>
                                </div>
                                <div class="right" @click='zkVisible=false'>
                                    <el-radio v-model="isDiscount"  label="1">是</el-radio>
                                    <el-radio v-model="isDiscount"  label="0">否</el-radio>
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
                                        <i class="el-icon-plus" @click='zkVisible=true' v-show="!zhekouaddVisible"></i>
                                        <div class="tianjia" v-show="zhekouaddVisible" @click='zkVisible=true' slot="reference">
                                            <i class="el-icon-plus"></i>
                                            <span>添加</span>
                                        </div>
                                    </div>
                                    <el-popover
                                        placement="top"
                                        style="height: 310px;overflow: hidden;"
                                        trigger="click"
                                        v-show="isDiscount==1"
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
            <el-button type="primary" @click="queren">确认</el-button>
        </div>
    </div>
  </div>
</template>

<script>
    import { getxiangqing } from '@/api/cheduiguanli'
    import { chacheguan } from '@/api/cheduiguanli'
    import { getyouzhan } from '@/api/cheduiguanli'
    import { getyoupin } from '@/api/cheduiguanli'
    import { xiuxiangqing } from '@/api/cheduiguanli'

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
        memberId:'3456789987654',//会员号
        name:'张三',//姓名
        masterCardBalance:'5000',//主卡余额
        membershipLevel:'砖石',//会员等级
        membershipType:'车队',//会员类型
        integral:'300',//积分
        phoneNumber:'12345667899',//手机号
        openingPlace:'北京一号加油站',//开户地点
        unitName:'天津哇哈哈有限公司',//单位名称
        stateSwitch:false,//状态开关
        //表格临时数据
        tableData:[{
            cardNumber:'HY79760077',//卡号
            transactionTime:'2018-09-18 21:00:00',//交易时间
            state:'消费',//状态
            batch:'23456789877',//交易流水号
            paymentMethod:'会员卡',//支付方式
            transactionAmount:'22.00',//交易金额
            transactionPlace:'北京一号加油站',//交易地点
            balance:'22.00',//余额
        }],
        industry:'',//所属行业
        industryOptions:[{
            value: '1',
            label: '批发'
        }],
        documentType:'营业执照',//证件类型
        IdentificationNumber:'10234567899877455',//证件号码
        workTelephone:'1098691850',//单位电话
        provinces:'北京',//所在省份
        region:'朝阳',//所在地区
        address:'亚运村街道123号',//详细地址
        contactTelephone:'12345667899',//联系人电话
        contactName:'张三',//联系人姓名
        contactLifeDay:'1990-09-18',//联系人生日
        isIntegral:'',//是否启用积分
        isCommodity:'',//是否限制商品
        amountAgreed:'',//约定消费金额
        isOlis:'',//是否限制油品
        isDiscount:'',//是否有消费折扣
        //油品
        youpinList: [],
        checkAll: false,
        cities: [],
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
        isStation:'1',//是否限制油站
        youzhanList: [],
        // youzhan: youzhanOptions,
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
        //管理员信息
        guanli:{
            username:'张三',
            phone:'18956321586',
            memberNo:'135746544165',
            documentNo:'',//身份证号
        },
        //信息
        xinxi:{

        },
        phone:'',//查询会员条件
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get(){
        var a = {}
        getyouzhan(a)
            .then(response => {
                console.log(response.data)
                this.youzhanxinxi = response.data
                for(var i=0 ;i<response.data.length;i++){
                    this.youzhan.push(response.data[i].shortName)
                }
            })
        getyoupin(a)
            .then(response => {
                console.log(response.data)
                this.zhekouxinxi = response.data
                for(var i=0 ;i<response.data.length;i++){
                    this.zhekou.push(response.data[i].oils_name)
                }
            })
        var id = this.$route.query.id
        var data = {
            "id": id,
        }
        getxiangqing(data)
            .then(response => {
                console.log(response.data)
                this.xinxi = response.data.newTbMotorcade
                this.tableData = response.data.tbChildMotorcadeCardList
                this.guanli = {
                    username:response.data.newTbMotorcade.adminUsername,
                    phone:response.data.newTbMotorcade.adminPhone,
                    memberNo:response.data.newTbMotorcade.adminMemberNo,
                    documentNo:response.data.newTbMotorcade.adminDocumentNo,
                    memberId:response.data.newTbMotorcade.memberId,
                }
                this.isIntegral = response.data.newTbMotorcade.pointType.toString()
                this.isStation = response.data.newTbMotorcade.stationRestrict.toString()
                this.isDiscount = response.data.newTbMotorcade.isHaveDiscount.toString()
                for(var i= 0;i<response.data.TbMotorcadeStationList.length;i++){
                    this.youzhanList.push(response.data.TbMotorcadeStationList[i].shortName)
                }
                for(var i= 0;i<response.data.tbMotorcadeDiscountList.length;i++){
                    this.zhekouList.push(response.data.tbMotorcadeDiscountList[i].goodsName)
                    this.jia.push(response.data.tbMotorcadeDiscountList[i].goodsAmount)
                }
                if(this.zhekouList.length!=0){
                    this.zhekouaddVisible = false
                }
                if(this.youzhanList.length!=0){
                    this.youzhanaddVisible = false
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
    },
    queren(){
        var tbMotorcadeStationArr = []
        var tbMotorcadeDiscountArr = []
        for(var i = 0;i<this.youzhanList.length;i++){
            tbMotorcadeStationArr.push({
                stationId: this.youzhanxinxi[this.youzhan.indexOf(this.youzhanList[i])].id  
            })
        }
        for(var i = 0;i<this.zhekouList.length;i++){
            tbMotorcadeDiscountArr.push({
                "goodsAmount": this.jia[i],
                "goodsId": this.zhekouxinxi[this.zhekou.indexOf(this.zhekouList[i])].id  ,
                "type": 1
            })
        }
        var data ={
            "id": this.xinxi.id,
            "username":this.guanli.username,
            "phone":this.guanli.phone,
            "memberNo":this.guanli.memberNo,
            "documentNo":this.guanli.documentNo,
            "tbMotorcadeStationArr":tbMotorcadeStationArr,
            "tbMotorcadeDiscountArr":tbMotorcadeDiscountArr,
            "pointType": Number(this.isIntegral),
            "stationRestrict": Number(this.isStation),
            "isHaveDiscount": Number(this.isDiscount),
            "consumeAmount": this.xinxi.consumeAmount,
        }
        console.log(data)
        xiuxiangqing(data)
            .then(response => {
                console.log('成功')
                console.log(response.data)
                // this.$message({
                //     message: '保存成功',
                //     type: 'success'
                // });
                this.prev()
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
        console.log(this.youzhanList)
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
.block img{
    width: 300px;
    height: 200px;
}
.dangan .block{
    margin-bottom: 45px;
}
.box .block:last-of-type{
    margin-bottom: 0;
}
.guanli{
    padding: 0 20px;
}
.btn{
    text-align: center;
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
</style>