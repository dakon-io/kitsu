<template>
  <aside class="sidebar-info">
    <div>
      <Invoice
        :admin="isCurrentUserAdmin"
        :invoice="invoice"/>
      <div class="invoice-item mt1">
        <div class="card card-content">
          <table class="table tbl">
            <tr>
              <td>{{ $t('statistics.status') }}</td>
              <td><invoice-tag :status="invoice.status"/></td>
            </tr>
            <tr>
              <td>{{ $t('invoices.number') }}</td>
              <td class="strong">#{{ invoice.id }}</td>
            </tr>
            <tr v-if="isCurrentUserAdmin">
              <td>{{ $t('invoices.creator') }}</td>
              <td>
                <div class="flexrow">
                  <people-avatar
                    class="flexrow-item"
                    :size="25"
                    :font-size="12"
                    :person="people"/>
                  <div>
                    <people-name :person="people"/>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>{{ $t('invoices.project') }}</td>
              <td>{{ invoice.projectName }}</td>
            </tr>
            <tr>
              <td>{{ $t('invoices.submited') }}</td>
              <td>{{ shortDate }}</td>
            </tr>
            <tr>
              <td>{{ $t('invoices.total_price') }}</td>
              <td>IDR {{ invoiceTotalPrice | currencyFormat }}</td>
            </tr>
            <tr>
              <td>{{ $t('tasks.tasks') }}</td>
              <td>{{ invoice.tasks.length }} <span v-if="invoice.tasks.length <= 1">{{ $t('main.item') }}</span><span v-if="invoice.tasks.length > 1">{{ $t('main.items') }}</span></td>
            </tr>
          </table>
          <div class="is-flex">
            <div style="display: block; width: 1px; background-color: #c1c1c1; margin-left: 23px;"></div>
            <table class="table tbl">
              <tr v-for="(task, index) in invoice.tasks" :key="index">
                <td>{{ task.name }}</td>
                <td>
                  <div class="is-flex" style="align-items: center;">
                    <span style="margin-right: .25rem;">IDR</span>
                    <input
                      v-if="invoice.status == 'waiting' && isCurrentUserVendor"
                      type="text" inputmode="numeric" class="input"
                      style="height: fit-content; padding: .25rem;"
                      :value="task.price">
                    <span v-else>{{ task.price | currencyFormat }}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="isCurrentUserAdmin" class="mt05">
            <input
              type="text"
              :placeholder="$t('comments.add_comment')"
              v-model="invoiceComment"
              ref="inputInvoiceComment"
              class="flexrow-item input"
              style="height: fit-content; padding: 0.25rem .5rem; margin-right: .5rem;"/>
            <div class="flexrow mt05">
              <button
                @click="rejectInvoice"
                class="flexrow-item button is-danger"
                style="width: 100%">
                {{ $t('invoices.action.reject') }}
              </button>
              <button
                @click="approveInvoice"
                class="flexrow-item button is-success"
                style="width: 100%">
                {{ $t('invoices.action.approve') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { parseDate } from '@/lib/time'

import Invoice from '@/components/widgets/Invoice'
import InvoiceTag from '@/components/widgets/InvoiceTag'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import PeopleName from '@/components/widgets/PeopleName'

export default {
  name: 'InvoiceInfo',

  props: {
    invoice: {
      type: Object,
      default: null
    }
  },

  components: {
    Invoice,
    InvoiceTag,
    PeopleAvatar,
    PeopleName
  },

  data () {
    return {
      invoiceComment: '',
      people: {
        first_name: 'user',
        last_name: '1',
        has_avatar: false,
        id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
        initials: 'U1',
        color: 'red'
      },
      inputComment: ''
    }
  },

  computed: {
    ...mapGetters([
      'isCurrentUserAdmin',
      'isCurrentUserVendor',
      'user',
      'displayedPeople'
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
        return this.createdAt.tz(this.user.timezone).format('MMM/DD/YYYY')
      } else {
        return this.createdAt.tz(this.user.timezone).format('HH:mm')
      }
    }
  },

  methods: {
    rejectInvoice () {
      if (this.invoiceComment) {
        alert('You reject this invoice')
      } else if (!this.invoiceComment) {
        this.$refs.inputInvoiceComment.focus()
      }
    },

    approveInvoice () {
      alert('You approve this invoice')
      this.invoiceComment = ''
    }
  },

  filters: {
    currencyFormat (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-info {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    max-width: 425px;
    padding: $size-2;
    padding-top: calc(60px + #{$size-2});
    background-color: var(--background-alt);
    border-left: 3px solid var(--border);
    overflow-y: auto;
  }
</style>
