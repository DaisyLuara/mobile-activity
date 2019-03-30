<template>
  <div class="xof">
    <div class="qr" />
    <div class="remind">
      <div class="xo">
        <img :src="xoImgUrl">
      </div>
      <div class="remind-text">
        <div class="title">长按识别二维码</div>
        <div class="sub-title">了解更多精彩福利</div>
        <img
          :src="xoReminder"
          class="bg-img"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xoImgUrl: "https://cdn.xingstation.cn/fe/image/m/xo-remind.svg",
      xoReminder: "https://cdn.xingstation.cn/fe/image/m/xo-remind-text.svg"
    };
  }
};
</script>

<style lang="less" scoped>
.xof {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  .qr {
    width: 1.155rem;
    height: 1.155rem;
    border-radius: 50%;
    z-index: 30;
  }
  .remind {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 1.67rem;
    justify-content: center;
    z-index: 50;
    .xo {
      height: 1.67rem;
      width: 1.67rem;
      img {
        width: 100%;
        height: 100%;
      }
      z-index: 60;
    }
    .remind-text {
      z-index: 70;
      width: 1.44rem;
      height: 0.55rem;
      margin-left: -0.385rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      .title {
        font-size: 0.14rem;
        color: rgba(9, 9, 9, 1);
        font-weight: 500;
        z-index: 80;
      }
      .sub-title {
        font-size: 0.11rem;
        color: rgba(168, 168, 168, 1);
        z-index: 80;
      }
      .bg-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
