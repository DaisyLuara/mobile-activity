<template>
  <!-- keep alive ? -->
  <div class="hidol-root">
    <!-- top bar location -->
    <!-- <div/> -->

    <!-- info list -->
    <div class="info-wrapper">
      <mt-loadmore 
        ref="loadmore"
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :auto-fill="false"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
      >
          <div 
            class="info-card"
            v-for="(item, index) in list" 
            :key="index">
            <Article />
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
          <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">释放加载更多</span>
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
      <div class="loadmore-add"></div>
    </div>

    <transition name="bounceup">
      <NewPost v-if="control.newpost"/>
    </transition>

    <MenuBar @onNewPost="handleOpenNewPost" @onRefesh="handleRefresh"/>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import { setTimeout } from 'timers'
import Article from './components/Article'
import MenuBar from './components/MenuBar'
export default {
  components: {
    'mt-loadmore': Loadmore,
    Article,
    MenuBar,
    NewPost: () => import('./components/NewPost.vue')
  },
  data() {
    return {
      control: {
        newpost: false,
        index: false,
        my: false
      },
      topStatus: '',
      bottomStatus: '',
      list: Array(10).fill(0)
    }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      let html = document.getElementsByTagName('html')[0]
      html.setAttribute('style', 'font-size: 100px')
    },
    handleNewPostControl() {
      this.control.newpost = !this.control.newpost
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    handleRefresh() {
      // this.loadTop()
      this.topStatus = 'pull'
      console.log('refresh')
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
    handleOpenNewPost() {
      this.control.newpost = !this.control.newpost
      console.log('233')
    }
  }
}
</script>

<style lang="less" scoped>
.hidol-root {
  display: flex;
  flex-direction: column;
  .info-wrapper {
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
.bounceup-enter-active,
.bounceup-leave-active {
  transition: all 0.3s ease;
}
.bounceup-enter, .bounceup-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100vh);
}
</style>
