<template>
  <div class="container">
    <audio 
      id="music" 
      autobuffer 
      autoloop 
      loop  
      hidden>
      <source :src="CDNURL + '/autio/wuyue-beatPig-bgm.mp3'">
    </audio>
    <audio 
      id="clickSound" 
      hidden>
      <source :src="CDNURL + '/audio/wuyue-click-sound.mp3'">
    </audio>

    <div 
      v-if="showAdvertisement" 
      class="mask"
    >
      <div 
        class="countDownBox"
        @click="onSkip"
      >
        <span class="skip">跳过</span>
        <span class="time">{{ countDown }}</span>
      </div>
      <a href="http://m.mallcoo.cn/a/home/10658">
        <img
          :src="CDNURL + '/fe/wuyue-beatPig-advertisement.png'"
          class="maskImg"
        >
      </a>
    </div>


    <div id="topBg" />
    
    <div class="content">
      <div id="pigMove" />

      <div 
        v-if="showRegular" 
        class="regularBox">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-regularContent.png'"
          class="regularContent"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-close-btn.png'"
          class="closeBtn"
          @click="onCloseRegular"
        >
      </div>

      <div 
        v-else-if="showStartModal" 
        class="regularBox">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-startModal.png'"
          class="regularContent"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-close-btn.png'"
          class="closeBtn"
          @click="onCloseStartModal"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-knownBtn.png'"
          class="knownBtn"
          @click="onClickKnownBtn"
        >
      </div>

      <div 
        v-else 
        class="operationBox">
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-regular.png'"
          class="regular"
          @click="onViewRegular"
        >
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-startBtn.png'"
          class="startBtn"
          @click="onStartGame"
        >
        <img 
          :src="CDNURL + (offMusic ? '/fe/wuyue-beatPig-musicClose.png' : '/fe/wuyue-beatPig-music.png')"
          class="regular"
          @click="palyOrOffMusic"
        >
      </div>
    </div>

    <img 
      :src="CDNURL+'/fe/wuyue-beatPig-cloud.png'"
      class="cloud"
    >
    <img 
      :src="CDNURL+'/fe/wuyue-beatPig-logo.png'"
      class="logo"
    >
    <div id="bottomBg" />
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import lottie from "lottie-web";
import {
  $wechat,
  isInWechat,
  Cookies,
  initUserGame,
  userGameConfig,
  userGameShare
} from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
      CDNURL: CDNURL,
      countDown: 4, // 广告位倒计时
      gameStatus: 'game_enable', // 游戏状态
      showAdvertisement: true,
			topAnim: null,
			bottomAnim: null,
			pigAnim: null,
			offMusic: false,
			showRegular: false,
      showStartModal: false
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
        this.init()
        this.handleWeChatShare()
      }
    },

    async init() {
      try {
        const init = await initUserGame({})
        if (init) {
          const config = await userGameConfig({})
          if (config && config.data && config.data.game_status) {   
            this.gameStatus = config.data.game_status      
          }
          this.onShowAdvertisement()
        }
      } catch (err) {
        console.log(err)
        if (err.response && err.response.data) {
          alert(err.response.data.message)
        }
      }
    },

    handleWeChatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            let that = this
            res.share({
              title: "吾悦七周年，嗨玩赢壕礼！",
              desc: "Pick金猪，大牌美妆免费送",
              link: window.location.href,
              imgUrl: CDNURL + "/fe/wuyue-beatPig-shareIcon.png",
              success: async function() {
                const gameShare = await userGameShare({})
                if (gameShare && gameShare.data && gameShare.data.game_status) {   
                  this.gameStatus = gameShare.data.game_status      
                }
              }
            })
          })
          .catch(_ => {
            console.warn(_.message)
          })
      }
    },


    onShowAdvertisement() {
      let timer = setInterval(() => {
        if (this.countDown === 0) {
          clearInterval(timer)	
          this.showAdvertisement = false
          let music = document.getElementById('music')	
          music.play()	
          this.topAnim = this.initAnimation('topBg', this.CDNURL+'/fe/wuyue-beatPig-topBg/', this.CDNURL+'/fe/wuyue-beatPig-topBg.json', true, true )
		      this.bottomAnim = this.initAnimation('bottomBg', this.CDNURL+'/fe/wuyue-beatPig-bottomBg/', this.CDNURL+'/fe/wuyue-beatPig-bottomBg.json', true, true )
		      this.pigAnim = this.initAnimation('pigMove', this.CDNURL+'/fe/wuyue-beatPig-pigMove/', this.CDNURL+'/fe/wuyue-beatPig-pigMove.json', true, true )
        } else {
          this.countDown--
        }
		  }, 1000)
    },

    initAnimation(id, imageUrl, jsonUrl, loop, autoplay ) {
			let el = document.getElementById(id)
      let anim = lottie.loadAnimation({
        name: 'anim',
        container: el,
        renderer: 'svg',
        loop: loop,
        autoplay: autoplay,
        assetsPath: imageUrl,
        path: jsonUrl
      })
      return anim
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
    
    onSkip() {
      this.countDown = 0;
    },

		onStartGame() {
      switch(this.gameStatus) {
        case 'game_enable':
          this.showStartModal = true
          this.pigAnim.destroy()
          this.pigAnim = null
          break
        case 'game_share':
          Toast('将游戏分享给好友，再次获得游戏机会')
          break
        case 'game_disable':
          Toast('今日游戏机会已用尽，请明日再来')
          break
        default: break
      }
		},

		onCloseStartModal() {
			this.onMusicPlay('clickSound')
			this.showStartModal = false
			this.pigAnim = this.initAnimation('pigMove', this.CDNURL+'/fe/wuyue-beatPig-pigMove/', this.CDNURL+'/fe/wuyue-beatPig-pigMove.json', true, true )
		},

		onClickKnownBtn() {
			this.$router.push({ name: 'beatPig/game' })
		},
		
    palyOrOffMusic() {
			this.onMusicPlay('clickSound')
			this.offMusic = !this.offMusic
      let music = document.getElementById('music')
      if (music.paused) {
        music.play()
      } else {
        music.pause()
      }
		},
		
		onViewRegular() {
			this.onMusicPlay('clickSound')
			this.showRegular = true
			this.pigAnim.destroy()
			this.pigAnim = null
		},

		onCloseRegular() {
			this.onMusicPlay('clickSound')
			this.showRegular = false
			this.pigAnim = this.initAnimation('pigMove', this.CDNURL+'/fe/wuyue-beatPig-pigMove/', this.CDNURL+'/fe/wuyue-beatPig-pigMove.json', true, true )
		}
	}
};
</script>
<style lang="less" scoped>
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
  align-items: center;
  width: 100%;
  height: 100vh;
	overflow: hidden;
  background-color: #BFE7F0;
  
  .mask {
    display: flex;
    justify-content: center;
    align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: rgba(0, 0, 0, 0.8);

		.countDownBox {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 5vw;
      top: 5.24vw;
      width: 17.5vw;
      height: 9.26vw;
      border-radius: 4.44vw;
      background: rgba(255, 255, 255, 0.5);
      color: #fff;

      .skip {
        margin: 0;
        margin-right: 5px;
        font-size: 12px;
      }

      .time {
        margin: 0;
        font-size: 16px;
      }
		}
		.maskImg {
      width: 86vw;
      height: auto;
		}
	}
	
	#topBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		max-height: 100%;
	}

	#bottomBg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;

		.regularBox {
			position: relative;
			width: 83.65vw;
			height: auto;
			z-index: 999;

			.regularContent {
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

			.knownBtn {
				position: absolute;
				left: 50%;
				bottom: 6.68%;
				width: 46.7%;
				height: auto;
				transform: translate(-50%, 0);
			}
		}

		#pigMove {
			position: relative;
      flex: 1;
      box-sizing: border-box;
			overflow: hidden;
			z-index: 998;
		}

		.operationBox {
			display: flex;
			align-items: center;
			position: absolute;
			left: 0;
			bottom: 21.2vw;
			width: 100%;
			z-index: 998;

			.regular {
				width: 16.57vw;
				height: auto;
			}

			.startBtn {
				width: 56.39vw;
				height: auto;
				margin: 0 6px;
			}
		}
	}

	.cloud {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
	}

  .logo {
		position: absolute;
		bottom: 4.17vw;
		left: 50%;
    width: 48.7vw;
    height: auto;
		margin-top: 13.7vw;
		transform: translate(-50%, 0);
		z-index: 998;
  }
}
</style>


