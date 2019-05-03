import request from '@/utils/request'

//岗位列表
export function mwList(data) {
  return request({
    url: '/position/listPositionByType',
    method: 'post',
    data
  })
}


//岗位添加
export function mwAdd(data) {
	console.log(data)
  return request({
    url: '/position/add-position',
    method: 'post',
    data
  })
}


//岗位修改详情
export function mwDetail(data) {
  return request({
    url: '/position/infoPositionByType',
    method: 'post',
    data
  })
}

//岗位修改
export function mwUp(data) {
  return request({
    url: '/position/update-position',
    method: 'post',
    data
  })
}

//权限获取
export function quanxian() {
  return request({
    url: '/permission/permissionList',
    method: 'post',
  })
}

//岗位删除
export function mwDel(data) {
	console.log(data)
  return request({
    url: '/position/delete-position',
    method: 'post',
    data
  })
}
//------------------------------------------------------
//员工列表
export function ygList(data) {
  return request({
    url: '/account/getUserList',
    method: 'post',
    data
  })
}

//员工添加
export function ygAdd(data) {
  return request({
    url: '/account/add-user',
    method: 'post',
    data
  })
}


//员工信息修改
export function ygUp(data) {
  return request({
    url: '/account/edit-User-Info',
    method: 'post',
    data
  })
}

//员工信息详情
export function ygDetail(data) {
  return request({
    url: '/account/get-user-detail',
    method: 'post',
    data
  })
}

//员工冻结与解冻
export function ygFree(data) {
  return request({
    url: '/account/freeze-user',
    method: 'post',
    data
  })
}


//员工密码修改
export function ygPwd(data) {
  return request({
    url: '/account/edit-pwd',
    method: 'post',
    data
  })
}


//员工删除
export function userDel(data) {
  return request({
    url: '/account/delete-user',
    method: 'post',
    data
  })
}


//手机号获取员工信息
export function getByPhone(data) {
  return request({
    url: '/account/get-user-by-phone',
    method: 'post',
    data
  })
}


