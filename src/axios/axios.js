import axios from 'axios';
axios.defaults.baseURL = '/apps';
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};
const instance = axios.create({
  baseURL: '/apps',
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  // 成功响应拦截器
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
