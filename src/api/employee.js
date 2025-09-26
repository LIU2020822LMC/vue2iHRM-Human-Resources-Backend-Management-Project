import request from '@/utils/request'

// 获取员工列表接口
export const getEmployee = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

// 导出员工的excel
export const exportEmployee = () => {
  return request({
    url: '/sys/user/export',
    // 改变接受数据的类型
    responseType: 'blob' // 使用blob接受二进制文件流
  })
}
