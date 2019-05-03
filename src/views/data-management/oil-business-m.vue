<template>
  <div class="app-container oil-business">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 10px;">
        <el-form-item label="油品业务"/>
      </div>
      <div class="items">
        <el-form-item label="加油站" label-width="90px">
          <el-select v-model="listQuery.stationId" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in supOilstation" :key="item.id" :label="item.shortName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型" label-width="90px">
          <el-select v-model="listQuery.typeId" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in yewu" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="业务单号" label-width="90px">
          <el-input v-model="listQuery.orderNumber" placeholder="请输入内容" @input="zhuangtaiX" style="min-width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="油品" label-width="90px">
          <el-select v-model="listQuery.oilsId" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in oil" :key="item.id" :label="item.oils_no_type" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="90px">
          <el-select v-model="status" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in zhuangtai" :key="item.name" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
         <div class="dbriqi">
        <div class="qiri">时间:</div>
        <el-date-picker
		      v-model="value6"
		      type="daterange"
		      unlink-panels
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      :picker-options="pickerOptions2"
		      @change="shijian"
		      >
		    </el-date-picker>
      </div>
      </div>
      <el-table :data="list" fit highlight-current-row style="width: 100%;">
        <el-table-column label="业务类型" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务单号" min-width="130" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="营业日" min-width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.businessDay">{{ scope.row.businessDay | parseTime('{y}-{m}-{d}') }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="加油站" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="油品" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.oilsName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="90" align="center">
          <template slot-scope="scope">
          	<span v-if="scope.row.status==6">已完成</span>
          	<!--采购的-->
            <span v-if="scope.row.status==5&&scope.row.typeId==1">未收油</span>
            <!--调拨的-->
            <span v-if="scope.row.status==1&&scope.row.typeId==2">未出库</span>
            <span v-if="scope.row.status==2&&scope.row.typeId==2">运输中</span>
            <!--倒罐的-->
            <span v-if="scope.row.status==0&&scope.row.typeId==3">未倒罐</span>
            
          </template>
        </el-table-column>
        <el-table-column label="申请时间" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="140" class-name="small-padding fixed-width">
          <template slot-scope="scope">
          	
            <!--采购的-->
            <el-button size="mini" type="success" v-if="scope.row.typeId==1" @click="cgDetail(scope.row)">查看</el-button>
          	<!--调拨的-->
          	<el-button size="mini" type="success" v-if="scope.row.typeId==2" @click="dbDetail(scope.row)">查看</el-button>
          	<!--倒罐的-->
          	<el-button size="mini" type="success" v-if="scope.row.typeId==3" @click="dgDetail(scope.row)">查看</el-button>
          	<!--换号的-->
          	<el-button size="mini" type="success" v-if="scope.row.typeId==4" @click="hhDetail(scope.row)">查看</el-button>
          
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    
    <!--油品采购-->
    <el-dialog :visible.sync="shangpintank" title="油品采购" class="caigousq_tab">
      <el-form label-width="110" label-position="left">
				<div class="mian_ord">
	      	<div class="shang">
						<el-form-item label="采购单号：" v-if="zhuxinxi.orderNumber">
	      		  {{zhuxinxi.orderNumber}}
	      		</el-form-item>
						<el-form-item label="所属班次：" v-if="zhuxinxi.shiftId">
	      		  {{zhuxinxi.shiftId}}
	      		</el-form-item>
						 <el-form-item
									label="订单审核时间："
									v-if="zhuxinxi.merchantAuditTime&&zhuxinxi.status==6"
							>{{zhuxinxi.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
						<el-form-item label="所属营业日：" v-if="zhuxinxi.businessDay">
	      		  {{zhuxinxi.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
	      		</el-form-item>
		        <el-form-item label="状态：" v-if="zhuxinxi.status==5">
		          	未收油
		        </el-form-item>
		        <el-form-item label="状态：" v-if="zhuxinxi.status==6">
		          	已完成
		        </el-form-item>
	      	</div>
	      	<div class="xinxi">
	      		<ul class="dade">
	      			<li>
	      				<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;">油品单信息：</div>
	      				<div class="neirong">
	      					<ul class="limiande" v-if="youchuku">
	      						<li><div>加油站 : <span>{{zhuxinxi.oilsStationName}}</span></div><div>出库油库 : <span>{{youchuku.supplierName}}</span></div></li>
	      						<li><div>油品品号: <span>{{youguige.oilsName}}</span></div><div>油品规格 :<span>{{youguige.oilsSpecName}}</span></div></li>
	      						<li><div>油仓号 : <span>{{zhuxinxi.billType}}</span></div><div>出库体积 : <span>{{youchuku.switchLitre}}升</span></div></li>
	      						<li><div>出库密度 : <span>{{youchuku.primaryDensity}}kg/m³</span></div><div>出库重量 : <span>{{youchuku.primaryWeight}}kg</span></div></li>
	      						<li><div>出库单号 : <span>{{youchuku.outOrderNum}}</span></div></li>
	      					
	      					</ul>
	      				</div>
	      			</li>	
	      			<li v-if="zhuxinxi.status==6">
	      				<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;">罐车测量信息：</div>
	      				<div class="neirong">
	      					<ul class="limiande">
	      						<li><div>实测温度 : <span>{{guanchexinxi.measuringTemperature}}℃</span></div><div>实测密度 : <span>{{guanchexinxi.measuringDensity}}kg/m³</span></div></li>
	      						<li><div>实测标密度 : <span>{{guanchexinxi.standardDensity}}kg/m³</span></div><div>是否有水 : <span v-if="guanchexinxi.isHaveWater==0">否</span><span v-if="guanchexinxi.isHaveWater==1">是</span></div></li>
	      					</ul>
	      				</div>
	      			</li>
							<li v-if="zhuxinxi.status==6">
	      				<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;">实收信息：</div>
	      				<div class="neirong">
	      					<ul class="limiande">
	      					<li><div>实收体积 : <span>{{OrderRecord.actualVolume}}升</span></div><div>实收重量 : <span>{{OrderRecord.actualWeight}}kg</span></div></li>
	      						<li><div>溢耗体积 : <span>{{OrderRecord.lossVolume}}升</span></div><div>溢耗重量 : <span>{{OrderRecord.lossWeight}}kg</span></div></li>
	      					</ul>
	      				</div>
	      			</li>
	      		</ul> 
	      		<div style="width: 100%;font-weight: bold;color:red;font-size: 15px;margin-bottom:15px;">实收详情：</div>
	      		<div class="guan" v-for="item in tableData3"  v-if="zhuxinxi.status==6">
	      			<div class="title" style="margin-left:70px">
		      			<div>开始时间：{{item[0]["kaishi"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
		      			<div>结束时间：{{item[0]["jieshu"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
	      			</div>
	      			<div>
		      			<el-table :data="item" fit style="width: 100%" :span-method="arraySpanMethod">
		    					<el-table-column prop="date" :label="item[0]['guanhao']" align="center"></el-table-column>
		    					<el-table-column label="液位仪" align="center">
										<el-table-column prop="yougao" label="油高mm" align="center"></el-table-column>
										<el-table-column prop="shuigao" label="水高mm" align="center"></el-table-column>
										<el-table-column prop="wendu" label="温度℃" align="center"></el-table-column>
										<el-table-column prop="midu" label="密度kg/m³" align="center"></el-table-column>
										<el-table-column prop="youtiji" label="油体积L" align="center"></el-table-column>
									</el-table-column>
		    					<el-table-column label="手工" align="center">
		    						<el-table-column prop="bztiji" label="标准体积L" align="center"></el-table-column>
		    					</el-table-column>
		    					<el-table-column prop="bztijiL" label="标准体积L" align="center"></el-table-column>
		    					<el-table-column prop="zhongliang" label="重量kg" align="center"></el-table-column>
		    				</el-table>
	    				</div>
	      		</div>
	      	</div>
	      </div>		        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shangpintank = false">关闭</el-button>
      </div>
    </el-dialog>
    
    <!--油品调拨-->
    <el-dialog :visible.sync="youpintank" title="油品调拨" class="caigousq_tab">
      <el-form label-width="110" label-position="left">
				<div class="mian_ord">
	      	
	      	<div class="shang guan">
      			<div class="title" style="width: 100%;">
      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">调拨单信息：</div>
      			</div>
	      		<el-form-item label="调拨单号：">
		          {{dbzhuxinxi.orderNumber}}
		        </el-form-item>
		        <el-form-item label="状态：">
		          <span v-if="dbzhuxinxi.status==1">未出库</span>
		          <span v-if="dbzhuxinxi.status==2">运输中</span>
		          <span v-if="dbzhuxinxi.status==6">已完成</span>
		        </el-form-item>
		        <el-form-item label="调出油站：">
		          {{dbzhuxinxi.oilsStationName}}
		        </el-form-item>
		        <el-form-item label="调入油站：">
		          {{dbzhuxinxi.inputOilsStationName}}
		        </el-form-item>
		        <el-form-item label="油品：">
		          {{dbzhuxinxi.oilsName}}
		        </el-form-item>
		        <el-form-item label="溢耗体积：" v-if="dbzhuxinxi.status==6">
		          {{dbzhuxinxi.oilsOrderRecord.lossVolume}}升
		        </el-form-item>
		        <el-form-item label="调入体积：" v-if="dbzhuxinxi.status==6">
		          {{dbzhuxinxi.oilsOrderRecord.actualVolume}}升
		        </el-form-item>
		        <el-form-item label="调出体积：">
		          {{dbzhuxinxi.planCount}}升
		        </el-form-item>
		        <el-form-item label="出库时间：">
		          {{dbzhuxinxi.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		        </el-form-item>
		        <el-form-item label="入库时间：" v-if="dbzhuxinxi.status==6">
		          {{dbzhuxinxi.oilsOrderRecord.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		        </el-form-item>
		        
	      	</div>
	      	
	      	<div class="xinxi" style="padding-top: 15px;" v-if="dbzhuxinxi.status==6">
	      		<div class="guan" v-for="(item,index) in tableData4">
	      			<div class="title">
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;padding: 0;" v-if="index==0">出库详情：</div>
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;padding: 0;" v-if="index==1">入库详情：</div>
	      				<div style="margin-top: 30px;margin-bottom: -10px;">营业日：{{ tableData41[index][0].businessDay | parseTime('{y}-{m}-{d}') }}</div>
	      				<div style="margin-top: 30px;margin-bottom: -10px;">班次：{{ tableData41[index][0].shiftId }}</div>
	      			</div>
	      			<ul style="margin: 0;padding: 0;">
	      				<li v-for="v in item" style="padding-top: 20px;">
	      					<div class="title">
			      				<div>开始时间：{{v[0].kaishi | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
				      			<div>结束时间：{{v[0].jieshu | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
			      			</div>
			      			<div style="border-top: 1px solid #e6e9ee;">
				      			<el-table :data="v" fit style="width: 100%" :span-method="arraySpanMethod">
				    					<el-table-column prop="date" :label="v[0]['guanhao']" align="center"></el-table-column>
				    					<el-table-column label="液位仪" align="center">
												<el-table-column prop="yougao" label="油高mm" align="center"></el-table-column>
												<el-table-column prop="shuigao" label="水高mm" align="center"></el-table-column>
												<el-table-column prop="wendu" label="温度℃" align="center"></el-table-column>
												<el-table-column prop="midu" label="密度kg/m³" align="center"></el-table-column>
												<el-table-column prop="youtiji" label="油体积L" align="center"></el-table-column>
												<el-table-column prop="bztiji" label="标准体积L" align="center"></el-table-column>
											</el-table-column>
				    					<el-table-column prop="bztijiL" label="标准体积L" align="center"></el-table-column>
				    					<el-table-column prop="zhongliang" label="重量kg" align="center"></el-table-column>
				    				</el-table>
			    				</div>
	      				</li>
	      			</ul>
	      		</div>
	      		
	      	</div>
	      	
	      	
	      </div>		        
					
		       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="youpintank = false">关闭</el-button>
      </div>
    </el-dialog>
    
    <!--油品倒罐-->
    <el-dialog :visible.sync="youpindao" title="油品倒罐" class="caigousq_tab">
      <el-form label-width="110" label-position="left">
				<div class="mian_ord">
	      	<div class="shang">
	      		<el-form-item label="所属营业日：" v-if="dgzhuxinxi.businessDay">
	      			{{dgzhuxinxi.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
	      		</el-form-item>
	      		<el-form-item label="所属班次：" v-if="dgzhuxinxi.shiftId">
	      			{{dgzhuxinxi.shiftId}}
	      		</el-form-item>
	      		<el-form-item label="订单审核时间：" v-if="dgzhuxinxi.createTime">
	      		  	{{dgzhuxinxi.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
	      		</el-form-item>
		        <el-form-item label="状态：" v-if="dgzhuxinxi.status==0">
		          	未倒罐
		        </el-form-item>
		        <el-form-item label="状态：" v-if="dgzhuxinxi.status==6">
		          	已完成
		        </el-form-item>
	      	</div>
	      	<div class="xinxi">
	      		<div class="shang guan" style="padding-top: 15px;">
	      			<div class="title" style="width: 100%;">
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">倒罐信息：</div>
	      			</div>
		      		<el-form-item label="油品倒罐单号：">
			          {{dgzhuxinxi.orderNumber}}
			        </el-form-item>
			        <el-form-item label="油品：">
			          {{dgzhuxinxi.oilsName}}
			        </el-form-item>
			        <el-form-item label="倒罐体积：" v-if="dgzhuxinxi.status==6">
			          	{{dgzhuxinxi.actualVolume}}升
			        </el-form-item>
			        <el-form-item label="损耗：" v-if="dgzhuxinxi.status==6">
			          	{{dgzhuxinxi.lossVolume}}升
			        </el-form-item>
			        <el-form-item label="倒出罐号：">
			          	{{dgzhuxinxi.outOilcanNo}}号罐
			        </el-form-item>
			        <el-form-item label="倒入罐号：">
			          	{{dgzhuxinxi.intoOilcanNo}}号罐
			        </el-form-item>
		      	</div>
	      		
	      		<div class="guan" v-for="(item,index) in tableData5[0]" v-if="dgzhuxinxi.status==6">
	      			<div class="title">
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;" v-if="index==0">倒出详情：</div>
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;" v-if="index==1">倒入详情：</div>
		      			<div>开始时间：{{item[0]["kaishi"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
		      			<div>结束时间：{{item[0]["jieshu"] | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
	      			</div>
	      			<div>
		      			<el-table :data="item" fit style="width: 100%" :span-method="arraySpanMethod">
		    					<el-table-column prop="date" :label="item[0]['guanhao']" align="center"></el-table-column>
		    					<el-table-column label="液位仪" align="center">
										<el-table-column prop="yougao" label="油高mm" align="center"></el-table-column>
										<el-table-column prop="shuigao" label="水高mm" align="center"></el-table-column>
										<el-table-column prop="wendu" label="温度℃" align="center"></el-table-column>
										<el-table-column prop="midu" label="密度kg/m³" align="center"></el-table-column>
										<el-table-column prop="youtiji" label="油体积L" align="center"></el-table-column>
									</el-table-column>
		    					<el-table-column label="手工" align="center">
		    						<el-table-column prop="bztiji" label="标准体积L" align="center"></el-table-column>
		    					</el-table-column>
		    					<el-table-column prop="bztijiL" label="标准体积L" align="center"></el-table-column>
		    				</el-table>
	    				</div>
	      		</div>
	      	</div>
	      </div>		        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="youpindao = false">关闭</el-button>
      </div>
    </el-dialog>
    
    <!--油品换号-->
    <el-dialog :visible.sync="youpinhuan" title="油品换号">
      <el-form label-width="110" label-position="left">
				<div class="mian_ord">
	      	<div class="shang" style="border: none;">
	      		<el-form-item label="换号时间：">
		          	{{hhxinxi.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		        </el-form-item>
		        <el-form-item label="换号罐号：">
		          	{{hhxinxi.oilcanNo}}
		        </el-form-item>
		        <el-form-item label="换前油品：">
		          	{{hhxinxi.oldOilsName}}
		        </el-form-item>
		        <el-form-item label="换后油品：">
		          	{{hhxinxi.newOilsName}}
		        </el-form-item>
		        <el-form-item label="换号体积：">
		          	{{hhxinxi.changeVolume}}升
		        </el-form-item>
	      	</div>
	      </div>		        
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="youpinhuan = false">关闭</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import { comYouzhanList,youzhanList,oilShen,oilDingXiu } from '@/api/shuju'
import { oilsBusList,oilList,oilDBDetail,oilHHDetail,oilDGDetail } from '@/api/oil'
import { shanghuList } from '@/api/shanghu'

import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {

  components: { Pagination },
  data() {
    return {
    	pickerOptions2: {
	      shortcuts: [{
	        text: '今天',
	        onClick(picker) {
	        	const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
	          picker.$emit('pick', [start, end]);
	        }
        }, {
	        text: '最近一周',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	          picker.$emit('pick', [start, end]);
	        }
	      },{
	        text: '最近14天',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
	          picker.$emit('pick', [start, end]);
	        }
	      }, {
	        text: '最近一个月',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	          picker.$emit('pick', [start, end]);
	        }
	      }]
	    },
      tableData3:[],
      tableData4:[],
      tableData41:[],
      tableData5:[],
      list: null,
	    total: 0,
	    value6: '',
	    youzhan:[],
	    zhuangtai:[{
	    	id:[5],
	    	name:'未收油'
	    },{
	    	id:[0],
	    	name:'未倒罐'
	    },{
	    	id:[1],
	    	name:'未出库'
	    },{
	    	id:[2],
	    	name:'运输中'
	    },{
	    	id:[6],
	    	name:'已完成'
	    }],
	    yewu:[{
	    	id:1,
	    	name:'油品采购'
	    },{
	    	id:2,
	    	name:'油品调拨'
	    },{
	    	id:3,
	    	name:'油品倒罐'
	    },{
	    	id:4,
	    	name:'油品换号'
	    }],
	    status:'',
      form: {
        name: ''
      },
      
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	        companyId:'',
	        stationId:'',
	        typeId:'',
	        orderNumber:'',
	        oilsId:'',
	        statusList:[],
	        cgStatusList:[5,6],
					dbStatusList:[1,2,6],
					dgStatusList:[0,6],
					hhStatusList:[6],
	        beginTime:'',
	        endTime:''
	    },
	    caigousq:false,
	    supOilstation:[],
	    suppli:[],
	    oil:[],
	    
	    youpinhuan:false,
	    youpindao:false,
	    youpintank:false,
	    
	    
	    //-------------------------------------油品详情
	    
	    shangpintank:false,
	    zhuxinxi:{},
	    youchuku:{},
	    youyunshu:{},
	    youshouyou:{},
	    youguige:{},
			youbuzhou:[],
			OrderRecord:{},
	    guanchexinxi:{},
	    
	    
	    //----------------------油品调拨详情
	    
	    dbzhuxinxi:{},
	    hhxinxi:{},
	    dgzhuxinxi:{},
	    
    }
  },
  created() {
  	  this.getshanghu();
	    this.getList();
  },
  methods: {
      getList() {
      	oilsBusList(this.listQuery).then(res=>{
      		console.log(res)
      		this.list=res.data.rows;
      		this.total=res.data.total;
      	})
      	
	    },
	    getshanghu(){
	    	youzhanList({}).then(res=>{
	    		console.log(res)
	    		this.supOilstation=res.data
	    	})
	    	oilList({}).then(res=>{
	    		this.oil=res.data;
	    	})
	    },
	    shijian(){
	    	if(this.value6){
	    		console.log(this.value6)
		    	this.listQuery.beginTime=this.value6[0];
		    	this.listQuery.endTime=this.value6[1];
	    	}else{
	    		this.listQuery.beginTime='';
	    		this.listQuery.endTime='';
	    	}
	    	this.getList();
	    },
	    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 2) {
        	
          if (columnIndex === 1) {
            return [1, 2];
          } else if (columnIndex === 2) {
            return [0, 0];
          }
          
          if (columnIndex === 4) {
            return [1, 2];
          } else if (columnIndex === 5) {
            return [0, 0];
          }
          
          if (columnIndex === 7) {
            return [1, 2];
          } else if (columnIndex === 8) {
            return [0, 0];
          }
          
        }
      },
	    zhuangtaiX(){
	    	if(this.status==""){
	    		this.listQuery.cgStatusList=[5,6];
					this.listQuery.dbStatusList=[1,2,6];
					this.listQuery.dgStatusList=[0,6];
					this.listQuery.hhStatusList=[6];
					this.listQuery.statusList=[];
//					this.listQuery.typeId="";
	    	}else{
	    		console.log(this.status)
	    		if(this.status[0]==5){
	    			this.listQuery.typeId=1
	    		}else if(this.status[0]==0){
	    			this.listQuery.typeId=3
	    		}else if(this.status[0]==1){
	    			this.listQuery.typeId=2
	    		}else if(this.status[0]==2){
	    			this.listQuery.typeId=2
	    		}else if(this.status[0]==6){
//	    			this.listQuery.typeId="";
	    		}
	    		this.listQuery.statusList=this.status;
	    	}
	    	console.log(this.listQuery)
	    	this.getList();
	    },
	    
	    cgDetail(row){
	    	let data={
	    		id:row.id
	    	}
	    	oilDingXiu(data).then(res=>{
		  		console.log(res)
		  		this.zhuxinxi=res.data.oilsPurchaseApplyInfo;
					this.youbuzhou=res.data.oilsOrderLogInfoList;
					this.OrderRecord=res.data.oilsOrderRecordInfo
		  		if(res.data.oilsPurchaseApplyInfo.status==5||res.data.oilsPurchaseApplyInfo.status==6){
		  			this.youchuku=res.data.oilsPurchaseOutputInfo;
			  		this.youyunshu=res.data.oilsPurchaseTransportInfo;
			  		this.youguige=res.data.oilsPurchaseApplySupplierInfo;
		  		}
		  		
		  		if(res.data.oilsPurchaseApplyInfo.status==6){
		  			this.guanchexinxi=res.data.oilCarMeasureInfo;
		  			this.youshouyou=res.data.oilsOrderRecordInfo;
		  			this.youguanshuju=res.data.oilsFlowInfos;
			  		console.log(this.youguanshuju)
			  		
			  		this.tableData3=[];
			  		this.youguanshuju[0].forEach(item=>{
			  			let data=[{
					      date: '卸前数据',
					      guanhao:"",
					      yougao:"",
					      shuigao: "",
					      wendu: "",
					      midu: "",
					      youtiji: "",
					      bztiji: "",
					      bztijiL: "",
					      zhongliang: "",
					      kaishi:'',
					    	jieshu:''
					    }, {
					      date: '卸后数据',
					      yougao: "",
					      shuigao:"",
					      wendu: "",
					      midu: "",
					      youtiji: "",
					      bztiji: "",
					      bztijiL: "",
					      zhongliang: ""
					    }, {
					      date: '收油体积',
					      yougao: "",
					      wendu: "收油重量",
					      midu: "",
					      bztiji: "期间加油",
					      bztijiL: ""
					    }]
			  			data[0].guanhao=eval(item.oilcanNo)+"号罐";
			  			data[0].yougao=item.frontOilHigh;
			  			data[0].shuigao=item.frontWaterHigh;
			  			data[0].wendu=item.frontTemperature;
			  			data[0].midu=item.frontDensity;
			  			data[0].youtiji=item.frontOilVolume;
			  			data[0].bztiji=item.frontManualVolume;
			  			data[0].bztijiL=item.frontStandardVolume;
			  			data[0].zhongliang=item.frontWeight;
						
						data[0].kaishi=item.createTime;
						data[0].jieshu=item.modifyTime;
			  			
			  			data[1].yougao=item.afterOilHigh;
			  			data[1].shuigao=item.afterWaterHigh;
			  			data[1].wendu=item.afterTemperature;
			  			data[1].midu=item.afterDensity;
			  			data[1].youtiji=item.afterOilVolume;
			  			data[1].bztiji=item.afterManualVolume;
			  			data[1].bztijiL=item.afterStandardVolume;
			  			data[1].zhongliang=item.afterWeight;
			  			
			  			data[2].yougao=item.actualVolume;
			  			data[2].midu=item.afterWeight;
			  			data[2].bztijiL=item.periodOilVolume;
						
			  			this.tableData3.push(data);
			  		})
			  		console.log(this.tableData3)
		  		}
		  		this.shangpintank=true;
		  	})
	    },
	    
	    dbDetail(row){
	    	let data={
	    		id:row.id
	    	}
	    	oilDBDetail(data).then(res=>{
	    		console.log(res)
	    		this.dbzhuxinxi=res.data;
	    		if(res.data.status==6){
	    			this.tableData4=[];
	    			this.tableData41 = res.data.oilsFlowInfos;
	    			let shuzu=[];
		    		res.data.oilsFlowInfos.forEach((v,index)=>{
		    			shuzu=[];
		    			v.forEach(item=>{
		    				let data=[{
						      date: '操作前数据',
						      guanhao:"",
						      yougao:"",
						      shuigao: "",
						      wendu: "",
						      midu: "",
						      youtiji: "",
						      bztiji: "",
						      bztijiL: "",
						      zhongliang: "",
						      kaishi:'',
						    	jieshu:''
						    }, {
						      date: '操作后数据',
						      yougao: "",
						      shuigao:"",
						      wendu: "",
						      midu: "",
						      youtiji: "",
						      bztiji: "",
						      bztijiL: "",
						      zhongliang: ""
						    }, {
						      date: '操作油体积',
						      yougao: "",
						      bztiji: "期间加油",
						      bztijiL:"0"
						    }]
				  			data[0].guanhao=eval(item.oilcanNo)+"号罐";
				  			data[0].yougao=item.frontOilHigh;
				  			data[0].shuigao=item.frontWaterHigh;
				  			data[0].wendu=item.frontTemperature;
				  			data[0].midu=item.frontDensity;
				  			data[0].youtiji=item.frontOilVolume;
				  			data[0].bztiji=item.frontManualVolume;
				  			data[0].bztijiL=item.frontStandardVolume;
				  			data[0].zhongliang=item.frontWeight;
				  			
				  			data[1].yougao=item.afterOilHigh;
				  			data[1].shuigao=item.afterWaterHigh;
				  			data[1].wendu=item.afterTemperature;
				  			data[1].midu=item.afterDensity;
				  			data[1].youtiji=item.afterOilVolume;
				  			data[1].bztiji=item.afterManualVolume;
				  			data[1].bztijiL=item.afterStandardVolume;
				  			data[1].zhongliang=item.afterWeight;
				  			
				  			data[2].yougao=item.actualVolume;
				  			data[2].bztijiL=item.periodOilVolume;
				  			
				  			data[0].kaishi=item.createTime;
				  			data[0].jieshu=item.modifyTime;
				  			shuzu.push(data)
		    			})
		    			this.tableData4.push(shuzu);
		    			
		    		})
	    		}
	    		
	    		console.log(this.tableData4);
	    		this.youpintank=true;
	    	})
	    	
	    },
	    
	    hhDetail(row){
	    	let data={
	    		id:row.id
	    	}
	    	oilHHDetail(data).then(res=>{
	    		console.log(res)
	    		this.hhxinxi=res.data;
	    		this.youpinhuan=true;
	    	})
	    },
	    
	    dgDetail(row){
	    	let data={
	    		id:row.id
	    	}
	    	oilDGDetail(data).then(res=>{
	    		this.dgzhuxinxi=res.data;
	    		console.log(res)
	    		if(res.data.status==6){
	    			this.dgzhuxinxi["actualVolume"]=res.data.oilsOrderRecord.actualVolume;
	    			this.dgzhuxinxi["lossVolume"]=res.data.oilsOrderRecord.lossVolume;
	    			this.tableData5=[];
	    			let shuzu=[];
		    		res.data.oilsFlowInfos.forEach((v,index)=>{
		    			shuzu=[];
		    			v.forEach(item=>{
		    				let data=[{
						      date: '倒前数据',
						      guanhao:"",
						      yougao:"",
						      shuigao: "",
						      wendu: "",
						      midu: "",
						      youtiji: "",
						      bztiji: "",
						      bztijiL: "",
						      zhongliang: "",
						      kaishi:'',
						    	jieshu:''
						    }, {
						      date: '倒后数据',
						      yougao: "",
						      shuigao:"",
						      wendu: "",
						      midu: "",
						      youtiji: "",
						      bztiji: "",
						      bztijiL: "",
						      zhongliang: ""
						    }, {
						      date: '操作体积',
						      yougao: "",
						      wendu: "",
						      midu: "",
						      bztiji: "期间加油",
						      bztijiL:"0"
						    }]
				  			data[0].guanhao=eval(item.oilcanNo)+"号罐";
				  			data[0].yougao=item.frontOilHigh;
				  			data[0].shuigao=item.frontWaterHigh;
				  			data[0].wendu=item.frontTemperature;
				  			data[0].midu=item.frontDensity;
				  			data[0].youtiji=item.frontOilVolume;
				  			data[0].bztiji=item.frontManualVolume;
				  			data[0].bztijiL=item.frontStandardVolume;
				  			data[0].zhongliang=item.frontWeight;
				  			
				  			data[1].yougao=item.afterOilHigh;
				  			data[1].shuigao=item.afterWaterHigh;
				  			data[1].wendu=item.afterTemperature;
				  			data[1].midu=item.afterDensity;
				  			data[1].youtiji=item.afterOilVolume;
				  			data[1].bztiji=item.afterManualVolume;
				  			data[1].bztijiL=item.afterStandardVolume;
				  			data[1].zhongliang=item.afterWeight;
				  			
				  			data[2].yougao=item.actualVolume;
				  			data[2].bztijiL=item.periodOilVolume;
				  			
				  			data[0].kaishi=item.createTime;
				  			data[0].jieshu=item.modifyTime;
				  			shuzu.push(data)
		    			})
		    			this.tableData5.push(shuzu);
		    			
		    		})
	    		}
	    		
	    		console.log(this.tableData5);
	    		this.youpindao=true
	    	})
	    }
			
  }
  
}
</script>

<style scoped>
	@import url("./oil-business.scss");

</style>
