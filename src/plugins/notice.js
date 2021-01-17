import Notice from "@/components/Notice.vue";
import create from "@/utils/create";

export default {
  // 把Notice和create封装为一个插件
  install(Vue) {
    Vue.prototype.$notice = props => {
      const comp = create(Notice, props);
      comp.show();
      return comp;
    };
  }
};
