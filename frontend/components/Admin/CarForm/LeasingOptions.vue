<template>
  <AdminFormBlock title="leasing options">
    <div class="form-item__price">
      <div class="form-item__price_name">1 month</div>
      <VFormComponent :field="leasing_price_0" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="leasing_mileage_0" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">3 months</div>
      <VFormComponent :field="leasing_price_1" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="leasing_mileage_1" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">6 months</div>
      <VFormComponent :field="leasing_price_2" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="leasing_mileage_2" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">9 months</div>
      <VFormComponent :field="leasing_price_3" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="leasing_mileage_3" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">12 months</div>
      <VFormComponent :field="leasing_price_4" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="leasing_mileage_4" />
      <div class="form-item__price_switch">
        <UiSwitch
          label="Available for leasing?"
          :modelValue="isShow"
          @update:modelValue="emits('setHide', true)"
        />
      </div>
    </div>
  </AdminFormBlock>
</template>

<script setup>
const props = defineProps({
  isShow: Boolean,
});

const emits = defineEmits(["setHide"]);

const leasing_price_0 = ref({
  type: "text",
  name: "leasing_price.0",
  modelValue: "",

  bind: {
    label: "Price per 1 month (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_mileage_0 = ref({
  type: "text",
  name: "leasing_mileage.0",
  modelValue: "",

  bind: {
    label: "Mileage per month (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_price_1 = ref({
  type: "text",
  name: "leasing_price.1",
  modelValue: "",

  bind: {
    label: "Price per 3 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_mileage_1 = ref({
  type: "text",
  name: "leasing_mileage.1",
  modelValue: "",

  bind: {
    label: "Mileage per 3 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_price_2 = ref({
  type: "text",
  name: "leasing_price.2",
  modelValue: "",

  bind: {
    label: "Price per 6 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_mileage_2 = ref({
  type: "text",
  name: "leasing_mileage.2",
  modelValue: "",

  bind: {
    label: "Mileage per 3 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_price_3 = ref({
  type: "text",
  name: "leasing_price.3",
  modelValue: "",

  bind: {
    label: "Price per 9 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_mileage_3 = ref({
  type: "text",
  name: "leasing_mileage.3",
  modelValue: "",

  bind: {
    label: "Mileage per 9 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_price_4 = ref({
  type: "text",
  name: "leasing_price.4",
  modelValue: "",

  bind: {
    label: "Price per 12 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const leasing_mileage_4 = ref({
  type: "text",
  name: "leasing_mileage.4",
  modelValue: "",

  bind: {
    label: "Mileage per 3 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});
</script>
