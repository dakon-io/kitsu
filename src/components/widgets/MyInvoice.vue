<template>
<div class="invoice-item">
  <div class="card">
    <div class="card-content">
      <div class="flexrow">
        <div class="flexrow-item">
          <span class="invoice-id mr05">#INVDKN123</span>
          <span
            class="tag"
            :class="[statusColor]">
            {{ $t('invoices.status.ongoing') }}
          </span>
        </div>
        <div class="filler"></div>
        <div class="flexrow-item menu-wrapper">
          <chevron-down-icon
            class="menu-icon"
            @click="toggleInvoiceMenu"/>
          <!-- MyInvoiceMenu -->
          <div
            v-show="showMenu"
            class="invoice-menu"
            ref="main">
            <div>
              {{ $t('main.edit')}}
            </div>
            <div
              class="error">
              {{ $t('main.abort')}}
            </div>
          </div>
          <!-- End MyInvoiceMenu -->
        </div>
      </div>
      <p>Submited: date</p>
      <p>17 Tasks</p>
    </div>
  </div>
</div>
</template>

<script>
import {
  ChevronDownIcon
} from 'vue-feather-icons'

export default {
  name: 'InvoicesList',

  components: {
    ChevronDownIcon
  },

  data () {
    return {
      showMenu: false,
      statusName: 'ongoing'
    }
  },

  methods: {
    toggleInvoiceMenu () {
      this.showMenu = !this.showMenu
    }
  },

  computed: {
    statusColor () {
      if (this.statusName === 'ongoing') {
        return 'orange'
      } else if (this.statusName === 'done') {
        return 'green'
      } else { return false }
    }
  }
}
</script>

<style lang="scss" scoped></style>
