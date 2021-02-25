<template>
  <div class="feeds page">

    <div
      v-if="showFeedInfo"
      class="feed-comment-container">
      <FeedInfo
        :comment="comments"
        @create-comment="createNewComment"/>
      <div
        id="c-mask"
        @click="showFeedInfo = !showFeedInfo"
        :class="{'is-active': showFeedInfo}">
      </div>
    </div>

    <div class="is-flex">

      <div class="feed">
        <FeedCreate
          :user="user"
          :peoples="displayedPeople"
          @create-feed="createNewFeed"/>
        <FeedList
          v-for="feed in feeds" :key="feed.id"
          :feed="feed"
          @open-comment="showFeedInfo = !showFeedInfo"/>
      </div>

      <div class="todo-list">
        <feed-todos-list
          ref="todo-list"
          :tasks="sortedTasks"
          :is-loading="isTodosLoading"
          :is-error="isTodosLoadingError"
          :selection-grid="todoSelectionGrid"
          @scroll="setTodoListScrollPosition"/>
      </div>

    </div>
    <div
      class="side-column"
      v-if="nbSelectedTasks === 1">
      <task-info
        :task="Object.values(selectedTasks)[0]"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firstBy from 'thenby'

import FeedCreate from './feed/FeedCreate'
import FeedInfo from '../sides/FeedInfo'
import FeedList from '../lists/FeedList'
import FeedTodosList from '../lists/FeedTodosList'
import TaskInfo from '../sides/TaskInfo'

export default {
  name: 'feeds',

  components: {
    FeedCreate,
    FeedInfo,
    FeedList,
    FeedTodosList,
    TaskInfo
  },

  data () {
    return {
      showFeedInfo: false,
      feeds: [
        {
          id: 'feed1',
          created: 'time creation',
          user: {
            first_name: 'user',
            last_name: '1',
            has_avatar: false,
            id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
            initials: 'U1',
            color: 'red'
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
            first_name: 'user',
            last_name: '1',
            has_avatar: false,
            id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
            initials: 'U1',
            color: 'red'
          },
          content: {
            text: 'This is long feed text. Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Neque deserunt veniam, labore mollitia maiores nostrum aliquid atque est',
            img: []
          }
        }
      ],
      comments: [
        {
          id: 'comm1-1',
          feedRef: 'feed1',
          userId: 'usr1',
          username: 'user-1',
          content: { text: '1. This is comment comm1-1' },
          replyTo: ''
        },
        {
          id: 'comm1-2',
          feedRef: 'feed2',
          userId: 'usr2',
          username: 'user-2',
          content: { text: '2. This is comment comm1-2' },
          replyTo: 'id: comm1-2'
        }
      ],
      currentSort: 'priority'
    }
  },

  computed: {
    ...mapGetters([
      'displayedTodos',
      'isTodosLoading',
      'isTodosLoadingError',
      'nbSelectedTasks',
      'selectedTasks',
      'todoSelectionGrid',
      'displayedPeople',
      'user'
    ]),

    todoList () {
      return this.$refs['todo-list']
    },

    sortedTasks () {
      const isName = this.currentSort === 'entity_name'
      const isPriority = this.currentSort === 'priority'
      const isDueDate = this.currentSort === 'due_date'
      const tasks = [...this.displayedTodos]
      if (isName) {
        return tasks.sort(
          firstBy('project_name')
            .thenBy('task_type_name')
            .thenBy('full_entity_name')
        )
      } else if (isPriority) {
        return tasks.sort(
          firstBy('priority', -1)
            .thenBy(
              (a, b) => {
                if (!a.due_date) return 1
                else if (!b.due_date) return -1
                else return a.due_date.localeCompare(b.due_date)
              }
            )
            .thenBy('project_name')
            .thenBy('task_type_name')
            .thenBy('entity_name')
        )
      } else if (isDueDate) {
        return tasks.sort(
          firstBy(
            (a, b) => {
              if (!a.due_date) return 1
              else if (!b.due_date) return -1
              else return a.due_date.localeCompare(b.due_date)
            }
          )
            .thenBy('project_name')
            .thenBy('task_type_name')
            .thenBy('entity_name')
        )
      } else {
        return tasks.sort(
          firstBy(this.currentSort, -1)
            .thenBy('project_name')
            .thenBy('task_type_name')
            .thenBy('entity_name')
        )
      }
    }
  },

  methods: {
    ...mapActions([
      'setTodoListScrollPosition'
    ]),

    createNewFeed (feed) {
      // console.log(feed.img)
      this.feeds.unshift({
        id: this.feeds.length + 1,
        created: new Date(),
        user: this.user,
        content: {
          text: feed.text,
          img: feed.img
        }
      })
    },

    createNewComment (comment) {
      this.comments.unshift({
        id: this.comments.length + 1,
        feedRef: 'feed2',
        userId: 'usr1',
        username: 'user-1',
        content: { text: comment.text },
        replyTo: ''
      })
    }
  },

  metaInfo () {
    return {
      title: `${this.$t('feeds.title')} - Kitsu`
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    $todo-list-max-w: 400px;
    $px: 150px;
    padding-left: $px;
    padding-right: $px;
    .feed {
      width: 100%;
      max-width: calc(100vw - (#{$px} * 2) - #{$todo-list-max-w});
    }
    .todo-list {
      position: fixed;
      top: 42px;
      right: 150px;
      width: 100%;
      max-width: $todo-list-max-w;
    }
  }
  .feed-comment-container {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    #c-mask {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  }
  @media(max-width: 767px) {
    .page {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
