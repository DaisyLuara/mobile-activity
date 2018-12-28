<template>
  <div class="trend-detail">
    <TrendsTopBar 
      v-if="resData.image !== ''" 
      :title="resData.title" 
      :time="resData.date"/>
    <img 
      :src="resData.image" 
      class="photo">
    <XiaoOuFooter/>
    <TrendsBottomBar
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
  </div>
</template>

<script>
import TrendsTopBar from "@/pages/m/components/Static/TrendsTopBar";
import TrendsBottomBar from "@/pages/m/components/Static/TrendsBottomBar";
import TrendsBottomBlankHolder from "@/pages/m/components/Static/TrendsBottomBlankHolder";
import XiaoOuFooter from "@/pages/m/components/Static/XiaoOuFooter";
import DeletePhotoModal from "@/pages/m/components/Reminder/DeletePhotoModal";
import SharePhotoModal from "@/pages/m/components/Reminder/SharePhotoModal";
import { mapGetters, mapMutations } from "vuex";
import { getHdInfo, deleteATrend } from "services";
import { Toast } from "mint-ui";
export default {
  components: {
    TrendsTopBar,
    TrendsBottomBar,
    XiaoOuFooter,
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
        date: ""
      }
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
}
</style>
