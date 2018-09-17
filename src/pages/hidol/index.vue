<template>
  <div class="hidol-root">
    <!-- top bar location -->
    <div></div>

    <!-- info list -->
    <div class="info-wrapper">
      <mt-loadmore 
        autoFill
        :top-method="loadTop" 
        @top-status-change="handleTopChange"
      >
        <ul>
          <li v-for="(item, index) in list" :key="index">
            {{ item }}
          </li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
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
export default {
  data() {
    return {
      control: {
        newpost: false
      },
      topStatus: '',
      list: Array(100).fill(0)
    }
  },
  components: {
    'mt-loadmore': Loadmore,
    NewPost: () => import('./components/NewPost.vue')
  },
  methods: {
    handleNewPostControl() {
      this.control.newpost = !this.control.newpost
    },
    handleTopChange(status) {
      this.topStatus = status
    },
    loadTop() {}
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
