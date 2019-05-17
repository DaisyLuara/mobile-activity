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
          <span class="number">{{ likeCount }}</span>
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
            :src="imageUrl"
            class="userImg"
          >
        </div>
        <div class="confessionBox">
          <span class="confessionInput">{{ confession }}</span>
        </div>
      </div>
      <div class="participateBox">
        <img
          v-if="disabledLike"
          :src="CDNURL+'/fe/jintie-like-me-grey.png'"
          class="participateBtn"
        >
        <img
          v-else
          :src="CDNURL+'/fe/jintie-like-me-btn.png'"
          class="participateBtn"
          @click="onClickLikeBtn"
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
import { validatePhone } from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
			showModal: false,
			modalType: '',
			imageUrl: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
			confession: '在这里全城见证，我们的5周年，2019感谢有你！',
			likeCount: 100,
			disabledLike: false,
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
			}]
    };
  },
  mounted() {},
  methods: {
		onModalShow(type) {
			this.showModal = true
			this.modalType = type
		},

		onModalClose() {
			this.showModal = false
			this.modalType = ''
		},

		onClickLikeBtn() {
			console.log('onClickLikeBtn')
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


