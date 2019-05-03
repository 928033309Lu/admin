import request from '@/utils/request'
//更改供应商进价
export function supplierJinjia(data) {
  return request({
    url: '/goodsPriceMaintain/editGoodsPriceMaintain',
    method: 'post',
    data
  })
}

//删除供应商一条商品信息
export function supplierOrderDelete(data) {
  return request({
    url: '/goodsPriceMaintain/deleteGoodsPriceMaintainByID',
    method: 'post',
    data
  })
}


//供应商维护添加油品
export function supplierWeihuOilAdd(data) {
  return request({
    url: '/supplier/addSupplierOilsMaintainInfo',
    method: 'post',
    data
  })
}

//根据供应商获取供应商油品维护信息列表
export function supplierWeihuOilList(data) {
  return request({
    url: '/supplier/getSupplierOilsMaintainListBySupplier',
    method: 'post',
    data
  })
}

//删除供应商油品维护信息
export function supplierWeihuOilDel(data) {
  return request({
    url: '/supplier/deleteSupplierOilsMaintainInfo',
    method: 'post',
    data
  })
}

//根据供应商获取供应商油品维护信息
export function supplierWeihuOilDetail(data) {
  return request({
    url: '/supplier/getSupplierOilsMaintainByID',
    method: 'post',
    data
  })
}


//修改供应商油品维护信息
export function supplierWeihuOilUp(data) {
  return request({
    url: '/supplier/updateSupplierOilsMaintainInfo',
    method: 'post',
    data
  })
}


//添加供应商油站距离维护信息
export function supplierWeihuStationAdd(data) {
  return request({
    url: '/supplier/addSupplierDistanceMaintainInfo',
    method: 'post',
    data
  })
}
//根据供应商获取油站的运距信息
export function  yunju(data){
      return request({
        url:'/supplier/getOilsStationToSupplierDistance',
        method:'post',
        data
      })
}


//根据供应商获取供应商油站距离维护信息列表
export function supplierWeihuStationList(data) {
  return request({
    url: '/supplier/getSupplierDistanceMaintainListBySupplier',
    method: 'post',
    data
  })
}


//根据ID获取供应商油站距离维护信息
export function supplierWeihuStationDetail(data) {
  return request({
    url: '/supplier/getSupplierDistanceMaintainByID',
    method: 'post',
    data
  })
}



//修改供应商油站距离维护信息
export function supplierWeihuStationUp(data) {
  return request({
    url: '/supplier/updateSupplierDistanceMaintainInfo',
    method: 'post',
    data
  })
}





//删除供应商油站维护信息
export function supplierWeihuStationDel(data) {
  return request({
    url: '/supplier/deleteSupplierDistanceMaintainInfo',
    method: 'post',
    data
  })
}
