<template>
  <div class="container">
    <div
      v-if="showModal"
      class="modalBg"
    >
      <div
        v-if="modalType === 'help'"
        class="modalBox"
      >
        <img 
          :src="CDNURL+'/fe/jintie-help.png'"
          class="modal"
        >
        <img 
          :src="CDNURL+'/fe/jintie-close-btn.png'"
          class="helpClose"
          @click="onModalClose"
        >
      </div>
      <Board
        v-if="modalType === 'ranking'"
        @closeRank="onModalClose"
      />
      <div
        v-if="modalType === 'verify'"
        class="verifyBox"
      >
        <img
          :src="CDNURL+'/fe/jintie-verify-bg.png'"
          class="verifyBg"
        >
        <div class="phoneBox">
          <img
            :src="CDNURL+'/fe/jintie-phone-bg.png'"
            class="phoneBg"
          >
          <input
            v-model="phone"
            type="text"
            class="phoneInput"
            maxlength="11"
            @input="handleInput($event, 'phone')"
          >
        </div>
        <div class="validateBox">
          <img
            :src="CDNURL+'/fe/jintie-vcode-bg.png'"
            class="validateBg"
          >
          <input
            v-model="vcode"
            type="text"
            class="validateInput"
            maxlength="4"
            @input="handleInput($event, 'vcode')"
          >
          <div 
            class="validateBtn" 
            @click="onClickGetVcode"
          >
            <img
              v-if="disabledGetVcode"
              :src="CDNURL + '/fe/jintie-count-down.png'"
              class="countDownBg"
            >
            <img
              v-else
              :src="CDNURL + '/fe/jintie-get-vcode.png'"
              class="countDownBg"
            >         
            <span class="vcodeText">{{ vcodeText }}</span>
          </div>
        </div>
        <img
          v-show="verfyPhoneClickable"
          :src="CDNURL+'/fe/jintie-submit-grey.png'"
          class="submitBtn"
        >
        <img
          v-show="!verfyPhoneClickable"
          :src="CDNURL+'/fe/jintie-submit-btn.png'"
          class="submitBtn"
          @click="!verfyPhoneClickable && handleVerfyPhone()"
        >
      </div>
    </div>
    <div class="top">
      <img 
        :src="CDNURL+'/fe/jintie-ranking-btn.png'"
        class="rankingBtn"
        @click="onModalShow('ranking')"
      >
      <div class="logoBox">
        <img 
          :src="CDNURL+'/fe/jintie-logo.png'"
          class="logo"
        >
      </div>
      <img 
        :src="CDNURL+'/fe/jintie-barrage-btn.png'"
        class="rankingBtn"
        @click="naviToBarrage"
      >
    </div>
    <div class="content">
      <div class="photoBox">
        <img 
          :src="CDNURL+'/fe/jintie-heart.png'"
          class="heart"
        >
        <img 
          :src="CDNURL+'/fe/jintie-photo-wrapper.png'"
          class="photoWrapper"
        >
        <div class="uploadBox">
          <img 
            :src="CDNURL+'/fe/jintie-photo-bg.png'"
            class="photoBg"
          >
          <img 
            :src="CDNURL+'/fe/jintie-upload.png'"
            class="uploadText"
          >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="userImg"
          >
          <input
            v-if="shouldUpload"
            type="file"
            accept="image/*"
            class="upload"
            @change="handleUpload"
          >
        </div>
        <div
          v-if="showPlaceholder"
          class="confessionBox placeholderBox"
          @click="onClickConfession"
        >
          <img 
            :src="CDNURL+'/fe/jintie-placeholder.png'"
            class="placeholder"
          >
        </div>
        <div
          v-else
          class="confessionBox"
        >
          <textarea
            v-model="confession"
            cols="15"
            rows="2"
            maxlength="30"
            placeholder="输入告白宣言"
            class="confessionInput"
          />
          <div class="textCounter">
            {{ confession.length }}/30
          </div>
        </div>
      </div>
      <div class="participateBox">
        <img
          v-show="participateBtnClickable"
          :src="CDNURL+'/fe/jintie-participate-btn.png'"
          class="participateBtn"
          @click="participateBtnClickable && handleParticipate()"
        >
        <img
          v-show="!participateBtnClickable"
          :src="CDNURL+'/jtree/jintie-participate-btn-d.png'"
          class="participateBtn"
        >
        <img 
          :src="CDNURL+'/fe/jintie-help-icon.png'"
          class="help"
          @click="onModalShow('help')"
        >
      </div>
    </div>
    <div class="bottom">
      <img 
        :src="CDNURL+'/fe/jintie-hand-pointer_2.png'"
        class="pointer"
      >
      <img 
        :src="CDNURL+'/fe/jintie-lottery-btn.png'"
        class="lotteryBtn"
        @click="naviToLottery"
      >
      <img 
        :src="CDNURL+'/fe/jintie-hand-pointer_1.png'"
        class="pointer"
      >
    </div>
  </div>
</template>
<script>
import { Toast } from "mand-mobile"
import "assets/less/reset-mand.less"
import {
  Cookies,
  $wechat,
  isInWechat,
  qiniuToken,
  getInfoById,
	uploadImgToQiniu,
  postActivityMedia,
  filterNumber,
  validatePhone,
  getVerificationCodes,
  bindUserPhone,
  getUserBoardId,
  getWxUserInfo,
  addToBoard
} from "services"
import Board from './board'

const CDNURL = process.env.CDN_URL;

export default {
  components: {
    Board
  },
  data() {
    return {
			CDNURL: CDNURL,
			type: 'verified',
			showModal: true,
			modalType: 'help',
			showPlaceholder: true,
			imageUrl: '',
      mediaId: '',
			confession: '',
			phone: "",
      vcode: "",
      phoneVerified: false,
      shouldUpload: true,
      verifyKey: "",
      time: 60,
      vcodeText: "获取验证码",
      disabledGetVcode: false,
      campaign: 'jt520Diamonds'
    };
  },
  computed: {
    participateBtnClickable() {
      return this.confession && this.imageUrl
    },
    verfyPhoneClickable() {
      return !this.phone || !this.vcode
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.sign = 'eyJpdiI6ImpaM3NZQ0U1dVdBTEs0SjkwSTVmUlE9PSIsInZhbHVlIjoiTDhtbGp0MitjdmsxZFNUdkRFcjN6QT09IiwibWFjIjoiYTQ2Y2YzMzc4YzM0ZDQ4OGRkNjgwZGU4N2M3MTMwZmM3NjkyMTlhMGJmM2Q1MzM3YTU2Mzc2NWYzM2NmNjBhYiJ9'
    } else {
      this.handleWechatAuth()
    }
    if (this.sign) {
      this.initState()
    }
    this.getQiniuToken()
    this.handleForbiddenShare()
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
          '&scope=snsapi_userinfo'
        window.location.href = redirct_url
      } else {
        this.sign = Cookies.get('sign')
      }
    },
    //禁止微信分享
    handleForbiddenShare() {
      if (isInWechat() === true) {
        $wechat(this.weixinUrl).then(res => {
          res.forbidden()
        })
      }
    },
    async initState() {
      console.log('init state')
      let { id } = this.$route.query
      if (id) {
        Toast.loading('提取照片中')
        try {
          let { image } = await getInfoById(id)
          if (image) {
            this.imageUrl = image
            this.shouldUpload = false
          }
          Toast.hide()
        } catch(e) {
          console.log(e)
          Toast.failed('提取照片出错', 0, true)
        }
      }
      this.queryUserMsg()
    },
    // 验证用户是否在榜单上
    async queryUserMsg() {
      let params = {
        sign: this.sign,
        campaign: this.campaign
      }
      try {
        Toast.loading('查询中')
        let res = await getUserBoardId(params, 'V2')
        if (res.code === 0) {
          // 查询到用户榜单数据，跳转到详情页
          this.$router.push({
            name: 'jintie_detail', // 榜单详情页
            params: {
              id: res.data.id
            },
            query: this.$route.query
          })
        } else {
          Toast.hide()
          this.queryVerfyStatus()
        }
      } catch(e) {
        console.log(e)
        Toast.hide()
        this.queryVerfyStatus()
      }
    },
    // 验证用户是否验证过手机号
    async queryVerfyStatus() {
      try {
        Toast.loading('获取用户信息中')
        let userInfo = await getWxUserInfo()
        if (userInfo.data.mobile) {
          this.phoneVerified = true
        }
        Toast.hide()
      } catch(e) {
        console.log(e)
        Toast.failed('获取用户信息失败', 0 ,true)
      }
    },
		async getQiniuToken() {
      try {
        let res = await qiniuToken()
        if (res) {
          this.token = res
        }
      } catch(e) {
        console.log(e)
      }
    },
    handleInput(event, type) {
      const number = filterNumber(event.target.value)
      this[type] = number
      event.target.value = number
    },
		async handleUpload(event) {
      const file = event.target.files[0]
      const size = file.size
      const name = file.name
      if (size / 1024 / 1024 > 10) {
        Toast.info('图片大小不能超过10MB!')
        return
      }
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(name)) {
        Toast.info('图片类型必须是jpeg,jpg,png中的一种')
				return
			}
      let time = new Date().getTime()
      let random = parseInt(String(Math.random() * 10 + 1), 10)
      let suffix = time + '_' + random + '_' + name
      let key = encodeURI(`${suffix}`)
      let args = new FormData()
      args.append('file', file)
      args.append('token', this.token)
      args.append('key', key)
      // 上传
      Toast.loading('上传中')
      try {
        let { key } = await uploadImgToQiniu(args)
        let callbackArgs = {
          name,
          key,
          size
        }
        let { url, id } = await postActivityMedia(callbackArgs)
        this.imageUrl = url
        this.mediaId = String(id)
        Toast.hide()
      } catch(e) {
        Toast.info('上传失败')
        console.log(e)
      }
    },
		onModalShow(type) {
			this.showModal = true
			this.modalType = type
		},
		onModalClose() {
			this.showModal = false
			this.modalType = ''
		},
		onClickConfession() {
			this.showPlaceholder = false
		},
		onGetErrorTips() {
      if (!validatePhone(this.phone)) {
        return "手机格式不正确，请重新输入";
      }
      if (!this.vcode || !/^\d{4}$/.test(this.vcode)) {
        return "验证码格式错误，请重新输入";
      }
      return "";
    },
    onCountDown() {
      this.disabledGetVcode = true;
      let timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(timer);
          this.vcodeText = "获取验证码";
          this.time = 60;
          this.disabledGetVcode = false;
        } else {
          this.vcodeText = this.time + 's';
          this.time--;
        }
      }, 1000);
    },
    async onClickGetVcode() {
      if (this.disabledGetVcode || !this.phone || !validatePhone(this.phone)) return
      this.onCountDown()
      let params = {
        phone: this.phone
      }
      try {
        Toast.loading('验证码发送中')
        let res = await getVerificationCodes(params)
        if (res.code === 0) {
          Toast.succeed('验证码发送成功')
          this.verifyKey = res.data.key
        } else {
          Toast.failed('未知错误')
        }
      } catch(e) {
        console.log(e)
        Toast.failed('验证码发送失败')
      }
    },
    async handleVerfyPhone() {
      let error = this.onGetErrorTips()
      if (error) {
        Toast.failed(error)
        return
      }
      let params = {
        sign: this.sign,
        verification_key: this.verifyKey,
        verification_code: this.vcode
      }
      try {
        //debug
        if (process.env.NODE_ENV === 'development') {
          Toast.succeed('验证成功')
          this.phoneVerified = true
          this.onModalClose()
          return
        }
        let res = await bindUserPhone(params)
        if (res.code === 0) {
          Toast.succeed('验证成功')
          this.phoneVerified = true
          this.onModalClose()
        } else {
          Toast.failed('验证失败', 2000, true)
        }
      } catch(e) {
        console.log(e)
        Toast.failed('验证失败', 2000, true)
      }
    },
    async handleParticipate() {
      if (!this.phoneVerified) {
        this.onModalShow('verify')
        return
      }
      let params = {
        sign: this.sign,
        campaign: this.campaign,
        message: this.confession
      }
      if (this.mediaId) {
        params.media_id = this.mediaId
      } else {
        params.qiniu_id = this.$route.query.id
      }
      try {
        Toast.loading('提交中')
        let res = await addToBoard(params, 'V2')
        if (res.code === 0) {
          Toast.succeed('提交成功', 0, true)
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
          Toast.failed('提交失败', 2000, true)
        }
      } catch(e) {
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 2000, true)
        } else {
          Toast.failed('未知错误，请稍后重试', 2000, true)
        }
      }
    },
    naviToLottery() {
      this.$router.push({
        name: 'jt_lottery',
        query: this.$route.query 
      })
    },
    naviToBarrage() {
      location.href = 'http://h5.xingstation.com/marketing/unlocksaas?mkey=w9n65503&mcode=v8'
    }
	}
};
</script>
<style lang="less" scoped>
@base: "http://cdn.xingstation.cn";
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  font-size: 0;
}
img {
	max-width: 100%;
  user-select: none;
}

.container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background-image: url('@{base}/fe/jintie-background.png');
  background-size: 100% 100%;
  background-position: center top;
	background-repeat: no-repeat;
	.modalBg {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 999;
		.modalBox {
			position: relative;
			width: 100vw;
			text-align: center;
			.modal {
				width: 100%;
			}
			.tip {
				width: 52.44vw;
				margin-top: 6.67vw;
			}
			.helpClose {
				width: 11.3vw;
				position: absolute;
				right: 8.89%;
				top: -0.9%;
			}
		}
		.verifyBox {
      position: relative;
      width: 62.78vw;
      .verifyBg {
        width: 100%;
      }
      .phoneBox {
        position: absolute;
        top: 32.89%;
        left: 50%;
				width: 54.26vw;
				height: 11.3vw;
        transform: translate(-50%, 0);
        .phoneBg {
          position: absolute;
          top: 0;
          left: 0;
					width: 100%;
					height: 100%;
        }
        .phoneInput {
          position: absolute;
          top: 50%;
          right: 8.5%;
          width: 55%;
          height: 80%;
          transform: translate(0, -50%);
          border: 0px;
          outline: none;
          text-align: left;
          font-size: 14px;
          color: #fff;
          box-sizing: border-box;      
          background: transparent;
        }
      }

      .validateBox {
        position: absolute;
        top: 51.23%;
        left: 50%;
				width: 54.26vw;
				height: 11.3vw;
        transform: translate(-50%, 0);
        .validateBg {
          position: absolute;
          top: 0;
          left: 0;
					width: 100%;
					height: 100%;
        }
        .validateBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          right: 8px;
          width: 40%;
          height: 60%;
          transform: translate(0, -50%);
          .countDownBg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          .vcodeText {
            font-size: 10px;
            color: #fff;
            z-index: 999;
          }
        }
        .validateInput {
          position: absolute;
          top: 50%;
          right: 45%;
          width: 25%;
          height: 80%;
          transform: translate(0, -50%);
          border: 0px;
          outline: none;
          text-align: left;
          font-size: 14px;
          color: #fff;
          box-sizing: border-box;
          background: transparent;
        }
      }
      .submitBtn {
        position: absolute;
        bottom: 10.29%;
        left: 50%;
        width: 45.37vw;
        transform: translate(-50%, 0);
      }
    }
	}
	.top {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 1.85vw 0;
		.rankingBtn {
			width: 19.07vw;
		}
		.logoBox {
			flex: 1;
			text-align: center;
			.logo {
				width: 26.1vw;
			}
		}
	}
	.content {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.photoBox {
			position: relative;
			width: 80.56vw;
			.heart {
				position: absolute;
				top: 8.63%;
				left: -10.34%;
				width: 16.48vw;				
			}
			.photoWrapper {
				width: 100%;			
			}
			.uploadBox {
				position: absolute;
				top: 6.07%;
				left: 50%;
				width: 65.37vw;				
				transform: translate(-50%, 0);
				.photoBg {
					width: 100%;					
				}
				.uploadText {
					position: absolute;
					top: 50%;
					left: 50%;
					width: 25.56vw;					
					transform: translate(-50%, -50%);
				}
				.upload {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;				
					height: 100%;
					opacity: 0;
					z-index: 998;
				}
				.userImg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;				
					height: 100%;
				}
			}
			.placeholderBox {
				display: flex;
				justify-content: center;
				align-items: center;

				.placeholder {
					width: 52.42vw;
				}
			}
			.confessionBox {
				position: absolute;
				bottom: 5.2%;
				left: 50%;
				width: 65.37vw;
				height: 26.3%;
				padding: 5vw;
				transform: translate(-50%, 0);
				.confessionInput {
					width: 100%;					
					line-height: 25px;
					font-size: 16px;
					color: #000;
					outline: none;
					resize: none;
				}
				.textCounter {
					position: absolute;
					bottom: 5%;
					right: 0;
					font-size: 12px;
					color: #C0C0C0;
				}
			}
		}
		.participateBox {
			position: relative;
			width: 63.52vw;			
			margin: 4.63vw 0;
		}
		.participateBtn {
			width: 100%;			
		}
		.help {
			position: absolute;
			right: -5.85vw;
			top: 50%;
			width: 6.35vw;			
			transform: translate(0, -50%);
		}
	}
	.bottom {
		display: flex;
		align-items: center;
		.pointer {
			width: 12.96vw;
		}
		.lotteryBtn {
			width: 57.96vw;			
			margin: 0 2.78vw;
		}
	}
}
</style>


