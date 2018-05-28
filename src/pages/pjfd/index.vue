<template>
  <div
    :style="style.root" 
    class="root">

    <!-- 背景 -->
    <img
      class="bg"
      :src="IMAGE_URL + 'bg.png'" />
    
    <!-- 背景区域 -->
    <div class="photo-area">
      <img
      :class="{'photo-inner-horn': isHorn, 'photo-inner-nothorn': !isHorn}"
      :src="photo"
      />
    </div>

    <!-- 实际背景 -->
    <img
      class="photo-real"
      :src="photo"
      />
    
    <!-- tips -->
    <img
      class="remind"
      :src="IMAGE_URL + 'remind.png'" />
  </div>  
</template>

<script>
const wih = window.innerHeight
import marketService from 'services/marketing'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      IMAGE_URL:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/pjfd/',
      style: {
        root: {
          height: wih + 'px'
        }
      },
      isHorn: false,
      photo: null
    }
  },
  created() {
    this.getInfoById()
    this.handleHorn()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      marketService
        .getInfoById(this, id)
        .then(res => {
          this.photo = res.image
        })
        .catch(err => {
          Toast(err)
        })
    },
    handleHorn() {
      if (this.$route.query.isHorn == true || this.$route.query.isHorn == 1) {
        this.isHorn = true
      }
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
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    .photo-inner-horn {
      width: 90%;
    }
    .photo-inner-nothorn {
      height: 100%;
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
