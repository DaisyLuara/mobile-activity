<template>
  <div class="hidol-root">
    <!-- top bar location -->
    <div/>

    <!-- info list -->
    <div class="info-wrapper">
      <mt-loadmore 
        ref="loadmore"
        :top-method="loadTop" 
        auto-fill
        @top-status-change="handleTopChange"
      >
        <ul>
          <li 
            v-for="(item, index) in list" 
            :key="index">
            {{ item }}
          </li>
        </ul>
        <div 
          slot="top" 
          class="mint-loadmore-top">
          <span 
            v-show="topStatus !== 'loading'" 
            :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>

    <p @click="handleNewPostControl">import lazy async components </p>
    <new-post v-if="control.newpost"/>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import { setTimeout } from 'timers'
export default {
  components: {
    'mt-loadmore': Loadmore,
    NewPost: () => import('./components/NewPost.vue')
  },
  data() {
    return {
      control: {
        newpost: false
      },
      topStatus: '',
      list: Array(100).fill(0)
    }
  },
  created() {
    let html = document.getElementsByTagName('html')[0]
    html.setAttribute('style', 'font-size: 14px')
  },
  methods: {
    handleNewPostControl() {
      this.control.newpost = !this.control.newpost
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    loadTop() {
      this.topStatus = 'loading'
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
        this.topStatus = ''
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.hidol-root {
  display: flex;
  flex-direction: column;
  .info-wrapper {
    height: 100vh;
    width: 100%;
  }
}
</style>
