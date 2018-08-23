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
           <!-- :src="headImgUrl" -->
           <img 
              src="http://cdn.exe666.com/fe/marketing/img/internationalTrade/666.png"
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
            <img src="http://cdn.exe666.com/fe/marketing/img/internationalTrade/666.png"
              class="wx"> 
            <span class="score-num">1,131,223</span>
            <span class="score-tit">光年</span>
           </li>
           <li>
            <img 
              :src="baseUrl + 'two.png'+ this.$qiniuCompress()"
              class="wx-head" >
            <img src="http://cdn.exe666.com/fe/marketing/img/internationalTrade/666.png"
              class="wx"> 
            <span class="score-num">1,131,223</span>
            <span class="score-tit">光年</span>
           </li>
           <li style="border-bottom:3px solid #fcdb65;">
            <img 
              :src="baseUrl + 'three.png'+ this.$qiniuCompress()"
              class="wx-head" >
            <img src="http://cdn.exe666.com/fe/marketing/img/internationalTrade/666.png"
              class="wx"> 
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
    <img 
      :src="baseUrl + 'per.png'+ this.$qiniuCompress()"
      class="per" >
    <img 
      :src="baseUrl + 'rocket.png'+ this.$qiniuCompress()"
      class="rocket" >
  </div>
</template>

<script>
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  wechatShareTrack
} from 'services'
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
      hammerhigh: null,
      userId: null,
      score: null,
      headImgUrl: null,
      rank_url: process.env.SAAS_API + '/user/',
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
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get('user_id') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        //获取微信头像
        getWxUserInfo().then(r => {
          this.headImgUrl = r.data.headimgurl
        })
        this.score = this.$route.query.score
        this.hammerhigh = this.$route.query.hammerhigh
        this.userId = Cookies.get('user_id')
        this.getGradeList(this.userId)
      }
    },

    //获取排行榜
    getGradeList(userId) {
      let query = '?belong=' + this.hammerhigh + '&score=' + this.score
      this.$http
        .get(this.rank_url + userId + '/rank' + query)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/lightYear/';
@font-face {
  font-family: 'MyNewFont'; /*字体名称*/
  src: url('@{imageHost}ht.ttf'); /*字体源文件*/
}
@font-face {
  font-family: 'MyNewFont';
  src: url('../font/pinghei.eot');
  font-weight: normal;
  font-style: normal;
}
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
  .per {
    width: 60%;
    position: absolute;
    left: -30%;
    top: 3%;
  }
  .rocket {
    width: 24%;
    position: absolute;
    right: 3%;
    bottom: 0;
  }
  .rank {
    width: 80%;
    height: 82%;
    background-image: url('@{imageHost}kuang.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .top {
      width: 100%;
      height: 40%;
      position: relative;
      font-family: 'MyNewFont';
      .head-portrait {
        width: 28%;
        position: absolute;
        left: 50%;
        top: -13%;
        transform: translate(-50%, 0%);
        text-align: center;
        border: 5px solid #fcdb65;
        border-radius: 50%;
        .wx-head {
          width: 100%;
          border-radius: 50%;
        }
      }
      .num {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 7%;
        font-size: 26px;
        transform: translate(-50%, 15%);
        color: #fcdb65;
        font-size: 10vw;
      }
      .light-year {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 3%;
        transform: translate(-50%, 0%);
        color: #2ad7e7;
        font-size: 6.5vw;
      }
    }
    .bottom {
      width: 100%;
      height: 60%;
      position: relative;
      font-family: 'MyNewFont';
      font-size: 5vw;
      .score-rank {
        width: 100%;
        position: absolute;
        left: 10%;
        top: -30%;
        li {
          width: 80%;
          color: #fff;
          margin: 5px 0 2px 0;
          position: relative;
          .wx-head {
            width: 20%;
            margin: 0 5px;
          }
          .wx {
            width: 18%;
            position: absolute;
            left: 10%;
            top: 0;
            border-radius: 50%;
            z-index: -1;
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
