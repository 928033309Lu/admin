<template>
  <div class="warp">
    <div class="header">
      <h3>
        <span></span>日志记录
      </h3>
    </div>
    <div class="main">
      <div class="top">
        <div class="box">
          <span>加油站</span>
          <el-select @change="change" clearable v-model="station" placeholder="请选择">
            <el-option
              v-for="item in stationOptions"
              :key="item.id"
              :label="item.station_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="box">
          <span>状态</span>
          <el-select v-model="zhuangtaixuanze" clearable @change="fenLeiChange" placeholder="请选择">
            <el-option
              v-for="item in zhuangtai"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="box">
          <el-button type="primary" @click="jiluVisible = true">日志录入</el-button>
        </div>
      </div>
      <div class="date">
        <span>时间：</span>
        <el-button type="text" @click="jintian">今天</el-button>
        <el-button type="text" @click="qitian">7天</el-button>
        <el-button type="text" @click="shisitian">14天</el-button>
        <el-button type="text" @click="sanshi">30天</el-button>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        ></el-date-picker>
        <div class="dao">
          <!-- <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">{{ $t('excel.export') }}</el-button> -->
          <el-button type="primary" @click="chaxun">查询</el-button>
        </div>
      </div>
      <div class="biao">
        <div class="table">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="riqi" label="日期" align="center" min-width="110"></el-table-column>
            <el-table-column prop="youzhan" label="油站" align="center"></el-table-column>
            <el-table-column prop="zhuti" label="星期" align="center"></el-table-column>
            <el-table-column prop="zhanjingli" label="天气" align="center" width="200"></el-table-column>
            <el-table-column prop="zhuangtai" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button type="primary" @click="jiluVisible = true">编辑</el-button>
                <el-button type="primary" @click="jiluVisible = true">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog :visible.sync="jiluVisible" title="日志录入" width="90%">
        <div class="dbox">
          <div class="box">
            <span>加油站</span>
            <el-select @change="change" v-model="station" clearable placeholder="请选择">
              <el-option
                v-for="item in stationOptions"
                :key="item.id"
                :label="item.station_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="box">
            <span>录入人</span>
            <el-input placeholder="请输入内容"></el-input>
          </div>
          <div class="box">
            <span>状态</span>
            <el-select v-model="zhuangtaixuanze" clearable @change="fenLeiChange" placeholder="请选择">
              <el-option
                v-for="item in zhuangtai"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="dbox">
          <div class="box">
            <span>录入日期</span>
            <el-date-picker v-model="value1" type="date" clearable placeholder="选择日期"></el-date-picker>
          </div>
          <div class="box">
            <span>天气</span>
            <el-input placeholder="请输入内容"></el-input>
          </div>
          <div class="box">
            <span>星期</span>
            <el-input placeholder="请输入内容"></el-input>
          </div>
        </div>

        <div class="neirong">
          <span>安全及设备运行</span>

          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>

        <div class="neirong">
          <span>现场服务</span>

          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>

        <div class="neirong">
          <span>站姿站貌</span>

          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
         <div class="neirong">
          <span>员工状况</span>

          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
         <div class="neirong">
          <span>其他事项</span>

          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>

        <div class="anniu">
          <el-button type="primary" @click="jiluVisible = false">保存</el-button>
          <el-button type="primary" @click="jiluVisible = false">提交</el-button>
          <el-button type="primary" @click="jiluVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { youStorageGrouplist } from "@/api/youpinbaobiao";
import { parseTime } from "@/utils";
import { youpinlist } from "@/api/youpinbaobiao";
import { getCompanyByWhere } from "@/api/youpinbaobiao";
import { StationList } from "@/api/youpinbaobiao";
import { report } from "@/api/youpinbaobiao";
export default {
  data() {
    return {
      company: "", //公司
      companyOptions: [{}], //公司选择
      station: "", //公司
      stationOptions: [{}], //油站选择
      oilsId: "", //油品id
      oilsList: [], //油品列表
      date: "", //日期
      leixing: "", //类型
      jiluVisible: false,
      radio: "",
      leixingOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "会议"
        },
        {
          value: 2,
          label: "活动"
        },
        {
          value: 3,
          label: "培训"
        },
        {
          value: 4,
          label: "日常学习"
        },
        {
          value: 5,
          label: "预案演练"
        }
      ],
      tableData1: [
        {
          riqi: "2019-01-07",
          youzhan: "北京一号加油站",
          zhuti: "星期一",
          zhanjingli: "阴",
          leixing: "培训",
          zhuangtai: "草稿"
        }
      ], //表格数据
      zhuangtai: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "草稿"
        },
        {
          value: 2,
          label: "已提交"
        }
      ], //品号
      zhuangtaixuanze: "", //品号选择
      listSub: [], //
      list: [], //
      searchKey: "" //搜索关键字
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.listLoading = true;
      var data = {
        showType: this.fangshixuanze
      };
      console.log(data);
      report(data).then(response => {
        console.log(response.data);
        if (this.fangshixuanze == 1) {
          this.list = response.data.list;
          this.listSub = response.data.listSub;
        } else {
          this.tableData = response.data.list;
        }
        this.listLoading = false;
      });
      var a = {};
      youpinlist(a).then(response => {
        // console.log(response.data)
        this.oilsList = response.data;
      });
      getCompanyByWhere(a).then(response => {
        // console.log(response.data)
        this.companyOptions = response.data;
      });
    },
    change() {
      var data = {
        companyId: this.company
      };
      StationList(data).then(response => {
        console.log(response.data);
        this.stationOptions = response.data;
      });
    },
    fenLeiChange() {
      this.searchKey = "";
      var data = {
        showType: this.fangshixuanze
      };
      console.log(data);
      report(data).then(response => {
        console.log(response.data);
        if (this.fangshixuanze == 1) {
          this.list = response.data.list;
          this.listSub = response.data.listSub;
        } else {
          this.tableData = response.data.list;
        }

        this.listLoading = false;
      });
    },
    //今天
    jintian() {
      this.date = [
        new Date(new Date(new Date().toLocaleDateString()).getTime()),
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        )
      ];
    },
    qitian() {
      this.date = [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
        new Date()
      ];
    },
    shisitian() {
      this.date = [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 14),
        new Date()
      ];
    },
    sanshi() {
      this.date = [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
        new Date()
      ];
    },
    chaxun() {
      this.listLoading = true;
      if (this.date == null) {
        this.date = [];
      }
      var data = {
        companyId: this.company,
        stationId: this.station,
        oilsId: this.oilsId,
        startTime: this.date[0],
        endTime: this.date[1],
        showType: this.fangshixuanze,
        searchKey: this.searchKey
      };
      report(data).then(response => {
        console.log(response.data);
        if (this.fangshixuanze == 1) {
          this.list = response.data.list;
          this.listSub = response.data.listSub;
        } else {
          this.tableData = response.data.list;
        }
        this.listLoading = false;
      });
    },
    formatDate(row, column) {
      const now = new Date(row[column.property]);
      console.log(now);
      if (now != "Invalid Date") {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second =
          now.getSeconds() > 10 ? now.getSeconds() : "0" + now.getSeconds();
        return (
          year +
          "-" +
          month +
          "-" +
          date +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second
        );
      } else {
        return "";
      }
    },
    // 表格合并行与列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: this.tableData.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
  background-color: #f6f7fb;
}
.main {
  min-height: calc(100vh - 191px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #f6f7fb;
}
.header h3 {
  display: inline-block;
  width: 500px;
  line-height: 60px;
  margin: 0;
}
.header h3 span {
  display: inline-block;
  width: 3px;
  height: 25px;
  vertical-align: middle;
  background-color: #5b8dff;
  margin-right: 5px;
}
.top {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.date {
  padding: 0 10px;
}
.date > .el-button {
  margin-right: 20px;
  font-size: 14px;
  line-height: 36px;
  color: black;
}
.date > .el-button:focus {
  color: #409eff;
}
.xuan span {
  font-size: 14px;
  line-height: 36px;
}
.date,
.xuan {
  margin-bottom: 10px;
}
.xuan .el-select:nth-of-type(1) {
  margin-right: 20px;
}
p {
  font-size: 14px;
}
.biao {
  padding: 10px 20px;
  text-align: center;
}
.table {
  border: 1px solid #ededed;
  border-bottom: 0;
  margin-top: 10px;
}
.dao {
  display: inline-block;
}
.dbox {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.dbox .box {
  width: 25%;
}
.dbox .el-input {
  width: 80%;
}
.riqi {
  margin-top: 20px;
}
.leixing {
  margin-top: 20px;
}
.leixing .el-input {
  width: 90%;
  margin-left: 20px;
}
.zhuti {
  margin-top: 20px;
}
.zhuti .el-input {
  width: 90%;
  margin-left: 50px;
}
.neirong {
  margin-top: 20px;
}
.neirong span {
  vertical-align: top;
}
.neirong .el-textarea {
  width: 90%;
  margin-left: 50px;
}
.anniu {
  margin-top: 20px;
}
.anniu .el-button {
  margin-left: 20%;
}
.el-radio-group {
  margin-left: 50px;
}
</style>
<style scoped>
.el-input--medium .el-input__inner,
.el-textarea__inner,
.el-input__inner,
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table th {
  background-color: #f5f9fc;
}
h3 .el-button--medium.is-circle {
  border: 0;
}
.el-table_1_column_1,
.el-table_1_column_2,
.el-table__footer .el-table_1_column_1,
.el-table__footer .el-table_1_column_2,
.el-table__footer .el-table_1_column_3,
.el-table thead.is-group th {
  background-color: #f5f9fc;
}
.el-table__footer-wrapper tbody td,
.el-table__header-wrapper tbody td {
  background-color: #fff;
}
</style>