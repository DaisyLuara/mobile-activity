<template>
  <div
    v-if="status.hasFetchUserData || !status.isInWechat"
    id="root"
    :style="style.root"
    class="root"
  >
    <!-- 宝箱 -->
    <div 
      :style="style.box"
      class="root-box"
      @click="handleSuoHaOpen"
    >
      <img 
        :src="serverUrl + 'lottery.png'"
        class="box-box"
        alt=""
      >
      
      <img
        :src="serverUrl + 'suohua-text.png'" 
        class="box-text"
        alt=""
      >
    </div>
    <!-- bg -->
    <img 
      :src="serverUrl + 'background_1.png'" 
      class="bg"
    >

    <!-- 提取照片相框 -->
    <img 
      :src="serverUrl + 'bottom_1.png'" 
      class="kuang"
    >

    <!-- 相框上照片 -->
    <img
      :src="imgUrl" 
      class="get-photo"
    >

    <!-- game -->
    <div
      :style="style.game" 
      class="game-div"
    >
      <img
        :src="serverUrl + 'bottom_2.png'" 
        class="game-bg"
      >

      <!-- 录音 -->
      <div 
        v-show="!status.shouldResultShow"
        class="bg-contianer"
      >
        <div class="logo">
          <img :src="serverUrl + 'logo.png'">
        </div>
        <img 
          :src="serverUrl + 'prompt_1.png'"
          class="prompt-1"
        >
        <!-- 计时器 -->
        <div class="timer">
          <div class="text">
            <span>Time</span>
            <span>{{ control.time }}s</span>
          </div>
          <div class="line">
            <img
              :src="serverUrl + 'schedule_1.png'" 
              class="line-1" 
            >
            <img
              :style="style.line"
              :src="serverUrl + 'schedule_2.png'" 
              class="line-2" 
            >
          </div>
        </div>

        <!-- 录音提提示 -->
        <img
          v-show="status.isTimeButtonClick"
          :src="serverUrl + 'recording.png'" 
          class="recording"
        >
        <div
          v-show="status.isAnalyzing"
          :style="style.recording"
          class="recording"
        >
          <img
            :src="serverUrl + 'analysis_bg.png'" 
            class="innerBg"
          >
          <div class="innerText">
            <div class="textline1">
              撩人的声音
            </div>
            <div class="textline2">
              <span v-show="control.commaCount % 3 === 0">正在分析中.</span>
              <span v-show="control.commaCount % 3 === 1">正在分析中..</span>
              <span v-show="control.commaCount % 3 === 2">正在分析中...</span>
            </div>
          </div>
        </div>
       
        <img 
          :src="serverUrl + 'recorder.png'" 
          class="recorder"
        >
        <img 
          :src="serverUrl + 'prompt_2.png'" 
          class="prompt-2"
        >
        <div
          class="recoder-button"
          @touchstart="handleButtonTouch" 
          @touchend="handleButtonTouchEnd"
        >
          <img
            v-show="!status.isTimeButtonClick"
            :src="serverUrl + 'button.png'"
          >
          <img
            v-show="status.isTimeButtonClick"
            :src="serverUrl + 'button_press.png'"
          >
        </div>
        <img
          :src="serverUrl + 'copywriting_' + random4 + '.png'" 
          class="copywriting"
        >
      </div>

      <!-- 结果卡片 -->
      <div
        v-show="status.shouldResultShow"
        id="resultcard"
        class="result-contianer"
      >
        <div class="card">
          <img
            :src="serverUrl + 'card_background.png'" 
            class="card-bg" 
          >
          <img 
            :src="serverUrl + 'avatar.png'" 
            class="card-avatar"
          >
          <div 
            class="card-avatar-top"
          >
            <img 
              :src="userInfo.headimgurl"  
            >
          </div>
          <div class="card-nickname">
            {{ userInfo.nickname }}
          </div>
          <!-- 卡片信息 -->
          <div class="card-info"> 
            <div class="info-line">
              <div class="line-label">
                音撩称号：
              </div>
              <div class="line-value-1">
                {{ randomInfo.chenghao }}
              </div>
            </div>
            <div class="info-line">
              <div class="line-label">
                音撩特技：
              </div>
              <div class="line-value-1">
                {{ randomInfo.teji[0] }}
              </div>
              <div class="line-value-2">
                {{ randomInfo.teji[3] }}%
              </div>
            </div>
            <div class="info-line">
              <div class="line-label" />
              <div class="line-value-1">
                {{ randomInfo.teji[1] }}
              </div>
              <div class="line-value-2">
                {{ randomInfo.teji[4] }}%
              </div>
            </div>
            <div class="info-line">
              <div class="line-label" />
              <div class="line-value-1">
                {{ randomInfo.teji[2] }}
              </div>
              <div class="line-value-2">
                {{ randomInfo.teji[5] }}%
              </div>
            </div>
            <div class="info-line">
              <div class="line-label-l">
                <span class="label">撩人指数:</span>
                <span class="value">{{ randomInfo.zhishu }}</span>
              </div>
              <div class="line-label-r">
                <span class="label">心动值</span>
                <span class="value">{{ randomInfo.xindongzhi }}</span>
              </div>
            </div>
            <div class="info-line-2">
              <span class="line-label">扑倒成功率:</span>
              <span class="line-value">{{ randomInfo.chenggonglv }}</span>
            </div>
            <div class="info-line-2">
              <div 
                class="line-label" 
                style="width: 28% "
              >
                音色评价:
              </div>
              <div 
                class="line-value" 
                style="width: 70% "
              >
                <img 
                  v-for="(item,index) in randomInfo.yinse" 
                  :key="index" 
                  :src="serverUrl + 'love.png'" 
                >
              </div>
            </div>
          </div>

          <!-- 其他信息 -->
          <div class="card-more">
            <div class="logo-area">
              <img
                :src="serverUrl + 'logo.png'" 
                class="logo-img" 
              >
              <div
                class="remind-word"
              > 
                扫一扫，生成你的音撩报告
              </div>
            </div>
            <div class="qrcode">
              <img :src="serverUrl + 'indexQrCode.png'">
            </div>
          </div>
        </div>
        <!-- 功能区域 -->
        <div class="func">
          <div
            v-if="control.isInSharePage === false"
            class="button-contianer" 
            @touchstart="handleAgainButtonTouch" 
            @touchend="handleAgainButtonTouchEnd"
          >
            <img
              v-show="!status.isAgainButtonTouch" 
              :src="serverUrl + 'button_1.png'" 
            >
            <img 
              v-show="status.isAgainButtonTouch" 
              :src="serverUrl + 'button_1_press.png'" 
            >
          </div>
          <div
            v-if="control.isInSharePage === false"
            class="button-contianer" 
            @touchstart="handleShareButtonTouch"  
            @touchend.prevent="handleShareButtonTouchEnd"
          >
            <img
              v-show="!status.isShareButtonTouch" 
              :src="serverUrl + 'button_2.png'" 
            >
            <img
              v-show="status.isShareButtonTouch" 
              :src="serverUrl + 'button_2_press.png'" 
            >
          </div>
          <div 
            v-if="control.isInSharePage === true"
            class="button-contianer-middle" 
            @touchstart="handleIamGoPlayButtonTouch" 
            @touchend="handleIamGoPlayButtonTouchEnd"
          >
            <img
              v-show="!status.isIamGoingToPlayClick" 
              :src="serverUrl + 'button_3.png'" 
            >
            <img
              v-show="status.isIamGoingToPlayClick" 
              :src="serverUrl + 'button_3_press.png'" 
            >
          </div>
        </div>      
      </div>
    </div>
    
    <!-- concert -->
    <img
      :src="serverUrl + 'concert.png'"
      class="concert"
    >
    
    <div
      class="concert-button"
      @touchstart="handleConcertButtonTouch"
      @touchend="handleConcertButtonTouchEnd"
    >
      <img
        v-show="!status.isConcertButtonClick" 
        :src="serverUrl + 'concert_button.png'" 
      >

      <img
        v-show="status.isConcertButtonClick" 
        :src="serverUrl + 'concert_button_press.png'" 
      >
    </div>

    <!-- cover -->
    <share-cover :should-show="status.shouldShareShow" />

    <!-- suoha -->
    <suoha 
      ref="suoha" 
      :should-show="status.shouldSuoHaShow"
    />
  </div>
</template>

<script>
const parseUrl = process.env.PARSE_SERVER;
const serverUrl =
  "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/weixun/gameindex/";
const wiw = window.innerWidth;
const wih = window.innerHeight;
import shareCover from "./components/shareCover";
import suoha from "./components/suoha";
import { generate, randomNum } from "./random/index.js";
import {
  getWxUserInfo,
  $wechat,
  isInWechat,
  Cookies,
  getInfoById
} from "services";

export default {
  components: {
    "share-cover": shareCover,
    suoha: suoha
  },
  data() {
    return {
      style: {
        root: {},
        game: {
          height: (((wiw * 1275) / 716) * 620) / 667 + "px",
          width: "100%",
          top: "43%"
        },
        line: {
          width: "0%"
        },
        recording: {
          height: wiw * 0.41 + "px"
        },
        box: {
          height: window.innerWidth * 0.36 + "px"
        }
      },
      serverUrl: serverUrl,
      imgUrl: null,
      status: {
        shouldResultShow: false,
        isTimeButtonClick: false,
        isConcertButtonClick: false,
        isIamGoingToPlayClick: false,
        isAnalyzing: false,
        hasPresseed: false,
        isAgainButtonTouch: false,
        isShareButtonTouch: false,
        shouldShareShow: false,
        shouldSuoHaShow: false,
        hasFetchUserData: false,
        isInWechat: false
      },
      control: {
        time: 0,
        intervalCount: null,
        commaInterval: null,
        commaCount: 0,
        isInSharePage: false,
        shouldBoxShow: true
      },
      userInfo: {
        headimgurl: null,
        nickname: null
        // 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJNrlPjqkUjXibZm64k9NRNQGZdtziap3BGyuNKefPfEgWfn5EU4ib3bjHC9icJAwuVa8pOqspoLYWopg/132'
      },
      serverDataId: null,
      randomInfo: {
        teji: new Array(6)
      },
      parseServerSetting: {
        rq_url: `${parseUrl}/parse/classes/record`,
        rq_head: {
          headers: {
            "X-Parse-Application-Id": "jingfree_android",
            "X-Parse-Master-Key": "aa9YOWvTxxCY2RXT",
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      },
      wxShareInfoValue: {
        title: "音撩指数",
        desc: "用最撩人的歌词，测试你声音的撩人指数，让声音成为你撩人的武器",
        imgUrl: serverUrl + "share.png",
        link: window.location.origin + "/marketing/weiindex?sid=-1"
      },
      currentUserData: {
        headimgurl: "",
        nickname: ""
      },
      random4: randomNum(1, 4),
      concertUrl:
        "https://m.damai.cn/damai/perform/item.html?projectId=150060&spm=a2o6e.search.0.0.6c286acelZQlgc"
    };
  },
  created() {
    this.handleWechatShare();
    this.init();
    if (isInWechat() === true) {
      this.handleWechatAuth();
      this.status.isInWechat = true;
    }
  },
  beforeDestroy() {
    document.body.style.overflow = "";
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue);
          })
          .catch(err => {
            console.warn(err.message);
          });
      } else {
        console.warn("you r not in wechat environment");
      }
    },
    saveDataToServer() {
      let rq_data = {
        userData: {
          headimgurl: this.userInfo.headimgurl,
          nickname: this.userInfo.nickname,
          randomInfo: this.randomInfo
        }
      };
      this.$http
        .post(
          this.parseServerSetting.rq_url,
          rq_data,
          this.parseServerSetting.rq_head
        )
        .then(response => {
          this.serverDataId = response.data.objectId;
          this.wxShareInfoValue.link =
            window.location.origin +
            "/marketing/weiindex?sid=" +
            this.serverDataId;
          this.handleWechatShare();
        })
        .catch(err => {
          console.warn(err.message);
        });
    },
    getDataBySid() {
      let obj = {
        objectId: this.$route.query.sid
      };
      let rq_url =
        `${parseUrl}/parse/classes/record?where=` + JSON.stringify(obj);
      this.$http
        .get(rq_url, this.parseServerSetting.rq_head)
        .then(response => {
          let res = response.data.results[0].userData;
          this.userInfo.headimgurl = res.headimgurl;
          this.userInfo.nickname = res.nickname;
          this.randomInfo = res.randomInfo;
          this.status.shouldResultShow = true;
        })
        .catch(err => {
          console.warn(err.message);
        });
    },
    init() {
      document.title = "测试你的音撩报告";
      // 设置Rem
      this.setUpRem();
      // 处理分享数据
      this.processPath();
      // if (localStorage.getItem('hasSuoha') === 'false') {
      //   this.control.shouldBoxShow = false
      // }
    },
    processPath() {
      // sid 作为判断本页是否为分享之后的页面
      if (this.$route.query.hasOwnProperty("sid")) {
        this.style.root.marginTop = "-156%";
        // -1代表没有分享内容，否则获取已经保存的数据
        if (this.$route.query.sid !== "-1") {
          this.getDataBySid();
          this.control.isInSharePage = true;
        }
      }
      if (this.$route.query.hasOwnProperty("id")) {
        this.getPhotoById();
      }
    },
    setUpRem() {
      document.getElementsByTagName("html")[0].style.fontSize =
        window.innerWidth / 37.5 + "px";
    },
    handleButtonTouch() {
      if (this.status.hasPresseed) {
        return;
      } else {
        this.status.isTimeButtonClick = true;
        this.control.intervalCount = setInterval(() => {
          this.control.time += 1;
          let preprocess = this.control.time >= 5 ? 5 : this.control.time;
          this.style.line.width =
            parseInt((preprocess / 5) * 100).toString() + "%";
        }, 1000);
      }
    },
    handleButtonTouchEnd() {
      this.status.hasPresseed = true;
      this.status.isTimeButtonClick = false;
      this.status.isAnalyzing = true;
      clearInterval(this.control.intervalCount);
      this.control.commaInterval = setInterval(() => {
        this.control.commaCount += 1;
      }, 500);
      this.handleHtmlToImage();
    },
    handleHtmlToImage() {
      this.handleRandomGenerate();
      setTimeout(() => {
        this.status.isAnalyzing = false;
        this.status.shouldResultShow = true;
        clearInterval(this.control.commaInterval);
      }, 2000);
    },
    handleRandomGenerate() {
      let teji = generate("teji");
      let chenghao = generate("chenghao");
      this.randomInfo.teji = teji;
      this.randomInfo.chenghao = chenghao;
      this.randomInfo.zhishu = randomNum(60, 100);
      this.randomInfo.xindongzhi = randomNum(0, 9) + randomNum(0, 9) / 10;
      this.randomInfo.chenggonglv = String(randomNum(0, 100)) + "%";
      this.randomInfo.yinse = randomNum(3, 5);
      getWxUserInfo().then(r => {
        this.userInfo.headimgurl = r.data.headimgurl;
        this.userInfo.nickname = r.data.nickname;
      });
      this.saveDataToServer();
    },
    handleConcertButtonTouch() {
      this.status.isConcertButtonClick = true;
    },
    handleConcertButtonTouchEnd() {
      this.status.isConcertButtonClick = false;
      window.location.href = this.concertUrl;
    },

    handleCoverClose() {
      this.status.shouldShareShow = false;
    },
    handleGameReset() {
      this.status.isTimeButtonClick = false;
      this.status.isAnalyzing = false;
      this.status.hasPresseed = false;
      this.control.time = 0;
      this.control.intervalCount = null;
      this.control.commaInterval = null;
      this.control.commaCount = 0;
      this.status.shouldResultShow = false;
      this.style.line.width = "0%";
    },
    getPhotoById() {
      if (this.$route.query.hasOwnProperty("id")) {
        getInfoById(this.$route.query.id)
          .then(res => {
            if (res.code !== null) {
              this.imgUrl = res.code;
            } else {
              this.imgUrl = res.image;
            }
          })
          .catch(err => {
            console.warn(err.message);
          });
      }
    },
    handleAgainButtonTouch() {
      this.status.isAgainButtonTouch = true;
    },
    handleAgainButtonTouchEnd() {
      this.status.isAgainButtonTouch = false;
      this.handleGameReset();
    },
    handleShareButtonTouch() {
      this.status.isShareButtonTouch = true;
    },
    handleShareButtonTouchEnd() {
      this.status.isShareButtonTouch = false;
      this.status.shouldShareShow = true;
      document.body.style.overflow = "hidden";
    },
    handleSuoHaClose() {
      this.status.shouldSuoHaShow = false;
    },
    handleSuoHaOpen() {
      this.status.shouldSuoHaShow = true;
      document.body.style.overflow = "hidden";
      this.$refs.suoha.checkCoupon();
    },
    handleWechatAuth() {
      if (Cookies.get("sign") === null) {
        this.handleFirstAuth();
      } else {
        this.getuserData();
      }
    },
    getuserData() {
      getWxUserInfo().then(r => {
        // 如果是扫码（‘-1’代表网页入口,没有sid代表大屏）进入
        // 则直接获取本用户信息
        if (
          this.$route.query.sid === "-1" ||
          !this.$route.query.hasOwnProperty("sid")
        ) {
          this.userInfo.headimgurl = r.data.headimgurl;
          this.userInfo.nickname = r.data.nickname;
        }
        this.status.hasFetchUserData = true;
      });
    },
    handleFirstAuth() {
      let storeData = {};
      let now_url = encodeURIComponent(String(window.location.href));
      // console.dir(now_url)
      let redirct_url =
        process.env.WX_API +
        "/wx/officialAccount/oauth?url=" +
        now_url +
        "&scope=snsapi_userinfo";
      // console.dir(redirct_url)
      window.location.href = redirct_url;
    },
    handleIamGoPlayButtonTouch() {
      this.status.isIamGoingToPlayClick = true;
    },
    handleIamGoPlayButtonTouchEnd() {
      this.handleGameReset();
      this.status.isIamGoingToPlayClick = false;
      this.control.isInSharePage = false;
    }
  }
};
</script>

<style lang="less" scoped>
@imgServerUrl: "https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/weixun/gameindex";
.root {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  .root-box {
    z-index: 5000;
    position: fixed;
    width: 28%;
    top: 5%;
    right: 5%;
    height: 20%;
    .box-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      animation: scaleAnimation 1s infinite;
    }
    .box-text {
      position: absolute;
      bottom: 5%;
      left: -3%;
      width: 100%;
    }
  }
  .bg {
    width: 100%;
    z-index: 10;
    position: relative;
  }
  .kuang {
    position: absolute;
    top: 3.3%;
    left: 0;
    z-index: 11;
    width: 96.6%;
  }
  .get-photo {
    position: absolute;
    top: 3.9%;
    left: 6%;
    width: 77.6%;
    z-index: 12;
  }

  .game-div {
    position: absolute;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    .game-bg {
      width: 94%;
      z-index: 11;
    }
    .bg-contianer {
      position: absolute;
      width: 94%;
      height: 100%;
      z-index: 12;
      top: 0;
      left: 3%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .logo {
        width: 50%;
        img {
          width: 100%;
        }
      }
      .prompt-1 {
        width: 79%;
        margin-top: 5%;
      }
      .timer {
        margin-top: 5%;
        width: 60%;
        position: relative;
        z-index: 13;
        .text {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          min-width: 18px;
        }
        .line {
          z-index: 14;
          width: 100%;
          position: relative;
          .line-1 {
            width: 100%;
            z-index: 16;
            position: relative;
          }
          .line-2 {
            border-radius: 10px;
            position: absolute;
            top: 13%;
            height: 82%;
            z-index: 15;
          }
        }
      }
      .recording {
        position: absolute;
        width: 41%;
        margin-top: 57%;
        z-index: 13;
        .innerBg {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 14;
        }
        .innerText {
          z-index: 15;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          .textline1 {
            font-size: 14px;
            width: 100%;
            color: white;
            z-index: 16;
          }
          .textline2 {
            margin-top: 5%;
            font-size: 16px;
            width: 100%;
            color: white;
            z-index: 16;
          }
        }
      }
      .recorder {
        width: 45%;
        margin-top: 6%;
      }
      .prompt-2 {
        width: 60%;
        margin-top: 8%;
      }
      .recoder-button {
        margin-top: 3%;
        width: 70%;
        -webkit-touch-callout: none;
        user-select: none;
        img {
          -webkit-touch-callout: none;
          user-select: none;
          pointer-events: none;
          width: 100%;
        }
      }
      .copywriting {
        width: 90%;
        margin-top: 8%;
      }
    }
    .result-contianer {
      position: absolute;
      width: 94%;
      height: 100%;
      z-index: 12;
      top: 0;
      left: 3%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .card {
        margin-top: 5%;
        z-index: 13;
        background-size: cover;
        width: 85%;
        height: 85%;
        position: relative;
        .card-bg {
          position: relative;
          width: 100%;
          z-index: 14;
        }
        .card-avatar {
          z-index: 15;
          position: absolute;
          top: 2%;
          left: 0;
          width: 42%;
          margin: 0 auto;
          right: 0;
        }
        .card-avatar-top {
          z-index: 15;
          position: absolute;
          top: 2.3%;
          left: 36%;
          width: 23.2%;
          right: 0;
          height: 14%;
          border-radius: 50%;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .card-nickname {
          position: absolute;
          z-index: 15;
          top: 17%;
          width: 100%;
          height: 25px;
          text-align: center;
          color: #57168f;
          font-size: 1.4rem;
          line-height: 25px;
        }
        .card-info {
          z-index: 15;
          position: absolute;
          top: 21%;
          left: 0;
          width: 90%;
          left: 5%;
          height: 58%;
          border-bottom: #57168f 1px solid;
          .info-line {
            justify-content: space-between;
            height: 36px;
            align-items: center;
            flex-direction: row;
            position: relative;
            width: 100%;
            .line-label {
              font-weight: 600;
              font-size: 1.6rem;
              line-height: 36px;
              width: 32%;
              display: inline-block;
            }
            .line-value-1 {
              font-size: 1.4rem;
              line-height: 36px;
              font-weight: 600;
              width: 50%;
              color: #57168f;
              display: inline-block;
            }
            .line-value-2 {
              font-size: 1.4rem;
              font-weight: 600;
              text-align: right;
              line-height: 36px;
              width: 15%;
              color: #57168f;
              display: inline-block;
            }
            .line-label-l {
              height: 100%;
              width: 50%;
              display: inline-block;
              .label {
                font-weight: 600;
                font-size: 1.6rem;
                line-height: 36px;
              }
              .value {
                font-size: 1.4rem;
                line-height: 36px;
                font-weight: 600;
                color: #57168f;
              }
            }
            .line-label-r {
              height: 100%;
              width: 48%;
              display: inline-block;
              text-align: right;
              line-height: 36px;
              .label {
                font-weight: 600;
                font-size: 1.6rem;
                line-height: 36px;
              }
              .value {
                font-size: 1.4rem;
                line-height: 36px;
                font-weight: 600;
                color: #57168f;
              }
            }
          }
          .info-line-2 {
            justify-content: flex-start;
            height: 36px;
            align-items: center;
            flex-direction: row;
            position: relative;
            flex-wrap: nowrap;
            width: 100%;
            .line-label {
              font-weight: 600;
              font-size: 1.6rem;
              line-height: 36px;
              display: inline-block;
            }
            .line-value {
              font-size: 1.4rem;
              line-height: 36px;
              font-weight: 600;
              color: #57168f;
              display: inline-block;
              img {
                width: 20%;
                padding: 0 5%;
              }
            }
          }
        }
        .card-more {
          z-index: 15;
          position: absolute;
          left: 0;
          top: 79%;
          width: 100%;
          height: 20%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 4%;
          .logo-area {
            width: 40%;
            height: 100%;
            .logo-img {
              width: 100%;
            }
            .remind-word {
              word-break: break-all;
              font-size: 1.3rem;
            }
          }
          .qrcode {
            width: 30%;
            img {
              width: 100%;
            }
          }
        }
      }
      .func {
        height: 16%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 10%;
        .button-contianer {
          width: 47%;
          margin: auto 0;
          img {
            width: 100%;
          }
        }
        .button-contianer-middle {
          width: 47%;
          margin: auto;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .concert {
    width: 96%;
    position: absolute;
    bottom: 2.7%;
    left: 2%;
    z-index: 11;
  }
  .concert-button {
    width: 45%;
    position: absolute;
    bottom: 5.6%;
    left: 34%;
    z-index: 11;
    img {
      width: 100%;
    }
  }
}
@keyframes scaleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
