<template>
  <!-- eslint-disable -->
  <div class="client-wrap" v-show="showPage">
    <img class="abs slogan" :src="imgServerUrl + '/pages/win_prize/client_slogan.png'" alt="">
    <div class="abs info">
      <div class="people-info">
        已有<span class="num"> 8,089,101 </span>人闯关成功
      </div>
      <div class="user-swiper-wrap clearfix">
        <div class="user-content first clearfix">
          <div v-for="(head, index) in 20" v-bind:class="index > headImgAnimate.hideIndex1 ? 'hide' : ''" v-bind:key="head" class="user">
            <img class="image-header" :src="imgServerUrl + '/pages/win_prize/h'+ (index + 1)  +'.jpg'" alt="">
          </div>
        </div>
        <div class="user-content second clearfix">
          <div v-for="(head, index) in 20" v-bind:class="index > headImgAnimate.hideIndex2 ? 'hide' : ''" v-bind:key="head" class="user">
            <img class="image-header" :src="imgServerUrl + '/pages/win_prize/h'+ (index + 1) +'.jpg'" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="abs question">
      <div class="abs clock">
        <svg id="mySvg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle id="progress1" r="40%" cy="50%" cx="50%" stroke-width="15" stroke="#ffd941" fill="none"/>
          <circle id="progress2" r="40%" cy="50%" cx="50%" stroke-width="15" stroke="#d2d2d2" fill="none"/>
        </svg>
        <div class="clock-text">{{clockOpts.text}}</div>
      </div>
      <div class="abs question-name" v-bind:class="{ small: classFlag.small, middle: classFlag.middle }">{{curQuestion.name}}</div>
      <div class="abs choice-wrap">
        <div class="choice" v-for="(choice, index) in curQuestion.choices" v-bind:key="choice">
          <span v-if="index == 0">A.{{choice}}</span>
          <span v-if="index == 1">B.{{choice}}</span>
          <span v-if="index == 2">C.{{choice}}</span>
        </div>
      </div>
      <div class="abs qr-code-wrap">
        <div class="qr-code">
          <img :src="imgServerUrl + '/pages/win_prize/qr@500.png'" alt="">
        </div>
        <div class="qr-text">微信扫码答题</div>
      </div>
    </div>
    <div class="remark">
      <p>在手机上连续答对3题即可获取随机现金红包，</p>
      <p>最高100元，可<span class="point">随时提现</span></p>
    </div>
    <div v-for="i in 9" v-bind:key="i" v-bind:class="'coin-'+i" class="coin"></div>
  </div>
</template>
<script>
/* eslint-disable */
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
import Question from "./question0129";
import $ from "jquery";
const parseUrl = process.env.PARSE_SERVER;

export default {
  data() {
    return {
      showPage: true,
      userInfo: {
        wx_openid: "",
        head_image: ""
      },
      curCompetition: {}, // 当前页面所在的比赛信息,
      curQuestion: {
        name: "",
        choices: []
      },
      classFlag: {
        small: false,
        middle: false
      },
      preQuestionIds: [], // 保存前5轮第一题题目id，避免与本轮重复,
      reqUrl: `${parseUrl}/parse/classes/h5_competition_records`,
      headImgArray: [0, 1, 2, 3, 4, 5],
      imgServerUrl: IMAGE_SERVER,
      headImgAnimate: {
        hideIndex1: 9,
        hideIndex2: -1
      },
      Question: Question,
      QuestionByCategary: {},
      clockOpts: {
        text: "05:00",
        originText: "05:00",
        sumSecs: 300,
        n: 0, //每秒转的圆心角度
        curOffset: 0 //当前弧长
      }
    };
  },
  beforeCreate() {
    document.title = "勇闯三关";
  },
  created() {
    this.formatQuestionByCategary();
    this.initPage();
  },
  mounted() {
    this.loopHeader(1, "first");
    document.getElementsByTagName("body")[0].style.width =
      window.innerWidth + "px";
    document.getElementsByTagName("body")[0].style.height =
      (1920 / 1080) * window.innerWidth + "px";
  },
  methods: {
    initPage() {
      // 屏幕端：初始化steps
      // 1：取出当前正在进行的轮次，计算距离结束时间，从而初始化倒计时，初始化题目界面。
      // 2：如果没有status为1的轮次，那么就从题库随机选一个生成新的轮次，存入数据库。
      let searchArea = {
        status: "1"
      };

      parseService
        .get(
          this.reqUrl +
            "?where=" +
            JSON.stringify(searchArea) +
            "&order=-begin_time&limit=1"
        )
        .then(data => {
          if (data.results && data.results.length) {
            // 恢复竞赛
            this.restoreCompetition(data.results[0]);
          } else {
            // 生成新竞赛
            this.creatCompetition();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    creatCompetition() {
      let that = this;
      let newCompetition = {
        qids: "",
        answers: "",
        answer_num: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        prize_type: "1",
        prize_id: [16, 17],
        status: "1",
        begin_time: ""
      };

      // 第一题从简单题27-end选择，后两题1-26选择
      let searchArea = {
        status: "0"
      };
      // 获取前5轮的题目数据
      parseService
        .get(
          this.reqUrl +
            "?where=" +
            JSON.stringify(searchArea) +
            "&order=-begin_time&limit=5"
        )
        .then(data => {
          let preCompetitions = data.results;
          if (!preCompetitions || !preCompetitions.length) {
            // 没有历史轮次记录，第一题无需管重复直接生成
            newCompetition.qids = this.createQuestions();
          } else {
            for (let i = 0, length = preCompetitions.length; i < length; i++) {
              let firstQid = preCompetitions[i].qids[0];
              this.preQuestionIds.push(firstQid);
            }
            // 前5轮记录，第一题需要不能与前5轮第一题有重复
            newCompetition.qids = this.createQuestions();
          }

          // 保存新一轮的比赛到数据库
          let tempAnswerArry = [];
          for (
            let i = 0, length = newCompetition.qids.length;
            i < length;
            i++
          ) {
            tempAnswerArry.push(Question[newCompetition.qids[i]].answer);
          }

          newCompetition.answers = tempAnswerArry;
          this.createAnswerNums(newCompetition);
          newCompetition.begin_time = new Date().getTime() + "";
          parseService
            .post(this.reqUrl, newCompetition)
            .then(res => {
              this.curCompetition.objectId = res.data.objectId;
            })
            .catch(err => {
              console.log(err);
            });

          // 显示页面、初始化时钟
          this.curCompetition = newCompetition;
          this.showPage = true;
          this.clockOpts.text = this.clockOpts.originText;
          setTimeout(function() {
            that.initClock(1);
          }, 1000);
          this.initQuestion();
        })
        .catch(err => {
          console.log(err);
        });
    },
    restoreCompetition(inCompetition) {
      let clockSec = new Date().getTime() - parseInt(inCompetition.begin_time);
      clockSec = Math.floor(clockSec / 1000);
      if (clockSec >= this.clockOpts.sumSecs) {
        this.endCurCompetition(inCompetition.objectId);
        this.creatCompetition();
        return;
      }

      this.curCompetition = inCompetition;
      this.showPage = true;
      this.initQuestion();
      this.initClock(clockSec);
    },
    createQuestions() {
      // 简单题分类为2、复杂题分类为1
      // 现在的逻辑，第一题从简单题里抽取1题，第2、3题分别从简单和复杂题库里抽取
      let qids = [];
      let simpleQLength = this.QuestionByCategary[1].length;
      let complexQLength = this.QuestionByCategary[2].length;
      while (qids.length < 1) {
        let firstQ = Math.floor(Math.random() * simpleQLength);
        firstQ = this.QuestionByCategary[1][firstQ].id;
        if (!this.preQuestionIds.includes(firstQ.toString())) {
          qids.push(parseInt(firstQ));
        }
        // let intersection = qids.filter(v => this.preQuestionIds.includes(v))
      }

      while (qids.length < 3) {
        let qid = Math.floor(
          Math.random() * (complexQLength + simpleQLength) + 1
        );
        if (!qids.includes(qid)) {
          qids.push(qid);
        }
      }
      return qids;
    },
    createAnswerNums(newCompetition) {
      // 初始化题目回答人数
      // Easy:正确：50-100人 错误  10-20人 正确概率：55.6% - 83.3%
      // Hard:正确：30-60人 错误  15-35人 正确概率：30% - 66.6%
      for (let i = 0, length = newCompetition.qids.length; i < length; i++) {
        let curQuestionObj = this.Question[newCompetition.qids[i]];
        let curQuestionAnswer = curQuestionObj.answer;
        if (curQuestionObj.categary == 1) {
          for (
            let j = 0, length = newCompetition.answer_num[i].length;
            j < length;
            j++
          ) {
            if (j == curQuestionAnswer - 1) {
              newCompetition.answer_num[i][j] = Math.floor(
                Math.random() * (100 - 50 + 1) + 50
              );
            } else {
              newCompetition.answer_num[i][j] = Math.floor(
                Math.random() * (20 - 10 + 1) + 10
              );
            }
          }
        } else if (curQuestionObj.categary == 2) {
          for (
            let j = 0, length = newCompetition.answer_num[i].length;
            j < length;
            j++
          ) {
            if (j == curQuestionAnswer - 1) {
              newCompetition.answer_num[i][j] = Math.floor(
                Math.random() * (60 - 30 + 1) + 30
              );
            } else {
              newCompetition.answer_num[i][j] = Math.floor(
                Math.random() * (35 - 15 + 1) + 15
              );
            }
          }
        }
      }
    },
    endCurCompetition(cid) {
      parseService
        .put(this.reqUrl + "/" + cid, JSON.stringify({ status: "0" }))
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    initQuestion() {
      this.curQuestion.name =
        this.Question[this.curCompetition.qids[0]].name + "?";
      this.curQuestion.choices = this.Question[
        this.curCompetition.qids[0]
      ].choices;
      if (
        this.curQuestion.name.length > 15 &&
        this.curQuestion.name.length <= 30
      ) {
        this.classFlag.middle = true;
      }
      if (
        this.curQuestion.name.length > 30 &&
        this.curQuestion.name.length <= 45
      ) {
        this.classFlag.small = true;
      }
      // console.log(this.curCompetition)
    },
    initClock(clockSec) {
      // 设置半径
      let c = $("svg").width() * 0.4 * Math.PI * 2;
      let that = this;

      $("#progress2").css("stroke-dashoffset", "0px");
      $("#progress1").css("stroke-dasharray", c);
      $("#progress2").css("stroke-dasharray", c);
      setTimeout(function() {
        if (clockSec == 1) {
          that.clockOpts.n = 0;
          that.clockOpts.curOffset = 0;
          that.clock(1);
        } else {
          that.clockOpts.n = that.clockOpts.n - 360 / that.clockOpts.sumSecs;
          that.clockOpts.curOffset =
            (that.clockOpts.n * clockSec * Math.PI * $("svg").width() * 0.4) /
            180;
          that.clock(clockSec);
        }
      }, 0);
    },
    clock(sec) {
      let that = this;
      let c = $("svg").width() * 0.4 * Math.PI * 2;
      if (sec > this.clockOpts.sumSecs) {
        // 超过5分钟新建比赛
        this.endCurCompetition(this.curCompetition.objectId);
        this.creatCompetition();
        return;
      }

      // 设置时间
      let nowTime = this.clockOpts.sumSecs - sec;
      let nowTimeMin = Math.floor(nowTime / 60);
      let nowSec = nowTime % 60;
      if (nowSec < 10) {
        nowSec = "0" + nowSec;
      }

      this.clockOpts.text = "0" + nowTimeMin + ":" + nowSec;

      // 设置时间进度条
      this.clockOpts.n = this.clockOpts.n - 360 / this.clockOpts.sumSecs;
      let offset =
        this.clockOpts.curOffset +
        (this.clockOpts.n * Math.PI * $("svg").width() * 0.4) / 180;
      $("#progress2").css("stroke-dashoffset", offset);
      sec++;
      setTimeout(function() {
        that.clock(sec);
      }, 1000);
    },
    loopHeader(loop, type) {
      let that = this;
      if (type == "first") {
        if (loop > 20) {
          that.headImgAnimate.hideIndex1 = -1;
          $(".user-content.first").css("left", "625px");
          return;
        }

        if (loop == 12) {
          that.loopHeader2(1, "second");
        }
      } else {
        if (loop == 21) {
          that.loopHeader2(1, "second");
        }

        if (loop > 29) {
          that.headImgAnimate.hideIndex1 = -1;
          $(".user-content.first").css("left", "625px");
          return;
        }
      }

      $(".user-content.first").animate({ left: "-=57.5px" }, 0, "linear");

      if (type == "first") {
        $(".user-content.first .user")
          .eq(loop + 8)
          .removeClass("hide");
        $(".user-content.first .user")
          .eq(loop - 1)
          .addClass("hide");
      }

      if (type == "second" && loop > 9) {
        $(".user-content.first .user")
          .eq(loop - 10)
          .addClass("hide");
        $(".user-content.first .user")
          .eq(loop - 1)
          .removeClass("hide");
      }

      if (type == "second" && loop <= 10) {
        $(".user-content.first .user")
          .eq(loop - 1)
          .removeClass("hide");
      }

      loop++;
      setTimeout(function() {
        that.loopHeader(loop, type);
      }, 1000);
    },
    loopHeader2(loop, type) {
      let that = this;
      if (type == "second") {
        if (loop == 21) {
          that.loopHeader(1, "second");
        }

        if (loop > 29) {
          that.headImgAnimate.hideIndex2 = -1;

          $(".user-content.second").css("left", "625px");
          return;
        }
      }

      $(".user-content.second").animate({ left: "-=57.5px" }, 0, "linear");

      if (type == "first") {
        $(".user-content.second .user")
          .eq(loop + 8)
          .removeClass("hide");
        $(".user-content.second .user")
          .eq(loop - 1)
          .addClass("hide");
      }

      if (type == "second" && loop > 9) {
        $(".user-content.second .user")
          .eq(loop - 10)
          .addClass("hide");
        $(".user-content.second .user")
          .eq(loop - 1)
          .removeClass("hide");
      }

      if (type == "second" && loop <= 10) {
        $(".user-content.second .user")
          .eq(loop - 1)
          .removeClass("hide");
      }

      loop++;
      setTimeout(function() {
        that.loopHeader2(loop, type);
      }, 1000);
    },
    formatQuestionByCategary() {
      for (let i in this.Question) {
        if (!this.QuestionByCategary[this.Question[i].categary]) {
          this.QuestionByCategary[this.Question[i].categary] = [];
        }
        let tempQuestionObj = JSON.stringify(this.Question[i]);
        tempQuestionObj = JSON.parse(tempQuestionObj);
        tempQuestionObj.id = i;
        this.QuestionByCategary[this.Question[i].categary].push(
          tempQuestionObj
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
@IMAGE_SERVER: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing";
.client-wrap {
  position: relative;
  height: 100%;
  background-image: url("@{IMAGE_SERVER}/pages/win_prize/client_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  .abs {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .slogan {
    top: 12%;
    width: 84%;
  }
  .info {
    top: 23%;
    .people-info {
      color: #fff;
      font-size: 42px;
      letter-spacing: 1px;
      .num {
        color: #ffe221;
      }
    }
    .user-swiper-wrap {
      position: relative;
      // width: 280px;
      // height: 30px;
      width: 700px;
      height: 75px;
      margin: 0 auto;
      margin-top: 10px;
      overflow: hidden;
      .user-content {
        position: absolute;
        // width: 530px;
        width: 1330px;
        transition: left 1s;
        &.first {
          // left: 25px;
          left: 100px;
        }
        &.second {
          // left: 250px;
          left: 615px;
        }
        .user {
          // width: 30px;
          // height: 30px;
          width: 70px;
          height: 70px;
          float: left;
          opacity: 1;
          transform: scale(1);
          border-radius: 50%;
          // margin-left: -5px
          margin-left: -12.5px;
          transition: all 0.3s 0.1s;
          &.hide {
            opacity: 0;
            transform: scale(0);
          }
          .image-header {
            width: 100%;
            max-width: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .question {
    top: 36%;
    width: 84%;
    z-index: 2;
    background: #fff;
    border-radius: 5%;
    padding-bottom: 88%;
    backface-visibility: hidden;
    .clock {
      top: -5%;
      width: 24%;
      z-index: 2;
      padding-bottom: 24%;
      border-radius: 50%;
      background-color: #fff;
      svg {
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        z-index: 1;
      }
      .clock-text {
        position: absolute;
        font-size: 40px;
        height: 40px;
        margin: auto;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
      }
      #progress2 {
        transform: rotate(-90deg);
        transform-origin: center;
      }
    }
    .question-name {
      position: absolute;
      top: 20%;
      left: 0;
      right: 0;
      padding: 0 10%;
      margin: 0 auto;
      font-size: 40px;
      color: #2f2f2f;
      text-align: left;
      &.small {
        font-size: 40px;
      }
      &.middle {
        font-size: 50px;
      }
    }
    .choice-wrap {
      right: auto;
      left: 5%;
      top: 48%;
      width: 45%;
      margin: 0;
      font-size: 40px;
      color: #2f2f2f;
      text-align: left;
      font-weight: 300;
      .choice {
        margin-bottom: 60px;
      }
    }
    .qr-code-wrap {
      right: 5%;
      margin: 0;
      top: 45%;
      width: 38%;
      left: auto;
      text-align: center;
      .qr-code {
        img {
          max-width: 100%;
        }
      }
      .qr-text {
        font-size: 40px;
        font-weight: 400;
        color: #ff5454;
        margin-top: 40px;
      }
    }
  }
  .remark {
    position: absolute;
    bottom: 6%;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 34px;
    color: #fff;
    p {
      margin: 6px 0;
    }
    .point {
      color: #ffe221;
    }
  }
  .coin {
    position: fixed;
    z-index: 3;
    transition: all 2s;
    animation-fill-mode: forwards;
    background-image: url("@{IMAGE_SERVER}/pages/win_prize/coin.png");
    &.coin-1 {
      top: 10%;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 74.7px;
      height: 67.2px;
      background-size: 373.5px 67.2px;
      animation: playgif 0.5s infinite steps(4), down 5s infinite linear;
      transform: rotate3d(1, 1, 0, 40deg);
    }
    &.coin-2 {
      top: 10%;
      right: 30%;
      width: 88.75px;
      height: 80px;
      opacity: 0;
      background-size: 443.75px 80px;
      animation: playgif 0.5s infinite steps(4), down 3s 3s infinite linear;
      transform: rotateX(-50deg) rotateY(50deg);
    }
    &.coin-3 {
      top: 10%;
      left: 30%;
      opacity: 0;
      width: 124.25px;
      height: 112px;
      background-size: 621.25px 112px;
      animation: playgif 0.5s infinite steps(4), down 4s 2s infinite linear;
      transform: rotateX(-10deg) rotateY(10deg);
    }
    &.coin-4 {
      top: 10%;
      left: 10%;
      opacity: 0;
      width: 113.6px;
      height: 102.4px;
      background-size: 568px 102.4px;
      animation: playgif 0.5s infinite steps(4), down 3s 4s infinite linear;
      transform: rotateX(-20deg) rotateY(20deg);
    }
    &.coin-5 {
      top: 10%;
      left: 20%;
      opacity: 0;
      width: 124.25px;
      height: 112px;
      background-size: 621.25px 112px;
      animation: playgif 0.5s infinite steps(4), down 3.5s 1.5s infinite linear;
      transform: rotateX(-10deg) rotateY(50deg);
    }
    &.coin-6 {
      top: 10%;
      right: 5%;
      opacity: 0;
      width: 74.7px;
      height: 67.2px;
      background-size: 373.5px 67.2px;
      animation: playgif 0.5s infinite steps(4), down 5s 0.5s infinite linear;
      transform: rotateX(0deg) rotateY(50deg);
    }
    &.coin-7 {
      position: fixed;
      top: 0%;
      right: -2%;
    }
    &.coin-8 {
      position: fixed;
      top: 0%;
      right: -2%;
    }
    &.coin-9 {
      position: fixed;
      top: 0%;
      right: -2%;
    }
    &.coin-10 {
      position: fixed;
      top: 0%;
      right: -2%;
    }
  }
}
@keyframes playgif {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0px;
  }
}
@keyframes down {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 1;
  }
}
@keyframes move {
  from {
    // opacity: 1;
    // transform: translateX(0)
  }
  to {
    // opacity: 0;
    transform: translateX(-25px);
  }
}
</style>
<style lang="less">
body,
html {
  max-width: 1080px;
  max-height: 1920px;
  margin: 0 auto;
}
#app {
  height: 100%;
}
#marketing {
  height: 100%;
}
</style>

