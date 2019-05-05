<template>
  <div
    :style="style.root"
    class="root"
  >
    <div class="xk">
      <img
        :src="photo + this.$qiniuCompress()"
        class="xk-photo"
      >

      <img
        :src="baseUrl + 'xk.png' + this.$qiniuCompress()"
        class="xk-inner"
      >
      <img
        :style="style.qrcode"
        :src="baseUrl + 'damai-qr.png'"
        class="qrcode"
      >
    </div>

    <img
      :src="baseUrl + 'BG.png' + this.$qiniuCompress()"
      class="bg"
      alt="background"
    >

    <img
      :src="baseUrl + '4.png' + this.$qiniuCompress()"
      class="d-top"
    >

    <img
      :style="style.dright"
      :src="baseUrl + '2.png' + this.$qiniuCompress()"
      class="d-right"
    >

    <img
      :style="style.dleft"
      :src="baseUrl + '3.png' + this.$qiniuCompress()"
      class="d-left"
    >

    <img
      :src="baseUrl + 'bottom1.png' + this.$qiniuCompress()"
      class="bottom"
    >
  </div>
</template>

<script>
const cdnUrl = process.env.CDN_URL
import { normalPages } from '@/mixins/normalPages'
import { wechatShareTrack } from 'services'
import QRCode from 'qrcode'

export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        },
        dleft: {
          bottom: (this.$innerWidth() * 392) / 750 + 'px'
        },
        dright: {
          bottom: (this.$innerWidth() * 392) / 750 + 'px'
        },
        qrcode: {
          width: (this.$innerWidth() * 140) / 750 + 'px',
          height: (this.$innerWidth() * 140) / 750 + 'px'
        }
      },
      baseUrl: cdnUrl + '/fe/marketing/img/damai/wanglian/',
      wxShareInfoValue: {
        title: '今天，你就是ITF青年大师赛的最酷球迷！',
        desc: '',
        imgUrl: cdnUrl + '/fe/marketing/img/damai/wanglian/icon-share.jpg',
      },
      photo: '',
      qrurl: ''
    }
  },
  beforeCreate() {
    if (!this.$route.query.hasOwnProperty('hr')) {
      window.location.assign(window.location.href + '&hr=true')
    }
  },
  mounted() {
    this.fetQRCode()
  },
  methods: {
    async fetQRCode() {
      try {
        // let url = await getQRcodeUrl(this.$route.query.id)
        let qrimg = await QRCode.toDataURL(
          window.location.origin + '/marketing/damai_wanglian'
        )
        this.qrurl = qrimg
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bg {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .xk {
    position: relative;
    width: 76%;
    z-index: 50;
    .xk-photo {
      width: 60%;
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      top: 5%;
      z-index: 1000;
    }
    .xk-inner {
      width: 100%;
      z-index: 100;
    }
    .qrcode {
      position: absolute;
      bottom: 5.5%;
      left: 36%;
    }
  }
  .d-top {
    position: absolute;
    top: 0;
    right: 0;
    width: 17%;
    z-index: 20;
  }
  .d-left {
    position: absolute;
    left: 0;
    width: 20%;
    z-index: 20;
  }
  .d-right {
    position: absolute;
    width: 20%;
    right: 0;
    z-index: 20;
  }
  .bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 20;
  }
}
</style>

