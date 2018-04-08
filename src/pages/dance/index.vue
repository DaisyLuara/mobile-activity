<template>
<div class="dance-content">        
    <img  class="light-wrap" :src="imgServerUrl + '/pages/dance/light_up.png'" >
    <!--标题-->
    <div  class="title">
        <img :src="imgServerUrl + '/pages/dance/title.png'" >
    </div>
    <div class="swiper-wrap">
    <!--按钮-->
     <div   id="btnLeftChange"class="swiper-button-prev" ></div>
      <div class="swiper-container">
        <swiper :options="swiperOption"  ref="mySwiper">
        <swiper-slide v-for="(item,index) in imgDate" :key="index" v-if="item.imgaUrl!=''">
          <img :src="imgServerUrl + '/pages/dance/frame.png'" >
         <img  class="gif_1" :src="imgServerUrl + item.imgaUrl" >
        </swiper-slide>
        <swiper-slide>
          <img :src="imgServerUrl + '/pages/dance/frame.png'" >
          <img class="gif_4" :src="imgServerUrl + '/pages/dance/red_packet.png'" >
        </swiper-slide>
          <!--<swiper-slide>
          <img :src="imgServerUrl + '/pages/dance/frame.png'" >
         
          <img class="gif_1" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" >
          </swiper-slide>
          <swiper-slide>
          <img :src="imgServerUrl + '/pages/dance/frame.png'" >
          
          <img class="gif_2" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" >
          </swiper-slide>
          <swiper-slide>
          <img :src="imgServerUrl + '/pages/dance/frame.png'" >
           
          <img class="gif_3" :src="imgServerUrl + '/pages/popcorn/Bronze.jpg'" >
          </swiper-slide>
          <swiper-slide>
          <img :src="imgServerUrl + '/pages/dance/frame.png'" >
          <img class="gif_4" :src="imgServerUrl + '/pages/dance/red_packet.png'" >
          </swiper-slide>-->
        </swiper>  
      </div>
          <!--按钮-->
          <div  id="btnChange" class="swiper-button-next"  ></div>
    </div>
    <!--舞台-->
    <div class="dance-stage">
        <img  class="stage" :src="imgServerUrl + '/pages/dance/stage.png'">
    </div>
    <div class="dance-light">
    <!--舞台灯光-->
        <img class="light1 animated fadeIn infinite" :src="imgServerUrl + '/pages/dance/light1.png'" v-if="showStar.showStarOne" >
        <img class="light2 animated fadeIn infinite" :src="imgServerUrl + '/pages/dance/light2.png'"  v-if="showStar.showStarTwo">
        <img class="light3 animated fadeIn infinite" :src="imgServerUrl + '/pages/dance/light3.png'"  v-if="showStar.showStarThree">
    </div>
    <!--小偶-->
    <div id="div1"></div>
    <div class="star-ornament" v-if="showStar.showStarThree">
       <!--星星-->
       <div class="star" >
        <img class="star1 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star1.png'">
        <img class="star2 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star1.png'">
        <img class="star3 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star1.png'">
        <img class="star4 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star1.png'">
        <img class="star5 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star1.png'">
        <img class="star6 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star1.png'">
       </div>
       <!--圆-->
       <div class="cicle">
        <img class="cicle1 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle2 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle3 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle4 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle5 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle6 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle7 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle8 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle9 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle10 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle11 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle12 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
        <img class="cicle13 animated fadeIn infinite":src="imgServerUrl + '/pages/dance/star2.png'">
    </div>
  </div>
  <!--微信分享-->
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
</div>
</template>
<script>
import marketService from 'services/marketing';
import WxShare from 'modules/wxShare';
import wxService from 'services/wx';
import parseService from 'modules/parseServer';
import { customTrack } from 'modules/customTrack';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Model from './Model'

const IMAGE_SERVER = process.env.IMAGE_SERVER + '/xingshidu_h5/marketing';

export default {
  components: {
    WxShare,
    swiper,
    swiperSlide
  },
  data() {
    return {
      pageSize: 0,
      img_01: this.$route.query.img_01,
      img_02: this.$route.query.img_02,
      img_03: this.$route.query.img_03,
      imgDate: [
        {imgaUrl: '/pages/popcorn/Bronze.jpg', flg:false},
        {imgaUrl: '/pages/popcorn/Bronze.jpg', flg:false},
        {imgaUrl: '/pages/popcorn/Bronze.jpg', flg:false},
        {imgaUrl: '', flg:false}
      ],
      showStar:{
        showStarOne:false,
        showStarTwo:false,
        showStarThree:false 
      },
      imgServerUrl: IMAGE_SERVER,
      resultImgUrl: '',
      //微信分享信息
      wxShareInfoValue: {
        title:'有颜有演技，免费爆米花送给你~',
        desc: '2018爆米花奥斯卡，等你来加戏。',
        imgUrl: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/wx_share_icon/dance_share_icon.jpg',
      },
      //控制swiper的效果
      swiperOption: {
          effect : 'cube',
          notNextTick: true,
          initialSlide:0,
       
          cubeEffect: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 80,
            shadowScale: 0.6
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          on: {
            slideChangeTransitionEnd:function (){
              //满足条件表示向右滑动
              if(this.swiper.activeIndex>=this.pageSize)
              {
                  if(this.swiper.activeIndex==3)
                {
                this.pageSize=4;
                }
                else{         
                this.pageSize++;
                if(this.imgDate[this.pageSize].imgaUrl==''||this.imgDate[this.pageSize].imgaUrl==null||this.imgDate[this.pageSize].imgaUrl==undefined)
                {
                this.pageSize++;
                //表示切换到最后一个不显示小偶
                }
                }
              }
              //向左滑动
              else{
              this.pageSize--;
              if(this.imgDate[this.pageSize].imgaUrl==''||this.imgDate[this.pageSize].imgaUrl==null||this.imgDate[this.pageSize].imgaUrl==undefined)
              {
              this.pageSize--;
              }
            }                                  
                
              this.showStar.showStarOne=false;
              this.showStar.showStarTwo=false;
              this.showStar.showStarThree=false;
              switch (this.swiper.activeIndex)
              { 
                case 0 :   
                    break; 
                case 1 :  this.showStar.showStarOne=true 
                    break; 
                case 2 :  this.showStar.showStarTwo=true 
                    break; 
                default : this.showStar.showStarThree=true 
                    break; 
              }
             console.log(this.pageSize);
                var model=new Model();
                model.loadModel(this.pageSize);
              }.bind(this)
            },    
        }
    };
  },
  beforeCreate() {
    document.title = '跳舞机';
  },
  mounted(){
    $('.dance-content').css('min-height', $(window).height());
    this.init();
    //this.gitGo();  
  },
  created() {
    //拿取图片id
    this.getImageById();
   },
  methods: {
    gitGo(){
        for(var i=0;i<this.imgDate.length;i++)
       {
         if(this.imgDate[i].imgaUrl!='' && this.imgDate[i].imgaUrl!=null&&this.imgDate[i].imgaUrl!=undefined){
         this.pageSize=i;
         break;
         }
       }
       console.log(this.pageSize);
      var model=new Model();
      model.loadModel(this.pageSize);
    },
    //拿取图片id
    getImageById() {
      let id = this.$route.query.id
      marketService.getInfoById(this, id).then((result) => {
        this.resultImgUrl = result.image;
      }).catch((err) => {
        console.log(err);
      });
    },
    async init() {
      try {
        await this.handleMapJsReady()
        await this.gitGo();  
      } catch (e) {
        console.log(e)
      }
    },
    
    //动态加载文件
    handleMapJsReady() {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = 'static/live2d3.0/js/utils/pixi.min.js'
        script.async = false
        document.head.appendChild(script)
        let layer1 = document.createElement('script')
        layer1.async = false
        layer1.src = 'static/live2d3.0/js/utils/live2dcubismcore.min.js'
        document.head.appendChild(layer1)
        let layer2 = document.createElement('script')
        layer2.async = false
        layer2.src = 'static/live2d3.0/js/utils/live2dcubismframework.js'
        document.head.appendChild(layer2)
        let layer3 = document.createElement('script')
        layer3.async = false
        layer3.src = 'static/live2d3.0/js/utils/live2dcubismpixi.js'
        document.head.appendChild(layer3)
        script.onload = () => {
          layer1.onload = () => {
            layer2.onload = () =>{ 
              layer3.onload = ()=>{
                  resolve();
              }
            }
          }
        }
      })
    }
  },
  computed: {
    //微信分享
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
    swiper() {
      console.log(this.$refs.mySwiper.swiper)
     return this.$refs.mySwiper.swiper
   }
  },
};

                
</script>

<style lang="less" scoped>

@imageHost: 'http://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/dance';
.dance-content{
    width:100%;
    background-image: url("@{imageHost}/back.jpg");
    background-size:auto;
    background-repeat: no-repeat;
    position: relative;
    overflow:hidden;
    img{
      width:100%;
    }
  .light-wrap{
    position:absolute;
    left:0;
    top:0;
    z-index:0;
  }
  .title{
    text-align:center;
    position: absolute;
    left: 0;
    top: 1.5%;
    z-index:1;
    img{
      width:80%
    }
  }
  .swiper-wrap{
    overflow:hidden;
    margin-top:30%;
    .swiper-container {
      padding:.5% 0;
      width:70%;
      height:68%;
      z-index:3;
     }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    .gif_1,.gif_2,.gif_3,.gif_4{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 86%;
      height: 91%;
      transform: translate(-50%,-50%);
    }
  }
  .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    background-image: url("@{imageHost}/arrow_R.png");
    background-size:50px 80px;
    right:1%;
    left: auto;
    width:50px;
    height:80px;
    margin-top:-20%;
   
    }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    background-image: url("@{imageHost}/arrow_L.png");
    background-size:50px 80px;
    left: 1%;
    left: auto;
    width:50px;
    height:80px;
    margin-top:-20%;
   
    }
  }
  .dance-stage{
    height:50%;
    text-align:center;
   
    .stage{
         //margin-right:2%;
          width:98%;
          position: absolute;
          left: 0;
          bottom: 0;
    }
}
.dance-light{
  text-align:center;
  .light1{
    position: absolute;
    left: 0%;
    bottom:-8.5%;
    z-index: 2;
   }
 .light2{
    position: absolute;
    left: 0%;
    bottom:-8.5%;
    z-index: 2;
 }
 .light3{
    position: absolute;
    left: 0%;
    bottom:-8.5%;
    z-index: 2;
    }
 }
 #div1{ 
    width:30%;
    height:25%;
    position: absolute;
    left: 56%;
    bottom:5%;
    transform: translate(-50%);
    z-index: 1;
    }
 .star-ornament{
    width:100%;
    height:40%;
    position:absolute;
    left:0;
    top:60%;
    img{
      width:10%;
      height:10%;
   }
  .star1{
    width: 22%;
    height: 35%;
    position: absolute;
    left: -2%;
    top: -15%;
      }
  .star2{
    width: 22%;
    height: 35%;
    position: absolute;
    left: -2%;
    top: 26%;
      }
  .star3{
    width: 22%;
    height: 35%;
    position: absolute;
    left: 15%;
    top: 62%;
  }
  .star4{
    width: 22%;
    height: 35%;
    position: absolute;
    left: 57%;
    top: 63%;
  }
  .star5{
    width: 22%;
    height: 35%;
    position: absolute;
    right: 0%;
    top: 28%;
  }
  .star6{
    width: 22%;
    height: 35%;
    position: absolute;
    left: 24%;
    top: 35%;
  }
  .cicle1{
    width: 12%;
    height: 15%;
    position: absolute;
    left: 24%;
    top: 43%;
  }
  .cicle2{
    width: 16%;
    height: 20%;
    position: absolute;
    left: 14%;
    top: 68%;
  }
  .cicle3{
    width: 11%;
    height: 15%;
    position: absolute;
    left: 6%;
    top: 53%;
  }
  .cicle4{
    width: 18%;
    height: 26%;
    position: absolute;
    left: -6%;
    top: 28%;
  }
  .cicle5{
    width: 6%;
    height: 10%;
    position: absolute;
    left: 2%;
    top: -4%;
  }
  .cicle6{
    width: 6%;
    height: 8%;
    position: absolute;
    left: 38%;
    top: 69%;
  }
  .cicle7{
    width: 10%;
    height: 12%;
    position: absolute;
    left: 59%;
    top: 75%;
  }
  .cicle8{
    width: 10%;
    height: 12%;
    position: absolute;
    left: 72%;
    top: 66%;
  }
  .cicle9{
    width: 6%;
    height: 8%;
    position: absolute;
    left: 83%;
    top: 71%;
  }
  .cicle10{
    width: 6%;
    height: 8%;
    position: absolute;
    left: 72%;
    top: 45%;
  }
  .cicle11{
    width: 18%;
    height: 26%;
    position: absolute;
    right: -2%;
    top: 48%;
  }
  .cicle12{
    width: 12%;
    height: 15%;
    position: absolute;
    right: 10%;
    top: 28%;
  }
  .cicle13{
    width: 6%;
    height: 8%;
    position: absolute;
    right: 4%;
    top: 24%;
  }
 }
}

@media screen and (max-width: 320px) { /*当屏幕尺寸小于320px时，应用下面的CSS样式*/
  // #div1 {
  //     top: 64%!important;      
  // }

}
@media screen and (min-width: 375px) { /*当屏幕尺寸小于375px时，应用下面的CSS样式*/
  // #div1 {
  //     top: 69%!important;       
  // }  
}
 @media screen and (min-width: 414px) { /*当屏幕尺寸小于414px时，应用下面的CSS样式*/
  // #div1 {
  //     top: 68%!important;      
  // } 
}




</style>
 
           


