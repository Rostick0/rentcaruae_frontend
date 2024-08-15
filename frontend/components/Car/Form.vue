<template>
  <div class="calc-item" ref="book">
    <div class="calc__title">Your booking details</div>
    <VFormComponent :field="tel" />
    <VFormComponent :field="full_name" />
    <VFormComponent :field="email" />
    <CalcAmount
      :price="priceRental"
      :textTopleft="`Rental ${daysRental} ${dayText}`"
    />
    <UiButton class="calc__button">Book</UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  daysRental: [String, Number],
  priceRental: [String, Number],
  dayText: String,
});

const tel = ref({
  type: "tel",
  name: "tel",
  modelValue: [],

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
</script>
