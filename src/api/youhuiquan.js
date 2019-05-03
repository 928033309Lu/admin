import request from '@/utils/request'

//新增优惠券
export function addyouhui(data) {
    return request({
      url: '/coupon/add',
      method: 'post',
      data
    })
}
//优惠券列表
export function getyouhuilist(data) {
    return request({
      url: '/coupon/list',
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
//商品类别列表获取
export function getGoodsList(data) {
  return request({
    url: '/goodsType/getGoodsTypeList',
    method: 'post',
    data
  })
}
//发送记录列表获取
export function sendList(data) {
  return request({
    url: '/send/list',
    method: 'post',
    data
  })
}
//会员列表获取
export function queryMember(data) {
  return request({
    url: '/member/queryMember',
    method: 'post',
    data
  })
}
//微信群发
export function weifa(data) {
  return request({
    url: '/send/add',
    method: 'post',
    data
  })
}

//优惠券列表
export function getYhList(data) {
    return request({
      url: '/send/list',
      method: 'post',
      data
    })
}

//发送优惠券
export function sendYh(data) {
    return request({
      url: '/send/add',
      method: 'post',
      data
    })
}

//电子优惠券查看详情
export function couponDetail(data) {
  return request({
    url: '/coupon/detail',
    method: 'post',
    data
  })
}

//电子优惠券停止
export function couponUpdate(data) {
  return request({
    url: '/coupon/update',
    method: 'post',
    data
  })
}

//电子优惠券删除
export function couponDelete(data) {
  return request({
    url: '/coupon/delete',
    method: 'post',
    data
  })
}