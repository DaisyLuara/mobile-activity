<template>
  <div 
    :style="style.root"
    class="content">
    <!-- 顶部标题 -->
    <!-- <div 
      class="title">
      <img
        :src="base+'title.png'">
    </div> -->
    <!-- 欢乐积攒有惊喜 四级联动显示-->
    <!-- :src="base+'a.png'+this.$qiniuCompress()" -->
    <div 
      class="block one">
      <img
        src="http://cdn.exe666.com/fe/marketing/img/fourProject/bg.png"
        class="bg">
      <img
        v-show="gameData.projectOne"
        src="http://cdn.exe666.com/fe/marketing/img/fourProject/a.png"
        class="done1">
      <img
        v-show="gameData.projectTwo"
        src="http://cdn.exe666.com/fe/marketing/img/fourProject/b.png"
        class="done2">
      <img
        v-show="gameData.projectThree"
        src="http://cdn.exe666.com/fe/marketing/img/fourProject/c.png"
        class="done3">
      <img
        v-show="gameData.projectFour"
        src="http://cdn.exe666.com/fe/marketing/img/fourProject/d.png"
        class="done4">
    </div>
    <!-- 1元爆品 -->
    <!-- <div 
      class="block two">
      <ul 
        class="one-list">
        <li 
          v-for="item in list" 
          :key="item.id"
          class="one-list-item"></li>
      </ul>
    </div> -->
    <!-- 节目主打 -->
    <!-- <div 
      class="block three">
      <ul 
        class="one-list">
        <li 
          v-for="item in list" 
          :key="item.id"
          class="one-list-item"></li>
      </ul>
    </div> -->
    <!-- 节目必抢 -->
    <!-- <div 
      class="block four">
      <ul 
        class="one-list">
        <li 
          v-for="item in list" 
          :key="item.id"
          class="one-list-item"></li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame,
  getGame,
  setParameter
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
      base: IMG_SERVER + '/image/tm/guoqing/',
      params: {
        deUrl:
          'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0',
        userId: null,
        belong: null,
        id: this.$route.query.id
      },
      // 节目数据，是否已玩
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false,
        projectFour: false,
        randomNum: ''
      },
      product_list: {
        url: ['', '', '', ''],
        name: [],
        price: []
      },
      //分享
      wxShareInfoValue: {
        title: '',
        desc: '',
        link: '' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/tm/guoqing/share.png',
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
        this.params.userId = Cookies.get('user_id')
        this.params.belong = this.$route.query.utm_campaign
        this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.params.belong,
        image_url: this.params.deUrl,
        qiniu_id: this.params.id
      }
      userGame(args, this.params.userId)
        .then(res => {
          console.log(res)
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
        // 节目1，品牌
        if (r.belong === 'BirthdayPurple') {
          this.gameData.projectOne = true
          alert('BirthdayPurple')
        }
        // 节目2，品牌
        if (r.belong === 'BirthdayYellow') {
          this.gameData.projectTwo = true
          alert('BirthdayYellow')
        }
        // 节目3，品牌
        if (r.belong === 'BirthdayGreen') {
          this.gameData.projectThree = true
          alert('BirthdayGreen')
        }
        // 节目4，品牌
        if (r.belong === 'BirthdayBlue') {
          this.gameData.projectFour = true
          alert('BirthdayBlue')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/*声明 WebFont*/
@font-face {
  font-family: 'mutouren';
  src: url('http://p22vy0aug.bkt.clouddn.com/font/mutouren.ttf');
  src: url('http://p22vy0aug.bkt.clouddn.com/font/mutouren.eot'),
    url('http://p22vy0aug.bkt.clouddn.com/font/mutouren.woff'),
    url('http://p22vy0aug.bkt.clouddn.com/font/mutouren.ttf'),
    url('http://p22vy0aug.bkt.clouddn.com/font/mutouren.svg');
  font-weight: normal;
  font-style: normal;
}

@base: 'http://p22vy0aug.bkt.clouddn.com/image/tm/guoqing/';
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
  font-size: 0;
}
a {
  display: inline-block;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #fffff5;
  max-width: 750px;
  .block {
    width: 100%;
    overflow-x: hidden;
    position: relative;
  }
  .one {
    .bg {
      position: relative;
      z-index: 0;
    }
    .done1 {
      position: absolute;
      top: 19%;
      left: 0;
    }
    .done2 {
      position: absolute;
      top: 38%;
      left: 0;
    }
    .done3 {
      position: absolute;
      top: 58%;
      left: 0;
    }
    .done4 {
      position: absolute;
      top: 78%;
      left: 0;
    }
  }
}
</style>


