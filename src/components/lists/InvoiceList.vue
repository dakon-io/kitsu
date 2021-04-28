<template>
<div class="data-list">
  <div
    class="datatable-wrapper"
    ref="body"
    v-scroll="onBodyScroll"
  >
    <table class="datatable">
      <thead class="datatable-head">
        <tr>
          <th scope="col" class="name">
            {{ $t("invoice.list.name") }}
          </th>
          <th scope="col" class="project">
            {{ $t("invoice.list.project") }}
          </th>
          <th scope="col" class="amount_total">
            {{ $t("invoice.list.amount_total") }}
          </th>
          <th scope="col" class="status">
            {{ $t("invoice.list.status") }}
          </th>
          <th scope="col" class="actions"></th>
        </tr>
      </thead>
      <tbody class="datatable-body" v-if="entries.length > 0">
        <tr
          class="datatable-row"
          v-for="entry in entries"
          :key="entry.id"
        >
          <td class="name">{{ entry.name }}</td>
          <td class="project_id">{{ getProject(entry.project_id).name }}</td>
          <td class="amount_total">{{ entry.amount_total }}</td>
          <td class="status">
            <invoice-status-cell
              :status="entry.status"
            />
          </td>
          <row-actions-cell
            :entry-id="entry.id"
            @edit-clicked="$emit('edit-clicked', entry)"
          />
        </tr>
      </tbody>
    </table>

  </div>

  <table-info
    :is-loading="isLoading"
    :is-error="isError"
  />

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableInfo from '@/components/widgets/TableInfo'
import RowActionsCell from '@/components/cells/RowActionsCell'
import InvoiceStatusCell from '@/components/cells/InvoiceStatusCell'

export default {
  name: 'invoice-list',
  components: {
    TableInfo,
    RowActionsCell,
    InvoiceStatusCell
  },

  props: [
    'entries',
    'isLoading',
    'isError',
    'onEditClicked',
    'onDeleteClicked'
  ],

  computed: {
    ...mapGetters([
      'isCurrentUserAdmin',
      'productionMap'
    ])
  },

  methods: {
    ...mapActions([
    ]),

    getProject (projectId) {
      return this.productionMap[projectId]
    },

    onBodyScroll (event, position) {
      this.$refs.body.style.left = `-${position.scrollLeft}px`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
