<template>
    <div class="app-container member_query">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="display: flex;justify-content: space-between;flex-flow: row;">
                <el-form-item label="会员查询" style="margin-bottom: 0;">
                    <el-input v-model="condition" style="width:200px" placeholder="手机/会员号/姓名"/>
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <div class="you">
                    <el-button type="primary" @click="daoru">批量导入</el-button>
                    <el-button type="primary" @click="screenVisible=true">筛选会员</el-button>
                </div>
            </div>
            <div class="shus">
                <!-- <div class="tongji xian"> -->
                <!-- <div class="gong">
            <div class="zhong">
              <div class="icon">
                <img src="../images/cheliang.png">
              </div>
              <div class="xinxi">
                <p class="shu">2014555</p>
                <p class="zi">车队会员数量</p>
              </div>
            </div>
                </div>-->
                <!-- </div> -->
                <div class="tongji xian huiyuana">
                    <div class="gong no1">
                        <div class="zhong">
                            <div class="icon">
                                <img src="../images/yonghu.png">
                            </div>
                            <div class="xinxi">
                                <p class="shu">{{memberCount}}</p>
                                <p class="zi">个人会员数量</p>
                            </div>
                        </div>
                    </div>
                    <div class="xians"></div>
                    <div class="gong">
                        <div class="zhong zhong1">
                            <div class="icon">
                                <img src="../images/dangao.png">
                            </div>
                            <div class="xinxi">
                                <p class="shu">{{birthNum}}</p>
                                <p class="zi">今天过生日的会员</p>
                            </div>
                        </div>
                    </div>
                    <div class="xians xian11"></div>
                    <div class="gong">
                        <div class="zhong">
                            <div class="icon">
                                <img src="../images/qiandai.png">
                            </div>
                            <div class="xinxi">
                                <p class="shu">{{payAmount}}</p>
                                <p class="zi">累计消费</p>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="xians xian111"></div>
          <div class="gong">
            <div class="zhong">
              <div class="icon">
                <img src="../images/huangguan.png">
              </div>
              <div class="xinxi">
                <p class="shu">2014555</p>
                <p class="zi">消费TOP3会员</p>
              </div>
            </div>
                    </div>-->
                </div>
            </div>

            <div class="biaogel">
                <div class="xiekuang">
                    <div class="top top2" style="border: none;">
                        <el-form-item label="会员列表" style="margin-bottom: 0;"></el-form-item>
                    </div>
                    <el-table
                        :key="tableKey"
                        :data="list"
                        :header-cell-style="{background:'#f5f9fc'}"
                        style="width: 100%;border-bottom: 0;"
                    >
                        <!-- <el-table-column label="会员类别" align="center" min-width="80">
              <template slot-scope="scope">
                <span v-show="scope.row.memberType==1">个人</span>
                <span v-show="scope.row.memberType==2">车队</span>
              </template>
                        </el-table-column>-->
                        <el-table-column label="会员号" align="center" min-width="70">
                            <template slot-scope="scope">
                                <span>{{ scope.row.memberNo }}</span>
                                <!-- <span>HY45456545</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="会员名称" min-width="90px" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.username }}</span>
                                <!--scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}'-->
                            </template>
                        </el-table-column>
                        <el-table-column label="会员等级" min-width="80" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.levelName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="余额" min-width="50" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.amout }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="积分" min-width="50" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.currentPoint }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号" min-width="105" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.phone }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="开卡日期" min-width="90" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="最后消费时间" min-width="110" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.lastConsumeTime">{{ scope.row.lastConsumeTime | parseTime('{y}-{m}-{d}')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="details(scope.row)">详情</el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="see(scope.$index, scope.row)"
                                >交易记录</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        v-show="total>0"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="limit"
                        @pagination="getList"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </el-form>
        <!-- 导入 -->
        <el-dialog :visible.sync="daoruVisible" title="导入" width="50%">
            <div class="you test">
                <!-- <el-button type="primary" class="test" @click="replace">
                    导入模块
                    <upload-excel-component
                        id="click"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                    />
                </el-button>-->
                <upload-excel-component
                    id="click"
                    daoru="1"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                />
                <el-button type="primary" @click="xiazai">下载模板</el-button>
            </div>
            <div class="biao">
                <div class="table">
                    <el-table ref="multipleTable" :data="mobanData" style="width: 100%">
                        <el-table-column prop="username" label="会员名称" width="120"></el-table-column>
                        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="baocun">保存</el-button>
            </div>
        </el-dialog>
        <!-- 筛选框 -->
        <el-dialog :visible.sync="screenVisible" title="筛选" width="1180px">
            <div class="sai">
                <div class="shu">
                    <div class="block">
                        <div class="left">
                            <span>是否会员</span>
                        </div>
                        <div class="right" style="margin-right:30px;">
                            <el-radio v-model="screen.status" :label="1">是</el-radio>
                            <el-radio v-model="screen.status" :label="2">否</el-radio>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>生日月份</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 180px;"
                                multiple
                                clearable
                                v-model="screen.sendMonthArr"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in monthOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    
                    <div class="block">
                        <div class="left">
                            <span>会员等级</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 180px;"
                                multiple
                                clearable
                                v-model="screen.memberLevelArr"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in levelOptions"
                                    :key="item.id"
                                    :label="item.levelName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="shu">
                    <!-- <div class="block">
                        <div class="left">
                            <el-input
                                style="width: 300px;"
                                v-model="screen.condition"
                                placeholder="会员号/手机号/会员名称"
                            ></el-input>
                        </div>
                    </div>-->
                    <!-- <div class="block">
                        <div class="left">
                            <span>会员注册时间</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                style="width: 170px;"
                                v-model="screen.registeredStart"
                                type="date"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                            <span>-</span>
                            <el-date-picker
                                v-model="screen.registeredEnd"
                                style="width: 170px;"
                                type="date"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </div>
                    </div>-->
                    <div class="block">
                        <span class="demonstration">会员注册时间</span>
                        <el-date-picker
                            v-model="newDate"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                    </div>
                    <div class="block">
                        <span class="demonstration">最后消费时间</span>
                        <el-date-picker
                            v-model="newDate2"
                            type="daterange"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                        ></el-date-picker>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>所属商户</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 180px;"
                                multiple
                                v-model="screen.companyIds"
                                placeholder="请选择"
                            >
                                <el-option
                                v-for="item in companyOptions"
                                :key="item.id"
                                :label="item.company_name"
                                :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <!-- <div class="block">
                        <div class="left">
                            <span>最后消费时间</span>
                        </div>
                        <div class="right">
                            <el-date-picker
                                v-model="screen.consumptionTimeStart"
                                type="date"
                                style="width: 170px;"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                            <span>-</span>
                            <el-date-picker
                                v-model="screen.consumptionTimeEnd"
                                type="date"
                                style="width: 170px;"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </div>
                    </div>-->
                </div>
                <div class="shu">
                    <div class="block">
                        <div class="left">
                            <span>账户余额</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 90px;"
                                v-model="screen.amoutIndex"
                                placeholder="请选择"
                                clearable
                            >
                                <el-option
                                    v-for="item in amoutIndexOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <el-input
                                style="width: 135px;"
                                v-model="screen.amout"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>积分数量</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 90px;"
                                v-model="screen.currentPointIndex"
                                placeholder="请选择"
                                clearable
                            >
                                <el-option
                                    v-for="item in amoutIndexOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <el-input
                                style="width: 135px;"
                                v-model="screen.currentPoint"
                                placeholder="请输入内容"
                            ></el-input>
                        </div>
                    </div>
                    <div class="block">
                        <div class="left">
                            <span>所属油站</span>
                        </div>
                        <div class="right">
                            <el-select
                                style="width: 180px;"
                                multiple
                                v-model="screen.belongOils"
                                placeholder="请选择"
                            >
                                <el-option
                                v-for="item in stationOptions"
                                :key="item.id"
                                :label="item.fullName"
                                :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="anniu">
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog :visible.sync="xiangqingVisible" title="详情" width="70%">
            <p class="biaoti">账户信息</p>
            <div class="block">
                <div class="box">
                    <p>
                        <span>会员号:</span>
                        <span>{{tbMember.memberNo}}</span>
                    </p>
                    <p>
                        <span>会员余额:</span>
                        <span>{{tbMember.amout}}</span>
                    </p>
                </div>
                <div class="box">
                    <p>
                        <span>状态: {{ tbMember.isDel == 0 ? '启用' : '冻结' }}</span>
                        <!-- <span>{{tbMember.memberNo}}</span> -->
                        <!-- <span>{{tbMember.isDel|memberType}}</span> -->
                        <sapn class="isDelBtn">
                            <span @click="editIsDel(tbMember.isDel == 0 ? 1 : 0)"></span>
                            <el-switch v-model="tbMember.isDel" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1"> </el-switch>
                        </sapn>
                    </p>
                    <p>
                        <span>会员积分:</span>
                        <span>{{tbMember.currentPoint}}</span>
                    </p>
                </div>
                <div class="box">
                    <p>
                        <span>会员等级:</span>
                        <span>{{tbMember.memberLevel}}</span>
                    </p>
                    <p>
                        <span>手机号:</span>
                        <span>{{tbMember.phone}}</span>
                    </p>
                </div>
            </div>
            <p class="biaoti">客户档案</p>
            <div class="block">
                <div class="box">
                    <p>
                        <span>姓名:</span>
                        <span>{{tbMember.username}}</span>
                    </p>
                    <p>
                        <span>证件类型:</span>
                        <!-- <span>{{tbMember.memberNo}}</span> -->
                        <span>身份证</span>
                    </p>
                    <p>
                        <span>所在省份:</span>
                        <span>{{tbMember.province}}</span>
                    </p>
                </div>
                <div class="box">
                    <p>
                        <span>性别：</span>
                        <span v-if="tbMember.sex==1">男</span>
                        <span v-else>女</span>
                    </p>
                    <p>
                        <span>证件号码：</span>
                        <span>{{tbMember.documentNo}}</span>
                    </p>
                    <p>
                        <span>所在地区：</span>
                        <!-- <span>{{_district[tbMember.city].district}}</span> -->
                        <span>{{tbMember.city}}</span>
                    </p>
                </div>
                <div class="box">
                    <p>
                        <span>出生日期：</span>
                        <span>{{tbMember.birthday | parseTime('{y}-{m}-{d}')}}</span>
                    </p>
                    <p>
                        <span>开卡时间：</span>
                        <span>{{tbMember.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </p>
                    <p>
                        <span>具体地址：</span>
                        <span>{{tbMember.address}}</span>
                    </p>
                </div>
            </div>
            <p class="biaoti">其他信息</p>
            <div class="block qita">
                <div class="box">
                    <p>所属油站</p>
                    <div class="suoshuyouzhan">
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div class="box">
                    <p>标签</p>
                    <div class="biaoqian">
                        <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)"
                        >{{tag}}</el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                        ></el-input>
                        <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="reset">重置</el-button> -->
                <el-button type="primary" @click="xiangqingVisible=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
} from "@/api/article";
import { queryMember } from "@/api/huiyuanguanli";
import { StationList } from "@/api/youpinbaobiao";
import { queryAllMemberLevel } from "@/api/huiyuanguanli";
import { district } from "@/api/shuju.js";
import { selectMemberById } from "@/api/huiyuanguanli";
import { parseTime } from "@/utils";
import UploadExcelComponent from "@/views/dispatch/UploadExcel/index.vue";
import { membersImport } from "@/api/huiyuanguanli";
import { delMember } from "@/api/shuju.js";
import { getCompanyByWhere } from "@/api/youpinbaobiao";

export default {
    components: { UploadExcelComponent },
    data() {
        return {
            //标签
            dynamicTags: [],
            inputVisible: false,
            inputValue: "",

            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            form: {
                name: ""
            },
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: "+id"
            },
            //分页
            total: 0,
            page: 1,
            limit: 10,
            currentPage: 1,
            loading: true,
            screenVisible: false, //控制筛选框的显示与隐藏
            condition: "", //搜索值
            screen: {
                sendMonthArr: [],
                belongOils: [],
                memberLevelArr: [],
                condition: "",
                registeredStart: "",
                registeredEnd: "",
                consumptionTimeStart: "",
                consumptionTimeEnd: "",
                amoutIndex: "",
                amout: "",
                status: null, //1普通，2是营销会员
                currentPointIndex: "",
                currentPoint: "",
                companyIds:[]
            },
            monthOptions: [
                {
                    value: "1",
                    label: "1月"
                },
                {
                    value: "2",
                    label: "2月"
                },
                {
                    value: "3",
                    label: "3月"
                },
                {
                    value: "4",
                    label: "4月"
                },
                {
                    value: "5",
                    label: "5月"
                },
                {
                    value: "6",
                    label: "6月"
                },
                {
                    value: "7",
                    label: "7月"
                },
                {
                    value: "8",
                    label: "8月"
                },
                {
                    value: "9",
                    label: "9月"
                },
                {
                    value: "10",
                    label: "10月"
                },
                {
                    value: "11",
                    label: "11月"
                },
                {
                    value: "12",
                    label: "12月"
                }
            ],
            stationOptions: [], //油站列表
            levelOptions: [], //会员等级列表
            amoutIndexOptions: [
                {
                    value: 0,
                    label: "大于"
                },
                {
                    value: 1,
                    label: "小于"
                },
                {
                    value: 2,
                    label: "等于"
                },
                {
                    value: 3,
                    label: "大于等于"
                },
                {
                    value: 4,
                    label: "小于等于"
                }
            ],
            xiangqingVisible: false, //详情
            daoruVisible: false, //导入
            tbMember: {}, //会员详情
            memberCount: "", //个人会员数量
            birthNum: "", //今天过生日的会员
            payAmount: "", //累计消费
            mobanData: [],
            tableHeader: [],
            _district: [], //地区列表
            newDate: "", //会员注册时间筛选
            newDate2: "", //最后消费时间筛选
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
            companyOptions: [{}], //公司选择
        };
    },
    created() {
        this.getList();
    },
    watch: {
        newDate: function(val, old) {
            this.screen.registeredStart = val ? val[0] : null;
            this.screen.registeredEnd = val ? val[1] : null;
        },
        newDate2: function(val, old) {
            this.screen.consumptionTimeStart = val ? val[0] : null;
            this.screen.consumptionTimeEnd = val ? val[1] : null;
        }
    },
    methods: {
        xiazai(){  // 下载模板
            // this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader =  ['会员名称', '手机号']
                const filterVal = ['会员名称', '手机号',]
                excel.export_json_to_excel({
                    header: tHeader,
                    data:'',
                    filename: '会员批量导入模板',
                    autoWidth: this.autoWidth,
                    bookType: this.bookType
                })
            })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
        getList() {
            // fetchList(this.listQuery).then(response => {
            //   this.total = response.data.total
            //   const items = response.data.items

            //   this.list = items.map(v => {
            //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            //     v.originalTitle = v.title //  will be used when user click the cancel botton
            //     return v
            //   })
            // })

            var data = this.screen;
            data.pageNum = this.page;
            data.pageSize = this.limit;
            // console.log(111 )
            // console.log(data)
            queryMember(data).then(response => {
                // console.log(response.data);
                this.total = response.data.memberList.total;
                this.list = response.data.memberList.rows;
                this.memberCount = response.data.memberCount;
                this.birthNum = response.data.birthNum;
                this.payAmount = response.data.payAmount;
            });
            var a = {};
            StationList(a).then(response => {
                // console.log('油站')
                // console.log(response.data)
                this.stationOptions = response.data;
            });
            var b = {};
            queryAllMemberLevel(b).then(response => {
                console.log("会员等级");
                // console.log(response.data);
                this.levelOptions = response.data.list;
                // this.tbMember
            });
            district({}).then(res => {
                //地区列表
                // console.log(res.data);
                this._district = res.data;
                console.log(this._district);
            });
            getCompanyByWhere({}).then(response => {
                console.log("商户列表");
                console.log(response.data);
                this.companyOptions = response.data;
            });
        },
        search() {
            var data = {
                pageNum: this.page,
                pageSize: this.limit,
                condition: this.condition
            };
            queryMember(data).then(response => {
                console.log(response.data);
                this.total = response.data.memberList.total;
                this.list = response.data.memberList.rows;
            });
        },
        baocun() {
            console.log(this.mobanData);
            membersImport(this.mobanData).then(response => {
                console.log(response.data);
                this.$message(response.data.count);
            });
        },
        reset() {
            this.xiaofeishijian=null;
            this.zhuceshijian=null;
            this.screen = {
                sendMonthArr: [],
                belongOils: [],
                memberLevelArr: [],
                condition: "",
                registeredStart: "",
                registeredEnd: "",
                consumptionTimeStart: "",
                consumptionTimeEnd: "",
                amoutIndex: "",
                amout: "",
                currentPointIndex: "",
                currentPoint: "",
                status: "",
                companyIds:null
            };
        },
        query() {
            this.screen.pageNum = this.page;
            this.screen.pageSize = this.limit;
            this.page = 1;
            queryMember(this.screen).then(response => {
                console.log(response.data);
                this.total = response.data.memberList.total;
                this.list = response.data.memberList.rows;
                this.screenVisible = false;
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.getList();
        },
        details(row) {
            var data = {
                id: row.id
            };
            selectMemberById(data).then(response => {
                console.log(response.data);
                this.tbMember = response.data.tbMember;
                this.tbMember.city = this._district[
                    this.tbMember.city - 1
                ].district;
                this.tbMember.province = this._district[
                    this.tbMember.province - 1
                ].district;
                this.tbMember.memberLevel = this.levelOptions[
                    this.tbMember.memberLevel - 1
                ].levelName;
            });
            this.xiangqingVisible = true;
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (isLt1M) {
                return true;
            }
            this.$message({
                message: "请传入1M以内的Excel表",
                type: "warning"
            });
            return false;
        },
        handleSuccess({ results, header }) {
            this.mobanData = results;
            this.tableHeader = header;
            //改变读取模板后的对象键名
            this.mobanData = JSON.parse(
                JSON.stringify(this.mobanData)
                    .replace(/会员名称/g, "username")
                    .replace(/手机号/g, "phone")
            );

            // this.mobanData.forEach((item)=>{
            //   this.typeOptions.forEach((v)=>{
            //     if(item.typeId==v.goodsType){
            //       item.typeId=v.id;
            //     }
            //   })
            // })

            // let data = {
            //     goodsList: this.tableData
            // }

            console.log(this.tableData);
        },
        daoru() {
            this.daoruVisible = true;
        },
        see(index, row) {
            this.$router.push({
                path: "/member/statistics-record",
                query: {
                    id: row.id
                }
            });
        },
        editIsDel(val){
            delMember({id:this.tbMember.id,isDel:val}).then(res => {
                this.$message(res.data.message);
                this.details(this.tbMember) 
                // this.chakanTK(this.tbMember.id)
            }); 
        },  
        // chakanTK(id) {
        //     this.chakan = true;
        //     selectMemberById({id:id}).then(response => {
        //         this.ckMainDate = response.data
        //         this.dynamicTags = response.data.tbMember.tag.split(',')
        //     });
        // },  
    },
    filters: {
        memberType(val) {
            return val ? "冻结" : "启用";
        }
    }
};
</script>

<style scoped>
@import url("./query.scss");
.isDelBtn{position: relative;display: inline-block;width: 40px;height: 20px;line-height: 0;cursor: pointer;}
.isDelBtn span{display: block;width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 1;}
</style>
<style scoped>
.drop .el-button {
    padding: 0;
    font-size: 14px;
}
.drop .el-button {
    width: 100px;
    height: 35px;
    display: block;
}
#click {
    display: inline-block;
}
.demonstration{
    margin-right:12px;
}
</style>
