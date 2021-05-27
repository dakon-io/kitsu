<template>
  <div class="open-invoices page fixed-page">
    <iframe
      src="http://localhost:8069/kitsu/login?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjIxMDEyNDMsIm5iZiI6MTYyMjEwMTI0MywianRpIjoiOGFlN2VlMGEtOTZiNS00MDMzLThmM2YtYTMxM2YzMDMxZGQ4IiwiZXhwIjoxNjIyNzA2MDQzLCJpZGVudGl0eSI6InVzZXJAdmVuZG9yLmNvbSIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.-D8F_DZznoT0BQLOXl15KdCLs5PEsMlX2UxYqFr_uUc"
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
    ])
  },
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style lang="scss" scoped>
#iframe {
  width: 100%;
  height: 100%;
}
</style>
