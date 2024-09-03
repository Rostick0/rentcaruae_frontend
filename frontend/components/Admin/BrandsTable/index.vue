<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Name</th>
      <th class="table__th">Image url</th>
      <th class="table__th"></th>
    </tr>
    <AdminBrandsTableItem
      v-for="(item, index) in data"
      :key="item?.id"
      :item="item"
    />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>

<style lang="scss" scoped></style>
