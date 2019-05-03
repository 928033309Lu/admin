import request from '@/utils/request'
//油站的商品采购
export function orderCaigou(data) {
  return request({
    url: '/goodsPurchaseApply/addGoodsPurchaseApplyInfo',
    method: 'post',
    data
  })
}

//所有商品列表能查库存数量
export function orderList(data) {
  return request({
    url: '/goods/getGoodsListByOilsStation',
    method: 'post',
    data
  })
}
export function deleteGoodsByID(data) {
  return request({
    url: '/goods/deleteGoodsByID',
    method: 'post',
    data
  })
}

//所有商品列表
export function orderListNo(data) {
  return request({
    url: '/goods/getGoodsList',
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

//更改商品信息
export function orderUp(data) {
  return request({
    url: '/goods/updateGoodsInfo',
    method: 'post',
    data
  })
}

//商品无单收货
export function orderWudan(data) {
  return request({
    url: '/goodsPurchaseApply/receiveGoodsByNoOrder',
    method: 'post',
    data
  })
}




//商品开始申请的
export function orderShen(data) {
  return request({
    url: '/goodsPurchaseApply/addGoodsPurchaseApplyInfo',
    method: 'post',
    data
  })
}


//商品采购申请列表
export function orderShenList(data) {
  return request({
    url: '/goodsPurchaseApply/getGoodsPurchaseApplyList',
    method: 'post',
    data
  })
}

//商户商品采购申请信息
export function orderShenDetail(data) {
  return request({
    url: '/goodsApply/getGoodsApplyInfoByID',
    method: 'post',
    data
  })
}


//商品采购申请后撤销
export function orderShenCan(data) {
  return request({
    url: '/goodsPurchaseApply/cancelGoodsPurchaseApplyInfoByID',
    method: 'post',
    data
  })
}

//商品采购申请后待审批查看信息
export function orderShenShen(data) {
	console.log(data)
  return request({
    url: '/goodsPurchaseApply/getGoodsPurchaseApplyInfoAndGoodsListByID',
    method: 'post',
    data
  })
}


//获取供应商列表
export function SupplierList(data) {
  return request({
    url: '/supplier/getSupplierList',
    method: 'post',
    data
  })
}



//根据条件获取商品业务订单列表
export function businessOrderList(data) {
  return request({
    url: '/goods/getGoodsBusinessOrderList',
    method: 'post',
    data
  })
}



//--------------------------------商品调拨--------------------------------
//获取油站商品列表
export function diaoboList(data) {
  return request({
    url: '/oilsStationGoods/getOilsStationGoodsList',
    method: 'post',
    data
  })
}

//根据供应商获取油站列表
export function suppOilList(data) {
  return request({
    url: '/goodsPriceMaintain/getSupplierGoodsListByCompany',
    method: 'post',
    data
  })
}





//获取商品调拨列表
export function diaoShenList(data) {
  return request({
    url: '/goodsAllocateApply/getGoodsAllocateApplyAndInputList',
    method: 'post',
    data
  })
}

//获取商品调拨列表申请开始
export function diaoboShen(data) {
  return request({
    url: '/goodsAllocateApply/applyGoodsAllocateApply',
    method: 'post',
    data
  })
}

//获取商品调拨详细信息
export function diaoboDetail(data) {
  return request({
    url: '/goodsAllocateApply/getGoodsAllocateApplyAndGoodsListByID',
    method: 'post',
    data
  })
}

//获取商品调拨确认入库
export function diaoboRuku(data) {
  return request({
    url: '/goodsAllocateApply/inputGoodsAllocateApply',
    method: 'post',
    data
  })
}

//获取商品调拨撤销
export function diaoboCheXiao(data) {
  return request({
    url: '/goodsAllocateApply/deleteGoodsAllocateApply',
    method: 'post',
    data
  })
}


//---------------------------------------商品报废-----------------------------------

//获取商品报废和退货列表
export function returnedList(data) {
  return request({
    url: '/goodsReturned/getGoodsReturnedList',
    method: 'post',
    data
  })
}

//获取商品申请报废
export function returnedShen(data) {
  return request({
    url: '/goodsReturned/applyGoodsReturned',
    method: 'post',
    data
  })
}

//获取商品申请报废详细信息
export function returnedDetail(data) {
	console.log(data)
  return request({
    url: '/goodsReturned/getGoodsReturnedInfoAndGoodsListByID',
    method: 'post',
    data
  })
}

//获取商品申请报废审核拒绝
export function returnedJujue(data) {
  return request({
    url: '/goodsReturned/reviewGoodsReturnedByMerchant',
    method: 'post',
    data
  })
}

//获取商品申请报废撤销
export function returnedChex(data) {
  return request({
    url: '/goodsReturned/deleteGoodsReturnedInfo',
    method: 'post',
    data
  })
}



//获取商品订单管理申请报废审核拒绝
export function returnedJujueDingdan(data) {
  return request({
    url: '/goodsReturned/confirmGoodsReturned',
    method: 'post',
    data
  })
}



/*-----------------------------------------------------------------*/

//集团获取商品列表
export function jituanSPList(data) {
  return request({
    url: '/goodsSearch/getGoodsByBlocList',
    method: 'post',
    data
  })
}

//集团获取商品详情
export function jituanSPDetail(data) {
  return request({
    url: '/goodsSearch/getGoodsInfoByBloc',
    method: 'post',
    data
  })
}

//更新商品条码 增删改
export function jituanSPBock(data) {
  return request({
    url: '/goodsSearch/editGoodsBarCodeByGoodsId',
    method: 'post',
    data
  })
}



//商户获取商品列表
export function shangSPList(data) {
  return request({
    url: '/goodsSearch/getGoodsByMerchantList',
    method: 'post',
    data
  })
}


//商户获取商品详情
export function shangSPDetail(data) {
  return request({
    url: '/goodsSearch/getGoodsInfoByMerchant',
    method: 'post',
    data
  })
}

//油站获取商品列表
export function zhanSPList(data) {
  return request({
    url: '/goodsSearch/getGoodsByOilsStationList',
    method: 'post',
    data
  })
}

//油站获取商品详情
export function zhanSPDetail(data) {
  return request({
    url: '/goodsSearch/getGoodsInfoByOilsStation',
    method: 'post',
    data
  })
}


//根据商品ID编辑商品条码
export function orderTMList(data) {
	console.log(data);
  return request({
    url: '/goods/getGoodsBarCodeByGoodsId',
    method: 'post',
    data
  })
}


//根据商品ID获取操作日志
export function orderRiList(data) {
	console.log(data);
  return request({
    url: '/goods/getGoodsOrderLogList',
    method: 'post',
    data
  })
}



//根据商户的供应商ID获取商品列表
export function suppliOrder(data) {
	console.log(data);
  return request({
    url: '/goodsPriceMaintain/getGoodsPriceMaintainList',
    method: 'post',
    data
  })
}





