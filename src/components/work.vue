<template>
  <div class="container">
    <div class="list-wrapper" style="float: left; width: 30%; margin-right: 5%;">
      <InfiniteList :bufferValue="bufferValue1" />
    </div>
    <div class="list-wrapper" style="float: left; width: 30%; margin-right: 5%;">
      <InfiniteList :bufferValue="bufferValue2" />
    </div>
    <div class="list-wrapper" style="float: left; width: 30%;">
      <InfiniteList :bufferValue="bufferValue3" />
    </div>
    <div  class="list-button">
      <el-button type="primary" class="el-button" @click="changContent">{{ content }}</el-button>
      <el-popover
          placement="bottom"
          title="tips:"
          :width="200"
          trigger="hover"
          content="已经开始了"
          :visible="visible"
      >
        <template #reference>
          <el-button type="success" class="el-button" @click="startThreads">开始</el-button>
        </template>
      </el-popover>
      <el-popover
          placement="top-start"
          :width="200"
          trigger="hover"
      >
        Put线程阻塞个数   {{putthreadblocknum}}
        <br>
        Move线程阻塞个数   {{movethreadblocknum}}
        <br>
        Get线程阻塞个数   {{getthreadblocknum}}
        <template #reference>
          <el-button class="el-button" type="warning" style="width: 120px" @click="fetchData">查看阻塞线程</el-button>
        </template>
      </el-popover>
      <el-button type="danger" class="el-button" @click="toTotal">结束</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
//TODO 挪空问题
import {ref} from "vue";
import InfiniteList from "./InfiniteList.vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const visible = ref(false)
const isFirstClick = ref(true);
const content = ref("暂停"); // 初始内容
const router=useRouter();
const putthreadblocknum=ref(0);
const movethreadblocknum=ref(0);
const getthreadblocknum=ref(0);
const bufferValue1 = ref("Buffer1");
const bufferValue2 = ref("Buffer2");
const bufferValue3 = ref("Buffer3");
let intervalId: NodeJS.Timeout | null =null;

async function startThreads() {
  if (isFirstClick.value) {
    // 发送 POST 请求到后端
    try {
      const response = await myAxios.post('/buffer/begin');
      // 处理响应或显示消息给用户
      console.log(response.data); // 打印 "Threads started successfully"
      isFirstClick.value = false;
      if (intervalId) {
        clearInterval(intervalId)
      }
      intervalId = setInterval(fetchData, 500); // 每0.05秒调用一次 fetchData
      // intervalId = setInterval(fetchData1, 500); // 每0.05秒调用一次 fetchData
    } catch (error) {
      // 处理错误
      console.error('Error starting threads:', error);
    }
  }else {
    // 第二次及之后点击时显示弹出框
    visible.value = true;
    // 然后设置一个1秒的延时来隐藏弹出框
    setTimeout(() => {
      visible.value = false;
    }, 1000);
  }
}

const fetchData=async () => {
  try {
    const response = await myAxios.get('/buffer/threadblock');
    putthreadblocknum.value = response.data.putthreadblocknum;
    movethreadblocknum.value = response.data.movethreadblocknum;
    getthreadblocknum.value = response.data.getthreadblocknum;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// const fetchData1=async () => {
//   try {
//     const response1 = await myAxios.get('/buffer/getbuffer');
//     // 假设返回的数据结构与你的变量相对应
//
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }
function changContent() {
  if (content.value === "暂停") {
    content.value = "继续";
  } else {
    content.value = "暂停";
  }
}
const toTotal = () => {
  router.push({ path: '/total' })
};
</script>

<style scoped>
.container{
  width: 1460px;
  height: 590px;
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
  width: 90px;
  height: 30px;
  display: inline-block; /* 将按钮设置为内联块元素，以便它们可以水平排列 */
  margin-left:250px; /* 根据需要调整按钮之间的间距 */
  margin-top: 20px;
}
</style>