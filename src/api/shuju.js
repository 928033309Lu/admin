import request from '@/utils/request'

//待办事项
export function daibanList(data) {
  console.log(data)
  return request({
    url: '/orderManage/getOrderInfoList',
    method: 'post',
    data
  })
}


//根据条件获取油站列表
export function youzhanAllList(data) {
  return request({
    url: '/oilsStation/getOilsStationList',
    method: 'post',
    data
  })
}

//待办事项获取油站列表
export function youzhanList(data) {
  return request({
    url: '/oilsStation/getOilsStationListByCompany',
    method: 'post',
    data
  })
}


//根据商户id获取油站列表
export function comYouzhanList(data) {
  return request({
    url: '/oilsStation/getOilsStationList',
    method: 'post',
    data
  })
}

//待办事项获取业务详情
export function yewuDetail(data) {
  return request({
    url: '/goodsPurchaseApply/getGoodsPurchaseApplyInfoAndGoodsListByID',
    method: 'post',
    data
  })
}

//待办事项获取商品的供应商
export function orderGong(data) {
  return request({
    url: '/goodsPurchaseApply/getSupplierListByGoodsID',
    method: 'post',
    data
  })
}

//待办事项获取商品的供应商进价列表
export function orderGongPrice(data) {
  return request({
    url: '/goodsPurchaseApply/getGoodsPriceMaintainListByGoodsID',
    method: 'post',
    data
  })
}


//待办事项商品采购申请审核通过
export function orderTong(data) {
  return request({
    url: '/goodsPurchaseApply/updateGoodsPurchaseApplyInfo',
    method: 'post',
    data
  })
}


//待办事项商品采购确认收货
export function orderShouhuo(data) {
  return request({
    url: '/goodsPurchaseApply/receiveGoodsByApplyCommodity',
    method: 'post',
    data
  })
}

//待办事项商品调拨申请详情
export function orderDiaobo(data) {
  return request({
    url: '/goodsAllocateApply/getGoodsAllocateApplyAndGoodsListByID',
    method: 'post',
    data
  })
}


//待办事项商品调拨拒绝
export function orderdb(data) {
  return request({
    url: '/goodsAllocateApply/outGoodsAllocateApply',
    method: 'post',
    data
  })
}


/*价格管理列表*/
export function priceList(data) {
  return request({
    url: '/oilsGoodsChangePrice/getOGChangePriceList',
    method: 'post',
    data
  })
}

/*价格管理变价申请*/
export function priceUp(data) {
  return request({
    url: '/oilsGoodsChangePrice/addOGChangePriceInfo',
    method: 'post',
    data
  })
}

/*价格管理变价完成弹框*/
export function priceO(data) {
  return request({
    url: '/oilsGoodsChangePrice/getOGChangePriceAndOGListByID',
    method: 'post',
    data
  })
}



/*根据商户和油站查油枪油品价格*/
export function yuoqiangPrice(data) {
  return request({
    url: '/oilsStationOils/getOilsStationOilsPriceList',
    method: 'post',
    data
  })
}



//待办事项油品采购详情
export function oilShen(data) {
  return request({
    url: '/oilsPurchaseApply/getOilsPurchaseApplyById',
    method: 'post',
    data
  })
}


//根据当前油站获取油站的油品供应商列表及供应商对应的油品
export function getOilSupplierAndOilsListByStation(data) {
  return request({
    url: '/oilsPurchaseApply/getOilSupplierAndOilsListByStation',
    method: 'post',
    data
  })
}


//商户待办审核油品采购申请信息
export function oilShangChuKu(data) {
  return request({
    url: '/oilsPurchaseApply/reviewOilsPurchaseApplyByMerchant',
    method: 'post',
    data
  })
}

//集团审核油品采购出库
export function oilJiChuku(data) {
  return request({
    url: '/oilsPurchaseApply/deliveryOilsPurchaseApplyByBloc',
    method: 'post',
    data
  })
}
//根据ID获取油品采购申请信息与油品出库信息/油品运输信息
export function oilDingXiu(data) {
  return request({
    url: '/oilsPurchaseApply/getOilsPurchaseApplyAndOutputAndTransportById',
    method: 'post',
    data
  })
}

//集团修改油品采购出库信息/油品运输信息
export function oilDingXiuGai(data) {
  return request({
    url: '/oilsPurchaseApply/deliveryUpdateOilsPurchaseApplyByBloc',
    method: 'post',
    data
  })
}
//交易记录 /oilsStation/getOilgunList
export function orderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data
  })
}

//交易记录详情 /oilsStation/getOilgunList
export function orderDetail(data) {
  return request({
    url: '/order/detail',
    method: 'post',
    data
  })
}

//根据油站id获取油枪列表 
export function getOilgunList(data) {
  return request({
    url: '/oilsStation/getOilgunList',
    method: 'post',
    data
  })
}
//修改授权码
export function updateCode(data) {
  return request({
    url: '/oilsStation/updateCode',
    method: 'post',
    data
  })
}

export function district(data) {
  return request({
    url: '/district/list-district',
    method: 'post',
    data
  })
}

// 冻结会员
export function delMember(data) {
  return request({
    url: '/member/del-member',
    method: 'post',
    data
  })
}
// 收银机列表
export function getDeviceListByStation(data) {
  return request({
    url: 'order/getDeviceListByStation',
    method: 'post',
    data
  })
}
// 班结查询
export function getShiftUserLists(data) {
  return request({
    url: 'shift/user/getShiftUserLists',
    method: 'post',
    data
  })
}
// 班结查询 详情
export function detail(data) {
  return request({
    url: 'shift/user/detail',
    method: 'post',
    data
  })
}
// 班结查询 收银机营业额查看详情
export function cashierDetail(data) {
  return request({
    url: '/shift/user/cashier/detail',
    method: 'post',
    data
  })
}
// // 班结查询 详情
// export function detail(data) {
//   return request({
//     url: 'order/detail',
//     method: 'post',
//     data
//   })
// }