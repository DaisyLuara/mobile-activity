<template>
  <div
    :style="root"
    class="warp"
  >
    <img
      :src="base + 'tit.png'"
      class="top"
    >
    <div class="one">
      <img
        :src="base + 'kuang.png'"
        class="bg"
      >
      <div class="box-group">

        <div class="boxs">
          <img
            :src="base + 'box.png'"
            class="box"
          >
          <img
            :src="base + 'light.png'"
            class="light"
          >
        </div>
        <!-- 勋章-联动-3个节目 -->
        <div class="groups">
          <gameHonour
            ref="gameHonour"
            :style-data="styleData"
            :projects="projects"
          />
        </div>
        <img
          :src="base + 'game.png'"
          class="text"
        >
        <!-- 开宝箱 -->
        <a
          class="open-box"
          @click="openBox"
        >
          <img
            v-if="projects.total<3"
            :src="base + 'btn1.png'"
          >
          <img
            v-else
            :src="base + 'btn2.png'"
          >
        </a>
      </div>
    </div>
    <div class="picture">
      <img
        :src="base + 'pic.png'"
        class="frame"
      >
      <img
        :src="photo"
        class="photo"
      >
      <img
        v-show="Boolean(photo)"
        :src="base + 'tip.png'"
        class="tip"
      >
    </div>
    <div
      v-show="mask"
      class="mask"
    >
      <!-- 未中奖 -->
      <div
        v-show="!award"
        class="no-ward"
      >
        <img :src="base + 'thanks.png'">
      </div>
      <!-- 已中奖 -->
      <div
        v-show="award"
        class="ward"
      >

        <a
          class="close"
          @click="()=>{todo = false}"
        >
          <img :src="base + 'close.png'">
        </a>
        <img
          :src="base + 'award.png'"
          class="bg"
        >
        <div class="awarded">
          <!-- 状态 -->
          <img
            v-show="used"
            :src="base + 'used.png'"
            class="state"
          >
          <img
            v-show="passed"
            :src="base + 'passed.png'"
            class="state"
          >
          <!-- 二维码 -->
          <div class="clip">
            <img
              :src="qr_img"
              class="qrImg"
            >
          </div>
          <p class="qrcode">{{qrcode}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { $wechat, isInWechat, wechatShareTrack, isiOS, sendV2Projects, checkV2Coupon, batchV2Coupon } from "services";
import { normalPages } from "@/mixins/normalPages";
import moment from "moment";
import gameHonour from "@/modules/gameHonour";
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    gameHonour
  },
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/warrior/",
      root: {
        "min-height": this.$innerHeight() + "px"
      },
      id: this.$route.query.id,
      mask: false,
      award: false,
      qr_img: 'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',//'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      qrcode: '12234354365',//null,
      used: false,
      passed: false,
      bid: 3,
      end_date: null,//"2019-01-29 00:00:00"
      diff_time: null,
      projects: {
        list: {
          "8": {
            name: "key1",
            img: ""
          },
          "9": {
            name: "key2",
            img: ""
          },
          "10": {
            name: "key3",
            img: ""
          }
        },
        total: 3
      },
      z: null,
      get_id: null,
      styleData: {
        child: {
          position: 'relative',
          width: '32%',
          'overflow': 'hidden'
        }
      },
    };
  },
  watch: {
    sertime() {
      // if (localStorage.getItem('z')) {
      //   this.z = this.z ? this.z : localStorage.getItem('z')
      //   this.projects.total = 3
      //   this.$refs.gameHonour.getGameHonour(this.bid, this.z)
      // } else if (this.userinfo != null) {
      //   this.z = this.userinfo.z
      //   localStorage.setItem('z', this.userinfo.z)
      //   this.projects.total = 3
      //   this.$refs.gameHonour.getGameHonour(this.bid, this.z)
      // }
    }
  },
  mounted() {
    this.$refs.gameHonour.getGameHonour(this.bid, '1808ce6f291cc2aa1c33e80d7bbd91128359w5');
  },
  methods: {
    openBox() {
      this.checkV2Coupon()
      this.award = true
      this.mask = true
    },
    //判断是否领过优惠券
    checkV2Coupon() {
      let args = {
        z: this.z,
        belong: 'warrior',
        include: 'couponBatch',
      }
      checkV2Coupon(args).then(res => {
        if (res) {
          this.handleData(res)
        } else {
          this.getCouponBatch()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCouponBatch() {
      let args = {
        z: this.z,
        belong: this.belong,
      }
      batchV2Coupon(args).then(res => {
        this.get_id = res.id
        this.sendV2Coupon()
      }).catch(err => {
        console.log(err)
      })
    },
    //发优惠券
    sendV2Coupon() {
      let args = {
        qiniu_id: this.id,
        z: this.z,
        belong: 'ultraman',
        oid: this.oid
      }
      sendV2Projects(args)
        .then(res => {
          this.handleData(res)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    //处理返回数据
    handleData(res) {
      this.qr_img = res.qrcode_url
      this.coupon_img = res.couponBatch.image_url
      this.qrcode = res.code
      this.end_date = res.end_date
      if (parseInt(res.status) === 1) {
        this.diff_time = '0天0小时0分'
        this.used = true
      } else {
        this.countTime()
      }

    },
    countTime() {
      let that = this
      let now = moment()//当前时间
      let end = moment(that.end_date)//结束时间
      let [d, h, m] = []
      let diff = end.diff(now, 'minutes')
      let ends = end.diff(now, 'seconds')
      if (ends <= 0) {
        window.cancelAnimationFrame(timer)
        this.diff_time = '0天0小时0分'
        this.passed = true
      } else {
        m = Math.floor(diff % 60)
        h = Math.floor(diff / 60 % 24)
        d = Math.floor(diff / (60 * 24))
        m = m < 10 ? '0' + m : m
        h = h < 10 ? '0' + h : h
        d = d < 10 ? '0' + d : d
        this.diff_time = d + '天' + h + '小时' + m + '分'
      }
      let timer = window.requestAnimationFrame(this.countTime)
    }
  }
};
</script>
<style lang="less" scoped>
@imgurl: "http://cdn.exe666.com/fe/image/warrior/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
* {
  padding: 0;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.warp {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  position: relative;
  background-image: url("@{imgurl}bg1.png"), url("@{imgurl}bg2.png");
  background-position: center top, center bottom;
  background-size: 100% auto, 100% auto;
  background-repeat: no-repeat, no-repeat;
  .bg {
    position: relative;
    z-index: 0;
  }

  .top {
    width: 86%;
    position: relative;
    margin-top: 7%;
    margin-bottom: 6%;
  }
  .one {
    .bg {
      width: 90%;
      position: relative;
      z-index: 0;
    }
    width: 100%;
    position: relative;
    .box-group {
      width: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
      z-index: 99;
      .boxs {
        width: 100%;
        position: relative;
        z-index: 0;
        margin-top: -6%;
        margin-bottom: -12%;
        .light {
          position: relative;
          width: 71%;
          z-index: 0;
          animation: torotate linear 2s infinite;
        }
        .box {
          width: 39%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 99;
        }
      }
      .groups {
        width: 78%;
        overflow: hidden;
        position: relative;
        z-index: 9;
        .the-honour {
          position: relative;
          width: 100%;
          z-index: 9;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
      .text {
        width: 72.5%;
        position: relative;
        margin-top: 5%;
        margin-bottom: 2%;
      }
      .open-box {
        position: relative;
        display: block;
        width: 69%;
      }
    }
  }
  .picture {
    width: 100%;
    margin-top: 8%;
    margin-bottom: 14%;
    position: relative;
    .frame {
      width: 68%;
      position: relative;
      z-index: 0;
    }
    .photo {
      width: 62%;
      pointer-events: auto;
      user-select: auto;
      position: absolute;
      top: 2%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
    }
    .tip {
      width: 6.3%;
      position: absolute;
      top: 12%;
      right: 8%;
      z-index: 99;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .no-ward {
      width: 60.5%;
      position: relative;
    }
    .close {
      width: 7.6%;
      display: inline-block;
      position: absolute;
      top: 0%;
      right: 5%;
      z-index: 99;
    }
    .ward {
      width: 75%;
      margin-top: -25%;
      position: relative;
      .bg {
        position: relative;
        z-index: 0;
      }
      .awarded {
        position: absolute;
        top: 77%;
        left: -2%;
        width: 100%;
        z-index: 99;
        .state {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          width: 55%;
        }
        .clip {
          width: 27vw;
          height: 27vw;
          overflow: hidden;
          text-align: center;
          position: relative;
          img {
            width: 35vw;
            max-width: 40vw;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: auto;
            user-select: auto;
          }
        }
        .qrcode {
          position: relative;
          width: 100%;
          text-align: center;
          margin-top: 3%;
          color: #fffea1;
          font-size: 5vw;
          font-weight: 400;
        }
      }
    }
  }
}
@keyframes bigger {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.9);
  }
}
@keyframes torotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


