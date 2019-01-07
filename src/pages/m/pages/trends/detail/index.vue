<template>
  <div class="trend-detail">
    <TrendsTopBar
      v-if="resData.image !== ''"
      :title="resData.title"
      :mname="resData.mname"
      :time="resData.date"
    />
    <img 
      :src="resData.image" 
      class="photo">
    <TrendsBottomBar
      :acid="Number(resData.acid)"
      @onTrendDelete="handleTrendDeleteModalShow"
      @onTrendShare="handleShareModalShare"
    />
    <TrendsBottomBlankHolder/>
    <DeletePhotoModal
      :show="shouldDeleteModalShow"
      @onHandleModalHide="handleModalHide"
      @handleDeleteConfirm="handleTrendDeleteConfirm"
    />
    <SharePhotoModal 
      :show="shouldShareModalShow" 
      @onHandleShareModalHide="handleShareModalHide"/>

    <div 
      class="info" 
      v-html="infolink"/>
    <div 
      class="info" 
      v-html="pslink"/>
    <div class="blank-holder"/>
  </div>
</template>

<script>
import "./extraStyle.less";
import TrendsTopBar from "@/pages/m/components/Static/TrendsTopBar";
import TrendsBottomBar from "@/pages/m/components/Static/TrendsBottomBar";
import TrendsBottomBlankHolder from "@/pages/m/components/Static/TrendsBottomBlankHolder";
import DeletePhotoModal from "@/pages/m/components/Reminder/DeletePhotoModal";
import SharePhotoModal from "@/pages/m/components/Reminder/SharePhotoModal";
import { mapGetters, mapMutations } from "vuex";
import { getHdInfo, deleteATrend, fetchShopActivityDetail } from "services";
import { Toast } from "mint-ui";
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
      goodsxsd: "http://exelook.com:8010/goodsxsd/",
      shouldDeleteModalShow: false,
      shouldShareModalShow: false,
      resData: {
        image: "",
        title: "",
        date: "",
        acid: 0
      },
      actDetail: {
        infolink: "",
        pslink: ""
      },
      infolink: "",
      pslink: ""
    };
  },

  computed: {
    ...mapGetters(["z"])
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
    padding: 16px;
    width: 100%;
    font-size: 0.14rem;
  }
}
</style>
