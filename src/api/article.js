import request from '@/utils/request'

export function fetchList(query) {
//	console.log(query);
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}


export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: 'http://www.huizhuangmeiju.com/api/decoration_company_info/show-company.do?page=1&length=7&_=1542189997046',
    method: 'get',
    data
  })
}

export function shanghuList() {
  return request({
    url: 'http://192.168.1.125:8080/company/getCompanyListAll',
    method: 'post'
  })
}

// 用户新增数量
export function userList(data) {
  return request({
    url: '/member-view/member-evolution',
    method: 'post',
    data
  })
}

// 获取未到店人数
export function getMissedShopList(data) {
  return request({
    url: '/member-view/member-consume',
    method: 'post',
    data
  })
}
