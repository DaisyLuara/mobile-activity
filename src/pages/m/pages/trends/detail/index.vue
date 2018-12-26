<template>
  <div class="trend-detail">
    <TrendsTopBar/>
    <img class="photo" :src="photo">
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
    <SharePhotoModal :show="shouldShareModalShow" @onHandleShareModalHide="handleShareModalHide"/>
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
      photo: "",
      shouldDeleteModalShow: false,
      shouldShareModalShow: false
    };
  },
  mounted() {
    this.fetchTrend();
  },
  computed: {
    ...mapGetters(["z"])
  },
  methods: {
    ...mapMutations({
      setLoginState: "SET_LOGIN_STATE"
    }),
    async fetchTrend() {
      const { avrid } = this.$route.query;
      const getObject = {
        params: {
          id: avrid,
          z: "l3h115113f53c4489065049c79804083a73wm7",
          api: "json"
        }
      };
      try {
        let r = await this.$http.get(this.goodsxsd, getObject);
        this.photo = r.data.results.image;
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
