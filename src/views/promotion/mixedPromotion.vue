<template>
  <div class="warp">
    <h3>油品商品混合促销申请</h3>
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
                <option value="油品满金额，赠送指定商品">油品满金额，赠送指定商品</option>
                <option value="油品满升数，单价百分比优惠">油品满金额，赠送指定金额任意商品</option>
              </select>
              <p>买指定油品达到一定金额，赠送制定数量的便利店商品</p>
            </div>
          </div>
          <div class="inp">
            <div class="left">
              <span>促销油站</span>
            </div>
            <div class="right">
              <p>北京一号加油站</p>
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
                  <el-input v-model="startDate" placeholder="单行输入" type="date" style="width: 160px;"/>
                  <span>结束日期</span>
                  <el-input v-model="endDate" placeholder="单行输入" type="date" style="width: 160px;"/>
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
                  <el-radio v-model="frequency" label="1">无限制</el-radio>
                </div>
                <div class="ipt">
                  <el-radio v-model="frequency" label="2">天/次</el-radio>
                  <el-input v-model="totalTimes" size="mini" type="number" placeholder="0" style="width: 100px;"/>
                </div>
                <div class="ipt">
                  <el-radio v-model="frequency" label="3">总/次</el-radio>
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
        <el-table
          :data="ruleData"
          style="width: 100%">
          <el-table-column
            label="油品"
            align="center"
            width="180">
            <template slot-scope="scope">
              <select id="youpin" v-model="scope.row.oils" name="youpin">
                <option value="92号汽油">92号 汽油</option>
                <option value="95号汽油">95号 汽油</option>
                <option value="98号汽油">98号 汽油</option>
                <option value="0号柴油">0号 柴油</option>
              </select>
            </template>
          </el-table-column>
          <el-table-column
            label="促销金额"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"/> 元
            </template>
          </el-table-column>
          <el-table-column
            label="赠送商品"
            align="center"
            width="250">
            <template slot-scope="scope">
              <el-input v-model="scope.row.giftGoods" placeholder="0" style="width: 240px;"/>
            </template>
          </el-table-column>
          <el-table-column
            label="赠送数量"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.quantity" type="number" placeholder="0" style="width: 100px;"/> 瓶
            </template>
          </el-table-column>
          <el-table-column label="规则说明" align="center" >
            <template slot-scope="scope">
              <span v-if="scope.row.oils=='92号汽油'" class="shuoming">92号 车用汽油 加油满{{ scope.row.amount }}元，赠送 {{ scope.row.quantity }}瓶 {{ scope.row.giftGoods }}</span>
              <span v-if="scope.row.oils=='95号汽油'" class="shuoming">95号 车用汽油 加油满{{ scope.row.amount }}元，赠送 {{ scope.row.quantity }}瓶 {{ scope.row.giftGoods }}</span>
              <span v-if="scope.row.oils=='98号汽油'" class="shuoming">98号 车用汽油 加油满{{ scope.row.amount }}元，赠送 {{ scope.row.quantity }}瓶 {{ scope.row.giftGoods }}</span>
              <span v-if="scope.row.oils=='0号柴油'" class="shuoming">0号 车用柴油 加油满{{ scope.row.amount }}元，赠送 {{ scope.row.quantity }}瓶 {{ scope.row.giftGoods }}</span>
            </template>
          </el-table-column>
        </el-table>
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
  name: 'MixedPromotion',
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
      mode: ['会员卡'], // 促销支付方式
      frequency: '', // 促销次数限制1、无限制2、天/次3、总/次
      totalTimes: '', // 总/次
      dayTimes: '', // 天/次
      // 规则说明临时表格数据
      ruleData: [{
        oils: '92号汽油', // 油品
        amount: '200', // 促销金额
        giftGoods: '哇哈哈 AD钙 150ml', // 赠送商品
        quantity: 1, // 赠送数量
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 说明
      }]
    }
  },
  methods: {
    add() {
      var obj = {
        oils: '92号汽油', // 油品
        amount: '200', // 促销金额
        giftGoods: '哇哈哈 AD钙 150ml', // 赠送商品
        quantity: 1, // 赠送数量
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 说明
      }
      this.ruleData.push(obj)
    },
    del() {
      this.ruleData.pop()
    },
    tijiao() {
      console.log(document.querySelectorAll('.shuoming')[0].innerHTML)
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
</style>
