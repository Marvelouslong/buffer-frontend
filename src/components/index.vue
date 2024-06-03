<template>
    <div class="common-layout">
      <el-container>
        <el-header class="custom-header">
          欢迎您进入多道程序缓冲区协调操作！
        </el-header>
      </el-container>
      <div class="button-container">
        <el-button @click="gotoMain" type="primary" class="custom-button-3">启动</el-button>
        <!-- 用于显示路由视图的RouterView -->

          <!--
            tag="a"
            href="https://github.com/element-plus/element-plus"
            target="_blank"
            rel="noopener noreferrer"-->
      </div>
      <router-view></router-view>
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

.custom-header {
  /* 设置字体大小 */
  font-size: 30px; /* 或者您想要的任何大小 */

  /* 设置绝对定位 */
  position: absolute;
  top: 100px; /* 距离顶部的距离，根据您的需要调整 */
  left: 50%; /* 水平居中，相对于其最近的已定位祖先元素（而不是视口） */
  transform: translateX(-50%); /* 偏移自身宽度的50%，以实现真正的水平居中 */

  /* 可能还需要设置宽度和其他样式 */
  width: 100%; /* 或者一个具体的宽度 */
  text-align: center; /* 水平居中文本（如果设置了具体的宽度） */
}

.button-container {
  /* 为容器设置相对定位，以便子元素可以使用绝对定位 */
  position: relative;
  width: 100%; /* 根据需要设置容器的宽度 */
  height: 300px; /* 根据需要设置容器的高度 */
  display: flex; /* 如果想要按钮水平排列，可以使用flex布局 */
  justify-content: space-around; /* 在flex容器中水平均匀分布按钮 */
  align-items: center; /* 在flex容器中垂直居中按钮 */
  /* 其他样式... */
}

.custom-button-3 {
  /* 同上，可以根据需要添加定位属性 */
  position: absolute;
  bottom: 10px;
  left: 45% ;
  width: 150px;
  height: 60px;

  /* 设置内边距，使按钮内部的空间更大 */
  padding: 10px 20px;

  /* 设置字体大小 */
  font-size: 20px;
}
/* 其他样式 */
</style>

<script setup lang="ts">
//import { ref } from 'vue'; // 如果需要响应式状态，可以导入 ref
import { useRouter } from 'vue-router'; // 导入 useRouter 钩子

const router = useRouter(); // 使用 useRouter 钩子获取路由实例

// 定义 gotoMain 方法
const gotoMain = () => {
  console.log("跳转到主页面");
  router.push('/main'); // 跳转到主页路由
};
</script>