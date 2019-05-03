import request from '@/utils/request'
//获取等级列表
export function queryAllMemberLevel(data) {
  return request({
    url: '/member/queryAllMemberLevel',
    method: 'post',
    data
  })
}
//获取标签列表
export function queryMemberLabel(data) {
    return request({
      url: '/member/queryMemberLabel',
      method: 'post',
      data
    })
}
  //获取车队列表
export function queryAllMemberCarDiscount(data) {
    return request({
      url: '/member/queryAllMemberCarDiscount',
      method: 'post',
      data
    })
}
  //获取车队列表
export function addMemberLevel(data) {
    return request({
      url: '/member/addMemberLevel',
      method: 'post',
      data
    })
}
//等级修改
export function updateMemberLevel(data) {
    return request({
        url: '/member/updateMemberLevel',
        method: 'post',
        data
    })
}
//等级删除 updateMemberLevel
export function deleteMemberLevel(data) {
    return request({
        url: '/member/deleteMemberLevel',
        method: 'post',
        data
    })
}
//标签添加
export function addMemberLabel(data) {
    return request({
        url: '/member/addMemberLabel',
        method: 'post',
        data
    })
}
//标签修改
export function updateMemberLabel(data) {
    return request({
        url: '/member/updateMemberLabel',
        method: 'post',
        data
    })
}
//标签删除
export function deleteMemberLabel(data) {
    return request({
        url: '/member/deleteMemberLabel',
        method: 'post',
        data
    })
}
//折扣修改
export function updateMemberCarDiscount(data) {
    return request({
        url: '/member/updateMemberCarDiscount',
        method: 'post',
        data
    })
}
//折扣添加
export function addMemberCarDiscount(data) {
    return request({
        url: '/member/addMemberCarDiscount',
        method: 'post',
        data
    })
}
//折扣删除
export function deleteMemberCarDiscount(data) {
    return request({
        url: '/member/deleteMemberCarDiscount',
        method: 'post',
        data
    })
}
//会员查询
export function queryMember(data) {
    return request({
        url: '/member/queryMember',
        method: 'post',
        data
    })
}
//会员查询
export function selectMemberById(data) {
    return request({
        url: '/member/selectMemberById',
        method: 'post',
        data
    })
}
//会员交易记录
export function selectOrderPayAndRecharge(data) {
    return request({
        url: '/member/selectOrderPayAndRecharge',
        method: 'post',
        data
    })
}
//会员交易记录 详情
export function queryTbMotorcadeTransactionDetails(data) {
    return request({
        url: '/member/queryTbMotorcadeTransactionDetails',
        method: 'post',
        data
    })
}
//会员模板保存
export function membersImport(data) {
    return request({
        url: '/member/members-import',
        method: 'post',
        data
    })
}