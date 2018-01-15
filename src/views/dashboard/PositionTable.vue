<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" class="table-responsive-sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
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
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

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
        items: shuffleArray([
          {coin_name: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
          {coin_name: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
          {coin_name: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'}
        ]),
        fields: [
          {
            key: 'coin_name',
            sortable: true
          },
          {
            key: 'amount',
            sortable: true
          },
          {
            key: 'base_price',
            sortable: true
          },
          {
            key: 'ppl',
            label: 'P/L',
            sortable: true
          },
          {
            key: 'ppl_percentage',
            label: 'P/L %',
            sortable: true
          }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0
      }
    },
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
