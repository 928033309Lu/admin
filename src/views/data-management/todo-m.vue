<template>
    <div class="app-container todo">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom: 10px;">
                <el-form-item label="待办事项"/>
            </div>
            <div class="items">
                <el-form-item label="加油站" label-width="90px">
                    <el-select
                        v-model="listQuery.stationId"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in youzhan"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="状态"
                    style="margin-right: 20px;margin-left: 20px;"
                    label-width="90px"
                >
                    <el-select
                        v-model="status"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in zhuangtai"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="业务类型"
                    style="margin-right: 20px;margin-left: 20px;"
                    label-width="90px"
                >
                    <el-select
                        v-model="listQuery.typeId"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in yewu"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <!-- <div class="dbriqi"> -->
                    <!-- <div class="qiri">时间:</div> -->
                    <span class="_data-span">时间</span>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2"
                        @change="shijian"
                    ></el-date-picker>
                <!-- </div> -->
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
                <el-table-column label="加油站" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.stationName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请人" min-width="120" align="center">
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
                        <span v-if="scope.row.status==0">待审批</span>
                        <span
                            v-if="(scope.row.status==1||scope.row.status==5&&scope.row.typeId==2||scope.row.status==3&&scope.row.typeId==5||scope.row.status==6)"
                        >已审批</span>
                        <span v-if="scope.row.status==-3">已作废</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    width="140"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <!--商品采购的-->
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==0&&scope.row.typeId==2"
                            @click="caigoushenqing(scope.row.id,scope.row.typeId)"
                        >编辑</el-button>

                        <el-button
                            size="mini"
                            type="success"
                            v-if="(scope.row.status==0||scope.row.status==1||scope.row.status==-3||scope.row.status==5||scope.row.status==6)&&scope.row.typeId==2"
                            @click="spcgDetail(scope.row.id)"
                        >查看</el-button>

                        <!--商品调拨的-->
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==0&&scope.row.typeId==5"
                            @click="caigoushenqing(scope.row.id,scope.row.typeId)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="(scope.row.status==0||scope.row.status==1||scope.row.status==-3||scope.row.status==3)&&scope.row.typeId==5"
                            @click="spdbDetail(scope.row.id)"
                        >查看</el-button>

                        <!--商品报废的-->
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==0&&scope.row.typeId==6"
                            @click="caigoushenqing(scope.row.id,scope.row.typeId)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="(scope.row.status==0||scope.row.status==1||scope.row.status==-3||scope.row.status==6)&&scope.row.typeId==6"
                            @click="spbfDetail(scope.row.id)"
                        >查看</el-button>

                        <!--商品退货的-->
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==0&&scope.row.typeId==7"
                            @click="caigoushenqing(scope.row.id,scope.row.typeId)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="(scope.row.status==0||scope.row.status==1||scope.row.status==-3||scope.row.status==6)&&scope.row.typeId==7"
                            @click="spthDetail(scope.row.id)"
                        >查看</el-button>

                        <!--油品采购的-->
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==0&&scope.row.typeId==1"
                            @click="ypcaigou(scope.row.id)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeId==1"
                            @click="ypcaigouDetail(scope.row.id)"
                        >查看</el-button>

                        <!--油品调拨的-->
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==0&&scope.row.typeId==4"
                            @click="ypdiaoboF(scope.row.id)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeId==4"
                            @click="ypdiaoboC(scope.row.id)"
                        >查看</el-button>
                        <!-- 促销管理的 -->
                        
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.typeName=='促销管理'&&scope.row.status==0"
                            @click="approval(scope.row)"
                        >审批</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.typeName=='促销管理'&&scope.row.status!=0"
                            @click="approval(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
            />
        </el-form>

        <!--商品采购待办事项-->
        <el-dialog :visible.sync="caigousq" title="商品采购申请" class="caigousq_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item
                        style="min-width:50%" label="业务单号："
                    >{{shangpinCaigou.goodsPurchaseApplyInfo.orderNumber}}</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="状态："
                        v-if="shangpinCaigou.goodsPurchaseApplyInfo.status==0"
                    >待审批</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="状态："
                        v-if="shangpinCaigou.goodsPurchaseApplyInfo.status==1"
                    >已审批</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="状态："
                        v-if="shangpinCaigou.goodsPurchaseApplyInfo.status==-3"
                    >已作废</el-form-item>

                    <div class="shanga" style="width: 100%;">
                        <el-form-item
                            style="min-width:50%" label="加油站："
                        >{{shangpinCaigou.goodsPurchaseApplyInfo.oilsStationShortName}}</el-form-item>
                    </div>
                    
                    <el-form-item style="min-width:50%" label="申请人：">{{shangpinCaigou.goodsPurchaseApplyInfo.createrName}}</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="申请时间："
                    >{{ shangpinCaigou.goodsPurchaseApplyInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                </div>
                <div class="tableBox">
                    <el-table
                        :data="shangpinCaigou.goodsList[0]"
                        style="width: 100%;"
                        :header-cell-style="{background:'#f5f7fa'}"
                        @row-click="openDetails"
                        @select="jujue"
                    >
                        <el-table-column label="序号" align="center" min-width="70">
                          <template slot-scope="scope">
                            <span v-if="shangpinCaigou.goodsList[0].length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="商品类别" align="center" min-width="80">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsTypeName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品名称" align="center" min-width="110">
                            <template slot-scope="scope">
                                <span>{{scope.row.goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="订货数量" align="center" min-width="90">
                            <template slot-scope="scope">
                                <span v-if="shangpinCaigou.goodsList[0].length == scope.$index+1">
                                    {{ scope.row.orderCount }}
                                </span>
                                <span v-else>
                                    <el-input @change="summation" type="number" v-model="scope.row.orderCount" style="width:80px;"/>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" min-width="70">
                            <template slot-scope="scope">
                                <span>{{scope.row.unit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="供应商" align="center" min-width="110">
                            <template slot-scope="scope" v-if="shangpinCaigou.goodsList[0].length !== scope.$index+1">
                                <el-select
                                    v-model="scope.row.supplierId"
                                    clearable
                                    style="width:100%"
                                    class="filter-item"
                                    @visible-change="gongyingshang(scope.row.goodsId,scope.row.goodsType)"
                                >
                                    <el-option
                                        v-for="item in gongyingshangde"
                                        :key="item.supplierId"
                                        :label="item.supplierName"
                                        :value="item.supplierId"
                                    />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column type="selection" label="拒绝"   align="center"></el-table-column>
                    </el-table>
                    <div class="jujue">拒绝</div>
                </div>
                <div class="heji">
                    <el-form-item label="进价查询：" class="shul" label-width="95">
                        <div
                            class="jinjia"
                            v-for="item in gongyingshangPrice"
                        >{{item.supplierName}} ： {{item.price}} 元</div>
                    </el-form-item>
                    <el-form-item label="备注：" class="beizhu" label-width="95">
                        <el-input v-model="beizhu" style="line-height:55px;" placeholder="请输入内容"></el-input>
                    </el-form-item>

                    <!--<el-form-item label="备注：" class="beizhu" label-width="95">
		    			<el-input
								  type="textarea"
								  :autosize="{ minRows: 2, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="beizhu"
								  >
								</el-input>
                    </el-form-item>-->
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="caigousq = false">取消</el-button>
                <el-button type="danger" @click="jujueshenhe">拒绝</el-button>
                <el-button type="primary" @click="querenshenhe">确认</el-button>
            </div>
        </el-dialog>

        <!--商品调拨待办事项-->
        <el-dialog :visible.sync="caigoudb" title="商品调拨申请" class="caigousq_tab caigoudb_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item style="min-width:50%" label="加油站：">{{dbDetail.oilsNameOut}}</el-form-item>
                    <el-form-item style="min-width:50%" label="业务单号：">{{dbDetail.orderNumber}}</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="dbDetail.status==0">待审批</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="dbDetail.status==1">已审批</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="dbDetail.status==-3">已作废</el-form-item>
                    <el-form-item style="min-width:50%" label="申请人：">{{dbDetail.createrName}}</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="申请时间："
                    >{{ dbDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                    <el-form-item style="min-width:50%" label="调拨原因:">{{dbDetail.allocateReason}}</el-form-item>
                </div>
                <div class="tableBox">
                    <el-table
                        :data="dbList"
                        style="width: 100%;"
                        :header-cell-style="{background:'#f5f7fa'}"
                        @select="dbjujue"
                    >
                        <el-table-column label="序号" align="center" min-width="55">
                          <template slot-scope="scope">
                                <span v-if="dbList.length !== scope.$index+1">{{scope.$index+1}}</span>
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
                        <el-table-column label="出库数量" align="center" min-width="90">
                            <template slot-scope="scope">
                                <!--<span><el-input v-model="scope.row.orderCount" style="width:80px;"/></span>-->
                                <span>{{scope.row.orderCount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" align="center" min-width="70">
                            <template slot-scope="scope">
                                <span>{{scope.row.unit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column type="selection" label="拒绝" width="90" align="center"></el-table-column>
                    </el-table>
                    <div class="jujue">拒绝</div>
                </div>
                <el-form-item label="选择入库加油站" label-width="120px">
                    <el-select
                        v-model="ruYouzhan"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in dbyouzhanList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="caigoudb = false">取消</el-button>
                <el-button type="danger" @click="dbjujueshenhe">拒绝</el-button>
                <el-button type="primary" @click="dbquerenshenhe">确认</el-button>
            </div>
        </el-dialog>

        <!--商品报废待办事项-->
        <el-dialog :visible.sync="shangpinbf" title="商品报废申请" class="caigousq_tab caigoudb_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    
                    <el-form-item style="min-width: 50%;" label="商品报废单号：">{{bfDetail.orderNumber}}</el-form-item>
                    <el-form-item style="min-width: 50%;" label="状态：" v-if="bfDetail.status==0">待审批</el-form-item>
                    <el-form-item style="min-width: 50%;" label="状态：" v-if="bfDetail.status==1">已审批</el-form-item>
                    <el-form-item style="min-width: 50%;" label="状态：" v-if="bfDetail.status==-3">已作废</el-form-item>
                    <div class="shanga" style="width: 100%">
                        <el-form-item style="min-width: 50%;" label="加油站：">{{bfDetail.oilsStationName}}</el-form-item>
                    </div>
                    
                    <el-form-item style="min-width: 50%;" label="申请人：">{{bfDetail.createrName}}</el-form-item>
                    <el-form-item
                        label="申请时间："
                    >{{ bfDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                </div>
                <el-table
                    :data="bfList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                    @select="dbjujue"
                >
                    <el-table-column label="序号" align="center" min-width="110">
                        <template slot-scope="scope">
                            <span v-if="bfList.length !== scope.$index+1">{{scope.$index+1}}</span>
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
                    <el-table-column label="报废数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <!--<span><el-input v-model="scope.row.orderCount" style="width:80px;"/></span>-->
                            <span>{{scope.row.returnedCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报废原因" align="center" min-width="90">
                        <template slot-scope="scope">
                            <!--<span><el-input v-model="scope.row.orderCount" style="width:80px;"/></span>-->
                            <span>{{scope.row.reason}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column type="selection" label="拒绝" width="90" align="center">
                    </el-table-column>-->
                </el-table>
                <!--<div class="jujue">
								拒绝
                </div>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="shangpinbf = false">取消</el-button>
                <el-button type="danger" @click="bfjujueshenhe">拒绝</el-button>
                <el-button type="primary" @click="bfquerenshenhe">确认</el-button>
            </div>
        </el-dialog>

        <!--商品退货待办事项-->
        <el-dialog :visible.sync="shangpinth" title="商品退货申请" class="caigousq_tab caigoudb_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item style="min-width: 50%" label="退货单号：">{{thDetail.orderNumber}}</el-form-item>
                    <el-form-item style="min-width: 50%" label="状态：" v-if="thDetail.status==0">待审批</el-form-item>
                    <el-form-item style="min-width: 50%" label="供应商：">
                        <!-- <span
                            v-for="item in gongyingshangList"
                            v-if="item.id==thList[0]['supplierId']"
                        >{{item.supplierShort}}</span> -->
                        {{thList[0].supplierShortName}}
                    </el-form-item>
                    <el-form-item style="min-width: 50%" label="加油站：">{{thDetail.oilsStationName}}</el-form-item>
                    <!-- <el-form-item style="min-width: 50%" label="营业日：" v-if="thDetail.businessDay">
                        {{thDetail.businessDay | parseTime('{y}-{m}-{d}')}}
                    </el-form-item>
                    <el-form-item style="min-width: 50%" label="班次：" v-if="thDetail.shiftId">
                        {{thDetail.shiftId}}
                    </el-form-item> -->
                    <el-form-item style="min-width: 50%" label="申请人：">{{thDetail.createrName}}</el-form-item>
                    <el-form-item
                        style="min-width: 50%" label="申请时间："
                    >{{ thDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                </div>
                <el-table
                    :data="thList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                    @select="dbjujue"
                >
                    <el-table-column label="序号" align="center" min-width="70">
                      <template slot-scope="scope">
                        <span v-if="thList.length !== scope.$index+1">{{scope.$index+1}}</span>
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
                            <!--<span><el-input v-model="scope.row.orderCount" style="width:80px;"/></span>-->
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
                            <!--<span><el-input v-model="scope.row.orderCount" style="width:80px;"/></span>-->
                            <span>{{scope.row.reason}}</span>
                        </template>
                    </el-table-column>

                    <!--<el-table-column type="selection" label="拒绝" width="90" align="center">
                    </el-table-column>-->
                </el-table>
                <!--<div class="jujue">
								拒绝
                </div>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="shangpinth = false">取消</el-button>
                <el-button type="danger" @click="thjujueshenhe">拒绝</el-button>
                <el-button type="primary" @click="thquerenshenhe">确认</el-button>
            </div>
        </el-dialog>

        <!--商品采购已审批作废弹框-->
        <el-dialog :visible.sync="caigouspzf" title="商品采购" class="caigousq_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga" style="border-bottom: 1px solid #e4e4e4;">
                    <el-form-item style="min-width:50%" label="业务单号：">{{spcgzfDetail.orderNumber}}</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="spcgzfDetail.status==0">待审批</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="状态："
                        v-if="spcgzfDetail.status==1||spcgzfDetail.status==6"
                    >已审批</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="spcgzfDetail.status==-3">已作废</el-form-item>

                    <div class="shanga" style="width: 100%;">
                        <el-form-item style="min-width:50%" label="加油站：" st>{{spcgzfDetail.oilsStationShortName}}</el-form-item>
                    </div>
                    
                    
                    <el-form-item style="min-width:50%" label="申请人：">{{spcgzfDetail.createrName}}</el-form-item>
                    <el-form-item style="min-width:50%" label="申请时间：">
                        <span
                            v-if="spcgzfDetail.createTime"
                        >{{spcgzfDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="审批人：" v-if="spcgzfDetail.merchantAuditorName">{{spcgzfDetail.merchantAuditorName}}</el-form-item>                   
                    <el-form-item style="min-width:50%" label="审批时间：" v-if="spcgzfDetail.merchantAuditorName">
                        <span
                            v-if="spcgzfDetail.createTime"
                        >{{spcgzfDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="拒绝原因：" v-if="spcgzfDetail.merchantRefuseReason">{{spcgzfDetail.merchantRefuseReason}}</el-form-item>
                </div>
                <ul style="padding: 0;">
                    <li v-for="item in spcgzfList" style="margin-bottom: 30px;">
                        <div class="shanga" v-if="spcgzfDetail.status >= 1">
                            <el-form-item label="供应商：" >{{item[0].supplierShortName}}</el-form-item>                           
                            <el-form-item label="子订单号："  style="width:400px;">{{item[0].orderNumber}}</el-form-item>
                            <el-form-item
                                label="审核时间："
                                v-if="item[0].status==-3"
                            >{{item[0].auditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                        </div>

                        <el-table
                            :data="item"
                            style="width: 100%;"
                            :header-cell-style="{background:'#f5f7fa'}"
                        >
                            <el-table-column label="序号" align="center" min-width="60">
                                <template slot-scope="scope">
                                    <span v-if="item.length !== scope.$index+1">{{scope.$index+1}}</span>
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
                            <el-table-column label="供应商" align="center" min-width="110" v-if="spcgzfDetail.status==1||spcgzfDetail.status==6">
                                <template slot-scope="scope">{{scope.row.supplierShortName}}</template>
                            </el-table-column>
                        </el-table>
                    </li>
                </ul>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="caigouspzf = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--商品调拨已审批作废弹框-->
        <el-dialog :visible.sync="caigouspdb" title="商品调拨" class="caigousq_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item style="min-width:50%" label="业务单号：">{{spcgdbDetail.orderNumber}}</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="spcgdbDetail.status==0">待审批</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="状态："
                        v-if="spcgdbDetail.status==1||spcgdbDetail.status==3"
                    >已审批</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="spcgdbDetail.status==-3">已作废</el-form-item>
                    <el-form-item style="min-width:50%" label="申请人：">{{spcgdbDetail.createrName}}</el-form-item>
                    <el-form-item style="min-width:50%" label="申请时间：">
                        <span
                            v-if="spcgdbDetail.createTime"
                        >{{spcgdbDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="出库加油站：" v-if="!spcgdbDetail.status==0">{{spcgdbDetail.oilsNameOut}}</el-form-item>
                    <el-form-item style="min-width:50%" label="入库加油站：" v-if="!spcgdbDetail.status==0 && !spcgdbDetail.status==3">{{spcgdbDetail.oilsNameIn}}</el-form-item>
                    <el-form-item style="min-width:50%" label="拒绝原因：" v-if='spcgdbDetail.refuseReason && spcgdbDetail.status==-3'>
                            {{spcgdbDetail.refuseReason}}
                    </el-form-item>
                    <el-form-item
                        style="min-width:50%" label="审批人："
                        v-if="spcgdbDetail.auditorName"
                    >{{spcgdbDetail.auditorName}}</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="审批时间："
                        v-if="spcgdbDetail.auditTime"
                    >{{spcgdbDetail.auditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                     <el-form-item style="min-width:50%" label="调拨原因：" v-if='spcgdbDetail.allocateReason'>
                            {{spcgdbDetail.allocateReason}}
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="拒绝原因：" v-if='spcgdbDetail.refuseReason && !spcgdbDetail.status==-3'>
                            {{spcgdbDetail.refuseReason}}
                    </el-form-item>
                </div>
                <el-table
                    :data="spcgdbList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <el-table-column label="序号" align="center" min-width="60">
                        <template slot-scope="scope">
                            <span v-if="spcgdbList.length !== scope.$index+1">{{scope.$index+1}}</span>
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

                    <el-table-column label="调拨数量" align="center" min-width="90">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="caigouspdb = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--商品报废已审批作废弹框-->
        <el-dialog :visible.sync="caigouspbf" title="商品报废" class="caigousq_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    
                    <el-form-item label="报废单号：" style="min-width: 50%">{{spcgbfDetail.orderNumber}}</el-form-item>
                    <el-form-item label="状态：" v-if="spcgbfDetail.status==0">待审批</el-form-item>
                    <el-form-item
                        label="状态："
                        v-if="spcgbfDetail.status==1||spcgbfDetail.status==6"
                    >已审批</el-form-item>
                    <el-form-item label="状态：" v-if="spcgbfDetail.status==-3">已作废</el-form-item>
                    <div class="shanga" style="width: 100%;">
                        <el-form-item label="加油站：" style="min-width: 50%">{{spcgbfDetail.oilsStationName}}</el-form-item>
                        <el-form-item label="拒绝原因：" v-if="spcgbfDetail.status==-3" style="min-width: 50%">{{spcgbfDetail.merchantRefuseReason}}</el-form-item>
                    </div>
                    <el-form-item label="申请人：" style="min-width: 50%">{{spcgbfDetail.createrName}}</el-form-item>
                    <el-form-item label="申请时间：" style="min-width: 50%">
                        <span
                            v-if="spcgbfDetail.createTime"
                        >{{spcgbfDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </el-form-item><br>
                    <el-form-item label="审批人：" v-if="spcgbfDetail.status==-3||spcgbfDetail.status==6" style="min-width: 50%">{{spcgbfDetail.merchantAuditorName}}</el-form-item>
                    <el-form-item label="审批时间：" v-if="spcgbfDetail.status==-3 ||spcgbfDetail.status==6" style="min-width: 50%">
                        <span>{{spcgbfDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                    </el-form-item><br>
                    
                </div>
                <el-table
                    :data="spcgbfList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <el-table-column label="序号" align="center" min-width="110">
                        <template slot-scope="scope">
                            <span v-if="spcgbfList.length !== scope.$index+1">{{scope.$index+1}}</span>
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
                    <el-table-column label="报废数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.returnedCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报废原因" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.reason}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="caigouspbf = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--商品退货已审批作废弹框-->
        <el-dialog :visible.sync="caigouspth" title="商品退货" class="caigousq_tab" width="900px">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item style="min-width:50%" label="退货单号：">{{spcgthDetail.orderNumber}}</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="spcgthDetail.status==0">待审批</el-form-item>
                    <el-form-item
                        style="min-width:50%" label="状态："
                        v-if="spcgthDetail.status==1||spcgthDetail.status==6"
                    >已审批</el-form-item>
                    <el-form-item style="min-width:50%" label="状态：" v-if="spcgthDetail.status==-3">已作废</el-form-item>
                    <el-form-item style="min-width:50%" label="供应商：">{{spcgthList[0].supplierShortName}}</el-form-item>
                    <el-form-item style="min-width:50%" label="加油站：">{{spcgthDetail.oilsStationName}}</el-form-item>
                    <el-form-item style="min-width:50%" label="营业日：" v-if="spcgthDetail.businessDay">
                        {{spcgthDetail.businessDay | parseTime('{y}-{m}-{d}')}}
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="班次：" v-if="spcgthDetail.shiftId">
                        {{spcgthDetail.shiftId}}
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="申请人：" v-if="spcgthDetail.createrName">{{spcgthDetail.createrName}}</el-form-item>
                    <el-form-item style="min-width:50%" label="申请时间：" v-if="spcgthDetail.createTime" >
                        <span>{{spcgthDetail.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="审批人：" v-if="spcgthDetail.merchantAuditorName">
                        <span>{{spcgthDetail.merchantAuditorName}}</span>
                    </el-form-item>

                    <el-form-item style="min-width:50%" label="审批时间：" v-if="spcgthDetail.merchantAuditTime">
                        <span>{{spcgthDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="拒绝原因：" v-if="spcgthDetail.blocRefuseReason">
                        {{spcgthDetail.blocRefuseReason}}
                    </el-form-item>
                    <el-form-item style="min-width:50%" label="拒绝原因：" v-if="spcgthDetail.merchantRefuseReason">
                        {{spcgthDetail.merchantRefuseReason}}
                    </el-form-item>
                    
                </div>
                <el-table
                    :data="spcgthList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <el-table-column label="序号" align="center" min-width="60">
                        <template slot-scope="scope">
                          <span v-if="spcgthList.length !== scope.$index+1">{{scope.$index+1}}</span>
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
                    <el-table-column label="报废数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.returnedCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="报废原因" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.reason}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="caigouspth = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--油品采购待办事项-->
        <el-dialog :visible.sync="ypcaigousq" title="油品采购申请" class="caigousq_yp">
            <el-form label-width="80" label-position="left" ref="ypCaiData">
                <div class="shanga">
                    <el-form-item label="加油站：">{{oilCaiGou.oilsStationName}}</el-form-item>
                    <el-form-item label="状态：" v-if="status==0">待审批</el-form-item>
                    <!--<el-form-item label="状态：" v-if="">
		          	已审批
		        </el-form-item>
		        <el-form-item label="状态：" v-if="">
		          	已作废
                    </el-form-item>-->
                    <el-form-item label="申请人：">{{oilCaiGou.createrName}}</el-form-item>
                    <el-form-item label="申请配送数量：">{{oilCaiGou.purchaseAmount}}升</el-form-item>
                    <el-form-item label="采购单号：">{{oilCaiGou.orderNumber}}</el-form-item>
                    <el-form-item
                        label="申请时间："
                    >{{oilCaiGou.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item label="申请油品：">{{oilCaiGou.oilsName}}</el-form-item>
                    <el-form-item
                        label="申请计划到达时间："
                    >{{oilCaiGou.planArriveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                </div>
                <el-form-item label="出库油库：">
                    <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange"
                        style="width: 30%;"
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ypcaigousq = false">取消</el-button>
                <el-button type="danger" @click="ypShenqingN">拒绝</el-button>
                <el-button type="primary" @click="ypShenqingO">确认</el-button>
            </div>
        </el-dialog>

        <!--油品采购未审批弹框-->
        <el-dialog :visible.sync="ypcaigouWei" title="油品采购" class="caigouDe_yp">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item label="采购单号：">{{ypcgDetail.orderNumber}}</el-form-item>
                    <el-form-item label="状态：">
                        <span v-if="ypcgDetail.status==0">待审批</span>
                        <span v-if="ypcgDetail.status==1">已审批</span>
                        <span v-if="ypcgDetail.status==5">配送中</span>
                        <span v-if="ypcgDetail.status==6">已完成</span>
                        <span v-if="ypcgDetail.status==-3">已作废</span>
                    </el-form-item>
                    <el-form-item label="申请油站：">{{ypcgDetail.oilsStationName}}</el-form-item>
                    <el-form-item label></el-form-item>
                    <el-form-item label="采购油品：">{{ypcgDetail.oilsName}}</el-form-item>
                    <el-form-item label="采购数量：">{{ypcgDetail.purchaseAmount}}升</el-form-item>
                    <el-form-item label="油品规格：">{{ypcgDetail.oilsSpecName}}升</el-form-item>
                    <el-form-item label="出库油库：">{{ypcgDetail.oilsSupplierName}}升</el-form-item>
                    <el-form-item label="申请计划到达时间：">
                        <span>{{ypcgDetail.planArriveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                    </el-form-item>
                    <el-form-item label></el-form-item>
                    <el-form-item
                        label="审批人："
                        v-if="ypcgDetail.merchantName"
                    >{{ypcgDetail.merchantName}}</el-form-item>
                    <el-form-item
                        label="审批时间："
                        v-if="ypcgDetail.merchantAuditTime"
                    >{{ypcgDetail.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>

                    <el-form-item
                        label="订单拒绝原因："
                        v-if="ypcgDetail.merchantRefuseReason"
                    >{{ypcgDetail.merchantRefuseReason}}</el-form-item>
                    <el-form-item label="订单退回原因：" v-if="ypcgDetail.remark">{{ypcgDetail.remark}}</el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ypcaigouWei = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--油品调拨待办事项-->
        <el-dialog :visible.sync="ypdiaobo" title="油品调拨申请" class="caigousq_yp">
            <el-form label-width="80" label-position="left" ref="ypCaiData">
                <div class="shanga">
                    <el-form-item label="调拔单号：">{{oilDBDetails.orderNumber}}</el-form-item>
                    <el-form-item label="状态：" v-if="status==0">待审批</el-form-item>
                    <el-form-item label="调出油站：">{{oilDBDetails.oilsStationName}}</el-form-item>
                    <el-form-item label="调拨油品：">{{oilDBDetails.oilsName}}</el-form-item>
                    <el-form-item label="计划调拨数量：">{{oilDBDetails.planCount}}升</el-form-item>
                    <el-form-item label="计划调拨时间：">{{oilDBDetails.planTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <!--<el-form-item label="状态：" v-if="">
		          	已审批
		        </el-form-item>
		        <el-form-item label="状态：" v-if="">
		          	已作废
                    </el-form-item>-->
                    <el-form-item label="申请人：">{{oilDBDetails.createrName}}</el-form-item>
                    <el-form-item
                        label="申请时间："
                    >{{oilDBDetails.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>

                    <el-form-item label="调拨原因：">{{oilDBDetails.allocateReason}}</el-form-item>
                </div>
                <el-form-item label="调入油站：">
                    <el-select
                        v-model="rukuyouzhan"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="zhuangtaiX"
                    >
                        <el-option
                            v-for="item in youzhan"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            v-show="oilDBDetails.stationId!=item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ypdiaobo = false">取消</el-button>
                <el-button type="danger" @click="ypChukuNo">拒绝</el-button>
                <el-button type="primary" @click="ypChukuOk">确认</el-button>
            </div>
        </el-dialog>

        <!--油品调拨统一弹框-->
        <el-dialog :visible.sync="ypdiaoboCha" title="油品调拨" class="caigousq_yp">
            <el-form label-width="80" label-position="left" ref="ypCaiData">
                <div class="shanga">
                    <el-form-item label="调拨单号：">{{oilDBDetails.orderNumber}}</el-form-item>
                    <el-form-item label="状态：" v-if="oilDBDetails.status==0">待审批</el-form-item>
                     <el-form-item label="状态：" v-if="oilDBDetails.status==1">已审批</el-form-item>
                    <el-form-item label="状态：" v-if="oilDBDetails.status==6">已完成</el-form-item>
                    <el-form-item label="状态：" v-if="oilDBDetails.status==-3">已作废</el-form-item>
                    <!--<el-form-item label="状态：" v-if="">
		          	已审批
		        </el-form-item>
		        <el-form-item label="状态：" v-if="">
		          	已作废
                    </el-form-item>-->
                    <el-form-item label="调出油站：">{{oilDBDetails.oilsStationName}}</el-form-item>
                    <el-form-item label="调拨油品：">{{oilDBDetails.oilsName}}</el-form-item>
                    <el-form-item label="计划调拨数量：">{{oilDBDetails.planCount}}升</el-form-item>
                    <el-form-item label="计划调时间：">{{oilDBDetails.planTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>                  
                </div>
                <div class="shanga">
                    <el-form-item label="申请人：">{{oilDBDetails.createrName}}</el-form-item>
                    <el-form-item
                        label="申请时间："
                    >{{oilDBDetails.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item
                        label="审核人："
                        v-if="oilDBDetails.modifierName"
                    >{{oilDBDetails.modifierName}}</el-form-item>
                    <el-form-item
                        label="审核时间："
                        v-if="oilDBDetails.modifyTime"
                    >{{oilDBDetails.modifyTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    <el-form-item label="调拨原因：">{{oilDBDetails.allocateReason}}</el-form-item>
                    <el-form-item  v-if="oilDBDetails.status!=0&&oilDBDetails.status!= 1" label="拒绝原因：">{{oilDBDetails.refuseReason}}</el-form-item>
                    <el-form-item v-if="oilDBDetails.status!=0&&oilDBDetails.status!=-3" label="入库加油站：">{{oilDBDetails.inputOilsStationName}}</el-form-item>
                </div>
                

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ypdiaoboCha = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    youzhanList,
    daibanList,
    yewuDetail,
    orderGong,
    orderGongPrice,
    orderTong,
    orderDiaobo,
    orderdb,
    oilShen,
    getOilSupplierAndOilsListByStation,
    oilShangChuKu
} from "@/api/shuju";
import {
    returnedDetail,
    returnedJujue,
    SupplierList,
    orderShenShen,
    diaoboDetail
} from "@/api/shangpin";

import { oilDBShenhe, oilDBDetail } from "@/api/oil";

import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 0
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近14天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 14
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },

            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            value6: "",
            youzhan: [],
            zhuangtai: [
                {
                    id: ["0"],
                    name: "待审核"
                },
                {
                    id: ["1", "3", "5", "6"],
                    name: "已审核"
                },
                {
                    id: ["-3"],
                    name: "已作废"
                }
            ],
            yewu: [
                {
                    id: 1,
                    name: "油品采购"
                },
                {
                    id: 2,
                    name: "商品采购"
                },
                {
                    id: 3,
                    name: "促销管理"
                },
                {
                    id: 4,
                    name: "油品调拨"
                },
                {
                    id: 5,
                    name: "商品调拨"
                },
                {
                    id: 6,
                    name: "商品报废"
                },
                {
                    id: 7,
                    name: "商品退货"
                }
            ],
            str:{},
            status: [],
            gongyingshangde: "",
            gongyingshangdeId: "",
            gongyingshangPrice: "",
            jujude: "",
            jujuede: [],
            shangpinCaigou: {
                goodsList: [],
                goodsPurchaseApplyInfo: {
                    companyId: "",
                    createTime: "",
                    creater: "",
                    id: "",
                    oilsStationShortName: "",
                    orderNumber: "",
                    orderType: "",
                    stationId: "",
                    status: ""
                }
            },
            beizhu: "",
            form: {
                name: ""
            },

            listQuery: {
                pageNum: 1,
                pageSize: 10,
                stationId: "",
                statusList: ["0", "1", "3", "-3", "5", "6"],
                typeId: "",
                beginTime: "",
                endTime: ""
            },
            caigousq: false,

            //-----------------商品调拨开始---------------------
            caigoudb: false,
            dbDetail: "",
            dbList: [],
            dbyouzhanList: [],
            ruYouzhan: "",
            dbjujude: "",
            dbjujuede: "",
            //-----------------商品调拨结束---------------------

            //-----------------商品报废开始---------------------
            shangpinbf: false,
            bfDetail: "",
            bfList: [],

            //-----------------商品报废结束---------------------

            //-----------------商品退货开始---------------------
            shangpinth: false,
            thDetail: "",
            thList: [{ supplierId: "" }],
            gongyingshangList: [],

            //-----------------商品退货结束---------------------

            //-----------------商品采购完成和作废弹框---------------------
            caigouspzf: false,
            spcgzfDetail: {},
            spcgzfList: [],
            gongyingshangList2: [],

            //-----------------商品调拨完成和作废弹框---------------------
            caigouspdb: false,
            spcgdbDetail: {},
            spcgdbList: [],

            //-----------------商品报废完成和作废弹框---------------------
            caigouspbf: false,
            spcgbfDetail: {},
            spcgbfList: [],

            //-----------------商品退货完成和作废弹框---------------------
            caigouspth: false,
            spcgthDetail: {},
            spcgthList: [{ supplierShortName: "" }],

            //------------------------油品采购申请审批----------------------------------------
            ypcaigousq: false,
            oilCaiGou: {},
            selectedOptions: [],

            options: [],
            ypShangchuan: [],

            //------------------------油品采购未审批弹框----------------------------------------
            ypcaigouWei: false,
            ypcgDetail: {},

            //------------------------油品调拨未审批弹框----------------------------------------
            ypdiaobo: false,
            oilDBDetails: {},
            rukuyouzhan: "",

            ypdiaoboCha: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.youzhanlist();
            daibanList(this.listQuery).then(res => {
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });
        },
        shijian() {
            if (this.value6) {
                console.log(this.value6);
                this.listQuery.beginTime = this.value6[0];
                this.listQuery.endTime = this.value6[1];
            } else {
                this.listQuery.beginTime = "";
                this.listQuery.endTime = "";
            }
            this.tianjianyong();
        },
        zhuangtaiX() {
            if (this.status == [] || this.status == "") {
                this.listQuery.statusList = ["0", "1", "3", "-3", "5", "6"];
            } else {
                this.listQuery.statusList = this.status;
            }
            this.tianjianyong();
        },
        tianjianyong() {
            this.listQuery.page = 0;
            daibanList(this.listQuery).then(res => {
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });
        },
        youzhanlist() {
            youzhanList({}).then(res => {
                console.log(res);
                this.youzhan = [];
                res.data.forEach(item => {
                    var data = {
                        id: item.id,
                        name: item.shortName
                    };
                    this.youzhan.push(data);
                });
            });
        },
        caigoushenqing(idid, type) {
            console.log(idid)
            let data = {
                id: idid
            };
            if (type == 1) {
                console.log("11111");
            } else if (type == 2) {
                yewuDetail(data).then(res => {
                    console.log(res);
                    res.data.goodsList[0].forEach(item => {
                        console.log(item)
                                //    item["supplierId"] =item.lastBuySupplier ;                                    
                                if(!item.lastBuySupplier){
                                    item["supplierId"] = '';                                    
                                }else{
                                    item.supplierList.map((items)=>{
                                        if(item.lastBuySupplier==items.supplierId){
                                            item["supplierId"] = items.supplierId
                                        }
                                        
                                    })

                                    this.gongyingshangde = item.supplierList
                                }
                    });
                    this.shangpinCaigou = res.data;
                    this.summation()
                    
                });
                this.caigousq = true;
            } else if (type == 3) {
                console.log("3");
            } else if (type == 4) {
                console.log("4");
            } else if (type == 5) {
                console.log(data);
                orderDiaobo(data).then(item => {
                    console.log(item);
                    this.dbDetail = item.data.goodsAllocateApplyInfo;
                    this.dbList = item.data.goodsList;

                    let sum = 0;
                    this.dbList.forEach((item)=>{
                        sum += Number(item.orderCount);
                    })
                    this.dbList.push({
                        lastName:'合计',
                        orderCount:sum
                    })

                    this.dbyouzhanList = [];
                    console.log(this.youzhan);
                    console.log(this.dbDetail.id);
                    this.youzhan.forEach(item => {
                        if (item.id == this.dbDetail.oilsId) {
                        } else {
                            this.dbyouzhanList.push(item);
                        }
                    });
                });
                this.caigoudb = true;
            } else if (type == 6) {
                console.log("6");
                let datas = {
                    id: idid,
                    typeId: 2
                };
                returnedDetail(datas).then(res => {
                    console.log(res);
                    this.bfList = res.data.goodsList;

                    let sum = 0;
                    this.bfList.forEach((item)=>{
                        sum += Number(item.returnedCount);
                    })
                    this.bfList.push({
                        lastName:'合计',
                        returnedCount:sum
                    })

                    this.bfDetail = res.data.goodsReturnedInfo;
                    this.shangpinbf = true;
                });
            } else if (type == 7) {
                let datas = {
                    id: idid,
                    typeId: 1
                };

                let dataSupplier = {
                    supplierType: 2
                };

                SupplierList(dataSupplier).then(res => {
                    this.gongyingshangList = res.data;
                });

                returnedDetail(datas).then(res => {
                    console.log(res);
                    this.thList = res.data.goodsList;

                    let sum = 0;
                    this.thList.forEach((item)=>{
                        sum += Number(item.returnedCount);
                    })
                    this.thList.push({
                        lastName:'合计',
                        returnedCount:sum
                    })

                    this.thDetail = res.data.goodsReturnedInfo;
                    this.shangpinth = true;
                });
            }
        },
        summation(){
            if(this.shangpinCaigou.goodsList[0]){
                let sum = 0;
                this.shangpinCaigou.goodsList[0].forEach((item,index)=>{
                    if(item.lastName){
                        this.shangpinCaigou.goodsList[0].splice(index,1)
                    }else{
                        sum += Number(item.orderCount);
                    }
                })
                this.shangpinCaigou.goodsList[0].push({
                    lastName:'合计',
                    orderCount:sum
                })
            }
        },
        querenshenhe() {
            this.jujuede = [];
            if (this.jujude) {
                this.shangpinCaigou.goodsList[0].forEach((item, index) => {
                    console.log(item)
                    this.jujude.forEach(i => {
                        console.log(i)
                        if (item.goodsId == i.goodsId) {
                            console.log(index);
                            this.jujuede.push(item);
                        }
                    });
                });
                var arr2 = this.shangpinCaigou.goodsList[0];
                var tongguode = [];
                for (var i = 0; i < arr2.length; i++) {
                    var obj = arr2[i];
                    var num = obj.id;
                    var flag = false;
                    for (var j = 0; j < this.jujuede.length; j++) {
                        var aj = this.jujuede[j];
                        var n = aj.id;
                        if (n == num) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        tongguode.push(obj);
                    }
                }
            } else {
                var tongguode = this.shangpinCaigou.goodsList[0];
            }

            tongguode = [...tongguode]
            tongguode.splice(tongguode.length - 1,1)

            let data = {
                id: this.shangpinCaigou.goodsPurchaseApplyInfo.id,
                applyResult: 1,
                //				refuseReason:,
                applyRemark: this.beizhu,
                agreeGoodsList: tongguode,
                refuseGoodsList: this.jujuede
            };
            var gongying = true;
            if (data.agreeGoodsList) {
                data.agreeGoodsList.forEach(item => {
                    delete item["createTime"];
                    delete item["auditTime"];
                    if (!item.supplierId) {
                        gongying = false;
                    }
                });
            }
            if (data.refuseGoodsList) {
                data.refuseGoodsList.forEach(item => {
                    delete item["createTime"];
                    delete item["auditTime"];
                });
            }

            console.log(data);
            if (gongying) {
                orderTong(data).then(() => {
                    this.caigousq = false;
                    this.getList();
                });
            } else {
                this.$notify.error({
                    title: "错误",
                    message: "请选择商品供应商"
                });
            }
        },
        //审核拒绝
        jujueshenhe() {
            this.$prompt("请输入拒绝原因", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S/,
                inputErrorMessage: "请输入原因"
            })
                .then(({ value }) => {
                    let data = {
                        id: this.shangpinCaigou.goodsPurchaseApplyInfo.id,
                        applyResult: -1,
                        refuseReason: value,
                        applyRemark: this.beizhu
                    };

                    orderTong(data).then(() => {
                        this.caigousq = false;
                        this.$message({
                            type: "info",
                            message: "已拒绝"
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        },
        openDetails(row) {
            console.log(row);
            let data = {
                goodsId: row.goodsId,
                typeId: row.goodsType,
                isShowBlocSuppliers: 1

            };
            orderGongPrice(data).then(res => {
                console.log(res);
                this.gongyingshangPrice = res.data;
            });
        },
        gongyingshang(goodsId, typeId) {
            console.log(goodsId, typeId);
            console.log(this.shangpinCaigou);
            let data = {
                goodsId: goodsId,
                typeId: typeId,
                isShowBlocSuppliers: 1
            };
            orderGong(data).then(res => {
                console.log(res.data);
                this.gongyingshangde = res.data;
            });
        },
        jujue(selection, row) {
            selection.forEach((item, index) =>{
                if(item.lastName){
                    selection.splice(index,1)
                }
            })
            this.jujude = selection;
        },

        //------------------商品调拨方法开始-------------------------------
        dbjujue(selection, row) {
            selection.forEach((item, index) =>{
                if(item.lastName){
                    selection.splice(index,1)
                }
            })
            this.dbjujude = selection;
        },
        //审核拒绝
        dbjujueshenhe() {
            this.$prompt("请输入拒绝原因", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S/,
                inputErrorMessage: "请输入原因"
            })
                .then(({ value }) => {
                    let data = {
                        id: this.dbDetail.id,
                        applyResult: -1,
                        refuseReason: value
                    };
                    console.log(data);
                    orderdb(data).then(() => {
                        this.caigoudb = false;
                        this.$message({
                            type: "info",
                            message: "已拒绝"
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        },

        dbquerenshenhe() {
            this.dbjujuede = [];
            if (this.dbjujude) {
                this.dbList.forEach((item, index) => {
                    this.dbjujude.forEach(i => {
                        if (item.goodsId == i.goodsId) {
                            console.log(index);
                            this.dbjujuede.push(item);
                        }
                    });
                });
                var arr2 = this.dbList;
                var tongguode = [];
                for (var i = 0; i < arr2.length; i++) {
                    var obj = arr2[i];
                    var num = obj.id;
                    var flag = false;
                    for (var j = 0; j < this.dbjujuede.length; j++) {
                        var aj = this.dbjujuede[j];
                        var n = aj.id;
                        if (n == num) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        tongguode.push(obj);
                    }
                }
            } else {
                var tongguode = this.dbList;
            }

            tongguode = [...tongguode]
            tongguode.splice(tongguode.length - 1,1)

            this.dbjujuede.forEach((item,index) => {
                if(item.lastName){
                    this.dbjujuede.splice(index,1)
                }
            })

            if (!this.ruYouzhan) {
                this.$notify.error({
                    title: "错误",
                    message: "请选择调入的加油站"
                });
                return false;
            }

            var cucun = true;
            tongguode.forEach(item => {
                if (item.orderCount > item.goodsRepertory) {
                    cucun = false;
                }
            });
            if (cucun) {
                let data = {
                    id: this.dbDetail.id,
                    applyResult: 1,
                    //				refuseReason:,
                    agreeList: tongguode,
                    refuseList: this.dbjujuede,
                    inputOilsStationID: this.ruYouzhan
                };
                if (data.refuseList) {
                    data.refuseList.forEach(item => {
                        delete item["createTime"];
                    });
                }
                if (data.agreeList) {
                    data.agreeList.forEach(item => {
                        delete item["createTime"];
                    });
                }
                orderdb(data).then(() => {
                    this.caigoudb = false;
                    this.getList();
                });
            } else {
                this.$notify.error({
                    title: "错误",
                    message: "加油站商品库存不够"
                });
            }
        },

        //------------------商品调拨方法结束-------------------------------

        //------------------商品报废方法开始-------------------------------

        //审核拒绝
        bfjujueshenhe() {
            this.$prompt("请输入拒绝原因", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S/,
                inputErrorMessage: "请输入原因"
            })
                .then(({ value }) => {
                    let data = {
                        id: this.bfDetail.id,
                        applyResult: -1,
                        refuseReason: value,
                        typeId: 2
                    };

                    returnedJujue(data).then(() => {
                        this.shangpinbf = false;
                        this.$message({
                            type: "info",
                            message: "已拒绝"
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        },
        bfquerenshenhe() {
            this.bfList.forEach(item => {
                delete item["createTime"];
            });

            let tongguode = [...this.bfList]
            tongguode.splice(tongguode.length - 1,1)
            
            let data = {
                id: this.bfDetail.id,
                applyResult: 1,
                agreeList: tongguode,
                refuseList: [],
                typeId: 2
            };
            console.log(data);
            returnedJujue(data).then(() => {
                this.shangpinbf = false;
                this.$message({
                    type: "success",
                    message: "已确认"
                });
                this.getList();
            });
        },

        //------------------商品报废方法结束-------------------------------

        //------------------商品退货方法开始-------------------------------
        //审核拒绝
        thjujueshenhe() {
            this.$prompt("请输入拒绝原因", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S/,
                inputErrorMessage: "请输入原因"
            })
                .then(({ value }) => {
                    let data = {
                        id: this.thDetail.id,
                        applyResult: -1,
                        refuseReason: value,
                        typeId: 1
                    };

                    returnedJujue(data).then(() => {
                        this.shangpinth = false;
                        this.$message({
                            type: "info",
                            message: "已拒绝"
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        },
        thquerenshenhe() {
            this.thList.forEach(item => {
                delete item["createTime"];
                delete item["merchantAuditTime"];
            });

            let tongguode = [...this.thList]
            tongguode.splice(tongguode.length - 1,1)

            let data = {
                id: this.thDetail.id,
                applyResult: 1,
                agreeList: tongguode,
                orderNumber: this.thDetail.orderNumber,
                refuseList: [],
                typeId: 1
            };
            console.log(data);
            returnedJujue(data).then(() => {
                this.shangpinth = false;
                this.$message({
                    type: "success",
                    message: "已确认"
                });
                this.getList();
            }).catch((res)=>{
                this.$message.error(res.response.data.error)
            })
        },

        //------------------商品退货方法结束-------------------------------

        //------------------商品采购详情-------------------------------
        spcgDetail(idid) {
            let data = {
                id: idid
            };

            let dataSupplier = {
                supplierType: 2
            };

            SupplierList(dataSupplier).then(res => {
                console.log(res);
                this.gongyingshangList2 = res.data;
            });
            orderShenShen(data).then(res => {
                console.log(res);
                this.spcgzfDetail = res.data.goodsPurchaseApplyInfo;
                this.spcgzfList = res.data.goodsList;
                this.shouHuoSum();
                this.caigouspzf = true;
            });
        },
        shouHuoSum(){
            this.spcgzfList.forEach((item)=>{
                let sum = 0;

                item.forEach((item1,index)=>{
                    if(item1.lastName){
                        item.splice(index,1)
                    }else{
                        sum += Number(item1.orderCount);
                    }
                    
                })
                item.push({
                    lastName:'合计',
                    orderCount:sum,
                })
            })
        },
        //------------------商品采购详情结束-------------------------------

        //------------------商品调拨详情-------------------------------
        spdbDetail(idid) {
            let data = {
                id: idid
            };
            diaoboDetail(data).then(res => {
                console.log(res);
                this.spcgdbDetail = res.data.goodsAllocateApplyInfo;
                this.spcgdbList = res.data.goodsList;

                let sum = 0;
                this.spcgdbList.forEach((item)=>{
                    sum += Number(item.orderCount);
                })
                this.spcgdbList.push({
                    lastName:'合计',
                    orderCount:sum
                })

                this.caigouspdb = true;
            });
        },
        //------------------商品调拨详情结束-------------------------------

        //------------------商品报废详情-------------------------------
        spbfDetail(idid) {
            let data = {
                id: idid,
                typeId: 2
            };
            console.log(data);
            returnedDetail(data).then(res => {
                console.log(res);
                this.spcgbfDetail = res.data.goodsReturnedInfo;
                this.spcgbfList = res.data.goodsList;

                let sum = 0;
                this.spcgbfList.forEach((item)=>{
                    sum += Number(item.returnedCount);
                })
                this.spcgbfList.push({
                    lastName:'合计',
                    returnedCount:sum
                })

                this.caigouspbf = true;
            });
        },
        //------------------商品报废详情结束-------------------------------

        //------------------商品退货详情-------------------------------
        spthDetail(idid) {
            let data = {
                id: idid,
                typeId: 1
            };
            returnedDetail(data).then(res => {
                console.log(res);
                this.spcgthDetail = res.data.goodsReturnedInfo;
                this.spcgthList = res.data.goodsList;

                let sum = 0;
                this.spcgthList.forEach((item)=>{
                    sum += Number(item.returnedCount);
                })
                this.spcgthList.push({
                    lastName:'合计',
                    returnedCount:sum
                })

                this.caigouspth = true;
            });
        },
        //------------------商品退货详情结束-------------------------------

        //------------------油品采购审批开始-------------------------------
        ypcaigou(idid) {
                this.ypcaigousq = true;
            let data = {
                id: idid
            };
            oilShen(data).then(res => {
                console.log(res);
                this.oilCaiGou = res.data;
            });
            console.log(this.oilCaiGou)
            getOilSupplierAndOilsListByStation(data).then(res => {
                console.log(res);
                this.options = [];
                res.data.supplierList.forEach(item => {
                    let data = {
                        value: item.supplierId,
                        label:
                            item.supplierName +
                            " > " +
                            item.haulDistance +
                            " KM ",
                        children: []
                    };
                    item.supplierOilsMaintainList.forEach(v => {
                        let data2 = {
                            value: v.oilsSpecId,
                            label:
                                v.specName +
                                " : " +
                                v.purchasingPrice +
                                "元/吨",
                            price: v.purchasingPrice
                        };
                        data.children.push(data2);
                    });
                    this.options.push(data);
                });

                console.log(this.options);
                this.ypcaigousq = true;
            });
        },
        handleItemChange(val) {
            console.log("active item:", val);
        },
        handleChange(value) {
            this.options.forEach(item => {
                item.children.forEach(v => {
                    if ((v.oilsId = value[0])) {
                        value.push(v.price);
                    }
                });
            });
            console.log(value);
            this.ypShangchuan = value;
        },
        ypShenqingO() {
            if (this.ypShangchuan.length < 1) {
                this.$message({
                    type: "info",
                    message: "请选择供应商油库",
                    duration: 1000
                });
            } else {
                let data = {
                    id: this.oilCaiGou.id,
                    oilsPrice: this.ypShangchuan[2],
                    supplierId: this.ypShangchuan[0],
                    oilsSpecId: this.ypShangchuan[1],
                    applyResult: 1
                };
                console.log(data);
                oilShangChuKu(data)
                    .then(res => {
                        this.$message({
                            type: "success",
                            message: "执行成功",
                            duration: 1000
                        });
                        this.ypShangchuan = [];
                        this.ypcaigousq = false;
                        this.selectedOptions = [];
                        this.getList();
                    })
                    .catch(res => {
                        console.log(res.response);
                        this.$notify.error({
                            title: "错误",
                            message: res.response.data.error,
                            duration: 1000
                        });
                    });
            }
        },
        ypShenqingN() {
            this.$prompt("请输入拒绝原因", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S/,
                inputErrorMessage: "请输入原因"
            })
                .then(({ value }) => {
                    let data = {
                        id: this.oilCaiGou.id,
                        applyResult: -1,
                        refuseReason: value
                    };
                    console.log(data);
                    oilShangChuKu(data).then(() => {
                        this.ypcaigousq = false;
                        this.$message({
                            type: "success",
                            message: "已拒绝"
                        });
                        this.ypShangchuan = [];
                        this.selectedOptions = [];
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        },
        //------------------油品采购审批结束-------------------------------

        //------------------油品采购信息-------------------------------
        ypcaigouDetail(idid) {
            let data = {
                id: idid
            };
            oilShen(data).then(res => {
                console.log(res);
                this.ypcgDetail = res.data;
            });
            this.ypcaigouWei = true;
        },

        //------------------油品调拨审核开始-------------------------------
        ypdiaoboF(row) {
            this.ypdiaobo = true;
            let data = {
                id: row
            };
            oilDBDetail(data).then(res => {
                console.log(res);
                this.oilDBDetails = res.data;
            });
        },
        ypChukuOk() {
            let data = {
                id: this.oilDBDetails.id,
                applyResult: 1,
                inputOilsStationID: this.rukuyouzhan
            };
            console.log(data);
            if (data.inputOilsStationID == "") {
                this.$notify.error({
                    title: "错误",
                    message: "请选择入库加油站",
                    duration: 1000
                });
                return;
            }
            oilDBShenhe(data)
                .then(res => {
                    this.$message({
                        type: "success",
                        message: "执行成功",
                        duration: 1000
                    });
                    this.rukuyouzhan = "";
                    this.ypdiaobo = false;
                    this.getList();
                })
                .catch(res => {
                    console.log(res.response);
                    this.$notify.error({
                        title: "错误",
                        message: res.response.data.error,
                        duration: 1000
                    });
                });
        },
        ypChukuNo() {
            this.$prompt("请输入拒绝原因", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S/,
                inputErrorMessage: "请输入原因"
            })
                .then(({ value }) => {
                    let data = {
                        id: this.oilDBDetails.id,
                        applyResult: -1,
                        refuseReason: value
                    };
                    console.log(data);
                    oilDBShenhe(data).then(() => {
                        this.ypdiaobo = false;
                        this.$message({
                            type: "success",
                            message: "已拒绝"
                        });
                    });
                    this.getList();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消输入"
                    });
                });
        },

        ypdiaoboC(row) {
            this.ypdiaoboCha = true;
            let data = {
                id: row
            };
            oilDBDetail(data).then(res => {
                console.log(res);
                this.oilDBDetails = res.data;
            });
        },

        //------------------油品调拨审核结束-------------------------------

        //------------------促销管理开始-------------------------------

        approval(row){
            // console.log('促销管理审批')
            this.$router.push({
                path:'/management/management-todo-promotion',
                query:{
                    id:row.id
                }
            })
        },

        //------------------促销管理结束-------------------------------
    }
};
</script>

<style scoped>
@import url("./todo.scss");
.tableBox{position: relative;}
.tableBox .jujue{top: 1px !important;}
</style>
