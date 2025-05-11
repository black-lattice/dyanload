import axios from '@/axios/axios';
const routes = {
  data: [
    { path: '/home', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/home/child', name: 'child', tag: 'fenlei', tagName: '分类' },
    {
      path: '/markdown',
      name: 'markdown',
      tag: 'markdown',
      tagName: 'markdown',
    },
  ],
};
export const getRoutes = (appName) => {
  return Promise.resolve(routes); //axios.get(`/apps/${appName}/schema.json`)
};
const map = {
  '/home': [
    {
      code: '', // 组件唯一id
      data: {}, // 组件需要的参数
      title: '首页', // 组件名称
      desc: ' ', // 组件描述
      url: '/helloWorld.vue', // 组件地址
      children: [
        {
          code: '',
          data: {},
          title: '首页',
          desc: '',
          url: '/helloWorld.vue',
        },
      ],
    },
    {
      code: '',
      data: {},
      title: '首页',
      desc: ' ',
      url: '/helloWorld.vue',
    },
  ],
  '/about': '/helloWorld.vue',
  '/home/child': '/helloWorld.vue',
  '/markdown': '/helloWorld.vue',
};
export const getRoutesDesc = (appName = '', path) => {
  return Promise.resolve(map[path]); //axios.get(`/apps/${appName}/schema.json`);
};
/**
 * 获取组件
 * @param {string} url 组件地址
 * @returns
 */
export const getComponent = (url = '/helloWorld.vue') => {
  return axios.get(url);
};
