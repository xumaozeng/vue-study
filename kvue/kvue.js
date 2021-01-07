/* eslint-disable */

function defineReactive(obj, key, val) {
  // 对val判断是否为对象，递归
  observe(val);

  // Dep在这创建
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);

      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(v) {
      if (val !== v) {
        console.log("set", key);
        // 如果新传入的v是个对象
        observe(v);
        val = v;

        // 通知更新
        dep.notify();
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
    // this.value = obj; // 暂时没用

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

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newValue) {
        vm.$data[key] = newValue;
      }
    });
  });
}

class KVue {
  constructor(options) {
    // 1.保存选项
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods; // 保存methods方法

    // 2.响应式处理
    observe(this.$data);

    // 3.代理data到KVue实例上
    proxy(this);

    // 4.编译
    new Compile(options.el, this);
  }
}

class Compile {
  constructor(el, vm) {
    // el-宿主，vm-KVue实例
    this.$vm = vm;
    this.$el = document.querySelector(el);

    this.compile(this.$el);
  }

  compile(el) {
    // 遍历el dom树
    el.childNodes.forEach(node => {
      if (this.isElement(node)) {
        // element
        // 需要处理属性和子节点
        // console.log("编译元素", node.nodeName);
        this.compileElement(node);

        // 递归子节点
        if (node.childNodes && node.childNodes.length > 0) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // console.log("编译插值表达式", node.textContent);
        // 获取表达式的值并赋值给node
        this.compileText(node);
      }
    });
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  // 插值{{xxx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 处理元素所有动态属性
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      // console.log(attr);
      const attrName = attr.name; // 属性名
      const exp = attr.value; // 表达式

      // 判断是否是一个指令
      if (this.isDir(attrName)) {
        // 执行指令处理函数
        // k-text，关心text
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      } else if (this.isEvent(attrName)) {
        // 判断是不是@xxx事件
        // @click="onClick"
        const eventName = attrName.substring(1);
        this[eventName] && this[eventName](node, exp);
      }
    });
  }

  // 指令
  isDir(attrName) {
    // 是否以k-开头的
    return attrName.startsWith("k-");
  }

  // click方法
  isEvent(attrName) {
    // 是否以@开头的
    return attrName.startsWith("@");
  }

  // 在vm.$methods中找到key为"onClick"的方法并执行
  click(node, exp) {
    const method = this.$vm.$methods[exp];
    // 给node添加click监听事件，回调函数执行method
    node.addEventListener("click", method.bind(this.$vm));
  }

  // 更新函数
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);

    // update:创建Watcher
    const that = this;
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val);
    });
  }

  // 编译文本，将{{ooxx}}
  compileText(node) {
    this.update(node, RegExp.$1, "text");
  }

  // k-text处理函数
  text(node, exp) {
    this.update(node, exp, "text");
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  // k-html
  html(node, exp) {
    this.update(node, exp, "html");
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }

  // k-model,input->type=text
  model(node, exp) {
    // update方法只完成赋值和更新
    this.update(node, exp, "model");

    // 事件监听
    node.addEventListener("input", e => {
      // 新的值赋值给数据即可
      this.$vm[exp] = e.target.value;
    });
  }

  modelUpdater(node, val) {
    // 判断input的type=text类型
    if (node.nodeName === "INPUT" && node.type === "text") {
      // 表单元素赋值
      node.value = val;
    }
  }
}

// 小秘书：做dom更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    // 读取以下key的值，触发其get，从而收集依赖
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}

// 依赖：和响应式对象的每个key一一对应
class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach(dep => dep.update());
  }
}
