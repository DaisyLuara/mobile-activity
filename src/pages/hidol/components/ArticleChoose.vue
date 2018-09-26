<template>
  <div class="article-choose">
    <swiper 
      ref="mySwiper" 
      :options="swiperOption"  
      class="swiper">
      <!-- slides -->
      <swiper-slide class="slide-item">
        <img 
          class="slide-pic" 
          src="http://cdn.exe666.com/fe/hidol/img/sample/1.jpg">
        <div class="count">999人参与</div>
      </swiper-slide>
      <swiper-slide class="slide-item">
        <!-- 正常应该这样写 -->
          <!-- :class="{'opacity':noChooseStatusA}" -->
        <img
          :class="{'opacity':true}"
          class="slide-pic" 
          src="http://cdn.exe666.com/fe/hidol/img/sample/2.jpg">
        <img
          v-if="true"
          class="slide-lock" 
          src="http://cdn.exe666.com/fe/hidol/img/lock.png">
      </swiper-slide>
      <swiper-slide class="slide-item">
        <img
          :class="{'opacity':noChooseStatusB}" 
          class="slide-pic" 
          src="http://cdn.exe666.com/fe/hidol/img/sample/3.jpg">
      </swiper-slide>
      <div 
        class="swiper-pagination" 
        slot="pagination"/>
    </swiper>
    <!-- functions -->
    <div class="function">
      <div class="author">
        <div class="info">
          <img 
            src="https://dn-coding-net-production-static.qbox.me/655a4d54-31fa-45e2-bd4b-98be23865664.jpg?imageMogr2/auto-orient/format/jpeg/crop/!400x400a0a0"
            class="avatar">
          <div class="info-detail">
            <div class="detail-name">今晚打老虎</div>
            <div class="detail-time">30分钟前</div>
          </div>
        </div>
        <img 
          src="http://cdn.exe666.com/fe/hidol/img/more.svg"
          class="more">
      </div>
      <div class="question">
        <div class="question-self">
          你们觉得吃葡萄需要吐葡萄皮吗？ 需要吗？需要吗？
        </div>
        <div class="question-msg">
          <img 
            src="http://cdn.exe666.com/fe/hidol/img/messenger.png" 
            class="msg">
          <div class="count">999</div>
        </div>
      </div>
    
    </div>
  <!-- B支持 -->
    <div class="choose-wrap choose-wrap-one">
      <div class="choose-info">
        <div class="support-wrap">
          <div class="support-count">共666人支持</div>
          <div class="support-rate">[ 66%]</div>
        </div>
        <div class="option-content">
          <div class="option-text">
            吃葡萄一定 要吐葡萄皮
          </div>
          <div class="option-result-one">
            B
          </div>
        </div>
      </div>
      <div class="viewpoint">
        <input  
          v-model="viewPoint" 
          type="text" 
          placeholder="请发表你的观点"
          class="view-point-info" />
      </div>
    </div>
    
    <swiper 
      ref="mySwiper" 
      :options="swiperOption"  
      class="swiper swiper1">
      <!-- slides -->
      <swiper-slide class="slide-item">
        <img 
          src="http://cdn.exe666.com/fe/hidol/img/sample/1.jpg"
          class="slide-pic">
        <div class="count">999人参与</div>
      </swiper-slide>
      <swiper-slide class="slide-item">
        <img
          :class="{'opacity':noChooseStatusA}" 
          src="http://cdn.exe666.com/fe/hidol/img/sample/2.jpg"
          class="slide-pic" >
      </swiper-slide>
      <swiper-slide class="slide-item">
        <!-- :class="{'opacity':noChooseStatusB}"  -->
        <img
          :class="{'opacity':true}" 
          class="slide-pic" 
          src="http://cdn.exe666.com/fe/hidol/img/sample/3.jpg">
        <img
          v-if="true"
          src="http://cdn.exe666.com/fe/hidol/img/lock.png"
          class="slide-lock">
      </swiper-slide>
      <div 
        class="swiper-pagination" 
        slot="pagination"/>
    </swiper>
    <!-- functions -->
    <div class="function">
      <div class="author">
        <div class="info">
          <img 
            src="https://dn-coding-net-production-static.qbox.me/655a4d54-31fa-45e2-bd4b-98be23865664.jpg?imageMogr2/auto-orient/format/jpeg/crop/!400x400a0a0"
            class="avatar">
          <div class="info-detail">
            <div class="detail-name">今晚打老虎</div>
            <div class="detail-time">30分钟前</div>
          </div>
        </div>
        <img 
          src="http://cdn.exe666.com/fe/hidol/img/more.svg"
          class="more">
      </div>
      <div class="question">
        <div class="question-self">
          你们觉得吃葡萄需要吐葡萄皮吗？ 需要吗？需要吗？
        </div>
        <div class="question-msg">
          <img 
            src="http://cdn.exe666.com/fe/hidol/img/messenger.png" 
            class="msg">
          <div class="count">999</div>
        </div>
      </div>
    
    </div>
    <!-- A支持 -->
    <div class="choose-wrap choose-wrap-two">
      <div class="choose-info">
        <div class="option-content">
          <div class="option-result-two">
            A
          </div>
          <div class="option-text">
            吃葡萄 不吐葡萄皮
          </div>
        </div>
        <div class="support-wrap">
          <div class="support-count">共666人支持</div>
          <div class="support-rate">[ 66%]</div>
        </div>
      </div>
      <div class="viewpoint">
        <input  
          v-model="viewPoint" 
          type="text" 
          placeholder="请发表你的观点"
          class="view-point-info" />
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
      noChooseStatusA: false,
      noChooseStatusB: false,
      viewPoint: '',
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
.article-choose {
  display: flex;
  flex-direction: column;
  z-index: 10;
  .swiper {
    z-index: 20;
    // height: 335px;
    width: 100%;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    position: relative;
    &.swiper1 {
      margin-top: 30px;
    }
    .slide-item {
      z-index: 21;
      .slide-pic {
        width: 100%;
        z-index: 22;
        &.opacity {
          opacity: 0.1;
        }
      }
      .slide-lock {
        width: 50%;
        position: absolute;
        top: 5%;
        left: 25%;
        bottom: 5%;
        right: 25%;
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 5px;
    height: 105px;
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
  .choose-wrap {
    height: 100px;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    padding: 6px 18px 6.67px;
    &.choose-wrap-one {
      background: #4ea5f1;
    }
    &.choose-wrap-two {
      background: #f14e6e;
    }
    .choose-info {
      height: 59px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: #fff;
      .support-wrap {
        .support-count {
          font-weight: 300;
          height: 18px;
          font-size: 0.13rem;
        }
        .support-rate {
          height: 38px;
          font-size: 0.27rem;
          font-weight: 600;
        }
      }
      .option-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 11px;
        align-items: center;
        .option-text {
          font-size: 0.14rem;
          font-weight: 300;
          width: 70px;
        }
        .option-result-one {
          font-size: 0.43rem;
          font-weight: 600;
          margin-left: 20px;
        }
        .option-result-two {
          font-size: 0.43rem;
          font-weight: 600;
          margin-right: 20px;
        }
      }
    }
    .viewpoint {
      height: 30px;
      width: 100%;
      font-size: 0.12rem;
      .view-point-info {
        width: 100%;
        background: #f4f4f4;
        border: 1px solid #f4f4f4;
        font-size: 0.12rem;
        color: #999;
        height: 100%;
        border-radius: 18px;
        padding-left: 25px;
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
