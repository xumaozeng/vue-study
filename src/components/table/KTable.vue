
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
      // 由于不一定有prop属性，内部如果出现了默认作用域插槽，则就按照它来执行渲染
      return this.$slots.default.map(({ data: { attrs, scopedSlots } }) => {
        const column = { ...attrs };
        if (scopedSlots) {
          // 自定义模板
          column.renderCell = (row, i) => (
            <div>{scopedSlots.default({ row, $index: i })}</div>
          );
        } else {
          // 设置prop的情况
          column.renderCell = (row) => <div>{row[column.prop]}</div>;
        }
        return column;
      });
    },
  },
  // 实现一个渲染函数JSX
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.columns.map((column) => (
              <th key={column.label}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {this.columns.map((column, columnIndex) => (
                <td key={columnIndex}>{column.renderCell(row, rowIndex)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
</script>

<style scoped>
table {
  width: 50%;
  margin: 0 auto;
}
</style>