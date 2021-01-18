<template>
  <div>
    <table style="width: 50%">
      <!-- 表头 -->
      <thead>
        <tr>
          <th v-for="item in labels" :key="item.label">
            {{ item.label }}
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
    defaultSort: {
      type: Object,
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
      .map((item) => ({ label: item.label, sortable: item.sortable }));
    this.labels = this.unique(labels);
    console.log(this.labels);

    // 排序
    this.getSort();
  },
  methods: {
    getSort() {
      const { prop, order } = this.defaultSort;
      this.data.sort((a, b) => {
        const item1 = new Date(a[prop]).getTime();
        const item2 = new Date(b[prop]).getTime();
        if (order === "descending") {
          return item2 - item1;
        } else {
          return item1 - item2;
        }
      });
    },
    // 对象数组去重
    unique(arr) {
      const obj = {};
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i].label] = arr[i];
      }
      for (const item in obj) {
        res.push(obj[item]);
      }
      return res;
    },
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
}
</style>