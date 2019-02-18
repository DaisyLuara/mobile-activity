<template>
  <div class="cake-wrapper">
    <div v-if="cakeList.length > 0">
      <div class="cake-swiper-bg"></div>
      <div class="swiper-container gallery-top" id="cakeSwiperTop">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="item in cakeList"
            :key="item.id"
          >
            <div class="cake-top-wrapper">
              <img :src="item.image" class="cake-top-img">
            </div>
          </div>
        </div>
        <div class="swiper-button-next button-next-cake"></div>
        <div class="swiper-button-prev button-prev-cake"></div>
      </div>
      <div class="swiper-container gallery-thumbs" id="cakeSwiperThumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="item in cakeList"
            :key="item.id"
          >
            <div class="cake-thumbs-wrapper">
              <img :src="item.image" class="cake-thumbs-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
import { mapGetters } from "vuex"
import { fetchAllGoodsList } from "services"

export default {
  data () {
    return {
      cakeList: [],
      swiperTop: null,
      swiperThumbs: null
    }
  },
  components: {},
  created () {
    this.fetchCakeList()
  },
  computed: {
    ...mapGetters(["z"])
  },
  mounted () {
    
  },
  methods: {
    // 拉取蛋糕列表
    async fetchCakeList () {
      const payload = {
        api: 'json',
        z: this.z,
        gid: 0,
        type: 'cake',
        cp: 1,
        size: 5
      }
      try {
        let resp = await fetchAllGoodsList(payload)
        if (resp.data.state === '1') {
          this.cakeList = resp.data.results.data
          // 初始化swiper实例
          this.$nextTick(() => {
            this.swiperThumbs = new Swiper('#cakeSwiperThumbs', {
              spaceBetween: '4.2%',
              slidesPerView: 'auto',
              freeMode: true,
              watchSlidesVisibility: true,
              watchSlidesProgress: true
            })
            this.swiperTop = new Swiper('#cakeSwiperTop', {
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              thumbs: {
                swiper: this.swiperThumbs
              }
            })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">

.cake-wrapper {
  position: relative;
  min-height: 3.6rem;
}
.cake-swiper-bg {
  width: 2.76rem;
  height: 2.76rem;
  border-radius: 50%;
  background: #FE556F;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.gallery-top {
  height: 2.76rem;
  margin-bottom: 0.2rem;
  .cake-top-wrapper {
    width: 100%;
    padding: 0.5rem 0 0.46rem 0;
    .cake-top-img {
      display: block;
      width: 1.86rem;
      height: 1.8rem;
      margin: 0 auto;
    }
  }
  .button-next-cake, .button-prev-cake {
    width: 0.45rem;
    height: 0.51rem;
    background: url(https://cdn.exe666.com/m/activity/shop/birthday/arrow-2.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
  }
  .button-next-cake {
    right: 0;
  }
  .button-prev-cake {
    left: 0;
    transform: rotate(180deg);
  }
}
.gallery-thumbs {
  padding-left: 0.14rem;
  height: 0.64rem;
  .swiper-slide {
    width: 0.64rem;
    height: 100%;
    .cake-thumbs-wrapper {
      width: 100%;
      height: 100%;
      padding: 0.11rem 0.11rem 0.12rem 0.11rem;
      border-radius: 50%;
      background: #E4E4E4;
      .cake-thumbs-img {
        display: block;
        width: 0.42rem;
        height: 0.41rem;
      }
    }
    &.swiper-slide-thumb-active {
      .cake-thumbs-wrapper {
        background-color: #FE556F;
      }
    }
  }
}

</style>
