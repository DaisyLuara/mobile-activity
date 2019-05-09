<template>
  <div class="cdt">
    <p v-if="errorMessage !== ''">
      {{ errorMessage }}
    </p>
    <div class="coupon-img">
      <img 
        v-if="resData.image_url !== null" 
        :src="resData.image_url"
      >
    </div>
    <div class="explain-text">
      {{ resData.description }}
    </div>
    <div 
      class="btn" 
      @click="handleCouponButtonClick"
    >
      {{ computedBtnText }}
    </div>
  </div>
</template>

<script>
import { getConponMini, bindCouponMini } from "services";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      type: null,
      id: null,
      errorMessage: "",
      resData: {
        image_url: null,
        description: ""
      }
    };
  },
  computed: {
    computedBtnText() {
      if (this.type === "default") {
        return "立即兑换";
      }
      if (this.type === "wallet") {
        return "立即使用";
      }
      return "";
    }
  },
  mounted() {
    this.errorMessage = "";
    this.fetchCouponDetail();
  },
  methods: {
    fetchCouponDetail() {
      this.errorMessage = "";
      if (
        this.$route.query.hasOwnProperty("type") &&
        this.$route.query.hasOwnProperty("id")
      ) {
        const { type, id } = this.$route.query;
        let localZ = localStorage.getItem("z");
        let localMarketId = localStorage.getItem("marketid");
        if (localZ === null || localMarketId === null) {
          this.errorMessage = "未授权，请通过二维码进入";
        } else {
          this.type = type;
          this.id = id;
          getConponMini(this.id, localZ)
            .then(r => {
              console.dir(r);
              this.resData = r.data;
            })
            .catch(e => {
              this.errorMessage = String(e.message);
            });
        }
      }
    },
    handleCouponButtonClick() {
      if (this.type === "default") {
        const { type, id } = this.$route.query;
        let localZ = localStorage.getItem("z");
        let localMarketId = localStorage.getItem("marketid");
        let localOid = localStorage.getItem("oid");

        if (localZ === null || localMarketId === null || localOid === null) {
          this.errorMessage = "未授权，请通过二维码进入";
        } else {
          bindCouponMini(this.resData.id, localZ, localOid)
            .then(r => {
              console.dir(r);
              if (r.data.hasOwnProperty("code")) {
                Toast("领取成功");
                setTimeout(() => {
                  this.$router.push({
                    path: "/hpocket/wallet"
                  });
                }, 1500);
              } else {
                Toast("领取失败");
              }
            })
            .catch(e => {
              console.dir(e);
              Toast(e.response.data.message);
            });
        }
      } else if (this.type === "wallet") {
        this.$router.push({
          path: "/hpocket/cqr?code=" + this.$route.query.code
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cdt {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 10;
  .coupon-img {
    margin-top: 20px;
    width: 3.56rem;
    height: 1.65rem;
    z-index: 20;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .explain-text {
    margin-top: -0.28rem;
    width: 3.56rem;
    background: rgba(235, 235, 235, 1);
    border-radius: 15px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(106, 106, 106, 1);
    padding-left: 0.14rem;
    padding-right: 0.14rem;
    padding-top: 0.42rem;
    padding-bottom: 0.14rem;
    z-index: 15;
  }
  .btn {
    margin-top: 1.775rem;
    width: 3.54rem;
    height: 45px;
    background: rgba(109, 30, 255, 1);
    border-radius: 22.5px;
    font-size: 14px;
    line-height: 45px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    font-weight: bold;
  }
}
</style>
