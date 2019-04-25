<template>
  <div 
    :class="{content:true,addbg:Boolean(photo)}" 
    :style="style.root">
    <div class="one">
      <img 
        :src="photo" 
        class="mImg">
      <img 
        v-show="Boolean(photo)" 
        :src="baseUrl + 'save.png'" 
        class="save">
    </div>
    <div 
      v-show="Boolean(photo)" 
      class="two">
      <img 
        :src="baseUrl + 'titte.png'" 
        class="title">
      <div class="tabs">
        <div class="tab">
          <a 
            v-for="(item,index) in Object.keys(tabs)" 
            :key="item.id" 
            class="atab" 
            @click.prevent="tabClick(item)"><img :src="baseUrl + (index+1) +'.png'"></a>
        </div>
        <div 
          v-for="(item,index) in tabs" 
          v-show="tabs[index]" 
          :key="item.id" 
          class="tab_content"><img :src="baseUrl + index + '.png'"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMGURL = process.env.CDN_URL + '/image/'
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: IMGURL + 'sea/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      photo: null,
      tabs: {
        a: true,
        b: false,
        c: false,
        d: false
      },
      //微信分享
      wxShareInfoValue: {
        title: '来自海洋的问候',
        desc: '更多海洋知识小课堂',
        link: process.env.AD_API+'/api/s/0v' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/image/sea/share.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {},
  methods: {
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
@imgUrl: 'http://cdn.xingstation.cn/image/sea/';
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
.addbg {
  background-image: url('@{imgUrl}one_left.png'), url('@{imgUrl}one_right.png'),
    url('@{imgUrl}two_left.png'), url('@{imgUrl}two_right.png'),
    url('@{imgUrl}bg_head.png'), url('@{imgUrl}bg_bottom.png');
  background-position: left 22%, right 12%, left 72%, 102.5% 76%, center top,
    center bottom;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat,
    no-repeat;
  background-size: 13% auto, 13% auto, 15% auto, 15% auto, 100% auto, 100% auto;
}
.content {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #00051b;

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
