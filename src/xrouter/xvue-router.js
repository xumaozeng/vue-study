/**
 * 自己的路由器
 * 1、VueRouter类，是一个插件
 */
let Vue; // 引用构造函数，VueRouter中要使用

class VueRouter {
  constructor(options) {
    this.$options = options;

    // 提前缓存path和route映射关系
    this.routeMap = {};
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    });

    // 声明一个响应式的current
    // 渲染函数如果要重复执行，必须依赖于响应式数据
    const initial = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "current", initial);

    // 监听url变化
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
      //   console.log(this.current);
    });
  }
}

// 插件要实现install方法
// 参数1就是Vue
VueRouter.install = function(_Vue) {
  // 保存构造函数的引用
  Vue = _Vue;

  // console.log(this);

  // 2、挂载$router到Vue原型
  // 利用全局混入，延迟执行下面的代码，这样可以获取router实例，就是new Vue({router参数})
  Vue.mixin({
    beforeCreate() {
      // this指向组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  // 3、声明两个全局组件router-view,router-link
  // <router-link to="/abc"></router-link>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // <a href="#/abc">xxx</a>
      // this指向当前组件实例
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    }
  });
  Vue.component("router-view", {
    render(h) {
      // current
      // 动态获取对应组件
      /* let component = null;
      const route = this.$router.$options.routes.find(
        route => route.path === this.$router.current
      );
      if (route) component = route.component; */
      const { routeMap, current } = this.$router;
      const component = routeMap[current] ? routeMap[current].component : null;
      return h(component);
    }
  });
};

export default VueRouter;
