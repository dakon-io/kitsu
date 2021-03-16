<template>
  <aside class="sidebar-comment">
    <div>
      <div class="card card-content">
        <AddFeedComment
          ref="add-comment"
          :user="user"
          :peoples="displayedPeople"
          :light="true"
          :is-loading="loading.addComment"
          :is-error="errors.addComment"
          @add-comment="addComment"/>
      </div>

      <div
        class="comments"
        v-if="feedComments && feedComments.length > 0 && !loading.comment">
        <FeedComment
          v-for="(comment, index) in feedComments"
          :key="'comment' + comment.id"
          :comment="comment"
          :light="true"
          :is-first="index === 0"
          :is-last="index === pinnedCount"/>
      </div>
      <div class="no-comment" v-else-if="!loading.comment">
        <em>
          {{ $t('tasks.no_comment')}}
        </em>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

import AddFeedComment from '../widgets/AddFeedComment'
import FeedComment from '../widgets/FeedComment'

export default {
  name: 'FeedInfo',

  components: {
    AddFeedComment,
    FeedComment
  },

  data () {
    return {
      inputComment: '',
      feedComments: [
        {
          created_at: '2021-02-23T02:23:36',
          data: null,
          id: '316151ec-337b-4082-864b-89e6ce058101',
          object_id: 'b2878463-b0d9-454b-88ec-d2a2764776ec',
          object_type: 'Task',
          person: {
            first_name: 'user',
            last_name: '1',
            has_avatar: false,
            id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
            initials: 'U1',
            color: 'red'
          },
          person_id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
          pinned: false,
          shotgun_id: null,
          text: 'This is comment',
          type: 'Comment',
          updated_at: '2021-02-23T03:40:49'
        }
      ],
      errors: {
        addComment: false,
        editComment: false,
        deleteComment: false
      },
      loading: {
        addComment: false,
        editComment: false,
        deleteComment: false,
        comment: false
      }
    }
  },

  methods: {
    addComment (comment) {
      this.feedComments.unshift({
        created_at: new Date(),
        data: null,
        id: '316151ec-337b-4082-864b-89e6ce05811' + this.feedComments.length + 1,
        object_id: 'b2878463-b0d9-454b-88ec-d2a2764776ec',
        object_type: 'Task',
        person: this.user,
        person_id: this.user.id,
        pinned: false,
        shotgun_id: null,
        text: comment.text,
        type: 'Comment',
        updated_at: new Date()
      })
    }

    // addComment (comment) {
    //   const params = {
    //     comment
    //   }
    //   const action = 'commentFeed'
    //   this.loading.addComment = true
    //   this.errors.addComment = false
    //   this.$store.dispatch(action, params)
    //     .then(() => {
    //       this.reset()
    //       this.loading.addComment = false
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //       this.errors.addComment = true
    //       this.loading.addComment = false
    //     })
    // }
  },

  computed: {
    ...mapGetters([
      'user',
      'displayedPeople'
    ]),

    pinnedCount () {
      if (!this.feedComments) return 0
      return this.feedComments.filter(c => c.pinned).length
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-comment {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    max-width: 425px;
    padding: $size-2;
    padding-top: calc(60px + #{$size-2});
    background-color: var(--background-alt);
    border-left: 3px solid var(--border);
    overflow-y: auto;
  }
</style>
