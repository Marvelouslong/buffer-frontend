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
          <el-button type="success" class="el-button" @click="startThreads">开始</el-button><!--togglePopover-->
        </template>
      </el-popover>
      <el-button type="danger" class="el-button" @click="toTotal">结束</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import InfiniteList from "./InfiniteList.vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const visible = ref(false)
const isFirstClick = ref(true);
const content = ref("暂停"); // 初始内容
const router=useRouter();

    async function startThreads() {
      if (isFirstClick.value) {
        // 发送 POST 请求到后端
        try {
          const response = await myAxios.post('/buffer/begin');
          // 处理响应或显示消息给用户
          console.log(response.data); // 打印 "Threads started successfully"
          isFirstClick.value = false;
        } catch (error) {
          // 处理错误
          console.error('Error starting threads:', error);
        }
      }else {
        // 第二次及之后点击时显示弹出框
        visible.value = true;
        // 然后设置一个3秒的延时来隐藏弹出框
        setTimeout(() => {
          visible.value = false;
        }, 1000);
      }
  }

function changContent() {
  if (content.value === "暂停") {
    content.value = "继续";
  } else {
    content.value = "暂停";
  }

}
const toTotal = () => {

  router.push({ path: '/total' })
  // router.push('/total')
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
  margin: 20px 170px; /* 根据需要调整按钮之间的间距 */
}
</style>