<template>
  <div 
    id="mallcoo" 
    class="mallcoo-content">
    <div class="coupList">
      <ul class="ul_list">
        <li class="q_name">{{ quanMsg.MallName }}</li>
        <li class="q_price">
          <label>
            {{ quanMsg.price }}
            <span>￥</span>
          </label>
          <p>代金券</p>
        </li>
        <li 
          v-show="noZero" 
          class="q_number">
          <span>{{ quanMsg.Vcode }}</span>
        </li>
        <li 
          v-show="noZero" 
          class="q_time">有效期至：{{ quanMsg.EndTime }}</li>
        <li 
          v-show="isZero" 
          class="num_err">该券已经发完了</li>
      </ul>
    </div>
  </div>
</template>
<script>
const parseUrl = process.env.PARSE_SERVER;
const REQ_URL = `${parseUrl}/parse/classes/`;
import {
  $wechat,
  getInfoById,
  wechatShareTrack,
  getParamsMap,
  getParameter,
  setParameter
} from "services";
import { parseService } from "services";
import { onlyWechatShare } from "../../mixins/onlyWechatShare";
const BASE_URL = process.env.CDN_URL;
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      quanMsg: {
        MallName: null,
        CouponDesc: null,
        Vcode: null,
        EndTime: null,
        price: null
      },
      pic_mid: null,
      err: null,
      noZero: true,
      isZero: false,
      //授权链接
      //http://sapi.newgls.cn/api/mallcoo/user/oauth?redirect_url=
      //http://sapi.newgls.cn/api/mallcoo/coupon
      authorize_url: process.env.SAAS_API + "/mallcoo/user/oauth?redirect_url=",
      coupon_url: process.env.SAAS_API + "/mallcoo/coupon",
      open_user_id: null,
      //微信分享
      wxShareInfoValue: {
        title: "旋转跳跃我领着券",
        desc: "草莓杂货铺欢迎你",
        imgUrl: BASE_URL + "/image/mallcoo/share.png",
        link: "",
        success: function() {
          wechatShareTrack();
        }
      }
    };
  },
  beforeCreate() {
    document.title = "马里奥2.0";
  },
  created() {
    this.wxShareInfoValue.link = window.location.origin + this.$route.path;
    if (this.$route.query.open_user_id) {
      this.open_user_id = this.$route.query.open_user_id;
      this.isFirstComeIn(this.$route.query.open_user_id);
    } else {
      this.getAuthorize();
    }
  },
  mounted() {
    let height = this.$innerHeight();
    let mallcoo = document.getElementById("mallcoo");
    mallcoo.style.minHeight = height + "px";
    let w = document.documentElement;
    let a = w.getBoundingClientRect().width;
    if (a > 750) {
      a = 750;
    }
    let rem = a / 7.5;
    w.style.fontSize = rem + "px";
  },
  methods: {
    //授权跳转
    getAuthorize() {
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
          this.quanMsg.CouponDesc = list[coupon_num].CouponDesc.trim();
          this.quanMsg.MallName = list[coupon_num].MallName.trim();
          this.pic_mid = list[coupon_num].PICMID;
          this.getPrice(this.quanMsg.CouponDesc);
          //StoreOverGount
          if (!list[coupon_num].StoreOverGount) {
            this.noZero = false;
            this.isZero = true;
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
          this.err = "未获取到优惠券信息";
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
            this.quanMsg.Vcode = data.data.VCode;
            this.quanMsg.EndTime = data.data.OverdueTime.split(" ")[0];
            console.log(res);
          },
          res => {
            //err
          }
        );
    },
    //从parseServer获取open_user_id,判断用户是否是新用户
    isFirstComeIn(open_id) {
      let query = {
        open_user_id: open_id
      };
      parseService
        .get(REQ_URL + "maliao_mall?where=" + JSON.stringify(query))
        .then(data => {
          let results = data.results;
          if (results.length) {
            this.getQuanMsg(1);
          } else {
            this.saveUserOpenId(open_id);
            this.getQuanMsg(0);
          }
        })
        .catch(err => {});
    },
    //存储open_user_id到parseServer
    saveUserOpenId(open_id) {
      let parms = {
        open_user_id: open_id
      };
      parseService
        .post(REQ_URL + "maliao_mall", parms)
        .then(data => {
          //将open_user_id保存到parseServer的class，maliao_mall中
          console.log("已经将open_user_id保存到parseServer的maliao_mall中");
        })
        .catch(err => {});
    },
    //跳转操作
    linkToPath(result_url) {
      this.$router.push({
        path: result_url
      });
    },
    //获得券的数值
    getPrice(string) {
      let p_tsring = null;
      for (var i = 0; i < string.length; i++) {
        p_tsring = string.slice(i);
        if (!isNaN(parseInt(p_tsring))) {
          this.quanMsg.price = parseInt(p_tsring.trim());
          return;
        }
      }
    }
  }
};
</script>
<style  lang="less" scoped>
@imgUrl: "https://cdn.exe666.com/image/mallcoo";
html,
body {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
.mallcoo-content {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  text-align: center;
  background-image: url("@{imgUrl}/bg33.png"), url("@{imgUrl}/bg2.png"),
    url("@{imgUrl}/bg1.png");
  background-position: center bottom, center -10%, center top;
  background-size: 100% 105%, 100% auto, 100% auto;
  background-repeat: no-repeat;
  .coupList {
    position: absolute;
    top: 32%;
    left: 28%;
    width: 44.5%;
    height: 50%;
    .ul_list {
      width: 100%;
      height: 100%;
      display: inline-block;
      position: relative;
      li {
        padding: 0;
        margin: 0;
        width: 100%;
        color: #474443;
      }
      .q_name {
        font-size: 0.3rem;
        font-weight: 500;
        margin-top: 10px;
        // text-shadow: 1px 0px 0.5px #474443;
      }
      .q_price {
        font-size: 2.2rem;
        text-align: center;
        label {
          color: #ff6041;
          display: inline-block;
          transform: skew(-10deg, 0deg);
          text-shadow: 1px 0px 0.5px #474443;
          span {
            font-size: 0.75rem;
            color: #474443;
            text-shadow: none;
          }
        }
        p {
          font-size: 0.85rem;
          margin: 0;
          margin-top: -10%;
          margin-bottom: 6%;
          letter-spacing: 1px;
        }
      }
      .q_number {
        color: #63f7ee;
        font-size: 0.25rem;
        margin: 5px 0px;
        position: absolute;
        bottom: 27%;
        span {
          background-color: #474443;
          padding: 2px 4px;
          border-radius: 5px;
          box-shadow: #474443 1px 0px 1px;
        }
      }
      .q_time {
        font-size: 0.2rem;
        margin-top: 22%;
        letter-spacing: 0.5px;
        font-size: 600;
        color: #474443;
        // text-shadow: 1px 0px 0.5px #474443;
        position: absolute;
        bottom: 14%;
      }
      .num_err {
        font-size: 0.4rem;
        font-weight: 600;
        color: red;
        position: absolute;
        bottom: 9%;
      }
    }
  }
}
</style>