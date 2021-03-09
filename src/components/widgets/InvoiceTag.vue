<template>
  <span
    class="tag"
    :class="[status == 'waiting' ? 'orange' : status == 'paid' ? 'green' : status == 'approved' ? 'blue' : status == 'rejected' ? 'red' : '']">
    {{ status == 'waiting' ? $t('invoices.status.ongoing') : status == 'paid' ? $t('invoices.status.paid') : status == 'approved' ? $t('invoices.status.approved') : status == 'rejected' ? $t('invoices.status.rejected') : '' }}
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
  }
}
</script>

<style lang="scss" scoped></style>
