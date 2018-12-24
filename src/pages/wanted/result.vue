<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="serverUrl + 'bg-inner.jpg' + this.$qiniuCompress()"
      class="bg"
    >
    <img
      :src="serverUrl + 'title.png' + this.$qiniuCompress()"
      class="title"
    >
    <img
      :src="serverUrl + 'dagger.png' + this.$qiniuCompress()"
      :style="style.dagger"
      class="dagger"
    >
    <div
      :style="style.photo"
      class="photo"
    >
      <img
        :src="serverUrl + 'photo-cover.png' + this.$qiniuCompress()"
        style="width: 100%;"
      >
      <div
        :style="style.priceArea"
        class="price-area"
      >
        <img :src="serverUrl + 's.png'">
        <img
          v-for="(item, index) in bindNumber"
          :key="index"
          :src="serverUrl + String(item) + '.png'"
        >
      </div>
    </div>
    <div
      :style="style.coverphoto"
      class="cover-photo"
    >
      <img
        :src="photo + this.$qiniuCompress()"
        class="inner-photo"
      >
    </div>
    <!-- real photo -->
    <img
      :src="photo + this.$qiniuCompress()"
      :style="style.realphoto"
      class="real-photo"
    >
    <img
      :src="serverUrl + 'save-remind.png' + this.$qiniuCompress()"
      :style="style.remind"
      class="remind"
    >
  </div>
</template>

<script>
const serverUrl = process.env.CDN_URL
import { isInWechat, $wechat, wechatShareTrack } from 'services'
import { normalPages } from '@/mixins/normalPages'
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        dagger: {
          top: this.$innerWidth() * 0.1 + 'px',
          width: this.$innerWidth() * 0.2 + 'px'
        },
        photo: {
          top: this.$innerWidth() * 0.2 + 'px'
        },
        remind: {
          top: this.$innerWidth() * 1.45 + 'px'
        },
        realphoto: {
          top: this.$innerWidth() * 0.2 + 'px'
        },
        coverphoto: {
          top: this.$innerWidth() * 0.22 + 'px',
          width: this.$innerWidth() * 0.74 + 'px',
          height: this.$innerWidth() * 0.8 * 460 / 300 + 'px'
        },
        priceArea: {
          bottom: this.$innerWidth() * 0.26 + 'px',
          height: this.$innerWidth() * 0.0746 + 'px'
        }
      },
      serverUrl: serverUrl + '/fe/marketing/wanted/',
      bindNumber: '',
      wxShareInfoValue: {
        title: '悬赏令',
        desc: 'wow，我可是身价百万的大海盗！',
        imgUrl: serverUrl + '/fe/marketing/wanted/icon.jpg',
        success: function () {
          wechatShareTrack()
        }
      }
    }
  },
  watch: {
    parms() {
      this.bindNumber = this.parms.price
    }
  },
  mounted() {
    // this.getPrice()
    // this.getImage()
    this.handleShare()
  },
  methods: {
    // getPrice() {
    //   this.bindNumber = this.$route.query.price
    // },
    // getImage() {
    //   getInfoById(this.$route.query.id).then(r => {
    //     this.photo = r.image
    //   })
    // },
    handleShare() {
      if (this.$route.query.hasOwnProperty('price')) {
        this.wxShareInfoValue.desc =
          'wow，我可是身价$' + String(this.$route.query.price) + '的大海盗！'
      }
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  background-color: black;
  z-index: 10;
  overflow: hidden;
  .bg {
    position: relative;
    width: 100%;
    z-index: 11;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
  }
  .dagger {
    position: absolute;
    left: 20%;
    z-index: 14;
  }
  .photo {
    z-index: 13;
    width: 80%;
    left: 10%;
    position: absolute;
  }
  .price-area {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
    }
  }
  .remind {
    position: absolute;
    z-index: 14;
    width: 50%;
    left: 10%;
  }
  .cover-photo {
    z-index: 12;
    width: 74%;
    left: 13%;
    position: absolute;
    overflow: hidden;
    .inner-photo {
      width: 120%;
      margin-left: -10%;
      margin-top: -10%;
    }
  }
  .real-photo {
    z-index: 15;
    width: 100%;
    position: absolute;
    opacity: 0;
  }
}
</style>
