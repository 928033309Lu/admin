import Layout from '@/views/layout/Layout'

const shujuguanliRouter = {
  path: '/management',
  component: Layout,
  name: 'managementDemo',
  redirect: '/management/management-classknot',
  meta: {
    title: '数据管理',
    icon: 'component'
  },
  children: [
    {
      path: 'management-classknot',
      component: () => import('@/views/data-management/classknot'),
      name: 'knotDemo',
      meta: { title: '班结查询' }  //集团的
    },
    {
      path: 'management-classknot-m',
      component: () => import('@/views/data-management/classknot-m'),
      name: 'knotDemoM',
      meta: { title: '班结查询' }  //商户的
    },
    {
      path: 'management-classknot-o',
      component: () => import('@/views/data-management/classknot-o'),
      name: 'knotDemoO',
      meta: { title: '班结查询' }  //油站的
    },
    {
      path: 'management-classknot-detail',
      component: () => import('@/views/data-management/classknot_detail'),
      name: 'knotDemo-detail',
      hidden:true,
      meta: { title: '班结查询详情' }
    },
    {
      path: 'management-classknotdetails',
      component: () => import('@/views/data-management/classknotdetails'),
      name: 'knotdetailsDemo',
      hidden: true
    },
    {
      path: 'management-abnormal',
      component: () => import('@/views/data-management/abnormalDaily'),
      name: 'abnormalDemo',
      hidden: true,
      meta: { title: '班结查询详情-异常支付报表' }
    },
    {
      path: 'management-oilSalesDaily',
      component: () => import('@/views/data-management/oilSalesDaily'),
      name: 'oilSalesDailyDemo',
      hidden: true,
      meta: { title: '班结查询详情-油品销售报表' }
    },
    {
      path: 'management-pands',
      component: () => import('@/views/data-management/pandsDaily'),
      name: 'oilpandsDailyDemo',
      hidden: true,
      meta: { title: '班结查询详情-商品进销存报表' }
    },
    {
      path: 'management-orderSalesDaily',
      component: () => import('@/views/data-management/orderSalesDaily'),
      name: 'orderSalesDailyDemo',
      hidden: true,
      meta: { title: '班结查询详情-商品销售报表' }
    },
    {
      path: 'management-transaction',
      component: () => import('@/views/data-management/transaction-record'),
      name: 'recordDemo',
      meta: { title: '交易记录' } //集团的
    },
    {
      path: 'management-transaction-m',
      component: () => import('@/views/data-management/transaction-record-m'),
      name: 'recordDemoM',
      meta: { title: '交易记录' } //商户的
    },
    {
      path: 'management-transaction-o',
      component: () => import('@/views/data-management/transaction-record-o'),
      name: 'recordDemoO',
      meta: { title: '交易记录' } //油站的
    },
    
    {
      path: 'management-oil',
      component: () => import('@/views/data-management/oil-business'),
      name: 'oilbusinessDemo',
      meta: { title: '油品业务' }//集团的
    },
    {
      path: 'management-oil-m',
      component: () => import('@/views/data-management/oil-business-m'),
      name: 'oilbusinessDemoM',
      meta: { title: '油品业务' } //商户的
    },
    {
      path: 'management-commodity',
      component: () => import('@/views/data-management/commodity-business'),
      name: 'commoditybusinessDemo',
      meta: { title: '商品业务' }//集团的
    },
    {
      path: 'management-commodity-m',
      component: () => import('@/views/data-management/commodity-business-m'),
      name: 'commoditybusinessDemoM',
      meta: { title: '商品业务' }//商户的
    },
    {
      path: 'management-inquiry',
      component: () => import('@/views/data-management/commodity-inquiry'),
      name: 'commodityinquiryDemo',
      meta: { title: '商品查询' }//集团的
    },
    {
      path: 'management-inquiry-m',
      component: () => import('@/views/data-management/commodity-inquiry-m'),
      name: 'commodityinquiryDemoM',
      meta: { title: '商品查询' }//商户的
    },
    {
      path: 'management-inquiry-o',
      component: () => import('@/views/data-management/commodity-inquiry-o'),
      name: 'commodityinquiryDemoO',
      meta: { title: '商品查询' }//油站的
    },
    {
      path: 'management-price',
      component: () => import('@/views/data-management/price-management'),
      name: 'priceDemo',
      meta: { title: '价格管理' }//集团的
    },
    {
      path: 'management-price-m',
      component: () => import('@/views/data-management/price-management-m'),
      name: 'priceDemoM',
      meta: { title: '价格管理' }//商户的
    },
    {
      path: 'management-todo-m',
      component: () => import('@/views/data-management/todo-m'),
      name: 'todoDemoM',
      meta: { title: '待办事项' }//商户的
    },
    {
      path: 'management-todo-promotion',
      component: () => import('@/views/data-management/todo-promotion'),
      name: 'todoPromotionDemoM',
      hidden: true,
      meta: { title: '促销申请' }//商户的
    }
  ]
}

export default shujuguanliRouter
