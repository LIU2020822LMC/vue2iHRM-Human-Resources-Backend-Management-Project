import request from '@/utils/request'

// 获取员工列表接口
export const getEmployee = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

// 导出员工的excel接口
export const exportEmployee = () => {
  return request({
    url: '/sys/user/export',
    // 改变接受数据的类型
    responseType: 'blob' // 使用blob接受二进制文件流
  })
}

// 下载员工导入模板
export const exportExcelTemplate = () => {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 使用blob接受二进制文件流
  })
}

// 导入员工(上传excel)接口
export const uploadEmployeeExcel = (data) => {
  return request({
    url: '/sys/user/import',
    method: 'POST',
    data
  })
}

// 删除员工接口
export const deleteEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 新增员工接口
export const newAddEmployee = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// 获取员工基本信息接口
export const getEmployeeInfo = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

// 更新员工信息接口
export const updateEmployeeInfo = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取已启用的角色列表接口
export const getRoleList = () => {
  return request({
    url: '/sys/role/list/enabled'
  })
}

// 给员工分配角色接口
export const assignRole = (data) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
