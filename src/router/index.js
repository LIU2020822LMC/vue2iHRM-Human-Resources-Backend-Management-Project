import Vue from 'vue'
import Router from 'vue-router'
import departmentRouter from './modules/department'
import approvalRouter from './modules/approval'
import attendanceRouter from './modules/attendance'
import employeeRouter from './modules/employee'
import permissionRouter from './modules/permission'
import roleRouter from './modules/role'
import salaryRouter from './modules/salary'
import socialRouter from './modules/social'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // 隐藏路由不让在左侧显示
    hidden: true
  },

  // 404路由
  {
    path: '/404',
    component: () => import('@/views/404'),
    // 隐藏路由不让在左侧显示
    hidden: true
  },

  // 首页路由
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  // 组织架构路由
  departmentRouter,

  // 审批管理路由
  approvalRouter,

  // 考勤管理路由
  attendanceRouter,

  // 员工管理路由
  employeeRouter,

  // 权限管理路由
  permissionRouter,

  // 角色管理路由
  roleRouter,

  // 工资管理路由
  salaryRouter,

  // 社保管理路由
  socialRouter,

  // 如果访问的路径不是我们所规定的话，那就去访问404页面
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // 自动将新页面的滚动位置重置到顶部（y 轴坐标为 0 的位置）
    // 让用户每次进入新页面都从顶部开始浏览
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
