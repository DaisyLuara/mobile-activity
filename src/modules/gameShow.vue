<template>
  <!-- 弹出层 -->
  <div class="popups-wrapper" v-show="gameData.showPopups" :style=style.popups>
    <div class="popups-content">
      <div class="main-content" :style="style.popupsContent">
        <div class="popups-close" :style="style.top" @click="closePopups">
          <img :src="imgUrl+'close.png'+ this.qiniuCompress()" alt="" />
        </div>
        <div class="img-wrap">
          <img 
            class="bg"
            :src="imgUrl+'bg.png'+ this.qiniuCompress()" >
          <img 
            class="done1"
            :src="imgUrl+'a.png'+ this.qiniuCompress()" v-show="gameData.projectOne">
            <img 
            class="done2"
            :src="imgUrl+'b.png'+ this.qiniuCompress()" v-show="gameData.projectTwo">
            <img 
            class="done3"
            :src="imgUrl+'c.png'+ this.qiniuCompress()" v-show="gameData.projectThree">
            <img 
            class="done4"
            :src="imgUrl+'d.png'+ this.qiniuCompress()" v-show="gameData.projectFour">
            <div class="text">
              {{gameData.randomNum}}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const imgUrl = process.env.CDN_URL

export default {
  props: {
    gameData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgUrl: imgUrl + '/fe/marketing/img/fourProject/',
      style: {
        top: {
          top:
            this.innerHeight() * 0.12 +
            this.innerWidth() * 0.7 / 503 * 34 -
            38 +
            'px',
          right: this.innerWidth() * 0.15 - 45 + 'px'
        },
        popupsContent: {
          height: this.innerHeight() + 'px'
        },
        popups: {
          height: this.innerHeight() + 'px'
        }
      }
    }
  },
  created() {},
  methods: {
    closePopups() {
      this.$parent.closePopups()
    }
  }
}
</script>

<style lang="less" scoped>
.popups-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 400;
  opacity: 0.94;
  .popups-content {
    width: 100%;
    height: 100%;
  }
  .main-content {
    position: relative;
    .popups-close {
      position: absolute;
      right: 4%;
      top: 9.5%;
      z-index: 40;
      img {
        width: 60%;
      }
    }
    .img-wrap {
      position: absolute;
      width: 70%;
      left: 15%;
      top: 12%;
      .bg {
        width: 100%;
        user-select: none;
        pointer-events: none;
      }
      .done1 {
        position: absolute;
        width: 95%;
        left: 2.5%;
        top: 20%;
      }
      .done2 {
        position: absolute;
        width: 95%;
        left: 2.5%;
        bottom: 40%;
      }
      .done3 {
        position: absolute;
        width: 95%;
        left: 2.5%;
        bottom: 21%;
      }
      .done4 {
        position: absolute;
        width: 95%;
        left: 2.5%;
        bottom: 2%;
      }
      .text {
        color: #fff;
        font-size: 16px;
        height: 18px;
        line-height: 18px;
        position: absolute;
        width: 95%;
        left: 5.5%;
        bottom: 4%;
      }
    }
  }
}
</style>
