<template>
  <!-- 表格 -->
  <table>
    <!-- 表头 -->
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.label">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <!-- 内容 -->
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(value, key) in row" :key="key">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    columns() {
      // 获取插槽$slots.default中的vnode节点
      return this.$slots.default.map(({ data }) => ({
        label: data.attrs.label,
        prop: data.attrs.prop,
      }));
    },
    rows() {
      // 获取有prop属性的数组对象
      return this.data.map((item) => {
        const ret = {};
        this.columns.forEach(({ prop }) => {
          ret[prop] = item[prop];
        });
        return ret;
      });
    },
  },
};
</script>

<style scoped>
table {
  width: 50%;
  margin: 0 auto;
}
</style>