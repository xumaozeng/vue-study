<template>
  <!-- 显示表格单元内容 -->
  <td>
    <slot v-if="tableData[index][prop]">{{ tableData[index][prop] }}</slot>
    <slot name="scope" :row="tableData[index]"></slot>
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
    sortable: {
      type: Boolean,
      default: false,
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
  },
};
</script>

<style scoped>
</style>