<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="one">
      <img 
        :src="base+'bg1.png'"
        class="bg">
      <img 
        :src="base+'gift.png'"
        class="gift">
      <img 
        :src="origin + 'people/people' + people_type + '.png'"
        class="people">
      <span
        class="text">{{ text }}</span>
      <img 
        :src="base+'btn1.png'"
        class="btn">
      <div 
        class="pop">
        <ul>
          <li 
            v-for="item in 9" 
            :key="item.id">
            <div 
              v-if="item==5"/>
            <div
              v-else 
              class="sound-icon">
              <a 
                class="iconbox"
                @click="playVoice">
                <img
                  :src="base + 'icon' + item + '.png'"
                  class="icon">
                <label>{{ music_text[item] }}</label>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div 
      class="two">
      <img 
        :src="base+'bg2.png'"
        class="bg">
      <img 
        :src="base + 'pic.png'"
        class="frame">
      <img 
        :src="photo"
        class="photo">
      <div 
        class="task-group">
        <img 
          :src="origin + 'proj/' + task.left + '.png'"
          class="left">
        <img 
          :src="origin +'proj/' + task.right + '.png'"
          class="right">
      </div>
    </div>
    
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  $wechat,
  wechatShareTrack,
  getWxUserInfo,
  createGame,
  getGame
} from 'services'
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
      origin: IMG_SERVER + '/image/zhongqiu/',
      base: IMG_SERVER + '/image/zhongqiu/2/',
      userId: null,
      headImgUrl: null,
      mask: false,
      people_type: this.$route.query.people_type,
      belong: this.$route.query.utm_campaign,
      text: '龙虾蛋黄',
      music_text: [
        '',
        '萝莉',
        '大叔',
        '搞怪',
        '东北',
        '',
        '粤语',
        '龟速',
        '英语',
        '机器'
      ],
      task: {
        left: '11',
        right: '33'
      },
      photo: null,
      //微信分享
      wxShareInfoValue: {
        title: '中秋快乐',
        desc: '我亲手做的月饼，你敢吃么？',
        link: '' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/1/share.png',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
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
        this.userId = Cookies.get('user_id')
        this.createGame(this.belong, this.userId)
      }
    },
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          this.getGame(userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGame(userId) {
      let that = this
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    projectStatus(list, userId) {
      let data = list
      data.map(r => {
        if (r.belong === 'MoonCakeFactory') {
          this.task.left = '1'
        }
        if (r.belong === 'WhoTakeMoonCake') {
          this.task.left = '3'
        }
      })
    },
    handlePost() {
      let oid = this.$route.query.utm_source
      let belong = this.belong
      let id = this.$route.query.id
      let voice = ''
      let url = {
        cakeID: 0,
        voice: voice,
        people_type: this.people
      }
      this.$http
        .post(
          'http://exelook.com:8010/pushdiv/?oid=' +
            oid +
            '&belong=WhoTakeMoonCake' +
            '&id=' +
            id +
            '&url=' +
            Json.stringify(url) +
            '&name=&image=&api=json'
        )
        .then(res => {})
        .catch(err => {})
    },
    playVoice(e) {
      console.log(e.target)
    }
  }
}
</script>
<style lang="less" scoped>
@base: 'http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/2/';
/*声明 WebFont*/
@font-face {
  font-family: 'huakang';
  src: url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/huakang.ttf');
  src: url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/huakang.eot'),
    url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/huakang.woff'),
    url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/huakang.ttf'),
    url('http://p22vy0aug.bkt.clouddn.com/image/zhongqiu/font/huakang.svg');
  font-weight: normal;
  font-style: normal;
}

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
  text-align: center;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #281765;
  position: relative;
  background-color: #69339b;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .one {
    position: relative;
    width: 100%;
    overflow-x: hidden;

    .gift {
      width: 72%;
      position: absolute;
      top: 26%;
      left: 23%;
      z-index: 9;
    }
    .people {
      width: 16%;
      position: absolute;
      top: 53.18%;
      left: 28.2%;
      border-radius: 50%;
      z-index: 99;
      transform: rotate(10deg);
    }
    .text {
      position: absolute;
      top: 37%;
      left: 67%;
      font-size: 5vw;
      color: #9f5b38;
      z-index: 999;
    }
    .btn {
      width: 50%;
      position: absolute;
      bottom: 14.5%;
      left: 50%;
      transform: translateX(-50%);
    }
    .pop {
      position: absolute;
      top: 16%;
      left: 50%;
      transform: translateX(-50%);
      width: 78%;
      background-image: url('@{base}out.png');
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 9999;
      ul {
        width: 100%;
        display: inline-block;
        padding-top: 3%;
        padding-bottom: 7%;
        li {
          display: inline-block;
          width: 30%;
          height: 100%;
          padding: 5px 0px;

          .sound-icon {
            padding: 5px;
            position: relative;
            .iconbox {
              display: inline-block;
              width: 100%;
              position: relative;
            }
            label {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: -20%;
              background-image: url('@{base}icon bg.png');
              background-position: center center;
              background-size: 100% auto;
              background-repeat: no-repeat;
              font-family: 'huakang';
              font-size: 0.5vw;
              text-align: center;
              color: #ffcb4f;
              width: 60%;
              letter-spacing: 1px;
              padding: 5px 0;
            }
          }
          .music-icon {
            padding: 5px;
          }
        }
      }
    }
  }
  .two {
    position: relative;
    .photo {
      width: 57%;
      position: absolute;
      top: 3.7%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      pointer-events: auto;
      user-select: auto;
    }
    .frame {
      width: 68%;
      position: absolute;
      top: 0%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
    .task-group {
      width: 100%;
      overflow: hidden;
      position: absolute;
      bottom: 8%;
      z-index: 9;
      img {
        width: 46%;
      }
      .left {
        float: left;
        margin-left: 3%;
      }
      .right {
        float: right;
        margin-right: 3%;
      }
    }
  }
}
</style>


