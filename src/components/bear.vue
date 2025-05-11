<script setup>
import Load from './load.vue';
import { ref, watch } from 'vue';
import { getRoutesDesc } from '@/api/api.js';
import { useRoute } from 'vue-router';
import { useRouteStore } from '@/store/index';
const route = useRoute();
const routeStore = useRouteStore();
const compPath = ref([]);

getCompPath();
watch(
  () => route.path,
  () => {
    getCompPath();
  }
);
async function getCompPath() {
  const res = await getRoutesDesc(routeStore.appName.value, route.path);
  routeStore.setRouteDesc(route.path, res);
  compPath.value = routeStore.routeMap.get(route.path);
}
</script>
<template>
  <div class="bear">
    <Suspense>
      <template v-for="comp of compPath" :key="comp.code">
        <Load v-bind="comp" />
      </template>
    </Suspense>
  </div>
</template>
<style scoped lang="less">
.bear {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
