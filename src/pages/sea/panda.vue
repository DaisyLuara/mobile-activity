<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="main">
      <img 
        :src="base+'title.png'"
        class="title">
      <img 
        :src="base+'light.png'"
        class="light">
      <img
        :src="base+'frame.png'"
        class="frame">
      <img 
        :src="photo"
        class="photo">
      <img 
        :src="photo"
        class="photo top">
      <!-- 熊猫 -->
      <img
        :src="base+'panda1.png'"
        :class="{panda1:true,todo1:todo1}">
      <img
        :src="base+'panda2.png'"
        :class="{panda2:true,todo2:todo2}">
      <img
        :src="base+'panda3.png'"
        :class="{panda3:true,todo3:todo3}">
      <img
        :src="base+'panda4.png'"
        :class="{panda4:true,todo4:todo4}">
    </div>
    <img 
      v-show="Boolean(photo)"
      :src="base+'press.png'"
      class="press">
    <img 
      v-show="Boolean(photo)"
      :src="base+'shadow.png'"
      class="shadow">
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const IMG_SERVER = 'http://p22vy0aug.bkt.clouddn.com'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: IMG_SERVER + '/image/panda/',
      photo: null,
      //分享
      wxShareInfoValue: {
        title: '剪刀手熊猫',
        desc: '它，归隐许久，重回江湖',
        link: 'http://papi.xingstation.com/api/s/ERv' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/panda/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/panda/';
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
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url('@{imgUrl}back.png');
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main {
    width: 100%;
    overflow-x: hidden;
    position: relative;
    z-index: 0;
    .photo {
      width: 59%;
      position: absolute;
      top: 16.5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .top {
      z-index: 99999;
      opacity: 0;
    }
    .light {
      width: 100%;
      position: relative;
      z-index: 99;
      margin-top: -15%;
    }
    .title {
      width: 94%;
      position: absolute;
      top: -2%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
    }
    .frame {
      width: 98%;
      position: absolute;
      top: 5.5%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }
    .panda1 {
      width: 20%;
      position: absolute;
      top: 68%;
      left: 4%;
      z-index: 0;
      animation: torotate 0.6s linear 1 forwards;
    }
    .panda2 {
      width: 20%;
      position: absolute;
      top: 58%;
      // left: 4.5%;
      z-index: 0;
      animation: toleft 0.3s linear 1 forwards;
    }
    .panda3 {
      width: 20%;
      position: absolute;
      top: 74%;
      // left: 77%;
      z-index: 0;
      animation: toright 0.6s linear 1 forwards;
    }
    .panda4 {
      width: 18%;
      position: absolute;
      // top: 20%;
      left: 78%;
      z-index: 9999;
      animation: tobottom 0.6s linear 1 forwards;
    }
  }
  .press {
    width: 55%;
    position: relative;
    z-index: 99;
    margin-top: -9%;
  }
  .shadow {
    width: 88%;
    position: relative;
    z-index: 9;
    margin-top: -6%;
  }
}
@keyframes tobottom {
  0% {
    top: 20%;
  }
  100% {
    top: 35%;
  }
}
@keyframes toright {
  0% {
    left: 60%;
  }
  100% {
    left: 77%;
  }
}
@keyframes toleft {
  0% {
    left: 10%;
  }
  100% {
    left: 4.5%;
  }
}
@keyframes torotate {
  0% {
    left: 10%;
    transform: rotate(90deg);
  }
  100% {
    left: 4%;
    transform: rotate(0deg);
  }
}
</style>


