<template>
    <div class="app-container dis_oil publicWarp">
        <div class="header publicHead">
            <h3>油品管理</h3>
        </div>

        <div class="main publicMain">
            <div class="publicTable thColorLight">
                <div class="plusBtn" @click="tianjia"><i class="el-icon-plus"></i></div>
                <el-table :data="list" fit highlight-current-row style="width: 100%;">
                    <el-table-column label="油品类别" min-width="110" align="left">
                        <template slot-scope="scope">
                            <span v-if="scope.row.oils_type==0">汽油</span>
                            <span v-if="scope.row.oils_type==1">柴油</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="油品ID" min-width="90" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.product_id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="油品索引" min-width="90" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.product_index }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="油品品号" min-width="130" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.oils_no_type }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="油品规格" min-width="220" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.guige }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        min-width="200px"
                    >
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleModifyStatus(scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
            />
        </div>

        

        <!-- <el-form ref="form" :model="form" label-width="100px">
            <div class="top">
                <el-form-item label="油品管理" class="yggl"/>
				<el-button type="primary" @click="tianjia">添加油品</el-button>
            </div>
            
        </el-form> -->
        <!--油品添加弹框-->
        <el-dialog
            :visible.sync="dialogFormVisible"
            :title="yptitle"
            class="gwgl_tab"
            @close="qingkuang"
            width="700px"
        >
            <el-form
                :rules="rules"
                ref="dataForm"
                :model="dyForm"
                label-position="right"
                label-width="90px"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="油品类别" prop="oils_type">
                            <el-select v-model="dyForm.oils_type" style="width: 200px" class="filter-item">
                                <el-option
                                    v-for="item in oil"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="油品ID" prop="product_id">
                            <el-input v-model="dyForm.product_id" style="width:200px;" placeholder="请输入内容"/>
                        </el-form-item>
                        <el-form-item label="油品索引" prop="product_index">
                            <el-input
                                v-model="dyForm.product_index"
                                style="width:200px;"
                                placeholder="请输入内容"
                            />
                        </el-form-item>
                        <el-form-item label="油品品号" prop="oils_no_type">
                            <el-input
                                v-model="dyForm.oils_no_type"
                                style="width:200px;"
                                placeholder="请输入内容"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            v-for="(domain, index) in dyForm.domains"
                            :key="domain.key"
                            :label="'油品规格' + (index+1)"
                            :prop="'domains.' + index + '.value'"
                            :rules="{
                          required: true, message: '不能为空', trigger: 'blur'
                        }"
                        >
                            <el-input v-model="domain.value" style="width: 200px;"></el-input>
                            <div class="removeBtn" v-if="index">
                                <i class="el-icon-error" @click.prevent="removeDomain(domain)"></i>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="plusRowBtn">
                                <i class="el-icon-circle-plus" @click="addDomain" style="cursor: pointer;"></i><span @click="addDomain">添加更多油品规格</span>
                            </div>
                        </el-form-item>

                        
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label-width="0" style="text-align: center;margin-top: 40px;">
                            <el-button style="margin:0 50px" @click="dialogFormVisible = false">取消</el-button>
                            <el-button style="margin:0 50px"
                                type="primary"
                                @click="confirm==='添加'?createData():updateData()"
                            >{{confirm}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

                
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { oilList, oilAdd, oilDetail, oilUp, oilDel } from "@/api/oil";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            list: null,
            total: 0,
            form: {
                name: ""
            },

            dyForm: {
                domains: [
                    {
                        value: ""
                    }
                ],
                dom: "",
                oils_type: "",
                product_id: "",
                product_index: "",
                oils_no_type: ""
            },
            xiugaideId: "",
            listQuery: {
                pageNum: 1,
                pageSize: 10
            },
            dialogStatus: "",
            dialogFormVisible: false,
            rules: {
                oils_type: [
                    { required: true, message: "不能为空", trigger: "change" }
                ],
                product_id: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                product_index: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                oils_no_type: [
                    { required: true, message: "不能为空", trigger: "blur" }
                ],
                dom: [{ required: true, message: "不能为空", trigger: "blur" }]
            },
            confirm: "",
            oil: [
                {
                    id: 0,
                    name: "汽油"
                },
                {
                    id: 1,
                    name: "柴油"
                }
            ],
            oilNum: [],
            yptitle: ""
        };
    },
    created() {
        this.getList();
    },
    methods: {
        removeDomain(item) {
            if (this.dyForm.domains.length > 1) {
                var index = this.dyForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dyForm.domains.splice(index, 1);
                }
            } else if ((this.dyForm.domains.length = 1)) {
                this.$notify({
                    title: "警告",
                    message: "至少一个规格",
                    type: "warning",
                    duration: 1000
                });
            }
        },
        addDomain() {
            this.dyForm.domains.push({
                value: "",
                key: Date.now()
            });
        },
        onSubmit() {
            console.log("submit!");
        },
        getList() {
            oilList(this.listQuery).then(res => {
                console.log(res);
                res.data.rows.forEach(item => {
                    let arr = [];
                    item.oilsSpecList.forEach(v => {
                        arr.push(v.specName);
                    });
                    item["guige"] = arr.join("，");
                });
                this.list = res.data.rows;
                this.total = res.data.total;
            });
        },
        handleUpdate(row) {
            let data = {
                id: row.id
            };
            this.xiugaideId = row.id;
            this.dialogFormVisible = true;
            this.yptitle = "油品修改";
            this.confirm = "修改";
            oilDetail(data).then(res => {
                console.log(res);
                this.dyForm.oils_type = res.data.oils_type;
                this.dyForm.product_id = res.data.product_id;
                this.dyForm.product_index = res.data.product_index;
                this.dyForm.oils_no_type = res.data.oils_no_type;
                this.dyForm.domains = [];
                res.data.oilsSpecList.forEach(item => {
                    let v = {
                        value: item.specName,
                        id: item.id,
                        createTime: new Date(dateH(item.createTime)),
                        creater: item.creater
                        //	      			key: Date.now()
                    };
                    this.dyForm.domains.push(v);
                });
                console.log(this.dyForm);
            });
        },
        updateData() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    let list = [];
                    if (this.dyForm.domains.length > 0) {
                        this.dyForm.domains.forEach(item => {
                            let spec = {
                                specName: item.value,
                                id: item.id,
                                createTime: item.createTime,
                                creater: item.creater
                            };
                            list.push(spec);
                        });
                    }
                    let data = {
                        id: this.xiugaideId,
                        oils_type: this.dyForm.oils_type,
                        product_id: this.dyForm.product_id,
                        product_index: this.dyForm.product_index,
                        oils_no_type: this.dyForm.oils_no_type,
                        oilsSpecList: list
                    };

                    console.log(data);
                    oilUp(data).then(res => {
                        this.$notify({
                            title: "成功",
                            message: "修改成功",
                            type: "success",
                            duration: 1000
                        });
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$refs["dataForm"].clearValidate();
                    });
                }
            });
        },
        handleModifyStatus(row) {
            this.$confirm("此操作删除该油品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let data = {
                        id: row.id
                    };
                    oilDel(data).then(res => {
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 1000
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                        duration: 1000
                    });
                });
        },
        tianjia() {
            this.dialogFormVisible = true;
            this.confirm = "添加";
            this.yptitle = "油品添加";
        },
        createData() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    let list = [];
                    if (this.dyForm.domains.length > 0) {
                        this.dyForm.domains.forEach(item => {
                            let spec = {
                                specName: item.value
                            };
                            list.push(spec);
                        });
                    }
                    let data = {
                        oils_type: this.dyForm.oils_type,
                        product_id: this.dyForm.product_id,
                        product_index: this.dyForm.product_index,
                        oils_no_type: this.dyForm.oils_no_type,
                        oilsSpecList: list
                    };

                    console.log(data);
                    oilAdd(data).then(res => {
                        this.$notify({
                            title: "成功",
                            message: "添加成功",
                            type: "success",
                            duration: 1000
                        });
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$refs["dataForm"].clearValidate();
                    }).catch((res)=>{
                        this.$notify({
                            title: "失败",
                            message: "油品已存在，不能重复添加",
                            type: "error",
                            duration: 1000
                        });
                    })
                }
            });
        },
        qingkuang() {
            this.$refs["dataForm"].clearValidate();
            this.dyForm = {
                domains: [
                    {
                        value: ""
                    }
                ],
                dom: "",
                oils_type: "",
                product_id: "",
                product_index: "",
                oils_no_type: ""
            };
        }
    }
};
</script>

<style scoped>
@import url("./oil.scss");

.publicTable >>> .el-table__header-wrapper th:last-child{padding-right: 80px;}
.publicTable >>> .el-table__row td:last-child{padding-right: 80px;}
.removeBtn{display: inline-block; width: 30px; text-align: center;}
.removeBtn i{color: #fb3333;font-size: 16px;cursor: pointer;}
.plusRowBtn{}
.plusRowBtn i{color: #598cff;font-size: 16px;position: relative;bottom: -1px;cursor: pointer;}
.plusRowBtn span{color: #598cff;margin-left: 4px;cursor: pointer;}

</style>
