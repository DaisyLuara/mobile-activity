<template>
  <div class="tbb">
    <div class="function">
      <img :src="deleteUrl" class="fitem delete">
      <img :src="saveUrl" class="fitem save">
      <img :src="shareUrl" class="fitem share">
    </div>
    <div class="button">
      <div class="title">{{buttonTitle}}</div>
      <div class="time">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteUrl: "https://cdn.exe666.com/fe/image/m/m-menu-delete.svg",
      saveUrl: "https://cdn.exe666.com/fe/image/m/m-menu-download.svg",
      shareUrl: "https://cdn.exe666.com/fe/image/m/m-menu-share.svg",
      buttonTitle: "报名参与赢大奖",
      subTitle: "活动倒计时:12:14:33"
    };
  }
};
</script>

<style lang="less" scoped>
.tbb {
  position: relative;
  width: 100%;
  height: 0.94rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .function {
    flex: 1;
    flex-grow: 20;
    height: 100%;
    .fitem {
      &.delete {
        width: 0.34rem;
        height: 0.38rem;
      }
      &.save {
        width: 0.34rem;
        height: 0.38rem;
      }
      &.share {
        width: 0.33rem;
        height: 0.39rem;
      }
    }
  }
  .button {
    width: 2.82rem;
    height: 100%;
    background: rgba(109, 30, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title {
      font-size: 0.32rem;
      font-weight: 400;
      color: white;
    }
    .time {
      font-size: 0.2rem;
      font-weight: 400;
      color: white;
    }
  }
}
</style>
