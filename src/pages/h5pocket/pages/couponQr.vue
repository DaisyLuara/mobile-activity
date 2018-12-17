<template>
  <div class="cqr">
    <div class="qr-code"></div>
    <div class="bottom-stupid-remind">
      <div class="xo"></div>
      <div class="remind"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      imgUrl: ""
    };
  }
};
</script>

<style lang="less" scoped>
.cqr {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .qr-code {
    width: 2.58rem;
    height: 3.14rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 2.5px rgba(0, 0, 0, 0.16);
    border-radius: 21px;
    margin-top: 0.675rem;
  }
  .bottom-stupid-remind {
    height: 2.76rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .xo {
      width: 2.34rem;
      height: 100%;
      flex-shrink: 0;
    }
    .remind {
      width: 1.7rem;
      height: 0.49rem;
      margin-left: -0.775rem;
    }
  }
}
</style>
