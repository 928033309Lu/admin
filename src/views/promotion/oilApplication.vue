<template>
  <div class="warp">
    <h3>油品促销申请</h3>
    <div class="top">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <div class="inp">
            <div class="left">
              <span>促销名称</span>
            </div>
            <div class="right">
              <el-input v-model="promotionName" placeholder="单行输入" style="width: 300px;"/>
            </div>
          </div>
          <div class="inp">
            <div class="left t">
              <span>促销类型</span>
            </div>
            <div class="right">
              <select id="type" v-model="promotionType" name="type" style="width: 300px;">
                <option value="油品满升数，单价立减">油品满升数，单价立减</option>
                <option value="油品满升数，单价百分比优惠">油品满升数，单价百分比优惠</option>
                <option value="油品满金额，总价立减">油品满金额，总价立减</option>
                <option value="油品满金额，总价百分比优惠">油品满金额，总价百分比优惠</option>
              </select>
              <p>买指定油品达到一定升数，单价扣减折扣金额</p>
            </div>
          </div>
          <div class="inp">
            <div class="left">
              <span>促销油站</span>
            </div>
            <div class="right">
              <select id="zhan" v-model="station" name="zhan">
                <option value="北京一号加油站">北京一号加油站</option>
              </select>
            </div>
          </div>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <div class="left t">
            <span>促销原因：</span>
          </div>
          <div class="right wen">
            <div class="text">
              <el-input
                :rows="4"
                v-model="reason"
                type="textarea"
                placeholder="请输入内容"/>
            </div>
          </div>
        </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14"><div class="grid-content bg-purple">
          <div class="inp">
            <div class="left shijian">
              <span>促销时间</span>
            </div>

            <div class="right">
              <div class="date">
                <div class="inp">
                  <span>开始日期：</span>
                  <el-input v-model="startDate" type="datetime-local" step="01" style="width: 200px;"/>
                  <span>结束日期</span>
                  <el-input v-model="endDate" type="datetime-local" step="01" style="width: 200px;"/>
                </div>
                <div class="inp">
                  <el-radio v-model="radio" label="1">每天</el-radio>
                  <el-radio v-model="radio" label="2">周循环</el-radio>
                </div>
                <div class="inp">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="周一"/>
                    <el-checkbox label="周二"/>
                    <el-checkbox label="周三"/>
                    <el-checkbox label="周四"/>
                    <el-checkbox label="周五"/>
                    <el-checkbox label="周六"/>
                    <el-checkbox label="周日"/>
                  </el-checkbox-group>
                </div>
                <div class="inp">
                  <el-checkbox v-model="checked">按时间段</el-checkbox>
                </div>
                <div class="inp">
                  <span>开始时间：</span>
                  <el-input v-model="startTime" placeholder="单行输入" type="time" step="01" style="width: 160px;"/>
                  <span>结束时间：</span>
                  <el-input v-model="endTime" placeholder="单行输入" type="time" step="01" style="width: 160px;"/>
                </div>
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple">
          <div class="inp">
            <div class="left t">
              <span>促销支付方式</span>
            </div>
            <div class="right">
              <div class="kuang">
                <el-checkbox-group v-model="mode">
                  <el-checkbox label="现金"/>
                  <el-checkbox label="微信"/>
                  <el-checkbox label="支付宝"/>
                  <el-checkbox label="银联卡"/>
                  <el-checkbox label="会员卡"/>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="inp">
            <div class="left t">
              <span>促销次数</span>
            </div>
            <div class="right">
              <div class="kuang">
                <div class="ipt">
                  <el-radio v-model="frequency" label="0">无限制</el-radio>
                </div>
                <div class="ipt">
                  <el-radio v-model="frequency" label="1">天/次</el-radio>
                  <el-input v-model="totalTimes" size="mini" type="number" placeholder="0" style="width: 100px;"/>
                </div>
                <div class="ipt">
                  <el-radio v-model="frequency" label="1">总/次</el-radio>
                  <el-input v-model="dayTimes" size="mini" type="number" placeholder="0" style="width: 100px;"/>
                </div>
              </div>
            </div>
          </div>
        </div></el-col>
      </el-row>
    </div>
    <div class="footer">
      <p>促销规则</p>
      <div class="gui">
        <!-- 油品满金额，单价价立减 -->
        <!-- v-if="promotionType=='油品满金额，单价价立减'" -->
        <el-table

          :data="tbOilPromotionRulesList"
          style="width: 100%">
          <el-table-column
            label="油品"
            align="center"
            width="180">
            <template slot-scope="scope">
              <select id="youpin" v-model="scope.row.oilsId" name="youpin">
                <option value="1">92号 汽油</option>
                <option value="2">95号 汽油</option>
                <option value="3">98号 汽油</option>
                <option value="4">0号 柴油</option>
              </select>
            </template>
          </el-table-column>
          <el-table-column
            label="促销数量"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.oilsNum" type="number" placeholder="0" style="width: 100px;"/> 升
            </template>
          </el-table-column>
          <el-table-column
            label="优惠金额"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.discountAmount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"/> 元
            </template>
          </el-table-column>
          <el-table-column label="规则说明" align="center" >
            <template slot-scope="scope" >
              <span v-if="scope.row.oilsId=='1'" class="shuoming">92号 车用汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{ scope.row.discountAmount }}元</span>
              <span v-if="scope.row.oilsId=='2'" class="shuoming">95号 车用汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{ scope.row.discountAmount }}元</span>
              <span v-if="scope.row.oilsId=='3'" class="shuoming">98号 车用汽油 加油满{{ scope.row.oilsNum }}升，单价立减{{ scope.row.discountAmount }}元</span>
              <span v-if="scope.row.oilsId=='4'" class="shuoming">0号 车用柴油 加油满{{ scope.row.oilsNum }}升，单价立减{{ scope.row.discountAmount }}元</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 油品满金额，总价价立减 -->
        <!-- <el-table
          v-if="promotionType=='油品满金额，总价价立减'"
          :data="tbOilPromotionRulesList"
          style="width: 100%">
          <el-table-column
            label="油品"
            align="center"
            width="180">
            <template slot-scope="scope">
             <select name="youpin" id="youpin" v-model="scope.row.oilsId">
               <option value="1">92号 汽油</option>
               <option value="2">95号 汽油</option>
               <option value="3">98号 汽油</option>
               <option value="4">0号 柴油</option>
             </select>
            </template>
          </el-table-column>
          <el-table-column
            label="促销数量"
            align="center"
            width="180">
            <template slot-scope="scope">
             <el-input v-model="scope.row.oilsNum" type="number" placeholder="0" style="width: 100px;"></el-input> 升
            </template>
          </el-table-column>
           <el-table-column
            label="优惠金额"
            align="center"
            width="180">
            <template slot-scope="scope">
             <el-input v-model="scope.row.discountAmount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"></el-input> 元
            </template>
          </el-table-column>
          <el-table-column label="规则说明" align="center" >
             <template slot-scope="scope" v-if="promotionType=='油品满金额，总价立减'">
             <span class="shuoming" v-if="scope.row.oilsId=='1'">92号 车用汽油 加油满{{ scope.row.oilsNum }}升，总价立减{{scope.row.discountAmount}}元</span>
             <span class="shuoming" v-if="scope.row.oilsId=='2'">95号 车用汽油 加油满{{ scope.row.oilsNum }}升，总价立减{{scope.row.discountAmount}}元</span>
             <span class="shuoming" v-if="scope.row.oilsId=='3'">98号 车用汽油 加油满{{ scope.row.oilsNum }}升，总价立减{{scope.row.discountAmount}}元</span>
             <span class="shuoming" v-if="scope.row.oilsId=='4'">0号 车用柴油 加油满{{ scope.row.oilsNum }}升，总价立减{{scope.row.discountAmount}}元</span>
            </template>
          </el-table-column>
        </el-table> -->
        <div class="but">
          <el-button @click="add">添加行</el-button>
          <el-button @click="del">删除行</el-button>
        </div>
      </div>
    </div>
    <div class="but">
      <el-button @click="tijiao">提交</el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'OilApplication',
  data() {
    return {
      promotionName: '', // 促销名称
      promotionType: '', // 促销类型
      startDate: '', // 开始日期
      endDate: '', // 结束日期
      radio: '1', // 每天/周循环
      checkList: [], // 周1-7
      checked: false, // 按时间段是否选中
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      reason: '原因：竞争对手xx加油站汽油降价xx元/升，为保住加油站销量，特申请此促销活动。\n 促销方式：92号汽油 加满200元，每升优惠0.2元  加油300元，每升优惠0.3元', // 促销原因
      mode: [], // 促销支付方式
      tbOilsPromotionSupportPaymentList: [],
      frequency: '', // 促销次数限制0无限制1有限
      totalTimes: '', // 总/次
      dayTimes: '', // 天/次
      // 规则说明临时表格数据
      tbOilPromotionRulesList: [{
        oilsId: '1', // 油品
        oilsNum: '20', // 促销数量
        discountAmount: '0.5', // 优惠金额
        promotionOilsDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }, {
        oilsId: '1', // 油品
        oilsNum: '20', // 促销数量
        discountAmount: '0.5', // 优惠金额
        promotionOilsDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }],
      station: '北京一号加油站', // 加油站
      tbOilsPromotionTimeList: [{// 油品促销时间集合【该数组给一个子集】
        'circulationType': 1, // 循环类型 1 单次  2 周循环,
        'endTime': '2018-11-23T01:55:55.541Z', // 结束时间
        'friday': 0, // 星期五 未选中0  选中1
        'monday': 0, // 星期一 未选中0  选中1,
        'saturday': 0, // 星期六 未选中0  选中1
        'settingEndTime': 'string', // 设置某天的结束时间【HH：mm：ss】
        'settingStartTime': 'string', // 设置某天开始时间【HH：mm：ss】
        'startTime': '2018-11-23T01:55:55.541Z', // 开始时间
        'sunday': 0, // 星期日 未选中0  选中1
        'thursday': 0, // 星期四 未选中0  选中1
        'tuesday': 0, // 星期二 未选中0  选中1
        'wednesday': 0, // 星期三 未选中0  选中1
        'whetherToSetTheTimePeriod': 0// 是否设置时间段  0 未设置  1设置
      }]
    }
  },
  methods: {
    add() {
      var obj = {
        oilsId: '1', // 油品
        oilsNum: '20', // 促销数量
        discountAmount: '0.5', // 优惠金额
        promotionOilsDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }
      this.tbOilPromotionRulesList.push(obj)
    },
    del() {
      this.tbOilPromotionRulesList.pop()
    },
    tijiao() {
      var that = this

      var shuoming = document.querySelectorAll('.shuoming')
      for (var i = 0; i < that.tbOilPromotionRulesList.length; i++) {
        that.tbOilPromotionRulesList[i].promotionOilsDescription = shuoming[i].innerHTML
      }
      for (var j = 0; j < that.mode.length; j++) {
        if (that.mode[j] == '现金') {
          that.tbOilsPromotionSupportPaymentList.push({
            oilsPromotionSupportPaymentId: '1',
            paymentId: '1'
          })
        } else if (that.mode[j] == '微信') {
          that.tbOilsPromotionSupportPaymentList.push({
            oilsPromotionSupportPaymentId: '2',
            paymentId: '2'
          })
        } else if (that.mode[j] == '支付宝') {
          that.tbOilsPromotionSupportPaymentList.push({
            oilsPromotionSupportPaymentId: '3',
            paymentId: '3'
          })
        } else if (that.mode[j] == '银联卡') {
          that.tbOilsPromotionSupportPaymentList.push({
            oilsPromotionSupportPaymentId: '4',
            paymentId: '4'
          })
        } else if (that.mode[j] == '会员卡') {
          that.tbOilsPromotionSupportPaymentList.push({
            oilsPromotionSupportPaymentId: '5',
            paymentId: '5'
          })
        }
      }
      // 油品促销时间集合
      that.tbOilsPromotionTimeList[0].circulationType = that.radio
      that.tbOilsPromotionTimeList[0].endTime = that.startDate
      that.tbOilsPromotionTimeList[0].startTime = that.endDate
      that.tbOilsPromotionTimeList[0].settingStartTime = that.startTime
      that.tbOilsPromotionTimeList[0].settingEndTime = that.endTime
      for (var a = 0; a < that.checkList.length; a++) {
        if (that.checkList[a] == '周一') {
          that.tbOilsPromotionTimeList[0].monday = 1
        } else if (that.checkList[a] == '周二') {
          that.tbOilsPromotionTimeList[0].tuesday = 1
        } else if (that.checkList[a] == '周三') {
          that.tbOilsPromotionTimeList[0].wednesday = 1
        } else if (that.checkList[a] == '周四') {
          that.tbOilsPromotionTimeList[0].thursday = 1
        } else if (that.checkList[a] == '周五') {
          that.tbOilsPromotionTimeList[0].friday = 1
        } else if (that.checkList[a] == '周六') {
          that.tbOilsPromotionTimeList[0].saturday = 1
        } else if (that.checkList[a] == '周日') {
          that.tbOilsPromotionTimeList[0].sunday = 1
        }
      }
      if (that.checked) {
        that.tbOilsPromotionTimeList[0].whetherToSetTheTimePeriod = 1
      } else {
        that.tbOilsPromotionTimeList[0].whetherToSetTheTimePeriod = 0
      }

      this.$http
        .post('http://192.168.0.155:8080/marketing-oils-promotion/add-oils-promotion',
          {
            'isDelete': 0, // 是否删除 （默认给0）
            'memberCanBeParticipatedTotal': that.totalTimes, // 该促销总共可参与多少次
            'memberCanParticipateTimes': that.dayTimes, // 该促销每个用户每天可参与多少次
            'promotionName': that.promotionName, // （促销名称）
            'promotionReason': that.promotionName, // （促销原因）
            'promotionTypeId': '1', // （促销类型id【先给死值1】）
            'status': 1, // （状态 1 申请中   2已通过  3被拒绝    默认给0）
            'tbOilPromotionRulesList': that.tbOilPromotionRulesList,
            'tbOilsPromotionPetrolStationList': [{// 油品促销油站 集合【该数组先给一个子集】
              'petrolStationId': '1'// 加油站id（先给死值1）
            }],
            'tbOilsPromotionSupportPaymentList': that.tbOilsPromotionSupportPaymentList,
            'tbOilsPromotionTimeList': that.tbOilsPromotionTimeList,
            'whetherThePromotionIsUnlimited': that.frequency// 促销是否无限次  0 无限次   1有限
          },
          {
            headers: {
              'Authorization': 'Cfyg-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjAifQ.EzOtp4tB1dD7xTGWIc5Dlceoi7undj9ikhDdkuz23N_te3iLoE61nqSd-X-9hmC_ERIdKMXu62ZHbuV4vqWzhQ'
            }
          })
        .then(function(res) {
          console.log('提交成功')
          console.log(res.body)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
        .catch(function(err) {
          console.log('提交失败')
          console.log(err)
          this.$message.error('添加失败')
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
h3{
  padding-left: 50px;
}
.inp{
  margin-bottom: 20px;
}
 .left,.right{
  display: inline-block;

}
.inp .left{
  width: 115px;
  text-align: right;
}
.t{
 vertical-align: top;
}
.inp .right{
  padding-left: 10px;
}
.shijian{
  vertical-align: top;
  line-height: 36px;
}
.date{
  border:1px solid gray;
  padding: 10px;
}
.text p{
  margin-top: 0;
}
.wen{
  width: 70%;
}
.kuang{
  width: 200px;
  border: 1px solid gray;
  padding: 5px;
}
.kuang .el-checkbox{
  margin-left: 0;
  margin-right: 25px;
}
.footer{
  padding: 10px 50px;
}
.but{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.but button+button{
  margin-left: 100px;
}
.gui{
  border:1px solid gray;
}
select{
  width: 110px;
  padding: 2px;
  border-radius: 8px;

}
#zhan{
  width: 200px;
}
</style>
