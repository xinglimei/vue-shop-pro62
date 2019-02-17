// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

//引入global.css全局样式控制文件
import "./assets/css/global.css";

//引入‘图标’样式
import "./assets/font_k56my7oadl9/iconfont.css";

//引入element-ui组件模块
import ElementUI from "element-ui";

//引入axios并做相关配置
import axios from "axios";
//axios请求根地址
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
//axios的请求拦截器（在其中配置token）
axios.interceptors.request.use(
  function(config) {
    //config代表axios的子级配置对象
    var token = window.sessionStorage.getItem("token");
    config.headers.Authorization = token; //必须在请求头中使用Authorization字段提供的token令牌
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//给axios配置给Vue的¥http成员
Vue.prototype.$http = axios;

//把element-ui注册给vue
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
