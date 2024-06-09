<!-- InfiniteList.vue -->
<template>
  <el-card class="blurred-card" style="max-width: 400px;margin: 20px 20px;height: 550px;">
    <p>{{bufferValue}}</p>
    <p>buffer中的数据{{bufferdata}}</p>
    <p>当前buffer中数据个数{{datanum}}</p>
    <p>已放入数据个数{{putnum}}</p>
    <p>已取出数据个数{{getnum}}</p>
    <el-scrollbar ref="scrollbarRef" style="height: 300px;width: 290px;margin: 30px 10px;">
      <div ref="innerRef">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from 'vue'
import { ElScrollbar } from 'element-plus'
import myAxios from "../plugins/myAxios.ts";
const props = defineProps({
  bufferValue: {
    type: String,
    default: ''
  },
});

const max = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const datanum=ref(0);
const bufferdata=ref(0);
const putnum=ref(0);
const getnum=ref(0);
let intervalId: null | NodeJS.Timeout =null;
const fetchData=async () => {
  try {
    const response = await myAxios.get('/buffer/getBuffer',{
      params: {
        bufferValue: props.bufferValue, // 这里将 bufferValue 作为查询参数发送
      }
    });
    bufferdata.value = response.data.data1;
    datanum.value = response.data.contentNum;
    putnum.value = response.data.putbuffernum;
    getnum.value = response.data.getbuffernum;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const fetchMessage=async () => {
  try {
    const response = await myAxios.get('/buffer/getBuffer',{
      params: {
        bufferValue: props.bufferValue, // 这里将 bufferValue 作为查询参数发送
      }
    });
    bufferdata.value = response.data.data1;
    datanum.value = response.data.contentNum;
    putnum.value = response.data.putbuffernum;
    getnum.value = response.data.getbuffernum;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
  intervalId = setInterval(fetchData, 500); // 每0.05秒调用一次 fetchData
  intervalId = setInterval(fetchMessage, 500); // 每0.05秒调用一次 fetchData
})
// 在组件卸载前清除定时器
onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  intervalId = null;
});
</script>
<style scoped>
.blurred-card{
  /* 添加背景色作为模糊效果的基础 */
  background-color: rgba(255, 255, 255, 0.8); /* 示例：半透明的白色 */

  /* 使用 backdrop-filter 实现背景虚化效果 */
  backdrop-filter: blur(10px); /* 模糊半径为10px */

  /* 为了兼容一些不支持 backdrop-filter 的浏览器，可以添加备选样式 */
  /* 例如使用 filter: blur()，但注意这会模糊卡片内的所有内容 */
  /* filter: blur(10px); */

  /* 根据需要添加其他样式 */
  border-radius: 10px; /* 添加圆角 */
  overflow: hidden; /* 确保内容不溢出卡片外部 */
  padding: 20px; /* 添加内边距 */
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>