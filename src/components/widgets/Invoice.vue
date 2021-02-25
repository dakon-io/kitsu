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
      <p>Submited: date</p>
      <p>17 Tasks</p>
    </div>
  </div>
</div>
</template>

<script>
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import PeopleName from '@/components/widgets/PeopleName'
import {
  ChevronDownIcon
} from 'vue-feather-icons'

export default {
  name: 'InvoicesList',

  components: {
    PeopleAvatar,
    PeopleName,
    ChevronDownIcon
  },

  data () {
    return {
      showMenu: false,
      statusName: 'ongoing',
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
