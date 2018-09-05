<template>
  <div
    :style="style.root" 
    class="root">
    <!-- <div class="shade">
       <img 
        :src="baseUrl + 'shade.png'+ this.$qiniuCompress()"
        class="shade">
        <img 
        :src="baseUrl + 'shade.png'+ this.$qiniuCompress()"
        class="shade">
    </div> -->
    <div class="photo"/>
    <div class="bottom"/>
  </div>
</template>

<script>
import { wechatShareTrack } from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/mid_autumn/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: '',
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        //link: 'http://papi.xingstation.com/api/s/o2j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/mid_autumn/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/mid_autumn';
.root {
  width: 100%;
  text-align: center;
  background: #05192a;
  .photo {
    width: 100%;
    height: 90%;
    position: relative;
    .grounding {
      width: 90%;
    }
    .photo-real {
      width: 90%;
      margin-top: 10%;
      position: absolute;
      left: 5%;
      top: 0;
    }
  }
  .bottom {
    width: 100%;
    height: 10%;
  }
}
@keyframes fingerScale {
  from {
    transform: scale(1.05, 1.05);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  to {
    transform: scale(1.05, 1.05);
  }
}
</style>
