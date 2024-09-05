<template>
  <AnyFormBlock title="Model car">
    <div class="form-item">
      <VFormComponent :field="name" />
      <VFormComponent :field="model_car_id" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  generation: Object,
});

const name = ref({
  type: "select",
  name: "name",
  modelValue: generationsTypeOptions?.find(
    (item) => item.name === props.generation?.name
  ),

  bind: {
    label: "Name",
    options: generationsTypeOptions,
  },
});

const model_car_id = ref({
  type: "select",
  name: "model_car_id",
  modelValue: props?.generation?.model_car ?? {},

  bind: {
    label: "Model car",
    debounceMs: 200,
    searchFn: fetchModelCar,
    withIcon: false,
  },
});

async function fetchModelCar(_, searchString, limit, page) {
  return await api.modelCars.getAll({
    params: {
      "filterLIKE[name]": searchString,
      limit,
      page,
    },
  });
}
</script>
