import Layout from '@/views/layout/Layout'

const zhanghuglRouter = {
  path: '/account',
  component: Layout,
  redirect: '/account/account',
  name: 'accounttDemo',
  alwaysShow: true,
  meta: {
    title: '账户管理',
    icon: 'component'
  },
  children: [
    {
      path: 'staff',
      component: () => import('@/views/account/staff'),
      name: 'staffDemo',
      meta: { title: '员工管理' }//集团的
    },
    {
      path: 'staff-m',
      component: () => import('@/views/account/staff-m'),
      name: 'staffDemoM',
      meta: { title: '员工管理' }//商户的
    },
    {
      path: 'staff-o',
      component: () => import('@/views/account/staff-o'),
      name: 'staffDemoO',
      meta: { title: '员工管理' }//油站的
    },
    {
      path: 'accountpost',
      component: () => import('@/views/account/post'),
      name: 'accountpostDemo',
      meta: { title: '岗位管理' }//集团的
    },
    {
      path: 'accountpost-m',
      component: () => import('@/views/account/post-m'),
      name: 'accountpostDemoM',
      meta: { title: '岗位管理' }//商户的
    },
    {
      path: 'accountpost-o',
      component: () => import('@/views/account/post-o'),
      name: 'accountpostDemoO',
      meta: { title: '岗位管理' }//油站的
    }
  ]
}

export default zhanghuglRouter
