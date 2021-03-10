<template>
  <aside class="sidebar-comment">
    <div>
      <Invoice
        :admin="isCurrentUserAdmin"
        :invoice="invoice"/>
      <div class="invoice-item mt1">
        <div class="card">
          <div
            class="card-content"
            style="padding: 12px;">
            <table class="table tbl">
              <tr>
                <td>Status</td>
                <td><invoice-tag :status="invoice.status"/></td>
              </tr>
              <tr>
                <td>ID</td>
                <td class="strong">#{{ invoice.id }}</td>
              </tr>
              <tr>
                <td>Creator</td>
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
                <td>Submission date</td>
                <td>date</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>Rp {{ invoice.price | currencyFormat }}</td>
              </tr>
              <tr
                @click="toggleTasks=!toggleTasks"
                style="cursor: pointer;">
                <td style="border-bottom: 0">Tasks</td>
                <td style="border-bottom: 0">17</td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top: 0; padding-bottom: 0;">
                  <div v-show="toggleTasks">
                    <ul>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                    </ul>
                  </div>
                </td>
              </tr>
            </table>
            <input
              type="text"
              :placeholder="$t('comments.add_comment')"
              v-model="invoiceComment"
              ref="inputInvoiceComment"
              class="flexrow-item input mt05"
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
import { mapGetters } from 'vuex'

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
      toggleTasks: false,
      invoiceComment: '',
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
      'isCurrentUserAdmin',
      'isCurrentUserVendor'
    ])
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
      return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-comment {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    max-width: 425px;
    padding: $size-2;
    padding-top: calc(60px + #{$size-2});
    background-color: var(--background);
    border-left: 3px solid var(--border);
    overflow-y: auto;
  }
</style>
