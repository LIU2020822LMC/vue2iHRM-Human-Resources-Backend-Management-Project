import request from '@/utils/request'

// 获取角色列表接口
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

// 新增角色接口
export const addNewRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
