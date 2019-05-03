import request from '@/utils/request'

//注册
export function register(data) {
  return request({
    url: 'logins/company_register',
    method: 'post',
    data
  })
}
//登陆验证码 
export function loginSms(data) {
    return request({
      url: 'logins/loginSms',
      method: 'post',
      data
    })
  }
  //注册验证码
export function registerSms(data) {
  return request({
    url: 'logins/registerSms',
    method: 'post',
    data
  })
}
//商户入驻
export function settled(data) {
  return request({
    url: 'company/company_settled',
    method: 'post',
    data
  })
}
//获取商户信息
export function getCompany(data) {
  return request({
    url: 'company/getCompanyById',
    method: 'post',
    data
  })
}
//入住重新提交
export function chongxintijiao(data) {
  return request({
    url: '/company/updateCompanyById',
    method: 'post',
    data
  })
}
//根据id获取商户详情
export function getCompanyDetail(data) {
  return request({
    url: '/company/getCompanyDetail',
    method: 'post',
    data
  })
}