import Layout from '@/views/layout/Layout'

const qitawentiRouter = {
  path: '/operation',
  component: Layout,
  redirect: '/operation/operation',
  name: 'coperationDemo',
  alwaysShow: true,
  meta: {
    title: '其他问题',
    icon: 'component'
  },
  children: [
    {
      path: 'operationindex',
      component: () => import('@/views/operation/operation'),
      name: 'coperationsDemo',
      meta: { title: '其他问题' }
    },
    {
      path: 'operationindex-m',
      component: () => import('@/views/operation/operation-m'),
      name: 'coperationsDemoM',
      meta: { title: '其他问题' }
    },
    {
      path: 'operationindex-o',
      component: () => import('@/views/operation/operation-o'),
      name: 'coperationsDemoO',
      meta: { title: '其他问题' }
    }
  ]
}

export default qitawentiRouter
