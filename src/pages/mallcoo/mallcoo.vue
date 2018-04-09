<template>
	<div class="mallcoo-content" >
		<div class="quanMsg" v-if="pic_mid">
			你已获得：
			<ul>
				<li v-for="item in quanMsg">{{ item }}</li>
			</ul>
		</div>
		<div  class="quanClick" @click="getAuthorize" v-else>点击领取优惠券</div>
		<wx-share :WxShareInfo="wxShareInfo"></wx-share>
	</div>
</template>
<script>
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/'
import marketService from 'services/marketing'
import WxShare from 'modules/wxShare'
import wxService from 'services/wx'
import parseService from 'modules/parseServer'
import { customTrack } from 'modules/customTrack'

export default {
  components: {
    WxShare
  },
  data() {
    return {
      userMsg: '',
      mallMsg: '',
      abtn: 'true',
      hasMsg: 'false',
      isget: '点击领取优惠券',
      quanMsg: {
        MallName: null,
        CouponDesc: null
      },
      pic_mid: null,
      err: null,
      //授权链接
      //http://sapi.newgls.cn/api/mallcoo/user/oauth?redirect_url=
      //http://sapi.newgls.cn/api/mallcoo/coupon
      authorize_url: process.env.SAAS_API + '/mallcoo/user/oauth?redirect_url=',
      open_user_id: null,
      coupon_url: process.env.SAAS_API + '/mallcoo/coupon',
      //微信分享信息
      wxShareInfoValue: {
        title: '老虎机',
        desc: '猫酷平台获取券',
        imgUrl: ''
      },
      originUrl: null
    }
  },
  beforeCreate() {
    document.title = '老虎机'
  },
  created() {
    if (this.$route.query.open_user_id) {
      this.open_user_id = this.$route.query.open_user_id
      this.isFirstComeIn(this.$route.query.open_user_id)
      this.abtn = 'false'
      this.hasMsg = 'true'
    } else {
      this.abtn = 'true'
      this.hasMsg = 'false'
    }
  },
  mounted() {
    $('.mallcoo-content').css('min-height', $(window).height())
  },
  methods: {
    //点击事件
    isClick() {},
    //授权跳转
    getAuthorize() {
      let pageUrl = encodeURIComponent(window.location.href)
      this.$http.get(this.authorize_url + pageUrl).then(result => {
        let data = result.data
        window.location.href = data
        return
      })
    },
    //获取券信息
    getQuanMsg(coupon_num) {
      this.$http
        .get(this.coupon_url)
        .then(res => {
          //success
          let data = res.data
          let list = data.data
          this.quanMsg.CouponDesc = list[coupon_num].CouponDesc
          this.quanMsg.MallName = list[coupon_num].MallName
          this.pic_mid = list[coupon_num].PICMID
          this.getCoupon(
            this.$route.query.open_user_id,
            list[coupon_num].PICMID
          )
          console.log(coupon_num)
          console.log(res)
        })
        .catch(err => {
          this.err = '未获取到优惠券信息'
          console.log('未获取到优惠券信息')
        })
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
            let data = res.data
            this.isget = '你已获得：'
          },
          res => {
            //err
          }
        )
    },
    //从parseServer获取open_user_id,判断用户是否是新用户
    isFirstComeIn(open_id) {
      let query = {
        open_user_id: open_id
      }
      parseService
        .get(this, REQ_URL + 'maliao_mall?where=' + JSON.stringify(query))
        .then(data => {
          let results = data.results
          if (results.length) {
            this.getQuanMsg(1)
          } else {
            this.saveUserOpenId(open_id)
            this.getQuanMsg(0)
          }
        })
        .catch(err => {})
    },
    //存储open_user_id到parseServer
    saveUserOpenId(open_id) {
      let parms = {
        open_user_id: open_id
      }
      parseService
        .post(this, REQ_URL + 'maliao_mall', parms)
        .then(data => {
          //将open_user_id保存到parseServer的class，maliao_mall中
          console.log('已经将open_user_id保存到parseServer的maliao_mall中')
        })
        .catch(err => {})
    },
    //跳转操作
    linkToPath(result_url) {
      this.$router.push({
        path: result_url
      })
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
      return wxShareInfo
    }
  }
}
</script>
<style  lang="less" scoped>
.mallcoo-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  font-size: 16px;

  .quanMsg {
    width: 90%;
    margin: 15px auto;
    text-align: center;
    border: solid 1px red;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 20px;
    line-height: 40px;
    padding: 10px;
  }
  .quanClick {
    width: 90%;
    margin: 15px auto;
    text-align: center;
    border: solid 1px red;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 20px;
    line-height: 40px;
    padding: 10px;
  }
  .mallMsg {
    font-size: 20px;
    color: red;
    line-height: 30px;
  }
  .userMsg {
    font-size: 24px;
    color: #666;
    line-height: 30px;
  }
}
</style>