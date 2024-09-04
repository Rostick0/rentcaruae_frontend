<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">Price</th>
      <th class="table__th">Free leads</th>
      <th class="table__th"></th>
    </tr>
    <AdminDepositesTableItem
      v-for="item in data"
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
