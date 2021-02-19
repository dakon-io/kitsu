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

        <div
          class="feed-content"
          @dragenter="hideTa = true, hideDropzone = false"
          @dragover.prevent="checkDragOver">
          <div
            id="editor"
            :class="{ 'hidden' : hideTa }">
            <at-ta
              :members="peoples"
              name-key="full_name"
              :limit="2"
            >
              <template slot="item" slot-scope="peoples">
                <div class="flexrow">
                  <people-avatar
                    class="flexrow-item"
                    :person="peoples.item"
                    :size="20"
                    :no-cache="true"
                  />
                  <span class="flexrow-item">
                    {{ peoples.item.full_name }}
                  </span>
                </div>
              </template>
              <textarea
                ref="caption"
                v-model="inputCreate"
                @keyup.enter.ctrl="createNewFeed()"
                placeholder="Type here ..."
                class="input content-create"></textarea>
            </at-ta>
          </div>
          <vue-dropzone
            ref="inputCreateImage"
            id="dropzone"
            class="content-create-image"
            :options="inputCreateImageOptions"
            :duplicateCheck="true"
            @dragover.prevent="checkDragOver"
            @vdropzone-drag-leave="hideTa = false, hideDropzone = true"
            @vdropzone-drop="hideTa = false, hideDropzone = false"
            @vdropzone-thumbnail="inputCreateImageDataUrl"
            :class="{ 'hidden' : hideDropzone }"></vue-dropzone>
        </div>

        <div class="feed-action">
          <button @click="openDropzone" class="button ml-auto" title="Upload pictures">
            <image-icon class="icon"/>Pictures
          </button>
          <button @click="createNewFeed()" class="button" title="or Ctrl + Enter to send">
            <send-icon class="icon"/>Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AtTa from 'vue-at/dist/vue-at-textarea'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {
  ImageIcon,
  SendIcon
} from 'vue-feather-icons'

export default {
  name: 'FeedCreate',

  props: {
    peoples: {
      type: Array,
      default: () => []
    }
  },

  components: {
    AtTa,
    PeopleAvatar,
    vueDropzone: vue2Dropzone,
    ImageIcon,
    SendIcon
  },

  data () {
    return {
      hideTa: false,
      hideDropzone: true,
      inputCreate: '',
      img: [],
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

  methods: {
    checkDragOver (e) {
      e.preventDefault()
      e.stopPropagation()
      this.hideTa = true
      this.hideDropzone = true
    },

    openDropzone () {
      this.$refs.inputCreateImage.$el.click()
    },

    inputCreateImageDataUrl (file, dataUrl) {
      this.img.push(dataUrl)
      this.hideTa = false
      this.hideDropzone = false
    },

    createNewFeed (inputCreate) {
      if (this.inputCreate) {
        const value = {
          text: this.inputCreate,
          img: this.img
        }
        this.$emit('create-feed', value)
        // this.$emit('create-feed', inputCreate)
        // console.log(this.img)
        // const img = this.$refs.inputCreateImage.getAcceptedFiles()
        // console.log(img)
        // this.$refs.inputCreateImage.processQueue()
        this.$refs.inputCreateImage.removeAllFiles()
        this.inputCreate = ''
        this.img = []
        this.hideTa = false
        this.hideDropzone = true
      } else if (!this.inputCreate) {
        alert('Caption is required')
        this.$refs.caption.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-create-image { min-height: 170px; }
</style>
