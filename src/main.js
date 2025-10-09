import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI)

// 自定义指令
Vue.directive('Permission', {
  inserted(el, binding) {
    // el是当前指令作用的dom元素的对象
    // binding是v-Permission="表达式" 表达式的信息
    const points = store.state.user.UserInfo?.roles?.points || []
    // 拿到了points
    // points中是否有add-employee
    // binding.value v-Permission="表达式"中的表达式的值
    if (!points.includes(binding.value)) {
      // 删除所在的元素
      el.remove()
    }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
