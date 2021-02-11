<template>
  <aside class="sidebar-comment">
    <div class="chat-wrapper">
      <div class="chat">

        <!-- Please add .other or .me after .by -->
        <div
          v-for="(comment, index) in comment" :key="index"
          class="by me">
          <div>
            <div class="photo-container">
              <div class="avatar" :style="{ backgroundImage: 'url(' + require('@/assets/kitsu.png') + ')' }"></div>
            </div>
            <button class="button reply"><corner-up-left-icon/></button>
          </div>
          <div>
            <!-- Start loop chat bubble -->
            <div
              class="text-wrapper">
              <div v-if="comment.replyTo" class="bubble reply-to">
                <a href="#">
                  <p class="msg m-0">{{ comment.replyTo }}</p>
                </a>
              </div>
              <div
                id="1"
                class="bubble">
                <h5 class="username mb-1">@{{ comment.username }}</h5>
                <p class="msg m-0">{{ comment.content.text }}</p>
                <div class="time">post time</div>
              </div>
            </div>
            <!-- End loop chat bubble -->
          </div>
        </div>

      </div>
      <div class="create">
        <div class="create-area">
          <textarea rows="3" class="input type-area"></textarea>
          <button class="button send">
            <send-icon/>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import {
  CornerUpLeftIcon,
  SendIcon
} from 'vue-feather-icons'

export default {
  name: 'FeedComment',

  components: {
    CornerUpLeftIcon,
    SendIcon
  },

  props: {
    comment: {
      type: Array,
      required: true
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
    max-width: 500px;
    padding: $size-2;
    padding-top: calc(60px + #{$size-2});
    background-color: var(--background);
    border-left: 3px solid var(--border);
  }
</style>
