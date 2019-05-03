import request from '@/utils/request'

//供应商列表 shangpin.js里面有


//供应商添加
export function oilTj(data) {
	console.log(data);
  return request({
    url: '/supplier/addSupplierInfo',
    method: 'post',
    data
  })
}

//供应商状态更新
export function gengxin(data) {
	console.log(data);
  return request({
    url: '/supplier/updateSupplierInfo',
    method: 'post',
    data
  })
}

//供应商查看
export function chakan(data) {
	console.log(data);
  return request({
    url: '/supplier/getSupplierInfoByID',
    method: 'post',
    data
  })
}

//供应商所有油品
export function supplierOil(data) {
	console.log(data);
  return request({
    url: '/supplier/getSupplierOilsMaintainBySupplier',
    method: 'post',
    data
  })
}

//供应商所有油站
export function supplierStation(data) {
	console.log(data);
  return request({
    url: '/supplier/getSupplierDistanceMaintainBySupplier',
    method: 'post',
    data
  })
}

//供应商维护添加油站
export function supplierAddStation(data) {
	console.log(data);
  return request({
    url: '/supplier/addSupplierDistanceMaintainInfo',
    method: 'post',
    data
  })
}



//供应商信息更新
export function gengxinxinxi(data) {
	console.log(data);
  return request({
    url: '/supplier/updateSupplierInfo',
    method: 'post',
    data
  })
}


//商品列表
export function orderList(data) {
	console.log(data);
  return request({
    url: '/goods/getGoodsList',
    method: 'post',
    data
  })
}


//商品添加
export function orderAdd(data) {
	console.log(data);
  return request({
    url: '/goods/addGoodsInfo',
    method: 'post',
    data
  })
}

//商品查看
export function orderSee(data) {
	console.log(data);
  return request({
    url: '/goods/getGoodsInfoByID',
    method: 'post',
    data
  })
}


//商品类别
export function orderLei(data) {
  return request({
    url: '/goodsType/getGoodsTypeList',
    method: 'post',
    data
  })
}



//商户申请商品添加
export function orderMAdd(data) {
	console.log(data);
  return request({
    url: '/goodsApply/addGoodsApplyInfo',
    method: 'post',
    data
  })
}


//集团商品申请审核列表
export function orderShenhe(data) {
	console.log(data);
  return request({
    url: '/goodsApply/getGoodsApplyList',
    method: 'post',
    data
  })
}

//集团商品申请审核操作
export function orderTJ(data) {
	console.log(data);
  return request({
    url: '/goodsApply/reviewApplyGoodsVo',
    method: 'post',
    data
  })
}

//商户商品申请撤销操作
export function orderCX(data) {
	console.log(data);
  return request({
    url: '/goodsApply/deleteGoodsApplyInfoByID',
    method: 'post',
    data
  })
}

//商户订单管理确认发货
export function orderFH(data) {
	console.log(data);
  return request({
    url: '/goodsPurchaseApply/deliveryGoodsByApplyCommodity',
    method: 'post',
    data
  })
}


//根据条件获取供应商商品进价维护信息列表
export function orderJJList(data) {
	console.log(data);
  return request({
    url: '/goodsPriceMaintain/getGoodsPriceMaintainList',
    method: 'post',
    data
  })
}


//根据ID获取油品采购申请信息与油品出库信息/油品运输信息
export function transport(data) {
	console.log(data);
  return request({
    url: '/oilsPurchaseApply/getOilsPurchaseApplyAndOutputAndTransportById',
    method: 'post',
    data
  })
}

