import axios from "axios";
import { ElMessage } from "element-plus";

// 创建 axios 实例
const request = axios.create({
  // baseURL: "http://localhost:8080", // 替换为你的后端地址
  timeout: 20000, // 请求超时时间
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器-----验证登录状态用的
// service.interceptors.request.use(
//   (config) => {
//     // 从 localStorage 获取 token（示例）
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一处理后端返回的业务状态

    const { code, data, message } = response.data;

    if (code === 200) {
      return data; // 直接返回业务数据
    } else {
      // 业务错误（如 token 过期、参数错误等）
      ElMessage.error(`错误: ${message || "请求失败"}`);
      return Promise.reject(new Error(message || "请求失败"));
    }
  },
  (error) => {
    // 网络错误或服务器错误
    if (error.message.includes("timeout")) {
      ElMessage.error("请求超时，请重试！");
    } else if (error.response) {
      ElMessage.error(`服务器错误: ${error.response.status}`);
    }
    return Promise.reject(error);
  },
);

export default request;
