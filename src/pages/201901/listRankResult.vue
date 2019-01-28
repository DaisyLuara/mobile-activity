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
            v-show="index<=2"
            :key="index"
          >
            <!-- 头像 -->
            <img
              :src="item.face"
              class="places-head"
            >
            <!-- 昵称 -->
            <span class="nickname">{{ item.nickname.length>4?(item.nickname.substring(0,4)+'...'):item.nickname }}</span>
            <!-- 分数 -->
            <span class="score">{{ item.value }}</span>
            <img
              v-show="index===0"
              :src="baseUrl + 'g_01.png'"
            >
            <img
              v-show="index===1"
              :src="baseUrl + 'g_02.png'"
            >
            <img
              v-show="index===2"
              :src="baseUrl + 'g_03.png'"
            >
            <img
              v-show="index===0"
              :src="baseUrl + 'crown1.png'"
              class="crown"
            >
            <img
              v-show="index===1"
              :src="baseUrl + 'crown2.png'"
              class="crown"
            >
            <img
              v-show="index===2"
              :src="baseUrl + 'crown3.png'"
              class="crown"
            >
          </li>
        </ul>
        <!-- 后面列表展示  -->
        <div class="rank-list">
          <ul>
            <li
              v-for="(item ,index) in list"
              v-show="index > 2"
              :key="index"
            >
              <span class="rankName">{{ index+1 }}</span>
              <!-- 头像 -->
              <img
                :src="item.face"
                class="places-head"
              >
              <!-- 昵称 -->
              <span class="nickname">{{ item.nickname.length>4?(item.nickname.substring(0,4)+'...'):item.nickname }}</span>
              <!-- 分数 -->
              <span class="score">{{ item.value }}</span>
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
      wxShareInfoValue: {
        title: "亲爱的，新年快乐!",
        desc: "猪年大吉，猪事顺利",
        link: "http://papi.xingstation.com/api/s/NYL" + window.location.search,
        imgUrl: cdnUrl + "/fe/marketing/img/listRank/icon.png"
      }
    };
  },
  watch: {
    actinfo() {
      this.cookies_z = Cookies.get('z')
      let z = this.cookies_z || this.userinfo.z
      this.getList(this.actinfo.awardkey, z)
    },
  },
  mounted() {
    this.cookies_z = Cookies.get('z')
    this.handleForbiddenShare();
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
  src: url("http://cdn.exe666.com/fe/marketing/img/listRank/hanyicu.TTF");
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
          margin: 5% 0;
        }
        .places-head {
          width: 15%;
          position: absolute;
          left: 14%;
          top: 9.6%;
          border-radius: 50%;
        }
        .crown {
          width: 12%;
          position: absolute;
          left: 10%;
          top: -15.4%;
          z-index: 9;
        }
        .nickname {
          display: inline-block;
          width: 32%;
          position: absolute;
          left: 28%;
          top: 35%;
          font-size: 3.5vw;
          color: #600019;
        }
        .score {
          display: inline-block;
          width: 30%;
          position: absolute;
          right: 1%;
          top: 25%;
          font-size: 5vw;
          color: #600019;
          font-family: "MatrixCode";
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
          overflow: hidden;
          overflow-y: scroll;
        }
        li {
          position: relative;
          height: 12%;
          margin: 0 0 5% 0;
        }
        .rank-list {
          position: absolute;
          left: 0%;
          top: 0;
        }
        .places-head {
          width: 15.5%;
          position: absolute;
          left: 1.4%;
          top: 8%;
          z-index: 99;
          border-radius: 50%;
        }
        .nickname {
          display: inline-block;
          width: 32%;
          position: absolute;
          left: 28%;
          top: 34%;
          font-size: 3vw;
          color: #fff;
          z-index: 99;
        }
        .score {
          display: inline-block;
          width: 30%;
          position: absolute;
          right: 1%;
          top: 26%;
          font-size: 5vw;
          color: #fff;
          z-index: 99;
          font-family: "MatrixCode";
        }
        .rankName {
          width: 5%;
          position: absolute;
          left: 0;
          top: 27%;
          font-size: 5vw;
          color: #fff;
          z-index: 99;
          font-family: "MatrixCode";
        }
        img {
          width: 88%;
          margin-left: 12%;
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
