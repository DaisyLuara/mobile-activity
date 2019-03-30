<template>
  <div class="author">
    <div class="info">
      <img 
        class="avatar" 
        src="https://dn-coding-net-production-static.qbox.me/655a4d54-31fa-45e2-bd4b-98be23865664.jpg?imageMogr2/auto-orient/format/jpeg/crop/!400x400a0a0">
      <div class="info-detail">
        <div class="detail-name">今晚打老虎</div>
        <div class="detail-time">30分钟前</div>
      </div>
    </div>
    <div class="more">
      <img 
        class="more-inner"
        src="http://cdn.xingstation.com/fe/hidol/img/more.svg" 
        @click="handlePannelShow">
      <ArticleMore 
        v-if="shouldPannelShow"
        class="more-pannel" 
      />
    </div>
  </div>
</template>

<script>
import ArticleMore from './ArticleMore'
export default {
  components: {
    ArticleMore
  },
  data() {
    return {
      shouldPannelShow: false
    }
  },
  methods: {
    handlePannelShow() {
      this.shouldPannelShow = !this.shouldPannelShow
    }
  }
}
</script>

<style lang="less" scoped>
.author {
  height: 0.35rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.15rem;
  .info {
    height: 100%;
    position: relative;
    .avatar {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      position: absolute;
      top: -0.15rem;
      left: 0;
    }
    .info-detail {
      height: 100%;
      display: flex;
      flex-direction: column;
      margin-left: 0.55rem;
      .detail-name {
        flex: 1;
        font-size: 0.14rem;
        color: rgba(102, 102, 102, 1);
      }
      .detail-time {
        flex: 1;
        color: rgba(153, 153, 153, 1);
        font-size: 0.1rem;
      }
    }
  }
  .more {
    width: 0.23rem;
    position: relative;
    .more-inner {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      margin: auto;
      right: 0;
      bottom: 0;
    }
    .more-pannel {
      position: absolute;
      left: -1.1rem;
      top: 0;
    }
  }
}
</style>
