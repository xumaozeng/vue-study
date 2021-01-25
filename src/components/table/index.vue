<template>
  <div>
    <!-- KTable -->
    <k-table :data="tableData">
      <k-table-column sortable prop="date" label="日期"></k-table-column>
      <k-table-column sortable prop="name" label="姓名"></k-table-column>
      <k-table-column prop="address" label="地址"></k-table-column>
      <k-table-column label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.$index, scope.row)">编辑</button>
          <button @click="handleDelete(scope.$index, scope.row)">删除</button>
        </template>
      </k-table-column>
    </k-table>
  </div>
</template>

<script>
import KTable from "./KTable.vue";
import KTableColumn from "./KTableColumn.vue";
export default {
  components: { KTable, KTableColumn },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "小徐",
          address: "上海市",
        },
        {
          date: "2017-05-03",
          name: "小虎",
          address: "上海市",
        },
        {
          date: "2018-05-20",
          name: "小刘",
          address: "上海市",
        },
        {
          date: "2021-01-02",
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