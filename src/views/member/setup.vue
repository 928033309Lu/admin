<template>
    <div class="app-container setup">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top">
                <el-form-item label="会员设置" style="margin-bottom: 0;"></el-form-item>
            </div>
            <div class="guanli">
                <div class="dengji">
                    <div class="top">
                        <el-form-item label="会员等级管理" style="margin-bottom: 0;" label-width="130px"></el-form-item>
                    </div>
                    <div class="jiahao">
                        <div class="hao" @click="dengjiTk">+</div>
                        <el-table :key="tableKey" :data="dengjiList" style="width: 100%;">
                            <el-table-column label="会员等级" align="center" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.levelName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="积分范围" align="center" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.minPoint }}~{{ scope.row.maxPoint }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="积分乘数" align="center" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.multiple }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="left"
                                min-width="150"
                                class-name="small-padding fixed-width"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="dengjiModify(scope.$index, scope.row)"
                                    >修改</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="dengjiDel(scope.$index,scope.row)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="dengji biaoqian">
                    <div class="top">
                        <el-form-item label="会员标签管理" style="margin-bottom: 0;" label-width="130px"></el-form-item>
                    </div>
                    <div class="jiahao">
                        <div class="hao" @click="biaoqinTk">+</div>
                        <el-table :key="tableKey" :data="biaoqianList" style="width: 100%;">
                            <el-table-column label="标签名称" align="center" min-width="70">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.labelName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="标签描述" align="left" min-width="80">
                                <template slot-scope="scope">
                                    <span class="miaoshu">{{ scope.row.labelDescription }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="left"
                                min-width="150"
                                class-name="small-padding fixed-width"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="modificationLabel(scope.$index, scope.row)"
                                    >修改</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="biaoqianDel(scope.$index, scope.row)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- <div class="dengji chedui">
		  		<div class="top">
		  			<el-form-item label="车队折扣管理" style="margin-bottom: 0;" label-width="110px"></el-form-item>
		  		</div>
		  		<div class="jiahao">
		  			<div class="hao" @click="zhekouTk()">+</div>
			  		<el-table :key="tableKey" :data="zhekouList" style="width: 100%;">
	        		<el-table-column label="序号" align="center" min-width="50">
			          <template slot-scope="scope">
			            <span>{{ scope.row.carNumber }}</span>
			          </template>
			        </el-table-column>
			        <el-table-column label="油品" align="left" min-width="70">
			          <template slot-scope="scope">
			            <span>{{ scope.row.oilsIds }}</span>
			          </template>
			        </el-table-column>
	        		<el-table-column label="折扣范围" align="left" min-width="80">
			          <template slot-scope="scope">
			            <span>{{ scope.row.discountStart }}～{{ scope.row.discountEnd }}</span>
			          </template>
			        </el-table-column>
			        <el-table-column label="操作" align="left" min-width="150" class-name="small-padding fixed-width">
			          <template slot-scope="scope">
			            <el-button size="mini" type="primary" @click="modificationDiscount(scope.$index, scope.row)">修改</el-button>
			            <el-button size="mini" type="danger" @click="zhekouDel(scope.$index, scope.row)">删除</el-button>
			          </template>
			        </el-table-column>
	      		</el-table>
      		</div>
                </div>-->
            </div>
        </el-form>

        <el-dialog title="会员等级添加" :visible.sync="dengjitianjia" class="biaoqiantianjia">
            <el-form
                ref="biaoqianForm"
                :model="temp"
                label-position="left"
                label-width="130px"
                style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="会员等级" prop="title">
                    <el-input v-model="dengjiAddDada.membershipLevel"/>
                </el-form-item>
                <el-form-item label="积分范围" prop="title">
                    <el-input v-model="dengjiAddDada.minPoint"/>
                    <span>~</span>
                    <el-input v-model="dengjiAddDada.maxPoint"/>
                </el-form-item>
                <el-form-item label="积分乘数" prop="title">
                    <el-input v-model="dengjiAddDada.IntegralMultiplier"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dengjitianjia = false">取消</el-button>
                <el-button type="primary" @click="dengjiAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="会员等级修改"
            style="width:60%;margin:0 auto"
            :visible.sync="dengjixiugai"
            class="biaoqiantianjia">
            <el-form
                ref="biaoqianForm"
                :model="temp"
                label-position="left"
                label-width="130px"
                style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="会员等级" prop="title">
                    <el-input v-model="dengjiModifyDada.levelName"/>
                </el-form-item>
                <el-form-item label="积分范围" prop="title">
                    <el-input style="width:91px" v-model="dengjiModifyDada.minPoint"/>
                    <span>~</span>
                    <el-input style="width:91px" v-model="dengjiModifyDada.maxPoint"/>
                </el-form-item>
                <el-form-item label="积分乘数" prop="title">
                    <el-input v-model="dengjiModifyDada.multiple"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dengjixiugai = false">取消</el-button>
                <el-button type="primary" @click="dengjiModifyEnt">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="标签添加" :visible.sync="biaoqintianjia" class="biaoqiantianjia" width="1000px">
            <el-form
                ref="biaoqianForm"
                :model="temp"
                label-position="left"
                label-width="130px"
                style="width: 400px; margin-left:50px;">
                <el-form-item label="标签名称" prop="title">
                    <el-input v-model="biaoqianAddDada.labelName" style="width: 200px"/>
                </el-form-item>

                <el-form-item label="月均加油次数" class="xiaoselect">
                    <el-select
                        v-model="biaoqianAddDada.frequencyStartIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianAddDada.frequencyStart"
                        style="width: 200px;"
                        class="filter-item"
                    />
                    <div class="qie">且</div>
                    <el-select
                        v-model="biaoqianAddDada.frequencyEndIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianAddDada.frequencyEnd"
                        style="width: 200px;"
                        class="filter-item"
                    />
                </el-form-item>

                <el-form-item label="平均每次加油金额" class="xiaoselect">
                    <el-select
                        v-model="biaoqianAddDada.averageStartIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianAddDada.averageStart"
                        style="width: 200px;"
                        class="filter-item"
                    />
                    <div class="qie">且</div>
                    <el-select
                        v-model="biaoqianAddDada.averageEndIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianAddDada.averageEnd"
                        style="width: 200px;"
                        class="filter-item"
                    />
                </el-form-item>

                <div class="shijian">
                    <el-form-item label="加油时间段1" class="shijianduan">
                        <!-- <el-time-picker
                            is-range
                            v-model="biaoqianAddDada.oilStart"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                        ></el-time-picker> -->
                        <!-- <el-date-picker
                            v-model="biaoqianAddDada.oilStart"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker> -->
                        <el-time-picker
                            is-range
                            v-model="biaoqianAddDada.oilStart"
                            :default-value="defaultTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>

                    <el-form-item label="加油时间段2" class="shijianduan">
                        <!-- <el-time-picker
                            is-range
                            v-model="biaoqianAddDada.oilEnd"
                            :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                        ></el-time-picker> -->
                        <!-- <el-date-picker
                            v-model="biaoqianAddDada.oilEnd"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker> -->
                        <el-time-picker
                            is-range
                            v-model="biaoqianAddDada.oilEnd"
                            :default-value="defaultTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                </div>
                <div class="xuanze">
                    <el-form-item label="油品品号" class="xiaoselect">
                        <el-select v-model="biaoqianAddDada.oilsIds" clearable class="filter-item" multiple collapse-tags>
                            <el-option
                                v-for="item in oilOptions"
                                :key="item.id"
                                :label="item.oils_no_type"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否购买商品" class="xiaoselect">
                        <el-radio-group v-model="biaoqianAddDada.isBuyGoods">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>

                <el-form-item label="标签描述" class="miaoshu">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="biaoqianAddDada.labelDescription"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="biaoqintianjia = false">取消</el-button>
                <el-button type="primary" @click="biaoqianAdd">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="标签修改" :visible.sync="biaoqianxiugai" class="biaoqiantianjia" width="1000px">
            <el-form
                ref="biaoqianForm"
                :model="temp"
                label-position="left"
                label-width="130px"
                style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="标签名称" prop="title">
                    <el-input v-model="biaoqianModifyDada.labelName" style="width: 200px"/>
                </el-form-item>

                <el-form-item label="月均加油次数" class="xiaoselect">
                    <el-select
                        v-model="biaoqianModifyDada.frequencyStartIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianModifyDada.frequencyStart"
                        style="width: 200px;"
                        class="filter-item"
                    />
                    <div class="qie">且</div>
                    <el-select
                        v-model="biaoqianModifyDada.frequencyEndIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianModifyDada.frequencyEnd"
                        style="width: 200px;"
                        class="filter-item"
                    />
                </el-form-item>

                <el-form-item label="平均每次加油金额" class="xiaoselect">
                    <el-select
                        v-model="biaoqianModifyDada.averageStartIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianModifyDada.averageStart"
                        style="width: 200px;"
                        class="filter-item"
                    />
                    <div class="qie">且</div>
                    <el-select
                        v-model="biaoqianModifyDada.averageEndIndex"
                        clearable
                        style="width: 90px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in indexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input
                        placeholder
                        v-model="biaoqianModifyDada.averageEnd"
                        style="width: 200px;"
                        class="filter-item"
                    />
                </el-form-item>

                <div class="shijian">
                    <el-form-item label="加油时间段1" class="shijianduan">
                        <!-- <el-time-picker
                            is-range
                            v-model="oilStart"
                            :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                        ></el-time-picker> -->
                        <!-- <el-date-picker
                            v-model="oilStart"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker> -->
                        <el-time-picker
                            is-range
                            v-model="oilStart"
                            range-separator="至"
                            :default-value="defaultTime"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>

                    <el-form-item label="加油时间段2" class="shijianduan">
                        <!-- <el-time-picker
                            is-range
                            v-model="oilEnd"
                            :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                        ></el-time-picker> -->
                        <!-- <el-date-picker
                            v-model="oilEnd"
                            type="daterange"
                            :default-value="defaultTime"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker> -->
                        <el-time-picker
                            is-range
                            v-model="oilEnd"
                            range-separator="至"
                            :default-value="defaultTime"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                </div>

                <div class="xuanze">
                    <el-form-item label="油品品号" class="xiaoselect">
                        <el-select
                            v-model="biaoqianModifyDada.oilsIds"
                            clearable
                            class="filter-item"
                             multiple collapse-tags
                        >
                            <el-option
                                v-for="item in oilOptions"
                                :key="item.id"
                                :label="item.oils_no_type"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否购买商品" class="xiaoselect">
                        <el-radio-group v-model="biaoqianModifyDada.isBuyGoods">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>

                <el-form-item label="标签描述" class="miaoshu">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="biaoqianModifyDada.labelDescription"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="biaoqianxiugai = false">取消</el-button>
                <el-button type="primary" @click="biaoqianModifyEnt">保存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { fetchList } from "@/api/article";
import { queryAllMemberLevel } from "@/api/huiyuanguanli";
import { queryMemberLabel } from "@/api/huiyuanguanli";
import { queryAllMemberCarDiscount } from "@/api/huiyuanguanli";
import { addMemberLevel } from "@/api/huiyuanguanli";
import { updateMemberLevel } from "@/api/huiyuanguanli";
import { deleteMemberLevel } from "@/api/huiyuanguanli";
import { addMemberLabel } from "@/api/huiyuanguanli";
import { updateMemberLabel } from "@/api/huiyuanguanli";
import { deleteMemberLabel } from "@/api/huiyuanguanli";
import { updateMemberCarDiscount } from "@/api/huiyuanguanli";
import { addMemberCarDiscount } from "@/api/huiyuanguanli";
import { deleteMemberCarDiscount } from "@/api/huiyuanguanli";
import { oilList } from "@/api/oil";
export default {
    data() {
        return {
            defaultTime: [ "2019-02-26T16:00:00.000Z", "2019-02-27T15:59:59.000Z" ],
            list: null,
            dengjitianjia: false, //等级添加框
            dengjixiugai: false, //等级修改框
            //标签添加弹框
            biaoqintianjia: false,
            //标签添加弹框结束
            biaoqianxiugai: false, //标签修改框
            zhekouxiugai: false, //折扣修改
            //折扣添加弹框
            zhekoutianjia: false,
            //折扣添加弹框结束
            jiuyoushijian1: "",
            biaoqianmiaoshu: "",
            dengjiList: [],
            pickerOptions2: {
                shortcuts: [
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
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            biaoqianList: [],
            zhekouList: [],
            shanggou: 2,
            form: {
                name: ""
            },
            listQuery: {
                importance: undefined,
                title: undefined
            },
            importanceOptions: [1, 2, 3],
            oilOptions: [],
            indexOptions: [
                {
                    value: 1,
                    label: "大于"
                },
                {
                    value: 2,
                    label: "小于"
                },
                {
                    value: 3,
                    label: "等于"
                }
            ],
            temp: {
                importance: 1,
                title: "",
                type: ""
            },
            tableKey: 0,
            //等级添加临时数据
            dengjiAddDada: {
                membershipLevel: "", //会员等级
                IntegralMultiplier: "", //积分乘数
                maxPoint: 0,
                minPoint: 0
            },
            //等级修改数据
            dengjiModifyDada: {
                levelName: "", //会员等级
                maxPoint: "", //最大
                minPoint: "", //最小
                multiple: "" //积分乘数
            },
            dengjiIndex: "",
            //标签添加
            biaoqianAddDada: {
                averageEnd: "", //平均
                averageEndIndex: "",
                averageStartIndex: "",
                averageStart: "",
                frequencyEnd: "", //月均
                frequencyStart: "",
                frequencyEndIndex: "",
                frequencyStartIndex: "",
                isBuyGoods: "",
                labelDescription: "", //描述
                labelName: "",
                oilEnd: "",
                oilStart: "",
                oilEndA: "",
                oilEndB: "",
                oilStartA: "",
                oilStartB: "",
                oilsIds: ""
            },
            //标签修改数据
            biaoqianModifyDada: {
                oilEnd: [],
                oilStart: []
            },
            biaoqianIndex: "",
            //折扣添加数据
            zhekouAddDada: {
                discountEnd: "",
                discountStart: "",
                oilsIds: ""
            },
            //折扣修改数据
            zhekouModifyDada: {},
            zhekouIndex: "",
            oilStart: '',
            oilEnd: ''
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            // fetchList(this.listQuery)
            // 	.then(response => {
            // 		this.list = response.data.items
            // 	})
            //获取等级列表
            var data = {};
            queryAllMemberLevel(data).then(response => {
                this.dengjiList = response.data.list;
            });
            //获取标签列表
            queryMemberLabel(data).then(response => {
                this.biaoqianList = response.data.list;
            });
            //获取车队列表
            queryAllMemberCarDiscount(data).then(response => {
                this.zhekouList = response.data.list;
            });

            oilList({}).then(res => {
                this.oilOptions = res.data;
            });
        },
        biaoqinTk() {
            this.biaoqintianjia = true;
        },
        zhekouTk() {
            this.zhekoutianjia = true;
        },
        dengjiTk() {
            this.dengjitianjia = true;
        },
        //等级添加
        dengjiAdd() {
            var data = {
                creater: "111",
                levelName: this.dengjiAddDada.membershipLevel,
                maxPoint: Number(this.dengjiAddDada.maxPoint),
                minPoint: Number(this.dengjiAddDada.minPoint),
                modifier: "",
                multiple: this.dengjiAddDada.IntegralMultiplier
            };
            addMemberLevel(data).then(response => {
                this.zhekouList = response.data.list;
                this.dengjitianjia = false;
                this.dengjiAddDada = {
                    membershipLevel: "", //会员等级
                    IntegralMultiplier: "", //积分乘数
                    maxPoint: 0,
                    minPoint: 0
                };
                this.getList();
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
            });
            // this.$http
            // 	.post('http://192.168.0.129:8080/member/addMemberLevel',
            // 	{
            // 		"creater": "111",
            // 		"levelName": this.dengjiAddDada.membershipLevel,
            // 		"maxPoint": Number(this.dengjiAddDada.maxPoint),
            // 		"minPoint": Number(this.dengjiAddDada.minPoint),
            // 		"modifier": "",
            // 		"multiple": this.dengjiAddDada.IntegralMultiplier
            // 	},
            // 	{
            // 		headers:{
            // 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            // 		}
            // 	})
            // 	.then(function(res){
            // 		console.log('提交成功')
            // 		console.log(res.body)
            // 		this.dengjitianjia = false
            // 		this.dengjiList.push(res.body)
            // 		this.dengjiAddDada = {
            // 			membershipLevel:'',//会员等级
            // 			IntegralMultiplier:'',//积分乘数
            // 			maxPoint: 0,
            // 			minPoint: 0,
            // 		}
            // 		this.$message({
            // 			message: '添加成功',
            // 			type: 'success'
            // 		});
            // 	})
            // 	.catch(function(err){
            // 		console.log('提交失败')
            // 		console.log(err)
            // 		this.$message.error('添加失败');
            // 	})
        },
        //等级修改
        dengjiModify(index, row) {
            this.dengjixiugai = true;
            this.dengjiIndex = index;
            this.dengjiModifyDada = JSON.parse(JSON.stringify(row));
        },
        dengjiModifyEnt() {
            var data = {
                id: this.dengjiModifyDada.id,
                creater: "111",
                levelName: this.dengjiModifyDada.levelName,
                maxPoint: Number(this.dengjiModifyDada.maxPoint),
                minPoint: Number(this.dengjiModifyDada.minPoint),
                modifier: "",
                multiple: this.dengjiModifyDada.multiple
            };
            updateMemberLevel(data).then(response => {
                this.dengjixiugai = false;
                this.getList();
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
            });
        },
        //等级删除
        dengjiDel(index, row) {
            var data = {
                id: row.id
            };
            deleteMemberLevel(data).then(response => {
                console.log(response.data);
                this.getList();
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
            });
        },
        //标签添加
        biaoqianAdd() {
            // console.log(this.biaoqianAddDada.oilEnd)
            // console.log(this.biaoqianAddDada.oilEnd[0])
            // return
            var data = {
                averageEnd: Number(this.biaoqianAddDada.averageEnd),
                averageEndIndex:
                    Number(this.biaoqianAddDada.averageEndIndex) || 0,
                averageStart: Number(this.biaoqianAddDada.averageStart),
                averageStartIndex:
                    Number(this.biaoqianAddDada.averageStartIndex) || 0,
                frequencyEnd: Number(this.biaoqianAddDada.frequencyEnd),
                frequencyEndIndex:
                    Number(this.biaoqianAddDada.frequencyEndIndex) || 0,
                frequencyStart: Number(this.biaoqianAddDada.frequencyStart),
                frequencyStartIndex:
                    Number(this.biaoqianAddDada.frequencyStartIndex) || 0,
                isBuyGoods: Number(this.biaoqianAddDada.isBuyGoods),
                labelDescription: this.biaoqianAddDada.labelDescription,
                labelName: this.biaoqianAddDada.labelName,
                oilEndA: this.biaoqianAddDada.oilStart[1],
                oilEndB: this.biaoqianAddDada.oilEnd[1],
                oilStartA: this.biaoqianAddDada.oilStart[0],
                oilStartB: this.biaoqianAddDada.oilEnd[0],
                oilsIds: this.biaoqianAddDada.oilsIds
            };
            addMemberLabel(data).then(response => {
                this.biaoqintianjia = false;
                this.getList();
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
            });
        },
        //标签修改
        modificationLabel(index, row) {
            this.biaoqianxiugai = true;
            // this.biaoqianModifyDada = row;
            console.log(row);
            this.biaoqianIndex = index;
            this.biaoqianModifyDada = JSON.parse(JSON.stringify(row));
            // this.biaoqianModifyDada = row;
            row.oilStartA && (this.oilStart = [row.oilStartA, row.oilEndA]);
            row.oilStartB && (this.oilEnd = [row.oilStartB, row.oilEndB]);
        },
        biaoqianModifyEnt() {
            if (this.oilStart == null) {
                this.oilStart = [];
            }
            if (this.oilEnd == null) {
                this.oilEnd = [];
            }
            console.log(this.oilEnd[1]);
            var data = {
                id: this.biaoqianModifyDada.id,
                averageEnd: Number(this.biaoqianModifyDada.averageEnd),
                averageEndIndex:
                    Number(this.biaoqianModifyDada.averageEndIndex) || 0,
                averageStart: Number(this.biaoqianModifyDada.averageStart),
                averageStartIndex:
                    Number(this.biaoqianModifyDada.averageStartIndex) || 0,
                frequencyEnd: Number(this.biaoqianModifyDada.frequencyEnd),
                frequencyEndIndex:
                    Number(this.biaoqianModifyDada.frequencyEndIndex) || 0,
                frequencyStart: Number(this.biaoqianModifyDada.frequencyStart),
                frequencyStartIndex:
                    Number(this.biaoqianModifyDada.frequencyStartIndex) || 0,
                isBuyGoods: Number(this.biaoqianModifyDada.isBuyGoods),
                labelDescription: this.biaoqianModifyDada.labelDescription,
                labelName: this.biaoqianModifyDada.labelName,
                oilEndA: new Date(this.oilStart[1]),
                oilEndB: new Date(this.oilEnd[1]),
                oilStartA: new Date(this.oilStart[0]),
                oilStartB: new Date(this.oilEnd[0]),
                oilsIds: this.biaoqianModifyDada.oilsIds
            };
            console.log(data);
            updateMemberLabel(data).then(response => {
                this.biaoqianxiugai = false;
                this.getList();
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
            });
            // this.$http
            // 	.post('http://192.168.0.129:8080/member/updateMemberLabel',
            // 	{
            // 		"id":this.biaoqianModifyDada.id,
            // 		"averageEnd": Number(this.biaoqianModifyDada.averageEnd),
            // 		"averageEndIndex": Number(this.biaoqianModifyDada.averageEndIndex)||0,
            // 		"averageStart": Number(this.biaoqianModifyDada.averageStart),
            // 		"averageStartIndex": Number(this.biaoqianModifyDada.averageStartIndex)||0,
            // 		"frequencyEnd":  Number(this.biaoqianModifyDada.frequencyEnd),
            // 		"frequencyEndIndex": Number(this.biaoqianModifyDada.frequencyEndIndex)||0,
            // 		"frequencyStart": Number(this.biaoqianModifyDada.frequencyStart),
            // 		"frequencyStartIndex": Number(this.biaoqianModifyDada.frequencyStartIndex)||0,
            // 		"isBuyGoods": Number(this.biaoqianModifyDada.isBuyGoods),
            // 		"labelDescription":this.biaoqianModifyDada.labelDescription,
            // 		"labelName": this.biaoqianModifyDada.labelName,
            // 		"oilEndA": new Date(this.oilStart[1]),
            // 		"oilEndB": new Date(this.oilEnd[1]),
            // 		"oilStartA": new Date(this.oilStart[0]),
            // 		"oilStartB": new Date(this.oilEnd[0]),
            // 		"oilsIds":  this.biaoqianModifyDada.oilsIds
            // 	},
            // 	{
            // 		headers:{
            // 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            // 		}
            // 	})
            // 	.then(function(res){
            // 		console.log('提交成功')
            // 		console.log(res.body)
            // 		this.biaoqianxiugai = false
            // 		this.biaoqianList[this.biaoqianIndex].averageEnd = this.biaoqianModifyDada.averageEnd
            // 		this.biaoqianList[this.biaoqianIndex].averageEndIndex = this.biaoqianModifyDada.averageEndIndex
            // 		this.biaoqianList[this.biaoqianIndex].averageStart = this.biaoqianModifyDada.averageStart
            // 		this.biaoqianList[this.biaoqianIndex].averageStartIndex = this.biaoqianModifyDada.averageStartIndex
            // 		this.biaoqianList[this.biaoqianIndex].frequencyEnd = this.biaoqianModifyDada.frequencyEnd
            // 		this.biaoqianList[this.biaoqianIndex].frequencyEndIndex = this.biaoqianModifyDada.frequencyEndIndex
            // 		this.biaoqianList[this.biaoqianIndex].frequencyStart = this.biaoqianModifyDada.frequencyStart
            // 		this.biaoqianList[this.biaoqianIndex].frequencyStartIndex = this.biaoqianModifyDada.frequencyStartIndex
            // 		this.biaoqianList[this.biaoqianIndex].isBuyGoods = this.biaoqianModifyDada.isBuyGoods
            // 		this.biaoqianList[this.biaoqianIndex].labelDescription = this.biaoqianModifyDada.labelDescription
            // 		this.biaoqianList[this.biaoqianIndex].labelName = this.biaoqianModifyDada.labelName
            // 		this.biaoqianList[this.biaoqianIndex].oilEndA = this.biaoqianModifyDada.oilEndA
            // 		this.biaoqianList[this.biaoqianIndex].oilEndB = this.biaoqianModifyDada.oilEndB
            // 		this.biaoqianList[this.biaoqianIndex].oilStartA = this.biaoqianModifyDada.oilStartA
            // 		this.biaoqianList[this.biaoqianIndex].oilStartB = this.biaoqianModifyDada.oilStartB
            // 		this.biaoqianList[this.biaoqianIndex].oilsIds = this.biaoqianModifyDada.oilsIds
            // 		this.$message({
            // 			message: '修改成功',
            // 			type: 'success'
            // 		});
            // 	})
            // 	.catch(function(err){
            // 		console.log('提交失败')
            // 		console.log(err)
            // 		this.$message.error('修改失败');
            // 	})
        },
        //标签删除
        biaoqianDel(index, row) {
            var data = {
                id: row.id
            };
            deleteMemberLabel(data).then(response => {
                // console.log(response.data)
                this.getList();
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
            });
            // this.$http
            // 	.post('http://192.168.0.129:8080/member/deleteMemberLabel',
            // 	{
            // 		"id":row.id,
            // 	},
            // 	{
            // 		headers:{
            // 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            // 		}
            // 	})
            // 	.then(function(res){
            // 		console.log('提交成功')
            // 		console.log(res.body)
            // 		this.biaoqianList.splice(index, 1);
            // 		this.$message({
            // 			message: '删除成功',
            // 			type: 'success'
            // 		});
            // 	})
            // 	.catch(function(err){
            // 		console.log('提交失败')
            // 		console.log(err)
            // 		this.$message.error('删除失败');
            // 	})
        },
        //折扣修改
        modificationDiscount(index, row) {
            this.zhekouxiugai = true;
            // this.zhekouModifyDada = row
            this.zhekouIndex = index;
            console.log(row);
            this.zhekouModifyDada = JSON.parse(JSON.stringify(row));
            this.zhekouModifyDada.oilStart = [row.oilStartA, row.oilStartB];
            this.zhekouModifyDada.oilEnd = [row.oilEndA, row.oilEndB];
        },
        zhekouModifyEnt() {
            var data = {
                id: this.zhekouModifyDada.id,
                discountEnd: this.zhekouModifyDada.discountEnd,
                discountStart: this.zhekouModifyDada.discountStart,
                oilsIds: this.zhekouModifyDada.oilsIds
            };
            updateMemberCarDiscount(data).then(response => {
                this.zhekouxiugai = false;
                this.getList();
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
            });
            // this.$http
            // 	.post('http://192.168.0.129:8080/member/updateMemberCarDiscount',
            // 	{
            // 		"id":this.zhekouModifyDada.id,
            // 		"discountEnd": this.zhekouModifyDada.discountEnd,
            // 		"discountStart": this.zhekouModifyDada.discountStart,
            // 		"oilsIds": this.zhekouModifyDada.oilsIds
            // 	},
            // 	{
            // 		headers:{
            // 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            // 		}
            // 	})
            // 	.then(function(res){
            // 		console.log('提交成功')
            // 		console.log(res.body)
            // 		this.zhekouxiugai = false
            // 		this.zhekouList[this.zhekouIndex].discountEnd = this.zhekouModifyDada.discountEnd
            // 		this.zhekouList[this.zhekouIndex].discountStart = this.zhekouModifyDada.discountStart
            // 		this.zhekouList[this.zhekouIndex].oilsIds = this.zhekouModifyDada.oilsIds
            // 		this.$message({
            // 			message: '修改成功',
            // 			type: 'success'
            // 		});
            // 	})
            // 	.catch(function(err){
            // 		console.log('提交失败')
            // 		console.log(err)
            // 		this.$message.error('修改失败');
            // 	})
        },
        //折扣添加
        zhekouAdd() {
            // console.log(this.zhekouAddDada.oilsIds)
            var data = {
                discountEnd: this.zhekouAddDada.discountEnd,
                discountStart: this.zhekouAddDada.discountStart,
                oilsIds: this.zhekouAddDada.oilsIds
            };
            addMemberCarDiscount(data).then(response => {
                this.zhekoutianjia = false;
                this.getList();
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
            });
            // this.$http
            // 	.post('http://192.168.0.129:8080/member/addMemberCarDiscount',
            // 	{
            // 		"discountEnd": this.zhekouAddDada.discountEnd,
            // 		"discountStart": this.zhekouAddDada.discountStart,
            // 		"oilsIds": this.zhekouAddDada.oilsIds
            // 	},
            // 	{
            // 		headers:{
            // 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            // 		}
            // 	})
            // 	.then(function(res){
            // 		console.log('提交成功')
            // 		console.log(res.body)
            // 		this.zhekoutianjia = false
            // 		this.zhekouList.push(res.body)
            // 		this.zhekouAddDada = {
            // 			membershipLevel:'',//会员等级
            // 			IntegralMultiplier:'',//积分乘数
            // 			maxPoint: 0,
            // 			minPoint: 0,
            // 		}
            // 		this.$message({
            // 			message: '添加成功',
            // 			type: 'success'
            // 		});
            // 	})
            // 	.catch(function(err){
            // 		console.log('提交失败')
            // 		console.log(err)
            // 		this.$message.error('添加失败');
            // 	})
        },
        //折扣删除
        zhekouDel(index, row) {
            var data = {
                id: row.id
            };
            deleteMemberCarDiscount(data).then(response => {
                this.getList();
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
            });
            // this.$http
            // 	.post('http://192.168.0.129:8080/member/deleteMemberCarDiscount',
            // 	{
            // 		"id":row.id,
            // 	},
            // 	{
            // 		headers:{
            // 			'Authorization':'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            // 		}
            // 	})
            // 	.then(function(res){
            // 		console.log('提交成功')
            // 		console.log(res.body)
            // 		this.zhekouList.splice(index, 1);
            // 		this.$message({
            // 			message: '删除成功',
            // 			type: 'success'
            // 		});
            // 	})
            // 	.catch(function(err){
            // 		console.log('提交失败')
            // 		console.log(err)
            // 		this.$message.error('删除失败');
            // 	})
        }
    }
};
</script>



<style scoped>
@import url("./setup.scss");
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main .setup .guanli .dengji {
    width: 49%;
}
.app-main .setup .guanli .biaoqian {
    width: 49%;
}
.el-form-item__label {
    font-size: 14px !important;
}
</style>


