<template>
  <div class="wallet">
    <img
      class="bg"
      src="https://cdn.xingstation.cn/fe/image/m/wallet-no-bg.jpeg"
    >

    <img
      v-if="loginState.gender === '1'"
      class="xo"
      src="https://cdn.xingstation.cn/fe/image/m/wallet-no-xo.png"
    >
    <img
      v-else
      class="xo"
      src="https://cdn.xingstation.cn/fe/image/m/wallet-no-xo-boy.png"
    >

    <div class="icon">
      <img
        v-if="currentIcon !== ''"
        :src="currentIcon"
      >
    </div>
    <div
      v-if="resData.length !== 0"
      class="fuli"
    >福利</div>
  </div>
</template>

<script>
import { fetchRunPro } from "services";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      resData: [],
      itv: null,
      count: 0,
      clicked: false
    };
  },
  computed: {
    ...mapGetters(["z", "loginState"]),
    currentP() {
      if (this.resData.length === 0) {
        return null;
      }
      return this.count % this.resData.length;
    },
    currentIcon() {
      if (this.currentP === null) {
        return "";
      }
      let n = this.resData[this.currentP].icon;
      return n;
    }
  },
  created() {
    this.fetchMyData();
  },
  beforeDestroy() {
    clearInterval(this.itv);
  },
  methods: {
    handleClick() {
      let options = {
        obj: null, //jq对象，要在那个html标签上显示
        str: "+1", //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
        startSize: "12px", //动画开始的文字大小
        endSize: "30px", //动画结束的文字大小
        interval: 600, //动画时间间隔
        color: "red" //文字颜色
      };
      let num = document.createElement("div");
      let icon = document.getElementsByClassName("icon")[0];
      let wallet = document.getElementsByClassName("wallet")[0];

      num.innerHTML = "+1";
      num.className = "zan";
      num.style.color = "white";

      wallet.append(num);

      let left = this.getOffset(icon).left + this.getWidth(icon) / 2;
      let top = this.getOffset(icon).top - this.getHeight(icon);

      num.style.position = "absolute";
      num.style.left = left + "px";
      num.style.top = "2.3rem";
      num.style.zIndex = 9999;
      num.style.fontSize = options.startSize;
      num.style.lineHeight = options.endSize;
      num.style.color = "white";

      let params = {
        "font-size": options.endSize,
        opacity: "0",
        top: "2rem"
      };
      num.style.transition = "all " + "0.6s";
      Object.keys(params).forEach(key => (num.style[key] = params[key]));
    },
    getOffset(el) {
      const box = el.getBoundingClientRect();
      return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left:
          box.left + window.pageXOffset - document.documentElement.clientLeft
      };
    },
    getHeight(el) {
      const styles = window.getComputedStyle(el);
      const height = el.offsetHeight;
      const borderTopWidth = parseFloat(styles.borderTopWidth);
      const borderBottomWidth = parseFloat(styles.borderBottomWidth);
      const paddingTop = parseFloat(styles.paddingTop);
      const paddingBottom = parseFloat(styles.paddingBottom);
      return (
        height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
      );
    },
    getWidth(el) {
      const styles = window.getComputedStyle(el);
      const height = el.offsetWidth;
      const borderTopWidth = parseFloat(styles.borderTopWidth);
      const borderBottomWidth = parseFloat(styles.borderBottomWidth);
      const paddingTop = parseFloat(styles.paddingTop);
      const paddingBottom = parseFloat(styles.paddingBottom);
      return (
        height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
      );
    },
    async fetchMyData() {
      try {
        let payload = {
          policy: "1",
          z: this.z,
          mkey: this.$route.params.mkey,
          api: "json"
        };
        let r = await fetchRunPro(payload);
        console.dir(r);
        const dataStatus = r.data && r.data.state;
        if (!dataStatus || r.data.state !== "1") {
          // no need to change route
          // this.$router.push({
          //   name: "mSite404"
          // });
          return;
        } else if (r.data.state === "0") {
          return;
        } else {
          this.resData = r.data.results.data;
          this.handleClick();
          this.itv = setInterval(() => {
            this.count++;
            this.handleClick();
          }, 5000);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wallet {
  position: relative;
  min-height: 100vh;
  z-index: 10;
  margin-top: -0.64rem;
  font-size: 12px;
  .fuli {
    color: white;
    position: absolute;
    z-index: 100;
    top: 2.1rem;
    left: 1.6rem;
    font-size: 14px;
  }
  .bg {
    position: relative;
    width: 100%;
    z-index: 20;
  }
  .xo {
    position: absolute;
    bottom: 0;
    width: 80%;
    margin-left: 10%;
    z-index: 30;
  }
  .icon {
    position: absolute;
    z-index: 60;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.08rem;
    top: 2.4rem;
    left: 1.575rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
