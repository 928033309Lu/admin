import request from '@/utils/request'

//油站管理 集团
export function oilsStation(data) {
    return request({
      url: 'oilsStation/getOilsStationList',
      method: 'post',
      data
    })
}

//油站管理 商户
export function oilsStationCompany(data) {
    return request({
      url: 'oilsStation/getOilsStationList',
      method: 'post',
      data
    })
}
//油站详情 
export function getOilsStationInfo(data) {
    return request({
      url: 'oilsStation/getOilsStationInfoByID',
      method: 'post',
      data
    })
}
//油站修改
export function updateOilsStationInfo(data) {
  return request({
    url: 'oilsStation/updateOilsStationInfo',
    method: 'post',
    data
  })
}
//油站修改
export function insertOilsStationInfo(data) {
  return request({
    url: 'oilsStation/insertOilsStationInfo',
    method: 'post',
    data
  })
}
//油站审核
export function check(data) {
  return request({
    url: 'oilsStation/station-check',
    method: 'post',
    data
  })
}
//油站审核
export function getCompanyByWhere(data) {
  return request({
    url: 'company/getCompanyByWhere',
    method: 'post',
    data
  })
}
// company/getCompanyByWhere
//地区 
export function districtList(data) {
  return request({
    url: 'district/list-district',
    method: 'post',
    data
  })
}
// 商户审核
export function updateCompanyById(data) {
  return request({
    url: 'company/updateCompanyById',
    method: 'post',
    data
  })
}
// 商户审核详情
export function shenhexiangqing(data) {
  return request({
    url: '/company/getCompanyDetail',
    method: 'post',
    data
  })
}
