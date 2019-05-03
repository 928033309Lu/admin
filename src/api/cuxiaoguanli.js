import request from '@/utils/request'

//促销管理列表
export function getculist(data) {
    return request({
      url: '/promotion/list',
      method: 'post',
      data
    })
}

//油站列表获取 oilsStation/getOilsStationList
export function getyoulist(data) {
    return request({
      url: '/oilsStation/getOilsStationList',
      method: 'post',
      data
    })
}
//促销油站列表获取
export function getcuyoulist(data) {
    return request({
      url: '/promotion/stationList',
      method: 'post',
      data
    })
}
//油品列表获取
export function getOilsList(data) {
    return request({
      url: '/oils/getOilsList',
      method: 'post',
      data
    })
}
//商品列表获取
export function getGoodsList(data) {
    return request({
      url: '/goods/getGoodsListByOilsStation',
      method: 'post',
      data
    })
}
//商品类别获取
export function getGoodsTypeList(data) {
    return request({
      url: '/goodsType/getGoodsTypeList',
      method: 'post',
      data
    })
}
//停止促销
export function stopcu(data) {
    return request({
      url: '/promotion/update',
      method: 'post',
      data
    })
}
//促销新增
export function addcu(data) {
    return request({
      url: '/promotion/add',
      method: 'post',
      data
    })
}
//促销查看详情
export function seexiang(data) {
  return request({
    url: '/promotion/detail',
    method: 'post',
    data
  })
}
//促销撤销
export function chexiao(data) {
  return request({
    url: '/promotion/cancelPromotionByStation',
    method: 'post',
    data
  })
}
//促销审批
export function shenpi(data) {
  return request({
    url: '/promotion/reviewPromotionByMerchant',
    method: 'post',
    data
  })
}
//促销统计
export function statistics(data) {
  return request({
    url: '/promotion/statistics',
    method: 'post',
    data
  })
}


// get(a)
//     .then(response => {
//         console.log(response.data)
//     })