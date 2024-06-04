<!-- InfiniteList.vue -->
<template>
  <el-descriptions :title="`${bufferValue}`" :column="1" style="width: 400px;margin-left: 20px;">
    <el-descriptions-item label="buffer中数据个数" class="el-descriptions-item">222</el-descriptions-item>
    <el-descriptions-item label="已放入数据个数" class="el-descriptions-item">      180</el-descriptions-item>
    <el-descriptions-item label="已取出数据个数" class="el-descriptions-item">      111</el-descriptions-item>
  </el-descriptions>
  <el-scrollbar ref="scrollbarRef" style="height: 300px;width: 300px;margin: 30px 70px;">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElScrollbar } from 'element-plus'
defineProps({
  bufferValue: {
    type: String,
    default: ''
  },
});

const max = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380
})
</script>

<style scoped>
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