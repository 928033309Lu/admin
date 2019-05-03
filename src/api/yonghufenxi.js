import request from '@/utils/request'

//新老用户统计
export function evolution(data) {
    return request({
      url: 'member-view/member-evolution',
      method: 'post',
      data
    })
}
//用户画像
export function ratio(data) {
    return request({
      url: 'member-view/member-ratio',
      method: 'post',
      data
    })
}