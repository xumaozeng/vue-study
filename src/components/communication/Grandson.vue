<template>
  <div @click="$emit('some-event', 'grandson')">
    <h3>grandson</h3>
    <p>{{ foo }}</p>
    <!-- provide/inject -->
    <p>{{ yc }}</p>
  </div>
</template>

<script>
export default {
  inject: ["yc"],
  props: {
    foo: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
</style>