<template>
  <div class="profile-form form__flex">
    <form class="form__fields" @submit="onSubmit">
      <pre>{{ values?.company_schedules }}</pre>
      <AdminProfileFormCompany />
      <AdminProfileFormCompanySchedules />
      <div class="form__bottom">
        <UiButton class="form-btn" @click.prevent variant="outlined">
          <span>Verification request</span>
          <span class="text-small">3-4 business days</span>
        </UiButton>
        <div class="form__flex_switch">
          <VFormComponent :field="is_show" />
          <UiButton>Save</UiButton>
        </div>
      </div>
    </form>
    <div class="form__flex_right">
      <AdminProfileFormVerificationStatus />
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const user = useState("user");

const { handleSubmit, setErrors, values } = useForm();
const onSubmit = handleSubmit(async (values) => {
  const data = {};

  console.log(values);
  // const res = await api.companies.update({ id: user.value?.company?.id, data });

  // if (res?.error)
});

const is_show = ref({
  type: "switch",
  name: "is_show",
  modelValue: !!user.value?.is_show,

  bind: {
    label: "Publish on website",
  },
});
</script>
