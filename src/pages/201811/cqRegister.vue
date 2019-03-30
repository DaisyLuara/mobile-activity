<template>
  <div
    :style="style.root"
    class="content"
  >
    <div class="head">
      <img :src="base + 'logo.png'">
    </div>
    <div class="form-data">
      <ul>
        <li class="line">
          <label>姓名</label>
          <input
            id="name"
            v-model="people.name"
            type="text"
            placeholder="请输入姓名"
          >
        </li>
        <li class="line">
          <label for="year">年龄</label>
          <input
            id="year"
            v-model="people.year"
            type="number"
            placeholder="请输入年龄"
          >
        </li>
        <li>
          <label for="sex">性别</label>
          <div
            :class="{'sex-radio':true,checked:male}"
            @click="()=>{ male = true; female = false; people.sex = 0;}"
          >
            <span />男
          </div>
          <div
            :class="{'sex-radio':true,checked:female}"
            @click="()=>{ male = false; female = true; people.sex = 1;}"
          >
            <span />女
          </div>
        </li>
        <li class="line">
          <label>手机</label>
          <input
            id="mobile"
            v-model="people.mobile"
            type="number"
            placeholder="请输入手机号码"
          >
        </li>
        <li class="line">
          <label>居住小区</label>
          <input
            id="address"
            v-model="people.address"
            type="text"
            placeholder="请输入小区"
          >
        </li>
      </ul>
    </div>
    <button
      class="sub"
      @click="postData"
    >
      <img :src="base + 'done.png'">
    </button>
  </div>
</template>
<script>
import {
  $wechat,
  wechatShareTrack,
  isInWechat,
  Cookies,
  userData,
  handleDataPost
} from 'services'
import { normalPages } from '@/mixins/normalPages'
const BASE_URL = process.env.CDN_URL
export default {
  mixins: [normalPages],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: BASE_URL + '/fe/image/cangqian/',
      people: {
        name: null,
        year: null,
        sex: 0,
        mobile: null,
        address: null
      },
      male: true,
      female: false,
      userId: null,
      //微信分享
      wxShareInfoValue: {
        title: '仓前街道市民客厅',
        desc: '微笑转递',
        link: 'http://papi.xingstation.com/api/s/MQ3' + window.location.search,
        imgUrl: BASE_URL + '/fe/image/cangqian/icon.png',
      }
    }
  },
  mounted() {
    //微信授权
    if (isInWechat() === true) {
      if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'testing'
      ) {
        this.handleWechatAuth()
      }
    }
  },
  methods: {
    //微信静默授权
    handleWechatAuth() {
      if (Cookies.get('sign') === null) {
        let base_url = encodeURIComponent(String(window.location.href))
        let redirct_url =
          process.env.WX_API +
          '/wx/officialAccount/oauth?url=' +
          base_url +
          '&scope=snsapi_base'
        window.location.href = redirct_url
      } else {
        this.userId = Cookies.get('user_id')
      }
    },
    postData() {
      let reg = /^1[3|4|5|6|7|8][0-9]{9}$/
      let that = this
      if (!this.people.name) {
        alert('请输入姓名！')
        return
      }
      if (!this.people.year) {
        alert('请输入年龄！')
        return
      }
      if (this.people.year < 0) {
        alert('请输入合法年龄！')
        return
      }
      if (!reg.test(that.people.mobile)) {
        alert('请输入11位有效的手机号码')
        return
      }
      if (!this.people.address) {
        alert('请输入居住小区！')
        return
      }
      console.log(this.people)
      let args = {
        name: this.people.name,
        mobile: this.people.mobile,
        address: this.people.address,
        age: this.people.year,
        gender: this.people.sex,
        oid: this.oid,
        belong: this.belong
      }
      userData(args)
        .then(res => {
          console.log(res)
          alert('注册成功！')
          that.handlePost()
        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 422) {
            alert('手机号码被占用')
          }
        })
    },
    handlePost() {
      let id = this.$route.query.id
      let url = 'oid=' + this.oid + '&belong=' + this.belong + '&id=' + id + '&api=json'
      handleDataPost(url).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@base: "http://cdn.xingstation.cn/fe/image/cangqian/";
/*声明 WebFont*/
@font-face {
  font-family: "zhehei";
  src: url("@{base}zhehei.ttf");
  src: url("@{base}zhehei.eot"), url("@{base}zhehei.woff"),
    url("@{base}zhehei.ttf"), url("@{base}zhehei.svg");
  font-weight: normal;
  font-style: normal;
}
html,
body {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}
* {
  padding: 0;
  margin: 0 auto;
  text-align: center;
}
img {
  max-width: 100%;
  pointer-events: none;
  user-select: none;
}
a {
  display: inline-block;
}
.content {
  width: 100%;
  overflow-x: hidden;
  background-color: #fbfbfb;
  position: relative;
  .head {
    width: 100%;
    position: relative;
    background-color: #434343;
    img {
      width: 23.5%;
      margin-top: 8%;
      margin-bottom: 7%;
    }
  }
  .form-data {
    font-family: "zhehei";
    width: 69%;
    margin-top: 8%;
    ul,
    li {
      width: 100%;
      display: inline-block;
      position: relative;
    }
    ul {
      li {
        overflow: hidden;
        text-align: left;
        margin-top: 7%;
        label {
          font-size: 22px;
          float: left;
          vertical-align: text-bottom;
        }
        input {
          color: #aeaeae;
          font-size: 14px;
          display: inline-block;
          height: 22px;
          line-height: 22px;
          // float: left;
          text-align: left;
          font-family: "Microsoft YaHei";
          letter-spacing: 1px;
          padding-left: 10px;
          cursor: pointer;
          &::placeholder {
            color: #aeaeae;
          }
        }
        .sex-radio {
          display: inline-block;
          font-size: 22px;
          margin-left: 15px;
          margin-right: 10px;
          position: relative;
          span {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: solid 2px #434343;
            vertical-align: baseline;
            margin-right: 2px;
            border-radius: 50%;
            position: relative;
            z-index: 99;
            transform: translateY(2px);
          }
        }
        .checked {
          span {
            &:after {
              content: " ";
              width: 10px;
              height: 10px;
              background-color: #fdbc3c;
              border-radius: 50%;
              position: absolute;
              top: 2px;
              left: 2px;
              z-index: 0;
            }
          }
        }
      }
      .line {
        &:after {
          content: " ";
          width: 100%;
          height: 2px;
          border-bottom: solid 2px #434343;
          position: absolute;
          bottom: 2px;
          left: 0;
        }
      }
    }
  }
  .sub {
    width: 75%;
    border: none;
    background: none;
    margin-top: 12%;
  }
}
</style>

