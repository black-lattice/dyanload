<script setup>
import { loadModule } from 'vue3-sfc-loader';
import * as Vue from 'vue';
import Less from 'less';
import { defineAsyncComponent, defineProps, defineEmits } from 'vue';
import { getComponent } from '@/api/api.js';
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
});

const options = {
  // 远程组件需要的依赖
  moduleCache: {
    vue: Vue,
    less: Less,
  },
  async getFile(url) {
    try {
      const res = await getComponent(url);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async addStyle(textContent) {
    const style = Object.assign(document.createElement('style'), {
      textContent,
    });
    style.setAttribute('scoped', 'true');
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
let AsyncComponent = defineAsyncComponent(async () => {
  let res = await loadModule(props.url, options);
  return res;
});
</script>
<template>
  <AsyncComponent v-bind="$attrs">
    <AsyncComponent v-for="child of $attrs.children" :key="child.code" v-bind="child" />
  </AsyncComponent>
</template>
<style scoped lang="less"></style>
