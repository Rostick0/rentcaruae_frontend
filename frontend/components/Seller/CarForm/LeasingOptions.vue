<template>
  <SellerFormBlock title="leasing options">
    <div class="form-item__price">
      <div class="form-item__price_name">1 month</div>
      <VFormComponent :field="price_leasing_0" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_leasing_0" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">3 months</div>
      <VFormComponent :field="price_leasing_1" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_leasing_1" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">6 months</div>
      <VFormComponent :field="price_leasing_2" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_leasing_2" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">9 months</div>
      <VFormComponent :field="price_leasing_3" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_leasing_3" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">12 months</div>
      <VFormComponent :field="price_leasing_4" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_leasing_4" />
    </div>
    <div class="form-item__price">
      <div class="form-item__price_name">24 months</div>
      <VFormComponent :field="price_leasing_5" />
    </div>
    <div class="form-item__price">
      <div class=""></div>
      <VFormComponent :field="mileage_leasing_5" />
      <div class="form-item__price_switch">
        <UiSwitch
          label="Available for leasing?"
          :modelValue="isShow"
          @update:modelValue="emits('setHide', true)"
        />
      </div>
    </div>
  </SellerFormBlock>
</template>

<script setup>
const props = defineProps({
  car: Object,
  isShow: Boolean,
});

const emits = defineEmits(["setHide"]);

const price_leasing_0 = ref({
  type: "text",
  name: "price_leasing.0",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 30)?.price ??
    "",

  bind: {
    label: "Price per 1 month (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_leasing_0 = ref({
  type: "text",
  name: "mileage_leasing.0",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 30)?.mileage ??
    "",

  bind: {
    label: "Mileage per month (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const price_leasing_1 = ref({
  type: "text",
  name: "price_leasing.1",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 90)?.price ??
    "",

  bind: {
    label: "Price per 3 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_leasing_1 = ref({
  type: "text",
  name: "mileage_leasing.1",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 90)?.mileage ??
    "",

  bind: {
    label: "Mileage per 3 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const price_leasing_2 = ref({
  type: "text",
  name: "price_leasing.2",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 180)?.price ??
    "",

  bind: {
    label: "Price per 6 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_leasing_2 = ref({
  type: "text",
  name: "mileage_leasing.2",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 180)?.mileage ??
    "",

  bind: {
    label: "Mileage per 6 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const price_leasing_3 = ref({
  type: "text",
  name: "price_leasing.3",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 270)?.price ??
    "",

  bind: {
    label: "Price per 9 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_leasing_3 = ref({
  type: "text",
  name: "mileage_leasing.3",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 270)?.mileage ??
    "",

  bind: {
    label: "Mileage per 9 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const price_leasing_4 = ref({
  type: "text",
  name: "price_leasing.4",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 360)?.price ??
    "",

  bind: {
    label: "Price per 12 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_leasing_4 = ref({
  type: "text",
  name: "mileage_leasing.4",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 360)?.mileage ??
    "",

  bind: {
    label: "Mileage per 12 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const price_leasing_5 = ref({
  type: "text",
  name: "price_leasing.5",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 720)?.price ??
    "",

  bind: {
    label: "Price per 24 months (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const mileage_leasing_5 = ref({
  type: "text",
  name: "mileage_leasing.5",
  modelValue:
    props?.car?.price_leasing?.find?.((item) => item?.period == 720)?.mileage ??
    "",

  bind: {
    label: "Mileage per 24 months (km)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});
</script>
