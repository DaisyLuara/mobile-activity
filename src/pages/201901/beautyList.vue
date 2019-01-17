<template>
  <div
    :style="style.root"
    class="warp"
  >
    <img
      :src="base + 'p2/text.png'"
      class="title"
    >
    <img
      :src="base + 'p2/arrow.png'"
      class="arrow"
    >
    <div class="main">
      <div
        v-for="(item ,index) in [photo,photo,photo,photo,photo,photo,photo]"
        :key="index"
        class="list-item"
      >
        <img
          :src="base + 'p2/photo.png'"
          class="bg"
        >
        <!-- :src="item.link" -->
        <img
          :src="item"
          class="photo"
          @click="getHeart"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, getGameList } from 'services'
import { normalPages } from '@/mixins/normalPages'
const CDN_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: CDN_URL + '/fe/image/beauty/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      list: [],
      //微信分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        imgUrl: CDN_URL + '/fe/image/beauty/icon.png'
      }
    }
  },
  mounted() {
  },
  watch: {
    userinfo() {
      getList(this.actinfo.awardkey, this.userinfo.z)
    }
  },
  methods: {
    getList(awardkey, z) {
      getGameList(awardkey, z).then(res => {
        console.log(res)
        this.list = res.results.data
      }).catch(err => {
        console.log(err)
      })
    },
    getHeart(e) {
      let target = e.target
      console.log(e)
      console.log(e.originalEvent.touches[0].clientX)
      console.log(e.originalEvent.touches[0].clientY)
    }

  }
}
</script>
<style lang="less" scoped>
@url: "https://cdn.exe666.com/fe/image/beauty/";
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
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("@{url}p2/back2.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  .title {
    width: 35%;
    position: relative;
    z-index: 0;
    margin-top: 5%;
  }
  .arrow {
    width: 7.5%;
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    animation: myarrow linear 0.8s infinite alternate;
  }
  .main {
    position: relative;
    width: 83%;
    z-index: 0;
    display: flex;
    margin-top: 3%;
    margin-bottom: 5%;
    flex-flow: row wrap;
    justify-content: space-between;
    overflow-x: hidden;
    .list-item {
      position: relative;
      margin: 0;
      width: 48%;
      margin-top: 5%;
      .bg {
        position: relative;
        z-index: 0;
      }
      .photo {
        width: 94%;
        position: absolute;
        top: 0.2%;
        left: 3.2%;
        z-index: 99;
        pointer-events: auto;
        user-select: auto;
      }
    }
  }
}
@keyframes myarrow {
  0% {
    bottom: 5%;
  }
  100% {
    bottom: 2%;
  }
}
</style>

