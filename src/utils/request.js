import axios from 'axios'
import store from '../store/index.js'
import { Message } from 'element-ui'

// 创建一个新的axios实例
const request = axios.create({
  // 这样子的请求地址设置的作用是：
  // 当环境是开发环境的时候就去请求.env.development文件里面设置的VUE_APP_BASE_API
  // 当环境是生产环境的时候就去请求.env.production文件里面设置的VUE_APP_BASE_API
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址(完整地址在vue.config.js配置)
  timeout: 10000 // 超时时间
})

// 请求拦截器(里面有两个函数，成功执行第一个函数，失败执行第二个函数)
request.interceptors.request.use((config) => {
  // 给请求头带上token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (err) => {
  // 失败执行promise
  return Promise.reject(err)
})

// 响应拦截器(里面有两个函数，成功执行第一个函数，失败执行第二个函数)
request.interceptors.response.use((res) => {
  const { success, data, message } = res.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message: message })
    return Promise.reject(new Error(message))
  }
},
(err) => {
  // 失败执行promise
  Message({ type: 'error', message: err.message })
  return Promise.reject(err)
})
export default request
