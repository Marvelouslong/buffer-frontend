<script setup lang="ts">
import { ref } from 'vue'

const buf1Capa = ref(10)
const buf2Capa = ref(20)
const buf3Capa = ref(20)
const putNum = ref(10)
const moveNum = ref(2)
const getNum = ref(20)

</script>




<template>
<div class="input_background_">
  <el-container >
    <el-header class="head_font_">
      请分别设置缓冲区容量、PUT、MOVE、GET个数，否则按默认值设置
    </el-header>
  </el-container>

    <div class="slider-demo-block mgl">
      <span class="demonstration">buffer1 capacity</span>
      <el-slider v-model="buf1Capa" show-input />
    </div>
    <div class="slider-demo-block mgl">
    <span class="demonstration">buffer2 capacity</span>
    <el-slider v-model="buf2Capa" show-input />
    </div>
    <div class="slider-demo-block mgl">
    <span class="demonstration">buffer2 capacity</span>
    <el-slider v-model="buf3Capa" show-input />
   </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">PUT number</span>
      <el-slider v-model="putNum" show-input/>
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">MOVE number</span>
      <el-slider v-model="moveNum" disabled show-input/>
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">GET number</span>
      <el-slider v-model="getNum" show-input/>
    </div>
</div>
</template>



<style scoped>
* {
  border: 1px solid black;
}

.input_background_ {
  background-image: url('../assets/index_bg.jpg'); /* 注意路径可能需要调整 */
  background-size: cover; /* 根据需要调整背景图片大小 */
  background-position: center; /* 根据需要调整背景图片位置 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  min-height: 99vh; /* 确保至少占据整个视口的高度 */
  /* 可能还需要考虑 Element UI 组件的默认样式和边距 */
}

.head_font_ {
  /* 设置字体大小 */
  font-size: 30px;
  /* 设置绝对定位 */
  position: absolute;
  top: 20%; /* 距离顶部的距离，根据您的需要调整 */
  left: 50%; /* 水平居中，相对于其最近的已定位祖先元素（而不是视口） */
  transform: translateX(-50%); /* 偏移自身宽度的50%，以实现真正的水平居中 */

  /* 可能还需要设置宽度和其他样式 */
  width: 100%; /* 或者一个具体的宽度 */
  text-align: center; /* 水平居中文本（如果设置了具体的宽度） */
}


/*设置左边距，使滑块居中*/
.mgl {
  margin-left: 32%;
}

.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center; /* 水平居中 */
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
  width: 50%; /* 设置滑块宽度为100% */
}
.slider-demo-block .demonstration {
  font-size: 20px;
  font-family: Bahnschrift;
  color: rgb(7, 156, 239);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

/*滑块居中*/
/*.slider_center_{
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: 50vh;  设置容器高度为视口高度，使其垂直居中
}*/

</style>