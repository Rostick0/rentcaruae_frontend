<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Brand</th>
      <th class="table__th">Model</th>
      <th class="table__th">Special offers</th>
      <th class="table__th">Total views</th>
      <th class="table__th">Booking</th>
      <th class="table__th">WhatsApp</th>
      <th class="table__th">Daily spend</th>
    </tr>
    <AdminDashboardTableDateItem
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
