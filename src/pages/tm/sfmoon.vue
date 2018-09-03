<template>
  <div 
    :style="style.root"
    class="content">
    <div 
      class="picture">
      <img
        :src="base+'frame.png'"
        class="frame">
      <img
        :src="photo + this.$qiniuCompress()"
        class="photo">
    </div>
    <img
      :src="base+'save.png'"
      class="save">
    <div
      class="coup">
      <a 
        :href="link.link1"
        class="link1">
        <img
          :src="base+'coupon1.png'">
      </a>
      <img
        :src="base+'rule1.png'"
        class="rule">
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
      base: IMG_SERVER + '/image/sfmoon/',
      photo: null,
      link: {
        link1: 'http://oramage.com/project/sfmc/register'
      },
      //分享
      wxShareInfoValue: {
        title: '中秋豪礼 味你而来',
        desc: '',
        link: 'http://papi.xingstation.com/api/s/W6J' + window.location.search,
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/sfmoon/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
@base: 'http://p22vy0aug.bkt.clouddn.com/image/sfmoon/';
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
img {
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-image: url('@{base}bg.png');
  background-position: center top;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .picture {
    width: 73%;
    margin-top: 7%;
    position: relative;
    .frame {
      position: relative;
      width: 100%;
      z-index: 0;
    }
    .photo {
      width: 93%;
      pointer-events: auto;
      user-select: auto;
      position: absolute;
      top: 1.8%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
  }
  .save {
    width: 65.5%;
    margin-top: 5%;
    margin-bottom: 2%;
  }
  .coup {
    width: 76%;
    img {
      max-width: 100%;
    }
    .link1 {
      width: 100%;
      display: inline-block;
    }
    .rule {
      margin-top: 5%;
      margin-bottom: 8%;
    }
  }
}
</style>


