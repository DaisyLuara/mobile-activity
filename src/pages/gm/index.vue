<template>
  <div
    :style="style.root" 
    class="root">
    <div class="top" >
      <img 
        :src="baseUrl + 'up.png'+ this.$qiniuCompress()"
        >
        <!-- 大屏photo -->
        <div class="photo">
           <img 
            :src="baseUrl + '666.png'+ this.$qiniuCompress()"
        >
        </div>
    </div>
    <div class="center" >
      <img 
        :src="baseUrl + '0.png'+ this.$qiniuCompress()"
        class=" pass">
         <img 
        v-show="pass.passTwo"
        :src="baseUrl + '1.png'+ this.$qiniuCompress()"
        class=" passOne">
        <img 
         v-show="pass.passOne"
        :src="baseUrl + '2.png'+ this.$qiniuCompress()"
         class=" passTwo">
        <img 
         v-show="pass.passTree"
        :src="baseUrl + '3.png'+ this.$qiniuCompress()"
         class=" passTree">
    </div>
     <div class="bottom" >
      <img 
        :src="baseUrl + 'xia.png'+ this.$qiniuCompress()"
        >
    </div>
  </div>
</template>

<script>
import { $wechat, getInfoById, wechatShareTrack } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
import MC from 'mcanvas'
const cdnUrl = process.env.CDN_URL

export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      baseUrl: cdnUrl + '/fe/marketing/img/internationalTrade/',
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      photo: '',
      pass: {
        passOne: true,
        passTwo: true,
        passTree: true
      },
      compoundUrl: null,
      wxShareInfoValue: {
        title: '冰力十足 酷爽一夏',
        desc: '看！卖萌的企鹅',
        link: 'http://papi.xingstation.com/api/s/o2j' + window.location.search,
        imgUrl: cdnUrl + '/fe/marketing/img/internationalTrade/icon.jpg',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  created() {},
  mounted() {
    this.getInfoById()
  },
  methods: {
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.photo = res.image
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@imageHost: 'http://cdn.exe666.com/fe/marketing/img/internationalTrade/';
.root {
  width: 100%;
  position: relative;
  text-align: center;
  background: #a2efec;
  overflow-x: hidden;
  .top {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100%;
    }
  }
  .center {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 78%;
    .pass {
      width: 100%;
    }
    .passOne {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .passTwo {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .passTree {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .bottom {
    width: 100%;
    position: absolute;
    left: 0;
    top: 134%;
    img {
      width: 100%;
    }
  }
}
@keyframes upAppear {
  0% {
    top: 96%;
  }
  100% {
    top: 50%;
  }
}
</style>
