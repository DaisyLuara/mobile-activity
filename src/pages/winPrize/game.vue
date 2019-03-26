<template>
  <!-- eslint-disable -->
  <div class="game-wrap">
    <img class="abs title" :src="imgServerUrl + '/pages/win_prize/h5_title.png'">
    <div class="abs question">
      <div v-show="!curQuestion.end" class="abs clock">
        <svg id="mySvg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle id="progress1" r="40%" cy="50%" cx="50%" stroke-width="7" stroke="#ffd941" fill="none"/>
          <circle id="progress2" r="40%" cy="50%" cx="50%" stroke-width="7" stroke="#d2d2d2" fill="none"/>
        </svg>
        <div class="clock-text">{{clockOpts.text}}</div>
      </div>
      <div v-show="curQuestion.end" class="abs icon-result">
        <img v-show="curQuestion.status==0" class="abs icon icon-overtime" :src="imgServerUrl + '/pages/win_prize/h5_overtime.png'">
        <img v-show="curQuestion.status==1" class="abs icon icon-true" :src="imgServerUrl + '/pages/win_prize/h5_true.png'">
        <img v-show="curQuestion.status==2" class="abs icon icon-false" :src="imgServerUrl + '/pages/win_prize/h5_false.png'">
      </div>
      <div v-show="curQuestion.end && showQuestionMessage" class="abs next-question-message"><span class="red">{{nextQuestionMessage}}</span>秒后进入下一题</div>
      <div class="question-name">{{curQuestion.name}}</div>
      <div class="choices-wrap">
        <div class="choice" @click="answerQuestion(index)" v-for="(choice,index) in curQuestion.choices" v-bind:key="choice">
          <div class="abs choice-name">
            {{choice}}
          </div>
          <div v-if='curQuestion.end' v-bind:style="{'width': (curQuestion.answer == index + 1 && (answerPercent[index] == '0px' || !answerPercent[index])) ? '110%' :  answerPercent[index]}" class="abs result" v-bind:class="{'true': curQuestion.answer == index + 1,'false': userCompetitionRecord.answers[curQuestion.number -1] != curQuestion.answer  && userCompetitionRecord.answers[curQuestion.number -1] == index + 1 && curQuestion.answer != index + 1,'no-choice': curQuestion.answer != index + 1 && userCompetitionRecord.answers[curQuestion.number -1] != index + 1 }">
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
      <img class="abs title"  :src="imgServerUrl + '/pages/win_prize/h5_cover_title.png'">
      <div class="abs count-down">
        <img class="count-1 count" :src="imgServerUrl + '/pages/win_prize/3.png'">
        <img class="count-2 count" :src="imgServerUrl + '/pages/win_prize/2.png'">
        <img class="count-3 count" :src="imgServerUrl + '/pages/win_prize/1.png'">
      </div>
    </div>
    <div class="cover" v-bind:class="{'show': gameStatus}">
      <div class="message-box abs">
        <p v-show="!competitionClockOpts.competitionStartText" class="message-text abs">您已完成本轮答题，下一轮答题将在<span class="time">{{competitionClockOpts.text}}后</span>开始</p>
        <p v-show="competitionClockOpts.competitionStartText" class="message-text abs">下一轮答题已经开始，请刷新页面进行比赛~</p>
        <div class="btn abs">知道了</div>
      </div>
    </div>
    <div class="cover" v-bind:class="{'show': showPrize}">
      <div class="prize-wrap">
        <div class="abs red-package">
          <img class="abs bg-red-package" :src="imgServerUrl + '/pages/win_prize/h5_red_bag.png'">
          <div class="abs title">闯关成功</div>
          <div class="abs subtitle">恭喜获得 价值 <span class="money">¥ 218</span>大礼包</div>
          <img @click="openPrize()" class="abs btn-open" :src="imgServerUrl + '/pages/win_prize/h5_btn_open.png'">
        </div>
        <div class="prize-get-wrap">
          <img class="bg" :src="imgServerUrl + '/pages/win_prize/h5_banner.png'">
          <div class="abs store-intro">
            <div class="title">EXE颜镜店（长宁来福士店）</div>
            <div class="subtitle">长宁来福士广场（E）04层12号</div>
          </div>
          <div class="abs prize-get">
            <div v-show="mobileError.show" class="abs mobile-error-text">{{mobileError.text}}</div>
            <input v-if="!showPrizeResult" class="abs input-mobile" v-model="mobile" type="text" placeholder="请输入手机号" @click="mobileError.show = false">
            <img v-if="!showPrizeResult" @click="getPrize()" class="abs btn-get-prize" :src="imgServerUrl + '/pages/win_prize/h5_get_prize.png'">
            <div v-if="showPrizeResult" class="abs prize-result">
              <div class="prize-account">礼包已放入账号： <span class="mobile">{{mobile}}</span></div>
              <a href="http://m.jingfree.com/appointment/15" class="link-use" >去使用></a>
            </div>
            <div class="abs prize-list">
              <div class="abs prize-item clearfix" v-for="prize in prizeInfo" v-bind:key="prize.coupon_batch_id">
                <div class="abs left">
                  <div class="prize-name">{{prize.name}}<span class="prize-num" v-if="prize.coupon_batch_id == 16"> X3</span></div>
                  <div v-show="prize.coupon_batch_id == 16" class="prize-description">仅限线下门店使用，仅适用于颜选镜架</div>
                  <div v-show="prize.coupon_batch_id == 17" class="prize-description">仅限线下门店使用</div>
                </div>
                <div class="abs right">
                  <div class="prize-price">{{parseInt(prize.discount)}}<span class="rmb">元</span></div>
                  <div v-show="prize.coupon_batch_id == 16" class="prize-price-supplyment">满399使用</div>
                </div>
              </div>
            </div>
            <img class="bg" :src="imgServerUrl + '/pages/win_prize/h5_prize_bg.png'">
          </div>
        </div>
      </div>
    </div>
    <div class="cover" v-bind:class="{'show': showFailedCover}">
      <div class="game-failed-wrap">
        <img class="abs img-title" :src="imgServerUrl + '/pages/win_prize/h5_failed_title.png'">
        <div v-show="!competitionClockOpts.competitionStartText" class="abs message">
          <div class="title">闯关失败</div>
          <div class="subtitle">
            <div>再接再厉，下一轮即将在<span class="time">{{competitionClockOpts.text}}后</span></div>
            <div><span class="time">的星视度</span>大屏幕上开始，请做好准备</div>
          </div>
        </div>
        <div v-show="competitionClockOpts.competitionStartText" class="abs message">
          <div class="title">闯关失败</div>
          <div class="subtitle">
            下一轮答题已经开始，请刷新页面进行比赛~
          </div>
        </div>
        <div class="abs bottom-text">
          <div class="bottom-slogan">勇闯三关 扫码答题赢100元现金</div>
          <div class="copyright">Copyright © 2018 星视度.com</div>
        </div>
      </div>
    </div>
    <div class="message-alert">
      <div class="abs text">{{messageBox.text}}</div>
    </div>
    <audio id="beginMusic" loop="" preload="auto" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/win_prize/3.mp3"></audio>
    <audio id="answerMusic" loop="" preload="auto" src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/win_prize/10_1.mp3"></audio>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
/* eslint-disable */
const parseUrl = process.env.PARSE_SERVER;
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
import Question from "./question0129";
import $ from "jquery";
import { getWxUserInfo, parseService, createCoupon, getCoupon } from "services";
export default {
  components: {
    WxShare
  },
  data() {
    return {
      mobile: "",
      showPage: true,
      showCover: false,
      imgServerUrl: IMAGE_SERVER,
      reqUrl: `${parseUrl}/parse/classes/`,
      wxShareInfo: {
        title: "我在勇闯三关答题得到了218元红包，你也来试试",
        desc: "勇闯三关，每5分钟刷新轮次。只要答对3道题，丰厚大奖等你赢取。",
        imgUrl:
          "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/prize_share_icon.png",
        success: function() {
          customTrack.shareWeChat();
        }
      },
      clockOpts: {
        text: "10",
        sumSecs: 10,
        n: -360 / 10, //每秒转的圆心角度
        curOffset: 0, //当前弧长
        endOldClock: false
      },
      competitionClockOpts: {
        text: "",
        sumSecs: 300,
        competitionStartText: false
      },
      nextQuestionMessage: 2, // 距离下一题开始秒数提示
      showQuestionMessage: true, //显示轮次失败
      showFailedCover: false, //显示失败
      showPrizeResult: false, //显示礼包结果
      showPrize: false, //显示奖励领取浮层
      messageBox: {
        // show: false,
        text: ""
      },
      mobileError: {
        show: false,
        text: ""
      },
      gameStatus: 0, //未参赛
      userInfo: {},
      curCompetition: {}, //当前轮次
      curQuestion: {
        //当前题目信息和状态
        begin: false,
        qid: "",
        name: "",
        choices: [], //问题选项
        status: 0, //问题结果0未答题1答对2答错
        number: 0, //题目序号
        answer: 0, //问题答案
        end: false, //是否结束
        answer_num: [0, 0, 0] //各选项回答人数
      },
      prizeInfo: null,
      gotPrizeUserRecord: {}, //此类礼包，用户的领取答题记录
      forPrizeUserRecord: {}, // 待领取红包的用户答题记录
      userCompetitionRecord: {} // 用户的当前答题记录
    };
  },
  created() {
    getWxUserInfo()
      .then(result => {
        let data = result.data;
        this.userInfo.nick_name = data.nickname;
        this.userInfo.head_img_url = data.headimgurl;
        this.userInfo.wx_openid = data.openid;
        this.initCompetition();
      })
      .catch(err => {
        let pageUrl = encodeURIComponent(window.location.href);
        let wx_auth_url =
          process.env.WX_API +
          "/wx/officialAccount/oauth?url=" +
          pageUrl +
          "&scope=snsapi_userinfo";
        window.location.href = wx_auth_url;
        return;
      });
  },
  mounted() {
    document.getElementsByClassName("game-wrap")[0].style.height =
      window.innerHeight + "px";
  },
  computed: {
    answerPercent() {
      let sum = 0;
      let answerPercent = [];
      for (
        let i = 0, length = this.curQuestion.answer_num.length;
        i < length;
        i++
      ) {
        sum = sum + this.curQuestion.answer_num[i];
      }

      if (sum == 0) {
        answerPercent = ["0px", "0px", "0px"];
      } else {
        for (
          let i = 0, length = this.curQuestion.answer_num.length;
          i < length;
          i++
        ) {
          answerPercent.push(
            (this.curQuestion.answer_num[i] / sum) *
              $(".choice").width() *
              1.1 +
              "px"
          );
        }
      }
      return answerPercent;
    }
  },
  methods: {
    initCompetition() {
      // step1: 获取当前正在进行的竞赛轮次
      parseService
        .get(
          this,
          this.reqUrl +
            "h5_competition_records?where=" +
            JSON.stringify({ status: "1" }) +
            "&order=-begin_time&limit=1"
        )
        .then(data => {
          if (data.results && data.results.length) {
            this.curCompetition = data.results[0];
            // 获取优惠券信息
            this.getPrizeInfo();
            let timeDiffer =
              (new Date().getTime() -
                parseInt(this.curCompetition.begin_time)) /
              1000;
            // 最新竞赛已经超时
            if (timeDiffer > 300) {
              alert("竞赛超时，请刷新页面获取最新竞赛");
              return;
            }
            // 1、题目都需要先初始化好，但不开始游戏
            this.nextQuestion();
            // 2、检查用户是否有相同类型优惠券，但未领取的记录
            let prizeSearchParams = {
              prize_type: this.curCompetition.prize_type,
              prize_id: { $all: this.curCompetition.prize_id },
              result: "1",
              wx_open_id: this.userInfo.wx_openid
            };
            parseService
              .get(
                this,
                this.reqUrl +
                  "h5_competition_user_records?where=" +
                  JSON.stringify(prizeSearchParams)
              )
              .then(data => {
                if (data.results && data.results.length) {
                  // 3、有则走领红包流程、领完走获取用户对当前答题的记录，然后开始游戏
                  let flag = false; //用户是否已领取过此类礼包
                  for (
                    let i = 0, length = data.results.length;
                    i < length;
                    i++
                  ) {
                    if (data.results[i].prize_status == "1") {
                      flag = true; //标记用户已领取过此类礼包
                      this.gotPrizeUserRecord = data.results[i];
                      break;
                    }
                  }
                  if (!flag) {
                    this.forPrizeUserRecord = data.results[0];
                    this.startPrize();
                  } else {
                    this.checkUserCompetitionStatus();
                  }
                } else {
                  // 4、无则开始走获取用户对当前答题的记录，然后开始游戏
                  this.checkUserCompetitionStatus();
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // 当前无竞赛
            // this.creatCompetition()
            alert("无竞赛");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkUserCompetitionStatus() {
      // 查询用户是否参与过本轮比赛
      let searchParams = {
        wx_open_id: this.userInfo.wx_openid,
        cid: this.curCompetition.objectId
      };
      parseService
        .get(
          this,
          this.reqUrl +
            "h5_competition_user_records?where=" +
            JSON.stringify(searchParams)
        )
        .then(data => {
          if (data.results && data.results.length) {
            this.userCompetitionRecord = data.results[0];
            this.userCompetitionRecord.answers = [];
            this.userCompetitionRecord.result = "";
            // todo用户参加并答题完本轮比赛，进行提示下一场次开始时间
            if (data.results[0].status == "0") {
              this.nextQuestion();
              this.gameStatus = 1;
              this.initCompetitionClock();
              return;
            }
            //重新答题
            this.beginGame();
          } else {
            //参与答题
            this.beginGame();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    beginGame() {
      let that = this;
      this.showPage = true;

      // 保存用户当前参赛信息,完成后开始游戏
      if (!this.userCompetitionRecord.objectId) {
        this.userCompetitionRecord = {
          wx_open_id: this.userInfo.wx_openid,
          cid: this.curCompetition.objectId,
          qids: this.curCompetition.qids,
          begin_time: new Date().getTime().toString(),
          status: "1",
          result: "",
          answers: [],
          prize_type: this.curCompetition.prize_type,
          prize_id: this.curCompetition.prize_id,
          prize_status: "0", //未领取优惠券,
          head_img_url: this.userInfo.head_img_url,
          nick_name: this.userInfo.nick_name
        };
        parseService
          .post(
            this,
            this.reqUrl + "h5_competition_user_records",
            this.userCompetitionRecord
          )
          .then(res => {
            // $("#beginMusic")[0].play()
            this.playMusic("beginMusic");
            this.showCover = true;
            this.curQuestion.begin = true;
            this.userCompetitionRecord.objectId = res.data.objectId;
            // todo 可以更新参与人数，也可以不更新从用户表统计，这里先不更新了，涉及到锁死问题.
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // $("#beginMusic")[0].play()
        this.playMusic("beginMusic");
        this.showCover = true;
        this.curQuestion.begin = true;
      }
      // 4.5秒后开始游戏
      setTimeout(function() {
        that.stopMusic("beginMusic");
        // $("#beginMusic")[0].pause();
        // $("#beginMusic")[0].currentTime = 0;

        that.showCover = false;
        that.initClock();
      }, 6000);
    },
    nextQuestion() {
      this.curQuestion.number = this.curQuestion.number + 1;
      let curQuestionNum = this.curQuestion.number - 1;
      this.curQuestion.qid = this.curCompetition.qids[curQuestionNum];

      this.curQuestion.name =
        Question[this.curCompetition.qids[curQuestionNum]].name + "?";
      this.curQuestion.choices =
        Question[this.curCompetition.qids[curQuestionNum]].choices;
      this.curQuestion.answer =
        Question[this.curCompetition.qids[curQuestionNum]].answer;
      this.curQuestion.status = 0;
      this.curQuestion.end = false;
      this.curQuestion.answer_num = [0, 0, 0];
    },
    answerQuestion(index) {
      // step1 更新用户的答题记录
      // index = -1表明用户未作答
      if (this.curQuestion.end || !this.curQuestion.begin) {
        return;
      }
      this.userCompetitionRecord.answers[this.curQuestion.number - 1] =
        index + 1;
      parseService
        .put(
          this,
          this.reqUrl +
            "h5_competition_user_records/" +
            this.userCompetitionRecord.objectId,
          JSON.stringify({ answers: this.userCompetitionRecord.answers })
        )
        .then(res => {})
        .catch(err => {});

      // step2 更新当前问题的状态，区分作答与未作答
      if (index == -1) {
        this.curQuestion.status = 0; //未作答
      } else if (
        index + 1 ==
        Question[this.curCompetition.qids[this.curQuestion.number - 1]].answer
      ) {
        this.curQuestion.status = 1; //答对
      } else {
        this.curQuestion.status = 2; //答错
      }

      // step3 更新当前轮次的每个答案的人数，并计算每个答案的选择人数
      parseService
        .get(
          this,
          this.reqUrl + "h5_competition_records/" + this.curCompetition.objectId
        )
        .then(data => {
          this.curCompetition = data;
          let curCompetitionAnswerNum = 1;

          if (index != -1) {
            this.curCompetition.answer_num[this.curQuestion.number - 1][index] =
              this.curCompetition.answer_num[this.curQuestion.number - 1][
                index
              ] + 1;
            parseService
              .put(
                this,
                this.reqUrl +
                  "h5_competition_records/" +
                  this.curCompetition.objectId,
                JSON.stringify({ answer_num: this.curCompetition.answer_num })
              )
              .then(res => {})
              .catch(err => {});
          }

          // 显示当前问题最新的各选项人数，结束当前的问题
          this.curQuestion.answer_num = this.curCompetition.answer_num[
            this.curQuestion.number - 1
          ]
            ? this.curCompetition.answer_num[this.curQuestion.number - 1]
            : [0, 0, 0];
          this.curQuestion.end = true;
          this.clockOpts.endOldClock = true;
          this.stopMusic("answerMusic");
          // $("#answerMusic")[0].pause();
          // $("#answerMusic")[0].currentTime = 0;
          if (
            !Question[this.curCompetition.qids[this.curQuestion.number]] ||
            this.curQuestion.status == 0 ||
            this.curQuestion.status == 2
          ) {
            // 答题结束
            this.endCompetition();
            return;
          }

          let that = this;
          let interval = setInterval(function() {
            if (that.nextQuestionMessage == 0) {
              that.nextQuestion();
              that.clockOpts.endOldClock = false;
              that.initClock();
              that.nextQuestionMessage = 2;
              clearInterval(interval);
              return;
            }
            that.nextQuestionMessage = that.nextQuestionMessage - 1;
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    endCompetition() {
      let that = this;
      this.showQuestionMessage = false;
      // 更新用户答题状态、status、result
      this.userCompetitionRecord.status = "0";
      if (
        JSON.stringify(this.userCompetitionRecord.answers) ==
        JSON.stringify(this.curCompetition.answers)
      ) {
        this.userCompetitionRecord.result = "1"; //闯关成功
      } else {
        this.userCompetitionRecord.result = "0"; //闯关失败
      }
      let params = {
        status: this.userCompetitionRecord.status,
        result: this.userCompetitionRecord.result
      };

      parseService
        .put(
          this,
          this.reqUrl +
            "h5_competition_user_records/" +
            this.userCompetitionRecord.objectId,
          JSON.stringify(params)
        )
        .then(res => {})
        .catch(err => {});

      if (this.userCompetitionRecord.result == "1") {
        this.startPrize();
      } else {
        setTimeout(function() {
          that.initCompetitionClock();
          that.showFailedCover = true;
        }, 3000);
      }
    },
    startPrize() {
      this.showPrize = true;
    },
    openPrize() {
      // 判断用户是否已领取过优惠券
      this.mobileError.show = false;
      if (
        this.forPrizeUserRecord.prize_status == "1" ||
        this.gotPrizeUserRecord.prize_status == "1"
      ) {
        this.mobile =
          this.forPrizeUserRecord.mobile || this.gotPrizeUserRecord.mobile;
        this.showPrizeResult = true;
      }
      $(".red-package").addClass("hide");
      $(".prize-get-wrap").addClass("show");
    },
    getPrize() {
      // 领礼包前先查询用户是否已领过此大礼包
      let that = this;
      if (
        this.forPrizeUserRecord.prize_status == "0" ||
        this.userCompetitionRecord.prize_status == "0"
      ) {
        // 已经有待领取的红包，那么是等领取结束后，要继续本轮游戏
        let continueGompetition = false;
        let prizeUserRecord = {}; //领取红包的用户记录
        if (this.forPrizeUserRecord.objectId) {
          continueGompetition = true;
          prizeUserRecord = this.forPrizeUserRecord;
        } else {
          prizeUserRecord = this.userCompetitionRecord;
        }

        if (!/^1[34578]\d{9}$/.test(this.mobile)) {
          this.mobileError.show = true;
          this.mobileError.text = "请输入正确的手机号";
          return;
        }
        // 领礼包成功后，更新用户领礼包信息，检查用户是否需要继续比赛还是结束比赛
        let params = {
          mobile: this.mobile,
          coupon_batch_id: this.curCompetition.prize_id,
          sms_template: "SEND_MARKETING_COUPONS"
        };
        createCoupon(params)
          .then(data => {
            let params = {
              prize_status: "1",
              mobile: this.mobile
            };
            parseService
              .put(
                this,
                this.reqUrl +
                  "h5_competition_user_records/" +
                  prizeUserRecord.objectId,
                JSON.stringify(params)
              )
              .then(res => {
                this.userCompetitionRecord.prize_status = "1";
                this.userCompetitionRecord.mobile = this.mobile;
                this.forPrizeUserRecord.prize_status = "1";
                this.forPrizeUserRecord.mobile = this.mobile;
                this.showPrizeResult = true;
                if (continueGompetition) {
                  this.messageBox.text = "红包领取成功，请继续答题";
                  $(".message-alert").fadeIn(500);
                  setTimeout(function() {
                    $(".message-alert").fadeOut(500);
                  }, 1000);
                  setTimeout(function() {
                    that.showPrize = false;
                    that.resetGetPrize();
                    that.checkUserCompetitionStatus();
                  }, 2000);
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.showPrizeResult = true;
      }
    },
    resetGetPrize() {
      $(".red-package").removeClass("hide");
      $(".prize-get-wrap").removeClass("show");
      this.mobile = "";
      this.mobileError.show = false;
      this.mobileError.text = "";
    },
    getPrizeInfo() {
      getCoupon(this.curCompetition.prize_id)
        .then(res => {
          if (res.data && res.data.length) {
            this.prizeInfo = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initClock() {
      let that = this;
      // 设置半径
      let c = $("svg").width() * 0.4 * Math.PI * 2;
      $("#progress1")
        .css("stroke-dasharray", c)
        .css("stroke-dashoffset", "0px");
      $("#progress2")
        .css("stroke-dasharray", c)
        .css("stroke-dashoffset", "0px");
      this.clockOpts.text = "10";
      this.playMusic("answerMusic");
      // $("#answerMusic")[0].play();
      this.clock(0);
    },
    clock(sec) {
      let that = this;

      if (this.clockOpts.endOldClock) {
        this.clockOpts.endOldClock = false;
        return;
      }

      let c = $("svg").width() * 0.4 * Math.PI * 2;
      if (sec > this.clockOpts.sumSecs) {
        // 倒计时结束
        if (!this.curQuestion.end) {
          this.answerQuestion(-1); //传入选项-1代表未选择
        }
        return;
      }

      // 设置时间
      let nowTime = 10 - sec;
      this.clockOpts.text = nowTime;

      // 设置时间进度条
      if (sec == 0) {
        this.clockOpts.n = 0;
      } else {
        this.clockOpts.n = this.clockOpts.n - 360 / 10;
      }
      let offset =
        this.clockOpts.curOffset +
        (this.clockOpts.n * Math.PI * $("svg").width() * 0.4) / 180;
      $("#progress2").css("stroke-dashoffset", offset);

      sec++;
      setTimeout(function() {
        that.clock(sec);
      }, 1000);
    },
    initCompetitionClock() {
      let secDiffer =
        new Date().getTime() - parseInt(this.curCompetition.begin_time);
      secDiffer = Math.floor(secDiffer / 1000);
      this.competitionClock(secDiffer);
    },
    competitionClock(secDiffer) {
      if (secDiffer > this.competitionClockOpts.sumSecs) {
        this.competitionClockOpts.competitionStartText = true;
        return;
      }
      let that = this;
      let timeRemain = this.competitionClockOpts.sumSecs - secDiffer;
      let minRemain = Math.floor(timeRemain / 60);
      let secRemain = timeRemain % 60;

      if (secRemain < 10) {
        secRemain = "0" + secRemain;
      }

      this.competitionClockOpts.text = "0" + minRemain + ":" + secRemain;

      secDiffer++;
      setTimeout(function() {
        that.competitionClock(secDiffer);
      }, 1000);
    },
    playMusic(elemId) {
      if (
        typeof WeixinJSBridge == "object" &&
        typeof WeixinJSBridge.invoke == "function"
      ) {
        WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
          document.getElementById(elemId).play();
        });
      }
    },
    stopMusic(elemId) {
      if (
        typeof WeixinJSBridge == "object" &&
        typeof WeixinJSBridge.invoke == "function"
      ) {
        WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
          document.getElementById(elemId).pause();
          document.getElementById(elemId).currentTime = 0;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@IMAGE_SERVER: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing";
.game-wrap {
  position: relative;
  height: 100%;
  background-image: url("@{IMAGE_SERVER}/pages/win_prize/h5_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  img {
    max-width: 100%;
  }
  .abs {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .title {
    width: 32%;
    top: 20px;
  }
  .question {
    top: 17%;
    width: 94%;
    z-index: 2;
    background: #fff;
    border-radius: 5%;
    padding-bottom: 113%;
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
    .icon-result {
      top: -5%;
      width: 24%;
      z-index: 2;
      padding-bottom: 24%;
      border-radius: 50%;
      background-color: #fff;
      .icon {
        width: 90%;
        top: 4px;
      }
    }
    .next-question-message {
      top: 15%;
      font-size: 12px;
      color: #ccc;
      .red {
        color: red;
      }
    }
    .question-name {
      position: absolute;
      padding: 0 10%;
      top: 20%;
      font-size: 20px;
      text-align: center;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .choices-wrap {
      position: absolute;
      top: 40%;
      left: 10%;
      width: 80%;
      .choice {
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
        .choice-name {
          top: 0;
          left: 20px;
          z-index: 2;
        }
        .result {
          top: 0;
          left: -10%;
          width: 0px;
          right: auto;
          height: 100%;
          z-index: 1;
          transition: all 1s 1s;
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
          &.true {
            background-color: #20e77d;
          }
          &.false {
            background-color: #f85e5e;
          }
          &.no-choice {
            background-color: #d5dde5;
          }
        }
        .answer-num {
          position: absolute;
          right: 10%;
          font-size: 15px;
          color: #ccc;
          z-index: 2;
        }
      }
    }
  }
  .bottom-slogan {
    bottom: 7%;
    font-size: 15px;
    color: #a173f4;
  }
  .copyright {
    bottom: 3%;
    font-size: 12px;
    color: #281740;
  }
  .cover {
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
    background-color: rgba(0, 0, 0, 0.9);
    &.show {
      display: block;
      .count-1 {
        animation: turn 0.25s 1.5s ease-in-out;
      }
      .count-2 {
        animation: turn2 0.25s 1.5s ease-in-out, turn3 0.25s 3.5s ease-in-out;
      }
      .count-3 {
        animation: turn4 0.25s 3.5s ease-in-out;
      }
      .prize-wrap {
        animation: bounceIn 0.75s;
        animation-fill-mode: both;
      }
    }
    .title {
      width: 35%;
      top: 13%;
    }
    .count-down {
      top: 27%;
      left: 0;
      right: 0;
      width: 150px;
      height: 300px;
      margin: 0 auto;
      text-align: center;
      .count {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 150px;
        height: 216px;
      }
      .count-1 {
        z-index: 3;
        transform: rotateY(0deg);
        animation-fill-mode: forwards;
        backface-visibility: hidden;
      }
      .count-2 {
        z-index: 2;
        transform: rotateY(180deg);
        animation-fill-mode: forwards;
        backface-visibility: hidden;
      }
      .count-3 {
        z-index: 1;
        transform: rotateY(180deg);
        animation-fill-mode: forwards;
        backface-visibility: hidden;
      }
    }
    .message-box {
      top: 15%;
      width: 80%;
      padding-bottom: 80%;
      background-color: #fff;
      border-radius: 5%;
      .message-text {
        top: 40%;
        margin: 0;
        padding: 0 10%;
        color: #c1c1c1;
        .time {
          color: red;
        }
      }
      .btn {
        top: 70%;
        width: 90px;
        height: 28px;
        line-height: 26px;
        border: 1px solid #c1c1c1;
        border-radius: 50px;
      }
    }
    .prize-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      transform: scale(0.1);
      .red-package {
        display: block;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        &.hide {
          display: none;
        }
        .bg-red-package {
          width: 90%;
          top: 13%;
        }
        .title {
          top: 26%;
          width: 100%;
          color: #fff;
          font-size: 42px;
          font-weight: 700;
        }
        .subtitle {
          top: 40%;
          font-size: 15px;
          color: #fee6cc;
          .money {
            font-size: 30px;
            color: #fac824;
          }
        }
        .btn-open {
          width: 30%;
          top: 52%;
        }
      }
      .prize-get-wrap {
        display: none;
        &.show {
          display: block;
        }
        .store-intro {
          top: 25%;
          width: 94%;
          height: 50px;
          text-align: center;
          border-radius: 5px;
          background-color: #861c13;
          opacity: 0.8;
          color: #fff;
          .title {
            width: 100%;
            font-size: 15px;
            margin-top: 8px;
          }
          .subtitle {
            font-size: 11px;
            margin-top: 3px;
          }
        }
        .prize-get {
          top: 35%;
          width: 94%;
          text-align: center;
          .mobile-error-text {
            color: red;
            top: 2.5%;
            left: 7%;
            right: auto;
            font-size: 12px;
            text-align: left;
          }
          .prize-result {
            padding: 0 7%;
            top: 25%;
            .prize-account {
              float: left;
              font-size: 12px;
              color: #000;
              .mobile {
                color: red;
              }
            }
            .link-use {
              display: block;
              float: right;
              font-size: 13px;
              font-weight: 100;
              color: #a9a3a3;
            }
          }
          .prize-list {
            top: 52%;
            width: 86%;
            height: 0;
            padding-bottom: 36%;
            .prize-item {
              top: 0;
              height: 50%;
              width: 100%;
              &:nth-child(2) {
                top: 54%;
              }
              .left {
                top: 0;
                bottom: 0;
                width: 73%;
                height: 64%;
                margin: auto 0;
                text-align: left;
                padding-left: 17%;
                .prize-name {
                  color: red;
                  font-size: 15px;
                  .prize-num {
                    color: #000;
                    font-size: 14px;
                  }
                }
                .prize-description {
                  font-size: 12px;
                  color: #c1c1c1;
                  margin-top: 5px;
                }
              }
              .right {
                top: 0;
                bottom: 0;
                right: 0;
                width: 27%;
                left: auto;
                height: 80%;
                margin: auto 0;
                .prize-price {
                  font-size: 26px;
                  color: red;
                  .rmb {
                    font-size: 20px;
                  }
                }
                .prize-price-supplyment {
                  font-size: 12px;
                  color: #c1c1c1;
                }
              }
            }
          }
          .input-mobile {
            top: 8%;
            width: 87%;
            height: 48px;
            font-size: 14px;
            color: #000;
            line-height: 48px;
            border-radius: 5px;
            padding-left: 10px;
            box-shadow: 0px 0px 4px #9d9d9d inset;
            &::-webkit-input-placeholder {
              color: #cecece;
            }
          }
          .btn-get-prize {
            top: 25%;
            width: 87%;
          }
        }
      }
    }
    .game-failed-wrap {
      background-color: #fff;
      font-size: 42px;
      color: #fff;
      height: 100%;
      .img-title {
        top: 10%;
        width: 71%;
      }
      .message {
        top: 50%;
        width: 100%;
        text-align: center;
        .title {
          width: 100%;
          color: #000;
          font-size: 30px;
        }
        .subtitle {
          font-size: 15px;
          color: #cecece;
          margin-top: 10px;
          .time {
            color: red;
          }
        }
      }
      .bottom-text {
        top: 90%;
        .bottom-slogan {
          color: #000;
        }
        .copyright {
          font-size: 15px;
          color: #cecece;
          margin-top: 10px;
        }
      }
    }
  }
  .message-alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    margin: auto;
    height: 100px;
    z-index: 1000;
    display: none;
    border-radius: 10px;
    // transition: all 500s;
    background: rgba(0, 0, 0, 0.8);
    .text {
      font-size: 15px;
      color: #fff;
      padding: 0 30px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 30px;
      .sec {
        font-size: 15px;
        color: red;
      }
    }
  }
  #answerMusic,
  #beginMusic {
    display: none;
  }
  @keyframes turn {
    100% {
      transform: rotateY(180deg);
    }
  }
  @keyframes turn2 {
    100% {
      transform: rotateY(0deg);
    }
  }
  @keyframes turn3 {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(180deg);
    }
  }
  @keyframes turn4 {
    100% {
      transform: rotateY(0deg);
    }
  }
  @keyframes hide {
    100% {
      opacity: 0;
    }
  }
  @keyframes bounceIn {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    20% {
      transform: scale3d(0.6, 0.6, 0.6);
    }
    40% {
      transform: scale3d(1, 1, 1);
    }
    60% {
      opacity: 1;
      transform: scale3d(1.04, 1.04, 1.04);
    }
    80% {
      transform: scale3d(0.99, 0.99, 0.99);
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
}
</style>
<style lang="less" scoped>
body,
html {
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
}
</style>

