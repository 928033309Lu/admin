import Layout from '@/views/layout/Layout'

const shanghuRouter = {
  path: '/merchant',
  component: Layout,
  redirect: '/merchant/region',
  name: 'merchantsDemo',
  meta: {
    title: '商户管理',
    icon: 'component'
  },
  children: [
    {
      path: 'merchant-region',
      component: () => import('@/views/merchant/region'),
      name: 'merchantregionDemo',
      meta: { title: '区域管理' }
    },
    {
      path: 'merchant-account',
      component: () => import('@/views/merchant/account'),
      name: 'merchantaccountDemo',
      meta: { title: '账户管理' }
    },
    {
      path: 'merchant-account-see',
      component: () => import('@/views/merchant/accountSee'),
      name: 'accountSee',
      hidden:true,
      meta: { title: '账户管理-查看' }
    },
    {
      path: 'merchant-account-check',
      component: () => import('@/views/merchant/accountCheckSee'),
      name: 'accountCheckSee',
      hidden:true,
      meta: { title: '账户审核-查看' }
    },
    {
      path: 'merchant-account-set',
      component: () => import('@/views/merchant/accountSet'),
      name: 'accountSet',
      hidden:true,
      meta: { title: '账户管理-编辑' }
    },
    {
      path: 'merchant-oils',
      component: () => import('@/views/merchant/oils'),
      name: 'merchantoilsDemo',
      meta: { title: '油站管理' }
    },

    {
      path: 'merchant/merchant-oils-see-s',
      component: () => import('@/views/merchant/merchantSeeOS'),
      name: 'merchantSeeOS',
      hidden:true,
      meta: { title: '油站管理-查看' }//(集团)油站管理-油站管理-查看
    },
    {
      path: 'merchant/merchant-oils-set-s',
      component: () => import('@/views/merchant/merchantSetOS'),
      name: 'merchantSetOS',
      hidden:true,
      meta: { title: '油站管理-编辑' }//(集团)油站管理-油站管理-编辑
    },
    {
      path: 'merchant/merchant-oils-see-a',
      component: () => import('@/views/merchant/merchantSeeAS'),
      name: 'merchantSeeAS',
      hidden:true,
      meta: { title: '油站申请-查看' }//(集团)油站管理-油站申请-查看
    },
    {
      path: 'merchant/merchant-oils-set-a',
      component: () => import('@/views/merchant/merchantSetAS'),
      name: 'merchantSetAS',
      hidden:true,
      meta: { title: '油站申请-编辑' }//(集团)油站管理-油站申请-编辑
    },



    {
      path: 'merchant-accountdetail',
      hidden: true,
      component: () => import('@/views/merchant/account-detail'),
      name: 'merchantaccdetailDemo',
      meta: { title: '账户详情' }
    },
    {
      path: 'account-examine',
      hidden: true,
      component: () => import('@/views/merchant/account-examine'),
      name: 'accountExamineDemo',
      meta: { title: '商户审核' }
    }
  ]
}

export default shanghuRouter
