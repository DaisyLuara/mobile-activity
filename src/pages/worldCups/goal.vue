<template>
  <div
    :style="style.root"
    class="hj-root"
  >
    <div
      :style="style.photoOuter" 
      class="root-photo"
    >
      <img 
        :style="style.logo"
        :src="baseUrl + 'logo.png'"
      >
      <img
        :style="style.remind"
        :src="baseUrl + 'remind.png'"
      >
      <div class="inner-photo">
        <img
          :style="style.innerPhoto"
          :src="bindImage"
        >
      </div>
      <img
        :style="style.brand"
        :src="baseUrl + 'brand.png'" 
      >
      <img 
        :src="bindImage"
        class="top-img"
      >
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { $wechat, getInfoById, wechatShareTrack } from 'services'
const wiw = window.innerWidth
const wih = window.innerHeight

export default {
  data() {
    const baseUrl =
      'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/goal/'
    return {
      bindImage: '',
      baseUrl: baseUrl,
      style: {
        root: {
          width: wiw + 'px',
          height: wih + 'px',
          backgroundSize: 'cover'
        },
        photoOuter: {
          width: 55 / 75 * wiw + 'px',
          height: 970 / 566 * 55 / 75 * wiw + 'px',
          marginTop: wih * 0.05 + 'px',
          position: 'relative'
        },
        brand: {
          width: 1 / 3 * wiw + 'px',
          position: 'relative',
          marginTop: wih * 0.03 + 'px'
        },
        logo: {
          position: 'absolute',
          width: 0.506 * wiw + 'px',
          top: -(0.506 * wiw * 220 / 410 / 2) + 'px',
          left: (55 / 75 * wiw - 0.506 * wiw) / 2 + 'px'
        },
        remind: {
          position: 'absolute',
          width: 300 / 750 * wiw + 'px',
          right: '-' + (1 - 55 / 75) / 2 * wiw + 'px',
          bottom: -(126 / 750 * wiw * 169 / 133 / 2) + 'px'
        }
      },
      wxShareInfoValue: {
        title: '6嗨全球GO！',
        desc: '嗨翻世界杯，和足球宝贝亲密合影吧',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/goal/share.png'
      }
    }
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: function() {
          wechatShareTrack()
        }
      }
      return wxShareInfo
    }
  },
  mounted() {
    this.getInfoById()
    this.handleShare()
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getInfoById() {
      if (this.$route.query.hasOwnProperty('id')) {
        let id = this.$route.query.id
        let that = this

        getInfoById(id)
          .then(res => {
            that.bindImage = res.image
          })
          .catch(err => {
            Toast('网络错误，请重试')
          })
      } else {
        Toast('没有照片id')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgServerUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/world_cup/goal/';
img {
  width: 100%;
}
.hj-root {
  background-image: url('@{imgServerUrl}bg.png');
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  .top-img {
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .root-topimg {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  .root-photo {
    z-index: 3;
    border: solid 3px #325f32;
    background-color: white;
    .inner-photo {
      @diff : 10px;
      width: calc(~'100% - @{diff}');
      margin: 5px;
      border: 1px solid black;
      height: calc(~'100% - @{diff}');
      overflow: hidden;
    }
  }
}
</style>
