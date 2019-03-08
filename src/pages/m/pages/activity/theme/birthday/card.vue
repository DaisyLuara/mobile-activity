<template>
  <div class="card-wrap">
    <!-- 贺卡部分 -->
    <transition name="fade">
      <div
        class="greeting-card"
        v-show="showCard"
      >
        <img
          :src="imageHost + 'greeting_card.png'"
          class="card-img"
          :class="{ hide: !showCard }"
          @click="hideCard"
        >
      </div>
    </transition>

    <!-- 蛋糕塔部分 -->
    <transition name="fade">
      <div
        class="greeting-cake"
        v-show="!showCard"
      >
        <!-- 蛋糕塔scroller -->
        <md-scroll-view
          ref="scrollView"
          :scrolling-x="false"
          @endReached="loadMore"
          class="cake-tower"
          :autoReflow="true"
        >
          <div class="scroll-top">
            <img
              :src="imageHost + 'chat_box.png'"
              class="chatbox"
            >
            <img
              :src="imageHost + 'avatar_big.png'"
              class="full-avatar"
            >
          </div>
          <!-- 蛋糕和祝福语 -->
          <div
            v-for="(item, index) in greetingList"
            :key="index"
            class="greeting-wrapper"
          >
            <div
              class="cake-wrapper"
              :style="{
                left: item.offset + '%',
                zIndex: item.zIndex
              }"
            >
            <!-- 蛋糕 -->
              <img
                :src="item.cakeImg"
                class="cake-img"
              >
              <!-- 祝福语 -->
              <div 
                :class="[
                  'comment-wrapper',
                  item.offset < 50 ? 'left' : 'right'
                ]"
              >
                <img 
                  :src="imageHost + 'comment_bg.png'"
                  class="comment-bg"
                >
                <div
                  class="comment-info"
                >
                  <div class="avatar-wrapper">
                    <img
                      :src="defaultAvatar"
                      class="comment-avatar"
                    >
                    <div class="avatar-name">{{ item.username }}</div>
                  </div>
                  <div class="comment">{{ item.comment }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="scroll-filler"
            v-if="isAllLoaded === true"
          />
        </md-scroll-view>
        <!-- 左上角寿星信息 -->
        <div class="recipient">
          <img
            :src="defaultAvatar"
            class="recipient-avatar"
          >
          <img
            :src="imageHost + 'avatar_frame.png'"
            class="avatar-frame"
          >
          <div class="recipient-name">寿星XXX</div>
          <img
            class="recipient-gender"
            :src="imageHost + 'gender_male.png'"
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ScrollView, ScrollViewMore, Popup } from "mand-mobile"
import { fetchGreetingsList } from "services"
import "./mand-reset.less"

export default {
  name: "ActivityBirthDayCard",
  components: {
    [ScrollView.name]: ScrollView,
    [Popup.name]: Popup
  },
  data () {
    return {
      imageHost: 'https://cdn.exe666.com/m/activity/shop/birthday/',
      defaultAvatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/kPmo3eFGlBOPalDZHOpAicFPfQaicU7icJnypiaUxUcFEOE2kdddNsFXPkmiaeBo6LCRau0ibZK72fUtDpo9dSZccXTA/132',
      greetingList: [],
      isAllLoaded: false,
      isFetching: false,
      currentPage: 1,
      pageSize: 5,
      showCard: true
    }
  },
  computed: {

  },
  mounted () {
    this.fetchList()
  },
  methods: {
    fetchList () {
      if (this.isAllLoaded || this.isFetching) {
        return
      }
      this.isFetching = true
      let payload = {
        api: "json",
        cp: this.currentPage,
        size: this.pageSize,
        z: this.z,
        allt: "birthday",
        mkey: this.$route.params.mkey
      }
      fetchGreetingsList(payload).then(r => {
        console.log(r)
        const resp = r.data
        if (resp.data.state !== '1') {
          this.isAllLoaded = true
        }
        if (resp.data.pageIndex >= resp.data.totalPage) {
          this.isAllLoaded = true
        }
        let list = this.computedZIndex(resp.data.list, resp.data.totalPage)
        this.greetingList = this.greetingList.concat(list)
        this.currentPage++
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.$refs.scrollView.finishLoadMore()
        this.isFetching = false
      })
    },
    // 计算蛋糕的z-index
    computedZIndex (list, totalPage) {
      // z-index从大到小排列
      const maxIndex = Number(totalPage) * this.pageSize
      const currentIndex = this.greetingList.length
      list.forEach((item, index) => {
        item.zIndex = maxIndex - (currentIndex + index)
      })
      return list
    },
    // 加载更多
    loadMore () {
      setTimeout(() => {
        this.fetchList()
      }, 1000)
    },
    preventMove (e) {
      e.preventDefault()
    },
    hideCard () {
      this.showCard = false
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'https://cdn.exe666.com/m/activity/shop/birthday/';

.card-wrap {
  height: 100vh;
  .greeting-card {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .card-img {
      display: block;
      width: 3.25rem;
      height: auto;
      transform: translateY(0);
      transition: transform .8s;
      &.hide {
        transform: translateY(-100vh);
      }
    }
  }
  .greeting-cake {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("@{imageHost}cake_bg.png");
    background-size: 100% auto;
    background-position: center center;
    background-repeat: no-repeat;
    .cake-tower {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      left: 0;
      .scroll-top {
        position: relative;
        height: 1.94rem;
        .chatbox {
          position: absolute;
          top: 1.05rem;
          right: 0.26rem;
          width: 2.03rem;
          height: 1.13rem;
        }
        .full-avatar {
          position: absolute;
          top: 1.36rem;
          left: 0.36rem;
          width: 1.01rem;
          height: 3.63rem;
        }
      }
      .greeting-wrapper {
        width: 100%;
        height: 0.85rem;
        position: relative;
        .cake-wrapper {
          position: absolute;
          width: 2.17rem;
          height: auto;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          .cake-img {
            display: block;
            width: 100%;
            height: auto;
          }
          .comment-wrapper {
            position: absolute;
            top: 1.6rem;
            width: 1.62rem;
            height: 0.4rem;
            .comment-bg {
              position: absolute;
              top: 0;
              width: 1.47rem;
              height: 0.4rem;
            }
            .comment-info {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              .avatar-wrapper {
                position: relative;
                width: 0.4rem;
                height: 0.4rem;
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  border: 0.015rem solid #FFF;
                }
                .avatar-name {
                  position: absolute;
                  top: 0.46rem;
                  left: 0;
                  right: 0;
                  text-align: center;
                  font-size: 0.1rem;
                  color: #FFF;
                }
              }
              .comment {
                width: 1rem;
                font-size: 0.1rem;
                color: #FFF;
              }
            }
            &.left {
              right: 45%;
              .comment-bg {
                right: 0;
                transform-origin: 50% 50%;
                transform: rotate(180deg);
              }
              .avatar-wrapper {
                margin-right: 0.02rem;
              }
            }
            &.right {
              left: 45%;
              .comment-bg {
                left: 0;
              }
              .comment-info {
                flex-direction: row-reverse;
              }
              .avatar-wrapper {
                margin-left: 0.02rem;
              }
            }
          }
        }
      }
      .scroll-filler {
        height: 1.41rem;
      }
    }
    .recipient {
      position: fixed;
      top: 0.14rem;
      left: 0.17rem;
      width: 1.7rem;
      height: 0.72rem;
      overflow: hidden;
      .recipient-avatar {
        display: block;
        width: 0.59rem;
        height: 0.59rem;
        margin: 0.06rem 0.02rem;
        border-radius: 50%;
      }
      .avatar-frame {
        position: absolute;
        width: 100%;
        height: auto;
        top: 0;
        left: 0;
      }
      .recipient-name {
        position: absolute;
        line-height: 0.325rem;
        left: 0.7rem;
        top: 0.22rem;
        font-size: 0.125rem;
        color: #FFF;
      }
      .recipient-gender {
        width: 0.17rem;
        height: 0.17rem;
        position: absolute;
        right: 0.09rem;
        top: 0.28rem;
      }
    }
  }
}
.md-scroll-view {
  background: transparent;
  .scroll-view-container {
    min-height: 110vh;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>