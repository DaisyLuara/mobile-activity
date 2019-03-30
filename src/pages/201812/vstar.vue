<template>
  <div 
    :style="bindStyle" 
    class="star-wrap">
    <img 
      :src="base + 'title.png'" 
      class="title abs" 
      alt>
    <img 
      :src="base + 'bg.jpg'" 
      class="bg" 
      alt>
    <div class="photo-wrap abs">
      <img 
        :src="currSelectedStar" 
        class="big-star abs" 
        alt>
      <img 
        :src="base + 'white_frame.png'" 
        class="white-frame" 
        alt>
      <swiper 
        ref="mySwiper" 
        :options="swiperOption" 
        class="photo-swiper abs">
        <template v-for="star in stars">
          <swiper-slide 
            :key="star.star_id" 
            class="swiper-item">
            <img 
              :src="base + 'frame.png'" 
              class="photo-frame" 
              alt>
            <img 
              :src="star.photo_url" 
              class="photo-img abs" 
              alt>
          </swiper-slide>
        </template>
      </swiper>
      <div class="swiper-nav abs">
        <div class="swiper-button-prev"/>
        <div class="swiper-button-next"/>
      </div>
      <img 
        :src="base + 'arrow_d.png'" 
        class="arrow-down abs" 
        alt>
      <img 
        :src="base + 'text.png'" 
        class="text abs" 
        alt>
      <div class="star-plate abs">
        <img 
          :src="base + 'unlight.png'" 
          class="unlight-star" 
          alt>
        <img 
          v-show="stars.length >= 12" 
          :src="base + 'center.png'" 
          class="center abs" 
          alt>
        <template v-for="star in stars">
          <img
            :class="'star-' + star.star_id"
            :src="base + 'light_star/'+ star.star_id + '.png'"
            :key="star.star_id"
            class="light-star abs"
            alt
          >
        </template>
      </div>
    </div>
    <img 
      :src="base + '/logo.png'" 
      class="logo abs" 
      alt>
    <div class="auth abs">本活动由星视度科技提供技术支持</div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { onlyWechatShare } from "@/mixins/onlyWechatShare";
import { getInfoById } from "services";
const cdnUrl = process.env.CDN_URL;
const parseUrl = process.env.PARSE_SERVER;
export default {
  components: {
    swiper,
    swiperSlide
  },
  mixins: [onlyWechatShare],
  data() {
    return {
      base: cdnUrl + "/fe/image/jinying/",
      openId: this.$route.query.open_id,
      stars: [],
      photo: "",
      currSlider: 0,
      currStar: parseInt(this.$route.query.star_id),
      currSelectedStar:
        cdnUrl +
        "/fe/image/jinying/big_star/" +
        this.$route.query.star_id +
        ".png",
      reqUrl: `${parseUrl}/parse/classes/star`,
      reqHeader: {
        headers: {
          "X-Parse-Application-Id": "jingfree_android",
          "X-Parse-Master-Key": "aa9YOWvTxxCY2RXT",
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      },
      wxShareInfoValue: {
        title: "十二星宝闹新春",
        desc: "2018相约金鹰，欢度新春",
        imgUrl: cdnUrl + "/fe/image/jinying/share-icon-star.jpg"
      },
      bindStyle: {
        minHeight: this.$innerHeight() + "px"
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    swiperOption() {
      let that = this;
      return {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChangeTransitionStart: function() {
            that.currSelectedStar = require(that.base +
              "big_star/" +
              that.stars[this.activeIndex].star_id +
              ".png");
          }
        }
      };
    }
  },
  watch: {
    currSlider: function(val) {
      setTimeout(() => {
        this.swiper.slideTo(val, 0, false);
      }, 0);
    }
  },
  created() {
    if (!this.openId) {
      alert("请先登录微信喔！");
      return;
    } else {
      this.getStarsByUserId();
    }
  },
  methods: {
    getStarsByUserId() {
      let searchArea = {
        open_id: this.openId
      };

      this.$http
        .get(
          this.reqUrl +
            "?where=" +
            JSON.stringify(searchArea) +
            "&order=star_id",
          this.reqHeader
        )
        .then(res => {
          if (res.data && res.data.results.length > 0) {
            // 找到
            this.stars = res.data.results;
          }
          getInfoById(this.$route.query.id)
            .then(r => {
              console.dir(r);
              this.photo = r.image;
              this.checkStar();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateStar(object_id) {
      let reqData = {
        photo_url: this.photo || ""
      };

      this.$http
        .put(this.reqUrl + "/" + object_id, reqData, this.reqHeader)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    addStar(star_id) {
      let reqData = {
        photo_url: this.photo,
        open_id: this.openId,
        star_id: parseInt(star_id)
      };

      this.$http
        .post(this.reqUrl, reqData, this.reqHeader)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    checkStar() {
      // 更新或保存星座点亮情况
      let flag = 0;
      for (let i = 0, length = this.stars.length; i < length; i++) {
        if (this.currStar == this.stars[i].star_id) {
          // 更新星座
          this.updateStar(this.stars[i].objectId);
          this.stars[i].photo_url = this.photo;
          this.currSlider = i;
          flag++;
          break;
        }
      }

      if (flag == 0) {
        this.addStar(this.currStar);
        let flag2 = -1;
        for (let i = 0, length = this.stars.length; i < length; i++) {
          if (this.currStar < parseInt(this.stars[i].star_id)) {
            flag2 = i;
            break;
          }
        }

        if (flag2 == -1) {
          this.stars.push({
            star_id: this.currStar,
            photo_url: this.photo,
            open_id: this.openId
          });
          this.swiper.update();
          this.currSlider = this.stars.length;
        } else {
          this.stars.splice(flag2, 0, {
            star_id: this.currStar,
            photo_url: this.photo,
            open_id: this.openId
          });
          this.currSlider = flag2;
        }
      }
    }
  }
};
</script>
<style lang="less">
@img: "https://cdn.xingstation.cn/fe/image/jinying";
.star-wrap {
  position: relative;
  img {
    width: 100%;
    max-width: 100%;
  }
  .bg {
    width: 100%;
  }
  .abs {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
  }
  .title {
    width: 98%;
    top: 10px;
  }
  .photo-wrap {
    top: 16%;
    width: 100%;
    .big-star {
      width: 22%;
      left: 7%;
      right: auto;
      top: -1%;
      z-index: 4;
    }
    .white-frame {
      width: 90%;
    }
    .photo-swiper {
      top: 3%;
      left: 15.5%;
      right: auto;
      width: 72%;
      .swiper-item {
        width: 100%;
        .photo-frame {
        }
        .photo-img {
          top: 5%;
          left: 8%;
          right: auto;
          width: 80%;
        }
      }
    }
    .swiper-nav {
      top: 35%;
      width: 100%;
      .swiper-button-prev {
        left: 10%;
        background-image: url("@{img}/arrow_l.png");
      }
      .swiper-button-next {
        right: 10%;
        background-image: url("@{img}/arrow_r.png");
      }
    }
    .arrow-down {
      top: 65%;
      width: 14%;
      z-index: 3;
    }
    .star-plate {
      width: 85%;
      top: 79%;
      .unlight-star {
        width: 100%;
      }
      .center {
        width: 28%;
        top: 35%;
        z-index: 12;
      }
      .light-star {
        &.star-1 {
          width: 40%;
          top: 28%;
          left: 0;
          right: auto;
        }
        &.star-2 {
          top: 10%;
          left: 11%;
          width: 34%;
          right: auto;
        }
        &.star-3 {
          top: 0%;
          left: 29%;
          width: 22%;
          right: auto;
        }
        &.star-4 {
          top: 0;
          left: 50%;
          width: 22%;
          right: auto;
        }
        &.star-5 {
          top: 10%;
          right: 9%;
          width: 35%;
          left: auto;
        }
        &.star-6 {
          right: 0;
          top: 29%;
          width: 40%;
          left: auto;
        }
        &.star-7 {
          width: 41.5%;
          right: 0;
          left: auto;
          top: 49%;
        }
        &.star-8 {
          width: 35%;
          top: 54%;
          right: 11%;
          left: auto;
        }
        &.star-9 {
          width: 22%;
          right: 29%;
          left: auto;
          bottom: 0%;
        }
        &.star-10 {
          left: 29%;
          width: 21%;
          bottom: 1%;
          right: auto;
        }
        &.star-11 {
          left: 11%;
          width: 34%;
          right: auto;
          bottom: 11%;
        }
        &.star-12 {
          left: 0%;
          width: 40%;
          right: auto;
          bottom: 29%;
        }
      }
    }
    .text {
      top: 73%;
      width: 65%;
      z-index: 3;
    }
  }
  .logo {
    top: 88%;
    width: 53%;
  }
  .auth {
    top: 96%;
    font-size: 14px;
    color: #fff;
  }
}
</style>