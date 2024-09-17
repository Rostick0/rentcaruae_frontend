<template>
  <table class="table">
    <tr class="table_tr">
      <th class="table__th">
        <UiCheckbox
          :modelValue="selectValue"
          @update:modelValue="emits('setCarsSelected', !selectValue)"
        />
      </th>
      <th class="table__th">Car id</th>
      <th class="table__th">Title</th>
      <th class="table__th">
        <div
          class="table__th_sort"
        >
          <span>Special offer</span>
          <!-- 
          @click="() => updateSorting('price_special.id')"
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8333 14.175V8.33333H12.1666V14.175H9.66663L13 17.5L16.3333 14.175H13.8333ZM7.99996 2.5L4.66663 5.825H7.16663V11.6667H8.83329V5.825H11.3333L7.99996 2.5ZM13.8333 14.175V8.33333H12.1666V14.175H9.66663L13 17.5L16.3333 14.175H13.8333ZM7.99996 2.5L4.66663 5.825H7.16663V11.6667H8.83329V5.825H11.3333L7.99996 2.5Z"
              fill="#221EE3"
            />
          </svg> -->
        </div>
      </th>
      <th class="table__th">Published</th>
      <th class="table__th">
        <div
          class="table__th_sort"
          @click="() => updateSorting('last_refresh')"
        >
          <span>Last refresh</span>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8333 14.175V8.33333H12.1666V14.175H9.66663L13 17.5L16.3333 14.175H13.8333ZM7.99996 2.5L4.66663 5.825H7.16663V11.6667H8.83329V5.825H11.3333L7.99996 2.5ZM13.8333 14.175V8.33333H12.1666V14.175H9.66663L13 17.5L16.3333 14.175H13.8333ZM7.99996 2.5L4.66663 5.825H7.16663V11.6667H8.83329V5.825H11.3333L7.99996 2.5Z"
              fill="#221EE3"
            />
          </svg>
        </div>
      </th>
      <th class="table__th">Price</th>
      <th class="table__th"></th>
      <th class="table__th"></th>
    </tr>
    <tbody>
      <SellerCarsTableItem
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
  selectValue: Boolean,
  cars: Array,
  carsSelected: Array,
  modelValue: Object,
});

const emits = defineEmits([
  "selectCar",
  "setCarsSelected",
  "changeOneCarSelected",
  "update:modelValue",
]);

const updateSorting = (value) => {
  emits("update:modelValue", {
    ...props.modelValue,
    sort: props?.modelValue?.sort === "-" + value ? value : "-" + value,
  });
};
</script>
