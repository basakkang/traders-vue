export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Records',
      icon: 'fa fa-pencil-square-o',
      children: [
        {
          name: 'Overall',
          url: '/records/overall',
          icon: 'fa fa-diamond'
        },
        {
          name: 'Asset',
          url: '/records/asset',
          icon: 'fa fa-dollar'
        },
        {
          name: 'Cost/Slippage',
          url: '/records/costslippage',
          icon: 'fa fa-exclamation'
        },
        {
          name: 'Order',
          url: '/records/order',
          icon: 'fa fa-shopping-basket'
        },
        {
          name: 'Candle',
          url: '/records/candle',
          icon: 'icon-chart'
        }
      ]
    },
    {
      name: 'Backtest',
      icon: 'fa fa-line-chart',
      children: [
        {
          name: 'Backtest',
          url: '/hi/Backtest',
          icon: 'fa fa-futbol-o'
        },
        {
          name: 'Rats',
          url: '/hi/rats',
          icon: 'fa fa-gears'
        }
      ]
    },
    {
      name: 'DB Management',
      url: '/dbmanagement',
      icon: 'fa fa-database',
      children: [
        {
          name: 'User/Account',
          url: '/dbmanagement/useraccount',
          icon: 'fa fa-user-circle-o'
        },
        {
          name: 'Ledger',
          url: '/dbmanagement/ledger',
          icon: 'fa fa-book'
        }
      ]
    }
  ]
}
