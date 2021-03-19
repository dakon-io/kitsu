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
              <td>Status</td>
              <td><invoice-tag :status="invoice.status"/></td>
            </tr>
            <tr>
              <td>Invoice number</td>
              <td class="strong">#{{ invoice.id }}</td>
            </tr>
            <tr v-if="isCurrentUserAdmin">
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
              <td>Project name</td>
              <td>{{ invoice.projectName }}</td>
            </tr>
            <tr>
              <td>Submission date</td>
              <td>date</td>
            </tr>
            <tr>
              <td>Total price</td>
              <td>Rp {{ invoice.price | currencyFormat }}</td>
            </tr>
            <tr>
              <td>Tasks</td>
              <td>{{ invoice.tasks.length }} item<span v-if="invoice.tasks.length > 1">s</span></td>
            </tr>
          </table>
          <div class="is-flex">
            <div style="display: block; width: 1px; background-color: #c1c1c1; margin-left: 23px;"></div>
            <table class="table tbl">
              <tr v-for="(task, index) in invoice.tasks" :key="index">
                <td>
                  {{ task.name }}
                </td>
                <td>
                  {{ task.price }}
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
