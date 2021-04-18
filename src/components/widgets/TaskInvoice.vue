<template>
<div>
  <article
    ref="wrapper">
    <div class="media-content">
      simple
      <form v-on:submit.prevent>
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
            {{ $t('comments.post_status') }}
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

export default {
  name: 'task-invoice',

  components: {
    TextField,
    GroupButton
  },

  props: {
    task: {
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
  .field {
    margin-bottom: 0;
  }
</style>
