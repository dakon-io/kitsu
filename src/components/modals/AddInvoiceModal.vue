<template>
<div :class="{
  'modal': true,
  'is-active': active
}">
  <div class="modal-background" @click="$emit('cancel')" ></div>

  <div class="modal-content">
    <div class="box content">
      <h1 class="title">
        {{ $t("tasks.comment_image") }}
      </h1>

      <p>
        {{ $t("tasks.select_file") }}
      </p>

      <p class="error" v-if="isError">
        {{ $t("tasks.add_preview_error") }}
      </p>

    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modalMixin } from '@/components/modals/base_modal'

export default {
  name: 'add-invoice-modal',
  mixins: [modalMixin],

  components: {
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
      forms: null
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
      this.$refs['image-field'].reset()
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
