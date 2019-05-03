<template>
<div>
  <div class="warp">
    <div class="header">
      <h3>
        <el-button circle @click="prev">
          <i class="el-icon-arrow-left"></i>
        </el-button>商品销售报表
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
          <div class="block">班次：{{information.shifts}}</div>
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
              label="商品类别">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              align="center"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="goodsCount"
              align="center"
              label="数量">
            </el-table-column>
            <el-table-column label="实收金额" align="center">
              <el-table-column
                prop="sum"
                label="合计"
                align="center">
              </el-table-column>
              <el-table-column
                prop="cash"
                label="现金"
                align="center">
              </el-table-column>
              <el-table-column
                prop="wechat"
                label="微信"
                align="center">
              </el-table-column>
              <el-table-column
                prop="alipay"
                label="支付宝"
                align="center">
              </el-table-column>
              <el-table-column
                prop="card"
                label="银联卡"
                align="center">
              </el-table-column>
              <el-table-column
                prop="member"
                label="会员卡"
                align="center">
              </el-table-column>
              <el-table-column
                prop="oldMember"
                label="老会员卡"
                align="center">
              </el-table-column>
            </el-table-column>
            <el-table-column label="折扣" align="center">
              <el-table-column
                prop="discountElec"
                label="电子券"
                align="center">
              </el-table-column>
              <el-table-column
                prop="discountMember"
                label="会员卡"
                align="center">
              </el-table-column>
              <el-table-column
                prop="discountPro"
                label="促销"
                align="center">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- <div class="top">
        <div class="box">站经理：{{}}</div>
        <div class="box">核算：{{}}</div>
        <div class="box">便利店：{{}}</div>
      </div> -->
    </div>
  </div>
</div>
</template>
<script>
import { detail } from "@/api/shuju";
import { report } from "@/api/youpinbaobiao";
import { handleDownload } from '@/utils'

  export default {
    data(){
      return {
        tableData:[],
        information:{
          stationName:null
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
        // storageList(data)
        //   .then(response => {
        //     console.log(response.data)
        //     this.tableData = response.data
        //   })
        detail({id}).then(response => {
          // console.log(response.data);
          this.information = response.data;
        });
        report(data).then(response => {
          // console.log(response.data)
          this.tableData = response.data.list
        })
      },
      // printing
      dayin(){
        let wpt = document.getElementById('test');
        let newContent = wpt.innerHTML;
        let oldContent = document.body.innerHTML;
        
        document.body.innerHTML = newContent;
        document.body.style.width = parseInt(document.querySelector('.el-table__header').style.width)+37+'px'
        // document.body.style = "transform:rotate(-90deg);height:2000px;padding: 400px 0 0 0;"
        // document.body.style = "transform:scale(0.8,0.8); width: 2000px; margin-left: -200px;"
        // document.querySelector('.el-table__header').style = "margin: 0 auto;"
        // document.querySelector('.el-table__body').style = "margin: 0 auto;"
        window.print();
        window.location.reload()
        // document.body.innerHTML = oldContent;
      },
      //返回上一页
      prev() {
        this.$router.go(-1);
      },
      //导出表格
      exportTable(){
        var tHeaders = ['商品类别', '商品名称', '数量', '合计', '现金', '微信', '支付宝', '银联卡', '会员卡', '老会员卡', '电子券', '会员卡', '促销'];
        var filterVals = [ 'bigTypeName', 'goodsName', 'goodsCount', 'sum', 'cash', 'wechat', 'alipay', 'card', 'member', 'oldMember', 'discountElec', 'discountMember', 'discountPro'];
        var name = '商品销售报表';
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
.biao{
  padding: 0 20px;
}
</style>
<style scoped>
h3 .el-button--medium.is-circle {
  border: 0;
}
</style>