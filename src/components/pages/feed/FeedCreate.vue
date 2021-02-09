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
            <!-- <vue-tribute :options="tributeOptions">
              <textarea
                v-model="inputCreate"
                @input="updateInputCreate"
                class="input content-create"
                :class="{ preview: isPreview }"></textarea>
            </vue-tribute> -->
            <textarea
              v-model="inputCreate"
              @input="updateInputCreate"
              placeholder="Type here ..."
              class="input content-create"
              :class="{ preview: isPreview }"></textarea>
            <div
              v-html="compiledMarkdown"
              :class="{ preview: !isPreview }"></div>
          </div>
          <vue-dropzone
            ref="inputCreateImage"
            id="dropzone"
            class="content-create-image"
            :options="inputCreateImageOptions"
            :duplicateCheck="true"
            @vdropzone-thumbnail="inputCreateImageDataUrl"></vue-dropzone>
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
// import VueTribute from 'vue-tribute'
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
    // VueTribute,
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
      img: [],
      isPreview: false,
      // tributeOptions: {
      //   trigger: '@',
      //   values: [
      //     // Key is what will be shown in list and search term as default
      //     // Value is what will be shown in mention as default
      //     { key: 'caksawintang', username: 'caksawintang', fullname: 'Caksa Wintang' },
      //     { key: 'username', username: 'username', fullname: 'User Full Name' },
      //     { key: 'username', username: 'username', fullname: 'User Full Name' }
      //   ],
      //   selectTemplate: function (item) {
      //     return ('@' + item.original.username)
      //   },
      //   menuItemTemplate: function (item) {
      //     return ('<div><p class="username title is-6"><b>' + item.string + '</b></p><p class="subtitle is-6"><small>' + item.original.fullname + '</small></p></div>')
      //   }
      // },
      inputCreateImageOptions: {
        url: 'https://httpbin.org/post',
        // url: 'f',
        acceptedFiles: '.jpg, .jpeg, .png',
        maxFilesize: 0.5,
        // headers: { 'My-Awesome-Header': 'header value' },
        // addRemoveLinks: true,
        autoProcessQueue: false,
        thumbnailWidth: null,
        thumbnailHeight: null,
        // thumbnailMethod: 'contain',
        dictDefaultMessage: 'Drop pictures here to post (.jpg, .jpeg, .png)'
      }
    }
  },

  computed: {
    compiledMarkdown () {
      const md = marked(this.inputCreate, { sanitize: true })
      // const regex = /[@]\w+/g
      // const regex = /[@]/g
      // const username = 'user1'
      // const mentionReplacer = `<a href="user/${username}">
      //   <span class="mention people" contenteditable="false">@${username}</span>
      // </a>`
      // const translateMention = md.replace(regex, mentionReplacer)
      // return translateMention
      return md
    }
  },

  methods: {
    updateInputCreate: _.debounce(function (e) {
      this.inputCreate = e.target.value
    }, 300),

    inputCreateImageDataUrl (file, dataUrl) {
      this.img.push(dataUrl)
    },

    createNewFeed () {
      if (this.inputCreate) {
        const value = {
          text: this.inputCreate,
          img: this.img
        }
        this.$emit('create-feed', value)
        // console.log(this.img)
        // const img = this.$refs.inputCreateImage.getAcceptedFiles()
        // console.log(img)
        // this.$refs.inputCreateImage.processQueue()
        this.$refs.inputCreateImage.removeAllFiles()
        this.inputCreate = ''
        this.img = []
      }
    }
  }
}
</script>
