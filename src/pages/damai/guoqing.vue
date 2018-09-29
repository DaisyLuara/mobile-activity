<template>
  <div 
    class="damai"  
    :style="style.root" >
    <img 
      class="top-bg" 
      :src="baseUrl + 'bg.png'" 
      :style="style.bg"
    />
    <img 
      class="bg" 
      :src="baseUrl + 'photobg.png'" 
      :style="style.photobg"
    />
    <img 
      class="photo" 
      :src="photo" 
      :style="style.photo"
    />
    <img 
      class="remind"
      :src="baseUrl + 'remind.png'" 
    />
  </div>
</template>

<script>
const cdnUrl = process.env.CDN_URL
import { onlyGetPhoto } from '../../mixins/onlyGetPhoto'
export default {
  mixins: [onlyGetPhoto],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/damai/guoqing/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        photobg: {
          marginTop: '-' + 0.02 * this.$innerHeight() + 'px'
        },
        bg: {
          marginTop: '-' + 0.02 * this.$innerHeight() + 'px'
        },
        photo: {
          top: 0.026 * this.$innerHeight() + 'px'
        }
      },
      photo: null
    }
  }
}
</script>

<style lang="less" scoped>
.damai {
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #291536;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .top-bg {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .bg {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 30;
  }
  .photo {
    z-index: 40;
    width: 66.5%;
    margin: 0 auto;
    top: 2.9%;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
  .remind {
    width: 45%;
  }
}
</style>
