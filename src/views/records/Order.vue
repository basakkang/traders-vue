<template>
  <div class="animated fadeIn">
    <account-select hasUser="true" hasAccount="true"/>
    <order-table></order-table>
  </div>

</template>

<script>
import AccountSelect from '@/components/AccountSelect'
import OrderTable from '@/views/records/OrderTable'

export default {
  name: 'dashboard',
  components: {
    AccountSelect,
    OrderTable
  }
}
</script>
