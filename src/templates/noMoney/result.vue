<template>
 <div class="report-content"  v-bind:style="marketingOptions.bg">
  <div class="text-wrap">
  </div>
  <div class="wealth-report">
    <img class="title" :src="title">
    <div class="report-wrap">
      <div class="photo-bg" v-bind:style="bg">
        <img class="frame-img" :src="imgUrl">
      </div>
    </div>
    <div class="save-tip">
      <img class="arrow-icon" :src="arrow">
      <span class="text">长按图片可保存并分享我的诊断报告</span>
    </div>
  </div>
  <div class="bottom-wrap" v-if="marketingOptions.bottom">
    <img class="title-img" :src="marketingOptions.bottom.imgUrl">
  </div>
  <wx-share :WxShareInfo="wxShareInfo"></wx-share>
</div>
</template>
<script>
import { customTrack } from 'modules/customTrack';
import WxShare from 'modules/wxShare';

const marketingImageServer = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';
export default {
  props: ['marketingOptions'],
  components: {
    WxShare,
  },
  data() {
    return {
      imgUrl: '',
      showFlag: false,
      bg: null,
      title: marketingImageServer + '/templates/noMoney/report.png',
      arrow: marketingImageServer + '/templates/noMoney/arrow-icon.png',
    };
  },
  created() {
    this.forbidWXShare();
    let imageUrl = decodeURI(this.$route.query.imageUrl);
    this.imgUrl = imageUrl;
    this.bg = { 'backgroundImage': 'url(' + imageUrl + ')' };
  },
  mounted() {
    $('.report-content').css('height', $(window).height());
    document.body.addEventListener('touchstart', () => {});
    let wid = $(window).width() > 640 ? 640 : $(window).width();
    let imgHei = ((wid - 28 - (wid * 0.125 * 2)) * 4) / 3;
    $('.photo-bg').height(imgHei);
  },
  methods: {
    onBridgeReady() {
      WeixinJSBridge.call('showOptionMenu');
    },
    forbidWXShare() {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, true);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
        }
      } else {
        this.onBridgeReady();
      }
    }
  },
  computed: {
    wxShareInfo() {
        let wxShareInfo = {
          title: this.marketingOptions.wxShareInfo.title,
          desc: this.marketingOptions.wxShareInfo.desc,
          imgUrl: this.marketingOptions.wxShareInfo.imgUrl,
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
.report-content {
  width: 100%;
  height: 100%;
  text-align: center;
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;
  
  .text-wrap {
    padding-top: 3%;
    text-align: center;
    .text1 {
      font-size: 33px;
      color: #e3b571;
    }
    .me-text{
      width: 25%;
    }
    .text2 {
      position: relative;
      text-align: center;
      .text-bg {
        width: 83%;
      }
      .text {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        margin: auto;
        width: 55%;
      }
    }
  }

  .wealth-report {
    margin-top: 7%;
    .title {
      width: 60%;
    }
    .report-wrap {
      width: 100%;
      .photo-bg{
        margin: auto 12.5%;
        border: 4px dotted #c56e2d;
        padding: 10px;
				background: #000;
				background-position: 50%;
				background-repeat: no-repeat;
				background-size: auto 110%;
        .frame-img {
					opacity: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    .save-tip {
      display: inline-block;
      width: 310px;
      height: 43px;
      line-height: 43px;
      border: 2px solid #e3b571;
      border-radius: 100px;
      text-align: left;
      margin-top: 3%;
      background-color: #000;
      .arrow-icon {
        width: 33px;
        vertical-align: top;
        margin: 3px 0 0 3px;
      }
      .text {
        font-size: 16px;
        color: #e3b571;
        font-weight: 700;
        display: inline-block;
        vertical-align: middle;
        margin-top: -3%;
      }
    }
  }

  .bottom-wrap {
    // background-color: #000;
    padding: 15px;
    // margin-top: 10px;
    // opacity: 0.8;
    .title-img {
      // width: 31.33%;
      // width: 43.33%;
      width: 50.33%;
    }
    .des {
      font-size: 12px;
      margin-top: 10px;
      color: #fff;
    }
  }
}
</style>
