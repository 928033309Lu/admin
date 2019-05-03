<template>
    <div class="app-container todo">
        <el-form ref="form" :model="form" label-width="100px">
            <div class="top" style="padding-bottom: 0;">
                <el-form-item label="待办事项"/>
            </div>
            <div class="items">
                <el-form-item label="加油站" label-width="90px">
                    <el-select
                        v-model="listQuery.importance"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in importanceOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="状态"
                    style="margin-right: 20px;margin-left: 20px;"
                    label-width="90px"
                >
                    <el-select
                        v-model="listQuery.importance"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in importanceOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="业务类型"
                    style="margin-right: 20px;margin-left: 20px;"
                    label-width="90px"
                >
                    <el-select
                        v-model="listQuery.importance"
                        clearable
                        style="min-width: 200px"
                        class="filter-item"
                    >
                        <el-option
                            v-for="item in importanceOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div class="dbriqi">
                <div class="qiri">日期:</div>
                <div class="qiris">今天</div>
                <div class="qiris">7天</div>
                <div class="qiris">14天</div>
                <div class="qiris">30天</div>
                <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                />
            </div>

            <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
            >
                <el-table-column label="业务类型" sortable="custom" align="center" min-width="120">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="业务单号" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="加油站" min-width="120" sortable="custom" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请人" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" min-width="120" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="120" sortable="custom">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center"
                    width="100"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" @click="caigoushenqing()">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"
            />
        </el-form>

        <!--商品采购待办事项-->
        <el-dialog :visible.sync="caigousq" title="商品采购申请" class="caigousq_tab">
            <el-form label-width="80" label-position="left">
                <div class="shanga">
                    <el-form-item label="采购单号：">Y231355542512</el-form-item>
                    <el-form-item label="加油站：">北京1号加油站</el-form-item>
                    <el-form-item label="状态：">待审批</el-form-item>
                    <el-form-item label="申请人：">张三</el-form-item>
                    <el-form-item label="申请时间：">2018-09-18 16:00:00</el-form-item>
                </div>

                <el-table
                    :data="list"
                    style="width: 100%;"
                    :header-cell-style="{background:'#f5f7fa'}"
                >
                    <el-table-column label="商品名称" align="center" min-width="110">
                        <template slot-scope="scope">
                            <span>哇哈哈AD钙奶</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品类别" align="center" min-width="80">
                        <template slot-scope="scope">
                            <span>奶制品</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="收货数量" align="center" min-width="90">
                        <template slot-scope="scope">
                            <span>
                                <el-input v-model="form.name" style="width:80px;"/>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" min-width="70">
                        <template slot-scope="scope">
                            <span>瓶</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="供应商" align="center" min-width="110">
                        <template slot-scope="scope">
                            <el-select
                                v-model="listQuery.importance"
                                clearable
                                style="width:100%"
                                class="filter-item"
                            >
                                <el-option
                                    v-for="item in importanceOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection" label="拒绝" width="90" align="center"></el-table-column>
                </el-table>
                <div class="jujue">拒绝</div>
                <div class="heji">
                    <el-form-item label="进价查询：" class="shul" label-width="95">
                        <el-input placeholder="三统石油7.2元"></el-input>
                    </el-form-item>

                    <el-form-item label="备注：" class="beizhu" label-width="95">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                        ></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="caigousq = false">取消</el-button>
                <el-button type="danger">拒绝</el-button>
                <el-button type="primary" >确认</el-button>
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
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            value6: "",
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
            caigousq: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                this.total = response.data.total;
                const items = response.data.items;

                this.list = items.map(v => {
                    this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
                    v.originalTitle = v.title; //  will be used when user click the cancel botton
                    return v;
                });

                setTimeout(() => {
                    this.listLoading = false;
                }, 1 * 1000);
            });
        },
        caigoushenqing() {
            this.caigousq = true;
        }
    }
};
</script>

<style scoped>
@import url("./todo.scss");
</style>
