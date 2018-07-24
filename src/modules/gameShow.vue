<template>
  <!-- 弹出层 -->
  <div class="popups-wrapper" v-show="styleData.show" :style=styleData.popups>
    <div class="popups-content">
      <div class="main-content" :style="styleData.popupsContent">
        <div class="popups-close" :style="styleData.top" @click="closePopups">
          <img :src="imgUrl+'close.png'+ this.$qiniuCompress()" alt="" />
        </div>
        <div class="img-wrap">
          <img 
            class="bg"
            :src="imgUrl+'bg.png?v=1'+ this.$qiniuCompress()" >
          <img 
            class="done1"
            :src="imgUrl+'a.png'+ this.$qiniuCompress()" v-show="gameData.projectOne">
            <img 
            class="done2"
            :src="imgUrl+'b.png'+ this.$qiniuCompress()" v-show="gameData.projectTwo">
            <img 
            class="done3"
            :src="imgUrl+'c.png'+ this.$qiniuCompress()" v-show="gameData.projectThree">
            <img 
            class="done4"
            :src="imgUrl+'d.png'+ this.$qiniuCompress()" v-show="gameData.projectFour">
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
import { createGame, getGame } from 'services'
export default {
  props: {
    styleData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false,
        projectFour: false,
        randomNum: ''
      },
      imgUrl: imgUrl + '/fe/marketing/img/fourProject/'
    }
  },
  created() {},
  methods: {
    createGame(belong, userId) {
      let args = {
        belong: belong
      }
      createGame(args, userId)
        .then(res => {
          if (res.success) {
            this.getGame(userId)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    getGame(userId) {
      let args = {
        withCredentials: true
      }
      getGame(args, userId)
        .then(res => {
          console.log(res)
          this.projectStatus(res, userId)
        })
        .catch(e => {
          console.log(e)
        })
    },
    projectStatus(list, userId) {
      let data = list
      data.map(r => {
        if (r.belong === 'colorPrintHilton') {
          this.gameData.projectOne = true
        }
        if (r.belong === 'LXXJTurntable') {
          this.gameData.projectTwo = true
        }
        if (r.belong === 'WorldCup2018') {
          this.gameData.projectThree = true
        }
        if (r.belong === 'previousLift') {
          this.gameData.projectFour = true
        }
      })
      this.gameData.randomNum = userId
    },
    closePopups() {
      this.styleData.show = false
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
        text-align: left;
        bottom: 4%;
      }
    }
  }
}
</style>
