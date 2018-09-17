<template>
  <div 
    :style="style.root"
    class="content">
    <!--  -->
    <div 
      class="block one">
      <ul 
        class="one-list">
        <li 
          v-for="item in list" 
          :key="item.id"
          class="one-list-item">
          <a>
            <img
              :src="base+''">
          </a>
        </li>
      </ul>
    </div>
    <!--  -->
    <div 
      class="block two">
      <ul 
        class="one-list">
        <li 
          v-for="item in list" 
          :key="item.id"
          class="one-list-item"></li>
      </ul>
    </div>
    <!--  -->
    <div 
      class="block three">
      <ul 
        class="one-list">
        <li 
          v-for="item in list" 
          :key="item.id"
          class="one-list-item"></li>
      </ul>
    </div>
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
      base: IMG_SERVER + '/image/tm/guoqing/',
      all: {
        product_list: {
          url: ['', '', '', ''],
          name: [],
          price: []
        }
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
}
</style>


