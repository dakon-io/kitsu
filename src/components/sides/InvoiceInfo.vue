<template>
  <aside class="sidebar-comment">
    <div>
      <Invoice
        :admin="isCurrentUserAdmin"
        :invoice="invoice"/>
      <div class="invoice-item mt1">
        <div
          class="invoice-tabs tabs"
          style="margin-top: 0;">
          <ul>
            <li
              @click="isTabActive = 'info'"
              :class="{'is-active': isTabActive == 'info'}">
              <!-- {{ $t('invoices.status.pending') }} -->
              <router-link :to="'#'">Info</router-link>
            </li>
            <li
              @click="isTabActive = 'chat'"
              :class="{'is-active': isTabActive == 'chat'}">
              <router-link :to="'#'">Chat</router-link>
            </li>
          </ul>
        </div>
        <div v-show="isTabActive == 'info'">
          <div class="card card-content">
            <table class="table tbl">
              <tr>
                <td>Status</td>
                <td><invoice-tag :status="invoice.status"/></td>
              </tr>
              <tr>
                <td>ID</td>
                <td class="strong">#{{ invoice.id }}</td>
              </tr>
              <tr v-if="isCurrentUserAdmin">
                <td>Creator</td>
                <td>
                  <div class="flexrow">
                    <people-avatar
                      class="flexrow-item"
                      :size="25"
                      :font-size="12"
                      :person="people"/>
                    <div>
                      <people-name :person="people"/>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Submission date</td>
                <td>date</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>Rp {{ invoice.price | currencyFormat }}</td>
              </tr>
              <tr
                @click="toggleTasks=!toggleTasks"
                style="cursor: pointer;">
                <td style="border-bottom: 0">Tasks</td>
                <td style="border-bottom: 0">17</td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top: 0; padding-bottom: 0;">
                  <div v-show="toggleTasks">
                    <ul>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                      <li>tsahf</li>
                    </ul>
                  </div>
                </td>
              </tr>
            </table>
            <div v-if="isCurrentUserAdmin" class="mt05">
              <input
                type="text"
                :placeholder="$t('comments.add_comment')"
                v-model="invoiceComment"
                ref="inputInvoiceComment"
                class="flexrow-item input"
                style="height: fit-content; padding: 0.25rem .5rem; margin-right: .5rem;"/>
              <div class="flexrow mt05">
                <button
                  @click="rejectInvoice"
                  class="flexrow-item button is-danger"
                  style="width: 100%">
                  {{ $t('invoices.action.reject') }}
                </button>
                <button
                  @click="approveInvoice"
                  class="flexrow-item button is-success"
                  style="width: 100%">
                  {{ $t('invoices.action.approve') }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="isTabActive == 'chat'">
          <div class="card card-content">
            <AddInvoiceComment
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
            v-if="invoiceComments && invoiceComments.length > 0 && !loading.comment">
            <InvoiceComment
              v-for="(comment, index) in invoiceComments"
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
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

import Invoice from '@/components/widgets/Invoice'
import InvoiceTag from '@/components/widgets/InvoiceTag'
import PeopleAvatar from '@/components/widgets/PeopleAvatar'
import PeopleName from '@/components/widgets/PeopleName'
import AddInvoiceComment from '../widgets/AddInvoiceComment'
import InvoiceComment from '../widgets/InvoiceComment'

export default {
  name: 'InvoiceInfo',

  props: {
    invoice: {
      type: Object,
      default: null
    }
  },

  components: {
    Invoice,
    InvoiceTag,
    PeopleAvatar,
    PeopleName,
    AddInvoiceComment,
    InvoiceComment
  },

  data () {
    return {
      toggleTasks: false,
      invoiceComment: '',
      isTabActive: 'info',
      people: {
        first_name: 'user',
        last_name: '1',
        has_avatar: false,
        id: 'b2d2c606-0cbd-402a-b12e-2de13843e4bb',
        initials: 'U1',
        color: 'red'
      },
      inputComment: '',
      invoiceComments: [
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

  computed: {
    ...mapGetters([
      'isCurrentUserAdmin',
      'isCurrentUserVendor',
      'user',
      'displayedPeople'
    ]),

    pinnedCount () {
      if (!this.invoiceComments) return 0
      return this.invoiceComments.filter(c => c.pinned).length
    }
  },

  methods: {
    rejectInvoice () {
      if (this.invoiceComment) {
        alert('You reject this invoice')
      } else if (!this.invoiceComment) {
        this.$refs.inputInvoiceComment.focus()
      }
    },

    approveInvoice () {
      alert('You approve this invoice')
      this.invoiceComment = ''
    },

    addComment (comment) {
      this.invoiceComments.unshift({
        created_at: new Date(),
        data: null,
        id: '316151ec-337b-4082-864b-89e6ce05811' + this.invoiceComments.length + 1,
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
  },

  filters: {
    currencyFormat (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
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
