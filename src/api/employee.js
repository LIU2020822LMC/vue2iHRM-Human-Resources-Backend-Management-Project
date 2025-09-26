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
