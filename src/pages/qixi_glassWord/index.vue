<template>
  <div 
    class="glass-wrap"
  >
    <div 
      class="shade-wrap" 
      @click="getPhoto()"
    >
      <img 
        v-if="showShade" 
        :src="imgServerUrl + '/pages/glassword/heart.png'"  
        alt=""
        class="heart"
      >
    </div>
    <div 
      v-if="showImg"
      class="get-photo"
    >
      <div 
        class="photo"
      >
        <img  
          :src="photo" 
          alt=""
          class="photo-2"
        > 
      </div>
      <img 
        :src="imgServerUrl + '/pages/glassword/button.png'" 
        alt=""
        class="save"
      > 
    </div>
  </div>
</template>
<script>
import { wechatShareTrack, parseService } from 'services'
import $ from 'jquery'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      showShade: true,
      showImg: false,
      imgServerUrl: IMAGE_SERVER,
      photo: '',
      //微信分享信息
      wxShareInfoValue: {
        title: '我又来撒狗粮啦',
        desc: '秀恩爱请认准星视度 ',
        success: () => {
          wechatShareTrack()
        },
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/qixi_share_icon.png'
      }
    }
  },
  mounted() {
    $('.glass-wrap').css('height', $(window).height())
    var h = $('.glass-wrap').height()
    console.log(h)
    if (h == 812) {
      $('.heart').css('width', '70%')
      $('.heart').css('left', '12%')
      $('.heart').css('top', '32%')
    }
  },
  methods: {
    getPhoto() {
      this.showShade = false
      $('.glass-wrap').css(
        'background-image',
        'url(http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/glassword/bg.jpg)'
      )
      this.showImg = true
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/glassword';
.glass-wrap {
  position: relative;
  text-align: center;
  overflow: hidden;
  background-image: url('@{imageHost}/shade_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .shade-wrap {
    width: 100%;
    height: 100%;
    .shade {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .heart {
      width: 60%;
      position: absolute;
      left: 18%;
      top: 32%;
      z-index: 2;
      animation: heart 2.6s linear infinite;
      transform: scale(1);
    }
  }
  .get-photo {
    width: 70%;
    height: 85%;
    position: absolute;
    left: 50%;
    top: 47.5%;
    transform: translate(-50%, -43%);
    border: none;
    .photo {
      height: 87%;
      background: #fff;
      padding: 3px;
      border: none;
      overflow: hidden;
      .photo-2 {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    .save {
      width: 73%;
      margin-top: 2%;
    }
  }
}
@keyframes heart {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.8);
  }
  15% {
    transform: scale(1);
  }
  20% {
    transform: scale(0.7);
  }
  30% {
    transform: scale(1);
  }
}
</style>


