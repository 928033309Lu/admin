import Layout from '@/views/layout/Layout'

const jifenscRouter = {
  path: '/integral',
  component: Layout,
  redirect: '/merchant/region',
  name: 'integralDemo',
  meta: {
    title: '积分商城',
    icon: 'component'
  },
  children: [
    {
      path: 'integral-commodity',
      component: () => import('@/views/integral/commodity'),
      name: 'integralcommodityDemo',
      meta: { title: '商品管理' }
    },
    {
      path: 'integral-order',
      component: () => import('@/views/integral/order'),
      name: 'integralorderDemo',
      meta: { title: '订单管理' }
    },
    {
      path: 'integral-banner',
      component: () => import('@/views/integral/banner'),
      name: 'integralbannerDemo',
      meta: { title: 'BANNER管理' }
    }
  ]
}

export default jifenscRouter
