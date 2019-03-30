<template>
  <div
    :style="style.root"
    class="gift-root"
  >
    <div class="gift">
      <img
        :src="baseUrl+'frame.png?v=1'"
        class="frame"
      >
      <img
        :src="baseUrl+'photo_frame.png?v=1'"
        class="photo-frame"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <div class="coupon">
      <img
        :src="baseUrl+'coupon_frame.png?v=1'"
        class="coupon-frame"
      >
      <div class="coupon-info">
        <img :src="baseUrl+'coupon.png?v=1'">
      </div>
    </div>

  </div>
</template>

<script>
import { getInfoById } from 'services'
const CDN_URL = process.env.CDN_URL
export default {
  data() {
    return {
      photo: null,
      style: {
        root: {
          minHeight: this.$innerHeight() + 'px'
        }
      },
      baseUrl: CDN_URL + '/fe/img/es/'
    }
  },
  mounted() {
    this.getPhoto()
  },
  methods: {
    getPhoto() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@base: "http://cdn.xingstation.cn/fe/image/tmall/play_gift/";
.gift-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url("@{base}bg.png?v=1");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .gift {
    margin-top: 15%;
    z-index: 20;
    width: 85%;
    position: relative;
    margin-bottom: 2%;
    .success {
      width: 20%;
      margin: 0 40% 2%;
      user-select: none;
      pointer-events: none;
    }
    .frame {
      width: 100%;
      user-select: none;
      pointer-events: none;
    }
    .photo-frame {
      position: absolute;
      top: 6%;
      width: 53%;
      left: 23.5%;
      z-index: 20;
      right: 23.5%;
      user-select: none;
      pointer-events: none;
    }
    .photo {
      position: absolute;
      top: 9.5%;
      width: 45%;
      left: 27.7%;
      z-index: 30;
      right: 27.7%;
    }
  }
  .coupon {
    width: 85%;
    position: relative;
    .coupon-frame {
      z-index: 20;
      width: 100%;
      user-select: none;
      pointer-events: none;
    }
    .coupon-info {
      z-index: 30;
      width: 90%;
      position: absolute;
      top: 12%;
      left: 5%;
      right: 5%;
      img {
        width: 100%;
        user-select: none;
        pointer-events: auto;
      }
    }
  }
}
</style>
