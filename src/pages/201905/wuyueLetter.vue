<template>
  <div
    :style="style.root"
    class="warp"
  >
    <div
      v-show="page1"
      class="page1"
    >
      <div class="top">
        <swiper
          ref="Swiper"
          :options="sOption"
          class="swiper"
        >
          <swiper-slide
            v-for="item in topList"
            :key="item.key"
          >
            <img :src="item">
          </swiper-slide>
          <div
            slot="pagination"
            class="swiper-pagination swiper-pagination-white"
          />
        </swiper>
      </div>
      <div class="main">
        <a
          class="aclick"
          @click="toStart"
        >
          <img :src="base + 'btn1.png'">
        </a>
      </div>
    </div>
    <div
      v-show="page2"
      class="page2"
    >
      <div class="step-edit">
        <div class="div-cover">
          <img
            :src="base + 'cbg.png'"
            class="bg"
          >
          <img
            :src="base + 'bg2.png'"
            class="bottom"
          >
        </div>
        <img
          v-show="Boolean(ownList.choose)"
          :src="ownList.choose"
          class="photo1"
        >
        <div
          v-if="!ownList.choose"
          class="get-picture"
        >
          <img
            :src="base + 'icon1.png'"
            class="note"
          >
          <input
            id="choose"
            ref="file"
            type="file"
            accept="image/*"
            class="choose"
            @change="choosePhoto"
          >
        </div>

        <div class="text-voice">
          <img
            :src="base + 'gugu.png'"
            class="bg"
          >
          <div
            class="text"
            @click="editText"
          >
            <img
              v-show="tip"
              :src="base + 'tip.png'"
              class="tips"
            >
            <textarea
              v-show="!tip"
              v-model="ownList.text"
              placeholder="不要超过20字"
              maxlength="20"
              class="word"
            />
          </div>
          <div class="voice">
            <a
              v-if="status==='start'"
              class="v-start"
              @click="startRecord"
            >
              <img :src="base + 'v_start.png'">
            </a>
            <a
              v-if="status==='recording'"
              class="v-start"
              @click="stopRecord"
            >
              <img :src="base + 'record.gif'">
            </a>
            <a
              v-if="status==='play'||status==='playing'"
              class="v-start"
              @click="playVoice"
            >
              <img
                v-if="status==='play'"
                :src="base + 'play.png'"
              >
              <img
                v-if="status==='playing'"
                :src="base + 'playing.png'"
              >
            </a>
          </div>
        </div>
        <div
          v-show="Boolean(ownList.choose)"
          class="note-post"
        >
          <img
            :src="base + 'tiptip.png'"
            class="up-tip"
          >
          <a
            class="sub"
            @click="mergeImage"
          >
            <img :src="base + 'submit.png'">
          </a>
        </div>
      </div>
    </div>
    <div
      v-show="page3"
      class="page3"
    >
      <img
        :src="mergebg"
        class="bg"
      >
      <div
        v-if="ownList.voice"
        class="voice-bg"
        @click="playVoice"
      >
        <div class="div-voice">
          <img
            v-if="status==='play'"
            :src="base + 'play.png'"
          >
          <img
            v-if="status==='playing'"
            :src="base + 'playing.png'"
          >
        </div>
      </div>
      <img
        v-else
        :src="base + 'beer.png'"
        class="bear"
      >
      <div class="btn-group">
        <ul class="ul-btn">
          <li @click="savePhoto">
            <img :src="base + 'save.png'">
          </li>
          <li @click="doAgain">
            <img :src="base + 'again.png'">
          </li>
          <li @click="showShareTip">
            <img :src="base + 'share.png'">
          </li>
        </ul>
      </div>
      <div
        v-show="mask"
        class="mask"
        @click.self="closeMask"
      >
        <img
          v-show="!share"
          :src="ownList.photo"
          class="photo"
        >
        <img
          v-show="!share"
          :src="base + 'press.png'"
          class="press"
        >
        <img
          v-show="share"
          :src="base + 'share_tip.png'"
          class="share-tip"
        >
      </div>
    </div>
    <canvas id="canvas" />
  </div>
</template>
<script>
import {
  Cookies,
  $wechat,
  isInWechat,
  wechatShareTrack,
  getLetter,
  uploadLetter,
  updateLetter,
  getQiniuToken,
  qiniuUploadFile,
  recordQiniuImage,
  setParameter
} from "services";
import EXIF from 'exif-js'
import { Toast } from 'mand-mobile'
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
import { format } from 'path';
import { SSL_OP_NO_TLSv1_2 } from 'constants';
const wx = require('weixin-js-sdk')
const CDNURL = process.env.CDN_URL;
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      base: CDNURL + "/fe/image/wuyueLetter/",
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      page1: true,//true
      page2: false,//false
      page3: false,//false
      qiniu: {
        token: null,
        key: null,
        url: null
      },
      mediaId: '',
      again: false,
      sOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      },
      topList: [
        CDNURL + "/fe/image/wuyueLetter/top1.png",
        CDNURL + "/fe/image/wuyueLetter/top2.png",
        CDNURL + "/fe/image/wuyueLetter/top3.png",
        CDNURL + "/fe/image/wuyueLetter/top4.png",
        CDNURL + "/fe/image/wuyueLetter/top5.png",
      ],
      mergebg: null,
      orientation: null,
      rotate: 0,
      ownList: {
        choose: null,
        photo: null,
        text: null,
        voice: null,
      },
      tip: true,
      share: false,
      status: 'start',
      mask: false,
      id: this.$route.query.id,
      newid: null,
      userId: null,
      record: {
        startTime: 0,
        recordTimer: null
      },
      params: {
        serverId: null,
        createTime: null,
        localId: null,
        userId: null
      },
      wxShareInfoValue: {
        title: "亲爱的，我想对你说……",
        desc: "我爱你五月暨武进吾悦广场七周年庆",
        link: process.env.NODE_ENV === 'production' ? ('http://papi.xingstation.com/api/s/69Q' + window.location.search) : window.location.href,
        imgUrl: CDNURL + "/fe/image/wuyueLetter/icon.png"
      }
    }
  },
  mounted() {
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
        this.params.userId = this.userId
        this.initVoice()
        this.initProceingLetter()
      }
    },
    //邀请函相关接口  init
    initProceingLetter() {
      let getLetterInfoArgs = {
        utm_campaign: "wuyue_invitation"
      }
      if (this.id) getLetterInfoArgs.utm_source_id = this.id
      getLetter(getLetterInfoArgs).then(res => {
        if (res) {
          this.newid = res.id
          this.wxShareInfoValue.link = setParameter("id", this.newid, this.wxShareInfoValue.link)
          this.mergebg = res.url
          this.ownList.photo = res.url
          this.params.serverId = res.record_id
          res.record_id ? this.downloadVoice() : null
          this.page1 = false
          this.page3 = true
          this.again = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //录音相关接口
    initVoice() {
      $wechat().then(res => {
        wx.onVoicePlayEnd({
          success: res => (this.status = 'play')
        });
        wx.stopRecord({
          success: res => console.log(res),
          fail: err => console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    //七牛 function initial
    async initQiniu() {
      try {
        let time = new Date().getTime()
        let random = parseInt(String(Math.random() * 1000 + 1), 10)
        let suffix = time + '_' + random + '.png'
        let getQiniuKeyArgs = new FormData()
        const getTokenResult = await getQiniuToken()
        if (!getTokenResult) {
          console.log('token 获取失败！')
          return
        }
        this.qiniu.token = getTokenResult
        let file = this.dataURLtoFile(this.ownList.photo)
        let [name, size] = [time + '_' + random, file.size]
        getQiniuKeyArgs.append('file', file)
        getQiniuKeyArgs.append('token', this.qiniu.token)
        getQiniuKeyArgs.append('key', encodeURI(`${suffix}`))
        // 上传
        Toast.loading('上传中')
        let { key } = await qiniuUploadFile(getQiniuKeyArgs)
        this.qiniu.key = key
        // 记录图片
        const callbackArgs = {
          name,
          key,
          size,
          utm_campaign: "wuyue_invitation"
        }
        const recordImageResult = await recordQiniuImage(callbackArgs)
        if (recordImageResult) {
          this.mediaId = recordImageResult.id
          this.params.localId ? this.uploadVoice() : this.uploadOnceLetter()
          Toast.hide()
        }

      } catch (err) {
        console.log(err)
      }
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    toStart() {
      this.page1 = !this.page1
      this.page2 = true
    },
    choosePhoto(e) {
      let that = this
      that.orientation = null
      that.rotate = 0
      let files = null
      files = e.target.files
      if (!files.length) return
      let file = files[0]
      if (file.size <= 0) return
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
        Toast.info('不支持其他类型文件，请选择.png或.jpg或.jpeg文件', 800)
        return
      }
      EXIF.getData(file, function () {
        EXIF.getAllTags(this)
        that.orientation = EXIF.getTag(this, 'Orientation');
        if (that.orientation == 6) {
          that.rotate = Math.PI / 2
        }
        if (that.orientation == 8) {
          that.rotate = -Math.PI / 2
        }
        if (that.orientation == 3) {
          that.rotate = Math.PI
        }
      })
      let reader = new FileReader();
      reader.onload = (theFile => {
        return e => {
          let image = new Image();
          image.onload = function () {
            that.ownList.choose = e.target.result;
          }
          image.src = e.target.result;
        };
      })(file);
      reader.readAsDataURL(file);
    },
    // 页面操作方法
    editText() {
      if (!this.ownList.choose) {
        Toast.info('请先选择图片！', 800)
        return
      }
      this.tip = false
    },
    savePhoto() {
      this.mask = true
      window.scroll(0, 0)
    },
    doAgain() {
      this.again = true
      this.page3 = false
      this.page2 = false
      this.page1 = true
      this.tip = true
      this.status = 'start'
      for (let item in this.ownList)
        this.ownList[item] = null
      for (let item in this.params)
        this.params[item] = null
    },
    showShareTip() {
      this.mask = true
      this.share = true
      window.scroll(0, 0)
    },
    closeMask() {
      this.mask = false
      this.share = false
    },
    //修改邀请函
    updateUserLetter() {
      let args = {
        media_id: this.mediaId,
        utm_campaign: "wuyue_invitation",
        message: this.ownList.text || "test",
        record_id: this.params.serverId || "",
        create_time: this.params.createTime || "",
        utm_source_id: this.id || ""
      }
      updateLetter(args).then(res => {
        this.handleData(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 上传邀请函
    uploadUserLetter() {
      let args = {
        media_id: this.mediaId,
        utm_campaign: "wuyue_invitation",
        message: this.ownList.text || "test",
        record_id: this.params.serverId || "",
        create_time: this.params.createTime || ""
      }
      uploadLetter(args).then(res => {
        this.handleData(res)
      }).catch(err => {
        console.log(err)
      })
    },
    uploadOnceLetter() {
      this.again ? this.updateUserLetter() : this.uploadUserLetter()
    },
    handleData(res) {
      this.newid = res.id
      this.wxShareInfoValue.link = setParameter("id", this.newid, this.wxShareInfoValue.link)
      this.ownList.photo = res.url
      this.params.serverId = res.record_id
      this.status = 'play'
    },
    //开始录音
    startRecord(event) {
      event.preventDefault();
      if (!this.ownList.choose) {
        Toast.info('请先选择图片！', 800)
        return
      }
      $wechat().then(res => {
        wx.onVoiceRecordEnd({
          // 录音时间超过一分钟没有停止的时候会执行 complete 回调
          complete: function (res) {
            this.params.localId = res.localId;
          }
        });
        // 开始录音
        this.record.starTime = Math.round(new Date())
        let timer = setTimeout(() => {
          wx.startRecord({
            success: () => {
              this.status = 'recording'
            },
            fail: err => (this.status = 'start'),
            cancel: () => {
              this.status = 'start'
              alert('开始录音失败')
            }
          })
          clearTimeout(timer)
        }, 300)
      }).catch(err => {
        console.log(err)
      })
    },
    //停止录音
    stopRecord(event) {
      event.preventDefault();
      let that = this
      if (!this.ownList.choose) {
        Toast.info('请先选择图片！', 800)
        return
      }
      if ((Math.round(new Date()) - this.record.startTime) < 1000 || this.record.starTime <= 0 || this.status === 'start') {
        that.status = 'start'
        that.record.startTime = 0
        Toast.info('录音时间过短', 800)
        return
      }
      $wechat().then(res => {
        wx.stopRecord({
          success: res => {
            that.params.localId = res.localId
            that.status = 'play'
            that.ownList.voice = true
          },
          fail: err => {
            that.status = 'start'
            console.log(err)
          }
        })
      }).catch(err => {
        console.log(err)
      })

    },
    //播放录音
    playVoice() {
      let that = this
      if (this.status === 'playing') {
        wx.stopVoice({
          localId: that.params.localId,
          success: res => (that.status = 'play')
        });
      }
      if (this.status === 'play') {
        wx.playVoice({
          localId: that.params.localId,
          success: res => (that.status = 'playing'),
          fail: err => Toast.info('播放异常', 800)
        });
      }
    },
    onVoicePlayEnd() {
      wx.onVoicePlayEnd({
        success: res => (that.status = 'play'),
        complete: () => (that.status = 'play')
      });
    },
    //上传录音
    uploadVoice() {
      wx.uploadVoice({
        localId: this.params.localId,
        isShowProgressTips: 1,
        success: res => {
          this.params.serverId = res.serverId
          this.params.createTime = new Date().getTime()
          this.uploadOnceLetter()
        },
        fail: err => Toast.info('上传录音失败', 800)
      });
    },
    //下载语音
    downloadVoice() {
      let that = this
      Toast.info('语音下载中')
      $wechat().then(res => {
        wx.downloadVoice({
          serverId: this.params.serverId,
          isShowProgressTips: 1,
          success: res => {
            that.params.localId = res.localId
            that.ownList.voice = true
            that.status = 'play'
            Toast.hide()
          },
          fail: err => {
            Toast.info('下载语音失败', 800)
            that.ownList.voice = false
          }
        });
        wx.onVoicePlayEnd({
          success: function (res) {
            Toast.info('语音播放完毕', 800)
            that.status = 'play'
          }
        });
      }).catch(err => {
        console.log(err)
      })
    },
    mergeImage() {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d')
      let that = this
      let [bg, photo, bear] = [new Image(), new Image(), new Image()]
      this.arrSetAttribute('crossOrigin', 'Anonymous', bg, photo, bear)
      bg.src = this.ownList.text ? this.base + 'bgbg1.png' : this.base + 'bgbg2.png'
      bg.onload = () => {
        let [w, h] = [bg.width, bg.height]
        canvas.width = w
        canvas.height = h
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, w, h)
        photo.onload = () => {
          let [width, height, x, y, pw, ph] = [photo.width, photo.height, 0, 0, 0, 0]
          pw = w * 0.765
          ph = (pw / width) * height
          if (height / width < 1) {
            ph = h * 0.44
            pw = (ph / height) * width
          }
          x = w / 2 - pw / 2 - 5
          y = h * 0.145
          // let [tranx, trany] = [x + width / 2, y + height / 2];
          // [x, y] = [-width / 2, -height / 2]
          // ctx.translate(tranx, trany)
          // if (that.orientation == 6) {
          //   that.rotate = Math.PI / 2;
          //   [x, y] = [x - w * 1.1, y + h * 0.19];
          // }
          // if (that.orientation == 3) {
          //   that.rotate = Math.PI;
          //   [x, y] = [w * 0.4, h * 0.2];
          // }
          // if (that.orientation == 8) {
          //   that.rotate = -Math.PI / 2;
          //   [x, y] = [x + w * 0.15, y - h * 0.8];
          // }
          // ctx.rotate(that.rotate);
          ctx.drawImage(photo, 0, 0, width, height, x, y, pw, ph)
          // ctx.rotate(-that.rotate);
          // ctx.translate(-tranx, -trany)
          ctx.drawImage(bg, 0, 0)
          ctx.font = 'bold 40px 微软雅黑'
          ctx.textAlign = 'left'
          ctx.fillStyle = '#333'
          if (this.ownList.text && this.ownList.text.length > 11) {
            let [text1, text2] = []
            text1 = this.ownList.text.slice(0, 11)
            text2 = this.ownList.text.slice(11)
            ctx.fillText(text1, w * 0.28, h * 0.65)
            ctx.fillText(text2 + '...', w * 0.28, h * 0.65 + 55)
          }
          if (this.ownList.text && this.ownList.text.length <= 11) {
            ctx.fillText(this.ownList.text, w * 0.28, h * 0.66)
          }
          this.mergebg = canvas.toDataURL('image/png')
          bear.onload = () => {
            ctx.drawImage(bear, 0, 0, bear.width, bear.height, w * 0.3, h * 0.84, w * 0.4, (w * 0.4 / bear.width) * bear.height)
            this.ownList.photo = canvas.toDataURL('image/png')
            let base64String = this.ownList.photo.split(",")[1];
            // alert('base64:' + base64String.length);
            // this.initQiniu()
            this.page2 = false
            this.page3 = true
          }
          bear.src = this.base + 'beer.png'
        }
        photo.src = this.ownList.choose
      }
    },
    // 设置属性
    arrSetAttribute(key, value, ...args) {
      args.map(item => item.setAttribute(key, value))
    }
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.xingstation.cn/fe/image/wuyueLetter/";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 0;
  margin: 0 auto;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
.bg {
  position: relative;
  z-index: 0;
}
a {
  display: inline-block;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
}
.warp {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: #e4007f;
  min-height: 100vh;
  .page1 {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 0;
    .top {
      width: 100%;
      position: relative;
    }
    .main {
      width: 100%;
      height: 100vh;
      position: relative;
      background-image: url("@{img}bg1.png");
      background-position: center top;
      background-size: 100% auto;
      background-repeat: repeat;
      .aclick {
        width: 48.61%;
        position: absolute;
        top: 6vh;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .page2 {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: rgba(133, 133, 133, 1);
    .step-edit {
      position: relative;
      width: 100%;
      .div-cover {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        z-index: 99;
        .bottom {
          width: 100%;
          position: absolute;
          bottom: 0%;
          left: 0%;
        }
      }
      .photo1 {
        width: 76.5%;
        .center;
        // top: 16.5%;
        top: 26vw;
        z-index: 0;
      }
      .get-picture {
        width: 76.5%;
        height: 70.5%;
        overflow: hidden;
        .center;
        top: 16.5%;
        border-radius: 15px;
        z-index: 999;
        .note {
          width: 31.67vw;
          .center;
          top: 20%;
          z-index: 0;
        }
        .choose {
          .cover;
          z-index: 99;
          opacity: 0;
        }
      }
      .text-voice {
        width: 79.63%;
        .center;
        bottom: 0%;
        z-index: 999;
        .text {
          width: 66%;
          position: absolute;
          top: 15%;
          left: 18%;
          height: 22%;
          z-index: 9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .tips {
            width: 60%;
            position: relative;
          }
          .word {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 10px;
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            color: #333;
            border: none;
            background: none;
            text-align: left;
          }
        }
        .voice {
          width: 48vw;
          height: 35vw;
          .center;
          bottom: -1%;
          z-index: 999;
          .v-start {
            display: block;
            width: 100%;
            height: 100%;
            z-index: 999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
              width: 17.5vw;
            }
          }
        }
      }
      .note-post {
        width: 100%;
        position: absolute;
        top: 48%;
        left: 0%;
        z-index: 999;
        .up-tip {
          width: 44.17%;
          position: relative;
        }
        .sub {
          width: 17.7%;
          position: relative;
        }
      }
    }
  }
  .page3 {
    position: relative;
    width: 100%;
    min-height: 80vh;
    overflow: hidden;
    .voice-bg {
      width: 48vw;
      height: 34vw;
      .center;
      bottom: 0%;
      z-index: 9;
      background-color: #f4c6c8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .div-voice {
      width: 17.5vw;
      z-index: 99;
    }
    .bear {
      width: 42%;
      .center;
      bottom: 0%;
      z-index: 99;
    }
    .btn-group {
      width: 23.4%;
      position: absolute;
      top: 22%;
      right: 0%;
      z-index: 999;
      .ul-btn {
        display: inline-block;
        width: 100%;
        li {
          width: 100%;
          display: inline-block;
          margin-bottom: 10px;
        }
      }
    }
    .mask {
      position: absolute;
      .cover;
      z-index: 999999;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .photo {
        width: 70.4%;
        position: relative;
        pointer-events: auto;
        user-select: auto;
      }
      .press {
        width: 40.65%;
        position: relative;
      }
      .share-tip {
        width: 31%;
        position: absolute;
        top: 0%;
        right: 0%;
        z-index: 9;
      }
    }
  }
  #canvas {
    .cover;
    z-index: 0;
    display: none;
    letter-spacing: 5px;
    background-color: #fff;
  }
}
</style>





