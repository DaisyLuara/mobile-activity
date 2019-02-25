<template>
  <div
    :style="root"
    class="warp"
  >
    <!-- one top -->
    <img
      :src="base + '1.png'"
      class="top"
    >
    <!-- two honour 联动-->
    <!-- 勋章-联动-3个节目 -->
    <div class="groups">
      <gameHonour
        :style-data="styleData"
        :projects="projects"
        :bid="bid"
      />
      <a
        class="todo"
        @click="getCoupon"
      >
        <img :src="base + 'do.png'">
      </a>
    </div>

    <!-- three map -->
    <div class="map">
      <img
        :src="base + '3.png'"
        class="bg"
      >
      <a
        class="tomap"
        @click="()=>{mask = true}"
      >
        <img :src="base + 'map.png'">
      </a>
    </div>
    <!-- four photo -->
    <div class="picture">
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
      <div class="content">
        <img
          :src="base + '5.png'"
          class="map"
        >
        <a
          class="close"
          @click="()=>{mask = false}"
        >
          <img :src="base + 'close.png'">
        </a>
      </div>
    </div>
    <div
      v-show="todo"
      class="ward"
    >
      <a
        class="close"
        @click="()=>{todo = false}"
      >
        <img :src="base + 'close.png'">
      </a>
      <img
        v-if="projects.total>0"
        :src="base + 'tip11.png'"
        class="noward"
      >
      <div
        v-else
        class="awarded"
      >
        <img
          :src="base + 'note.png'"
          class="bg"
        >
        <!-- 计时器 -->
        <div class="time">
          {{diff_time}}
        </div>
        <!-- 券 -->
        <div class="coupon">
          <img
            :src="coupon_img"
            class="bg"
          >
          <img
            v-show="used"
            :src="base + 'geted.png'"
            class="state"
          >
          <img
            v-show="passed"
            :src="base + 'passed.png'"
            class="state"
          >
        </div>
        <!-- 二维码 -->
        <div class="qr">
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
import { Cookies, sendV2Coupon, checkV2Coupon, batchV2Coupon } from "services";
import { normalPages } from "@/mixins/normalPages";
import gameHonour from "@/modules/gameHonour";
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    gameHonour
  },
  mixins: [normalPages],
  data() {
    return {
      base: CDNURL + "/fe/image/altman/",
      root: {
        "min-height": this.$innerHeight() + "px"
      },
      mask: false,
      todo: false,
      coupon_img: null,//'http://cdn.exe666.com/fe/image/altman/test.png',
      qr_img: null,//'https://cdn.exe666.com/fe/image/couponrain/5c22f3d46c008.png',
      qrcode: null,//null,
      used: false,
      passed: false,
      bid: 4,
      end_date: "2019-02-25 00:00:00",//"2019-01-29 00:00:00"
      diff_time: null,
      projects: {
        list: {
          "11": {
            name: "beiliya",
            img: "http://cdn.exe666.com/fe/image/altman/p1.png"
          },
          "12": {
            name: "dijia",
            img: "http://cdn.exe666.com/fe/image/altman/p2.png"
          },
          "13": {
            name: "sailuo",
            img: "http://cdn.exe666.com/fe/image/altman/p3.png"
          }
        },
        total: 3
      },
      idz: null,
      get_id: null,
      styleData: {
        child: {
          position: 'relative',
          width: '35%',
          'margin-left': '-4%',
          'overflow': 'hidden'
        }
      },
      //微信分享
      wxShareInfoValue: {
        title: "万代TAMASHII NATIONS奥特曼英雄“魂”展首次空降上海",
        desc: "一起参与现场互动游戏，赢得大量奥特曼系列礼品",
        link: 'http://papi.xingstation.com/api/s/6B7',
        imgUrl: CDNURL + "/fe/image/altman/icon.png"
      }
    };
  },
  watch: {
    userinfo() {
      if (Cookies.get('z')) {
        return
      } else {
        this.idz = this.userinfo.z
        Cookies.set('z', this.userinfo.z)
      }
    }
  },
  mounted() {
    if (Cookies.get('z')) {
      this.idz = Cookies.get('z')
    }
  },
  methods: {
    getCoupon() {
      this.todo = true
      this.checkV2Coupon()
    },
    //判断是否领过优惠券
    checkV2Coupon() {
      let args = {
        z: this.idz,
        belong: 'ultraman',
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
        z: this.idz,
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
        z: this.idz,
        belong: 'ultraman',
        oid: this.oid
      }
      sendV2Coupon(args, this.get_id)
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
      }
      this.countTime()
    },
    countTime(end_date) {
      let now = new Date()//当前时间
      let end = new Date(this.end_date)//结束时间
      let [d, h, m] = []
      let diff = end - now
      if (diff <= 0) {
        window.cancelAnimationFrame(timer)
        this.diff_time = '0天0小时0分'
        this.passed = true

      } else {
        m = Math.floor(diff / 1000 / 60 % 60)
        h = Math.floor(diff / 1000 / 60 / 60 % 24)
        d = Math.floor(diff / (1000 * 60 * 60 * 24))
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
@imgurl: "http://cdn.exe666.com/fe/image/altman/";
/*声明 WebFont*/
@font-face {
  font-family: "heavy";
  src: url("@{imgurl}heavy.ttf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "medium";
  src: url("@{imgurl}medium.ttf");
  font-weight: normal;
  font-style: normal;
}
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
  background-color: #1b1b1b;
  .bg {
    position: relative;
    z-index: 0;
  }
  .groups {
    width: 100%;
    overflow: hidden;
    position: relative;
    .the-honour {
      position: relative;
      width: 100%;
      z-index: 9;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .todo {
      width: 68%;
      position: relative;
      margin-top: -3%;
      margin-bottom: 5%;
    }
  }
  .map {
    width: 100%;
    overflow: hidden;
    position: relative;
    .tomap {
      width: 25%;
      display: inline-block;
      position: absolute;
      top: 58%;
      right: 11%;
      z-index: 99;
      animation: bigger 0.6s linear infinite alternate;
    }
  }
  .picture {
    width: 100%;
    padding-top: 8%;
    padding-bottom: 12%;
    position: relative;
    .photo {
      position: relative;
      width: 64.1%;
      border: solid 1px #000;
      margin-left: -5%;
      pointer-events: auto;
      user-select: auto;
    }
    .tip {
      width: 9.2%;
      position: absolute;
      top: 50%;
      right: 6%;
      transform: translateY(-50%);
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
    text-align: center;
    margin: 0;
    padding: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      width: 100%;
      position: relative;
      .map {
        width: 100%;
        position: relative;
        z-index: 0;
      }
      .close {
        width: 7.6%;
        display: inline-block;
        position: absolute;
        top: 0%;
        right: 5%;
        z-index: 99;
      }
    }
  }
  .ward {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    z-index: 999;
    .close {
      width: 7.6%;
      display: inline-block;
      position: absolute;
      top: 0%;
      right: 5%;
      z-index: 99;
    }
    .noward {
      position: relative;
      margin-top: 40%;
    }
    .awarded {
      width: 100%;
      position: relative;
      margin-top: 10%;
      overflow: hidden;
      .time {
        width: 100%;
        text-align: center;
        position: absolute;
        text-align: center;
        top: 8%;
        left: 0%;
        font-family: "heavy";
        color: #01f8f8;
        font-size: 10vw;
        font-weight: 700;
      }
      .coupon {
        width: 71%;
        position: absolute;
        top: 31%;
        left: 50%;
        transform: translateX(-50%);
        .state {
          width: 20vw;
          position: absolute;
          top: -50%;
          right: -8%;
          z-index: 99;
        }
      }
      .qr {
        width: 100%;
        position: absolute;
        top: 55.5%;
        left: 0%;
        text-align: center;
        .clip {
          width: 32vw;
          height: 32vw;
          overflow: hidden;
          text-align: center;
          position: relative;
          img {
            min-width: 140%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: auto;
            user-select: auto;
          }
        }
        .qrcode {
          width: 100%;
          text-align: center;
          margin-top: 2%;
          font-family: "medium";
          color: #fff;
          font-size: 4vw;
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
</style>


