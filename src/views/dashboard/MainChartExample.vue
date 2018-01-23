<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'

// const brandPrimary = '#20a8d8''
const brandInfo = '#63c2de'
// var timeFormat = 'MM/DD/YYYY HH:mm'

function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

export default {
  extends: Line,
  props: {
    height: {
    },
    dataList: {
      type: Array
    },
    name: {
      type: String
    },
    valueColumn: {
      type: String,
      required: true
    }
  },
  watch: {
    dataList: function (newVal, oldVal) { // watch it
      this.makeChart(this.dataList)
    }
  },
  methods: {
    makeChart: function (dataList) {
      var self = this
      var data1 = []
      // var data2 = []
      // var data3 = []
      dataList.forEach(function (v, i) {
        data1.push({t: moment(v.timestamp * 1000), y: v[self.valueColumn]})
      })

      // for (var i = 0; i <= elements; i++) {
      //   data1.push(random(50, 200))
      //   data2.push(random(80, 100))
      //   data3.push(65)
      // }

      // rendering chart params (data, options)
      this.renderChart({
        datasets: [
          {
            label: this.name,
            backgroundColor: convertHex(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data1
          }
        ]
      }, {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              round: 'second',
              tooltipFormat: 'MMM DD h:mm:ss',
              displayFormats: {
                hour: 'MMM D, h:mm A'
              }
            },
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10
              // stepSize: Math.ceil(1000 / 5),
              // max: 1000
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 1
          },
          line: {
            tension: 0
          }
        }
      })
    }
  }
}
</script>
