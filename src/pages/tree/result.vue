<template>
  <div class="greenlife-content">
    <div class="user">
      <img :src="imgServerUrl + '/people.png'" class="cover"/>
      <img :src="head_img_url" id="userImg"/>
      <p class="userName">{{nick_name}}</p>
    </div>
    <div class="showtree">
      <img class="word" id="tip1" :src="imgServerUrl + '/tip1.png'" alt="" v-show="ashow"/>
      <img class="word" id="tip2" :src="imgServerUrl + '/tip2.png'" alt="" v-show="bshow"/>
      <div class="trees" id="treeDiv" ref="element"></div>
    </div>
    <img class="titnote clearfix" :src="imgServerUrl + '/board.png'">
    <div class="lockgroup">
      <ul class="locks clearfix">
        <li :class="{locked:locked1}"><img :src="imgServerUrl + '/step1.png'"></li>
        <li><img :src="imgServerUrl + '/csun.png'"></li>
        <li :class="{locked:locked2}"><img :src="imgServerUrl + '/step2.png'"></li>
        <li><img :src="imgServerUrl + '/cwater.png'"></li>
        <li :class="{locked:locked3}"><img class="maxHeight"  :src="imgServerUrl + '/step3.png'"></li>
        <li><img :src="imgServerUrl + '/cgift.png'"></li>
      </ul>
      <a :href="giftUrl" :class="{agift:true,'locked':locked4}"><img :src="imgServerUrl + '/gift.png'"></a>
      <img class="tag" :src="imgServerUrl + '/tag.png'" v-show="tagshow"/>
    </div>
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
  </div>
</template>
<script>
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import wxService from 'services/wx';
import { customTrack } from 'modules/customTrack';
import Pixi from  './pixi.js';
import Spine from  './pixi-spine.js';

export default {
  components: {
    WxShare,
  },
  data() {
    return {
      imgServerUrl: 'http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife',
      giftUrl: 'javascript:void(0)',
      nick_name:'',
      head_img_url:'',
      wx_openid:'',
      placeUrl:{
        '27':'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D',//虹口龙之梦
        '235':'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D',//虹口龙之梦
        '234':'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D',//虹口龙之梦
        '233':'https://mall.capitaland.com.cn/qibao/lottery/egg?id=F95FA6A17E920423',//七宝
        '232':'https://mall.capitaland.com.cn/qibao/lottery/egg?id=F95FA6A17E920423',//七宝
        '231':'https://mall.capitaland.com.cn/LZMmh/lottery/egg?id=AE93BAC25DC90BBD',//闵行龙之梦
        '230':'https://mall.capitaland.com.cn/LZMmh/lottery/egg?id=AE93BAC25DC90BBD',//闵行龙之梦
        '229':'https://mall.capitaland.com.cn/LZMmh/lottery/egg?id=AE93BAC25DC90BBD',//闵行龙之梦
        '228':'https://mall.capitaland.com.cn/sh_rafflescity/lottery/egg?id=70910977F879C80E',//上海来福士
        '21':'https://mall.capitaland.com.cn/RCC/lottery/egg?id=A2BB2EE7E59B25A6',//长宁来福士
        '20':'https://mall.capitaland.com.cn/RCC/lottery/egg?id=A2BB2EE7E59B25A6',//长宁来福士
        '30':'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D',//测试链接
        '31':'https://mall.capitaland.com.cn/hongkoulongzhimeng/lottery/egg?id=41D47A1728D82E6D'//开发链接
      },
      ashow:false,
      bshow:false,
      locked1:true,
      locked2:true,
      locked3:true,
      locked4:true,
      tagshow:false,
      width:'',
      height:'',
      winWidth:'',
      animation:null,
      num:null,
      pos:null,
      phoneError: false,
      treeData:null,
      //微信分享信息
      wxShareInfoValue: {
        title: '凯德绿享新生活~',
        desc: '争当森林小卫士',
        imgUrl: 'http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/icon.jpg'
      },
      renderer: null,
      stage: null,
    };
  },
  beforeCreate() {
    document.title = '凯德绿享新生活';
  },
  mounted(){
    console.log(11111);
    $('.greenlife-content').css('min-height', $(window).height());
    $('.showtree').css('height', $('.greenlife-content').height()*0.66);
    $('.lockgroup').css('min-height', $('.greenlife-content').height()*0.34);
    $('.locks > li').css({'height':$('.lockgroup').height()*0.45,'lineHeight':$('.lockgroup').height()*0.45+'px'});
    this.width=this.$refs.element.offsetWidth;
    this.height=this.$refs.element.offsetHeight;
    this.winWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.getInfoById();
  },
  created() {
    console.log(this.$route)
    // this.getInfoById();
    if(this.$route.query.nick_name){
      this.nick_name=this.$route.query.nick_name;
      this.head_img_url=this.$route.query.head_img_url;
    }else{
      console.log("aaa")
      // this.getUserInfo();
    }
    this.pushHistory();
  },
  methods: {
    getUserInfo() {
      // if(this.$route)
      wxService.getWxUserInfo(this).then(result => {
        // console.log(result)
        let data = result.data
        this.nick_name = data.nickname;
        this.head_img_url = data.headimgurl;
        this.wx_openid = data.openid;
      }).catch(err => {
        let pageUrl = encodeURIComponent(window.location.href)
        let wx_auth_url = process.env.WX_API + '/wx/officialAccount/oauth?url=' + pageUrl + '&scope=snsapi_userinfo';
        window.location.href = wx_auth_url;
        return;
      })
    },
    getValueByName(parms,strings){
      let string=strings.split('&');
      for(var i=0;i<string.length;i++){
          var equal=string[i].split("=");
          if(parms==equal[0]){
            return equal[1];
          }
      }
    },
    getInfoById() {
    	let id = this.$route.query.id;
	    marketService.getInfoById(this,id).then((res) => {
	        this.num=this.getValueByName("num",res.parms);
	        this.pos=this.getValueByName("pos",res.parms);
          console.log(this.num+"&"+this.pos)
	        this.init(this.num,this.pos)
          console.log(res.parms)
	    }).catch((err)=>{
	        console.log(err)
	        return;
	    });
    },
    init(num,pos) {
      this.renderer = new PIXI.CanvasRenderer(this.width, this.height);
      document.getElementById("treeDiv").appendChild(this.renderer.view);
      this.stage = new PIXI.Container();
      let that=this;
       PIXI.loader.add('spineCharacter', 'http://p22vy0aug.bkt.clouddn.com/spine/greenlife/treeH5.json')
                  .load(function (loader, resources) {
                      that.animation= new PIXI.spine.Spine(resources.spineCharacter.spineData);
                      that.stage.addChild(that.animation);
                      that.animation.state.addAnimationByName(0, num, true, 0);
                      that.animation.x = that.width/2+5;
                      that.animation.y = that.height*7/8;
                      that.animation.scale.x = that.winWidth*0.9/750;
                      that.animation.scale.y = that.winWidth*0.9/750;
                      that.animate();
                      console.log("that.num="+num)
       })

       if(num=='1'){
          this.ashow=true;
          this.bshow=false;
          this.locked1=false;
        }
        if(num=='2'){
          this.ashow=false;
          this.bshow=true;
          this.locked1=false;
          this.locked2=false;
        }
        if(num=='3'){
          this.ashow=false;
          this.bshow=false;
          this.locked1=false;
          this.locked2=false;
          this.locked3=false;
          this.locked4=false;
          this.giftUrl=this.placeUrl[pos];
          this.tagshow=true;
        }
    },
    animate(){
      requestAnimationFrame(this.animate);
      this.renderer.render(this.stage);
    },
     pushHistory() {
        let pageUrl = window.location.href;
        let state = {
          title: 'title',
          url: pageUrl
        };
        window.history.pushState(state, 'title', pageUrl);
      }
  },
  computed: {
    //微信分享
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        link: this.$route.query.nick_name ? window.location.href : window.location.href+'&nick_name='+this.nick_name+'&head_img_url='+this.head_img_url,
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
@imageHost: 'http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife';
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.claerfix{
  overflow: hidden;
  clear: both;
}
@media screen and (min-width: 320px) {
    html {font-size: 14px;}
}

@media screen and (min-width: 360px) {
    html {font-size: 16px;}
}

@media screen and (min-width: 400px) {
    html {font-size: 18px;}
}

@media screen and (min-width: 440px) {
    html {font-size: 20px;}
}

@media screen and (min-width: 480px) {
    html {font-size: 22px;}
}

@media screen and (min-width: 640px) {
    html {font-size: 28px;}
}
.greenlife-content{
  width:100%;
  overflow-x: hidden;
  transform: translate3d(0,0,0);
  -webkit-overflow-scrolling:touch;
  text-align: center;
  background-image: url("@{imageHost}/title.png"),url("@{imageHost}/leaf1.png"),url("@{imageHost}/leaf2.png");
  background-size: 62% auto,100% auto,100% auto;
  background-repeat:no-repeat,no-repeat,no-repeat;
  background-position:center 6%,center top,center bottom;
  background-color:#030d01;
    .user{
      position: absolute;
      right:0;
      top:5.5%;
      width:26vw;
      z-index: 9999;
      .cover{
        width:100%;
        position: relative;
        z-index: 999;
      }
      #userImg{
        position: absolute;
        border-radius:50%;
        width:16vw;
        left:26%;
        top:26%;
        z-index: 9;

      }
      .userName{
        position: absolute;
        bottom: 17%;
        right:6%;
        z-index: 9999;
        //width:19vw;
        width:100%;
        height:1.3rem;
        font-size: 0.7rem;
        line-height: 1.3rem;
        color:#f3f1ef;
        text-align: center;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left:32%;
        padding-right:5%;
      }
    }

  .showtree{
    position: relative;
    width:100vw;
    //height:66vh;
    background-image: url("http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/leaf3.png"),url("http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/barrierleft.png"),url("http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/barrier.png"),url("http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/logo.png"),url("http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/grass.png");
    background-size: 100% auto,22% auto,22% auto,22% auto,100% auto;
    background-repeat:no-repeat,no-repeat,no-repeat,no-repeat,no-repeat;
    background-position: center bottom,left 93%,right 93%,7% 82%,center 93%;
    .word{
      position: absolute;
      width:30.5vw;
      z-index: 999;
    }
    #tip1{
      top:52.4%;
      right:8vw;
    }
    #tip2{
      top:52.4%;
      right:10vw;
    }
    #treeDiv{
      width:80vw;
      height:54.6%;
      position: absolute;
      top:35%;
      left: 50%;
      transform:translate(-50%,0);
      background-image: url("http://p22vy0aug.bkt.clouddn.com/image/kaidegreenlife/glitz.png");
      background-position: center 0px;
      background-size:100% auto;
      background-repeat: no-repeat;
    }
  }
  .titnote{
    position: relative;
    width:51.5vw;
    margin-top:-5%;
    margin-left:1%;
    float: left;
    z-index: 9999;
  }
  .lockgroup{
    width:100%;
    text-align: center;
    padding:0;
    ul{
      list-style: none;
      display: inline-block;
      width:95vw;
      margin:0 auto;
    }
    ul li{
      list-style: none;
      display: inline-block;
      float: left;
      position: relative;
      width:18vw;
      //min-height:13vh;
      //line-height: 13vh;

      &:nth-child(odd){
        position: relative;
        z-index: 9;
        img{
          max-width:100%;
          vertical-align: middle;
        }
      }
      &:nth-child(even){
        position: relative;
       // transform:translate(0,-25%);
        margin:0 1%;
        z-index: 999;
        img{
          max-width:90%;
          vertical-align: middle;
          margin:auto auto;
        }
      }
      &:last-child{
        float: right;
        margin-right:18%;
        margin-top:-3%;
      }
    }
    .locked{
      &:after{
          content:'';
          width:100%;
          height:110%;
          position: absolute;
          left:0;
          bottom:0;
          background-color: #030d01;
          opacity: 0.7;
          z-index: 9999;
        }
    }
    .agift{
      display: inline-block;
      position: relative;
      z-index: 9;
      width:35vw;
      margin-top:-19%;
      img{
        max-width:100%;
        width:100%;

      }
    }
    .tag{
      position: absolute;
      width:29.1vw;
      z-index: 9999;
      left:8vw;
      transform:translate(0,-145%);
    }
  }
}
</style>


