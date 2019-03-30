<template>
  <div
    :style="style.root"
    class="root"
  >
    <div
      :class="{'x-center':iphoneX}"
      class="center"
    >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
    </div>
    <div
      :class="{'x-bottom':iphoneX}"
      class="bottom"
    >
      <img
        :src="baseUrl + 'A.gif'"
        class="jiantou"
      >
      <img
        :src="baseUrl + 'save.png'+ this.$qiniuCompress()"
        class="save"
      >
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
      baseUrl: cdnUrl + '/fe/marketing/img/superPetrolStation/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      iphoneX: false,
      wxShareInfoValue: {
        title: '刷脸为自己加油打call，让健康生活不只是口号！',
        desc: '星视度超级加油站',
        link: 'http://papi.xingstation.com/api/s/Dkx' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/superPetrolStation/icon.jpg',
      }
    }
  },
  created() { },
  mounted() {
    let height = this.$innerHeight()
    if (height > 672) {
      this.iphoneX = true
    } else {
      this.iphoneX = false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.com/fe/marketing/img/superPetrolStation";
.root {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg.jpg");
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  img {
    pointer-events: none;
    user-select: none;
  }
  .center {
    width: 78%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 4%;
    transform: translate(-50%, 0);
    pointer-events: none;
    user-select: none;
    background-repeat: no-repeat;
    background-image: url("@{imageHost}/kuang.png");
    background-size: 100% 100%;
    .photo {
      position: absolute;
      left: 6%;
      top: 1.7%;
      width: 88.3%;
      height: 93.6%;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .x-center {
    width: 78%;
    height: 74%;
    position: absolute;
    left: 50%;
    top: 7%;
    transform: translate(-50%, 0);
  }
  .bottom {
    .jiantou {
      width: 13%;
      margin-bottom: 2%;
      position: absolute;
      left: 50%;
      bottom: 6%;
      transform: translate(-50%, 0);
    }
    .save {
      width: 74%;
      position: absolute;
      left: 50%;
      bottom: 1%;
      transform: translate(-50%, 0);
    }
  }
  .x-bottom {
    .jiantou {
      width: 13%;
      margin-bottom: 2%;
      position: absolute;
      left: 50%;
      bottom: 12%;
      transform: translate(-50%, 0);
    }
    .save {
      width: 74%;
      position: absolute;
      left: 50%;
      bottom: 6%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
