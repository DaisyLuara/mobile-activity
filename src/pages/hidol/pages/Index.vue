<template>
  <!-- keep alive ? -->
  <div class="hidol-root">
    <!-- info list -->
    <div 
      class="info-wrapper">
      <mt-loadmore 
        ref="loadmore"
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :auto-fill="false"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
      >
        <div 
          v-for="(item, index) in list"
          :key="index" 
          class="info-card">
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
        <div 
          slot="bottom" 
          class="mint-loadmore-bottom">
          <span 
            v-show="bottomStatus !== 'loading'" 
            :class="{ 'rotate': topStatus === 'drop' }">释放加载更多</span>
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
      <div class="loadmore-add"/>
    </div>

    <MenuBar />
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import Article from '../components/Article'
import MenuBar from '../components/MenuBar'
import { reCalculateRem } from '../mixins/reCalculateRem'
export default {
  name: 'Index',
  components: {
    'mt-loadmore': Loadmore,
    Article,
    MenuBar
  },
  mixins: [reCalculateRem],
  data() {
    return {
      topStatus: '',
      bottomStatus: '',
      list: Array(10).fill(0),
      savedHeight: 0
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
  },
  deactivated() {
    this.savedHeight = document.documentElement.scrollTop
  },
  activated() {
    document.documentElement.scrollTop = this.savedHeight
  },
  methods: {
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
      this.bottomStatus = 'loading'
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded()
        this.bottomStatus = ''
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.hidol-root {
  display: flex;
  flex-direction: column;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  .info-wrapper {
    width: 100%;
    .mint-loadmore-top {
      font-size: 0.14rem;
    }
    .mint-loadmore-bottom {
      font-size: 0.14rem;
    }
    .info-card {
      padding: 0.2rem;
    }
    .loadmore-add {
      height: 0.48rem;
      width: 100%;
      background-color: transparent;
    }
  }
}
</style>
