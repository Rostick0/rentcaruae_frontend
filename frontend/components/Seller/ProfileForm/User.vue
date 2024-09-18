<template>
  <AnyFormBlock title="User info">
    <div class="form-item">
      <VFormComponent :field="user_full_name" />
      <VFormComponent :field="user_tel" />
    </div>
    <div class="form-item">
      <VFormComponent :field="user_email" />
    </div>
  </AnyFormBlock>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const user_full_name = ref({
  type: "text",
  name: "user.full_name",
  rules: "required|max:255",
  modelValue: props.user?.full_name ?? "",

  bind: {
    label: "User Name",
    placeholder: "My Company",
  },
});

const user_tel = ref({
  type: "tel",
  name: "user.tel",
  modelValue: convertPhoneToForm(props.user?.company?.tel),

  bind: {
    label: "User number",
  },
});

const user_email = ref({
  type: "text",
  name: "user.email",
  rules: "required|email|max:255",
  modelValue: props.user?.email ?? "",

  bind: {
    label: "User email",
    placeholder: "email@company_name.com",
  },
});
</script>
