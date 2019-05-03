<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-table   id="out-table" :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请传入1M以内的Excel表',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      //改变读取模板后的对象键名
//    this.tableData = JSON.parse(JSON.stringify( this.tableData).replace(/保质期/g,"expirationDay").replace(/单位/g,"unit").replace(/品牌/g,"brand").replace(/商品名称/g,"goodsName").replace(/商品大类/g,"goodsTypeName").replace(/商品条码/g,"barCode").replace(/规格/g,"SpecAmount"));
      
      let data = {
				goodsList: this.tableData
			}
      
      console.log(data);
    }
  }
}
</script>
