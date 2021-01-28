<template>
  <div class="feed-items">
    <div class="feed-item create">
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
            </div>
          </div>

          <div class="feed-content">
            <div id="editor">
              <vue-tribute :options="tributeOptions">
                <textarea
                  v-model="inputCreate"
                  @input="updateInputCreate"
                  class="input content-create"
                  :class="{ preview: isPreview }"></textarea>
              </vue-tribute>
              <div
                v-html="compiledMarkdown"
                :class="{ preview: !isPreview }"></div>
            </div>
            <!-- <div class="content-create" contenteditable></div> -->
            <!-- <textarea class="content-create" rows="10"></textarea> -->
            <!-- <Mentionable
              :keys="['@']"
              :items="items"
              insert-space
              offset="6">
              <textarea
                class="content-create"
                rows="10"
                v-model="text"/>
              <template #item-@="{ item }">
                <div class="user">
                  {{ item.value }} - <span class="dim">{{ item.fullName }}</span>
                </div>
              </template>
            </Mentionable> -->
            <!-- <vue-tribute :options="tributeOptions">
              <div class="content-create" contenteditable></div>
            </vue-tribute> -->
            <div class="asd"></div>
          </div>

          <div class="feed-action">
            <button
              @click="isPreview = !isPreview"
              :class="{ hidden: isPreview }"
              class="button ml-auto">
              <eye-icon class="icon"/>Text preview
            </button>
            <button
              @click="isPreview = !isPreview"
              :class="{ hidden: !isPreview }"
              class="button ml-auto">
              <edit-icon class="icon"/>Edit text
            </button>
            <button class="button">
              <send-icon class="icon"/>Post
            </button>
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              class="button">
              <type-icon class="icon"/>Help
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
import VueTribute from 'vue-tribute'
// import { Mentionable } from 'vue-mention'
import {
  EyeIcon,
  EditIcon,
  SendIcon,
  TypeIcon
} from 'vue-feather-icons'

export default {
  name: 'FeedCreate',

  components: {
    VueTribute,
    // Mentionable,
    EyeIcon,
    EditIcon,
    SendIcon,
    TypeIcon
  },

  // data () {
  //   return {
  //     // text: '',
  //     // items: [
  //     //   {
  //     //     value: 'username-1',
  //     //     fullName: 'User Full Name-1',
  //     //     searchText: 'username-1'
  //     //   },
  //     //   {
  //     //     value: 'username-2',
  //     //     fullName: 'User Full Name-2',
  //     //     searchText: 'username-2'
  //     //   },
  //     //   {
  //     //     value: 'username-3',
  //     //     fullName: 'User Full Name-3',
  //     //     searchText: 'username-3'
  //     //   }
  //     // ]
  //     tributeOptions: {
  //       trigger: '@',
  //       values: [
  //         // Key is what will be shown in list and search term as default
  //         // Value is what will be shown in mention as default
  //         { key: 'caksawintang', username: 'caksawintang', fullname: 'Caksa Wintang' },
  //         { key: 'username', username: 'username', fullname: 'User Full Name' },
  //         { key: 'username', username: 'username', fullname: 'User Full Name' }
  //       ],
  //       selectTemplate: function (item) {
  //         return ('<span class="mention people" contenteditable="false">@' + item.original.username + '</span>')
  //       },
  //       menuItemTemplate: function (item) {
  //         return ('<div><p class="username title is-6"><b>' + item.string + '</b></p><p class="subtitle is-6"><small>' + item.original.fullname + '</small></p></div>')
  //       }
  //     }
  //   }
  // },

  data () {
    return {
      inputCreate: '',
      isPreview: false,
      tributeOptions: {
        trigger: '@',
        values: [
          // Key is what will be shown in list and search term as default
          // Value is what will be shown in mention as default
          { key: 'caksawintang', username: 'caksawintang', fullname: 'Caksa Wintang' },
          { key: 'username', username: 'username', fullname: 'User Full Name' },
          { key: 'username', username: 'username', fullname: 'User Full Name' }
        ],
        selectTemplate: function (item) {
          return ('@[' + item.original.username + ']')
        },
        menuItemTemplate: function (item) {
          return ('<div><p class="username title is-6"><b>' + item.string + '</b></p><p class="subtitle is-6"><small>' + item.original.fullname + '</small></p></div>')
        }
      },
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
  },

  computed: {
    compiledMarkdown () {
      return marked(this.inputCreate, { sanitize: true })
    }
  },

  methods: {
    updateInputCreate: _.debounce(function (e) {
      this.inputCreate = e.target.value
    }, 300)
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
    &.create {
      .feed-content {
        .content-create {
          width: 100%;
          padding: $size-1 $size-3;
          overflow-y: auto;
          transition: $transition-fast;
          &:focus { height: 170px; }
        }
        .preview {
          transition: $transition-fast !important;
          position: fixed;
          top: 0;
          left: 0;
          width: 0 !important;
          height: 0 !important;
          padding: 0;
          margin: 0;
        }
      }
      .feed-action {
        display: flex;
        width: 100%;
        border: 0;
        .button {
          &.ml-auto { margin-left: auto; }
          &:not(.ml-auto) { margin-left: $size-1; }
        }
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

  // .mention-item {
  //   padding: 4px 10px;
  //   border-radius: 4px;
  // }

  // .mention-selected {
  //   background: rgb(192, 250, 153);
  // }
</style>
