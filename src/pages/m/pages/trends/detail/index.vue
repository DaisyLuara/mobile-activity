<template>
  <div class="trend-detail">
    <TrendsTopBar
      v-if="resData.image !== ''"
      :title="resData.title"
      :mname="resData.mname"
      :clientdate="resData.clientdate"
    />
    <img
      :src="resData.image"
      class="photo"
    >

    <div class="time">
      活动时间:  <span class="red"> {{ startTime }} 至 {{ endTime }}</span>
    </div>

    <TrendsBottomBar
      :act-detail="actDetail"
      :acid="Number(resData.acid)"
      @onTrendDelete="handleTrendDeleteModalShow"
      @onTrendShare="handleShareModalShare"
    />
    <!-- <TrendsBottomBlankHolder /> -->
    <DeletePhotoModal
      :show="shouldDeleteModalShow"
      @onHandleModalHide="handleModalHide"
      @handleDeleteConfirm="handleTrendDeleteConfirm"
    />
    <SharePhotoModal
      :show="shouldShareModalShow"
      @onHandleShareModalHide="handleShareModalHide"
    />

    <div
      class="info"
      v-html="infolink"
    />
    <div
      class="info"
      v-html="pslink"
    />
    <div class="blank-holder" />
  </div>
</template>

<script>
import moment from "moment";
import "./extraStyle.less";
import TrendsTopBar from "@/pages/m/components/Static/TrendsTopBar";
import TrendsBottomBar from "@/pages/m/components/Static/TrendsBottomBar";
import TrendsBottomBlankHolder from "@/pages/m/components/Static/TrendsBottomBlankHolder";
import DeletePhotoModal from "@/pages/m/components/Reminder/DeletePhotoModal";
import SharePhotoModal from "@/pages/m/components/Reminder/SharePhotoModal";
import { mapGetters, mapMutations } from "vuex";
import { getHdInfo, deleteATrend, fetchShopActivityDetail } from "services";
import { Toast } from "mint-ui";
import { $wechat, isInWechat } from "services";
const baseUrl = process.env.EXE_API;
export default {
  components: {
    TrendsTopBar,
    TrendsBottomBar,
    TrendsBottomBlankHolder,
    DeletePhotoModal,
    SharePhotoModal
  },
  data() {
    return {
      goodsxsd: baseUrl + ":8010/goodsxsd/",
      shouldDeleteModalShow: false,
      shouldShareModalShow: false,
      resData: {
        image: "",
        title: "",
        acid: 0,
        clientdate: ""
      },
      actDetail: {
        infolink: "",
        pslink: "",
        type: "",
        sdate: null,
        edate: null
      },
      infolink: "",
      pslink: ""
    };
  },

  computed: {
    ...mapGetters(["z", "weixinUrl"]),
    startTime() {
      if (this.actDetail.sdate === null) {
        return "";
      } else {
        let cld = moment(Number(this.actDetail.sdate) * 1000);
        return cld.format("YYYY-MM-DD");
        // return cld.format("YYYY-MM-DD HH:mm:ss");
      }
    },
    endTime() {
      if (this.actDetail.edate === null) {
        return "";
      } else {
        let cld = moment(Number(this.actDetail.edate) * 1000);
        return cld.format("YYYY-MM-DD");
      }
    }
  },
  mounted() {
    this.fetchTrend();
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    async fetchTrend() {
      const { avrid } = this.$route.query;
      const payload = {
        avrid: avrid,
        z: this.z,
        api: "json"
      };
      try {
        let r = await getHdInfo(payload);
        if (r.data.state === "40035") {
          this.$router.push({
            name: "mSite404"
          });
        }
        this.resData = r.data.results;
        if (Number(this.resData.acid) > 0) {
          let actDetailPayload = {
            actid: this.resData.acid,
            z: this.z,
            api: "json"
          };
          let ractDetail = await fetchShopActivityDetail(
            this,
            actDetailPayload
          );

          this.actDetail = ractDetail.data.results;
          let wxShareInfoValue = {
            title: this.actDetail.title,
            desc: this.actDetail.aname,
            link: window.location.href.split("#")[0],
            imgUrl: this.actDetail.micon
          };
          if (isInWechat() === true) {
            $wechat(this.weixinUrl)
              .then(res => {
                res.share(wxShareInfoValue);
              })
              .catch(err => {
                console.warn(err.message);
              });
          }
          document.title = ractDetail.data.results.title;
          this.infolink = await this.loadPage(this.actDetail.infolink);
          this.pslink = await this.loadPage(this.actDetail.pslink);
        }
      } catch (e) {
        console.log(e);
      }
    },
    handleTrendDeleteModalShow(avrid) {
      this.shouldDeleteModalShow = true;
    },
    handleModalHide() {
      this.shouldDeleteModalShow = false;
    },
    handleTrendDeleteConfirm() {
      const { avrid } = this.$route.query;
      const payload = {
        avrid: avrid,
        api: "json",
        z: this.z
      };
      deleteATrend(payload)
        .then(r => {
          console.dir(r);
          if (r.data.results.hasOwnProperty("id")) {
            console.log("ok");
            this.$router.push({
              name: "TrendsIndex"
            });
          } else {
            Toast("删除失败");
          }
        })
        .catch(e => {
          console.log(e);
          // Toast(e.message);
        });
      this.shouldDeleteModalShow = false;
    },
    handleShareModalHide() {
      this.shouldShareModalShow = false;
    },
    handleShareModalShare() {
      this.shouldShareModalShow = true;
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
.trend-detail {
  position: relative;
  width: 3.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f3f3f3;
  .time {
    margin: 20px 0;
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
  .photo {
    margin-top: 0.2rem;
    width: 95%;
  }
  .blank-holder {
    width: 100%;
    background: transparent;
    height: 0.8rem;
  }
  .info {
    padding: 0 16px;
    width: 100%;
    font-size: 0.14rem;
  }
}
</style>
