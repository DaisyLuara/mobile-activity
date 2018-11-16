<template>
  <div
    :style="style.root"
    class="content">
    <div 
      class="main">
      <img
        :src="base+'back.jpg'"
        class="background">
        <!-- 点亮的球 -->
      <div
        class="light-stars">
        <a
          v-for="item in stars"
          :key="item.id"
          :class="item"
         >
          <img
            :src="base + item + '0.png'">
        </a>
      </div> 
      <div
        class="mask">
        <!-- 潘多拉星 1-->
        <!-- <div 
          class="star-card pdl-card">
          <a 
            class="close"
            @click="closeCard">
            <img
              :src="base + 'close.png'"/>
          </a>
          <img
            :src="base + 'pdl3.png'"
            class="tit">
          <img
            :src="photo"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + 'pdl1.png'"
            class="name">
          <img
            :src="base + 'pdl2.png'"
            class="people">
        </div> -->
        <!-- 那美克星 2-->
        <!-- <div 
          class="star-card nmk-card">
          <a 
            class="close"
            @click="closeCard">
            <img
              :src="base + 'close.png'"/>
          </a>
          <img
            :src="base + 'nmk3.png'"
            class="tit">
          <img
            :src="photo"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + 'nmk1.png'"
            class="name">
          <img
            :src="base + 'nmk2.png'"
            class="people">
        </div> -->
        <!-- 瓦肯星 3-->
        <!-- <div 
          class="star-card wk-card">
          <a 
            class="close"
            @click="closeCard">
            <img
              :src="base + 'close.png'"/>
          </a>
          <img
            :src="base + 'wk3.png'"
            class="tit">
          <img
            :src="photo"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + 'wk1.png'"
            class="name">
          <img
            :src="base + 'wk2.png'"
            class="people">
        </div> -->
        <!-- M78 4-->
        <!-- <div 
          class="star-card m78-card">
          <a 
            class="close"
            @click="closeCard">
            <img
              :src="base + 'close.png'"/>
          </a>
          <img
            :src="base + 'm783.png'"
            class="tit">
          <img
            :src="photo"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + 'm781.png'"
            class="name">
          <img
            :src="base + 'm782.png'"
            class="people">
        </div> -->
        <!-- kx 5-->
        <!-- <div 
          class="star-card kx-card">
          <a 
            class="close"
            @click="closeCard">
            <img
              :src="base + 'close.png'"/>
          </a>
          <img
            :src="base + 'kx3.png'"
            class="tit">
          <img
            :src="photo"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + 'kx1.png'"
            class="name">
          <img
            :src="base + 'kx2.png'"
            class="people">
        </div> -->
        <!-- asgd 6-->
        <div 
          class="star-card asgd-card">
          <a 
            class="close"
            @click="closeCard">
            <img
              :src="base + 'close.png'"/>
          </a>
          <img
            :src="base + 'asgd3.png'"
            class="tit">
          <img
            :src="photo"
            class="photo">
          <img
            :src="base + 'save.png'"
            class="save">
          <img
            :src="base + 'asgd1.png'"
            class="name">
          <img
            :src="base + 'asgd2.png'"
            class="people">
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { isInWechat, wechatShareTrack, $wechat } from 'services'
import { normalPages } from '../../mixins/normalPages'
const CDNURL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: CDNURL + '/fe/image/star/',
      photo: null,
      // 1，潘多拉，2，阿斯加德，3，克星，4，m78，5，娜美克，6，瓦肯(星星的顺序)
      stars: ['pdl', 'asgd', 'kx', 'm78', 'nmk', 'wk'],
      //微信分享
      wxShareInfoValue: {
        title: '来自星星的你',
        desc: '来自星星的你',
        link: 'http://papi.xingstation.com/api/s/G50' + window.location.search,
        imgUrl: CDNURL + 'icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {},
  methods: {
    closeCard() {}
  }
}
</script>
<style lang="less" scoped>
@img: 'https://cdn.exe666.com/fe/image/star/';
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
}
a {
  display: inline-block;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  background-color: #23242f;
  position: relative;
  overflow: hidden;
  .main {
    position: relative;
    width: 100%;
    overflow: hidden;
    .background {
      position: relative;
      z-index: 0;
    }
    .light-stars {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
      a {
        position: absolute;
      }
      .pdl {
        width: 24%;
        top: 3%;
        left: 3%;
      }
      .nmk {
        width: 14%;
        top: 4%;
        left: 35%;
      }
      .wk {
        width: 14%;
        top: 7%;
        left: 60%;
      }
      .asgd {
        width: 22%;
        bottom: 6.8%;
        left: 54.5%;
      }
      .kx {
        width: 14%;
        bottom: 12%;
        left: 33%;
      }
      .m78 {
        width: 27%;
        bottom: 23%;
        left: 1%;
      }
    }
    .mask {
      position: absolute;
      top: 0%;
      bottom: 0%;
      left: 0%;
      right: 0%;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
    }
    .tit {
      width: 47%;
      position: absolute;
      top: 2%;
      left: 4%;
      z-index: 999;
    }
    .close {
      display: inline-block;
      width: 14%;
      position: absolute;
      top: 8.5%;
      left: 74%;
      z-index: 999;
    }
    .photo {
      width: 63%;
      position: absolute;
      top: 48.5%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: solid 7px #0173d4;
      border-radius: 5px;
      z-index: 99;
      pointer-events: auto;
      user-select: auto;
    }
    .save {
      width: 12%;
      position: absolute;
      top: 49%;
      transform: translateY(-50%);
      left: 80.5%;
      z-index: 9;
    }
    .people {
      width: 34%;
      position: absolute;
      bottom: 0%;
      left: 0%;
      z-index: 999;
    }
    .name {
      position: absolute;
      width: 50%;
      bottom: 8%;
      left: 30%;
    }
    .nmk-card {
      .tit {
        top: 4%;
        left: 35%;
      }
      .close {
        left: 12%;
        top: 10.5%;
      }
      .photo {
        top: 50.5%;
        border-color: #4ff73f;
      }
      .people {
        left: 2%;
      }
      .name {
        bottom: 6.5%;
      }
    }
    .wk-card {
      .tit {
        top: 7%;
        left: 60%;
      }
      .close {
        left: 12%;
        top: 10.6%;
      }
      .photo {
        top: 50.5%;
        border-color: #c53ff6;
      }
      .people {
        left: 2%;
      }
      .name {
        bottom: 6.5%;
      }
    }
    .m78-card {
      .tit {
        left: 1%;
        top: 60%;
      }
      .close {
        left: 74%;
        top: 8.6%;
      }
      .photo {
        top: 48.5%;
        border-color: #f83f44;
      }
      .people {
        width: 23%;
        left: 11%;
      }
      .name {
        left: 28%;
        bottom: 8.5%;
      }
    }
    .kx-card {
      .tit {
        left: 33%;
        top: 79%;
      }
      .close {
        left: 74%;
        top: 8.6%;
      }
      .photo {
        top: 48.5%;
        border-color: #3ff7df;
      }
      .name {
        left: 23%;
        top: 5.5%;
      }
    }
    .asgd-card {
      .tit {
        top: 79.5%;
        left: 53.5%;
      }
      .close {
        left: 74%;
        top: 8.6%;
      }
      .photo {
        top: 48.5%;
        border-color: #f3f515;
      }
      .people {
        left: 18%;
      }
      .name {
        left: 22%;
        top: 5.8%;
      }
    }
  }
}
</style>


