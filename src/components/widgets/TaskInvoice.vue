<template>
<div>
  <article
    ref="wrapper">
    <div class="media-content">
      <table class="datatable table-invoice" v-if="invoice != null">
        <thead class="datatable-head">
          <tr>
            <th colspan="3">INVOICE INFO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col" class="name">
              {{ $t("invoice.name") }}
            </td>
            <td>:</td>
            <td scope="col" class="name">
              {{ invoice.invoice.name }}
            </td>
          </tr>
          <tr>
            <td scope="col" class="amount">
              {{ $t("invoice.amount") }}
            </td>
            <td>:</td>
            <td scope="col" class="project">
              {{ invoice.amount }}
            </td>
          </tr>
          <tr>
            <td scope="col" class="status">
              {{ $t("invoice.status") }}
            </td>
            <td>:</td>
            <td class="status">
              <invoice-status-cell
                :status="invoice.invoice.status"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <form v-on:submit.prevent v-if="invoice == null">
        <text-field
          type="number"
          inputClass=" amount"
          :placeholder="$t('assets.fields.amount')"
          v-model="taskInvoice.amount"
          v-focus
        />
        <group-button class="mt1">
          <button
            :class="{
              'button': true,
              'is-primary': true,
              'is-loading': false
            }"
          >
            {{ $t('invoice.post_invoice') }}
          </button>
        </group-button>
      </form>
    </div>
  </article>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import TextField from '@/components/widgets/TextField'
import GroupButton from '@/components/widgets/GroupButton'
import InvoiceStatusCell from '@/components/cells/InvoiceStatusCell'

export default {
  name: 'task-invoice',

  components: {
    TextField,
    GroupButton,
    InvoiceStatusCell
  },

  props: {
    task: {
      type: Object,
      default: () => {}
    },
    invoice: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      isInvoiced: false,
      taskInvoice: {
        amount: 0
      }
    }
  },

  mounted () {
    this.reset()
  },

  computed: {
    ...mapGetters([
      'isDarkTheme',
      'getTaskInvoice'
    ])
  },

  methods: {
    reset () {
      if (this.task && this.isInvoiced) {
        this.taskInvoice = this.getTaskInvoice(this.task.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dark {
    .table-invoice {
      tr > th {
        background: #46494F;
      }
    }
  }

  .field {
    margin-bottom: 0;
  }
  .table-invoice {
    tr > th, tr > td {
      padding: 4px 8px;
    }
  }
</style>
