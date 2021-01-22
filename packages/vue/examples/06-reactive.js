// vue3利用Proxy
function reactive(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  return new Proxy(obj, {
    get(target, key) {
      console.log('get', key)
      // 依赖收集
      const ret = Reflect.get(target, key)
      track(target, key)
      // 懒处理递归
      return typeof ret === 'object' ? reactive(ret) : ret
    },
    set(target, key, val) {
      console.log('set', key)
      // 触发更新
      const ret = Reflect.set(target, key, val)
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key) {
      console.log('delete', key)
      trigger(target, key)
      return Reflect.deleteProperty(target, key)
    }
  })
}

// 临时保存副作用函数
const effectStack = []

// 添加副作用
function effect(fn) {
  /**
   * 核心作用:
   * 1.把fn作为响应式核心放到effectStack里
   * 2.执行下fn
   */
  // 包装一下：处理错误，放入stack
  const e = createReactiveEffect(fn)
  // 立即执行一次
  e()
  return e
}

function createReactiveEffect(fn) {
  // 处理fn可能错误
  const effect = function() {
    try {
      // 放入临时数组
      effectStack.push(effect)
      // 执行fn
      return fn()
    } finally {
      effectStack.pop()
    }
  }

  return effect
}

// 映射表
const targetMap = new WeakMap()

// 依赖收集
function track(target, key) {
  // 尝试获取effect函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target对应的map
    let depMap = targetMap.get(target)

    // 初始化需要创建
    if (!depMap) {
      depMap = new Map()
      targetMap.set(target, depMap)
    }

    let deps = depMap.get(key)
    if (!deps) {
      deps = new Set()
      depMap.set(key, deps)
    }

    // 放入包装过的fn
    deps.add(effect)
  }
}

// 依赖触发
function trigger(target, key) {
  // 获取target对应的map
  const depMap = targetMap.get(target)

  if (!depMap) {
    return
  }

  // 获取key对应的set
  const deps = depMap.get(key)
  if (deps) {
    // 遍历执行
    deps.forEach(dep => {
      dep()
    })
  }
}

const state = reactive({
  foo: 'foo',
  n: {
    a: 1
  }
})

effect(() => {
  console.log('effect1', state.foo)
})

effect(() => {
  console.log('effect2', state.n.a, state.foo)
})

// state.foo
// state.foo = 'fooooo'
// state.bar = 'bar'
// delete state.foo

state.n.a = 10

state.n.a
