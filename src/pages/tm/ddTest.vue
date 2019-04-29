<template>
  <div 
    :style="style.root"
    class="content" 
  >
    <div 
      v-show="!qShow.qShow3"
      class="main"
    >
      <!-- 输入名字年龄性别 -->
      <div 
        v-show="page1"  
        :style="style.root" 
        class="page1" 
        @click.stop.prevent="()=>{ pull_sex=false;pull_year=false;}"
      >
        <img 
          :src="IMGURL + 'title.png'"
          class="title" 
        >
        <div class="message">
          <div class="select-area">
            <input 
              ref="input" 
              class="name select1" 
              placeholder="输入名字"
              type="text" 
              maxlength="5"
            >
          </div>
          <div class="select-area">
            <div 
              class="select1"  
              data-year 
              @click.stop="()=>{pull_year=!pull_year;pull_sex=false;}"
            >
              {{ yearText }}
            </div>
            <ul 
              v-show="pull_year"
              class="select2"
            >
              <a 
                v-for="(item,index) in years_range" 
                :key="item.id" 
                @click="getYear(index,item)"
              >
                <li class="list-li">
                  {{ item }}
                </li>
              </a>
            </ul>
          </div>
          <div class="select-area">
            <div 
              class="select1" 
              data-sex 
              @click.stop="()=>{pull_sex=!pull_sex;pull_year=false;}"
            >
              {{ sexText }}
            </div>
            <ul 
              v-show="pull_sex"
              class="select2"
            >
              <a  
                @click="getSex('nan','男')"
              >
                <li class="list-li">
                  男
                </li>
              </a>
              <a  
                @click="getSex('nv','女')"
              >
                <li class="list-li">
                  女
                </li>
              </a>
            </ul>
          </div>
          <!-- <p class="error"></p> -->
          <a 
            class="start"
            @click.prevent="getStart" 
          >
            开始诊断
          </a>
        </div>
        <img 
          :src="IMGURL + 'page1_t.png'"
          class="paget" 
        >
      </div>
      <!-- 答题 -->
      <div 
        v-show="!page1" 
        :style="style.root"
        class="page2" 
      >
        <div 
          v-for="(item,index) in 3" 
          v-show="qShow['qShow'+index]"  
          :key="item.id" 
          class="anwsers"
        >
          <img 
            :src="IMGURL + preUrl + item +'.png'"
            class="question" 
          >
          <img 
            :src="IMGURL + 't'+ item + '.png'"
            class="t_img" 
          >
          <ul class="click_ul">
            <li class="left">
              <a @click.once="getScore('A',index)" />
            </li>
            <li class="right">
              <a @click.once="getScore('B',index)" />
            </li>
          </ul>
        </div>
      </div>
      <img 
        :src="IMGURL + 'icebg.png?111'"
        class="icebg" 
      >
    </div>
    <!-- canvas 图片合成 -->
    <div 
      v-show="qShow.qShow3" 
      :style="style.root"
      class="page3" 
    >
      <canvas id="canvas" />
      <img 
        src=""
        class="result"  
        alt="病假单"
      >
      <!-- 显示剪切后的图像 -->
      <canvas 
        id="canvas2" 
        style="display:none"
      />
      <img 
        id="mImg" 
        src="base64Data" 
        alt="病假单"
      >
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack } from 'services'
import MC from 'mcanvas'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      style: {
        root: {
          height: this.$innerHeight() + 'px'
        }
      },
      yearText: '年龄',
      sexText: '性别',
      userName: null,
      page1: true, //true
      pull_year: false,
      pull_sex: false,
      base64Data: null,
      //图片命名：性别+年龄   sex+yaer
      sex: null,
      //0-25:0;26-30:1;31-40:2;41以上：3;
      year: null,
      //选择后图片拼接的前一部分地址
      preUrl: null, //null
      IMGURL: IMAGE_SERVER + '/pages/tmdd/',
      years_range: ['0-25岁', '26-30岁', '31-40岁', '41岁以上'],
      answer: {
        A: 0,
        B: 0
      },
      qShow: {
        qShow0: true,
        qShow1: false,
        qShow2: false,
        qShow3: false
      },
      //微信分享
      wxShareInfo: {
        title: '您有一张新的【病假单】还未领取，请点击查收！',
        desc: '冻住亚健康冻住美，让忙碌的身体“放个假”',
        link: process.env.AD_API+'/api/s/k5' + window.location.search, //window.location.origin + '/marketing/dd_test',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmdd/share.jpg',
        success: function() {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.wechatShare()
    let ice = document.querySelector('.icebg')
    if (this.$innerHeight() > 700) {
      ice.style.bottom = '16.5%'
    }
  },
  methods: {
    wechatShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfo)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    getYear(index, item) {
      this.year = index
      this.pull_year = false
      this.yearText = item
    },
    getSex(name, text) {
      this.sex = name
      this.pull_sex = false
      this.sexText = text
    },
    getStart() {
      let input = this.$refs.input
      if (!input.value) {
        alert('请填写姓名，不超过5个字')
        return
      }
      if (this.year === null) {
        alert('请选择年龄')
        return
      }
      if (!this.sex) {
        alert('请选择性别')
        return
      }
      this.userName = input.value
      this.preUrl = this.sex + this.year
      this.page1 = false
      window.scrollTo(0, 0)
    },
    getScore(name, index) {
      this.answer[name]++
      this.qShow['qShow' + index] = false
      this.qShow['qShow' + (index + 1)] = true
      if (this.qShow.qShow3) {
        this.drawCanvas(this.answer['A'])
        return
      }
    },
    drawing(image) {
      let canvas = document.getElementById('canvas2')
      let ctx2 = canvas.getContext('2d')
      let mImg = new Image()
      mImg.setAttribute('crossOrigin', 'Anonymous')
      mImg.src = image
      mImg.onload = function() {
        canvas.width = mImg.width
        canvas.height = mImg.height * 0.7
        // img, sx, sy, swidth, sheight, x, y, width, height
        ctx2.drawImage(
          mImg,
          0,
          0,
          mImg.width,
          mImg.height * 0.7,
          0,
          0,
          mImg.width,
          mImg.height * 0.7
        )
        let url = canvas.toDataURL('image/png')
        let img = document.querySelector('#mImg')
        img.src = url
      }
    },
    drawCanvas(score) {
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let bg = new Image()
      let er = new Image()
      let word = new Image()
      let result = document.querySelector('.result')
      score = score > 1 ? score : 1
      bg.setAttribute('crossOrigin', 'Anonymous')
      er.setAttribute('crossOrigin', 'Anonymous')
      word.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = function() {
        canvas.width = bg.width
        canvas.height = bg.height
        ctx.drawImage(bg, 0, 0)
        ctx.font = 'bolder 28px NSimSun '
        ctx.fontStyle = '#000'
        ctx.rotate(0.04 * Math.PI)
        ctx.fillText(that.userName, bg.width * 0.48, bg.height * 0.175)
        er.onload = function() {
          ctx.drawImage(
            er,
            0,
            0,
            er.width,
            er.height,
            bg.width * 0.35,
            bg.height * 0.475,
            bg.width * 0.2,
            bg.width * 0.2
          )
          word.onload = function() {
            ctx.rotate(-Math.PI * 0.035)
            ctx.drawImage(
              word,
              0,
              0,
              word.width,
              word.height,
              bg.width * 0.06,
              bg.height * 0.675,
              word.width * 0.99,
              word.height * 0.99
            )
            let url = canvas.toDataURL('image/png')
            result.src = url
            //合成图片成功之后调用
            that.drawing(result.src)
          }
          word.src = 'http://p22vy0aug.bkt.clouddn.com/image/tmdd/text.png?555'
        }
        er.src = 'http://p22vy0aug.bkt.clouddn.com/image/tmdd/er.png?56656'
      }
      bg.src =
        'http://p22vy0aug.bkt.clouddn.com/image/tmdd/result3/' +
        this.preUrl +
        score +
        '.jpg' +
        this.$qiniuCompress()
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/tmdd/';
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0;
  font-size: 0;
  text-align: center;
}
img {
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.content {
  overflow: hidden;
  .main {
    position: relative;
    width: 100%;
    z-index: 0;
    .bg {
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .icebg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999;
    }
  }
}
.page1 {
  position: relative;
  z-index: 9;
  width: 100%;
  text-align: center;
  background: url('@{imgUrl}page1.jpg') center top / 100% auto no-repeat;
  h1 {
    width: 100%;
    font-size: 1.7rem;
    color: #0050b3;
    font-weight: 800;
    font-family: '微软雅黑';
    letter-spacing: 3px;
    line-height: 2.2rem;
    margin: 0 auto;
    margin-top: 57%;
    margin-bottom: 6%;
  }
  .title {
    width: 50%;
    margin: 0 auto;
    margin-top: 50%;
    margin-bottom: 3%;
  }
  .paget {
    width: 100%;
    margin-top: -6%;
  }
  .select-area {
    width: 40%;
    position: relative;
    display: block;
    margin: 0 auto;
    margin-bottom: 4%;
  }
  .select1 {
    font-family: '微软雅黑';
    font-size: 1.1rem;
    font-weight: 600;
    color: #1961cd;
    letter-spacing: 2px;
    width: 100%;
    height: 35px;
    line-height: 30px;
    border: solid 2px #0063d3;
    border-radius: 20px;
    box-shadow: 0px 4px 0px 0 rgba(0, 100, 211, 0.9);
    display: block;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    text-align: center;
  }
  .name {
    color: #1961cd;
    &::-webkit-input-placeholder {
      color: #1961cd;
    }
    &::placeholder {
      color: #1961cd;
    }
  }
  .select2 {
    position: absolute;
    width: 80%;
    left: 10%;
    margin: 0 auto;
    display: block;
    // z-index: 99;
    margin-top: -2px;
    padding: 6px 0px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 100, 211, 1);
    a {
      width: 100%;
      .list-li {
        width: 100%;
        font-family: '微软雅黑';
        font-size: 0.9rem;
        font-weight: 600;
        color: #fff;
        padding: 3px 0px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:active {
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:visited {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
  .select1[data-year] {
    z-index: 100;
    & + .select2 {
      z-index: 60;
    }
  }
  .select1[data-sex] {
    z-index: 45;
    & + .select2 {
      z-index: 30;
    }
  }
  .error {
    font-family: '楷体';
    color: red;
    font-size: 1rem;
    height: 1rem;
    margin-top: -10px;
    margin-bottom: 10px;
  }
  .start {
    width: 40%;
    border: solid 2px #9e0000;
    font-family: '微软雅黑';
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
    height: 40px;
    line-height: 35px;
    border-radius: 20px;
    box-shadow: 0px 4px 0px 0 rgba(223, 56, 82, 0.9);
    margin: 0 auto;
    background-color: #df3852;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
}
.page2 {
  position: relative;
  width: 100%;
  z-index: 9;
  overflow: hidden;
  background: url('@{imgUrl}bg.jpg') center top / 100% auto no-repeat;
  .anwsers {
    width: 80%;
    position: relative;
    margin: 0 auto;
    margin-top: 45%;
    .question {
      width: 100%;
    }
    .t_img {
      width: 100%;
    }
  }
  .click_ul {
    position: absolute;
    top: 11%;
    left: 50%;
    transform: translate(-50%, 0);
    display: inline-block;
    width: 75%;
    height: 21%;
    overflow: hidden;
    li {
      display: inline-block;
      width: 47%;
      height: 100%;
      a {
        width: 100%;
        height: 100%;
      }
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
}
.page3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 9999;
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 0;
  }
  .result {
    width: 100%;
    position: relative;
    z-index: 99;
    pointer-events: auto;
    user-select: auto;
  }
  #mImg {
    width: 100%;
    // height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9900;
    opacity: 0;
    pointer-events: auto;
    user-select: auto;
  }
}
</style>


