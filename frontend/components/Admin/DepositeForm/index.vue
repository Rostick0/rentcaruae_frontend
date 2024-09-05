<template>
  <AnyFormBlock title="Deposite">
    <div class="form-item">
      <VFormComponent :field="price" />
      <VFormComponent :field="free_leads" />
    </div>
    <div class="form-item">
      <VFormComponent :field="payment_id" />
    </div>
  </AnyFormBlock>
  <AnyFormBlock title="Tariff prices">
    <div class="form-item">
      <VFormComponent :field="price_0" />
      <VFormComponent :field="price_1" />
    </div>
    <div class="form-item">
      <VFormComponent :field="price_2" />
      <VFormComponent :field="price_3" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  deposite: Object,
});

const price = ref({
  type: "text",
  name: "price",
  modelValue: props.deposite?.price ?? "",

  bind: {
    label: "Price",
  },
});

const free_leads = ref({
  type: "text",
  name: "free_leads",
  modelValue: props.deposite?.free_leads ?? "",

  bind: {
    label: "Free leads",
    // maska: "#",
    // maskaTokens: "S:[0-9]:repeat",
  },
});

const payment_id = ref({
  type: "text",
  name: "payment_id",
  modelValue: props.deposite?.payment_id ?? "",

  bind: {
    label: "Free leads",
    // maska: "#",
    // maskaTokens: "S:[0-9]:repeat",
  },
});

const price_0 = ref({
  type: "text",
  name: "price_0",
  modelValue: props.deposite?.deposite_leads?.[0]?.price ?? "",

  bind: {
    label: "All WhatsApp leads",
  },
});

const price_1 = ref({
  type: "text",
  name: "price_1",
  modelValue: props.deposite?.deposite_leads?.[1]?.price ?? "",

  bind: {
    label: "All Booking leads",
  },
});

const price_2 = ref({
  type: "text",
  name: "price_2",
  modelValue: props.deposite?.deposite_leads?.[2]?.price ?? "",

  bind: {
    label: "Premium WhatsApp leads",
  },
});

const price_3 = ref({
  type: "text",
  name: "price_3",
  modelValue: props.deposite?.deposite_leads?.[3]?.price ?? "",

  bind: {
    label: "Premium Booking leads",
  },
});
</script>
