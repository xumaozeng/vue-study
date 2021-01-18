<template>
  <div>
    <!-- KTable -->
    <k-table :data="tableData">
      <k-table-column prop="date" label="日期"></k-table-column>
      <k-table-column prop="name" label="姓名"></k-table-column>
      <k-table-column prop="address" label="地址"></k-table-column>
      <!-- <k-table-column prop="operation" label="操作"></k-table-column> -->
    </k-table>
  </div>
</template>

<script>
import KTable from "./KTable.vue";
import KTableColumn from "./KTableColumn.vue";
export default {
  components: { KTable, KTableColumn },
  provide() {
    return {
      // 隔代传参
      tableData: this.tableData,
    };
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "小徐",
          address: "上海市",
        },
        {
          date: "2016-05-02",
          name: "小虎",
          address: "上海市",
        },
        {
          date: "2016-05-02",
          name: "小刘",
          address: "上海市",
        },
        {
          date: "2016-05-02",
          name: "小李",
          address: "上海市",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>