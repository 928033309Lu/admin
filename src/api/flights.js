import request from '@/utils/request'

//排班管理-添加班次信息
export function flightAdd(data) {
    return request({
        url: '/shift/add-shift-staff',
        method: 'post',
        data
    })
}

//排班管理-删除班次信息
export function flightsDel(data) {
    return request({
        url: '/shift/delete-shift-staff',
        method: 'post',
        data
    })
}

//排班管理-获取班次列表
export function getFlightsList(data) {
    return request({
        url: '/shift/get-shift-staff-list',
        method: 'post',
        data
    })
}

//排班管理-修改班次信息
export function flightsEdit(data) {
    return request({
        url: '/shift/update-shift-staff',
        method: 'post',
        data
    })
}

//排班管理-获取油站排班日期顺序信息按油站月份
export function getStaffList(data) {
    return request({
        url: '/shift/get-staff-date-list',
        method: 'post',
        data
    })
}

//排班管理-添加油站排班日期顺序信息按油站月份
export function addShift(data) {
    return request({
        url: '/shift/add-shift',
        method: 'post',
        data
    })
}

//排班管理-修改油站排班日期顺序信息按油站月份
export function editShift(data) {
    return request({
        url: '/shift/update-shift',
        method: 'post',
        data
    })
}
//排班管理-销售分布
export function getStaffShifts(data) {
    return request({
        url: '/shift/getStaffShiftsProportionByMonth',
        method: 'post',
        data
    })
}