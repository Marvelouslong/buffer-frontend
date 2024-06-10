<template>
    <div class="common-layout">
      <el-container>
        <el-header class="custom-header">
          欢迎您进入多道程序缓冲区协调操作！
        </el-header>
      </el-container>
      <div class="button-container">
        <el-button plain @click="showHistoryDialog" type="primary" class="custom-button-3">历史</el-button>
      </div>
      <el-dialog v-model="drawer" title="历史记录" :with-header="false" class="custom-drawer" width="500">
                <div v-for="(item, index) in allBufferData" :key="index">
                  <h4>Buffer ID: {{ item.buffer_id }}</h4>
                  <div>
                    <h4>Buffer 1 </h4>
        <!--            <p>ID: {{ item.buffer1Item.buffer1_id }}</p>-->
<!--                    <p>message: </p>
                    <p v-html="replaceSemicolonWithNewline(item.buffer1Item.message)"></p>-->
                    <p v-if="item.buffer1Item.message !== null">
                      message: <span v-html="replaceSemicolonWithNewline(item.buffer1Item.message)"></span>
                    </p>
                    <p v-else>
                      message: (无消息)
                    </p>
                    <p v-if="item.buffer1Item.data !== null">
                      Data: {{ item.buffer1Item.data }}
                    </p>
                    <p v-else>
                      Data: (无数据)
                    </p>
                    <p>Content Number: {{ item.buffer1Item.contentnum }}</p>
                    <p>Free Space Number: {{ item.buffer1Item.freespacenum }}</p>
                  </div>
                  <div>
                    <h4>Buffer 2 </h4>
        <!--            <p>ID: {{ item.buffer2Item.buffer2_id }}</p>-->
<!--                    <p>message: </p>
                    <p v-html="replaceSemicolonWithNewline(item.buffer2Item.message)"></p>
                    <p>Data: {{ item.buffer2Item.data }}</p>-->
                    <p v-if="item.buffer2Item.message !== null">
                      message: <span v-html="replaceSemicolonWithNewline(item.buffer2Item.message)"></span>
                    </p>
                    <p v-else>
                      message: (无消息)
                    </p>
                    <p v-if="item.buffer2Item.data !== null">
                      Data: {{ item.buffer2Item.data }}
                    </p>
                    <p v-else>
                      Data: (无数据)
                    </p>
                    <p>Content Number: {{ item.buffer2Item.contentnum }}</p>
                    <p>Free Space Number: {{ item.buffer2Item.freespacenum }}</p>
                  </div>
                  <div>
                  <h4>Buffer 3 </h4>
        <!--          <p>ID: {{ item.buffer3Item.buffer3_id }}</p>-->
<!--                  <p>message: </p>
                  <p v-html="replaceSemicolonWithNewline(item.buffer3Item.message)"></p>
                  <p>Data: {{ item.buffer3Item.data }}</p>-->
                    <p v-if="item.buffer3Item.message !== null">
                      message: <span v-html="replaceSemicolonWithNewline(item.buffer3Item.message)"></span>
                    </p>
                    <p v-else>
                      message: (无消息)
                    </p>
                    <p v-if="item.buffer3Item.data !== null">
                      Data: {{ item.buffer3Item.data }}
                    </p>
                    <p v-else>
                      Data: (无数据)
                    </p>
                  <p>Content Number: {{ item.buffer3Item.contentnum }}</p>
                  <p>Free Space Number: {{ item.buffer3Item.freespacenum }}</p>
                </div>
                  <div>
                    <h4>Result </h4>
        <!--            <p>ID: {{ item.resultItem.rs_id }}</p>-->
                    <p>Runtime: {{item.resultItem.Runtime}}</p>
                    <p>putbuffer1num: {{item.resultItem.putbuffer1num}}</p>
                    <p>putbuffer2num: {{item.resultItem.putbuffer2num}}</p>
                    <p>putbuffer3num: {{item.resultItem.putbuffer3num}}</p>
                    <p>getbuffer1num: {{item.resultItem.getbuffer1num}}</p>
                    <p>getbuffer2num: {{item.resultItem.getbuffer1num}}</p>
                    <p>getbuffer3num: {{item.resultItem.getbuffer1num}}</p>
                  </div>
                  <p>-----------------------------------------------------------------------------</p>
                </div>
        </el-dialog>
      <div class="button-container">
        <el-button @click="gotoIndex" type="primary" class="custom-button-3">启动</el-button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'; // 导入 useRouter 钩子
import { ref } from 'vue';
import myAxios from "../plugins/myAxios.ts";

interface Buffer1Item {
  buffer1_id: number;
  message: string;
  data: string;
  contentnum:number;
  freespacenum:number;
}
interface Buffer2Item {
  buffer2_id: number;
  message: string;
  data: string;
  contentnum:number;
  freespacenum:number;
}
interface Buffer3Item {
  buffer3_id: number;
  message: string;
  data: string;
  contentnum:number;
  freespacenum:number;
}
interface ResultItem {
  rs_id:number;
  Runtime:string;
  putbuffer1num:number;
  putbuffer2num:number;
  putbuffer3num:number;
  getbuffer1num:number;
  getbuffer2num:number;
  getbuffer3num:number;
  avgbuffernum:number;
}

interface TotalBufferItem {
  buffer_id: number;
  buffer1Item:Buffer1Item;
  buffer2Item:Buffer2Item;
  buffer3Item:Buffer3Item;
  resultItem:ResultItem;
}
const allBufferData=ref<TotalBufferItem[]>([]);
const router = useRouter(); // 使用 useRouter 钩子获取路由实例
const gotoIndex = () => {
  console.log("跳转到主页面");
  router.push('/input'); // 跳转到主页路由
};

const drawer = ref(false)

//TODO 调History
    const buffersLoaded = ref(false); // 用来标记数据是否已加载
async function fetchHistoryData() {
  try {
    const response = await myAxios.get('/buffer/getHistory'); // 调用后端API
    if (response.data && typeof response.data === 'object') {
      const buffer1Data = (response.data.buffer1 || []) as Buffer1Item[];
      const buffer2Data = (response.data.buffer2 || []) as Buffer2Item[];
      const buffer3Data = (response.data.buffer3 || []) as Buffer3Item[];
      const resultData = (response.data.res || []) as ResultItem[];

      // 创建一个Map来快速查找ResultItem，基于rs_id
      const resultMap = new Map<number, ResultItem>();
      resultData.forEach(item => resultMap.set(item.rs_id, item));

      // 初始化allBufferData数组
      allBufferData.value = buffer1Data.map((buffer1Item: Buffer1Item) => {
        const buffer_id = buffer1Item.buffer1_id; // 假设buffer1Item有buffer1_id属性
        const buffer2Item = buffer2Data[buffer1Data.indexOf(buffer1Item)] || null; // 注意这种匹配可能不是最佳实践
        const buffer3Item = buffer3Data[buffer1Data.indexOf(buffer1Item)] || null; // 同上
        const resultItem = resultMap.get(buffer_id) || null; // 尝试从Map中获取匹配的ResultItem

        return {
          buffer_id,
          buffer1Item,
          buffer2Item,
          buffer3Item,
          resultItem
        } as TotalBufferItem; // 明确指定返回类型为TotalBufferItem
      });

      buffersLoaded.value = true; // 标记数据已加载
    } else {
      // 抛出错误或显示警告，因为response.data的格式不是你预期的
      console.error('Unexpected response data format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching history data:', error);
  }
}
    function showHistoryDialog() {
      drawer.value = true; // 先打开抽屉
      fetchHistoryData(); // 然后加载数据，注意这里使用了await来确保数据加载完成后再进行其他操作
    }
// 暴露给模板的变量和方法
  defineExpose({
    drawer,
    allBufferData, // 暴露整合后的数据
    buffersLoaded, // 如果模板需要用到这个状态，也可以暴露
    showHistoryDialog,
    gotoIndex,
  });
  function replaceSemicolonWithNewline(message: string): string {
    // 先删除第一个分号
    let modifiedMessage = message.replace(/;/, '');
    // 然后将剩余的分号替换为<br>
    modifiedMessage = modifiedMessage.replace(/;/g, '<br>');
    return modifiedMessage;
  }

</script>
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

.custom-drawer {
  /* 假设你想要将宽度设置为 600px */
  width: 1000px !important; /* 使用 !important 以覆盖可能存在的其他样式 */
  /* 你还可以添加其他样式，如 height, position, etc. */
}

/* 如果抽屉是右侧滑出的（默认），并且你想要设置它的最小宽度 */
.el-drawer__body {
  min-width: 600px; /* 根据需要调整 */
}
/* 其他样式 */
</style>