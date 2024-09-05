<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Id</th>
      <th class="table__th">Name</th>
      <th class="table__th">Model car</th>
      <th class="table__th">Brand</th>
      <th class="table__th"></th>
    </tr>
    <AdminGenerationsTableItem
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
