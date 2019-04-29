<template>
  <div 
    v-if="showPage" 
    class="angel-wrap"
  >
    <img 
      :src="IMAGE_SERVER + 'wuliao1.jpg'" 
      class="wuliao" 
      alt=""
    >
    <div class="angel-container">
      <!-- <img class="bg" :src="IMAGE_SERVER + 'bg.jpg'" alt=""> -->
      <img 
        :src="IMAGE_SERVER + 'slogan.png'" 
        class="slogan" 
        alt="" 
        @load="loadImg"
      >
      <div class="img-wrap clearfix">
        <div 
          v-for="angel in user_result" 
          :key="angel.img_id" 
          :class="{'white': angel.img_type == 'white', 'black': angel.img_type == 'black'}" 
          class="angel-container"
        >
          <img 
            v-if="angel.img_type =='white'" 
            :src="IMAGE_SERVER + 'frame_on.png'" 
            class="frame frame-on" 
            alt=""
          >
          <img 
            v-if="angel.img_type == 'black'" 
            :src="IMAGE_SERVER + 'frame_off.png'" 
            class="frame frame-off" 
            alt=""
          >

          <img 
            v-if="angel.img_type =='white' && !angel.img_id" 
            :src="IMAGE_SERVER + 'lock_white.png'" 
            class="lock abs" 
            alt=""
          >
          <img 
            v-if="angel.img_type =='black' && !angel.img_id" 
            :src="IMAGE_SERVER + 'lock_black.png'" 
            class="lock abs" 
            alt=""
          >
          <div 
            v-if="!angel.img_id" 
            class="cover abs"
          />
          <div 
            v-show="angel.img_id && angel.img_type == 'white'" 
            :class="{'animate': animate}" 
            class="diamond-wrap abs"
          >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d1" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d2" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d3" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d4" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d5" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d6" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d7" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d8" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d9" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d10" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'white.png'" 
              class="diamond d11" 
              alt=""
            >
          </div>
          <div 
            v-show="angel.img_id && angel.img_type == 'black'" 
            :class="{'animate': animate}" 
            class="diamond-wrap abs"
          >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d1" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d2" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d3" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d4" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d5" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d6" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d7" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d8" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d9" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d10" 
              alt=""
            >
            <img 
              :src="IMAGE_SERVER + 'blue.png'" 
              class="diamond d11" 
              alt=""
            >
          </div>
          <img 
            :src="angel.img_url" 
            class="img-download abs" 
            alt=""
          >
          <div class="img-container abs">
            <img 
              v-if="!angel.img_id && angel.img_type == 'black'" 
              :src="IMAGE_SERVER + 'b_angel.png'" 
              class="img-example" 
              alt=""
            >
            <img 
              v-if="!angel.img_id && angel.img_type == 'white'" 
              :src="IMAGE_SERVER + 'w_angel.png'" 
              class="img-example" 
              alt=""
            >
            <img 
              :src="angel.img_url" 
              class="img" 
              alt=""
            >
          </div>
        </div>
      </div>
      <div class="num-wrap clearfix">
        <div 
          v-for="angel in user_result" 
          :key="angel.img_id" 
          :class="{'white': angel.img_type == 'white', 'black': angel.img_type == 'black'}" 
          class="num-container"
        >
          <img 
            v-if="angel.img_type == 'white'" 
            :src="IMAGE_SERVER + 'tianmei.png'" 
            alt=""
          >
          <img 
            v-if="angel.img_type == 'black'" 
            :src="IMAGE_SERVER + 'gaoleng.png'" 
            alt=""
          >
          <span 
            :class="{'white': angel.img_type =='white', 'black': angel.img_type == 'black'}" 
            class="abs num"
          >{{ angel.num ? angel.num : '0' }}</span>
        </div>
      </div>
      <img 
        v-if="show_btn" 
        :src="IMAGE_SERVER + 'btn.png'" 
        class="btn-join" 
        alt="" 
        @click="join"
      >
      <img 
        v-if="!show_btn" 
        :src="join_img_url" 
        class="result-join" 
        alt=""
      >
      <img 
        :src="IMAGE_SERVER + 'za.png'" 
        class="img-za" 
        alt=""
      >
    </div>
    <img 
      :src="IMAGE_SERVER + 'wuliao2.jpg'" 
      class="wuliao" 
      alt=""
    >
    <img 
      :src="IMAGE_SERVER + 'wuliao3.png'" 
      class="wuliao" 
      alt=""
    >
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
const parseUrl = process.env.PARSE_SERVER;
const REQ_URL = `${parseUrl}/parse/classes/`;
import $ from "jquery";
import {
  getInfoById,
  $wechat,
  getWxUserInfo,
  basicTrack,
  wechatShareTrack,
  parseService
} from "services";
export default {
  data() {
    return {
      IMAGE_SERVER: IMAGE_SERVER + "/pages/angel/",
      img_type: this.$route.query.img_type,
      img_id: this.$route.query.id,
      img_url: "",
      num: this.$route.query.num,
      sex: this.$route.query.sex.toLowerCase(), //用户性别
      open_id: "",
      animate: false,
      show_btn: false,
      showPage: false,
      user_info: {
        nick_name: "",
        head_img_url: "",
        wx_openid: ""
      },
      join_img_url: "",
      join_rule: [
        ["86", "92"],
        ["86", "84"],
        ["92", "84"],
        ["63", "75"],
        ["63", "58"],
        ["75", "58"],
        ["46", "32"],
        ["46", "38"],
        ["32", "38"]
      ],
      user_result: [{}, {}],
      wxShareInfo: {
        title: "浦商百货 致惠女神节",
        desc: "黑白天使 成就致惠女神 真皙美白 唤醒青春美颜",
        imgUrl:
          "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/angel_share_icon.png",
        success: function() {
          wechatShareTrack();
        }
      }
    };
  },
  beforeCreate() {
    document.title = "致惠女神节";
  },
  mounted() {
    $(".angel-wrap").css("min-height", $(window).height());
    this.handleShare();
  },
  created() {
    if (!this.img_id) {
      alert("没有找到您的图片哦，请重新和大屏进行互动拍照~");
      return;
    }
    if (!this.img_type) {
      alert("没有找到本次活动的类型，请到指定的黑白天使屏幕进行拍摄哦~");
      return;
    }
    if (!this.num) {
      alert("咦，没有找到您的钻石颗数哦，请重新和大屏进行互动拍照~");
    }
    getWxUserInfo()
      .then(result => {
        let data = result.data;
        this.user_info.nick_name = data.nickname;
        this.user_info.head_img_url = data.headimgurl;
        this.user_info.wx_openid = data.openid;
        this.showPage = true;
        this.checkCurStatus();
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
    // this.showPage = true;
    // this.checkCurStatus();
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfo);
        })
        .catch(_ => {
          console.warn(_.message);
        });
    },
    loadImg() {
      let that = this;
      let targetTop = $(".slogan").offset().top;
      if ($(window).scrollTop() >= targetTop) {
        this.animate = true;
      }
      window.onscroll = function(e) {
        let windowScrollTop = $(window).scrollTop();
        if (windowScrollTop >= targetTop) {
          that.animate = true;
        }
      };
    },
    getImgUrl() {
      getInfoById(this.img_id)
        .then(result => {
          this.img_url = result.image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getWxUserResult() {
      let query = {
        open_id: this.user_info.wx_openid
      };
      parseService
        .get(REQ_URL + "angel?where=" + JSON.stringify(query))
        .then(data => {
          this.user_result = data.results || [{}, {}];
          if (this.user_result.length == 1) {
            this.user_result.push({});
            if (this.user_result[0].img_type == "white") {
              this.user_result[1].img_type = "black";
            } else {
              this.user_result[1].img_type = "white";
            }
          }
          this.creatJoinImgUrl();
        })
        .catch(err => {});
    },
    checkCurStatus() {
      let query = {
        img_id: this.img_id
      };
      parseService
        .get(REQ_URL + "angel?where=" + JSON.stringify(query))
        .then(data => {
          if (data.results && data.results.length) {
            // 找到相同img_id判断是否为当前用户的图片
            if (data.results[0].open_id != this.user_info.wx_openid) {
              this.user_info.wx_openid = data.results[0].open_id;
              this.getWxUserResult();
            } else {
              this.show_btn = true;
              this.checkCurTypeImg();
            }
          } else {
            this.show_btn = true;
            this.checkCurTypeImg();
          }
        });
    },
    checkCurTypeImg() {
      let query = {
        img_type: this.img_type,
        open_id: this.user_info.wx_openid
      };
      parseService
        .get(REQ_URL + "angel?where=" + JSON.stringify(query) + "&limit=1")
        .then(data => {
          if (!data.results) {
            return;
          }
          if (data.results.length) {
            // 不同的图片，则更新
            if (data.results[0].img_id != this.img_id) {
              this.updateCurTypeImg(data.results[0]);
            } else {
              this.getWxUserResult();
            }
            return;
          } else {
            this.addCurTypeImg();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCurTypeImg() {
      // 获取图片url存入数据库
      getInfoById(this.img_id)
        .then(result => {
          this.img_url = result.image;
          let params = {
            img_id: this.img_id,
            open_id: this.user_info.wx_openid,
            img_type: this.img_type,
            num: this.num,
            img_url: this.img_url,
            sex: this.sex
          };

          parseService
            .post(REQ_URL + "angel", params)
            .then(res => {
              // 获取最新数据进行展示
              this.getWxUserResult();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateCurTypeImg(data) {
      getInfoById(this.img_id)
        .then(result => {
          this.img_url = result.image;
          // 更新类型图片
          let params = {
            img_url: this.img_url,
            sex: this.sex,
            num: this.num,
            img_id: this.img_id
          };
          parseService
            .put(REQ_URL + "angel/" + data.objectId, JSON.stringify(params))
            .then(res => {
              // 获取最新数据进行展示
              this.getWxUserResult();
            })
            .catch(err => {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    creatJoinImgUrl() {
      if (!this.user_result[0].img_id || !this.user_result[1].img_id) {
        this.wxShareInfo.success = () => {
          wechatShareTrack("share_pagewechat_angel_with_one_photo");
        };
        return;
      }

      if (
        this.user_result[0].sex == "male" ||
        this.user_result[1].sex == "male"
      ) {
        this.join_img_url = this.IMAGE_SERVER + "unknow.png";
        return;
      }

      if (this.sex == "male") {
        this.join_img_url = this.IMAGE_SERVER + "unknow.png";
        return;
      }

      let w_num = "",
        b_num = "";

      for (let i = 0, length = this.user_result.length; i < length; i++) {
        if (this.user_result[i].img_type == "white") {
          w_num = this.user_result[i].num;
        }
        if (this.user_result[i].img_type == "black") {
          b_num = this.user_result[i].num;
        }
      }

      if (b_num == w_num) {
        this.join_img_url = this.IMAGE_SERVER + "baibian.png";
        return;
      }

      let rule = this.join_rule.find(i => {
        if (i[0] == b_num && i[1] == w_num) {
          return true;
        }
      });

      if (rule) {
        this.join_img_url = this.IMAGE_SERVER + "baibian.png";
        return;
      }

      if (b_num > w_num) {
        this.join_img_url = this.IMAGE_SERVER + "gugao.png";
        return;
      }

      if (b_num < w_num) {
        this.join_img_url = this.IMAGE_SERVER + "gaogui.png";
        return;
      }
    },
    join() {
      if (!this.user_result[0].img_id || !this.user_result[1].img_id) {
        alert("还差一个照片即可合成女神哦~");
        return;
      }
      this.show_btn = false;
    }
  }
};
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
@IMAGE_SERVER: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/angel";
@keyframes fall1 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    left: 22%;
    top: 77%;
    opacity: 1;
    transform: rotate(-30deg);
  }
}
@keyframes fall2 {
  0% {
    top: 0%;
  }
  100% {
    top: 80%;
    opacity: 1;
    left: 5%;
  }
}
@keyframes fall3 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    top: 82%;
    opacity: 1;
    right: 19%;
    transform: rotate(19deg);
  }
}
@keyframes fall4 {
  0% {
    top: 0%;
  }
  100% {
    opacity: 1;
    top: 81%;
  }
}
@keyframes fall5 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    right: 38%;
    opacity: 1;
    top: 81%;
    transform: rotate(-19deg);
  }
}
@keyframes fall6 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    top: 70%;
    right: 7%;
    opacity: 1;
    transform: rotate(30deg);
  }
}
@keyframes fall7 {
  0% {
    top: 0%;
  }
  100% {
    top: 70%;
    opacity: 1;
    right: 27%;
  }
}
@keyframes fall8 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    top: 60%;
    right: 17%;
    opacity: 1;
    transform: rotate(23deg);
  }
}
@keyframes fall9 {
  0% {
    top: 0%;
  }
  100% {
    top: 61%;
    opacity: 1;
    right: 58%;
  }
}
@keyframes fall10 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    top: 70%;
    right: 45%;
    opacity: 1;
    transform: rotate(10deg);
  }
}
@keyframes fall11 {
  0% {
    top: 0%;
    transform: rotate(0deg);
  }
  100% {
    left: 5%;
    top: 67%;
    opacity: 1;
    transform: rotate(-21deg);
  }
}

.angel-container {
  position: relative;
  background-image: url("@{IMAGE_SERVER}/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
  .abs {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    margin: 0 auto;
  }
  .slogan {
    top: -3%;
    width: 100%;
  }
  .img-wrap {
    top: 26%;
    width: 90%;
    margin: -8% auto 0;
    .frame {
      position: relative;
      z-index: 3;
    }
    .lock {
      top: 0;
      z-index: 4;
    }
    .cover {
      height: 94%;
      top: 3%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
      width: 90%;
    }
    .diamond-wrap {
      height: 94%;
      top: 0;
      z-index: 5;
      width: 90%;
      &.animate {
        .d1 {
          animation: fall1 1s 0.5s ease-in-out forwards;
        }
        .d2 {
          animation: fall2 1s linear forwards;
        }
        .d3 {
          animation: fall3 1s 0.5s linear forwards;
        }
        .d4 {
          animation: fall4 1s 0.2s linear forwards;
        }
        .d5 {
          animation: fall5 1s 0.7s linear forwards;
        }
        .d6 {
          animation: fall6 1s 1.8s linear forwards;
        }
        .d7 {
          animation: fall7 1s 1.5s linear forwards;
        }
        .d8 {
          animation: fall8 1s 2s linear forwards;
        }
        .d9 {
          animation: fall9 1s 1.5s linear forwards;
        }
        .d10 {
          animation: fall10 1s 1.2s linear forwards;
        }
        .d11 {
          animation: fall11 1s 1.3s linear forwards;
        }
      }
      .diamond {
        position: absolute;
        width: 20%;
        margin: 0 auto;
        opacity: 0;
        &.d1 {
          left: 20%;
          right: initial;
        }
        &.d2 {
          left: 10%;
        }
        &.d3 {
          right: 10%;
        }
        &.d4 {
          right: 0;
        }
        &.d5 {
          right: 15%;
        }
        &.d6 {
          right: 11%;
        }
        &.d7 {
          right: 30%;
        }
        &.d8 {
          right: 40%;
        }
        &.d9 {
          right: 50%;
        }
        &.d10 {
          right: 55%;
        }
        &.d11 {
          left: 11%;
        }
      }
    }
    .angel-container {
      position: relative;
      width: 50%;
      &.white {
        float: left;
      }
      &.black {
        float: right;
      }
      .img-container {
        top: 3%;
        width: 92%;
      }
      .img-download {
        top: 0;
        z-index: 99;
        opacity: 0;
      }
    }
  }
  .num-wrap {
    width: 90%;
    top: 57%;
    margin: 6% auto;
    .num-container {
      position: relative;
      &.white {
        width: 50%;
        float: left;
      }
      &.black {
        width: 50%;
        float: right;
      }
      .num {
        font-size: 23px;
        color: #fff;
        top: 50%;
        &.black {
          left: 47%;
          right: initial;
        }
        &.white {
          right: 37%;
          left: initial;
        }
      }
    }
  }
  .btn-join {
    top: 70%;
    width: 60%;
  }
  .result-join {
    top: 70%;
  }
  .img-za {
    width: 90%;
    margin: 10% auto;
  }
}
</style>
