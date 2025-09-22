import Layout from '@/layout'
export default {
  path: '/department',
  component: Layout,
  children: [
    {
      path: '', // 二级路由地址为空时 表示 /department 显示一级路由 + 二级路由
      name: 'department',
      component: () => import('@/views/department/index.vue'),
      meta: { title: '组织', icon: 'tree' }
    }
  ]
}
