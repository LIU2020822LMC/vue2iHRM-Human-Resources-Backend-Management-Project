import request from '@/utils/request.js'

// 登录接口
export const login = (data) => {
  return request({
    url: 'sys/login',
    method: 'POST',
    data: data
  })
}

// 获取用户基本资料接口
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
