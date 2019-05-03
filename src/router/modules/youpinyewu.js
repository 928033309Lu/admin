import Layout from '@/views/layout/Layout'

const youpinyewuRouter = {
  path: '/oil-business',
  component: Layout,
  redirect: '/oil-business/oilPurchase',
  name: 'oilbusinesDemo',
  meta: {
    title: '油品业务',
    icon: 'component'
  },
  children: [
    {
      path: 'oil-purchase',
      component: () => import('@/views/oil-business/oil-purchase'),
      name: 'oilpurchaseDemo',
      meta: { title: '油品采购' }
    },
    {
      path: 'oil-allocation',
      component: () => import('@/views/oil-business/oil-allocation'),
      name: 'oilallocationDemo',
      meta: { title: '油品调拨' }
    },
    {
      path: 'oil-cans',
      component: () => import('@/views/oil-business/oil-cans'),
      name: 'oilcansDemo',
      meta: { title: '油品倒罐' }
    },
    {
      path: 'oil-number',
      component: () => import('@/views/oil-business/oil-number'),
      name: 'oilnumberDemo',
      meta: { title: '油罐换号' }
    },
    {
      path: 'oil-dingdan',
      component: () => import('@/views/oil-business/oil-purchase-ord'),
      name: 'oildingdanDemo',
      hidden:true,
      meta: { title: '油品订单' }
    },
    {
      path: 'oil-dingdanget',
      component: () => import('@/views/oil-business/oil-purchase-ord-get'),
      name: 'oildingdangetDemo',
      hidden:true,
      meta: { title: '油品订单收油详情' }
    },
    {
      path: 'oil-allocation-see',
      component: () => import('@/views/oil-business/oil-allocation-see'),
      name: 'oilallocationseeDemo',
      hidden:true,
      meta: { title: '油品调拨出库详情' }
    }
    
  ]
}

export default youpinyewuRouter
