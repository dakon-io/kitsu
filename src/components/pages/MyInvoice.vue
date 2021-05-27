<template>
  <div class="open-invoices page fixed-page">
    <iframe
      :src="getInvoiceUrl()"
      id="iframe"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'my-invoice',

  components: {
  },

  computed: {
    ...mapGetters([
      'accessToken'
    ])
  },
  methods: {
    ...mapActions([
    ]),
    getInvoiceUrl () {
      const url = 'http://localhost:8069/kitsu/login?token=' + this.accessToken
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
#iframe {
  width: 100%;
  height: 100%;
}
</style>
