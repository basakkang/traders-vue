<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" class="table-responsive-sm" :items="dataList" :fields="fields" :current-page="currentPage" :per-page="perPage">
    </b-table>
    <nav v-if="hasPaging">
      <b-pagination :total-rows="getRowCount(dataList)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
import moment from 'moment'

/**
 * Using Durstenfeld shuffle algorithm.
 */
const timestampToString = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i].timestamp = moment(array[i].timestamp * 1000).format('MMM D, h:mm A')
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
    hasPaging: {
      default: false
    },
    dataList: {
      type: Array
    },
    fields: {
      type: Array
    }
  },
  data: () => {
    return {
      currentPage: 1,
      perPage: 10,
      totalRows: 0
    }
  },
  watch: {
    dataList: function (newVal, oldVal) { // watch it
      timestampToString(newVal)
    }
  },
  methods: {
    getRowCount (items) {
      return items.length
    }
  }
}
</script>
