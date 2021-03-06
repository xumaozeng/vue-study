import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
// import router from './router'
// import store from './store'
import router from "./krouter";
import store from "./kstore";
// import router from './xrouter'
// import store from './xstore'

// 导入封装插件
import notice from "@/plugins/notice";

Vue.use(notice);

Vue.config.productionTip = false;
// 事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
