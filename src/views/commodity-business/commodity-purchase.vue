<template>
    <div class="app-container purchae">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top  top1" style="padding-bottom:0;">
                <el-form-item label="商品采购" style="margin-top:0px;" />
                <el-button type="primary" class="tui_btn1 "  style=" height: 36px ;position:absolute;right:160px;" @click="caigouTk()">申请采购</el-button>
                <el-button type="primary" class="tui_btn"  style=" height: 36px ;" @click="wudan()">无单收货</el-button>
            </div>
            <div class="items">
                <el-form-item label="采购单号" label-width="90px" style="margin-bottom: 20px;">
                    <el-input
                        v-model="listQuery.orderNumber"
                        @input="getList()"
                        style="min-width:100px;max-width: 260px;"
                    />
                </el-form-item>

                <el-form-item label="单据类型" style="margin-left: 20px;" label-width="80px">
                    <el-select
                        v-model="listQuery.orderType"
                        clearable
                        style="min-width: 100px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in danjuleixing"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="状态" style="margin-left: 20px;" label-width="50px">
                    <el-select
                        v-model="listQuery.statusList"
                        clearable
                        style="min-width: 100px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in zhuangtai"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="供应商" label-width="90px" >
                    <el-select
                        v-model="listQuery.supplierId"
                        clearable
                        style="min-width: 100px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in gongyingshang"
                            :key="item.id"
                            :label="item.supplierShort"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </div>

            <el-table
                :data="dingdanList"
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
            >
                <el-table-column label="单据类型" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderType==1">系统订单</span>
                        <span v-if="scope.row.orderType==2">手工建单</span>
                    </template>
                </el-table-column>
                <el-table-column label="采购单号" min-width="80" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderNumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="加油站" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilsStationShortName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" align="center" min-width="80">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.createTime"
                        >{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待审批</span>
                        <span v-if="scope.row.status==1">处理中</span>
                        <span v-if="scope.row.status==2">处理中</span>
                        <span v-if="scope.row.status==3">处理中</span>
                        <span v-if="scope.row.status==5">待收货</span>
                        <span v-if="scope.row.status==6">已完成</span>
                        <span v-if="scope.row.status==-1">已作废</span>
                        <span v-if="scope.row.status==-2">已作废</span>
                        <span v-if="scope.row.status==-3">已作废</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="left"
                    width="150"
                    class="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==0"
                            @click="ddTk(scope.row.id)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status==1 || scope.row.status ==2 ||scope.row.status ==3 && scope.row.orderType==1||scope.row.status==5&& scope.row.orderType==1"
                            @click="tiaozhuan(scope.row.id)"
                        >收货</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==6 && scope.row.orderType==1"
                            @click="xiTongWan(scope.row.id)"
                        >查看</el-button>
                        <!--<el-button size="mini" type="success" v-if="scope.row.status==1 && scope.row.orderType==1" @click="xiTongWan(scope.row.id)">查看</el-button>-->
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==1 && scope.row.orderType==2"
                            @click="xiTongWan(scope.row.id)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==6 && scope.row.orderType==2"
                            @click="shouGongWan(scope.row.id)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==-1"
                            @click="zuoFeiWan(scope.row.id)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==-2"
                            @click="zuoFeiWan(scope.row.id)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-if="scope.row.status==-3"
                            @click="zuoFeiWan(scope.row.id)"
                        >查看</el-button>
                        <el-button
                            size="mini"
                            type="info"
                            v-if="scope.row.status==0"
                            @click="orderShencans(scope.row.id)"
                        >撤回</el-button>
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
            <!--layout="prev, pager, next, jumper"-->
        </el-form>
        <!--申请采购弹框-->
        <el-dialog :visible.sync="Shenqing" title="商品采购申请" class="shenqing_tab" @open="reset" width="900px">
            <el-form label-width="120px" ref="ShenqingForm">
                <div class="jiahao" @click="shenqingtianjia()">+</div>
                <el-table :data="caigoudeList" style="width: 100%;">
                    <el-table-column label="序号" align="center" min-width="70">
                      <template slot-scope="scope">
                        <span v-if="caigoudeList.length !== scope.$index+1">{{scope.$index+1}}</span>
                        <span v-else>{{scope.row.lastName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="130">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="库存" align="center" min-width="130">
                        <template slot-scope="scope">
                            <span>{{scope.row.repertory}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订货数量" align="center" min-width="100">
                        <template slot-scope="scope">
                            <span v-if="caigoudeList.length !== scope.$index+1"><el-input @change="returnedCountSum" type="number" v-model="scope.row.returnedCount" style="width:80px;"/></span>
                            <span v-else>{{ scope.row.returnedCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.specAmount}} {{scope.row.specUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="品牌" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.brand}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="100">
                        <template slot-scope="scope">
                            <el-button
                                v-if="caigoudeList.length !== scope.$index+1"
                                size="mini"
                                type="primary"
                                @click.native.prevent="ShenqingDel(scope.row.id,scope.row.pid,scope.row.iid,scope.$index,caigoudeList)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label align="center" width="40"></el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Shenqing = false">取消</el-button>
                <el-button type="primary" :disabled="disable" @click="shenqingQL()">提交</el-button>
            </div>
        </el-dialog>

        <!--商品申请添加组件-->
        <el-dialog :visible.sync="shangpintj" title="商品添加" class="shenqingtj_tab" width="1100px">
            <add-order
                v-if="shangpintj"
                :initInfo="caigoudeList"
                :config="{
                    typeList:'orderLei',
                    goodsList:'orderList'
                }"
                @shangpinData="getData"
                @shangpinT="guaT"
            />
        </el-dialog>

        <!--商品申请添加组件  无单收货-->
        <el-dialog :visible.sync="wudanShou" title="商品添加" class="shenqingtj_tab" width="1100px">
            <add-order
                v-if="wudanShou"
                :initInfo="wudanList"
                :config="{
                    typeList:'orderLei',
                    goodsList:'suppOilList',
                    supplierId:supplierIds,
                }"
                @shangpinData="wudanListData"
                @shangpinT="wudanT"
            />
        </el-dialog>


        <!--无单收货弹框-->
        <el-dialog :visible.sync="wudanshouhuo" title="无单收货" class="wudanshouhuo_tab" @open="reset" width="900px">
            <el-form label-width="120px">
                <div class="btn_box">
                    <div class="left">
                        <el-button type="primary" @click="wudanTianjia">添加商品</el-button>
                        <el-button type="primary" @click="shanchuD">删除商品</el-button>
                    </div>
                    <el-button type="primary" @click="wudanShenhe">审核</el-button>
                </div>
                <el-form-item label="供应商" label-width="70px" style="margin:20px 0;">
                    <el-select
                        v-model="supplierIds"
                        style="min-width: 200px"
                        class="filter-item"
                        @change="chaOrder"
                    >
                        <el-option
                            v-for="item in gongyingshang"
                            :key="item.id"
                            :label="item.supplierShort"
                            :value="item.id"
                        />
                    </el-select>
                    
                </el-form-item>
                <el-table
                    :data="wudanList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                    @select-all="handleSelectionChange"
                    @select="handleSelectionChange"
                >
                    <el-table-column type="selection" min-width="70" align="center"></el-table-column>
                    <el-table-column label="序号" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span v-if="wudanList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收货数量" align="center" min-width="120">
                        <template slot-scope="scope">
                            <span v-if="wudanList.length !== scope.$index+1">
                                <el-input @change="shouHuoSum1" v-model="scope.row.receiveGoodsNum" style="width:80px;"/>
                            </span>
                            <span v-else>
                                {{scope.row.receiveGoodsNum}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="生产日期" align="center" min-width="145px">
                        <template slot-scope="scope" v-if="wudanList.length !== scope.$index+1">
                            <el-date-picker
                                v-model="scope.row.productionDate"
                                type="date"
                                placeholder="选择日期"
                                @change="shijian(scope.row,scope)"
                                @blur="shijian(scope.row,scope)"
                                style="width: 80%;"
                                :picker-options="pickerOptions0"
                            ></el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<div class="heji">
		      	<div>合计:</div>
                </div>-->
            </el-form>
        </el-dialog>

        <!--查看采购申请弹框-->
        <el-dialog :visible.sync="Shenqingdd" title="商品采购申请订单" class="shenqingdd_tab" width="900px">
            <el-form label-width="90px" label-position="left">
                <div class="xinxi">
                    <div>
                        <el-form-item label="采购单号 :">{{ goodsPurchaseApplyInfo.orderNumber }}</el-form-item>
                        <el-form-item label="状态 :" label-width="55px">待审批</el-form-item>
                    </div>
                    <div>
                        <el-form-item
                            label="申请人 :"
                            label-width="70px"
                        >{{ goodsPurchaseApplyInfo.createrName }}</el-form-item>
                        <el-form-item label="申请提交时间 :" label-width="120px">
                            <span
                                v-if="goodsPurchaseApplyInfo.createTime"
                            >{{goodsPurchaseApplyInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                            <span v-else></span>
                        </el-form-item>
                    </div>
                    <div></div>
                </div>
                <el-table
                    :data="daishenpi"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <el-table-column label="序号" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>{{scope.$index+0+1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订货数量" align="center" min-width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.orderCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="heji">
                    <div style="font-weight: bold;">合计:</div>
                    <div
                        style="width: 34%;text-align: left;font-weight: bold;"
                    >{{goodsPurchaseApplyInfo.zongjia}}</div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Shenqingdd = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--查看手工建单已完成弹框-->
        <el-dialog :visible.sync="ShougongShenqingdd" title="商品采购订单-手工" class="shenqingdd_tab" width="900px">
            <el-form label-width="80px" label-position="left">
                <div class="xinxi">
                    <div>
                        <el-form-item label="采购单号 :">{{ shougongInfo.orderNumber }}</el-form-item>
                        <el-form-item label="状态 :" label-width="80px">已完成</el-form-item>
                    </div>
                    <div>
                        <el-form-item  
                            label="供应商 :"
                            label-width="80px"
                        >{{ shougongInfo.supplierShortName }}</el-form-item>
                        <el-form-item label="订单类型 :">无单收货</el-form-item>
                    </div>
                  
                    <div>
                        <el-form-item
                            label="营业日："
                        >{{ shougongInfo.businessDay | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                        <el-form-item
                            label="班次："
                        >{{ shougongInfo.shiftId }}</el-form-item>
                    </div>
                      <div>
                        <el-form-item
                                    label="收货时间 :"
                                    label-width="80px"
                                    v-if="shougongInfo.receiveTime"
                          >{{shougongInfo.receiveTime | parseTime('{y}-{m}-{d} ') }}</el-form-item>
                    </div>
                </div>
                <el-table
                    :data="shougongList"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <el-table-column label="序号" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span v-if="shougongList.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" align="center" min-width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.goodsName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收货数量" align="center" min-width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.orderCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>{{scope.row.unit}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column label="生产日期" align="center" min-width="90">
                                <template slot-scope="scope">
                                    <span
                                        v-if="scope.row.status=6"
                                    >{{scope.row.productionDate | parseTime('{y}-{m}-{d}')}}</span>
                                </template>
                    </el-table-column>
                </el-table>
                <!--<div class="heji">
		      	<div style="font-weight: bold;">合计:</div>
		      	<div style="width: 34%;text-align: left;font-weight: bold;">{{shougongInfo.zongjia}}</div>
                </div>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ShougongShenqingdd = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--查看系统订单已完成弹框-->
        <el-dialog :visible.sync="XitongShenqingdd" title="商品采购订单" class="shenqingdd_tab" width="900px">
            <el-form label-width="80px" label-position="left">
                <div class="xinxi" style="border-bottom: 1px solid #e4e4e4;">
                    <div>
                        <el-form-item label="采购单号 :" label-width="100px">{{xitongInfo.orderNumber}}</el-form-item>
                        <el-form-item label="订单类型 :">系统订单</el-form-item>
                    </div>
                </div>
                <ul style="padding: 0;">
                    <li v-for="(item,index) in xitongList" :style="xitongList.length != index+1 ? 'border-bottom: 10px solid #eee; padding-bottom: 40px;margin-bottom: 30px;' : ''">
                        <div class="xinxi">
                            <div>
                                <el-form-item label="供应商 :">{{item[0].supplierShortName}}</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==0"
                                >待审批</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==1"
                                >未收货</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==2"
                                >收货中</el-form-item>
                                <el-form-item
                                    label="状态 :"
                                    label-width="55px"
                                    v-if="item[0].status==3"
                                >已完成</el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="采购子订单号 :"
                                    label-width="110px"
                                >{{item[0].orderNumber}}</el-form-item>
                                <el-form-item
                                    label="收货时间 :"
                                    label-width="80px"
                                    v-if="item[0].receiveTime"
                                >{{item[0].receiveTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="营业日 :"
                                    label-width="110px"
                                >{{ xitongInfo.businessDay | parseTime('{y}-{m}-{d} ') }}</el-form-item>
                                <el-form-item
                                    label="班次 :"
                                    label-width="70px"
                                >{{ xitongInfo.shiftId }}</el-form-item>
                            </div>
                        </div>
                        <el-table
                            :data="item"
                            style="width: 100%;"
                            :header-cell-style="{background:'#f5f7fa'}"
                        >
                            <el-table-column label="序号" align="center" min-width="70">
                                <template slot-scope="scope">
                                    <span v-if="item.length !== scope.$index+1">{{scope.$index+1}}</span>
                            <span v-else>{{scope.row.lastName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="商品名称" align="center" min-width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.goodsName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订货数量" align="center" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.orderCount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="收货数量" align="center" min-width="100">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status!=2">{{ scope.row.orderCount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" align="center" min-width="90">
                                <template slot-scope="scope">
                                    <span>{{scope.row.unit}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="生产日期" align="center" min-width="90">
                                <template slot-scope="scope">
                                    <span
                                        v-if="scope.row.status!=2 && scope.row.productionDate"
                                    >{{scope.row.productionDate | parseTime('{y}-{m}-{d}')}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<div class="heji">
				      	<div style="font-weight: bold;">合计:</div>
				      	<div style="width: 34%;text-align: left;font-weight: bold;">{{goodsPurchaseApplyInfo.zongjia}}</div>
                        </div>-->
                    </li>
                </ul>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="XitongShenqingdd = false">关闭</el-button>
            </div>
        </el-dialog>

        <!--查看系统订单已作废弹框-->
        <el-dialog :visible.sync="zuofeidd" title="商品采购订单" class="shenqingdd_tab" width="900px">
            <el-form label-width="80px" label-position="left">
                <div class="xinxi">
                    <div>
                        <el-form-item label="采购单号 :" label-width="100px">{{zuoFeiInfo.orderNumber}}</el-form-item>
                        <el-form-item label="状态 :" label-width="100px">已作废</el-form-item>
                        <el-form-item label="订单类型 :">系统订单</el-form-item>
                         <el-form-item  label="拒绝原因 :" label-width="100px">{{zuoFeiInfo.merchantRefuseReason}}</el-form-item>
                    </div>
                    <div>
                        <el-form-item label="申请人 :" label-width="100px">{{zuoFeiInfo.createrName}}</el-form-item>
                        <el-form-item
                            label="申请时间 :"
                            label-width="100px"
                        >{{zuoFeiInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                        <el-form-item
                            label="审批人 :"
                            label-width="100px"
                        >{{zuoFeiInfo.merchantAuditorName}}</el-form-item>
                        <el-form-item
                            label="审批时间 :"
                            label-width="100px"
                        >{{zuoFeiInfo.merchantAuditTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
                    </div>
                </div>
                <ul style="padding: 0;margin: 0;">
                    <li v-for="(item,index) in zuoFeiList" :style="zuoFeiList.length != index+1 ? 'border-bottom: 10px solid #eee; padding-bottom: 40px;margin-bottom: 30px;' : ''">
                        <el-table
                            :data="item"
                            style="width: 100%;"
                            :header-cell-style="{background:'#f5f7fa'}"
                        >
                            <el-table-column label="序号" align="center" min-width="70">
                                <template slot-scope="scope">
                                    <span v-if="item.length !== scope.$index+1">{{scope.$index+1}}</span>
                                    <span v-else>{{scope.row.lastName}}</span>
                                  </template>
                            </el-table-column>
                            <el-table-column label="商品名称" align="center" min-width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.goodsName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订货数量" align="center" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.orderCount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" align="center" min-width="90">
                                <template slot-scope="scope">
                                    <span>{{scope.row.unit}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<div class="heji">
				      	<div style="font-weight: bold;">合计:</div>
				      	<div style="width: 34%;text-align: left;font-weight: bold;">{{goodsPurchaseApplyInfo.zongjia}}</div>
                        </div>-->
                    </li>
                </ul>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="zuofeidd = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    orderCaigou,
    orderList,
    orderLei,
    orderShen,
    orderShenList,
    orderShenCan,
    orderShenShen,
    orderWudan,
    SupplierList
} from "@/api/shangpin";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";
import addOrder from "./addOrder/add";
export default {
    components: { Pagination, addOrder },
    data() {
        return {
            value6: "",
            tableKey: 0,
            listLoading: true,
            form: {
                name: ""
            },
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                orderNumber: "",
                orderType: "",
                statusList: [],
            },
            list: null,
            dingdanList: null,
            pages: 1,
            total: 0,
            //采购申请时选完以后到上一页需要渲染的
            caigoudeList: [],
            //记忆商品申请添加时每个分页的选中数据
            selectData: [],
            goodsid:'',
            //商品大类
            typeOptions: [],
            //供应商数组
            gongyingshang: [],  //供应商列表
            supplierIds: "",  //供应商的id
            //单据类型数组
            danjuleixing: [
                {
                    id: 1,
                    name: "系统订单"
                },
                {
                    id: 2,
                    name: "手工建单"
                }
            ],
            //状态数组
            zhuangtai: [
                {
                    id: ["0"],
                    name: "待审批"
                },
                {
                    id: ["1", "2", "3"],
                    name: "处理中"
                },
                {
                    id: ["5"],
                    name: "待收货"
                },
                {
                    id: ["6"],
                    name: "已完成"
                },
                {
                    id: ["-1", "-2", "-3"],
                    name: "已作废"
                }
            ],

            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                }
            },

            //查看待审批的信息
            daishenpi: [],

            //待审核的订单信息
            goodsPurchaseApplyInfo: "",
            importanceOptions: ["1", "2", "3"],
            Shenqing: false,
            Shenqingdd: false,
            wudanshouhuo: false,
            shangpintj: false,
            wudanShou: false,
            wudanList: [],   
            daitijiao: [],
            //手工建单完成弹框
            ShougongShenqingdd: false,
            shougongList: [],
            shougongInfo: {},
            //系统订单完成弹框
            XitongShenqingdd: false,
            xitongList: [],
            xitongInfo: {},
            //已作废的弹框
            zuofeidd: false,
            zuoFeiList: [],
            zuoFeiInfo: {},
            ifsupplierId:false,
	        ifOrder:false,
            nono:false,
            disable:false,
            returnedCountSumNumber:0
        };
    },
    created() {
        this.getList();
        this.gongying()
    },
    methods: {
        sortChange(data) {},
        shouHuoSum1(){
            let sum = 0;
            this.wudanList.forEach((item1,index)=>{
                if(item1.lastName){
                    this.wudanList.splice(index,1)
                }else{
                    if(Number(item1.receiveGoodsNum) > 0){
                        sum += Number(item1.receiveGoodsNum);
                    }
                }
                
            })
            this.wudanList.push({
                lastName:'合计',
                receiveGoodsNum:sum,
            })
        },
         getList() {
            if (
                this.listQuery.statusList == [] ||
                this.listQuery.statusList == ""
            ) {
                delete this.listQuery.statusList;
            }
            console.log(this.listQuery);
            orderShenList(this.listQuery).then(response => {
                console.log(response);
                this.dingdanList = response.data.rows;
                this.total = response.data.total;
                for (var i = 0; i < this.dingdanList.length; i++) {
                    this.dingdanList[i].createTime = dateH(
                        this.dingdanList[i].createTime
                    );
                }
            });
	     
	    },
        // getList() {
        //     if (
        //         this.listQuery.statusList == [] ||
        //         this.listQuery.statusList == ""
        //     ) {
        //         delete this.listQuery.statusList;
        //     }
        //     console.log(this.listQuery);
        //     orderShenList(this.listQuery).then(response => {
        //         console.log(response);
        //         this.dingdanList = response.data.rows;
        //         this.total = response.data.total;
        //         for (var i = 0; i < this.dingdanList.length; i++) {
        //             this.dingdanList[i].createTime = dateH(
        //                 this.dingdanList[i].createTime
        //             );
        //         }
        //         		      	console.log(this.dingdanList)
        //     });
        //     //供应商列表
        //     let data = {
        //         supplierType: 2,
        //         supplierId:this.id
        //     };

        //     SupplierList(data).then(res => {
        //         console.log(res);
        //         this.gongyingshang = [];
        //         res.data.forEach(item => {
        //             this.id=item.id;
        //             let data = {
        //                 id: item.id,
        //                 name: item.supplierName
        //             };
        //             this.gongyingshang.push(data);
        //         });
        //         console.log(this.gongyingshang);
        //     });

            
        // },
        gongying(){   //供应商列表
	    	let data={
                supplierType:2,
	    	}
	    	SupplierList(data).then(res=>{
                console.log(res)
                res.data.forEach(item => {
                    console.log(res.data)
                    this.gongyingshang=res.data
                });
                console.log(this.gongyingshang)
            })
            
	    },
         chaOrder(val){  //供应商列表发生改变的时候
            this.supplierIds=val;
            console.log(this.supplierIds)
	    	this.nono=true;
	    	this.wudanList=[];
            this.shouHuoSum1()
	    	if(!this.ifsupplierId){
	    		this.ifsupplierId=true;
	    	}else{
	    		this.ifsupplierId=false;
	    	}
				
	    },
        //商品申请后撤销
        orderShencans(idid) {
            console.log(idid);
            this.$confirm("此操作将撤回此订单, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        id: idid
                    };
                    orderShenCan(data).then(() => {
                        this.$notify({
                            title: "执行成功",
                            type: "success",
                            duration: 1000
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$notify.info({
                        title: "取消",
                        duration: 1000
                    });
                });
        },
        caigouTk() {
            this.Shenqing = true;
        },
        //查看采购后待审批信息
        ddTk(idid) {
            let data = {
                id: idid
            };
            orderShenShen(data)
                .then(res => {
                    console.log(res);
                    let data1 = res.data.goodsList;
                        this.goodsPurchaseApplyInfo = res.data.goodsPurchaseApplyInfo;
                        this.goodsPurchaseApplyInfo["zongjia"] = 0;
                        this.goodsPurchaseApplyInfo.createTime = dateH(
                        this.goodsPurchaseApplyInfo.createTime
                    );
                    this.daishenpi = [];
                    data1.forEach(item => {
                        item.forEach(items => {
                            items.createTime = dateH(items.createTime);
                            this.daishenpi.push(items);
                            this.goodsPurchaseApplyInfo["zongjia"] +=
                            items.orderCount + 0;
                        });
                    });
                    console.log(this.goodsPurchaseApplyInfo);

                    this.Shenqingdd = true;
                })
                .catch(res => {
                    this.$notify.error({
                        title: "错误,请重试",
                        duration: 1000
                    });
                });
        },
        wudan() {
            this.wudanshouhuo = true;
            console.log(this.gongyingshang)
        },
        //申请按钮了
        shenqingQL() {
            if (this.caigoudeList.length > 0) {
                let arr = [];
                let flag = true;
                this.caigoudeList.forEach(item => {
                    this.goodsId=item.id
                    if (item.returnedCount) {
                        let data = {
                            goodsId: item.id,
                            orderCount: item.returnedCount
                        };
                        arr.push(data);
                    } else {
                        flag = -2;
                    }
                });

                let v = /^([1-9][0-9]*){1,3}$/;
                arr.forEach(item => {
                    if (!v.test(item.orderCount)) {
                        flag = -1;
                    }
                });
                if (flag == -1) {
                    this.$notify.error({
                        title: "错误",
                        message: "订货数量应大于零"
                    });
                } else if (flag == -2) {
                    this.$notify.error({
                        title: "错误",
                        message: "请填写所有商品订货数量"
                    });
                } else {
                    let datas = {
                        goodsList: arr
                    };
                    console.log(datas);
                    orderShen(datas)
                        .then((res) => {
                            //采购申请时选完以后到上一页需要渲染的
                            this.caigoudeList = [];
                            //记忆商品申请添加时每个分页的选中数据
                            this.selectData = [];
                            //关闭提交页
                            this.Shenqing = false;
                            //重新获取列表
                            this.getList();
                                if(res){
                                    this.disable==true
                                }
                        })
                        .catch(res => {
                            this.$alert("请填写所有商品订货数量", "提示", {
                                confirmButtonText: "确定"
                            });
                        });
                }
            } else {
                this.$alert("请添加商品", "提示", {
                    confirmButtonText: "确定"
                });
            }
        },
        shenqingtianjia() {
            this.shangpintj = true;
        },
        ShenqingDel(idid, pid, iid, index, rows) {
            rows.splice(index, 1); //删掉该行
            this.returnedCountSum()
            this.selectData[pid].forEach((item, index) => {
                if (item == iid) {
                    this.selectData[pid].splice(index, 1);
                }
            });
        },
        //跳转到收货页面
        tiaozhuan(idid) {
            this.$router.push({
                path: "commodity-purchase-givecommodity-purchase-give",
                name: "compurchasegiveDemo",
                query: {
                    id: idid
                }
            });
        },
        //添加商品组件传过来的值
        getData(val) {
            console.log(val)
            this.caigoudeList = val;
            this.caigoudeList.forEach(item => {
                // item["returnedCount"] = "";
                item["reason"] = "";
                delete item["lastBuyDate"];
                delete item["indate"];
            });

            this.shangpintj = false;
            console.log(this.caigoudeList);
            this.returnedCountSum()
        },
        //添加商品组件传完值之后关闭弹框
        guaT(val) {
            this.shangpintj = false;
        },
        returnedCountSum(){
            this.returnedCountSumNumber = 0;
            this.caigoudeList.forEach((item,index)=>{
                if(item.lastName){
                    this.caigoudeList.splice(index,1)
                }else{
                    if(Number(item.returnedCount) > 0){
                        this.returnedCountSumNumber += Number(item.returnedCount);
                    }
                }
            })
            this.caigoudeList.push({
                lastName:'合计',
                returnedCount:this.returnedCountSumNumber
            })
        },
        
        //----------------无单收货
        wudanTianjia() {
			console.log(this.supplierIds)
            if(!this.nono){
                this.$notify({
                        title: '警告',
                        message: '请选择供应商',
                        type: 'warning',
                        duration: 1000
            });
            }else{
                this.wudanShou=true
                if(!this.ifOrder){
                    this.ifOrder=true;
                }else{
                    this.$refs.sup.gaiOrder();
                }
                
            }
        },
        wudanListData(val) {   //添加无单商品组件传过来的值
        console.log(val)
           this.wudanList = val;
            this.wudanList.forEach(item => {
                // item["receiveGoodsNum"] = "";
                item["productionDate"] = "";
                item["goodsId"] = item.goodsId;
                delete item["createTime"];
                // item["returnedCount"]='';
                // item["reason"]='';
                // delete item["lastBuyDate"];
                // delete item["indate"];
            });
            this.shouHuoSum1()
            
            this.wudanShou = false;
            console.log(this.wudanList)
        },
	    //无单传完值之后关闭弹框
        wudanT(val) {  
            console.log(val);
            this.wudanShou = false;
        },
        //添加后删除商品
        shanchuD() {
            if (this.daitijiao.length > 0) {
                this.wudanList.forEach((item, index) => {
                    this.daitijiao.forEach((is, i) => {
                        if (item.id == is.id) {
                            this.wudanList.splice(index, 1);
                        }
                    });
                });
                let leg = this.wudanList.length;
                for (let i = leg - 1; i >= 0; i--) {
                    for (let j = 0; j < this.daitijiao.length; j++) {
                        if (this.wudanList[i]) {
                            if (this.wudanList[i].id == this.daitijiao[j].id) {
                                //				                rightData.push(leftData[i])
                                this.wudanList.splice(i, 1);
                                continue; //结束当前本轮循环，开始新的一轮循环
                            }
                        }
                    }
                }
            } else {
            }
            this.returnedCountSum()
            this.shouHuoSum1();
        },
        //选择框事件
        handleSelectionChange(selection, row) {
            this.daitijiao = selection;
            console.log(selection);
            console.log(row);
        },
        //最后提交审核
        wudanShenhe() {

            let wList = [...this.wudanList]
            wList.splice(wList.length - 1,1)

            if (wList.length <= 0) {
                this.$notify({
                    title: "警告",
                    message: "请选择收货商品",
                    type: "warning"
                });
            } else if (this.gongyingshang == "") {
                this.$notify({
                    title: "警告",
                    message: "请选择供应商",
                    type: "warning"
                });
            } else {
                wList.forEach(item => {
                    console.log(item)
                    item["supplierId"] = this.supplierIds;
                    item["goodsId"] = item.goodsId;
                    item['createTime']=''
                });
                console.log(wList);
                let arr = [];
                if (this.daitijiao.length > 0) {
                    wList.forEach(item => {
                        this.daitijiao.forEach(is => {
                            if (item.id == is.id) {
                                arr.push(item);
                            }
                        });
                    });
                } else {
                    arr = wList;
                }
                console.log(arr);

                let v = /^([1-9][0-9]*){1,3}$/;

                let flage = 1;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].supplierID == "") {
                        console.log("123131321231231231");
                        flage = -1;
                        break;
                    } else if (!arr[i].receiveGoodsNum) {
                        flage = -2;
                        break;
                    } else if (!arr[i].productionDate) {
                        flage = -3;
                        break;
                    } else if (!v.test(arr[i].receiveGoodsNum)) {
                        flage = -4;
                    } else {
                        flage = 1;
                    }
                }
                if (flage == -1) {
                    this.$notify({
                        title: "警告",
                        message: "请选择供应商",
                        type: "warning"
                    });
                } else if (flage == -2) {
                    this.$notify({
                        title: "警告",
                        message: "请检查商品收货数量已填",
                        type: "warning"
                    });
                } else if (flage == -3) {
                    this.$notify({
                        title: "警告",
                        message: "请检查商品生产日期已填",
                        type: "warning"
                    });
                } else if (flage == -4) {
                    this.$notify.error({
                        title: "错误",
                        message: "收货数量应大于零"
                    });
                }
                if (flage == 1) {
                    let data = {
                        receiveGoodsList:wList
                    };
                    console.log(data);

                    orderWudan(data).then(res => {
                        this.$notify({
                            title: "成功",
                            message: "收货成功",
                            type: "success"
                        });
                        this.wudanshouhuo = false;
                        this.getList();
                        this.gongying()
                    });
                }
            }
        },
        shijian(row, rows) {
            console.log(row, rows);
            this.$set(this.wudanList, rows.$index, this.wudanList[rows.$index]);
            /*this.wudanList.forEach((item)=>{
	    		item.productionDate=dateH(item.productionDate)
	    	})*/
        },

        shouGongWan(idid) {   //手工查看
            let data = {
                id: idid
            };
            orderShenShen(data)    //商品采购申请后待审批查看信息
                .then(res => {
                    console.log(res);
                    let shougongList = res.data.goodsList;
                    this.shougongInfo = res.data.goodsPurchaseApplyInfo;
                    this.shougongInfo["supplierShortName"] =
                        res.data.goodsList[0][0].supplierShortName;
                    this.shougongInfo["auditTime"] =
                        res.data.goodsList[0][0].auditTime;
                    this.shougongInfo["auditorName"] =
                        res.data.goodsList[0][0].auditorName;
                    this.shougongInfo['receiveTime']=res.data.goodsList[0][0].receiveTime;

                    this.shougongInfo["zongjia"] = 0;
                    let daishenpi = [];
                    shougongList.forEach(item => {
                        item.forEach(items => {
                            daishenpi.push(items);
                            this.shougongInfo["zongjia"] +=
                                items.orderCount + 0;
                        });
                    });
                    this.shougongList = daishenpi;

                    this.ShougongShenqingdd = true;
                    let sum = 0;
                    this.shougongList.forEach((item)=>{
                        sum += Number(item.orderCount);
                    })
                    this.shougongList.push({
                        lastName:'合计',
                        orderCount:sum
                    })

                })
                .catch(res => {
                    this.$notify.error({
                        title: "错误,请重试",
                        duration: 1000
                    });
                });
        },

        xiTongWan(idid) {  //系统查看
            let data = {
                id: idid
            };
            orderShenShen(data)
                .then(res => {
                    console.log(res);
                    this.xitongList = res.data.goodsList;
                    this.shouHuoSum()
                    this.xitongInfo = res.data.goodsPurchaseApplyInfo;
                    this.XitongShenqingdd = true;
                })
                .catch(res => {
                    this.$notify.error({
                        title: "错误,请重试",
                        duration: 1000
                    });
                });
        },
        shouHuoSum(){
            this.xitongList.forEach((item)=>{
                let sum = 0;
                let sum1 = 0;

                item.forEach((item1,index)=>{
                    if(item1.lastName){
                        item.splice(index,1)
                    }else{
                        sum += Number(item1.orderCount);
                        sum1 += Number(item1.receiveGoodsNum);
                    }
                    
                })
                item.push({
                    lastName:'合计',
                    orderCount:sum,
                    receiveGoodsNum:sum1,
                })
            })
        },
        zuoFeiWan(idid) {     //作废单
            let data = {
                id: idid
            };
            orderShenShen(data)
                .then(res => {
                    console.log(res);
                    this.zuoFeiList = res.data.goodsList;

                    this.zuoFeiList.forEach((item)=>{
                        let sum = 0;
                        item.forEach((item1)=>{
                            sum += Number(item1.orderCount);
                        })
                        item.push({
                            lastName:'合计',
                            orderCount:sum
                        })
                    })

                    this.zuoFeiInfo = res.data.goodsPurchaseApplyInfo;
                    this.zuofeidd = true;
                })
                .catch(res => {
                    this.$notify.error({
                        title: "错误,请重试",
                        duration: 1000
                    });
                });
        },
        reset() {
            this.wudanList = [];
            this.caigoudeList = [];
        }
    }
};
</script>

<style scoped>
@import url("./purchase.scss");
#tui_btn #tui_btn1{
    height: 30px !important;
}
</style>
