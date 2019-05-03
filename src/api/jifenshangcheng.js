import request from '@/utils/request'

//商品管理列表获取
export function getshanglist(data) {
    return request({
      url: '/wechat/selectWechatGoods',
      method: 'post',
      data
    })
}
//商品管理新增
export function addshang(data) {
    return request({
      url: '/wechat/addWechatGoods',
      method: 'post',
      data
    })
}
//商品管理编辑
export function bianjishang(data) {
    return request({
      url: '/wechat/updateWechatGoods',
      method: 'post',
      data
    })
}
//商品管理排序
export function paixushang(data) {
    return request({
      url: '/wechat/sortTbWechatGoods',
      method: 'post',
      data
    })
}
//banner管理列表获取
export function getbannerlist(data) {
    return request({
      url: '/wechat/selectWechatBanner',
      method: 'post',
      data
    })
}
//banner管理新增
export function addbanner(data) {
    return request({
      url: '/wechat/addWechatBanner',
      method: 'post',
      data
    })
}
//banner管理修改
export function xiubanner(data) {
    return request({
      url: '/wechat/updateTbWechatBanner',
      method: 'post',
      data
    })
}
//banner管理删除
export function delbanner(data) {
    return request({
      url: '/wechat/delTbWechatBanner',
      method: 'post',
      data
    })
}
//订单管理列表获取
export function getdinglist(data) {
    return request({
      url: '/wechat/selectWechatOrder',
      method: 'post',
      data
    })
}
//订单管理发货
export function fahuo(data) {
    return request({
      url: '/wechat/sendWechatOrder',
      method: 'post',
      data
    })
}
//订单管理查看详情
export function chaxiang(data) {
    return request({
      url: '/wechat/selectWechatOrderById',
      method: 'post',
      data
    })
}
//获取商品类型
export function getshangtype(data) {
    return request({
      url: '/goodsType/getGoodsTypeList',
      method: 'post',
      data
    })
}

//删除商品
export function deleteWechatGoods(data) {
  return request({
    url: '/wechat/deleteWechatGoods',
    method: 'post',
    data
  })
}
//Banner管理排序
export function paixuBanner(data) {
  return request({
    url: '/wechat/sortTbWechatBanner',
    method: 'post',
    data
  })
}

//物流公司
export function wuliu(data) {
  return request({
    url: 'wechat/selectDictionaries',
    method: 'post',
    data
  })
}
// get(data)
//     .then(response => {
//         console.log(response.data)
//     })>>>>>>> .r3030
