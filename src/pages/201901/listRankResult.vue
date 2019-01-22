<template>
  <div
    :style="style.root"
    class="root"
  >
    <img
      :src="baseUrl + 'bg.png'"
      class="bg"
    >
    <div class="contain">
      <img
        :src="baseUrl + 'tittlelight_02.png'"
        class="title"
      >
      <img
        :src="baseUrl + 'rankingbg.png'"
        class="frame"
      >
      <!-- 排行榜 -->
      <div class="rank">
        <!-- 前三名 -->
        <ul class="places">
          <li
            v-for="(item ,index) in list"
            :key="index"
            v-show="index<=2"
          >
            <!-- 头像 -->
            <img
              :src="item.face"
              class="places-head"
            >
            <!-- 昵称 -->
            <span class="nickname">{{item.nickname.length>4?(item.nickname.substring(0,4)+'...'):item.nickname}}</span>
            <!-- 分数 -->
            <span class="score">{{item.value}}</span>
            <img
              v-show="index===0"
              :src="baseUrl + '01.png'"
            >
            <img
              v-show="index===1"
              :src="baseUrl + '02.png'"
            >
            <img
              v-show="index===2"
              :src="baseUrl + '03.png'"
            >
          </li>
        </ul>
        <!-- 后面列表展示  -->
        <div class="rank-list">
          <ul>
            <li
              v-for="(item ,index) in list"
              :key="index"
              v-show="index > 2"
            >
              <span class="rankName">{{index+1}}</span>
              <!-- 头像 -->
              <img
                :src="item.face"
                class="places-head"
              >
              <!-- 昵称 -->
              <span class="nickname">{{item.nickname.length>4?(item.nickname.substring(0,4)+'...'):item.nickname}}</span>
              <!-- 分数 -->
              <span class="score">{{item.value}}</span>
              <img
                :src="baseUrl + '04.png'"
                class="list-tit"
              >
            </li>
          </ul>

        </div>
      </div>

    </div>
    <img
      :src="baseUrl + 'logo.png'"
      class="logo"
    >

  </div>
</template>
<script>
import { normalPages } from "@/mixins/normalPages";
import { $wechat, isInWechat, wechatShareTrack, getGameList, Cookies } from 'services'
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
      cookies_z: null,
      list: [],
      auid: null,
      userId: null,
      wxShareInfoValue: {
        title: "亲爱的，新年快乐!",
        desc: "猪年大吉，猪事顺利",
        link: "http://papi.xingstation.com/api/s/NYL" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/listRank/icon.png"
      }
    };
  },
  mounted() {
    this.cookies_z = Cookies.get('z')
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "testing"
      ) {
        this.handleWechatAuth();
      }
    }
    this.handleForbiddenShare();
  },
  watch: {
    actinfo() {
      this.cookies_z = Cookies.get('z')
      let z = this.cookies_z || this.userinfo.z
      this.getList(this.actinfo.awardkey, z)
    },
    // parms() {
    //   this.linkimg = this.parms.link
    // },
    // awardinfo() {
    //   this.list = this.awardinfo
    // }
  },
  methods: {
    getList(awardkey, z) {
      getGameList(awardkey, z).then(res => {
        this.list = res.results.data
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.response.data.message
        })
      })
    },
    //微信静默授权
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
      }
    },
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
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.exe666.com/fe/marketing/img/listRank/";
@font-face {
  font-family: "MatrixCode";
  src: url("http://cdn.exe666.com/fe/marketing/img/open_pig/hanyicu.TTF");
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
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .contain {
    width: 100%;
    position: relative;
    .frame {
      width: 75%;
      margin-top: 16%;
    }
    .title {
      width: 80%;
      position: absolute;
      left: 10%;
      top: 0;
    }
    .rank {
      width: 65%;
      position: absolute;
      left: 17%;
      top: 12%;
      .places {
        width: 100%;
        position: relative;
        li {
          width: 100%;
          position: relative;
        }
        .places-head {
          width: 17%;
          position: absolute;
          left: 12%;
          top: 24%;
          border-radius: 50%;
        }
        .nickname {
          display: inline-block;
          width: 32%;
          position: absolute;
          left: 28%;
          top: 37%;
          font-size: 5vw;
          color: #000;
        }
        .score {
          display: inline-block;
          width: 30%;
          position: absolute;
          right: 1%;
          top: 37%;
          font-size: 5vw;
          color: #000;
          font-family: " MatrixCode";
        }
      }
      .rank-list {
        width: 100%;
        position: relative;
        margin-top: 5%;
        overflow: hidden;
        ul {
          width: 100%;
          height: 400px;
          padding: 2% 0;
          overflow: hidden;
          overflow-y: scroll;
        }
        li {
          position: relative;
          margin: 2% 0;
          height: 12%;
        }
        .rank-list {
          position: absolute;
          left: 0%;
          top: 0;
        }
        .places-head {
          width: 17%;
          position: absolute;
          left: 3%;
          top: 4%;
          z-index: 99;
          border-radius: 50%;
        }
        .nickname {
          display: inline-block;
          width: 32%;
          position: absolute;
          left: 28%;
          top: 26%;
          font-size: 5vw;
          color: #000;
          z-index: 99;
        }
        .score {
          display: inline-block;
          width: 30%;
          position: absolute;
          right: 1%;
          top: 26%;
          font-size: 5vw;
          color: #000;
          z-index: 99;
          font-family: MatrixCode;
        }
        .rankName {
          width: 5%;
          position: absolute;
          left: 0;
          top: 27%;
          font-size: 5vw;
          color: #000;
          z-index: 99;
        }
        img {
          width: 88%;
          margin-left: 7%;
        }
      }
    }
  }
  .logo {
    width: 30%;
    position: relative;
    margin-top: 15%;
  }
}
</style>
