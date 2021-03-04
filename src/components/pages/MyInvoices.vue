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
      <div class="flexrow">
        <div class="filler"></div>
        <router-link :to="{ name: 'todos'}">
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
import { mapGetters } from 'vuex'

import MyInvoice from '@/components/widgets/MyInvoice'
import ButtonSimple from '@/components/widgets/ButtonSimple'

export default {
  name: 'Invoices',

  components: {
    MyInvoice,
    ButtonSimple
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

  computed: {
    ...mapGetters([
      'isCurrentUserVendor'
    ])
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
