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
      >
    </div>
    <div class="content">
      <div class="photoBox">
        <img 
          :src="CDNURL+'/fe/jintie-heart.png'"
          class="heart"
        >
        <div class="likeBox">
          <img
            :src="CDNURL+'/fe/jintie-like.png'"
            class="like"
          >
          <span class="number">{{ detail.votes }}</span>
        </div>
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
            :src="detail.image"
            class="userImg"
          >
        </div>
        <div class="confessionBox">
          <span class="confessionInput">{{ detail.message }}</span>
        </div>
      </div>
      <div class="participateBox">
        <img
          v-show="disabledLike"
          :src="CDNURL+'/fe/jintie-like-me-grey.png'"
          class="participateBtn"
        >
        <img
          v-show="!disabledLike"
          :src="CDNURL+'/fe/jintie-like-me-btn.png'"
          class="participateBtn"
          @click="!disabledLike && handleVote()"
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
	getVoteDetail,
	vote
} from "services"

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
			showModal: false,
			modalType: '',
			detail: {
				image: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				message: '',
				votes: 0
			},
			likeCount: 100,
			disabledLike: false,
			campaign: 'jt520Diamonds',
    };
  },
  mounted() {
		if (process.env.NODE_ENV === 'development') {
      this.sign = 'eyJpdiI6ImpaM3NZQ0U1dVdBTEs0SjkwSTVmUlE9PSIsInZhbHVlIjoiTDhtbGp0MitjdmsxZFNUdkRFcjN6QT09IiwibWFjIjoiYTQ2Y2YzMzc4YzM0ZDQ4OGRkNjgwZGU4N2M3MTMwZmM3NjkyMTlhMGJmM2Q1MzM3YTU2Mzc2NWYzM2NmNjBhYiJ9'
    } else {
      this.handleWechatAuth()
		}
		if (this.sign) {
      this.fetchDetail()
		}
		this.handleWechatShare()
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
        this.sign = Cookies.get('sign')
      }
    },
		async fetchDetail() {
			Toast.loading('加载中')
			const id = this.$route.params.pid
			try {
				let res = await getVoteDetail(id)
				if (res.code === 0) {
					let detail = res.data
					if (!detail.image) {
						Toast.info('照片审核中')
					} else {
						this.detail = res.data
						Toast.hide()
					}
				} else {
					Toast.failed('加载失败')
				}
      } catch(e) {
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 0, true)
        } else {
          Toast.failed('未知错误，请刷新', 0, true)
        }
      }
		},
		async handleVote() {
			Toast.loading('投票中')
			let params = {
				sign: this.sign,
        board_id: this.$route.params.pid,
        campaign: this.campaign
			}
			try {
				let res = await vote(params)
				if (res.code === 0) {
					Toast.succeed('投票成功', 0, true)
					this.disabledLike = true
					setTimeout(() => {
						window.location.reload()
					}, 1000)
        } else {
          Toast.failed('投票失败', 2000, true)
          this.disabledLike = false
        }
			} catch(e) {
				console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 2000, true)
        } else {
          Toast.failed('未知错误，请稍后重试', 2000, true)
        }
        this.disabledLike = false
			}
		},
		handleWechatShare() {

		},
		onModalShow(type) {
			this.showModal = true
			this.modalType = type
		},
		onModalClose() {
			this.showModal = false
			this.modalType = ''
		},
		naviToLottery() {
      this.$router.push({
        name: 'jt_lottery',
        query: this.$route.query 
      })
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
			.likeBox {
				position: absolute;
				right: -8.97%;
				top: 47.67%;
				width: 26.11vw;
				z-index: 998;
				.like {
					width: 100%;
				}
				.number {
					position: absolute;
					left: 24.7%;
					bottom: 24.4%;
					font-size: 18px;
					color: #fff;
				}
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
				.userImg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;				
					height: 100%;
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


