<template>
  <div class="xof">
    <div class="qr"></div>
    <div class="remind">
      <div class="xo">
        <img :src="xoImgUrl">
      </div>
      <div class="remind-text">
        <div class="title">长按识别二维码</div>
        <div class="sub-title">了解更多精彩福利</div>
        <img class="bg-img" :src="xoReminder">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xoImgUrl: "https://cdn.exe666.com/fe/image/m/xo-remind.svg",
      xoReminder: "https://cdn.exe666.com/fe/image/m/xo-remind-text.svg"
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
  .qr {
    width: 2.31rem;
    height: 2.31rem;
    border-radius: 50%;
  }
  .remind {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 3.34rem;
    justify-content: center;
    .xo {
      height: 3.34rem;
      width: 3.34rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .remind-text {
      width: 2.88rem;
      height: 1.1rem;
      margin-left: -0.77rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      .title {
        font-size: 0.28rem;
        color: rgba(9, 9, 9, 1);
        font-weight: 500;
      }
      .sub-title {
        font-size: 0.22rem;
        color: rgba(168, 168, 168, 1);
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
