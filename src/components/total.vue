<template>
  <div class='background-image'>
  <div class="container">
    <div class="title-size">{{ title }}</div>
    <!--时间和平均-->
    <el-input
          v-model="input1"
          style="max-width: 600px"
          placeholder="时间示例"
      >
        <template #prepend>总的运行时间为</template>
      </el-input>
    <el-input
        v-model="input1"
        style="max-width: 600px"
        placeholder="平均buffer示例"
    >
    <template #prepend>平均buffer次数</template>
    </el-input>

<!--三个按钮-->
    <div style="display: flex; align-items: center" class="button-group">
    <!-- 第一个按钮和弹出层 -->
    <el-popover
        placement="right"
        width="400"
        trigger="click"
        v-model="popover1Visible"
    >
      <el-table :data="gridData1">
        <el-table-column width="150" property="date" label="buffer1中已有" />
        <el-table-column width="100" property="name" label="已存" />
        <el-table-column width="300" property="address" label="已取" />
      </el-table>
      <template #reference>
        <el-button style="margin-right: 16px">B1history</el-button>
      </template>
    </el-popover>

    <!-- 第二个按钮和弹出层 -->
    <el-popover
        placement="right"
        width="400"
        trigger="click"
        v-model="popover2Visible"
    >
      <el-table :data="gridData2">
        <el-table-column width="150" property="date" label="buffer2中已有" />
        <el-table-column width="100" property="name" label="已存" />
        <el-table-column width="300" property="address" label="已取" />
      </el-table>
      <template #reference>
        <el-button style="margin-right: 16px">B2history</el-button>
      </template>
    </el-popover>

    <!-- 第三个按钮和弹出层 -->
    <el-popover
        placement="right"
        width="400"
        trigger="click"
        v-model="popover3Visible"
    >
      <el-table :data="gridData3">
        <el-table-column width="150" property="date" label="buffer3中已有" />
        <el-table-column width="100" property="name" label="已存" />
        <el-table-column width="300" property="address" label="已取" />
      </el-table>
      <template #reference>
        <el-button>b3history</el-button>
      </template>
    </el-popover>
  </div>

<!--again和ok-->
    <div class="button-group">
      <button @click="goAgain">again</button>
      <button @click="goOK">OK</button>
    </div>
  </div>

</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 定义响应式数据
const title = ref('buffer汇总数据');
// 假设的 gridData
const gridData1 = ref([
  {
    date: '10',
    name: '2',
    address: '3',
  },

]);
const gridData2 = ref([
  {
    date: '10',
    name: '2',
    address: '3',
  },

]);
const gridData3 = ref([
  {
    date: '10',
    name: '2',
    address: '3',
  },

]);

// 定义方法
function goAgain() {
  this.$router.go(-1); // 导航到上一个页面
}
function goOK() {
  this.$router.go(-1); // 导航到上一个页面
}

// 将方法暴露给模板
defineExpose({
  goAgain,
  goOK
});
</script>

<style scoped>

/* 添加你的样式 */
.background-image {
  background-image: url('../assets/total.jpg');
  background-size: cover; /* 根据需要调整背景图片大小 */
  background-position: center; /* 根据需要调整背景图片位置 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  min-height: 99vh; /* 确保至少占据整个视口的高度 */

}

.container {
  width: 100%;
  max-width: 600px;
  border: 2px solid rgba(53, 47, 155, 0.75); /* 边框宽度为5px，颜色为蓝色（#0000ff） */
  padding: 20px; /* 添加内边距 */
  box-sizing: border-box; /* 边框和内边距包含在元素的宽度和高度内 */
margin: 100px 100px;
  text-align: center;
}

.title-size {
  font-size: 22px; /* 五号字对应的近似像素值 */
  color: #190c7d;
  font-weight: bold; /* 字体加粗 */
  text-align: left; /* 文本靠左显示 */
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.button-group button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #c0f7e5;
  color: #000007;
  cursor: pointer;
  margin-right: 10px;
}

.button-group button:hover {
  background-color: #f596e7;
}



</style>
