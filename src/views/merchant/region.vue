<template>
    <div class="app-container region">
        
        <el-form ref="form" :model="form" label-width="110px">
            <div class="top">
                <el-form-item label="油站分布" style="margin-bottom: 0;"/>
            </div>
            <div class="map">
                <el-amap
                    vid="amapDemo"  
                    :center="center"
                    :zoom="zoom"
                    class="amap-demo">
                    <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :vid="index" :content="marker.content"></el-amap-marker>
                </el-amap>
            </div>
            <div class="top">
                <el-form-item label="商户排名" style="margin-bottom: 0;"/>
            </div>
            <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="suppli"
                fit
                highlight-current-row
                style="width: 100%;border-top: 30px solid #f6f7fb;"
                @sort-change="sortChange"
            >
                <el-table-column label="商户名称" align="center" min-width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.company_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="油站数量" min-width="100" sortable="custom" align="center" prop="station_num">
                    <template slot-scope="scope">
                        <span>{{ scope.row.station_num }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="运营数量" min-width="90" align="center" sortable="custom" prop="open_num">
                    <template slot-scope="scope">
                        <span>{{ scope.row.open_num }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="60" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="法人" min-width="110" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.corporation }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="联系方式" min-width="120" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.telephone }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="see(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination
                :total="total"
                :page.sync="listQuery.pageNum"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
                :autoScroll="false"
            />
        </el-form>
        <el-dialog :visible.sync="chakan" title="商户详情" width="900px">
            <el-form label-position="right" label-width="100px" style="padding-top: 0;">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="商户名称">
                            <span>{{ chakanInfo.company_name }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="法人">
                            <span>{{ chakanInfo.corporation }}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <span>{{ chakanInfo.phone }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table
            :data="seeSuppli"
            fit
            highlight-current-row
            style="width: 95%;margin: auto;border-top: 30px solid #f6f7fb;">
                <el-table-column label="加油站名称" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.fullName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="油站电话">
                    <template slot-scope="scope">
                        <span>{{ scope.row.telphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="油站地址">
                    <template slot-scope="scope">
                        <span>{{ scope.row.province_name + scope.row.city_name + scope.row.regoin_name }}</span>
                    </template>
                </el-table-column>
            </el-table>
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
import { youzhanAllList } from '@/api/shuju'
import VueAMap from 'vue-amap';
import { shanghuList, xiangqing } from "@/api/shanghu";

export default {
    components: { Pagination },
    data() {
        return {
            list: null,
            tableKey: 0,
            listLoading: true,
            total: 0,
            chakan: false,
            seeSuppli: [],
            chakanInfo:{
                company_name:'',
                corporation:'',
                phone:'',
            },
            form: {
                name: ""
            },
            listQuery: {
                pageNum: 1,
                pageSize: 10,
				status: 1,
                orderByCol: undefined,
                orderByType: undefined,
            },
            textMap: {
                update: "Edit",
                create: "Create"
            },
            temp: {
                id: undefined,
                importance: 1,
                remark: "",
                timestamp: new Date(),
                title: "",
                type: "",
                status: "published"
            },
            dialogStatus: "",
            dialogFormVisible: false,
            zoom: 4,
            center:[107.40569,38.249054],
            markers: [],
            suppli:[]
        };
    },
    created() {
        this.getList();
        let self = this;
        let markers = [];
        let index = 0;
        let basePosition = [121.59996, 31.197646];
        let num = 10;

        youzhanAllList({}).then(res=>{
            res.data.forEach((item)=>{
                markers.push({
                    position: [item.longitude, item.latitude],
                    content: item.shortName
                });
            })
            this.markers = markers;
        })
        
    },
    mounted() {
        
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        see(row) {
            this.chakan = true
            this.chakanInfo = row
            youzhanAllList({companyId:row.id}).then(res=>{
                this.seeSuppli = res.data
            })
        },
        getList() {
            this.listLoading = true;

            shanghuList(this.listQuery).then(res => {
                console.log(res);
                this.suppli = res.data.rows;
                this.total = res.data.total;
                this.listLoading = false;
            });

            // fetchList(this.listQuery).then(response => {
            //     this.list = response.data.items;
            //     this.total = response.data.total;

            //     setTimeout(() => {
            //         this.listLoading = false;
            //     }, 1 * 1000);
            // });
        },
        sortChange(res) {
            console.log(res.prop)
            console.log(res.order)
            this.listQuery.orderByCol = res.prop
            this.listQuery.orderByType = res.order == 'ascending' ? 'ASC' : 'DESC'
            this.getList()
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        }
    },
    watch:{
        chakan:function(val){
            if(!val){
                this.seeSuppli = []
            }
        }
    }
};
</script>

<style scoped>
@import url("./region.scss");
.map >>> .amap-marker-content{background: #bb0000;border-radius: 3px;color: #fff;font-size: 11px;padding: 3px;padding-bottom: 2px;position: relative;border:1px solid #8a0000;}
.map >>> .amap-marker-content:after{content:'';position: absolute;display: block;width: 0;height: 0;border:4px solid rgba(0,0,0,0);border-top-color: #bb0000;bottom: -8px;left: 8px;}
</style>
