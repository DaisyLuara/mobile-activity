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
      <!-- author -->
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

      <!-- question -->
      <div class="question">
        <div class="question-self">
          你们觉得吃葡萄需要吐葡萄皮吗？ 需要吗？需要吗？
        </div>
        <div class="question-msg" @click="handleGoComment">
          <img class="msg" src="http://cdn.exe666.com/fe/hidol/img/messenger.png" />
          <div class="count">999</div>
        </div>
      </div>

      <!-- choose -->
      <div class="choose">
        <div class="A" @click="handleChoose('A')"  v-if="control.choose === 'A' || control.choose === null">
          <div class="title">A</div>
          <div class="content">吃葡萄可以不吐葡萄皮</div>
        </div>
        <div class="A-more" v-if="control.choose === 'A'">
          <div class="data">共666人支持</div>
          <div class="percent">[66%]</div>
        </div>
        <div class="B-more" v-if="control.choose === 'B'">
          <div class="data">共666人支持</div>
          <div class="percent">[66%]</div>
        </div>
        <div class="B" @click="handleChoose('B')"  v-if="control.choose === 'B' || control.choose === null">
          <div class="title">B</div>
          <div class="content">吃葡萄一定 要吐葡萄皮</div>
        </div>
      </div>

      <!-- comment -->
      <div class="comment" :class="control.choose">
        <div class="comment-inner">
          <div class="title">我说</div>
          <div class="input">我的观点我的观点我的观点我的观点我的观...</div>
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
      },
      control: {
        choose: null
      }
    }
  },
  methods: {
    handleChoose(payload) {
      this.control.choose = payload
    },
    handleGoComment() {
      this.$router.push({
        path: 'comment'
      })
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
        color: #999;
      }
    }
  }
  .function {
    z-index: 30;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 10px;
    // height: 105px;
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
    .choose {
      height: 60px;
      width: 100%;
      display: flex;
      flex-direction: row;
      .A {
        flex: 1;
        background: #f14e6e;
        padding: 0 4%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #ffffff;
        align-items: center;
        .title {
          font-size: 0.43rem;
          line-height: 60px;
        }
        .content {
          font-size: 0.14rem;
          padding: 5% 5%;
        }
      }
      .A-more {
        padding: 5% 5%;
        flex: 1;
        background: #f14e6e;
        display: flex;
        flex-direction: column;
        color: white;
        align-items: flex-end;
        justify-content: space-between;
        .data {
          font-size: 0.12rem;
        }
        .percent {
          font-size: 0.25rem;
        }
      }
      .B-more {
        padding: 5% 5%;
        flex: 1;
        background: #4ea5f1;
        display: flex;
        flex-direction: column;
        color: white;
        align-items: flex-start;
        justify-content: space-between;
        .data {
          font-size: 0.12rem;
        }
        .percent {
          font-size: 0.25rem;
        }
      }
      .B {
        flex: 1;
        background: #4ea5f1;
        padding: 0 4%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        color: #ffffff;
        align-items: center;
        .title {
          font-size: 0.43rem;
          line-height: 60px;
        }
        .content {
          font-size: 0.14rem;
          padding: 5% 5%;
        }
      }
    }
    .comment {
      height: 40px;
      line-height: 30px;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      .comment-inner {
        padding: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        .title {
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          background: #ececec;
          font-size: 0.14rem;
          text-align: center;
          color: #666666;
          width: 60px;
          font-weight: 300;
        }
        .input {
          @diff : 60px;
          width: calc(~'100% - @{diff}');
          background: #f4f4f4;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          color: #666666;
          font-size: 0.12rem;
          padding-left: 10px;
          overflow: hidden;
        }
      }
      &.A {
        background: #f14e6e;
      }
      &.B {
        background: #4ea5f1;
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
