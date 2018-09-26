<template>
  <div class="my-wrapper">
    <div class="author-wrap">
      <div class="avatar">
        <img 
          src="https://dn-coding-net-production-static.qbox.me/655a4d54-31fa-45e2-bd4b-98be23865664.jpg?imageMogr2/auto-orient/format/jpeg/crop/!400x400a0a0" 
          alt="my">
      </div>
      <div class="author-info">
        <div class="author-name">
          今晚打老虎
          <img
            src="http://cdn.exe666.com/fe/hidol/img/male.png" 
            alt="gender">
        </div>
        <div class="author-address">
          鄂尔多斯国际大厦
        </div>
      </div>
    </div>
    <div class="my-status-list">
      <div
        :class="{'fixed-tap':fixedTap}" 
        class="my-status-tap ">
        <div 
          :class="{'active': tabIndex === 0 ? true : false}"
          class="tap-item" 
          @click="tabHandle('first')">我的动态</div>
        <div 
          :class="{'active': tabIndex === 1 ? true : false}"
          class="tap-item" 
          @click="tabHandle('second')">我的喜欢</div>
      </div>
      <div class="my-status-info">
        <mt-loadmore 
          ref="loadmore"
          :top-method="loadTop" 
          :bottom-method="loadBottom" 
          :auto-fill="false"
          @top-status-change="handleTopChange"
          @bottom-status-change="handleBottomChange">
        <div
          :key="index" 
          class="info-card"
          v-for="(item, index) in list">
          <Article v-if="tabStatus"/>
          <ArticleChoose v-if="!tabStatus"/>
        </div>
        <div 
          slot="top" 
          class="mint-loadmore-top">
          <span 
            v-show="topStatus !== 'loading'" 
            :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span 
            v-show="bottomStatus !== 'loading'" 
            :class="{ 'rotate': topStatus === 'drop' }">释放加载更多</span>
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
      <div class="loadmore-add"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import { setTimeout } from 'timers'
import Article from './Article'
import ArticleChoose from './ArticleChoose'

export default {
  components: {
    'mt-loadmore': Loadmore,
    Article,
    ArticleChoose
  },
  data() {
    return {
      tabStatus: true,
      fixedTap: false,
      tabIndex: 0,
      topStatus: '',
      bottomStatus: '',
      list: Array(10).fill(0)
    }
  },
  mounted() {
    this.handleScrollFixed()
  },
  methods: {
    handleScrollFixed() {
      let that = this
      window.addEventListener(
        'scroll',
        function() {
          let scrollHeight = window.pageYOffset || window.scrollY
          if (scrollHeight >= 132) {
            that.fixedTap = true
          } else {
            that.fixedTap = false
          }
        },
        false
      )
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadTop() {
      this.topStatus = 'loading'
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
        this.topStatus = ''
      }, 2000)
    },
    loadBottom() {
      this.bottom = 'loading'
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded()
        this.bottomStatus = ''
      }, 2000)
    },
    tabHandle(index) {
      switch (index) {
        case 'first':
          this.tabIndex = 0
          this.tabStatus = true
          break
        case 'second':
          this.tabStatus = false
          this.tabIndex = 1
          break
        default:
          this.tabStatus = true
          this.tabIndex = 0
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-wrapper {
  width: 100%;
  z-index: 1000;
  background: #ececec;

  .author-wrap {
    padding-top: 12px;
    width: 100%;
    height: 1.32rem;
    background: #ececec;
    .avatar {
      line-height: 0;
      width: 16%;
      margin-left: 42.13%;
      margin-right: 41.87%;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .author-info {
      margin-top: 10px;
      .author-name {
        height: 0.25rem;
        line-height: 0.25rem;
        font-size: 0.18rem;
        color: #333;
        font-weight: 600;
        text-align: center;
        img {
          width: 5.335%;
        }
      }
      .author-address {
        color: #666;
        font-size: 0.1rem;
        text-align: center;
      }
    }
  }
  .my-status-list {
    background: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .my-status-tap {
      font-size: 0.12rem;
      padding: 5px 29.87% 0;
      background: #fff;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      z-index: 2000;
      &.fixed-tap {
        position: fixed;
        top: 0;
      }
      .tap-item {
        display: inline-block;
        padding: 5px 0;
        height: 27px;
        color: #999;
        &.active {
          color: #333;
          border-bottom: 1px solid #333;
        }
      }
    }

    .my-status-info {
      width: 100%;
      .mint-loadmore-top {
        font-size: 0.14rem;
      }
      .mint-loadmore-bottom {
        font-size: 0.14rem;
      }
      .info-card {
        padding: 20px;
      }
      .loadmore-add {
        height: 48px;
        width: 100%;
        background-color: transparent;
      }
    }
  }
}
.bounceup-enter-active,
.bounceup-leave-active {
  transition: all 0.3s ease;
}
.bounceup-enter, .bounceup-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100vh);
}
</style>
