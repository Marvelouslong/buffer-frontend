<template>
  <div class="container">
    <div class="list-wrapper" style="float: left; width: 30%; margin-right: 5%;">
      <InfiniteList bufferValue="Buffer1" />
    </div>
    <div class="list-wrapper" style="float: left; width: 30%; margin-right: 5%;">
      <InfiniteList bufferValue="Buffer2" />
    </div>
    <div class="list-wrapper" style="float: left; width: 30%;">
      <InfiniteList bufferValue="Buffer3" />
    </div>
    <div  class="list-button">
      <el-button type="primary" class="el-button">暂停</el-button>
      <el-button type="success" class="el-button">开始</el-button>
      <el-button type="danger" class="el-button">结束</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InfiniteList from "./InfiniteList.vue";
</script>

<style scoped>
.container{
  width: 1485px;
  height: 730px;
  background-image: url('../assets/han.png'); /* 注意路径可能需要调整 */
  background-size: cover; /* 根据需要调整背景图片大小 */
  background-position: center; /* 根据需要调整背景图片位置 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  min-height: 99vh; /* 确保至少占据整个视口的高度 */
}
.list-wrapper {
  overflow: auto;
}
.el-button{
  margin-top: 100px;
  margin-right: 100px;
  margin-left: 100px;
}
</style>