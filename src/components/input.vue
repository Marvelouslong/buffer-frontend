<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { ref } from 'vue'
import myAxios from "../plugins/myAxios.ts";

const buf1Capa = ref(6)
const buf2Capa = ref(6)
const buf3Capa = ref(6)

const put1Num = ref(6)

const move2Num= ref(2)
const move3Num = ref(2)

const get2Num = ref(1)
const get3Num= ref(1)

const putSpeed= ref(1)
const moveSpeed= ref(1)
const getSpeed= ref(1)

/*import { isDark } from '~/composables/dark'*/

import { useRouter } from 'vue-router'; // 导入 useRouter 钩子
const router = useRouter(); // 使用 useRouter 钩子获取路由实例
const gotoWork = async () => {
  const res = await myAxios.post('/buffer/start', {
    buffer1size   : buf1Capa.value,
    buffer2size   : buf2Capa.value,
    buffer3size   : buf3Capa.value,
    putbuffer1num : put1Num.value,
    movebuffer2num: move2Num.value,
    movebuffer3num: move3Num.value,
    getbuffer2num : get2Num.value,
    getbuffer3num : get3Num.value,
    putspeed      : putSpeed.value,
    movespeed     : moveSpeed.value,
    getspeed      : getSpeed.value,
  })
  if (res.status === 200 &&"success" === res.data) {
    console.log("跳转到运行界面");
    router.push('/work');
  } else {

    console.log("提交失败");
  }
};
</script>




<template>
<div class="input_background_">
  <el-container >
    <el-header class="head_font_">
      请分别设置缓冲区容量、PUT、MOVE、GET个数以及速度，否则按默认值设置
      <p style="font-size: 20px;color: rgba(216,246,26,0.83)">buffer1由PUT，MOVE2,MOVE3操作；buffer2由MOVE2,GET2操作；buffer3由MOVE3,GET3操作；</p>
    </el-header>
  </el-container>
  <div class="settings_background_">
    <div class="slider-demo-block mgl" style="margin-top: 20px">
      <span class="demonstration">buffer1的容量</span>
      <el-slider v-model="buf1Capa" show-input />
    </div>
    <div class="slider-demo-block mgl">
    <span class="demonstration">buffer2的容量</span>
    <el-slider v-model="buf2Capa" show-input />
    </div>
    <div class="slider-demo-block mgl">
    <span class="demonstration">buffer3的容量</span>
    <el-slider v-model="buf3Capa" show-input />
   </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">PUTbuf1线程数量</span>
      <el-slider v-model="put1Num" show-input/>
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">MOVEbuf2线程数</span>
      <el-slider v-model="move2Num" show-input/>
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">MOVEbuf3线程数</span>
      <el-slider v-model="move3Num" show-input/>
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">GETbuf2线程数量</span>
      <el-slider v-model="get2Num" show-input/>
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">GETbuf3线程数量</span>
      <el-slider v-model="get3Num" show-input/>
    </div>
    <div class="slider-demo-block mgl" style="margin-top: 10px">
      <span class="demonstration">PUT的速度 /s</span>
      <el-slider v-model="putSpeed" :max="5" />
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">MOVE的速度 /s</span>
      <el-slider v-model="moveSpeed" :max="5" />
    </div>
    <div class="slider-demo-block mgl">
      <span class="demonstration">GET的速度 /s</span>
      <el-slider v-model="getSpeed" :max="5" />
    </div>
    <div class="setting_button_ " style="margin-bottom: 10px">
      <el-button @click="gotoWork" color="#626aef" size="large" class="custom-button-3">确认设置</el-button>
    </div>
  </div>
</div>



</template>



<style scoped>
/** {
  border: 1px solid black;
}*/
/*确认设置按钮设置*/
.setting_button_{
  margin-top:4%;
  margin-left: 45%;
}
/*滑块背景设置*/
.settings_background_{
  background-color: rgba(249,249,249,0.62);
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 170px;
}

/*页面背景设置*/
.input_background_ {
  background-image: url('../assets/input_bg.jpg'); /* 注意路径可能需要调整 */
  background-size: cover; /* 根据需要调整背景图片大小 */
  background-position: center; /* 根据需要调整背景图片位置 */
  background-repeat: no-repeat; /* 不重复背景图片 */
  min-height: 99vh; /* 确保至少占据整个视口的高度 */
  /* 可能还需要考虑 Element UI 组件的默认样式和边距 */
}
/*标题文字设置*/
.head_font_ {
  /* 设置字体大小 */
  font-size: 30px;
  /* 设置绝对定位 */
  position: absolute;
  top: 10%; /* 距离顶部的距离，根据您的需要调整 */
  left: 50%; /* 水平居中，相对于其最近的已定位祖先元素（而不是视口） */
  transform: translateX(-50%); /* 偏移自身宽度的50%，以实现真正的水平居中 */

  /* 可能还需要设置宽度和其他样式 */
  width: 100%; /* 或者一个具体的宽度 */
  text-align: center; /* 水平居中文本（如果设置了具体的宽度） */
}


/*设置左边距，使滑块居中*/
.mgl {
  margin-left: 25%;
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