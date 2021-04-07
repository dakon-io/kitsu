<template>
<div>
  <article
    ref="wrapper">
    <form v-on:submit.prevent>
      <text-field
        type="number"
        inputClass=" amount"
        :placeholder="$t('assets.fields.amount')"
        v-model="taskInvoice.amount"
        v-focus
      />
    </form>
  </article>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import TextField from '@/components/widgets/TextField'

export default {
  name: 'task-invoice',

  components: {
    TextField
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
