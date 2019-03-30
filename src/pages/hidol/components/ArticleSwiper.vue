<template>
  <div class="swiper-root">
    <swiper 
      ref="mySwiper"
      :options="swiperOption"
      class="swiper"
      @click="handlePhotoExpend">

      <swiper-slide 
        v-for="(item, index) of imgUrls"
        :key="index"
        :class="{'slide-item': !expend, 'slide-item expend': expend}" >
        <img 
          :src="imgUrls[index]" 
          class="slide-pic" >
        <div class="count">999人参与</div>
      </swiper-slide>

      <div 
        slot="pagination" 
        class="swiper-pagination"/>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import './swiper.less'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    expend: {
      required: true,
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      isExpend: false,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      imgUrls: [
        'http://cdn.xingstation.com/fe/hidol/img/sample/1.jpg',
        'http://cdn.xingstation.com/fe/hidol/img/sample/2.jpg',
        'http://cdn.xingstation.com/fe/hidol/img/sample/3.jpg'
      ]
    }
  },
  methods: {
    handlePhotoExpend() {
      this.$emit('onExpend')
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-pagination-bullets {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
.swiper-root {
  position: relative;
  .swiper {
    z-index: 20;
    width: 3.35rem;
    border-top-left-radius: 0.18rem;
    border-top-right-radius: 0.18rem;
    position: relative;
    .slide-item {
      transition: height 0.2s ease-in;
      height: 2.3rem;
      width: 100%;
      &.expend {
        height: 3.35rem;
      }
      z-index: 21;
      .slide-pic {
        height: 100%;
        z-index: 22;
      }
      .count {
        position: absolute;
        z-index: 25;
        bottom: 0.1rem;
        right: 0.1rem;
        font-size: 0.1rem;
        color: #999;
      }
    }
  }
}
</style>
