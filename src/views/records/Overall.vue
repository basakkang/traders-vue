<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true" v-on:account-changed="fetchAllData"/>
    <index-cards :asset="asset" :ir="ir" :ret="ret" :tvr="tvr" :cost="cost" :mdd="mdd"></index-cards>
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Asset Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
        </b-col>
      </b-row>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300" :data-list="assetList"></main-chart-example>
    </b-card>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Cost Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
        </b-col>
      </b-row>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
    </b-card>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Slippage Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
        </b-col>
      </b-row>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
    </b-card>

    <!-- test -->
    <b-row>
      {{ assetList }}
    </b-row>
  </div>
</template>

<script>
import AccountSelect from '@/components/AccountSelect'
import MainChartExample from '@/views/dashboard/MainChartExample'
import IndexCards from '@/views/dashboard/IndexCards'
// // Do not forget this little guy
// name: 'RangeSlider',
// // share common functionality with component mixins
// mixins: [],
// // compose new components
// extends: {},
// // component properties/variables
// props: {
//   bar: {}, // Alphabetized
//   foo: {},
//   fooBar: {},
// },
// // variables
// data() {},
// computed: {},
// // when component uses other components
// components: {},
// // methods
// watch: {},
// methods: {},
// // component Lifecycle hooks
// beforeCreate() {},
// mounted() {},
// var indexDatas = {
//   asset: null,
//   ir: null,
//   ret: null,
//   tvr: null,
//   cost: null,
//   mdd: null
// }
export default {
  name: 'dashboard',
  // variables
  data: function () {
    return {
      asset: 100,
      ir: 200,
      ret: 300,
      tvr: 400,
      cost: 500,
      mdd: 600,
      assetList: [],
      costList: [],
      slippageList: []
    }
  },
  components: {
    AccountSelect,
    MainChartExample,
    IndexCards
  },
  methods: {
    fetchAllData: function (user, account) {
      this.fetchIndexCards(user, account)
      this.fetchAssetChart(user, account)
    },
    fetchIndexCards: function (userName, accountName) {
      // asset
      var self = this
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/asset').then(function (response) {
        self.asset = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // ir
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/ir').then(function (response) {
        self.ir = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // return
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/return').then(function (response) {
        self.ret = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // tvr
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/tvr').then(function (response) {
        self.tvr = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // cost
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/cost').then(function (response) {
        self.cost = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // mdd
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/asset').then(function (response) {
        self.mdd = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    },
    fetchAssetChart: function (userName, accountName) {
      var self = this
      var tempList = []
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/asset_list').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          tempList.push(obj)
        })
        self.assetList = tempList
        // alert(JSON.stringify(self.assetList))
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    }
  }
}
</script>
