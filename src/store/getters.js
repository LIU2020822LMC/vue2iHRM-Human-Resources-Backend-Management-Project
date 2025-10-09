const getters = {
  sidebar: (state) => state.app.sidebar, // 取app模块属性
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 取user模块属性
  avatar: (state) => state.user.UserInfo.staffPhoto, // 头像
  name: (state) => state.user.UserInfo.username, // 用户名
  userId: (state) => state.user.UserInfo.userId, // 用户id
  routes: (state) => state.user.routes
}

// getters便捷访问
export default getters
