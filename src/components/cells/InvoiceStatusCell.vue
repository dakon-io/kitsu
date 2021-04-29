<template>
<td
  ref="cell"
  :style="{
    'border': 'none',
    'background': 'transparent'
  }"
>
  <div
    class="wrapper"
  >
    <span>
      <span
        class="tag"
        :style="{
          background: statusBackground(),
          color: color
        }"
      >
        {{ statusDisplay() }}
      </span>
    </span>
  </div>
</td>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'invoice-status-cell',

  data () {
    return {
      color: 'black'
    }
  },

  components: {
  },

  props: [
    'status'
  ],

  mounted () {
  },

  computed: {
    ...mapGetters([
      'isDarkTheme'
    ])
  },

  methods: {
    ...mapActions([
    ]),

    statusDisplay () {
      if (this.status === 'draft') {
        return 'DRAFT'
      }
      if (this.status === 'submit') {
        return 'WAITING APPROVE'
      }
      if (this.status === 'approve') {
        return 'APPROVED'
      }
      if (this.status === 'reject') {
        return 'REJECTED'
      }
      if (this.status === 'done') {
        return 'PAID'
      }
    },

    statusBackground () {
      if (this.status === 'draft') {
        return 'gray'
      }
      if (this.status === 'submit') {
        return 'yellow'
      }
      if (this.status === 'approve') {
        return 'blue'
      }
      if (this.status === 'reject') {
        return 'red'
      }
      if (this.status === 'done') {
        return 'green'
      }
    }
  },

  watch: {
  }
}
</script>

<style lang="scss" scoped>
.dark td.selected,
.dark td.selected.validation:hover {
  background-color: #8F91EB;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
