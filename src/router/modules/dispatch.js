import Layout from '@/views/layout/Layout'

const diaoduRouter = {
  path: '/dispatch',
  component: Layout,
  redirect: '/dispatch/supplier',
  name: 'dispatchDemo',
  meta: {
    title: '调度管理',
    icon: 'component'
  },
  children: [
    {
      path: 'dispatch-supplier',
      component: () => import('@/views/dispatch/supplier'),
      name: 'dispatchsupplierDemo',
      meta: { title: '供应商管理' }
    },
    {
      path: 'dispatch-supplier-m',
      component: () => import('@/views/dispatch/supplier-m'),
      name: 'dispatchsupplierDemoM',
      meta: { title: '供应商管理' }
    },
    {
      path: 'dispatch-weihu',
      hidden: true,
      component: () => import('@/views/dispatch/supplier-weihu'),
      name: 'dissupweihuDemo',
      meta: { title: '供应商维护' }
    },
    {
      path: 'dispatch-order',
      component: () => import('@/views/dispatch/order'),
      name: 'dispatchorderDemo',
      meta: { title: '订单管理' }//集团的
    },
    {
      path: 'dispatch/dispatch-order-see',
      component: () => import('@/views/dispatch/orderSee'),
      name: 'orderSee',
      hidden:true,
      meta: { title: '油品采购-查看' }//集团的 订单管理-油品采购-查看
    },
    {
      path: 'dispatch/dispatch-order-see-detail',
      component: () => import('@/views/dispatch/orderSeeDetail'),
      name: 'seeDetail',
      hidden:true,
      meta: { title: '油品采购-查看' }//集团的 订单管理-油品采购-收油详情-查看
    },
    {
      path: 'dispatch/dispatch-commodity-see',
      component: () => import('@/views/dispatch/commoditySee'),
      name: 'commoditySee',
      hidden:true,
      meta: { title: '商品采购-查看' }//集团的 订单管理-商品采购-查看
    },
    {
      path: 'dispatch-order-wei',
      component: () => import('@/views/dispatch/order-wei'),
      name: 'dispatchorderWeiDemo',
      hidden: true,
      meta: { title: '订单管理-油品采购-待审批' }//集团的
    },
    {
      path: 'dispatch-order-m',
      component: () => import('@/views/dispatch/order-m'),
      name: 'dispatchorderDemoM',
      meta: { title: '订单管理' }//商户的
    },
    {
      path: 'dispatch-order-dingdan-m',
      component: () => import('@/views/dispatch/order-dingdan'),
      name: 'orderDingdan',
      hidden:true,
      meta: { title: '订单管理 - 油品采购-查看' }  //商户的 订单管理-油品采购 - 查看
    },
    {
      path: 'dispatch-order-Detail-m',
      component: () => import('@/views/dispatch/order-dingdan-wei'),
      name: 'dingdanDetail',
      hidden:true,
      meta: { title: '订单管理 - 油品采购-查看' }  //商户的 订单管理-油品采购 - 收油详情 -查看
    },
    {
      path: 'dispatch-oils',
      component: () => import('@/views/dispatch/oils'),
      name: 'dispatchoilsDemo',
      meta: { title: '油品管理' }
    },
    {
      path: 'dispatch-commodity',
      component: () => import('@/views/dispatch/commodity'),
      name: 'dispatchcommodityDemo',
      meta: { title: '商品管理' }//集团的
    },
    {
      path: 'dispatch-commodity-m',
      component: () => import('@/views/dispatch/commodity-m'),
      name: 'dispatchcommodityDemoM',
      meta: { title: '商品管理' }//商户的
    },
    {
      path: 'dispatch-commodityadd',//商品管理-商品添加
      hidden: true,
      component: () => import('@/views/dispatch/commodityadd'),
      name: 'dispatchcommodityaddDemo',
      meta: { title: '商品管理-商品添加' }
    },
    {
      path: 'dispatch-commodityadd-m',//商品管理-商品添加-商户的
      hidden: true,
      component: () => import('@/views/dispatch/commodityadd-m'),
      name: 'dispatchcommodityaddDemoM',
      meta: { title: '商品管理-商品添加' }
    },
    {
      path: 'dispatch-commodityaudit',//商品管理-商品审核
      hidden: true,
      component: () => import('@/views/dispatch/commodityaudit'),
      name: 'dispatchcommodityauditDemo',
      meta: { title: '商品管理-商品审核' }
    }
    
  ]
}

export default diaoduRouter
