import Layout from '@/views/layout/Layout'

const shangpinyewuRouter = {
  path: '/commodity',
  component: Layout,
  redirect: '/commodity-business/commodity-purchase',
  name: 'commoditysDemo',
  meta: {
    title: '商品业务',
    icon: 'component'
  },
  children: [
    {
      path: 'commodity-purchase',
      component: () => import('@/views/commodity-business/commodity-purchase'),
      name: 'compurchaseDemo',
      meta: { title: '商品采购' }
    },
    {
      path: 'commodity-purchase-give',
      hidden:true,
      component: () => import('@/views/commodity-business/commodity-purchase-give'),
      name: 'compurchasegiveDemo',
      meta: { title: '商品采购-收货' }
    },
    {
      path: 'commodity-allocation',
      component: () => import('@/views/commodity-business/commodity-allocation'),
      name: 'comallocationDemo',
      meta: { title: '商品调拨' }
    },
    {
      path: 'commodity-scrap',
      component: () => import('@/views/commodity-business/commodity-scrap'),
      name: 'comscrapDemo',
      meta: { title: '商品报废' }
    },
    {
      path: 'commodity-return',
      component: () => import('@/views/commodity-business/commodity-return'),
      name: 'comreturnDemo',
      meta: { title: '商品退货' }
    }
  ]
}

export default shangpinyewuRouter
