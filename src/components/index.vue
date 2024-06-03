<template>
  <div class="layout">
    <div class="common-layout">
      <el-container>
        <el-header>欢迎来到！</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.layout {
  /* 这里不需要背景样式，除非您想要对内部元素有额外的背景处理 */
}

.common-layout {
  background-image: url('../assets/test3.png'); /* 注意路径可能需要调整 */
  background-size: cover; /* 根据需要调整背景图片大小 */
  background-position: center; /* 根据需要调整背景图片位置 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  min-height: 99vh; /* 确保至少占据整个视口的高度 */
  /* 可能还需要考虑 Element UI 组件的默认样式和边距 */
}
/* 其他样式 */
</style>

<script setup lang="ts">
// ...
</script>