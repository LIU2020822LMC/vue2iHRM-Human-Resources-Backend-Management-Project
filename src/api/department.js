import request from '@/utils/request'

export const getDepartment = () => {
  return request({
    url: 'company/department'
  })
}
