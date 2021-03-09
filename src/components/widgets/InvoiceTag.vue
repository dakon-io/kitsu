<template>
  <span
    class="tag"
    :class="statusColor">
    {{ statusText }}
  </span>
</template>

<script>
export default {
  name: 'InvoiceTag',

  props: {
    status: {
      type: String,
      default: null
    }
  },

  computed: {
    statusColor () {
      if (this.status === 'waiting') {
        return 'orange'
      } else if (this.status === 'paid') {
        return 'green'
      } else if (this.status === 'approved') {
        return 'blue'
      } else if (this.status === 'rejected') {
        return 'red'
      } else { return '...' }
    },

    statusText () {
      if (this.status === 'waiting') {
        return this.$t('invoices.status.ongoing')
      } else if (this.status === 'paid') {
        return this.$t('invoices.status.paid')
      } else if (this.status === 'approved') {
        return this.$t('invoices.status.approved')
      } else if (this.status === 'rejected') {
        return this.$t('invoices.status.rejected')
      } else { return '...' }
    }
  }
}
</script>

<style lang="scss" scoped></style>
