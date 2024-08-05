<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__td">
        <UiCheckbox @update:modelValue="changeCarsSelected" />
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
      <AdminCarsTableItem
        v-for="(car, index) in cars"
        :key="car.id"
        :car="car"
        :isSelected="carsSelected?.[index]?.value"
        @selectCar="(car) => emits('selectCar', car)"
      />
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  cars: Array,
});

const carsSelected = ref(
  props?.cars?.map((id) => ({
    id,
    value: false,
  }))
);

const changeCarsSelected = (value) => {
  carsSelected.value = props?.cars?.map((id) => ({
    id,
    value,
  }));
};

const emits = defineEmits(["selectCar"]);
</script>
