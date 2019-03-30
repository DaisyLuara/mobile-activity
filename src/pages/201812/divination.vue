<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base + 'title.png'"
      class="title"
    >
    <swiper
      ref="Swiper"
      :options="sOption"
      class="swiper"
    >
      <swiper-slide>
        <img :src="photo">
      </swiper-slide>
      <swiper-slide>
        <img :src="base + word + '.png'">
      </swiper-slide>
    </swiper>
    <img
      :src="base + 'note.png'"
      class="note"
    >
    <img
      :src="base + 'pointer.png'"
      class="pointer"
    >
    <img
      :src="base + 'save.png'"
      class="save"
    >
  </div>
</template>
<script>
import lottie from "lottie-web";
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  getImage
} from "services";
import { normalPages } from "@/mixins/normalPages";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const cdnUrl = process.env.CDN_URL;
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      base: cdnUrl + "/fe/image/divination/",
      userId: null,
      sOption: {
        effect: "flip",
        flipEffect: {
          slideShadows: true,
          limitRotation: true
        }
      },
      word: null,
      //分享
      wxShareInfoValue: {
        title: "占卜物语",
        desc: "窥探你内心的秘密",
        link: "http://papi.xingstation.com/api/s/YWp" + window.location.search,
        imgUrl: cdnUrl + "/fe/image/divination/icon.png",
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      document.querySelector(".note").style.top = "63%";
    }

    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get("sign") === null) {
        let base_url = encodeURIComponent(String(window.location.href));
        let redirct_url =
          process.env.WX_API +
          "/wx/officialAccount/oauth?url=" +
          base_url +
          "&scope=snsapi_base";
        window.location.href = redirct_url;
      } else {
        this.userId = Cookies.get("user_id");
      }
    }
  }
};
</script>
<style lang="less" scoped>
@imgUrl: "https://cdn.xingstation.com/fe/image/divination/";
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
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  background: url("@{imgUrl}back.png") center center/100% auto no-repeat;
  background-color: #281234;
  .title {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    z-index: 0;
  }
  .swiper {
    width: 65%;
    position: relative;
    z-index: 0;
  }
  .note {
    width: 39%;
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    animation: myshake 1.2s ease-in-out infinite alternate;
  }
  .pointer {
    width: 11%;
    display: block;
    z-index: 0;
    animation: myshake 0.8s linear infinite alternate;
  }
  .save {
    width: 78.5%;
    z-index: 0;
    margin-bottom: 5%;
  }
}
@keyframes pointer {
  0% {
    transform: translate(10px, -50%);
  }
  100% {
    transform: translate(-10px, -50%);
  }
}
@keyframes myshake {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>


