import request from '@/utils/request'

//信息模板获取
export function getxinmo(data) {
    return request({
      url: '/sms/querySmsTemplate',
      method: 'post',
      data
    })
}
//历史信息获取
export function getlishi(data) {
    return request({
      url: '/sms/querySmsPeople',
      method: 'post',
      data
    })
}
//会员筛选
export function gethuiyuan(data) {
    return request({
      url: '/sms/queryMember',
      method: 'post',
      data
    })
}
//历史信息查看详情
export function lishichakan(data) {
    return request({
      url: '/sms/querySmsPeopleById',
      method: 'post',
      data
    })
}
//短信模板添加
export function addmoban(data) {
    return request({
      url: '/sms/addSmsTemplate',
      method: 'post',
      data
    })
}
//短信模板删除
export function duanshan(data) {
    return request({
      url: '/sms/deleteSmsTemplate',
      method: 'post',
      data
    })
}
//短信发送
export function sendduan(data) {
    return request({
      url: '/sms/sendSms',
      method: 'post',
      data
    })
}
// getxinmo(a)
//     .then(response => {
//         console.log(response.data)
//     })