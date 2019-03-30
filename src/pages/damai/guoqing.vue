<template>
  <div
    :style="style.root"
    class="damai"
  >
    <img
      :src="baseUrl + 'bg.png'"
      :style="style.bg"
      class="top-bg"
    >
    <div
      :style="style.photoArea"
      class="photo-area"
    >
      <img
        :src="baseUrl + 'photobg.png'"
        :style="style.photobg"
        class="bg"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        :style="style.photo"
        class="photo"
      >
      <img
        :src="baseUrl + 'remind.png'"
        class="remind"
      >
      <div
        :style="style.button"
        class="button"
        @click="handleNavi"
      >
        <img
          :src="baseUrl + 'flash_00000.png'"
          class="flash"
        >
        <img
          :src="baseUrl + 'button-bg.png'"
          class="bg"
        >
        <img
          :src="baseUrl + 'button-text.png'"
          class="text"
        >
        <img
          v-show="control.bg1"
          :src="baseUrl + 'button_00001.png'"
          class="bg-02"
        >
        <img
          v-show="control.bg2"
          :src="baseUrl + 'button_00003.png'"
          class="bg-01"
        >
        <img
          v-show="control.bg3"
          :src="baseUrl + 'button_00005.png'"
          class="bg-01"
        >
      </div>
    </div>

  </div>
</template>

<script>
const cdnUrl = process.env.CDN_URL
import { onlyGetPhoto } from '@/mixins/onlyGetPhoto'
export default {
  mixins: [onlyGetPhoto],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/damai/guoqing/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        photobg: {
          marginTop: '-' + 0.015 * this.$innerHeight() + 'px'
        },
        bg: {
          marginTop: '-' + 0.015 * this.$innerHeight() + 'px'
        },
        photo: {
          top: 0.026 * this.$innerHeight() + 'px'
        },
        button: {
          width: 0.5 * this.$innerWidth() + 'px',
          height: (0.5 * this.$innerWidth() * 186) / 589 + 'px'
        },
        photoArea: {
          height: (this.$innerWidth() * 601) / 390 + 'px'
        }
      },
      control: {
        bg3: true,
        bg2: true,
        bg1: true
      },
      count: 0
    }
  },
  mounted() {
    this.newInterval()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.newInterval)
  },
  methods: {
    newInterval() {
      this.count++
      if (this.count % 6 === 0) {
        this.control.bg1 = false
        this.control.bg2 = false
        this.control.bg3 = false
      }
      if (this.count % 6 === 1) {
        this.control.bg1 = true
        this.control.bg2 = false
        this.control.bg3 = false
      }
      if (this.count % 6 === 2) {
        this.control.bg1 = false
        this.control.bg2 = true
        this.control.bg3 = false
      }
      if (this.count % 6 === 3) {
        this.control.bg1 = false
        this.control.bg2 = false
        this.control.bg3 = true
      }
      if (this.count % 6 === 4) {
        this.control.bg1 = false
        this.control.bg2 = true
        this.control.bg3 = false
      }
      if (this.count % 6 === 5) {
        this.control.bg1 = true
        this.control.bg2 = false
        this.control.bg3 = false
      }
      setTimeout(() => {
        requestAnimationFrame(this.newInterval)
      }, 300)
    },
    handleNavi() {
      window.location.href = 'http://papi.xingstation.com/api/s/y8W'
    }
  }
}
</script>

<style lang="less" scoped>
@baseurl : "http://cdn.xingstation.cn/fe/marketing/img/damai/guoqing/";
.damai {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #291536;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .top-bg {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }
  .photo-area {
    width: 100%;
    position: relative;
    .bg {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 30;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      transform: scale(1.04);
    }
    .photo {
      z-index: 40;
      width: 66.5%;
      margin: 0 auto;
      top: 2.9%;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
    }

    .remind {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      z-index: 50;
      width: 40%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -78%;
      top: 0;
      margin: auto;
    }
    .button {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      z-index: 50;
      position: relative;
      margin: auto;
      position: absolute;
      bottom: -98%;
      left: 0;
      right: 0;
      top: 0;
      .bg {
        width: 100%;
        z-index: 60;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
      .bg-01 {
        width: 100%;
        z-index: 50;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        transform: scale(1.2);
      }
      .bg-02 {
        width: 100%;
        margin: auto;
        z-index: 50;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        transform: scale(1.1);
      }

      .text {
        width: 80%;
        z-index: 70;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    .flash {
      animation: scale 0.2s linear infinite alternate;
      width: 23%;
      position: absolute;
      top: -43%;
      left: 0;
      z-index: 80;
      margin-left: -17%;
    }
  }
}
@keyframes scale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
