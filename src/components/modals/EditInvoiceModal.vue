<template>

<div :class="{
  'modal': true,
  'is-active': active
}">
  <div class="modal-background" @click="$emit('cancel')" ></div>

  <div class="modal-content">
    <div class="box">

      <h1 class="title">
        {{ $t("invoice.edit_title") }} #{{ invoiceToEdit.name }}
      </h1>

      <form v-on:submit.prevent>
        <table class="datatable">
          <thead class="datatable-head">
            <tr>
              <th scope="col" class="task">
                {{ $t("invoice.line.task") }}
              </th>
              <th scope="col" class="amount">
                {{ $t("invoice.line.amount") }}
              </th>
            </tr>
          </thead>
          <tbody class="datatable-body">
            <tr class="datatable-row"
                v-for="line in form.lines"
                :key="line.id">
              <td>
                {{ getTaskDetail(line.task_id).entity.name }}
              </td>
              <td>
                <text-field
                  type="number"
                  inputClass=" amount"
                  v-model="line.amount"/>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <p class="has-text-right mt1">
        <button
          v-if="isCurrentUserVendor && form.status === 'draft'"
          :class="{
            button: true,
            'is-primary': true
          }"
          @click="confirmWithdraw"
        >
          {{ $t('invoice.withdraw') }}
        </button>
        <button
          v-if="isCurrentUserVendor && form.status === 'draft'"
          :class="{
            button: true,
            'is-primary': true
          }"
          @click="confirmUpdate"
        >
          {{ $t('invoice.update_invoice') }}
        </button>
      </p>

    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modalMixin } from './base_modal'

import TextField from '../widgets/TextField'

export default {
  name: 'edit-modal',
  mixins: [modalMixin],
  props: [
    'active',
    'invoiceToEdit'
  ],

  data () {
    return {
      form: {
        status: null,
        lines: []
      }
    }
  },

  components: {
    TextField
  },

  computed: {
    ...mapGetters([
      'isCurrentUserAdmin',
      'isCurrentUserVendor',
      'invoiceMap',
      'taskMap'
    ])
  },

  methods: {
    ...mapActions([
      'getInvoiceDetails',
      'loadTask'
    ]),

    confirmUpdate () {
      const form = { ...this.form }
      this.$emit('confirm', this.invoiceToEdit.id, form)
    },

    confirmWithdraw () {
      const form = { ...this.form }
      form.status = 'submit'
      this.$emit('withdraw', this.invoiceToEdit.id, form)
    },

    getTaskDetail (taskId) {
      return this.taskMap[taskId]
    },

    resetForm () {
      if (this.invoiceToEdit) {
        this.getInvoiceDetails({
          invoiceId: this.invoiceToEdit.id
        })
          .then(() => {
            this.form.status = this.invoiceMap[this.invoiceToEdit.id].status
            this.form.lines = this.invoiceMap[this.invoiceToEdit.id].lines
            this.form.lines.forEach(line => {
              this.loadTask({ taskId: line.task_id })
            })
          })
      }
    }
  },

  watch: {
    invoiceToEdit () {
      this.resetForm()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
