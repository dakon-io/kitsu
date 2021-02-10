<template>
<div class="data-list task-list">
  <div
    class="datatable-wrapper"
    ref="body"
    v-scroll="onBodyScroll"
  >
    <table class="datatable">
      <thead class="datatable-head">
        <tr>
          <th
            scope="col"
            class="production datatable-row-header datatable-row-header--nobd"
            ref="th-prod"
          >
            {{ $t('tasks.fields.production') }}
          </th>
          <th
            scope="col"
            class="type datatable-row-header datatable-row-header--nobd"
            ref="th-type"
            :style="{left: colTypePosX}"
          >
            {{ $t('tasks.fields.task_type') }}
          </th>
          <th scope="col" class="status">
            {{ $t('tasks.fields.task_status') }}
          </th>
          <th scope="col" class="due-date">
            {{ $t('tasks.fields.due_date') }}
          </th>
        </tr>
      </thead>
      <tbody class="datatable-body" v-if="tasks.length > 0">
        <tr
          v-for="(entry, i) in displayedTasks"
          :key="entry + '-' + i"
          :class="{
            'datatable-row': true,
            'datatable-row--selectable': true,
            selected:
              selectionGrid && selectionGrid[i] ? selectionGrid[i][0] : false
          }"
          @click="onLineClicked(i, $event)"
        >
          <td
            class="production datatable-row-header datatable-row-header--nobd"
            scope="row"
          >
            <production-name-cell
              :is-tooltip="true"
              :entry="productionMap[entry.project_id]"
              :only-avatar="true"
            />
          </td>
          <task-type-cell
            class="type datatable-row-header datatable-row-header--nobd"
            :production-id="entry.project_id"
            :task-type="getTaskType(entry)"
            :style="{left: colTypePosX}"/>
          <validation-cell
            class="status unselectable"
            :ref="'validation-' + i + '-0'"
            :task-test="entry"
            :is-border="false"
            :is-assignees="false"
            :selectable="!done"
            :clickable="false"
            :selected="selectionGrid && selectionGrid[i] ? selectionGrid[i][0] : false"
            :rowX="i"
            :columnY="0"
            @select="onTaskSelected"
            @unselect="onTaskUnselected"
            :column="entry.taskStatus"/>
          <td class="due-date">
            {{ formatDate(entry.due_date) }}
          </td>
       </tr>
      </tbody>
    </table>
  </div>

  <table-info
    :is-loading="isLoading"
    :is-error="isError"
  />

  <div
    class="has-text-centered empty-list"
    v-if="tasks.length === 0 && !isLoading"
  >
    <p>
      <img src="../../assets/illustrations/empty_todo.png" />
    </p>
    <p>
      {{ $t('people.no_task_assigned') }}
    </p>
  </div>

  <p
    class="has-text-centered footer-info"
    v-if="tasks.length && !isLoading"
  >
    {{ tasks.length }} {{ $tc('tasks.tasks', tasks.length) }}
  </p>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { selectionListMixin } from '@/components/mixins/selection'
import { formatListMixin } from '@/components/mixins/format'
import { PAGE_SIZE } from '@/lib/pagination'
import { formatSimpleDate } from '@/lib/time'

import ProductionNameCell from '@/components/cells/ProductionNameCell'
import TaskTypeCell from '@/components/cells/TaskTypeName'
import TableInfo from '@/components/widgets/TableInfo'
import ValidationCell from '@/components/cells/ValidationCell'

export default {
  name: 'todos-list',
  mixins: [formatListMixin, selectionListMixin],

  components: {
    ProductionNameCell,
    TableInfo,
    TaskTypeCell,
    ValidationCell
  },

  props: [
    'done',
    'tasks',
    'isLoading',
    'isError',
    'selectionGrid'
  ],

  data () {
    return {
      page: 1,
      colTypePosX: '',
      colNamePosX: ''
    }
  },

  mounted () {
    this.page = 1
    window.addEventListener('keydown', this.onKeyDown, false)
    this.colTypePosX = this.$refs['th-prod'].offsetWidth + 'px'
    this.colNamePosX =
      this.$refs['th-prod'].offsetWidth +
      this.$refs['th-type'].offsetWidth +
      'px'
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.onKeyDown)
  },

  computed: {
    ...mapGetters([
      'nbSelectedTasks',
      'taskTypeMap',
      'productionMap'
    ]),

    displayedTasks () {
      return this.tasks.slice(0, this.page * PAGE_SIZE)
    }
  },

  methods: {
    ...mapActions([
    ]),

    setScrollPosition (scrollPosition) {
      if (this.$refs.body) {
        this.$refs.body.scrollTop = scrollPosition
      }
    },

    formatDate (date) {
      return date ? formatSimpleDate(date) : ''
    },

    onBodyScroll (event, position) {
      this.$emit('scroll', position.scrollTop)
      const maxHeight =
        this.$refs.body.scrollHeight - this.$refs.body.offsetHeight
      if (maxHeight < (position.scrollTop + 100)) {
        this.page++
      }
    },

    onLineClicked (i, event) {
      const ref = 'validation-' + i + '-0'
      const validationCell = this.$refs[ref][0]
      validationCell.select(event)
    },

    onTaskSelected (validationInfo) {
      if (validationInfo.isShiftKey) {
        if (this.lastSelection) {
          let startX = this.lastSelection.x
          let endX = validationInfo.x
          if (validationInfo.x < this.lastSelection.x) {
            startX = validationInfo.x
            endX = this.lastSelection.x
          }

          for (let i = startX; i <= endX; i++) {
            const ref = 'validation-' + i + '-' + 0
            const validationCell = this.$refs[ref][0]
            if (!this.selectionGrid[i][0]) {
              validationCell.select({ ctrlKey: true, isUserClick: false })
            }
          }
        }
      } else if (!validationInfo.isCtrlKey) {
        this.$store.commit('CLEAR_SELECTED_TASKS')
      }
      this.$store.commit('ADD_SELECTED_TASK', validationInfo)

      if (!validationInfo.isShiftKey && validationInfo.isUserClick) {
        const x = validationInfo.x
        const y = 0
        this.lastSelection = { x, y }
        const ref = 'validation-' + x + '-' + y
        const validationCell = this.$refs[ref][0]
        this.$nextTick(() => {
          this.scrollToValidationCell(validationCell)
        })
      }
    },

    onTaskUnselected (validationInfo) {
      if (!validationInfo.isCtrlKey) {
        if (this.nbSelectedTasks === 1) {
          this.$store.commit('REMOVE_SELECTED_TASK', validationInfo)
        } else {
          this.$store.commit('CLEAR_SELECTED_TASKS')
          this.$store.commit('ADD_SELECTED_TASK', validationInfo)
        }
      } else {
        this.$store.commit('REMOVE_SELECTED_TASK', validationInfo)
      }
    },

    getTaskType (entry) {
      const taskType = this.taskTypeMap[entry.task_type_id]
      const production = this.productionMap[entry.project_id]
      taskType.episode_id = entry.episode_id
      if (production && production.production_type === 'tvshow' && !entry.episode_id) {
        taskType.episode_id = production.first_episode_id
      }
      return taskType
    },

    onKeyDown (event) {
      const lastSelection =
        this.lastSelection ? this.lastSelection : { x: 0, y: 0 }
      const i = lastSelection.x
      const j = lastSelection.y
      let validationCell = null
      if (event.ctrlKey || event.metaKey) {
        if (event.keyCode === 37) {
          validationCell = this.select(i, j - 1)
        } else if (event.keyCode === 38) {
          validationCell = this.select(i - 1, j)
        } else if (event.keyCode === 39) {
          validationCell = this.select(i, j + 1)
        } else if (event.keyCode === 40) {
          validationCell = this.select(i + 1, j)
        }
        this.scrollToValidationCell(validationCell)
      }
    },

    scrollToValidationCell (validationCell) {
      if (validationCell) {
        const margin = 20
        const rect = validationCell.$el.getBoundingClientRect()
        const listRect = this.$refs.body.getBoundingClientRect()
        const isBelow = rect.bottom > listRect.bottom - margin
        const isAbove = rect.top < listRect.top + margin
        const isRight = rect.right > listRect.right - margin
        const isLeft = rect.left < listRect.left + margin

        if (isBelow) {
          const scrollingRequired = rect.bottom - listRect.bottom + margin
          this.setScrollPosition(
            this.$refs.body.scrollTop + scrollingRequired
          )
        } else if (isAbove) {
          const scrollingRequired = listRect.top - rect.top + margin
          this.setScrollPosition(
            this.$refs.body.scrollTop - scrollingRequired
          )
        }

        if (isRight) {
          const scrollingRequired = rect.right - listRect.right + margin
          this.setScrollLeftPosition(
            this.$refs.body.scrollLeft + scrollingRequired
          )
        } else if (isLeft) {
          const scrollingRequired = listRect.left - rect.left + margin
          this.setScrollLeftPosition(
            this.$refs.body.scrollLeft - scrollingRequired
          )
        }
      }
    },

    select (i, j) {
      const ref = 'validation-' + i + '-' + j
      const validationCell = this.$refs[ref]
      if (validationCell) validationCell[0].$el.click()
      return validationCell ? validationCell[0] : 0
    }
  }
}
</script>

<style lang="scss" scoped>

.datatable-body tr:first-child th,
.datatable-body tr:first-child td {
  border-top: 0;
}

.datatable .datatable-row {
  cursor: pointer;
}

.production {
  width: 70px;
  min-width: 70px;
  max-width: 70px;
}

.type {
  width: 130px;
  min-width: 130px;
}

.status {
  width: 90px;
  min-width: 90px;
}

.due-date {
  width: 110px;
  min-width: 110px;
}

td.end-date {
  width: 100%;
  min-width: 150px;
  color: $grey;
}

.thumbnail {
  min-width: 60px;
  max-width: 60px;
  width: 60px;
  padding: 0;
}

.empty-list img {
  max-width: 80vh;
}

.task-list { max-height: calc(100vh - 72px); }
</style>
