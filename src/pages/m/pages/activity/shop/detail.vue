<template>
  <div class="act-shop-detail">
    <img class="main-photo" :src="resData.image">
    <div class="main-text">{{resData.txt}}</div>
    <div class="start-time">开始时间: {{startTime}}</div>
    <div class="end-time">结束时间: {{endTime}}</div>
    <div class="info" v-html="infolink"></div>
    <div class="info" v-html="pslink"></div>
    <div class="main-button" @click="handleNaviToActList">查看更多商家活动</div>
  </div>
</template>

<script>
import { fetchActivityDetail, fetchShopActivityDetail } from "services";
import { mapGetters } from "vuex";
import moment from "moment";
import "./extraStyle.less";

export default {
  data() {
    return {
      resData: {
        image: "",
        txt: "",
        sdate: null,
        edate: null,
        infolink: null,
        pslink: null
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
        return cld.format("YYYY-MM-DD hh:mm");
      }
    },
    endTime() {
      if (this.resData.edate === null) {
        return "";
      } else {
        let cld = moment(Number(this.resData.edate) * 1000);
        return cld.format("YYYY-MM-DD hh:mm");
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
  padding-bottom: 40px;
  .info {
    padding: 16px;
    width: 100%;
    font-size: 0.14rem;
  }
  .main-photo {
    width: 90%;
    margin-top: 20px;
  }
  .main-text {
    margin-top: 20px;
    width: 90%;
    font-size: 0.18rem;
    color: rgba(13, 13, 13, 1);
    line-height: 0.2rem;
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
    border: 2px solid rgba(109, 30, 255, 1);
    opacity: 1;
    border-radius: 0.235rem;
    font-size: 0.14rem;
    line-height: 0.47rem;
    text-align: center;
    color: rgba(109, 30, 255, 1);
  }
}
</style>
