<template>
    <div class="content">
      <div class="main" v-show="!qShow.qShow3">
        <img class="bg" :src="IMGURL + 'bg.jpg'" v-show="!page1"/>
        <img class="bg" :src="IMGURL + 'page1_bg.jpg'" v-show="page1"/>
        <img class="icebg" :src="IMGURL + 'ices.png'"/>
        <!-- 输入名字年龄性别 -->
        <div class="page1" :style="style.root" v-show="page1" @click.stop.prevent="()=>{pull_sex=false;pull_year=false;}">
          <h1>输入您的年龄、性别<br/>参加本次诊疗</h1>
          <!-- <img class="title" :src="IMGURL + 'title.png'"/> -->
          <div class="message">
            <div class="select-area">
              <input class="name select1" placeholder="输入名字" type="text" maxlength="5" ref="input"/>
            </div>
            <div class="select-area">
              <div class="select1"  @click.stop="()=>{pull_year=!pull_year;pull_sex=false;}" data-year>{{yearText}}</div>
              <ul class="select2" v-show="pull_year">
                <a v-for="(item,index) in years_range" :key="item.id" @click="getYear(index,item)"><li class="list-li">{{item}}</li></a>
              </ul>
            </div>
            <div class="select-area">
              <div class="select1" @click.stop="()=>{pull_sex=!pull_sex;pull_year=false;}" data-sex>{{sexText}}</div>
              <ul class="select2" v-show="pull_sex">
                  <a  @click="getSex('nan','男')"><li class="list-li">男</li></a>
                  <a  @click="getSex('nv','女')"><li class="list-li">女</li></a>
              </ul>
            </div>
            <p class="error"></p>
            <a @click.prevent="getStart" class="start">
              开始诊断
              <!-- <img  :src="IMGURL + 'start.png'"> -->
            </a>
          </div>
          <img class="paget" :src="IMGURL + 'page1_t.png'"/>
        </div>
        <!-- 答题 -->
        <div class="page2" v-show="!page1">
          <div class="anwsers" v-for="(item,index) in 3"  :key="item.id" v-show="qShow['qShow'+index]">
            <img class="question" :src="IMGURL + preUrl + item +'.png'"/>
            <img class="t_img" :src="IMGURL + 't'+ item + '.png'"/>
            <ul class="click_ul">
              <li class="left"><a @click.once="getScore('A',index)"></a></li>
              <li class="right"><a @click.once="getScore('B',index)"></a></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- canvas 图片合成 -->
      <div class="page3" v-show="qShow.qShow3">
        <canvas id="canvas"></canvas>
        <img class="result" src="" alt="病假单"/>
      </div>
      
    </div>
</template>
<script>
import { $_wechat, wechatShareTrack } from 'services'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'
export default {
  data() {
    return {
      style: {
        root: {
          'min-height': this.innerHeight() + 'px'
        }
      },
      yearText: '年龄',
      sexText: '性别',
      userName: null,
      page1: true, //true
      pull_year: false,
      pull_sex: false,
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
        link: 'http://papi.xingstation.com/api/s/VDyO',
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
  },
  methods: {
    wechatShare() {
      $_wechat()
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
      let error = document.querySelector('.error')
      if (!input.value) {
        error.innerHTML = '请填写姓名，中文不超过5个字'
        return
      }
      if (this.year === null) {
        error.innerHTML = '请选择年龄'
        return
      }
      if (!this.sex) {
        error.innerHTML = '请选择性别'
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
    drawCanvas(score) {
      let that = this
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let bg = new Image()
      let result = document.querySelector('.result')
      score = score > 1 ? score : 1
      bg.setAttribute('crossOrigin', 'Anonymous')
      bg.onload = function() {
        canvas.width = bg.width
        canvas.height = bg.height
        ctx.drawImage(bg, 0, 0)
        ctx.font = 'bolder 28px NSimSun '
        ctx.fontStyle = '#000'
        ctx.rotate(0.04 * Math.PI)
        ctx.fillText(that.userName, bg.width * 0.5, bg.height * 0.255)
        // ctx.fillText('张三', bg.width * 0.5, bg.height * 0.255)
        let url = canvas.toDataURL('image/png')
        result.src = url
      }
      // bg.src = '/static/tmdd/' + this.preUrl + score + '.jpg'
      bg.src =
        'http://p22vy0aug.bkt.clouddn.com/image/tmdd/result/' +
        this.preUrl +
        score +
        '.jpg' +
        this.qiniuCompress()
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
      position: relative;
      margin-top: -30%;
      width: 100%;
      z-index: 999;
    }
  }
}
.page1 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  text-align: center;
  h1 {
    width: 100%;
    font-size: 1.5rem;
    color: #0050b3;
    font-weight: 800;
    font-family: '微软雅黑';
    letter-spacing: 3px;
    line-height: 2rem;
    margin: 0 auto;
    margin-top: 57%;
    margin-bottom: 6%;
  }
  .title {
    width: 63.5%;
    margin: 0 auto;
    margin-top: 58%;
    margin-bottom: 7%;
  }
  .paget {
    width: 100%;
  }
  .select-area {
    width: 52%;
    position: relative;
    display: block;
    margin: 0 auto;
    margin-bottom: 8%;
  }
  .select1 {
    font-family: '微软雅黑';
    font-size: 1.1rem;
    font-weight: 600;
    color: #1961cd;
    letter-spacing: 2px;
    width: 100%;
    height: 50px;
    line-height: 45px;
    border: solid 3px #0063d3;
    border-radius: 25px;
    box-shadow: 0px 6px 0px 0 rgba(0, 100, 211, 0.9);
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
    padding: 10px 0px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: rgba(0, 100, 211, 1);
    a {
      width: 100%;
      .list-li {
        width: 100%;
        font-family: '微软雅黑';
        font-size: 1rem;
        font-weight: 600;
        color: #fff;
        padding: 5px 0px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        // .list-li {
        //   background-color: rgba(255, 255, 255, 0.3);
        // }
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
    width: 52%;
    border: solid 3px #9e0000;
    font-family: '微软雅黑';
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
    height: 50px;
    line-height: 45px;
    border-radius: 25px;
    box-shadow: 0px 6px 0px 0 rgba(223, 56, 82, 0.9);
    margin: 0 auto;
    background-color: #df3852;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
}
.page2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  overflow-x: hidden;
  .anwsers {
    width: 100%;
    margin-top: 70%;
    position: relative;
    .question {
      width: 100%;
    }
    .t_img {
      width: 120%;
      margin-left: -10%;
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
  min-height: 100%;
  z-index: 99;
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
}
</style>


