<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="top">
        <el-form-item label="岗位管理" class="yggl"/>
        <div class="items">
          <el-form-item label="岗位名称">
            <el-select v-model="listQuery.importance" clearable style="min-width: 200px" class="filter-item">
              <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <div class="btns1">
            <el-button type="primary">岗位管理</el-button>
            <el-button type="primary">岗位添加</el-button>
          </div>
        </div>
      </div>

      <el-table v-loading="listLoading" :key="tableKey" :data="list" fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
        <el-table-column label="员工编号" sortable="custom" align="center" width="170">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" width="150" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="150" sortable="custom" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员工岗位" width="150" align="left" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" min-width="150" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="在职状态" align="left" width="150" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="left" width="300" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">查看
            </el-button>
            <el-button v-if="scope.row.status!='published'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">重设密码
            </el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">冻结
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-form>
    <!--岗位管理弹框-->
    <el-dialog :visible.sync="dialogFormVisible" title="岗位管理" class="gwgl_tab">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
        <!--<el-form-item :label="$t('table.type')" prop="type">
	          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
	            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
	          </el-select>
	        </el-form-item>-->
        <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%;border: 1px solid #E4E4E4;">

          <el-table-column align="center" label="ID" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="Author">
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input v-model="scope.row.author" class="edit-input" size="small"/>
              </template>
              <span v-else>{{ scope.row.author }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="Actions" width="230">
            <template slot-scope="scope">

              <el-button v-if="scope.row.edit" type="success" size="small" @click="confirmEdit(scope.row)">确定</el-button>

              <el-button v-else type="primary" size="small" @click="scope.row.edit=!scope.row.edit">修改</el-button>

              <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
              </el-button>

            </template>
          </el-table-column>
          <el-table-column min-width="180"/>

        </el-table>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {

  components: { Pagination },
  data() {
    return {
      	list: null,
      	tableKey: 0,
      	listLoading: true,
	    total: 0,
      form: {
        name: ''
      },
      listQuery: {
	        page: 1,
	        limit: 20,
	        importance: undefined,
	        title: undefined,
	        type: undefined,
	        sort: '+id'
	    },
	    textMap: {
	        update: 'Edit',
	        create: 'Create'
	    },
	    temp: {
	        id: undefined,
	        importance: 1,
	        remark: '',
	        timestamp: new Date(),
	        title: '',
	        type: '',
	        status: 'published'
	    },
	    dialogStatus: '',
	    dialogFormVisible: false
    }
  },
  created() {
	    this.getList()
  },
  methods: {
     	onSubmit() {
       	  console.log('submit!')
      	},
      	getList() {
      	  this.listLoading = true
	      fetchList(this.listQuery).then(response => {
	        this.total = response.data.total
	        const items = response.data.items

	        this.list = items.map(v => {
	          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
	          v.originalTitle = v.title //  will be used when user click the cancel botton
	          return v
	        })

	        setTimeout(() => {
	          this.listLoading = false
	        }, 1.5 * 1000)
	      })
	    },
	    handleUpdate(row) {
	      this.temp = Object.assign({}, row) // copy obj
	      this.temp.timestamp = new Date(this.temp.timestamp)
	      this.dialogStatus = 'update'
	      this.dialogFormVisible = true
	      this.$nextTick(() => {
	        this.$refs['dataForm'].clearValidate()
	      })
	    },
	    confirmEdit(row) {
	      row.edit = false
	      row.originalTitle = row.title
	      this.$message({
	        message: 'The title has been edited',
	        type: 'success'
	      })
	    }
  }
}
</script>

<style scoped>

	/* @import url("../../../static/css/staffman/staffman.css"); */
	
</style>

