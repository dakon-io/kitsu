<template>
<div>

  <div class="invoices page">
    <div class="invoice-tabs tabs">
      <ul>
        <li
          :class="{'is-active': isTabActive('ongoing')}"
        >
          <router-link :to="{
            name: 'invoices',
          }">
            {{ $t('invoices.status.pending') }}
          </router-link>
        </li>
        <li
          :class="{'is-active': isTabActive('done')}"
          @click="selectTab('done')"
        >
          <router-link :to="{
            name: 'invoices-ongoing-tab',
            params: {tab: 'done'}
          }">
            {{ $t('invoices.status.paid') }}
            <!-- ({{ displayedDoneTasks.length }}) -->
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="isTabActive('ongoing')">
      <div class="flexrow">
        <div class="filler"></div>
        <router-link :to="{ name: 'todos-tab', params: {tab: 'done'}}">
          <button-simple
            class="flexrow-item"
            :text="$t('invoices.action.create_new')"
            :is-responsive="true"
            icon="plus"
            v-if="isCurrentUserVendor"/>
        </router-link>
      </div>
      <div
        v-if="invoices.length > 0"
        class="invoices-container"
        style="height: calc(100vh - 202px);">
        <div
          v-for="(invoice, index) in invoices"
          :key="index"
          class="invoices-item">
          <Invoice
            @open-invoice-detail="openInvoiceInfo(invoice)"
            :admin="isCurrentUserAdmin"
            :invoice="invoice"
            style="cursor: pointer;"/>
        </div>
      </div>
      <div
        v-if="invoices.length === 0">
        <p>
          {{ $t('invoices.empty') }}
        </p>
      </div>
    </div>

    <div v-if="isTabActive('done')">
      &nbsp;
    </div>
    <div
      v-if="isTabActive('done')"
      class="invoices-container">
      <div
        v-for="(invoice, index) in invoices"
        :key="index"
        class="invoices-item">
        <Invoice
          @open-invoice-detail="openInvoiceInfo"
          :admin="isCurrentUserAdmin"
          :invoice="invoice"/>
      </div>
    </div>
    <div
      v-if="invoices.length === 0">
      <p>
        {{ $t('invoices.empty') }}
      </p>
    </div>
  </div>

  <div
    v-if="showInvoiceInfo"
    class="invoice-info-container">
    <InvoiceInfo :invoice="selectedInvoice"/>
    <div
      id="c-mask"
      @click="showInvoiceInfo = false"
      :class="{'is-active': showInvoiceInfo}">
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Invoice from '@/components/widgets/Invoice'
import InvoiceInfo from '@/components/sides/InvoiceInfo'
import ButtonSimple from '@/components/widgets/ButtonSimple'

export default {
  name: 'Invoices',

  components: {
    Invoice,
    InvoiceInfo,
    ButtonSimple
  },

  data () {
    return {
      showInvoiceInfo: false,
      activeTab: 'ongoing',
      invoices: [
        {
          id: 'INVDKN123',
          created_at: '2021-03-19T02:23:36',
          status: 'waiting',
          projectName: 'Prj-1',
          tasks: [
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            }
          ]
        },
        {
          id: 'INVDKN123',
          created_at: '2021-02-23T02:23:36',
          status: 'approved',
          projectName: 'Prj-2',
          tasks: [
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            },
            {
              id: 'task2',
              name: 'Task 2',
              price: 153000
            },
            {
              id: 'task3',
              name: 'Task 3',
              price: 153000
            }
          ]
        },
        {
          id: 'INVDKN123',
          created_at: '2021-02-23T02:23:36',
          status: 'rejected',
          projectName: 'Prj-1',
          tasks: [
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            },
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            },
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            }
          ]
        },
        {
          id: 'INVDKN123',
          created_at: '2021-02-23T02:23:36',
          status: 'paid',
          projectName: 'Prj-1',
          tasks: [
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            },
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            },
            {
              id: 'task1',
              name: 'Task 1',
              price: 153000
            }
          ]
        }
      ],
      selectedInvoice: null
    }
  },

  mounted () {
    this.updateActiveTab()
  },

  computed: {
    ...mapGetters([
      'isCurrentUserAdmin',
      'isCurrentUserVendor'
    ])
  },

  methods: {
    isTabActive (tab) { return this.activeTab === tab },

    selectTab (tab) { this.activeTab = tab },

    updateActiveTab () {
      if (['done'].includes(this.$route.params.tab)) {
        this.activeTab = this.$route.params.tab
      } else {
        this.activeTab = 'ongoing'
      }
    },

    openInvoiceInfo (invoice) {
      this.showInvoiceInfo = true
      this.selectedInvoice = invoice
    }
  },

  watch: {
    $route () {
      this.updateActiveTab()
    }
  },

  metaInfo () {
    if (this.isCurrentUserAdmin) {
      return { title: `${this.$t('invoices.title')} - Kitsu` }
    } else if (this.isCurrentUserVendor) {
      return { title: `${this.$t('invoices.my_invoices')} - Kitsu` }
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice-info-container {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    #c-mask {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  }
</style>
