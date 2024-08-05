<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__td">
        <UiCheckbox />
      </th>
      <th class="table__td">Car id</th>
      <th class="table__td">Title</th>
      <th class="table__td">Special offer</th>
      <th class="table__td">Published</th>
      <th class="table__td">Last refresh</th>
      <th class="table__td">Price</th>
      <th class="table__td"></th>
      <th class="table__td"></th>
    </tr>
    <tbody>
      <AdminCarsTableItem v-for="car in cars" :key="car.id" :car="car" />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  cars: Array,
});
</script>
