<template>
  <AnyFormBlock title="Rental terms">
    <div class="form-item__price">
      <div class="form-item__price_name">Security deposit</div>
      <VFormComponent :field="security_deposit" />
      <div class="form-item__price_switch">
        <VFormComponent :field="is_free_deposite" />
      </div>
    </div>
    <div class="form-item__price" v-if="is_free_deposite.modelValue">
      <div class=""></div>
      <VFormComponent :field="free_per_day_security" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  car: Object,
});

const security_deposit = ref({
  type: "text",
  name: "security_deposit",
  modelValue: props?.car?.security_deposit?.price ?? "",

  bind: {
    label: "Security deposit (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const free_per_day_security = ref({
  type: "text",
  name: "free_per_day_security",
  modelValue: props?.car?.free_per_day_security?.price ?? "",

  bind: {
    label: "Deposit Free per day (AED)",
    placeholder: "0000",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const is_free_deposite = ref({
  type: "switch",
  name: "is_show_security",
  modelValue: !!props?.car?.free_per_day_security?.price,

  bind: {
    label: "Deposit FREE",
  },
});
</script>
