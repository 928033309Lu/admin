import request from '@/utils/request'

//获取商户/公司列表
export function shanghuList(data) {
//	let data1=JSON.stringify(data);
//	console.log(data1)
  return request({
    url: '/company/getCompanyByWhere',
    method: 'post',
    data
  })
}
export function createArticle(data) {
  return request({
    url: '/company/insertCompany',
    method: 'post',
    data
  })
}

export function xiangqing(data) {
	/*var data1={
		"companyID":data
	}*/
	//data1=JSON.stringify(data1)
//	console.log(data)
//	let data1=JSON.stringify(data)
//	console.log(data1)
  return request({
    url: '/company/getCompanyById',
    method: 'post',
    data
  })
}

export function del(data) {
	console.log(data)
  return request({
    url: '/company/deleteCompanyById',
    method: 'post',
    data
  })
}

export function wheres(data) {
	console.log(data)
  return request({
    url: '/company/getCompanyByWhere',
    method: 'post',
    data
  })
}


export function getStaffList(data) {
  return request({
    url: '/shift/get-shift-staff-list',
    method: 'post',
    data
  })
}