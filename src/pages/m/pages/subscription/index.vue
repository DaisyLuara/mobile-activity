<template>
  <div class="subscription">
    <div class="remind">请选择1至5个服务</div>
    <div class="chooses">
      <div 
        v-for="(item, index) in computedItems" 
        :class="{'sub-item': !item.status, 'sub-item choosen': item.status, 'sub-item none': excludeNames.includes(item.name), 'sub-item notf': item.notFinished}"
        :key="index"
        @click="handleItemClick(item)"
      >
        <div 
          v-if="item.cindex >0" 
          class="index-label">
          {{ item.cindex }}
        </div>
        <div class="item-img">
          <img :src="baseUrl + item.name + '-' + (item.cindex ? '0' : '1') +'.svg'">
        </div>
        <div :class="{'item-label': !item.status, 'item-label selected': item.status}">
          {{ item.label }}
        </div>
      </div>
    </div>
    <div 
      class="confirm" 
      @click="confirmPreview">预览页面</div>
    <BottomBar 
      :replace-mode="'preview'" 
      :replace-menu-code="computedMenuCode"/>
  </div>
</template>

<script>
const menuLength = 7;
import BottomBar from "@/pages/m/components/Static/BottomBar";
export default {
  components: {
    BottomBar
  },
  data() {
    return {
      baseUrl: "https://cdn.exe666.com/fe/image/m/subscription/",
      // order means order in this page
      // but not about orders in real menu
      items: [
        {
          name: "birthday",
          label: "生日祝福",
          route: "ActivityBirthDayCake",
          status: false,
          order: 9,
          cindex: 0
        },
        {
          name: "company",
          label: "企业动态",
          route: "ActivityBirthDayIndex",
          status: false,
          order: 8,
          cindex: 0
        },
        {
          name: "topic",
          label: "话题",
          route: "TopicIndex",
          status: false,
          order: 7,
          cindex: 0
        },
        {
          name: "photo",
          label: "我的照片",
          route: "TrendsIndex",
          status: false,
          order: 2,
          cindex: 0
        },
        {
          name: "activity",
          label: "热门活动",
          route: "ActivityShop",
          status: false,
          order: 3,
          cindex: 0
        },
        {
          name: "barrage",
          label: "弹幕",
          route: "BarrageIndex",
          status: false,
          order: 4,
          cindex: 0
        },
        {
          name: "mall",
          label: "商城",
          route: "MallIndex",
          status: false,
          order: 5,
          cindex: 0
        },
        {
          name: "card",
          label: "卡包",
          route: "CardIndex",
          status: false,
          order: 6,
          cindex: 0
        },
        {
          name: "my",
          label: "我的嗨屏",
          route: "MyIndex",
          status: false,
          order: 1,
          cindex: 0
        }
      ],
      excludeNames: ["mall"],
      currentIndex: 0
    };
  },
  computed: {
    computedMenuCode() {
      let currentMenuCode = "";
      this.items.map(e => {
        currentMenuCode = currentMenuCode + e.cindex;
      });
      // currentMenuCode = currentMenuCode.slice(0, -1);
      // remove this line bellow when new item in menubar is ready
      console.log(currentMenuCode);
      return parseInt(parseInt(currentMenuCode), 10).toString(32);
    },
    computedItems() {
      let arrCopy = this.items.slice(0);
      return arrCopy.sort((a, b) => {
        return a.order - b.order;
      });
    }
  },
  methods: {
    handleItemClick(item) {
      if (item.notFinished) {
        return;
      }
      if (this.currentIndex >= 5) {
        if (!item.cindex) {
          return;
        } else {
        }
      }
      if (!item.status) {
        this.currentIndex++;
        item.cindex = this.currentIndex;
        item.status = true;
        let newIndex = this.items;
        this.items = [];
        newIndex.map(i => {
          this.items.push(i);
        });
      } else {
        this.currentIndex--;
        let flag = item.cindex;
        item.cindex = 0;
        item.status = false;
        let newArr = this.items;

        this.items = [];
        newArr.map(i => {
          this.items.push(i);
        });

        let newIndex = this.items.map((e, index) => {
          if (e.cindex > 0) {
            if (e.cindex > flag) {
              e.cindex--;
            }
          }
          return e;
        });

        this.items = [];
        newIndex.map(i => {
          this.items.push(i);
        });
      }
    },
    confirmPreview() {
      let name = "";
      this.items.map((e, cindex) => {
        if (e.cindex === 1) {
          name = e.route;
        }
      });
      this.$router.push({
        name: name,
        params: {
          mkey: this.$route.params.mkey,
          mcode: this.computedMenuCode
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.subscription {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(241, 241, 241, 1);
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  .remind {
    width: 100%;
    height: 40px;
    font-size: 12px;
    background: #ff6363;
    color: white;
    line-height: 40px;
    text-align: center;
  }
  .chooses {
    width: 100%;
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    .sub-item {
      width: 1.1rem;
      height: 1.1rem;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
      opacity: 1;
      border-radius: 8px;
      position: relative;
      margin: 0.065rem 0.05rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: white;
      position: relative;
      .index-label {
        width: 0.15rem;
        height: 0.15rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        opacity: 1;
        position: absolute;
        top: 0.1rem;
        left: 0.07rem;
        font-size: 0.13rem;
        color: #6d1eff;
        text-align: center;
      }
      &.choosen {
        background: rgba(109, 30, 255, 1);
      }
      &.notf {
        filter: opacity(0.4);
      }
      .item-img {
        width: 0.4rem;
        height: 0.4rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .item-label {
        font-size: 0.14rem;
        color: #b9b9b9;
        text-align: center;
        margin-top: 0.1rem;
        &.selected {
          color: white;
        }
      }
      &.none {
        display: none;
      }
    }
  }
  .confirm {
    width: 90%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
    color: white;
    background: rgba(109, 30, 255, 1);
    opacity: 1;
    border-radius: 11px;
    margin-top: 20px;
  }
}
</style>
