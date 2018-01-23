moment = require('moment')
axios = require('axios')
var qs = require('qs');
// makeData Code
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var baseURL = 'http://45.76.110.84:9090'

var term = 3600
var now = moment()
var count = 0
while (count < 24*10) {

  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > 300){
      break;
    }
  }
  now = moment.unix(now.unix() - term)
  console.log(now.unix())
  axios.post(baseURL + '/api/user/user1/account/u1acc1/asset_list', {
    timestamp: now.unix(),
    value: (24*10*102 + random(-200, 100) - count * 100)
  }).then(function (response) {
    console.log('success')
  }).catch(function (error) {
    // alert('error')
    console.log(error)
  })
  count++
}