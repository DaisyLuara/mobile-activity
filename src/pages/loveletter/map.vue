<template>
  <div 
    :style="style.root"
    class="content"
  >
    <!-- 音乐icon -->
    <div 
      class="music" 
      @click="playOrNot()"
    >
      <img
        :src="base +'bg.png'"
        class="img1"
      >
      <img
        id="mbtn"
        :src="base +'music.png'"
        class="img2"
      >
    </div>
    <!-- audio -->
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    >
      <source :src="base+'gonglue.mp3'">
    </audio>
    <!-- audio -->
    <swiper
      ref="Swiper"
      :options="sOptions"
      class="swiper"
    >
      <swiper-slide>
        <img
          :src="base + 'page1.png'"
          class="page"
        >
        <a
          class="toclicks"
          @click="toNext"
        />
        <img
          :src="base + 'nav.png'"
          class="pointer"
        >
      </swiper-slide>
      <swiper-slide>
        <!-- 动画 -->
        <div 
          id="anim"
          class="map anim"
        />
        <div 
          v-show="lpointer"
          class="alinks"
        >
          <ul  
            class="ul-icon"
          >
            <li 
              v-for="item in 4"
              :key="item.id"
              @click="toLink(item)"
            >
              <img 
                :src="base + 'icon' + item + '.png'"
              >
            </li>
          </ul>
          <!-- 厦门爱乐乐团 -->
          <a
            class="local-link local1"
            @click="toAlert(1)"
          />
          <!-- 高参 -->
          <a
            class="local-link local2"
            @click="toAlert(2)"
          />
          <!-- 揭幕流程 -->
          <a
            class="local-link local3"
            @click="toAlert(3)"
          />
          <!-- 夏国璋龙狮团 -->
          <a
            class="local-link local4"
            @click="toAlert(4)"
          />
          <!-- 豪觅邮局 -->
          <a
            class="local-link local5"
            @click="toAlert(5)"
          />
          <!-- 永新早食 -->
          <a
            class="local-link local6"
            @click="toAlert(6)"
          />
          <!-- 华润80年，润物耕心 -->
          <a
            class="local-link local7"
            @click="toAlert(7)"
          />
        </div>
      </swiper-slide>
    </swiper>
    <img 
      v-show="jian"
      :src="base + 'jian.png'"
      :class="{jian:true,iphoneX:iphoneX}"
    >
    <div 
      v-show="mask"
      class="mask"
      @click.self="()=>{mask = false; alert1 = false;alert2 = false;jian=false;}"
    >
      <div 
        v-show="alert1"
        class="center alert1"
      >
        <img 
          :src="base + pro"
          :class="{pro:pro_img}"
        >
      </div>
      <div
        v-show="alert2"
        class="center alert2"
      >
        <img 
          :src="base + timg"
          class="timg"
        >
        <div
          class="text"
        >
          <div 
            class="scroll-text"
          >
            <img 
              :src="base + ttext"
              class="ttext"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lottie from "lottie-web";
import { onlyWechatShare } from "../../mixins/onlyWechatShare";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import $ from "jquery";
const cdnUrl = process.env.CDN_URL;
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      base: cdnUrl + "/fe/image/wxc_map/",
      sOptions: {
        on: {
          slideChange: () => {
            let index = this.$refs.Swiper.swiper.realIndex;
            if (index === 1) {
              this.doAnim();
            }
          }
        }
      },
      pro: "wc.png",
      mask: false,
      alert1: false,
      alert2: false,
      jian: false,
      timg: "t1.png",
      ttext: "text1.png",
      pro_img: false,
      iphoneX: false,
      lpointer: false,
      //分享
      wxShareInfoValue: {
        title: "厦门万象城", //暂无
        desc: "厦门万象城", //暂无
        link: process.env.AD_API + "/api/s/xvr" + window.location.search,
        imgUrl: "https://cdn.exe666.com/fe/image/wxc_map/icon.png",
        success: () => {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    if (this.$innerHeight() > 672) {
      this.iphoneX = true;
    }
    this.playAudio();
  },
  methods: {
    toLink(num) {
      this.jian = false;
      if (num === 1) {
        // 跳转公众号
        window.location.href = process.env.AD_API + "/api/s/APz";
        return;
      }
      if (num === 2) {
        this.pro_img = false;
        this.mask = true;
        this.alert1 = true;
        this.pro = "8.png"; //暂无
        return;
      }
      if (num === 3) {
        this.pro_img = false;
        this.mask = true;
        this.alert1 = true;
        this.pro = "7.png";
        return;
      }
      if (num === 4) {
        this.pro_img = false;
        this.mask = true;
        this.alert1 = false;
        this.jian = true;
        return;
      }
    },
    toAlert(item) {
      this.mask = true;
      this.pro_img = false;
      this.jian = false;
      if (item === 1) {
        this.alert2 = true;
        this.timg = "tt1.png";
        this.ttext = "text1.png";
        return;
      }
      if (item === 2) {
        this.alert2 = true;
        this.timg = "tt3.png";
        this.ttext = "3_2.png";
        return;
      }
      //1
      if (item === 3) {
        this.alert1 = true;
        this.pro = "9_1.png";
        return;
      }
      if (item === 4) {
        this.alert2 = true;
        this.timg = "tt2.png";
        this.ttext = "2_2.png";
        return;
      }
      //2
      if (item === 5) {
        this.alert1 = true;
        this.pro_img = true;
        this.pro = "6_1.png";
        return;
      }
      //3
      if (item === 6) {
        this.alert1 = true;
        this.pro_img = true;
        this.pro = "5.png";
        return;
      }
      //4
      if (item === 7) {
        this.alert1 = true;
        this.pro = "4.png";
        return;
      }
    },
    toNext() {
      this.$refs.Swiper.swiper.slideNext();
    },
    doAnim() {
      const el = document.getElementById("anim");
      let that = this;
      let anim = lottie.loadAnimation({
        name: "anim",
        container: el,
        renderer: "svg",
        loop: false,
        assetsPath: that.base + "data/img/",
        path: that.base + "data/data.json"
      });
      this.animation = anim;
      anim.addEventListener("DOMLoaded", function() {
        // 播放0-125帧动画,第一屏动画
        anim.playSegments([0, 125], true);
      });
      anim.addEventListener("complete", function() {
        anim.loop = true;
        anim.playSegments([126, 250], false);
        that.lpointer = true;
      });
    },
    playAudio() {
      var voice = document.getElementById("voice");
      var mbtn = document.getElementById("mbtn");
      if (!voice) {
        return;
      }
      //调用 <audio> 元素提供的方法 play()
      voice.play();
      if (voice.paused) {
        mbtn.setAttribute("class", " ");
      }
      //判斷 WeixinJSBridge 是否存在
      if (
        typeof WeixinJSBridge == "object" &&
        typeof WeixinJSBridge.invoke == "function"
      ) {
        voice.play();
      } else {
        //監聽客户端抛出事件"WeixinJSBridgeReady"
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            function() {
              voice.play();
            },
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", function() {
            voice.play();
          });
          document.attachEvent("onWeixinJSBridgeReady", function() {
            voice.play();
          });
        }
      }

      //voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
      var voiceStatu = true;
      //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
      document.addEventListener(
        "touchstart",
        function(e) {
          if (voiceStatu) {
            voice.play();
            voiceStatu = false;
          }
        },
        false
      );
      voice.onplay = function() {
        mbtn.setAttribute("class", "mplay");
      };
      voice.onpause = function() {
        mbtn.setAttribute("class", " ");
      };
    },
    playOrNot() {
      // 依據 audio 的 paused 属性返回音频是否已暂停來判斷播放還是暫停音频。
      var voice = document.getElementById("voice");
      if (voice.paused) {
        voice.play();
      } else {
        voice.pause();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/fe/image/wxc_map/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
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
  overflow: hidden;
  position: relative;
  background-color: #f0b0ae;
  .music {
    display: block;
    width: 10%;
    position: absolute;
    top: 2.5%;
    right: 8%;
    z-index: 999;
    .img1 {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .img2 {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
    }
  }
  .mplay {
    animation: mycir 2s linear infinite;
  }
  .swiper {
    position: relative;
    z-index: 0;
  }
  .toclicks {
    position: absolute;
    top: 59%;
    right: 0%;
    width: 60%;
    height: 100px;
    display: inline-block;
    z-index: 9999;
  }
  .map {
    width: 100%;
    position: relative;
    z-index: 0;
    margin-top: -15%;
  }
  .alinks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .ul-icon {
      display: inline-block;
      text-align: left;
      padding-top: 10px;
      li {
        display: inline-block;
        width: 12%;
        margin-left: 10px;
        border-radius: 50%;
        position: relative;
      }
    }
    .local-link {
      display: inline-block;
      width: 15vw;
      height: 25vw;
      border-radius: 50%;
      position: absolute;
      z-index: 99;
    }
    .local1 {
      top: 24%;
      left: 1%;
    }
    .local2 {
      height: 22vw;
      top: 19%;
      left: 20%;
    }
    .local3 {
      height: 18vw;
      top: 25%;
      left: 35%;
    }
    .local4 {
      width: 18vw;
      top: 15%;
      right: 24%;
    }
    .local5 {
      height: 20vw;
      top: 42%;
      left: 28%;
    }
    .local6 {
      width: 18vw;
      height: 20vw;
      top: 52%;
      left: 24%;
    }
    .local7 {
      height: 25vw;
      top: 38%;
      right: 24%;
    }
  }
  .pointer {
    width: 37%;
    position: absolute;
    bottom: 30%;
    right: 19%;
    animation: pointer 0.8s linear infinite alternate;
    z-index: 999;
  }
  .jian {
    width: 25%;
    position: absolute;
    top: 83%;
    left: 29%;
    z-index: 1000;
  }
  .iphoneX {
    top: 72%;
    left: 24%;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    .center {
      width: 71vw;
      height: 81vw;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      background-image: url("@{img}probg.png");
      background-position: center top;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    .alert1 {
      img {
        width: 100%;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 15px;
      }
      .pro {
        width: 100%;
        border-radius: none;
      }
    }
    .alert2 {
      overflow: hidden;
      padding-top: 2%;
      .timg {
        width: 40%;
        margin: 0 auto;
        position: relative;
      }
      .text {
        width: 100%;
        height: 38%;
        border-radius: 15px;
        position: relative;
        margin-top: 5%;
        overflow: hidden;
        .scroll-text {
          overflow-y: scroll;
          width: 100%;
          height: 100%;
          position: relative;
          .ttext {
            width: 85%;
            margin: 0 auto;
            position: relative;
          }
        }
      }
    }
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
@keyframes scale {
  from {
    transform: scale(0.8, 0.8);
  }
  50% {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.8, 0.8);
  }
}
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


