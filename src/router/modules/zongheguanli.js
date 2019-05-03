import Layout from '@/views/layout/Layout'

const zongheRouter = {
  path: '/integrated',
  component: Layout,
  redirect: '/integrated-management/classknot',
  name: 'integratedDemo',
  meta: {
    title: '综合管理',
    icon: 'component'
  },
  children: [

    {
      path: 'meeting-m',
      component: () => import('@/views/integrated-management/meeting-m'),
      name: 'meetingDemoM',
      meta: { title: '会议/学习记录' }//商户的
    },
    {
      path: 'meeting-o',
      component: () => import('@/views/integrated-management/meeting-o'),
      name: 'meetingDemoO',
      meta: { title: '会议/学习记录' }//油站的,
    },
    {
      path: 'integrated/meeting-m-see',
      component: () => import('@/views/integrated-management/meetingSeeM'),
      name: 'meetingSeeM',
      hidden:true,
      meta: { title: '会议/学习记录-查看' }//(商户)会议/学习记录-查看（之前为弹窗样式）
    },
    {
      path: 'integrated/meeting-m-set',
      component: () => import('@/views/integrated-management/meetingSetM'),
      name: 'meetingSetM',
      hidden:true,
      meta: { title: '会议/学习记录-编辑' }//(商户)会议/学习记录-编辑（之前为弹窗样式）
    },
    {
      path: 'journal-m',
      component: () => import('@/views/integrated-management/journal-m'),
      name: 'journalDemoM',
      meta: { title: '日志记录' }//商户的
    },
    {
      path: 'journal-o',
      component: () => import('@/views/integrated-management/journal-o'),
      name: 'journalDemoO',
      meta: { title: '日志记录' }//油站的
    },
    {
      path: 'integrated/journal-m-see',
      component: () => import('@/views/integrated-management/journalSeeM'),
      name: 'journalSeeM',
      hidden:true,
      meta: { title: '日志记录-查看' }//(商户)日志记录-查看详情（之前为弹窗样式）
    },
    {
      path: 'integrated/journal-m-set',
      component: () => import('@/views/integrated-management/journalsetM'),
      name: 'journalsetM',
      hidden:true,
      meta: { title: '日志记录-编辑' }//(商户)日志记录-编辑（之前为弹窗样式）
    },
    {
      path: 'scheduling-o',
      component: () => import('@/views/integrated-management/scheduling-o'),
      name: 'schedulingDemoO',
      meta: { title: '排班管理' }//油站的
    },
    {
      path: 'stationApplication-m',
      component: () => import('@/views/integrated-management/stationApplication-m'),
      name: 'stationApplicationDemosM',
      meta: { title: '油站申请' },//商户的
      hidden: true
    },
    {
      path: 'station-m',
      component: () => import('@/views/integrated-management/station-m'),
      name: 'stationDemosM',
      meta: { title: '油站管理' }//商户的
    },
    {
      path: 'integrated/station-m-see-s	',
      component: () => import('@/views/integrated-management/stationSeeSM'),
      name: 'stationSeeSM',
      hidden:true,
      meta: { title: '油站管理-查看' }//（商户）油站管理-油站管理-查看
    },
    {
      path: 'integrated/station-m-set-s	',
      component: () => import('@/views/integrated-management/stationSetSM'),
      name: 'stationSetSM',
      hidden:true,
      meta: { title: '油站管理-编辑' }//（商户）油站管理-油站管理-编辑
    },
    {
      path: 'integrated/station-m-see-a',
      component: () => import('@/views/integrated-management/stationSeeAM'),
      name: 'stationSeeAM',
      hidden:true,
      meta: { title: '油站申请-查看' }//（商户）油站管理-油站申请-查看
    },
    {
      path: 'integrated/station-m-set-a',
      component: () => import('@/views/integrated-management/stationSetAM'),
      name: 'stationSetAM',
      hidden:true,
      meta: { title: '油站申请-编辑' }//（商户）油站管理-油站申请-编辑
    },
  ]
}

export default zongheRouter
