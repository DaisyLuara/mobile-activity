<template>
  <div class="citem">
    <div class="cimg">
      <img :src="imgUrl">
    </div>
    <div class="ctext">
      <span class="inner">{{remindtext}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: "",
      required: true
    },
    couponType: {
      type: String,
      default: "default",
      required: true
    }
  },
  computed: {
    remindtext() {
      if (this.couponType === "default") {
        return "立即免费获取";
      }
      return "";
    }
  }
};
</script>

<style lang="less" scoped>
.citem {
  position: relative;
  height: 2.14rem;
  width: 3.65rem;
  z-index: 10;
  .cimg {
    height: 1.74rem;
    width: 3.65rem;
    z-index: 20;
  }
  .ctext {
    z-index: 15;
    position: relative;
    height: 0.8rem;
    margin-top: -0.4rem;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-bottom-left-radius: 0.165rem;
    border-bottom-right-radius: 0.165rem;
    .inner {
      position: absolute;
      left: 0.225rem;
      bottom: 0.125rem;
      font-weight: bold;
      line-height: 0.21rem;
      color: rgba(239, 151, 0, 1);
      font-size: 0.16rem;
    }
  }
}
</style>
