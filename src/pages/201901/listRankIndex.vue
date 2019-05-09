<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- <img
      :src="baseUrl + 'bg.png'"
      class="bg"
    > -->
    <div class="contain">
      <img
        :src="baseUrl + 'photo_02.png'+ this.$qiniuCompress()"
        class="frame"
      >
      <!-- 头像 -->
      <img
        :src="Imgurl"
        class="head"
      >
      <!-- 分数 -->
      <span class="nickname">{{ nickname }}</span>
      <span class="score">{{ score }}</span>
      <!-- 图片 -->
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <img
        :src="baseUrl + 'ranking.png'+ this.$qiniuCompress()"
        class="ranking-btn"
        @click="go()"
      >
    </div>
    <img
      :src="baseUrl + 'logo.png'+ this.$qiniuCompress()"
      class="logo"
    >
  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  wechatShareTrack
} from 'services'
const cdnUrl = process.env.CDN_URL;
export default {
  mixins: [normalPages],
  data() {
    return {
      baseUrl: cdnUrl + "/fe/marketing/img/listRank/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      nickname: null,
      Imgurl: null,
      score: null,
      cookies_z: null,
      wxShareInfoValue: {
        title: "亲爱的，新年快乐!",
        desc: "猪年大吉，猪事顺利",
        link: "http://papi.xingstation.com/api/s/MJQ" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/listRank/icon.png"
      }
    };
  },
  watch: {
    awardinfo() {
      this.nickname = this.awardinfo.nickname || this.userinfo.username
      this.Imgurl = this.awardinfo.face || this.userinfo.face
      this.score = this.awardinfo.value || this.parms.score
    },
    userinfo() {
      if (Cookies.get('z')) {
        this.cookies_z = Cookies.get('z')
      } else {
        Cookies.set('z', this.userinfo.z)
      }
      this.nickname = this.awardinfo.nickname || this.userinfo.username
      this.Imgurl = this.awardinfo.face || this.userinfo.face
      this.score = this.awardinfo.value || this.parms.score
    },
  },
  mounted() {
    this.cookies_z = Cookies.get('z')
    this.handleForbiddenShare();
  },
  methods: {
    //禁止微信分享
    handleForbiddenShare() {
      $wechat()
        .then(res => {
          res.forbidden();
        })
        .catch(_ => {
          console.warn(_.message);
        });
    },
    go() {
      this.$router.push({
        path: 'listRank_result?' + window.location.search
      })
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/marketing/img/listRank/";
/*声明 WebFont*/
@font-face {
  font-family: "MatrixCode";
  src: url("http://cdn.xingstation.cn/fe/marketing/img/listRank/hanyicu.TTF");
  font-weight: normal;
  font-style: normal;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url("@{imageHost}bg.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  .contain {
    width: 100%;
    position: relative;
    .frame {
      width: 65%;
    }
    .head {
      width: 17%;
      position: absolute;
      left: 41.5%;
      top: 5.1%;
      border-radius: 50%;
    }
    .score {
      display: inline-block;
      width: 30%;
      position: absolute;
      left: 40%;
      top: 25.3%;
      border-radius: 50%;
      font-size: 5vw;
      z-index: 99;
      color: #600019;
      font-family: "MatrixCode";
    }
    .nickname {
      display: inline-block;
      width: 30%;
      position: absolute;
      left: 35%;
      top: 20.5%;
      border-radius: 50%;
      font-size: 3.5vw;
      z-index: 99;
      color: #fff;
    }
    .photo {
      width: 32%;
      position: absolute;
      left: 30%;
      top: 44%;
      pointer-events: auto;
      user-select: auto;
    }
    .ranking-btn {
      width: 28%;
      position: absolute;
      right: 0;
      top: 25%;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .logo {
    width: 30%;
    position: relative;
    margin-top: 10%;
  }
}
</style>
