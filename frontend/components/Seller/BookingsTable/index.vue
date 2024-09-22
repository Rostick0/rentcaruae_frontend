<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">Date</th>
      <th class="table__th">Car</th>
      <th class="table__th">Name</th>
      <th class="table__th">E-mail</th>
      <th class="table__th">Phone</th>
      <th class="table__th">Rental</th>
      <th class="table__th">Deposite Free</th>
      <th class="table__th">Price</th>
    </tr>
    <tbody>
      <SellerBookingsTableItem
        v-for="booking in bookings"
        :key="booking.id"
        :booking="booking"
      />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  bookings: Array,
});
</script>

<style lang="scss" scoped></style>
