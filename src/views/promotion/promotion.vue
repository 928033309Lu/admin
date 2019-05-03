<template>
  <div class="warp">
    <div class="top">

      <h3>促销管理</h3>
      <div class="cu">
        <div class="inp">
          <span>促销单号</span>
          <el-input v-model="promotionNumber" placeholder="" style="width: 190px;"/>
        </div>
        <div class="inp">
          <span>促销类型</span>
          <select id="type" v-model="promotionType" name="type" style="width: 190px;">
            <option value="全部">全部</option>
            <option value="油品促销">油品促销</option>
            <option value="商品促销">商品促销</option>
            <option value="油商互动">油商互动</option>
          </select>
        </div>
        <div class="inp">
          <span>状态</span>
          <select id="state" v-model="state" name="state" style="width: 190px;">
            <option value="全部">全部</option>
            <option value="待审批">待审批</option>
            <option value="生效中">生效中</option>
            <option value="未生效">未生效</option>
            <option value="已失效">已失效</option>
          </select>
        </div>
      </div>
      <div class="shenqing">
        <a href="#/promotion/oilApplication"><el-button>油品促销申请</el-button></a>
        <a href="#/promotion/commodityApplication"><el-button>商品促销申请</el-button></a>
        <a href="#/promotion/mixedPromotion"><el-button>油商互动申请</el-button></a>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="managementTable"
        stripe
        border
        style="width: 100%">
        <el-table-column
          label="促销类型"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.promotionName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="促销单号"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.chuxiaodanhao }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主题"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.promotionReason }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">待审批</span>
            <span v-if="scope.row.status==2">生效中</span>
            <span v-if="scope.row.status==3">未生效</span>
            <span v-if="scope.row.status==4">已生效</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.creatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结算时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建者"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="220">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==1"
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)">撤回</el-button>
            <el-button
              v-if="scope.row.status==3||scope.row.status==2"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">停止</el-button>
            <el-button
              size="mini"
              type="info"
              @click="see(scope.$index, scope.row)">查看</el-button>
            <el-button
              v-if="scope.row.status==3||scope.row.status==2"
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">统计</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <!-- 查看框 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <div class="header">
        <div class="box">
          <span>促销类型：</span>
          <el-input v-model="seeData.promotionName" placeholder="请输入内容" style="width: 200px;"/>
        </div>
        <div class="box">
          <span>促销单号：</span>
          <el-input v-model="seeData.chuxiaodanhao" placeholder="请输入内容" style="width: 200px;"/>
        </div>
        <div class="box">
          <span>促销原因：</span>
          <el-input v-model="seeData.promotionReason" placeholder="请输入内容" style="width: 350px;"/>
        </div>
        <div class="box">
          <span>状态:</span>
          <select id="zhuang" v-model="seeData.status" name="zhuan">
            <option value="1">待审批</option>
            <option value="2">生效中</option>
            <option value="3">未生效</option>
            <option value="4">已失效</option>
          </select>
        </div>
        <div class="box">
          <span>开始时间：</span>
          <!-- seeData.tbOilsPromotionTimeList[0].startTime -->
          <el-date-picker
            v-model="seeData.tbOilsPromotionTimeList[0].startTime"
            type="datetime"
            placeholder="选择日期时间"/>
        </div>
        <div class="box">
          <span>结算时间：</span>
          <el-date-picker
            v-model="seeData.tbOilsPromotionTimeList[0].endTime"
            type="datetime"
            placeholder="选择日期时间"/>
        </div>
        <div class="box">
          <span>创建者：</span>
          <el-input v-model="seeData.creator" placeholder="请输入内容" style="width: 350px;"/>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modify">{{ $t('table.confirm') }}</el-button>
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import icons from './requireIcons'
// import clipboard from '@/utils/clipboard'

export default {
  name: 'Promotion',
  data() {
    return {
      dialogFormVisible: false, // 控制查看框隐藏与显示
      promotionNumber: '', // 促销单号
      promotionType: '', // 促销类型
      state: '', // 状态
      seeData: {
        tbOilsPromotionTimeList: [{
          startTime: '',
          endTime: ''
        }]
      }, // 查看信息
      // 促销管理表格临时数据
      managementTable: [{
        promotionName: '油品促销', // 促销类型
        chuxiaodanhao: 'YPCX-123456789', // 促销单号
        promotionReason: '激情一下，汽油满200元立减10元', // 主题
        status: 1, // 状态 1、待审批 2、生效中 3、未生效 4、已生效
        creatTime: '', // 开始时间
        endTime: '', // 结算时间
        creator: '油站'// 创建者
      }]
    //  creatTime: "Nov 23, 2018 12:00:00 AM"
    //   isDelete: 0
    //   oilsPromotionId: "4028801b673f0d4b01673f88493b0007"
    //   promotionName: "油品促销"
    //   promotionReason: "油品促销"
    //   promotionTypeId: "1"
    //   status: 1
    //   whetherThePromotionIsUnlimited: 0
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    // 获取
    getlist() {
      var that = this
      this.$http
        .post('http://192.168.0.155:8080/marketing-oils-promotion/get-oils-promotion-list', {},
          {
            headers: {
              'Authorization': 'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            }
          })
        .then(function(res) {
          console.log('提交成功')
          console.log(res.body)
          that.managementTable = res.body
        })
        .catch(function(err) {
          console.log('提交失败')
          console.log(err)
        })
    },
    // 查看
    see(index, row) {
      this.dialogFormVisible = true
      var that = this
      console.log(row.oilsPromotionId)
      this.$http
        .post('http://192.168.0.155:8080/marketing-oils-promotion/get-oils-promotion-by-id', row.oilsPromotionId,
          {
            headers: {
              'Authorization': 'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            }
          })
        .then(function(res) {
          console.log('提交成功')
          console.log(res.body)
          that.seeData = res.body
          console.log(that.seeData.tbOilsPromotionTimeList[0])
        })
        .catch(function(err) {
          console.log('提交失败')
          console.log(err)
        })

      console.log(index, row)
    },
    // 修改
    modify() {
      var that = this
      console.log(that.seeData.tbOilsPromotionTimeList[0].startTime)
      this.dialogFormVisible = false
      // console.log(that.seeData)
      // return
      this.$http
        .post('http://192.168.0.155:8080/marketing-oils-promotion/update-oils-promotion-by-id',
          {
            'creatTime': '2018-11-24T08:08:52.568Z',
            'deleteTime': '2018-11-24T08:08:52.568Z',
            'isDelete': 0,
            'memberCanBeParticipatedTotal': 0,
            'memberCanParticipateTimes': 0,
            'oilsPromotionId': that.seeData.oilsPromotionId,
            'operatorId': '1',
            'promotionName': that.seeData.promotionName,
            'promotionReason': that.seeData.promotionReason,
            'promotionTypeId': '1',
            'status': that.seeData.status,
            'tbOilPromotionRulesList': [
              {
                'discountAmount': 0,
                'oilPromotionId': 'string',
                'oilPromotionRulesId': 'string',
                'oilsId': 'string',
                'oilsNum': 0,
                'promotionOilsDescription': 'string',
                'promotionalOilUnitPricePercentage': 'string'
              }
            ],
            'tbOilsPromotionPetrolStationList': [
              {
                'oilsPromotionId': 'string',
                'oilsPromotionPetrolStation': 'string',
                'petrolStationId': 'string'
              }
            ],
            'tbOilsPromotionSupportPaymentList': [
              {
                'oilsPromotionId': 'string',
                'oilsPromotionSupportPaymentId': 'string',
                'paymentId': 'string'
              }
            ],
            'tbOilsPromotionTimeList': [
              {
                'circulationType': 0,
                'endTime': that.seeData.tbOilsPromotionTimeList[0].endTime,
                'friday': 0,
                'monday': 0,
                'oilsPromotionId': 'string',
                'oilsPromotionTimeId': 'string',
                'saturday': 0,
                'settingEndTime': 'string',
                'settingStartTime': 'string',
                'startTime': that.seeData.tbOilsPromotionTimeList[0].startTime,
                'sunday': 0,
                'thursday': 0,
                'tuesday': 0,
                'wednesday': 0,
                'whetherToSetTheTimePeriod': 0
              }
            ],
            'theReasonForRefusal': 'string',
            'whetherThePromotionIsUnlimited': 0
          },
          {
            headers: {
              'Authorization': 'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            }
          })
        .then(function(res) {
          console.log('提交成功')
          console.log(res.body)
          that.seeData = res.body
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
        .catch(function(err) {
          console.log('提交失败')
          this.$message.error('修改失败')
          console.log(err)
        })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top{
  padding: 10px 20px;
}
h3{
  padding-left: 100px;
}
.cu{
  display: flex;
  justify-content:  space-around;
}
.ipt{
  width: 250px;
}
.shenqing{
  display: flex;
  justify-content: flex-end;
}
.shenqing a+a{
margin-left: 10px;
}
.table{
  padding: 10px 20px;
  text-align: center;
}
.dialog-footer{
  text-align: center;
}
.box{
  margin-bottom: 20px;
}
</style>
