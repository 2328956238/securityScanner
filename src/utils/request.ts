import axios from 'axios';

const request = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

request.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权
          break;
        case 403:
          // 处理禁止访问
          break;
        case 404:
          // 处理未找到
          break;
        default:
          // 处理其他错误
      }
    }
    return Promise.reject(error);
  }
);

export default request;
