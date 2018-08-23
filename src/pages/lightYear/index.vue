<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'center.png'+ this.$qiniuCompress()"
      class="center" >
    <div class="rank">
       <div class="top">
         <div class="head-portrait">
           <img 
           
              :src="baseUrl + 'center.png'+ this.$qiniuCompress()"
              class="wx-head" >
         </div>
         <p class="num">1,131,223</p>
         <p class="light-year">光年</p>
       </div>
       <div class="bottom">
         <ul class="score-rank">
           <li>
            <img 
              :src="baseUrl + 'one.png'+ this.$qiniuCompress()"
              class="wx-head" >
            <span class="score-num">1,131,223</span>
            <span class="score-tit">光年</span>
           </li>
           <li>
            <img 
              :src="baseUrl + 'two.png'+ this.$qiniuCompress()"
              class="wx-head" >
            <span class="score-num">1,131,223</span>
            <span class="score-tit">光年</span>
           </li>
           <li style="border-bottom:3px solid #fcdb65;">
            <img 
              :src="baseUrl + 'three.png'+ this.$qiniuCompress()"
              class="wx-head" >
            <span class="score-num">1,131,223</span>
            <span class="score-tit">光年</span>
           </li>
           <li style="padding:5px 2px">
            <span class="ranking">4</span>
            <span class="score-num" >1,131,223</span>
            <span class="score-tit" >光年</span>
           </li>
           <li style="padding:5px 2px">
            <span class="ranking">4</span>
            <span class="score-num" >1,131,223</span>
            <span class="score-tit" >光年</span>
           </li>
           <li style="padding:5px 2px">
            <span class="ranking">4</span>
            <span class="score-num" >1,131,223</span>
            <span class="score-tit" >光年</span>
           </li>
         </ul>
       </div>
    </div>
  </div>
</template>

<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/lightYear/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: '',
      wxShareInfoValue: {
        title: '月满中秋 心愿祈福',
        desc: '家人有爱口难开？让星视度帮你把祝福送给你爱的人吧',
        link:
          'http://papi.xingstation.com/api/s/J62' +
          window.location.search +
          '&type=WeChat',
        imgUrl: cdnUrl + '/fe/marketing/img/lightYear/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/lightYear/';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background-image: url('@{imageHost}bg.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  .center {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .rank {
    width: 80%;
    height: 80%;
    background-image: url('@{imageHost}kuang.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .top {
      width: 100%;
      height: 40%;
      position: relative;
      .head-portrait {
        width: 30%;
        height: 42%;
        position: absolute;
        left: 50%;
        top: -13%;
        transform: translate(-50%, 0%);
        text-align: center;
        border: 5px solid #fcdb65;
        border-radius: 50%;
        .wx-head {
          width: 100%;
          //height: 100%;
          border-radius: 50%;
        }
      }
      .num {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 27%;
        transform: translate(-50%, 15%);
        color: #fcdb65;
      }
      .light-year {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, 0%);
        color: #2ad7e7;
      }
    }
    .bottom {
      width: 100%;
      height: 60%;
      position: relative;
      .score-rank {
        width: 100%;
        position: absolute;
        left: 10%;
        top: -30%;
        li {
          width: 80%;
          color: #fff;
          margin: 5px 0 2px 0;
          .wx-head {
            width: 20%;
            margin: 0 5px;
          }
          .score-num {
            margin: 0 5px;
          }
          .score-tit {
            margin: 0 5px;
          }
          .ranking {
            padding: 2px 10%;
          }
        }
      }
    }
  }
}
</style>
