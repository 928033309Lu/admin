import request from '@/utils/request'

//会议学习记录列表查询
export function getMeetinglist(data) {
    return request({
        url: '/meeting/list-meeting',
        method: 'post',
        data
    })
}

//会议学习记录添加
export function addMeeting(data) {
    return request({
        url: '/meeting/meetingRecord-add',
        method: 'post',
        data
    })
}

//通过id查询学习记录
export function getMeetingById(data) {
    return request({
        url: '/meeting/logRecord-byId',
        method: 'post',
        data
    })
}

//修改会议学习记录
export function setMeeting(data) {
    return request({
        url: '/meeting/meetingRecord-update',
        method: 'post',
        data
    })
}

//日志记录列表
export function getLogList(data) {
    return request({
        url: '/logRecord/list-logRecord',
        method: 'post',
        data
    })
}

//日志记录添加
export function addLog(data) {
    return request({
        url: '/logRecord/logRecord-add',
        method: 'post',
        data
    })
}

//通过id获取日志记录
export function getLogById(data) {
    return request({
        url: '/logRecord/logRecord-byId',
        method: 'post',
        data
    })
}

//日志记录编辑
export function setLog(data) {
    return request({
        url: '/logRecord/logRecord-update',
        method: 'post',
        data
    })
}
