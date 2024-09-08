<template>
  <AnyFormBlock title="Model car">
    <div class="form-item">
      <VFormComponent :field="name" />
      <VFormComponent :field="brand_id" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  modelCar: Object,
});

const name = ref({
  type: "text",
  name: "name",
  rules: "required|max:255",
  modelValue: props.modelCar?.name ?? "",

  bind: {
    label: "Name",
  },
});

const brand_id = ref({
  type: "select",
  name: "brand_id",
  rules: "required",
  modelValue: props.modelCar?.brand ?? {},

  bind: {
    label: "Brand",
    debounceMs: 200,
    searchFn: fetchBrand,
    withIcon: false,
  },
});

async function fetchBrand(_, searchString, limit, page) {
  return await api.brands.getAll({
    params: {
      "filterLIKE[name]": searchString,
      limit,
      page,
    },
  });
}
</script>
