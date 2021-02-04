<template>
  <div class="feeds page">

    <!-- <page-title :text="$t('feeds.title')" /> -->

    <FeedCreate @create-feed="createNewFeed"/>

    <FeedList
      v-for="feed in feeds" :key="feed.id"
      :feed="feed"/>

  </div>
</template>

<script>
// import PageTitle from '../widgets/PageTitle'
import FeedCreate from './feed/FeedCreate'
import FeedList from '../lists/FeedList'

export default {
  name: 'feeds',

  components: {
    // PageTitle,
    FeedCreate,
    FeedList
  },

  data () {
    return {
      feeds: [
        {
          id: 'feed1',
          created: 'time creation',
          user: {
            username: 'username',
            avatar: 'kitsu.png'
          },
          content: {
            text: 'This is short feed text',
            img: []
          }
        },
        {
          id: 'feed2',
          created: 'time creation',
          user: {
            username: 'username',
            avatar: 'kitsu.png'
          },
          content: {
            text: 'This is long feed text. Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Neque deserunt veniam, labore mollitia maiores nostrum aliquid atque est',
            img: []
          }
        }
      ]
    }
  },

  methods: {
    createNewFeed (feed) {
      console.log(feed.img)
      this.feeds.unshift({
        id: this.feeds.length + 1,
        created: 'time creation',
        user: {
          username: 'username',
          avatar: 'kitsu.png'
        },
        content: {
          text: feed.text,
          img: feed.img
        }
      })
    }
  },

  metaInfo () {
    return {
      title: `${this.$t('feeds.title')} - Kitsu`
    }
  }
}
</script>

<style lang="scss" scoped>
  @media(max-width: 767px) {
    .page {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
