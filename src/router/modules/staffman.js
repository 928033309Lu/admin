import Layout from '@/views/layout/Layout'

const staffmanRouter = {
  path: '/staffman',
  component: Layout,
  name: 'staffmanDemo',
  meta: {
    title: 'staffman',
    icon: 'table'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/staffman/index'),
      name: 'staffmansDemo',
      meta: { title: '员工管理' }
    }
  ]
}

export default staffmanRouter
