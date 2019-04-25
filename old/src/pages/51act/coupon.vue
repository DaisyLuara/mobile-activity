<template>
  <!-- eslint-disable -->
  <div 
    :class="{'pop': this.control.pop}"
    class="coupon-root">
    
    <!-- bg -->
    <img
      :src="this.baseUrl + 'bg.jpg'" 
      class="root-bg" >

    <!-- numbers -->
    <div
      :style="style.time" 
      class="root-time">
      

      <div 
        v-for="(item,index) in hourString" 
        :key="'hour' + index"
        :style="style.num">
        <img
          :src="baseUrl + item + '.png'"
          :style="style.num" 
          class="num" >
      </div>

      <div :style="style.num">
        <img
          :src="baseUrl + 'semi.png'"
          :style="style.num" 
          class="num" >
      </div>

      <div 
        v-for="(item,index) in minString" 
        :key="'min' + index"
        :style="style.num">
        <img
          :src="baseUrl + item + '.png'"
          :style="style.num" 
          class="num" >
      </div>

      <div :style="style.num">
        <img
          :src="baseUrl + 'semi.png'"
          :style="style.num" 
          class="num" >
      </div>

      <div 
        v-for="(item,index) in secString" 
        :key="'second' + index"
        :style="style.num">
        <img
          :src="baseUrl + item + '.png'"
          class="num" >
      </div>

    </div>

    <!-- button -->
    <img
      :style="style.button"
      :src="this.baseUrl + 'button.png'"
      class="root-button" 
      @click="handlePop" >

    <!-- coupon -->
    <div
      :style="style.coupon"
      class="root-coupon">
      <img 
        :src="coupon.img"
        style="width: 100%" >
    </div>
   

    <!-- slide -->
    <div 
      :style="style.slide"
      class="slide-area">
      
      <div
        id="slide"
        :style="style.sname" 
        class="slide-name">
        <div
          v-for="(item, index) in store"
          :key="index"
          :style="style.nitem"
          :class="{'selected': index === control.store, 'normal': index !== control.store}" 
          class="name-item"
          @click="handleStoreClick(index)">
          {{ item.name }}
          <div class="item-sep"/>
        </div>
      </div>

      <div 
        :style="style.com"
        class="slide-com">
        <swiper
          ref="mySwiper" 
          :options="swiperOption" 
          class="slide-itself" 
          @someSwiperEvent="swiperEvent">
          <!-- slides -->
          <swiper-slide 
            v-for="(item, index) in store"
            :key="index">
            <img 
              :src="item.img"
              style="height: 100%" >
          </swiper-slide>
          
          <!-- Optional controls -->
          <div 
            slot="button-prev" 
            class="swiper-button-prev"/>
          <div 
            slot="button-next" 
            class="swiper-button-next"/>
        </swiper>
      </div>

      <div
        :style="style.address" 
        class="slide-address">
        {{ currentAddress }}
      </div>

    </div>

    <!-- pics -->
    <img
      v-lazy="baseUrl + 'p2_02.png'" 
      class="root-singlep" >

    <img
      v-lazy="baseUrl + 'p2_03.png'" 
      class="root-singlep" >

    <img
      v-lazy="baseUrl + 'p2_04.png'" 
      class="root-singlep" >

    <img
      v-lazy="baseUrl + 'p2_05.png'" 
      class="root-singlep" >

    <img
      v-lazy="baseUrl + 'p2_06.jpg'" 
      class="root-singlep" >
    <!-- popup -->
    <div 
      v-if="this.control.pop"
      class="root-popup">
      <div class="pop-div">
        <img
          :src="this.baseUrl + 'close.png'"
          class="pop-close" 
          @click="handlePop" >
        <div class="pop-titile">
          使用规则说明
         
        </div>
        <div class="pop-para"> 
          <div>有效期：</div>
          <div>{{ coupon.date_end }}</div>
        </div>
        <div class="pop-para">
          <div>使用条件：</div>
          <div>{{ coupon.condition }}</div>
        </div>
        <div class="pop-rule">
          <div>规则：</div>
          <div 
            v-for="(item, index) in coupon.rules"
            :key="index">
            {{ item }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import { getInfoById, $wechat, basicTrack, isInWechat } from 'services'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Lazyload, Toast } from 'mint-ui'
Vue.use(Lazyload)
const wx = require('weixin-js-sdk')
const burl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp/'
const wi = window.innerWidth
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        initialSlide: 0,
        on: {
          init: () => {
            this.hasInit = true
          },
          slideChange: () => {
            if (!this.hasInit) {
              return
            } else {
              this.control.store = this.$refs.mySwiper.swiper.activeIndex
              let s = document.getElementById('slide')
              switch (this.control.store) {
                case 0:
                  s.scrollTo(0, 0)
                  break
                case 1:
                  s.scrollTo(70, 0)
                  break
                case 2:
                  s.scrollTo(150, 0)
                  break
                case 3:
                  s.scrollTo(210, 0)
                  break
                case 4:
                  s.scrollTo(300, 0)
                  break
                default:
                  s.scrollTo(300, 0)
              }
            }
          }
        }
      },
      style: {
        button: {
          width: wi * 0.2 + 'px'
        },
        time: {
          position: 'absolute',
          top: wi * 0.02 + 'px',
          width: wi * 0.5 + 'px',
          left: wi * 0.25 + 'px'
        },
        num: {
          height: '100%',
          display: 'inline-block'
        },
        coupon: {
          top: wi * 0.4 + 'px',
          width: wi * 0.42 + 'px',
          height: wi * 0.36 + 'px',
          left: wi * 0.3 + 'px',
          zIndex: '4',
          position: 'absolute'
        },
        slide: {
          top: wi * 1.22 + 'px',
          width: wi * 0.92 + 'px',
          left: wi * 0.04 + 'px',
          height: wi * 0.67 + '30px',
          backgroud: 'white',
          marginTop: wi * 0.05 + 'px'
        },
        com: {
          height: wi * 0.67 - 60 + 'px'
        },
        address: {
          lineHeight: '30px',
          height: '30px',
          zIndex: '4'
        },
        sname: {
          height: '27px',
          zIndex: '4'
        },
        nitem: {
          zIndex: '7',
          textAlign: 'center'
        }
      },
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp/',
      control: {
        pop: false,
        store: 0,
        hour: 0,
        min: 0,
        second: 0
      },
      hasInit: false,
      store: [
        {
          name: '来福士店',
          img: burl + 'lfs.jpg',
          address: '上海市长宁区长宁路1123号长宁来福士（E）04层12号',
          id: [20, 21, 168, 167, 166, 165, 79, 80, 81, 37],
          index: 0
        },
        {
          name: '香港广场店',
          img: burl + 'sggc.jpg',
          address: '上海市淮海中路283号 香港广场南座二楼10B',
          id: [34, 130, 22, 33, 228, 32, 85, 109],
          index: 1
        },
        {
          name: '合生汇店',
          img: burl + 'hsh.jpg',
          address: '上海杨浦区翔殷路1099号合生汇4层06室',
          id: [27, 234, 235, 198, 199, 127, 8, 63, 102],
          index: 2
        },
        {
          name: '江桥万达店',
          img: burl + 'jqwd.jpg',
          address: '上海市金沙江西路1051弄1号 万达广场2003室',
          id: [186, 187, 12],
          index: 3
        },
        {
          name: '七宝万科店',
          img: burl + 'qbwk.jpg',
          address: '上海市漕宝路3366号上海七宝万科广场商场四层L435号',
          id: [232, 233, 6],
          index: 4
        },
        {
          name: '日月光店',
          img: burl + 'ryg.jpg',
          address: '上海市徐汇区漕宝路33号徐汇日月光中心A座L2-35',
          id: [229, 230, 231, 144],
          index: 5
        },
        {
          name: '南丰店',
          img: burl + 'nfc.jpg',
          address: '上海长宁区遵义路100号南丰城1-L208',
          id: [26],
          index: 6
        },
        {
          name: '百联世纪店',
          img: burl + 'blsj.jpg',
          address:
            '上海市浦东新区世纪大道1217号百联世纪购物中心B1层G59-B1-0-031',
          id: [14, 82, 83],
          index: 7
        }
      ],
      coupon: [],
      wxShareInfoValue: {
        title: '我领取了EXE颜值礼包，也送你一份100元大礼！',
        desc: '↑本活动由“眼镜带的对，合影占C位”的EXE颜镜店倾情赞助。',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp/exeicon.jpg',
        link: ''
      },
      tc: null
    }
  },
  computed: {
    wxShareInfo() {
      let wxShareInfo = {
        title: this.wxShareInfoValue.title,
        desc: this.wxShareInfoValue.desc,
        imgUrl: this.wxShareInfoValue.imgUrl,
        success: function() {
          customTrack.shareWeChat()
        }
      }
      return wxShareInfo
    },
    currentAddress: function() {
      return this.store[this.control.store].address
    },
    usePeriod: function() {
      let id = this.$route.query.hasOwnProperty('cid')
        ? this.$route.query.cid
        : 0
      return this.coupons[id].period
    },
    useCondition: function() {
      let id = this.$route.query.hasOwnProperty('cid')
        ? this.$route.query.cid
        : 0
      return this.coupons[id].condition
    },
    useRules: function() {
      let id = this.$route.query.hasOwnProperty('cid')
        ? this.$route.query.cid
        : 0
      return this.coupons[id].rules
    },
    useCoupon: function() {
      let id = this.$route.query.hasOwnProperty('cid')
        ? this.$route.query.cid
        : 0
      return this.coupons[id].img
    },
    hourString: function() {
      console.log(this.control.hour.toString())
      return this.control.hour.toString()
    },
    minString: function() {
      if (this.control.min < 10) {
        return '0' + this.control.min.toString()
      } else {
        return this.control.min.toString()
      }
    },
    secString: function() {
      if (this.control.second < 10) {
        return '0' + this.control.second.toString()
      } else {
        return this.control.second.toString()
      }
    }
  },
  watch: {
    hasInit: function() {
      this.$refs.mySwiper.swiper.slideTo(this.handleStoreChooseById())
    }
  },
  created() {
    this.handleStoreChooseById()
    document.title = 'EXE颜镜店'
  },
  mounted() {
    if (localStorage.getItem('xingstation51act') !== null) {
      this.coupon = JSON.parse(
        localStorage.getItem('xingstation51act')
      ).coupon_data

      let date3 =
        new Date(this.coupon.date_added.replace(/\-/g, '/')).getTime() +
        24 * 60 * 60 * 1000 * 2 -
        Date.now()

      if (date3 > 0) {
        let days = Math.floor(date3 / (24 * 3600 * 1000))
        let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000)) + days * 24
        console.log(hours)
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        console.log(minutes)

        //计算相差秒数
        let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000)
        console.log(leave3)

        this.control.hour = hours
        this.control.min = minutes
        this.control.seconds = seconds
        // console.log(
        //   ' 相差 ' +
        //     days +
        //     '天' +
        //     hours +
        //     '小时 ' +
        //     minutes +
        //     ' 分钟' +
        //     seconds +
        //     ' 秒'
        // )
      }

      this.getMobileAndSetShareData()
      this.initInterval()
    }
    this.handleTrack()
    this.handleShare()
  },
  beforeDestroy() {
    this.clearSetInterval()
  },
  methods: {
    handleShare() {
      $wechat()
        .then(res => {
          res.share(this.wxShareInfoValue)
        })
        .catch(_ => {
          console.warn(_.message)
        })
    },
    handleTrack() {
      getInfoById(this.$route.query.id)
        .then(res => {})
        .catch(err => {})
    },
    getMobileAndSetShareData() {
      let request_url = process.env.STORE_API + '/rest/coupon/mobile'
      let para = {
        mobile: JSON.parse(localStorage.getItem('xingstation51act')).mobile
      }
      this.$http
        .post(request_url, para)
        .then(r => {
          if (r.status === 200) {
            if (r.data.hasOwnProperty('error')) {
              Toast(r.data.error.msg)
            } else {
              let that = this
              this.wxShareInfo.link =
                window.location.origin +
                '/marketing/51act?promo_mobile=' +
                r.data +
                '&utm_term=wechat_share'
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearSetInterval() {
      clearInterval(this.tc)
    },
    initInterval() {
      this.tc = setInterval(() => {
        this.caltime()
      }, 1000)
    },
    caltime() {
      if (this.control.second === 0) {
        if (this.control.min === 0) {
          if (this.control.hour === 0) {
            this.clearSetInterval()
          } else {
            this.control.hour -= 1
            this.control.min = 59
            this.control.second = 59
          }
        } else {
          this.control.min -= 1
          this.control.second = 59
        }
      } else {
        this.control.second -= 1
      }
    },
    handlePop() {
      this.control.pop = !this.control.pop
    },
    swiperEvent(e) {
      console.dir(e)
    },
    handleSlideChange(e) {
      console.dir(e)
    },
    handleStoreClick(index) {
      this.$refs.mySwiper.swiper.slideTo(index)
    },
    handleStoreChooseById() {
      if (this.$route.params.hasOwnProperty('pid') === true) {
        for (let item of this.store) {
          if (item.id.indexOf(Number(this.$route.query.pid)) !== -1) {
            return item.index
            break
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@imgUrl: 'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp';

.coupon-root {
  width: 100%;
  position: relative;
  &.pop {
    overflow-y: hidden;
    height: 100vh;
  }
  .root-bg {
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .root-button {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 2;
  }
  .root-coupon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .root-time {
    z-index: 3;
    justify-content: center;
    display: flex;
    align-items: center;
    .num {
      z-index: 4;
    }
  }
  .slide-area {
    position: absolute;
    display: flex;
    z-index: 4;
    flex-direction: column;
    font-size: 14px;
    .slide-name {
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      border: #31d4b5 1.5px solid;
      .name-item {
        flex-shrink: 0;
        display: inline-block;
        padding: 0 5px;
        height: 27px;
        line-height: 27px;
        position: relative;
        .item-sep {
          position: absolute;
          right: 0;
          width: 0.5px;
          height: 30px;
          top: -1.5px;
          background-color: black;
          z-index: 8;
        }
        &.normal {
          background-color: #45d2b4;
          color: #2c2d25;
        }
        &.selected {
          color: #45d2b4;
          background-color: #2c2d25;
        }
      }
    }

    .slide-com {
      .slide-itself {
        height: 100%;
        color: white;
      }
    }
    .slide-address {
      font-size: 12px;
      color: white;
      font-weight: 400;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .root-popup {
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .pop-div {
      border-radius: 8px;
      background-color: #31cac7;
      width: 90%;
      position: relative;
      padding: 5%;
      .pop-close {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 20px;
        height: 20px;
      }
      .pop-titile {
        font-size: 24px;
        color: #3affca;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
      }
      .pop-para {
        color: white;
        width: 100%;
        margin-bottom: 28px;
        text-align: left;
        font-weight: 300;
      }
      .pop-rule {
        color: white;
        text-align: left;
        font-weight: 300;
      }
    }
  }
  .root-singlep {
    position: relative;
    width: 100%;
  }
}
.swiper-button-next {
  background-image: url('@{imgUrl}/r-arrow.png');
  background-size: 19px 44px;
  right: 0;
}
.swiper-button-prev {
  background-image: url('@{imgUrl}/l-arrow.png');
  background-size: 19px 44px;
  left: 0;
}
</style>
