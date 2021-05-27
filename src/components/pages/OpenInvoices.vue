<template>
  <div class="open-invoices page fixed-page">
    <div class="flexrow page-header">
      <page-title class="flexrow-item filler" :text="$t('invoice.title')" />
    </div>

    <invoice-list
      :entries="displayedInvoice"
      :is-loading="isInvoiceLoading"
      :is-error="isInvoiceLoadingError"
      @edit-clicked="onEditClicked"
    />

    <edit-invoice-modal
      :active="modals.edit"
      :invoice-to-edit="invoiceToEdit"
      @cancel="modals.edit = false"
      @confirm="confirmEditInvoice"
      @withdraw="confirmWithdrawInvoice"
    />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PageTitle from '../widgets/PageTitle'
import InvoiceList from '../lists/InvoiceList'
import EditInvoiceModal from '../modals/EditInvoiceModal'

export default {
  name: 'open-invoices',

  components: {
    PageTitle,
    InvoiceList,
    EditInvoiceModal
  },

  data () {
    return {
      modals: {
        edit: false
      },
      invoiceToEdit: {}
    }
  },

  computed: {
    ...mapGetters([
      'displayedInvoice',
      'isInvoiceLoading',
      'isInvoiceLoadingError'
    ])
  },

  methods: {
    ...mapActions([
      'updateInvoice',
      'loadInvoice'
    ]),

    confirmEditInvoice (invoiceId, form) {
      const params = {
        invoiceId: invoiceId,
        data: {
          status: form.status,
          tasks: []
        }
      }
      form.lines.forEach(line => {
        params.data.tasks.push({
          id: line.task_id,
          amount: line.amount
        })
      })
      this.$store.dispatch('updateInvoice', params)
        .then(() => {
          this.modals.edit = false
          this.loadInvoice()
        })
    },

    confirmWithdrawInvoice (invoiceId, form) {
      const params = {
        invoiceId: invoiceId,
        data: {
          status: form.status,
          tasks: []
        }
      }
      form.lines.forEach(line => {
        params.data.tasks.push({
          id: line.task_id,
          amount: line.amount
        })
      })
      this.$store.dispatch('updateInvoice', params)
        .then(() => {
          this.modals.edit = false
          this.loadInvoice()
        })
    },

    onEditClicked (invoice) {
      this.invoiceToEdit = invoice
      this.modals.edit = true
    }

  },

  created () {
    this.loadInvoice()
  },

  watch: {}
}
</script>

<style lang="scss" scoped>
</style>
