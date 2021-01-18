<template>
  <div>
    <!-- KTable -->
    <k-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <k-table-column prop="date" label="日期" sortable></k-table-column>
      <k-table-column prop="name" label="姓名"></k-table-column>
      <k-table-column prop="address" label="地址"></k-table-column>
      <k-table-column label="操作">
        <template v-slot:scope="scope">{{ scope.row.operation }}</template>
      </k-table-column>
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
          operation: "增加",
        },
        {
          date: "2017-05-03",
          name: "小虎",
          address: "上海市",
          operation: "删除",
        },
        {
          date: "2018-05-20",
          name: "小刘",
          address: "上海市",
          operation: "编辑",
        },
        {
          date: "2021-01-02",
          name: "小李",
          address: "上海市",
          operation: "查询",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>