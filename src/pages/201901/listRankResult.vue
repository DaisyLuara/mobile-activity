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
      list: [
        { "auid": "1551", "uid": "88888", "avrid": "4825", "avridtmp": "4825", "value": "95", "kid": "7034930", "link": "http://face.exe666.com/1007/face/kiki_880_3751492945231394_848.jpg", "views": "0", "day_num": "1", "user_num": "1", "date": "2019-01-08 16:55:00", "clientdate": "1546937700000", "nickname": "淡然", "gender": "1", "age": "20", "face": "https://wx.qlogo.cn/mmopen/vi_32/8gy835dKev8fibUhibQ7FVCHYN68jsS9jxj7t5qGia4EIT6hmuNdur2MHp6OicSFMG0hsU4hFnWP7QYgJvCRyhE8Hg/132" }, { "auid": "1289", "uid": "10000", "avrid": "5785", "avridtmp": "5785", "value": "93", "kid": "6610123", "link": "http://face.exe666.com/1007/face/kiki_174_1021492987806318_1093.jpg", "views": "0", "day_num": "1", "user_num": "5", "date": "2019-01-22 12:16:22", "clientdate": "1548130582000", "nickname": "黄一", "gender": "1", "age": "25", "face": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqbNz7AMxaq6qkWfG8wku43yr6giaIMUw8BtI39Dp12HGhBRrz8cG7rqbTxPogJawXNuYvuj3dmeZw/132" }, { "auid": "1287", "uid": "112348", "avrid": "4387", "avridtmp": "4387", "value": "92", "kid": "6610123", "link": "http://face.exe666.com/1007/face/kiki_174_3651492934175765_513.jpg", "views": "0", "day_num": "1", "user_num": "1", "date": "2019-01-04 15:33:29", "clientdate": "1546587209000", "nickname": "Wending", "gender": "1", "age": "24", "face": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLyBXRPx48DjQ3EvfLQuWj6DoBJRJBj2icdDLicbm62dGTicOdnASkUlFTd2SEicNKprrzZZmSZZ5Ts4w/132" }, { "auid": "1306", "uid": "10086", "avrid": "4414", "avridtmp": "4414", "value": "86", "kid": "5385499", "link": "http://face.exe666.com/1007/face/kiki_881_7881492948246280_1459.jpg", "views": "0", "day_num": "1", "user_num": "1", "date": "2019-01-04 19:28:03", "clientdate": "1546601283000", "nickname": "海阔天空", "gender": "1", "age": "36", "face": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoZibp9IsxKYJzG8z1icd9NsREovDUBDUzl9wcGJ1UB9y9b7QcSTXwZQZ4PUsgU15WGQlIedbKMCxww/132" }
      ],
      auid: null,
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
    this.handleForbiddenShare();
  },
  watch: {
    actinfo() {
      this.cookies_z = Cookies.get('z')
      let z = this.cookies_z || this.userinfo.z
      this.getList(this.actinfo.awardkey, z)
    },
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
        }
        .places-head {
          width: 12.5%;
          position: absolute;
          left: 15%;
          top: 32%;
          border-radius: 50%;
        }
        .nickname {
          display: inline-block;
          width: 32%;
          position: absolute;
          left: 28%;
          top: 45%;
          font-size: 3.5vw;
          color: #600019;
        }
        .score {
          display: inline-block;
          width: 30%;
          position: absolute;
          right: 1%;
          top: 37%;
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
          width: 16.5%;
          position: absolute;
          left: 1%;
          top: 5%;
          z-index: 99;
          border-radius: 50%;
        }
        .nickname {
          display: inline-block;
          width: 32%;
          position: absolute;
          left: 28%;
          top: 34%;
          font-size: 3.5vw;
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
