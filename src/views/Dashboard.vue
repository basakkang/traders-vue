<template>
  <div class="animated fadeIn">
    <account-select hasUser="true"/>
    
    <index-cards></index-cards>
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Asset Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>
      </b-row>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
    </b-card>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Asset Graph</h4>
          <div class="small text-muted">{{ Date() }}</div>
        </b-col>
      </b-row>
      <tutorial-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></tutorial-chart>
    </b-card>

    <b-row>
      <b-col lg="12">
        <position-table fixed small bordered caption="<i class='fa'></i> Position"></position-table>
        <korea-premium-table fixed small bordered caption="<i class='fa'></i> Korean Premium"></korea-premium-table>
      </b-col><!--/.col-->
    </b-row><!--/.row-->

  </div>
</template>

<script>
import MainChartExample from './dashboard/MainChartExample'
import KoreaPremiumTable from './dashboard/KoreaPremiumTable'
import PositionTable from './dashboard/PositionTable'
import AccountSelect from '@/components/AccountSelect'
import TutorialChart from '@/views/dashboard/TutorialChart'
import IndexCards from '@/views/dashboard/IndexCards'

export default {
  name: 'dashboard',
  components: {
    AccountSelect,
    MainChartExample,
    KoreaPremiumTable,
    PositionTable,
    TutorialChart,
    IndexCards
  },
  methods: {
    fetchData () {
      this.fetchIndexCards()
    },
    fetchIndexCards () {
      alert('parent')
    },
    fetchAssetGraph () {

    }
  }
}
</script>
