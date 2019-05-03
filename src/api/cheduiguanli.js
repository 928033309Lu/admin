import request from '@/utils/request'

//车队查询详情
export function getxiangqing(data) {
    return request({
      url: '/motorcade/queryTbMotorcadeById',
      method: 'post',
      data
    })
}
//车队查询详情修改
export function xiuxiangqing(data) {
    return request({
      url: '/motorcade/updateTbMotorcade',
      method: 'post',
      data
    })
}
//车队查询交易记录
export function getjiaolu(data) {
    return request({
      url: '/motorcade/queryTbMotorcadeTransaction',
      method: 'post',
      data
    })
}
//查询车队管理员信息
export function chacheguan(data) {
    return request({
      url: '/member/queryMember',
      method: 'post',
      data
    })
}
//获取油站列表
export function getyouzhan(data) {
    return request({
      url: '/oilsStation/getOilsStationList',
      method: 'post',
      data
    })
}
//获取油品列表
export function getyoupin(data) {
    return request({
      url: '/oils/getOilsList',
      method: 'post',
      data
    })
}
//新增车队卡
export function addka(data) {
    return request({
      url: '/motorcade/add',
      method: 'post',
      data
    })
}
//车队查询 搜索 筛选
export function shoushai(data) {
    return request({
      url: '/motorcade/queryTbMotorcade',
      method: 'post',
      data
    })
}
//车队充值 搜索车队 
export function shousuo(data) {
    return request({
      url: '/motorcade/queryMotorcadeForRecharge',
      method: 'post',
      data
    })
}
//车队充值 交易记录查询 
export function jiaocha(data) {
    return request({
      url: '/motorcade/queryMotorcadeForRechargeList',
      method: 'post',
      data
    })
}
//车队充值 充值
export function chongzhi(data) {
    return request({
      url: '/motorcade/motorcadeForRecharge',
      method: 'post',
      data
    })
}
//车队查询 交易记录 详情
export function getjiaoxiang(data) {
  return request({
    url: '/motorcade/queryTbMotorcadeTransactionDetails',
    method: 'post',
    data
  })
}
//车队统计  查询
export function tongjicha(data) {
  return request({
    url: '/motorcade/queryMotorcadeStatistics',
    method: 'post',
    data
  })
}
//车队统计  详情
export function tongjixiang(data) {
  return request({
    url: '/motorcade/queryMotorcadeOils',
    method: 'post',
    data
  })
}
//车队统计  确认入账
export function updateMotorcadeReChargeById(data) {
  return request({
    url: '/motorcade/updateMotorcadeReChargeById',
    method: 'post',
    data
  })
}
//获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/logins/getUserInfo',
    method: 'post',
    data
  })
}
// /oilsStation/getOilsStationInfoByID
//获取用户油站信息
export function getOilsStationInfo(data) {
  return request({
    url: '/oilsStation/getOilsStationInfoByID',
    method: 'post',
    data
  })
}
//获取用户油站信息
export function vocationList(data) {
  return request({
    url: '/district/list-vocation',
    method: 'post',
    data
  })
}
// logins/getUserInfo
// get(a)
//     .then(response => {
//         console.log(response.data)
//     })