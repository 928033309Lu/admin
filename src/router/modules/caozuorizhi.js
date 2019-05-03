import Layout from '@/views/layout/Layout'

const caozuorzsRouter = {
  path: '/operation',
  component: Layout,
  redirect: '/operation/operation',
  name: 'coperationDemo',
  alwaysShow: true,
  meta: {
    title: '操作日志',
    icon: 'component'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/operation/operation'),
      name: 'coperationsDemo',
      meta: { title: '操作日志' }
    }
  ]
}

export default caozuorzsRouter
