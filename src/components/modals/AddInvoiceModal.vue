<template>
<div :class="{
  'modal': true,
  'is-active': active
}">
  <div class="modal-background" @click="$emit('cancel')" ></div>

  <div class="modal-content">
    <div class="box content">
      <h1 class="title">
        {{ $t("tasks.invoice") }}
      </h1>

      <p class="error" v-if="isError">
        {{ $t("tasks.add_invoice_error") }}
      </p>

      <form v-on:submit.prevent>
        <text-field
          ref="nameField"
          :label="$t('assets.fields.amount')"
          v-model="form.amount"
          v-focus
        />
      </form>

    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modalMixin } from '@/components/modals/base_modal'

import TextField from '@/components/widgets/TextField'

export default {
  name: 'add-invoice-modal',
  mixins: [modalMixin],

  components: {
    TextField
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      form: {
        amount: '',
        description: '',
        source_id: null,
        data: {}
      }
    }
  },

  mounted () {
    this.forms = null
  },

  computed: {
    ...mapGetters([
    ])
  },

  methods: {
    ...mapActions([
    ]),

    onFileSelected (forms) {
      this.forms = forms
    },

    confirm () {
      this.$emit('confirm', this.forms)
    },

    reset () {
      this.forms = null
    }
  },

  watch: {
    active () {
      this.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
