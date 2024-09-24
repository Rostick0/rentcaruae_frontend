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
      <th class="table__th"></th>
    </tr>
    <tr>
      <td class="table__td" colspan="6">
        <div align="left">Upload Excel Price</div>
      </td>
      <td class="table__td">AED {{ excelData?.count }}</td>
      <td class="table__td"></td>
    </tr>
    <SellerDashboardTableDateItem
      v-for="item in data"
      :key="item?.id"
      :item="item"
      :itemNext="data?.[index + 1]"
    />
  </table>
</template>

<script setup>
const props = defineProps({
  data: Array,
  excelData: Object,
});
</script>

<style lang="scss" scoped></style>
