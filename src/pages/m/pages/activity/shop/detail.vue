<template>
  <div class="act-shop-detail">
    <div class="main-photo">
      <img
        :src="resData.image"
      >
    </div>
   
    <!-- <div class="main-text">{{ resData.txt }}</div> -->
    <!-- <div class="start-time">开始时间: {{ startTime }}</div>
    <div class="end-time">结束时间: {{ endTime }}</div> -->
    <div class="time">
      活动时间:  <span class="red"> {{ startTime }} 至 {{ endTime }}</span>
    </div>
    <div
      class="info"
      v-html="infolink"
    />
    <div
      class="info"
      v-html="pslink"
    />
    <div
      class="main-button"
      @click="handleNaviToActList"
    >
      查看更多热门活动
    </div>
    <ActivityBottom
      :acid="resData.acid"
      :acttype="resData.type"
      :awardkey="resData.awardkey"
      :auid="resData.auid"
      :is-allow="resData.allow"
      :xinfo="resData.xinfo"
      :tabs="resData.tabs"
      :user-uid="resData.user ? resData.user.uid : 'null'"
    />
  </div>
</template>

<script>
import ActivityBottom from "@/pages/m/components/Activity/ActivityBottom";
import { fetchActivityDetail, fetchShopActivityDetail } from "services";
import { mapGetters } from "vuex";
import moment from "moment";
import "./extraStyle.less";

export default {
  components: {
    ActivityBottom
  },
  data() {
    return {
      resData: {
        image: "",
        txt: "",
        sdate: null,
        edate: null,
        infolink: null,
        pslink: null,
        awardkey: "",
        acid: "",
        type: "",
        auid: "",
        allow: "0"
      },
      infolink: null,
      pslink: null
    };
  },
  computed: {
    ...mapGetters(["z"]),
    startTime() {
      if (this.resData.sdate === null) {
        return "";
      } else {
        let cld = moment(Number(this.resData.sdate) * 1000);
        return cld.format("YYYY-MM-DD");
        // return cld.format("YYYY-MM-DD HH:mm:ss");
      }
    },
    endTime() {
      if (this.resData.edate === null) {
        return "";
      } else {
        let cld = moment(Number(this.resData.edate) * 1000);
        return cld.format("YYYY-MM-DD");
      }
    }
  },
  mounted() {
    const { acid } = this.$route.query;
    if (acid !== undefined) {
      this.fetchShopActivityDetail(acid);
    }
  },
  methods: {
    async fetchShopActivityDetail(acid) {
      const payload = {
        actid: acid,
        z: this.z,
        api: "json"
      };
      try {
        let r = await fetchActivityDetail(this, payload);
        this.resData = r.data.results;
        let actDetailPayload = {
          actid: this.resData.acid,
          z: this.z,
          api: "json"
        };
        document.title = this.resData.title;
        this.infolink = await this.loadPage(this.resData.infolink);
        this.pslink = await this.loadPage(this.resData.pslink);
      } catch (e) {
        console.log(e);
      }
    },
    handleNaviToActList() {
      this.$router.push({
        name: "ActivityShop",
        params: {
          ...this.$route.params
        }
      });
    },
    loadPage(url) {
      if (url && url.length > 0 && url !== null) {
        // 加载中
        let param = {
          accept: "text/html, text/plain"
        };
        return new Promise((resolve, reject) => {
          this.$http
            .get(url, param)
            .then(response => {
              // 处理HTML显示
              resolve(response.data);
            })
            .catch(() => {
              reject("加载失败");
            });
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.act-shop-detail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(243, 243, 243, 1);
  min-height: 100vh;
  padding-bottom: 60px;
  .info {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: calc(100% - 20px);
    font-size: 0.14rem;
  }
  .main-photo {
    margin: 10px 10px;

    width: calc(100% - 20px);
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  // .main-text {
  //   margin: 10px 10px;
  //   width: calc(100% - 20px);
  //   font-size: 0.18rem;
  //   color: rgba(13, 13, 13, 1);
  //   line-height: 0.2rem;
  // }
  .time {
    width: calc(100% - 20px);
    height: 42px;
    line-height: 42px;
    text-align: left;
    background: white;
    border-radius: 10px;
    color: #222222;
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 26px;
    .red {
      color: #ff0658;
    }
  }
  .start-time {
    margin-top: 8px;
    width: 90%;
    font-size: 0.14rem;
    color: rgba(13, 13, 13, 1);
    line-height: 0.2rem;
  }
  .end-time {
    margin-top: 8px;
    width: 90%;
    font-size: 0.14rem;
    color: rgba(13, 13, 13, 1);
    line-height: 0.2rem;
  }
  .main-button {
    margin-top: 20px;
    width: 3.36rem;
    height: 0.47rem;
    border: 1px solid rgba(109, 30, 255, 1);
    opacity: 1;
    border-radius: 0.235rem;
    font-size: 0.14rem;
    line-height: 0.47rem;
    text-align: center;
    color: rgba(109, 30, 255, 1);
  }
}
</style>
