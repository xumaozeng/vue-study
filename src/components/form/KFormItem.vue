
<template>
  <div>
    <!-- 1.labelasyncValidator -->
    <label v-if="label">{{ label }}</label>
    <!-- 2.内部使用 -->
    <slot></slot>
    <!-- 3.校验结果 -->
    <p v-if="error">{{ error }}</p>
    <!-- <p>{{ form.rules[this.prop] }}</p> -->
  </div>
</template>

<script>
import Validator from "async-validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: "",
    };
  },
  mounted() {
    // 老爹挂载之后，孩子一定已挂载,KInput已挂载，可以监听校验事件
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 获取校验规则
      const rules = this.form.rules[this.prop];
      // 当前值
      const value = this.form.model[this.prop];
      const validator = new Validator({ [this.prop]: rules });

      // 执行校验，返回一个promise
      return validator.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          // 显示错误信息
          this.error = errors[0].message;
        } else {
          // 校验通过清除错误
          this.error = "";
        }
      });
    },
  },
};
</script>

<style scoped>
</style>