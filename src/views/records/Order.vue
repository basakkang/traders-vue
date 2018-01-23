<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true" v-on:account-changed="fetchAllData"/>
    <order-table hasPaging="true" caption="<i class='fa'></i> Order List" :data-list="orderList"></order-table>
  </div>

</template>

<script>
import AccountSelect from '@/components/AccountSelect'
import OrderTable from '@/views/records/OrderTable'

export default {
  // variables
  data: function () {
    return {
      orderList: []
    }
  },
  components: {
    AccountSelect,
    OrderTable
  },
  methods: {
    fetchAllData: function (user, account) {
      this.fetchOrder(user, account)
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
