<template>
  <div v-if="imgUrls.length > 0" class="mts">
    <swiper ref="mySwiper" :options="swiperOption" class="swiper">
      <swiper-slide v-for="(item, index) of imgUrls" :key="index">
        <img :src="item.image" class="slide-pic" @click="handlePhotoClick(item)">
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"/>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import "./swiper.less";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";
import { fetchMSiteBanners } from "services";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
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
