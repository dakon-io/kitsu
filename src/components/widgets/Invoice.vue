<template>
<div @click="openInvoiceDetail" class="invoice-item">
  <div class="card">
    <div class="card-content">
      <div class="flexrow">
        <div class="flexrow-item">
          <span class="invoice-id mr05">#{{ invoice.id }}</span>
          <invoice-tag :status="invoice.status"/>
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
      <p>Submited: {{ shortDate }}</p>
      <p>{{ invoice.tasks.length }} Task<span v-if="invoice.tasks.length > 1">s</span> - IDR {{ invoiceTotalPrice | currencyFormat }}</p>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { parseDate } from '@/lib/time'

import InvoiceTag from '@/components/widgets/InvoiceTag'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import PeopleName from '@/components/widgets/PeopleName'

export default {
  name: 'Invoice',

  props: {
    admin: {
      type: Boolean,
      default: false
    },
    invoice: {
      type: Object,
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

  computed: {
    ...mapGetters([
      'user'
    ]),

    invoiceTotalPrice: function () {
      return this.invoice.tasks.reduce(function (invoiceTotalPrice, item) {
        return invoiceTotalPrice + item.price
      }, 0)
    },

    createdAt () {
      return parseDate(this.invoice.created_at)
    },

    shortDate () {
      if (moment().diff(this.createdAt, 'days') > 1) {
        return this.createdAt.tz(this.user.timezone).format('MMM DD, YYYY')
      } else {
        return this.createdAt.tz(this.user.timezone).format('HH:mm')
      }
    }
  },

  methods: {
    openInvoiceDetail () {
      this.$emit('open-invoice-detail')
    }
  },

  filters: {
    currencyFormat (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped></style>
