import Layout from '@/views/layout/Layout'

const yyhezuoRouter = {
  path: '/cooperation',
  component: Layout,
  redirect: '/cooperation/cooperation',
  name: 'cooperationDemo',
  alwaysShow: true,
  meta: {
    title: '异业合作',
    icon: 'component'
  },
  children: [
    {
      path: 'cooperation-index',
      component: () => import('@/views/cooperation/cooperation'),
      name: 'cooperationsDemo',
      meta: { title: '异业合作' }
    }
  ]
}

export default yyhezuoRouter
