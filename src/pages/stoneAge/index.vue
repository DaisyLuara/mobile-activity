<template>
  <div
    :style="style.root"
    class="root"
  >
    <div
      :style="style.photoHei"
      class="photo"
    >
      <!-- :src="baseUrl + '666.jpeg'+ this.$qiniuCompress()" -->
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo-real"
      >
      <img
        :src="baseUrl + 'star_1.png'+ this.$qiniuCompress()"
        class="star1"
      >
      <img
        :src="baseUrl + 'star_2.png'+ this.$qiniuCompress()"
        class="star2"
      >
      <img
        :src="baseUrl + 'star_3.png'+ this.$qiniuCompress()"
        class="star3"
      >
      <img
        :src="baseUrl + 'star_4.png'+ this.$qiniuCompress()"
        class="star4"
      >
      <img
        :src="baseUrl + 'star_5.png'+ this.$qiniuCompress()"
        class="star5"
      >
      <div :class="{'x-bt':iponeX,'bt':!iponeX}">
        <img
          :src="baseUrl + 'nav.png'+ this.$qiniuCompress()"
          class="nav"
        >
        <img
          :src="baseUrl + 'tip.png'+ this.$qiniuCompress()"
          class="tip"
        >
      </div>
    </div>

  </div>
</template>

<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/stone_age/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        photoHei: {
          height: this.$innerHeight() * 0.85 + 'px'
        }
      },
      iponeX: false,
      wxShareInfoValue: {
        title: '我的异想记',
        desc: 'get哆啦A梦同款任意门',
        link: process.env.AD_API+'/api/s/XDW' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/stone_age/icon.jpeg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() { },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iponeX = true
    } else {
      this.iponeX = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/stone_age/";
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background-image: url("@{imageHost}bg.jpg");
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  overflow: hidden;

  .photo {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    z-index: 3;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .photo-real {
      width: 62%;
      position: absolute;
      left: 50%;
      top: 8%;
      transform: translate(-50%, 0%);
      -webkit-user-select: auto;
      pointer-events: auto;
    }
    .star1 {
      width: 14%;
      position: absolute;
      left: 5%;
      top: 3%;
      animation: starScale 2s ease-out infinite forwards;
    }
    .star2 {
      width: 12%;
      position: absolute;
      right: 3%;
      top: 1%;
      animation: starScale 2s ease-out infinite forwards;
    }
    .star3 {
      width: 18%;
      position: absolute;
      left: 2%;
      top: 50%;
      animation: starScale 2s ease-out infinite forwards;
    }
    .star4 {
      width: 10%;
      position: absolute;
      right: 2%;
      top: 45%;
      animation: starScale 2s ease-out infinite forwards;
    }
    .star5 {
      width: 12%;
      position: absolute;
      right: 2%;
      bottom: 22%;
      animation: starScale 2s ease-out infinite forwards;
    }
    .x-bt {
      width: 100%;
      height: 10%;
      position: absolute;
      left: 0%;
      bottom: 12%;
      transform: translate(-50%, 0%);
      animation: arrow 1.8s linear infinite alternate;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
      z-index: 4;
      .nav {
        width: 16%;
        display: block;
        position: absolute;
        left: 50%;
        top: -20%;
        transform: translate(-50%, 0%);
      }
      .tip {
        width: 56%;
        display: block;
        position: absolute;
        left: 50%;
        top: 56%;
        transform: translate(-50%, 0%);
      }
    }
    .bt {
      width: 100%;
      height: 10%;
      position: absolute;
      left: 0%;
      bottom: 0%;
      transform: translate(-50%, 0%);
      animation: arrow 1.8s linear infinite alternate;
      z-index: 4;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
      .nav {
        width: 16%;
        display: block;
        position: absolute;
        left: 50%;
        top: -20%;
        transform: translate(-50%, 0%);
      }
      .tip {
        width: 50%;
        display: block;
        position: absolute;
        left: 50%;
        top: 56%;
        transform: translate(-50%, 0%);
      }
    }
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
@keyframes starScale {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  to {
    transform: scale(1.2, 1.2);
  }
}
</style>
