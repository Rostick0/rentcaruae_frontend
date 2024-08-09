<template>
  <AdminFormBlock title="Car photo">
    <div class="form-item">
      <VFormComponent :field="company_name" />
      <VFormComponent :field="user_tel" />
    </div>
    <div class="form-item">
      <VFormComponent :field="company_trn_number" />
      <VFormComponent :field="user_email" />
    </div>
    <div class="form-item">
      <div class="">
        <VFormComponent :field="company_city_id" />
        <VFormComponent :field="company_aread_name" />
        <VFormComponent :field="company_building_name" />
        <VFormComponent :field="company_office_number" />
      </div>
      <div class=""></div>
    </div>
    <VFormComponent :field="company_description" />
  </AdminFormBlock>
</template>

<script setup>
const user = useState("user");

const company_name = ref({
  type: "text",
  name: "company.name",
  rules: "required|max:255",
  modelValue: user.value?.company?.name ?? "",

  bind: {
    label: "Company Name",
    placeholder: "My Company",
  },
});

const user_tel = ref({
  type: "tel",
  name: "user.tel",
  modelValue: convertTel(user.value?.tel),

  bind: {
    label: "Phone number",
    // slots: "dasd",
  },
});

const company_trn_number = ref({
  type: "text",
  name: "company.trn_number",
  rules: "required|max:255",
  modelValue: user.value?.company?.trn_number ?? "",

  bind: {
    label: "TRN number (TAX)",
    placeholder: "TRN number (TAX)",
  },
});

const user_email = ref({
  type: "text",
  name: "user.email",
  rules: "required|email|max:255",
  modelValue: user.value?.email ?? "",

  bind: {
    label: "Leads email",
    placeholder: "email@company_name.com",
  },
});

const company_city_id = ref({
  type: "select",
  name: "company.city_id",
  rules: "required",
  modelValue: user.value?.company?.city ?? "",

  bind: {
    label: "City",
    placeholder: "City",
    options: useState("cities"),
  },
});

const company_aread_name = ref({
  type: "text",
  name: "company.aread_name",
  rules: "required|max:255",
  modelValue: user.value?.company?.aread_name ?? "",

  bind: {
    label: "Aread name",
    placeholder: "Aread name",
  },
});

const company_building_name = ref({
  type: "text",
  name: "company.building_name",
  rules: "required|max:255",
  modelValue: user.value?.company?.building_name ?? "",

  bind: {
    label: "Building name",
    placeholder: "Building name",
  },
});

const company_office_number = ref({
  type: "text",
  name: "company.office_number",
  rules: "required|max:255",
  modelValue: user.value?.company?.office_number ?? "",

  bind: {
    label: "Office number",
    placeholder: "Office number",
  },
});

const company_description = ref({
  type: "textarea",
  name: "company.description",
  rules: "max:600",
  modelValue: user.value?.company?.description ?? "",

  bind: {
    label: "Company description ",
    placeholder: "Description",
    rows: 5,
  },
});
</script>
