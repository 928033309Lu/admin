<template>
    <div class="warp commodity">
        <div class="header">
            <el-form label-width="100px" style="display: flex;">
                <h3>
                    <span></span>商品管理
                </h3>
                <div style="width: 300px;">
                    
                        <el-input
                            v-model="listQuery.searchKey"
                            placeholder="请输入商品名或商品条码"
                            style="min-width: 100px;"
                            @input="getList()"
                        ></el-input>
                        <el-form-item
                        label="查询"
                        label-width="70px"
                        style="margin-bottom: 0;margin-top: 12px;"
                    >
                    </el-form-item>
                </div>
                <div class="btn" style="float: right;margin-left: auto;">
                    <el-button type="primary" @click="jinjiaweihu">商品进价维护</el-button>
                    <a href="#/dispatch/dispatch-commodityaudit">
                        <el-button type="primary">商品审核</el-button>
                    </a>
                    <!-- <a href="#/dispatch/dispatch-commodityadd">
                        <el-button type="primary">商品添加</el-button>
                    </a>-->
                </div>
            </el-form>
        </div>
        <div class="main">
            <span class="el-icon-plus" @click="addGoods"></span>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column align="center" label="商品大类">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsTypeName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" align="center" min-width="105">
                    <template slot-scope="scope">
                        <span>{{ scope.row.goodsName }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="单位">
                    <template slot-scope="scope">
                        <span>{{ scope.row.unit }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="品牌">
                    <template slot-scope="scope">
                        <span>{{ scope.row.brand }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="规格">
                    <template slot-scope="scope">
                        <span>{{ scope.row.specAmount }} {{scope.row.specUnit}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="保质期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.expirationDay }}</span>天
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="240">
                    <template slot-scope="scope">
                        <el-button @click="see(scope.row.id)" type="primary" size="small">查看</el-button>
                        <el-button
                            @click="deleteGoodsByID(scope.$index,scope.row)"
                            type="primary"
                            size="small"
                        >删除</el-button>
                        <el-button type="danger" size="small" @click="xiugaiUp(scope.row.id)">修改</el-button>
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

            <!-- 商品管理查看框 -->
            <el-dialog :visible.sync="managementVisible" title="商品信息" class="chakanT">
                <div class="see">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="box">
                                    <div class="left">
                                        <span>商品大类：</span>
                                    </div>
                                    <div class="right">
                                        <span
                                            v-for="item in typeOptions"
                                            v-if="seeData.typeId==item.id"
                                        >{{item.goodsType}}</span>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>商品名称：</span>
                                    </div>
                                    <div class="right">
                                        <span>{{seeData.goodsName}}</span>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>品牌：</span>
                                    </div>
                                    <div class="right">
                                        <span>{{seeData.brand}}</span>
                                    </div>
                                </div>

                                <div class="box">
                                    <div class="left">
                                        <span>供应商价格</span>
                                    </div>
                                    <div class="right"></div>
                                </div>
                                <div class="box">
                                    <div class="jia">
                                        <p
                                            v-for="(item, index) in seeData.gongyingPrice"
                                            :key="index"
                                        >{{item.supplierName}}: {{item.price}} 元</p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="box">
                                    <div class="left">
                                        <span>单位：</span>
                                    </div>
                                    <div class="right">
                                        <span>{{seeData.unit}}</span>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>保质期：</span>
                                    </div>
                                    <div class="right">
                                        <span>{{seeData.expirationDay}} 天</span>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>规格：</span>
                                    </div>
                                    <div class="right">
                                        <span>{{seeData.specAmount}}{{seeData.specUnit}}</span>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="left">
                                        <span>商品条码</span>
                                    </div>
                                    <div class="right"></div>
                                </div>
                                <div class="box">
                                    <div class="jia">
                                        <p
                                            v-for="(item, index) in seeData.tiaoma"
                                            :key="index"
                                        >{{item.barCode}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="managementVisible = false">取消</el-button>
                    <el-button type="primary" @click="managementVisible = false">确认</el-button>
                </div>
            </el-dialog>

            <!-- 商品进价维护 -->
            <el-dialog
                :visible.sync="maintainVisible"
                width="50%"
                title="供应商进价维护"
                @open="qingCaigoudeList"
            >
                <div class="maintain">
                    <div class="top">
                        <div class="shang">
                            <span>供应商</span>
                            <el-select
                                v-model="supplier"
                                placeholder="请选择"
                                style="width: 200px;"
                                @change="huoquOrder"
                                clearable
                            >
                                <el-option
                                    v-for="item in supplierOptions"
                                    :key="item.id"
                                    :label="item.supplierShort"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="btn" style="display:flex;">                            
					            <upload-excel-component style="margin:0 10px 0 0;"  :daoru='this.supplier' :on-success="handleSuccess" @click="beforeUpload"/>
                            <el-button type="primary" @click="xiazai" >下载模板</el-button>
                        </div>
                    </div>
                    <div class="table">
                        <el-table
                            ref="multipleTable"
                            :data="caigoudeList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >

                            <el-table-column label="商品大类" align="center">
                                <template slot-scope="scope">
                                    <span
                                        v-for="item in typeOptions"
                                        v-if="item.id==scope.row.typeId"
                                    >{{item.goodsType}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="commodityName"
                                label="商品名称"
                                show-overflow-tooltip
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.name">{{scope.row.name}}</span>
                                    <span v-else-if="scope.row.goodsName">{{scope.row.goodsName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="company" label="单位" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.unit}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="brand" label="品牌" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.brand}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specifications" label="规格" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.specAmount}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="保质期" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.expirationDay}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="进价" align="center">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.edit">
                                        <el-input
                                            v-model="scope.row.price"
                                            class="edit-input"
                                            size="small"
                                        />
                                    </template>
                                    <span v-else>{{ scope.row.price }}元</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" min-width="150">
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.edit"
                                        type="success"
                                        size="small"
                                        icon="el-icon-circle-check-outline"
                                        @click="confirmEdit(scope.row,scope)"
                                    >Ok</el-button>
                                    <el-button
                                        v-else
                                        type="primary"
                                        size="small"
                                        @click="huanOK($event,scope)"
                                    >修改</el-button>
                                    <el-button
                                        @click="maintainDel(scope.$index, scope.row)"
                                        type="danger"
                                        size="small"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column align="right" width="80" :render-header="renderHeader">
                                <template slot="header" slot-scope="scope"></template>
                            </el-table-column>
                        </el-table>
						<pagination
						    v-show="suppliOrderQueryTotal>0"
						    :total="suppliOrderQueryTotal"
						    :page.sync="suppliOrderQuery.pageNum"
						    :limit.sync="suppliOrderQuery.pageSize"
						    @pagination="huoquOrder"
						/>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="maintainVisible = false">取消</el-button>
                    <el-button type="primary" @click="gaijiage">保存</el-button>
                </div>
            </el-dialog>

            <!--商品申请添加弹框-->
            <el-dialog :visible.sync="shangpintj" title="商品申请添加" class="shenqingtj_tab">
                <add-order
                    @shangpinData="getData"
                    @shangpinT="guaT"
                    :message="caigoudeList"
                    style="width:100%"
                    ref="add1"
                />
            </el-dialog>

            <!--商品修改信息-->
            <el-dialog :visible.sync="xinxiUp" title="商品信息" class="xinxi_tab" @open="quKong">
                <el-form label-width="80px">
                    <el-form-item label="商品大类">
                        <el-select
                            v-model="upData.typeId"
                            clearable
                            style="width: 200px"
                            class="filter-item"
                        >
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.goodsType"
                                :label="item.goodsType"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="upData.goodsName" style="width: 200px"/>
                    </el-form-item>
                    <el-form-item label="品牌">
                        <el-input v-model="upData.brand" style="width: 200px"/>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-select v-model="upData.unit" clearable style="width: 200px" class="filter-item">
                            <el-option
                                v-for="item in companyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格">
                        <el-input v-model="upData.specAmount" type="number" style="width: 85px"/>
                        <el-select
                            clearable
                            v-model="upData.specUnit"
                            style="width: 110px"
                            class="filter-item"
                        >
                            <el-option
                                v-for="item in am"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="保质期">
                        <el-input v-model="upData.expirationDay" type="number" style="width: 85px"/>
                        <el-input style="width: 110px" placeholder="天" :disabled="true"/>
                    </el-form-item>
                    <el-form-item label="商品条码">
                        <div style="min-width: 40%;float: left;">
                            <span
                                v-for="item in tiaomaa"
                                style="width: 100%;display: flex;margin-bottom: 10px;"
                            >
                                <el-input
                                    v-model="item.barCode"
                                    placeholder="请输入内容"
                                    style="width: 200px;"
                                ></el-input>
                                <i
                                    class="el-icon-circle-close"
                                    style="line-height: 36px;margin: 0 10px;cursor: pointer;color: #ed1941;"
                                    @click="shanBock(item)"
                                ></i>
                            </span>
                            
                            <span v-if="disBock" style="width: 100%;display: flex;">
                                <el-input
                                    v-model="disBock_input"
                                    placeholder="请输入内容"
                                    style="width: 200px;"
                                    @input="shuruBock"
                                ></el-input>
                            </span>
                            
                            <i
                                class="el-icon-circle-plus"
                                style="color: #409EFF;cursor: pointer;"
                                @click="zengBock"
                            ></i>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="xinxiUp = false">关闭</el-button>
                    <el-button type="primary" @click="xiugaixinxi">保存</el-button>
                </div>
            </el-dialog>
        </div>
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
    orderUp,
    SupplierList,
    orderTMList,
    jituanSPBock,
    suppliOrder,
    orderListNo,
    deleteGoodsByID
} from "@/api/shangpin";
import { orderSee, orderJJList } from "@/api/diaodu";

import { supplierJinjia,supplierOrderDelete } from "@/api/gongyingshang";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";
import addOrder from "@/views/dispatch/addOrderZong/add";
import UploadExcelComponent from '@/views/dispatch/UploadExcel/index.vue'
export default {
    components: {
        Pagination,
        addOrder,
        UploadExcelComponent
    },
    name: "dispatchcommodityDemo",
    data() {
        return {
            xinxiUp: false,
            shangpinDeList: [],
            upData: {},
            disBock_input: "",
            disBock: false,
            //商品管理列表临时数据
            tableData: [],
            //单位
            companyOptions: [
                {
                    value: "包",
                    label: "包"
                },
                {
                    value: "杯",
                    label: "杯"
                },
                {
                    value: "袋",
                    label: "袋"
                },
                {
                    value: "付",
                    label: "付"
                },
                {
                    value: "副",
                    label: "副"
                },
                {
                    value: "个",
                    label: "个"
                },
                {
                    value: "罐",
                    label: "罐"
                },
                {
                    value: "盒",
                    label: "盒"
                },
                {
                    value: "具",
                    label: "具"
                },
                {
                    value: "块",
                    label: "块"
                },
                {
                    value: "瓶",
                    label: "瓶"
                },
                {
                    value: "提",
                    label: "提"
                },
                {
                    value: "条",
                    label: "条"
                },
                {
                    value: "桶",
                    label: "桶"
                },
                {
                    value: "箱",
                    label: "箱"
                },
                {
                    value: "油",
                    label: "油"
                },
                {
                    value: "支",
                    label: "支"
                },
                {
                    value: "组",
                    label: "组"
                }
            ],

            am: [
                {
                    value: "毫升(ML)",
                    label: "毫升(ML)"
                },
                {
                    value: "升(L)",
                    label: "升(L)"
                },
                {
                    value: "千克(KG)",
                    label: "千克(KG)"
                },
                {
                    value: "克(G)",
                    label: "克(G)"
                },
                {
                    value: "厘米(CM)",
                    label: "厘米(CM)"
                },
                {
                    value: "毫米(MM)",
                    label: "毫米(MM)"
                }
            ],
            //供应商
            supplierOptions: [],
            //页数条数
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                searchKey: ""
            },
            total: 0,
            managementVisible: false, //控制商品管理编辑弹出框显示与隐藏
            addVisible: false, //控制商品添加框显示与隐藏
            maintainVisible: false, //控制商品进价维护弹出框的显示与隐藏
            maintainAddVisible: false, //控制商品进价维护弹出框的显示与隐藏
            seeData: "", //查看商品数据
            addData: "", //商品添加数据暂存
            maintainAddData: "", //商品进价维护添加数据暂存
            commodityNumber: ["6549841657498", "5645414685746", "254654165498"], //商品条码
            supplier: "", //供应商
            //进价维护表格临时数据
            maintainData: [
                {
                    commodityName: "哇哈哈150ml", //商品名称
                    commodityType: "包装饮料", //商品大类
                    purchasePrice: "2.00", //进价
                    company: "瓶", //单位
                    brand: "哇哈哈", //品牌
                    specifications: "150ml", //规格
                    qualityGuaranteePeriod: "90", //保质期
                    stock: "1000", //库存
                    commodityNumber: "" //商品条码
                },
                {
                    commodityName: "哇哈哈150ml", //商品名称
                    commodityType: "包装饮料", //商品大类
                    purchasePrice: "2.00", //进价
                    company: "瓶", //单位
                    brand: "哇哈哈", //品牌
                    specifications: "150ml", //规格
                    qualityGuaranteePeriod: "90", //保质期
                    stock: "1000", //库存
                    commodityNumber: "" //商品条码
                }
            ],
            tableHeader:[],
            multipleSelection: [],
            //申请添加选择的那个弹框用的
            shangpintj: false,
            splistQuery: {
                pageNum: 1,
                pageSize: 10,
                typeId: "",
                goodsName: ""
            },
            list1: null,
            total1: 0,
            //采购添加商品后右边已选
            yixuanList: [],
            //采购申请时选完以后到上一页需要渲染的
            caigoudeList: [],
            //记忆商品申请添加时每个分页的选中数据
            selectData: [],
            jsonObj: {},
            //商品大类
            typeOptions: [],
            //供应商数组
            gongyingshang: [],

            tiaomaa: [],
			//供应商维护商品查询
			suppliOrderQueryTotal: 0,
			suppliOrderQuery: {
				pageNum: 1,
				pageSize: 10,
				supplierId: ""
			}
        };
    },
    created() {
        this.getList();
        this.orderlei();
    },
    methods: {
        getList() {
            orderListNo(this.listQuery).then(res => {
                console.log(res);
                this.tableData = res.data.rows;
                this.total = res.data.total;
            });
        },

        add() {
            if (!this.supplier) {
                this.$notify.error({
                    title: "错误",
                    message: "请选择供应商",
                    duration: 1000
                });
            } else {
                this.shangpintj = true;
                this.maintainAddData = {
                    commodityName: "", //商品名称
                    commodityType: "", //商品大类
                    company: "", //单位
                    brand: "", //品牌
                    commodityValue: "", //零售价
                    specifications: "", //规格
                    qualityGuaranteePeriod: "", //保质期
                    stock: "", //库存
                    commodityNumber: "" //商品条码
                };
            }
        },

        addCommodity() {
            this.tableData.push(this.addData);
            this.addVisible = false;
            
        },
           beforeUpload(file) {
                 const isLt1M = file.size / 1024 / 1024 < 1
			      if (isLt1M) {
			        return true
                  }
			      this.$message({
			        message: '请传入1M以内的Excel表',
			        type: 'warning'
			      })
			      return false
			    
            },
            handleSelectionChange(val) {
				this.multipleSelection = val;
            },
            handleAvatarSuccess(res, file) {
				this.editData.commodityImag = URL.createObjectURL(file.raw);
			},
             handleSuccess({ results, header }) {
            console.log(111)
                    this.caigoudeList = results
                    this.tableHeader = header
                    //改变读取模板后的对象键名
                    this.caigoudeList = JSON.parse(JSON.stringify( this.caigoudeList).replace(/保质期/g,"expirationDay").replace(/单位/g,"unit").replace(/品牌/g,"brand").replace(/商品名称/g,"goodsName").replace(/商品大类/g,"typeId").replace(/规格/g,"specAmount").replace(/进价/g,"price"));
                    this.caigoudeList.forEach((item)=>{
                                console.dir(item)
                        this.typeOptions.forEach((v)=>{
                            if(item.typeId==v.goodsType){
                                item.typeId=v.id;
                            }
                        })
                    })
		      
		      /*let data = {
				goodsList: this.tableData
			  }*/
		      
		      console.log(this.tableData);
		      
            },
        xiazai(){  // 下载模板
			this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {

                    const tHeader =  ['商品大类', '商品名称' ,'单位', '品牌', '规格', '保质期', '进价']
                    const filterVal = ['商品大类', '商品名称', '单位', '品牌', '规格', '保质期', '进价']
                    excel.export_json_to_excel({
                    header: tHeader,
                    data:'',
                    filename: '供应商进价维护添加模板',
                    autoWidth: this.autoWidth,
                    bookType: this.bookType
                    })
			})
        },
        formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
  
	   },
        del(index, row) {
            console.log(index);
            this.tableData.splice(index, 1);
        },
        //商品进价维护商品删除
        maintainDel(index, row) {
            this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.caigoudeList.splice(index, 1);
                    let data = {
                        id: row.id
                    };
                    console.log(data);
                        supplierOrderDelete(data).then(res => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        deleteGoodsByID(index, row) {
            this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        goodsID: row.id
                    };
					deleteGoodsByID(data).then(res => {
					    this.$notify({
					        title: "成功",
					        message: "删除成功",
					        type: "success",
					        duration: 1000
					    });
					    this.getList();
					});
                    console.log(data);
                    if (!row.price) {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    } else {
                        supplierOrderDelete(data).then(res => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //查看
        see(idid) {
            let data = {
                id: idid
            };

            let data2 = {
                goodsId: idid,
                supplierType: 2,		// 供应商类型(1代表油品，2代表商品)
				supplierBelongTypeid: 1		// 供应商所属权限((1:集团;2:商户))
            };

            orderSee(data).then(res => {
                console.log(res);
                this.seeData = res.data;
                orderJJList(data2).then(res => {
                    console.log(res);
                    this.seeData["gongyingPrice"] = res.data;

                    orderTMList(data).then(res => {
                        console.log(res.data);
                        this.seeData["tiaoma"] = res.data;
                        this.managementVisible = true;
                    });
                });
            });
        },
        addGoods(){
            this.$router.push({
                name:'dispatchcommodityaddDemo'
            })
        },
        //修改
        xiugaiUp(idid) {
            let data = {
                id: idid
            };
            orderSee(data).then(res => {
                console.log(res);
                this.upData = res.data;
                orderTMList(data).then(res => {
                    console.log(res.data);
                    this.tiaomaa = res.data;
                    this.xinxiUp = true;
                });
            });
        },

        zengBock() {
            this.disBock = true;
        },
        zengjiaBock() {
            this.$confirm("是否添加此条码", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let arr = [];
                    this.tiaomaa.forEach(item => {
                        arr.push(item.barCode);
                    });

                    let str = this.disBock_input.replace(/\s+/g, "");
                    if (str != "") {
                        arr.push(str);
                    }

                    let data = {
                        goodsId: this.upData.id,
                        barCodeList: arr
                    };
                    console.log(data);
                    jituanSPBock(data).then(res => {
                        this.$notify({
                            title: "成功",
                            type: "success"
                        });

                        let data2 = {
                            goodsId: this.upData.id
                        };

                        this.xinxiUp = false;
                        this.xiugaiUp(this.upData.id);

                        this.disBock = false;
                        this.disBock_input = "";
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        //更新条码
        gengxinBock() {
            let arr = [];
            console.log(this.upData);
            this.tiaomaa.forEach(item => {
                arr.push(item.barCode);
            });
            let data = {
                goodsId: this.upData.id,
                barCodeList: arr
            };
            console.log(data);
            jituanSPBock(data).then(res => {
                this.$notify({
                    title: "成功",
                    type: "success"
                });
            });
        },
        //删除条码
        shanBock(row) {
            if (this.tiaomaa.length > 1) {
                this.$confirm("此操作需保存后生效, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        console.log("--------------------------------");
                        this.tiaomaa.forEach((item, index) => {
                            if (item.barCode == row.barCode) {
                                this.tiaomaa.splice(index, 1);
                            }
                        });

                        console.log(this.tiaomaa);
                        console.log("+++++++++++++++++++++++++++++++++");
                        /*let arr=[];
				    	this.tiaomaa.forEach((item)=>{
				    		arr.push(item.barCode)
				    	})
				    	console.log(arr)
				    	let data={
				    		goodsId:this.upData.id,
				    		barCodeList:arr
				    	}
			        	
			        	console.log(data)
			        	jituanSPBock(data).then(res=>{
					        
					        this.xinxiUp=false;
				        	this.xiugaiUp(this.upData.id);
				        	
				        	this.$notify({
					          title: '成功',
					          type: 'success'
					        });
					        
				    	})*/
                    })
                    .catch(() => {
                        this.$message({
                            type: "price-mt",
                            message: "已取消删除"
                        });
                    });
            } else {
                this.$message({
                    type: "info",
                    message: "条码不能全部删除"
                });
            }
        },

        shuruBock() {
            if (!this.disBock_input) {
                this.disBock = false;
            }
        },

        //修改商品信息
        xiugaixinxi() {
            let arr = [];
            this.tiaomaa.forEach(item => {
                arr.push(item.barCode);
            });

            let str = this.disBock_input.replace(/\s+/g, "");
            if (str != "") {
                arr.push(str);
            }

            let data = {
                goodsId: this.upData.id,
                barCodeList: arr
            };
            console.log(data);
            jituanSPBock(data)
                .then(res => {
                    this.disBock_input = "";
                    //			        delete this.upData["tiaoma"];
                    delete this.upData["createTime"];
                    console.log(this.upData);

                    let v = /^([1-9][0-9]*){1,3}$/;
                    if (!v.test(this.upData.expirationDay)) {
                        this.$message.error({
                            type: "错误",
                            message: "保质期应为正整数"
                        });
                    } else {
                        orderUp(this.upData)
                            .then(res => {
                                console.log(res);
                                this.$notify({
                                    title: "成功",
                                    type: "success"
                                });
                                this.xinxiUp = false;
                                this.getList();
                            })
                            .catch(res => {
                                console.log(res.response.data.error);
                                this.$notify.error({
                                    title: res.response.data.error
                                });
                            });
                    }
                })
                .catch(res => {
                    console.log(res.response.data.error);
                    this.$notify.error({
                        title: res.response.data.error
                    });
                });
        },

        //商品进价维护添加框
        maintainAddCommodity() {
            this.maintainData.push(this.maintainAddData);
            this.maintainAddVisible = false;
        },
        // 自定义表达头+
        renderHeader(h, { column, $index }) {
            var that = this;
            return h("span", [
                h("span", column.label),
                h(
                    "el-button",
                    {
                        style: "margin-left: 5px;",
                        on: {
                            click: that.add
                        }
                    },
                    ["+"]
                )
            ]);
        },
        //进价维护弹框第一级
        jinjiaweihu() {
            this.maintainVisible = true;
            let data = {
                supplierType: 2
            };
            SupplierList(data).then(res => {
                console.log(res);
                this.supplierOptions = res.data;
            });
        },
        //所有商品列表
        spgetList() {
            orderListNo(this.splistQuery)
                .then(res => {
                    console.log(res);
                    this.list1 = res.data.rows;
                    this.total1 = res.data.total;
                })
                .catch(res => {});
        },
        //所有商品类别
        orderlei() {
            orderLei({}).then(res => {
                this.typeOptions = res.data;
                console.log(this.typeOptions);
            });
        },
        huanOK(event, row) {
            console.log(this.caigoudeList);
            console.log(row.$index);
            this.caigoudeList[row.$index].edit = true;
            this.$set(
                this.caigoudeList,
                row.$index,
                this.caigoudeList[row.$index]
            );
        },
        confirmEdit(row, rows) {
            let v = /^\d+(\.\d+)?$/;
            if (!row.price) {
                this.$notify.error({
                    title: "错误",
                    message: "不能为空",
                    duration: 1000
                });
            } else if (!v.test(row.price)) {
                this.$notify.error({
                    title: "错误",
                    message: "应是数字或小数",
                    duration: 1000
                });
            } else {
                row.edit = false;
                console.log(rows.$index);
                this.$set(
                    this.caigoudeList,
                    rows.$index,
                    this.caigoudeList[rows.$index]
                );
            }
        },
        gaijiage() {
            this.caigoudeList.forEach(item => {
                delete item["createTime"];
                //					item["goodsId"]=item.id
                item["supplierId"] = this.supplier;
            });

            let data = {
                goodsList: this.caigoudeList
            };
            console.log(data);
            supplierJinjia(data).then(() => {
                this.maintainVisible = false;
                this.$notify({
                    title: "修改成功",
                    type: "success",
                    duration: 1000
                });
            });
        },

        //添加商品组件传过来的值
        getData(val) {
            this.shangpintj = false;
            console.log(val);
            val.forEach(item => {
                item["goodsId"] = item.id;
                this.caigoudeList.unshift(item);
            });
        },
        //传完值之后关闭弹框
        guaT(val) {
            this.shangpintj = false;
        },
        huoquOrder() {
			this.suppliOrderQuery.supplierId = this.supplier;
            suppliOrder(this.suppliOrderQuery).then(res => {
                console.log(res);
                this.caigoudeList = res.data.rows;
				this.suppliOrderQueryTotal = res.data.total;
            });
        },
        qingCaigoudeList() {
            this.caigoudeList = [];
            this.supplier = "";
        },
        daoruM() {
            if (!this.supplier) {
                this.$notify.error({
                    title: "错误",
                    message: "请选择供应商",
                    duration: 1000
                });
            } else {
            }
        },
        quKong() {
            this.disBock = false;
            this.disBock_input = "";
        }
    }
};
</script>
<style scoped>
.main {
    position: relative;
}
.el-icon-plus {
    position: absolute;
    top: 13px;
    right: 30px;
    z-index: 10;
    cursor: pointer;
}
</style>
<style scoped>
@import url("./commodity.scss");
</style>