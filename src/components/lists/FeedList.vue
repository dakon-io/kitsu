<template>
  <div class="feed-item">
    <div class="card">
      <div class="card-content">
        <div class="feed-sender media">
          <people-avatar
            class="flexrow-item"
            :size="38"
            :font-size="20"
            :person="feed.user"/>
          <div>
            <strong>
              <people-name
                class=""
                :person="feed.user"/>
            </strong>
            <p class="subtitle is-6">
              <small>{{ shortDate }}</small>
            </p>
          </div>
        </div>

        <div class="feed-content">
          <div v-if="feed.content.text" class="content-text">
            <h2 v-if="feed.content.text.length <= 100" v-html="compiledMarkdown"></h2>
            <div v-else v-html="compiledMarkdown"></div>
          </div>
          <div v-if="feed.content.img.length > 0" class="content-media">
            <div
              v-if="feed.content.img.length == 1"
              class="img"
              :style="{ backgroundImage: `url(${ feed.content.img })` }">
              <img :src="`${ feed.content.img }`">
            </div>
            <carousel v-if="feed.content.img.length > 1" :nav="false" :items="1">
              <div
                v-for="(feedImg, index) in feed.content.img"
                :key="index"
                class="carousel-item"
                :style="{ backgroundImage: `url(${ feedImg })` }">
                <img :src="`${ feedImg }`">
              </div>
            </carousel>
          </div>
        </div>

        <div class="feed-action">
          <div class="columns">
            <div class="column">
              <button class="button is-fullwidth">
                <thumbs-up-icon class="icon"/>{{ $t('feeds.list.like') }}
              </button>
            </div>
            <div class="column">
              <button @click="openComment" class="button is-fullwidth">
                <message-circle-icon class="icon"/>{{ $t('feeds.list.comment') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import marked from 'marked'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import PeopleName from '@/components/widgets/PeopleName'
import carousel from 'vue-owl-carousel2'
import { parseDate } from '@/lib/time'
import {
  ThumbsUpIcon,
  MessageCircleIcon
} from 'vue-feather-icons'

export default {
  name: 'feed-list',

  components: {
    PeopleAvatar,
    PeopleName,
    carousel,
    ThumbsUpIcon,
    MessageCircleIcon
  },

  props: {
    feed: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ]),

    compiledMarkdown () {
      const md = marked(this.feed.content.text, { sanitize: true })
      // const regex = /[@]/g
      // const username = 'user1'
      // const mentionReplacer = `<a href="user/${username}">
      //   <span class="mention people" contenteditable="false">@${username}</span>
      // </a>`
      // const translateMention = md.replace(regex, mentionReplacer)
      // return translateMention
      // const md = marked(this.feed.content.text)
      return md
    },

    postDate () {
      return parseDate(this.feed.created)
    },

    shortDate () {
      if (moment().diff(this.postDate, 'days') > 1) {
        return this.postDate.tz(this.user.timezone).format('MMM/DD/YYYY')
      } else {
        return this.postDate.tz(this.user.timezone).format('HH:mm')
      }
    }
  },

  methods: {
    openComment () {
      this.$emit('open-comment')
    }
  }
}
</script>
