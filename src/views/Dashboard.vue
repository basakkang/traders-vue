<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" v-on:user-changed="fetchAllData"/>
    
    <index-cards :asset="asset" :ir="ir" :ret="ret" :tvr="tvr" :cost="cost" :mdd="mdd"></index-cards>
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Asset Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>
      </b-row>
      <time-value-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300" :data-list="assetList" name="Asset" value-column="value"></time-value-chart>
    </b-card>

    <b-row>
      <b-col lg="12">
        <position-table fixed small bordered caption="<i class='fa'></i> Position" :position-data="positionData"></position-table>
        <korea-premium-table fixed small bordered caption="<i class='fa'></i> Korean Premium"></korea-premium-table>
      </b-col><!--/.col-->
    </b-row><!--/.row-->

  </div>
</template>

<script>
import TimeValueChart from './dashboard/MainChartExample'
import KoreaPremiumTable from './dashboard/KoreaPremiumTable'
import PositionTable from './dashboard/PositionTable'
import AccountSelect from '@/components/AccountSelect'
import IndexCards from '@/views/dashboard/IndexCards'

export default {
  // variables
  data: function () {
    return {
      asset: 0,
      ir: 0,
      ret: 0,
      tvr: 0,
      cost: 0,
      mdd: 0,
      assetList: [],
      positionData: null,
      fields: [
        {
          key: 'timestamp',
          label: 'Time'
        },
        {
          key: 'value',
          label: 'Asset'
        }
      ]
    }
  },
  components: {
    AccountSelect,
    TimeValueChart,
    KoreaPremiumTable,
    PositionTable,
    IndexCards
  },
  methods: {
    fetchAllData: function (user) {
      this.fetchIndexCards(user)
      this.fetchAsset(user)
      this.fetchPosition(user)
    },
    fetchIndexCards: function (userName) {
      // asset
      var self = this
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/asset').then(function (response) {
        self.asset = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // ir
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/ir').then(function (response) {
        self.ir = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // return
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/return').then(function (response) {
        self.ret = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // tvr
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/tvr').then(function (response) {
        self.tvr = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // cost
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/cost').then(function (response) {
        self.cost = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      // mdd
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/asset').then(function (response) {
        self.mdd = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    },
    fetchAsset: function (userName) {
      var self = this
      var tempList = []
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/asset_list' + '?desc=true').then(function (response) {
        response.data.result.forEach(function (v, i) {
          tempList.push(v)
        })
        self.assetList = tempList
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    },
    fetchPosition: function (userName) {
      var self = this
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/positions').then(function (response) {
        self.positionData = response.data.result
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    }
  }
}
</script>
