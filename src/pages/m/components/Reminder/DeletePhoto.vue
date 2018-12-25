<template>
  <div class="del-remind">
    <div class="modal">
      <div class="title">{{title}}</div>
      <div class="sub-title">{{subTitile}}</div>
      <div class="main-button">{{mainButtonText}}</div>
      <div class="sub-button">{{subButtonText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "是否删除照片",
      subTitile: "删除照片将无法找回",
      mainButtonText: "确定删除",
      subButtonText: "取消"
    };
  }
};
</script>

<style lang="less" scoped>
.del-remind {
  position: absolute;
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
    width: 3.96rem;
    height: 3.8rem;
    border-radius: 0.34rem;
    text-align: center;
    .title {
      font-size: 0.36rem;
      color: rgba(34, 34, 34, 1);
    }
    .sub-title {
      font-size: 0.22rem;
      color: rgba(255, 22, 22, 1);
    }
    .main-button {
      font-size: 0.28rem;
      width: 3.11rem;
      height: 0.69rem;
      background: rgba(109, 30, 255, 1);
      opacity: 1;
      border-radius: 0.35rem;
      color: white;
    }
    .sub-button {
      font-size: 0.28rem;
      width: 3.11rem;
      height: 0.69rem;
      border: 1px solid rgba(112, 112, 112, 1);
      opacity: 1;
      border-radius: 0.35rem;
    }
  }
}
</style>
