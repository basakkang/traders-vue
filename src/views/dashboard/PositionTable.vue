<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" class="table-responsive-sm" :items="items" :fields="fields" :current-page="currentPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
    </b-table>
    <nav v-if="hasPaging">
      <b-pagination :total-rows="getRowCount(positionData)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
  /**
   * coin_name
   */
  const objectToList = (positionData) => {
    var reformattedArray = Object.keys(positionData).map(function (symbol) {
      var rObj = {}
      rObj['coin_name'] = symbol.toUpperCase()
      Object.assign(rObj, positionData[symbol])
      return rObj
    })
    return reformattedArray
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
      hasPaging: {
        default: false
      },
      positionData: {
        type: Object
      }
    },
    data: () => {
      return {
        items: [],
        fields: [
          {
            key: 'coin_name',
            sortable: true
          },
          {
            key: 'base',
            label: 'Base Price',
            sortable: true
          },
          {
            key: 'ticker',
            sortable: true
          },
          {
            key: 'profit',
            label: 'P/L',
            sortable: true
          },
          {
            key: 'pnl',
            label: 'P/L %',
            sortable: true
          },
          {
            key: 'current_value',
            label: 'Total',
            sortable: true
          }
        ],
        currentPage: 1,
        totalRows: 0
      }
    },
    watch: {
      positionData: function (newVal, oldVal) { // watch it
        this.items = objectToList(newVal)
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
