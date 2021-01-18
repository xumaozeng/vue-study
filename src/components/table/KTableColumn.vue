<template>
  <!-- 显示表格单元内容 -->
  <td>
    <slot>{{ tableData[index][prop] }}</slot>
  </td>
</template>

<script>
export default {
  inject: ["tableData"],
  props: {
    prop: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  mounted() {
    const dom_index = this.$el.parentNode;
    this.index = dom_index.dataset.index;
    console.log(this.index);
  },
};
</script>

<style scoped>
</style>