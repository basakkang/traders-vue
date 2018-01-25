<template>
  <b-card :header="caption">
    <b-button variant="outline-primary" @click="onClickMarket('bitthumb')" ref="bitthumbBtn" :active="true">Bithumb</b-button>
    <!-- Secondary, outline button -->
    <b-button variant="outline-warning" @click="onClickMarket('coinone')" ref="coinoneBtn">Coinone</b-button>
    <!-- Indicates a dangerous or potentially negative action -->
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" class="table-responsive-sm" :items="items" :fields="fields" :current-page="currentPage">
    </b-table>
    <nav v-if="ok">
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
  /**
   * coin_name
   */
  const objectToList = (koreaPremiumData) => {
    var reformattedArray = Object.keys(koreaPremiumData).map(function (symbol) {
      var rObj = {}
      rObj['coin_name'] = symbol.toUpperCase()
      rObj['exchange_rate'] = koreaPremiumData[symbol]
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
      ok: {
        default: false
      }
    },
    data: () => {
      return {
        firstCall: true,
        timer: '',
        marketSelected: 'bitthumb',
        koreaPremium: {
          coinone: [],
          bitthumb: []
        },
        items: [],
        fields: [
          {
            key: 'coin_name',
            sortable: true
          },
          {
            key: 'usa',
            label: 'usa (dollar)',
            sortable: false
          },
          {
            key: 'korea',
            label: 'korea (won)',
            sortable: false
          },
          {
            key: 'exchange_rate',
            sortable: true
          }
        ],
        currentPage: 1,
        totalRows: 0
      }
    },
    methods: {
      onClickMarket (market) {
        this.marketSelected = market
        this.refreshKoreaPremium()
      },
      fetchKoreaPremium () {
        var self = this
        this.$http.get(this.$baseURL + '/api/gimp/bitthumb').then(function (response) {
          self.koreaPremium['bitthumb'] = objectToList(response.data)
          if (self.firstCall) {
            self.firstCall = false
            self.$refs.bitthumbBtn.click()
          }
          self.refreshKoreaPremium()
        }).catch(function (error) {
          alert('error')
          console.log(error)
        })
        this.$http.get(this.$baseURL + '/api/gimp/coinone').then(function (response) {
          self.koreaPremium['coinone'] = objectToList(response.data)
          self.refreshKoreaPremium()
        }).catch(function (error) {
          alert('error')
          console.log(error)
        })
      },
      refreshKoreaPremium: function () {
        this.items = this.koreaPremium[this.marketSelected]
      }
    },
    // life time hook
    mounted: function () {
      this.fetchKoreaPremium()
      // this.$emit('click', 'onClickMarket("bitthumb")')
      // refresh every five sec
      // this.timer = setInterval(this.fetchKoreaPremium, 8000)
    }
  }
</script>
