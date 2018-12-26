<template>
  <div
    id="content"
    :style="style.root"
  >
    <img
      :src="IMGURL + 'title.png'"
      class="title"
    >
    <div class="msg">
      <img
        :src="IMGURL + 'wow.png'"
        class="wow"
      >
      <img
        :src="IMGURL + 'qiaoen.png'"
        class="message"
      >
    </div>
    <div
      v-show="later"
      class="picture"
    >
      <img
        :src="photo"
        class="photo"
      >
    </div>
    <img
      v-show="later"
      :src="IMGURL + 'prompt.png'"
      class="note"
    >
    <img
      v-show="later"
      :src="IMGURL + 'date.png'"
      class="date"
    >
  </div>
</template>
<script>
import { isInWechat, $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  mixins: [normalPages],
  data() {
    return {
      IMGURL: IMAGE_SERVER + '/pages/wdenglish/',
      later: false,
      style: {
        root: {
          width: '100%',
          'min-height': this.$innerHeight() + 'px'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: '凭照片到店即刻领好礼',
        desc: '还不赶快行动',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/wdenglish/qiaoen_share.png'
      }
    }
  },
  watch: {
    photo() {
      this.later = true
    }
  },
}
</script>
<style lang="less" scoped>
@imgUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/wdenglish/";
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  margin: 0;
  padding: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
}
#content {
  background-image: url("@{imgUrl}back.png");
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #000;
  .title {
    margin: 3% auto;
    width: 91%;
  }
  .msg {
    position: relative;
    .wow {
      position: absolute;
      left: 2px;
      top: -10%;
      //width: 27.8%;
      animation: tan 0.6s ease-in-out 1 forwards;
      z-index: 99;
    }
    .message {
      width: 85.5%;
      position: relative;
      z-index: 0;
    }
  }

  .picture {
    width: 88.5%;
    margin: 5% auto;
    background-image: url("@{imgUrl}frame.png");
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    .photo {
      width: 88%;
      margin: 5.5% auto;
      border-radius: 5px;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .note {
    width: 72.5%;
  }
  .date {
    width: 86%;
    margin-top: 6%;
    margin-bottom: 5%;
  }
}
@keyframes tan {
  0% {
    width: 0%;
  }
  90% {
    width: 35%;
  }
  100% {
    width: 27.8%;
  }
}
</style>

