/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const caiwuguanliRouter = {
  path: '/financial',
  component: Layout,
  redirect: '/financial/oils/index',
  name: 'financialDemo',
  meta: {
    title: '财务管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'financial-index',
      component: () => import('@/views/financial/oils/index'), // Parent router-view
      name: 'financialindexDemo',
      meta: { title: '油品报表' },
      redirect: '/financial/oils/sale',
      children: [
        {
          path: 'financial-oils-sale',
          component: () => import('@/views/financial/oils/sale'),
          name: 'financialsaleDemo',
          meta: { title: '油品销售报表' }//集团的
        },
        {
          path: 'financial-oils-sale-m',
          component: () => import('@/views/financial/oils/sale-m'),
          name: 'financialsaleDemoM',
          meta: { title: '油品销售报表' }//商户的
        },
        {
          path: 'financial-oils-sale-o',
          component: () => import('@/views/financial/oils/sale-o'),
          name: 'financialsaleDemoO',
          meta: { title: '油品销售报表' }//油站的
        },
        {
          path: 'financial-oils-purchase',
          component: () => import('@/views/financial/oils/purchase'),
          name: 'financialpurchaseDemo',
          meta: { title: '油品采购统计' }//集团的
        },
        {
          path: 'financial-oils-purchase-m',
          component: () => import('@/views/financial/oils/purchase-m'),
          name: 'financialpurchaseDemoM',
          meta: { title: '油品采购统计' }//商户的
        },
        {
          path: 'financial-oils-purchase-o',
          component: () => import('@/views/financial/oils/purchase-o'),
          name: 'financialpurchaseDemoO',
          meta: { title: '油品采购统计' }//油站的
        },
        {
          path: 'financial-oils-inventory',
          component: () => import('@/views/financial/oils/inventory'),
          name: 'financialinventoryDemo',
          meta: { title: '油品进销存报表' }//集团的
        },
        {
          path: 'financial-oils-inventory-m',
          component: () => import('@/views/financial/oils/inventory-m'),
          name: 'financialinventoryDemoM',
          meta: { title: '油品进销存报表' }//商户的
        },
        {
          path: 'financial-oils-inventory-o',
          component: () => import('@/views/financial/oils/inventory-o'),
          name: 'financialinventoryDemoO',
          meta: { title: '油品进销存报表' }//油站的
        },
        {
          path: 'financial-oils-detection-m',
          component: () => import('@/views/financial/oils/oil-detection-m'),
          name: 'oildetectionDemoM',
          meta: { title: '油枪检测统计报表' }//商户的
        },
        {
          path: 'financial-oils-detection-o',
          component: () => import('@/views/financial/oils/oil-detection-o'),
          name: 'oildetectionDemoO',
          meta: { title: '油枪检测统计报表' }//油站的
        },
        {
          path: 'financial-oils-volume-m',
          component: () => import('@/views/financial/oils/oil-volume-m'),
          name: 'oilvolumeDemoM',
          meta: { title: '油品体积检验报表' }//商户的
        },
        {
          path: 'financial-oils-volume-o',
          component: () => import('@/views/financial/oils/oil-volume-o'),
          name: 'oilvolumeDemoO',
          meta: { title: '油品体积检验报表' }//油站的
        }
      ]
    },
    {
      path: 'financial-commodity-index',
      component: () => import('@/views/financial/commodity/index'), // Parent router-view
      name: 'commodityindexDemo',
      meta: { title: '商品报表' },
      redirect: '/financial/commodity/purchase',
      children: [
        {
          path: 'financial-commodity-purchase',
          component: () => import('@/views/financial/commodity/purchase'),
          name: 'commoditypurchaseDemo',
          meta: { title: '商品销售报表' }//集团的
        },
        {
          path: 'financial-commodity-purchase-m',
          component: () => import('@/views/financial/commodity/purchase-m'),
          name: 'commoditypurchaseDemoM',
          meta: { title: '商品销售报表' }//商户的
        },
        {
          path: 'financial-commodity-purchase-o',
          component: () => import('@/views/financial/commodity/purchase-o'),
          name: 'commoditypurchaseDemoO',
          meta: { title: '商品销售报表' }//油站的
        },
        {
          path: 'financial-commodity-inventory',
          component: () => import('@/views/financial/commodity/inventory'),
          name: 'commodityinventoryDemo',
          meta: { title: '商品进销存报表' }//集团的
        },
        {
          path: 'financial-commodity-inventory-m',
          component: () => import('@/views/financial/commodity/inventory-m'),
          name: 'commodityinventoryDemoM',
          meta: { title: '商品进销存报表' }//商户的
        },
        {
          path: 'financial-commodity-inventory-o',
          component: () => import('@/views/financial/commodity/inventory-o'),
          name: 'commodityinventoryDemoO',
          meta: { title: '商品进销存报表' }//油站的
        },
        {
          path: 'financial-commodity-ranking',
          component: () => import('@/views/financial/commodity/ranking'),
          name: 'commodityrankingDemo',
          meta: { title: '商品销售排行报表' }//集团的
        },
        {
          path: 'financial-commodity-ranking-m',
          component: () => import('@/views/financial/commodity/ranking-m'),
          name: 'commodityrankingDemoM',
          meta: { title: '商品销售排行报表' }//商户的
        },
        {
          path: 'financial-commodity-ranking-o',
          component: () => import('@/views/financial/commodity/ranking-o'),
          name: 'commodityrankingDemoO',
          meta: { title: '商品销售排行报表' }//油站的
        }
      ]
    },
    {
      path: 'financial-comprehensive-index',
      component: () => import('@/views/financial/comprehensive/index'), // Parent router-view
      name: 'comprehensiveindexDemo',
      meta: { title: '综合报表' },
      redirect: '/financial/comprehensive/turnover',
      children: [
        {
          path: 'financial-comprehensive-turnover',
          component: () => import('@/views/financial/comprehensive/turnover'),
          name: 'comprehensiveturnoverDemo',
          meta: { title: '营业额统计报表' }//集团的
        },
        {
          path: 'financial-comprehensive-turnover-m',
          component: () => import('@/views/financial/comprehensive/turnover-m'),
          name: 'comprehensiveturnoverDemoM',
          meta: { title: '营业额统计报表' }//商户的
        },
        {
          path: 'financial-comprehensive-turnover-o',
          component: () => import('@/views/financial/comprehensive/turnover-o'),
          name: 'comprehensiveturnoverDemoO',
          meta: { title: '营业额统计报表' }//油站的
        },
        {
          path: 'financial-comprehensive-abnormal',
          component: () => import('@/views/financial/comprehensive/abnormal'),
          name: 'comprehensiveabnormalDemo',
          meta: { title: '异常监控报表' }//集团的
        },
        {
          path: 'financial-comprehensive-abnormal-m',
          component: () => import('@/views/financial/comprehensive/abnormal-m'),
          name: 'comprehensiveabnormalDemoM',
          meta: { title: '异常监控报表' }//商户的
        },{
          path: 'financial-comprehensive-abnormal-o',
          component: () => import('@/views/financial/comprehensive/abnormal-o'),
          name: 'comprehensiveabnormalDemoO',
          meta: { title: '异常监控报表' }//油站的
        },
        {
          path: 'financial-transactionAbnormal',
          component: () => import('@/views/financial/comprehensive/transactionAbnormal'),
          name: 'transactionAbnormalDemo',
          hidden: true,
          meta: { title: '异常交易结算' }
        },
        {
          path: 'financial-stockTank',
          component: () => import('@/views/financial/comprehensive/stockTank'),
          name: 'stockTankDemo',
          hidden: true,
          meta: { title: '油罐库存监控' }
        },
        {
          path: 'financial-exceptionEquipment',
          component: () => import('@/views/financial/comprehensive/exceptionEquipment'),
          name: 'exceptionEquipmentDemo',
          hidden: true,
          meta: { title: '油站设备监控' }
        },
        {
          path: 'financial-operationAbnormal',
          component: () => import('@/views/financial/comprehensive/operationAbnormal'),
          name: 'operationAbnormalDemo',
          hidden: true,
          meta: { title: '油站操作监控统计' }
        },
        {
          path: 'financial-comprehensive-capital',
          component: () => import('@/views/financial/comprehensive/capital'),
          name: 'comprehensivecapitalDemo',
          meta: { title: '资金缴存记录' }//集团的
        },
        {
          path: 'financial-comprehensive-capital-m',
          component: () => import('@/views/financial/comprehensive/capital-m'),
          name: 'comprehensivecapitalDemoM',
          meta: { title: '资金缴存记录' }//商户的
        },
        {
          path: 'financial-comprehensive-capital-o',
          component: () => import('@/views/financial/comprehensive/capital-o'),
          name: 'comprehensivecapitalDemoO',
          meta: { title: '资金缴存记录' }//油站的
        }
      ]
    }
  ]
}

export default caiwuguanliRouter
