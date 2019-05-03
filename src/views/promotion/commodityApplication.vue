<template>
  <div class="warp">
    <h3>商品促销申请</h3>
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
                <option value="商品满数量，单价立减">商品满数量，单价立减</option>
                <option value="商品满一定数量，限定数量内的商品总价立减">商品满一定数量，限定数量内的商品总价立减</option>
                <option value="商品单价立减">商品单价立减</option>
                <option value="商品卖赠促销">商品卖赠促销</option>
                <option value="商品订单满金额，总价立减">商品订单满金额，总价立减</option>
                <option value="商品订单满金额，总价百分比优惠">商品订单满金额，总价百分比优惠</option>
                <option value="商品订单满金额，赠送指定商品">商品订单满金额，赠送指定商品</option>
                <option value="最低价免费">最低价免费</option>
              </select>
              <p>买指定便利店商品达到一定数量及以上，单价扣减指定金额</p>
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
            label="商品"
            align="center"
            width="280">
            <template slot-scope="scope">
              <el-input v-model="scope.row.commodityName" placeholder="请选择商品" style="width: 150px;"/>
              <!-- 添加商品框 -->
              <el-popover
                v-model="show"
                placement="top-start"
                visible-arrow="false"
                width="1000"
                trigger="click">
                <div class="big">
                  <div class="leibie">
                    <span>商品类型：</span>
                    <el-select v-model="xuanType" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px" @change="handleFilter">
                      <el-option v-for="item in commodityType" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
                    </el-select>
                    <select id="lei" name="lei" >
                      <option v-for="(item, index) in commodityType" :key="index" value="item">{{ item }}</option>
                    </select>
                  </div>
                  <div class="sou">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                  </div>
                </div>
                <el-table
                  ref="filterTable"
                  :data="commodityData.filter(data => !search || data.commodityName.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"/>
                  <el-table-column
                    prop="commodityType"
                    label="商品类型"
                    sortable
                    width="150"
                  />
                  <el-table-column
                    prop="commodityName"
                    label="商品名称"
                    sortable
                    width="150"/>
                  <el-table-column
                    prop="brand"
                    label="品牌"
                    width="150"/>
                  <el-table-column
                    prop="stock"
                    label="库存"
                    sortable
                    width="100"/>
                  <el-table-column
                    prop="company"
                    label="单位"
                    width="150"/>
                  <el-table-column
                    prop="unitPrice"
                    label="单价"
                    sortable
                    width="150"/>
                  <el-table-column
                    prop="specifications"
                    label="规格"
                    sortable
                    width="150"/>
                  <el-table-column
                    prop="guaranteePeriod"
                    label="保质期"
                    sortable
                    width="150"/>
                  <el-table-column
                    v-if="0"
                    align="right">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope" >
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button v-if="scope.row.commodityName==''||scope.row.commodityName==null" slot="reference">+</el-button>
                <div class="but">
                  <el-button slot="reference" @click="addcommodity">确认添加</el-button>
                </div>
              </el-popover>

            </template>
          </el-table-column>
          <el-table-column
            label="条码"
            align="center"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.barCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="促销数量"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.volume" type="number" placeholder="0" style="width: 100px;"/> 个
            </template>
          </el-table-column>
          <el-table-column
            label="优惠金额"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" type="number" placeholder="0.0" step="0.1" style="width: 100px;"/> 元
            </template>
          </el-table-column>
          <el-table-column label="说明" align="center" >
            <template slot-scope="scope">
              <span v-if="scope.row.commodityName" class="shuoming">{{ scope.row.commodityName }} 购买{{ scope.row.volume }}个以上，单价立减{{ scope.row.amount }}元</span>
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
  name: 'CommodityApplication',
  data() {
    return {
      promotionName: '', // 促销名称
      promotionType: '商品满数量，单价立减', // 促销类型
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
        commodityName: '', // 商品
        barCode: '', // 条码
        volume: '', // 促销数量
        amount: '', // 优惠金额
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }],
      search: '', // 关键字查询,
      commodityType: ['全部', '包装饮料', '面包'], // 商品类型
      // 商品列表
      commodityData: [{
        commodityType: '包装饮料', // 商品类型
        commodityName: '哇哈哈 150ml', // 商品名字
        brand: '哇哈哈', // 品牌
        stock: '1000', // 库存
        company: '瓶', // 单位
        unitPrice: '3.00', // 单价
        specifications: '150ml', // 规格
        guaranteePeriod: '60天', // 保质期
        barCode: '69700000000000', // 条码
        volume: '20', // 促销数量
        amount: '1.00', // 优惠金额
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }, {
        commodityType: '包装饮料', // 商品类型
        commodityName: '哇哈哈 150ml', // 商品名字
        brand: '哇哈哈', // 品牌
        stock: '1000', // 库存
        company: '瓶', // 单位
        unitPrice: '3.00', // 单价
        specifications: '150ml', // 规格
        guaranteePeriod: '60天', // 保质期
        barCode: '69700000000000', // 条码
        volume: '20', // 促销数量
        amount: '1.00', // 优惠金额
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }, {
        commodityType: '包装饮料', // 商品类型
        commodityName: '哇哈哈 150ml', // 商品名字
        brand: '哇哈哈', // 品牌
        stock: '1000', // 库存
        company: '瓶', // 单位
        unitPrice: '3.00', // 单价
        specifications: '150ml', // 规格
        guaranteePeriod: '60天', // 保质期
        barCode: '69700000000000', // 条码
        volume: '20', // 促销数量
        amount: '1.00', // 优惠金额
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }],
      multipleSelection: [], // 添加的商品列表暂存器
      show: false, // 控制添加商品是否隐藏
      xuanType: ''// 选中的商品类型
    }
  },
  methods: {
    add() {
      var obj = {
        commodity: '', // 商品
        barCode: '', // 条码
        volume: '', // 促销数量
        amount: '', // 优惠金额
        ruleDescription: '92号 车用汽油 加油满20升单价立减0.5元'// 规则说明
      }
      this.ruleData.push(obj)
    },
    del() {
      this.ruleData.pop()
    },
    // 添加商品
    addcommodity() {
      this.show = false
      this.ruleData = this.multipleSelection
    },
    // 筛选
    handleFilter() {

    },
    tijiao() {
      console.log(document.querySelectorAll('.shuoming')[0].innerHTML)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
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
.big{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}

.sou{
    width: 300px;
}
</style>
