<template>
  <div class="report-wrap">
    <div class="photo-wrap">
      <img :src="resultImgUrl" alt=""/>
      <!-- <img src="http://ozwvqiu0u.bkt.clouddn.com/Fo-_Ec2jv9sm7_FhmiNne1YlIlJ6" /> -->
    </div>
    <div class="save">长按保存照片到手机相册</div>
     <!-- <div class="cover" v-show="RedPageFlag">
      <div class="prize-wrap">
        <div class="red-package">
          <img class="bg-red-package" :src="imgServerUrl + '/pages/dog/red_bag.png'">
          <div class="title">恭喜你获得</div>
          <div class="subtitle">“要發”大红包</div>
          <img class="btn-open" :src="imgServerUrl + '/pages/dog/btn_open.png'" @click="openBag">
        </div>
        <div class="open-red-package">
          <img class="bg-red-package" :src="imgServerUrl + '/pages/dog/red_bag_bg.png'">
          <div class="title">恭喜你获得消费红包</div>
          <div class="prompt-title">{{coupon_batch.name}}</div>
          <div class="count">{{coupon_batch.total}}<span class="yuan">元</span></div>
          <div class="prompt-title address">{{coupon_batch.desc}}</div>
          <div class="error" v-show="phoneError">{{errorText}}</div>
          <input type="text" placeholder="请输入手机号" class="mobile" maxlength="11" @click="phoneError = false" v-model="mobileNum"/>
          <div class="btn" @click="getPhoto">领取红包</div>
        </div>
        <div class="no-red-package" v-show="noPackageFlag">
          <img class="bg-red-package" :src="imgServerUrl + '/pages/dog/no_red_package.png'">
          <div class="title">现金红包已被领完</div>
        </div>
      </div>
    </div> -->
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing';
// import couponService from 'services/coupon';
import WxShare from 'modules/wxShare';
import { customTrack } from 'modules/customTrack';

const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";

export default {
  components: {
    WxShare,
  },
  data() {
    return {
      resultImgUrl: '',
      imgServerUrl: IMAGE_SERVER,
      phoneError: false,
      errorText: '手机号码格式不正确',
      mobileNum: '',
      wxShareInfoValue: {
        title: '旺狗开春 情缘满分',
        desc: '宏伊国际广场借旺狗报新春 送祝福 合家欢 情侣睦 诞生的汪早脱单',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dog_share_icon.png',
      },
    };
  },
  beforeCreate() {
    document.title = '狗年旺情缘';
  },
  mounted() {
    $('.report-wrap').css('height', $(window).height());
  },
  created() {
    this.getPeopleImage();
  },
  methods: {
    getPeopleImage() {
      let recordId = decodeURI(this.$route.query.recordId);
      console.log(recordId)
      marketService.getPlayResultById(this, recordId).then((result) => {
        console.log(result)
        this.resultImgUrl = result.result_img_url;
      }).catch((err) => {
      console.log(err);
      });
    },
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: () => {
          customTrack.shareWeChat();
        },
      };
      return wxShareInfo;
    },
  },
};
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
    width: 60%;
    left: 20%;
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
}
</style>


