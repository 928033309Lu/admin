<template>
    <div class="app-container number">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom: 10px;">
                <el-form-item label="油罐换号"/>
            </div>
            <div class="items">
                <el-form-item label="罐号：" label-width="100px">
                    <el-select
                        v-model="listQuery.potNo"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                        @change="getList"
                    >
                        <el-option
                            v-for="item in youguanhao"
                            :key="item.id"
                            :label="item.oilcanNo"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="日期：" label-width="100px">
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
                    </el-form-item>
            </div>

            <el-table :data="list" fit highlight-current-row style="width: 90%;margin-left:30px">
                <el-table-column label="油罐" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.oilcanNo}}号</span>
                    </template>
                </el-table-column>
                <el-table-column label="旧油品" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.oldOilsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="新油品" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.newOilsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="换号体积" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.changeVolume}}升</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column>

                <!--<el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">查看
            </el-button>
          </template>
                </el-table-column>-->
            </el-table>

            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
            />
        </el-form>
    </div>
</template>

<script>
import { oilHHList, oilGuanhao } from "@/api/oil";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            value6: "",
            list: null,
            total: 0,
            form: {
                name: ""
            },

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
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                potNo: ""
            },
            dialogStatus: "",
            dialogFormVisible: false,
            youguanhao: ""
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            oilHHList(this.listQuery).then(res => {
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });

            oilGuanhao({}).then(res => {
                console.log(res);
                this.youguanhao = res.data;
            });
        },
        shijian() {
            if (this.value6) {
                console.log(this.value6);
                this.listQuery.beginAddTime = this.value6[0];
                this.listQuery.endAddTime = this.value6[1];
            } else {
                this.listQuery.beginAddTime = "";
                this.listQuery.endAddTime = "";
            }
            this.getList();
        }
    }
};
</script>

<style scoped>
@import url("./number.scss");
</style>
