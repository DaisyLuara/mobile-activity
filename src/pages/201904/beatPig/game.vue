<template>
  <div class="container">
    <audio 
      id="bombSound" 
      hidden
    >
      <source :src="CDNURL + '/audio/wuyue-boom-sound.mp3'">
    </audio>

    <div 
      v-if="showMask" 
      class="startGameMask"
    >
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-mask.png'"
        class="maskBg"
      >
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-maskText.png'"
        class="maskText"
      >
      <img 
        :src="CDNURL+maskTimeDict[startGameTime]"
        class="maskTime"
      >
    </div>
    
    <div 
      v-else 
      class="content"
    >
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-game-topBg.png'"
        class="gameTopBg"
      >
      <img 
        :src="CDNURL+'/fe/wuyue-beatPig-game-bg.png'"
        class="gameBg"
      >

      <div class="gameTopInfo">
        <div class="scoreBox">
          <img 
            :src="CDNURL+'/fe/wuyue-beatPig-scoreBg.png'"
            class="scoreBg"
          >
          <img 
            :src="userAvatar || CDNURL + '/fe/wuyue-beatPig-default-avatar.png'"
            class="avatar"
          >
          <span class="score">{{ score }}</span>
        </div>
        <div class="countDownBox">
          <img 
            :src="CDNURL+'/fe/wuyue-beatPig-countDown.png'"
            class="countDown"
          >
          <span class="seconds">{{ gameTime }}</span>
        </div>
      </div>
      
      <div 
        v-for="item in holes"
        :key="item.id" 
        :class="item.position" 
        class="hole"
      >
        <div 
          :id="`score${item.id}`"
          class="scoreAnim"
        />
        <div 
          :id="`pigHole${item.id}`"
          class="pigHoleAnim"
          @click="onHeatPig(item)"
        />
        <img 
          :src="CDNURL+'/fe/wuyue-beatPig-pigJump/img_0.png'" 
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import lottie from "lottie-web";
import { 
	userGameConfig,
	postUserGame, 
	getWxUserInfo 
} from "services";

const CDNURL = process.env.CDN_URL;

export default {
  data() {
    return {
			CDNURL: CDNURL,
			userAvatar: "",
			showMask: true,
			startGameTime: 2,
			maskTimeDict: ['/fe/wuyue-beatPig-mask_time1.png', '/fe/wuyue-beatPig-mask_time2.png', '/fe/wuyue-beatPig-mask_time3.png'],
			holes: [{
				id: 1, position: 'hole1'
			}, {
				id: 2, position: 'hole2'
			}, {
				id: 3, position: 'hole3'
			}, {
				id: 4, position: 'hole4'
			}, {
				id: 5, position: 'hole5'
			}, {
				id: 6, position: 'hole6'
			}, {
				id: 7, position: 'hole7'
			}, {
				id: 8, position: 'hole8'
			}],
			gameTime: 60, // 游戏持续时长
			score: 0, // 游戏得分
			showPig: [], // 随机出现的猪ID,type
			showPigID: [], // 随机出现的猪ID
			type: '', // 猪的类型
			pigNum: 0,
			goldPigNum: 0,
			bombNum: 0
    };
  },
  mounted() {
		this.init()
		getWxUserInfo()
      .then(result => {
				if (result && result.data && result.data.headimgurl) {
					this.userAvatar = result.data.headimgurl
				}  
			})
		this.onReady()
	},
  methods: {
		async init() {
      try {
        const config = await userGameConfig({})
				if (config && config.data && config.data.game_times) {   
					this.gameTime = config.data.game_times      
				}
      } catch (err) {
        if (err.response && err.response.data) {
					alert(err.response.data.message)
					this.$router.replace({ name: 'beatPigIndex' })
        }
      }
		},
		
		onReady() {
			let timer = setInterval(() => {
				if (this.startGameTime === 0) {
					clearInterval(timer)	
					this.showMask = false	
					this.onStartGame()		
				} else {
					this.startGameTime--
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

		onStartGame() {
			this.onCountDown()
			this.onPigShow()
		},

		onCountDown() {
			let timer = setInterval(() => {
				if (this.gameTime === 0) {  // game over
					clearInterval(timer)
					this.onPostGameResult()
				} else {
					this.gameTime--
				}
			}, 1000)
		},

		async onPostGameResult() {
			try {
				let params = { score: this.score }
        const gameResult = await postUserGame(params)	
				if (gameResult) {
					this.$router.replace({ 
						name: 'beatPigResult', 
						params: {
							score: this.score,
							pigNum: this.pigNum,
							goldPigNum: this.goldPigNum,
							bombNum: this.bombNum
						} 
					})
				}		
      } catch (err) {
        if (err.response && err.response.data) {
					alert(err.response.data.message)
					this.$router.replace({ name: 'beatPigIndex' })
        }
      }
		},

		onPigShow() { 
			let timer = setInterval(() => {
					if (this.anim1) {
						this.anim1.destroy()
						this.anim1 = null
					}
					if (this.anim2) {
						this.anim2.destroy()
						this.anim2 = null
					}
					if (this.anim3) {
						this.anim3.destroy()
						this.anim3 = null
					}
					if (this.anim4) {
						this.anim4.destroy()
						this.anim4 = null
					}
					if (this.anim5) {
						this.anim5.destroy()
						this.anim5 = null
					}
					const numeric = '12345678'.split('')
					if (this.gameTime === 0) {  // 游戏结束
						clearInterval(timer)
						this.showPig = []
						this.showPigID = []			
					} else if (this.gameTime <= 20) {
						this.showPigID = this.onRandomPigByNum(numeric, 5)
						this.showPig = [{
							id: this.showPigID[0],
							type: 'pig'
						}, {
							id: this.showPigID[1],
							type: 'pig'
						}, {
							id: this.showPigID[2],
							type: 'pig'
						}, {
							id: this.showPigID[3],
							type: 'goldPig'
						}, {
							id: this.showPigID[4],
							type: 'bomb'
						}]
						this.anim1 = this.initAnimation(`pigHole${this.showPigID[0]}`, this.CDNURL+'/fe/wuyue-beatPig-pigJump/', this.CDNURL+'/fe/wuyue-beatPig-pigJump.json', false, true )
						this.anim2 = this.initAnimation(`pigHole${this.showPigID[1]}`, this.CDNURL+'/fe/wuyue-beatPig-pigJump/', this.CDNURL+'/fe/wuyue-beatPig-pigJump.json', false, true )
						this.anim3 = this.initAnimation(`pigHole${this.showPigID[2]}`, this.CDNURL+'/fe/wuyue-beatPig-pigJump/', this.CDNURL+'/fe/wuyue-beatPig-pigJump.json', false, true )
						this.anim4 = this.initAnimation(`pigHole${this.showPigID[3]}`, this.CDNURL+'/fe/wuyue-beatPig-goldPig/', this.CDNURL+'/fe/wuyue-beatPig-goldPig.json', false, true )
						this.anim5 = this.initAnimation(`pigHole${this.showPigID[4]}`, this.CDNURL+'/fe/wuyue-beatPig-bomb/', this.CDNURL+'/fe/wuyue-beatPig-bomb.json', false, true )
					} else if (this.gameTime <= 40) {
						this.showPigID = this.onRandomPigByNum(numeric, 3)
						this.showPig = [{
							id: this.showPigID[0],
							type: 'pig'
						}, {
							id: this.showPigID[1],
							type: 'pig'
						}, {
							id: this.showPigID[2],
							type: 'goldPig'
						}]
						this.anim1 = this.initAnimation(`pigHole${this.showPigID[0]}`, this.CDNURL+'/fe/wuyue-beatPig-pigJump/', this.CDNURL+'/fe/wuyue-beatPig-pigJump.json', false, true )
						this.anim2 = this.initAnimation(`pigHole${this.showPigID[1]}`, this.CDNURL+'/fe/wuyue-beatPig-pigJump/', this.CDNURL+'/fe/wuyue-beatPig-pigJump.json', false, true )
						this.anim3 = this.initAnimation(`pigHole${this.showPigID[2]}`, this.CDNURL+'/fe/wuyue-beatPig-goldPig/', this.CDNURL+'/fe/wuyue-beatPig-goldPig.json', false, true )
					} else {
						this.showPigID = this.onRandomPigByNum(numeric, 1)
						this.showPig = [{
							id: this.showPigID[0],
							type: 'pig'
						}]
						this.anim1 = this.initAnimation(`pigHole${this.showPigID[0]}`, this.CDNURL+'/fe/wuyue-beatPig-pigJump/', this.CDNURL+'/fe/wuyue-beatPig-pigJump.json', false, true )
					}
			}, 1000)
		},

		onRandomPigByNum(numeric, count) {
			const random = []
			const length = numeric.length
			for (let i = 0; i < count; i++){ 
					const index = Math.floor(Math.random() * (length - i))
					random.push(Number(numeric[index]))
					numeric.splice(index, 1)
			}   
			return random
		},

		onHeatPig(pig) {
			if (this.pigScore) {
				this.pigScore.destroy()
				this.pigScore = null
			}
			if (this.goldScore) {
				this.goldScore.destroy()
				this.goldScore = null
			}
			if (this.bombScore) {
				this.bombScore.destroy()
				this.bombScore = null
			}
			const heatPig = this.showPig.filter(item => item.id === pig.id)
			if (heatPig[0] && heatPig[0].type) {
				switch(heatPig[0].type) {
					case 'pig':
						this.onMusicPlay('clickSound')
						this.pigNum++
						this.score = this.score + 5
						this.pigScore = this.initAnimation(`score${pig.id}`, this.CDNURL+'/fe/wuyue-beatPig-pigScore/', this.CDNURL+'/fe/wuyue-beatPig-pigScore.json', false, true )
						break;
					case 'goldPig':
						this.onMusicPlay('clickSound')
						this.goldPigNum++
						this.score = this.score + 20
						this.goldScore = this.initAnimation(`score${pig.id}`, this.CDNURL+'/fe/wuyue-beatPig-gold/', this.CDNURL+'/fe/wuyue-beatPig-gold.json', false, true )
						break;
					case 'bomb':
						this.onMusicPlay('bombSound')
						this.bombNum++
						this.score = this.score - 10
						this.bombScore = this.initAnimation(`score${pig.id}`, this.CDNURL+'/fe/wuyue-beatPig-bombScore/', this.CDNURL+'/fe/wuyue-beatPig-bombScore.json', false, true )
						break;
					default: break;
				}
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
  align-items: center;
  width: 100%;
  height: 100vh;
	overflow: hidden;
	background-color: #BFE7F0;

	.startGameMask {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.maskBg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 0;
		}

		.maskText {
			width: 58.61vw;
			height: auto;
			z-index: 999;
		}

		.maskTime {
			width: 17.5vw;
			height: auto;
			margin-top: 4.54vw;
			z-index: 999;
		}
	}

	.content {
		flex: 1;

		.gameTopBg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: auto;
			z-index: 1;
		}

		.gameBg {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: auto;
			z-index: 0;
		}

		.gameTopInfo {
			position: absolute;
			top: 2.87vw;
			left: 50%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			widows: 100%;
			transform: translate(-50%, 0);
			z-index: 999;
			
			.scoreBox {
				position: relative;
				width: 66.2vw;
				height: auto;

				.scoreBg {
					width: 100%;
					height: auto;
				}

				.avatar {
					position: absolute;
					left: 5%;
					top: 13%;
					width: 14.35vw;
					height: 14.35vw;
					border-radius: 50%;
				}

				.score {
					position: absolute;
					left: 58.16%;
					top: 50%;
					transform: translate(0, -57%);
					font-family: "HKYT";
					font-size: 22px;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.countDownBox {
				position: relative;
				width: 20.46vw;
				height: auto;

				.countDown {
					width: 100%;
					height: auto;
				}

				.seconds {
					position: absolute;
					left: 50%;
					top: 25.96%;
					transform: translate(-50%, 0);
					font-family: "HKYT";
					font-size: 16px;
					font-weight: bold;
					color: #FC9715;
				}
			}
		}

		.hole {
			position: absolute;
			width: 27.27vw;
			height: auto;

			.scoreAnim {
				position: absolute;
				left: 50%;
				top: -25vw;
				z-index: 999;
			}

			.pigHoleAnim {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: auto;
			}
		}

		.hole1 {
			top: 28.78%;
			left: 50%;
			transform: translate(-50%, 0);
		}

		.hole2 {
			top: 41.61%;
			left: 8.8%;
		}

		.hole3 {
			top: 41.61%;
			right: 8.8%;
		}

		.hole4 {
			bottom: 41.35%;
			left: 8.8%;
		}

		.hole5 {
			bottom: 41.35%;
			right: 8.8%;
		}

		.hole6 {
			bottom: 26.28%;
			left: 8.8%;
		}

		.hole7 {
			bottom: 26.28%;
			right: 8.8%;
		}

		.hole8 {
			bottom: 13.14%;
			left: 50%;
			transform: translate(-50%, 0);
		}
	}
}
</style>


