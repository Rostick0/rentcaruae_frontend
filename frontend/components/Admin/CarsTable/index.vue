<template>
  <table class="table">
    <tr class="table_tr">
      <td class="table__td">
        <UiCheckbox />
      </td>
      <td class="table__td">Car id</td>
      <td class="table__td">Title</td>
      <td class="table__td">Special offer</td>
      <td class="table__td">Published</td>
      <td class="table__td">Last refresh</td>
      <td class="table__td">Price</td>
      <td class="table__td"></td>
      <td class="table__td"></td>
    </tr>
    <AdminCarsTableItem v-for="car in cars" :key="car.id" :car="car" />
  </table>
</template>

<script setup>
const props = defineProps({
  cars: Array,
});
</script>
