<template>
  <div
    :style="style.root"
    class="content"
  >
    <img
      :src="base + 'tit.png' + this.$qiniuCompress()"
      class="tit"
    >
    <div class="one">
      <img
        :src="base + 'oneone.png' + this.$qiniuCompress()"
        class="bg"
      >
      <a
        class="coupon"
        @click="getAuth"
      >
        <img :src="base + coupon_batch_id + '.png'">
      </a>
    </div>
    <div class="two">
      <ul class="ul-tab">
        <li
          v-for="(item,index) in tabs"
          :key="index"
        >
          <a @click="getTabs(index)" />
        </li>
      </ul>
      <img
        v-for="(item,index) in tabs"
        :key="index"
        :src="base + index + '.png'"
        :class="{bg:true,ceng2:item}"
      >
    </div>
    <img
      :src="base + 'logo.png' + this.$qiniuCompress()"
      class="logo"
    >
  </div>
</template>
<script>
import {
  $wechat,
  isInWechat,
  wechatShareTrack,
  Cookies
} from 'services'
import { normalPages } from '../../mixins/normalPages'
const cdnUrl = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      base: cdnUrl + '/fe/image/longhu/',
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      coupon_batch_id: this.$route.query.coupon_batch_id,
      belong: this.$route.query.utm_campaign.trim(),
      tabs: {
        'LHHappyBirthday': false,
        'LonghuYinFood': false,
        'cpLongfor': false,
      },
      open_user_id: null,
      authorize_url: process.env.AD_API + '/api/mallcoo/user/oauth?redirect_url=',
      coupon_url: process.env.AD_API + "/api/mallcoo/coupon",
      //分享
      wxShareInfoValue: {
        title: '一周年好礼相送',
        desc: '参与互动 福利翻倍',
        link: 'http://papi.xingstation.com/api/s/wVw' + window.location.search,
        imgUrl: cdnUrl + '/fe/image/longhu/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {
    this.tabs[this.belong] = true
    if (this.$route.query.open_user_id) {
      this.open_user_id = this.$route.query.open_user_id;
      this.getQuanMsg(this.coupon_batch_id);
    }
  },
  methods: {
    getTabs(index) {
      for (let i in this.tabs) {
        this.tabs[i] = false
      }
      this.tabs[index] = true
    },
    //授权
    getAuth() {
      let pageUrl = encodeURIComponent(window.location.href);
      this.$http.get(this.authorize_url + pageUrl).then(result => {
        let data = result.data;
        window.location.href = data;
        return;
      });
    },
    //获取券信息
    getQuanMsg(coupon_num) {
      this.$http
        .get(this.coupon_url)
        .then(res => {
          //success
          let data = res.data;
          let list = data.data;
          //StoreOverGount
          if (!list[coupon_num].StoreOverGount) {
            alert("该优惠券已发完！");
            return;
          }
          this.getCoupon(
            this.$route.query.open_user_id,
            list[coupon_num].PICMID
          );
          console.log(res);
        })
        .catch(err => {
          console.log("未获取到优惠券信息");
        });
    },
    //发券，用户获取券
    getCoupon(open_id, pic_mid) {
      this.$http
        .post(this.coupon_url, {
          open_user_id: open_id,
          pic_mid: pic_mid
        })
        .then(
          res => {
            //success
            let data = res.data;
            console.log(res);
          },
          res => {
            //err
            console.log(err)
          }
        );
    },
  }
}
</script>
<style lang="less" scoped>
@img: "https://cdn.exe666.com/fe/image/longhu/";
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
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}
img {
  pointer-events: none;
  user-select: none;
  max-width: 100%;
}
.content {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background: url("@{img}bg.png") center top / 100% 100% no-repeat;
  .bg {
    width: 100%;
    position: relative;
    z-index: 0;
  }
  .zero {
    position: relative;
    width: 70%;
    overflow: hidden;
    margin-top: -3%;
    margin-bottom: 5%;
    .save {
      position: absolute;
      left: 0%;
      top: 50%;
      transform: translateY(-50%);
      width: 17vw;
      z-index: 0;
    }
    .frame {
      width: 51vw;
      position: relative;
      z-index: 0;
      float: right;
    }
    .photo {
      width: 48.2vw;
      position: absolute;
      z-index: 99;
      top: 0.6%;
      right: 3.1%;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .one {
    position: relative;
    width: 95%;
    .coupon {
      display: inline-block;
      width: 90%;
      position: absolute;
      top: 13%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
    }
  }
  .two {
    position: relative;
    width: 100%;
    margin-top: 8%;
    .ul-tab {
      width: 87%;
      height: 8%;
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      overflow: hidden;
      li {
        display: inline-block;
        height: 100%;
        width: 28vw;
        float: left;
        margin: 0 0.5vw;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .bg {
      width: 95%;
      z-index: 9;
      &:not(:last-child) {
        z-index: 0;
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    // .LonghuYinFood {
    // }
    // .LHHappyBirthday {
    //   z-index: 0;
    //   position: absolute;
    //   top: 0%;
    //   left: 50%;
    //   transform: translateX(-50%);
    // }
    .ceng2 {
      z-index: 99 !important;
    }
  }
  .logo {
    position: relative;
    width: 42%;
    margin-top: 2%;
    margin-bottom: 4%;
  }
}
</style>


