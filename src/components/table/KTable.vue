<template>
  <div>
    <table border="1">
      <!-- 表头 -->
      <thead>
        <tr>
          <th v-for="(label, index) in labels" :key="index">
            {{ label }}
          </th>
        </tr>
      </thead>
      <!-- 表内容 -->
      <tbody>
        <tr v-for="(d, index) in data" :key="index" :data-index="index">
          <slot></slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import KTableColumn from "./KTableColumn.vue";
export default {
  components: { KTableColumn },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      labels: [],
    };
  },
  mounted() {
    // 老爹加载完后，孩子一定已加载，用Set过滤到重复的label
    const labels = this.$children
      .filter((item) => item.label)
      .map((item) => item.label);
    this.labels = Array.from(new Set(labels));
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
}
</style>