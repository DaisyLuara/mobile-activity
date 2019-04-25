<template>
  <div 
    v-if="imgUrls.length > 0" 
    class="mts">
    <md-swiper 
      ref="swiper" 
      :is-prevent="false" 
      class="swiper">
      <md-swiper-item
        v-for="(item, $index) in imgUrls"
        :key="$index"
        @click.native="handlePhotoClick(item)"
      >
        <img 
          :src="item.image" 
          class="slide-pic">
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
/* eslint-disable */

import "swiper/dist/css/swiper.css";
import "./swiper.less";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Swiper, SwiperItem } from "mand-mobile";

export default {
  components: {
    "md-swiper": Swiper,
    "md-swiper-item": SwiperItem
  },
  props: {
    imgUrls: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    handlePhotoClick(item) {
      window.location.href = item.infolink;
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-pagination-bullets {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}
.mts {
  position: relative;
  width: 3.43rem;
  height: 3.43rem;
  .swiper {
    width: 3.43rem;
    height: 3.43rem;
    position: relative;
    .slide-pic {
      width: 3.43rem;
    }
    .swiper-pagination {
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
    }
  }
}
</style>
