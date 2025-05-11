import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getRoutes } from '@/api/api.js';
import Bear from '@/components/bear.vue';
export const useRouteStore = defineStore('routeSchema', () => {
  /**
   * {
   *    "route": jsonSchema,
   * }
   */
  const appName = ref(''); //当前应用nam
  const menu = ref({});
  const routeMap = new Map();
  const setRouteDesc = (route, schema) => {
    routeMap.set(route, schema);
  };
  /**
   * 通过appName获取路由信息
   * @param {*} appName
   */
  const loadRoutes = (appName) => {
    return getRoutes(appName).then((res) => {
      formatMenu(res.data);
      const routes = formatRoutes(res.data);
      routes.forEach((route) => {
        setRouteDesc(route.path, '');
      });
      return routes;
    });
  };
  /**
   * 格式化路由
   * @param {*} routes ['/xx','/xxx/xx','/xx/xxx/xx']
   */
  function formatRoutes(routes) {
    if (!routes || routes.length === 0) {
      return [];
    }
    return routes.map((route, index) => {
      return {
        path: route.path,
        name: route.name,
        redirect: route.redirect || '',
        meta: {
          tag: route.tag,
          tagName: route.tagName,
        },
        component: Bear,
      };
    });
  }
  function formatMenu(routes) {
    if (!routes) {
      return;
    }
    routes.forEach((route) => {
      if (!route.tag) {
        menu.value[route.path] = route;
      } else {
        menu.value[route.tag]
          ? menu.value[route.tag].children.push(route).sort((a, b) => {
              return a.name.localCompare(b.name);
            })
          : (menu.value[route.tag] = {
              tag: route.tag,
              tagName: route.tagName,
              children: [route],
            });
      }
    });
  }
  return {
    appName,
    menu,
    routeMap,
    loadRoutes,
    setRouteDesc,
  };
});
