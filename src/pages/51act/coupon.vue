<template>
  <div 
    :class="{'pop': this.control.pop}"
    class="coupon-root">
    <!-- bg -->
    <img
      class="root-bg" 
      :src="this.baseUrl + 'bg.jpg'" />

    <!-- numbers -->
    <div
      :style="style.time" 
      class="root-time">
      <div 
        v-for="(item,index) in 8" 
        :key="index"
        :style="style.num"
        >

        <img
        v-if="index === 2|| index === 5"
        :src="baseUrl + 'semi.png'"
        :style="style.num" 
        class="num" />

        <img
        v-else
        :src="baseUrl + '1.png'"
        :style="style.num" 
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
    <img 
      :style="style.coupon"
      :src="this.baseUrl + '30.png'" />

    <!-- slide -->
    <div 
      :style="style.slide"
      class="slide-area">
      
      <div
        :style="style.sname" 
        class="slide-name">
        <div
          :style="style.nitem" 
          class="name-item selected">
          来福士店
        </div>
        <div
          :style="style.nitem" 
          class="name-item normal">
          合生汇店
        </div>
        <div
          :style="style.nitem" 
          class="name-item normal">
          七宝店
        </div>
      </div>

      <div 
        :style="style.com"
        class="slide-com">
        <swiper
          class="slide-itself" 
          :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperEvent">
          <!-- slides -->
          <swiper-slide>I'm Slide 1</swiper-slide>
          <swiper-slide>I'm Slide 2</swiper-slide>
          <swiper-slide>I'm Slide 3</swiper-slide>
          <swiper-slide>I'm Slide 4</swiper-slide>
          <swiper-slide>I'm Slide 5</swiper-slide>
          <swiper-slide>I'm Slide 6</swiper-slide>
          <swiper-slide>I'm Slide 7</swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <div
        :style="style.address" 
        class="slide-address">
        上海市长宁区长宁路1123号长宁来福士（E）04层12号
      </div>

    </div>

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
          <div>2018-04-26——2018-05-15</div>
        </div>
        <div class="pop-para">
          <div>使用条件：</div>
          <div>消费EXE颜选产品即享100元优惠</div>
        </div>
        <div class="pop-rule">
          <div>规则：</div>
          <div>
            1.消费任意EXE颜选产品可使用本券，适用于所有EXE线下门店。
          </div>
          <div>
             3.请在付款之前向店员明示使用本券，每张仅限使用一次，本券一旦核销即失效。
          </div>
          <div>             
            4.每一副镜架仅可享受一次该优惠，不与其他优惠同享，不与会员权益同享。
          </div>
          <div>
            5.本券不可兑换或折换现金。
          </div>
          <div>
            6.若发生退款，将仅退还用户实际支付的金额，券优惠金额不退回，券不再补偿。
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      style: {
        button: {
          width: window.innerWidth * 0.2 + 'px'
        },
        time: {
          position: 'absolute',
          top: window.innerWidth * 0.02 + 'px',
          width: window.innerWidth * 0.8 + 'px',
          left: window.innerWidth * 0.1 + 'px'
        },
        num: {
          width: window.innerWidth * 0.05 + 'px',
          display: 'inline-block'
        },
        coupon: {
          top: window.innerWidth * 0.46 + 'px',
          width: window.innerWidth * 0.42 + 'px',
          left: window.innerWidth * 0.3 + 'px',
          zIndex: '4',
          position: 'absolute'
        },
        slide: {
          top: window.innerWidth * 1.22 + 'px',
          width: window.innerWidth * 0.92 + 'px',
          left: window.innerWidth * 0.04 + 'px',
          height: window.innerWidth * 0.67 + '30px',
          backgroud: 'white',
          marginTop: window.innerWidth * 0.05 + 'px'
        },
        com: {
          height: window.innerWidth * 0.67 - 60 + 'px'
        },
        address: {
          lineHeight: '30px',
          height: '30px',
          zIndex: '4'
        },
        sname: {
          height: '30px',
          zIndex: '4'
        },
        nitem: {
          height: '30px',
          zIndex: '7',
          lineHeight: '29px',
          textAlign: 'center'
        }
      },
      baseUrl:
        'https://h5-images.oss-cn-shanghai.aliyuncs.com/xingshidu_h5/marketing/pages/xsd51/cp/',
      control: {
        pop: false
      }
    }
  },
  methods: {
    handlePop() {
      this.control.pop = !this.control.pop
    },
    swiperEvent() {}
  },
  mounted() {}
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
    top: 20px;
    right: 20px;
    z-index: 2;
  }
  .root-time {
    z-index: 3;
    justify-content: center;
    display: flex;
    .num {
      z-index: 4;
    }
  }
  .slide-area {
    position: absolute;
    display: flex;
    z-index: 4;
    flex-direction: column;

    .slide-name {
      display: flex;

      overflow-x: scroll;
      overflow-y: hidden;
      .name-item {
        flex-shrink: 0;
        display: inline-block;
        border: #45d2b4 2px solid;
        font-size: 14px;
        padding: 0 5px;
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
