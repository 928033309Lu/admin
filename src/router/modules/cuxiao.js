import Layout from '@/views/layout/Layout'

const cuxiaoRouter = {
  path: '/promotions',
  component: Layout,
  name: "promosDemo",
  redirect: '/promotion-management/index',
  alwaysShow: true,
  meta: {
    title: '促销管理',
    icon: 'component'
  },
  children: [{
      path: 'promotion-o', //促销管理 油站
      component: () => import('@/views/promotion-management/promotion-o'),
      name: 'PromotionDemoO',
      meta: {
        title: '促销管理',
      }
    },
    {
      path: 'oilApplication-o', //油品促销申请 油站
      component: () => import('@/views/promotion-management/oilApplication-o'),
      name: 'OilApplicationDemoO',
      hidden: true
    },
    {
      path: 'commodityApplication-o', //商品促销申请 油站
      component: () => import('@/views/promotion-management/commodityApplication-o'),
      name: 'CommodityApplicationDemoO',
      hidden: true
    },
    
    {
      path: 'mixedPromotion-o', //油品商品混合促销申请 油站
      component: () => import('@/views/promotion-management/mixedPromotion-o'),
      name: 'MixedPromotionDemoO',
      hidden: true
    },
    {
      path: 'promotion-s', //促销管理 查看
      component: () => import('@/views/promotion-management/promotion-s'),
      name: 'promotion-s',
      hidden: true
    },
    
  ]
}

export default cuxiaoRouter
