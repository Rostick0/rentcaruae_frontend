<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Date</th>
      <th class="table__th">Refreshes</th>
      <th class="table__th">Special offers</th>
      <th class="table__th">Total views</th>
      <th class="table__th">Booking</th>
      <th class="table__th">WhatsApp</th>
      <th class="table__th">Daily spend</th>
    </tr>
    <AdminDashboardTableItem
      v-for="(item, index) in data"
      :key="item?.id"
      :item="item"
      :itemNext="data?.[index + 1]"
    />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>

<style lang="scss" scoped></style>
