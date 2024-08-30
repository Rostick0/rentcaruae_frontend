<template>
  <AdminFormBlock title="Special offer">
    <div class="form-item__price">
      <div class="form-item__price_name">Price per day</div>
      <VFormComponent :field="special_price_day" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">Price per week</div>
      <VFormComponent :field="special_price_week" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">Price per month</div>
      <VFormComponent :field="special_price_month" />
      <div class="form-item__price_switch">
        <UiSwitch
          :modelValue="isShow"
          @update:modelValue="emits('setHide', true)"
        >
          Special offer available <br />
          <span class="text-ui">AED {{ PRICE_SPECAIL_PER_DAY }} per day</span>
        </UiSwitch>
      </div>
    </div>
    <slot name="bottom" />
  </AdminFormBlock>
</template>

<script setup>
const props = defineProps({
  valuesForm: Object,
  car: Object,
  isShow: Boolean,
});

const emits = defineEmits(["setHide"]);

const setLabel = (type, val) =>
  `Special price per ${type} (Current price ${valueOrDefault(val, "-")})`;

const special_price_day = ref({
  type: "text",
  name: "price_special.0",
  modelValue: props?.car?.price_special?.[0]?.price ?? "",

  bind: {
    label: setLabel(
      "day",
      props.car?.price?.[0]?.price ?? props.valuesForm?.price_sum?.[0]
    ),
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const special_price_week = ref({
  type: "text",
  name: "price_special.1",
  modelValue: props?.car?.price_special?.[1]?.price ?? "",

  bind: {
    label: setLabel(
      "week",
      props.car?.price?.[1]?.price ?? props.valuesForm?.price_sum?.[1]
    ),
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const special_price_month = ref({
  type: "text",
  name: "price_special.2",
  modelValue: props?.car?.price_special?.[2]?.price ?? "",

  bind: {
    label: setLabel(
      "month",
      props.car?.price?.[2]?.price ?? props.valuesForm?.price_sum?.[2]
    ),
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

watch(props.valuesForm?.price_sum, (newV) => {
  special_price_day.value.bind.label = setLabel("day", newV?.[0]);
  special_price_week.value.bind.label = setLabel("week", newV?.[1]);
  special_price_month.value.bind.label = setLabel("month", newV?.[2]);
});
</script>
