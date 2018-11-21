<template>
  <div
    :style="style.root"
    class="content">
    <div 
      class="head">
      <img
        :src="base + 'logo.png'">
    </div>
    <div
      class="form-data">
      <ul>
        <li><label for="name">姓名</label><input name="name" id="name" placeholder="请输入姓名"></li>
        <li><label for="year">年龄</label><input name="year" id="year" placeholder="请输入年龄"></li>
        <li><label for="sex">性别</label><div class="radio-group">
        <input type="radio" name="sex" value="male" />男 
        <input type="radio" name="sex" value="female" />女 </div></li>
        <li><label for="name">手机</label><input name="name" id="name" placeholder="请输入手机号码"></li>
        <li><label for="name">居住小区</label><input name="name" id="name" placeholder="请输入小区"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { $wechat, wechatShareTrack, isInWechat } from 'services'
import { onlyWechatShare } from '../../mixins/onlyWechatShare'
const BASE_URL = process.env.CDN_URL
export default {
  mixins: [onlyWechatShare],
  data() {
    return {
      style: {
        root: {
          'min-height': this.$innerHeight() + 'px'
        }
      },
      base: BASE_URL + '/fe/image/cangqian/',
      people: {
        name: {}
      },
      //微信分享
      wxShareInfoValue: {
        title: '仓前街道市民客厅',
        desc: '微笑转递',
        link: 'http://papi.xingstation.com/api/s/MQ3' + window.location.search,
        imgUrl: BASE_URL + '/fe/image/cangqian/icon.png',
        success: () => {
          wechatShareTrack()
        }
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
@base: 'http://cdn.exe666.com/fe/image/cangqian/';
/*声明 WebFont*/
@font-face {
  font-family: 'zhehei';
  src: url('@{base}zhehei.ttf');
  src: url('@{base}zhehei.eot'), url('@{base}zhehei.woff'),
    url('@{base}zhehei.ttf'), url('@{base}zhehei.svg');
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
    font-family: 'zhehei';
    width: 69%;
    margin-top: 10%;
    ul,
    li {
      width: 100%;
      display: inline-block;
    }
    ul {
      li {
        overflow: hidden;
        text-align: left;
        margin-top: 5%;
        border-bottom: solid 2px #434343;
        label {
          font-size: 24px;
          float: left;
          vertical-align: text-bottom;
        }
        input {
          font-size: 16px;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          float: left;
          text-align: left;
        }
      }
    }
  }
}
</style>

