<template>
<div>
  <div class="warp">
    <div class="header">
      <h3>
        <el-button circle @click="prev">
          <i class="el-icon-arrow-left"></i>
        </el-button>商品进销存报表
      </h3>
      <div class="btn">
        <el-button type="primary" @click="exportTable">导出</el-button>
        <el-button type="primary" @click="dayin">打印</el-button>
      </div>
    </div>
    <div class="main" id="test">
      <div class="top">
        <div class="box">
          <div class="block">加油站：{{information.stationName}}</div>
          <div class="block">营业日：{{information.businessDate}}</div>
        </div>
        <div class="box">
          <div class="block">开班时间：{{information.createDate}}</div>
          <div class="block">班结时间：{{information.modifyDate}}</div>
        </div>
        <div class="box">
          <div class="block">班结编号：{{information.id}}</div>
        </div>
      </div>
      <div class="biao">
        <div class="table">
          <el-table
          :data="tableData"
          style="width: 100%">
            <el-table-column
              prop="bigTypeName"
              align="center"
              label="商品大类">
            </el-table-column>
            <!-- <el-table-column
              prop="barCode"
              align="center"
              label="商品条码">
            </el-table-column> -->
            <el-table-column
              prop="goodsName"
              align="center"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="goodsInitialCount"
              align="center"
              label="期初数量">
            </el-table-column>
            <el-table-column label="商品入库" align="center">
              <el-table-column
                prop="enterhousePurchase"
                label="采购"
                align="center">
              </el-table-column>
              <el-table-column
                prop="enterhouseAllocation"
                label="调拨"
                align="center">
              </el-table-column>
            </el-table-column>
            <el-table-column label="商品出库" align="center">
                <el-table-column
                    prop="outrhouseAllocation"
                    label="调拨"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="outrhouseRefunds"
                    label="退货"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="outrhouseAbandon"
                    label="报废"
                    align="center">
                </el-table-column>
            </el-table-column>
            <el-table-column
              prop="sales"
              align="center"
              label="销售">
            </el-table-column>
            <el-table-column
              prop="salesRefunds"
              align="center"
              label="销售退货">
            </el-table-column>
            <el-table-column
              prop="goodsFinalCount"
              align="center"
              label="期末数量">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { detail } from "@/api/shuju";
import { storageList } from "@/api/youpinbaobiao";
import { handleDownload } from '@/utils'

  export default {
    data(){
      return {
        tableData:[],
        information:{
          stationName:null,
        }, //基本信息
      }
    },
    mounted() {
      this.get();
    },
    methods:{
      
      get(){
        var id = this.$route.query.id;
        var data = {
          shiftId:id
        }
        storageList(data)
          .then(response => {
            console.log(response.data)
            this.tableData = response.data
          })
        detail({id}).then(response => {
          console.log(response.data);
          this.information = response.data;
        });

      },
      dayin(){
        let wpt = document.getElementById('test');
        let newContent = wpt.innerHTML;
        let oldContent = document.body.innerHTML;
        
        document.body.innerHTML = newContent;
        document.body.style.width = document.querySelector('.el-table__header').style.width
        // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
        // document.body.style = "transform:scale(0.8,0.8); width: 2000px; margin-left: -200px;"
        // document.querySelector('.table').style = "border:0;"
        window.print();
        window.location.reload()
        // document.body.innerHTML = oldContent;
      },
      //返回上一页
      prev() {
        this.$router.go(-1);
      },
      //导出
      exportTable(){
        var tHeaders = ['商品大类', '商品名称', '期初数量', '商品入库-采购', '商品入库-调拨', '商品出库-调拨', '商品出库-退货', '商品出库-报废', '销售', '销售退货', '期末数量'];
        var filterVals = [ 'bigTypeName', 'goodsName', 'goodsInitialCount', 'enterhousePurchase', 'enterhouseAllocation', 'outrhouseAllocation', 'outrhouseRefunds', 'outrhouseAbandon', 'sales', 'salesRefunds', 'goodsFinalCount'];
        var name = '商品进销存报表'
        handleDownload(this.tableData,tHeaders,filterVals,name)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.warp {
  background-color: #f6f7fb;
  // padding: 20px;
}

.main {
  min-height: calc(100vh - 180px);
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.header {
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  height: 60px;
  padding-left: 1%;
  padding-right: 1%;
}
.header h3 {
  line-height: 60px;
  margin: 0;
  float: left;
  width: 200px;
}
.header .btn {
  float: right;
  height: 60px;
  line-height: 60px;
}
.header .btn .el-button {
  margin-left: 10px;
}
.top{
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}
.top .box .block{
  line-height: 36px;
}
</style>
<style scoped>
h3 .el-button--medium.is-circle {
  border: 0;
}
</style>