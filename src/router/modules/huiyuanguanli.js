import Layout from '@/views/layout/Layout'

const huiyuanglRouter = {
  path: '/member',
  component: Layout,
  redirect: '/member/query',
  name: 'memberDemo',
  meta: {
    title: '会员管理',
    icon: 'component'
  },
  children: [
    {
      path: 'query',
      component: () => import('@/views/member/query'),
      name: 'memberqueryDemo',
      meta: { title: '会员查询' },//集团的
    },
    {
      path: 'query-m',
      component: () => import('@/views/member/query-m'),
      name: 'memberqueryDemoM',
      meta: { title: '会员查询' }//商户的
    },
    {
      path: 'query-o',
      component: () => import('@/views/member/query-o'),
      name: 'memberqueryDemoO',
      meta: { title: '会员查询' }//油站的
    },
    // {
    //   path: 'recharge',
    //   component: () => import('@/views/member/recharge'),
    //   name: 'memberrechargeDemo',
    //   meta: { title: '会员充值' }//集团的
    // },
    // {
    //   path: 'recharge-m',
    //   component: () => import('@/views/member/recharge-m'),
    //   name: 'memberrechargeDemoM',
    //   meta: { title: '会员充值' }//商户的
    // },
    // {
    //   path: 'recharge-o',
    //   component: () => import('@/views/member/recharge-o'),
    //   name: 'memberrechargeDemoO',
    //   meta: { title: '会员充值' }//油站的
    // },
    {
      path: 'newmember',
      hidden: true,
      component: () => import('@/views/member/new_member'),
      name: 'newmemberDemo',
      meta: { title: '新增会员' }
    },

    {
      path: 'setup',
      component: () => import('@/views/member/setup'),
      name: 'membersetupDemo',
      meta: { title: '会员设置' }//集团的
    },
    {
      path: 'setup-m',
      component: () => import('@/views/member/setup-m'),
      name: 'membersetupDemoM',
      meta: { title: '会员设置' }//商户的
    },
    {
      path: 'query-details',
      component: () => import('@/views/member/query-details'),
      name: 'queryDetailsDemo',
      meta: { title: '会员详情' },
      hidden: true,
    },
    {
      path: 'statistics-record',
      component: () => import('@/views/member/statistics-record'),
      name: 'memberStatisticsRecordDemo',
      meta: { title: '交易记录' },
      hidden: true,
    },
    {
      path: 'fleet',
      component: () => import('@/views/member/fleet/index'),
      name: 'memberfleetDemo',
      meta: { title: '车队管理' },
      redirect: '/member/fleet/index',
      children: [
        {
          path: 'fleet-query',
          component: () => import('@/views/member/fleet/fleet-query'),
          name: 'memberfleetQueryDemo',
          meta: { title: '车队查询' }//集团的
        },
        {
          path: 'fleet-query-o',
          component: () => import('@/views/member/fleet/fleet-query-o'),
          name: 'memberfleetQueryDemoO',
          meta: { title: '车队查询' }//油站的
        },
        {
          path: 'fleet-query-m',
          component: () => import('@/views/member/fleet/fleet-query-m'),
          name: 'memberfleetQueryDemoM',
          meta: { title: '车队查询' }//商户的
        },
        {
          path: 'fleet-recharge',
          component: () => import('@/views/member/fleet/fleet-recharge'),
          name: 'memberfleetRechargeDemo',
          meta: { title: '车队充值' }//集团的
        },
        {
          path: 'fleet-recharge-o',
          component: () => import('@/views/member/fleet/fleet-recharge-o'),
          name: 'memberfleetRechargeDemoO',
          meta: { title: '车队充值' }//油站的
        },
        {
          path: 'fleet-recharge-m',
          component: () => import('@/views/member/fleet/fleet-recharge-m'),
          name: 'memberfleetRechargeDemoM',
          meta: { title: '车队充值' }//商户的
        },
        {
          path: 'fleet-statistics',
          component: () => import('@/views/member/fleet/fleet-statistics'),
          name: 'memberfleetStatisticsDemo',
          meta: { title: '车队统计' }//集团的
        },
        {
          path: 'fleet-statistics-o',
          component: () => import('@/views/member/fleet/fleet-statistics-o'),
          name: 'memberfleetStatisticsDemoO',
          meta: { title: '车队统计' }//油站的
        },
        {
          path: 'fleet-statistics-m',
          component: () => import('@/views/member/fleet/fleet-statistics-m'),
          name: 'memberfleetStatisticsDemoM',
          meta: { title: '车队统计' }//商户的
        },
        {
          path: 'fleet-statistics-see',
          component: () => import('@/views/member/fleet/fleet-statistics-see'),
          name: 'memberfleetStatisticsSeeDemo',
          meta: { title: '车队统计查看' },
          hidden: true,
        },
        {
          path: 'fleet-statistics-record',
          component: () => import('@/views/member/fleet/fleet-statistics-record'),
          name: 'memberfleetStatisticsRecordDemo',
          meta: { title: '车队交易记录' },
          hidden: true,
        },
        {
          path: 'fleet-query-details',
          component: () => import('@/views/member/fleet/fleet-query-details'),
          name: 'memberfleetQueryDetailsDemo',
          meta: { title: '车队查询详情' },
          hidden: true,
        },
        {
          path: 'fleet-query-details-o',
          component: () => import('@/views/member/fleet/fleet-query-details-o'),
          name: 'memberfleetQueryDetailsDemoO',
          meta: { title: '车队查询详情' },
          hidden: true,
        },
        {
          path: 'fleet-new',
          component: () => import('@/views/member/fleet/fleet-new'),
          name: 'memberfleetNewDemo',
          meta: { title: '新增车队卡' },
          hidden: true,
        },
      ]
    }
  ]
}

export default huiyuanglRouter
