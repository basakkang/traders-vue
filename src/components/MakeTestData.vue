<script>
import moment from 'moment'

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  // LifeCycle hook
  beforeCreate: function () {
    var term = 3600
    var now = moment()
    var count = 0
    var self = this
    while (count < 100) {
      now = moment.unix(now.unix() - term)
      console.log(now.unix())
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account/' + accountName + '/asset_list', {
        timestamp: now.unix(),
        value: (random(-150,100) + count * 100)
      }).then(function (response) {
          console.log(response)
      }).catch(function (error) {
        alert('error')
        console.log(error)
      })
      count++
    }
  }
}
</script>
