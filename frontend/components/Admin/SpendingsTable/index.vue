<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">User Id</th>
      <th class="table__th">User Email</th>
      <th class="table__th">Sum</th>
      <th class="table__th">Date</th>
    </tr>
    <AdminSpendingsTableItem
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
