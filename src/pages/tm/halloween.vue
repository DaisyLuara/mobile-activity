<template>
  <div 
    :style="style.root" 
    class="root">
    <!-- tab切换区域显示-->
    <div 
      class="group">
      <ul>
        <li class="one" v-show="tab.one" >
           <img 
            :src="baseUrl + 'card01.png'+ this.$qiniuCompress()"
            class="card01">
          <!-- 未解锁 -->
          <img 
            v-if="!gameData.projectOne"
            :src="baseUrl + 'card01_unlocked.png'+ this.$qiniuCompress()"
            class="card01-unlocked">
          <!-- 已解锁 -->
          <img 
            v-if="gameData.projectOne" 
            :src="photo + this.$qiniuCompress()"
            class="photo">
        </li>
        <li class="two" v-show="tab.two">
           <img 
            :src="baseUrl + 'card02.png'+ this.$qiniuCompress()"
            class="card02">
          <!-- 未解锁 -->
          <img 
            v-if="!gameData.projectTwo"
            :src="baseUrl + 'card02_unlocked.png'+ this.$qiniuCompress()"
            class="card02-unlocked">
          <!-- 已解锁 -->
          <img 
            v-if="gameData.projectTwo"
            :src="photo + this.$qiniuCompress()"
            class="photo">
        </li>
        <li class="three" v-show="tab.three" >
           <img 
            :src="baseUrl + 'card03.png'+ this.$qiniuCompress()"
            class="card03">
          <!-- 未解锁 -->
          <img 
            v-if="!gameData.projectThree"
            :src="baseUrl + 'card03_unlocked.png'+ this.$qiniuCompress()"
            class="card03-unlocked">
          <!-- 已解锁 -->
          <img 
            v-if="gameData.projectThree" 
            :src="photo + this.$qiniuCompress()"
            class="photo">
        </li>
      </ul>
      <div class="button">
        <a  @click.self="tabClick('PaPaJohnsPizza')">
          <img 
            v-if="gameData.projectOne"
            :src="baseUrl + 'card01_tag01.png'+ this.$qiniuCompress()"
            class="card01-tag01">
          <img 
            v-if="!gameData.projectOne"
            :src="baseUrl + 'card01_tag02.png'+ this.$qiniuCompress()"
            class="card01-tag02">
        </a>
         <a  @click.self="tabClick('huawei')">
          <img 
            v-if="gameData.projectTwo"
            :src="baseUrl + 'card02_tag01.png'+ this.$qiniuCompress()"
            class="card02-tag01">
          <img 
            v-if="!gameData.projectTwo"
            :src="baseUrl + 'card02_tag02.png'+ this.$qiniuCompress()"
            class="card02-tag02">
        </a>
        <a  @click.self="tabClick('childDream')">
          <img 
            v-if="gameData.projectThree"
            :src="baseUrl + 'card03_tag01.png'+ this.$qiniuCompress()"
            class="card03-tag01">
          <img 
            v-if="!gameData.projectThree"
            :src="baseUrl + 'card03_tag02.png'+ this.$qiniuCompress()"
            class="card03-tag02">
        </a>
      </div>
    </div>
    <!-- 解锁区域 -->
    <div class="unlockArea">
      <div class="unlock">
        <span v-if="gameData.projectOne">
        <img 
            :src="baseUrl + 'game01_1.png'+ this.$qiniuCompress()"
            class="game01-1">
        <img 
            :src="baseUrl + 'great.png'+ this.$qiniuCompress()"
            class="great">
        </span>
        <span v-if="!gameData.projectOne">
        <img 
            :src="baseUrl + 'game01_2.png'+ this.$qiniuCompress()"
            class="game01-2">
        <img 
            :src="baseUrl + 'question_mark.png'+ this.$qiniuCompress()"
            class="question">
        </span>
      </div>
      <div class="unlock">
        <span v-if="gameData.projectTwo">
        <img 
            :src="baseUrl + 'game02_1.png'+ this.$qiniuCompress()"
            class="game02-1">
        <img 
            :src="baseUrl + 'great.png'+ this.$qiniuCompress()"
            class="great">
        <!-- <b class="font">{{score}}</b> -->
      </span>
      <span v-if="!gameData.projectTwo">
        <img 
            :src="baseUrl + 'game02_2.png'+ this.$qiniuCompress()"
            class="game02-2">
        <img 
            :src="baseUrl + 'question_mark.png'+ this.$qiniuCompress()"
            class="question">
        </span>
      </div>
     <div class="unlock">
      <span v-if="gameData.projectThree">
        <img 
            :src="baseUrl + 'game03_1.png'+ this.$qiniuCompress()"
            class="game03-1">
        <img 
            :src="baseUrl + 'great.png'+ this.$qiniuCompress()"
            class="great">
        <!-- <b class="font">{{score}}</b> -->
      </span>
      <span v-if="!gameData.projectThree">
        <img 
            :src="baseUrl + 'game03_2.png'+ this.$qiniuCompress()"
            class="game03-2">
        <img 
            :src="baseUrl + 'question_mark.png'+ this.$qiniuCompress()"
            class="question">
        </span>
     </div>  
    </div>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame,
  getGame
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/halloween/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: null,
      isClick: true,
      params: {
        deUrl:
          'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/;',
        userId: null,
        belong: this.$route.query.utm_campaign,
        id: this.$route.query.id,
        score: this.$route.query.score
      },
      score: this.$route.query.score,
      tab: {
        one: true,
        two: false,
        three: false
      },
      // 节目数据，是否已玩
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false
      },
      //分享
      wxShareInfoValue: {
        title: '中秋国庆星乐享，1000份好礼“刷脸”大派送！',
        desc: '大融城-星视度嗨玩节，福利优惠拿不停。',
        link: 'http://papi.xingstation.com/api/s/nZR' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/halloween/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.tabClick(this.params.belong)
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
    tabClick(type) {
      console.log(type)
      if (type === 'PaPaJohnsPizza') {
        this.tab.one = true
        this.tab.two = false
        this.tab.three = false
      }
      if (type === 'huawei') {
        this.tab.one = false
        this.tab.two = true
        this.tab.three = false
      }
      if (type === 'childDream') {
        this.tab.one = false
        this.tab.two = false
        this.tab.three = true
      }
    },
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.params.userId = Cookies.get('user_id')
        this.params.belong = this.$route.query.utm_campaign
        this.tabClick(this.params.belong)
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.params.belong,
        image_url: this.params.deUrl,
        qiniu_id: this.params.id,
        score: this.params.score
      }
      userGame(args, this.params.userId)
        .then(res => {
          console.log(res)
          console.log('-------------')
          this.getGame()
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame() {
      let args = {
        withCredentials: true
      }
      let userId = this.params.userId
      getGame(args, userId)
        .then(res => {
          console.log('++++++++')
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list, userId) {
      let data = list
      console.log(list)
      data.map(r => {
        // 节目1，搞怪万圣节
        if (r.belong === 'PaPaJohnsPizza') {
          this.gameData.projectOne = true
        }
        // 节目2，不给糖就捣蛋
        if (r.belong === 'huawei') {
          this.gameData.projectTwo = true
        }
        // 节目3,抓鬼大冒险
        if (r.belong === 'childDream') {
          this.gameData.projectThree = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/halloween/';
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
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: url('@{imageHost}bg.png');
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  .group {
    width: 100%;
    position: relative;
    ul {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, 0);
      margin-top: 15%;
      li {
        img {
          width: 85%;
        }
        .card01-unlocked,
        .card02-unlocked,
        .card03-unlocked {
          width: 40%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .photo {
          width: 81%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50.2%);
        }
      }
    }
    .button {
      width: 32%;
      position: absolute;
      right: -15.9%;
      margin-top: 15%;
      a {
        display: block;
        img {
          width: 30%;
          display: block;
        }
      }
    }
  }
  .unlockArea {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 2%;
    display: flex;
    justify-content: space-around;
    padding: 0 5%;
    .unlock {
      position: relative;
      .game01-1,
      .game02-1,
      .game03-1 {
        width: 100%;
      }
      .great {
        width: 70%;
        position: absolute;
        left: 37%;
        top: 12%;
        z-index: 9;
      }
      .question {
        width: 32%;
        position: absolute;
        left: 55%;
        top: 10%;
      }
    }
  }
}
</style>


