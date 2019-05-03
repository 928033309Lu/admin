import request from '@/utils/request'

//签到设置获取
export function getshezhi(data) {
    return request({
      url: 'marketing-electronic/selectNewActivity',
      method: 'post',
      data
    })
}
//签到设置保存
export function baocun(data) {
    return request({
      url: 'marketing-electronic/setActivity',
      method: 'post',
      data
    })
}
//新人有礼获取
export function getxinren(data) {
    return request({
      url: 'marketing-electronic/selectNewActivity',
      method: 'post',
      data
    })
}
//新人有礼保存
export function xinrenbaocun(data) {
    return request({
      url: 'marketing-electronic/setActivity',
      method: 'post',
      data
    })
}
//优惠券列表
export function quanlist(data) {
  return request({
    url: 'coupon/list',
    method: 'post',
    data
  })
}
//会员等级列表
export function queryAllMemberLevel(data) {
  return request({
    url: 'member/queryAllMemberLevel',
    method: 'post',
    data
  })
}
//签到统计
export function selectSignStatistics(data) {
  return request({
    url: 'marketing-electronic/selectSignStatistics',
    method: 'post',
    data
  })
}
// getshezhi(data)
//     .then(response => {
//         console.log(response.data)
//     })