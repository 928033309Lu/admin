import request from '@/utils/request'

//异业合作列表获取
export function getlist(data) {
    return request({
      url: '/wechat/selectWechatLink',
      method: 'post',
      data
    })
}
//异业合作添加
export function addyiye(data) {
    return request({
      url: '/wechat/addWechatLink',
      method: 'post',
      data
    })
}
//异业合作编辑
export function bianji(data) {
    return request({
      url: '/wechat/updateWechatLink',
      method: 'post',
      data
    })
}
//异业合作排序
export function paixu(data) {
  return request({
    url: '/wechat/sortWechatLink',
    method: 'post',
    data
  })
}
// get(data)
//     .then(response => {
//         console.log(response.data)
//     })