<template>
  <AnyFormBlock title="Car info">
    <div class="form-item">
      <VFormComponent :field="brand" />
      <VFormComponent :field="year" />
    </div>
    <div class="form-item">
      <VFormComponent :field="model_car" />
      <VFormComponent :field="car_categories" />
    </div>
    <div class="form-item">
      <VFormComponent :field="generation_id" />
      <VFormComponent :field="cities" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
import debounce from "lodash/debounce";
import api from "~/api";

const props = defineProps({
  car: Object,
  validateField: Function,
});

const brand = ref({
  type: "select",
  name: "brand",
  rules: "required",
  modelValue: props?.car?.generation?.model_car?.brand ?? "",

  bind: {
    label: "Car brend",
    placeholder: "Car brend",
    debounceMs: 200,
    searchFn: fetchBrand,
    withIcon: false,
    deps: computed(() => model_car.value.modelValue),
    onDepsChange(ctx) {
      if (ctx.modelValue) return;

      ctx.updateModelValue(model_car.value.modelValue?.brand);
    },
  },
});

const model_car = ref({
  type: "select",
  name: "model_car",
  rules: "required",
  modelValue: props?.car?.generation?.model_car ?? "",

  bind: {
    label: "Car model",
    placeholder: "Car model",
    debounceMs: 200,
    searchFn: fetchModelCar,
    withIcon: false,
    deps: computed(() => brand.value.modelValue),
    onDepsChange(ctx) {
      if (ctx.modelValue?.brand_id === brand.value.modelValue?.id) return;

      // if (ctx.modelValue) return;

      ctx.updateModelValue();
      ctx.handleSearch();
    },
  },
});

const year = ref({
  type: "text",
  name: "year",
  rules: "required",
  modelValue: props?.car?.year ?? "",

  bind: {
    label: "Make",
    placeholder: "Year",
    maska: "####",
  },
});

const car_categories = ref({
  type: "multiple-select",
  name: "car_categories",
  rules: "required",
  modelValue: props?.car?.car_categories?.map?.((item) => item?.category) ?? [],

  bind: {
    label: "Car categorias",
    placeholder: "Type",
    debounceMs: 200,
    searchFn: fetchCategory,
    withIcon: false,
  },
});

const generation_id = ref({
  type: "select",
  name: "generation_id",
  rules: "required",
  modelValue: props?.car?.generation ?? "",

  bind: {
    label: "Body type",
    placeholder: "Type",
    debounceMs: 200,
    searchFn: fetchGeneration,
    withIcon: false,
    isReadOnly: !model_car.value.modelValue,
    readOnlyText: "Select model",
    deps: computed(() => model_car.value.modelValue),
    onDepsChange: debounce((ctx) => {
      ctx.handleSearch();

      if (!ctx.modelValue) return;

      ctx.updateModelValue();
    }, 300),
  },
});

// const resAll = await api.cities.getAll();

const cities = ref({
  type: "multiple-select",
  name: "cities",
  rules: "required",
  modelValue: props?.car?.cities?.map((item) => ({ ...item?.city })) ?? [],

  bind: {
    label: "Cities",
    options: useState("citiesAll"),
  },
});

watch(
  () => model_car.value.modelValue,
  async (newV) => {
    if (newV) generation_id.value.bind.isReadOnly = !newV;
  }
);

async function fetchBrand(_, searchString, limit, page) {
  return await api.brands.getAll({
    params: {
      "filterLIKE[name]": searchString,
      sort: "is_popular",
      limit,
      page,
    },
  });
}

async function fetchModelCar(_, searchString, limit, page) {
  return await api.modelCars.getAll({
    params: {
      "filterLIKE[name]": searchString,
      extends: "brand",
      "filterEQ[brand_id]": brand.value.modelValue?.id,
      limit,
      page,
    },
  });
}

async function fetchCategory(_, searchString, limit, page) {
  return await api.categories.getAll({
    params: {
      // "filterLIKE[name]": searchString,
      // extends: "categories",
      limit,
      page,
    },
  });
}

async function fetchGeneration(_, searchString, limit, page) {
  if (!model_car.value.modelValue) return;

  return await api.generations.getAll({
    params: {
      "filterLIKE[name]": searchString,
      "filterEQ[model_car_id]": model_car.value.modelValue?.id,
      limit,
      page,
    },
  });
}
</script>
