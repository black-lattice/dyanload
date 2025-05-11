<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
<template>
  <div class="counter">
    <h1>Hello World</h1>
    <button @click="count++">count is: {{ count }}</button>
    <slot></slot>
  </div>
</template>
<style scoped lang="less">
.counter {
  width: 100%;
  height: 300px;
  background-color: #ea1f1f;
  display: flex;
  flex-direction: column;
}
</style>
