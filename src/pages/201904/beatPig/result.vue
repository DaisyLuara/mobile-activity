<template>
  <div class="container">
    <div 
      v-if="showMask" 
      class="mask"
    >
      <div 
        class="maskSpace" 
        @click="onCloseMask"
      />
      <img
        :src="CDNURL+'/fe/wuyue-beatPig-shareMask.png'"
        class="maskImg"
      >
    </div>

    <img 
      :src="CDNURL+'/fe/wuyue-beatPig-top-mask.png'"
      class="topBg"
    >

    <div class="resultBox">
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-resultBg.png'"
        class="resultBg"
      >
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-close-btn.png'"
        class="closeBtn"
        @click="onCloseResult"
      >
      <img 
        :src="CDNURL+operationBtnDict[gameStatus]"
        class="againBtn"
        @click="onClickResultBtn"
      >

      <div class="resultItem topLeft">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-pigIcon.png'"
          class="pigIcon"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-numLink.png'"
          class="numLink"
        >
        <span class="num">{{ pigNum }}</span>
      </div>

      <div class="resultItem topRight">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-goldPigIcon.png'"
          class="pigIcon"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-numLink.png'"
          class="numLink"
        >
        <span class="num">{{ goldPigNum }}</span>
      </div>

      <div class="resultItem bottomItem">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-bombIcon.png'"
          class="pigIcon"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-numLink.png'"
          class="numLink"
        >
        <span class="num">{{ bombNum }}</span>
      </div>

      <div class="overScore">
        <div class="scoreItem">
          <span class="scoreText">本次得分</span>
          <span class="scoreText">{{ currentScore || 0 }}</span>
        </div>
        <div class="scoreItem">
          <span class="scoreText">游戏总分</span>
          <span class="scoreText">{{ totalScore }}</span>
        </div>
        <div class="scoreItem">
          <span class="scoreText">游戏排名</span>
          <span class="scoreText">{{ rank }}</span>
        </div>
      </div>
    </div>

    <div class="resultTip">
      PS：实时排名存在一定误差，以5月20日24点后的最终排名为准
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
	$wechat,
  isInWechat, 
	userGameRank, 
  userGameConfig,
  userGameShare
} from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
			gameStatus: 'game_enable',
			showMask: false,
			currentScore: 0,
			totalScore: 0,
			rank: 0,
			pigNum: 0,
			goldPigNum: 0,
      bombNum: 0,
      operationBtnDict: {
        game_enable: '/fe/wuyue-beatPig-againBtn.png',
        game_share: '/fe/wuyue-beatPig-shareBtn.png',
        game_disable: '/fe/wuyue-beatPig-notPlayBtn.png'
      }
    };
  },
  mounted() {
		const { score, pigNum, goldPigNum, bombNum } = this.$route.params
		this.currentScore = score
		this.pigNum = pigNum
		this.goldPigNum = goldPigNum
		this.bombNum = bombNum
		this.handleWeChatShare()
		this.getUserGameRank()
	},
  methods: {
		handleWeChatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            let that = this
            res.share({
              title: "吾悦七周年，嗨玩赢壕礼！",
              desc: "Pick金猪，大牌美妆免费送",
              link: process.env.DIAMOND_API + (process.env.NODE_ENV === 'production' ? '/s/4L0?utm_campaign=h5_beat_pig' : '/s/APz?utm_campaign=h5_beat_pig'),
              imgUrl: CDNURL + "/fe/wuyue-beatPig-shareIcon.png",
              success: async function() {
                that.onTracking('button', 'click', 'share')  
                try {
                  const gameShare = await userGameShare({})
                  if (gameShare && gameShare.data && gameShare.data.game_status) {   
                    that.gameStatus = gameShare.data.game_status      
                  }
                } catch (err) {
                  if (err.response && err.response.data) {
                    alert(err.response.data.message)
                  }
                }
              }
            })
          })
          .catch(_ => {
            console.warn(_.message)
          })
      }
		},
		
		async getUserGameRank() {
			try {
				const gameRank = await userGameRank({})
				if (gameRank) {
					const { score, rowNo } = gameRank.data
					this.totalScore = score
					this.rank = rowNo
				}
        const config = await userGameConfig({})
        if (config && config.data && config.data.game_status) {   
          this.gameStatus = config.data.game_status      
        }
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message)
        }
      }
		},

		onMusicPlay(el) {
      var music = document.getElementById(el)
      if (!music) {
        return
      }
      //调用 <audio> 元素提供的方法 play()
      music.play()
      //判斷 WeixinJSBridge 是否存在
      if (
        typeof WeixinJSBridge == 'object' &&
        typeof WeixinJSBridge.invoke == 'function'
      ) {
        music.play()
      } else {
        //監聽客户端抛出事件"WeixinJSBridgeReady"
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            function() {
              music.play()
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', function() {
            music.play()
          })
          document.attachEvent('onWeixinJSBridgeReady', function() {
            music.play()
          })
        }
      }

      //musicStatus用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
      var musicStatus = true
      //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
      document.addEventListener(
        'touchstart',
        function(e) {
          if (musicStatus) {
            music.play()
            musicStatus = false
          }
        },
        false
      )
    },
    
    onTracking(category, action, label) {
      const params = {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label
      }
      window.ga('send', params)
    },

		onCloseMask() {
			this.showMask = false
		},

		onCloseResult() {
      this.$router.replace({ name: 'beatPigIndex' })
      let music = document.getElementById('music')
      if (music) {
        music.pause()
      }
      this.onTracking('button', 'click', 'goback2')
		},

		onClickResultBtn() {
      switch(this.gameStatus) {
        case 'game_enable':
          let music = document.getElementById('music')
          if (music) {
            music.pause()
          }
          this.$router.replace({ name: 'beatPigIndex' })
          this.onTracking('button', 'click', 'Click_again')
          break
        case 'game_share':
          this.showMask = true
          this.onTracking('button', 'click', 'Click_share')
          break
        default: break
      }
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

	.mask {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: rgba(0, 0, 0, 0.8);

		.maskSpace {
			flex: 1
		}
		.maskImg {
			position: absolute;
			top: 6.39vw;
			right: 3.06vw;
			width: 41.3vw;
		}
	}


	.topBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
	}

	.resultBox {
		position: relative;
		width: 85.65vw;
		height: auto;
		z-index: 998;

		.resultBg {
			width: 100%;
			height: auto;
		}

		.closeBtn {
			position: absolute;
			right: -0.5%;
			top: 3.1%;
			width: 11.67vw;
			height: auto;
		}

		.againBtn {
			position: absolute;
			left: 50%;
			bottom: 15.35%;
			width: 46.7%;
			height: auto;
			transform: translate(-50%, 0);
		}

		.overScore {
			display: flex;
			align-items: center;
			position: absolute;
			left: 50%;
			top: 47.12%;
			width: 66vw;
			height: auto;
			transform: translate(-50%, 0);

			.scoreItem {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				.scoreText {
					font-family: "HKYT";
					font-size: 14px;
					font-weight: bold;
					color: #7E100E;
				}
			}
		}

		.resultItem {
			position: absolute;
			display: flex;
			align-items: flex-end;

			.pigIcon {
				width: 15.56vw;
				height: auto;
			}

			.numLink {
				width: 4.44vw;
				height: auto;
				margin: 0 5px 0 2px;
			}

			.num {
				font-family: "HKYT";
				line-height: 25px;
				font-size: 25px;
				font-weight: bold;
				color: #FFF0C3;
			}
		}

		.topLeft {
			top: 19.12%;
			left: 10.11%;
		}

		.topRight {
			top: 19.12%;
			right: 10.11%;
		}

		.bottomItem {
			align-items: center;
			top: 31.77%;
			left: 50%;
			transform: translate(-50%, 0);
		}
	}

	.resultTip {
		width: 70vw;
		height: auto;
    margin-top: 3.7vw;
    text-align: center;
    font-size: 12px;
    color: #fff;
    z-index: 999;
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


