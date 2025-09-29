import request from '@/utils/request'

// 获取权限点列表接口
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}
