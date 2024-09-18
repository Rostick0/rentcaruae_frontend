<template>
  <div class="calc-item" ref="book">
    <div class="calc__title">Your booking details</div>
    <VFormComponent :field="tel" />
    <VFormComponent :field="full_name" />
    <VFormComponent :field="email" />
    <CalcAmount
      :price="priceRental"
      :textTopleft="`Rental ${periodRental} ${periodText}`"
      :tax="tax"
    >
      <template #calc-stats>
        <slot name="calc-stats" />
      </template>
      <template #summary>
        <slot name="summary" />
      </template>
    </CalcAmount>
    <UiButton class="calc__button">Book</UiButton>
    <VFormComponent :field="is_agree" class="calc-item__checkbox">
      By ticking this box, you agree to the
      <NuxtLink to="/terms_of_service" target="_blank"
        >Terms of Service</NuxtLink
      >
      <br />and
      <NuxtLink to="/privacy_policy" target="_blank">Privacy Policy</NuxtLink>,
      including cookie use.
    </VFormComponent>
  </div>
</template>

<script setup>
const props = defineProps({
  periodRental: [String, Number],
  priceRental: [String, Number],
  tax: [String, Number],
  periodText: String,
});

const tel = ref({
  type: "tel",
  name: "tel",
  modelValue: "",
  rules: "",

  bind: {
    label: "Phone number",
  },
});

const full_name = ref({
  type: "text",
  name: "full_name",
  modelValue: "",
  rules: "required|max:255",

  bind: {
    label: "Full Name",
  },
});

const email = ref({
  type: "text",
  name: "email",
  modelValue: "",
  rules: "required|email|max:255",

  bind: {
    label: "E-mail",
  },
});

const is_agree = ref({
  type: "checkbox",
  name: "is_agree",
  modelValue: true,
  rules: "required",

  bind: {
    variant: "grey-small",
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/car-carc";
</style>
