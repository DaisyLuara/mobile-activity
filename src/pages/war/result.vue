<template>
  <!-- isAbandoned -->
  <div
    :style="style.root"
    class="war-content"
  >
    <img
      :src="photo"
      class="photo"
      alt=""
    >
    <img
      :src="imgServerUrl + '/pages/war/Bot.png'"
      class="bot"
      alt=""
    >
    <div class="jiantou">
      <img
        :src="imgServerUrl + '/pages/war/A.gif'"
        alt=""
      >
    </div>
  </div>
</template>
<script>
const wih = window.innerHeight
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import { isInWechat, $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: wih + 'px'
        }
      },
      imgServerUrl: IMAGE_SERVER,
      //微信分享信息
      wxShareInfoValue: {
        title: '脑洞大开！芒果TV《三宝大战诸葛亮》欢乐上线',
        desc: '每周日中午12点来@芒果TV  #三宝大战诸葛亮# ',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/war_share_icon.jpg'
      }
    }
  },
}
</script>
<style lang="less" scoped>
@imageHost: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/war";
.war-content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg_war.jpg");
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .photo {
    width: 73.5%;
    height: 73.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55.5%);
  }
  .bot {
    width: 19%;
    height: 12%;
    position: absolute;
    right: 2%;
    bottom: 12%;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10%;
    img {
      width: 10%;
      height: 10%;
    }
  }
}
</style>


