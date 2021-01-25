
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      orderFiled: "",
      orderBy: "desc",
    };
  },
  computed: {
    columns() {
      // 由于不一定有prop属性，内部如果出现了默认作用域插槽，则就按照它来执行渲染
      return this.$slots.default
        .filter((vnode) => vnode.tag)
        .map(({ data: { attrs, scopedSlots } }) => {
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
  created() {
    this.columns.forEach((column) => {
      // 如果存在sortable列，则头一个作为默认排序字段
      if (column.hasOwnProperty("sortable")) {
        if (column.prop && !this.orderFiled) {
          this.sort(column.prop, this.orderBy);
        }
      }
    });
  },
  methods: {
    sort(filed, by) {
      this.orderFiled = filed;
      this.orderBy = by;

      this.data.sort((a, b) => {
        const v1 = a[this.orderFiled];
        const v2 = b[this.orderFiled];

        if (typeof v1 === "number") {
          return this.orderBy === "desc" ? v2 - v1 : v1 - v2;
        } else {
          return this.orderBy === "desc"
            ? v2.localeCompare(v1)
            : v1.localeCompare(v2);
        }
      });
    },
    toggleSort(field) {
      const by = this.orderBy === "desc" ? "asc" : "desc";
      this.sort(field, by);
    },
  },
  // 实现一个渲染函数JSX
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.columns.map((column) => {
              if (column.hasOwnProperty("sortable") && column.prop) {
                let orderArrow = "↑↓";
                if (this.orderFiled === column.prop) {
                  orderArrow = this.orderBy === "desc" ? "↓" : "↑";
                }
                return (
                  <th
                    key={column.label}
                    onClick={() => this.toggleSort(column.prop)}
                  >
                    {column.label} <span>{orderArrow}</span>
                  </th>
                );
              } else {
                return <th key={column.label}>{column.label}</th>;
              }
            })}
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