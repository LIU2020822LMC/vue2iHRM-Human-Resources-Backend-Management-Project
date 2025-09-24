import request from '@/utils/request'

// 获取角色列表接口
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
