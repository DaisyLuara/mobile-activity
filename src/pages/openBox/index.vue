<template>
  <!-- eslint-disable -->
  <!-- isAbandoned -->
  <div class="phone-content">
    <img 
      src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/title.png" 
      alt="" 
      class="title"
    >
    <img 
      src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/phone_hint.png" 
      alt="" 
      class="phone-hint"
    >
    <input 
      v-model="mobileNum" 
      type="text" 
      class="mobile" 
      maxlength="11" 
      placeholder="请输入你的手机号" 
      @click="phoneError = false"
    >
    <div class="boots-wrap">
      <div 
        v-show="phoneError"
        class="error" 
      >
        {{ errorText }}
      </div>
      <img
        src="http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box/confirm_btn.png" 
        class="confrim_btn"  
        @click="redirectToPhoto"
      >
    </div>
  </div>
</template>
<script>
/* eslint-disable */
const parseUrl = process.env.PARSE_SERVER;
export default {
  data() {
    return {
      mobileNum: "",
      phoneError: true,
      errorText: "",
      reqUrl: `${parseUrl}/parse/classes/`,
      wxShareInfoValue: {
        title: "寻宝箱 开好礼",
        desc: "新年至 小星在各大商圈准备了海量神秘宝箱！找到小星 发现好礼！！",
        imgUrl:
          "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/openBox_share_icon.png",
        success: () => {
          wechatShareTrack();
        }
      },
      userInfo: {}
    };
  },
  beforeCreate() {
    document.title = "开箱子";
  },
  mounted() {
    $(".phone-content").css("height", $(window).height());
    this.handleShare();
  },
  created() {
    getWxUserInfo();
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue);
        })
        .catch(_ => {
          console.warn(_.message);
        });
    },
    saveWxInfo() {
      this.userInfo.gifType = this.$route.query.type;
      parseService
        .post(this.reqUrl + "open_the_box", this.userInfo)
        .then(res => {
          console.log("保存成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    redirectToPhoto() {
      if (!/^1[34578]\d{9}$/.test(this.mobileNum)) {
        this.phoneError = true;
        this.errorText = "手机号码格式不正确";
      } else {
        this.getCoupon();
      }
    },
    getCoupon() {
      let adId = this.$route.query.adId;
      if (!adId) {
        adId = 20012;
      }
      let params = {
        mobile: this.mobileNum,
        sms_template: "SEND_MARKETING_COUPONS",
        adId: parseInt(adId)
      };
      CouponService.createCoupon(this, params)
        .then(data => {
          let res = data.data;
          if (JSON.stringify(res) === "{}") {
            this.saveWxInfo();
            customTrack.sendMobile(this.mobileNum);
            this.linkToPhoto();
          } else {
            alert(res.error.msg);
            this.linkToPhoto();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getWxUserInfo() {
      getWxUserInfo()
        .then(result => {
          let data = result.data;
          this.userInfo.name = data.nickname;
          this.userInfo.headImgUrl = data.headimgurl;
        })
        .catch(err => {
          let pageUrl = encodeURIComponent(window.location.href);
          let wxAuthUrl =
            process.env.WX_API +
            "/wx/officialAccount/oauth?url=" +
            pageUrl +
            "&scope=snsapi_userinfo";
          window.location.href = wxAuthUrl;
        });
    },
    linkToPhoto() {
      let redirectUrl =
        window.location.origin + "/#" + this.$route.path + "/result";
      for (let param in this.$route.query) {
        redirectUrl = setParameter(
          param,
          this.$route.query[param],
          redirectUrl
        );
      }
      window.location.href = redirectUrl;
    }
  }
};
</script>
<style lang="less" scoped>
@imageHost: "http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/open_box";
.phone-content {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg.png");
  background-size: cover;
  position: relative;
  .title {
    width: 65%;
    position: absolute;
    top: 10%;
    left: 17.5%;
  }
  .phone-hint {
    width: 40%;
    position: absolute;
    top: 35%;
    left: 30%;
  }
  .mobile {
    border: none;
    outline: none;
    border: 4px solid #f9d689;
    border-radius: 20px;
    height: 70px;
    padding: 10px;
    width: 80%;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 10%;
    color: #f9d689;
    background-color: #14123e;
    text-align: center;
  }
  .boots-wrap {
    position: absolute;
    top: 60%;
    height: 200px;
    width: 100%;
    .error {
      position: absolute;
      top: 15%;
      // left: 35%;
      color: red;
      font-size: 14px;
      width: 100%;
      text-align: center;
    }
    .confrim_btn {
      width: 30%;
      top: 25%;
      left: 35%;
      position: absolute;
    }
  }
  .mobile::-webkit-input-placeholder {
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0% 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .mobile::-moz-placeholder {
    /* Firefox 19+ */
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .mobile:-moz-placeholder {
    /* Firefox 18- */
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .mobile:-ms-input-placeholder {
    /* IE 10- */
    color: transparent;
    text-indent: -9999px;
    background-image: url("@{imageHost}/input_placeholder.png");
    background-position: 0 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @keyframes arrowsBg {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>


