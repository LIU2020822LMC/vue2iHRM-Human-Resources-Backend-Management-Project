import request from '@/utils/request'

// 获取首页数据
export function getHomeData() {
  return request({
    url: '/home/data'
  })
}

// 首页消息通知
export const getHomeNotic = () => {
  return request({
    url: '/home/notice'
  })
}
