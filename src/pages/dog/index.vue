<template>
  <div class="report-wrap">
    <div class="photo-wrap">
      <!-- <img :src = "resultImgUrl" /> -->
      <img src = "http://ozwvqiu0u.bkt.clouddn.com/FvJDho0lyvIEhFNSMnFFz9P8hFg8" />
    </div>
    <div class="save">长按保存照片到手机相册</div>
     <div class="cover" v-show="RedPageFlag">
      <div class="prize-wrap">
        <div class="red-package" v-show="openPackageFlag">
          <img class="bg-red-package" :src="imgServerUrl + '/pages/dog/red_bag.png'">
          <div class="title">恭喜你获得</div>
          <div class="subtitle">“要發”大红包</div>
          <img class="btn-open" :src="imgServerUrl + '/pages/dog/btn_open.png'" @click="openBag">
        </div>
        <div class="open-red-package" v-show="!openPackageFlag & !noPackageFlag">
          <img class="bg-red-package" :src="imgServerUrl + '/pages/dog/red_bag_bg.png'">
          <div class="title">恭喜您获得消费红包</div>
          <div class="prompt-title">消费满100元仅使用一张</div>
          <div class="count">18.00<span class="yuan">元</span></div>
          <div class="prompt-title address">电子红包需至六楼服务台进行核销</div>
          <div class="error" v-show="phoneError">{{errorText}}</div>
          <input type="text" placeholder="请输入手机号" class="mobile" maxlength="11" @click="phoneError = false" v-model="mobileNum"/>
          <div class="btn" @click="getPhoto">领取红包</div>
        </div>
        <div class="no-red-package" v-show="noPackageFlag">
          <img class="bg-red-package" :src="imgServerUrl + '/pages/dog/no_red_package.png'">
          <div class="title">现金红包已被领完</div>
        </div>
      </div>
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing'
import { customTrack } from 'modules/customTrack'
import WxShare from 'modules/wxShare.vue'

const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";

export default {
  components: {
    WxShare
  },
  data () {
    return {
      resultImgUrl: '',
      imgServerUrl: IMAGE_SERVER,
      openPackageFlag: true,
      phoneError: false,
      errorText : '手机号码格式不正确',
      RedPageFlag: true,
      mobileNum: '',
      noPackageFlag: false,
      wxShareInfoValue:{
        title: '寻宝箱 开好礼',
        desc: '新年至 小星在各大商圈准备了海量神秘宝箱！找到小星 发现好礼！！',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dog_share_icon.png'
      }
    }
  },
  beforeCreate() {
    document.title = "狗年汪情缘"
  },
  mounted(){
    $(".report-wrap").css('height', $(window).height());
  },
  created() {
    this.getPeopleImage()
  },
  methods:{
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId);
      marketService.getPlayResultById(this,recordId).then(result => {
        this.resultImgUrl = result.result_img_url;
      }).catch(err => {
      console.log(err)
      })
    },
    openBag() {
      this.openPackageFlag = false
    },
    getPhoto() {
      if(!(/^1[34578]\d{9}$/.test(this.mobileNum))){
        this.phoneError = true;
        this.errorText = '手机号码格式不正确';
        return;
      }else{
          customTrack.sendMobile(this.mobileNum);
          this.RedPageFlag = false
      }
    }
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: () => {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo;
      }
    }
  }
</script>
<style lang="less" scoped>
  @imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dog';
.report-wrap{
  height: 100%;
  background-repeat: no-repeat;
  background-image: url("@{imageHost}/bg.png");
  background-size: 100% 100%;
  position: relative;
  .photo-wrap{
    position: absolute;
    top: 18%;
    width: 65%;
    left: 17.5%;
    img{
      width: 100%;
    }
  }
  .save{
    color: #fff;
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 2.5%;
    width: 100%;
  }
  .cover{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    margin: auto;
    background-color: rgba(0,0,0,.9);
    .prize-wrap{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 100%;
      .red-package{
        display: block;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        position: relative;
        .bg-red-package{
          width: 90%;
          top: 15%;
          left: 5%;
          position: absolute;
        }
        .title{
          top: 32%;
          width: 100%;
          font-size: 20px;
          color: #e9b96d;
          text-align: center;
          position: absolute;
        }
        .subtitle{
          top: 40%;
          width: 100%;
          font-size: 42px;
          color: #e9b96d;
          text-align: center;
          position: absolute;
        }
        .btn-open{
          width: 30%;
          top: 55%;
          left: 35%;
          position: absolute;
        }
      }
      .open-red-package{
        display: block;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        .bg-red-package{
          width: 90%;
          top: 10%;
          left: 5%;
          position: absolute;
        }
        .title{
          top: 16%;
          width: 100%;
          font-size: 18px;
          color: #222;
          text-align: center;
          position: absolute;
        }
        .prompt-title{
          top: 21%;
          width: 100%;
          font-size: 14px;
          color: #9d9d9d;
          text-align: center;
          position: absolute;
        }
        .count{
          top: 28%;
          width: 100%;
          font-size: 45px;
          color: #222;
          text-align: center;
          position: absolute;
          .yuan{
            font-size: 20px;
          }
        }
        .address{
          top: 40%;
          width: 100%;
          text-align: center;
          position: absolute;
        }
        .error{
          position: absolute;
          width: 100%;
          top: 45%;
          text-align: center;
          color: #d80808;
          font-size: 14px;
        }
        .mobile{
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
          box-shadow: 0px 1px 2px 1px #ababab;
        }
        .btn{
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
      .no-red-package{
         display: block;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 100%;
        position: relative;
        .bg-red-package{
          width: 90%;
          top: 15%;
          left: 5%;
          position: absolute;
        }
        .title{
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
}
</style>


