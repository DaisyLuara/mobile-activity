<template>
  <div class="new-post">
    <div class="main">
      <div class="main-img"/>
      <div class="main-text">
        <span>说点什么吧</span>
      </div>
    </div>
    <div class="AB"/>
    <div class="AB"/>
    <div class="add">
      <div class="checkbox"/>
      <div class="text">上传A和B结果的图片</div>
    </div>
    <div class="ABimage">
      <div class="image-inner"/>
      <div class="image-inner"/>
    </div>
    <div 
      class="publish" 
      @click="handlePublish">发布</div>
  </div>
</template>

<script>
import { reCalculateRem } from '../mixins/reCalculateRem'
export default {
  mixins: [reCalculateRem],
  mounted() {
    document.documentElement.scrollTop = 0
  },
  methods: {
    handlePublish() {}
  }
}
</script>

<style lang="less" scoped>
.new-post {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  overflow: scroll;
  // height: 100vh;
  background: white;
  z-index: 10000;
  .main {
    height: 400px;
    margin: 15px 10px 10px 10px;
    background: rgba(244, 244, 244, 1);
    border-radius: 15px;
    @diff : 20px;
    width: calc(~'100% - @{diff}');
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .main-img {
      margin: 10px 0;
      background: white;
      display: flex;
      align-items: center;
      flex-direction: center;
      height: 300px;
      @diff : 20px;
      width: calc(~'100% - @{diff}');
    }
    .main-text {
      height: 65px;
      @diff : 20px;
      width: calc(~'100% - @{diff}');
      margin: 10px;
      border: 0.5px dashed rgba(153, 153, 153, 1);
      text-align: center;
      color: rgba(153, 153, 153, 1);
      font-size: 0.14rem;
      font-weight: 300;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .AB {
    margin: 5px 10px;
    height: 60px;
    @diff : 20px;
    width: calc(~'100% - @{diff}');
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    background: rgba(244, 244, 244, 1);
  }
  .add {
    margin: 5px 10px;
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 0.14rem;
      color: rgba(153, 153, 153, 1);
      font-weight: 300;
    }
  }
  .ABimage {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px;
    width: 100%;
    .image-inner {
      border: 0.5px dashed rgba(153, 153, 153, 1);
      height: 1.6rem;
      width: 1.6rem;
    }
  }
  .publish {
    width: 100%;
    height: 48px;
    background: #1b1a20;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 5px;
    line-height: 48px;
    font-size: 0.18rem;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    font-weight: 300;
  }
}
</style>
