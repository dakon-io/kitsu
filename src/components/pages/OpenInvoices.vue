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
      'loadInvoice'
    ]),

    onEditClicked (invoice) {
      console.log(invoice)
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
