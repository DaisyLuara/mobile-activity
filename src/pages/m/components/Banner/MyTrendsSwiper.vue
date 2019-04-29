<template>
  <div 
    v-if="imgUrls.length > 0" 
    class="mts"
  >
    <md-swiper 
      ref="swiper" 
      :is-prevent="false" 
      class="swiper"
    >
      <md-swiper-item
        v-for="(item, $index) in imgUrls"
        :key="$index"
        @click.native="handlePhotoClick(item)"
      >
        <img 
          :src="item.image" 
          class="slide-pic"
        >
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import "./swiper.less";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";
import { fetchMSiteBanners } from "services";

import { Swiper, SwiperItem } from "mand-mobile";
export default {
  components: {
    "md-swiper": Swiper,
    "md-swiper-item": SwiperItem
  },
  data() {
    return {
      imgUrls: []
    };
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted() {
    if (this.z === "") {
      return;
    }
    this.fetchTrendsSwiperInfo();
  },
  methods: {
    handlePhotoClick(item) {
      // console.log(e);
      window.location.href = item.infolink;
    },
    fetchTrendsSwiperInfo() {
      const payload = {
        z: this.z,
        mkey: this.$route.params.mkey,
        api: "json"
      };
      fetchMSiteBanners(this, payload)
        .then(r => {
          this.imgUrls = r.data.results.data;
        })
        .catch(e => {
          console.log(e);
        });
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
  width: 3.75rem;
  height: 1.35rem;
  .swiper {
    width: 3.75rem;
    height: 1.35rem;
    position: relative;
    .slide-pic {
      width: 3.75rem;
    }
    .swiper-pagination {
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
    }
  }
}
</style>
