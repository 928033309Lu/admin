import request from '@/utils/request'

//油品管理列表
export function oilList(data) {
	console.log(data)
  return request({
    url: '/oils/getOilsList',
    method: 'post',
    data
  })
}


//油品管理添加
export function oilAdd(data) {
	console.log(data)
  return request({
    url: '/oils/add-oils',
    method: 'post',
    data
  })
}



//油品信息详情
export function oilDetail(data) {
	console.log(data)
  return request({
    url: '/oils/getOilsOilsDetailById',
    method: 'post',
    data
  })
}


//油品信息修改
export function oilUp(data) {
	console.log(data)
  return request({
    url: '/oils/update-oils-select',
    method: 'post',
    data
  })
}

//油品删除
export function oilDel(data) {
	console.log(data)
  return request({
    url: '/oils/delete-oils',
    method: 'post',
    data
  })
}



//油品采购
export function oilCaigou(data) {
  console.log(data)
  return request({
    url: '/oilsPurchaseApply/addOilsPurchaseApplyInfo',
    method: 'post',
    data
  })
}



//油品采购列表
export function oilCaigouList(data) {
  return request({
    url: '/oilsPurchaseApply/getOilsPurchaseApplyList',
    method: 'post',
    data
  })
}

//油品采购详情
export function oilCaigouDetail(data) {
  return request({
    url: '/oilsPurchaseApply/getOilsPurchaseApplyById',
    method: 'post',
    data
  })
}

//油品采购撤销
export function oilShangChex(data) {
  return request({
    url: '/oilsPurchaseApply/delOilsPurchaseApplyById',
    method: 'post',
    data
  })
}


//油品调拨申请
export function oilDBshen(data) {
  return request({
    url: '/oilsAllocateApply/applyOilsAllocateApply',
    method: 'post',
    data
  })
}

      //油品销量
export  function oilxiaoliang(data){
      return request ({
          url:'oils/getOilsStationOilsYesterdayAndLastweekSales',
          method:'post',
          data
      })
}

//油品调拨列表
export function oilDBList(data) {
  return request({
    url: '/oilsAllocateApply/getOilsAllocateApplyAndInputList',
    method: 'post',
    data
  })
}

//油品调拨撤销
export function oilDBChex(data) {
  return request({
    url: '/oilsAllocateApply/cancelOilsAllocateApply',
    method: 'post',
    data
  })
}



//油品调拨信息
export function oilDBDetail(data) {
  return request({
    url: '/oilsAllocateApply/getOilsAllocateApplyById',
    method: 'post',
    data
  })
}

//油品调拨商户审核
export function oilDBShenhe(data) {
  return request({
    url: '/oilsAllocateApply/outOilsAllocateApply',
    method: 'post',
    data
  })
}

//油品调拨入库信息
export function oilDBRuKu(data) {
  return request({
    url: '/oilsAllocateApply/getOilsAllocateInputById',
    method: 'post',
    data
  })
}



//获取油罐及库存
export function oilYGList(data) {
  return request({
    url: '/oils/getOilsStationOilsRepertory',
    method: 'post',
    data
  })
}


//根据条件获取油品倒罐列表
export function oilDGList(data) {
  return request({
    url: '/oilsPour/getOilsPourList',
    method: 'post',
    data
  })
}


//添加油品倒罐申请信息
export function oilDGAdd(data) {
  return request({
    url: '/oilsPour/addOilsPourInfo',
    method: 'post',
    data
  })
}


//根据ID获取油品倒罐信息
export function oilDGDetail(data) {
  return request({
    url: '/oilsPour/getOilsPourById',
    method: 'post',
    data
  })
}


//修改油品倒罐申请信息
export function oilDGUpdata(data) {
  return request({
    url: '/oilsPour/updateOilsPourInfo',
    method: 'post',
    data
  })
}



//撤销删除油品倒罐信息
export function oilDGDelete(data) {
  return request({
    url: '/oilsPour/cancelOilsPour',
    method: 'post',
    data
  })
}




//根据条件获取油品换号列表
export function oilHHList(data) {
  return request({
    url: '/oilsNoChange/getOilsNoChangeList',
    method: 'post',
    data
  })
}



//根据条件获取油品换号列表
export function oilHHDetail(data) {
  return request({
    url: '/oilsNoChange/getOilsNoChangeById',
    method: 'post',
    data
  })
}



//获取罐号
export function oilGuanhao(data) {
  return request({
    url: '/oilsStation/getOilcanList',
    method: 'post',
    data
  })
}



//根据条件获取油品业务订单列表
export function oilsBusList(data) {
  return request({
    url: '/oils/getOilsBusinessOrderList',
    method: 'post',
    data
  })
}

//油品销量走势图
export function getOilsStationOils(data) {
  return request({
    url: '/oils/getOilsStationOilsLastweekSales',
    method: 'post',
    data
  })
}



