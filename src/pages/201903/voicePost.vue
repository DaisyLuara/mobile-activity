<template>
  <div
    :style="style.root"
    class="root"
  >
    <!-- 加载中 -->
    <div
      v-if="loading"
      class="shade"
    />
    <img
      v-if="loading"
      :src="baseUrl + 'loading.png'+ this.$qiniuCompress()"
      class="loading"
    >
    <!-- 加载中 -->
    <div
      v-show="tit.titOne"
      class="tit1"
      @click.stop="cancles"
    >
      <img :src="baseUrl + 'tit1.png'+ this.$qiniuCompress()">
    </div>
    <div
      v-show="tit.titTwo"
      class="tit2"
      @click.stop="cancles"
    >
      <img :src="baseUrl + 'tit2.png'+ this.$qiniuCompress()">
    </div>
    <div
      v-show="tit.titThree"
      class="tit3"
      @click.stop="cancles"
    >
      <img :src="baseUrl + 'tit3.png'+ this.$qiniuCompress()">
    </div>
    <div class="t-1">
      <img
        :src="baseUrl + 'top.png'+ this.$qiniuCompress()"
        class="t1"
      >
    </div>
    <div class="t-2">
      <img
        :src="baseUrl + 'section_1.png'+ this.$qiniuCompress()"
        class="t2-1"
      >
      <!-- 录音  -->
      <div
        v-show="button.buttonOne"
        class="button-1"
        @touchstart="startRecord"
        @touchend="stopRecord"
      >
        <img
          :src="baseUrl + 'button_1.png'+ this.$qiniuCompress()"
          class="b-1"
        >
      </div>
      <!-- 正在录音 -->
      <div
        v-show="button.buttonTwo"
        class="button-2"
      >
        <img
          :src="baseUrl + 'wifi.gif'+ this.$qiniuCompress()"
          class="wifi"
        >
        <img
          :src="baseUrl + 'button_2.png'+ this.$qiniuCompress()"
          class="b-1"
        >
      </div>
      <!-- 播放录音 -->
      <div
        v-show="button.buttonThree"
        class="button-3"
      >
        <!-- 播放 -->
        <div
          v-show="player.one"
          @click="playRecord()"
        >
          <img
            :src="baseUrl + 'player.png'+ this.$qiniuCompress()"
            class="player"
          >
          <img
            :src="baseUrl + 'button_3.png'+ this.$qiniuCompress()"
            class="b-1"
          >
        </div>
        <!-- 正在播放 -->
        <div
          v-show="player.two"
          @click="pauseVoice()"
        >
          <img
            :src="baseUrl + 'wifi.gif'+ this.$qiniuCompress()"
            class="wifi"
          >
          <img
            :src="baseUrl + 'button_3.png'+ this.$qiniuCompress()"
            class="b-1"
          >
        </div>
        <!-- 暂停 -->
        <div
          v-show="player.three"
          @click="playRecord()"
        >
          <img
            :src="baseUrl + 'button_4.png'+ this.$qiniuCompress()"
            class="b-1"
          >
        </div>
      </div>
    </div>
    <div class="t-3">
      <img
        :src="baseUrl + 'photo_1.png'+ this.$qiniuCompress()"
        class="cover-left"
      >
      <img
        :src="baseUrl + 'photo_2.png'+ this.$qiniuCompress()"
        class="cover-right"
      >
      <img
        :src="baseUrl + 'section_2.png'+ this.$qiniuCompress()"
        class="t3-1"
      >
      <img
        v-if="photo !== null"
        :src="photo + this.$qiniuCompress()"
        class="photo"
      >
      <div class="jiantou">
        <img
          :src="baseUrl + 'arrow.png'+ this.$qiniuCompress()"
          class="arrow"
        >
        <img
          :src="baseUrl + 'prompt.png'+ this.$qiniuCompress()"
          class="prompt"
        >
      </div>
    </div>
    <img
      :src="baseUrl + 'bottom.png'+ this.$qiniuCompress()"
      class="bottom"
    >
  </div>
</template>
<script>
import {
  isInWechat,
  Cookies,
  userGame,
  $wechat,
  getInfoById,
  getWxUserInfo,
  wechatShareTrack
} from "services";
import { parseService } from "services";
const wx = require("weixin-js-sdk");
const cdnUrl = process.env.CDN_URL;
const parseUrl = process.env.PARSE_SERVER;
const REQ_URL = `${parseUrl}/parse/classes/`;
export default {
  data() {
    return {
      baseUrl: cdnUrl + "/fe/image/voice_post/",
      style: {
        root: {
          height: this.$innerHeight() + "px"
        }
      },
      button: {
        buttonOne: true,
        buttonTwo: false,
        buttonThree: false
      },
      player: {
        one: true,
        two: false,
        three: false
      },
      tit: {
        titOne: false,
        titTwo: false,
        titThree: false
      },
      photo: null,
      loading: true, // loading: true,
      startTime: 0,
      recordTimer: null,
      localId: null,
      userId: null,
      clickNumber: 0,
      params: {
        ID: null,
        serverId: null,
        createTime: null,
        localId: null,
        user_id: null
      },
      imgList: [
        "bg.png",
        "tit1.png",
        "tit2.png",
        "tit3.png",
        "arrow.png",
        "button_1.png",
        "button_2.png",
        "button_3.png",
        "button_4.png",
        "top.png",
        "bottom.png",
        "photo_1.png",
        "photo_2.png",
        "prompt.png",
        "section_1.png",
        "section_2.png",
        "wifi.gif",
        "player.png"
      ],
      wxShareInfoValue: {
        title: "声音邮局·樱花季",
        desc: "您有一封亲密信件，请查收",
        link: "http://papi.xingstation.com/api/s/vZg" + window.location.search,
        imgUrl: cdnUrl + "/fe/image/voice_post/icon.jpg"
      }
    };
  },
  created() {},
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
    this.entry(this.imgList, r => {
      console.dir(r);
      this.getInfoById();
    });
  },
  methods: {
    //图片预加载
    loadImgs(imgList) {
      let preList = [];
      let thisRef = this;
      for (let i = 0; i < imgList.length; i++) {
        let pre = new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = function() {
            resolve(img);
          };
          img.src = thisRef.baseUrl + imgList[i];
        });
        preList.push(pre);
      }
      return Promise.all(preList).then(r => {
        return Promise.resolve(r);
      });
    },
    async entry(imgList, cb) {
      try {
        let rs = await this.loadImgs(imgList);
        cb(rs);
      } catch (err) {
        console.log(err);
        cb([]);
      }
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
        this.query(false);
        this.userId = Cookies.get("user_id");
        this.params.user_id = this.userId;
      }
    },
    getInfoById() {
      let id = this.$route.query.id;
      let code = this.$route.query.code;
      let state = this.$route.query.state;
      getInfoById(id, code, state)
        .then(res => {
          this.photo = res.image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleWxReady(serverId) {
      let reference = this;
      if (isInWechat() === true) {
        if (
          process.env.NODE_ENV === "production" ||
          process.env.NODE_ENV === "testing"
        ) {
          let requestUrl = process.env.WX_API + "/wx/officialAccount/sign";
          this.$http.get(requestUrl).then(response => {
            let resData = response.data.data;
            let wxConfig = {
              debug: false,
              appId: resData.appId,
              timestamp: resData.timestamp,
              nonceStr: resData.nonceStr,
              signature: resData.signature,
              jsApiList: [
                "onMenuShareAppMessage",
                "onMenuShareTimeline",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone",
                "startRecord",
                "stopRecord",
                "onVoiceRecordEnd",
                "playVoice",
                "pauseVoice",
                "stopVoice",
                "onVoicePlayEnd",
                "uploadVoice",
                "downloadVoice"
              ]
            };
            wx.config(wxConfig);
          });
          wx.ready(() => {
            wx.onMenuShareAppMessage(reference.wxShareInfoValue);
            wx.onMenuShareTimeline(reference.wxShareInfoValue);
            wx.onMenuShareQQ(reference.wxShareInfoValue);
            wx.onMenuShareWeibo(reference.wxShareInfoValue);
            wx.onMenuShareQZone(reference.wxShareInfoValue);
            if (serverId != null && serverId != undefined) {
              reference.button.buttonOne = false;
              reference.button.buttonThree = true;
              wx.downloadVoice({
                serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                  console.log("下载语音成功");
                  reference.localId = res.localId;
                  reference.loading = false;
                  console.log(res);
                },
                fail: function(err) {
                  console.log("下载语音失败");
                }
              });
            }
            wx.onVoicePlayEnd({
              success: function(res) {
                reference.localId = res.localId; // 返回音频的本地ID
                reference.player.one = true;
                reference.player.two = false;
                reference.player.three = false;
                console.log("语音播放完毕");
              }
            });
          });
        }
      }
    },
    // 校验是否第一次认证
    queryIsAuthorization() {
      let reference = this;
      let query = {
        user_id: this.userId + ""
      };
      parseService
        .get(REQ_URL + "vpost?where=" + JSON.stringify(query))
        .then(data => {
          console.log(data.results);
          if (data.results.length === 0) {
            reference.saveIsAuthorization();
            wx.stopRecord();
            reference.button.buttonOne = true;
            reference.button.buttonTwo = false;
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存第一次认证
    saveIsAuthorization() {
      let reference = this;
      parseService
        .post(REQ_URL + "vpost", this.params)
        .then(res => {
          console.log("首次认证保存成功");
        })
        .catch(err => {});
    },
    //开始录音
    startRecord(e) {
      let reference = this;
      reference.button.buttonOne = false;
      reference.button.buttonTwo = true;
      event.preventDefault();
      reference.startTime = Math.round(new Date());
      // 延时后录音，避免误操作
      reference.recordTimer = setTimeout(function() {
        wx.startRecord({
          success: function() {
            reference.queryIsAuthorization();
            console.log("录音成功");
          },
          cancel: function() {
            reference.button.buttonOne = true;
            reference.button.buttonTwo = false;
            console.log("用户拒绝授权录音");
          }
        });
      }, 300);
    },
    //结束录音
    stopRecord(event) {
      let reference = this;
      event.preventDefault();
      // 间隔太短 小于一秒
      if (Math.round(new Date()) - reference.startTime < 1000) {
        // alert('录音时间过短')
        this.tit.titTwo = true;
        reference.startTime = 0;
        // 不录音
        clearTimeout(reference.recordTimer);
        reference.button.buttonOne = true;
        reference.button.buttonTwo = false;
      } else {
        // 松手结束录音
        wx.stopRecord({
          success: function(res) {
            reference.localId = res.localId;
            reference.params.localId = res.localId;
            console.log("localId:", reference.localId);
            console.log("停止录音成功");
            // 上传到服务器
            reference.uploadRecord();
          },
          fail: function(res) {
            reference.button.buttonOne = true;
            reference.button.buttonTwo = false;
            console.log(JSON.stringify(res));
          }
        });
      }
    },
    // 上传录音
    uploadRecord() {
      let reference = this;
      let startTime = Math.round(new Date());
      //过期时间3天
      let timeDifference = 3 * (24 * 60 * 60) * 1000;
      wx.uploadVoice({
        localId: reference.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
          let serverId = res.serverId; // 返回音频的服务器端ID
          reference.reloadHandleWxReady(serverId);
          reference.params.serverId = serverId + "";
          reference.params.createTime = new Date(startTime + timeDifference);
          console.log("微信上传录音成功");
          console.log("serverId:", serverId);
          reference.save();
        },
        fail: function(res) {
          reference.button.buttonOne = true;
          reference.button.buttonTwo = false;
          console.log("上传到微信服务器异常", res);
        }
      });
    },
    //重加载微信
    reloadHandleWxReady(serverId) {
      //重新加载微信分享
      this.handleWxReady(serverId);
    },
    // 播放语音
    playVoice() {
      let reference = this;
      wx.playVoice({
        localId: reference.localId,
        success: function(res) {
          console.log("播放成功");
        },
        fail: function(r) {
          console.log(dir);
          console.log("播放异常");
          console.log(reference.localId);
        }
      });
    },
    //暂停播放语音
    pauseVoice() {
      let reference = this;
      wx.pauseVoice({
        localId: reference.localId, // 需要暂停的音频的本地ID，由stopRecord接口获得
        success: function(res) {
          reference.player.one = false;
          reference.player.two = false;
          reference.player.three = true;
          console.log("暂停播放成功");
        },
        fail: function() {
          console.log("播放暂停异常");
        }
      });
    },
    //语音播放完毕
    voicePlayEnd() {
      let reference = this;
      wx.onVoicePlayEnd({
        success: function(res) {
          reference.localId = res.localId; // 返回音频的本地ID
          reference.player.one = true;
          reference.player.two = false;
          reference.player.three = false;
          console.log("语音播放完毕");
        }
      });
    },
    // 保存到parseService
    save() {
      let reference = this;
      reference.params.ID = reference.$route.query.id + "";
      parseService
        .post(REQ_URL + "vpost", this.params)
        .then(res => {
          reference.button.buttonTwo = false;
          reference.button.buttonThree = true;
          // alert('保存录音成功')
          this.tit.titThree = true;
        })
        .catch(err => {
          reference.button.buttonOne = true;
          reference.button.buttonTwo = false;
          console.log("保存录音失败");
        });
    },
    // 查询parseService
    query(isPlay) {
      let reference = this;
      let query = {
        ID: this.$route.query.id + ""
      };
      parseService
        .get(REQ_URL + "vpost?where=" + JSON.stringify(query))
        .then(data => {
          if (data.results.length > 0) {
            this.button.buttonOne = false;
            this.button.buttonThree = true;
            //满足过期条件
            if (
              Math.round(new Date(data.results[0].createTime)) -
                Math.round(new Date()) <
              0
            ) {
              if (reference.clickNumber > 0 && isPlay) {
                // alert('语音过期')
                this.tit.titOne = true;
              }
              return false;
            }
            reference.clickNumber++;
            //获取
            reference.localId =
              reference.localId === null
                ? data.results[0].localId
                : reference.localId;
            if (!isPlay) {
              reference.reloadHandleWxReady(data.results[0].serverId);
            }
            if (isPlay) {
              reference.playVoice();
            }
          } else {
            let Timer = setTimeout(function() {
              reference.loading = false;
            }, 2000);
            reference.handleWxReady(null);
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    playRecord() {
      //控制播放部分
      this.player.one = false;
      this.player.two = true;
      this.player.three = false;
      this.query(true);
    },
    //取消提示
    cancles() {
      this.tit.titOne = false;
      this.tit.titTwo = false;
      this.tit.titThree = false;
    }
  }
};
</script>

<style lang="less" scoped>
@imageHost: "http://cdn.xingstation.cn/fe/image/voice_post/";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
* {
  padding: 0;
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.root {
  width: 100%;
  position: relative;
  text-align: center;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-image: url("@{imageHost}bg.png");
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
  img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
  }
  .shade {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.8;
    z-index: 9999;
    position: fixed;
  }
  .loading {
    width: 20%;
    position: absolute;
    left: 40%;
    top: 40%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    animation: leaf 2s ease-out infinite forwards;
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .tit1,
  .tit2,
  .tit3 {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -20%);
    z-index: 99;
    img {
      width: 100%;
    }
  }
  .t-1 {
    width: 100%;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    z-index: 99;
    .t1 {
      width: 100%;
    }
  }
  .t-2 {
    width: 100%;
    position: relative;
    z-index: 0;
    margin-top: -15%;
    .t2-1 {
      width: 100%;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      pointer-events: none;
    }
    .button-1,
    .button-2,
    .button-3 {
      width: 100%;
      position: absolute;
      left: 0%;
      top: 12%;
      padding: 5% 0;
      -webkit-user-select: auto;
      pointer-events: auto;
      .b-1 {
        width: 65%;
        margin-top: 3%;
      }
      .wifi {
        width: 10%;
        position: absolute;
        left: 22%;
        top: 50%;
        transform: translateY(-50%);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        pointer-events: none;
      }
      .player {
        width: 10%;
        position: absolute;
        left: 22%;
        top: 50%;
        transform: translateY(-50%);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        pointer-events: none;
      }
    }
  }
  .t-3 {
    width: 100%;
    margin: 5% 0;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    pointer-events: none;
    .t3-1 {
      width: 85%;
    }
    .cover-left {
      width: 31%;
      position: absolute;
      top: -8%;
      left: 0%;
      z-index: 99;
    }
    .cover-right {
      width: 55%;
      position: absolute;
      bottom: -8%;
      right: 0%;
      z-index: 99;
    }
    .photo {
      width: 63%;
      position: absolute;
      left: 50%;
      top: 4.2%;
      transform: translate(-50%, 4%);
      border-radius: 5%;
      user-select: auto;
      pointer-events: auto;
    }
    .jiantou {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      left: 0;
      bottom: -3%;
      z-index: 999;
      animation: arrow 1.2s linear infinite alternate;
      .arrow {
        width: 10%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 27%);
      }
      .prompt {
        width: 73%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 154%);
      }
    }
  }
  .bottom {
    position: relative;
    margin-top: 10%;
  }
}
@keyframes arrow {
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(8px);
  }
}
@keyframes leaf {
  from {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  to {
    transform: scale(1.2, 1.2);
  }
}
</style>
