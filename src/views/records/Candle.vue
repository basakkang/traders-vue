<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <h4 class="mb-0">9.823</h4>
            <p>ASSET</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">9.823</h4>
            <p>IR</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <h4 class="mb-0">9.823</h4>
            <p>RET</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">9.823</h4>
            <p>TVR</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">9.823</h4>
            <p>COST</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">9.823</h4>
            <p>MDD</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Asset Graph</h4>
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

export default {
  name: 'dashboard',
  components: {
    MainChartExample,
    KoreaPremiumTable,
    PositionTable
  }
}
</script>
