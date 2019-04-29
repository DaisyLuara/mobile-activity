<template>
  <div 
    class="citem" 
    @click="handleCouponClick"
  >
    <div class="cimg">
      <img :src="computedImgUrl">
    </div>
    <div class="ctext">
      <span class="inner">{{ remindtext }}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    couponData: {
      type: Object,
      default: {
        id: null,
        code: "",
        image_url: "",
        couponBatch: {
          image_url: ""
        }
      },
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
      if (this.couponType === "wallet") {
        return "立即使用";
      }
      return "";
    },
    computedImgUrl() {
      if (this.couponType === "default") {
        return this.couponData.image_url;
      }
      if (this.couponType === "wallet") {
        return this.couponData.couponBatch.image_url;
      }
      return "";
    }
  },
  methods: {
    handleCouponClick() {
      if (this.couponType === "default") {
        this.$router.push({
          path: "/hpocket/cpd?type=default&id=" + this.couponData.id
        });
      } else if (this.couponType === "wallet") {
        this.$router.push({
          path:
            "/hpocket/cpd?type=wallet&code=" +
            this.couponData.code +
            "&id=" +
            this.couponData.couponBatch.id
        });
      }
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
    position: relative;
    img {
      width: 100%;
      height: 100%;
      z-index: 30;
      position: relative;
    }
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
