import Layout from '@/views/layout/Layout'

const fenxiRouter = {
  path: '/users',
  component: Layout,
  redirect: '/merchant/region',
  name: 'usersDemo',
  meta: {
    title: '用户分析',
    icon: 'component'
  },
  children: [
    {
      path: 'newly',
      component: () => import('@/views/users/newly'),
      name: 'newlyDemo',
      meta: { title: '新增用户' }//集团的
    },
    {
      path: 'newly-m',
      component: () => import('@/views/users/newly-m'),
      name: 'newlyDemoM',
      meta: { title: '新增用户' }//商户的
    },
    {
      path: 'newold',
      component: () => import('@/views/users/newold'),
      name: 'newoldDemo',
      meta: { title: '新老用户' }//集团的
    },
    {
      path: 'newold-m',
      component: () => import('@/views/users/newold-m'),
      name: 'newoldDemoM',
      meta: { title: '新老用户' }//商户的
    },
    {
      path: 'portrait',
      component: () => import('@/views/users/portrait'),
      name: 'portraitDemo',
      meta: { title: '用户画像' }//集团的
    },
    {
      path: 'portrait-m',
      component: () => import('@/views/users/portrait-m'),
      name: 'portraitDemoM',
      meta: { title: '用户画像' }//商户的
    }
  ]
}

export default fenxiRouter
