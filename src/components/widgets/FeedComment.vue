<template>
<div>
  <article
    :class="{
      comment: true,
      highlighted: highlighted
    }"
    v-if="!isEmpty"
  >
    <div class="content-wrapper full">
      <div class="flexrow">
        <people-avatar
          class="flexrow-item"
          :size="25"
          :font-size="12"
          :person="comment.person"
        />
        <strong class="flexrow-item">
          <people-name
            class=""
            :person="comment.person"
          />
        </strong>
        <div class="filler"></div>
        <span
          class="flexrow-item date"
          :title="fullDate"
        >
          {{ shortDate }}
        </span>
      </div>
      <div class="flexrow-item comment-content">
        <div class="content">
          <p
            class="client-comment"
            v-if="personMap[comment.person_id].role === 'client'"
          >
            <span>
              {{ $t('comments.comment_from_client') }}
              <copy-icon
                class="copy-icon"
                size="1.1x"
                @click="$emit('duplicate-comment', comment)"
              />
            </span>
          </p>
          <p
            v-html="renderComment(comment.text, comment.mentions, personMap)"
            class="comment-text"
            v-if="comment.text"
          >
          </p>
        </div>
      </div>
    </div>

  </article>
  <div class="empty-comment" v-else>
    <div class="flexrow content-wrapper">
      <people-avatar
        class="flexrow-item"
        :person="comment.person"
        :size="25"
        :font-size="12"
      />
      <people-name class="flexrow-item" :person="comment.person" />
      <span class="filler">
      </span>
      <span class="flexrow-item date" :title="fullDate">
        {{ shortDate }}
      </span>
      <div class="flexrow-item menu-wrapper">
        <chevron-down-icon
          class="menu-icon"
          @click="toggleCommentMenu"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>

import moment from 'moment'
import { mapGetters } from 'vuex'
import { renderComment } from '@/lib/render'
import { formatDate, parseDate } from '@/lib/time'

import {
  ChevronDownIcon,
  CopyIcon
} from 'vue-feather-icons'
import PeopleAvatar from './PeopleAvatar.vue'
import PeopleName from './PeopleName.vue'

export default {
  name: 'FeedComment',
  components: {
    ChevronDownIcon,
    CopyIcon,
    PeopleAvatar,
    PeopleName
  },

  data () {
    return {
      checklist: []
    }
  },

  props: {
    comment: {
      type: Object,
      default: () => {}
    },
    highlighted: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    if (this.comment.checklist) {
      this.$options.silent = true
      this.checklist = [...this.comment.checklist]
      this.$nextTick()
        .then(() => {
          this.$options.silent = false
        })
    }
  },

  computed: {
    ...mapGetters([
      'currentProduction',
      'isDarkTheme',
      'user',
      'personMap'
    ]),

    isEmpty () {
      return (
        this.comment.text.length === 0
      )
    },

    pictureAttachments () {
      return this.comment.attachment_files.filter(attachment => {
        return ['png', 'jpg', 'jpeg', 'gif'].includes(attachment.extension)
      })
    },

    fileAttachments () {
      return this.comment.attachment_files.filter(attachment => {
        return !['png', 'jpg', 'jpeg', 'gif'].includes(attachment.extension)
      })
    },

    commentDate () {
      return parseDate(this.comment.created_at)
    },

    fullDate () {
      return this.commentDate
        .tz(this.user.timezone)
        .format('YYYY-MM-DD HH:mm:ss')
    },

    shortDate () {
      if (moment().diff(this.commentDate, 'days') > 1) {
        return this.commentDate.tz(this.user.timezone).format('MM/DD')
      } else {
        return this.commentDate.tz(this.user.timezone).format('HH:mm')
      }
    }

    // boxShadowStyle () {
    //   return `0 0 3px 2px ${this.comment.task_status.color}1F`
    // }
  },

  methods: {
    formatDate (date) {
      return formatDate(date)
    },

    getPath (name) {
      const route = {
        name: name,
        params: {
          task_id: this.comment.object_id,
          comment_id: this.comment.id
        }
      }
      if (this.$route.params.episode_id) {
        route.name = `episode-${route.name}`
        route.params.episode_id = this.$route.params.episode_id
      }
      return route
    },

    getAttachmentPath (attachment) {
      return `/api/data/attachment-files/${attachment.id}/file`
    },

    addChecklistEntry () {
      this.checklist.push({
        text: '',
        checked: false
      })
    },

    emitChangeEvent (event) {
      const now = (new Date().getTime())
      this.lastCall = this.lastCall || 0
      if (now - this.lastCall > 1000) {
        this.lastCall = now
        this.$emit(
          'checklist-updated',
          this.comment,
          this.checklist.filter(item => item.text && item.text.length > 0)
        )
      }
    },

    acknowledgeComment (comment) {
      this.$emit('ack-comment', comment)
    },

    renderComment
  },

  watch: {
    'comment.checklist' () {
      this.checklist = [...this.comment.checklist]
    },

    checklist () {
      if (!this.$options.silent) {
        this.emitChangeEvent()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dark {
  .comment-text {
    color: $white-grey;
  }

  .content .client-comment {
    background: #C4677B;
    color: white;
  }

  .add-checklist {
    background: $dark-grey-lighter;
  }

  .comment {
    background: $dark-grey-lightmore;
  }

  .like-button {
    color: white;
  }
}

article.comment {
  background: white;
  border-radius: 5px;
  padding: 0;
  margin: 1em 0;
  word-wrap: anywhere;
  hyphens: auto;
}

.media {
  padding: 0.6em;
}

.comment.highlighted {
  background: #F1EEFF;
}

.content .comment-person {
  min-height: 40px;
  margin-bottom: 0;
}

.comment-date {
  color: $grey;
  margin-left: 0.5em;
  flex: 1;
}

.content {
  .comment-text {
    margin-top: .5rem;
    margin-bottom: 0rem;
    padding: 0.2em 0.1em;
    word-break: break-word;
    hyphens: auto;
    hyphenate-limit-chars: 8 6 2;
  }
}

.checklist {
  margin-top: 0.5em;
}

.menu-icon {
  width: 20px;
  cursor: pointer;
  color: $light-grey;
}

.menu-wrapper {
  position: relative;
}

.add-checklist {
  background: $white-grey-light;
  color: $grey;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8em;
  padding: 0.5em;
}

.content .client-comment {
  border-radius: 4px;
  background: lighten($red, 80%);
  color: desaturate(darken($red, 30%), 20%);
  font-size: 0.8em;
  margin-top: 0.4em;
  margin-bottom: 0;
  padding: 0.5em 0.2em;
  text-align: center;
  text-transform: uppercase;
}

.flexrow {
  align-items: center;
}

.comment-left {
  display: flex;
  flex-direction: column;
  padding: 0.5em 0 0.5em 0.5em;
}

.like-button {
  align-items: center;
  background-color: transparent;
  border: 0;
  border-radius: .5rem;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  margin: 0;
  padding: .3rem 0;
  width: 100%;

  &:hover,
  &:focus {
    background-color: $dark-grey-lightest;
  }

  &[disabled] {
    pointer-events: none;
  }

  span {
    margin-left: 0.3em;
  }
}

.like-button--empty {
  opacity: .5;

  &:hover,
  &:focus {
    opacity: 1;
  }
}

.comment-content {
  padding: 0em;
}

.comment-like {
  cursor: pointer;
}

.infos {
  display: flex;
  align-items: center;
}

.content-wrapper {
  padding: 0.5em;

  &.full {
    border-left: 1px solid transparent;
  }
}

.date {
  font-size: 0.8em;
  margin-right: 0.5em;
}

.preview-info {
  margin-top: 0;
  padding-top: 0;

  .date {
    margin-right: 26px;
  }
}

p {
  margin: 0;
}

.attachment {
  display: block;
  text-align: center;
  margin: 0.4em auto;
}

.attachment-icon {
  margin: 0.6em;
}

.copy-icon {
  cursor: pointer;
  margin-left: .5em;
}

@media screen and (max-width: 768px) {
  .flexrow {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
