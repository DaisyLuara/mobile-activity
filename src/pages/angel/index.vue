<template>
  <div class="angel-wrap">
    <img class="bg" :src="IMAGE_SERVER + 'bg.png'" alt="">
    <img class="slogan abs" :src="IMAGE_SERVER + 'slogan.png'" alt="">
    <div class="img-wrap abs">
      <div :class="{'white': angel.img_type == 'white', 'black': angel.img_type == 'black'}" class="angel-container" v-for="angel in user_result" v-bind:key="angel.img_id">
        <img v-if="angel.img_type =='white'" class="frame frame-on" :src="IMAGE_SERVER + 'frame_on.png'" alt="">
        <img v-if="angel.img_type == 'black'" class="frame frame-off" :src="IMAGE_SERVER + 'frame_off.png'" alt="">

        <img class="lock abs" v-if="angel.img_type =='white' && !angel.img_id" :src="IMAGE_SERVER + 'lock_on.png'" alt="">
        <img class="lock abs" v-if="angel.img_type =='black' && !angel.img_id" :src="IMAGE_SERVER + 'lock_off.png'" alt="">
        <div v-if="!angel.img_id" class="cover abs"></div>
        <div class="img-container abs">
          <img v-if="!angel.img_id && angel.img_type == 'black'" class="img-example" :src="IMAGE_SERVER + 'b_angel.png'" alt="">
          <img v-if="!angel.img_id && angel.img_type == 'white'" class="img-example" :src="IMAGE_SERVER + 'w_angel.png'" alt="">
          <img class="img" :src="angel.img_url" alt="">
        </div>
      </div>
    </div>
    <div class="num-wrap abs">
      <div class="num-container" :class="{'white': angel.img_type == 'white', 'black': angel.img_type == 'black'}" v-for="angel in user_result" v-bind:key="angel.img_id">
        <img v-if="angel.img_type == 'white'" :src="IMAGE_SERVER + 'tianmei.png'" alt="">
        <img v-if="angel.img_type == 'black'" :src="IMAGE_SERVER + 'gaoleng.png'" alt="">
        <span :class="{'white': angel.img_type =='white', 'black': angel.img_type == 'black'}" class="abs num">{{angel.num ? angel.num : '0'}}</span>
      </div>
    </div>
    <img v-if="show_btn" class="abs btn-join" @click="join" :src="IMAGE_SERVER + 'btn.png'" alt="">
    <img v-if="!show_btn" class="abs result-join" :src="join_img_url" alt="">
  </div>
</template>
<script>
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";
const REQ_URL = 'http://120.27.144.62:1337/parse/classes/';
import { customTrack } from 'modules/customTrack'
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare.vue'
import wxService from 'services/wx'
import parseService from 'modules/parseServer'
export default {
  data(){
    return{
      IMAGE_SERVER: IMAGE_SERVER + '/pages/angel/',
      img_type: this.$route.query.img_type,
      img_id: this.$route.query.id,
      img_url: this.$route.query.img_url,
      num: this.$route.query.num,
      sex: this.$route.query.sex, //用户性别
      open_id: '',
      show_btn: false,
      user_info: {
        nick_name: '',
        head_img_url: '',
        wx_openid: 'zjj'
      },
      join_img_url: '',
      join_rule: [['86','92'],['86','84'],['92','84'],['63','75'],['63','58'],['75','58'],['46','32'],['46','38'],['32','38']],
      user_result: [{},{}]
    }
  },
  beforeCreate() {
    document.title = '黑白天使';
  },
  mounted() {
    $('.angel-wrap').css('min-height', $(window).height());
  },
  created() {
    if(!this.img_id){
      alert("没有找到您的图片哦，请重新和大屏进行互动拍照~");
      return;
    }
    if(!this.img_type){
      alert("没有找到本次活动的类型，请到指定的黑白天使屏幕进行拍摄哦~");
      return;
    }
    if(!this.num){
      alert("咦，没有找到您的钻石颗数哦，请重新和大屏进行互动拍照~");
    }
    // wxService.getWxUserInfo(this).then(result => {
    //   let data = result.data
    //   this.user_info.nick_name = data.nickname;
    //   this.user_info.head_img_url = data.headimgurl;
    //   this.user_info.wx_openid = data.openid;
    //   this.checkCurStatus();
    // }).catch(err => {
    //   let pageUrl = encodeURIComponent(window.location.href)
    //   let wx_auth_url = process.env.WX_API + '/wx/officialAccount/oauth?url=' + pageUrl + '&scope=snsapi_userinfo';
    //   window.location.href = wx_auth_url;
    //   return;
    // })
    this.checkCurStatus();
  },
  methods: {
    getImgUrl() {
      marketService.getImageById(this, this.img_id).then((result) => {
        this.img_url = result.result_img_url;
      }).catch((err) => {
        console.log(err);
      });
    },
    getWxUserResult() {
      let query = {
        open_id: this.user_info.wx_openid
      }
      parseService.get(this, REQ_URL + 'angel?where=' +  JSON.stringify(query))
      .then(data => {
        this.user_result = data.results || [{},{}];
        if(this.user_result.length == 1){
          this.user_result.push({});
          if(this.user_result[0].img_type == 'white'){
            this.user_result[1].img_type = 'black';
          }else{
            this.user_result[1].img_type = 'white';
          }
        }
        this.creatJoinImgUrl();
      }).catch(err => {
      })
    },
    checkCurStatus() {
      let query = {
        img_id: this.img_id
      }
      parseService.get(this, REQ_URL + 'angel?where=' + JSON.stringify(query)).then(data => {
        console.log(data)
        if(data.results && data.results.length){
          // 找到相同img_id判断是否为当前用户的图片
          if(data.results[0].open_id != this.user_info.wx_openid){
            this.user_info.wx_openid = data.results[0].open_id;
            this.getWxUserResult();
          }else{
            this.show_btn = true;
            this.checkCurTypeImg();
          }
        }
      })
    },
    checkCurTypeImg() {
      let query = {
        img_type: this.img_type,
        open_id: this.user_info.wx_openid
      }
      parseService.get(this, REQ_URL + 'angel?where=' +  JSON.stringify(query) + '&limit=1')
      .then(data => {
        if(!data.results){
          return;
        }
        if(data.results.length){
          // 不同的图片，则更新
          if(data.results[0].img_id != this.img_id){
            this.updateCurTypeImg(data.results[0]);
          }else{
            this.getWxUserResult();
          }
          return;
        }else{
          this.addCurTypeImg();
        }
      })
      .catch(err => {
        console.log(err)
      })

    },
    addCurTypeImg() {
      // 获取图片url存入数据库
      // marketService.getImageById(this, this.img_id).then((result) => {
        // this.img_url = result.result_img_url;
        let params = {
          img_id: this.img_id,
          open_id: this.user_info.wx_openid,
          img_type: this.img_type,
          num: this.num,
          img_url: this.img_url
        }

        parseService.post(this, REQ_URL + 'angel', params).then(res => {
          // 获取最新数据进行展示
          this.getWxUserResult();
        }).catch(err => {
          console.log(err)
        });
      // }).catch((err) => {
        // console.log(err);
      // });
    },
    updateCurTypeImg(data){
      // marketService.getImageById(this, this.img_id).then((result) => {
        // this.img_url = result.result_img_url;
        // 更新类型图片
        let params = {
          img_url: this.img_url,
          num: this.num,
          img_id: this.img_id
        }
        parseService.put(this, REQ_URL + 'angel/' + data.objectId, JSON.stringify(params))
        .then(res => {
          // 获取最新数据进行展示
          this.getWxUserResult();
        }).catch(err => {})
      // }).catch((err) => {
        // console.log(err);
      // });
    },
    creatJoinImgUrl(){
      if(!this.user_result[0].img_id || !this.user_result[1].img_id){
        return;
      }

      if(this.sex == 'male'){
        this.join_img_url = this.IMAGE_SERVER + 'unknow.png';
        return;
      }

      let w_num = '', b_num = '';

      for(let i = 0, length = this.user_result.length; i < length; i++){
        if(this.user_result[i].img_type == 'white'){
          w_num = this.user_result[i].num;
        }
        if(this.user_result[i].img_type == 'black'){
          b_num = this.user_result[i].num;
        }
      }

      if(b_num == w_num){
        this.join_img_url = this.IMAGE_SERVER + 'baibian.png';
        return;
      }

      let rule = this.join_rule.find( i => {
        if(i[0] == b_num && i[1] == w_num){
          return true;
        }
      })

      if(rule){
        this.join_img_url = this.IMAGE_SERVER + 'baibian.png';
        return;
      }

      if(b_num > w_num){
        this.join_img_url = this.IMAGE_SERVER + 'gugao.png';
        return;
      }

      if(b_num < w_num){
        this.join_img_url = this.IMAGE_SERVER + 'gaogui.png';
        return;
      }
    },
    join(){
      if(!this.user_result[0].img_id || !this.user_result[1].img_id){
        alert("还差一个照片即可合成女神哦~");
        return;
      }
      this.show_btn = false;
    }
  }
}
</script>
<style lang="less" scoped>
.angel-wrap{
  position: relative;
  .abs{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    margin: 0 auto;
  }
  .slogan{
    top: -3%;
    width: 100%;
  }
  .img-wrap{
    top: 26%;
    width: 90%;
    .frame{
      position: relative;
      z-index: 3;
    }
    .lock{
      top: 0;
      z-index: 4;
    }
    .cover{
      height: 94%;
      top: 3%;
      background-color: rgba(0,0,0,.5);
      z-index: 2;
      width: 90%;
    }
    .angel-container{
      position: relative;
      width: 50%;
      &.white{
        float: left;
      }
      &.black{
        float: right;
      }
      .img-container{
        top: 3%;
        width: 92%;
      }
    }

  }
  .num-wrap{
    width: 90%;
    top: 57%;
    .num-container{
      position: relative;
      &.white{
        width: 50%;
        float: left;
      }
      &.black{
        width: 50%;
        float: right;
      }
      .num{
        font-size: 23px;
        color: #fff;
        top: 50%;
        &.black{
          left: 47%;
          right: initial;
        }
        &.white{
          right: 37%;
          left: initial;
        }
      }
    }
  }
  .btn-join{
    top: 70%;
    width: 60%!important;
  }
  .result-join{
    top: 70%;
  }
}
</style>
