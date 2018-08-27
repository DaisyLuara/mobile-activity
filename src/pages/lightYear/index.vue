<template>
  <div
    :style="style.root" 
    class="root">
    <img 
      :src="baseUrl + 'center.png'+ this.$qiniuCompress()"
      class="center" >
    <div 
      :style="style.rank" 
      class="rank">
       <div class="top">
         <div class="head-portrait">
           <!-- :src="headImgUrl" -->
           <img 
              :src="headImgUrl"
              class="wx-head" >
         </div>
         <p class="num">{{handleScore(score+'',3)}}</p>
         <p class="light-year">光年</p>
       </div>
       <div class="bottom">
         <ul class="score-rank1">
           <li v-for="(item,index) in data"
              :key="index"
              v-if="index<3">
             <div class="header">
              <img 
              :src="baseUrl + 'one.png'"
              class="wx-head" >
             <img :src="item.headimgurl"
              class="wx"> 
             </div>
            <span class="score-num">{{item.score}}</span>
            <span class="score-tit">光年</span>
           </li>
         </ul>
         <ul class="score-rank2">
           <li v-for="(item,index) in data"
              :key="index"
              v-if="index>=3">
             <div class="header">
              <span class="ranking">{{index+1}}</span>
             </div>
            <span class="score-num" :class="{'active':item.userId===userId?true:false}">{{item.score}}</span>
            <span class="score-tit" :class="{'active':item.userId===userId?true:false}">光年</span>
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
  getWxUserInfo,
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
        },
        rank: {
          height: window.innerWidth * 1050 / 750 + 'px'
        }
      },
      photo: '',
      hammerhigh: null,
      userId: null,
      score: null,
      headImgUrl: null,
      rank_url: process.env.SAAS_API + '/game/rank',
      wxShareInfoValue: {
        title: ' Rocket go',
        desc: '穿越光年 探索宇宙 一锤搞定',
        link:
          'http://papi.xingstation.com/api/s/J62' +
          window.location.search +
          '&type=WeChat',
        imgUrl: cdnUrl + '/fe/marketing/img/lightYear/icon.png',
        success: () => {
          wechatShareTrack()
        }
      },
      data: []
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
          console.log(r.data)
          this.headImgUrl = r.data.headimgurl
        })
        this.score = this.$route.query.score
        this.hammerhigh = this.$route.query.hammerhigh
        this.userId = Cookies.get('user_id')
        this.uploadScore()
      }
    },
    /**
     * param 分数值
     * scope 范围
     */
    handleScore(param, scope) {
      var remainder = 0
      var integer = 0
      remainder = (param + '').length % scope
      integer = Math.floor((param + '').length / scope)
      var flag = ''
      for (var i = 1; remainder > 0 ? i < integer + 1 : i < integer; i++) {
        flag =
          ',' + param.substring(param.length - 1 * scope, param.length) + flag
        param = param.substring(0, param.length - 1 * scope)
      }
      if (param.length > 0) {
        flag = param + flag
      }
      return flag
    },
    handleGender(element) {
      switch (element.gender) {
        case 0:
          element.headimgurl = this.baseUrl + 'man.png'
          break
        default:
          element.headimgurl = this.baseUrl + 'women.png'
          break
      }
    },
    //获取排行榜
    getGradeList() {
      let query = '?belong=' + this.hammerhigh
      this.$http
        .get(this.rank_url + query)
        .then(res => {
          console.log(res)
          this.data = res.data.data.slice(0, 10)
          if (this.data.length > 0) {
            this.data.forEach(element => {
              element.score = this.handleScore(element.score, 3)
              //区分男女
              if (element.headimgurl === '' || element.headimgurl === null) {
                this.handleGender(element)
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //上传分数
    uploadScore() {
      let args = {
        belong: this.hammerhigh,
        gender: this.$route.query.sex,
        image_url: '',
        score: this.score,
        qiniu_id: this.$route.query.id
      }
      userGame(args, this.userId)
        .then(res => {
          console.log(res)
          console.log('上传成功')
          this.getGradeList()
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/lightYear/';
@font-face {
  font-family: 'MyNewFont'; /*字体名称*/
  src: url('@{imageHost}ht2.ttf'); /*字体源文件*/
}
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background-image: url('@{imageHost}bg.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: hidden;
  .active {
    color: #fcdb65;
  }
  .center {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .per {
    width: 58%;
    position: absolute;
    left: -30%;
    top: -2%;
  }
  .rocket {
    width: 24%;
    position: absolute;
    right: 3%;
    bottom: 0;
  }
  .rank {
    width: 80%;
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
        top: 36%;
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
      .score-rank1 {
        width: 100%;
        position: relative;
        left: 10%;
        top: -28%;
        text-align: left;
        li:last-child {
          border-bottom: 2px solid #fcdb65;
        }
        li {
          width: 80%;
          color: #fff;
          .header {
            display: inline-block;
            position: relative;
            text-align: center;
            width: 30%;
            .wx-head {
              width: 55%;
            }
            .wx {
              width: 45%;
              position: absolute;
              left: 27%;
              top: 0;
              border-radius: 50%;
              z-index: -1;
            }
          }
          .score-num {
            display: inline-block;
            width: 34%;
          }
          .score-tit {
            position: relative;
            right: -5%;
            top: 0;
          }
          .ranking {
            padding: 2px 13%;
          }
        }
      }
      .score-rank2 {
        width: 100%;
        position: relative;
        left: -3%;
        top: -25%;
        li {
          width: 80%;
          color: #fff;
          text-align: left;
          margin-bottom: 1.5%;
          .header {
            display: inline-block;
            position: relative;
            text-align: right;
            width: 32.9%;
          }
          .score-num {
            padding: 0 13%;
            display: inline-block;
            width: 44%;
          }
          .score-tit {
            position: relative;
            right: -8%;
            top: 0;
          }
          .ranking {
            display: inline-block;
            color: #fcdb65;
          }
        }
      }
    }
  }
}
</style>
