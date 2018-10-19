<template>
  <div
    style="style.root"
    class="content">
    <img
      :src="base + 'bg.png'"
      class="bg">
    <span
      class="score">{{ score }}</span>
    <div
      class="main">
      <div 
        class="mleft">
        <img
          :src="base + 'frame.png'"
          class="frame">
        <div
          id="play"/>
        <div
          class="text">
          <img
            :src="base + 'text.png'">
        </div>
      </div>
      <div 
        class="mright">
        <ul>
          <li> 
            <img
              :src="base + sex_group[gender][0] +'.png'"
              class="pic">
            <img
              :src="base + 'unlock.png'"
              class="lock">
          </li>
          <li> 
            <img
              :src="base + sex_group[gender][1] +'.png'"
              class="pic">
            <img
              :src="base + 'locked.png'"
              class="lock">
          </li>
        </ul>
      </div>
    </div>
    <div
      class="list"/>
    <div
      v-show="mask"
      class="mask"
      @click="()=>{mask=false;note=false;}">
      <div
        v-show="note"
        class="note">
        <img
          :src="base + 'note.png'">
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      base: cdnUrl + '/fe/image/super_hero/',
      locked: ['', false, false, false, false],
      sex_group: ['', ['c1', 'c2'], ['c3', 'c4']],
      gender: this.$route.query.gender, //性别
      role: this.$route.query.role, //角色
      score: this.$route.query.score, //分数
      mask: true,
      note: true,
      //微信分享
      wxShareInfoValue: {
        title: '超级英雄',
        desc: '超级英雄',
        link: '' + window.location.search,
        imgUrl: 'http://cdn.exe666.com/fe/image/super_hero/icon.jpg',
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
@base: 'http://cdn.exe666.com/fe/image/super_hero/';
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
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .score {
    color: antiquewhite;
    font-size: 7vw;
    position: absolute;
    top: 12%;
    left: 61%;
    z-index: 999;
  }
  .main {
    position: absolute;
    top: 17%;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 9;
    .mleft {
      width: 69.5%;
      float: left;
      margin-left: 3%;
      position: relative;
      .frame {
        position: relative;
        z-index: 0;
      }
      #play {
        position: absolute;
        right: 0.5%;
        top: 15.5%;
        border: solid 1px red;
        width: 65%;
        height: 82%;
        z-index: 99;
      }
      .text {
        position: absolute;
        bottom: 2%;
        right: 0.5%;
        width: 94%;
        z-index: 999;
      }
    }
    .mright {
      width: 25%;
      float: right;
      margin-right: 2%;
      position: relative;
      ul,
      li {
        display: inline-block;
        width: 100%;
        position: relative;
      }
      ul {
        margin-top: -1%;
      }
      li {
        .pic {
          position: relative;
          z-index: 0;
        }
        .lock {
          position: absolute;
          width: 40%;
          top: 50%;
          left: 70%;
          transform: translate(-50%, -50%);
          z-index: 9;
        }
      }
    }
  }
  .mask {
    position: absolute;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .note {
      width: 100%;
    }
  }
}
</style>


