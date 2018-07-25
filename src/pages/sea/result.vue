<template>
    <div class="content" :style="style.root">
        <div class="one">
            <img class="mImg" :src="mImg"/>
            <img class="save" :src="baseUrl + 'save.png'" v-show="second"/>
        </div>
        <div class="two" v-show="second">
            <img class="title" :src="baseUrl + 'titte.png'"/>
            <div class="tabs">
              <div class="tab">
                <a class="atab" v-for="(item,index) in Object.keys(tabs)" :key="item.id" @click.prevent="tabClick(item)"><img :src="baseUrl + (index+1) +'.png'"></a>
              </div>
              <div class="tab_content" v-for="(item,index) in tabs" :key="item.id" v-show="tabs[index]"><img :src="baseUrl + index + '.png'"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'
const IMGURL = 'http://p22vy0aug.bkt.clouddn.com/image/'
export default {
  data() {
    return {
      baseUrl: IMGURL + 'sea/page2/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      mImg: null,
      second: false,
      tabs: {
        a: true,
        b: false,
        c: false,
        d: false
      },
      //微信分享
      wxShareInfo: {
        title: '来自海洋的问候',
        desc: '更多海洋知识小课堂',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/sea/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.getInfoById()
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          let img = new Image()
          let that = this
          img.src = this.mImg
          img.onload = function() {
            that.second = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    tabClick(item) {
      Object.keys(this.tabs).forEach(element => {
        this.tabs[element] = false
      })
      this.tabs[item] = true
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/sea/page2/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  background-color: #00051b;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #00051b;
  background-image: url('@{imgUrl}one_left.png'), url('@{imgUrl}one_right.png'),
    url('@{imgUrl}two_left.png'), url('@{imgUrl}two_right.png'),
    url('@{imgUrl}bg_head.png'), url('@{imgUrl}bg_bottom.png');
  background-position: left 22%, right 12%, left 72%, 102.5% 76%, center top,
    center bottom;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat,
    no-repeat;
  background-size: 13% auto, 13% auto, 15% auto, 15% auto, 100% auto, 100% auto;
  .one {
    position: relative;
    width: 100%;
    img {
      margin: 0 auto;
    }
    .mImg {
      width: 70%;
      margin-top: 10%;
      pointer-events: auto;
      user-select: auto;
    }
    .save {
      width: 70%;
      margin: 0 auto;
      margin-top: 5%;
      margin-bottom: 3%;
    }
  }
  .two {
    width: 100%;
    position: relative;
    .title {
      width: 75%;
    }
    .tabs {
      width: 66%;
      margin: 0 auto;
      .tab {
        width: 100%;
        overflow: hidden;
        .atab {
          display: inline-block;
          width: 25%;
          img {
            max-width: 100%;
            vertical-align: bottom;
          }
        }
      }
      .tab_content {
        width: 100%;
        position: relative;
        margin-bottom: 50%;
        img {
          max-width: 100%;
          pointer-events: auto;
          user-select: auto;
        }
      }
    }
  }
}
</style>
