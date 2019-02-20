<template>
  <div
    :style="root"
    class="warp"
  >
    <!-- one top -->
    <img
      :src="base + '1.png'"
      class="top"
    >
    <!-- two honour 联动-->
    <!-- 勋章-联动-3个节目 -->
    <div class="groups">
      <img
        :src="base + '2.png'"
        class="bg"
      >
      <gameHonour
        :style-data="styleData"
        :projects="projects"
        :bid="bid"
      />
    </div>
    <!-- three map -->
    <div class="map">
      <img
        :src="base + '3.png'"
        class="bg"
      >
      <a
        class="tomap"
        @click="()=>{mask = true}"
      >
        <img :src="base + 'map.png'">
      </a>
    </div>
    <!-- four photo -->
    <div class="picture">
      <img
        :src="photo"
        class="photo"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'tip.png'"
        class="tip"
      >
    </div>
    <div
      v-show="mask"
      class="mask"
    >
      <div class="content">
        <img
          :src="base + '5.png'"
          class="map"
        >
        <a
          class="close"
          @click="()=>{mask = false}"
        >
          <img :src="base + 'close.png'">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Cookies,
  getGameHonour
} from "services";
import { normalPages } from "@/mixins/normalPages";
import gameHonour from "@/modules/gameHonour";
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    gameHonour
  },
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/altman/",
      root: {
        "min-height": this.$innerHeight() + "px"
      },
      mask: false,
      bid: 4,
      projects: {
        "11": {
          name: "beiliya",
          img: ""
        },
        "12": {
          name: "dijia",
          img: ""
        },
        "13": {
          name: "sailuo",
          img: ""
        }
      },
      styleData: {
        ul: {
          position: 'relative',
          'z-index': 0,
          display: 'block',
          width: '100%',
          height: '100%',
        },
        li: {
          width: '100%',
          position: 'absolute',
          left: ' 0%',
          top: '0%',
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "万代TAMASHII NATIONS奥特曼英雄“魂”展首次空降上海",
        desc: "一起参与现场互动游戏，赢得大量奥特曼系列礼品",
        link: window.location.href,
        imgUrl: CDNURL + "/fe/image/altman/icon.png"
      }
    };
  },
  mounted() { },
  methods: {

  }
};
</script>
<style lang="less" scoped>
@imgurl: "http://cdn.exe666.com/fe/image/altman/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
* {
  padding: 0;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  position: relative;
  background-color: #1b1b1b;
  .bg {
    position: relative;
    z-index: 0;
  }
  .groups {
    width: 100%;
    overflow: hidden;
    position: relative;
    .the-honour {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      z-index: 9;
      // li {
      //   position: absolute !important;
      //   top: 0%;
      //   left: 0%;
      // }
      // .ul-list {
      //   position: relative;
      //   z-index: 0;
      //   display: block;
      //   width: 100%;
      //   height: 100%;
      //   // overflow: hidden;
      //   .list-li {
      //     width: 100%;
      //     position: absolute;
      //     left: 0%;
      //     top: 0%;
      //     img {
      //       position: relative;
      //     }
      //   }
      // }
    }
  }
  .map {
    width: 100%;
    overflow: hidden;
    position: relative;
    .tomap {
      width: 25%;
      display: inline-block;
      position: absolute;
      top: 58%;
      right: 11%;
      z-index: 99;
      animation: bigger 0.6s linear infinite alternate;
    }
  }
  .picture {
    width: 100%;
    padding-top: 8%;
    padding-bottom: 12%;
    position: relative;
    .photo {
      position: relative;
      width: 64.1%;
      border: solid 1px #000;
      margin-left: -5%;
      pointer-events: auto;
      user-select: auto;
    }
    .tip {
      width: 9.2%;
      position: absolute;
      top: 50%;
      right: 6%;
      transform: translateY(-50%);
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      width: 100%;
      position: relative;
      .map {
        width: 100%;
        position: relative;
        z-index: 0;
      }
      .close {
        width: 7.6%;
        display: inline-block;
        position: absolute;
        top: 0%;
        right: 5%;
        z-index: 99;
      }
    }
  }
}
@keyframes bigger {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>


