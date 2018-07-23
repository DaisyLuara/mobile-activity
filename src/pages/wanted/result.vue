<template>
  <div class="root" :style="style.root">
    <img
      class="bg" 
      :src="serverUrl + 'bg-inner.jpg' + this.qiniuCompress()" />
    <img
      class="title"
      :src="serverUrl + 'title.png' + this.qiniuCompress()" />
    <img 
      class="dagger"
      :style="style.dagger"
      :src="serverUrl + 'dagger.png' + this.qiniuCompress()" />
    <div
      :style="style.photo"
      class="photo">
      <img
        style="width: 100%;"
        :src="serverUrl + 'photo-cover.png' + this.qiniuCompress()" />
      <div 
        :style="style.priceArea"
        class="price-area">
          <img :src="serverUrl + 's.png'" />
          <img v-for="(item, index) in bindNumber" :key="index" :src="serverUrl + String(item) + '.png'" />
      </div>
    </div>
    <!-- show Photo -->
    <img
      :style="style.coverphoto"
      class="cover-photo"
      :src="bindImgUrl + this.qiniuCompress()" />
    <!-- real photo -->
    <img
      :style="style.realphoto"
      class="real-photo"
      :src="bindImgUrl + this.qiniuCompress()" />
    <img
      :style="style.remind"
      class="remind" 
      :src="serverUrl + 'save-remind.png' + this.qiniuCompress()"/>
  </div>
</template>

<script>
const serverUrl = process.env.CDN_URL
import { getInfoById, $_wechat } from 'services'
export default {
  data() {
    return {
      style: {
        root: {
          height: this.innerHeight() + 'px'
        },
        dagger: {
          top: this.innerWidth() * 0.1 + 'px',
          width: this.innerWidth() * 0.2 + 'px'
        },
        photo: {
          top: this.innerWidth() * 0.2 + 'px'
        },
        remind: {
          top: this.innerWidth() * 1.45 + 'px'
        },
        realphoto: {
          top: this.innerWidth() * 0.2 + 'px'
        },
        coverphoto: {
          top: this.innerWidth() * 0.22 + 'px'
        },
        priceArea: {
          bottom: this.innerWidth() * 0.26 + 'px',
          height: this.innerWidth() * 0.0746 + 'px'
        }
      },
      serverUrl: serverUrl + '/fe/marketing/wanted/',
      bindImgUrl: '',
      bindNumber: '',
      wxShareInfoValue: {
        title: '悬赏令',
        desc: 'wow，我可是身价百万的大海盗！',
        imgUrl: serverUrl + '/fe/marketing/wanted/icon.jpg'
      }
    }
  },
  mounted() {
    this.getPrice()
    this.getImage()
    this.handleShare()
  },
  methods: {
    getPrice() {
      this.bindNumber = this.$route.query.price
    },
    getImage() {
      getInfoById(this.$route.query.id).then(r => {
        this.bindImgUrl = r.image
      })
    },
    handleShare() {
      if (this.$route.query.hasOwnProperty('price')) {
        this.wxShareInfoValue.desc =
          'wow，我可是身价' + String(this.$route.query.price) + '的大海盗！'
      }
      $_wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
          console.dir(_)
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
  }
  .real-photo {
    z-index: 15;
    width: 100%;
    position: absolute;
    opacity: 0;
  }
}
</style>
