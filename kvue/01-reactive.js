/* eslint-disable */
// Object.defineProperty()
// 将传入的obj，动态的设置一个key，它的值为val

// 数组响应式
// 1.替换数组原型中7个方法
const originalProto = Array.prototype;
// 备份一份，修改备份
const arrayProto = Object.create(originalProto);

// 七个方法改变原数组的
["push", "pop", "shift", "unshift", "reverse", "splice", "sort"].forEach(
  method => {
    arrayProto[method] = function() {
      // 原始操作
      originalProto[method].apply(this, arguments);
      // 覆盖操作：通知更新
      console.log("数组执行" + method + "操作");
    };
  }
);

// 对象响应式
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

  // 判断传入obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型，替换七个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部的元素执行响应化
    Object.keys(obj).forEach(key => {
      observe(obj[key]);
    });
  } else {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
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
  },
  arr: [1, 2, 3]
};
// defineReactive(obj, "foo", "foo");
observe(obj); // 递归遍历
// obj.foo;
// obj.foo = "fooooo";
// obj.baz.a;
// obj.baz = { b: 1 };
// console.log(obj.baz.b);
// set(obj, "dong", "dong");
// obj.dong;
// obj.arr.splice(1, 1, 4);
// console.log(obj.arr);
