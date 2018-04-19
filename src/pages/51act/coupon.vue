<template>
  <div 
    :class="{'pop': this.control.pop}"
    class="coupon-root">
    
    <!-- wxshare -->
    <wx-share :WxShareInfo="wxShareInfo"></wx-share>
    
    <!-- bg -->
    <img
      class="root-bg" 
      :src="this.baseUrl + 'bg.jpg'" />

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
        class="num" />
      </div>

      <div :style="style.num">
          <img
            :src="baseUrl + 'semi.png'"
            :style="style.num" 
            class="num" />
      </div>

      <div 
        v-for="(item,index) in minString" 
        :key="'min' + index"
        :style="style.num">
        <img
        :src="baseUrl + item + '.png'"
        :style="style.num" 
        class="num" />
      </div>

      <div :style="style.num">
          <img
            :src="baseUrl + 'semi.png'"
            :style="style.num" 
            class="num" />
      </div>

      <div 
        v-for="(item,index) in secString" 
        :key="'second' + index"
        :style="style.num">
        <img
        :src="baseUrl + item + '.png'"
        class="num" />
      </div>

    </div>

    <!-- button -->
    <img
      @click="handlePop"
      :style="style.button"
      class="root-button" 
      :src="this.baseUrl + 'button.png'" />

    <!-- coupon -->
    <div
      class="root-coupon"
      :style="style.coupon">
       <img 
        style="width: 100%"
        :src="useCoupon" />
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
          @click="handleStoreClick(index)"
          v-for="(item, index) in store"
          :key="index"
          :style="style.nitem" 
          :class="{'selected': index === control.store, 'normal': index !== control.store}"
          class="name-item">
          {{item.name}}
          <div class="item-sep">

          </div>
        </div>
      </div>

      <div 
        :style="style.com"
        class="slide-com">
        <swiper
          class="slide-itself" 
          :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperEvent">
          <!-- slides -->
          <swiper-slide 
            v-for="(item, index) in store"
            :key="index">
            <img 
              style="height: 100%"
              :src="item.img" />
          </swiper-slide>
          
          <!-- Optional controls -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <div
        :style="style.address" 
        class="slide-address">
        {{currentAddress}}
      </div>

    </div>

    <!-- pics -->
    <img
      class="root-singlep" 
      :src="baseUrl + 'p2_02.png'" />

    <img
      class="root-singlep" 
      :src="baseUrl + 'p2_03.png'" />

    <img
      class="root-singlep" 
      :src="baseUrl + 'p2_04.png'" />

    <img
      class="root-singlep" 
      :src="baseUrl + 'p2_05.png'" />

    <img
      class="root-singlep" 
      :src="baseUrl + 'p2_06.jpg'" />


    
    <!-- popup -->
    <div 
      class="root-popup"
      v-if="this.control.pop">
      <div class="pop-div">
        <img
          @click="handlePop"
          class="pop-close" 
          :src="this.baseUrl + 'close.png'" />
        <div class="pop-titile">
          使用规则说明
         
        </div>
        <div class="pop-para"> 
          <div>有效期：</div>
          <div>{{usePeriod}}</div>
        </div>
        <div class="pop-para">
          <div>使用条件：</div>
          <div>{{useCondition}}</div>
        </div>
        <div class="pop-rule">
          <div>规则：</div>
          <div 
            :key="index"
            v-for="(item, index) in useRules">
            {{item}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import WxShare from 'modules/wxShare'
import { customTrack } from 'modules/customTrack'
const burl =
  'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp/'
const wi = window.innerWidth
export default {
  components: {
    WxShare
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
        hour: 24,
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
      coupons: [
        {
          period: '2018-04-24——2018-05-15',
          condition:
            '到EXE颜镜店即可领取TZ House音乐酒现场大宁店满199减30代金券。',
          rules: [
            '1.到任意EXE颜镜店即可领取TZ House音乐酒吧大宁店满199减30代金券。',
            '2.所领取的实体券核销期限为2018-04-24——2018-05-31。',
            '3.请向店员明示使用本券，每张仅限使用一次，本券一旦核销即失效。',
            '4.本券不可兑换或折换现金。',
            '5.其他规则详见券面信息。'
          ],
          img: burl + '30.png'
        },
        {
          period: '2018-04-26——2018-05-15',
          condition: '消费EXE颜选产品即享100元优惠。',
          rules: [
            '1.消费任意EXE颜选产品可使用本券，适用于所有EXE线下门店。',
            '2.请在付款之前向店员明示使用本券，每张仅限使用一次，本券一旦核销即失效。',
            '3.每一副镜架仅可享受一次该优惠，不与其他优惠同享，不与会员权益同享。',
            '4.本券不可兑换或折换现金。',
            '5.若发生退款，将仅退还用户实际支付的金额，券优惠金额不退回，券不再补偿。'
          ],
          img: burl + '100.png'
        },
        {
          period: '领券后48小时内',
          condition:
            '消费EXE颜选产品，即可获赠店内任意太阳镜一副（价值399元）。',
          rules: [
            '1.获得本券后48小时内在EXE店内消费颜选产品可获赠店内任意太阳镜一副（价值399元），适用于所有EXE线下门店。',
            '2.请在付款之前向店员明示使用本券，每张仅限使用一次，本券一旦核销即失效。',
            '3.可与颜选产品优惠同享，不与其他优惠同享，不与会员权益同享。',
            '4.本券不可兑换或折换现金。',
            '5.若发生退款，将仅退还用户实际支付的金额，用户需同时退还赠品，券不再补偿。'
          ],
          img: burl + '399.png'
        },
        {
          period: '领券后48小时内',
          condition:
            '消费EXE颜选产品，即可获赠价值380元的Borghese亮肤晶莹面膜。',
          rules: [
            '1.获得本券后48小时内在EXE店内消费任意颜选产品可获赠Borghese贝佳斯亮肤晶莹面膜，适用于所有EXE线下门店。',
            '2.请在付款之前向店员明示使用本券，每张仅限使用一次，本券一旦核销即失效。',
            '3.可与颜选产品优惠同享，不与其他优惠同享，不与会员权益同享。',
            '4.本券不可兑换或折换现金。',
            '5.若发生退款，将仅退还用户实际支付的金额，券不再补偿。'
          ],
          img: burl + '380mm.png'
        },
        {
          period: '领券后48小时内',
          condition:
            '消费EXE颜选产品，即可获赠价值380元的Borghese活力亮采净透睡眠眼膜修护霜。',
          rules: [
            '1.获得本券后48小时内在EXE店内消费任意颜选镜架可获赠Borghese贝佳斯活力亮采净透睡眠眼膜修护霜，适用于所有EXE线下门店。',
            '2.请在付款之前向店员明示使用本券，每张仅限使用一次，本券一旦核销即失效。',
            '3.可与颜选产品优惠同享，不与其他优惠同享，不与会员权益同享。',
            '4.本券不可兑换或折换现金。',
            '5.若发生退款，将仅退还用户实际支付的金额，券不再补偿。'
          ],
          img: burl + '380ym.png'
        }
      ],
      wxShareInfo: {
        title: '浦商百货 致惠女神节',
        desc: '黑白天使 成就致惠女神 真皙美白 唤醒青春美颜',
        imgUrl:
          'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp/exeicon.jpg',
        success: function() {
          customTrack.shareWeChat()
        }
      },
      tc: null
    }
  },
  created() {
    this.handleStoreChooseById()
  },
  mounted() {
    this.initInterval()
  },
  beforeDestroy() {
    this.clearSetInterval()
  },
  computed: {
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
  methods: {
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
      if (this.$route.query.hasOwnProperty('pid') === true) {
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
