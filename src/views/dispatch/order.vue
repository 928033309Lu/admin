<template>
  <div class="app-container todo">
    <el-form ref="form" :model="form" label-width="100px">
      <div class="top" style="padding-bottom: 0;">
        <el-form-item label="订单管理" style="border-bottom:1px solid #EEEEEE;width:100%;"/>
      </div>
      <div class="items">
      	<el-form-item label="公司" label-width="60px">
          <el-select v-model="listQuery.companyId" clearable style="min-width: 150px" class="filter-item" @change="selyouzhan">
            <el-option v-for="item in gongsi" :key="item.id" :label="item.short_name" :value="item.id"/>
          </el-select>
        </el-form-item>
				
        <el-form-item label="加油站" label-width="90px">
          <el-select v-model="listQuery.stationId" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in youzhan" :key="item.id" :label="item.shortName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-select v-model="status" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in zhuangtai" :key="item.name" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="订单类型" label-width="100px">
          <el-select v-model="listQuery.typeId" clearable style="min-width: 200px" class="filter-item" @change="zhuangtaiX">
            <el-option v-for="item in yewu" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </div>
      <div class="dbriqi">
        <div class="qiri">时间</div>
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

      <el-table :data="list" fit highlight-current-row style="width: 100%;">
        <el-table-column label="业务类型" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务单号" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
				<el-table-column label="公司" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="加油站" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请人" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createrName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1 && scope.row.typeId==2 || scope.row.status==1 && scope.row.typeId==1">待审批</span>
            <span v-if="scope.row.status==5">配送中</span>
            <span v-if="scope.row.status==6">已完成</span>
            <span v-if="scope.row.status==1 && scope.row.typeId==7">待审批</span>
            <span v-if="scope.row.status==-3 && scope.row.typeId==7">已作废</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" v-if="scope.row.status==1 && scope.row.typeId==2" @click="fahuo(scope.row.id)">发货
            </el-button>
            <el-button size="mini" type="primary" v-if="scope.row.status==1 && scope.row.typeId==7" @click="tuihuozhong(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" v-if="scope.row.status==1 && scope.row.typeId==1" @click="youpinfahuo(scope.row)">编辑</el-button>
            
            
            <!--商品采购查看-->
            <el-button size="mini" type="success" v-if="scope.row.status==1 && scope.row.typeId==2 || scope.row.status==5 && scope.row.typeId==2 || scope.row.status==6 && scope.row.typeId==2 || scope.row.status==-1 && scope.row.typeId==2 || scope.row.status==-2 && scope.row.typeId==2 || scope.row.status==-3 && scope.row.typeId==2" @click="spcgck(scope.row)">查看</el-button>
            <!--退货查看-->
            <el-button size="mini" type="success" v-if="scope.row.status==1 && scope.row.typeId==7 || scope.row.status==6 && scope.row.typeId==7" @click="tuihuock(scope.row)">查看</el-button>
            
            <!--油品采购查看-->
            <el-button size="mini" type="primary" v-if="scope.row.status==5 && scope.row.typeId==1" @click="ypbianji(scope.row)">编辑</el-button>
            <el-button size="mini" type="success" v-if="(scope.row.status==1||scope.row.status==5||scope.row.status==6) && scope.row.typeId==1" @click="ypcgck(scope.row)">查看</el-button>
            
            <!--<el-button size="mini" type="success" @click="">查看</el-button>-->
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-form>
    
    
    <!--商品采购申请-->
    <el-dialog :visible.sync="caigousq" title="商品采购申请" class="caigousq_tab" width="900px">
      <el-form label-width="80" label-position="left">
			<div class="shanga">
				<el-form-item style="min-width:50%" label="业务单号：">
		          {{shangpinCaigou.goodsPurchaseApplyInfo.orderNumber}}
		        </el-form-item>
		        <el-form-item style="min-width:50%" label="状态：" v-if="shangpinCaigou.goodsPurchaseApplyInfo.status==1">
		          	待审批
		        </el-form-item>
		        <el-form-item style="min-width:50%" label="状态：" v-if="shangpinCaigou.goodsPurchaseApplyInfo.status==5">
		          	配送中
		        </el-form-item>
		        <el-form-item style="min-width:50%" label="状态：" v-if="shangpinCaigou.goodsPurchaseApplyInfo.status==6">
		          	已完成
		        </el-form-item>

		        <el-form-item style="min-width:50%" label="公司：">
		          {{shangpinCaigou.goodsPurchaseApplyInfo.companyName}}
		        </el-form-item>
		        <el-form-item style="min-width:50%" label="加油站：">
		          {{shangpinCaigou.goodsPurchaseApplyInfo.oilsStationShortName}}
		        </el-form-item>
		        
		        <el-form-item style="min-width:50%" label="申请人：">
		          	{{shangpinCaigou.goodsPurchaseApplyInfo.createrName}}
		        </el-form-item>
		        <el-form-item style="min-width:50%" label="申请时间：">
		          	{{ shangpinCaigou.goodsPurchaseApplyInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
		        </el-form-item>
					</div>	        
      		
      			<div class="tableBox">
						<el-table :data="goodsList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" @select="jujue">
							<el-table-column label="序号" align="center" min-width="60">
			          <template slot-scope="scope">
			            <span v-if="goodsList.length !== scope.$index+1">{{scope.$index+1}}</span>
			            <span v-else>{{scope.row.lastName}}</span>
			          </template>
			        </el-table-column>
			        <el-table-column label="商品名称" align="center" min-width="110">
			          <template slot-scope="scope">
			            <span>{{scope.row.goodsName}}</span>
			          </template>
			        </el-table-column>
			        <el-table-column label="商品类别" align="center" min-width="80">
			          <template slot-scope="scope">
			            <span>{{scope.row.goodsTypeName}}</span>
			          </template>
			        </el-table-column>
			        <el-table-column label="订货数量" align="center" min-width="90">
			          <template slot-scope="scope">
			            <span>{{scope.row.orderCount}}</span>
			          </template>
			        </el-table-column>
			        <el-table-column label="单位" align="center" min-width="70">
			          <template slot-scope="scope">
			            <span>{{scope.row.unit}}</span>
			          </template>
			        </el-table-column>
			        <el-table-column type="selection" label="拒绝" width="90" align="center">
					</el-table-column>
							
			      </el-table>
			      <div class="jujue">拒绝</div>
      			</div>
					
		      <div class="heji">
		      	
		      	<el-form-item label="备注：" class="beizhu" label-width="95">
		    			<el-input
								  type="textarea"
								  :autosize="{ minRows: 2, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="beizhu"
								  >
								</el-input>
		        </el-form-item>
		      	
		      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="caigousq = false">取消</el-button>
        <el-button type="primary" @click="querenshenhe">确认发货</el-button>
      </div>
    </el-dialog>
    
    <!--商品退货申请-->
    <el-dialog :visible.sync="tuihuosq" title="商品退货申请" class="caigousq_tab" width="900px">
      <el-form label-width="80" label-position="left">
			<div class="shanga">
				<el-form-item style="min-width: 50%" label="业务单号：">
		          {{tuihuiDetail.orderNumber}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="状态：" v-if="tuihuiDetail.status==1">
		          	退货中
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="状态：" v-if="tuihuiDetail.status==6">
		          	已完成
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="公司：">
		          {{tuihuiDetail.companyName}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="加油站：">
		          {{tuihuiDetail.oilsStationName}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="申请人：">
		          	{{tuihuiDetail.createrName}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="申请时间：">
		          	{{ tuihuiDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
		        </el-form-item>
			</div>	        
					<el-table :data="tuihuoList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" @select="jujue">
				<el-table-column label="序号" align="center" min-width="55">
		          <template slot-scope="scope">
		            	<span v-if="tuihuoList.length !== scope.$index+1">{{scope.$index+1}}</span>
		            <span v-else>{{scope.row.lastName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品类别" align="center" min-width="80">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsTypeName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="退货数量" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.returnedCount}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="单位" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsUnit}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="退货原因" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.reason}}</span>
		          </template>
		        </el-table-column>
		        
		        <!--<el-table-column type="selection" label="拒绝" width="90" align="center" :selectable='checkboxInit'>
						</el-table-column>-->
						
		      </el-table>
		      <!--<div class="jujue">
								拒绝
					</div>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tuihuosq = false">取消</el-button>
        <el-button type="danger" @click="thjujueshenhe">拒绝</el-button>
        <el-button type="primary" @click="thshenhetongguo">确认</el-button>
      </div>
    </el-dialog>
    
    <!--商品采购完成弹框-->
    <el-dialog :visible.sync="caigousqck" title="商品采购" class="caigousq_tab">
      <el-form label-width="80" label-position="left">
					<div class="shanga">
						<el-form-item label="采购单号：">
		          {{shangpinCaigouck.goodsPurchaseApplyInfo.orderNumber}}
		        </el-form-item>
		        <el-form-item label="公司：">
		          {{shangpinCaigouck.goodsPurchaseApplyInfo.companyName}}
		        </el-form-item>
		        <el-form-item label="加油站：">
		          {{shangpinCaigouck.goodsPurchaseApplyInfo.oilsStationShortName}}
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinCaigouck.goodsPurchaseApplyInfo.status==1">
		          	待审批
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinCaigouck.goodsPurchaseApplyInfo.status==5">
		          	配送中
		        </el-form-item>
		        <el-form-item label="状态：" v-if="shangpinCaigouck.goodsPurchaseApplyInfo.status==6">
		          	已完成
		        </el-form-item>
		        <el-form-item label="申请人：">
		          	{{shangpinCaigouck.goodsPurchaseApplyInfo.createrName}}
		        </el-form-item>
		        <el-form-item label="申请时间：">
		          	{{ shangpinCaigouck.goodsPurchaseApplyInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
		        </el-form-item>
					</div>	        
      		
      	
					<el-table :data="goodsckList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" @select="jujue">
						<el-table-column label="序号" align="center" min-width="60">
		          <template slot-scope="scope">
		            <span>{{scope.$index+1}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品类别" align="center" min-width="80">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsTypeName}}</span>
		          </template>
		        </el-table-column>
		        
		        <el-table-column label="订货数量" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.orderCount}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="单位" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.unit}}</span>
		          </template>
		        </el-table-column>
		      </el-table>
		      
		      <el-steps direction="vertical" space="70px" style="margin-top: 30px;" :active="10"><!--:active="1" -->
				    <el-step v-for="(item,index) in rizhide" :key="index" icon="el-icon-success" :title="item.createTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :description="item.remark" ></el-step>
				  </el-steps>
		      
		      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="caigousqck = false">关闭</el-button>
        <!--<el-button type="primary" @click="querenshenhe">确认发货</el-button>-->
      </div>
    </el-dialog>
    
    <!--商品退货完成弹框-->
    <el-dialog :visible.sync="tuihuosqck" title="商品退货" class="caigousq_tab" width="900px">
      <el-form label-width="80" label-position="left">
			<div class="shanga">
				<el-form-item style="min-width: 50%" label="业务单号：">
		          {{tuihuickDetail.orderNumber}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="状态：" v-if="tuihuickDetail.status==1">
		          	待审批
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="状态：" v-if="tuihuickDetail.status==6">
		          	已完成
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="公司：">
		          {{tuihuickDetail.companyName}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="加油站：">
		          {{tuihuickDetail.oilsStationName}}
		        </el-form-item>
		        
		        <el-form-item style="min-width: 50%" label="申请人：">
		          	{{tuihuickDetail.createrName}}
		        </el-form-item>
		        <el-form-item style="min-width: 50%" label="申请时间：">
		          	{{ tuihuickDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
		        </el-form-item>
					</div>	        
      	
					<el-table :data="tuihuockList" style="width: 100%;" :header-cell-style="{background:'#f5f7fa'}" @select="jujue">
						<el-table-column label="序号" align="center" min-width="60">
		          <template slot-scope="scope">
		            <span v-if="tuihuockList.length !== scope.$index+1">{{scope.$index+1}}</span>
		            <span v-else>{{scope.row.lastName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品名称" align="center" min-width="110">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="商品类别" align="center" min-width="80">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsTypeName}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="退货数量" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.returnedCount}}</span>
		          </template>
		        </el-table-column>
		        <el-table-column label="单位" align="center" min-width="70">
		          <template slot-scope="scope">
		            <span>{{scope.row.goodsUnit}}</span>
		          </template>
		        </el-table-column>
		        
		        <el-table-column label="退货原因" align="center" min-width="90">
		          <template slot-scope="scope">
		            <span>{{scope.row.reason}}</span>
		          </template>
		        </el-table-column>
		        
		        <!--<el-table-column type="selection" label="拒绝" width="90" align="center" :selectable='checkboxInit'>
						</el-table-column>-->
						
		      </el-table>
		      
		      <el-steps direction="vertical" space="70px" style="margin-top: 30px;" :active="10"><!--:active="1" -->
				    <el-step v-for="(item,index) in rizhide" :key="index" icon="el-icon-success" :title="item.createTime| parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :description="item.remark" ></el-step>
				  </el-steps>
		      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tuihuosqck = false">关闭</el-button>
        <!--<el-button type="danger" @click="thjujueshenhe">拒绝</el-button>-->
        <!--<el-button type="primary" @click="thshenhetongguo">确认</el-button>-->
      </div>
    </el-dialog>
    
    <!--油品采购弹框-->
    <el-dialog :visible.sync="ypcagouTk" title="油品采购" class="caigousq_yp">
      <el-form label-width="90" label-position="left">
      		<div class="mian_ord">
		      	<div class="shang">
			        <el-form-item label="订单号：">
			          	{{zhuxinxi.orderNumber}}
			        </el-form-item>
			        <el-form-item label="状态：">
			        		<span v-if="zhuxinxi.status==1">待审批</span>
			          	<span v-if="zhuxinxi.status==5">配送中</span>
			          	<span v-if="zhuxinxi.status==6">已完成</span>
			        </el-form-item>
		      	</div>
		      	<div class="xinxi">
		      		<div class="shang guan" style="padding-top: 15px;">
		      			<div class="title" style="width: 100%;">
		      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">订单申请信息：</div>
		      			</div>
			      		<el-form-item label="加油站：">
			          	{{zhuxinxi.oilsStationName}}
			        	</el-form-item>
			        	<el-form-item label="所属公司：">
			          	{{zhuxinxi.companyName}}
			        	</el-form-item>
			        	<el-form-item label="油品品类：">
			          	{{zhuxinxi.oilsName}}
			        	</el-form-item>
			        	<el-form-item label="油品规格：">
			          	{{youguige.oilsSpecName}}
			        	</el-form-item>
			        	<el-form-item label="申请数量：">
			          	{{zhuxinxi.purchaseAmount}}吨
			        	</el-form-item>
			        	<el-form-item label="申请计划到达时间：" label-width="120">
			          	{{zhuxinxi.planArriveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
			        	</el-form-item>
			      	</div>
			      	
			      	<div class="shang guan" style="padding-top: 15px;" v-if="zhuxinxi.status!=1">
		      			<div class="title" style="width: 100%;">
		      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">油品出库信息：</div>
		      			</div>
			      		<el-form-item label="出库单号：">
			          	{{youchuku.outOrderNum}}
			        	</el-form-item>
			        	<el-form-item label="原发重量：">
			          	{{youchuku.primaryWeight}}吨
			        	</el-form-item>
			        	<el-form-item label="原发密度：">
			          	{{youchuku.primaryDensity}}KG/m³
			        	</el-form-item>
			        	<el-form-item label="转换升数：">
			          	{{youchuku.switchLitre}}升
			        	</el-form-item>
			        	<el-form-item label="油库：">
			          	{{youchuku.supplierName}}
			        	</el-form-item>
			      	</div>
			      	<div class="shang guan" style="padding-top: 15px;" v-if="zhuxinxi.status!=1">
		      			<div class="title" style="width: 100%;">
		      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">油品运输信息：</div>
		      			</div>
			      		<el-form-item label="承运商：">
			          	{{youyunshu.forwardingAgentsName}}
			        	</el-form-item>
			        	<el-form-item label="运距：">
			          	{{youyunshu.haulDistance}}KM
			        	</el-form-item>
			        	<el-form-item label="车牌号：">
			          	{{youyunshu.carNo}}
			        	</el-form-item>
			        	<el-form-item label="司机姓名：">
			          	{{youyunshu.driverName}}
			        	</el-form-item>
			        	<el-form-item label="司机电话：">
			          	{{youyunshu.driverPhone}}
			        	</el-form-item>
			        	<el-form-item label="计划最早到达时间：">
			          	{{youyunshu.planEarliestTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
			        	</el-form-item>
			        	<el-form-item label="罐车仓号：">
			          	{{youyunshu.tankTruckNo}}
			        	</el-form-item>
			        	<el-form-item label="计划最晚到达时间：">
			          	{{youyunshu.planLatestTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
			        	</el-form-item>
			      	</div>
			      	<div class="shang guan" style="padding-top: 15px;" v-if="zhuxinxi.status==6">
		      			<div class="title" style="width: 100%;display: flex;">
		      				<div style="font-weight: bold;color: red;font-size: 15px;line-height: 36px;padding: 0;margin-right: 50px;">油品收油信息：</div>
		      				 <el-button type="primary" @click="erjiTk=true" v-if="zhuxinxi.status==6">查看详情</el-button>
		      			</div>
			      		<el-form-item label="营业日：">
			          	{{zhuxinxi.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
			        	</el-form-item>
			        	<el-form-item label="班结编号：">
			          	{{zhuxinxi.shiftId}}
			        	</el-form-item>
			        	<el-form-item label="实收体积：">	
			          	{{youshouyou.actualVolume}}升
			        	</el-form-item>
			        	<el-form-item label="实收数量：">
			          	{{youshouyou.actualWeight}}KG
			        	</el-form-item>
			        	<el-form-item label="损耗：">
			          	{{youshouyou.lossVolume}}升
			        	</el-form-item>
			        	<el-form-item label="损耗：">
			          	{{youshouyou.lossWeight}}公斤
			        	</el-form-item>
			        	<el-form-item label="收油审核时间：">
			          	{{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
			        	</el-form-item>
			      	</div>
			      	
			      	<div class="buzhou">
			      		<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;padding-bottom: 15px;">订单跟踪：</div>
			      		<el-steps direction="vertical" :active="10" space="60px">
							    <el-step v-for="(item,index) in youbuzhou" :key="index" icon="el-icon-success" :title="item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :description="item.remark" ></el-step>
							  </el-steps>
			      	</div>
			      	
		      		
		      	</div>
		      </div>
      	
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="ypcagouTk = false">关闭</el-button>
      </div>
    </el-dialog>
    
    <!--油品采购收油详情-->
    <el-dialog :visible.sync="erjiTk" title="油品采购" class="caigousq_yp2">
      <el-form label-width="110" label-position="left">
				<div class="mian_ord">
	      	<div class="shang">
	      		<el-form-item label="所属营业日：">
		          {{zhuxinxi.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		        </el-form-item>
		        <el-form-item label="所属班次：">
		          {{zhuxinxi.shiftId}}
		        </el-form-item>
		        <el-form-item label="订单审核时间：">
		          	{{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		        </el-form-item>
		        <el-form-item label="状态：">
		          	已完成
		        </el-form-item>
	      	</div>
	      	<div class="xinxi">
	      		<ul class="dade">
	      			<li>
	      				<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;">油品单信息：</div>
	      				<div class="neirong">
	      					<ul class="limiande">
	      						<li><div>加油站 : <span>{{zhuxinxi.oilsStationName}}</span></div><div>油库 : <span>{{youchuku.supplierName}}</span></div></li>
	      						<li><div>油品 : <span>{{youguige.oilsSpecName}}</span></div><div>配送订单号 :<br /><span>{{youchuku.orderNumber}}</span></div></li>
	      						<li><div>油仓号 : <span>{{zhuxinxi.billType}}</span></div><div>转换体积 : <span>{{youchuku.switchLitre}}升</span></div></li>
	      						<li><div>原发密度 : <span>{{zhuxinxi.primaryDensity}}kg/m³</span></div><div>原发重量 : <span>{{zhuxinxi.primaryWeight}}kg</span></div></li>
	      						<li><div>出库单号 : <span>{{youchuku.outOrderNum}}</span></div></li>
	      						
	      					</ul>
	      				</div>
	      			</li>
	      			
	      			<li>
	      				<div class="title" style="width: 100%;font-weight: bold;color: red;font-size: 15px;">罐车测量信息：</div>
	      				<div class="neirong">
	      					<ul class="limiande">
	      						<li><div>实测温度 : <span>{{guanchexinxi.measuringTemperature}}℃</span></div><div>实测密度 : <span>{{guanchexinxi.measuringDensity}}kg/m³</span></div></li>
	      						<li><div>实测标密度 : <span>{{guanchexinxi.standardDensity}}kg/m³</span></div><div>是否有水 : <span v-if="guanchexinxi.isHaveWater==0">否</span><span v-if="guanchexinxi.isHaveWater==1">是</span></div></li>
	      					</ul>
	      				</div>
	      			</li>
	      		</ul>
	      		
	      		<div class="shang guan">
	      			<div class="title" style="width: 100%;">
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">实收信息：</div>
	      			</div>
			        <el-form-item label="订单审核时间：">
			          {{youshouyou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
			        </el-form-item>
			        <el-form-item label="状态：">
			          	已完成
			        </el-form-item>
		      	</div>
	      		
	      		<div class="guan" v-for="item in tableData3">
	      			<div class="title">
	      				<div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">实收详情：</div>
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
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="erjiTk = false">关闭</el-button>
      </div>
    </el-dialog>
		
  </div>
</template>

<script>
import { comYouzhanList,daibanList,yewuDetail,orderGong,orderGongPrice,orderTong,oilDingXiu } from '@/api/shuju'
import { orderFH } from '@/api/diaodu'
import { shanghuList } from '@/api/shanghu'
import { returnedDetail,returnedJujueDingdan,orderRiList } from '@/api/shangpin'

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
      tableData3: [],
      list: null,
      tableKey: 0,
      listLoading: true,
	    total: 0,
	    value6: '',
	    youzhan:[],
	    gongsi:[],
	    goodsList:[],
	    zhuangtai:[{
	    	id:["1"],
	    	name:'待审批'
	    },{
	    	id:["5"],
	    	name:'配送中'
	    },{
	    	id:["6"],
	    	name:'已完成'
	    }],
	    yewu:[{
	    	id:1,
	    	name:'油品采购'
	    },{
	    	id:2,
	    	name:'商品采购'
	    },{
	    	id:7,
	    	name:'商品退货'
	    }],
	    status:[],
	    jujude:'',
	    jujuede:[],
	    shangpinCaigou:{
	    	goodsList:[],
	    	goodsPurchaseApplyInfo:{
	    		companyId: '',
					createTime: '',
					creater: '',
					id: '',
					oilsStationShortName: '',
					orderNumber: '',
					orderType: '',
					stationId: '',
					status: ''
	    	}
	    },
	    beizhu:'',
      form: {
        name: ''
      },
      listQuery: {
	        pageNum: 1,
	        pageSize: 10,
	        stationId:'',
	        statusList:[1,5,6],
	        typeIds:[1,2,7],
	        beginTime:'',
	        endTime:'',
	        companyId:'',
//	        origin:"order"
	    },
	    caigousq:false,
	    //------------------------------------退货的
	    tuihuosq:false,
	    tuihuiDetail:'',
	    tuihuoList:[],
	    //------------------------------------退货的结束
	    
	    
	    //----------------------查看弹框
	    
	    shangpinCaigouck:{
	    	goodsList:[],
	    	goodsPurchaseApplyInfo:{
	    		companyId: '',
					createTime: '',
					creater: '',
					id: '',
					oilsStationShortName: '',
					orderNumber: '',
					orderType: '',
					stationId: '',
					status: ''
	    	}
	    },
	    goodsckList:[],
	    caigousqck:false,
	    tuihuosqck:false,
	    
	    tuihuickDetail:'',
	    tuihuockList:[],
	    
	    rizhide:[],
	    
	    ypcagouTk:false,
	    erjiTk:false,
	    
	    //-------------------------------------油品详情
	    
	    zhuxinxi:{},
	    youchuku:{},
	    youyunshu:{},
	    youshouyou:{},
	    youguige:{},
	    youbuzhou:[],
	    guanchexinxi:{},
	    
    }
  },
  created() {
	    this.getList();
	    this.shanghulie();
  },
  methods: {
      getList() {
	  		daibanList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
	    shanghulie(){
	    	shanghuList({}).then(res=>{
	    		console.log(res)
	    		this.gongsi=res.data;
	    	})
	    },
		selyouzhan(val) {
			this.youzhan=[];
		    this.listQuery.stationId = "";
				if (val) {
					let data = {
						companyId: val
					};
					console.log(data);
					comYouzhanList(data).then(res => {
						console.log(res);
						this.youzhan = res.data;
					});
				}
		    console.log(this.listQuery);
		    this.tianjianyong();
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
	    	this.tianjianyong();
	    },
	    zhuangtaiX(){
	    	if(this.status==[]||this.status==""){
	    		this.listQuery.statusList=[1,5,6];
	    	}else{
	    		this.listQuery.statusList=this.status;
	    	}
	    	
	    	this.tianjianyong();
	    },
	    tianjianyong(){
	    	this.listQuery.page=0;
	    	daibanList(this.listQuery).then(res=>{
	  			console.log(res)
	  			this.list=res.data.rows
	  			this.total=res.data.total
	  		})
	    },
  		openDetails(row){
  			console.log(row)
  			let data={
	  			goodsId:row.goodsId,
	  			typeId:row.goodsType
	  		}
  			orderGongPrice(data).then(res=>{
  				console.log(res)
  				this.gongyingshangPrice=res.data;
  			})
  		},
  		jujue(selection, row){
  			console.log(selection)
  			this.jujude=selection;
  		},
  		fahuo(idid){
  			this.caigousq=true;
  			let data={
  				id:idid
  			}
  			yewuDetail(data).then(res=>{
  				console.log(res)
  				let arr=[];
  				this.shangpinCaigou=res.data
  				res.data.goodsList.forEach((item)=>{
  					item.forEach((items)=>{
  						arr.push(items);
  					})
  				})
  				arr.forEach((item,index)=>{
  					if(item.isShow==0){
  						arr.splice(index,1)
  					}
  				})
  				console.log(arr)
  				this.goodsList=arr;

  				let sum = 0;
  				this.goodsList.forEach((item)=>{
  				    sum += Number(item.orderCount);
  				})
  				this.goodsList.push({
  				    lastName:'合计',
  				    orderCount:sum
  				})

  			})
  		},
  		
  		
  		querenshenhe(){
  			this.jujuede=[];
  			if(this.jujude){
  				this.goodsList.forEach((item,index)=>{
	  				this.jujude.forEach((i)=>{
	  					if(item.goodsId==i.goodsId){
	  						console.log(index);
	  						this.jujuede.push(item);
	  					}
	  				})
	  			})
	  			var arr2=this.goodsList;
	  			var tongguode = [];
	  			for (var i=0;i<arr2.length;i++) {
	  				var obj=arr2[i];
	  				var num=obj.id;
	  				var flag = false;
	  				for (var j=0;j<this.jujuede.length;j++) {
	  					var aj=this.jujuede[j];
	  					var n=aj.id;
	  					if(n==num){
	  						flag = true;
								break;
	  					}
	  				}
	  				if(!flag){
							tongguode.push(obj);
						}
	  			}
  			}else{
  				var tongguode=this.goodsList;
  			}

  			tongguode = [...tongguode]
  			tongguode.splice(tongguode.length - 1,1)

  			let data={
  				orderId:this.shangpinCaigou.goodsPurchaseApplyInfo.id,
  				applyRemark:this.beizhu,
  				agreeGoodsList:tongguode,
  				refuseGoodsList:this.jujuede
  			}
  			
  			if(data.agreeGoodsList){
  				data.agreeGoodsList.forEach((item)=>{
	  				delete item["createTime"];
	  				delete item["auditTime"];
	  				
	  			})
  			}
  			if(data.refuseGoodsList){
  				data.refuseGoodsList.forEach((item)=>{
	  				delete item["createTime"];
	  				delete item["auditTime"];
	  			})
  			}
  			console.log(data)
  			orderFH(data).then(()=>{
  				this.caigousq=false;
  				this.getList();
  			})
  		},
  		checkboxInit(row,index){
		　　if (row.isEdit==0)//这个判断根据你的情况而定
		　　　　return 0;//不可勾选
		　　else
		　　　　return 1;//可勾选
		　},
  		//-------------------------------------------------------------退货方法
  		tuihuozhong(row){
		  	this.tuihuosq=true;
		  	let data={
		  		id:row.id,
		  		typeId:1
		  	}
		  	returnedDetail(data).then(res=>{
		  		console.log(res)
		  		this.tuihuiDetail=res.data.goodsReturnedInfo;
	    		this.tuihuoList=res.data.goodsList;

	    		let sum = 0;
  				this.tuihuoList.forEach((item)=>{
  				    sum += Number(item.returnedCount);
  				})
  				this.tuihuoList.push({
  				    lastName:'合计',
  				    returnedCount:sum
  				})

		  	})
		  },
  		
  		//审核拒绝
  		thjujueshenhe(){
  			
  			this.$prompt('请输入拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入原因'
        }).then(({ value }) => {
        	let data={
	  				id:this.tuihuiDetail.id,
	  				applyResult:-1,
						refuseReason:value
	  			}
        	returnedJujueDingdan(data).then(()=>{
	  				this.tuihuosq=false;
	  				this.$message({
	            type: 'info',
	            message: '已拒绝'
	          });
	          this.getList();
	  			})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
  		},
  		
  		thshenhetongguo(){
  			this.tuihuoList.forEach((item)=>{
    			delete item['createTime']
    			delete item['merchantAuditTime']
    		})
  			let data={
  				id:this.tuihuiDetail.id,
  				applyResult:1,
  				agreeList:this.tuihuoList,
  				refuseList:[],
  			}
  			console.log(data)
  			returnedJujueDingdan(data).then(()=>{
  				this.tuihuosq=false;
  				this.$message({
            type: 'success',
            message: '已确认'
          });
          this.getList();
  			})
  		},
  		
  	//-------------------------------------------------------------退货方法结束
  	
  	
  		////查看的弹框
	  	spcgck(row){
				console.log(row)
				this.$router.push({
					name:'commoditySee',
					query:{
						id:row.id,
						orderNumber:row.orderNumber,
						supplierName:row.supplierName
					}
				})
				this.caigousqck=true;
				let data={
					id:row.id,
					supplierName:row.supplierName
				}
				yewuDetail(data).then(res=>{
					console.log(res)
					let arr=[];
					this.shangpinCaigouck=res.data
					res.data.goodsList.forEach((item)=>{
						item.forEach((items)=>{
							arr.push(items);
						})
					})
					this.goodsckList=arr;
				})
				
				
				let datab={
					orderId:row.id,
					orderNumber:row.orderNumber
				}
				
				orderRiList(datab).then(res=>{
					console.log(res)
					this.rizhide=res.data;
				})
				
			},
			tuihuock(row){
		  	this.tuihuosqck=true;
		  	let data={
		  		id:row.id,
		  		typeId:1
		  	}
		  	returnedDetail(data).then(res=>{
		  		console.log(res)
		  		this.tuihuickDetail=res.data.goodsReturnedInfo;
	    		this.tuihuockList=res.data.goodsList;

	    		let sum = 0;
  				this.tuihuockList.forEach((item)=>{
  				    sum += Number(item.returnedCount);
  				})
  				this.tuihuockList.push({
  				    lastName:'合计',
  				    returnedCount:sum
  				})
		  	})
		  	
		  	let datab={
					orderId:row.id,
					orderNumber:row.orderNumber
				}
				
				orderRiList(datab).then(res=>{
					console.log(res)
					this.rizhide=res.data;
				})
		  },
		  
		  youpinfahuo(row){
		  	this.$router.push({
            path: 'dispatch-order-wei', 
            name: 'dispatchorderWeiDemo',
            query: { 
                id: row.id, 
            }
        })
		  },
		  
		  ypbianji(row){
		  	this.$router.push({
            path: 'dispatch-order-wei', 
            name: 'dispatchorderWeiDemo',
            query: { 
                id: row.id, 
            }
        })
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
		  
		  
		  ypcgck(row){
				this.$router.push({
					name:'orderSee',
					query:{
						id:row.id
					}
				})
		  	let data={
		  		id:row.id
		  	}
		  	oilDingXiu(data).then(res=>{
		  		console.log(res)
		  		this.zhuxinxi=res.data.oilsPurchaseApplyInfo;
		  		this.youbuzhou=res.data.oilsOrderLogInfoList;
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
			  			
	//		  			data[1].guanhao=item.oilcanNo+"号罐";
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
			  			
			  			
	//		  			tab.push(data)
			  			this.tableData3.push(data);
	//		  			console.log(data[0].guanhao)
			  		})
		  		}
		  		
		  		console.log(this.tableData3)
		  	})
		  	this.ypcagouTk=true;
		  }
  		
  }
}
</script>

<style scoped>
	@import url("./todo.scss");
	.tableBox{position: relative;}
	.tableBox .jujue{top: 1px !important;}
</style>
