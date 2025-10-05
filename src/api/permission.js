import request from '@/utils/request'

// 获取权限点列表接口
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}

// 新增权限点接口
export const addPermission = (data) => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

// 修改权限点接口
export const updatePermission = (data) => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除权限点接口
export const deletePermission = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}

// 获取权限点接口
export const detailPermission = (id) => {
  return request({
    url: `/sys/permission/${id}`
  })
}
