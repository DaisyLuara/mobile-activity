<template>
  <div 
    v-if="show" 
    class="del-remind" 
    @click.self="handleModalHide"
  >
    <div class="modal">
      <div class="title">
        {{ title }}
      </div>
      <div class="sub-title">
        {{ subTitile }}
      </div>
      <div 
        class="main-button" 
        @click="handleDeleteConfirm"
      >
        {{ mainButtonText }}
      </div>
      <div 
        class="sub-button" 
        @click="handleModalHide"
      >
        {{ subButtonText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      title: "是否删除照片",
      subTitile: "删除照片将无法找回",
      mainButtonText: "确定删除",
      subButtonText: "取消"
    };
  },
  methods: {
    handleModalHide() {
      this.$emit("onHandleModalHide");
    },
    handleDeleteConfirm() {
      this.$emit("handleDeleteConfirm");
    }
  }
};
</script>

<style lang="less" scoped>
.del-remind {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    background: white;
    width: 1.98rem;
    height: 1.9rem;
    border-radius: 0.17rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .title {
      font-size: 0.18rem;
      color: rgba(34, 34, 34, 1);
      margin-top: 0.25rem;
    }
    .sub-title {
      margin-top: 0.02rem;
      font-size: 0.11rem;
      color: rgba(255, 22, 22, 1);
    }
    .main-button {
      margin-top: 0.255rem;
      font-size: 0.14rem;
      width: 1.55rem;
      height: 0.345rem;
      background: rgba(109, 30, 255, 1);
      opacity: 1;
      border-radius: 0.175rem;
      color: white;
      line-height: 0.345rem;
    }
    .sub-button {
      margin-top: 0.125rem;
      font-size: 0.14rem;
      width: 1.555rem;
      height: 0.345rem;
      line-height: 0.345rem;
      border: 1px solid rgba(112, 112, 112, 1);
      opacity: 1;
      border-radius: 0.175rem;
    }
  }
}
</style>
