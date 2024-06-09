<template>
    <div class="common-layout">
      <el-container>
        <el-header class="custom-header">
          欢迎您进入多道程序缓冲区协调操作！
        </el-header>
      </el-container>
      <div class="button-container">
        <el-button @click="showHistoryDialog" type="primary" class="custom-button-3">历史</el-button>
      </div>
        <div v-if="buffer1Data && buffer2Data && buffer3Data">
          <!-- 显示buffer1的数据 -->
          <h3>Buffer 1</h3>
          <p v-if="buffer1Data">Message: {{ buffer1Data }}</p>
          <!-- 其他buffer1的字段... -->

          <!-- 显示buffer2和buffer3的数据（类似地） -->
          <!-- ... -->
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      <div class="button-container">
        <el-button @click="gotoIndex" type="primary" class="custom-button-3">启动</el-button>
      </div>
    </div>
</template>

<style scoped>

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
import { useRouter } from 'vue-router'; // 导入 useRouter 钩子
import { ref } from 'vue';
import myAxios from "../plugins/myAxios.ts";

const router = useRouter(); // 使用 useRouter 钩子获取路由实例
const gotoIndex = () => {
  console.log("跳转到主页面");
  router.push('/input'); // 跳转到主页路由
};
//TODO 调History
    const dialogVisible = ref(false);
    const buffersLoaded = ref(false); // 用来标记数据是否已加载
    const buffer1Data = ref<null | { message: string }>(null);
    const buffer2Data = ref(null);
    const buffer3Data = ref(null);
    async function fetchHistoryData() {
      try {
        const response = await myAxios.get('/buffer/getHistory'); // 调用后端API
        // 解析响应数据（这里只是一个示例，你需要根据实际的响应结构来解析）
        buffer1Data.value = response.data.buffer1;
        buffer2Data.value = response.data.buffer2;
        buffer3Data.value = response.data.buffer3;
        buffersLoaded.value = true; // 标记数据已加载
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    }

    function showHistoryDialog() {
      dialogVisible.value = true;
      fetchHistoryData(); // 在显示弹出框时获取数据
    }
// 暴露给模板的变量和方法
  defineExpose({
    dialogVisible,
    buffer1Data,
    buffer2Data,
    buffer3Data,
    buffersLoaded, // 如果模板需要用到这个状态，也可以暴露
    showHistoryDialog,
    gotoIndex,
  });

/*const resultData = ref(null); // 用于存储从后端获取的数据

const fetchResultData = async () => {
  try {
    // 假设你的API接口返回单个result数据，这里使用模拟的URL
    const response = await axios.get('/api/result/5'); // 获取ID为1的result数据
    resultData.value = response.data; // 假设后端返回的数据结构与你的result表结构一致
  } catch (error) {
    console.error('Error fetching result data:', error);
  }
};

onMounted(fetchResultData); // 组件挂载后获取数据*/
//TODO 总结平均评价
</script>