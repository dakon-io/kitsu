<template>
  <div class="feed-items">
    <div class="feed-item">
      <div class="card">
        <div class="card-content">
          <div class="feed-sender media">
            <div class="media-left">
              <div class="photo-container">
                <div
                  class="avatar"
                  :style="{ backgroundImage: 'url(' + require('@/assets/' + feed.user.avatar) + ')' }"></div>
              </div>
            </div>
            <div class="text media-content">
              <p class="username title is-6">
                <b>@{{ feed.user.username }}</b>
              </p>
              <p class="subtitle is-6">
                <small>{{ feed.created }}</small>
              </p>
            </div>
          </div>

          <div class="feed-content">
            <div v-if="feed.content.text" class="content-text">
              <h2 v-if="feed.content.text.length <= 100">{{ feed.content.text }}</h2>
              <p v-else>{{ feed.content.text }}</p>
            </div>
            <div v-if="feed.content.img.length > 0" class="content-media">
              <div
                v-if="feed.content.img.length == 1"
                class="img"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/' + feed.content.img) + ')' }">
                <img :src="require('@/assets/images/' + feed.content.img)">
              </div>
              <carousel v-if="feed.content.img.length > 1" :nav="false" :items="1">
                <div
                  v-for="(feedImg, index) in feed.content.img"
                  :key="index"
                  class="carousel-item"
                  :style="{ backgroundImage: 'url(' + require('@/assets/images/' + feedImg) + ')' }">
                  <img :src="require('@/assets/images/' + feedImg)">
                </div>
              </carousel>
            </div>
          </div>

          <div class="feed-action">
            <div class="columns">
              <div class="column">
                <button class="button is-fullwidth">
                  <thumbs-up-icon class="icon"/>Like
                </button>
              </div>
              <div class="column">
                <button class="button is-fullwidth">
                  <message-circle-icon class="icon"/>Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="feed-item">
      <div class="card">
        <div class="card-content">
          <div class="feed-sender media">
            <div class="media-left">
              <div class="photo-container">
                <div
                  class="avatar"
                  :style="{ backgroundImage: 'url(' + require('@/assets/kitsu.png') + ')' }"></div>
              </div>
            </div>
            <div class="text media-content">
              <p class="username title is-6">
                <b>@username</b>
              </p>
              <p class="subtitle is-6">
                <small>feed created date</small>
              </p>
            </div>
          </div>

          <div class="feed-content">
            <div class="content-text">
              <h2>Short feed text</h2>
            </div>
          </div>

          <div class="feed-action">
            <div class="columns">
              <div class="column">
                <button class="button is-fullwidth">
                  <thumbs-up-icon class="icon"/>Like
                </button>
              </div>
              <div class="column">
                <button class="button is-fullwidth">
                  <message-circle-icon class="icon"/>Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-item">
      <div class="card">
        <div class="card-content">
          <div class="feed-sender media">
            <div class="media-left">
              <div class="photo-container">
                <div
                  class="avatar"
                  :style="{ backgroundImage: 'url(' + require('@/assets/kitsu.png') + ')' }"></div>
              </div>
            </div>
            <div class="text media-content">
              <p class="username title is-6">
                <b>@username</b>
              </p>
              <p class="subtitle is-6">
                <small>feed created date</small>
              </p>
            </div>
          </div>

          <div class="feed-content">
            <div class="content-text">
              <p>Long feed text > 100. Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Ipsa magni nesciunt dolores animi laboriosam voluptatem at impedit, odit sint, fuga delectus maxime, eius architecto est, obcaecati! Repellendus mollitia veritatis hic.</p>
            </div>
          </div>

          <div class="feed-action">
            <div class="columns">
              <div class="column">
                <button class="button is-fullwidth">
                  <thumbs-up-icon class="icon"/>Like
                </button>
              </div>
              <div class="column">
                <button class="button is-fullwidth">
                  <message-circle-icon class="icon"/>Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-item">
      <div class="card">
        <div class="card-content">
          <div class="feed-sender media">
            <div class="media-left">
              <div class="photo-container">
                <div
                  class="avatar"
                  :style="{ backgroundImage: 'url(' + require('@/assets/kitsu.png') + ')' }"></div>
              </div>
            </div>
            <div class="text media-content">
              <p class="username title is-6">
                <b>@username</b>
              </p>
              <p class="subtitle is-6">
                <small>feed created date</small>
              </p>
            </div>
          </div>

          <div class="feed-content">
            <div class="content-media">
              <div
                class="img"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleLandscape1.png') + ')' }">
                <img src="@/assets/images/imgExampleLandscape1.png">
              </div>
            </div>
          </div>

          <div class="feed-action">
            <div class="columns">
              <div class="column">
                <button class="button is-fullwidth">
                  <thumbs-up-icon class="icon"/>Like
                </button>
              </div>
              <div class="column">
                <button class="button is-fullwidth">
                  <message-circle-icon class="icon"/>Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-item">
      <div class="card">
        <div class="card-content">
          <div class="feed-sender media">
            <div class="media-left">
              <div class="photo-container">
                <div
                  class="avatar"
                  :style="{ backgroundImage: 'url(' + require('@/assets/kitsu.png') + ')' }"></div>
              </div>
            </div>
            <div class="text media-content">
              <p class="username title is-6">
                <b>@username</b>
              </p>
              <p class="subtitle is-6">
                <small>feed created date</small>
              </p>
            </div>
          </div>

          <div class="feed-content">
            <div class="content-media">
              <carousel :nav="false" :items="1">
                <div
                  class="carousel-item"
                  :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleSquare1.jpeg') + ')' }">
                  <img src="@/assets/images/imgExampleSquare1.jpeg">
                </div>
                <div
                  class="carousel-item"
                  :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleSquare1.jpeg') + ')' }">
                  <img src="@/assets/images/imgExampleSquare1.jpeg">
                </div>
                <div
                  class="carousel-item"
                  :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleSquare1.jpeg') + ')' }">
                  <img src="@/assets/images/imgExampleSquare1.jpeg">
                </div>
              </carousel>
            </div>
          </div>

          <div class="feed-action">
            <div class="columns">
              <div class="column">
                <button class="button is-fullwidth">
                  <thumbs-up-icon class="icon"/>Like
                </button>
              </div>
              <div class="column">
                <button class="button is-fullwidth">
                  <message-circle-icon class="icon"/>Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel2'
import {
  ThumbsUpIcon,
  MessageCircleIcon
} from 'vue-feather-icons'

export default {
  name: 'feed-list',

  components: {
    carousel,
    ThumbsUpIcon,
    MessageCircleIcon
  },

  props: {
    feed: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .dark {
    .feed-item {
      background-color: $dark-grey-lighter;
      color: $white-grey;
    }
  }
  .page {
    height: auto;
  }
  .feed-item {
    margin: 0 auto;
    margin-bottom: $size-3;
    background-color: var(--background);
    .card {
      background: transparent;
      color: inherit;
    }
    .card-content {
      padding: 12px;
      &:not(:nth-last-child(1)) {
        border-bottom: 2px solid var(--border);
      }
    }
    .feed-sender {
      .photo-container {
        $wh: 2.3rem;
        width: $wh;
        height: $wh;
      }
    }
    .feed-content {
      margin-top: -1;
      .photo-container {
        $wh: 3rem;
        width: $wh;
        height: $wh;
      }
      &.content { margin-bottom: 0; }
      .content-text * { margin-bottom: 0; }
      .content-media {
        margin :0 -12px;
        .carousel-item, .img {
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          img {
            width: 100%;
            visibility: hidden;
          }
        }
      }
    }
    .feed-action {
      padding: $size-1 0;
      border: 1px solid var(--border);
      border-width: 1px 0;
      margin-top: $size-3;
      .columns {
        margin-bottom: 0;
        .column {
          padding: 0 $size-1;
          &:first-child { padding-left: 0; }
          &:last-child { padding-right: 0; }
        }
      }
      .button .icon {
        font-size: inherit;
        margin-right: $size-1;
        transform: scale(0.8);
      }
    }
  }
  @media(max-width: 768px) {
    .feed-items {
      margin-left: -12px;
      margin-right: -12px;
    }
  }
  @media(min-width: 768px) {
    .feed-item {
      max-width: 500px;
      border-radius: $size-2;
    }
  }
</style>
