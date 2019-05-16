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
      <div
        v-if="modalType === 'ranking'"
        class="modalBox"
      >
        <img 
          :src="CDNURL+'/fe/jintie-ranking-bg.png'"
          class="modal"
        >
        <img 
          :src="CDNURL+'/fe/jintie-ranking-tip.png'"
          class="tip"
        >
        <img 
          :src="CDNURL+'/fe/jintie-close-btn.png'"
          class="rankingClose"
          @click="onModalClose"
        >
        <div class="rankingList">
          <div
            v-for="item in rankingList"
            :key="item.id"
            class="rankingItem"
          >
            <img 
              :src="CDNURL+'/fe/jintie-ranking-info.png'"
              class="rankingInfo"
            >
            <img 
              :src="item.avatar"
              class="avatar"
            >
            <span class="desc">{{ item.desc || '在这里全城见证，我们的5周年，2019感谢有你！' }}</span>
            <span class="count">{{ item.count || 0 }}</span>
          </div>
        </div>
      </div>
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
            @input="onChangePhone"
          >
        </div>
        <div class="validateBox">
          <img
            :src="CDNURL+'/fe/jintie-vcode-bg.png'"
            class="validateBg"
          >
          <input
            v-model="vcode"
            type="number"
            class="validateInput"
            @input="onChangeVcode"
          >
          <div 
            class="validateBtn" 
            @click="onClickGetVcode"
          >
            <img
              v-if="disabledGetVcode"
              :src="CDNURL+'/fe/jintie-count-down.png'"
              class="countDownBg"
            >
            <img
              v-else
              :src="CDNURL+'/fe/jintie-get-vcode.png'"
              class="countDownBg"
            >         
            <span class="vcodeText">{{ vcodeText }}</span>
          </div>
        </div>
        <img
          v-if="disabledSubmit"
          :src="CDNURL+'/fe/jintie-submit-grey.png'"
          class="submitBtn"
        >
        <img
          v-else
          :src="CDNURL+'/fe/jintie-submit-btn.png'"
          class="submitBtn"
          @click="onSubmit"
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
      >
    </div>
    <div class="content">
      <div class="photoBox">
        <img 
          :src="CDNURL+'/fe/jintie-heart.png'"
          class="heart"
        >
        <div
          v-if="type==='verified'"
          class="likeBox"
        >
          <img
            :src="CDNURL+'/fe/jintie-like.png'"
            class="like"
          >
          <span class="number">100</span>
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
            :src="CDNURL+'/fe/jintie-upload.png'"
            class="uploadText"
          >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="userImg"
          >
          <input
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
          :src="CDNURL+'/fe/jintie-participate-btn.png'"
          class="participateBtn"
          @click="onModalShow('verify')"
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
      >
      <img 
        :src="CDNURL+'/fe/jintie-hand-pointer_1.png'"
        class="pointer"
      >
    </div>
  </div>
</template>
<script>
import { Toast } from "mand-mobile";
import {
	qiniuToken,
	uploadImgToQiniu,
  postActivityMedia,
	validatePhone
} from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
			type: 'verified',
			showModal: false,
			modalType: '',
			rankingList: [{
				id: 1,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 2,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 3,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 4,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 5,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}],
			showPlaceholder: true,
			imageUrl: '',
      mediaId: '',
			confession: '',
			phone: "",
      vcode: "",
      verification_key: "",
      time: 60,
      vcodeText: "获取验证码",
      disabledGetVcode: true,
      disabledSubmit: true
    };
  },
  mounted() {
		this.getQiniuToken()
	},
  methods: {
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

		async handleUpload(event) {
      const file = event.target.files[0]
      const size = file.size
      const name = file.name
      if (size / 1024 / 1024 > 8) {
        Toast.info('图片大小不能超过8MB!')
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

    onChangePhone() {
      if (!this.phone || !validatePhone(this.phone)) {
        this.disabledGetVcode = true;
        return;
      }
      this.disabledGetVcode = false;
    },

    onChangeVcode() {
      if (this.onGetErrorTips()) {
        this.disabledSubmit = true;
        return;
      }
      this.disabledSubmit = false;
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

    onClickGetVcode() { 
      if (this.disabledGetVcode) return;
      this.onCountDown();
      let params = {
        phone: this.phone
      };
    },

    onSubmit() {
			this.onModalClose()
    },
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
  height: 100vh;
  overflow: hidden;
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

			.rankingClose {
				width: 11.3vw;
				position: absolute;
				right: 8.89%;
				top: -10.65%;
			}

			.rankingList {
				position: absolute;
				top: 23.56%;
				left: 50%;
				width: 57.03vw;
				transform: translate(-50%, 0);

				.rankingItem {
					position: relative;
					display: flex;
					align-items: center;
					width: 100%;
					height: 11.67vw;
					margin-bottom: 2%;

					.rankingInfo {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}

					.avatar {
						width: 11.6vw;
						height: 11.6vw;
						border-radius: 15px;
					}

					.desc {
						flex: 1;
						padding: 0 11.67vw 0 3vw;
						font-size: 14px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						color: #000;
						z-index: 999;
					}

					.count {
						position: absolute;
						right: 0;
						bottom: 30%;
						font-size: 12px;
						color: #000;
					}
				}
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
					left: 22.7%;
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


