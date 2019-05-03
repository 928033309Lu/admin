import request from '@/utils/request'

export function loginByUsername(account, password) {
  const data = {
    account,
    password
  }
  return request({
    url: '/logins/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logins/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/logins/getUserInfo',
    method: 'post'
  })
}
//验证码登录
export function SmsLogin(data) {
  return request({
    url: '/logins/SmsLogin',
    method: 'post',
    data
  })
}
