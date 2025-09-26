import request from '@/utils/request'

// 获取员工列表接口
export const getEmployee = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
