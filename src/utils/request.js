import axios from 'axios'
import store from '../store/index.js'
import { Message } from 'element-ui'
import router from '@/router/index.js'

// 创建一个新的axios实例
const request = axios.create({
  // 这样子的请求地址设置的作用是：
  // 当环境是开发环境的时候就去请求.env.development文件里面设置的VUE_APP_BASE_API
  // 当环境是生产环境的时候就去请求.env.production文件里面设置的VUE_APP_BASE_API
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址(完整地址在vue.config.js配置)
  timeout: 100000 // 超时时间
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
  // 判断返回的是不是Blob
  // Blob（Binary Large Object，二进制大对象）是浏览器原生对象，专门用于存储二进制数据（如图片、PDF、音频、Excel 文件等非文本类数据）
  if (res.data instanceof Blob) {
    return res.data // 返回Blob对象
  }

  const { success, data, message } = res.data // 从返回的json格式数据解构赋值
  // 如果success是true的话，返回data，其他地方调用接口函数就可以获取data里面的东西
  if (success) {
    return data
  } else {
    Message({ type: 'error', message: message })
    return Promise.reject(new Error(message))
  }
},
async(err) => {
  // 失败执行promise
  if (err.response.status >= 400 && err.response.status <= 500) {
    Message({ type: 'warning', message: '登录超时，请重新登录' })
    // 说明token超时了,需要删除缓存的token与vuex相关的用户信息，调用vuex中的user模块中的action中的logout方法
    await store.dispatch('user/logout')
    // 清除完之后跳转登录页
    router.push('/login')
    return Promise.reject(err) // 结束语句，不再往下面走
  }
  Message({ type: 'error', message: err.response.data.message })
  return Promise.reject(err)
})
export default request
