<template>
  <div
    ref="greetingsCake"
    class="greetings-cake"
  >
    <!-- 蛋糕塔scroller -->
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :auto-reflow="true"
      class="cake-tower"
      @endReached="handleEndReached"
      @scroll="handleScroll"
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
      <div class="scroll-content">
        <div
          v-for="(item, index) in list"
          ref="greetings"
          :key="index"
          :style="{
            zIndex: item.zIndex,
            animationDelay: item.animationDelay + 'ms'
          }"
          class="greetings-wrapper animated fadeInUp"
        >
          <div
            :style="{ left: item.offset + '%' }"
            class="cake-wrapper"
          >
            <!-- 蛋糕 -->
            <img 
              :src="item.link" 
              class="cake-img"
            >
            <!-- 祝福语 -->
            <div
              :class="[
                'comment-wrapper',
                { 'hide': index >= pageSize },
                { 'animated bounceIn': commentShowMap[index] && index >= pageSize },
                Number(item.offset) < 50 ? 'left' : 'right'
              ]"
            >
              <img 
                :src="imageHost + 'comment_bg.png'" 
                class="comment-bg"
              >
              <div class="comment-info">
                <div class="avatar-wrapper">
                  <img 
                    :src="item.face" 
                    class="comment-avatar"
                  >
                  <div class="avatar-name">
                    {{ item.nickname }}
                  </div>
                </div>
                <div class="comment-word">
                  {{ item.kid }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        v-show="isAllLoaded === true" 
        class="scroll-filler"
      >
        <img 
          :src="imageHost + 'cake_table.png'" 
          class="cake-plate"
        >
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
/* eslint-disable */

import { ScrollView, ScrollViewMore } from "mand-mobile";
import "../mand-reset.less";
import "animate.css";

export default {
  name: "CakeTower",
  components: {
    [ScrollView.name]: ScrollView
  },
  props: ["list", "isAllLoaded", "pageSize"],
  data() {
    return {
      imageHost: "https://cdn.xingstation.cn/m/activity/shop/birthday/",
      defaultAvatar:
        "http://thirdwx.qlogo.cn/mmopen/vi_32/kPmo3eFGlBOPalDZHOpAicFPfQaicU7icJnypiaUxUcFEOE2kdddNsFXPkmiaeBo6LCRau0ibZK72fUtDpo9dSZccXTA/132",
      commentShowLimit: 0,
      commentShowMap: []
    };
  },
  mounted() {
    this.computedCakeHeight();
    this.commentShowLimit = document.body.clientHeight;
  },
  methods: {
    computedCakeHeight() {
      const screenWidth = document.body.clientWidth;
      this.cakeHeight = 227 * (screenWidth / 375);
    },
    // scrollview回调事件，滚动时遍历每个蛋糕dom，判断是否显示在可视区域，若是则给标签加上动画
    handleScroll({ scrollTop }) {
      const greetingsDomList = this.$refs.greetings;
      if (greetingsDomList) {
        for (let i = this.pageSize; i < greetingsDomList.length; i++) {
          if (
            greetingsDomList[i].offsetTop + this.cakeHeight - scrollTop <
            this.commentShowLimit
          ) {
            this.commentShowMap.splice(i, 1, true);
          }
        }
      }
    },
    handleEndReached() {
      this.$emit("emitLoadMore");
    },
    finishLoadMore() {
      this.$refs.scrollView.finishLoadMore();
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "https://cdn.xingstation.cn/m/activity/shop/birthday/";
@import "../mixin.less";

img {
  -webkit-user-select: none;
  user-select: none;
}

.greetings-cake {
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
    .scroll-content {
      .greetings-wrapper {
        width: 100%;
        height: 0.85rem;
        position: relative;
        .cake-wrapper {
          position: absolute;
          width: 2.17rem;
          height: 2.27rem;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          .cake-img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .comment-wrapper {
            position: absolute;
            top: 1.6rem;
            width: 1.62rem;
            height: 0.4rem;
            &.hide {
              opacity: 0;
            }
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
                .comment-avatar {
                  display: block;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  border: 0.015rem solid #fff;
                }
                .avatar-name {
                  position: absolute;
                  top: 0.46rem;
                  left: 0;
                  right: 0;
                  font-size: 0.1rem;
                  text-align: center;
                  color: #fff;
                  .ellipsis();
                }
              }
              .comment-word {
                width: 1rem;
                font-size: 0.1rem;
                color: #fff;
              }
            }
            &.left {
              right: 44%;
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
              left: 44%;
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
    }
    .scroll-filler {
      height: 1.7rem;
      position: relative;
      .cake-plate {
        position: absolute;
        width: 3.08rem;
        height: auto;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
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
</style>