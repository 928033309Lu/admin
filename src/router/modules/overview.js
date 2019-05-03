import Layout from '@/views/layout/Layout'

const gailanRouter = {

  path: 'overviewDemo',
  component: Rem,
  redirect: 'realtime',
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
      meta: { title: '实时数据', noCache: true }  //集团的
    },
    {
      path: 'overall',
      component: () => import('@/views/overview/overall'),
      name: 'overviewsDemo',
      meta: { title: '整体趋势' } //集团的
    },

  ]
}
const gailanMRouter = {

  path: 'overviewDemoM',
  component: Rem,
  redirect: 'realtime_m',
  name: 'overviewDemoM',
  meta: {
    title: '概览',
    icon: '绿洲_概览',
    noCache: true
  },
  children: [
    {
      path: 'realtime_m',
      component: () => import('@/views/overview/realtime_m'),
      name: 'realtimeDemo_m',
      meta: { title: '实时数据', noCache: true }  //商户的
    },
    {
      path: 'overall-m',
      component: () => import('@/views/overview/overall-m'),
      name: 'overviewsDemoM',
      meta: { title: '整体趋势' } //商户的
    },

  ]
}
const gailanORouter = {
  path: 'overviewDemoO',
  component: Rem,
  redirect: 'realtime_o',
  name: 'overviewDemoO',
  meta: {
    title: '概览',
    icon: '绿洲_概览',
    noCache: true
  },
  children: [
    {
      path: 'realtime_o',
      component: () => import('@/views/overview/realtime_o'),
      name: 'realtimeDemo_o',
      meta: { title: '实时数据', noCache: true }  //油站的
    },
    {
      path: 'overall-o',
      component: () => import('@/views/overview/overall-o'),
      name: 'overviewsDemoO',
      meta: { title: '整体趋势' } //油站的
    },

  ]
}

export default gailanRouter

export default gailanMRouter

export default gailanORouter
