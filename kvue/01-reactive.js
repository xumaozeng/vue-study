// Object.defineProperty()
// 将传入的obj，动态的设置一个key，它的值为val

// /* eslint-disable-next-line */
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

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

// 类似于vue中的$set
function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = {
  foo: "foo",
  bar: "bar",
  baz: {
    a: 1
  }
};
// defineReactive(obj, "foo", "foo");
observe(obj); // 递归遍历
// obj.foo;
// obj.foo = "fooooo";
// obj.baz.a;
// obj.baz = { b: 1 };
// console.log(obj.baz.b);
set(obj, "dong", "dong");
obj.dong;
