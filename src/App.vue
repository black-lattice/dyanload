<script setup>
import { RouterView, useRouter } from 'vue-router';
import { IconApps, IconBug, IconBulb } from '@arco-design/web-vue/es/icon';
import { useRouteStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
document.body.setAttribute('arco-theme', 'dark');
const routeStore = useRouteStore();
routeStore.loadRoutes().then((res) => {
  res.forEach((item) => {
    router?.addRoute(item);
  });
});

const { menu } = storeToRefs(routeStore);
const menuLists = computed(() => {
  return Object.values(menu.value);
});
const router = useRouter();
const handleMenuClick = (e) => {
  e.includes('/') ? router.push(e) : '';
};
</script>

<template>
  <div class="top"></div>
  <div class="content">
    <div class="menu">
      <a-menu mode="pop" showCollapseButton style="height: 100%" @menu-item-click="handleMenuClick" @sub-menu-click="handleMenuClick">
        <template v-for="item of menuLists">
          <template v-if="item?.children && item.children.length">
            <a-sub-menu :key="item.tag">
              <template #icon><icon-bug></icon-bug></template>
              <template #title>{{ item.tagName }}</template>
              <a-menu-item v-for="sub of item.children" :key="sub.path">{{ sub.name }}</a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="item.path">
              <template #icon><icon-safe></icon-safe></template>
              {{ item.name }}
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="less">
.top {
  width: 100%;
  height: 64px;
}
.content {
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  .menu {
    height: 100%;
  }
  .container {
    flex: 1;
  }
}
</style>
