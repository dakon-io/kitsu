<template>
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
          <vue-dropzone ref="inputCreateImage" id="dropzone" class="content-create-image" :options="inputCreateImage" :duplicateCheck="true"></vue-dropzone>
        </div>

        <div class="feed-action">
          <button
            @click="isPreview = !isPreview"
            :class="{ hidden: isPreview }"
            class="button ml-auto">
            <eye-icon class="icon"/>Preview
          </button>
          <button
            @click="isPreview = !isPreview"
            :class="{ hidden: !isPreview }"
            class="button ml-auto">
            <edit-icon class="icon"/>Edit
          </button>
          <button @click="createNewFeed" class="button">
            <send-icon class="icon"/>Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
import VueTribute from 'vue-tribute'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {
  EyeIcon,
  EditIcon,
  SendIcon
} from 'vue-feather-icons'

export default {
  name: 'FeedCreate',

  components: {
    VueTribute,
    vueDropzone: vue2Dropzone,
    EyeIcon,
    EditIcon,
    SendIcon
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
          return ('@' + item.original.username)
        },
        menuItemTemplate: function (item) {
          return ('<div><p class="username title is-6"><b>' + item.string + '</b></p><p class="subtitle is-6"><small>' + item.original.fullname + '</small></p></div>')
        }
      },
      inputCreateImage: {
        url: 'https://httpbin.org/post',
        // url: 'f',
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        dictDefaultMessage: 'Drop pictures here to post'
      }
    }
  },

  computed: {
    compiledMarkdown () {
      const md = marked(this.inputCreate, { sanitize: true })
      // const regex = /[@]\w+/g
      const regex = /[@]/g
      // const username = ['user1', 'user2']
      const username = 'user1'
      const mentionReplacer = `<a href="user/${username}">
        <span class="mention people" contenteditable="false">@${username}</span>
      </a>`
      const translateMention = md.replace(regex, mentionReplacer)
      return translateMention
    }
  },

  methods: {
    updateInputCreate: _.debounce(function (e) {
      this.inputCreate = e.target.value
    }, 300),

    createNewFeed () {
      if (this.inputCreate) {
        this.$emit('create-feed', this.inputCreate)
        this.inputCreate = ''
      }
    }
  }
}
</script>
