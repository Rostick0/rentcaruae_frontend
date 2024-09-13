<template>
  <AnyFormBlock title="Admin settings">
    <div class="form-item">
      <VFormComponent :field="balance" />
      <VFormComponent :field="free_leads" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const balance = ref({
  type: "text",
  name: "balance",
  rules: "required|max:255",
  modelValue: props.user?.balance ?? "",

  bind: {
    label: "Balance user",
    placeholder: "Balance",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});

const free_leads = ref({
  type: "text",
  name: "user.tel",
  modelValue: props?.user?.free_leads,

  bind: {
    label: "Free leads",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});
</script>
