import { getToken, setToken, removeToken } from '../../utils/auth.js'
import { login, getUserInfo } from '@/api/user.js'

const state = {
  token: getToken(), // 从缓存中读取初始值
  UserInfo: {} // 存储用户基本信息
}

const mutations = {
  setToken(state, token) {
    state.token = token // 只是设置了vuex中的数据
    // 同步到缓存，数据持久化
    setToken(token)
  },

  setUserInfo(state, userInfo) {
    // 填充用户数据信息
    state.UserInfo = userInfo
  },

  removeToken() {
    // 删除Vuex的token，设置vuex中的token为null
    state.token = null
    // 清除缓存的token
    removeToken()
  }
}

const actions = {
  // context上下文，传递参数
  async login(context, data) {
    // console.log(data)
    // 调用登录接口
    const token = await login(data)
    context.commit('setToken', token)
    console.log(state.token)
  },
  // 获取用户接口信息
  async getUserInfo(context) {
    const res = await getUserInfo()
    context.commit('setUserInfo', res)
    console.log(res)
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
