<template>
  <div class="new-post">
    <div class="main">
      <div class="main-img">
        <img
          class="img-icon" 
          src="http://cdn.exe666.com/fe/hidol/img/picture@3x.png" 
          alt="uploadImageHere" >
        <div
          class="img-text"
        >上传图片</div>
      </div>
      <div class="main-text">
        <textarea 
          class="text-area" 
          rows="2" />
        <span class="text-placeholder">说点什么吧</span>
      </div>
    </div>
    <div class="AB">
      <div class="AB-placeholder">
        <div class="choose">A</div>
        <div class="remind">请输入A选项内容</div>
      </div>

    </div>
    <div class="AB">
      <div class="AB-placeholder">
        <div class="choose">A</div>
        <div class="remind">请输入A选项内容</div>
      </div>
    </div>
    <div class="add">
      <img
        v-show="isAddPhoto"
        class="add-img" 
        src="http://cdn.exe666.com/fe/hidol/img/ok@3x.png" 
      >
      <input 
        id="isaddphoto"
        v-model="isAddPhoto" 
        class="box" 
        type="checkbox"
      >
      <label 
        for="isaddphoto"
        class="text"
      >
        上传A和B结果的图片
      </label>
    </div>
    <div class="ABimage">
      <div class="image-inner">
        <img src="http://cdn.exe666.com/fe/hidol/img/A+.svg" >
      </div>
      <div class="image-inner">
        <img src="http://cdn.exe666.com/fe/hidol/img/B+.svg" >
      </div>
    </div>
    <PublishButton @onHandlePublish="handlePublish" />
  </div>
</template>

<script>
import { reCalculateRem } from '../mixins/reCalculateRem'
import PublishButton from '../components/PublishButton'
export default {
  components: {
    PublishButton
  },
  mixins: [reCalculateRem],
  data() {
    return {
      isAddPhoto: false
    }
  },
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
    height: 4rem;
    margin: 0.15rem 0.1rem 0.1rem 0.1rem;
    background: rgba(244, 244, 244, 1);
    border-radius: 0.15rem;
    @diff : 0.2rem;
    width: calc(~'100% - @{diff}');
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .main-img {
      margin: 0.1rem 0;
      background: white;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      height: 3rem;
      @diff : 20px;
      width: calc(~'100% - @{diff}');
      .img-icon {
        width: 1rem;
        height: 1rem;
      }
      .img-text {
        font-size: 0.14rem;
        color: rgba(153, 153, 153, 1);
        font-weight: 300;
      }
    }
    .main-text {
      height: 0.65rem;
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
      position: relative;
      .text-area {
        background: transparent;
        width: 100%;
        height: 100%;
        border: none;
      }
      .text-placeholder {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 0.65rem;
      }
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
    .AB-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .choose {
        padding-left: 0.15rem;
        font-size: 0.43rem;
        color: rgba(221, 221, 221, 1);
      }
      .remind {
        padding-left: 0.1rem;
        font-size: 0.14rem;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .add {
    margin: 5px 10px;
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    .add-img {
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 15;
    }
    .box {
      width: 0.2rem;
      height: 0.2rem;
      border: 0.5px solid black;
      z-index: 20;
    }
    .text {
      margin-left: 0.1rem;
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
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
