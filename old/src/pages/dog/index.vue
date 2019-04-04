<template>
  <!-- isAbandoned -->
  <div class="report-wrap">
    <div class="photo-wrap">
      <img 
        :src="resultImgUrl" 
        alt="">
        <!-- <img src="http://ozwvqiu0u.bkt.clouddn.com/Fo-_Ec2jv9sm7_FhmiNne1YlIlJ6" /> -->
    </div>
    <div class="save">长按保存照片到手机相册</div>
    <div 
      v-show="RedPageFlag" 
      class="cover">
      <div class="prize-wrap">
        <div class="red-package">
          <img 
            :src="imgServerUrl + '/pages/dog/red_bag.png'" 
            class="bg-red-package">
          <div class="title">恭喜你获得</div>
          <div class="subtitle">“要發”大红包</div>
          <img 
            :src="imgServerUrl + '/pages/dog/btn_open.png'" 
            class="btn-open" 
            @click="openBag">
        </div>
        <div class="open-red-package">
          <img 
            :src="imgServerUrl + '/pages/dog/red_bag_bg.png'" 
            class="bg-red-package">
          <div class="title">恭喜你获得消费红包</div>
          <div class="prompt-title">{{ coupon_batch.name }}</div>
          <div class="count">{{ coupon_batch.total }}<span class="yuan">元</span></div>
          <div class="prompt-title address">{{ coupon_batch.desc }}</div>
          <div 
            v-show="phoneError" 
            class="error">{{ errorText }}</div>
          <input 
            v-model="mobileNum" 
            type="text" 
            placeholder="请输入手机号" 
            class="mobile" 
            maxlength="11" 
            @click="phoneError = false">
          <div 
            class="btn" 
            @click="getPhoto">领取红包</div>
        </div>
        <div 
          v-show="noPackageFlag" 
          class="no-red-package">
          <img 
            :src="imgServerUrl + '/pages/dog/no_red_package.png'" 
            class="bg-red-package">
          <div class="title">现金红包已被领完</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing'

export default {
  data() {
    return {
      resultImgUrl: '',
      imgServerUrl: IMAGE_SERVER,
      phoneError: false,
      errorText: '手机号码格式不正确',
      RedPageFlag: false,
      mobileNum: '',
      noPackageFlag: false,
      wxShareInfoValue: {
        title: '旺狗开春 情缘满分',
        desc: '巴黎春天借旺狗报新春 送祝福 合家欢 情侣睦 诞生的汪早脱单',
        imgUrl:
          'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dog_share_icon.png',
        link: ''
      },
      coupon_batch: {
        name: '',
        desc: '',
        couponId: '',
        total: ''
      }
    }
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        link: this.wxShareInfoValue.link,
        success: () => {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    }
  },
  beforeCreate() {
    document.title = '狗年旺情缘'
  },
  mounted() {
    $('.report-wrap').css('height', $(window).height())
  },
  created() {
    if (this.$route.query.show === 'true') {
      this.RedPageFlag = false
      this.wxShareInfoValue.link = window.location.href
    } else {
      this.wxShareInfoValue.link = window.location.href + '&show=true'
    }
    this.getPeopleImage()
  },
  methods: {
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId)

      getPlayResultById(recordId)
        .then(result => {
          this.resultImgUrl = result.result_img_url
        })
        .catch(err => {
          console.log(err)
        })
    },
    openBag() {
      $('.btn-open').addClass('rotate')
      let params = {
        coupon_batch_id: '32'
      }
      // 判断优惠券数目
      couponService
        .getV4CouponCount(this, '32')
        .then(res => {
          if (res.data.capacity === 0) {
            setTimeout(() => {
              $('.red-package').hide()
              $('.no-red-package').show()
            }, 100)
            setTimeout(() => {
              $('.cover').hide()
            }, 2000)
          } else {
            // 优惠券生成
            couponService
              .createV4Coupon(this, params)
              .then(res => {
                this.coupon_batch.name = res.coupon_batch.name
                this.coupon_batch.desc = res.coupon_batch.description
                this.coupon_batch.total = res.coupon_batch.total
                this.coupon_batch.couponId = res.id
                setTimeout(() => {
                  $('.red-package').hide()
                  $('.open-red-package').show()
                }, 100)
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPhoto() {
      if (!/^1[34578]\d{9}$/.test(this.mobileNum)) {
        this.phoneError = true
        this.errorText = '手机号码格式不正确'
      } else {
        customTrack.sendMobile(this.mobileNum)
        // 优惠券绑定
        let params = {
          mobile: this.mobileNum,
          coupon_id: this.coupon_batch.couponId
        }

        console.log(params)
        couponService
          .bindV4Coupon(this, params)
          .then(res => {
            if (res.success) {
              // 调用发短信的接口
              let smsParams = params
              smsParams.sms_tmp_id = '2169978'
              couponService
                .sendV4CouponSms(this, smsParams)
                .then(Response => {
                  console.log(Response.message)
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              alert(res.message)
            }
            this.RedPageFlag = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dog';
.report-wrap {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@{imageHost}/bg.png');
  background-size: 100% 100%;
  position: relative;
  .photo-wrap {
    position: absolute;
    top: 18%;
    width: 60%;
    left: 20%;
    img {
      width: 100%;
    }
  }
  .save {
    color: #fff;
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 2.5%;
    width: 100%;
  }
  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.9);
    .prize-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      .red-package {
        display: block;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        position: relative;
        .bg-red-package {
          width: 90%;
          top: 15%;
          left: 5%;
          position: absolute;
        }
        .title {
          top: 27%;
          width: 100%;
          font-size: 20px;
          color: #e9b96d;
          text-align: center;
          position: absolute;
        }
        .subtitle {
          top: 35%;
          width: 100%;
          font-size: 42px;
          color: #e9b96d;
          text-align: center;
          position: absolute;
        }
        .btn-open {
          width: 30%;
          top: 55%;
          left: 35%;
          position: absolute;
        }
      }
      .open-red-package {
        display: none;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        .bg-red-package {
          width: 90%;
          top: 10%;
          left: 5%;
          position: absolute;
        }
        .title {
          top: 16%;
          width: 100%;
          font-size: 18px;
          color: #222;
          text-align: center;
          position: absolute;
        }
        .prompt-title {
          top: 21%;
          width: 100%;
          font-size: 14px;
          color: #9d9d9d;
          text-align: center;
          position: absolute;
        }
        .count {
          top: 28%;
          width: 100%;
          font-size: 45px;
          color: #222;
          text-align: center;
          position: absolute;
          .yuan {
            font-size: 20px;
          }
        }
        .address {
          top: 40%;
          width: 100%;
          text-align: center;
          position: absolute;
        }
        .error {
          position: absolute;
          width: 100%;
          top: 45%;
          text-align: center;
          color: #d80808;
          font-size: 14px;
        }
        .mobile {
          border: none;
          outline: none;
          border: 1px solid #ababab;
          width: 65.3%;
          height: 37px;
          font-size: 14px;
          color: #ababab;
          top: 50%;
          position: absolute;
          left: 17.35%;
          border-radius: 5px;
          text-indent: 10px;
          box-shadow: 0px 0px 3px #ababab inset;
        }
        .btn {
          width: 65.3%;
          height: 45px;
          top: 60%;
          left: 17.35%;
          text-align: center;
          line-height: 45px;
          font-size: 18px;
          color: #fff;
          background-color: #ffb142;
          position: absolute;
          border-radius: 5px;
        }
      }
      .no-red-package {
        display: block;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        position: relative;
        .bg-red-package {
          width: 90%;
          top: 05%;
          left: 5%;
          position: absolute;
        }
        .title {
          top: 22%;
          width: 100%;
          font-size: 18px;
          color: #222;
          text-align: center;
          position: absolute;
        }
      }
    }
    .mobile::-webkit-input-placeholder {
      color: #aabbaa;
      text-indent: 10px;
    }
    .mobile::-moz-placeholder {
      /* Firefox 19+ */
      color: #aabbaa;
      text-indent: 10px;
    }
    .mobile:-moz-placeholder {
      /* Firefox 18- */
      color: #aabbaa;
      text-indent: 10px;
    }
    .mobile:-ms-input-placeholder {
      /* IE 10- */
      color: #aabbaa;
      text-indent: 10px;
    }
  }
  .rotate {
    animation: anim 0.3s infinite alternate;
  }

  @keyframes anim {
    from {
      transform: rotateY(180deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
}
</style>


