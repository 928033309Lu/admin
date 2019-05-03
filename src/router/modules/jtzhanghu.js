import Layout from '@/views/layout/Layout'

const jtzhanghuRouter = {
  path: '/jtzhanghu',
  component: Layout,
  meta: {
    title: 'jtzhanghu',
    icon: 'table'
  },
  children: [
    {
      path: 'jtzhanghu-s',
      component: () => import('@/views/jtzhanghu/jtzhanghuS'),
      name: '账户管理',
      meta: { title: '账户管理' }
    }
  ]
}

export default jtzhanghuRouter
