<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true" v-on:account-changed="fetchAllData"/>
    {{ candleList }}
  </div>

</template>

<script>
import AccountSelect from '@/components/AccountSelect'
import OrderTable from '@/views/records/OrderTable'

export default {
  // variables
  data: function () {
    return {
      candleList: [],
      orderList: []
    }
  },
  components: {
    AccountSelect,
    OrderTable
  },
  methods: {
    fetchAllData: function (user, account) {
      this.fetchCandle()
      this.fetchOrder(user, account)
    },
    fetchCandle: function () {
      var self = this
      this.$http.get('https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist').then(function (response) {
        self.candleList = response.data
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    },
    fetchOrder: function (userName, accountName) {
      var self = this
      var tempList = []
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/order_list' + '?desc=true').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          tempList.push(obj)
        })
        self.orderList = tempList
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    }
  }
}
</script>
