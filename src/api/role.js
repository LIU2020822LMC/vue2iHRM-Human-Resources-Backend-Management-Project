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

// 更新角色接口
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除角色接口
export const deleteRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 获取角色详情信息
export const getRoleDetail = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

// 分配角色权限接口
export const assignRolePermission = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
