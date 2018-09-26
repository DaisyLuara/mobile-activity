<template>
  <div class="article">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="slide-item">
        <img class="slide-pic" src="http://cdn.exe666.com/fe/hidol/img/sample/1.jpg" />
        <div class="count">999人参与</div>
      </swiper-slide>
      <swiper-slide class="slide-item">
        <img class="slide-pic" src="http://cdn.exe666.com/fe/hidol/img/sample/2.jpg" />
      </swiper-slide>
      <swiper-slide class="slide-item">
        <img class="slide-pic" src="http://cdn.exe666.com/fe/hidol/img/sample/3.jpg" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- functions -->
    <div class="function">
      <div class="author">
        <div class="info">
          <img class="avatar" src="https://dn-coding-net-production-static.qbox.me/655a4d54-31fa-45e2-bd4b-98be23865664.jpg?imageMogr2/auto-orient/format/jpeg/crop/!400x400a0a0"/>
          <div class="info-detail">
            <div class="detail-name">今晚打老虎</div>
            <div class="detail-time">30分钟前</div>
          </div>
        </div>
        <img class="more" src="http://cdn.exe666.com/fe/hidol/img/more.svg">
      </div>
      <div class="question">
        <div class="question-self">
          你们觉得吃葡萄需要吐葡萄皮吗？ 需要吗？需要吗？
        </div>
        <div class="question-msg">
          <img class="msg" src="http://cdn.exe666.com/fe/hidol/img/messenger.png" />
          <div class="count">999</div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  display: flex;
  flex-direction: column;
  z-index: 10;
  .swiper {
    z-index: 20;
    height: 230px;
    width: 100%;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    position: relative;
    .slide-item {
      z-index: 21;
      .slide-pic {
        height: 100%;
        z-index: 22;
      }
      .count {
        position: absolute;
        z-index: 25;
        bottom: 10px;
        right: 10px;
        font-size: 0.1rem;
        color:#999;
      }
    }
  }
  .function {
    z-index: 30;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 10px;
    height: 105px;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    .author {
      height: 35px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 15px;
      .info {
        height: 100%;
        position: relative;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: absolute;
          top: -15px;
          left: 0;
        }
        .info-detail {
          height: 100%;
          display: flex;
          flex-direction: column;
          margin-left: 55px;
          .detail-name {
            flex: 1;
            font-size: 0.14rem;
            color: rgba(102, 102, 102, 1);
          }
          .detail-time {
            flex: 1;
            color: rgba(153, 153, 153, 1);
            font-size: 0.1rem;
          }
        }
      }
      .more {
        width: 23px;
      }
    }
    .question {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 8px;
      padding-top: 8px;
      width: 100%;
      font-size: 0.14rem;
      .question-self {
        width: 70%;
      }
      .question-msg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .msg {
          flex: 1;
          height: 60%;
        }
        .count {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}
.swiper-pagination-bullets {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
</style>
