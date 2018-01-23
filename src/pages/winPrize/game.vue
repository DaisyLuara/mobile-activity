<template>
  <div class="game-wrap">
    <img class="abs title" :src="imgServerUrl + '/pages/win_prize/h5_title.png'" alt="">
    <div class="abs question">
      <div v-show="!curQuestion.end" class="abs clock">
        <svg id="mySvg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle id="progress1" r="40%" cy="50%" cx="50%" stroke-width="7" stroke="#ffd941" fill="none"/>
          <circle id="progress2" r="40%" cy="50%" cx="50%" stroke-width="7" stroke="#d2d2d2" fill="none"/>
        </svg>
        <div class="clock-text">{{clockOpts.text}}</div>
      </div>
      <div v-show="curQuestion.end" class="abs icon-result">
        <img v-show="curQuestion.status==0" class="abs icon icon-overtime" :src="imgServerUrl + '/pages/win_prize/h5_overtime.png'" alt="">
        <img v-show="curQuestion.status==1" class="abs icon icon-true" :src="imgServerUrl + '/pages/win_prize/h5_true.png'" alt="">
        <img v-show="curQuestion.status==2" class="abs icon icon-false" :src="imgServerUrl + '/pages/win_prize/h5_false.png'" alt="">
      </div>
      <div v-show="curQuestion.end && showQuestionMessage" class="abs next-question-message"><span class="red">{{nextQuestionMessage}}</span>秒后进入下一题</div>
      <div class="question-name">{{curQuestion.name}}</div>
      <div class="choices-wrap">
        <div class="choice" @click="answerQuestion(index)" v-for="(choice,index) in curQuestion.choices" v-bind:key="choice">
          <div class="abs choice-name">
            {{choice}}
          </div>
          <div v-show='curQuestion.end' v-bind:style="{'width': (curQuestion.answer == index + 1 && (answerPercent[index] == '0px' || !answerPercent[index])) ? '110%' :  answerPercent[index]}" class="abs result" v-bind:class="{'true': curQuestion.answer == index + 1,'false': competitionRecord.answers[curQuestion.number -1] != curQuestion.answer  && competitionRecord.answers[curQuestion.number -1] == index + 1 && curQuestion.answer != index + 1,'no-choice': curQuestion.answer != index + 1 && competitionRecord.answers[curQuestion.number -1] != index + 1 }">
          </div>
          <span class="answer-num" v-show="curQuestion.end">{{curQuestion.answer_num[index] ? curQuestion.answer_num[index]: 0}}人</span>
        </div>
      </div>
    </div>
    <div class="abs bottom-slogan">
      勇闯三关 扫码答题赢100元现金
    </div>
    <div class="abs copyright">
      Copyright © 2018 星视度.com
    </div>
    <div class="cover" v-bind:class="{'show': showCover}">
      <img class="abs title"  :src="imgServerUrl + '/pages/win_prize/h5_cover_title.png'" alt="">
      <div class="abs count-down">
        <img class="count-1 count" :src="imgServerUrl + '/pages/win_prize/3.png'" alt="">
        <img class="count-2 count" :src="imgServerUrl + '/pages/win_prize/2.png'" alt="">
        <img class="count-3 count" :src="imgServerUrl + '/pages/win_prize/1.png'" alt="">
      </div>
    </div>
    <div class="cover" v-bind:class="{'show': gameStatus}">
      <div class="message-box abs">
        <p class="message-text abs">本轮答题已结束，下一轮答题将在3分钟后开始</p>
        <div class="btn abs">知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
import { Cookies } from 'modules/util'
import wxService from 'services/wx'
import Question from './question'
import parseService from 'modules/parseServer'
export default {
  data(){
    return {
      showPage: false,
      showCover: false,
      imgServerUrl: IMAGE_SERVER,
      reqUrl: 'http://120.27.144.62:1337/parse/classes/',
      clockOpts: {
        text: "10",
        sumSecs: 10,
        n: -360 / 10, //每秒转的圆心角度
        curOffset: 0,//当前弧长
        endOldClock: false
      },
      nextQuestionMessage: 5, // 距离下一题开始秒数提示
      showQuestionMessage: true,
      gameStatus: 0, //未参赛
      userInfo: {

      },
      curCompetition:{ //当前轮次

      },
      curQuestion: { //当前题目信息和状态
        qid: '',
        name: '',
        choices: [], //问题选项
        status: 0,  //问题结果0未答题1答对2答错
        number: 0,  //题目序号
        answer: 0, //问题答案
        end: false, //是否结束
        answer_num: [] //各选项回答人数
      },
      competitionRecord: {} //用户的答题信息
    }
  },
  beforeCreate(){
    document.title = "勇闯三关"
  },
  created(){
    // check wechat login status
    // if (!Cookies.get('wx_openid')) {
    //   //unauthed
    //   let fullUrl = window.location.href;
    //   let wx_auth_url = process.ENV.WX_API + '/account/wechat/oauth?redirect_url=' + encodeURIComponent(fullUrl);
    //   window.location.href = wx_auth_url;
    //   return;
    // }
    // this.getWxUserInfo();

    // data for test
    this.userInfo.wx_openid = 'zjj';
    this.userInfo.head_image = 'xxxxx'

    this.initCompetition();

  },
  mounted(){
    document.getElementsByClassName('game-wrap')[0].style.height = window.innerHeight + 'px';
  },
  computed: {
    answerPercent(){
      let sum = 0;
      let answerPercent = [];
      for(let i = 0,length = this.curQuestion.answer_num.length; i < length; i++){
        sum = sum + this.curQuestion.answer_num[i];
      }

      for(let i = 0,length = this.curQuestion.answer_num.length; i < length; i++){
        answerPercent.push(((this.curQuestion.answer_num[i] / sum) * $('.choice').width() * 1.1)+ 'px');
      }
      console.log(answerPercent)
      return answerPercent;
    }
  },
  methods: {
    getWxUserInfo(){
      wxService.getWxUserInfo(this).then(wdata => {
        this.userInfo.wx_openid = wdata.openid;
        this.userInfo.head_image = wdata.headimgurl;
      }).catch(err => {
        console.log('err')
      })
    },
    initCompetition(){
      // step1: 获取当前正在进行的竞赛轮次
      parseService.get(this, this.reqUrl + 'h5_competition_records?where=' +  JSON.stringify({'status': '1'}) + '&order=-begin_time&limit=1').then(data => {
        if(data.results && data.results.length){
          this.curCompetition = data.results[0];
          let timeDiffer = ((new Date()).getTime() - parseInt(this.curCompetition.begin_time)) / 1000
          // 最新竞赛已经超时
          if(timeDiffer > 300){
            alert("竞赛超时，请刷新页面获取最新竞赛")
            return;
          }
          // 查询用户是否参与过次轮比赛
          let searchParams = {
            'wx_open_id': this.userInfo.wx_openid,
            'cid': this.curCompetition.objectId
          }
          parseService.get(this, this.reqUrl + 'h5_competition_user_records?where=' + JSON.stringify(searchParams)).then(data => {
            if(data.results && data.results.length){
              this.competitionRecord = data.results[0];
              this.competitionRecord.answers = [];
              this.competitionRecord.results = '';
              // todo用户参加并答题完本轮比赛，进行提示下一场次开始时间
              if(data.results[0].status == '0'){
                console.log('一大碗')
                this.nextQuestion();
                this.gameStatus = 1;
                return;
              }
              //重新答题
              this.initGame();
            }else{
              //参与答题
              this.initGame();
            }
          }).catch(err => {
            console.log(err)
          })
        }else{
          // 当前无竞赛
          // this.creatCompetition()
          alert("无竞赛")
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initGame(){
      let that = this;
      this.showPage = true;
      this.showCover = true;
      // 保存用户当前参赛信息
      if(!this.competitionRecord.objectId){
        this.competitionRecord = {
          wx_open_id: this.userInfo.wx_openid,
          cid: this.curCompetition.objectId,
          qids: this.curCompetition.qids,
          begin_time: ((new Date()).getTime()).toString(),
          status: '1',
          result: '',
          answers: [],
          prize: ''
        }
        parseService.post(this, this.reqUrl + 'h5_competition_user_records', this.competitionRecord).then(res => {
          // todo
          this.competitionRecord.objectId = res.data.objectId;
        }).catch(err => {
          console.log(err)
        });
      }
      // 初始化题目
      this.nextQuestion();
      setTimeout(function(){
        that.showCover = false;
        that.initClock();
      },4500)
    },
    nextQuestion(){
      this.curQuestion.number = this.curQuestion.number + 1;
      let curQuestionNum = this.curQuestion.number - 1;
      this.curQuestion.qid = this.curCompetition.qids[curQuestionNum];
      this.curQuestion.name = Question[this.curCompetition.qids[curQuestionNum]].name + '?';
      this.curQuestion.choices = Question[this.curCompetition.qids[curQuestionNum]].choices;
      this.curQuestion.answer = Question[this.curCompetition.qids[curQuestionNum]].answer;
      this.curQuestion.status = 0;
      this.curQuestion.end = false;
      this.curQuestion.answer_num = [];
    },
    answerQuestion(index){
      // step1 更新用户的答题记录
      // index = -1表明用户未作答
      if(this.curQuestion.end){
        return;
      }
      this.competitionRecord.answers[this.curQuestion.number -1] = index + 1;
      parseService.put(this,this.reqUrl + 'h5_competition_user_records/' + this.competitionRecord.objectId, JSON.stringify({'answers': this.competitionRecord.answers})).then(res => {
      }).catch(err => {})

      // step2 更新当前问题的状态，区分作答与未作答
      if(index == -1){
        this.curQuestion.status = 0; //未作答
      }else if((index + 1) == Question[this.curCompetition.qids[0]].answer) {
        this.curQuestion.status = 1; //答对
      }else {
        this.curQuestion.status = 2; //答错
      }

      // step3 更新当前轮次的每个答案的人数，并计算每个答案的选择人数
      parseService.get(this, this.reqUrl + 'h5_competition_records/' + this.curCompetition.objectId).then(data => {
        this.curCompetition = data;
        let curCompetitionAnswerNum = 1;

        if(index != -1){
          if(!this.curCompetition.answer_num[this.curQuestion.number - 1]){
              this.curCompetition.answer_num[this.curQuestion.number - 1] = [];
          }
          if(!this.curCompetition.answer_num[this.curQuestion.number - 1][index]){
            this.curCompetition.answer_num[this.curQuestion.number - 1][index] = 1;
          }else{
            this.curCompetition.answer_num[this.curQuestion.number - 1][index] = this.curCompetition.answer_num[this.curQuestion.number - 1][index] + 1;
          }

          parseService.put(this,
            this.reqUrl + 'h5_competition_records/' + this.curCompetition.objectId,
            JSON.stringify({'answer_num': this.curCompetition.answer_num})).then(res => {
              console.log(res)
          }).catch(err => {})
        }

        // 显示当前问题最新的各选项人数，结束当前的问题
        this.curQuestion.answer_num = this.curCompetition.answer_num[this.curQuestion.number - 1] ? this.curCompetition.answer_num[this.curQuestion.number - 1] : [];
        this.curQuestion.end = true;
        this.clockOpts.endOldClock = true;
        if(!Question[this.curCompetition.qids[this.curQuestion.number]]){
          // 答题结束
          this.endCompetition();
          return;
        }


        let that = this;
        let interval = setInterval(function(){
          if(that.nextQuestionMessage == 0){
            that.nextQuestion();
            that.clockOpts.endOldClock = false;
            that.initClock();
            that.nextQuestionMessage = 5;
            clearInterval(interval);
            return;
          }
          that.nextQuestionMessage = that.nextQuestionMessage - 1;
        },1000)
      }).catch(err => {
        console.log(err)
      })
    },
    endCompetition(){
      this.showQuestionMessage = false;
      // 设置用户次轮参赛状态为答完题
      parseService.put(this,this.reqUrl + 'h5_competition_user_records/' + this.competitionRecord.objectId, JSON.stringify({'status': '0'})).then(res => {
      }).catch(err => {})
    },
    initClock(){
      let that = this;
      // 设置半径
      let c = $("svg").width() * 0.4 * Math.PI *2;
      $("#progress1").css('stroke-dasharray',c).css('stroke-dashoffset','0px');
      $("#progress2").css('stroke-dasharray',c).css('stroke-dashoffset','0px');
      this.clockOpts.text = '10';
      this.clock(0);
    },
    clock(sec){
      let that = this;

      if(this.clockOpts.endOldClock){
        this.clockOpts.endOldClock = false;
        return;
      }

      let c = $("svg").width() * 0.4 * Math.PI *2;
      if(sec > this.clockOpts.sumSecs){
        // 倒计时结束
        if(!this.curQuestion.end){
          this.answerQuestion(-1); //传入选项-1代表未选择
        }
        return;
      }

      // 设置时间
      let nowTime = 10 - sec;
      this.clockOpts.text = nowTime;

      // 设置时间进度条
      if(sec == 0){
        this.clockOpts.n = 0
      }else{
        this.clockOpts.n = this.clockOpts.n - 360 / 10;
      }
      let offset = this.clockOpts.curOffset + (this.clockOpts.n * Math.PI * $("svg").width() * 0.4) / 180
      $("#progress2").css('stroke-dashoffset', offset);

      sec++;
      setTimeout(function(){
        that.clock(sec);
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
@IMAGE_SERVER: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing';
.game-wrap{
  position: relative;
  height: 100%;
  background-image: url("@{IMAGE_SERVER}/pages/win_prize/h5_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  img{
    max-width: 100%;
  }
  .abs{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .title{
    width: 32%;
    top: 20px;
  }
  .question{
    top: 17%;
    width: 94%;
    z-index: 2;
    background: #fff;
    border-radius: 5%;
    padding-bottom: 113%;
    backface-visibility: hidden;
    .clock{
      top: -5%;
      width: 24%;
      z-index: 2;
      padding-bottom: 24%;
      border-radius: 50%;
      background-color: #fff;
      svg{
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        z-index: 1;
      }
      .clock-text{
        position: absolute;
        height: 26px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        margin: auto;
        font-size: 25px;
      }
      #progress2 {
        transform: rotate(-90deg);
        transform-origin: center;
      }
    }
    .icon-result{
      top: -5%;
      width: 24%;
      z-index: 2;
      padding-bottom: 24%;
      border-radius: 50%;
      background-color: #fff;
      .icon{
        width: 90%;
        top: 4px;
      }
    }
    .next-question-message{
      top: 15%;
      font-size: 12px;
      color: #ccc;
      .red{
        color: red;
      }
    }
    .question-name{
      position: absolute;
      padding: 0 10%;
      top: 20%;
      font-size: 20px;
      text-align: center;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .choices-wrap{
      position: absolute;
      top: 40%;
      left: 10%;
      width: 80%;
      .choice{
        width: 100%;
        height: 48px;
        font-size: 15px;
        color: #292929;
        text-align: left;
        overflow: hidden;
        position: relative;
        line-height: 46px;
        margin-bottom: 20px;
        border-radius: 50px;
        border: 1px solid #ccc;
        background-color: #f8f8f8;
        .choice-name{
          top: 0;
          left: 20px;
          z-index: 2;
        }
        .result{
          top: 0;
          left: -10%;
          width: 0px;
          right: auto;
          height: 100%;
          z-index: 1;
          transition: all 1s 1s;
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
          &.true{
            background-color: #20e77d;
          }
          &.false{
            background-color: #f85e5e;
          }
          &.no-choice{
            background-color: #d5dde5;
          }
        }
        .answer-num{
          position: absolute;
          right: 10%;
          font-size: 15px;
          color: #ccc;
          z-index: 2;
        }
      }
    }
  }
  .bottom-slogan{
    bottom: 7%;
    font-size: 15px;
    color: #a173f4;
  }
  .copyright{
    bottom: 3%;
    font-size: 12px;
    color: #281740;
  }
  .cover{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    margin: auto;
    display: none;
    background-color: rgba(0,0,0,.7);
    &.show{
      display: block;
      .count-1{
        animation: turn 1s .5s ease-in-out;
      }
      .count-2{
        animation: turn2 1s .5s ease-in-out, turn3 1s 2.5s ease-in-out;
      }
      .count-3{
        animation: turn4 1s 2.5s ease-in-out;
      }
    }
    .title{
      width: 35%;
      top: 13%;
    }
    .count-down{
      top: 27%;
      left: 0;
      right: 0;
      width: 150px;
      height: 300px;
      margin: 0 auto;
      text-align: center;
      .count{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 150px;
        height: 216px;
      }
      .count-1{
        z-index: 3;
        transform: rotateY(0deg);
        animation-fill-mode: forwards;
        backface-visibility: hidden;
      }
      .count-2{
        z-index: 2;
        transform: rotateY(180deg);
        animation-fill-mode: forwards;
        backface-visibility: hidden;
      }
      .count-3{
        z-index: 1;
        transform: rotateY(180deg);
        animation-fill-mode: forwards;
        backface-visibility: hidden;
      }
    }
    .message-box{
      top: 15%;
      width: 80%;
      padding-bottom: 80%;
      background-color: #fff;
      border-radius: 5%;
      .message-text{
        top: 40%;
        margin: 0;
        padding: 0 10%;
        color: #c1c1c1;
      }
      .btn{
        top: 70%;
        width: 90px;
        height: 28px;
        line-height: 26px;
        border: 1px solid #c1c1c1;
        border-radius: 50px;
      }
    }
  }
  @keyframes turn {
    100%{
      transform: rotateY(180deg)
    }
  }
  @keyframes turn2 {
    100%{
      transform: rotateY(0deg)
    }
  }
  @keyframes turn3 {
    0%{
      transform: rotateY(0deg)
    }
    100%{
      transform: rotateY(180deg)
    }
  }
  @keyframes turn4 {
    100%{
      transform: rotateY(0deg)
    }
  }
  @keyframes hide {
    100%{
      opacity: 0;
    }
  }
}
</style>
<style lang="less" scoped>
body,html{
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
}
</style>

