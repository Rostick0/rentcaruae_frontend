<template>
  <AdminFormBlock title="Price">
    <div class="form-item__price">
      <div class="form-item__price_name">Price per day</div>
      <VFormComponent :field="price_per_day" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_per_day" />
      <div class="form-item__price_switch">
        <div class="d-flex">
          <span>Minimum booking days</span>
          <VFormComponent :field="min_days" />
        </div>
        <VFormComponent :field="is_show_per_day" />
      </div>
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">Price per week</div>
      <VFormComponent :field="price_per_week" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_per_week" />
      <div class="form-item__price_switch">
        <VFormComponent :field="is_show_per_week" />
      </div>
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">Price per month</div>
      <VFormComponent :field="price_per_month" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_per_month" />
      <div class="form-item__price_switch">
        <VFormComponent :field="is_show_per_month" />
      </div>
    </div>
  </AdminFormBlock>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const price_per_day = ref({
  type: "text",
  name: "price_sum.0",
  modelValue: props?.car?.price?.[0]?.price ?? "",

  bind: {
    label: "Price per day (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_per_day = ref({
  type: "text",
  name: "price_mileage.0",
  modelValue: props?.car?.price?.[0]?.mileage ?? "",

  bind: {
    label: "Mileage per day (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const minDaysOptions = [1, 2, 3, 4, 5, 6, 7, 14, 30].map((item) => ({
  id: item,
  value: item,
}));

const min_days = ref({
  type: "select",
  name: "min_days",
  modelValue: props?.car?.min_days
    ? { id: min_days, value: min_days }
    : { id: 1, value: 1 },

  bind: {
    isAlternative: true,
    options: minDaysOptions,
  },
});

const is_show_per_day = ref({
  type: "switch",
  name: "price_is_show.0",
  modelValue: !!props?.car?.price?.[0]?.is_show ?? true,

  bind: {
    label: "Available for daily?",
  },
});

const price_per_week = ref({
  type: "text",
  name: "price_sum.1",
  modelValue: props?.car?.price?.[1]?.price ?? "",

  bind: {
    label: "Price per week (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_per_week = ref({
  type: "text",
  name: "price_mileage.1",
  modelValue: props?.car?.price?.[1]?.mileage ?? "",

  bind: {
    label: "Mileage per week (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const is_show_per_week = ref({
  type: "switch",
  name: "price_is_show.1",
  modelValue: !!props?.car?.price?.[1]?.is_show ?? true,

  bind: {
    label: "Available for weekly?",
  },
});

const price_per_month = ref({
  type: "text",
  name: "price_sum.2",
  modelValue: props?.car?.price?.[2]?.price ?? "",

  bind: {
    label: "Price per month (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_per_month = ref({
  type: "text",
  name: "price_mileage.2",
  modelValue: props?.car?.price?.[2]?.mileage ?? "",

  bind: {
    label: "Mileage per month (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const is_show_per_month = ref({
  type: "switch",
  name: "price_is_show.2",
  modelValue: !!props?.car?.price?.[2]?.is_show ?? true,

  bind: {
    label: "Available for monthly?",
  },
});
</script>
