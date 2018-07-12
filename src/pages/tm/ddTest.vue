<template>
    <div class="content" :style="style.root">
    </div>
</template>
<script>
import { $_wechat, wechatShareTrack } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      style: {
        root: {
          'min-height': this.innerHeight()
        }
      },
      IMGURL: IMAGE_SERVER + '/pages/tmdd/',
      //微信分享
      wxShareInfo: {
        title: '',
        desc: '',
        imgUrl: this.IMGURL + 'share.png'
      }
    }
  },
  mounted() {},
  methods: {
    wechatShare() {
      $_wechat()
        .then(res => {
          res.share({
            //配置分享
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
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmdd/';
</style>


