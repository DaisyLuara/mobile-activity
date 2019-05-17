<template>
  <div
    class="modalBox"
  >
    <img 
      :src="CDNURL+'/fe/jintie-ranking-bg.png'"
      class="modal"
    >
    <img 
      :src="CDNURL+'/fe/jintie-ranking-tip.png'"
      class="tip"
    >
    <img 
      :src="CDNURL+'/fe/jintie-close-btn.png'"
      class="rankingClose"
      @click="onModalClose"
    >
    <div class="rankingList">
      <div
        v-for="item in rankingList"
        :key="item.id"
        class="rankingItem"
      >
        <img 
          :src="CDNURL+'/fe/jintie-ranking-info.png'"
          class="rankingInfo"
        >
        <img 
          :src="item.headimageurl || null"
          class="avatar"
        >
        <span class="desc">{{ item.message }}</span>
        <span class="count">{{ item.count || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile"
import "assets/less/reset-mand.less"
import { getPhotoBoard } from "services"
const CDNURL = process.env.CDN_URL

export default {
  data () {
    return {
      CDNURL: CDNURL,
      currentPage: 1,
      campaign: 'jt520Diamonds',
      rankingList: [{
				id: 1,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 2,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 3,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 4,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}, {
				id: 5,
				avatar: 'https://cdn.xingstation.cn/fe/jintie-share-icon.png',
				desc: '',
				count: 888
			}]
    }
  },
  mounted() {
    this.fetchBoardList()
  },
  methods: {
    async fetchBoardList() {
      let params = {
        page: this.currentPage,
        campaign: this.campaign
      }
      try {
        Toast.loading('获取榜单中')
        let res = await getPhotoBoard(params)
        if (res.code === 0) {
          this.rankingList = res.data.data.slice(0, 5)
          Toast.hide()
        } else {
          Toast.failed('获取榜单失败')
        }
      } catch(e) {
        console.log(e)
        if (e.response) {
          e.response.data.message && Toast.failed(e.response.data.message, 0, true)
        } else {
          Toast.failed('未知错误，请刷新', 0, true)
        }
      }
    },
    onModalClose() {
			this.$emit('closeRank')
		}
  }
}
</script>

<style lang="less" scoped>
@base: "http://cdn.xingstation.cn";

.modalBox {
  position: relative;
  width: 100vw;
  text-align: center;

  .modal {
    width: 100%;
  }

  .tip {
    width: 52.44vw;
    margin-top: 6.67vw;
  }
  .rankingClose {
    width: 11.3vw;
    position: absolute;
    right: 8.89%;
    top: -10.65%;
  }
  .rankingList {
    position: absolute;
    top: 23.56%;
    left: 50%;
    width: 57.03vw;
    transform: translate(-50%, 0);
    .rankingItem {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 11.67vw;
      margin-bottom: 2%;
      .rankingInfo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .avatar {
        width: 11.6vw;
        height: 11.6vw;
        border-radius: 15px;
      }
      .desc {
        flex: 1;
        padding: 0 11.67vw 0 3vw;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #000;
        z-index: 999;
      }
      .count {
        position: absolute;
        right: 0;
        bottom: 30%;
        font-size: 12px;
        color: #000;
      }
    }
  }
}
</style>