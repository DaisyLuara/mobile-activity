<template>
  <div
    class="root"
    :style="style.root"
    >
    <img 
        :src="baseUrl + 'bg.jpeg'+ this.$qiniuCompress()"
        class="bg">
    <div class="t-1">
       <img 
        :src="baseUrl + 'title.png'+ this.$qiniuCompress()"
        class="t1">
    </div>
    <div class="t-2">
        <img 
        :src="baseUrl + 'section_1.png'+ this.$qiniuCompress()"
        class="t2-1">
        <img 
        :src="baseUrl + 'leaf.png'+ this.$qiniuCompress()"
        class="leaf-1">
        <img 
        :src="baseUrl + 'leaf2.png'+ this.$qiniuCompress()"
        class="leaf-2">
        <div class="button-1" v-show="button.buttonOne">
          <img 
            :src="baseUrl + 'prompt_1.png'+ this.$qiniuCompress()"
            class="p-1">
          <img 
            :src="baseUrl + 'button_1.png'+ this.$qiniuCompress()"
            class="b-1">
        </div>
        <div class="button-2" v-show="button.buttonTwo">
          <img 
            :src="baseUrl + 'prompt_1.png'+ this.$qiniuCompress()"
            class="p-1">
          <img 
            :src="baseUrl + 'wifi.gif'+ this.$qiniuCompress()"
            class="wifi">
          <img 
            :src="baseUrl + 'button_2.png'+ this.$qiniuCompress()"
            class="b-1">
        </div>
        <div class="button-3" v-show="button.buttonThree">
           <img 
            :src="baseUrl + 'prompt_2.png'+ this.$qiniuCompress()"
            class="p-1">
          <img 
            :src="baseUrl + 'button_3.png'+ this.$qiniuCompress()"
            class="b-1">
        </div>
    </div>
    <div class="t-3">
       <img 
        :src="baseUrl + 'section_2.png'+ this.$qiniuCompress()"
        class="t3-1">
       <img 
        :src="baseUrl + '777.png'+ this.$qiniuCompress()"
        class="photo">
        <img 
        :src="baseUrl + 'leaf3.png'+ this.$qiniuCompress()"
        class="leaf-3">
        <img 
        :src="baseUrl + 'leaf4.png'+ this.$qiniuCompress()"
        class="leaf-4">
        <img 
        :src="baseUrl + 'leaf5.png'+ this.$qiniuCompress()"
        class="leaf-5">
        <img 
        :src="baseUrl + 'leaf6.png'+ this.$qiniuCompress()"
        class="leaf-6">
        <div class="jiantou">
        <img 
        :src="baseUrl + 'arrow.png'+ this.$qiniuCompress()"
        class="arrow">
         <img 
        :src="baseUrl + 'prompt_3.png'+ this.$qiniuCompress()"
        class="prompt">
       </div>
    </div>
       
  </div>
</template>

<script>
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  getInfoById,
  getWxUserInfo,
  wechatShareTrack
} from 'services'
import { parseService } from 'services'
import { normalPages } from '../../mixins/normalPages'
const wx = require('weixin-js-sdk')
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/autumnWord/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      button: {
        buttonOne: false,
        buttonTwo: true,
        buttonThree: false
      },
      photo: '',
      isRecording: false,
      currentLocalId: null,
      wxShareInfoValue: {
        title: '月满中秋 心愿祈福',
        desc: '家人有爱口难开？让星视度帮你把祝福送给你爱的人吧',
        link: 'http://papi.xingstation.com/api/s/J62' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/autumnWord/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/autumnWord/';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  overflow-x: hidden;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .t-1 {
    width: 100%;
    position: relative;
    .t1 {
      width: 100%;
    }
  }
  .t-2 {
    width: 100%;
    position: relative;
    .t2-1 {
      width: 90%;
      margin-left: -8%;
    }
    .leaf-1 {
      width: 12%;
      position: absolute;
      right: 0;
      top: 24%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-2 {
      width: 9%;
      position: absolute;
      left: 7%;
      top: 0;
      animation: leaf 2s ease-out infinite forwards;
    }
    .button-1,
    .button-2,
    .button-3 {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      left: 0;
      top: 0;
      padding: 5% 0;
      .p-1 {
        width: 48%;
      }
      .b-1 {
        width: 60%;
        margin-top: 3%;
      }
      .wifi {
        width: 7%;
        position: absolute;
        left: 27%;
        top: 47%;
      }
    }
  }
  .t-3 {
    width: 100%;
    margin: 5% 0;
    position: relative;
    .t3-1 {
      width: 85%;
    }
    .leaf-3 {
      width: 10%;
      position: absolute;
      right: 3%;
      top: -1%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-4 {
      width: 7%;
      position: absolute;
      left: 5%;
      top: -7%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-5 {
      width: 12%;
      position: absolute;
      left: 4%;
      top: 24%;
      animation: leaf 2s ease-out infinite forwards;
    }
    .leaf-6 {
      width: 8%;
      position: absolute;
      right: 6%;
      top: 50%;
      animation: leaf 2s ease-out infinite forwards;
    }

    .photo {
      width: 68%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 4%);
      border-radius: 5%;
    }
    .jiantou {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      animation: arrow 1.2s linear infinite alternate;
      .arrow {
        width: 7%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 27%);
      }
      .prompt {
        width: 60%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 154%);
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
@keyframes leaf {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  to {
    transform: scale(1.1, 1.1);
  }
}
</style>
