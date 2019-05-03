<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <div class="ipt">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标题 <el-input v-model="name" placeholder="单行输入" /></label>
        </div>
        <div class="ipt">
          优惠类型
          <select id="you" v-model="discountCouponType" name="youhui">
            <option value="代金券">代金券</option>
            <option value="折扣券">折扣券</option>
          </select>
        </div>
        <div class="ipt">
          <label>&nbsp;&nbsp;券面金额 <el-input v-model="discountCouponValue" type="Number" placeholder="100" /></label>
        </div>
        <div class="ipt">
          <label>折扣券折扣 <el-input v-model="couponDiscount" type="Number" max="1.0" min="0.0" step="0.1" placeholder="单行输入" /></label>
          <p>(注：0.8表示八折，范围为0-1（不包含边界数）)</p>
        </div>
        <div class="ipt">
          <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期 <el-input v-model="periodOfValidity" type="Number" placeholder="30" />&nbsp;&nbsp;天</label>
        </div>
        <div class="ipt ri">
          <div class="left">
            <span>开始时间</span>
          </div>
          <div class="right">
            <el-radio-group v-model="start">
              <el-radio :label="3">
                <span>指定日期</span>
                <el-input
                  v-model="startTime"
                  type="date"
                  placeholder="请选择日期"/>
              </el-radio>
            </el-radio-group>

          </div>
          <div class="ling">
            <div class="left"/>
            <div class="right">

              <el-radio-group v-model="getTime">
                <el-radio :label="2">领取日</el-radio>
              </el-radio-group>
            </div>
          </div>

        </div>
        <div class="ipt">
          <div class="left">
            最低消费
          </div>
          <div class="right">
            <el-input v-model="minimumConsumption" type="Number" placeholder="单行输入" />元
          </div>
        </div>
        <div class="ipt">
          <div class="left">
            使用说明
          </div>
          <div class="right">
            <el-input
              :rows="2"
              v-model="instructions"
              type="textarea"
              placeholder="请输入内容"/>
          </div>

        </div>
      </div>
      <div class="ipt">
        <el-button @click="tijiao">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">
      <p>应用范围</p>
      <div class="youpin">
        <p>油品</p>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所有</el-checkbox>
        <el-checkbox-group v-model="youpinList" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="youpin">
        <p>商品</p>
        <el-checkbox :indeterminate="shangpinisIndeterminate" v-model="shangpinAll" @change="AllChange">所有</el-checkbox>
        <el-checkbox-group v-model="shangpinList" @change="CitiesChange">
          <el-checkbox v-for="city in shangpin" :label="city" :key="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div></el-col>
  </el-row>
</template>

<script>
// import icons from './requireIcons'
import clipboard from '@/utils/clipboard'
const cityOptions = [
  '92号汽油',
  '95号汽油',
  '98号汽油',
  '0号柴油',
  '-10号柴油',
  '-20号柴油',
  '-35号柴油'
]
const shangpinOptions = [
  '日用品',
  '饮料',
  '日用品',
  '饮料',
  '日用品',
  '饮料',
  '日用品',
  '饮料',
  '日用品',
  '饮料',
  '日用品'
]
export default {
  name: 'NewTicket',
  data() {
    return {
      start: '',
      textarea:
        '尊敬的用户，您获得[公司]优惠券（[券名]），券号为[券号]，有效期为[有效期]，使用和条件：需最低消费[最低消费]元。祝您愉快，详情咨询：[店面电话]',
      // 油品
      youpinList: [],
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: true,
      // 商品
      shangpinList: [],
      shangpin: shangpinOptions,
      shangpinAll: false,
      shangpinisIndeterminate: true,
      // 新增数据
      name: '',
      discountCouponType: '代金券', // 优惠类型 1、代金券 2、折扣券
      discountCouponValue: '', // 券面金额
      couponDiscount: '', // 券面折扣
      periodOfValidity: '', // 有效期
      startTime: '', // 开始日期
      getTime: '', // 领取日
      minimumConsumption: '', // 最低消费
      instructions: ''// 使用说明
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.youpinList = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    AllChange(val) {
      this.shangpinList = val ? shangpinOptions : []
      this.shangpinisIndeterminate = false
    },
    CitiesChange(value) {
      const checkedCount = value.length
      this.shangpinAll = checkedCount === this.shangpin.length
      this.shangpinisIndeterminate =
        checkedCount > 0 && checkedCount < this.shangpin.length
    },

    tijiao() {
      var that = this
      if (!(this.couponDiscount < 1 && this.couponDiscount > 0)) {
        alert('请输入正确的折扣价')
        return
      }
      var num
      // this.discountCouponType =
      if (this.discountCouponType == '代金券') {
        num = 1
      } else if (this.discountCouponType == '折扣券') {
        num = 2
      }
      that.$http
        .post('http://192.168.0.155:8080/marketing/add-electronic-coupons', {
          'name': that.name,
          'discountCouponType': num,
          'discountCouponValue': that.discountCouponValue,
          'couponDiscount': that.couponDiscount,
          'periodOfValidity': that.periodOfValidity,
          'startTime': that.startTime,
          'minimumConsumption': that.minimumConsumption,
          'instructions': that.instructions
        },
        {
          headers: {
            'Authorization': 'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
          }

        })
        .then(function(res) {
          console.log('提交成功')
          console.log(res)
        })
        .catch(function(err) {
          console.log('提交失败')
          console.log(err)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.biao {
  text-align: center;
}
.biao table {
  text-align: center;
}
.el-input {
  width: 70%;
}
.ipt {
  text-align: center;
  margin-bottom: 10px;
}
.bg-purple {
  padding-top: 50px;
}
.bg-purple-light {
  padding-top: 100px;
}
select {
  width: 70%;
  border-radius: 8px;
  padding-left: 10px;
}
.ipt p {
  font-size: 12px;
  margin-bottom: 30px;
}

.riqi {
  display: inline-block;
}
.left,
.right {
  display: inline-block;
}
.left {
  width: 14%;
  text-align: right;
  vertical-align: top;
}
.right {
  width: 70%;
  text-align: left;
}
.el-checkbox-group {
  display: inline-block;
}
.youpin {
  width: 41%;
}
.el-checkbox {
  margin-right: 30px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
</style>
