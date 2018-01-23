<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true" v-on:account-changed="fetchAllData"/>
    
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Asset Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
        </b-col>
      </b-row>
      <time-value-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300" :data-list="assetList" name="Asset" value-column="value"></time-value-chart>
    </b-card>

    <b-row>
      <b-col lg="12">
        <time-value-table fixed small bordered hasPaging="true" caption="<i class='fa'></i> Asset List" :fields="fields" :data-list="assetList"></time-value-table>
      </b-col><!--/.col-->
    </b-row><!--/.row-->

  </div>
</template>

<script>
import AccountSelect from '@/components/AccountSelect'
import TimeValueChart from '@/views/dashboard/MainChartExample'
import TimeValueTable from '@/components/TimeValueTable'

export default {
  // variables
  data: function () {
    return {
      assetList: [],
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
    TimeValueTable
  },
  methods: {
    fetchAllData: function (user, account) {
      this.fetchAsset(user, account)
    },
    fetchAsset: function (userName, accountName) {
      var self = this
      var tempList = []
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/asset_list' + '?desc=true').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          tempList.push(obj)
        })
        self.assetList = tempList
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    }
  }
}
</script>
