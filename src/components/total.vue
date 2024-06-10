<template>
<div class='background-image'>
<!--  <el-rate v-model="value" allow-half />-->
  <div class="test">
  <span class="demonstration">希望您能为本系统评分！您的建议就是对我们最好的回报！<br></span>
  <el-rate
      v-model="value"
      :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
      show-text
  />
  </div>
  <div class="container" style="background-color: rgba(245,245,245,0.76)" >
    <div class="title-size">{{ title }}</div>
    <!--时间和平均-->
    <el-input
          disabled="true"
          v-model="runtime"
          style="max-width: 600px"
          placeholder="时间示例"
      >
        <template #prepend>总的运行时间为</template>
      </el-input>
    <el-input
        disabled="true"
        v-model="avgbuffernum"
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

    >
      <el-table :data="getbuffer1">
        <el-table-column width="150"  property="data1" label="buffer1中数据" />
        <el-table-column width="100" property="put1" label="已存" />
        <el-table-column width="300" property="get1" label="已取" />
      </el-table>
      <template #reference>
        <el-button style="margin-right: 16px">B1汇总</el-button>
      </template>
    </el-popover>

    <!-- 第二个按钮和弹出层 -->
    <el-popover
        placement="right"
        width="400"
        trigger="click"
    >
      <el-table :data="getbuffer2">
        <el-table-column width="150" property="data2" label="buffer2中数据" />
        <el-table-column width="100" property="put2" label="已存" />
        <el-table-column width="300" property="get2" label="已取" />
      </el-table>
      <template #reference>
        <el-button style="margin-right: 16px">B2汇总</el-button>
      </template>
    </el-popover>

    <!-- 第三个按钮和弹出层 -->
    <el-popover
        placement="right"
        width="400"
        trigger="click"
    >
      <el-table :data="getbuffer3">
        <el-table-column width="150" property="data3" label="buffer3中数据" />
        <el-table-column width="100" property="put3" label="已存" />
        <el-table-column width="300" property="get3" label="已取" />
      </el-table>
      <template #reference>
        <el-button>b3汇总</el-button>
      </template>
    </el-popover>
  </div>

<!--again和ok-->
    <div class="button-group">
      <button @click="towork">Back</button>
      <button @click="toindex">OK</button>
    </div>
  </div>

</div>
</template>

<script lang="ts" setup>
import { ref, onMounted} from 'vue';
import {useRouter,useRoute} from "vue-router";
const route = useRoute();
/*import myAxios from "../plugins/myAxios.ts";*/
const value = ref();
const runtime = ref(route.query.runTime);
const avgbuffernum = ref(route.query.avgBufferNum);
// 定义响应式数据
const title = ref('buffer汇总数据');
const router=useRouter();

// 假设的 gridData
const getbuffer1 = ref([
  {
    data1:ref(route.query.buffer1ContentNum),
    put1: ref(route.query.putBuffer1Num),
    get1: ref(route.query.getBuffer1Num),
  },

]);
const getbuffer2 = ref([
  {
    data2:ref(route.query.buffer2ContentNum),
    put2: ref(route.query.putBuffer2Num),
    get2: ref(route.query.getBuffer2Num),
  },

]);
const getbuffer3 = ref([
  {
    data3:ref(route.query.buffer3ContentNum),
    put3: ref(route.query.putBuffer3Num),
    get3: ref(route.query.getBuffer3Num),
  },

]);
const toindex=()=>
{
  router.push({ path: '/' });
}
const towork=()=>
{
  router.push({ path: '/work' });
}
onMounted(() => {});
</script>

<style scoped>


/* 添加你的样式 */
.background-image {
  background-image: url('../assets/test666.png');
  background-size: cover; /* 根据需要调整背景图片大小 */
  background-position: center; /* 根据需要调整背景图片位置 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  min-height: 100vh; /* 确保至少占据整个视口的高度 */
  width: 100%;
  margin-top: 0;
}

.test{
  width: 40%;
  padding: 20px; /* 添加内边距 */
  box-sizing: border-box; /* 边框和内边距包含在元素的宽度和高度内 */
  margin: 5% 100px;
  text-align: center;
  position: absolute;
  top: 5%;
  left: 40%;
  transform: translate(-50%, -50%);
}

.container {
  width: 50%;
  height: 300px;
  max-width: 1000px;
  padding: 20px; /* 添加内边距 */
  box-sizing: border-box; /* 边框和内边距包含在元素的宽度和高度内 */
  margin: 0 100px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translate(-50%, -50%);
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
