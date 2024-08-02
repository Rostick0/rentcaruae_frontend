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
          <span class="text-ui">AED 20 per day</span>
        </UiSwitch>
      </div>
    </div>
  </AdminFormBlock>
</template>

<script setup>
const props = defineProps({
  isShow: Boolean,
});

const emits = defineEmits(["setHide"]);

const special_price_day = ref({
  type: "text",
  name: "price_special.0",
  modelValue: "",

  bind: {
    label: `Special price per day (Current price )`,
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const special_price_week = ref({
  type: "text",
  name: "price_special.1",
  modelValue: "",

  bind: {
    label: `Special price per week (Current price )`,
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const special_price_month = ref({
  type: "text",
  name: "price_special.2",
  modelValue: "",

  bind: {
    label: `Special price per month (Current price )`,
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});
</script>
