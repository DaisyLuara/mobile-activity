<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'dec_1.png'"
      class="cover"
    >
    <div class="form">
      <div class="star-name">
        <img
          :src="base + 'name.png'"
          class="bg"
        >
        <span>{{star}}</span>
      </div>
      <div class="input">
        <img
          :src="base + 'input.png'"
          class="bg"
        >
        <input
          class="name"
          v-model="name"
          type="text"
          max-length="5"
        >
        <a
          class="abtn"
          @click="toGetImage"
        >
          <img :src="base + 'button.png'">
        </a>
      </div>
    </div>
    <div class="picture">
      <img
        :src="base + 'frame.png'"
        class="bg"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        src=""
        class="img"
      >
    </div>
    <img
      :src="base + 'rights.png'"
      class="tip"
    >
  </div>
</template>
<script>import { $wechat, isInWechat, wechatShareTrack, Cookies } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/aiqiyi/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      id: this.$route.query.id,
      arr: [],
      note: null,
      name: null,
      star: null,
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: CDN_URL + '/fe/image/aiqiyi/icon.png'
      }
    }
  },
  mounted() {
    if (localStorage.getItem(this.id)) {
      this.note = localStorage.getItem(this.id)
    } else {
      // this.note = this.arr[]
      // localStorage.setItem(this.id, this.note)
    }
  },
  methods: {
    toGetImage() { }
  }
}
</script>
<style lang="less" scoped>
@img: "http://cdn.exe666.com/fe/image/aiqiyi/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  font-family: "微软雅黑";
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.bg {
  position: relative;
  z-index: 0;
}
.warp {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  background-image: url("@{img}dec_2.png"), url("@{img}dec_3.png"),
    url("@{img}bg.png");
  background-position: left 96%, left 95%, center top;
  background-size: 7% auto, 37.5% auto, 100% auto;
  background-repeat: no-repeat, no-repeat, no-repeat;
  padding-top: 45%;
  .cover {
    width: 22%;
    position: absolute;
    top: 40%;
    right: 0%;
    z-index: 999;
  }
  .form {
    width: 100%;
    position: relative;
    z-index: 0;
    .star-name {
      width: 83%;
      position: relative;
      span {
        position: absolute;
        width: 20%;
        height: 100%;
        z-index: 99;
        color: #040f25;
        font-size: 3vw;
      }
    }
    .input {
      position: relative;
      width: 63%;
      margin-top: 3%;
      .name {
        position: absolute;
        top: 0%;
        left: 0%;
        background: transparent;
        border: none;
        width: 100%;
        height: 100%;
        z-index: 9;
      }
      .abtn {
        width: 19vw;
        position: absolute;
        top: 0%;
        right: 0%;
        transform: translate(50%, -13%);
        z-index: 999;
      }
    }
  }
  .picture {
    width: 63%;
    position: relative;
    z-index: 0;
    margin-top: 3.5%;
    .bg {
      z-index: 99;
    }
    .photo {
      width: 61.5vw;
      position: absolute;
      top: 0.5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .tip {
    width: 56%;
    position: relative;
    margin-top: 10%;
    margin-bottom: 3%;
  }
}
</style>


