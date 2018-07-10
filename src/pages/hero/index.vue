<template>
    
  <div class="hero-content" :style="style.root" >
      <img  class="photo" v-if="resultImgUrl !== null" :src="resultImgUrl  + this.qiniuCompress()" alt=""/>
      <!-- <img  class="photo" src="http://o9xrbl1oc.bkt.clouddn.com/1007/image/1492786765568.jpg" alt=""/> -->
      <div class="jiantou">
        <img :src="imgServerUrl + '/pages/hero/arrow.gif'" alt="" >
      </div>
  </div>
</template>
<script>
import { $_wechat, getInfoById, wechatShareTrack } from 'services'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      style: {
        root: {
          height: this.innerHeight() + 'px'
        }
      },
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      shortFlag: true,
      //微信分享信息
      wxShareInfo: {
        title: '刷脸变身超能力英雄',
        desc: '再平凡的你，也有令人惊讶的超能力！',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/hero_share_icon.jpg'
      }
    }
  },
  created() {
    this.getInfoById()
    this.wechatShare()
  },
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share({
            // 配置分享
            title: this.wxShareInfo.title,
            desc: this.wxShareInfo.desc,
            imgUrl: this.wxShareInfo.imgUrl,
            success: function() {
              wechatShareTrack()
            }
          })
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.resultImgUrl = res.image
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/hero';
.hero-content {
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.jpg');
  background-size: 100% 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
  .photo {
    width: 73.6%;
    height: 62%;
    position: absolute;
    left: 13%;
    top: 15.5%;
  }
  .jiantou {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 15%;
    img {
      width: 10%;
      height: 10%;
    }
  }
}
</style>


