import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
// 引入icon组件
import MyIcon from "@/components/MyIcon";
// 引入vant
import Vant from "vant";
// 引入vant样式
import "vant/lib/index.less";
// 引入 lib-flexible 动态设置 REM 基准值
import "amfe-flexible";
// 引入axios请求文件
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data);
});
// 使用vant组件
Vue.use(Vant);
// 注册全局组件
Vue.component("MyIcon", MyIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
