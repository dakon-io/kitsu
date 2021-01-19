<template>
  <div class="feed-item mb-3">
    <div class="card fullwidth--md bor-0 bora-3 shd-main-1">
      <div class="card-content">
        <div class="feed-sender media">
          <div class="media-left">
            <div class="photo-container">
              <div
                class="avatar"
                :style="{ backgroundImage: 'url(' + require('@/assets/kitsu.png') + ')' }"></div>
              <!-- <div class="avatar">Avatar</div> -->
            </div>
          </div>
          <div class="text media-content">
            <p class="username title is-6">
              <b>@username</b>
            </p>
            <p class="subtitle is-6">
              <small>feed created date</small>
            </p>
          </div>
        </div>

        <div class="feed-content content">
          <div class="content-text">
            <h2>Short feed text</h2>
            <p>Long feed text > 100. Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Ipsa magni nesciunt dolores animi laboriosam voluptatem at impedit, odit sint, fuga delectus maxime, eius architecto est, obcaecati! Repellendus mollitia veritatis hic.</p>
          </div>
          <div class="content-media">
            <div
              class="img"
              :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleLandscape1.png') + ')' }">
              <img src="@/assets/images/imgExampleLandscape1.png">
            </div>
            <carousel :nav="false" :items="1">
              <div
                class="carousel-item"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleSquare1.jpeg') + ')' }">
                <img src="@/assets/images/imgExampleSquare1.jpeg">
              </div>
              <div
                class="carousel-item"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleSquare1.jpeg') + ')' }">
                <img src="@/assets/images/imgExampleSquare1.jpeg">
              </div>
              <div
                class="carousel-item"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/imgExampleSquare1.jpeg') + ')' }">
                <img src="@/assets/images/imgExampleSquare1.jpeg">
              </div>
            </carousel>
          </div>
        </div>

        <div class="feed-action py-2 bora-round bg-theme-white-dark">
          <div class="row">
            <div class="col">
              <div class="w-fit-content m-auto">
              </div>
            </div>
            <div class="col">
              <!-- <div class="w-fit-content m-auto cur-p" (click)="showSidebarRight()">
                {{ feed.total_comments }} comment
                <ng-container *ngIf="feed.total_comments.length > 1">s</ng-container>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel2'

export default {
  name: 'feed-list',

  components: { carousel }
}
</script>

<style lang="scss" scoped>
  .page {
    height: auto;
  }
  .feed-item {
    max-width: 500px;
    margin: 0 auto;
    .card-content {
      padding: 12px;
      &:not(:nth-last-child(1)) {
        border-bottom: 2px solid #c9d1d9;
      }
    }
    .feed-sender {
      .photo-container {
        $wh: 2.3rem;
        width: $wh;
        height: $wh;
      }
    }
    .feed-content {
      margin-top: -1;
      .photo-container {
        $wh: 3rem;
        width: $wh;
        height: $wh;
      }
      &.content { margin-bottom: 0; }
      .content-text * { margin-bottom: 0; }
      .content-media {
        margin :0 -12px;
        .carousel-item, .img {
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          img {
            width: 100%;
            visibility: hidden;
          }
        }
      }
    }
  }
</style>
