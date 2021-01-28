<template>
  <div class="feeds page">

    <!-- <page-title :text="$t('feeds.title')" /> -->

    <FeedCreate/>

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
        },
        {
          id: 'feed3',
          created: 'time creation',
          user: {
            username: 'username',
            avatar: 'kitsu.png'
          },
          content: {
            text: 'This is feed with single image',
            img: [
              'imgExampleLandscape1.png'
            ]
          }
        },
        {
          id: 'feed4',
          created: 'time creation',
          user: {
            username: 'username',
            avatar: 'kitsu.png'
          },
          content: {
            text: 'This is feed with multiple images',
            img: [
              'imgExampleSquare1.jpeg',
              'imgExampleSquare1.jpeg',
              'imgExampleSquare1.jpeg'
            ]
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .fixed-page {
    padding: 1em;
    padding-top: 90px;
    padding-left: 2em;
  }
  @media(max-width: 767px) {
    .page {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
