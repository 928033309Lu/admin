import request from '@/utils/request'

//油品统计报表 油站
export function youtonglist(data) {
  return request({
    url: 'report-oil/list-report-purchase-position',
    method: 'post',
    data
  })
}
//油品统计报表 商户
export function youCompanylist(data) {
  return request({
    url: 'report-oil/list-report-purchase-company',
    method: 'post',
    data
  })
}
//油品统计报表 集团
export function youGrouplist(data) {
  return request({
    url: 'report-oil/list-report-purchase-group',
    method: 'post',
    data
  })
}
//油品进销存统计报表 集团
export function youStorageGrouplist(data) {
  return request({
    url: '/report-oil/list-report-storage-group',
    method: 'post',
    data
  })
}
//油品进销存统计报表 商户
export function youStorageCompanylist(data) {
  return request({
    url: '/report-oil/list-report-storage-company',
    method: 'post',
    data
  })
}
//油品进销存统计报表 油站
export function youStorageStationlist(data) {
  return request({
    url: '/report-oil/list-report-storage-position',
    method: 'post',
    data
  })
}
//油枪检测统计报表 商户
export function youGunTestCompany(data) {
  return request({
    url: '/report-oil/list-gun-test-company',
    method: 'post',
    data
  })
}
//油枪检测统计报表 油站
export function youGunTestStation(data) {
  return request({
    url: '/report-oil/list-gun-test-station',
    method: 'post',
    data
  })
}
//油品体积校验报表（油枪）
export function youCalibrationGun(data) {
  return request({
    url: '/report-oil/list-calibration-gun',
    method: 'post',
    data
  })
}
//油品体积校验报表（油罐）
export function youCalibrationCan(data) {
  return request({
    url: '/report-oil/list-calibration-can',
    method: 'post',
    data
  })
}
//油品列表
export function youpinlist(data) {
  return request({
    url: 'oils/getOilsList',
    method: 'post',
    data
  })
}
//油站列表
export function StationList(data) {
  return request({
    url: 'oilsStation/getOilsStationList',
    method: 'post',
    data
  })
}
//商户列表
export function getCompanyByWhere(data) {
  return request({
    url: 'company/getCompanyByWhere',
    method: 'post',
    data
  })
}
//report-oil/list-report
//商品销售报表查询
export function report(data) {
  return request({
    url: 'report-goods/list-goods-sales-report',
    method: 'post',
    data
  })
}
//油品销售报表查询
export function reportList(data) {
  return request({
    url: 'report-oil/list-report',
    method: 'post',
    data
  })
}
//商品销售排行报表查询
export function rankList(data) {
  return request({
    url: 'report-goods/list-goods-rank-report',
    method: 'post',
    data
  })
}
//商品进销存报表查询
export function storageList(data) {
  return request({
    url: 'report-goods/list-goods-storage-report',
    method: 'post',
    data
  })
}
//营业额统计报表查询
export function volumeList(data) {
  return request({
    url: 'report-complex/business-volume-report-list',
    method: 'post',
    data
  })
}
//资金缴存记录查询
export function depositList(data) {
  return request({
    url: 'report-complex/cash-deposit-report-list',
    method: 'post',
    data
  })
}
//资金缴存记录查询
export function ticketList(data) {
  return request({
    url: 'report-complex/cash-deposit-report-ticket',
    method: 'post',
    data
  })
}
//三端概览
export function sanduangailan(data) {
  return request({
    url: '/trend/three-view',
    method: 'post',
    data
  })
}

//整体趋势trend/trend-pie
export function zhengtiqushi(data) {
  return request({
    url: '/trend/trend-pie',
    method: 'post',
    data
  })
}
// get(data)
//     .then(response => {
//         console.log(response.data)
//     })