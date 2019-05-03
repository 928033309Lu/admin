import Layout from '@/views/layout/Layout'

const gailanRouter = {
  path: '/overviewsssss',
  component: Layout,
  name: 'overviewDemo',
  meta: {
    title: '概览',
    icon: '绿洲_概览',
    noCache: true
  },
  children: [
    {
      path: 'realtime',
      component: () => import('@/views/overview/realtime'),
      name: 'realtimeDemo',
      meta: { title: '实时数据' }
    },
    {
      path: 'overall',
      component: () => import('@/views/overview/overall'),
      name: 'overviewsDemo',
      meta: { title: '整体趋势' }
    }
  ]
}

export default gailanRouter

