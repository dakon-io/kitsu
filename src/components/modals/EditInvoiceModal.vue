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
            <tr class="datatable-row">
              <td>Task 001</td>
              <td>
                <text-field
                  type="number"
                  inputClass=" amount"/>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <p class="has-text-right mt1">
        <button
          :class="{
            button: true,
            'is-primary': true
          }"
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
    }
  },

  components: {
    TextField
  },

  computed: {
    ...mapGetters([
    ])
  },

  methods: {
    ...mapActions([])
  }
}
</script>

<style lang="scss" scoped>
</style>
