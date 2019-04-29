<template>
  <div 
    id="warp" 
    class="spring-content"
  >
    <audio 
      id="voice" 
      autobuffer 
      autoloop 
      loop 
      autoplay 
      hidden
    > 			
      <source :src="audioUrl + '/xiha.mp3'">
    </audio>
    <img 
      id="mbtn" 
      :src="imgUrl + 'kaide/yinyue.png'" 
      class="mplay" 
      @click="playOrNot"
    >
    <img 
      :src="imgUrl + 'springnew/top.png'" 
      class="top"
    >
    <div class="slider">
      <div class="one">
        <img 
          id="photo" 
          :src="mImg" 
          class="photo"
        >
        <img 
          id="word" 
          :src="imgUrl + 'springnew/' + word + '.png'" 
          class="word"
        >
      </div>
      <img 
        :src="imgUrl + 'springnew/pull.png'" 
        class="two"
      >
      <img 
        :src="imgUrl + 'springnew/cloud.png'" 
        class="cloud1"
      >
      <img 
        :src="imgUrl + 'springnew/cloud2.png'" 
        class="cloud2"
      >
      <img 
        :src="imgUrl + 'springnew/cloud3.png'" 
        class="cloud3"
      >
      <!-- 掉落的钱币 -->
      <div 
        v-for="(item, index) in money_group" 
        :key="index"
        :class="'group'+item" 
        class="group"
      >
        <img 
          v-for="(item, index) in money_num" 
          :key="index"
          :src="imgUrl+'springnew/qian.gif'" 
          class="money"
        >
      </div>
    </div>
  </div>
</template>
 <script>
import { $wechat, getInfoById, wechatShareTrack, isInWechat } from 'services'
const BASE_URL = 'http://p22vy0aug.bkt.clouddn.com/'
import $ from 'jquery'
export default {
  data() {
    return {
      imgUrl: BASE_URL + 'image/',
      audioUrl: BASE_URL + 'audio/mp3',
      mImg: null,
      word: null,
      isShow: false,
      money_num: 8,
      money_group: 4,
      money_show: false,
      qian: ['qian1', 'qian2', 'qian3', 'qian4'],
      //微信分享
      wxShareInfo: {
        title: '狗年大吉',
        desc: '祝您新年旺旺旺',
        imgUrl: BASE_URL + 'spring/iicon.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  beforeCreate() {
    docuemnt.title = '狗年大吉'
  },
  mounted() {
    this.handleWechatShare()
    this.playAudio()
    var h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    var warp = document.getElementById('warp')
    warp.style.minHeight = h + 'px'
    this.getInfoById()
    this.initPage()
  },
  methods: {
    handleWechatShare() {
      if (isInWechat() === true) {
        $wechat()
          .then(res => {
            res.share(this.wxShareInfoValue)
          })
          .catch(err => {
            console.warn(err.message)
          })
      } else {
        console.warn('you r not in wechat environment')
      }
    },
    getInfoById() {
      let id = this.$route.query.id
      getInfoById(id)
        .then(res => {
          this.mImg = res.image
          this.word = res.parms.split('=')[1]
          this.isShow = true
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    initPage() {
      var wid = 0,
        hei = 0,
        one_hei = 0,
        two_top = 0,
        two_hei = 0,
        start_pos = 0,
        that = this
      wid = $(window).width() > 640 ? 640 : $(window).width()
      hei = $('#warp').height()
      one_hei = $('.one').height()
      two_hei = $('.two').height()
      two_top = $('.two').offset().top

      document.addEventListener('touchstart', function() {}, true)
      $('.two').off('touchstart', enter)
      $('.two').on('touchstart', enter)

      function enter(e) {
        e.preventDefault()
        start_pos = e.originalEvent.touches[0].clientY
        $('.two').on('touchmove', move)
        $('.two').on('touchend', end)
      }
      function move(e) {
        var moveY = e.originalEvent.touches[0].clientY
        var diffTwo = moveY - two_top
        var has_move = moveY - start_pos
        var current = 0
        var percent = 0
        if (has_move <= 0) {
          return
        } else if (has_move < hei / 3) {
          percent = has_move * 184 / hei
          $('.one').css({
            marginTop: -184 + percent + '%',
            transform: 'translate(0,' + (-8 + has_move * 24 / hei) / 100 + '%)'
          })
        } else {
          $('.two').off('touchstart', enter)
          $('.two').off('touchmove', move)
          $('.two').off('touchend', end)

          $('.one').animate(
            {
              marginTop: 0,
              transform: 'translate(0,0)'
            },
            1000,
            function() {
              biNums(that.money_num, that.money_group)
              $('.cloud1').animate(
                {
                  right: '1.5%'
                },
                1000
              )
              $('.cloud2').animate(
                {
                  left: '1%'
                },
                1000
              )
              $('.cloud3').animate(
                {
                  right: '6%'
                },
                1000
              )
            }
          )
        }
      }
      function end(e) {
        $('.two').off('touchmove', move)
        if (
          $('.one')
            .css('marginTop')
            .split('px')[0] < 0
        ) {
          $('.one').animate({
            marginTop: -184 + '%'
          })
          $('.one').css({ transform: 'translate(0,' + -8 + '%)' })
        }
      }
      var kcount = 0
      function biNums(num, group) {
        $('.group' + kcount).show()
        $('.group' + kcount + ' .money').each(function(e) {
          $(this).css({ top: 0, left: Math.random() * wid + 'px' })
          $(this).animate(
            {
              top: $('#warp').height() * 0.9 + 'px',
              left: Math.random() * wid + 'px'
            },
            1700 + Math.random() * 1800,
            function() {
              $(this).remove()
              $(this)
                .parent()
                .hide()
            }
          )
        })
        var times = setTimeout(function() {
          if (kcount < group) {
            biNums(num, group)
            kcount++
          } else {
            clearTimeout(times)
            // that.money_show = false
          }
        }, 1000)
      }
    },
    playAudio() {
      var voice = document.getElementById('voice')
      var mbtn = document.getElementById('mbtn')
      if (!voice) {
        return
      }
      //调用 <audio> 元素提供的方法 play()
      voice.play()
      if (voice.paused) {
        mbtn.setAttribute('class', ' ')
      }
      //判斷 WeixinJSBridge 是否存在
      if (
        typeof WeixinJSBridge == 'object' &&
        typeof WeixinJSBridge.invoke == 'function'
      ) {
        voice.play()
      } else {
        //監聽客户端抛出事件"WeixinJSBridgeReady"
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            function() {
              voice.play()
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', function() {
            voice.play()
          })
          document.attachEvent('onWeixinJSBridgeReady', function() {
            voice.play()
          })
        }
      }

      //voiceStatu用來記録狀態,使 touchstart 事件只能觸發一次有效,避免與 click 事件衝突
      var voiceStatu = true
      //监听 touchstart 事件进而调用 <audio> 元素提供的 play() 方法播放音频
      document.addEventListener(
        'touchstart',
        function(e) {
          if (voiceStatu) {
            voice.play()
            voiceStatu = false
          }
        },
        false
      )
      voice.onplay = function() {
        mbtn.setAttribute('class', 'mplay')
      }
      voice.onpause = function() {
        mbtn.setAttribute('class', ' ')
      }
    },
    playOrNot() {
      // 依據 audio 的 paused 属性返回音频是否已暂停來判斷播放還是暫停音频。
      if (voice.paused) {
        voice.play()
      } else {
        voice.pause()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.spring-content {
  background-image: url('@{imgUrl}springnew/bottom.png'),
    url('@{imgUrl}springnew/back.jpg');
  background-repeat: no-repeat, repeat;
  background-size: 100% auto, 100% 100%;
  background-position: center bottom, center top;
  text-align: center;
  height: auto;
  text-align: center;
  padding-bottom: 28%;
  .top {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999999;
  }
  .slider {
    position: relative;
    // overflow: hidden;
    width: 100%;
    padding-top: 27%;
    text-align: center;
    background: url('@{imgUrl}springnew/line.png') center top/3px 95% no-repeat;
    .one {
      margin: 0 auto;
      text-align: center;
      width: 87.5%;
      background: url('@{imgUrl}springnew/frame.png') center top/100% auto
        no-repeat;
      // margin-top: -198%;
      margin-top: -183%;
      transform: translate(0, -8%);
      .photo {
        margin: 0 auto;
        width: 83.5%;
        margin-top: 7.4%;
        margin-left: 0.61%;
      }
      .word {
        margin: 0 auto;
        width: 100%;
        margin-top: 10%;
      }
    }
    .two {
      width: 87%;
      margin: 0 auto;
      margin-top: 2%;
      margin-left: 2px;
    }
    .cloud1,
    .cloud2,
    .cloud3 {
      position: absolute;
      z-index: 999;
    }
    .cloud1 {
      width: 25%;
      right: -30%;
      bottom: 46%;
    }
    .cloud2 {
      width: 19.5%;
      left: -25%;
      bottom: 36.2%;
    }
    .cloud3 {
      width: 14%;
      right: -20%;
      bottom: 3%;
    }
  }
}

#mbtn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  z-index: 99999999;
}
.mplay {
  animation: mycir 2s linear infinite;
}
.group {
  display: none;
}
.money {
  position: absolute;
  z-index: 9999;
  width: 8.5%;
}
@keyframes mycir {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

