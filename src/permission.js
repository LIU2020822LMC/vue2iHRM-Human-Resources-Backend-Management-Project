import router from '@/router'
// 引入进度条与相关样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store/index'

// 建立白名单存放路由
const whileList = ['/login', '/404']

// 前置守卫(路由跳转之前触发的操作)
router.beforeEach((to, from, next) => {
  // 开启进度条(只要开始跳转，就立刻显示进度条)
  nprogress.start()
  // 判断有无token情况下的做法
  if (store.getters.token) {
    // 有token如果去登录页的话直接跳转到主页
    if (to.path === '/login') {
      next('/') // next(path)里面有path的话并没有执行后置守卫，所以需要手动调用结束进度条
      nprogress.done()
    } else {
      next()
    }
  } else {
    if (whileList.includes(to.path)) {
      // 如果没有token，要去的路由在白名单的话就直接放行
      next()
    } else {
      // 如果没有token，且不在白名单的话就返回登录页
      next('/login')
      nprogress.done() // 手动结束执行进度条
    }
  }
})

// 后置守卫(路由跳转完成后触发的操作)
router.afterEach(() => {
  // 结束进度条(触发时机：目标页面（比如首页）的 DOM 渲染完成、资源（如图片、接口数据）加载完毕后。)
  nprogress.done()
})
