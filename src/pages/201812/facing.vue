<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="one">
      <img
        :src="base + '1.png'"
        class="bg"
      >
      <img
        :src="base + gender + type + '.png'"
        class="name center"
      >
    </div>
    <div class="two">
      <img
        :src="base + '2.png'"
        class="bg"
      >
      <img
        :src="photo"
        class="photo center"
      >
      <img
        :src="base + gender + 'word' + type + '.png?0708'"
        class="word"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack } from "services";
import { normalPages } from "@/mixins/normalPages";
const CDNURL = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/facing/",
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      type: null,
      //微信分享
      wxShareInfoValue: {
        title: "刷脸测一测，你有天生贵相吗？",
        desc: "老夫掐指一算，你竟然是……",
        link: "http://papi.xingstation.com/api/s/gZ6" + window.location.search,
        imgUrl: CDNURL + "/fe/image/facing/share.png",
      }
    };
  },
  watch: {
    parms() {
      this.getType()
    }
  },
  mounted() {
  },
  methods: {
    getType() {
      let scores = this.score
      if (scores > 94) {
        this.type = '0'
        return;
      }
      if (scores > 88) {
        this.type = '1'
        return;
      }
      if (scores >= 80) {
        this.type = '2'
        return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.xingstation.com/fe/image/facing/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  text-align: center;
  max-width: 750px;
  background: url("@{imgUrl}back.png") center top / 100% auto no-repeat;
  padding: 0 2%;
  .bg {
    position: relative;
    z-index: 0;
  }
  .center {
    left: 50%;
    transform: translateX(-50%);
  }
  .one {
    position: relative;
    .name {
      width: 65vw;
      position: absolute;
      top: 51%;
      z-index: 99;
    }
  }
  .two {
    position: relative;
    .photo {
      width: 33.7vw;
      position: absolute;
      top: 13%;
      left: 27.2%;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
    .word {
      width: 32vw;
      position: absolute;
      top: 26%;
      right: 8%;
      z-index: 99;
    }
  }
}
</style>


