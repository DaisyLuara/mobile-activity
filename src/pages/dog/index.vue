<template>
  <div class="report-wrap">
    <div class="photo-wrap">
      <!-- <img :src = "resultImgUrl" /> -->
      <img src = "http://ozwvqiu0u.bkt.clouddn.com/FvJDho0lyvIEhFNSMnFFz9P8hFg8" />
    </div>
     <div class="cover">
      <div class="prize-wrap">
        <div class="abs red-package">
          <img class="abs bg-red-package" :src="imgServerUrl + '/pages/win_prize/h5_red_bag.png'">
          <div class="abs title">恭喜你获得</div>
          <div class="abs subtitle">“要發”大红包</div>
          <!-- <img @click="openPrize()" class="abs btn-open" :src="imgServerUrl + '/pages/win_prize/h5_btn_open.png'"> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marketService from 'services/marketing'
const IMAGE_SERVER = process.env.IMAGE_SERVER + "/xingshidu_h5/marketing";

export default {
  data () {
    return {
      resultImgUrl: '',
      imgServerUrl: IMAGE_SERVER,
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
        console.log(result)
        this.resultImgUrl = result.result_img_url;
      }).catch(err => {
      console.log(err)
      })
      // this.$http.get(process.env.SAAS_API + "/open/play/playResults/" + recordId).then(result => {
      //   let data = result.data.data;
      //   console.log(data)
      //   this.resultImgUrl = data.result_img_url;
      // }).catch(err => {
      // console.log(err)
      // })
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
  .cover{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    margin: auto;
    // display: none;
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
        &.hide{
          display: none;
        }
        .bg-red-package{
          width: 90%;
          top: 20%;
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
        }
      }
    }
    
  }
}
</style>


