<template>
<div>
  <div class="invoices page">
    <div class="invoice-tabs tabs">
      <ul>
        <li
          :class="{'is-active': isTabActive('ongoing')}"
        >
          <router-link :to="{
            name: 'my-invoices',
          }">
            {{ $t('invoices.status.ongoing') }}
          </router-link>
        </li>
        <li
          :class="{'is-active': isTabActive('done')}"
          @click="selectTab('done')"
        >
          <router-link :to="{
            name: 'my-invoices-ongoing-tab',
            params: {tab: 'done'}
          }">
            {{ $t('invoices.status.done') }}
            <!-- ({{ displayedDoneTasks.length }}) -->
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="isTabActive('ongoing')">
      <div
        v-if="invoices.length > 0"
        class="invoices-container">
        <div
          v-for="(invoice, index) in invoices"
          :key="index"
          class="invoices-item">
          <MyInvoice/>
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
        <MyInvoice/>
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
import MyInvoice from '@/components/widgets/MyInvoice'

export default {
  name: 'Invoices',

  components: {
    MyInvoice
  },

  data () {
    return {
      activeTab: 'ongoing',
      invoices: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    }
  },

  mounted () {
    this.updateActiveTab()
  },

  methods: {
    isTabActive (tab) { return this.activeTab === tab },

    selectTab (tab) { this.activeTab = tab },

    updateActiveTab () {
      if (['done', 'timesheets'].includes(this.$route.params.tab)) {
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
