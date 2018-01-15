import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

// Views - Records
import Overall from '@/views/records/Overall'
import Asset from '@/views/records/Asset'
import CostSlippage from '@/views/records/CostSlippage'
import Order from '@/views/records/Order'

// Views - Backtest
import Backtest from '@/views/backtest/Backtest'

// Views - Rats
import Rats from '@/views/backtest/Rats'

// Component Test
import LineChart from '@/views/dashboard/TutorialChart'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'records',
          redirect: '/records/overall',
          name: 'Records',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'overall',
              name: 'Overall',
              component: Overall
            },
            {
              path: 'asset',
              name: 'Asset',
              component: Asset
            },
            {
              path: 'costslippage',
              name: 'Cost&Slippage',
              component: CostSlippage
            },
            {
              path: 'order',
              name: 'Order',
              component: Order
            }
          ]
        },
        {
          path: 'hi',
          name: 'Backtest',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'backtest',
              name: 'Test',
              component: Backtest
            },
            {
              path: 'rats',
              name: 'Rats',
              component: Rats
            }
          ]
        },
        // {
        //   path: 'rats',
        //   name: 'Rats',
        //   component: {
        //     render (c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'list',
        //       name: 'List',
        //       component: RatsList
        //     }
        //   ]
        // },
        {
          path: 'dbmanagement',
          redirect: '/dbmanagement/useraccount',
          name: 'DB management',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'useraccount',
              name: 'User&Account',
              component: Rats
            },
            {
              path: 'ledger',
              name: 'Ledger',
              component: Rats
            }
          ]
        },
        {
          path: 'testing',
          component: LineChart
        }
      ]
    }
  ]
})
