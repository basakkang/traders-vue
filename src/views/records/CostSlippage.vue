<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true"/>

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
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
    </b-card>

    <b-row>
      <b-col lg="12">
        <asset-table fixed small bordered ok="true" caption="<i class='fa'></i> Cost List"></asset-table>
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
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
    </b-card>

    <b-row>
      <b-col lg="12">
        <asset-table fixed small bordered ok="true" caption="<i class='fa'></i> Slippage List"></asset-table>
      </b-col><!--/.col-->
    </b-row><!--/.row-->    


  </div>
</template>

<script>
import AccountSelect from '@/components/AccountSelect'
import MainChartExample from '@/views/dashboard/MainChartExample'
import AssetTable from '@/views/records/AssetTable'

export default {
  name: 'dashboard',
  components: {
    AccountSelect,
    MainChartExample,
    AssetTable
  }
}
</script>
