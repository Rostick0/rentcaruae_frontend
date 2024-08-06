<template>
  <AdminFormBlock title="Car photo">
    <div class="form-item">
      <VFormComponent :field="transmission_id" />
      <VFormComponent :field="colour_id" />
    </div>
  </AdminFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const company_name = ref({
  type: "text",
  name: "company.name",
  rules: "required",
  modelValue: props?.user?.company?.name ?? "",

  bind: {
    label: "Company Name",
    placeholder: "My Company",
  },
});

const company_trn_number = ref({
  type: "text",
  name: "company.company_trn_number",
  rules: "required",
  modelValue: props?.user?.company?.company_trn_number ?? "",

  bind: {
    label: "TRN number (TAX)",
    placeholder: "TRN number (TAX)",
  },
});
</script>
