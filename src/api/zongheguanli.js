import request from '@/utils/request'

//会议学习记录列表
export function meetingList(data) {
  return request({
    url: 'meeting/list-meeting',
    method: 'post',
    data
  })
}