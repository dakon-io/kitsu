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

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PageTitle from '../widgets/PageTitle'
import InvoiceList from '../lists/InvoiceList'

export default {
  name: 'open-invoices',

  components: {
    PageTitle,
    InvoiceList
  },

  data () {
    return {}
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
      // this.errors.invite = false
      // this.success.invite = false
      // this.personToEdit = person
      // this.modals.edit = true
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
