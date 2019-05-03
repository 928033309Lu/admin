<template>
  <div class="warp app-container oil-business">
    <div class="header">
      <h3>
        <el-button circle @click="prev">
          <i class="el-icon-arrow-left"></i>
        </el-button>油品调拨详情
      </h3>
    </div>
    <div class="main ">
      <el-form label-width="110" label-position="left">
        <div class="mian_ord">
          <div class="shang guan">
            <div class="title" style="width: 100%;">
              <div style="width: 100%;font-weight: bold;color: red;font-size: 15px;">调拨单信息：</div>
            </div>
            <el-form-item label="调拨单号：">{{dbzhuxinxi.orderNumber}}</el-form-item>
            <el-form-item label="状态：">
              <span v-if="dbzhuxinxi.status==1">未出库</span>
              <span v-if="dbzhuxinxi.status==2">运输中</span>
              <span v-if="dbzhuxinxi.status==6">已完成</span>
            </el-form-item>
            <el-form-item v-show="a==1" label="调出油站：">{{dbzhuxinxi.outOilsStationName}}</el-form-item>
            <el-form-item v-show="a==1" label="调入油站：">{{dbzhuxinxi.oilsStationName}}</el-form-item>
            <el-form-item v-show="a==2" label="调出油站：">{{dbzhuxinxi.oilsStationName}}</el-form-item>
            <el-form-item v-show="a==2" label="调入油站：">{{dbzhuxinxi.inputOilsStationName}}</el-form-item>
            <el-form-item label="油品：">{{dbzhuxinxi.oilsName}}</el-form-item>
            <el-form-item label="调出体积：">{{dbzhuxinxi.planCount}}升</el-form-item>
            <el-form-item
              label="调入体积："
              v-if="dbzhuxinxi.status==6"
            >{{dbzhuxinxi.oilsOrderRecord.actualVolume}}</el-form-item>
            <el-form-item
              label="损耗体积："
              v-if="dbzhuxinxi.status==6"
            >{{dbzhuxinxi.oilsOrderRecord.lossVolume}}升</el-form-item>
            <el-form-item
              label="出库时间："
            >{{dbzhuxinxi.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
            <el-form-item
              label="入库时间："
              v-if="dbzhuxinxi.status==6"
            >{{dbzhuxinxi.oilsOrderRecord.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</el-form-item>
          </div>

          <div class="xinxi" style="padding-top: 15px;" v-if="dbzhuxinxi.status==6">
            <div class="guan" v-for="(item,index) in tableData4">
              <div class="title">
                <div
                  style="width: 100%;font-weight: bold;color: red;font-size: 15px;padding: 0;"
                  v-if="a==2"
                >出库详情：</div>
                <div
                  style="width: 100%;font-weight: bold;color: red;font-size: 15px;padding: 0;"
                  v-if="a==1"
                >入库详情：</div>
                <!--<div>营业日：2018-09-19 17:00:00</div>
                <div>班次：123456</div>-->
              </div>
              <ul style="margin: 0;padding: 0;">
                <li v-for="v in item" style="padding-top: 20px;">
                  <div class="title">
                    <div>开始时间：{{v[0].kaishi | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
                    <div>结束时间：{{v[0].jieshu | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</div>
                  </div>
                  <div style="border-top: 1px solid #e6e9ee;">
                    <el-table :data="v" fit style="width: 100%" :span-method="arraySpanMethod">
                      <el-table-column prop="date" :label="v[0]['guanhao']" align="center"></el-table-column>
                      <el-table-column label="液位仪" align="center">
                        <el-table-column prop="yougao" label="油高mm" align="center"></el-table-column>
                        <el-table-column prop="shuigao" label="水高mm" align="center"></el-table-column>
                        <el-table-column prop="wendu" label="温度℃" align="center"></el-table-column>
                        <el-table-column prop="midu" label="密度kg/m³" align="center"></el-table-column>
                        <el-table-column prop="youtiji" label="油体积L" align="center"></el-table-column>
                        <el-table-column prop="bztiji" label="标准体积L" align="center"></el-table-column>
                      </el-table-column>
                      <el-table-column prop="bztijiL" label="标准体积L" align="center"></el-table-column>
                      <el-table-column prop="zhongliang" label="重量kg" align="center"></el-table-column>
                    </el-table>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="youpintank = false">关闭</el-button>
      </div>-->
    </div>
  </div>
</template>

<script>
import { comYouzhanList, oilShen, oilDingXiu } from "@/api/shuju";
import {
    oilsBusList,
    oilList,
    oilDBDetail,
    oilHHDetail,
    oilDGDetail,
    oilDBRuKu
} from "@/api/oil";
import { shanghuList } from "@/api/shanghu";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            a:null,
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
                            <span v-if="dbzhuxinxi.status==1">未出库</span>;
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

            tableData3: [],
            tableData4: [],
            tableData5: [],

            list: null,
            total: 0,
            value6: "",
            youzhan: [],
            zhuangtai: [
                {
                    id: [5],
                    name: "未收油"
                },
                {
                    id: [0],
                    name: "未倒罐"
                },
                {
                    id: [1],
                    name: "未出库"
                },
                {
                    id: [2],
                    name: "运输中"
                },
                {
                    id: [6],
                    name: "已完成"
                }
            ],
            yewu: [
                {
                    id: 1,
                    name: "油品采购"
                },
                {
                    id: 2,
                    name: "油品调拨"
                },
                {
                    id: 3,
                    name: "油品倒罐"
                },
                {
                    id: 4,
                    name: "油品换号"
                }
            ],
            status: "",
            form: {
                name: ""
            },

            listQuery: {
                pageNum: 1,
                pageSize: 10,
                companyId: "",
                stationId: "",
                typeId: "",
                orderNumber: "",
                oilsId: "",
                statusList: [],
                cgStatusList: [5, 6],
                dbStatusList: [1, 2, 6],
                dgStatusList: [0, 6],
                hhStatusList: [6],
                beginTime: "",
                endTime: ""
            },
            caigousq: false,
            supOilstation: [],
            suppli: [],
            oil: [],

            youpinhuan: false,
            youpindao: false,
            youpintank: false,

            //-------------------------------------油品详情

            shangpintank: false,
            zhuxinxi: {},
            youchuku: {},
            youyunshu: {},
            youshouyou: {},
            youguige: {},
            youbuzhou: [],
            guanchexinxi: {},
            OrderRecord:{},

            //----------------------油品调拨详情

            dbzhuxinxi: {},
            hhxinxi: {},
            dgzhuxinxi: {},
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
            }
        };
    },
    created() {
        // this.getshanghu();
        // this.getList();
        this.dbDetail()
    },
    methods: {
        getList() {
            oilsBusList(this.listQuery).then(res => {
                console.log('列表');
                console.log(res);
                this.list = res.data.rows;
                this.total = res.data.total;
            });
        },
        getshanghu() {
            shanghuList({}).then(res => {
                console.log('公司');
                console.log(res);
                this.suppli = res.data;
            });
            oilList({}).then(res => {
                this.oil = res.data;
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
            this.getList();
        },
        selyouzhan(val) {
			this.supOilstation=[];
            this.listQuery.stationId = "";
			if (val) {
				let data = {
					companyId: val
				};
				comYouzhanList(data).then(res => {
					console.log(res);
					this.supOilstation = res.data;
				});
			}
            console.log(this.listQuery);
            this.getList();
        },
        zhuangtaiX() {
            if (this.status == "") {
                this.listQuery.cgStatusList = [5, 6];
                this.listQuery.dbStatusList = [1, 2, 6];
                this.listQuery.dgStatusList = [0, 6];
                this.listQuery.hhStatusList = [6];
                this.listQuery.statusList = [];
                //					this.listQuery.typeId="";
            } else {
                console.log(this.status);
                if (this.status[0] == 5) {
                    this.listQuery.typeId = 1;
                } else if (this.status[0] == 0) {
                    this.listQuery.typeId = 3;
                } else if (this.status[0] == 1) {
                    this.listQuery.typeId = 2;
                } else if (this.status[0] == 2) {
                    this.listQuery.typeId = 2;
                } else if (this.status[0] == 6) {
                    //	    			this.listQuery.typeId="";
                }
                this.listQuery.statusList = this.status;
                /*delete this.listQuery["cgStatusList"]
	    		delete this.listQuery["dbStatusList"]
	    		delete this.listQuery["dgStatusList"]
	    		delete this.listQuery["hhStatusList"]*/
            }
            console.log(this.listQuery);
            this.getList();
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

        cgDetail(row) {
            let data = {
                id: row.id
            };
            oilDingXiu(data).then(res => {
                console.log(res);
                this.zhuxinxi = res.data.oilsPurchaseApplyInfo;
                this.youbuzhou = res.data.oilsOrderLogInfoList;
				this.OrderRecord=res.data.oilsOrderRecordInfo                
                if (
                    res.data.oilsPurchaseApplyInfo.status == 5 ||
                    res.data.oilsPurchaseApplyInfo.status == 6
                ) {
                    this.youchuku = res.data.oilsPurchaseOutputInfo;
                    this.youyunshu = res.data.oilsPurchaseTransportInfo;
                    this.youguige = res.data.oilsPurchaseApplySupplierInfo;
                }

                if (res.data.oilsPurchaseApplyInfo.status == 6) {
                    this.guanchexinxi = res.data.oilCarMeasureInfo;
                    this.youshouyou = res.data.oilsOrderRecordInfo;
                    this.youguanshuju = res.data.oilsFlowInfos;
                    console.log(this.youguanshuju);

                    this.tableData3 = [];
                    res.data.oilsFlowInfos[0].forEach(item => {
                        let data = [
                            {
                                date: "卸前数据",
                                guanhao: "",
                                yougao: "",
                                shuigao: "",
                                wendu: "",
                                midu: "",
                                youtiji: "",
                                bztiji: "",
                                bztijiL: "",
                                zhongliang: "",
                                kaishi: "",
                                jieshu: ""
                            },
                            {
                                date: "卸后数据",
                                yougao: "",
                                shuigao: "",
                                wendu: "",
                                midu: "",
                                youtiji: "",
                                bztiji: "",
                                bztijiL: "",
                                zhongliang: ""
                            },
                            {
                                date: "收油体积",
                                yougao: "",
                                wendu: "收油重量",
                                midu: "",
                                bztiji: "期间加油",
                                bztijiL: ""
                            }
                        ];
                        data[0].guanhao = eval(item.oilcanNo) + "号罐";
                        data[0].yougao = item.frontOilHigh;
                        data[0].shuigao = item.frontWaterHigh;
                        data[0].wendu = item.frontTemperature;
                        data[0].midu = item.frontDensity;
                        data[0].youtiji = item.frontOilVolume;
                        data[0].bztiji = item.frontManualVolume;
                        data[0].bztijiL = item.frontStandardVolume;
                        data[0].zhongliang = item.frontWeight;

                        data[0].kaishi = item.createTime;
                        data[0].jieshu = item.modifyTime;

                        data[1].yougao = item.afterOilHigh;
                        data[1].shuigao = item.afterWaterHigh;
                        data[1].wendu = item.afterTemperature;
                        data[1].midu = item.afterDensity;
                        data[1].youtiji = item.afterOilVolume;
                        data[1].bztiji = item.afterManualVolume;
                        data[1].bztijiL = item.afterStandardVolume;
                        data[1].zhongliang = item.afterWeight;

                        data[2].yougao = item.actualVolume;
                        data[2].midu = item.afterWeight;
                        data[2].bztijiL = item.periodOilVolume;
                        this.tableData3.push(data);
                    });
                    console.log(this.tableData3);
                }
                this.shangpintank = true;
            });
        },

        dbDetail() {
            let data = {
                id: this.$route.query.id
            };
            this.a = this.$route.query.a
            if (this.$route.query.a==1) {
                // 调拨入库
                oilDBRuKu(data).then(res => {
                    console.log('详情')
                    console.log(res.data);
                    this.dbzhuxinxi = res.data;
                    if (res.data.status == 6) {
                        this.tableData4 = [];
                        let shuzu = [];
                        res.data.oilsFlowInfos.forEach((v, index) => {
                            shuzu = [];
                            v.forEach(item => {
                                let data = [
                                    {
                                        date: "操作前数据",
                                        guanhao: "",
                                        yougao: "",
                                        shuigao: "",
                                        wendu: "",
                                        midu: "",
                                        youtiji: "",
                                        bztiji: "",
                                        bztijiL: "",
                                        zhongliang: "",
                                        kaishi: "",
                                        jieshu: ""
                                    },
                                    {
                                        date: "操作后数据",
                                        yougao: "",
                                        shuigao: "",
                                        wendu: "",
                                        midu: "",
                                        youtiji: "",
                                        bztiji: "",
                                        bztijiL: "",
                                        zhongliang: ""
                                    },
                                    {
                                        date: "操作油体积",
                                        yougao: "",
                                        bztiji: "期间加油",
                                        bztijiL: ""
                                    }
                                ];
                                data[0].guanhao = eval(item.oilcanNo) + "号罐";
                                data[0].yougao = item.frontOilHigh;
                                data[0].shuigao = item.frontWaterHigh;
                                data[0].wendu = item.frontTemperature;
                                data[0].midu = item.frontDensity;
                                data[0].youtiji = item.frontOilVolume;
                                data[0].bztiji = item.frontManualVolume;
                                data[0].bztijiL = item.frontStandardVolume;
                                data[0].zhongliang = item.frontWeight;

                                data[1].yougao = item.afterOilHigh;
                                data[1].shuigao = item.afterWaterHigh;
                                data[1].wendu = item.afterTemperature;
                                data[1].midu = item.afterDensity;
                                data[1].youtiji = item.afterOilVolume;
                                data[1].bztiji = item.afterManualVolume;
                                data[1].bztijiL = item.afterStandardVolume;
                                data[1].zhongliang = item.afterWeight;

                                data[2].yougao = item.actualVolume;
                                data[2].bztijiL = item.periodOilVolume;

                                data[0].kaishi = item.createTime;
                                data[0].jieshu = item.modifyTime;
                                shuzu.push(data);
                            });
                            this.tableData4.push(shuzu);
                        });
                    }
                    console.log(this.tableData4);
                    this.youpintank = true;
                });
            }else{
                oilDBDetail(data).then(res => {
                    console.log('详情')
                    console.log(res.data);
                    this.dbzhuxinxi = res.data;
                    if (res.data.status == 6) {
                        this.tableData4 = [];
                        let shuzu = [];
                        res.data.oilsFlowInfos.forEach((v, index) => {
                            shuzu = [];
                            v.forEach(item => {
                                let data = [
                                    {
                                        date: "操作前数据",
                                        guanhao: "",
                                        yougao: "",
                                        shuigao: "",
                                        wendu: "",
                                        midu: "",
                                        youtiji: "",
                                        bztiji: "",
                                        bztijiL: "",
                                        zhongliang: "",
                                        kaishi: "",
                                        jieshu: ""
                                    },
                                    {
                                        date: "操作后数据",
                                        yougao: "",
                                        shuigao: "",
                                        wendu: "",
                                        midu: "",
                                        youtiji: "",
                                        bztiji: "",
                                        bztijiL: "",
                                        zhongliang: ""
                                    },
                                    {
                                        date: "操作油体积",
                                        yougao: "",
                                        bztiji: "期间加油",
                                        bztijiL: ""
                                    }
                                ];
                                data[0].guanhao = eval(item.oilcanNo) + "号罐";
                                data[0].yougao = item.frontOilHigh;
                                data[0].shuigao = item.frontWaterHigh;
                                data[0].wendu = item.frontTemperature;
                                data[0].midu = item.frontDensity;
                                data[0].youtiji = item.frontOilVolume;
                                data[0].bztiji = item.frontManualVolume;
                                data[0].bztijiL = item.frontStandardVolume;
                                data[0].zhongliang = item.frontWeight;

                                data[1].yougao = item.afterOilHigh;
                                data[1].shuigao = item.afterWaterHigh;
                                data[1].wendu = item.afterTemperature;
                                data[1].midu = item.afterDensity;
                                data[1].youtiji = item.afterOilVolume;
                                data[1].bztiji = item.afterManualVolume;
                                data[1].bztijiL = item.afterStandardVolume;
                                data[1].zhongliang = item.afterWeight;

                                data[2].yougao = item.actualVolume;
                                data[2].bztijiL = item.periodOilVolume;

                                data[0].kaishi = item.createTime;
                                data[0].jieshu = item.modifyTime;
                                shuzu.push(data);
                            });
                            this.tableData4.push(shuzu);
                        });
                    }
                    console.log(this.tableData4);
                    this.youpintank = true;
                });
            }
        },

        hhDetail(row) {
            let data = {
                id: row.id
            };
            oilHHDetail(data).then(res => {
                console.log(res);
                this.hhxinxi = res.data;
                this.youpinhuan = true;
            });
        },
        //返回上一页
        prev() {
            this.$router.go(-1);
        },
        dgDetail(row) {
            let data = {
                id: row.id
            };
            oilDGDetail(data).then(res => {
                this.dgzhuxinxi = res.data;
                console.log(res);
                if (res.data.status == 6) {
                    this.dgzhuxinxi["actualVolume"] =
                        res.data.oilsOrderRecord.actualVolume;
                    this.dgzhuxinxi["lossVolume"] =
                        res.data.oilsOrderRecord.lossVolume;
                    this.tableData5 = [];
                    let shuzu = [];
                    res.data.oilsFlowInfos.forEach((v, index) => {
                        shuzu = [];
                        v.forEach(item => {
                            let data = [
                                {
                                    date: "倒前数据",
                                    guanhao: "",
                                    yougao: "",
                                    shuigao: "",
                                    wendu: "",
                                    midu: "",
                                    youtiji: "",
                                    bztiji: "",
                                    bztijiL: "",
                                    zhongliang: "",
                                    kaishi: "",
                                    jieshu: ""
                                },
                                {
                                    date: "倒后数据",
                                    yougao: "",
                                    shuigao: "",
                                    wendu: "",
                                    midu: "",
                                    youtiji: "",
                                    bztiji: "",
                                    bztijiL: "",
                                    zhongliang: ""
                                },
                                {
                                    date: "操作体积",
                                    yougao: "",
                                    wendu: "",
                                    midu: "",
                                    bztiji: "期间加油",
                                    bztijiL: "0"
                                }
                            ];
                            data[0].guanhao = eval(item.oilcanNo) + "号罐";
                            data[0].yougao = item.frontOilHigh;
                            data[0].shuigao = item.frontWaterHigh;
                            data[0].wendu = item.frontTemperature;
                            data[0].midu = item.frontDensity;
                            data[0].youtiji = item.frontOilVolume;
                            data[0].bztiji = item.frontManualVolume;
                            data[0].bztijiL = item.frontStandardVolume;
                            data[0].zhongliang = item.frontWeight;

                            data[1].yougao = item.afterOilHigh;
                            data[1].shuigao = item.afterWaterHigh;
                            data[1].wendu = item.afterTemperature;
                            data[1].midu = item.afterDensity;
                            data[1].youtiji = item.afterOilVolume;
                            data[1].bztiji = item.afterManualVolume;
                            data[1].bztijiL = item.afterStandardVolume;
                            data[1].zhongliang = item.afterWeight;

                            data[2].yougao = item.actualVolume;
                            data[2].bztijiL = item.periodOilVolume;

                            data[0].kaishi = item.createTime;
                            data[0].jieshu = item.modifyTime;
                            shuzu.push(data);
                        });
                        this.tableData5.push(shuzu);
                    });
                }

                console.log(this.tableData5);
                this.youpindao = true;
            });
        }
    }
};
</script>
<style scoped>
@import url("../data-management/oil-business.scss");
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
    background-color: #f6f7fb;
    /* padding: 2%; */
}
.main {
    min-height: calc(100vh - 181px);
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding-top: 30px;
}
.header {
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    height: 60px;
    padding-left: 1%;
}
.header h3 {
    line-height: 60px;
    margin: 0;
}
.shang,.xinxi{
    padding: 0 10px;
}
</style>
<style scoped>
h3 .el-button--medium.is-circle {
    border: 0;
}
</style>

