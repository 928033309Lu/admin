import Layout from '@/views/layout/Layout'

const gwguanliRouter = {
  path: '/post-management',
  component: Layout,
  meta: {
    title: '岗位管理',
    icon: 'table'
  },
  children: [
    {
      path: 'gwgl',
      component: () => import('@/views/gangweiguanli/gwgl'),
      name: '岗位管理',
      meta: { title: '岗位管理' }
    }
  ]
}

export default gwguanliRouter
