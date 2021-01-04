/**
 * 1、声明一个插件
 * 2、实现一个Store
 * 实现响应式state属性
 * 实现两个方法commit()/dispatch()
 */
let Vue;

class Store {
  constructor(options) {
    // 1、保存选项
    this._mutations = options.mutations || {};
    this._actions = options.actions || {};

    // 2、做响应式状态的state属性
    // Vue.util.defineReactive(this, 'state', {})
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed: {
        getters() {
          return options.getters;
        }
      }
    });

    // 上下文对象绑定this
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    // 实现getters
    // 1.动态设置getters属性
    // 2.响应式
    // 3.能否利用上vue的computed计算属性缓存
    this.initGetters = this.initGetters.bind(this);
  }

  // 给用户暴露接口
  get state() {
    console.log(this._vm);
    // $data不是响应式，_data是响应式
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("please use replaceState to reset");
  }

  // getters
  get getters() {
    return this.initGetters();
  }

  set getters(v) {
    console.error("please use replaceGetters to reset");
  }

  // 执行getters里的函数，返回一个对象集合
  initGetters() {
    const newGetters = {};
    for (const key in this._vm.getters) {
      newGetters[key] = this._vm.getters[key](this.state);
    }
    return newGetters;
  }

  // store.commit(type, payload)
  commit(type, payload) {
    // 获取mutations
    const entry = this._mutations[type];
    if (!entry) console.error("unknown mutations type");

    entry(this.state, payload);
  }

  // store.dispatch(type, payload)
  dispatch(type, payload) {
    // 获取actions
    const entry = this._actions[type];
    if (!entry) console.error("unknown actions type");

    // {commit, dispatch, state, getters}
    entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;

  // 挂载$store
  Vue.mixin({
    beforeCreate() {
      // 这里this指向组件实例，new Vue({store(参数)})
      if (this.$options.store) {
        // 给每个组件实例暴露store实例
        Vue.prototype.$store = this.options.store;
      }
    }
  });
}

// 导出对象相当于Vuex
export default { Store, install };
