<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">
        <UiCheckbox
          @update:modelValue="(val) => emits('setCarsSelected', val)"
        />
      </th>
      <th class="table__th">Car id</th>
      <th class="table__th">Title</th>
      <th class="table__th">Special offer</th>
      <th class="table__th">Published</th>
      <th class="table__th">Last refresh</th>
      <th class="table__th">Price</th>
      <th class="table__th"></th>
      <th class="table__th"></th>
    </tr>
    <tbody>
      <AdminCarsTableItem
        v-for="(car, index) in cars"
        :key="car.id"
        :car="car"
        :isSelected="carsSelected?.[index]?.value"
        @selectCar="(car) => emits('selectCar', car)"
        @changeOneCarSelected="(car) => emits('changeOneCarSelected', car)"
      />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  cars: Array,
  carsSelected: Array,
});

const emits = defineEmits([
  "selectCar",
  "setCarsSelected",
  "changeOneCarSelected",
]);
</script>
