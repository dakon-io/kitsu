<template>
  <div class="feeds page">

    <page-title :text="$t('feeds.title')" />

    <feed-list/>

  </div>
</template>

<script>
import PageTitle from '../widgets/PageTitle'
import FeedList from '../lists/FeedList'

export default {
  name: 'feeds',

  components: {
    PageTitle,
    FeedList
  }
}
</script>

<style lang="scss" scoped>
  .fixed-page {
    padding: 1em;
    padding-top: 90px;
    padding-left: 2em;
  }
</style>
