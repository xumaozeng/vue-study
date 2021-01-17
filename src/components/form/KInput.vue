<template>
  <div>
    <!-- 1.双绑 -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  // 特性继承关掉，div上就不会出现$attrs
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);

      // 触发校验
      // 源码中实现了一个this.dispatch('k-form-item', 'validate')
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style scoped>
</style>