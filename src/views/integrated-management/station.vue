<template>
	<div class="warp">
		<el-tabs type="border-card">
			<el-tab-pane label="油站管理">
				<el-table
				:data="tableData"
				stripe
				border
				style="width: 100%">
				<el-table-column
				label="油站编码"
				align="center"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.oilStationCode }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="油站名称"
				min-width="150"
				align="center"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.oilName }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="油罐数量"
				align="center"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.oilTanksQuantity }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="油枪数量"
				align="center"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.oilGunsNumber }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="营业状态"
				align="center"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.businessStatus }}</span>
				</template>
				</el-table-column>
				<el-table-column
				label="创建时间"
				align="center"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.creationTime }}</span>
				</template>
				</el-table-column>
				<el-table-column label="操作" align="center" min-width="160px">
				<template slot-scope="scope">
					<el-button
					size="mini"
					@click="administrationEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">查看</el-button>
				</template>
				</el-table-column>
			</el-table>

			</el-tab-pane>
			<el-tab-pane label="油站申请">
				<div class="btn">
					<el-button  @click="applicationVisible = true">油站申请</el-button>
				</div>
				<el-table
				:data="applyData"
				stripe
				border
				style="width: 100%">
					<el-table-column
					label="油站名称"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.oilName }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="油罐数量"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.oilTanksQuantity }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="油枪数量"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.oilGunsNumber }}</span>
					</template>
					</el-table-column>
					<el-table-column
					label="状态"
					align="center"
					>
					<template slot-scope="scope">
						<span v-if="scope.row.status==1">待审核</span>
						<span v-if="scope.row.status==2">已审核</span>
					</template>
					</el-table-column>
					<el-table-column
					label="申请时间"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{ scope.row.applyTime }}</span>
					</template>
					</el-table-column>
					<el-table-column label="操作" align="center" min-width="160px">
					<template slot-scope="scope">
						<el-button
						size="mini"
						@click="application(scope.$index, scope.row)">编辑</el-button>
						<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">查看</el-button>
					</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<!-- 油站管理信息查看框 -->
	<el-dialog :visible.sync="administrationVisible" width='90%' title="油站信息">
        <div class="header">
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<div class="box">
							<span>油站全称：</span>
							<span>{{oilStationFullName}}</span>
						</div>	
						<div class="box">
							<span>油站简称：</span>
							<el-input v-model="oilStationAbbreviation" style="width:200px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>油站位置：</span>
							<div class="dizhi">
								<v-distpicker @selected="onSelected"></v-distpicker>
							</div>
						</div>
						<div class="box">
							<span class="zuo">坐标：</span>
							<el-input v-model="longitude" style="width:94px" placeholder="请输入内容"></el-input>
							<span>-</span>
							<el-input v-model="latitude" style="width:94px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>营业状态：</span>
							<el-select v-model="businessStatus"  clearable placeholder="请选择">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="box">
							<p>油枪油罐对应关系</p>
							<el-table
							:data="relationshipData"
							stripe
							style="width: 100%">
								<el-table-column
									prop="oilGunNumber"
									label="油枪号"
									align="center">
								</el-table-column>
								<el-table-column
									prop="oilNumber"
									label="油品号"
									align="center">
								</el-table-column>
								<el-table-column
									prop="tankNumber"
									align="center"
									label="油罐号">
								</el-table-column>
							</el-table>
						</div>
					</div>
				</el-col>
				<el-col :span="11">
					<div class="grid-content bg-purple-light">
						<div class="box">
							<span>油站编码：</span>
							<span>{{oilStationCode}}</span>
						</div>
						<div class="box">
							<span>油站电话：</span>
							<el-input v-model="oilStationTelephone" style="width:200px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>详细地址：</span>
							<el-input v-model="detailedAddress" style="width:200px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>营业时间：</span>
							<el-time-picker
								is-range
								style="width: 330px;"
								v-model="businessHours"
								range-separator="至"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
								placeholder="选择时间范围">
							</el-time-picker>
						</div>
						<div class="box">
							<span>营业执照</span>
							<div class="up">
								<el-upload
									class="avatar-uploader"
									action="https://httpbin.org/post"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</div>
						</div>
						<div class="radio">
							<span>是否开设便利店：</span>
							<el-radio v-model="openStore" label="1">是</el-radio>
  							<el-radio v-model="openStore" label="2">否</el-radio>
							<span>是否没有洗车服务：</span>
							<el-radio v-model="carWashing" label="1">是</el-radio>
  							<el-radio v-model="carWashing" label="2">否</el-radio>
						</div>
						<div class="radio">
							<span>是否开放卫生间：</span>
							<el-radio v-model="openToilet" label="1">是</el-radio>
  							<el-radio v-model="openToilet" label="2">否</el-radio>
							<span>是否没有维修服务：</span>
							<el-radio v-model="maintenance" label="1">是</el-radio>
  							<el-radio v-model="maintenance" label="2">否</el-radio>
						</div>
						
					</div>
				</el-col>
			</el-row>
        </div>
        <div slot="footer" class="dialog-footer">
			<el-button   @click="administrationVisible = false">取消</el-button>
			<el-button type="primary"  @click="administrationVisible = false">确认</el-button>
        </div>
    </el-dialog>
	<!-- 油站申请信息编辑框 -->
	<el-dialog :visible.sync="applicationVisible" width='90%' title="油站信息">
        <div class="header">
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						<div class="box">
							<span>油站全称：</span>
							<span>{{oilStationFullName}}</span>
						</div>	
						<div class="box">
							<span>油站简称：</span>
							<el-input v-model="oilStationAbbreviation" style="width:200px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>油站位置：</span>
							<div class="dizhi">
								<v-distpicker @selected="onSelected"></v-distpicker>
							</div>
						</div>
						<div class="box">
							<span class="zuo">坐标：</span>
							<el-input v-model="longitude" style="width:94px" placeholder="请输入内容"></el-input>
							<span>-</span>
							<el-input v-model="latitude" style="width:94px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>营业状态：</span>
							<el-select v-model="businessStatus"  clearable placeholder="请选择">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
				</el-col>
				<el-col :span="11">
					<div class="grid-content bg-purple-light">
						<div class="box">
							<span>油站编码：</span>
							<span>{{oilStationCode}}</span>
						</div>
						<div class="box">
							<span>油站电话：</span>
							<el-input v-model="oilStationTelephone" style="width:200px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>详细地址：</span>
							<el-input v-model="detailedAddress" style="width:200px" placeholder="请输入内容"></el-input>
						</div>
						<div class="box">
							<span>营业时间：</span>
							<el-time-picker
								is-range
								style="width: 330px;"
								v-model="businessHours"
								range-separator="至"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
								placeholder="选择时间范围">
							</el-time-picker>
						</div>
						<div class="box">
							<span>营业执照</span>
							<div class="up">
								<el-upload
									class="avatar-uploader"
									action="https://httpbin.org/post"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload">
									<img v-if="imageUrl" :src="imageUrl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</div>
						</div>
						<div class="radio">
							<span>是否开设便利店：</span>
							<el-radio v-model="openStore" label="1">是</el-radio>
  							<el-radio v-model="openStore" label="2">否</el-radio>
							<span>是否没有洗车服务：</span>
							<el-radio v-model="carWashing" label="1">是</el-radio>
  							<el-radio v-model="carWashing" label="2">否</el-radio>
						</div>
						<div class="radio">
							<span>是否开放卫生间：</span>
							<el-radio v-model="openToilet" label="1">是</el-radio>
  							<el-radio v-model="openToilet" label="2">否</el-radio>
							<span>是否没有维修服务：</span>
							<el-radio v-model="maintenance" label="1">是</el-radio>
  							<el-radio v-model="maintenance" label="2">否</el-radio>
						</div>
						
					</div>
				</el-col>
			</el-row>
        </div>
        <div slot="footer" class="dialog-footer">
			<el-button  @click="applicationVisible = false">取消</el-button>
			<el-button type="primary"  @click="applicationVisible = false">确认</el-button>
        </div>
    </el-dialog>
	</div>
</template>

<script>
import VDistpicker from 'v-distpicker'

 export default {
	name: "stationDemos",
	components: { VDistpicker },
    data() {
      return {
		administrationVisible:false,//控制油站管理弹出框显示与隐藏
		applicationVisible:false,//控制油站申请编辑弹出框显示与隐藏
		  //油站管理临时数据
        tableData: [{
          oilStationCode: 'A001',//油站编码
          oilName: '北京一号加油站',//油站名称
		  oilTanksQuantity: '4',//油罐数量
		  oilGunsNumber :'8',//油枪数量
		  businessStatus:'营业中',//营业状态
		  creationTime:'2018-10-25',//创建时间
		},
		{
          oilStationCode: 'A001',//油站编码
          oilName: '北京一号加油站',//油站名称
		  oilTanksQuantity: '4',//油罐数量
		  oilGunsNumber :'8',//油枪数量
		  businessStatus:'营业中',//营业状态
		  creationTime:'2018-10-25',//创建时间
		},
		{
          oilStationCode: 'A001',//油站编码
          oilName: '北京一号加油站',//油站名称
		  oilTanksQuantity: '4',//油罐数量
		  oilGunsNumber :'8',//油枪数量
		  businessStatus:'营业中',//营业状态
		  creationTime:'2018-10-25',//创建时间
		},
		{
          oilStationCode: 'A001',//油站编码
          oilName: '北京一号加油站',//油站名称
		  oilTanksQuantity: '4',//油罐数量
		  oilGunsNumber :'8',//油枪数量
		  businessStatus:'营业中',//营业状态
		  creationTime:'2018-10-25',//创建时间
		},],
		//油站申请临时数据
		applyData:[{
          oilName: '北京一号加油站',//油站名称
		  oilTanksQuantity: '4',//油罐数量
		  oilGunsNumber :'8',//油枪数量
		  status:1,//状态 1、待审批 2、已审核
		  applyTime:'2018-10-25',//申请时间
		},
		{
      oilName: '北京一号加油站',//油站名称
		  oilTanksQuantity: '4',//油罐数量
		  oilGunsNumber :'8',//油枪数量
		  status:2,//状态 1、待审批 2、已审核
		  applyTime:'2018-10-25',//申请时间
		}],
		options: [{
          value: '1',
          label: '营业中'
        },{
          value: '2',
          label: '临时停业'
        },{
          value: '3',
          label: '永久停业'
        }],
		oilStationFullName:'北京石油有限公司北京一号加油站',//油站全称
		oilStationAbbreviation:'北京一号加油站',//油站简称
		longitude:'经度 20',//经度
		latitude:'纬度 20',//纬度
		businessStatus:'1',//营业状态
		openStore:'',//是否开设便利店
		openToilet:'',//是否开放卫生间
		oilStationCode:'UA01',//油站编码
		oilStationTelephone:'15012334566',//油站电话
		detailedAddress:'XX路XX号',//详细地址
		businessHours:[new Date(2018, 9, 10, 8, 0),new Date(2018, 9, 10, 18, 0)],//营业时间 开始-结束
		carWashing:'',//是否没有洗车服务
		maintenance:'',//是否没有维修服务
		//油枪油罐对应关系临时表格
		relationshipData:[{
			oilGunNumber:1,//油枪号
			oilNumber:'92号车用汽油',//油品号
			tankNumber:1,//油罐号
		},{
			oilGunNumber:2,//油枪号
			oilNumber:'92号车用汽油',//油品号
			tankNumber:4,//油罐号
		},{
			oilGunNumber:3,//油枪号
			oilNumber:'92号车用汽油',//油品号
			tankNumber:2,//油罐号
		},],
		imageUrl: '',//上传地址
      }
    },
    methods: {
		//油站管理编辑
	  administrationEdit(index,row){
		this.administrationVisible=true
	  },
	  application(index,row){
		  this.applicationVisible=true
	  },
	  //地址三级联动选择数据处理
	  onSelected(data) {
		console.log(data)
		console.log(data.province + ' | ' + data.city + ' | ' + data.area)
	  },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
	  },
	  handleAvatarSuccess(res, file) {
		this.imageUrl = URL.createObjectURL(file.raw);
		console.log(this.imageUrl)
      },
    }
  }
</script>

<style scoped>
.header .box{
	margin-bottom: 20px;
}
.header .radio{
	margin-bottom: 20px;
}
.header .dizhi{
	display: inline-block;
}
.header .box>span:nth-of-type(1){
	margin-right: 6px;
	vertical-align: middle;
}
.header .bg-purple .box .zuo{
	margin-right: 33px;
}
.bg-purple-light{
	margin-left: 20px;
}
.dialog-footer{
	text-align: center;
}
.dialog-footer .el-button:nth-of-type(2){
	margin-left: 200px;
}
.up{
	display: inline-block;
	vertical-align: middle;
	padding-left: 14px;
}
.btn{
	margin-bottom: 15px;
	text-align: right;
}
span{
	line-height: 36px;
}
</style>
<style >
.el-dialog__header{
	text-align: center;
	background-color: #5B8DFF;
	color:#fff;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #fff;
}
.el-radio+.el-radio {
    margin-left: 10px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td ,
.el-table th{
  background-color: #F5F9FC;
}
.dizhi .distpicker-address-wrapper select{
  background-color: #F5F9FC;
}
.el-dialog__headerbtn .el-dialog__close{
	color: #fff;
}
</style>