<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="top">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" suffix-icon="el-icon-search"/>
        </el-form-item>
        <el-button type="primary">添加账户</el-button>
      </div>

      <el-table v-loading="listLoading" :key="tableKey" :data="list" fit highlight-current-row style="width: 100%;border-top: 30px solid #f6f7fb;" @sort-change="sortChange">
        <el-table-column label="平台账户" prop="id" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="员公司名称" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="油站数量" min-width="100" sortable="custom" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="运营中" min-width="90" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="法人" min-width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" min-min-width="90" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="280" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
              修改
            </el-button>
            <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">查看
            </el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">重设密码
            </el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">冻结
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--<el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.title')" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.title }}</span>
          <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.author')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.reviewer')" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.importance')" width="80px">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.readings')" align="center" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type" @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{ $t('table.publish') }}
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{ $t('table.draft') }}
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>-->

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-form>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.type')" prop="type">
          <el-select v-model="temp.type" class="filter-item" clearable placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item"  clearable placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"/>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>
        </el-form-item>
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
	    this.oddevent()
  },
  methods: {
     	onSubmit() {
       	  console.log('submit!')
      	},
      	getList() {
      	  this.listLoading = true
	      fetchList(this.listQuery).then(response => {
	        this.list = response.data.items
	        this.total = response.data.total

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
	    }
  }
}
</script>

<style scoped>
	/* @import url("../../../static/css/jtzhanghu/jtzhanghuS.css"); */

</style>
