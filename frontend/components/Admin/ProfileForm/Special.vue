<template>
  <AnyFormBlock title="Admin settings">
    <div class="form-item">
      <slot name="balance" />
      <VFormComponent :field="free_leads" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const free_leads = ref({
  type: "text",
  name: "user.free_leads",
  modelValue: props?.user?.free_leads ?? "",

  bind: {
    label: "Free leads",
    maska: "S SS#",
    maskaTokens: "S:[0-9]:repeated",
    dataMaskaReversed: true,
  },
});
</script>
