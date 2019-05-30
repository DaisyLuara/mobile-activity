<template>
  <div class="tbb">
    <div class="function">
      <div 
        class="fitem" 
        @click="handleFuncClick('delete')"
      >
        <img 
          :src="deleteUrl" 
          class="delete"
        >
      </div>
      <div 
        class="fitem" 
        @click="handleFuncClick('save')"
      >
        <img 
          :src="saveUrl" 
          class="save"
        >
      </div>
      <div 
        class="fitem" 
        @click="handleFuncClick('share')"
      >
        <img 
          :src="shareUrl" 
          class="share"
        >
      </div>
    </div>

    <div class="button">
      <div 
        v-if="acid >0" 
        class="title" 
        @click="naviToShopActivityDetail"
      >
        {{ buttonTitle }}
      </div>
      <div
        v-if="acid <=0 && actList.length > 0"
        class="title"
        @click="showActsCanJoin"
      >
        {{ buttonTitle }}
      </div>
      <!-- <div class="time">{{subTitle}}</div> -->
    </div>
    <transition name="fade">
      <div 
        v-if="shoudListShow" 
        class="list"
      >
        <div
          v-for="(item, index) in actList"
          :key="index"
          class="list-item"
          @click="naviGateToActDetail(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapGetters } from "vuex";
import { fetchShopActivityList } from "services";
export default {
  props: {
    acid: {
      type: Number,
      default: 0,
      required: true
    },
    actDetail: {
      type: Object,
      required: true,
      default: function() {
        return {
          infolink: "",
          pslink: "",
          type: ""
        };
      }
    }
  },
  data() {
    return {
      deleteUrl: "http://cdn.xingstation.cn/fe/image/m/m-menu-delete.svg",
      saveUrl: "http://cdn.xingstation.cn/fe/image/m/m-menu-download.svg",
      shareUrl: "http://cdn.xingstation.cn/fe/image/m/m-menu-share.svg",
      subTitle: "活动倒计时:12:14:33",
      actList: [],
      shoudListShow: false,
      nameMap: {
        alltop: "ActivityShopAllTopProgress",
        game: "ActivityShopGameProgress",
        honour: "MyAchivement"
      }
    };
  },
  computed: {
    buttonTitle() {
      if (Number(this.acid) > 0) {
        if (this.actDetail.type === "alltop") {
          return "我的榜单";
        } else if (this.actDetail.type === "game") {
          return "查看排行";
        } else if (this.actDetail.type === "honour") {
          return "查看勋章";
        } else {
          return "活动详情";
        }
      } else {
        return "参与报名";
      }
    },
    ...mapGetters(["z"])
  },
  mounted() {
    this.preFetchActList();
  },
  methods: {
    naviToShopActivity() {
      this.$router.push({
        name: "ActivityShop"
      });
    },

    handleFuncClick(mode) {
      if (mode === "delete") {
        this.$emit("onTrendDelete");
      }
      if (mode === "save") {
        // this.$emit("onTrendSave");
        Toast("请长按保存图片");
      }
      if (mode === "share") {
        this.$emit("onTrendShare");
      }
    },
    preFetchActList() {
      let payload = {
        mkey: this.$route.params.mkey,
        z: this.z,
        api: "json",
        allt: "alltop"
      };
      fetchShopActivityList(this, payload).then(r => {
        this.actList = r.data.results.data;
      });
    },
    showActsCanJoin() {
      this.shoudListShow = true;
    },
    naviGateToActDetail(item) {
      this.$router.push({
        name: "ActivityShopDetail",
        query: {
          acid: item.acid,
          avrid: this.$route.query.avrid
        },
        params: this.$route.params
      });
    },
    naviToShopActivityDetail() {
      if (this.actDetail.type === "") {
        this.$router.push({
          name: "ActivityShopDetail",
          params: this.$route.params,
          query: {
            acid: this.acid
          }
        });
      } else {
        let bid = null;
        if (this.actDetail.xinfo !== null) {
          bid = this.actDetail.xinfo.bid;
        }
        let query = {
          acid: this.actDetail.acid,
          awardkey: this.actDetail.awardkey,
          bid: bid
        };
        if (this.actDetail.tabs) {
          query.tabs = this.actDetail.tabs;
        }
        this.$router.push({
          name: this.nameMap[this.actDetail.type],
          params: this.$route.params,
          query: query
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.tbb {
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  height: 0.47rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .function {
    z-index: 10010;
    flex: 1;
    flex-grow: 20;
    height: 100%;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .fitem {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .delete {
        width: 0.17rem;
        height: 0.19rem;
        z-index: 10011;
      }
      .save {
        width: 0.17rem;
        height: 0.19rem;
        z-index: 10011;
      }
      .share {
        width: 0.165rem;
        height: 0.195rem;
        z-index: 10011;
      }
    }
  }
  .button {
    width: 1.41rem;
    height: 100%;
    background: rgba(109, 30, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .title {
      font-size: 0.16rem;
      font-weight: 400;
      color: white;
    }
    .time {
      font-size: 0.1rem;
      font-weight: 400;
      color: white;
    }
  }
  .list {
    width: 100%;
    padding: 20px 0;
    position: absolute;
    bottom: 0.47rem;
    left: 0;
    background: white;
    display: flex;
    flex-direction: column;
    .list-item {
      text-align: center;
      font-size: 0.18rem;
      padding: 10px 0;
    }
  }
}
</style>
