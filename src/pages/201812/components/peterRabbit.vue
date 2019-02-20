<template>
  <div
    :style="root"
    class="warp"
  >
    <img
      :src="base + 'top.png' + this.$qiniuCompress()"
      class="top"
    >
    <img
      :src="base + 'shake_left.png' + this.$qiniuCompress()"
      class="shake left animated linear infinite tada"
    >
    <img
      :src="base + 'shake_right.png' + this.$qiniuCompress()"
      class="shake right animated linear infinite tada"
    >
    <!-- 勋章-联动-3个节目 -->
    <div class="one">
      <img
        :src="base + '2.png' + this.$qiniuCompress()"
        class="bg"
      >
      <!--多级联动通用版-->
      <div class="programs">
        <ul class="ul-list">
          <li
            v-for="(item,index) in projects"
            :key="index"
            class="list-li"
          >
            <img
              :src="item.img"
              class="notget"
            >
          </li>
        </ul>
      </div>
      <button
        class="map-btn"
        @click="()=>{mask = true;}"
      >
        <img :src="base + 'button_2.png' + this.$qiniuCompress()">
      </button>
    </div>
    <!-- 图片，相片展示 -->
    <div class="two">
      <img
        :src="base + 'flower.png' + this.$qiniuCompress()"
        class="flower"
      >
      <img
        :src="base + 'tree.png' + this.$qiniuCompress()"
        class="tree"
      >
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'arrow.png' + this.$qiniuCompress()"
        class="arrow"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'prompt.png' + this.$qiniuCompress()"
        class="prompt"
      >
      <img
        :src="base + 'tree_2.png' + this.$qiniuCompress()"
        class="tree2"
      >
    </div>

    <!-- 链接跳转-停车缴费 -->
    <div class="three">
      <a href="http://papi.xingstation.com/api/s/oVz">
        <img
          :src="base + 'button.png' + this.$qiniuCompress()"
          class="link-btn"
        >
      </a>
    </div>
    <img
      :src="base + 'bottom.png' + this.$qiniuCompress()"
      class="bottom"
    >
    <!-- mask 遮罩 -->
    <div
      v-show="mask"
      class="mask"
      @click.self="()=>{mask = false;}"
    >
      <img
        :src="base + 'map_top.png'+ this.$qiniuCompress()"
        class="map-top"
      >`
      <img
        :src="base + 'map_m.png'+ this.$qiniuCompress()"
        class="map"
        @click="()=>{mask = true;}"
      >
    </div>
    <BottomBar
      :replace-menu-code="'3o3o'"
      :replace-mkey="mkey"
    />
  </div>
</template>
<script>
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies,
  getGameHonour
} from "services";
import { normalPages } from "@/mixins/normalPages";
import "animate.css";
import BottomBar from "@/pages/m/components/Static/BottomBar";
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    BottomBar
  },
  mixins: [normalPages],
  props: {
    linkData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      base: CDNURL + "/fe/image/peter/",
      root: {
        "min-height": this.$innerHeight() + "px"
      },
      mask: false,
      userId: null,
      mkey: "y6541h00",
      projects: {
        "8": {
          name: "ptRabbitRed",
          img: ""
        },
        "9": {
          name: "ptRabbitBlue",
          img: ""
        },
        "10": {
          name: "ptRabbitYellow",
          img: ""
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "出发，彼得兔",
        desc: "我们一定要去探险！",
        link: this.linkData + window.location.search,
        imgUrl: CDNURL + "/fe/image/peter/share.png"
      }
    };
  },
  watch: {
    userinfo() {
      this.getGameHonour(3, this.userinfo.z);
    }
    // belong() {
    //   this.getGameHonour(3, '8b96bc7fba4c1176b3fc0861e94f22465c0f6a');
    // }
  },
  mounted() { },
  methods: {
    getGameHonour(bid, z) {
      getGameHonour(bid, z)
        .then(res => {
          console.log(res);
          this.projectStatus(res.results.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    projectStatus(data) {
      data.map(r => {
        if (r.hid <= 0) {
          this.projects[r.xid].img = r.xtabicon;
        } else {
          this.projects[r.xid].img = r.xicon;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@imgurl: "http://cdn.exe666.com/fe/image/peter/";
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
  overflow-x: hidden;
  position: relative;
  background-color: #3981a9;
  background-image: url("@{imgurl}spot.png");
  background-repeat: repeat;
  background-position: center top;
  background-size: 100% auto;
  & > div {
    display: block;
    position: relative;
    width: 87.5%;
    margin-bottom: 5%;
    z-index: 0;
  }
  .bg {
    position: relative;
    width: 100%;
    z-index: 0;
  }
  .top {
    position: relative;
    z-index: 0;
    margin-bottom: 3%;
  }
  .bottom {
    position: relative;
    z-index: 9;
    margin-top: -11%;
  }
  .shake {
    width: 26%;
    position: absolute;
    top: 3%;
    z-index: 99;
  }
  .left {
    left: 3%;
  }
  .right {
    right: 3%;
  }
  .one {
    overflow: hidden;
    .programs {
      position: absolute;
      top: 22%;
      left: 0%;
      z-index: 99;
      ul {
        display: inline-block;
        li {
          display: inline-block;
          position: relative;
          display: inline-block;
          width: 28%;
          margin: 0% 2% 0% 2%;
          &:first-child {
            margin-left: 0%;
          }
          &:last-child {
            margin-left: 0%;
          }
          img {
            max-width: 100%;
          }
          .notget {
            position: relative;
            z-index: 0;
          }
          .geted {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
          }
        }
      }
    }
    .map-btn {
      width: 32vw;
      position: absolute;
      left: 50%;
      bottom: 5%;
      transform: translateX(-50%);
      background: transparent;
      border: none;
    }
  }
  .two {
    background-color: #fff;
    padding: 5vw;
    z-index: 9;
    .flower {
      width: 21vw;
      position: absolute;
      top: -4%;
      left: -8%;
      z-index: 999;
    }
    .tree {
      width: 17vw;
      position: absolute;
      top: -11%;
      right: -8%;
      z-index: 999;
    }
    .tree2 {
      width: 14.5vw;
      position: absolute;
      bottom: -8%;
      left: -8%;
      z-index: 999;
    }
    .photo {
      border: solid 1.5vw #9cc0d4;
      z-index: 0;
      pointer-events: auto;
      user-select: auto;
      position: relative;
      display: block;
    }
    .arrow {
      width: 8vw;
      margin-top: -5px;
      z-index: 9;
      animation: myslider linear 0.4s infinite alternate;
      position: relative;
      display: block;
    }
    .prompt {
      width: 66vw;
      position: relative;
      display: block;
      z-index: 0;
    }
  }
  .three {
    background-color: #fff;
    padding: 5vw 7vw;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    z-index: 999;
    .map-top {
      width: 34%;
      position: relative;
      z-index: 99;
      margin-top: 15%;
      margin-bottom: -17%;
    }
    .map {
      width: 85%;
      position: relative;
      z-index: 0;
      pointer-events: auto;
    }
  }
  .btb {
    margin-bottom: 0;
    // padding-left: 30px;
    // padding-right: 30px;
    margin-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    margin-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.16);
    z-index: 10000;
    // padding-left: 0.5rem;
    // padding-right: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .bitem {
      height: 100%;
      // width: 30px;
      width: 33%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 12px;
      align-items: center;
      flex-grow: 1;
      color: rgba(166, 153, 150, 1);
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
}
@keyframes myslider {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>


