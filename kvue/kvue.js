/* eslint-disable */

function defineReactive(obj, key, val) {
  // 对val判断是否为对象，递归
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(v) {
      if (val !== v) {
        console.log("set", key);
        // 如果新传入的v是个对象
        observe(v);
        val = v;
      }
    }
  });
}

// 递归遍历对象，对每个key属性进行响应式拦截getter,setter
function observe(obj) {
  // 判断是否为对象，不是跳出
  if (typeof obj !== "object" || obj === null) return;

  // 每出现一个对象，创建一个Ob实例
  new Observer(obj); // __ob__
}

// Observer：判断传入obj类型，做对应的响应式处理
class Observer {
  constructor(obj) {
    this.value = obj;

    // 判断对象类型
    if (Array.isArray(obj)) {
      // todo待定
    } else {
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

class KVue {
  constructor(options) {
    // 1.保存选项
    this.$options = options;
    this.$data = options.data;

    // 2.响应式处理
    observe(this.$data);
  }
}
