<template>
  <div
    :style="(mask?'height:':'min-height:') + this.$innerHeight() + 'px'"
    :class="{overflow:mask}"
    class="content"
  >
    <!-- 欢乐积攒有惊喜 四级联动显示-->
    <!-- <div 
      v-show="!isfinished"
      class="group">
      <div
        class="block">
        <img
          :src="base + 'group3.png' + this.$qiniuCompress()"
          class="bg">
        <img
          v-show="gameData.projectOne"
          :src="base + 'a.png' + this.$qiniuCompress()"
          class="done1">
        <img
          v-show="gameData.projectTwo"
          :src="base + 'b.png' + this.$qiniuCompress()"
          class="done2">
        <img
          v-show="gameData.projectThree"
          :src="base + 'c.png' + this.$qiniuCompress()"
          class="done3">
        <img
          v-show="gameData.projectFour"
          :src="base + 'd.png' + this.$qiniuCompress()"
          class="done4">
        <span
          class="span">已集齐<span class="white">{{ gameData.numArr[gameData.num] }}</span>赞
        </span>
      </div>
    </div>
    <div 
      v-show="isfinished"
      class="group">
      <div 
        class="block finish">
        <img 
          :src="base + 'finish3.png'">
      </div>
    </div> -->

    <!-- 商品优惠内容 -->

    <!-- <a
      v-show="gameData.num==4&&!mask"
      class="alert"
      @click="()=>{mask = true}">
      <img 
        :src="base + 'alert.gif'">
    </a> -->

    <div class="block coupons">
      <img :src="base + belong + '.png?333' + this.$qiniuCompress()">
    </div>
    <!-- tips -->
    <img
      :src="base + 'tips.png'"
      class="tips"
    >
    <!-- <div 
      v-show="mask"
      class="mask">
      <div 
        class="mask-main">
        <img 
          :src="base + 'winbg.png?111'"
          class="winbg">
        <a
          class="close"
          @click="()=>{mask = false}"/>
        <canvas 
          v-if="award"
          id="canvasDoodle" 
          class="canvas-ele"
          width="200" 
          height="90" 
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        />
        <div 
          class="win-text">
          <img  
            :src="coupon.url + this.$qiniuCompress()">
        </div>
        <div 
          class="form">
          <input 
            v-model="mobile"
            type="text" 
            maxlength="11"
            placeholder="请输入手机号"
            class="input">
          <a 
            class="get-btn"
            @click="checkMobile(mobile)"/>
          <a 
            class="cancel-btn"
            @click="()=>{mask = false}"/>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userGame,
  getGame,
  getCouponId,
  getAdCoupon
} from "services";
import { normalPages } from "@/mixins/normalPages";
const REQ_URL = "http://120.27.144.62:1337/parse/classes/";
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + "/fe/image/drc/guoqing/",
      height: this.$innerHeight(),
      deUrl:
        "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4VoBYD1YEIq0E3LFM1XLKsd3sG5VXRAvCUqCVXIPTcI0TzqicRWfzB9Zv40GhTR83RhKAugpzOuaJFC11nxmcnnp6ZbOu04UFw/0",
      userId: null,
      id: this.$route.query.id,
      coupon: {
        policyId: 4,
        couponId: null,
        url: null
      },
      mobile: null,
      award: true,
      mask: false,
      isfinished: false,
      // 节目数据，是否已玩
      gameData: {
        projectOne: false,
        projectTwo: false,
        projectThree: false,
        projectFour: false,
        num: 0,
        numArr: ["0", "一", "二", "三", "四"]
      },
      //分享
      wxShareInfoValue: {
        title: "中秋国庆星乐享，1000份好礼“刷脸”大派送！",
        desc: "大融城-星视度嗨玩节，福利优惠拿不停。",
        link: "http://papi.xingstation.com/api/s/qj2" + window.location.search,
        imgUrl:
          "http://cdn.exe666.com/image/tm/guoqing/share_" +
          this.$route.query.utm_campaign.trim() +
          ".png",
        success: function() {
          wechatShareTrack();
        }
      }
    };
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
    // this.initCanvas()
  },
  methods: {
    handleWechatAuth() {
      if (Cookies.get("sign") === null) {
        let base_url = encodeURIComponent(String(window.location.href));
        let redirct_url =
          process.env.WX_API +
          "/wx/officialAccount/oauth?url=" +
          base_url +
          "&scope=snsapi_base";
        window.location.href = redirct_url;
      } else {
        this.userId = Cookies.get("user_id");
        // this.userGame()
      }
    },
    userGame() {
      let args = {
        belong: this.belong,
        image_url: this.deUrl,
        qiniu_id: this.id,
        score: 100
      };
      userGame(args, this.userId)
        .then(res => {
          console.log(res);
          this.getGame();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getGame() {
      let args = {
        withCredentials: true
      };
      let userId = this.userId;
      getGame(args, userId)
        .then(res => {
          console.log(res);
          this.projectStatus(res, userId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    projectStatus(list, userId) {
      let data = list;
      console.log(list);
      data.map(r => {
        // 节目1，棒约翰
        if (r.belong === "PaPaJohnsPizza") {
          this.gameData.projectOne = true;
          this.gameData.num++;
        }
        // 节目2，华为周年庆
        if (r.belong === "huawei") {
          this.gameData.projectTwo = true;
          this.gameData.num++;
        }
        // 节目3,balabala,小小童星梦
        if (r.belong === "childDream") {
          this.gameData.projectThree = true;
          this.gameData.num++;
        }
        // 节目4，嘉庭老上海味道
        if (r.belong === "jiating") {
          this.gameData.projectFour = true;
          this.gameData.num++;
        }
        if (this.gameData.num == 4) {
          this.isfinished = true;
          this.mask = true;
          this.getCouponId();
        }
      });
    },
    checkMobile(mobile) {
      if (!/^1[3456789]\d{9}$/.test(mobile)) {
        alert("您输入的手机号有误");
        return;
      } else {
        this.handleTrack(mobile);
        this.getCoupon();
        console.log(mobile);
      }
    },
    handleTrack(mobile) {
      const baseUrl = process.env.EXE_API;

      let url =
        `${baseUrl}/goodsxsd/?id=` +
        String(this.$route.query.id) +
        "&mobile=" +
        String(mobile) +
        "&api=json";
      this.$http.get(url).then(r => {});
    },
    initCanvas() {
      let that = this;
      let img = new Image();
      let canvas = document.getElementById("canvasDoodle");
      let ctx = canvas.getContext("2d");
      img.setAttribute("crossOrigin", "Anonymous");
      canvas.height = 90;
      canvas.width = 200;
      //获取当前画布的宽高
      let width = canvas.width;
      let height = canvas.height;
      img.src = that.base + "award.png";
      img.onload = () => {
        ctx.beginPath();
        ctx.drawImage(img, 0, 0, width, height);
        ctx.closePath();
        if (document.querySelector(".canvas-ele") !== null) {
          this.c = document
            .querySelector(".canvas-ele")
            .getBoundingClientRect();
        }
      };
    },
    handleTouchMove(event) {
      // console.dir(event)
      let canvas = document.getElementById("canvasDoodle");
      let ctx = canvas.getContext("2d");
      /* 根据手指移动画线，使之变透明*/
      if (this.c.top > window.innerHeight) {
        let x = event.touches[0].pageX - this.c.left;
        let y = event.touches[0].pageY - this.c.top;
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      } else {
        let x = event.touches[0].clientX - this.c.left;
        let y = event.touches[0].clientY - this.c.top;
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
    },
    handleTouchStart(event) {
      // console.dir(event)
      let canvas = document.getElementById("canvasDoodle");
      let ctx = canvas.getContext("2d");
      let x = event.touches[0].clientX - this.c.left;
      let y = event.touches[0].clientY - this.c.top;
      ctx.beginPath();
      ctx.globalCompositeOperation = "destination-out";
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    },
    handleTouchEnd(event) {
      let canvas = document.getElementById("canvasDoodle");
      let ctx = canvas.getContext("2d");
      /* 获取imageData对象*/
      let imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height);
      /* */
      let allPX = imageDate.width * imageDate.height;
      let iNum = 0; //记录刮开的像素点个数
      for (let i = 0; i < allPX; i++) {
        if (imageDate.data[i * 4 + 3] == 0) {
          iNum++;
        }
      }
      if (iNum >= (allPX * 1) / 4) {
        this.award = false;
      }
    },
    getCoupon() {
      let args = {
        mobile: this.mobile
      };
      getAdCoupon(args, this.coupon.couponId)
        .then(res => {
          let data = res.data;
          console.log("getCoupon");
          console.log(res);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    getCheck() {
      checkCouponNumber(this.coupon.couponId)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    getCouponId() {
      getCouponId(this.coupon.policyId)
        .then(res => {
          console.log("getCouponId");
          console.log(res);
          let data = res.data;
          this.coupon.couponId = res.id;
          this.coupon.url = res.imgUrl;
          this.getCheck();
        })
        .catch(err => {
          console.log(err);
          alert(err.response.data.message);
        });
    }
  }
};
</script>
<style lang="less" scoped>
/*声明 WebFont*/
@font-face {
  font-family: "haibao";
  src: url("http://cdn.exe666.com/font/haibao.ttf");
  src: url("http://cdn.exe666.com/font/haibao.eot"),
    url("http://cdn.exe666.com/font/haibao.woff"),
    url("http://cdn.exe666.com/font/haibao.ttf"),
    url("http://cdn.exe666.com/font/haibao.svg");
  font-weight: normal;
  font-style: normal;
}
@base: "http://cdn.exe666.com/image/tm/guoqing/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
  background-color: #fef6d1;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}
a {
  display: inline-block;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}

.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #fef6d1;
  max-width: 750px;
  background-image: url("@{base}background.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-top: 62%;
  .block {
    width: 97.5%;
    overflow-x: hidden;
    position: relative;
    margin: 0 auto;
    margin-top: 22%;
  }
  .note {
    width: 54.5%;
    margin-top: 4%;
    margin-bottom: 6%;
  }
  .alert {
    display: inline-block;
    width: 20%;
    position: absolute;
    top: 97%;
    right: 0%;
  }
  .group {
    width: 100%;
    background-image: url("@{base}bg.png");
    background-position: center top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: 0;
    margin-bottom: 7%;
    .bg {
      position: relative;
      z-index: 0;
    }
    .done1,
    .done2,
    .done3,
    .done4 {
      height: 32%;
      position: absolute;
      top: 42.5%;
    }
    .done1 {
      left: 1.5%;
    }
    .done2 {
      left: 26%;
    }
    .done3 {
      left: 50.5%;
    }
    .done4 {
      left: 75%;
    }
    .span {
      width: 56%;
      text-align: center;
      font-family: "haibao";
      font-size: 8vw;
      letter-spacing: 2px;
      // text-stroke: 1px #000;
      -webkit-text-stroke: 1px #000;
      position: absolute;
      left: 22%;
      bottom: 11.5%;
      color: #e93f42;
      .white {
        color: #fff;
        font-size: 8vw;
      }
    }
  }
  .finish {
    margin-bottom: 7%;
  }
  .coupons {
    z-index: 0;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .mask-main {
      width: 89%;
      position: relative;
      margin-top: 25%;
    }
    .winbg {
      position: relative;
      z-index: 0;
    }
    .close {
      position: absolute;
      top: -1%;
      left: 91.5%;
      z-index: 999;
      display: inline-block;
      width: 7vw;
      height: 7vw;
      border-radius: 50%;
    }
    .canvas-ele {
      position: absolute;
      top: 42.4%;
      width: 68%;
      height: 20%;
      left: 16%;
      z-index: 1000;
    }
    .win-text {
      position: absolute;
      top: 42.2%;
      width: 75.5%;
      left: 12.25%;
      z-index: 99;
      overflow: hidden;
      color: #fff;
    }
    .form {
      width: 77%;
      height: 25%;
      text-align: center;
      position: absolute;
      top: 71%;
      left: 12%;
      overflow: hidden;
      .input {
        position: relative;
        width: 100%;
        height: 39%;
        border-radius: 5px;
        text-align: center;
        color: #a3a3a3;
        font-size: 5vw;
        letter-spacing: 2px;
      }
      .get-btn,
      .cancel-btn {
        width: 47.5%;
        height: 45.5%;
        position: relative;
        border-radius: 5px;
        margin-top: 5%;
      }
      .get-btn {
        float: left;
      }
      .cancel-btn {
        float: right;
      }
    }
  }
}
.overflow {
  overflow: hidden;
}
</style>


