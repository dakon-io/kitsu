<template>
<div class="invoice-item">
  <div class="card">
    <div class="card-content">
      <div class="flexrow">
        <div class="flexrow-item">
          <span class="invoice-id mr05">#INVDKN123</span>
          <invoice-tag :status="status"/>
        </div>
      </div>
      <div v-if="admin" class="flexrow">
        <people-avatar
          class="flexrow-item"
          :size="25"
          :font-size="12"
          :person="people"/>
        <div>
          <people-name :person="people"/>
        </div>
      </div>
      <p>Submited: date</p>
      <p>17 Tasks - Rp {{ price | currencyFormat }}</p>
    </div>
  </div>
</div>
</template>

<script>
import InvoiceTag from '@/components/widgets/InvoiceTag'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import PeopleName from '@/components/widgets/PeopleName'

export default {
  name: 'InvoicesList',

  props: {
    admin: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: null
    },
    price: {
      type: Number,
      default: null
    }
  },

  components: {
    InvoiceTag,
    PeopleAvatar,
    PeopleName
  },

  data () {
    return {
      people: {
        first_name: 'user',
        last_name: '1',
        has_avatar: false,
        id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
        initials: 'U1',
        color: 'red'
      }
    }
  },

  filters: {
    currencyFormat (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice-item { cursor: pointer; }
</style>
