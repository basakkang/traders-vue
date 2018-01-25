<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true" v-on:account-changed="fetchAllData"/>
    <b-card>
      <b-row>
        <b-col sm="6" class="d-none d-md-block">
          <h1>{{ coinSelected }}</h1>
        </b-col>
        <b-col sm="3">
          <b-form-fieldset label="Time Frame" :label-cols="4"
        :horizontal="true">
            <b-form-select
              :plain="true"
              :options="['30m','1h','3h','6h','12h','1D','7D']"
              v-model="timeFrameSelected"
              @change="onTimeFrameChanged">
            </b-form-select>
          </b-form-fieldset>
        </b-col><!--/.col-->
        <b-col sm="3">
          <b-form-fieldset label="Symbol" :label-cols="4"
        :horizontal="true">
            <b-form-select
              :plain="true"
              :options="coinList"
              v-model="coinSelected"
              @change="onCoinChanged">
            </b-form-select>
          </b-form-fieldset>
        </b-col><!--/.col-->
      </b-row><!--/.row-->
      <div class="echarts">
        <IEcharts :option="candlestick" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
      </div>
    </b-card>
    <!-- {{ candleList }} -->
  </div>

</template>

 <script>
import moment from 'moment'
import IEcharts from 'vue-echarts-v3/src/full.js'
import AccountSelect from '@/components/AccountSelect'
import OrderTable from '@/views/records/OrderTable'

var upColor = '#ec0000'
var upBorderColor = '#ec0000'
var downColor = '#00da3c'
var downBorderColor = '#00da3c'
var timeStartEnd = {
  start: 0,
  end: 0
}

function splitData (rawData) {
  var categoryData = []
  var values = []
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(moment(rawData[i].splice(0, 1)[0]).format('YYYY M/DD HH:mm'))
    // categoryData.push(rawData[i].splice(0, 1)[0])
    rawData[i].splice(4, 1)
    values.push(rawData[i])
  }
  return {
    categoryData: categoryData,
    values: values
  }
}

export default {
  // variables
  data: function () {
    return {
      candleList: [],
      orderList: [],
      coinList: [],
      coinSelected: null,
      timeFrameSelected: '1h',
      data0: {},
      userName: '',
      accountName: '',
      loading: false,
      candlestick: {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function (params) {
            console.log(params)
            var res = '  ' + params[0].name
            res += '<br/>  open  : ' + params[0].value[1]
            res += '<br/>  close : ' + params[0].value[2]
            res += '<br/>  high  : ' + params[0].value[3]
            res += '<br/>  low   : ' + params[0].value[4]
            return res
          }
        },
        legend: {
          data: ['Candle', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: [], // this.data0.categoryData
          scale: true,
          boundaryGap: false,
          axisLine: {onZero: true},
          splitLine: {show: false},
          splitNumber: 10,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 10,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: 'Candle',
            type: 'candlestick',
            data: [], // this.data0.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    return param != null ? Math.round(param.value) : ''
                  }
                }
              },
              data: [
                // {
                //     name: 'XX标点',
                //     coord: ['2013/5/31', 2300],
                //     value: 2300,
                //     itemStyle: {
                //         normal: {color: 'rgb(41,90,85)'}
                //     }
                // },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest'
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest'
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            }
          }
        ]
      }
    }
  },
  components: {
    AccountSelect,
    OrderTable,
    IEcharts
  },
  methods: {
    fetchAllData: function (user, account) {
      // set user and account info
      this.userName = user
      this.accountName = account
      // call fetch data
      this.fetchCoins(user, account)
    },
    // get account's coin list
    fetchCoins: function (userName, accountName) {
      var self = this
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/coins').then(function (response) {
        self.coinList = response.data.result
        self.coinSelected = response.data.result[0]
        // params (userName, accountName, symbol)
        self.fetchCandle(userName, accountName, response.data.result[0], self.timeFrameSelected)
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
    },
    fetchCandle: function (userName, accountName, symbol, timeFrame) {
      // bitfinex api params
      var url = 'https://api.bitfinex.com/v2/candles/trade:' + timeFrame + ':t' + symbol.toUpperCase() + '/hist'
      var config = {
        params: {
          sort: 1,
          start: timeStartEnd.start,
          end: timeStartEnd.end
        }
      }
      console.log(url)
      var self = this
      this.$http.get(url, config).then(function (response) {
        self.data0 = splitData(response.data)
        self.candlestick.xAxis.data = self.data0.categoryData
        self.candlestick.series[0].data = self.data0.values
        // fetch order
        self.fetchOrder(userName, accountName)
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
    },
    onReady (instance) {
      console.log(instance)
    },
    onClick (event, instance, echarts) {
      console.log(arguments)
    },
    onCoinChanged (value) {
      console.log(value)
      this.fetchCandle(this.userName, this.accountName, value, this.timeFrameSelected)
    },
    onTimeFrameChanged (value) {
      console.log(value)
      this.fetchCandle(this.userName, this.accountName, this.coinSelected, value)
    }
  },
  // life cycle hook
  mounted () {
    var now = moment()
    timeStartEnd.end = now.unix() * 1000
    timeStartEnd.start = now.subtract(5, 'days').unix() * 1000
  }
}
</script>
<style scoped>
  .echarts {
    height: 500px;
  }
</style>