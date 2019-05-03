import Layout from '@/views/layout/Layout'

const yingxiaoRouter = {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/core',
  name: "marketingDemo",
  meta: {
    title: '营销管理',
    icon: 'component'
  },
  children: [{
      path: 'marketing-region',
      component: () => import('@/views/marketing/core'),
      name: 'marketingcoreDemo',
      meta: {
        title: '营销中心'
      }
    },
    {
      path: 'marketing-region-m',
      component: () => import('@/views/marketing/core-m'),
      name: 'marketingcoreDemoM',
      meta: { title: '营销中心' }
    },
    {
      path: 'marketing-region-o',
      component: () => import('@/views/marketing/core-o'),
      name: 'marketingcoreDemoO',
      meta: { title: '营销中心' }
    },
    {
      path: 'marketing-sign',
      component: () => import('@/views/marketing/sign'), //签到有礼  集团的
      name: 'marketingsignDemo',
      hidden: true
    },
    {
      path: 'sign-promotion-m',
      component: () => import('@/views/marketing/sign-promotion-m'), //促销管理  商户的
      name: 'signpromotionDemoM',
      hidden: true
    },
    {
      path: 'sign-promotion-order-m',
      component: () => import('@/views/marketing/sign-promotion-order-m'), //促销管理-油品促销下发   商户的
      name: 'signpromotionorderDemoM',
      hidden: true
    },
    {
      path: 'marketing-recharge',
      component: () => import('@/views/marketing/recharge'), //充值送券  集团的
      name: 'marketingrerechargeDemo',
      hidden: true
    },
    {
      path: 'marketing-newManners',
      component: () => import('@/views/marketing/newManners'), //新人有礼  集团的
      name: 'marketingnewMannersDemo',
      hidden: true
    },
    {
      path: 'marketing-ticket', //电子优惠券  集团的
      component: () => import('@/views/marketing/ticket'),
      name: 'TicketDemo',
      hidden: true
    },
    {
      path: 'marketing-ticket-m', //电子优惠券  商户的
      component: () => import('@/views/marketing/ticket-m'),
      name: 'TicketDemoM',
      hidden: true
    },
    {
      path: 'marketing-newTicket', //新增电子优惠券
      component: () => import('@/views/marketing/newTicket'),
      name: 'NewTicketDemo',
      hidden: true,
      meta: {
        title: '电子优惠券-新增优惠券'
      }
    },
    {
      path: 'marketing-newTicket-m', //新增电子优惠券  商户
      component: () => import('@/views/marketing/newTicket-m'),
      name: 'NewTicketDemoM',
      hidden: true,
      meta: {
        title: '电子优惠券-新增优惠券'
      }
    },
    {
      path: 'marketing-account',
      component: () => import('@/views/marketing/message'),
      name: 'marketingmessageDemo',
      meta: {
        title: '短信发送'
      } //集团的
    },
    {
      path: 'marketing/marketing-account-add',
      component: () => import('@/views/marketing/marketingAdd'),
      name: 'marketingAdd',
      hidden:true,
      meta: {
        title: '添加会员'
      } //集团的
    },
    {
      path: 'marketing-account-m',
      component: () => import('@/views/marketing/message-m'),
      name: 'marketingmessageDemoM',
      meta: {
        title: '短信发送'
      } //商户的
    },
    {
      path: 'promotion-m', //促销管理 商户
      component: () => import('@/views/promotion-management/promotion-m'),
      name: 'PromotionDemoM',
      hidden: true,
      meta: {
        title: '促销管理',
      }
    },
    {
      path: 'oilApplication-m', //油品促销申请 商户
      component: () => import('@/views/promotion-management/oilApplication-m'),
      name: 'OilApplicationDemoM',
      hidden: true
    },
    {
      path: 'commodityApplication-m', //商品促销申请 商户
      component: () => import('@/views/promotion-management/commodityApplication-m'),
      name: 'CommodityApplicationDemoM',
      hidden: true
    },
    {
      path: 'mixedPromotion-m', //油品商品混合促销申请 商户
      component: () => import('@/views/promotion-management/mixedPromotion-m'),
      name: 'MixedPromotionDemoM',
      hidden: true
    },
  ]
}

export default yingxiaoRouter
