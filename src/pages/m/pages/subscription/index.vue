<template>
  <div class="subscription">
    <div class="remind">请选择1至5个服务</div>
    <div class="chooses">
      <div 
        :class="{'sub-item': !itemStatus[index], 'sub-item choosen': itemStatus[index], 'sub-item none': excludeNames.includes(itemNames[index])}" 
        v-for="(item, index) in itemNames"
        :key="index"
        @click="handleItemClick(index)"
      >
          <div class="index-label" v-if="itemIndex[index] >0">
            {{itemIndex[index]}}
          </div>
          <div class="item-img">
            <img :src="baseUrl + itemNames[index] + '-' + (itemStatus[index] ? '0' : '1') +'.svg'">
          </div>
          <div :class="{'item-label': !itemStatus[index], 'item-label selected': itemStatus[index]}">
            {{itemLabels[index]}}
          </div>
      </div>
    </div>
    <div class="confirm" @click="confirmPreview">预览页面</div>
    <BottomBar :replaceMode="'preview'" :replaceMenuCode="computedMenuCode"/>
  </div>
</template>

<script>
const menuLength = 7;
import BottomBar from "@/pages/m/components/Static/BottomBar";
export default {
  data() {
    return {
      baseUrl: "https://cdn.exe666.com/fe/image/m/subscription/",
      itemNames: [
        "topic",
        "photo",
        "activity",
        "barrage",
        "mall",
        "card",
        "my"
      ],
      excludeNames: ["mall"],
      itemLabels: [
        "话题",
        "我的照片",
        "热门活动",
        "弹幕",
        "商城",
        "卡包",
        "我的嗨屏"
      ],
      itemStatus: Array(menuLength).fill(false),
      itemIndex: Array(menuLength).fill(0),
      currentIndex: 0,
      routes: [
        "TopicIndex",
        "TrendsIndex",
        "ActivityShop",
        "BarrageIndex",
        "MallIndex",
        "CardIndex",
        "MyIndex"
      ]
    };
  },
  components: {
    BottomBar
  },
  computed: {
    computedMenuCode() {
      let currentMenuCode = "";
      this.itemIndex.map(i => {
        currentMenuCode = currentMenuCode + i;
      });
      return parseInt(parseInt(currentMenuCode), 10).toString(32);
    }
  },
  methods: {
    handleItemClick(index) {
      if (this.currentIndex >= 5) {
        if (!this.itemStatus[index]) {
          return;
        } else {
        }
      }
      if (this.itemStatus[index] === false) {
        this.currentIndex++;
        this.itemIndex[index] = this.currentIndex;
        let newIndex = this.itemIndex;
        this.itemIndex = [];
        newIndex.map(i => {
          this.itemIndex.push(i);
        });
        let newArr = this.itemStatus;
        newArr[index] = true;
        this.itemStatus = [];
        newArr.map(i => {
          this.itemStatus.push(i);
        });
      } else {
        this.currentIndex--;
        let flag = this.itemIndex[index];
        this.itemIndex[index] = 0;
        let newArr = this.itemStatus;
        newArr[index] = false;
        this.itemStatus = [];
        newArr.map(i => {
          this.itemStatus.push(i);
        });
        let newIndex = this.itemIndex.map((e, index) => {
          if (e > 0) {
            if (e > flag) {
              e--;
            }
          }
          return e;
        });
        this.itemIndex = [];
        newIndex.map(i => {
          this.itemIndex.push(i);
        });
      }
    },
    confirmPreview() {
      let name = "";
      this.itemIndex.map((e, index) => {
        if (e === 1) {
          name = this.routes[index];
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
