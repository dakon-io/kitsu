<template>
  <article
    ref="wrapper"
    @drop="onDrop"
    @dragover="onDragover"
    @dragleave="onDragleave"
    :class="{
      'add-comment': true,
      'word-break': true,
      media: true,
      'is-dragging': isDragging
    }"
  >
    <figure class="media-left" v-if="!light">
      <div class="level">
        <div class="level-left">
          <people-avatar class="level-item" :person="user" />
        </div>
      </div>
    </figure>
    <div class="media-content">
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
          ref="comment-textarea"
          class="textarea flexrow-item"
          :placeholder="$t('feeds.comments.type_here')"
          :disabled="isLoading"
          v-model="text"
          @keyup.enter.ctrl="runAddComment(text)"
          @keyup.enter.meta="runAddComment(text)"
          v-focus>
        </textarea>
      </at-ta>
      <group-button class="mt1">
        <button
          :class="{
            'button': true,
            'is-primary': true,
            'is-loading': isLoading
          }"
          @click="runAddComment(text)"
        >
          {{ $t('feeds.comments.post') }}
        </button>
      </group-button>
      <div
        class="error pull-right"
        v-if="isError"
      >
        <em>{{ $t('comments.error') }}</em>
      </div>
    </div>

  </article>
</template>

<script>
import { mapGetters } from 'vuex'

import AtTa from 'vue-at/dist/vue-at-textarea'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import GroupButton from '@/components/widgets/GroupButton'

export default {
  name: 'AddFeedComment',

  components: {
    AtTa,
    PeopleAvatar,
    GroupButton
  },

  data () {
    return {
      isDragging: false,
      text: ''
    }
  },

  props: {
    addComment: {
      type: Function,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: null
    },
    isError: {
      type: Boolean,
      default: null
    },
    light: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    },
    attachedFileName: {
      type: String,
      default: ''
    },
    peoples: {
      type: Array,
      default: () => []
    }
  },

  mounted () {
    [
      'drag', 'dragstart', 'dragend', 'dragover',
      'dragenter', 'dragleave', 'drop'
    ].forEach((evt) => {
      if (this.$refs.wrapper) {
        this.$refs.wrapper.addEventListener(evt, (e) => {
          e.preventDefault()
          e.stopPropagation()
        })
      }
    })
  },

  computed: {
    ...mapGetters([
      'isDarkTheme'
    ]),

    isFileAttached () {
      return (
        this.attachedFileName !== undefined &&
        this.attachedFileName.length > 0
      )
    }
  },

  methods: {
    runAddComment (text) {
      const value = {
        text: this.text
      }
      this.$emit('add-comment', value)
      this.text = ''
    },

    focus () {
      this.$refs['comment-textarea'].focus()
    },

    onDragover () {
      this.isDragging = true
    },

    onDragleave () {
      this.isDragging = false
    },

    onDrop (event) {
      const forms = []
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const form = new FormData()
        form.append('file', event.dataTransfer.files[i])
        forms.push(form)
      }
      this.$emit('file-drop', forms)
      this.isDragging = false
    },

    setValue (comment) {
      this.$nextTick(() => {
        this.$refs['comment-textarea'].value = comment.text
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dark textarea:disabled {
  background: #555;
}

.add-comment {
  border-radius: 5px;
  // background: white;
  transition: background 0.2s ease;

  textarea {
    min-height: 7em;
    margin-bottom: 0.3em;
  }

  textarea:focus,
  textarea:active {
    border-color: $green;
  }
}

.control {
  margin-bottom: 0.1em;
}

.preview-section {
  word-break: break-all;
}

.post-button-wrapper {
  margin: 0;

  .button.is-primary {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 34px;
    margin-top: 1px;
  }
}

.mt1 {
  margin-top: 0.5em;
}

.is-dragging {
  background-color: $purple;
}

.button.is-primary {
  border-radius: 2em;
}

.button.active {
  background: var(--background-selected);
}

.status-selector {
  margin: 0;
}
</style>
