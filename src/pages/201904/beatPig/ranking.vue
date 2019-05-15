<template>
  <div class="container">
    <img 
      :src="CDNURL+'/fe/wuyue-beatPig-top-mask.png'"
      class="topBg"
    >

    <div class="rankingBox">
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-gameover.png'"
        class="gameover"
      >
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-rankingBg.png'"
        class="rankingBg"
      >
      <div class="avatarBox">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-avatarWrapper.png'"
          class="avatarWrapper"
        >
        <img 
          :src="userAvatar || CDNURL + '/fe/wuyue-beatPig-default-avatar.png'"
          class="avatar"
        >
      </div>
      <div class="rankingInfo">
        <div class="score">游戏总分: {{ totalScore }}</div>
        <div class="score ranking">游戏排名: {{ rank }}</div>
      </div>
      <div v-if="showBtn">
        <img 
          v-if="received"
          :src="CDNURL+'/fe/wuyue-beatPig-receivedBtn.png'"
          class="receiveBtn"
        >
        <img 
          v-else
          :src="CDNURL+'/fe/wuyue-beatPig-receiveBtn.png'"
          class="receiveBtn"
          @click="onReceiveCoupon"
        >
      </div>
    </div>

    <img 
      :src="CDNURL+'/fe/wuyue-beatPig-bottom-mask.png'"
      class="bottomBg"
    >
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import lottie from "lottie-web";
import { 
	Cookies, 
	$wechat,
	isInWechat, 
	getWxUserInfo,
	userGameRank,
	getMallcooUserCoupon,
	checkMallMember,
	mallcooCoupons
} from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
			userAvatar: '',
			sign: '',
			oid: process.env.NODE_ENV === 'production' ? 757 : 774,
			belong: 'hitpig',
			totalScore: 0,
			rank: 0,
			showBtn: false,
			received: false
    };
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
		// 微信静默授权
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
				this.sign = Cookies.get('sign')
				getWxUserInfo()
					.then(result => {
						if (result && result.data && result.data.headimgurl) {
							this.userAvatar = result.data.headimgurl
						}  
					})
        this.init()
        this.handleForbiddenShare()
      }
		},
		
		// 禁止微信分享
    handleForbiddenShare() {
      $wechat().then(res => {
        res.forbidden();
      });
		},

		async init() {
			try {
				const gameRank = await userGameRank({})
				if (gameRank && gameRank.data) {
					const { score, rowNo } = gameRank.data
					this.totalScore = score
					this.rank = rowNo
					this.showBtn = rowNo > 1000 ? false : true
					const params = {
						sign: this.sign,
						oid: this.oid,
						belong: this.belong
					}
					const userCoupon = await getMallcooUserCoupon(params)
					if (userCoupon) {
						this.received = true
					} else {
						this.received = false
					}
				}
      } catch (err) {
        if (err.response && err.response.data) {
					this.showBtn = false
          alert(err.response.data.message)
        }
      }
		},

		// 商场会员信息(查询是否是商场会员)
    async onGetMallcooUserInfo(params) {
      try {
				const mallcooUserInfo = await checkMallMember(params)
        if (mallcooUserInfo) {
          const mallcooCouponsParams = {
						sign: this.sign,
						oid: this.oid,
            belong: this.belong            
					}
          const mallcooCouponsRes = await mallcooCoupons(mallcooCouponsParams)
					if (mallcooCouponsRes) {
						Toast('兑奖券码已短信形式发送至手机，请注意查收')
					}
        } else {
          this.$router.push({ 
						name: 'beatPigReceive',
						params: {
							sign: this.sign,
							oid: this.oid,
							belong: this.belong
						}
					})
        }
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    },


		onReceiveCoupon() {
			const params = {
				sign: this.sign,
				oid: this.oid          
			}
			this.onGetMallcooUserInfo(params)
		}
	}
};
</script>
<style lang="less" scoped>
@base: "http://cdn.xingstation.cn";
@font-face {
  font-family: "HKYT";
  src: url("@{base}/fe/font/HKYTW9.TTF");
  font-weight: normal;
  font-style: normal;
}
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
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
	justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
	overflow: hidden;
	background-color: #000;

	.topBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
	}

	.rankingBox {
		position: relative;
		width: 85.65vw;
		height: auto;
		z-index: 999;

		.rankingBg {
			width: 100%;
			height: auto;
		}

		.gameover {
			position: absolute;
			top: 19.16%;
			left: 50%;
			width: 27.31vw;
			height: auto;
			transform: translate(-50%, 0);
		}

		.avatarBox {
			position: absolute;
			top: 24.19%;
			left: 14.16%;
			width: 21.2vw;
			height: 21.2vw;
			border-radius: 50%;

			.avatarWrapper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				z-index: 999;
			}

			.avatar {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 68%;
				height: 68%;
				transform: translate(-50%, -55%);
				border-radius: 50%;
				z-index: 0
			}
		}

		.rankingInfo {
			position: absolute;
			top: 27.5%;
			left: 43.78%;

			.score {
				text-align: left;
				font-family: 'HKYT';
				font-size: 14px;
				color: #fff;
			}

			.ranking {
				margin-top: 5px;
			}
		}

		.receiveBtn {
			position: absolute;
			bottom: 10.31%;
			left: 50%;
			width: 40vw;
			height: auto;
			transform: translate(-50%, 0);
		}
	}

	.bottomBg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
	}
}
</style>


