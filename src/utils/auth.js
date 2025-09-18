import Cookies from 'js-cookie' // 前端缓存数据的库

const TokenKey = 'vue_admin_token' // cookie键的名字

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
