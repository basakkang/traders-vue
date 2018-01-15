<template>
    <b-row>
      <b-col lg="6" v-if="hasUser">
        <b-form-fieldset
          label="Select User"
          :label-cols="3"
          :horizontal="true">
          <b-form-select
            size="lg"
            :plain="true"
            :options="users"
            value="Please select"
            v-on:change.native="userChanged"
            v-model="userSelected"
            >
          </b-form-select>
        </b-form-fieldset>
      </b-col>
      <b-col lg="6" v-if="hasAccount">
        <b-form-fieldset
          label="Select Account"
          :label-cols="3"
          :horizontal="true">
          <b-form-select
            size="lg"
            :plain="true"
            :options="accounts"
            value="Please select"
            v-on:change.native="accountChanged"
            v-model="accountSelected"
            >
          </b-form-select>
        </b-form-fieldset>
      </b-col>
    </b-row>
</template>

<script>

export default {
  props: {
    hasUser: false,
    hasAccount: false
  },
  data: function () {
    return {
      accounts: [],
      users: [],
      accountSelected: null,
      userSelected: null,
      firstCall: true
    }
  },
  // methods
  watch: {

  },
  methods: {
    getUsers () {
      var self = this
      this.$http.get(this.$baseURL + '/api/user').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          self.users.push(obj.name)
          // default
          if (i === 0) {
            self.getAccounts(obj.name)
            self.userSelected = obj.name
          }
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    getAccounts (userName) {
      var self = this
      self.accounts = []
      self.accounts.push({ value: null, text: 'Please select an account' })
      self.accountSelected = null
      this.$http.get(this.$baseURL + '/api/user/' + userName + '/account').then(function (response) {
        response.data.result.forEach(function (v, i) {
          var obj = JSON.parse(v)
          self.accounts.push(obj.name)
          // default
          if (self.firstCall && i === 0) {
            self.accountSelected = obj.name
            self.firstCall = false
            self.$emit('account-changed', self.userSelected, self.accountSelected)
          }
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    userChanged: function () {
      this.getAccounts(event.target.value)
    },
    // have to refresh
    accountChanged: function (event) {
      if (event.target.value.length > 0) {
        this.$emit('account-changed', this.userSelected, event.target.value)
      }
    }
  },
  // LifeCycle hook
  mounted: function () {
    this.getUsers()
  }
}
</script>