<template>
  <div class="feeds page">

    <div class="is-flex">

      <div class="feed">
        <FeedCreate @create-feed="createNewFeed"/>
        <FeedList
          v-for="feed in feeds" :key="feed.id"
          :feed="feed"/>
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
import FeedList from '../lists/FeedList'
import FeedTodosList from '../lists/FeedTodosList'
import TaskInfo from '../sides/TaskInfo'

export default {
  name: 'feeds',

  components: {
    FeedCreate,
    FeedList,
    FeedTodosList,
    TaskInfo
  },

  data () {
    return {
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
      'todoSelectionGrid'
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
      console.log(feed.img)
      this.feeds.unshift({
        id: this.feeds.length + 1,
        created: 'time creation',
        user: {
          username: 'username',
          avatar: 'kitsu.png'
        },
        content: {
          text: feed.text,
          img: feed.img
        }
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
    $px: 150px;
    padding-left: $px;
    padding-right: $px;
  }
  .todo-list {
    position: fixed;
    top: 42px;
    right: 150px;
    width: 100%;
    max-width: 400px;
  }
  @media(max-width: 767px) {
    .page {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
