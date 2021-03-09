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
            :admin="isCurrentUserAdmin"
            :status="invoice.status"
            :statusText="$t('invoices.status.ongoing')"
            :price="invoice.price"/>
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
          :admin="isCurrentUserAdmin"
          :status="invoice.status"/>
      </div>
    </div>
    <div
      v-if="invoices.length === 0">
      <p>
        {{ $t('invoices.empty') }}
      </p>
    </div>

  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Invoice from '@/components/widgets/Invoice'
import ButtonSimple from '@/components/widgets/ButtonSimple'

export default {
  name: 'Invoices',

  components: {
    Invoice,
    ButtonSimple
  },

  data () {
    return {
      activeTab: 'ongoing',
      invoices: [
        {
          status: 'waiting',
          price: 5920031
        },
        {
          status: 'approved',
          price: 5920031
        },
        {
          status: 'rejected',
          price: 5920031
        },
        {
          status: 'paid',
          price: 5920031
        }
      ]
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
    }
  },

  watch: {
    $route () {
      this.updateActiveTab()
    }
  },

  metaInfo () {
    return {
      title: `${this.$t('invoices.my_invoices')} - Kitsu`
    }
  }
}
</script>

<style lang="scss" scoped></style>
