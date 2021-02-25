<template>
<div class="invoice-item">
  <div class="card">
    <div class="card-content">
      <div class="flexrow">
        <div class="flexrow-item">
          <strong>#INVDKN123</strong>
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
              {{ $t('main.delete')}}
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
      showMenu: false
    }
  },

  methods: {
    toggleInvoiceMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice-item {
    .card-content {
      padding: 12px;
    }
    .menu-icon {
      width: 20px;
      cursor: pointer;
      color: $light-grey;
    }
  }

  // MyInvoiceMenu
  .invoice-menu {
    position: absolute;
    background: white;
    width: 118px;
    box-shadow: 0px 2px 6px $light-grey;
    top: 32px;
    right: 0;
    z-index: 100;
    &.dark {
      background-color: $dark-grey-light;
      box-shadow: 0px 2px 6px $dark-grey-light;
      color: $light-grey-light;
    }
  }
  .invoice-menu div {
    cursor: pointer;
  }
  .invoice-menu div {
    padding: 0.5em;
  }
  // End MyInvoiceMenu
</style>
