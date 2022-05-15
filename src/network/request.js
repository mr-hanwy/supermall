import axios from 'axios';

export function request(config) {
  // 初始化配置
  let instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  });

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 请求前操作
    return config;
  }, error => {
    // 请求发送失败
    console.log(error);
  });

  // 响应拦截
  instance.interceptors.response.use(result => {
    // 响应成功
    return result.data;
  }, error => {
    // 服务器响应错误
    console.log(error);
  });

  return instance(config);
}
