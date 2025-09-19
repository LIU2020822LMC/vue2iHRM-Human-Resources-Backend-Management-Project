import { getToken, setToken, removeToken } from '../../utils/auth.js'

const state = {
  token: getToken() // 从缓存中读取初始值
}

const mutations = {
  setToken(state, token) {
    state.token = token // 只是设置了vuex中的数据
    // 同步到缓存，数据持久化
    setToken(token)
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
    console.log(data)
    // 调用登录接口
    context.commit('setToken', 123456)
    console.log(state.token)
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
