<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" class="table-responsive-sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="symbol" slot-scope="data">
        <b-badge :variant="getBadge(data.item.symbol)">{{data.item.symbol}}</b-badge>
      </template>
    </b-table>
    <nav v-if="ok">
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1))
  //     let temp = array[i]
  //     array[i] = array[j]
  //     array[j] = temp
  //   }
  //   return array
  // }

  export default {
    name: 'table',
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
      ok: {
        default: false
      }
    },
    data: () => {
      return {
        items: [
          {
            id: 1,
            accounts_id: 1,
            amount: '123',
            price: '3000',
            timestamp: '20180108 12:34:56',
            order_id: 'AB1234567788',
            symbol: 'Active',
            re_order_times: '20180108 12:34:56'
          },
          {
            id: 1,
            accounts_id: 1,
            timestamp: '20180108 12:34:56',
            order_id: 'AB1234567788',
            symbol: 'Inactive',
            re_order_times: '20180108 12:34:56'
          }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0
      }
    },
    keys: [
      {
        key: 'id'
      },
      {
        key: 'accounts_id'
      },
      {
        key: 'timestamp'
      },
      {
        key: 'order_id'
      },
      {
        key: 'symbol'
      },
      {
        key: 'order_amount',
        label: 'Amount'
      },
      {
        key: 're_order_times',
        label: 'Reorder Time'
      }
    ],
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      },
      getRowCount (items) {
        return items.length
      }
    }
  }
</script>
