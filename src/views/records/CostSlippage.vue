<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true" v-on:account-changed="fetchAllData"/>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Cost Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
<!-- 
          <b-button-toolbar class="float-right" aria-label="Toolbar with button groups">
            <b-button-group class="mr-3" aria-label="First group">
              <b-button variant="outline-secondary">Day</b-button>
              <b-button variant="outline-secondary" :pressed="true">Month</b-button>
              <b-button variant="outline-secondary">Year</b-button>
            </b-button-group>
          </b-button-toolbar>
           -->
        </b-col>
      </b-row>
      <time-value-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300" :data-list="costList" name="Cost" value-column="order_cost"></time-value-chart>
    </b-card>

    <b-row>
      <b-col lg="12">
        <time-value-table fixed small bordered hasPaging="true" caption="<i class='fa'></i> Cost List" :fields="costFields" :data-list="costList"></time-value-table>
      </b-col><!--/.col-->
    </b-row><!--/.row-->    

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Slippage Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
<!-- 
          <b-button-toolbar class="float-right" aria-label="Toolbar with button groups">
            <b-button-group class="mr-3" aria-label="First group">
              <b-button variant="outline-secondary">Day</b-button>
              <b-button variant="outline-secondary" :pressed="true">Month</b-button>
              <b-button variant="outline-secondary">Year</b-button>
            </b-button-group>
          </b-button-toolbar>
           -->
        </b-col>
      </b-row>
      <time-value-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300" :data-list="slippageList" name="Slippage" value-column="value"></time-value-chart>
    </b-card>

    <b-row>
      <b-col lg="12">
        <time-value-table fixed small bordered hasPaging="true" caption="<i class='fa'></i> Slippage List" :fields="slippageFields" :data-list="slippageList"></time-value-table>
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
      costList: [],
      slippageList: [],
      costFields: [
        {
          key: 'timestamp',
          label: 'Time'
        },
        {
          key: 'order_cost',
          label: 'Cost'
        },
        {
          key: 'order_amount',
          label: 'Amount'
        }
      ],
      slippageFields: [
        {
          key: 'timestamp',
          label: 'Time'
        },
        {
          key: 'value',
          label: 'Slippage'
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
      this.fetchCost(user, account)
      this.fetchSlippage(user, account)
    },
    fetchCost: function (userName, accountName) {
      var self = this
      var tempList = []
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/cost_list' + '?desc=true').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          tempList.push(obj)
        })
        self.costList = tempList
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    },
    fetchSlippage: function (userName, accountName) {
      var self = this
      var tempList = []
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/slippage_list' + '?desc=true').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          tempList.push(obj)
        })
        self.slippageList = tempList
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    }
  }
}
</script>
