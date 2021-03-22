<template>
<div :class="{
  'modal': true,
  'is-active': active
}">
  <div class="modal-background" @click="$emit('cancel')" ></div>

  <div class="modal-content">

    <div class="box">
      <h1 class="title">{{ $t("invoices.reject.title") }}</h1>
      <h3 class="subtitle">{{ $t("invoices.reject.confirmation") }}</h3>

      <form v-on:submit.prevent>
        <text-field
          ref="reason"
          :label="$t('main.reason')"
          v-model="form.reason"
          @enter="runConfirmation"
          v-focus/>
        <text-field
          ref="invNumberField"
          :label="invoice.id"
          v-model="form.invNumber"
          @enter="runConfirmation"/>
      </form>

      <modal-footer
        :error-text="$t('invoices.reject.error')"
        :is-error="isError"
        :is-loading="isLoading"
        @confirm="runConfirmation"
        @cancel="runCancel"
      />
    </div>
  </div>
</div>
</template>

<script>
import { modalMixin } from './base_modal'

import ModalFooter from './ModalFooter'
import TextField from '../widgets/TextField'

export default {
  name: 'InvoiceApprovementModal',
  mixins: [modalMixin],
  components: {
    ModalFooter,
    TextField
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    invoice: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      isLoading: false,
      isError: false,
      form: {
        reason: '',
        invNumber: ''
      }
    }
  },

  methods: {
    runCancel () {
      this.$emit('cancel')
      this.isError = false
      this.form.invNumber = ''
    },

    runConfirmation () {
      if (this.form.invNumber === this.invoice.id) {
        this.$emit('confirm', this.form)
        this.isError = false
      } else if (!this.form.reason) {
        this.isError = true
        this.$refs.reason.focus()
      } else if (this.form.invNumber !== this.invoice.id) {
        this.isError = true
        this.$refs.invNumberField.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content .box p.text {
  margin-bottom: 1em;
}

.is-danger {
  color: #ff3860;
  font-style: italic;
}
</style>
