<template>
  <AdminFormBlock title="Car specification">
    <div class="form-item">
      <VFormComponent :field="transmission_id" />
      <VFormComponent :field="colour_id" />
    </div>
    <div class="form-item">
      <VFormComponent :field="seats" />
      <VFormComponent :field="colour_interior_id" />
    </div>
    <div class="form-item">
      <VFormComponent :field="fuel_type_id" />
      <VFormComponent v-if="isShowIsNew" :field="is_new" />
    </div>
  </AdminFormBlock>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  car: Object,
  valuesForm: Object,
});

const transmissionOptions =
  (await api.transmissions.getAll().then((res) => res?.data)) ?? [];
const transmission_id = ref({
  type: "select",
  name: "transmission_id",
  rules: "required",
  modelValue: props?.car?.transmission ?? "",

  bind: {
    label: "Transmission",
    placeholder: "Transmission",
    options: transmissionOptions,
    withIcon: false,
  },
});

const colourOptions =
  (await api.colours.getAll().then((res) => res?.data)) ?? [];
const colour_id = ref({
  type: "select",
  name: "colour_id",
  rules: "required",
  modelValue: props?.car?.colour ?? "",

  bind: {
    label: "Car colour",
    placeholder: "Car colour",
    options: colourOptions,
    withIcon: false,
  },
});

const seats = ref({
  type: "text",
  name: "seats",
  rules: "required",
  modelValue: props?.car?.seats ?? "",

  bind: {
    label: "Seats",
    placeholder: "Seats",
  },
});

const colour_interior_id = ref({
  type: "select",
  name: "colour_interior_id",
  rules: "required",
  modelValue: props?.car?.colour_interior ?? "",

  bind: {
    label: "Interior colour",
    placeholder: "Interior colour",
    options: colourOptions,
    withIcon: false,
  },
});

const fuelTypeOptions =
  (await api.fuelTypes.getAll().then((res) => res?.data)) ?? [];
const fuel_type_id = ref({
  type: "select",
  name: "fuel_type_id",
  rules: "required",
  modelValue: props?.car?.fuel_type ?? "",

  bind: {
    label: "Fuel type",
    placeholder: "Fuel type",
    options: fuelTypeOptions,
    withIcon: false,
  },
});

const is_new = ref({
  type: "switch",
  name: "is_new",
  modelValue: !!props?.car?.is_new ?? false,

  bind: {
    label: "NEW",
  },
});

const isShowIsNew = computed(
  () =>
    props.valuesForm?.year &&
    props.valuesForm.year >= new Date().getFullYear() - 1
);
</script>
