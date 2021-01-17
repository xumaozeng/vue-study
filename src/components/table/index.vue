<template>
  <div>
    <!-- KTable -->
    <k-table :data="tableData">
      <k-table-column prop="date" label="日期"></k-table-column>
    </k-table>
  </div>
</template>

<script>
import KTable from "./KTable.vue";
import KTableColumn from "./KTableColumn.vue";
export default {
  components: { KTable, KTableColumn },
};
</script>

<style scoped>
</style>