<template>
  <div
    :style="style.root" 
    class="root"
  >
    <!-- 背景 -->
    <img
      :src="IMAGE_URL + 'bg.png'" 
      class="bg"
    >
    
    <!-- 背景区域 -->
    <div class="photo-area">
      <img
        :src="photo"
        :class="{'photo-inner-horn': isHorn, 'photo-inner-nothorn': !isHorn}"
      >
    </div>

    <!-- 实际背景 -->
    <img
      :src="photo"
      class="photo-real"
    >
    
    <!-- tips -->
    <img
      :src="IMAGE_URL + 'remind.png'" 
      class="remind"
    >
  </div>  
</template>

<script>
const wih = window.innerHeight
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { Toast } from 'mint-ui'
import { normalPages } from '@/mixins/normalPages'
const IMAGE_SERVER =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pjfd/'
export default {
  mixins: [normalPages],
  data() {
    return {
      IMAGE_URL:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pjfd/',
      style: {
        root: {
          height: wih + 'px'
        }
      },
      wxShareInfoValue: {
        title: '浦江饭店',
        desc: '与浦江合影留念',
        imgUrl: IMAGE_SERVER + 'share.png',
        success: function() {
          wechatShareTrack()
        }
      },
      isHorn: false,
      photo: null
    }
  },
  created() {
    document.title = '浦江饭店'
    this.handleHorn()
  },
  methods: {
    handleHorn() {
      if (this.$route.query.isHorn == true || this.$route.query.isHorn == 1) {
        this.isHorn = true
      }
    },
    async getPhotoByRouteQueryId() {
      let id = this.$route.query.id
      let { image } = await getInfoById(id).catch(err => {
        console.warn(err.message)
      })
      this.photo = image
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  z-index: 1;
  .bg {
    height: 100%;
    position: relative;
    z-index: 10;
  }
  .photo-area {
    width: 100%;
    position: absolute;
    // border: 1px solid white;
    height: 50%;
    top: 30%;
    left: 0;
    z-index: 11;
    .photo-inner-horn {
      width: 90%;
      top: 0;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .photo-inner-nothorn {
      height: 100%;
      top: 0;
      margin: 0 auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .photo-real {
    width: 100%;
    position: absolute;
    height: 50%;
    top: 30%;
    z-index: 12;
    opacity: 0;
  }
  .remind {
    position: absolute;
    bottom: 10%;
    width: 30%;
    z-index: 11;
  }
}
</style>
